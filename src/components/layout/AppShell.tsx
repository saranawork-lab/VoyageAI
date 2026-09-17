import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { ToastContainer } from '@/components/ui/Toast';

export const AppShell: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface">
      {/* Sidebar — fixed on desktop, drawer on mobile */}
      <Sidebar />

      {/* Main content area */}
      <div className="md:ml-[260px] flex flex-col min-h-screen">
        {/* Top bar */}
        <TopBar />

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav />

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};
