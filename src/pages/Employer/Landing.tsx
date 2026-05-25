import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Users, BarChart, Shield, ArrowRight, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function EmployerLanding() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password, 'employer');
      navigate('/employer');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="text-white" size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">PESOLUTION <span className="text-blue-600">EMPLOYER</span></span>
          </div>
          <Link to="/" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">Applicant Portal</Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            <Shield size={14} />
            Verified Employer Access
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
            Connecting You with <span className="text-blue-600">Verified Lipa Talent</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Our Rule-Based matching ensures you only interview candidates who truly fit your technical requirements. Anonymized data protects privacy until you're ready to proceed.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: Users, title: "Precision Matching", desc: "NLP-driven skill categorization." },
              { icon: BarChart, title: "Labor Trends", desc: "Anonymized real-time market data." },
              { icon: Shield, title: "Compliance", desc: "RA 10173 Privacy Standard." },
              { icon: Briefcase, title: "Talent Pipeline", desc: "Direct access to PESO graduates." }
            ].map((feature, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                  <feature.icon className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-800"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Employer Login</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">Access your hiring dashboard and matches.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition-all dark:text-white"
                placeholder="hr@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition-all dark:text-white"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-rose-500 text-sm bg-rose-50 dark:bg-rose-900/20 p-3 rounded-lg">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 group"
            >
              Sign In to Portal
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="text-center pt-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                New employer? <Link to="/employer/register" className="text-blue-600 font-semibold hover:underline">Apply for PESOLUTION Access</Link>
              </p>
            </div>
          </form>
        </motion.div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 py-12 border-t border-slate-200 dark:border-slate-800 text-center">
        <p className="text-slate-500 dark:text-slate-400 text-sm">© 2026 PESOLUTION Lipa City. Data Processor RA 10173 Compliant.</p>
      </footer>
    </div>
  );
}
