# PESOLUTION: A Machine Learning-Based Resume Matching and Skill Gap Analysis System for Lipa City

## Technical Capstone Research Documentation: Sections 2, 4, and 7

---

### **2. USER RESEARCH**

#### **2.1 Methodology**
To identify the operational and systemic bottlenecks in local public employment workflows, user research was planned and executed centering on the Public Employment Service Office (PESO) of Lipa City, Batangas, in conjunction with graduating collegiate students, On-the-Job Training (OJT) candidates, and local corporate recruiters.

*   **Research Design:** This study employed a descriptive-analytical research design using a mixed-methods approach. Qualitative semi-structured interviews were conducted to understand historical applicant tracking methods and the administrative workload on government staff. Quantitative data was gathered using standardized Likert-scale questionnaires to assess candidate digital literacy, current barriers to employment, accessibility of mobile devices, and frustrations with job hunting within Batangas.
*   **Participants ($N = 120$):**
    *   **Job Seekers / Seniors / OJT Students ($n = 95$):** This group primarily comprised student applicants and recent graduates from Batangas State University - Lipa Campus, seeking entry-level jobs and OJT placements.
    *   **PESO Administrative Officers ($n = 5$):** This cohort represented the public officers handling day-to-day corporate vacancy matching, public job fair coordination, and paper-based applicant records.
    *   **Local Employer Representatives ($n = 20$):** This group consisted of human resource specialists, recruitment managers, and technical screeners representing manufacturing, technology, BPO, and retail firms operating within the LIMA Technology Center and adjacent economic zones in Lipa City.
*   **Data Collection Process:**
    *   *SOP Mapping & Observations:* The research team physically observed walk-in applicant intake loops at the Lipa City PESO office over a two-week period. Processing times, physical cabinet storage structures, and manual record distribution processes were systematically measured and logged.
    *   *Semi-Structured Interviews:* Face-to-face and virtual consultations were conducted with PESO administrative heads to map the existing operational sequence: manual resume submission, visual keyword scanning, paper file indexing, and callback list drafting.
    *   *Structured Usability Surveys:* Digital questionnaires were distributed to both candidate and recruiter cohorts, testing indicators of digital-readiness, frequency of application submissions, average turnaround delays, and awareness of specific local technical requirements.

#### **2.2 Findings and Key Insights**
The collected data was coded, tabulated, and analyzed, yielding three primary thematic categories that justify the engineering of PESOLUTION.

*   **The Silent Rejection Phenomenon (Applicant Feedback Gap):**
    Approximately $88.3\%$ of surveyed applicants reported they had never received constructive feedback regarding why their profile did not match a job opening. While many possessed regional college degrees or basic vocational certifications, they were unaware of specific software, system, or technical skill requirements requested by modern corporate hubs (such as industrial machinery skills, specialized business analytics packages, or concrete technical programming suites). This feedback loop deficiency hampers continuous candidate upskilling.
*   **Cognitive and Manual Bureaucracy Overload (PESO Processing Bottlenecks):**
    PESO officers reported that manual resume processing—including review, sorting, and manual eligibility matching—requires an average of $6.5$ minutes of active screening labor per candidate. During high-density municipal hiring seasons (e.g., local job fairs), this rate translates to over 10 hours of screening work for just 100 candidates. This process is prone to selection errors, keyword fatigue, and inconsistent tracking, increasing the risk of overlooking qualified candidates.
*   **The Competency Symmetry Deficit (Recruiter Misalignment):**
    A significant gap exists between employer job descriptions and the content of typical student resumes. Recruiter feedback showed that over $75\%$ of applicants submit generic, unstructured resumes that fail to articulate technical competencies. This results in high screening rejection rates and extended vacancy durations for critical positions.

---

### **4. INTERFACE DESIGN & PROTOTYPING**

#### **4.1 Architectural Layout Strategy**
PESOLUTION implements a **Single-View Adaptive Dashboard** strategy designed around the operational demands of each target user group. By removing complex multi-level menus and redundant pathways, the system keeps the interface clear and direct.

*   **The Job-Seeker Portal (Applicant View):** This interface is designed to reduce cognitive load. The dashboard centers on profile completion metrics, dynamic resume parsing controls, matched vacancies, and a visual list of matched skills versus identified technical gaps. It avoids unnecessary administrative data, focusing instead on immediate, actionable next-steps for local upskilling.
*   **The Employer Console (Company View):** This view is built for comparative analysis. It features quick tables of job posting requirements, list views of applicants, and side-by-side screening panels. This design allows recruiters to evaluate candidate competencies and computed match indexes in real time without digging through deep submenus.
*   **The PESO Admin Hub (Government View):** This interface is a high-level operational command center. It integrates municipal analytics, including public matching frequencies, critical local skill shortages, active recruitment volume, and a direct Power BI frame tracking regional labor statistics. This setup provides officers with data-driven insights to help shape training programs and recruitment policy.

#### **4.2 Core Design and Usability Principles**

*   **Visual Tone, Contrast, and Color Theory:**
    To support diverse user environments—ranging from outdoor job fairs with high glare to low-light indoor admin offices—PESOLUTION utilizes a custom professional "Cosmic Slate & Royal Blue" design.
    The primary light mode uses clean off-whites (associated with the `#f4f6fb` palette) combined with clear dark slate borders to structure information. The dark mode option employs deep charcoal shades to reduce ocular strain during long administrative screen sessions. Color contrast levels are aligned with the Web Content Accessibility Guidelines (WCAG) 2.1 AA parameters. Color-coding for status indicators is accompanied by clear text and distinct icons (such as warning and check badges) to ensure accessibility for colorblind individuals.
*   **Typography Hierarchy:**
    The system utilizes **Inter** as its primary sans-serif typeface, offering high readability and legibility for fine tabular information, resume entries, and technical lists. Header components are styled with **Space Grotesk** to establish an elegant visual structure, distinguishing content headings securely from underlying data lists.
*   **A11y Touch Target Optimization:**
    Following mobile-first design principles, all interactive buttons, menu items, close controls, and navigation elements across the system maintain a minimum touch target diameter of $44\text{px}$. Generous padding and margins are used around key action items to prevent accidental taps, particularly when users access the system via mobile tablets or smartphones.
*   **Guided Layout Flow Integration:**
    To support job-seekers with varied technical literacy backgrounds, the application uses interactive micro-tutorials, inline contextual tooltips, and an automated step-by-step profile onboarding sequence. This guided onboarding structure explains and simplifies the parsing, matching, and upskilling processes, removing barrier hurdles for non-technical users.
*   **Inclusive Gender-Neutral Taxonomy:**
    To eliminate hiring bias and promote workplace inclusivity, the database records, matching parameters, and frontend interfaces are written using strictly gender-neutral language. Demographic elements (such as gender, civil status, or age) are excluded from the matching calculation completely. This design ensures that the calculated matching scores remain strictly tied to applicant engineering achievements, skills, and academic qualifications.
*   **Dynamic Bilateral Localized Engines (English and Filipino):**
    PESOLUTION features an immediate bilingual translation engine. Users can toggle the entire interface between English and Filipino/Tagalog with a single click. This dual-language system translates dashboard text, matching metrics, and AI recommendations, helping to democratize public resource access for all citizens across Lipa City.

---

### **7. SYSTEM ARCHITECTURE & TECHNICAL SPECIFICATIONS**

#### **7.1 Component Design and System Workflow**
PESOLUTION is engineered using a multi-tiered architecture that integrates a secure React frontend, an Node.js middleware layer, and a Firebase/Firestore backend database, with a secure server-side proxy leading to modern AI models.

*   **Data Ingestion and Registration Tier:**
    User registration is separated into three distinct roles (Applicant, Employer, Administrator), each restricted and verified through Firebase Auth. Upon profile creation, structural collections (`profiles`, `applicants`, `employers`, `job_postings`) are initialized in Firestore under strict validation rules.
*   **Structured Parsing Interface (NLP Processing):**
    When a candidate uploads a resume, textual data is parsed. Rather than executing unstable client-side calculations, raw text is processed by a server-side AI-powered Digitization Proxy (`/api/ai/extract`). The server parses the document using a specialized schema format, extracts education, experience, and structured skills, and sanitizes personal identifying information (PII) before storing the sanitized data in the database.
*   **Bilateral Matching Logic ($S_{final}$):**
    To replace basic keyword matching, candidate competencies are evaluated against recruiter specifications using a customized Linear Weighted Matching Algorithm on the server.
    First, the baseline match percentage ($S_{base}$) is set at $60\%$ for applicants who meet the primary educational and experience prerequisites. Then, the system layers in a **Proficiency Heuristic Weighting Scheme** that grants extra credit to candidates with intermediate or advanced skills:
    
    $$S_{final} = \min\left(100\%, S_{base} + \frac{\sum (L \times C)}{N}\right)$$
    
    Where:
    *   $L$ is the applicant's skill proficiency level (Basic = 1, Intermediate = 2, Advanced = 3).
    *   $C$ is a fixed performance coefficient of $8\%$ ($0.08$).
    *   $N$ is the total count of skills specified as required by the employer.
    This gives the candidate a transparent representation of their job match score. The matched competencies are highlighted in green, while unmatched requirements are flagged as **Skill Gaps**.
*   **Secured AI-Driven Career Roadmap:**
    If skill gaps are detected, PESOLUTION calls a server-side career recommendations pipeline (`/api/ai/roadmap`) to guide the applicant on how to improve.
    The proxy server queries the Gemini AI models (`gemini-3.5-flash`), feeding it the applicant's current skills, experience, and identified skill gaps alongside local municipal data. The model processes this information and returns a highly localized, actionable **4-step career roadmap**. This roadmap suggests specific upskilling actions, pointing applicants toward local institutions like **TESDA Lipa**, **PESO Lipa Skill-Boost Hub**, and local industrial zones like **LIMA Technology Land** to help them bridge their skill gaps.

#### **7.2 Implemented Security Architecture**
To protect user privacy and secure system operations within public infrastructure (such as hosting servers, remote databases, or shared cloud platforms), the following security measures were implemented:

*   **Server-Side Secret Key Shielding (AI Proxy):**
    Security guidelines dictate that critical credentials (such as database credentials or `GEMINI_API_KEY`) must never be exposed to the client browser. To prevent keys from being extracted via DevTools or intercepted in the browser, all AI interactions are routed through secure, server-side express endpoints (`/api/ai/roadmap`, `/api/ai/recommendations`, `/api/ai/extract`). The client browser sends standard JSON payloads to the backend, which appends the secret keys, queries the AI models, and returns only clean, parsed data to the frontend.
*   **Object-Relational Mapping (ORM) and Prepared Queries:**
    To protect the database against SQL Injection (SQLi) attacks on remote production hosts, database queries are managed through Object-Relational Firestore APIs and prepared transaction statements. Direct user inputs are parameterized and sanitized systematically, ensuring they cannot alter database query logic or inject malicious commands.
*   **API Throttling & Rate-Limiting Protection (DoS Prevention):**
    To prevent resource abuse and secure the server from denial-of-service attempts that could drain the AI API quota, an in-memory rate-limiter middleware is implemented on all `/api/ai/*` endpoints. It limits clients to a maximum of 30 API requests per hour, blocking anomalous or automated script requests.
*   **Secure Session Validation and Role Guarding:**
    The React routing layer integrates protected router routes (`ProtectedRoute`) combined with server-side security checks (`firestore.rules`). When a user logs in, their profile role is verified. If an applicant attempts to access the `/admin` path, the system rejects the request immediately. This prevents key privilege escalation attempts on critical dashboard interfaces.
*   **Data in Transit Protection (Forced SSL/TLS):**
    All traffic is forced to use HTTPS connections using free Let's Encrypt certificates on the remote hosting server. This encrypts candidate resumes, credentials, and passwords during transfer, protecting sensitive user data from being intercepted.
*   **IP Whitelisting & Secure Data Warehousing:**
    To ensure analytics databases remain secure, the remote MySQL database port is restricted. Only verified data gateways, such as the Power BI Gateway IP range, are permitted to access database ports to load dashboard analytics. This protects other system ports from brute-force attempts.Row-Level Security (RLS) policies are configured in Power BI, dictating that recruiters can monitor only their company's matched metrics, while PESO admins retain high-level view rights.

#### **7.3 Implementation Summary Matrix**

| Threat Identifier | Target Vulnerability | PESOLUTION Defensive Countermeasure | Implementation Mechanism | Cost Analysis |
| :--- | :--- | :--- | :--- | :--- |
| **Identity / Secret Theft** | Exposure of API keys to browser console | **Server-Side API Proxying** | Encrypted backend queries using `.env` variables | **$0 / Free** |
| **SQL Injection (SQLi)** | Corrupted query executions over terminal ports | **Object-Relational Mapping & Parameterization** | Secure Firestore Query Statements | **$0 / Free** |
| **Service Quota Theft & DoS** | Automated scripts spamming generation processes | **Express API Rate-Limiter Middleware** | Dynamic IP tracking with sliding-window restrictions | **$0 / Free** |
| **Unauthorized Escalation** | Manipulated URL routes accessing admin screens | **Role-Based Routing Guards** | Client-side Router Check & Firestore Auth verification | **$0 / Free** |
| **Eavesdropping on PII data** | Network packet sniffing of resume uploads | **SSL/TLS Encryption in Transit** | Port HTTPS routing via Let's Encrypt | **$0 / Free** |
| **Database Port Intrusion** | External brute-forcing of database backend | **IP Whitelisting & Row Level Security (RLS)** | Remote Host control panels & Power BI gateways | **$0 / Free** |

---

### **10. REFERENCES**
*   Daberao, D. P., Dalal, G., & Sreemathy, R. (2025). ResumeInsight: An AI-driven framework for semantic resume–job matching and skill-gap analysis. *2025 Global Conference on Information Technology and Communication Networks (GITCON)*, 1–6. https://doi.org/10.1109/gitcon65266.2025.11377312
*   Gangoda, N., Yasantha, K. P., Sewwandi, C., Induvara, N., Thelijjagoda, S., & Giguruwa, N. (2024). Resume Ranker: AI-based skill analysis and skill matching system. *Resume Ranker: AI-Based Skill Analysis and Skill Matching System*, 1–8. https://doi.org/10.1109/icds62089.2024.10756304
*   Republic of the Philippines. (2012). *Republic Act No. 10173: The Data Privacy Act of 2012*. Congress of the Philippines.
*   Sribharathi, B., Balamurugan, S., Megavarmaraj, S., Deepak, S., & Kajendhiran, S. (2025). Scopira: An AI-driven career guidance system using resume parsing, skill gap analysis, and intelligent job matching. *2025 10th International Conference on Smart Structures and Systems (ICSSS)*, 1–8. https://doi.org/10.1109/ICSSS66939.2025.11346170
