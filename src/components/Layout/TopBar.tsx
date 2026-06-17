import React, { useState } from 'react';
import { Search, Moon, Sun, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import NotificationBell from '../shared/NotificationBell';

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const { profile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const [search, setSearch] = useState('');

  const initials = profile?.full_name
    ? profile.full_name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'AP';

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-sm shadow-slate-900/5 transition hover:bg-slate-200 lg:hidden"
          aria-label={t('openMenu')}
        >
          <Menu size={20} />
        </button>

        <div className="relative flex-1 max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            type="search"
            placeholder={t('searchPlaceholder') || 'Search opportunities, skills, companies...'}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm shadow-slate-900/5 transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            aria-label={t('toggleTheme')}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <NotificationBell />
          <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-600/20">
              <span className="font-semibold">{initials}</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{profile?.full_name || t('applicant')}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">AI career guide</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
