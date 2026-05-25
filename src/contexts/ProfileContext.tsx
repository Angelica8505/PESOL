import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { api, API_BASE, handleApiError } from '../lib/api';

export interface Skill {
  id: string;
  name: string;
  level: number;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
}

export interface FullProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  about: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  achievements: Achievement[];
}

interface ProfileContextType {
  profile: FullProfile | null;
  loading: boolean;
  saveProfile: (data: Partial<FullProfile>) => Promise<void>;
  updateLocalProfile: (data: Partial<FullProfile>) => void;
  refreshProfile: () => Promise<void>;
  matchStats: {
    avgScore: number;
    skillGaps: string[];
    roadmap: string[];
    proficiencies: string[];
  };
  aiRoadmap: string[];
  loadingRoadmap: boolean;
  fetchAiRoadmap: (lang?: 'en' | 'tl') => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<FullProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [matchStats, setMatchStats] = useState({
    avgScore: 0,
    skillGaps: [] as string[],
    roadmap: [] as string[],
    proficiencies: [] as string[],
  });
  const [aiRoadmap, setAiRoadmap] = useState<string[]>([]);
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);
  const fetchAiRoadmap = React.useCallback(async (lang: 'en' | 'tl' = 'en') => {
    if (!profile) return;
    setLoadingRoadmap(true);
    try {
      const skillsList = profile.skills.map(s => `${s.name} (level ${s.level})`);
      const expList = profile.experience.map(e => `${e.title} at ${e.company}`);
      const eduList = profile.education.map(e => `${e.degree} from ${e.school}`);
      const achList = profile.achievements.map(a => a.title);

      const response = await fetch(`${API_BASE}/ai/roadmap`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skills: skillsList,
          experience: expList,
          education: eduList,
          achievements: achList,
          skillGaps: matchStats.skillGaps,
          language: lang,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.roadmap)) {
          setAiRoadmap(data.roadmap);
        }
      } else {
        console.error('AI roadmap response not OK');
      }
    } catch (err) {
      console.error('Error fetching AI roadmap:', err);
    } finally {
      setLoadingRoadmap(false);
    }
  }, [profile, matchStats.skillGaps]);

  const calculateStats = React.useCallback((p: FullProfile) => {
    const SBASE = 60;
    const C = 8;

    const marketRequirements = [
      'excel', 'sql', 'python', 'tableau', 'data viz', 'react', 'networking',
    ];
    const N = marketRequirements.length;

    const getSkillLevel = (skillName: string): number => {
      const directSkill = p.skills.find(s =>
        s.name.toLowerCase().includes(skillName.toLowerCase())
      );
      if (directSkill) return directSkill.level;

      const hasExp = p.experience.some(e =>
        e.title.toLowerCase().includes(skillName.toLowerCase())
      );
      if (hasExp) return 3;

      const hasAch = p.achievements.some(a =>
        a.title.toLowerCase().includes(skillName.toLowerCase())
      );
      if (hasAch) return 3;

      return 0;
    };

    let totalBoostPoints = 0;
    const proficiencies: string[] = [];
    const skillGaps: string[] = [];
    const roadmap: string[] = [];

    marketRequirements.forEach(req => {
      const L = getSkillLevel(req);
      totalBoostPoints += L * C;

      const REQUIRED_LEVEL = 3;
      const gap = REQUIRED_LEVEL - L;

      if (L > 0) proficiencies.push(req);

      if (gap > 0) {
        skillGaps.push(req);
        roadmap.push(
          `[GAP: ${gap} FOUND] Target Proficiency: ${REQUIRED_LEVEL}. Requirement: ${req.toUpperCase()}. Action: Enroll in the PESO Lipa Skill-Boost Hub to close this gap and increase your score by ${gap * 8}%.`
        );
      }
    });

    const Btotal = totalBoostPoints / N;
    const Sfinal = Math.min(100, Math.round(SBASE + Btotal));

    setMatchStats({
      avgScore: Sfinal,
      skillGaps,
      roadmap,
      proficiencies,
    });
  }, []);

  useEffect(() => {
    if (profile) {
      calculateStats(profile);
    }
  }, [profile, calculateStats]);

  const refreshProfile = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await api.get<{ profile: FullProfile }>('profile');

      if (data.profile) {
        setProfile(data.profile);
      } else {
        setProfile({
          id: user.id,
          name: user.name || 'User',
          email: user.email || '',
          phone: '',
          location: '',
          about: '',
          skills: [],
          experience: [],
          education: [],
          achievements: [],
        });
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      handleApiError(error, 'profile');
    } finally {
      setLoading(false);
    }
  };

  const updateLocalProfile = (data: Partial<FullProfile>) => {
    setProfile(prev => (prev ? { ...prev, ...data } : null));
  };

  const saveProfile = async (data: Partial<FullProfile>) => {
    if (!user) return;
    try {
      setLoading(true);
      const updatedProfile = { ...profile, ...data } as FullProfile;
      const result = await api.put<{ profile: FullProfile }>('profile', updatedProfile);
      setProfile(result.profile);
    } catch (error) {
      console.error('Failed to save profile:', error);
      handleApiError(error, 'profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      refreshProfile();
    } else {
      setProfile(null);
      setAiRoadmap([]);
      setLoading(false);
    }
  }, [user]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        saveProfile,
        updateLocalProfile,
        refreshProfile,
        matchStats,
        aiRoadmap,
        loadingRoadmap,
        fetchAiRoadmap,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
