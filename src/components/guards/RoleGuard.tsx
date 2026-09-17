import React from 'react';
import type { UserRole } from '@/types/user.types';
import { useAuthStore } from '@/store/auth.store';

interface RoleGuardProps {
  roles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  roles,
  children,
  fallback = null,
}) => {
  const role = useAuthStore((s) => s.role);

  if (!role || !roles.includes(role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
