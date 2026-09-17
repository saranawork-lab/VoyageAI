import React from 'react';

type AccentColor = 'primary' | 'success' | 'warning' | 'accent' | 'purple';

interface CardProps {
  children: React.ReactNode;
  accentColor?: AccentColor;
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  id?: string;
}

const accentBorderColors: Record<AccentColor, string> = {
  primary: 'border-l-primary',
  success: 'border-l-success',
  warning: 'border-l-warning',
  accent: 'border-l-accent',
  purple: 'border-l-purple',
};

export const Card: React.FC<CardProps> = ({
  children,
  accentColor,
  icon,
  title,
  subtitle,
  className = '',
  onClick,
  hoverable = false,
  id,
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`
        bg-white border border-border rounded-lg shadow-card
        ${accentColor ? `border-l-4 ${accentBorderColors[accentColor]}` : ''}
        ${hoverable ? 'hover:shadow-card-hover transition-shadow duration-200 cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {(title || icon) && (
        <div className="flex items-start justify-between p-4 pb-0">
          <div>
            {title && (
              <h3 className="text-sm font-semibold text-text-dark">{title}</h3>
            )}
            {subtitle && (
              <p className="text-xs text-text-light mt-0.5">{subtitle}</p>
            )}
          </div>
          {icon && <div className="text-text-light">{icon}</div>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};
