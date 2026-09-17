import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { getMe } from '@/api/auth.api';
import { ROUTES } from '@/utils/constants';
import { PageSkeleton } from '@/components/ui/Skeleton';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading, setUser, setToken, setLoading, clearAuth } = useAuthStore();
  const location = useLocation();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated) {
        setChecked(true);
        return;
      }

      try {
        const response = await getMe();
        if (response.success && response.data) {
          setUser(response.data);
          setToken('restored-session-token');
        } else {
          clearAuth();
        }
      } catch {
        clearAuth();
      } finally {
        setLoading(false);
        setChecked(true);
      }
    };

    checkAuth();
  }, [isAuthenticated, setUser, setToken, setLoading, clearAuth]);

  if (!checked || isLoading) {
    return (
      <div className="min-h-screen bg-surface p-6">
        <PageSkeleton />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
