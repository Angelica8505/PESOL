import React from 'react';
import {
  Building2,
  MapPin,
  Briefcase,
  CircleDollarSign,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useBookmarks } from '../../contexts/BookmarkContext';
import { useProfile } from '../../contexts/ProfileContext';
import { useLanguage } from '../../contexts/LanguageContext';
import PesoInsightsPanel from './PesoInsightsPanel';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  matchScore: number;
  tags: string[];
  userSkills: string[];
  gaps: string[];
  description: string;
  isUrgent?: boolean;
  posted?: string;
}

export interface JobCardProps {
  job: Job;
  onClick: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { profile } = useProfile();
  const { t } = useLanguage();
  const bookmarked = isBookmarked(job.id);

  const matchedSkills = job.tags.filter(tag => {
    if (!profile) return false;
    const skill = profile.skills.some(s => s.name.toLowerCase().includes(tag.toLowerCase()));
    const exp = profile.experience.some(e => e.title.toLowerCase().includes(tag.toLowerCase()));
    const ach = profile.achievements.some(a => a.title.toLowerCase().includes(tag.toLowerCase()));
    return skill || exp || ach;
  });

  const skillGaps = job.tags.filter(tag => !matchedSkills.includes(tag));

  const calculateLiveScore = () => {
    if (!profile) return 0;
    const SBASE = 60;
    const C = 8;
    const N = Math.max(1, job.tags.length);
    let totalBoost = 0;
    job.tags.forEach(tag => {
      const direct = profile.skills.find(s => s.name.toLowerCase().includes(tag.toLowerCase()));
      let L = direct ? direct.level : 0;
      if (L === 0) {
        if (profile.experience.some(e => e.title.toLowerCase().includes(tag.toLowerCase()))) L = 3;
        if (profile.achievements.some(a => a.title.toLowerCase().includes(tag.toLowerCase()))) L = 3;
      }
      totalBoost += L * C;
    });
    return Math.min(100, Math.round(SBASE + totalBoost / N));
  };

  const liveScore = calculateLiveScore();

  const getScoreColor = (score: number) => {
    if (score >= 85)
      return 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800';
    if (score >= 70)
      return 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800';
    return 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800';
  };

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      className={cn(
        'group bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 transition-all cursor-pointer',
        'hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg'
      )}
    >
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="flex gap-3 min-w-0 flex-1">
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-500 shrink-0">
            <Building2 size={24} />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white truncate">{job.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {job.company} · {job.location}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              toggleBookmark(job.id);
            }}
            className={cn(
              'p-2 rounded-xl border transition-colors',
              bookmarked
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
            )}
            aria-label={bookmarked ? t('unbookmarkJob') : t('bookmarkJob')}
          >
            {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          </button>
          <div
            className={cn(
              'px-3 py-2 rounded-xl border text-center min-w-[52px]',
              getScoreColor(liveScore)
            )}
          >
            <span className="text-lg font-black leading-none">{liveScore}%</span>
            <p className="text-[9px] font-bold uppercase mt-0.5">{t('match')}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300">
          <Briefcase size={12} /> {job.type}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300">
          <CircleDollarSign size={12} /> {job.salary}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs text-slate-500">
          <MapPin size={12} /> {job.posted || t('jobNew')}
        </span>
      </div>

      <PesoInsightsPanel
        matchedSkills={matchedSkills}
        skillGaps={skillGaps}
        compact
        showRoadmapPreview={false}
        onViewDetails={onClick}
      />
    </div>
  );
};

export default JobCard;
