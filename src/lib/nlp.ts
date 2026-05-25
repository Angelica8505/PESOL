/**
 * PESOLUTION NLP & Matching Logic
 * Implementing NWS Formula (Linear Weighted Scoring)
 */

export type ProficiencyLevel = 1 | 2 | 3;

export interface Skill {
  id: string;
  name: string;
  level: ProficiencyLevel;
}

export interface JobRequirement {
  id: string;
  name: string;
}

const SKILL_COEFFICIENT = 0.08; // 8% constant
const BASE_MATCH = 0.60; // 60% base score

/**
 * Calculates the match score using the NWS Formula (Linear Weighted Scoring)
 */
export function calculateMatchScore(
  userSkills: Skill[],
  jobRequirements: JobRequirement[]
) {
  if (jobRequirements.length === 0) return { score: 0, gaps: [] };

  const N = jobRequirements.length;
  let totalBoostPoints = 0;
  const gaps: string[] = [];

  // Create a map for quick lookup with synonym resolution
  const userSkillMap = new Map<string, ProficiencyLevel>();
  userSkills.forEach(s => {
    const canonical = resolveSynonym(s.name);
    userSkillMap.set(canonical.toLowerCase(), s.level);
  });

  jobRequirements.forEach(req => {
    const reqName = resolveSynonym(req.name).toLowerCase();
    const userLevel = userSkillMap.get(reqName);
    
    if (userLevel) {
      totalBoostPoints += userLevel * SKILL_COEFFICIENT;
    } else {
      gaps.push(req.name);
    }
  });

  const averageBoost = totalBoostPoints / N;
  const finalScore = Math.min(1.0, BASE_MATCH + averageBoost);

  return {
    score: finalScore * 100,
    gaps
  };
}

/**
 * Rule-based Segmenter & Categorizer (Constrained NER)
 */
export function segmentAndCategorize(text: string) {
  const sections: Record<string, string[]> = {
    'EDUCATION_BASED': [],
    'SKILLS_BASED': [],
    'EXPERIENCE_BASED': []
  };

  const lines = text.split('\n');
  let currentSection = 'SKILLS_BASED';

  const SECTION_KEYWORDS: Record<string, string[]> = {
    'EDUCATION_BASED': ['education', 'university', 'college', 'school', 'degree', 'academic'],
    'EXPERIENCE_BASED': ['experience', 'employment', 'work', 'history', 'background', 'job'],
    'SKILLS_BASED': ['skills', 'competencies', 'technical', 'proficiencies', 'tools']
  };

  lines.forEach(line => {
    const lowerLine = line.toLowerCase().trim();
    if (!lowerLine) return;

    // Detect section headers
    let headerFound = false;
    for (const [section, keywords] of Object.entries(SECTION_KEYWORDS)) {
      if (keywords.some(k => lowerLine.includes(k) && lowerLine.length < 30)) {
        currentSection = section;
        headerFound = true;
        break;
      }
    }

    if (!headerFound) {
      sections[currentSection].push(line);
    }
  });

  return sections;
}

/**
 * Simple Lemmatization (Mapping plural/variants to base)
 */
export function lemmatize(word: string): string {
  const normalized = word.toLowerCase().trim();
  if (normalized.endsWith('ing')) return normalized.slice(0, -3);
  if (normalized.endsWith('s') && !normalized.endsWith('ss')) return normalized.slice(0, -1);
  return normalized;
}

/**
 * Synonym mapping library (Expanded INDUSTRY TAXONOMY)
 */
export const SYNONYM_MAP: Record<string, string> = {
  'web development': 'software development',
  'frontend': 'software development',
  'backend': 'software development',
  'coding': 'software development',
  'programming': 'software development',
  'accounting': 'finance',
  'bookkeeping': 'finance',
  'masonry': 'construction',
  'carpentry': 'construction',
  'cleaning': 'maintenance',
  'customer service': 'customer support',
  'client relations': 'customer support',
  'data entry': 'administrative',
  'typist': 'administrative',
  'excel': 'spreadsheets',
  'sheets': 'spreadsheets',
};

export function resolveSynonym(term: string): string {
  const base = lemmatize(term);
  return SYNONYM_MAP[base] || base;
}

export function tokenize(text: string): string[] {
  return text
    .split(/[\s,/;:\n]+/)
    .map(t => t.replace(/[^\w]/g, '').toLowerCase())
    .filter(t => t.length > 2);
}

