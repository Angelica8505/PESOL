import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { UserPlus, ArrowRight, Brain, Target, CheckCircle, X, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function SignupPopup(){
  const [show, setShow] = useState(false)

  useEffect(()=>{
    const dismissed = sessionStorage.getItem('signupDismissed')
    if(dismissed) return
    const timer = window.setTimeout(()=> setShow(true), 4000)
    return ()=> window.clearTimeout(timer)
  },[])

  const dismiss = () => {
    sessionStorage.setItem('signupDismissed','1')
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={dismiss}
            aria-label="Close signup popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative z-[101] w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="px-8 pt-10 pb-8 bg-gradient-to-r from-[#1D4ED8] via-[#4F46E5] to-[#7C3AED] text-white text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
                <Sparkles size={24} />
              </div>
              <h3 className="text-2xl font-display font-bold">Unlock Your Career Potential</h3>
              <p className="mt-2 text-sm text-white/70">AI-powered matching, skill insights, and application tracking — all in one place.</p>
            </div>

            <div className="p-6 space-y-5">
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#A78BFA] text-white">
                    <Brain size={16} />
                  </span>
                  AI-powered job matching tailored to your skills
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-400 text-white">
                    <Target size={16} />
                  </span>
                  Identify and bridge your skill gaps with training
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#1D4ED8] to-[#7C3AED] text-white">
                    <CheckCircle size={16} />
                  </span>
                  Track applications and get hired faster
                </li>
              </ul>

              <div className="grid gap-3">
                <Link to="/register" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1D4ED8] to-[#7C3AED] text-sm font-semibold text-white shadow-lg shadow-[#1D4ED8]/25">
                  <UserPlus size={16} /> Create Your Free Account
                </Link>
                <button onClick={dismiss} className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
                  Already have an account? Sign In <ArrowRight size={16} />
                </button>
              </div>

              <p className="text-center text-xs text-slate-500">No credit card required. Free forever for job seekers.</p>
            </div>

            <button
              type="button"
              onClick={dismiss}
              className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-slate-700 hover:bg-black/10"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
