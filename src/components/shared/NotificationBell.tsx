import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bell,
  Briefcase,
  MessageSquare,
  Award,
  CheckCircle,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

interface NotificationItem {
  id: string;
  type: 'briefcase' | 'message' | 'award' | 'check';
  title: string;
  description: string;
  time: string;
  unread: boolean;
}

interface ToastItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const sampleNotifications: NotificationItem[] = [
  {
    id: 'n1',
    type: 'briefcase',
    title: 'New Job Match',
    description: 'Full Stack Developer at TechVentures — 92% match',
    time: '2m ago',
    unread: true,
  },
  {
    id: 'n2',
    type: 'message',
    title: 'New Message',
    description: 'Anna Cruz sent you a message',
    time: '14m ago',
    unread: true,
  },
  {
    id: 'n3',
    type: 'award',
    title: 'Achievement Unlocked',
    description: 'Completed Python for Data Science course',
    time: '1h ago',
    unread: false,
  },
  {
    id: 'n4',
    type: 'check',
    title: 'Application Update',
    description: 'Application for Data Analyst under review',
    time: '2h ago',
    unread: false,
  },
];

function getIcon(type: NotificationItem['type']) {
  switch (type) {
    case 'briefcase':
      return <Briefcase size={16} className="text-white" />;
    case 'message':
      return <MessageSquare size={16} className="text-white" />;
    case 'award':
      return <Award size={16} className="text-white" />;
    case 'check':
      return <CheckCircle size={16} className="text-white" />;
    default:
      return <Bell size={16} className="text-white" />;
  }
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(sampleNotifications);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const unreadCount = useMemo(
    () => notifications.filter((item) => item.unread).length,
    [notifications]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((toast) =>
      window.setTimeout(() => {
        setToasts((current) => current.filter((item) => item.id !== toast.id));
      }, 10000)
    );

    return () => timers.forEach(window.clearTimeout);
  }, [toasts]);

  const handleBellClick = () => {
    setDropdownOpen((open) => !open);
    if (unreadCount > 0) {
      const unreadNotifications = notifications.filter((item) => item.unread);
      const queued = unreadNotifications.map((item) => ({
        id: `toast-${item.id}`,
        title: item.title,
        description: item.description,
        icon: getIcon(item.type),
      }));
      setToasts((current) => [...queued, ...current].slice(0, 3));
      setNotifications((items) => items.map((item) => ({ ...item, unread: false })));
    }
  };

  const markAllRead = () => {
    setNotifications((items) => items.map((item) => ({ ...item, unread: false })));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={handleBellClick}
        className="relative rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-slate-700 shadow-sm shadow-slate-900/5 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg shadow-red-500/20">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-3 w-80 rounded-3xl bg-white shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200/60 border border-slate-200/70 overflow-hidden z-50"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
              <div>
                <p className="text-sm font-semibold text-slate-900">Notifications</p>
                <p className="text-xs text-slate-500">Stay updated on your career activity</p>
              </div>
              <button
                type="button"
                onClick={markAllRead}
                className="text-xs font-semibold text-blue-600 hover:text-blue-500"
              >
                Mark all read
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setNotifications((items) =>
                      items.map((current) =>
                        current.id === item.id ? { ...current, unread: false } : current
                      )
                    );
                  }}
                  className={cn(
                    'flex w-full items-start gap-4 px-5 py-4 text-left transition-colors',
                    item.unread ? 'bg-blue-50/50' : 'hover:bg-slate-50'
                  )}
                >
                  <span className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500 text-white">
                    {getIcon(item.type)}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                    <p className="text-[11px] text-slate-400 mt-2">{item.time}</p>
                  </div>
                  {item.unread && <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-500" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed right-5 top-24 z-[120] flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 20, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, y: -10, scale: 0.98 }}
              className="w-80 rounded-3xl bg-white p-4 shadow-2xl shadow-slate-900/10 border border-slate-200"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500 text-white">
                  {toast.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{toast.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{toast.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setToasts((list) => list.filter((item) => item.id !== toast.id))}
                  className="text-slate-400 hover:text-slate-600"
                  aria-label="Dismiss notification"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
