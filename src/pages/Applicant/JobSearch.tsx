import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useProfile } from '../../contexts/ProfileContext';
import JobCard, { Job } from '../../components/Jobs/JobCard';
import JobDetailPanel from '../../components/Jobs/JobDetailPanel';
import { useBookmarks } from '../../contexts/BookmarkContext';
import { cn } from '../../lib/utils';
import { MOCK_JOBS } from '../../constants/jobs';

export default function JobSearch() {
  const { profile } = useProfile();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'match' | 'salary' | 'recent'>('match');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const { bookmarks } = useBookmarks();
  const [showSavedOnly, setShowSavedOnly] = useState(false);

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

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Job Search</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Explore career opportunities</h1>
            <p className="mt-3 text-sm text-slate-500">Search roles, filter by match score, and find the best local opportunities.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[280px_220px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="job-search-input"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search jobs, companies, or skills"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-12 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowSavedOnly(false)}
                className={cn(
                  'rounded-3xl px-4 py-3 text-sm font-semibold transition',
                  !showSavedOnly ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                )}
              >
                All jobs
              </button>
              <button
                type="button"
                onClick={() => setShowSavedOnly(true)}
                className={cn(
                  'rounded-3xl px-4 py-3 text-sm font-semibold transition flex items-center gap-2',
                  showSavedOnly ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                )}
              >
                Saved
                {bookmarks.length > 0 && (
                  <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-white text-xs font-bold text-blue-600">
                    {bookmarks.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setFilter('match')}
            className={cn(
              'rounded-3xl px-5 py-3 text-sm font-semibold transition',
              filter === 'match' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
            )}
          >
            Best match
          </button>
          <button
            type="button"
            onClick={() => setFilter('salary')}
            className={cn(
              'rounded-3xl px-5 py-3 text-sm font-semibold transition',
              filter === 'salary' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
            )}
          >
            Salary
          </button>
          <button
            type="button"
            onClick={() => setFilter('recent')}
            className={cn(
              'rounded-3xl px-5 py-3 text-sm font-semibold transition',
              filter === 'recent' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
            )}
          >
            Recent
          </button>
        </div>
      </section>
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">{filteredJobs.length} jobs found</h2>
            <p className="text-sm text-slate-500">Refine your search with the filters above.</p>
          </div>
          <div className="text-sm font-semibold text-slate-500">Based on your profile and current skill set.</div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
          ))}
        </div>
      </section>
      <JobDetailPanel job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  );
}
