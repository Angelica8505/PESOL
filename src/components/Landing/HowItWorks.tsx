import React from 'react'
import { UserPlus, Search, TrendingUp, Award } from 'lucide-react'

const steps = [
  {
    title: 'Create Your Profile',
    desc: 'Sign up and build your professional profile with skills, experience, and education details',
    icon: UserPlus,
    color: 'from-[#1D4ED8] to-[#60A5FA]',
    badge: '01',
  },
  {
    title: 'Get AI-Matched Jobs',
    desc: 'Our AI analyzes your skills and matches you with the best opportunities',
    icon: Search,
    color: 'from-[#0EA5E9] to-[#38BDF8]',
    badge: '02',
  },
  {
    title: 'Bridge Skill Gaps',
    desc: 'Discover missing skills, get personalized training recommendations',
    icon: TrendingUp,
    color: 'from-[#7C3AED] to-[#C084FC]',
    badge: '03',
  },
  {
    title: 'Land Your Dream Job',
    desc: 'Apply with confidence, track applications, grow with PESO support',
    icon: Award,
    color: 'from-[#10B981] to-[#34D399]',
    badge: '04',
  },
]

export default function HowItWorks(){
  return (
    <section id="about" className="py-20 bg-[#07102a]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-white">How It Works</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/70">A simple 4-step journey to building your career with PESO Lipa City.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="group relative overflow-hidden rounded-2xl bg-card border border-border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl shadow-black/5">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-[-3rem] h-0.5 w-12 bg-border" />
                )}
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} text-white shadow-lg shadow-black/10`}>
                  <Icon size={20} />
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.28em] text-white/50">Step {step.badge}</div>
                <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{step.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
