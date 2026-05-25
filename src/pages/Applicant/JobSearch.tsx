import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, ArrowLeft, Loader2, Sparkles, X, Target, Zap, BookOpen, Send, Building2, Menu } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useProfile } from '../../contexts/ProfileContext';
import Sidebar from '../../components/Layout/Sidebar';
import JobCard, { Job } from '../../components/Jobs/JobCard';
import JobDetailPanel from '../../components/Jobs/JobDetailPanel';
import { useBookmarks } from '../../contexts/BookmarkContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { MOCK_JOBS } from '../../constants/jobs';
import GuideTooltip from '../../components/UI/GuideTooltip';

export default function JobSearch() {
  const { t, language } = useLanguage();
  const { matchStats, profile } = useProfile();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'match' | 'salary' | 'recent'>('match');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const { bookmarks } = useBookmarks();
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const GUIDE_STEPS = [
    { title: t('smartJobSearch'), content: t('guideSearchContent'), target: '#job-search-input' },
    { title: t('insights'), content: t('guideInsightsContent'), target: '#job-list-container' },
    { title: t('filter'), content: t('guideFilterContent'), target: '#filter-btn' },
  ];

  // 1. Core Match Formula implementation for individual jobs
  const calculateJobScore = (job: Job): number => {
    if (!profile) return 0;
    
    // Sbase: Fixed at 60% for relevant categories
    const SBASE = 60;
    const C = 8; // Skill Coefficient
    const requiredSkills = job.tags; // N: Total number of skills required
    const N = Math.max(1, requiredSkills.length);

    let totalBoostPoints = 0;

    requiredSkills.forEach(req => {
      // Find matching skill in profile sections (Direct Skills, Experience Titles, or Achievements)
      const directSkill = profile.skills.find(s => s.name.toLowerCase().includes(req.toLowerCase()));
      let L = directSkill ? directSkill.level : 0;

      // Check Experience and Achievements for implicit proficiency (Level 3)
      if (L === 0) {
        const hasExp = profile.experience.some(e => e.title.toLowerCase().includes(req.toLowerCase()));
        const hasAch = profile.achievements.some(a => a.title.toLowerCase().includes(req.toLowerCase()));
        if (hasExp || hasAch) L = 3;
      }

      // Omission Penalty is handled by L=0
      totalBoostPoints += (L * C); // L * 8%
    });

    const Btotal = totalBoostPoints / N; // Weighted Average (Fairness Filter)
    return Math.min(100, Math.round(SBASE + Btotal));
  };

  // Dynamic job matching based on core formula
  const dynamicJobs: Job[] = MOCK_JOBS.map(job => ({
    ...job,
    matchScore: calculateJobScore(job)
  }));

  const filteredJobs = dynamicJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || 
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    
    if (showSavedOnly) return matchesSearch && bookmarks.includes(job.id);
    return matchesSearch;
  }).sort((a, b) => {
    if (filter === 'match') return b.matchScore - a.matchScore;
    if (filter === 'salary') {
      const getSal = (s: string) => parseInt(s.replace(/[^0-9]/g, ''), 10) || 0;
      return getSal(b.salary) - getSal(a.salary);
    }
    return 0;
  });

  const filterLabels: Record<typeof filter, string> = {
    match: t('filterHighestMatch'),
    salary: t('filterHighestSalary'),
    recent: t('filterRecent'),
  };

  return (
    <div className="flex h-screen bg-[#f4f6fb] dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all"
            >
              <Menu size={20} />
            </button>
            <div className="relative flex-1 max-w-xl group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                id="job-search-input"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 dark:text-white outline-none"
              />
              <div className="absolute left-0 top-full mt-2 w-64 p-2 bg-slate-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none font-sans font-medium">
                {t('searchTip')}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mr-2">
               <button 
                 onClick={() => setShowSavedOnly(false)}
                 className={cn(
                   "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                   !showSavedOnly ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm" : "text-slate-500"
                 )}
               >
                 {t('allJobs')}
               </button>
               <button 
                 onClick={() => setShowSavedOnly(true)}
                 className={cn(
                   "px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
                   showSavedOnly ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm" : "text-slate-500"
                 )}
               >
                 {t('bookmarks')} {bookmarks.length > 0 && <span className="bg-blue-600 text-white w-4 h-4 rounded-full flex items-center justify-center text-[8px]">{bookmarks.length}</span>}
               </button>
             </div>
             <div className="relative">
               <button 
                 id="filter-btn"
                 onClick={() => setFilterOpen(!filterOpen)}
                 className={cn(
                   "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border",
                   filterOpen 
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20" 
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-blue-300"
                 )}
               >
                 <Filter size={16} /> {filterLabels[filter]}
               </button>
               
               <AnimatePresence>
                 {filterOpen && (
                   <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-2 z-30 overflow-hidden"
                   >
                     {(['match', 'salary', 'recent'] as const).map(opt => (
                       <button 
                        key={opt}
                        onClick={() => {
                          setFilter(opt);
                          setFilterOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 transition-colors"
                       >
                         {filterLabels[opt]}
                       </button>
                     ))}
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          </div>
        </header>

        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">{t('exploreOpportunities')}</h2>
              <p className="text-sm text-slate-500 font-medium mt-1">{t('jobsFoundCount', { count: String(filteredJobs.length) })}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" id="job-list-container">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} onClick={() => { setSelectedJob(job); }} />
            ))}
          </div>
        </div>
      </main>

      <JobDetailPanel job={selectedJob} onClose={() => setSelectedJob(null)} />
      <GuideTooltip steps={GUIDE_STEPS} />
    </div>
  );
}
