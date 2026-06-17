import React from 'react'
import { MapPin, Phone, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="bg-[#0f1b3d] text-white/80">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <div className="text-2xl font-bold text-white">PESOLUTION</div>
            <p className="mt-4 text-sm text-white/60">Helping Lipa City residents find meaningful work through intelligent job matching and career support.</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">For Job Seekers</h3>
            <div className="mt-5 space-y-3 text-sm text-white/60">
              <Link to="/jobs" className="block hover:text-white">Find Jobs</Link>
              <Link to="/career" className="block hover:text-white">Career Paths</Link>
              <Link to="/learning" className="block hover:text-white">Training Programs</Link>
              <Link to="/register" className="block hover:text-white">Create Profile</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">For Employers</h3>
            <div className="mt-5 space-y-3 text-sm text-white/60">
              <Link to="/employer-portal" className="block hover:text-white">Post a Job</Link>
              <Link to="/employer-portal" className="block hover:text-white">Find Talent</Link>
              <Link to="/employer-portal" className="block hover:text-white">Recruitment Tools</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">Contact PESO</h3>
            <div className="mt-5 space-y-4 text-sm text-white/60">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 text-white/60" />
                <div>Lipa City Hall, Lipa, Batangas</div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="mt-1 text-white/60" />
                <div>(043) 756-XXXX</div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="mt-1 text-white/60" />
                <div>peso@lipa.gov.ph</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-sm text-white/40 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>© 2026 PESOLUTION. All rights reserved.</div>
          <div>Powered by AI</div>
        </div>
      </div>
    </footer>
  )
}
