import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Users, 
  Building2, 
  Target,
  Sparkles,
  Zap,
  BarChart3,
  BookOpen,
  ArrowUpRight,
  FileText,
  ShieldCheck,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import ThemeLanguageControls from '../components/UI/ThemeLanguageControls';
import LandingChatbot from '../components/Landing/LandingChatbot';

export default function Landing() {
  const { t } = useLanguage();

  return (
    <div className="bg-[#f4f6fb] dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-blue-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-display font-bold text-white">P</div>
            <span className="font-display font-bold text-xl dark:text-white">PESOLUTION</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-end">
            <ThemeLanguageControls />
            <Link 
              to="/login" 
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600"
            >
              {t('logIn')}
            </Link>
            <Link 
              to="/register" 
              className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 shadow-md shadow-blue-600/20"
            >
              {t('signUp')}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-emerald-400/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full mb-8"
          >
            <MapPin size={14} className="text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">{t('officialPortal')}</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-2" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white leading-[1.1] mb-6 max-w-4xl"
          >
            {t('heroTitle')} <span className="text-blue-600 relative">
              {t('heroTitleHighlight')}
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M0,5 Q50,0 100,5 Q150,10 200,5" stroke="#2563eb" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed"
          >
            {t('heroDescLong')}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-20 w-full justify-center"
          >
            <Link 
              to="/register" 
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-600/30 group"
            >
              {t('getStartedNow')} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#how-it-works" 
              className="px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {t('howItWorks')}
            </a>
          </motion.div>

          {/* Feature Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full"
          >
            {[
              { icon: Sparkles, label: t('featureAiResume'), color: "bg-blue-50 dark:bg-blue-900/30 text-blue-600" },
              { icon: Target, label: t('featureMatch'), color: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600" },
              { icon: Zap, label: t('featureGap'), color: "bg-amber-50 dark:bg-amber-900/30 text-amber-600" },
              { icon: BookOpen, label: t('featureRoadmap'), color: "bg-violet-50 dark:bg-violet-900/30 text-violet-600" }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-transform hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon size={24} />
                </div>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{feature.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Registered Grads', value: '1,200+', color: 'text-blue-600' },
            { label: 'Local Employers', value: '85+', color: 'text-emerald-600' },
            { label: 'Placements', value: '450+', color: 'text-amber-600' },
            { label: 'Barangays Covered', value: '72', color: 'text-violet-600' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className={`text-3xl font-display font-bold mb-1 ${stat.color}`}>{stat.value}</p>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-slate-900 relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Our Technology Flow</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Digitizing Lipa's workforce through a 4-step intelligent processing factory.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {[
              { title: "Register", desc: "Applicants create their profile securely.", icon: User, step: "01" },
              { title: "Encode", desc: "Clerks encode walk-in files with ease.", icon: FileText, step: "02" },
              { title: "Match", desc: "Smart filtering links talent to jobs.", icon: Zap, step: "03" },
              { title: "Visualize", desc: "Dashboards show real-time insights.", icon: BarChart3, step: "04" }
            ].map((step, i) => (
              <div key={i} className="relative group">
                <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm group-hover:bg-white/10 transition-colors h-full">
                  <div className="text-5xl font-display font-bold text-white/5 absolute top-4 right-4">{step.step}</div>
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6">
                    <step.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
                {i < 3 && <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 text-white/20"><ArrowRight size={24} /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footnote CTA */}
      <section className="py-24 px-6 flex justify-center">
        <div className="max-w-4xl w-full bg-blue-600 rounded-[40px] p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/4 translate-y-1/4" />
          
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 relative">Ready to bridge your skill gap?</h2>
          <p className="text-blue-100 mb-10 text-lg relative">Join Lipa Launchpad today and get your personalized career roadmap.</p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-colors relative shadow-xl">
            Register as Applicant <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center font-display font-bold text-white text-xs">P</div>
            <span className="font-display font-bold text-lg dark:text-white">PESOLUTION</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-500 dark:text-slate-400">
            <Link to="/employer-portal" className="font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors">Employer Portal</Link>
            <Link to="/peso-portal" className="font-bold text-slate-900 dark:text-white hover:text-emerald-600 transition-colors">PESO Admin</Link>
            <span className="hidden md:inline w-px h-4 bg-slate-200 dark:bg-slate-800" />
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
          </div>

          <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Official Government Service</span>
          </div>
        </div>
        <div className="text-center mt-8 text-xs text-slate-400">
          © 2026 PESOLUTION. Integrated with Lipa City PESO Office.
        </div>
      </footer>

      <LandingChatbot />
    </div>
  );
}
