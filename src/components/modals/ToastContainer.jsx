import React from 'react';
import { useVault } from '../../context/VaultContext';

export default function ToastContainer() {
  const { toasts } = useVault();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl glass-panel-heavy border shadow-xl flex items-center gap-3 transition-all duration-300 animate-slide-up ${
              isSuccess
                ? 'border-emerald-500/30 text-emerald-300'
                : isError
                ? 'border-error/40 text-error'
                : 'border-primary/30 text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-xl shrink-0">
              {isSuccess ? 'check_circle' : isError ? 'error' : 'info'}
            </span>
            <span className="font-body-md text-xs md:text-sm text-on-surface flex-1">
              {toast.message}
            </span>
          </div>
        );
      })}
    </div>
  );
}
