import React from 'react';
import { ArrowDown, CheckCircle2, Circle, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

const stats = [
  { label: 'Salary Growth', value: '90%', color: 'bg-emerald-500' },
  { label: 'Promotions', value: '2', color: 'bg-amber-500' },
  { label: 'Skills Gained', value: '+8', color: 'bg-blue-600' },
  { label: 'Avg Time to Promote', value: '12 months avg', color: 'bg-violet-500' },
];

const timeline = [
  {
    title: 'Junior Developer',
    subtitle: 'Completed',
    period: 'Jan 2023 — Dec 2023',
    salary: '₱20K-25K',
    status: 'completed',
    details: 'Promoted from Intern. Built core React and SQL skills.',
    skills: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Frontend Developer',
    subtitle: 'Completed',
    period: 'Jan 2024 — Dec 2024',
    salary: '₱28K-35K',
    status: 'completed',
    details: 'Led UI redesigns and component libraries.',
    skills: ['React', 'TypeScript', 'Tailwind'],
  },
  {
    title: 'Full Stack Developer',
    subtitle: 'Active',
    period: 'Jan 2025 — Present',
    salary: '₱38K-50K',
    status: 'active',
    details: 'Building end-to-end AI-enabled solutions.',
    skills: ['Node.js', 'Next.js', 'PostgreSQL'],
  },
  {
    title: 'Senior Developer',
    subtitle: 'Projected',
    period: '2027 (2-3 years)',
    salary: '₱55K-75K',
    status: 'upcoming',
    details: 'Leading delivery teams and mentoring juniors.',
    skills: ['Leadership', 'Architecture', 'DevOps'],
  },
  {
    title: 'Tech Lead',
    subtitle: 'Projected',
    period: '2029+ (5+ years)',
    salary: '₱80K-120K',
    status: 'upcoming',
    details: 'Owning product direction and engineering quality.',
    skills: ['Strategy', 'Stakeholder', 'Scaling'],
  },
];

const statusStyles: Record<string, string> = {
  completed: 'bg-emerald-50 ring-emerald-200 text-emerald-700',
  active: 'bg-blue-50 ring-blue-200 text-blue-700',
  upcoming: 'bg-slate-50 ring-slate-200 text-slate-500',
};

export default function CareerPath() {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white/90 p-6 shadow-lg shadow-slate-900/5 border border-slate-200">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Career Path</p>
            <h1 className="mt-3 text-3xl font-display font-bold text-slate-900">Real progression for your next promotion</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-500">
              Track your growth from junior roles to leadership with milestones, salary progression, and skills earned along the way.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{stat.label}</p>
                <p className={"mt-3 text-3xl font-display font-bold " + stat.color}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] bg-white/90 p-6 shadow-lg shadow-slate-900/5 border border-slate-200">
          <div className="flex items-center gap-3 text-slate-900">
            <Sparkles size={24} className="text-emerald-500" />
            <div>
              <h2 className="text-xl font-semibold">Growth timeline</h2>
              <p className="text-sm text-slate-500">Your career journey with completed, active, and projected roles.</p>
            </div>
          </div>

          <div className="relative mt-8 pl-6">
            <div className="absolute left-5 top-0 h-full w-px bg-slate-200" />
            <div className="space-y-8">
              {timeline.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="relative"
                >
                  <div className="absolute -left-1.5 top-1 h-5 w-5 rounded-full border-4 bg-white shadow-sm"
                    style={{ borderColor: step.status === 'active' ? '#93c5fd' : step.status === 'completed' ? '#34d399' : '#cbd5e1' }}
                  />
                  <div className={"rounded-3xl border px-6 py-5 " + (step.status === 'active' ? 'bg-sky-50 border-sky-200' : step.status === 'completed' ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200')}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{step.subtitle}</p>
                        <h3 className="mt-2 text-xl font-semibold text-slate-900">{step.title}</h3>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">{step.salary}</span>
                    </div>
                    <p className="mt-4 text-sm text-slate-500">{step.period}</p>
                    <p className="mt-4 text-sm leading-6 text-slate-600">{step.details}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {step.skills.map((skill) => (
                        <span key={skill} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 border border-slate-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900 p-8 text-white shadow-2xl shadow-slate-950/30 border border-white/10">
          <div className="flex items-center gap-4">
            <TrendingUp size={28} className="text-emerald-300" />
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-200/80">Career momentum</p>
              <h2 className="mt-2 text-3xl font-display font-bold">Advance with confidence</h2>
            </div>
          </div>
          <p className="mt-5 text-sm text-slate-200">Your career growth chart visualizes salary goals and future leadership milestones — built for local PESO applicants.</p>
          <div className="mt-8 space-y-5">
            <div className="rounded-3xl bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Next milestone</p>
              <p className="mt-2 text-xl font-semibold">Senior Developer by 2027</p>
              <p className="mt-3 text-sm text-slate-300">Focus on leadership coaching, architecture design, and high-impact projects.</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Promotion readiness</p>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200">On track</span>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500" style={{ width: '82%' }} />
              </div>
              <p className="mt-3 text-xs text-slate-300">82% of the milestones needed for your next promotion are complete.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
