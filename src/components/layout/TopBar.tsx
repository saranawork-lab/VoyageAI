import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Bell, Compass, Moon, Sun } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';
import { Avatar } from '@/components/ui/Avatar';
import { ROUTES } from '@/utils/constants';

const pageTitles: Record<string, string> = {
  [ROUTES.DASHBOARD]: 'Dashboard',
  [ROUTES.CAREER_GUIDANCE]: 'Career Guidance',
  [ROUTES.STUDY_ABROAD]: 'Study Abroad',
  [ROUTES.JOB_MARKET]: 'Job Market Intelligence',
  [ROUTES.STARTUP_ADVISOR]: 'Startup Advisor',
  [ROUTES.INVESTOR_ACCESS]: 'Deal Flow',
  [ROUTES.PARENT_DASHBOARD]: 'Parent Dashboard',
  [ROUTES.MENTORS]: 'Mentors',
  [ROUTES.INTERNSHIPS]: 'Internships',
  [ROUTES.SETTINGS]: 'Settings',
  [ROUTES.UPGRADE]: 'Upgrade to Pro',
};

export const TopBar: React.FC = () => {
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const { openSidebar, theme, toggleTheme } = useUIStore();

  const title = pageTitles[location.pathname] || 'VoyageAI';

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-b border-border">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            onClick={openSidebar}
            className="md:hidden p-2 rounded-lg text-text-mid hover:bg-surface transition-colors"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Mobile logo */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-purple flex items-center justify-center">
              <Compass size={14} className="text-white" />
            </div>
          </div>

          {/* Page title */}
          <h1 className="text-lg font-semibold text-text-dark hidden md:block">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-text-mid hover:bg-surface transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notification bell */}
          <button
            className="relative p-2 rounded-lg text-text-mid hover:bg-surface transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
          </button>

          {/* User avatar (desktop only) */}
          <div className="hidden md:block">
            <Avatar
              name={user?.name || 'User'}
              imageUrl={user?.avatarUrl}
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* Mobile page title */}
      <div className="md:hidden px-4 pb-3">
        <h1 className="text-lg font-semibold text-text-dark">{title}</h1>
      </div>
    </header>
  );
};
