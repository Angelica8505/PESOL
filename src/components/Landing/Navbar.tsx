import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const textColor = scrolled ? 'text-slate-900' : 'text-white'
  const linkColor = scrolled ? 'text-slate-700 hover:text-slate-900' : 'text-white/70 hover:opacity-100'
  const borderClass = scrolled ? 'border-b border-border shadow-xl' : ''

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl' : 'bg-transparent'} ${borderClass}`}>
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-2xl flex items-center justify-center ${scrolled ? 'bg-[#1D4ED8] text-white' : 'bg-white/10 text-white'}`}>
            P
          </div>
          <span className={`font-semibold text-lg ${textColor}`}>PESOLUTION</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          <Link to="/jobs" className={`text-sm font-medium transition-opacity duration-300 ${linkColor}`}>Find Jobs</Link>
          <Link to="/career" className={`text-sm font-medium transition-opacity duration-300 ${linkColor}`}>Career Paths</Link>
          <Link to="/learning" className={`text-sm font-medium transition-opacity duration-300 ${linkColor}`}>Training</Link>
          <a href="#about" className={`text-sm font-medium transition-opacity duration-300 ${linkColor}`}>About</a>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/login" className={`px-3 py-1 rounded-md border border-white/20 transition-colors duration-300 ${scrolled ? 'text-slate-700 bg-white/90' : 'text-white/90 bg-white/10'}`}>Sign In</Link>
          <Link to="/register" className="px-4 py-2 rounded-md bg-gradient-to-r from-[#1D4ED8] to-[#7C3AED] text-white shadow-lg shadow-[#1D4ED8]/25">Get Started</Link>
        </div>

        <button className={`lg:hidden p-2 ${scrolled ? 'text-slate-900' : 'text-white'}`} onClick={() => setOpen((v) => !v)} aria-label="menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <div className={`lg:hidden transition-[max-height] duration-300 overflow-hidden ${open ? 'max-h-[420px] py-4 border-t border-slate-200 bg-white' : 'max-h-0'}`}>
        <div className="px-4 flex flex-col gap-3">
          <Link to="/jobs" className="py-2 rounded-lg text-slate-900 hover:bg-slate-100">Find Jobs</Link>
          <Link to="/career" className="py-2 rounded-lg text-slate-900 hover:bg-slate-100">Career Paths</Link>
          <Link to="/learning" className="py-2 rounded-lg text-slate-900 hover:bg-slate-100">Training</Link>
          <a href="#about" className="py-2 rounded-lg text-slate-900 hover:bg-slate-100">About</a>
          <div className="flex gap-2 mt-2">
            <Link to="/login" className="flex-1 py-2 rounded-lg border border-slate-200 text-center text-slate-900">Sign In</Link>
            <Link to="/register" className="flex-1 py-2 rounded-lg bg-gradient-to-r from-[#1D4ED8] to-[#7C3AED] text-white text-center">Get Started</Link>
          </div>
        </div>
      </div>
    </header>
  )
}
