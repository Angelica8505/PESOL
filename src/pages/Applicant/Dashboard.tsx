import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Target,
  Zap,
  Clock,
  Search,
  Sparkles,
  TrendingUp,
  FileText,
  Loader2,
  UserCircle,
  ListChecks,
  ArrowRight,
} from 'lucide-react';
import JobDetailPanel from '../../components/Jobs/JobDetailPanel';
import JobCard, { Job } from '../../components/Jobs/JobCard';
import { useAuth } from '../../contexts/AuthContext';
import { useProfile } from '../../contexts/ProfileContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export default function ApplicantDashboard() {
  const { profile: authProfile } = useAuth();
  const { matchStats, profile, aiRoadmap, loadingRoadmap, fetchAiRoadmap } = useProfile();
  const { t, language } = useLanguage();

  useEffect(() => {
    if (profile && matchStats.skillGaps.length > 0) {
      fetchAiRoadmap(language);
    }
  }, [profile, matchStats.skillGaps, language, fetchAiRoadmap]);

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
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.7fr_320px]">
        <div className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-[#eff6ff] via-[#eef2ff] to-[#f8fafc] p-8 shadow-lg shadow-slate-900/5">
          <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-gradient-to-bl from-[#1D4ED8]/10 to-[#7C3AED]/10 blur-3xl" />
          <div className="relative z-10">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">AI-Powered Roadmap</p>
            <h1 className="mt-4 text-4xl font-display font-bold text-slate-950">Your personalized path to success</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
              Discover your highest matches, build confidence with recommended steps, and stay on track with a career plan tailored to your skills.
            </p>
            <div className="mt-8 rounded-[2rem] border border-blue-200 bg-white/90 p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Hello, {firstName}</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">Keep pushing forward with your next milestone.</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">Top match score</span>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Match score</p>
            <p className="mt-4 text-7xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1D4ED8] to-[#7C3AED]">{Math.max(...MOCK_MATCHES.map((job) => job.matchScore), matchStats.avgScore || 0)}%</p>
            <p className="mt-3 text-sm text-slate-500">Great job! You&apos;re on the right track.</p>
          </div>
          <div className="mt-10 space-y-3">
            <div className="text-xs uppercase tracking-[0.35em] text-slate-400">Progress</div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#7C3AED]" style={{ width: `${Math.min(Math.max(...MOCK_MATCHES.map((job) => job.matchScore), matchStats.avgScore || 0), 100)}%` }} />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm text-slate-700">
              <span className="inline-flex h-3 w-3 rounded-full bg-emerald-400 animate-pulse" /> Keeping you on track
            </div>
          </div>
        </div>
      </section>
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
        <div className="grid gap-4 lg:grid-cols-4">
          {[
            { title: 'Upskill', description: 'Strengthen your foundation', color: 'from-blue-500 to-sky-500', icon: Briefcase },
            { title: 'Learn', description: 'Build in-demand skills', color: 'from-sky-500 to-cyan-500', icon: Target },
            { title: 'Get Hired', description: 'Land your ideal job', color: 'from-violet-500 to-fuchsia-500', icon: Sparkles },
            { title: 'Grow', description: 'Advance your career', color: 'from-emerald-500 to-teal-500', icon: TrendingUp },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-[2rem] border border-slate-200 p-6 shadow-sm">
                <div className={"inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br " + item.color + " text-white"}>
                  <Icon size={20} />
                </div>
                <p className="mt-5 text-base font-semibold text-slate-900">{item.title}</p>
                <p className="mt-3 text-sm text-slate-500">{item.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-slate-500">
                  <li>• Track skill progress</li>
                  <li>• Review recommendations</li>
                  <li>• Prepare for interviews</li>
                </ul>
              </div>
            );
          })}
        </div>
      </section>
      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Featured Job Matches</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Opportunities tailored for you</h2>
          </div>
          <Link className="text-sm font-semibold text-blue-600 hover:underline" to="/applicant/jobs">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-4 xl:grid-cols-4">
          {MOCK_MATCHES.map((job) => (
            <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
          ))}
        </div>
      </section>
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
          <div className="inline-flex items-center gap-3 rounded-3xl bg-amber-50 px-4 py-3 text-amber-600">
            <Sparkles size={20} />
            <span className="font-semibold">Recent activity</span>
          </div>
          <div className="mt-6 space-y-4 text-sm text-slate-600">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Profile updated</p>
              <p className="mt-1">You added new skills to your profile.</p>
              <p className="mt-2 text-xs text-slate-400">2 hours ago</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Course complete</p>
              <p className="mt-1">Completed Power BI Fundamentals.</p>
              <p className="mt-2 text-xs text-slate-400">Yesterday</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">Application submitted</p>
              <p className="mt-1">Applied for IT Support Technician.</p>
              <p className="mt-2 text-xs text-slate-400">3 days ago</p>
            </div>
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
          <div className="inline-flex items-center gap-3 rounded-3xl bg-blue-50 px-4 py-3 text-blue-700">
            <Briefcase size={20} />
            <span className="font-semibold">Next recommended step</span>
          </div>
          <div className="mt-6 space-y-4">
            <div className="rounded-[1.75rem] bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Focus</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">Complete Power BI Fundamentals</h3>
              <p className="mt-3 text-sm text-slate-500">4 hours estimated completion time.</p>
            </div>
            <button className="inline-flex items-center justify-center rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition">
              View Roadmap
            </button>
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-6 text-white shadow-2xl shadow-slate-950/30">
          <div className="rounded-[2rem] bg-white/5 p-5">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Support</p>
            <h3 className="mt-3 text-xl font-semibold">We&apos;re here to help you every step of the way.</h3>
            <p className="mt-3 text-sm text-slate-300">PESO Lipa City</p>
          </div>
        </div>
      </section>
      <JobDetailPanel job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  );
}
