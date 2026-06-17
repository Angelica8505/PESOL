import React, { useEffect, useState } from 'react'
import { Users, Building2, Award, Briefcase } from 'lucide-react'

const stats = [
  { icon: Users, label: 'Applicants', value: 12500, suffix: '+' },
  { icon: Building2, label: 'Employers', value: 850, suffix: '+' },
  { icon: Award, label: 'Successful Hires', value: 4300, suffix: '+' },
  { icon: Briefcase, label: 'Active Openings', value: 320, suffix: '+' },
]

const formatStat = (value: number, suffix: string) => {
  return `${value.toLocaleString()}${suffix}`
}

export default function LiveStats(){
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0))

  useEffect(() => {
    const duration = 1100
    const frameRate = 30
    const totalFrames = Math.round((duration / 1000) * frameRate)
    let frame = 0

    const interval = window.setInterval(() => {
      frame += 1
      setCounts(stats.map((stat) => {
        const progress = Math.min(frame / totalFrames, 1)
        return Math.round(stat.value * progress)
      }))

      if (frame >= totalFrames) {
        window.clearInterval(interval)
      }
    }, duration / totalFrames)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="-mt-16 z-10 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="rounded-2xl bg-white/80 backdrop-blur-xl border border-white/40 p-5 shadow-xl shadow-black/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#1D4ED8]/10 to-[#7C3AED]/10">
                <Icon className="text-[#1D4ED8]" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">{formatStat(counts[i], stat.suffix)}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
