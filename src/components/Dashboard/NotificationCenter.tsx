import React, { useState } from 'react';
import { Bell, X, Sparkles, Briefcase, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, title: 'New Match Found!', message: 'Junior Data Analyst at LIMA matches 92% of your skills.', icon: Sparkles, type: 'match', time: '2 mins ago' },
    { id: 2, title: 'Application Update', message: 'SM Lipa has viewed your application for Tech Support.', icon: Briefcase, type: 'app', time: '1 hour ago' },
    { id: 3, title: 'Urgent Hiring', message: 'Warehouse Clerk position in Sabang needs immediate fillers.', icon: Zap, type: 'urgent', time: '3 hours ago' },
  ]);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-2.5 rounded-xl transition-all relative",
          isOpen ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:border-blue-500 hover:text-blue-600"
        )}
      >
        <Bell size={20} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 border-2 border-white dark:border-slate-900 rounded-full" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-[60]" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute right-0 mt-4 w-80 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 z-[70] overflow-hidden"
            >
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                <h3 className="font-display font-bold text-slate-900 dark:text-white">Notifications</h3>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={16} />
                </button>
              </div>
              
              <div className="max-h-[400px] overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div key={n.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-50 dark:border-slate-800 last:border-0 cursor-pointer group">
                      <div className="flex gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                          n.type === 'match' ? "bg-emerald-50 text-emerald-600" :
                          n.type === 'urgent' ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
                        )}>
                          <n.icon size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-0.5 group-hover:text-blue-600 transition-colors">{n.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-1">{n.message}</p>
                          <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-10 text-center">
                    <p className="text-sm text-slate-400 italic">No new notifications</p>
                  </div>
                )}
              </div>
              
              <button className="w-full py-3 text-xs font-bold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors border-t border-slate-100 dark:border-slate-800">
                View All Notifications
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
