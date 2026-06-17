import React from 'react'

const skills = ['Customer Service','Python','Data Analysis','Digital Marketing','SQL','Excel','Communication','Project Management']

export default function FloatingSkillTags(){
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      {skills.map((s,i)=> (
        <div key={s} style={{top: `${10 + (i*9)%60}%`, left: `${5 + (i*13)%80}%`}} className="absolute opacity-10 transform-gpu animate-slow-float">
          <div className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs text-white/80">{s}</div>
        </div>
      ))}
      <style>{`@keyframes slow-float{0%{transform:translateY(0)}50%{transform:translateY(-8px)}100%{transform:translateY(0)}} .animate-slow-float{animation:slow-float 6s ease-in-out infinite}`}</style>
    </div>
  )
}
