import React from 'react';
import { Loader2, ArrowRight } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  id?: string;
  withArrow?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark shadow-sm',
  secondary: 'bg-white dark:bg-surface text-text-dark border border-border hover:bg-gray-50 dark:hover:bg-border active:bg-gray-100 dark:active:bg-border/80',
  ghost: 'bg-transparent text-text-mid hover:bg-surface dark:hover:bg-border active:bg-slate-100 dark:active:bg-border/80',
  danger: 'bg-accent text-white hover:bg-red-700 active:bg-red-800 shadow-sm',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  id,
  withArrow = false,
}) => {
  const [isClicking, setIsClicking] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (withArrow) {
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 500); // Reset after animation
    }
    if (onClick) onClick(e);
  };

  return (
    <button
      id={id}
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`
        group relative overflow-hidden
        inline-flex items-center justify-center font-medium rounded-lg
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-1
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {loading && <Loader2 className="animate-spin relative z-10" size={size === 'sm' ? 14 : 18} />}
      
      {/* Text wrapper to slightly shift when arrow appears */}
      <span className={`relative z-10 flex items-center transition-all duration-300 ${withArrow ? 'group-hover:pr-6 group-hover:-translate-x-1' : ''}`}>
        {children}
      </span>

      {/* The sliding arrow */}
      {withArrow && !loading && (
        <span 
          className={`
            absolute right-4 z-10 flex items-center justify-center transition-all duration-300
            ${isClicking 
              ? 'translate-x-[150%] opacity-0 duration-500' // Shoot off to the right on click
              : 'translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100' // Slide in on hover
            }
          `}
        >
          <ArrowRight size={size === 'sm' ? 16 : 20} />
        </span>
      )}
      
      {/* Background sweep effect on click for extra premium feel */}
      {withArrow && isClicking && (
        <span className="absolute inset-0 z-0 bg-white/20 dark:bg-white/10 animate-sweep-right rounded-lg pointer-events-none" />
      )}
    </button>
  );
};
