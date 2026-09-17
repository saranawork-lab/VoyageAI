import React from 'react';

interface InputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  id: string;
  type?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  name?: string;
  autoComplete?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, id, className = '', ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-text-dark">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            className={`
              w-full px-3 py-2.5 text-sm text-text-dark bg-white dark:bg-slate-800
              border rounded-lg outline-none transition-all duration-200
              placeholder:text-text-light
              focus:border-primary focus:ring-2 focus:ring-primary/20
              disabled:bg-surface disabled:dark:bg-surface-dark disabled:cursor-not-allowed
              ${icon ? 'pl-10' : ''}
              ${error ? 'border-accent ring-1 ring-accent/20' : 'border-border'}
            `}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-accent">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
