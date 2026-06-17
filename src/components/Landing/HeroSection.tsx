import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import FloatingSkillTags from './FloatingSkillTags'
import SignupPopup from './SignupPopup'

const phrases = [
  'Find Opportunities in Lipa City',
  'Discover Your Skill Gaps',
  'Get AI Career Recommendations',
  'Connect with Local Employers'
]

export default function HeroSection(){
  const [idx, setIdx] = useState(0)

  useEffect(()=>{
    const interval = setInterval(() => setIdx((current) => (current + 1) % phrases.length), 4000)
    return () => clearInterval(interval)
  },[])

  return (
    <section className="relative overflow-hidden min-h-[80vh]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1b3d] via-[#1D4ED8] to-[#7C3AED]" />
      <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=60&auto=format&fit=crop" alt="workspace background" className="absolute inset-0 w-full h-full object-cover opacity-10" />
      <FloatingSkillTags />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex flex-col gap-10 lg:gap-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse block" />
              AI-Powered Employment Platform for PESO Lipa
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Your Career, <span className="bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">Reimagined</span>
            </h1>

            <p className="mt-5 text-base text-white/60 max-w-xl">We help local job seekers discover opportunities, bridge skill gaps, and connect with employers using AI-powered matching tailored to Lipa City.</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/jobs" className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#1D4ED8] shadow-sm transition hover:shadow-md">Find Jobs</Link>
              <Link to="/register" className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 flex items-center gap-2">
                <UserPlus size={16} /> Sign Up Free
              </Link>
              <Link to="/career" className="rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/15">Explore Career Paths</Link>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <div className="flex items-center gap-2">
                {phrases.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIdx(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === idx ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={phrases[idx]}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="mt-4 text-white/70 max-w-xl text-sm sm:mt-0"
                >
                  {phrases[idx]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl max-w-4xl">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-white/70">Your match snapshot</p>
                <h2 className="mt-4 text-xl font-semibold text-white">Find jobs that fit your skills instantly</h2>
                <p className="mt-3 text-sm text-white/60">Create a profile, receive AI match recommendations, and connect with employers across Lipa City.</p>
              </div>
              <div className="rounded-3xl bg-gradient-to-br from-[#1D4ED8]/20 via-[#7C3AED]/15 to-[#0f172a]/30 p-6">
                <div className="text-sm text-white/70">Personalized insights</div>
                <div className="mt-4 rounded-3xl bg-[#0f1636] p-5 text-white/90">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/50">Match Quality <span>92%</span></div>
                  <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-11/12 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#A78BFA]" />
                  </div>
                  <p className="mt-4 text-sm text-white/60">Sign in to continue and unlock the full AI-powered experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07102a] via-[#07102a]/60 to-transparent" />
      <SignupPopup />
    </section>
  )
}
