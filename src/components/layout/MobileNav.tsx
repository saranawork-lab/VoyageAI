import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Compass, TrendingUp, Users, User } from 'lucide-react';
import { ROUTES } from '@/utils/constants';

const mobileNavItems = [
  { label: 'Home', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'My Path', path: ROUTES.CAREER_GUIDANCE, icon: Compass },
  { label: 'Explore', path: ROUTES.JOB_MARKET, icon: TrendingUp },
  { label: 'Mentor', path: ROUTES.MENTORS, icon: Users },
  { label: 'Profile', path: ROUTES.SETTINGS, icon: User },
];

export const MobileNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border md:hidden pb-safe">
      <div className="flex items-center justify-around h-16">
        {mobileNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center gap-1 flex-1 py-2"
            >
              <Icon
                size={22}
                className={`transition-colors ${
                  isActive ? 'text-primary' : 'text-text-light'
                }`}
              />
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-text-light'
                }`}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
