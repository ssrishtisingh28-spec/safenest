import React from 'react';
import { useVault } from '../../context/VaultContext';

export default function LogoutModal() {
  const { logoutModalOpen, setLogoutModalOpen, logout } = useVault();

  if (!logoutModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={() => setLogoutModalOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md glass-panel-heavy rounded-2xl p-6 md:p-8 border border-white/15 z-10 shadow-2xl flex flex-col items-center text-center gap-5">
        {/* Warning Icon */}
        <div className="w-16 h-16 rounded-full bg-error/10 border border-error/20 flex items-center justify-center text-error">
          <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            lock
          </span>
        </div>

        <div>
          <h3 className="font-headline-md text-xl font-bold text-on-surface mb-2">
            Lock & Exit SafeNest?
          </h3>
          <p className="font-body-md text-sm text-on-surface-variant max-w-xs mx-auto">
            Your encryption keys will be purged from active browser memory and all vaults will be locked securely.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full mt-2">
          <button
            type="button"
            id="cancel-logout-btn"
            onClick={() => setLogoutModalOpen(false)}
            className="flex-1 py-3 rounded-xl border border-white/10 font-label-md text-sm text-on-surface hover:bg-white/5 transition-colors"
          >
            Stay in Vault
          </button>
          <button
            type="button"
            id="confirm-logout-btn"
            onClick={logout}
            className="flex-1 py-3 rounded-xl bg-error text-white font-label-md text-sm hover:bg-error/90 shadow-lg shadow-error/20 active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Lock & Logout
          </button>
        </div>
      </div>
    </div>
  );
}
