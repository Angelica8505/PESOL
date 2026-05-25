import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ShieldCheck, ArrowRight, Loader2, AlertCircle, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(email, password, 'admin');
      showToast('Authorized Admin access.', 'success');
      navigate('/admin');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Access Denied';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950 font-sans border-t-4 border-emerald-500">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <span className="font-display font-bold text-2xl text-white tracking-tight">PESOLUTION <span className="text-emerald-500">PESO</span></span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-wider uppercase mb-4">
            Institutional Access Only
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Officer Sign In</h1>
          <p className="text-sm text-slate-400">Authorized government authentication portal</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 p-8 rounded-[32px] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 text-white">
            <ShieldCheck size={100} />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-950/40 border border-rose-900/55 rounded-2xl flex items-start gap-4 text-rose-400 text-xs leading-relaxed">
              <AlertCircle size={18} className="shrink-0 mt-0.5 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-widest ml-1">Government Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white text-sm transition-all"
                  placeholder="name@lipa.gov.ph"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-widest ml-1">Security Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white text-sm transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed group text-sm mt-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>Authorize Portal Access <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 text-center text-xs space-y-3">
            <p className="text-slate-500">
              Not a PESO Admin? Exit here:
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/login" className="font-bold text-slate-300 hover:text-white hover:underline">Applicant Login</Link>
              <span className="text-slate-700">|</span>
              <Link to="/employer-portal" className="font-bold text-slate-300 hover:text-white hover:underline">Employer Login</Link>
            </div>
          </div>
        </motion.div>

        <p className="text-center mt-6 text-sm text-slate-500 dark:text-slate-600">
          Temporary Admin tester account needed? <Link to="/admin/register" className="font-bold text-emerald-500 hover:underline">Register Admin Account</Link>
        </p>
      </div>
    </div>
  );
}
