import React, { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  Handshake, 
  Plus, 
  Search, 
  MoreVertical, 
  ChevronRight,
  Target,
  BarChart3,
  CheckCircle2,
  XCircle,
  Clock,
  Moon,
  Sun,
  Menu
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import Sidebar from '../../components/Layout/Sidebar';
import StatCard from '../../components/Dashboard/StatCard';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { cn } from '../../lib/utils';

export default function EmployerDashboard() {
  const { t } = useLanguage();
  const { profile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#f4f6fb] dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-xl font-display font-bold text-slate-900 dark:text-white truncate">
              {t('dashboard')}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              data-tooltip-id="main-tooltip"
              data-tooltip-content="Toggle Dark/Light Mode"
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'light' ? <Moon size={20} className="text-slate-600" /> : <Sun size={20} className="text-amber-400" />}
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all">
              <Plus size={18} /> Post Job Requirement
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8 overflow-y-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Active Postings" value="8" icon={Briefcase} color="blue" delay={0.1} />
            <StatCard label="Total Applicants" value="142" icon={Users} trend="+32 this week" color="emerald" delay={0.2} />
            <StatCard label="Hired this Month" value="12" icon={Handshake} color="rose" delay={0.3} />
            <StatCard label="Matching Efficiency" value="94%" icon={Target} color="amber" delay={0.4} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Top Candidates (Ranked by Match Score) */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                     <BarChart3 size={20} />
                   </div>
                   <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">Top Matched Talent</h3>
                </div>
                <button className="text-sm font-bold text-blue-600 hover:text-blue-700">View Rankings</button>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    { name: "Juan Dela Cruz", role: "Junior Data Analyst", score: 96, status: "Matching", date: "Applied today" },
                    { name: "Maria Santos", role: "IT Support", score: 89, status: "Shortlisted", date: "Applied 2 days ago" },
                    { name: "Robert Lim", role: "Frontend Dev", score: 85, status: "Screening", date: "Applied 5 days ago" },
                    { name: "Eileen Garcia", role: "Network Tech", score: 82, status: "New", date: "Applied 1 week ago" }
                  ].map((candidate, i) => (
                    <div key={i} className="p-6 flex items-center gap-6 group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center font-display font-bold text-blue-600 shadow-sm group-hover:scale-105 transition-transform">
                        {candidate.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 dark:text-white truncate">{candidate.name}</h4>
                        <p className="text-xs text-slate-500 font-medium">{candidate.role} • {candidate.date}</p>
                      </div>
                      <div className="text-right">
                         <div className="flex items-center gap-2 justify-end mb-1">
                           <span className={cn(
                             "px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase",
                             candidate.score >= 90 ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                           )}>
                             {candidate.score}% Match
                           </span>
                         </div>
                         <div className="flex items-center gap-1">
                            <button className="p-1.5 hover:bg-emerald-50 text-slate-300 hover:text-emerald-600 rounded-lg transition-colors"><CheckCircle2 size={16} /></button>
                            <button className="p-1.5 hover:bg-rose-50 text-slate-300 hover:text-rose-600 rounded-lg transition-colors"><XCircle size={16} /></button>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Postings */}
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                     <Briefcase size={20} />
                   </div>
                   <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">Active Postings</h3>
                </div>
                <button className="text-sm font-bold text-blue-600 hover:text-blue-700">Manage All</button>
              </div>

              <div className="grid gap-4">
                {[
                  { title: "Junior Data Analyst", apps: 42, views: 1205, status: "Open" },
                  { title: "Hardware Intern", apps: 12, views: 450, status: "Open" },
                  { title: "Network Admin", apps: 8, views: 320, status: "Closing Soon" }
                ].map((post, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-blue-200 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-all">{post.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={cn(
                            "px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase",
                            post.status === 'Open' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                          )}>
                            {post.status}
                          </span>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
                        <MoreVertical size={18} className="text-slate-400" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-50 dark:border-slate-800 mb-4">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Applicants</p>
                        <p className="font-display font-bold text-xl text-slate-900 dark:text-white">{post.apps}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Views</p>
                        <p className="font-display font-bold text-xl text-slate-900 dark:text-white">{post.views}</p>
                      </div>
                    </div>
                    <button className="w-full py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all">
                      Review Submissions
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
