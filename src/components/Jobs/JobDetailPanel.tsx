import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  X,
  Building2,
  Send,
  Loader2,
  Target,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react';
import { Job } from './JobCard';
import { getJobGapRoadmap, GapRoadmap } from '../../services/geminiService';
import { useLanguage } from '../../contexts/LanguageContext';
import { useBookmarks } from '../../contexts/BookmarkContext';
import { useProfile } from '../../contexts/ProfileContext';
import { useToast } from '../../contexts/ToastContext';
import PesoInsightsPanel from './PesoInsightsPanel';
import { cn } from '../../lib/utils';

interface JobDetailPanelProps {
  job: Job | null;
  onClose: () => void;
}

export default function JobDetailPanel({ job, onClose }: JobDetailPanelProps) {
  const { t, language } = useLanguage();
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { profile } = useProfile();
  const { showToast } = useToast();
  const [gapRoadmaps, setGapRoadmaps] = useState<GapRoadmap[]>([]);
  const [perfectMatchMsg, setPerfectMatchMsg] = useState<string | null>(null);
  const [loadingRecs, setLoadingRecs] = useState(false);
  const [applying, setApplying] = useState(false);

  const bookmarked = job ? isBookmarked(job.id) : false;

  const matchedSkills = job
    ? job.tags.filter(tag => {
        if (!profile) return false;
        const skill = profile.skills.some(s => s.name.toLowerCase().includes(tag.toLowerCase()));
        const exp = profile.experience.some(e => e.title.toLowerCase().includes(tag.toLowerCase()));
        const ach = profile.achievements.some(a => a.title.toLowerCase().includes(tag.toLowerCase()));
        return skill || exp || ach;
      })
    : [];

  const skillGaps = job ? job.tags.filter(tag => !matchedSkills.includes(tag)) : [];

  const calculateLiveScore = () => {
    if (!job || !profile) return job?.matchScore || 0;
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

  useEffect(() => {
    if (!job) {
      setGapRoadmaps([]);
      setPerfectMatchMsg(null);
      return;
    }
    const fetchRoadmaps = async () => {
      setLoadingRecs(true);
      setPerfectMatchMsg(null);
      try {
        const result = await getJobGapRoadmap(skillGaps, job.title, {
          company: job.company,
          location: job.location,
          language,
        });
        setGapRoadmaps(result.gapRoadmaps);
        if (result.message) setPerfectMatchMsg(result.message);
      } catch (error) {
        console.error('Roadmap error:', error);
      } finally {
        setLoadingRecs(false);
      }
    };
    fetchRoadmaps();
  }, [job?.id, language, profile?.id]);

  if (!job) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end sm:items-stretch justify-end pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm pointer-events-auto"
        />
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-xl bg-white dark:bg-slate-900 shadow-2xl flex flex-col h-full pointer-events-auto"
        >
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 sticky top-0 z-10 shrink-0">
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              aria-label={t('close')}
            >
              <ArrowLeft size={20} className="dark:text-white" />
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => job && toggleBookmark(job.id)}
                className={cn(
                  'p-2 rounded-full transition-all',
                  bookmarked
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400'
                )}
              >
                {bookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
              </button>
              <div
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5',
                  liveScore >= 85
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20'
                    : liveScore >= 70
                      ? 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20'
                      : 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20'
                )}
              >
                <Target size={12} /> {t('match')}: {liveScore}%
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                <X size={20} className="dark:text-white" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
            <div>
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                <Building2 size={28} />
              </div>
              <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">{job.title}</h2>
              <p className="text-slate-500 mt-1">
                {job.company} · {job.location}
              </p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{t('salaryRange')}</p>
                  <p className="font-bold text-slate-900 dark:text-white text-sm mt-1">{job.salary}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{t('positionType')}</p>
                  <p className="font-bold text-slate-900 dark:text-white text-sm mt-1">{job.type}</p>
                </div>
              </div>
            </div>

            <section>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{t('roleOverview')}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{job.description}</p>
            </section>

            <PesoInsightsPanel
              matchedSkills={matchedSkills}
              skillGaps={skillGaps}
              gapRoadmaps={gapRoadmaps}
              loadingRoadmap={loadingRecs}
              perfectMatchMsg={perfectMatchMsg}
            />

            <button
              onClick={async () => {
                setApplying(true);
                setTimeout(() => {
                  setApplying(false);
                  showToast(t('applicationSent'), 'success');
                  onClose();
                }, 1500);
              }}
              disabled={applying}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50"
            >
              {applying ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              {t('applyNow')}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
