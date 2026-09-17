import React from 'react';

interface TextareaProps {
  label?: string;
  error?: string;
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
  className?: string;
  name?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, showCount = false, maxLength, className = '', ...props }, ref) => {
    const charCount = typeof props.value === 'string' ? props.value.length : 0;

    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-text-dark">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          maxLength={maxLength}
          className={`
            w-full px-3 py-2.5 text-sm text-text-dark bg-white
            border rounded-lg outline-none resize-y min-h-[80px]
            transition-all duration-200
            placeholder:text-text-light
            focus:border-primary focus:ring-2 focus:ring-primary/20
            disabled:bg-surface disabled:cursor-not-allowed
            ${error ? 'border-accent ring-1 ring-accent/20' : 'border-border'}
          `}
          {...props}
        />
        <div className="flex justify-between">
          {error && <p className="text-xs text-accent">{error}</p>}
          {showCount && maxLength && (
            <p className="text-xs text-text-light ml-auto">
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
