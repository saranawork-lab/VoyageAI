import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { ROUTES } from '@/utils/constants';

interface ProGuardProps {
  children: React.ReactNode;
  featureName?: string;
}

export const ProGuard: React.FC<ProGuardProps> = ({ children, featureName }) => {
  const tier = useAuthStore((s) => s.tier);
  const location = useLocation();

  if (tier !== 'pro') {
    return (
      <Navigate
        to={ROUTES.UPGRADE}
        state={{ from: location, blockedFeature: featureName }}
        replace
      />
    );
  }

  return <>{children}</>;
};
