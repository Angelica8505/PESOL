import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Database, Key, ArrowRight, Activity, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLanding() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password, 'admin');
      navigate('/admin');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Access Denied');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 border-t-4 border-emerald-500 font-sans">
      <nav className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <ShieldCheck className="text-white" size={24} />
          </div>
          <div>
            <h1 className="font-bold text-xl text-white tracking-tight leading-none">PESOLUTION <span className="text-emerald-500">PESO</span></h1>
            <p className="text-[10px] text-emerald-500 font-mono tracking-widest uppercase mt-1">Institutional Access Only</p>
          </div>
        </div>
        <Link to="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2">
          Public Exit
        </Link>
      </nav>

      <main className="max-w-7xl mx-auto px-4 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Lipa City Labor <br /><span className="text-emerald-500 underline decoration-2 underline-offset-8 transition-all hover:decoration-emerald-400">Intelligence Portal.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-xl">
              PESO Government Access for applicant digitization, market trend surveillance, and Rule-Based placement verification.
            </p>

            <div className="space-y-6">
              {[
                { icon: Database, title: "Digitization Center", desc: "Custom OCR for handwritten biodata digitization." },
                { icon: Activity, title: "City-Wide Trends", desc: "Prescriptive AI models for local labor growth." },
                { icon: Key, title: "Access Control", desc: "RA 10173 Anonymization enforcement." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-800 hover:border-emerald-500/30 transition-colors group">
                  <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-700 group-hover:bg-emerald-600/10 transition-colors">
                    <item.icon className="text-emerald-500" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck size={120} />
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Officer Authentication</h3>
              <p className="text-slate-400 text-sm mb-8">Enter your PESO-assigned credentials.</p>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Government Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-white placeholder-slate-600"
                    placeholder="officer@lipa.gov.ph"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Security Password</label>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-white placeholder-slate-600"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
                    <p className="text-rose-500 text-xs font-medium">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-3"
                >
                  Authorize Access
                  <ArrowRight size={20} />
                </button>

                <div className="flex items-center justify-center gap-2 pt-4 opacity-50">
                  <FileText size={14} className="text-slate-400" />
                  <span className="text-[10px] text-slate-400 font-mono">ENCRYPTED END-TO-END VIA TLS 1.3</span>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </main>

      <div className="max-w-7xl mx-auto px-4 pb-12 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
        <div className="flex items-center gap-8 text-xs font-mono text-slate-400">
          <span>RA 10173 COMPLIANT</span>
          <span>ISO 27001 READY</span>
          <span>LIPA CITY LGU</span>
        </div>
        <p className="text-xs font-mono text-slate-500">PESOLUTION CORE v2.4.0</p>
      </div>
    </div>
  );
}
