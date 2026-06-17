import React, { useState, useMemo } from 'react';
import {
  Clock,
  ArrowRight,
  Zap,
  Info,
  MoreVertical,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

type AppStatus = 'shortlisted' | 'reviewing' | 'rejected';

export default function Applications() {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const applications = useMemo(
    () => [
      {
        id: 1,
        jobTitle: 'Junior Data Analyst',
        company: 'LIMA Technology Center',
        status: 'shortlisted' as AppStatus,
        date: 'May 1, 2026',
        score: 92,
        gaps: ['Python', 'Tableau'],
        feedbackKey: 'feedbackApp1' as const,
      },
      {
        id: 2,
        jobTitle: 'IT Support Technician',
        company: 'City Hall Annex',
        status: 'reviewing' as AppStatus,
        date: 'Apr 28, 2026',
        score: 85,
        gaps: ['Windows Server'],
        feedbackKey: null,
      },
      {
        id: 3,
        jobTitle: 'Network Engineer',
        company: 'PLDT Lipa',
        status: 'rejected' as AppStatus,
        date: 'Apr 15, 2026',
        score: 42,
        gaps: ['CISCO Certification', 'Network Security'],
        feedbackKey: 'feedbackApp3' as const,
      },
    ],
    []
  );

  const statusLabel: Record<AppStatus, string> = {
    shortlisted: t('statusShortlisted'),
    reviewing: t('statusReviewing'),
    rejected: t('statusRejected'),
  };

  const getStatusStyle = (status: AppStatus) => {
    switch (status) {
      case 'shortlisted':
        return 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border-emerald-100 dark:border-emerald-800';
      case 'reviewing':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 border-blue-100 dark:border-blue-800';
      case 'rejected':
        return 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 border-rose-100 dark:border-rose-800';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{t('applications')}</p>
            <h1 className="mt-2 text-3xl font-display font-bold text-slate-900">{t('manageApplications') || 'Manage your applications'}</h1>
            <p className="mt-2 text-sm text-slate-500">Track application status, employer feedback, and next steps.</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-blue-700 border border-blue-100">
            {applications.length} {t('totalSubmissions')}
          </span>
        </div>
      </section>

      <div className="space-y-6">
        {applications.map((app) => (
          <div
            key={app.id}
            className={cn(
              'bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all hover:shadow-md',
              expandedId === app.id && 'ring-2 ring-blue-500'
            )}
          >
            <button
              type="button"
              onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
              className="w-full text-left"
            >
              <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex gap-6">
                  <div
                    className={cn(
                      'w-16 h-16 rounded-3xl flex flex-col items-center justify-center font-display font-bold shrink-0',
                      app.score >= 80
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600'
                        : app.score >= 60
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                          : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600'
                    )}
                  >
                    <span className="text-xl leading-none">{app.score}%</span>
                    <span className="text-[8px] uppercase tracking-wider">{t('match')}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-1">{app.jobTitle}</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                      {app.company} • {t('appliedOn')} {app.date}
                    </p>
                    {expandedId !== app.id && (
                      <p className="mt-2 text-[10px] font-bold text-blue-600 flex items-center gap-1">
                        {t('seeDetails')} <ArrowRight size={10} />
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={cn('px-4 py-1.5 rounded-full text-xs font-bold border', getStatusStyle(app.status))}>
                    {statusLabel[app.status]}
                  </span>
                  <MoreVertical size={20} className="text-slate-400" />
                </div>
              </div>
            </button>

            <AnimatePresence>
              {expandedId === app.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-slate-50 dark:bg-slate-800/50">
                    <div className="bg-white dark:bg-slate-900 p-8 space-y-6">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.35em] mb-4 flex items-center gap-2">
                          <Zap size={12} className="text-amber-500" /> {t('gaps')}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {app.gaps.map((gap) => (
                            <span key={gap} className="px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-xs font-semibold border border-amber-100 dark:border-amber-900/50">
                              {gap}
                            </span>
                          ))}
                          {app.gaps.length === 0 && <p className="text-sm italic text-slate-400">{t('noGapsForRole')}</p>}
                        </div>
                      </div>
                      <Link to="/applicant/jobs" className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:underline">
                        {t('seeUpskillingRoadmap')} <ArrowRight size={14} />
                      </Link>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-8 space-y-6">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.35em] mb-4 flex items-center gap-2">
                          <Info size={12} className="text-blue-500" /> {t('employerFeedback')}
                        </p>
                        <div className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4">
                          <p className="text-sm text-slate-600 dark:text-slate-400 italic leading-6">
                            {app.feedbackKey ? t(app.feedbackKey) : t('pendingFeedback')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-[11px] font-medium">
                        <Clock size={12} /> {t('lastUpdated2Days')}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
