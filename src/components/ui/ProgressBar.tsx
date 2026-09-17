import React from 'react';

type ProgressVariant = 'primary' | 'success' | 'warning' | 'accent' | 'purple';

interface ProgressBarProps {
  value: number; // 0-100
  variant?: ProgressVariant;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

const variantColors: Record<ProgressVariant, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  accent: 'bg-accent',
  purple: 'bg-purple',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  variant = 'primary',
  label,
  showValue = true,
  size = 'md',
  className = '',
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-xs font-medium text-text-mid">{label}</span>
          )}
          {showValue && (
            <span className="text-xs font-semibold text-text-dark">
              {Math.round(clampedValue)}%
            </span>
          )}
        </div>
      )}
      <div
        className={`
          w-full bg-slate-100 rounded-full overflow-hidden
          ${size === 'sm' ? 'h-1.5' : 'h-2.5'}
        `}
      >
        <div
          className={`
            h-full rounded-full transition-all duration-500 ease-out
            ${variantColors[variant]}
          `}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};
