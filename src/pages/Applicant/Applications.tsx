import React, { useState, useMemo } from 'react';
import {
  Clock,
  ArrowRight,
  Zap,
  Info,
  Menu,
  MoreVertical,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import Sidebar from '../../components/Layout/Sidebar';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

type AppStatus = 'shortlisted' | 'reviewing' | 'rejected';

export default function Applications() {
  const { t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
            <h1 className="text-xl font-display font-bold text-slate-900 dark:text-white">{t('applications')}</h1>
          </div>
          <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-100 dark:border-blue-800">
            {applications.length} {t('totalSubmissions')}
          </span>
        </header>

        <div className="p-8 space-y-6 max-w-4xl">
          <p className="text-sm text-slate-500 dark:text-slate-400 -mt-2">{t('seeDetails')}</p>
          {applications.map(app => (
            <div
              key={app.id}
              className={cn(
                'bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer',
                expandedId === app.id && 'ring-2 ring-blue-500'
              )}
              onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
            >
              <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-50 dark:border-slate-800">
                <div className="flex gap-6">
                  <div
                    className={cn(
                      'w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-display font-bold shrink-0',
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
                    <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-1">
                      {app.jobTitle}
                    </h3>
                    <p className="text-slate-500 font-medium text-sm">
                      {app.company} • {t('appliedOn')} {app.date}
                    </p>
                    {expandedId !== app.id && (
                      <p className="text-[10px] text-blue-600 font-bold mt-2 flex items-center gap-1">
                        {t('seeDetails')} <ArrowRight size={10} />
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={cn('px-4 py-1.5 rounded-full text-xs font-bold border', getStatusStyle(app.status))}>
                    {statusLabel[app.status]}
                  </span>
                  <button
                    type="button"
                    className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    aria-label={t('seeDetails')}
                  >
                    <MoreVertical size={20} className="text-slate-400" />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {expandedId === app.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-slate-50 dark:bg-slate-800/50">
                      <div className="bg-white dark:bg-slate-900 p-8 space-y-6">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Zap size={12} className="text-amber-500" /> {t('gaps')}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {app.gaps.map(gap => (
                              <span
                                key={gap}
                                className="px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-xl text-xs font-bold border border-amber-100 dark:border-amber-900/50"
                              >
                                {gap}
                              </span>
                            ))}
                            {app.gaps.length === 0 && (
                              <p className="text-sm italic text-slate-400">{t('noGapsForRole')}</p>
                            )}
                          </div>
                        </div>
                        <Link
                          to="/applicant/jobs"
                          className="text-blue-600 font-bold text-xs flex items-center gap-2 hover:underline"
                          onClick={e => e.stopPropagation()}
                        >
                          {t('seeUpskillingRoadmap')} <ArrowRight size={14} />
                        </Link>
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-8 space-y-6">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Info size={12} className="text-blue-500" /> {t('employerFeedback')}
                          </p>
                          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
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
      </main>
    </div>
  );
}
