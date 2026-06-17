import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Map,
  Briefcase,
  FileText,
  MessageSquare,
  Compass,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { cn } from '../../lib/utils';

interface ApplicantSidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
}

export default function ApplicantSidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: ApplicantSidebarProps) {
  const { signOut, profile } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const sidebarWidth = collapsed ? 'w-[72px]' : 'w-[280px]';

  const navItems = [
    { to: '/applicant', icon: LayoutDashboard, label: t('dashboard') },
    { to: '/applicant/profile', icon: User, label: t('profile') },
    { to: '/applicant/roadmap', icon: Map, label: t('roadmap') },
    { to: '/applicant/jobs', icon: Briefcase, label: t('jobSearch') },
    { to: '/applicant/applications', icon: FileText, label: t('applications') },
    { to: '/applicant/messages', icon: MessageSquare, label: t('messages'), badge: 3 },
    { to: '/applicant/career', icon: Compass, label: t('careerPath') },
    { to: '/applicant/settings', icon: Settings, label: t('settings') },
  ];

  return (
    <div
      className={cn(
        'fixed inset-y-0 left-0 z-40 flex flex-col border-r border-slate-800/40 bg-[hsl(var(--sidebar-background))] shadow-2xl shadow-slate-950/10 transition-transform duration-300 lg:translate-x-0',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}
    >
      <div className={cn('flex h-full flex-col overflow-hidden', sidebarWidth)}>
        <div className="flex items-center justify-between gap-3 px-5 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg shadow-slate-900/20">
              <span className="text-lg font-bold">P</span>
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-bold text-white">PESO</p>
                <p className="text-[11px] text-slate-200/80">Applicant Portal</p>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className={cn(
              'text-slate-200 hover:text-white transition-colors lg:hidden',
              collapsed && 'invisible'
            )}
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center gap-4 rounded-3xl px-4 py-3 transition-all duration-200',
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'text-slate-300/80 hover:bg-white/10 hover:text-white'
                  )
                }
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white transition-colors duration-200">
                  <Icon size={18} />
                </span>
                {!collapsed && (
                  <>
                    <span className="text-sm font-medium truncate">{item.label}</span>
                    {item.badge ? (
                      <span className="ml-auto rounded-full bg-rose-500 px-2 py-1 text-[11px] font-semibold text-white">
                        {item.badge}
                      </span>
                    ) : null}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-white/10 px-4 py-4">
          <div className="space-y-3">
            <NavLink
              to="/applicant/help"
              onClick={() => setMobileOpen(false)}
              className="group flex items-center gap-4 rounded-3xl px-4 py-3 text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              <HelpCircle size={18} />
              {!collapsed && <span className="text-sm font-medium">{t('helpCenter')}</span>}
            </NavLink>
            <button
              type="button"
              onClick={handleLogout}
              className="group flex w-full items-center gap-4 rounded-3xl px-4 py-3 text-rose-300 hover:bg-red-500/10 hover:text-rose-100 transition-colors"
            >
              <LogOut size={18} />
              {!collapsed && <span className="text-sm font-semibold">{t('logout')}</span>}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'absolute top-20 right-[-12px] hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-white shadow-xl shadow-slate-950/20 transition-all duration-200 lg:flex',
            collapsed ? 'rotate-180' : ''
          )}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </div>
  );
}
