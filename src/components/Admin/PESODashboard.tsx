import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Users, MapPin, ExternalLink } from 'lucide-react';

export default function PESODashboard() {
  // This embed URL would normally come from your Power BI Service
  // You can replace this with your actual Publish to Web or Embedded URL
  const POWERBI_URL = "https://app.powerbi.com/view?r=eyJrIjoiMmEzMmU1MzAtYTRiOC00YzQzLWJmYTUtYzg0ZDdkY2RhN2Q1IiwidCI6Ijc0ZTI3YmJmLTVmZjctNGM4Zi1hMDY5LTRkYjQ3ZjBhMTBiMiIsImMiOjEwfQ%3D%3D";

  return (
    <div className="space-y-8">
      {/* Analytics Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Applicants', value: '4,281', change: '+12%', icon: Users, color: 'bg-blue-500' },
          { label: 'Placement Rate', value: '78.4%', change: '+5.2%', icon: TrendingUp, color: 'bg-emerald-500' },
          { label: 'Active Jobs', value: '154', change: '-2%', icon: BarChart3, color: 'bg-amber-500' },
          { label: 'Hot Locations', value: 'LIPA/BAT', change: 'Stable', icon: MapPin, color: 'bg-violet-500' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} bg-opacity-10 rounded-2xl flex items-center justify-center text-current`}>
                 <stat.icon className={stat.color.replace('bg-', 'text-')} size={24} />
              </div>
              <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-slate-400'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
            <p className="text-2xl font-display font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Power BI Embedded Report */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col"
      >
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
          <div>
            <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">PESO Insights & Demographics</h2>
            <p className="text-sm text-slate-500 mt-1">Real-time analytical data synchronized with local MySQL database.</p>
          </div>
          <a 
            href={POWERBI_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-200 transition-all"
          >
            Open in Power BI <ExternalLink size={16} />
          </a>
        </div>
        
        <div className="relative w-full aspect-video bg-slate-50 dark:bg-slate-950">
          <iframe 
            title="PESO Employment Dashboard" 
            className="w-full h-full border-0"
            src={POWERBI_URL} 
            allowFullScreen={true}
          />
        </div>
      </motion.div>
    </div>
  );
}
