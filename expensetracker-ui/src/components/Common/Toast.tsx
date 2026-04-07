import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  onClose,
}) => {
  const typeConfig = {
    success: {
      bgColor: 'bg-success bg-opacity-10',
      borderColor: 'border-success',
      textColor: 'text-success',
      icon: CheckCircle,
    },
    error: {
      bgColor: 'bg-error bg-opacity-10',
      borderColor: 'border-error',
      textColor: 'text-error',
      icon: AlertCircle,
    },
    warning: {
      bgColor: 'bg-warning bg-opacity-10',
      borderColor: 'border-warning',
      textColor: 'text-warning',
      icon: AlertTriangle,
    },
    info: {
      bgColor: 'bg-primary bg-opacity-10',
      borderColor: 'border-primary',
      textColor: 'text-primary',
      icon: Info,
    },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  React.useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`${config.bgColor} ${config.borderColor} border-l-4 p-4 rounded-lg flex items-start gap-3 mb-3 animate-in fade-in slide-in-from-top`}
    >
      <Icon className={`${config.textColor} w-5 h-5 flex-shrink-0 mt-0.5`} />
      <p className={`${config.textColor} text-sm font-medium`}>{message}</p>
    </div>
  );
};

export const ToastContainer: React.FC<{
  toasts: Array<{ id: string; message: string; type?: 'success' | 'error' | 'info' | 'warning' }>;
  onRemove: (id: string) => void;
}> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 max-w-md z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
};

