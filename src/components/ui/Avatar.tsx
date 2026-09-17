import React from 'react';
import { getInitials } from '@/utils/formatters';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  name: string;
  imageUrl?: string | null;
  size?: AvatarSize;
  className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

const bgColors = [
  'bg-primary/10 text-primary',
  'bg-purple/10 text-purple',
  'bg-success/10 text-success',
  'bg-warning/10 text-warning',
  'bg-accent/10 text-accent',
];

export const Avatar: React.FC<AvatarProps> = ({
  name,
  imageUrl,
  size = 'md',
  className = '',
}) => {
  // Deterministic color based on name
  const colorIndex = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % bgColors.length;

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        width={40}
        height={40}
        className={`
          rounded-full object-cover flex-shrink-0
          ${sizeClasses[size]}
          ${className}
        `}
      />
    );
  }

  return (
    <div
      className={`
        rounded-full flex items-center justify-center font-semibold flex-shrink-0
        ${sizeClasses[size]}
        ${bgColors[colorIndex]}
        ${className}
      `}
    >
      {getInitials(name)}
    </div>
  );
};
