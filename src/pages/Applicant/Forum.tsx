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
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { cn } from '../../lib/utils';
import JobDetailPanel from '../../components/Jobs/JobDetailPanel';
import { Job } from '../../components/Jobs/JobCard';

export default function Forum() {
  const { t } = useLanguage();
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
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Flame size={28} />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{t('urgentTitle')}</p>
              <h1 className="mt-2 text-3xl font-display font-bold text-slate-900">{t('urgentTitle')}</h1>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-amber-700">
            {t('positionsFillingNow', { count: String(filteredJobs.length) })}
          </span>
        </div>
      </section>

      <section
        className={cn(
          'rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl transition-all duration-500',
          urgentOnly
            ? 'bg-gradient-to-r from-emerald-600 to-teal-700 shadow-emerald-500/20'
            : 'bg-gradient-to-r from-amber-500 to-orange-600 shadow-orange-500/20'
        )}
      >
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 translate-x-1/3 -translate-y-1/2" />
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-display font-bold flex items-center gap-3">
              {urgentOnly ? <Target size={28} /> : <Zap size={28} />}
              {urgentOnly ? t('priorityModeActive') : t('emergencyMatches')}
            </h2>
            <p className="mt-3 max-w-2xl text-amber-100">
              {urgentOnly ? t('urgentBannerDescAll') : t('urgentBannerDesc')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setUrgentOnly(!urgentOnly)}
            className={cn(
              'rounded-3xl px-6 py-3 text-sm font-bold transition shadow-xl active:scale-[0.99]',
              urgentOnly ? 'bg-white text-emerald-600 hover:bg-emerald-50' : 'bg-white text-amber-600 hover:bg-amber-50'
            )}
          >
            {urgentOnly ? t('showAllJobs') : t('toggleUrgentFilter')}
          </button>
        </div>
      </section>

      <section className="space-y-4">
        {filteredJobs.map((job) => (
          <button
            key={job.id}
            type="button"
            onClick={() => setSelectedJob(job)}
            className="w-full rounded-[32px] border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition group-hover:text-amber-500">
                  <Building2 size={24} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-display font-bold text-slate-900">{job.title}</h3>
                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.35em] text-amber-600">
                      {t('highPriority')}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-slate-500">{job.company}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-semibold text-slate-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-4 md:items-end">
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900 flex items-center gap-1">
                    <CircleDollarSign size={14} className="text-emerald-500" /> {job.salary}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock size={10} /> {t('postedRecent')}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-blue-600 font-bold text-xs">
                  {t('viewAndApply')} <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </button>
        ))}
      </section>

      <JobDetailPanel job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  );
}
