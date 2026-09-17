import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  error?: string;
  id: string;
  options: SelectOption[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, options, placeholder, className = '', ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-text-dark">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={id}
            className={`
              w-full px-3 py-2.5 text-sm text-text-dark bg-white
              border rounded-lg outline-none appearance-none
              transition-all duration-200 cursor-pointer
              focus:border-primary focus:ring-2 focus:ring-primary/20
              disabled:bg-surface disabled:cursor-not-allowed
              ${error ? 'border-accent ring-1 ring-accent/20' : 'border-border'}
            `}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light pointer-events-none"
          />
        </div>
        {error && <p className="text-xs text-accent">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
