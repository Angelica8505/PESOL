import React, { useEffect, useRef, useState } from 'react'
import { TrendingUp, ArrowUpRight } from 'lucide-react'

const skills = [
  { name: 'Python', score: 92, growth: '+15%' },
  { name: 'Customer Service', score: 88, growth: '+8%' },
  { name: 'Data Analysis', score: 85, growth: '+22%' },
  { name: 'Digital Marketing', score: 82, growth: '+18%' },
  { name: 'SQL', score: 80, growth: '+12%' },
  { name: 'Excel', score: 78, growth: '+5%' },
  { name: 'Communication', score: 76, growth: '+10%' },
  { name: 'Project Management', score: 74, growth: '+14%' },
]

export default function InDemandSkills(){
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.25 })

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 bg-[#07102a]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80">
              <TrendingUp size={16} />
              AI Career Insights
            </div>
            <h2 className="mt-4 text-3xl font-display font-bold text-white">Top skills in demand across Lipa City</h2>
          </div>
          <p className="max-w-xl text-sm text-white/60">Explore the leading abilities employers seek, with growth trends and demand scores for each skill.</p>
        </div>

        <div ref={ref} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {skills.map((skill) => (
            <div key={skill.name} className="rounded-3xl border border-border bg-card p-5 transition hover:border-[#1D4ED8]/30 hover:shadow-lg hover:shadow-[#1D4ED8]/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{skill.name}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-white/60">
                    <ArrowUpRight size={14} />
                    {skill.growth}
                  </div>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">{skill.score}%</span>
              </div>
              <div className="mt-5 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#1D4ED8] to-[#7C3AED] transition-all duration-1000" style={{ width: visible ? `${skill.score}%` : '0%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
