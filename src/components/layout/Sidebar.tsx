import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Compass, Globe, TrendingUp, Briefcase, Users,
  Rocket, Handshake, GraduationCap, X, Crown, Settings, LogOut,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import {
  ROUTES, STUDENT_NAV, FOUNDER_NAV, INVESTOR_NAV, PARENT_NAV,
} from '@/utils/constants';

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard size={20} />,
  Compass: <Compass size={20} />,
  Globe: <Globe size={20} />,
  TrendingUp: <TrendingUp size={20} />,
  Briefcase: <Briefcase size={20} />,
  Users: <Users size={20} />,
  Rocket: <Rocket size={20} />,
  Handshake: <Handshake size={20} />,
  GraduationCap: <GraduationCap size={20} />,
};

export const Sidebar: React.FC = () => {
  const { user, role, tier } = useAuthStore();
  const { sidebarOpen, closeSidebar } = useUIStore();
  const location = useLocation();

  const navItems =
    role === 'student' ? STUDENT_NAV :
    role === 'founder' ? FOUNDER_NAV :
    role === 'investor' ? INVESTOR_NAV :
    role === 'parent' ? PARENT_NAV : STUDENT_NAV;

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden animate-fade-in"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-[260px] bg-white border-r border-border
          flex flex-col transition-transform duration-300 ease-out
          md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-border">
          <NavLink to={ROUTES.DASHBOARD} className="flex items-center gap-2.5" onClick={closeSidebar}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple flex items-center justify-center">
              <Compass size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-text-dark">
              Voyage<span className="text-primary">AI</span>
            </span>
          </NavLink>
          <button
            onClick={closeSidebar}
            className="md:hidden p-1 rounded-lg text-text-light hover:bg-surface"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-200
                  ${
                    location.pathname === item.path
                      ? 'bg-primary-light text-primary'
                      : 'text-text-mid hover:bg-surface hover:text-text-dark'
                  }
                `}
              >
                <span className={location.pathname === item.path ? 'text-primary' : 'text-text-light'}>
                  {iconMap[item.icon] || <LayoutDashboard size={20} />}
                </span>
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Settings */}
          <div className="mt-6 pt-4 border-t border-border space-y-1">
            <NavLink
              to={ROUTES.SETTINGS}
              onClick={closeSidebar}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-all duration-200
                ${
                  location.pathname === ROUTES.SETTINGS
                    ? 'bg-primary-light text-primary'
                    : 'text-text-mid hover:bg-surface hover:text-text-dark'
                }
              `}
            >
              <Settings size={20} className={location.pathname === ROUTES.SETTINGS ? 'text-primary' : 'text-text-light'} />
              Settings
            </NavLink>
          </div>
        </nav>

        {/* Pro Upgrade Banner */}
        {tier === 'free' && (
          <div className="mx-3 mb-3">
            <NavLink
              to={ROUTES.UPGRADE}
              onClick={closeSidebar}
              className="block p-3 rounded-lg bg-gradient-to-r from-primary/5 to-purple/5 border border-primary/20 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <Crown size={16} className="text-warning" />
                <span className="text-sm font-semibold text-text-dark">Upgrade to Pro</span>
              </div>
              <p className="text-xs text-text-light">Unlock unlimited AI, mentors & more</p>
            </NavLink>
          </div>
        )}

        {/* User Info */}
        <div className="px-3 pb-4 border-t border-border pt-3">
          <div className="flex items-center gap-3 px-2">
            <Avatar name={user?.name || 'User'} imageUrl={user?.avatarUrl} size="md" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-dark truncate">
                {user?.name || 'User'}
              </p>
              <Badge variant={tier === 'pro' ? 'purple' : 'default'} size="sm">
                {tier === 'pro' ? 'PRO' : 'FREE'}
              </Badge>
            </div>
            <button
              onClick={() => useAuthStore.getState().clearAuth()}
              className="p-1.5 rounded-lg text-text-light hover:bg-surface hover:text-accent transition-colors"
              aria-label="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
