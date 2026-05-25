import React, { useState, useMemo } from 'react';
import {
  Zap,
  Filter,
  ChevronRight,
  Flame,
  Clock,
  Building2,
  CircleDollarSign,
  ArrowRight,
  Target,
  Menu,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import Sidebar from '../../components/Layout/Sidebar';
import { cn } from '../../lib/utils';
import JobDetailPanel from '../../components/Jobs/JobDetailPanel';
import { Job } from '../../components/Jobs/JobCard';

export default function Forum() {
  const { t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const forumJobs: Job[] = useMemo(
    () => [
      {
        id: 'f1',
        title: 'Urgent: Warehouse Inventory Clerk',
        company: 'Sabang Logistics',
        location: 'Sabang, Lipa City',
        salary: '₱15,000 - ₱18,000',
        type: 'Full-time',
        matchScore: 88,
        tags: ['Basic Excel', 'Fresh Grads OK'],
        userSkills: ['Basic Excel'],
        gaps: ['Inventory Management'],
        description: t('forumJob1Desc'),
        isUrgent: true,
      },
      {
        id: 'f2',
        title: 'Urgent: Technical Support Representative',
        company: 'SM Lipa Tech',
        location: 'SM Lipa',
        salary: '₱22,000 + Benefits',
        type: 'Full-time',
        matchScore: 72,
        tags: ['Customer Service', 'IT Graduate'],
        userSkills: ['IT Graduate'],
        gaps: ['Customer Service'],
        description: t('forumJob2Desc'),
        isUrgent: true,
      },
      {
        id: 'f3',
        title: 'Urgent: Junior Welder (TESDA NC-II)',
        company: 'LIMA Metalworks',
        location: 'LIMA, Malvar',
        salary: '₱18,000 - ₱25,000',
        type: 'Full-time',
        matchScore: 95,
        tags: ['Welding', 'Safety Certified'],
        userSkills: ['Welding', 'Safety Certified'],
        gaps: [],
        description: t('forumJob3Desc'),
        isUrgent: true,
      },
    ],
    [t]
  );

  const filteredJobs = urgentOnly ? forumJobs.filter(j => j.isUrgent) : forumJobs;

  return (
    <div className="flex h-screen bg-[#f4f6fb] dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all"
              aria-label={t('menuButton')}
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center">
                <Flame size={20} />
              </div>
              <h1 className="text-xl font-display font-bold text-slate-900 dark:text-white">{t('urgentTitle')}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-full">
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              {t('positionsFillingNow', { count: String(filteredJobs.length) })}
            </span>
          </div>
        </header>

        <div className="p-8 space-y-8 overflow-y-auto">
          <div
            className={cn(
              'rounded-[32px] p-8 text-white relative overflow-hidden transition-all duration-500',
              urgentOnly
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 shadow-2xl shadow-emerald-500/20'
                : 'bg-gradient-to-r from-amber-500 to-orange-600'
            )}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/2" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-display font-bold mb-2 flex items-center gap-2">
                  {urgentOnly ? <Target size={28} /> : <Zap size={28} />}
                  {urgentOnly ? t('priorityModeActive') : t('emergencyMatches')}
                </h2>
                <p className="text-amber-50 max-w-xl">
                  {urgentOnly ? t('urgentBannerDescAll') : t('urgentBannerDesc')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setUrgentOnly(!urgentOnly)}
                className={cn(
                  'px-6 py-3 rounded-2xl font-bold transition-all shadow-xl whitespace-nowrap active:scale-95',
                  urgentOnly ? 'bg-white text-emerald-600 hover:bg-emerald-50' : 'bg-white text-amber-600 hover:bg-amber-50'
                )}
              >
                {urgentOnly ? t('showAllJobs') : t('toggleUrgentFilter')}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredJobs.map(job => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-200 dark:border-slate-800 hover:border-amber-400 group transition-all cursor-pointer active:scale-[0.99]"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-amber-500 transition-colors shrink-0">
                      <Building2 size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white group-hover:text-amber-600 transition-all">
                          {job.title}
                        </h3>
                        <span className="px-2 py-0.5 bg-amber-50 dark:bg-amber-900/30 text-amber-600 text-[9px] font-bold rounded uppercase">
                          {t('highPriority')}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{job.company}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {job.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-[10px] font-bold rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1 justify-end">
                        <CircleDollarSign size={14} className="text-emerald-500" /> {job.salary}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1 justify-end mt-1">
                        <Clock size={10} /> {t('postedRecent')}
                      </p>
                    </div>
                    <span className="flex items-center gap-2 text-blue-600 font-bold text-xs group-hover:translate-x-1 transition-transform">
                      {t('viewAndApply')} <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <JobDetailPanel job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  );
}
