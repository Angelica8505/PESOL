import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Search, 
  MessageSquare, 
  User, 
  FileText, 
  LogOut, 
  Menu, 
  X, 
  BarChart2,
  Building2,
  Languages,
  Bookmark,
  Sun,
  Moon
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { profile, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  const applicantLinks = [
    { to: '/applicant', icon: Home, label: t('dashboard') },
    { to: '/applicant/jobs', icon: Search, label: t('jobSearch') },
    { to: '/applicant/forum', icon: MessageSquare, label: t('forum') },
    { to: '/applicant/bookmarks', icon: Bookmark, label: t('bookmarks') },
    { to: '/applicant/applications', icon: FileText, label: t('applications') },
    { to: '/applicant/profile', icon: User, label: t('profile') },
  ];

  const employerLinks = [
    { to: '/employer', icon: Home, label: t('dashboard') },
    { to: '/employer/jobs', icon: Building2, label: t('jobSearch') },
  ];

  const adminLinks = [
    { to: '/admin', icon: BarChart2, label: t('dashboard') },
  ];

  const links = profile?.role === 'applicant' 
    ? applicantLinks 
    : profile?.role === 'employer' 
      ? employerLinks 
      : adminLinks;

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ 
          x: isOpen ? 0 : -300,
          width: isOpen ? 280 : 0
        }}
        className={cn(
          "fixed top-0 left-0 h-full bg-slate-900 text-white z-50 lg:relative lg:translate-x-0 overflow-hidden shrink-0 transition-colors duration-300",
          !isOpen && "lg:w-0"
        )}
      >
        <div className="flex flex-col h-full w-[280px]">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-display font-bold text-xl">
                P
              </div>
              <span className="font-display font-bold text-xl tracking-tight uppercase">PESOLUTION</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                data-tooltip-id="main-tooltip"
                data-tooltip-content={link.label}
                data-tooltip-place="right"
                className={({ isActive }) => cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group hover:bg-white/10",
                  isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-400"
                )}
              >
                <link.icon size={20} className={cn("transition-transform duration-200 group-hover:scale-110")} />
                <span className="font-medium text-sm">{link.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="p-6 mt-auto border-t border-white/5 space-y-2">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="flex items-center gap-4 w-full px-4 py-3 text-slate-400 hover:bg-white/10 rounded-xl transition-colors"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              <div className="flex-1 text-left">
                <p className="text-sm font-medium">{theme === 'light' ? t('darkMode') : t('lightMode')}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{t('switchTheme')}</p>
              </div>
            </button>

            {/* Language Toggle */}
            <button 
              id="lang-toggle-btn"
              onClick={() => setLanguage(language === 'en' ? 'tl' : 'en')}
              className="flex items-center gap-4 w-full px-4 py-3 text-slate-400 hover:bg-white/10 rounded-xl transition-colors"
            >
              <Languages size={20} />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium">{language === 'en' ? t('english') : t('tagalog')}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{t('changeLang')}</p>
              </div>
            </button>

            <div className="flex items-center gap-3 py-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-display font-bold text-blue-400">
                {profile?.full_name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold text-sm truncate">{profile?.full_name}</p>
                <p className="text-xs text-slate-500 capitalize">{profile?.role}</p>
              </div>
            </div>

            <button 
              onClick={signOut}
              className="flex items-center gap-4 w-full px-4 py-3 text-rose-400 hover:bg-rose-400/10 rounded-xl transition-colors group"
            >
              <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold text-xs uppercase tracking-widest">{t('logout')}</span>
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
