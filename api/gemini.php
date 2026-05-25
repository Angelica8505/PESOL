<?php
declare(strict_types=1);

/**
 * Gemini API helper for PESOLUTION (server-side only).
 */
function geminiGenerate(string $apiKey, string $prompt, bool $json = true): ?array
{
    if ($apiKey === '') {
        return null;
    }

    $url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' . urlencode($apiKey);

    $payload = [
        'contents' => [
            ['parts' => [['text' => $prompt]]],
        ],
    ];

    if ($json) {
        $payload['generationConfig'] = [
            'responseMimeType' => 'application/json',
            'temperature' => 0.7,
        ];
    }

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_TIMEOUT => 45,
    ]);

    $response = curl_exec($ch);
    $httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($response === false || $httpCode < 200 || $httpCode >= 300) {
        error_log('Gemini API error: HTTP ' . $httpCode);
        return null;
    }

    $data = json_decode($response, true);
    $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;
    if (!$text) {
        return null;
    }

    if ($json) {
        $parsed = json_decode($text, true);
        return is_array($parsed) ? $parsed : null;
    }

    return ['text' => $text];
}

function geminiRoadmapPrompt(array $body, string $lang): string
{
    $skills = is_array($body['skills'] ?? null) ? implode(', ', $body['skills']) : 'None';
    $experience = is_array($body['experience'] ?? null) ? implode(', ', $body['experience']) : 'None';
    $education = is_array($body['education'] ?? null) ? implode(', ', $body['education']) : 'None';
    $achievements = is_array($body['achievements'] ?? null) ? implode(', ', $body['achievements']) : 'None';
    $gaps = is_array($body['skillGaps'] ?? null) ? implode(', ', $body['skillGaps']) : 'None';

    $languageInstruction = $lang === 'tl'
        ? 'Write all roadmap steps in Tagalog/Filipino.'
        : 'Write all roadmap steps in English.';

    return <<<PROMPT
You are a gender-neutral career counselor for PESO Lipa City, Batangas.
Use only inclusive language: address the job seeker as "you" (or "ikaw" in Tagalog). Never use he/she, sir/ma'am, or gendered titles.
{$languageInstruction}

Create a market-aligned 4-step career roadmap for Lipa City and Batangas employers (LIMA Technology Center, BPOs, TESDA Lipa, PESO Lipa).

Job seeker profile:
- Skills: {$skills}
- Experience: {$experience}
- Education: {$education}
- Achievements: {$achievements}
- Skill gaps to close: {$gaps}

Each step must be actionable, mention local Lipa/Batangas opportunities where relevant, and focus on closing the listed gaps.

Return JSON only:
{"roadmap":["step 1","step 2","step 3","step 4"]}
PROMPT;
}

function geminiJobGapRoadmapPrompt(array $body, string $lang): string
{
    $gaps = is_array($body['gaps'] ?? null) ? implode(', ', $body['gaps']) : 'None';
    $jobTitle = $body['jobTitle'] ?? 'Local role';
    $company = $body['company'] ?? 'Lipa City employer';
    $location = $body['location'] ?? 'Lipa City, Batangas';

    $languageInstruction = $lang === 'tl'
        ? 'Write all text in Tagalog/Filipino.'
        : 'Write all text in English.';

    return <<<PROMPT
You are a gender-neutral PESO Lipa career advisor.
{$languageInstruction}
Use only "you" / "ikaw" — never he/she or gendered titles.

Job: "{$jobTitle}" at "{$company}" in "{$location}".
Skill gaps to address: {$gaps}

For EACH skill gap, give simple upskilling guidance a non-technical person can follow.
Use VARIED resources — not only TESDA/PESO/YouTube. Mix: free online courses (Coursera, Khan Academy, Google Skills), practice projects, books, local libraries, employer OJT, community programs, LinkedIn Learning free trials, documentation sites, etc.
Mention Lipa/Batangas context when relevant but include national/global free resources too.

Return JSON only:
{
  "gapRoadmaps": [
    {
      "skill": "exact gap skill name",
      "marketTrend": "1-2 short simple sentences why employers in Lipa/Batangas want this skill",
      "steps": [
        {
          "title": "Short action title",
          "detail": "Plain-language explanation (max 2 sentences)",
          "linkLabel": "Button text for link",
          "linkUrl": "https://valid-full-url",
          "resourceType": "online_course|video|practice|book|local|free_tool|community"
        }
      ]
    }
  ]
}
Include exactly one gapRoadmaps entry per gap. Provide 2-4 steps per gap with real helpful URLs.
PROMPT;
}

function geminiLandingChatPrompt(array $messages, string $lang): string
{
    $languageInstruction = $lang === 'tl'
        ? 'Reply ONLY in Tagalog/Filipino. Use simple, friendly words.'
        : 'Reply ONLY in English. Use simple, friendly words.';

    $history = '';
    foreach (array_slice($messages, -10) as $m) {
        $role = ($m['role'] ?? '') === 'user' ? 'User' : 'Assistant';
        $content = trim((string) ($m['content'] ?? ''));
        if ($content !== '') {
            $history .= "{$role}: {$content}\n";
        }
    }

    return <<<PROMPT
You are the PESOLUTION Help Assistant on the public landing page for PESO Lipa City, Batangas.
{$languageInstruction}
Use gender-neutral language (you / ikaw). Never use sir/ma'am or he/she.

ONLY answer questions about:
- PESOLUTION website features and how to use them
- Job matching, skill gaps, PESOLUTION Insights, career roadmaps
- Registration, login, applicant / employer / PESO admin portals
- Lipa City employment context (LIMA, BPOs, TESDA, PESO Lipa) when relevant

Do NOT give medical, legal, or unrelated advice. If off-topic, politely redirect to PESOLUTION topics.

WEBSITE KNOWLEDGE (accurate):
- PESOLUTION: Official Lipa City talent portal connecting job seekers with local employers.
- Applicants: Register at /register, log in at /login, complete Profile (school, work, skills), browse Job Search, see match % and PESOLUTION Insights per job with learning links for skill gaps.
- Dashboard: Simple 3-step guide — update profile, check match score, open jobs for learning plans.
- PESOLUTION Insights: Shows skills you have vs gaps; per-gap roadmap with clickable resources (courses, videos, practice, local programs) powered by Gemini AI.
- Saved Jobs, Applications tracker, Urgent Forum for fast-hire roles.
- Employer portal: /employer-portal — employers post jobs and review applicants.
- PESO Admin: /peso-portal — government staff manage the system.
- Dark/light mode and English/Tagalog in header and sidebar.
- Demo login: applicant@demo.com / password123 (if asked).

Keep answers short (2-5 sentences unless user asks for detail). Be helpful for non-technical users.

Conversation:
{$history}

Return JSON only: {"reply":"your answer here"}
PROMPT;
}

function fallbackLandingChatReply(string $userMessage, string $lang): string
{
    $q = strtolower($userMessage);

    $en = [
        'register' => 'Click "Sign Up" on this page or go to Register. Create an applicant account, then complete your Profile with school, work, and skills so matching works.',
        'login' => 'Use Log In at the top. Applicants use /login. Employers use the Employer Portal; PESO staff use the PESO Admin portal.',
        'match' => 'PESOLUTION scores how well your profile fits each job. Green skills are strengths; gaps show what to learn. Open a job to see PESOLUTION Insights and learning links.',
        'insight' => 'PESOLUTION Insights appear on job cards and job details. They list matched skills, gaps, and a step-by-step learning plan with Open resource links.',
        'employer' => 'Employers use the Employer Portal (/employer-portal) to post jobs and review candidates.',
        'admin' => 'PESO staff use the PESO Admin portal (/peso-portal) to manage the system.',
        'language' => 'Switch English or Tagalog using the language button in the header (landing) or sidebar (after login).',
        'theme' => 'Toggle Dark Mode or Light Mode with the sun/moon button in the header or sidebar.',
        'default' => 'PESOLUTION helps Lipeños find jobs in Lipa City with skill matching and learning plans. Try: register, complete your profile, browse jobs, and open PESOLUTION Insights. What would you like to know?',
    ];

    $tl = [
        'register' => 'Pindutin ang "Sign Up" o mag-register. Gumawa ng applicant account, tapos kumpletuhin ang Profile (school, trabaho, skills) para gumana ang matching.',
        'login' => 'Gamitin ang Log In sa taas. Applicants: /login. Employers: Employer Portal. PESO staff: PESO Admin portal.',
        'match' => 'Sinusukat ng PESOLUTION kung gaano ka tugma sa trabaho. Ang gaps ay skills na puwede mong pag-aralan. Buksan ang trabaho para sa PESOLUTION Insights at mga link.',
        'insight' => 'Ang PESOLUTION Insights ay nasa job cards at job details — matched skills, gaps, at learning plan na may Open resource links.',
        'employer' => 'Ang employers ay gumagamit ng Employer Portal (/employer-portal) para mag-post ng trabaho.',
        'admin' => 'Ang PESO staff ay gumagamit ng PESO Admin portal (/peso-portal).',
        'language' => 'Palitan ang English o Tagalog sa language button sa header o sidebar.',
        'theme' => 'I-toggle ang Dark/Light Mode sa sun/moon button sa header o sidebar.',
        'default' => 'Tumutulong ang PESOLUTION sa mga taga-Lipa na makahanap ng trabaho gamit ang skill matching at learning plans. Ano ang gusto mong malaman?',
    ];

    $map = $lang === 'tl' ? $tl : $en;

    if (preg_match('/register|sign up|sign-up|account|gumawa/i', $q)) {
        return $map['register'];
    }
    if (preg_match('/login|sign in|mag-sign/i', $q)) {
        return $map['login'];
    }
    if (preg_match('/match|score|percent|tugma/i', $q)) {
        return $map['match'];
    }
    if (preg_match('/insight|roadmap|gap|learn|kurso|resource/i', $q)) {
        return $map['insight'];
    }
    if (preg_match('/employer|company|boss/i', $q)) {
        return $map['employer'];
    }
    if (preg_match('/admin|peso|government/i', $q)) {
        return $map['admin'];
    }
    if (preg_match('/tagalog|english|language|wika/i', $q)) {
        return $map['language'];
    }
    if (preg_match('/dark|light|theme|mode/i', $q)) {
        return $map['theme'];
    }
    if (preg_match('/what is|ano ang|features|function|paano|how/i', $q)) {
        return $lang === 'tl'
            ? 'Ang PESOLUTION ay portal ng PESO Lipa para sa job matching, skill gaps, at learning links. May Job Search, Profile, Applications, Saved Jobs, Urgent Forum, at AI Insights bawat trabaho.'
            : 'PESOLUTION is the PESO Lipa job portal with skill matching, gap analysis, and learning links. Features include Job Search, Profile, Applications, Saved Jobs, Urgent Forum, and AI Insights on each job.';
    }

    return $map['default'];
}

function fallbackJobGapRoadmaps(array $gaps, string $lang): array
{
    $roadmaps = [];
    foreach ($gaps as $gap) {
        $skill = is_string($gap) ? $gap : (string) $gap;
        if ($skill === '') {
            continue;
        }
        $roadmaps[] = [
            'skill' => $skill,
            'marketTrend' => $lang === 'tl'
                ? "Ang {$skill} ay hinahanap ng mga employer sa Lipa at Batangas. Mas tataas ang match score mo kapag may basic na kakayahan dito."
                : "{$skill} is commonly required in Lipa and Batangas. Building this skill improves your chances of getting hired.",
            'steps' => $lang === 'tl'
                ? [
                    [
                        'title' => 'Libreng online na kurso',
                        'detail' => "Maghanap ng libreng intro course para sa {$skill}. Maaaring Coursera (audit free), Khan Academy, o Google Skills.",
                        'linkLabel' => 'Maghanap ng libreng kurso',
                        'linkUrl' => 'https://www.coursera.org/courses?query=free',
                        'resourceType' => 'online_course',
                    ],
                    [
                        'title' => 'Praktikal na pagsasanay',
                        'detail' => "Gumawa ng maliit na project o volunteer work na gumagamit ng {$skill} araw-araw.",
                        'linkLabel' => 'GitHub Skills (kung tech)',
                        'linkUrl' => 'https://skills.github.com/',
                        'resourceType' => 'practice',
                    ],
                    [
                        'title' => 'Suporta sa Lipa',
                        'detail' => 'PESO, TESDA, library, o community programs — pumili ng pinaka-angkop sa budget at schedule mo.',
                        'linkLabel' => 'Lipa City portal',
                        'linkUrl' => 'https://lipa.gov.ph/',
                        'resourceType' => 'local',
                    ],
                ]
                : [
                    [
                        'title' => 'Free online course',
                        'detail' => "Search for a free intro course on {$skill} (Coursera audit, Khan Academy, Google Career Certificates, etc.).",
                        'linkLabel' => 'Browse free courses',
                        'linkUrl' => 'https://www.coursera.org/courses?query=free',
                        'resourceType' => 'online_course',
                    ],
                    [
                        'title' => 'Practice in real life',
                        'detail' => "Create a small project or volunteer task that uses {$skill} so you can show proof on your profile.",
                        'linkLabel' => 'GitHub Skills (tech roles)',
                        'linkUrl' => 'https://skills.github.com/',
                        'resourceType' => 'practice',
                    ],
                    [
                        'title' => 'Local & community options',
                        'detail' => 'PESO Lipa, TESDA, libraries, or barangay programs may help — pick what fits your time and budget.',
                        'linkLabel' => 'Lipa City portal',
                        'linkUrl' => 'https://lipa.gov.ph/',
                        'resourceType' => 'local',
                    ],
                ],
        ];
    }
    return $roadmaps;
}
