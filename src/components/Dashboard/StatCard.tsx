import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: string;
  delay?: number;
}

export default function StatCard({ label, value, icon: Icon, trend, color = "blue", delay = 0 }: StatCardProps) {
  const colors = {
    blue: "from-blue-600 to-blue-400 bg-blue-50 text-blue-600",
    emerald: "from-emerald-600 to-emerald-400 bg-emerald-50 text-emerald-600",
    amber: "from-amber-600 to-amber-400 bg-amber-50 text-amber-600",
    rose: "from-rose-600 to-rose-400 bg-rose-50 text-rose-600",
  };

  const selectedColor = colors[color as keyof typeof colors] || colors.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-slate-900 p-6 rounded-[24px] border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", selectedColor)}>
          <Icon size={24} />
        </div>
        {trend && (
          <span className="text-[10px] font-bold px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">{label}</p>
        <p className="text-3xl font-display font-bold text-slate-900 dark:text-white">{value}</p>
      </div>
    </motion.div>
  );
}
