import { API_BASE } from '../lib/api';

export interface RoadmapStep {
  title: string;
  detail: string;
  linkLabel?: string;
  linkUrl?: string;
  resourceType?: string;
}

export interface GapRoadmap {
  skill: string;
  marketTrend: string;
  steps: RoadmapStep[];
}

function normalizeSteps(steps: unknown[]): RoadmapStep[] {
  return steps.map((s, i) => {
    if (typeof s === 'string') {
      return { title: `Step ${i + 1}`, detail: s };
    }
    if (s && typeof s === 'object') {
      const o = s as Record<string, unknown>;
      return {
        title: String(o.title || `Step ${i + 1}`),
        detail: String(o.detail || o.description || ''),
        linkLabel: o.linkLabel ? String(o.linkLabel) : undefined,
        linkUrl: o.linkUrl ? String(o.linkUrl) : undefined,
        resourceType: o.resourceType ? String(o.resourceType) : undefined,
      };
    }
    return { title: `Step ${i + 1}`, detail: '' };
  });
}

function normalizeGapRoadmaps(raw: unknown[]): GapRoadmap[] {
  return raw.map(item => {
    const o = item as Record<string, unknown>;
    const steps = Array.isArray(o.steps) ? normalizeSteps(o.steps) : [];
    return {
      skill: String(o.skill || ''),
      marketTrend: String(o.marketTrend || ''),
      steps,
    };
  });
}

/**
 * Market-aligned Lipa City roadmap per skill gap (Gemini via PHP API).
 */
export async function getJobGapRoadmap(
  gaps: string[],
  jobTitle: string,
  options?: { company?: string; location?: string; language?: 'en' | 'tl' }
): Promise<{ gapRoadmaps: GapRoadmap[]; message?: string }> {
  const language = options?.language ?? 'en';

  if (gaps.length === 0) {
    return {
      gapRoadmaps: [],
      message:
        language === 'tl'
          ? 'Perpekto ang iyong mga kasanayan para sa trabahong ito!'
          : 'You have a perfect match for this role!',
    };
  }

  try {
    const response = await fetch(`${API_BASE}/ai/recommendations`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gaps,
        jobTitle,
        company: options?.company ?? '',
        location: options?.location ?? 'Lipa City, Batangas',
        language,
      }),
    });

    if (!response.ok) {
      throw new Error('Server error');
    }

    const data = await response.json();
    return {
      gapRoadmaps: Array.isArray(data.gapRoadmaps) ? normalizeGapRoadmaps(data.gapRoadmaps) : [],
      message: data.message,
    };
  } catch (error) {
    console.error('Job gap roadmap error:', error);
    return { gapRoadmaps: buildFallbackRoadmaps(gaps, language) };
  }
}

function buildFallbackRoadmaps(gaps: string[], language: 'en' | 'tl'): GapRoadmap[] {
  return gaps.map(skill => ({
    skill,
    marketTrend:
      language === 'tl'
        ? `Ang ${skill} ay hinahanap ng mga kumpanya sa Lipa at Batangas. Mas maganda ang tsansa mo kapag may basic na kakayahan dito.`
        : `${skill} is commonly required by employers in Lipa and Batangas. Building this skill improves your job chances.`,
    steps:
      language === 'tl'
        ? [
            {
              title: 'Libreng online na aralin',
              detail: `Maghanap ng libreng intro course sa ${skill} (hal. Coursera, Khan Academy, o Google Skills).`,
              linkLabel: 'Coursera — libreng courses',
              linkUrl: 'https://www.coursera.org/courses?query=free',
              resourceType: 'online_course',
            },
            {
              title: 'Praktikal na pagsasanay',
              detail: `Gumawa ng maliit na practice project o volunteer task na gumagamit ng ${skill}.`,
              linkLabel: 'GitHub Learning (kung tech)',
              linkUrl: 'https://skills.github.com/',
              resourceType: 'practice',
            },
            {
              title: 'Local na suporta',
              detail: 'Maaari ring tumulong ang PESO Lipa, TESDA, o municipal library programs — pumili ng pinaka-angkop sa iyo.',
              linkLabel: 'PESO Lipa City',
              linkUrl: 'https://lipa.gov.ph/',
              resourceType: 'local',
            },
          ]
        : [
            {
              title: 'Free online learning',
              detail: `Find a free introductory course for ${skill} (Coursera audit, Khan Academy, Google Career Certificates, etc.).`,
              linkLabel: 'Browse free courses',
              linkUrl: 'https://www.coursera.org/courses?query=free',
              resourceType: 'online_course',
            },
            {
              title: 'Hands-on practice',
              detail: `Build a small practice project or volunteer task that uses ${skill} in real life.`,
              linkLabel: 'GitHub Skills (for tech roles)',
              linkUrl: 'https://skills.github.com/',
              resourceType: 'practice',
            },
            {
              title: 'Local support options',
              detail: 'PESO Lipa, TESDA, libraries, or community programs may help — choose what fits your schedule and budget.',
              linkLabel: 'Lipa City government portal',
              linkUrl: 'https://lipa.gov.ph/',
              resourceType: 'local',
            },
          ],
  }));
}

/**
 * Extracts resume information (backend proxy).
 */
export async function extractResumeData(text: string) {
  try {
    const response = await fetch(`${API_BASE}/ai/extract`, {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || 'Server error');
    }

    return await response.json();
  } catch (error) {
    console.error('Extraction error (Proxy):', error);
    return null;
  }
}
