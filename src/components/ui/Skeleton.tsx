import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string;
  height?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
}) => {
  const baseClasses = 'animate-pulse bg-slate-200';

  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ width, height }}
    />
  );
};

// Pre-built skeleton patterns
export const CardSkeleton: React.FC = () => (
  <div className="bg-white border border-border rounded-lg shadow-card p-4 space-y-3">
    <Skeleton variant="text" className="w-1/3 h-4" />
    <Skeleton variant="text" className="w-full h-3" />
    <Skeleton variant="text" className="w-2/3 h-3" />
    <div className="flex gap-2 pt-2">
      <Skeleton variant="rectangular" className="w-16 h-6" />
      <Skeleton variant="rectangular" className="w-20 h-6" />
    </div>
  </div>
);

export const ListSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex items-center gap-3 p-3">
        <Skeleton variant="circular" className="w-10 h-10" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-1/3 h-4" />
          <Skeleton variant="text" className="w-2/3 h-3" />
        </div>
      </div>
    ))}
  </div>
);

export const PageSkeleton: React.FC = () => (
  <div className="space-y-6">
    <Skeleton variant="text" className="w-48 h-8" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
    <CardSkeleton />
  </div>
);
