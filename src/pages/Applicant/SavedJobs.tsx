import React, { useState } from 'react';
import { Bookmark, Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useBookmarks } from '../../contexts/BookmarkContext';
import JobCard, { Job } from '../../components/Jobs/JobCard';
import JobDetailPanel from '../../components/Jobs/JobDetailPanel';
import { MOCK_JOBS } from '../../constants/jobs';

export default function SavedJobs() {
  const { t } = useLanguage();
  const { bookmarks } = useBookmarks();
  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const savedJobs = MOCK_JOBS.filter(
    (job) =>
      bookmarks.includes(job.id) &&
      (job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{t('bookmarks')}</p>
            <h1 className="mt-2 text-3xl font-display font-bold text-slate-900">{t('savedJobsTitle') || t('bookmarks')}</h1>
            <p className="mt-2 text-sm text-slate-500">Keep your most promising roles in one place for easy review.</p>
          </div>
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-12 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        {savedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {savedJobs.map((job) => (
              <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-[2rem] border border-slate-200 bg-white p-16 shadow-lg shadow-slate-900/5 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[32px] bg-slate-100 text-slate-400">
              <Bookmark size={40} />
            </div>
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">{t('noSavedJobsTitle')}</h2>
            <p className="text-sm text-slate-500 max-w-md">{t('noSavedJobsDesc')}</p>
          </div>
        )}
      </section>

      <JobDetailPanel job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  );
}
