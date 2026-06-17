import React from 'react'
import { ArrowRight, Sparkles, Lock } from 'lucide-react'
import GlassCard from './GlassCard'
import { Link } from 'react-router-dom'

export default function PersonalizedMatchSection(){
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <GlassCard className="overflow-hidden p-1 card-hover">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] rounded-[1.5rem] overflow-hidden bg-[#0c172f]">
            <div className="p-8 bg-gradient-to-br from-[#1D4ED8] via-[#4F46E5] to-[#7C3AED]">
              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm border border-white/10">
                <div className="inline-flex items-center justify-center rounded-3xl bg-white/15 p-3 mb-5 text-white">
                  <Sparkles size={20} />
                </div>
                <h2 className="text-2xl lg:text-3xl font-display font-bold text-white">Your Personalized Matches Await</h2>
                <p className="mt-4 text-white/70 max-w-md">Sign in to get AI-powered matches and career roadmaps tailored to you.</p>
              </div>
            </div>
            <div className="p-8 bg-[#07102a]">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80">
                  <Lock size={18} />
                  <span className="font-semibold">Sign in required</span>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <Link to="/register" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#1D4ED8] to-[#7C3AED] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1D4ED8]/25">
                    Create Your Free Account <ArrowRight size={16} />
                  </Link>
                  <Link to="/login" className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white/90">
                    Already have an account? Sign In
                  </Link>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {['AI Match Scoring', 'Skill Gap Analysis', 'Career Roadmaps', 'Job Alerts'].map((pill) => (
                    <span key={pill} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">{pill}</span>
                  ))}
                </div>

                <div className="mt-6 rounded-3xl bg-white/5 p-4 border border-white/10">
                  <p className="text-sm text-white/70">4,300+ job seekers hired through PESO Lipa</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
