import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useToast } from '../../contexts/ToastProvider';
import { IconCheck, IconX, IconSparkles } from '../../constants';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 3000); // Auto-dismiss after 3 seconds

    return () => clearTimeout(timer);
  }, [onDismiss]);

  const baseClasses = 'flex items-center p-4 mb-4 text-sm rounded-lg shadow-lg';
  const typeClasses = {
    success: 'text-green-800 bg-green-100 dark:bg-green-800/30 dark:text-green-200',
    error: 'text-red-800 bg-red-100 dark:bg-red-800/30 dark:text-red-200',
    info: 'text-blue-800 bg-blue-100 dark:bg-blue-800/30 dark:text-blue-200',
  };
  
  const Icon = {
    success: <IconCheck className="w-5 h-5"/>,
    error: <IconX className="w-5 h-5" />,
    info: <IconSparkles className="w-5 h-5"/>
  }[type];

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`} role="alert">
      <div className="mr-3">{Icon}</div>
      <span className="font-medium">{message}</span>
      <button type="button" onClick={onDismiss} className="ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg inline-flex h-8 w-8 focus:ring-2" aria-label="Close">
        <IconX className="w-5 h-5" />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();
  const portalRoot = document.body;

  return ReactDOM.createPortal(
    <div className="fixed top-5 right-5 z-[100] w-full max-w-xs">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onDismiss={() => removeToast(toast.id)}
        />
      ))}
    </div>,
    portalRoot
  );
};