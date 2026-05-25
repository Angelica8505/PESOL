import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, FileText, ChevronRight, User, MapPin, Briefcase, GraduationCap, Trophy, Plus, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useToast } from '../../contexts/ToastContext';

interface DigitizationFlowProps {
  onClose: () => void;
}

export default function DigitizationFlow({ onClose }: DigitizationFlowProps) {
  const [step, setStep] = useState<'info' | 'details' | 'review'>('info');
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    skills: [] as { name: string; level: number }[],
    experience: [] as { title: string; company: string; duration: string }[],
    education: [] as { school: string; degree: string; year: string }[]
  });

  const [newSkill, setNewSkill] = useState({ name: '', level: 1 });
  const [newExp, setNewExp] = useState({ title: '', company: '', duration: '' });

  const addSkill = () => {
    if (newSkill.name) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
      setNewSkill({ name: '', level: 1 });
    }
  };

  const addExp = () => {
    if (newExp.title && newExp.company) {
      setFormData(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
      setNewExp({ title: '', company: '', duration: '' });
    }
  };

  const handleSave = () => {
    showToast("Application encoded successfully!", "success");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl bg-white dark:bg-slate-950 rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-none">Manual Data Entry (Walk-In)</h2>
              <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-widest">PESO Clerk Encoding System</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex px-8 pt-6 gap-2">
          {['info', 'details', 'review'].map((s, i) => (
            <div 
              key={s} 
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-500",
                step === s ? "bg-blue-600" : (i < ['info', 'details', 'review'].indexOf(step) ? "bg-blue-400" : "bg-slate-100 dark:bg-slate-800")
              )}
            />
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            {step === 'info' && (
              <motion.div 
                key="info"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Applicant Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text"
                        placeholder="Full Name (per paper)"
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all dark:text-white"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Email/Contact</label>
                    <input 
                      type="text"
                      placeholder="Contact details"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all dark:text-white"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Current Address/Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text"
                      placeholder="City, Province"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all dark:text-white"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={() => setStep('details')}
                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    Next Step: Experience & Skills <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'details' && (
              <motion.div 
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Experience Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Briefcase size={18} className="text-blue-600" /> Work History
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-3">
                    <input 
                      placeholder="Job Title"
                      className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm dark:text-white"
                      value={newExp.title}
                      onChange={(e) => setNewExp(prev => ({ ...prev, title: e.target.value }))}
                    />
                    <input 
                      placeholder="Company"
                      className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm dark:text-white"
                      value={newExp.company}
                      onChange={(e) => setNewExp(prev => ({ ...prev, company: e.target.value }))}
                    />
                    <button 
                      onClick={addExp}
                      className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-blue-600 py-2 rounded-xl text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                    >
                      <Plus size={16} /> Add Exp
                    </button>
                  </div>

                  <div className="space-y-2">
                    {formData.experience.map((exp, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{exp.title}</p>
                          <p className="text-xs text-slate-500">{exp.company}</p>
                        </div>
                        <button onClick={() => setFormData(prev => ({ ...prev, experience: prev.experience.filter((_, idx) => idx !== i) }))}>
                          <Trash2 size={16} className="text-slate-400 hover:text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex gap-4">
                  <button 
                    onClick={() => setStep('info')}
                    className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-bold"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setStep('review')}
                    className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    Review Data <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'review' && (
              <motion.div 
                key="review"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-[24px]">
                  <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-4 tracking-tight">Data Final Summary</h4>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                     <div>
                       <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Name</p>
                       <p className="text-sm font-bold text-slate-900 dark:text-white uppercase">{formData.name || 'Not provided'}</p>
                     </div>
                     <div>
                       <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Location</p>
                       <p className="text-sm font-bold text-slate-900 dark:text-white uppercase">{formData.location || 'Not provided'}</p>
                     </div>
                     <div className="col-span-2">
                        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Experience</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {formData.experience.length} records encoded manually.
                        </p>
                     </div>
                  </div>
                </div>

                <div className="pt-12 flex gap-4">
                  <button 
                    onClick={() => setStep('details')}
                    className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-bold"
                  >
                    Edit Again
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
                  >
                    Submit Encoded File <Check size={18} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
