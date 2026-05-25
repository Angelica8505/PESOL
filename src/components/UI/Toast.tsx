import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, type = 'info', isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] w-full max-w-md px-4"
        >
          <div className={cn(
            "rounded-[24px] p-4 shadow-2xl flex items-center gap-4 border backdrop-blur-md",
            type === 'success' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" :
            type === 'error' ? "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400" :
            "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400"
          )}>
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
              type === 'success' ? "bg-emerald-500 text-white" :
              type === 'error' ? "bg-rose-500 text-white" :
              "bg-blue-500 text-white"
            )}>
              {type === 'success' ? <CheckCircle size={20} /> :
               type === 'error' ? <AlertCircle size={20} /> :
               <Info size={20} />}
            </div>
            
            <div className="flex-1">
              <p className="text-sm font-bold leading-tight">{message}</p>
              <p className="text-[10px] opacity-70 mt-0.5 uppercase tracking-wider font-medium">
                {type === 'success' ? 'Task Completed' : type === 'error' ? 'Something went wrong' : 'Notification'}
              </p>
            </div>

            <button 
              onClick={onClose}
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
