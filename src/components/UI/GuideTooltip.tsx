import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronRight, ChevronLeft, X, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Step {
  title: string;
  content: string;
  target?: string;
}

interface GuideTooltipProps {
  steps: Step[];
  role?: string;
}

export default function GuideTooltip({ steps, role = 'applicant' }: GuideTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const step = steps[currentStep];

  useEffect(() => {
    if (isOpen && step.target) {
      const element = document.querySelector(step.target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('ring-4', 'ring-blue-500', 'ring-offset-4', 'dark:ring-offset-slate-900', 'transition-all', 'duration-500');
        return () => {
          element.classList.remove('ring-4', 'ring-blue-500', 'ring-offset-4', 'dark:ring-offset-slate-900');
        };
      }
    }
  }, [isOpen, currentStep, step.target]);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-2xl relative transition-all",
          isOpen ? "bg-slate-900 text-white rotate-90" : "bg-blue-600 text-white"
        )}
      >
        {isOpen ? <X size={24} /> : <HelpCircle size={24} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white dark:border-slate-950 animate-pulse" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, x: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: -20 }}
            className="absolute bottom-20 right-0 w-80 bg-white dark:bg-slate-900 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 dark:border-slate-800 p-6 overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full translate-x-1/3 -translate-y-1/3" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded text-[10px] font-bold uppercase tracking-wider">
                  {role} Guide
                </div>
                <div className="text-[10px] font-bold text-slate-400">
                  Step {currentStep + 1} of {steps.length}
                </div>
              </div>

              <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Sparkles size={18} className="text-amber-500" /> {step.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                {step.content}
              </p>

              <div className="flex items-center justify-between gap-4">
                <div className="flex gap-1.5">
                  {steps.map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        i === currentStep ? "w-6 bg-blue-600" : "w-1.5 bg-slate-200 dark:bg-slate-800"
                      )}
                    />
                  ))}
                </div>
                
                <div className="flex gap-2">
                  {currentStep > 0 && (
                    <button 
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      if (currentStep < steps.length - 1) {
                        setCurrentStep(prev => prev + 1);
                      } else {
                        setIsOpen(false);
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                  >
                    {currentStep === steps.length - 1 ? "Finish" : "Next"} <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
