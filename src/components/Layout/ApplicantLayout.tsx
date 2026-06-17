import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ApplicantSidebar from './ApplicantSidebar';
import TopBar from './TopBar';
import { cn } from '../../lib/utils';

export default function ApplicantLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const contentMargin = collapsed ? 'lg:ml-[92px]' : 'lg:ml-[300px]';

  return (
    <div className="min-h-screen bg-[#f4f6fb] dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <ApplicantSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className={cn('min-h-screen transition-all duration-300', contentMargin)}>
        <TopBar onMenuClick={() => setMobileOpen(true)} />

        <main className="px-4 py-6 sm:px-6 lg:px-10 xl:px-12">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
