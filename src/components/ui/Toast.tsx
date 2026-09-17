import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useUIStore, type Toast } from '@/store/ui.store';

const toastConfig: Record<
  Toast['type'],
  { icon: React.ReactNode; styles: string }
> = {
  success: {
    icon: <CheckCircle size={18} />,
    styles: 'bg-success-light border-success text-success',
  },
  error: {
    icon: <AlertCircle size={18} />,
    styles: 'bg-accent-light border-accent text-accent',
  },
  info: {
    icon: <Info size={18} />,
    styles: 'bg-primary-light border-primary text-primary',
  },
  warning: {
    icon: <AlertTriangle size={18} />,
    styles: 'bg-warning-light border-warning text-warning',
  },
};

const ToastItem: React.FC<{ toast: Toast }> = ({ toast }) => {
  const removeToast = useUIStore((s) => s.removeToast);
  const config = toastConfig[toast.type];

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg border
        shadow-card animate-slide-up min-w-[280px] max-w-[400px]
        ${config.styles}
      `}
    >
      <div className="flex-shrink-0">{config.icon}</div>
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={() => removeToast(toast.id)}
        className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const toasts = useUIStore((s) => s.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 md:right-6 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};
