import React, { useState } from 'react';
import { Bookmark, Search, Menu } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useBookmarks } from '../../contexts/BookmarkContext';
import Sidebar from '../../components/Layout/Sidebar';
import JobCard, { Job } from '../../components/Jobs/JobCard';
import JobDetailPanel from '../../components/Jobs/JobDetailPanel';
import { motion } from 'motion/react';
import { MOCK_JOBS } from '../../constants/jobs';

export default function SavedJobs() {
  const { t } = useLanguage();
  const { bookmarks } = useBookmarks();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const savedJobs = MOCK_JOBS.filter(job => 
    bookmarks.includes(job.id) &&
    (job.title.toLowerCase().includes(search.toLowerCase()) || 
     job.company.toLowerCase().includes(search.toLowerCase()))
  );

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
            <h1 className="text-xl font-display font-bold text-slate-900 dark:text-white mr-4 whitespace-nowrap">{t('bookmarks')}</h1>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 dark:text-white outline-none"
              />
            </div>
          </div>
        </header>

        <div className="p-8">
          {savedJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {savedJobs.map((job) => (
                <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-[32px] flex items-center justify-center text-slate-300 mb-6">
                <Bookmark size={40} />
              </div>
              <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">{t('noSavedJobsTitle')}</h2>
              <p className="text-slate-500 font-medium max-w-sm">{t('noSavedJobsDesc')}</p>
            </div>
          )}
        </div>
      </main>

      <JobDetailPanel job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  );
}
