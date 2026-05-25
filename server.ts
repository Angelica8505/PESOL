import express from "express";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

// Rate limiting state (Simple in-memory version for students)
const rateLimits = new Map<string, { count: number, lastReset: number }>();
const MAX_REQUESTS_PER_HOUR = 30;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userData = rateLimits.get(ip) || { count: 0, lastReset: now };
  
  if (now - userData.lastReset > 3600000) { // 1 hour
    userData.count = 0;
    userData.lastReset = now;
  }
  
  if (userData.count >= MAX_REQUESTS_PER_HOUR) {
    return false;
  }
  
  userData.count++;
  rateLimits.set(ip, userData);
  return true;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize Gemini AI
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("WARNING: GEMINI_API_KEY is not defined in .env");
  }
  const genAI = apiKey ? new GoogleGenAI({ 
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  }) : null;

  app.use(cors());
  app.use(express.json({ limit: '10mb' })); // "File Upload Security": Limit payload size

  // --- API ROUTES ---

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", database: "switched-to-firestore", secured: true });
  });

  // AI ROADMAP PROXY (AI Career Coach)
  app.post("/api/ai/roadmap", async (req, res) => {
    if (!checkRateLimit(req.ip || "unknown")) {
      return res.status(429).json({ error: "Too many requests. Try again in an hour." });
    }

    if (!genAI) return res.status(500).json({ error: "AI Service Unavailable" });

    const { skills, experience, education, achievements, skillGaps, language } = req.body;

    try {
      const prompt = `
        Translate/Explain in ${language === 'tl' ? 'Tagalog/Filipino' : 'English'} for a job seeker/student in Lipa City, Batangas.
        Generate a highly personalized, actionable 4-step professional career roadmap to bridge their skill gaps and prepare them for local high-demand jobs.
        
        Seeker Profile:
        - Current Skills: ${Array.isArray(skills) ? skills.join(", ") : "None listed yet"}
        - Work Experience: ${Array.isArray(experience) ? experience.join(", ") : "None listed yet"}
        - Education: ${Array.isArray(education) ? education.join(", ") : "None listed yet"}
        - Achievements: ${Array.isArray(achievements) ? achievements.join(", ") : "None listed yet"}
        - High-Demand Skill Gaps to bridge: ${Array.isArray(skillGaps) ? skillGaps.join(", ") : "None listed"}

        Requirements for each step:
        1. Actionable and concrete, specifically mentioning Lipa City/Batangas learning centers, institutions, or opportunities (like TESDA Lipa, PESO Lipa Skill-Boost Hub, LIMA Land technology parks, local BPOs/BPO industries, or reputable colleges/online training pathways).
        2. Incredibly encouraging, written in a clear, friendly, conversational tone.
        3. Solve the specific gaps listed to increase their technical employability.
        
        Return a JSON array containing exactly 4 strings inside a "roadmap" property. Do not return markdown tags outside JSON.
      `;

      const response = await genAI.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              roadmap: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING
                },
                description: "Array of exactly 4 strings representing career steps"
              }
            },
            required: ["roadmap"]
          }
        }
      });

      if (response.text) {
        res.json(JSON.parse(response.text));
      } else {
        res.status(500).json({ error: "No response text received from AI" });
      }
    } catch (error) {
      console.error("AI Roadmap Endpoint Error:", error);
      res.status(500).json({ error: "Failed to generate AI career roadmap" });
    }
  });

  // AI RECOMMENDATIONS PROXY (AI Integrity)
  app.post("/api/ai/recommendations", async (req, res) => {
    if (!checkRateLimit(req.ip || "unknown")) {
      return res.status(429).json({ error: "Too many requests. Try again in an hour." });
    }

    if (!genAI) return res.status(500).json({ error: "AI Service Unavailable" });

    const { gaps, jobTitle, language } = req.body;
    
    // "Input Validation": Ensure data is correct format
    if (!jobTitle || !Array.isArray(gaps)) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    try {
      const prompt = `
        Act as a helpful career counselor from PESO Lipa City. 
        Create a "PESOLUTION Step-by-Step Roadmap" for: "${jobTitle}"
        The applicant is missing these specific skills: ${gaps.join(", ")}
        Language: ${language === 'tl' ? 'Tagalog/Filipino' : 'English'}
        
        Requirements:
        1. Use VERY SIMPLE, encouraging words.
        2. Explain why Lipa City companies need these skills.
        3. Mention TESDA Lipa or PESO Lipa.
      `;

      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      
      res.json({ text: response.text });
    } catch (error) {
      console.error("AI Error:", error);
      res.status(500).json({ error: "Failed to generate recommendations" });
    }
  });

  // RESUME EXTRACTION PROXY
  app.post("/api/ai/extract", async (req, res) => {
    if (!checkRateLimit(req.ip || "unknown")) {
      return res.status(429).json({ error: "Too many requests." });
    }

    if (!genAI) return res.status(500).json({ error: "AI Service Unavailable" });

    const { text } = req.body;
    if (!text || text.length > 50000) { // Basic size guard
      return res.status(400).json({ error: "Empty or too large resume text" });
    }

    try {
      const prompt = `
        Act as a Data Digitization Engine for PESO Lipa. 
        Extract professional data from this resume text.
        ANONYMIZE PII (Remove exact birthdates, keep only City/Province).
        Resume text: ${text}
        
        Format as JSON:
        {
          "name": "Full Name",
          "email": "Email",
          "location": "City, Province",
          "education": [{"degree": "...", "school": "..."}],
          "experience": [{"title": "...", "company": "...", "dates": "..."}],
          "skills": [{"name": "...", "level": 1-3}]
        }
      `;

      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      
      const jsonMatch = response.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        res.json(JSON.parse(jsonMatch[0]));
      } else {
        res.status(500).json({ error: "Invalid AI extraction" });
      }
    } catch (error) {
      console.error("Extraction Error:", error);
      res.status(500).json({ error: "Extraction failed" });
    }
  });

  // Power BI Embed URL
  app.get("/api/analytics/powerbi", (req, res) => {
    res.json({ 
      embedUrl: process.env.POWERBI_EMBED_URL || "https://app.powerbi.com/view?r=eyJrIjoi..." 
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PESOLUTION Secure Server running on http://localhost:${PORT}`);
  });
}

startServer();
