import React, { useState } from 'react';
import { ChevronDown, Lock, CheckCircle2, Bolt, BookOpen, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const phases = [
  {
    id: 'foundation',
    label: 'Foundation',
    description: 'Set up your profile, skills, and goals.',
    progress: 95,
    status: 'completed',
    tasks: [
      'Complete your profile',
      'List your top skills',
      'Set job preferences',
    ],
  },
  {
    id: 'development',
    label: 'Skill Development',
    description: 'Build in-demand skills and certifications.',
    progress: 60,
    status: 'active',
    tasks: [
      'Finish Power BI Fundamentals',
      'Practice SQL queries',
      'Complete customer service module',
    ],
  },
  {
    id: 'applications',
    label: 'Job Applications',
    description: 'Apply confidently to matched roles.',
    progress: 30,
    status: 'locked',
    tasks: [
      'Review matched jobs',
      'Compare company fit',
      'Submit tailored applications',
    ],
  },
  {
    id: 'advancement',
    label: 'Career Advancement',
    description: 'Prepare for growth and leadership roles.',
    progress: 12,
    status: 'locked',
    tasks: [
      'Review promotion roadmap',
      'Build leadership skills',
      'Seek mentorship',
    ],
  },
];

const recommendations = [
  { title: 'Optimize your resume for Full Stack roles', info: 'Read our guide and update your top skills.', icon: BookOpen },
  { title: 'Complete Power BI Fundamentals', info: '4 hours estimated training time.', icon: Bolt },
];

export default function AIRoadmap() {
  const [openPhase, setOpenPhase] = useState('development');

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">AI Roadmap</p>
            <h1 className="mt-2 text-3xl font-display font-bold text-slate-900">Your personalized career roadmap</h1>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-700 shadow-sm">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Overall progress</p>
            <p className="mt-2 text-3xl font-display font-bold text-slate-900">38%</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="space-y-4">
          {phases.map((phase) => {
            const active = openPhase === phase.id;
            return (
              <div
                key={phase.id}
                className={
                  'overflow-hidden rounded-[2rem] border transition shadow-sm ' +
                  (phase.status === 'locked'
                    ? 'border-slate-200 bg-slate-50/80 text-slate-500'
                    : 'border-slate-200 bg-white text-slate-900')
                }
              >
                <button
                  type="button"
                  onClick={() => phase.status !== 'locked' && setOpenPhase(phase.id)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={
                        'grid h-12 w-12 place-items-center rounded-2xl text-white ' +
                        (phase.status === 'completed'
                          ? 'bg-emerald-500'
                          : phase.status === 'active'
                          ? 'bg-blue-600'
                          : 'bg-slate-400')
                      }
                    >
                      {phase.status === 'locked' ? <Lock size={20} /> : <CheckCircle2 size={20} />}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{phase.label}</p>
                      <p className="mt-1 text-sm text-slate-500">{phase.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-slate-700">{phase.progress}%</span>
                    <ChevronDown className={active ? 'rotate-180 transition' : 'transition'} size={18} />
                  </div>
                </button>
                <div className="h-1 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500" style={{ width: `${phase.progress}%` }} />
                </div>
                <AnimatePresence>
                  {active && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-slate-200 bg-slate-50 px-5 py-4"
                    >
                      <div className="space-y-3">
                        {phase.tasks.map((task) => (
                          <div key={task} className="flex items-center gap-3">
                            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-blue-600 text-white">
                              <CheckCircle2 size={16} />
                            </span>
                            <p className="text-sm text-slate-700">{task}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <aside className="space-y-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
          <div className="flex items-center gap-4 text-slate-900">
            <span className="rounded-3xl bg-blue-100 p-3 text-blue-600">
              <TrendingUp size={20} />
            </span>
            <div>
              <p className="text-sm font-semibold">AI Recommendations</p>
              <p className="text-sm text-slate-500">Actions built for your next milestone.</p>
            </div>
          </div>
          <div className="space-y-4">
            {recommendations.map((recommendation) => {
              const Icon = recommendation.icon;
              return (
                <div key={recommendation.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-3xl bg-gradient-to-br from-blue-600 to-violet-600 text-white">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900">{recommendation.title}</p>
                      <p className="text-sm text-slate-500">{recommendation.info}</p>
                    </div>
                  </div>
                  <button className="mt-4 inline-flex items-center gap-2 rounded-3xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                    Continue
                  </button>
                </div>
              );
            })}
          </div>
        </aside>
      </section>
    </div>
  );
}
