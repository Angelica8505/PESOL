import React, { useState } from 'react';
import {
  Briefcase,
  Target,
  Zap,
  Clock,
  Search,
  Menu,
  Sparkles,
  TrendingUp,
  FileText,
  Loader2,
  UserCircle,
  ListChecks,
  ChevronRight,
} from 'lucide-react';
import Sidebar from '../../components/Layout/Sidebar';
import JobDetailPanel from '../../components/Jobs/JobDetailPanel';
import JobCard, { Job } from '../../components/Jobs/JobCard';
import { useAuth } from '../../contexts/AuthContext';
import { useProfile } from '../../contexts/ProfileContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import GuideTooltip from '../../components/UI/GuideTooltip';

export default function ApplicantDashboard() {
  const { profile: authProfile } = useAuth();
  const { matchStats, profile, aiRoadmap, loadingRoadmap, fetchAiRoadmap } = useProfile();
  const { t, language } = useLanguage();

  React.useEffect(() => {
    if (profile && matchStats.skillGaps.length > 0) {
      fetchAiRoadmap(language);
    }
  }, [profile, matchStats.skillGaps, language, fetchAiRoadmap]);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const firstName = authProfile?.full_name?.split(' ')[0] || t('guest');

  const GUIDE_STEPS = [
    { title: t('menuButton'), content: t('step3Desc'), target: '#sidebar-toggle' },
    { title: t('insights'), content: t('insightsSimpleDesc'), target: '#match-score' },
    { title: t('profile'), content: t('step1Desc'), target: '#user-profile' },
    { title: t('changeLang'), content: t('roadmapSimpleHelp'), target: '#lang-toggle-btn' },
  ];

  const MOCK_MATCHES: Job[] = [
    {
      id: '1',
      title: 'Junior Data Analyst',
      company: 'LIMA Technology Center',
      location: 'Malvar-Lipa Border',
      salary: '₱25,000 - ₱35,000',
      type: 'Full-time',
      matchScore: 92,
      tags: ['Excel', 'SQL', 'Python', 'Tableau', 'Data Viz'],
      userSkills: ['excel', 'sql', 'data viz'],
      gaps: ['Python', 'Tableau'],
      description: t('mockJob1Desc'),
    },
    {
      id: '2',
      title: 'Frontend Developer',
      company: 'NextGen Lipa BPO',
      location: 'Ayala Highway, Lipa',
      salary: '₱30,000 - ₱45,000',
      type: 'Full-time',
      matchScore: 85,
      tags: ['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Git'],
      userSkills: ['tailwind', 'git'],
      gaps: ['React', 'TypeScript', 'Framer Motion'],
      description: t('mockJob2Desc'),
    },
    {
      id: '3',
      title: 'IT Support Technician',
      company: 'City Hall Annex',
      location: 'Lipa City Hall',
      salary: '₱18,000 - ₱22,000',
      type: 'Full-time',
      matchScore: 78,
      tags: ['Networking', 'Hardware', 'Troubleshooting', 'Windows Server'],
      userSkills: ['networking', 'hardware', 'troubleshooting'],
      gaps: ['Windows Server'],
      description: t('mockJob3Desc'),
    },
  ];

  const startSteps = [
    { icon: UserCircle, title: t('step1Title'), desc: t('step1Desc'), to: '/applicant/profile' },
    { icon: Target, title: t('step2Title'), desc: t('step2Desc'), to: '/applicant/jobs' },
    { icon: ListChecks, title: t('step3Title'), desc: t('step3Desc'), to: '/applicant/jobs' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f4f6fb] dark:bg-slate-950 transition-colors duration-300">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 md:h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button
              id="sidebar-toggle"
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 lg:hidden"
              aria-label={t('menuButton')}
            >
              <Menu size={20} className="text-slate-700 dark:text-white" />
            </button>
            <div className="min-w-0">
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('welcome')}</p>
              <h1 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white truncate">
                {firstName}
              </h1>
            </div>
          </div>
          <Link
            to="/applicant/profile"
            id="user-profile"
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-bold hover:bg-blue-100 dark:hover:bg-blue-900/50"
          >
            <UserCircle size={18} />
            <span className="hidden sm:inline">{t('editMyProfile')}</span>
          </Link>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-6xl mx-auto w-full">
          {/* Start here — plain language */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <ListChecks className="text-blue-600" size={22} />
              {t('startHere')}
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {startSteps.map((step, i) => (
                <Link
                  key={i}
                  to={step.to}
                  className="flex gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 shrink-0">
                    <step.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600">
                      {i + 1}. {step.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Simple stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {[
              { label: t('jobMatches'), help: t('statJobsHelp'), value: '24', icon: Briefcase, color: 'blue' },
              {
                label: t('matchScore'),
                help: t('statScoreHelp'),
                value: `${matchStats.avgScore}%`,
                icon: Target,
                color: 'emerald',
              },
              { label: t('liveApplications'), help: t('statAppsHelp'), value: '5', icon: Clock, color: 'rose' },
              {
                label: t('industryGaps'),
                help: t('statGapsHelp'),
                value: String(matchStats.skillGaps.length),
                icon: Zap,
                color: 'amber',
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-4 md:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800"
              >
                <stat.icon
                  size={20}
                  className={cn(
                    'mb-2',
                    stat.color === 'blue' && 'text-blue-600',
                    stat.color === 'emerald' && 'text-emerald-600',
                    stat.color === 'rose' && 'text-rose-500',
                    stat.color === 'amber' && 'text-amber-500'
                  )}
                />
                <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">{stat.label}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{stat.help}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t('topLocalMatches')}</h2>
                <Link
                  to="/applicant/jobs"
                  className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  {t('exploreAll')} <Search size={14} />
                </Link>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 -mt-2">{t('step3Desc')}</p>
              <div id="match-score" className="grid gap-4">
                {MOCK_MATCHES.map(job => (
                  <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div
                id="detected-proficiencies"
                className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800"
              >
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <Sparkles size={18} className="text-blue-600" />
                  {t('yourSkillsTitle')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {matchStats.proficiencies.length > 0 ? (
                    matchStats.proficiencies.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 rounded-lg text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">{t('noSkillsYet')}</p>
                  )}
                </div>
              </div>

              <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                  <Zap size={18} className="text-amber-500" />
                  {t('yourGapsTitle')}
                </h3>
                <p className="text-xs text-slate-500 mb-3">{t('gapsExplain')}</p>
                <div className="space-y-2">
                  {matchStats.skillGaps.slice(0, 5).map((gap, i) => (
                    <div
                      key={i}
                      className="px-3 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-xl text-sm font-semibold text-amber-800 dark:text-amber-300"
                    >
                      {gap}
                    </div>
                  ))}
                  {matchStats.skillGaps.length === 0 && (
                    <p className="text-sm text-emerald-600 font-medium">{t('perfectFit')}</p>
                  )}
                </div>
              </div>

              <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp size={18} className="text-purple-600" />
                  {t('aiCareerRoadmap')}
                </h3>
                <p className="text-xs text-slate-500 mb-4">{t('roadmapBasedOnGaps')}</p>
                {loadingRoadmap ? (
                  <div className="flex items-center gap-2 text-sm text-slate-500 py-4">
                    <Loader2 className="animate-spin" size={18} />
                    {t('roadmapSynthesizing')}
                  </div>
                ) : aiRoadmap.length > 0 ? (
                  <ol className="space-y-3">
                    {aiRoadmap.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300">
                        <span className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-sm text-slate-500">{t('roadmapEmpty')}</p>
                )}
              </div>

              <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">{t('applications')}</h3>
                <Link
                  to="/applicant/applications"
                  className="w-full py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-bold flex items-center justify-center gap-2 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  {t('viewApps')} <FileText size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <JobDetailPanel job={selectedJob} onClose={() => setSelectedJob(null)} />
      <GuideTooltip steps={GUIDE_STEPS} />
    </div>
  );
}
