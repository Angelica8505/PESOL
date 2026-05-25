import React, { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  BarChart2, 
  TrendingUp, 
  MapPin, 
  ArrowUpRight, 
  Upload,
  Menu,
  Database,
  PieChart as PieChartIcon,
  Check,
  Plus
} from 'lucide-react';
import Sidebar from '../../components/Layout/Sidebar';
import DigitizationFlow from '../../components/Admin/DigitizationFlow';
import PESODashboard from '../../components/Admin/PESODashboard';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

type ViewMode = 'applicants' | 'analytics';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [digitizing, setDigitizing] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('applicants');

  const stats = [
    { label: 'Total Applicants', value: '1,284', icon: Users, color: 'bg-blue-500' },
    { label: 'Pending Jobs', value: '42', icon: Briefcase, color: 'bg-amber-500' },
    { label: 'Hired This Month', value: '15', icon: Check, color: 'bg-emerald-500' }
  ];

  return (
    <div className="flex h-screen bg-[#f4f6fb] dark:bg-slate-950 transition-colors duration-300 overflow-hidden text-slate-900 dark:text-white">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-4">
             <button 
               onClick={() => setSidebarOpen(!sidebarOpen)}
               className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl lg:hidden"
             >
               <Menu size={20} />
             </button>
             <h1 className="text-xl font-display font-bold uppercase tracking-tight">PESO Admin Home</h1>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDigitizing(true)}
              className="px-8 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all flex items-center gap-2"
            >
              <Plus size={18} /> Register New Applicant
            </button>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto w-full space-y-12">
          {/* Welcome Message */}
          <div className="space-y-2">
            <h2 className="text-3xl font-display font-bold">Welcome back, PESO Admin!</h2>
            <p className="text-slate-500">Here is a quick summary of today's employment activities.</p>
          </div>

          {/* Large Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-6"
              >
                <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-lg", stat.color)}>
                  <stat.icon size={28} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-display font-bold mt-1">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recent Applicants Section */}
          <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-xl font-bold">Recent Applicant Entries</h3>
              <button 
                onClick={() => setViewMode(viewMode === 'applicants' ? 'analytics' : 'applicants')}
                className="text-blue-600 font-bold text-sm hover:underline"
              >
                {viewMode === 'applicants' ? 'Show Analytics Reports' : 'Back to Applicant List'}
              </button>
            </div>

            <div className="p-2">
              {viewMode === 'applicants' ? (
                <div className="divide-y divide-slate-50 dark:divide-slate-800">
                  {[
                    { name: 'Juan Dela Cruz', type: 'Walk-In', area: 'Lipa', time: '10 mins ago' },
                    { name: 'Maria Clara', type: 'Online', area: 'Tanauan', time: '2 hours ago' },
                    { name: 'Joselito Rizal', type: 'Walk-In', area: 'Malvar', time: '5 hours ago' }
                  ].map((app, i) => (
                    <div key={i} className="flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-[32px] transition-colors">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center font-bold text-slate-400">
                          {app.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-lg">{app.name}</p>
                          <p className="text-sm text-slate-500">{app.area} • Registered {app.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={cn(
                          "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          app.type === 'Walk-In' ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                        )}>
                          {app.type}
                        </span>
                        <button className="px-6 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6">
                  <PESODashboard />
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Footer */}
          <div className="bg-blue-600 rounded-[40px] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-2xl font-display font-bold">Ready to match workers?</h4>
              <p className="text-blue-100">Review job postings and match them with our latest applicants.</p>
            </div>
            <button className="px-10 py-4 bg-white text-blue-600 rounded-3xl font-bold shadow-2xl hover:scale-105 transition-all">
              Go to Job Matching
            </button>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {digitizing && <DigitizationFlow onClose={() => setDigitizing(false)} />}
      </AnimatePresence>
    </div>
  );
}
