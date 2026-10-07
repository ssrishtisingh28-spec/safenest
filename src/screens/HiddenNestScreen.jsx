import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';

export default function HiddenNestScreen() {
  const { 
    hiddenNestLocked, 
    unlockHiddenNest, 
    lockHiddenNest, 
    hiddenNestFiles, 
    setPinModalOpen,
    showToast 
  } = useVault();

  const [biometricScanning, setBiometricScanning] = useState(false);
  const [revealedSecrets, setRevealedSecrets] = useState({});

  const handleBiometricUnlock = () => {
    setBiometricScanning(true);
    showToast('Validating biometric token with Secure Enclave...', 'info');

    setTimeout(() => {
      setBiometricScanning(false);
      unlockHiddenNest();
    }, 1600);
  };

  const toggleRevealSecret = (id) => {
    setRevealedSecrets(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen pt-20 md:pt-28 pb-28 md:pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col items-center justify-center relative">
      {/* Ambient glow background */}
      <div className="ambient-glow fixed inset-0 pointer-events-none -z-10" />

      {hiddenNestLocked ? (
        /* LOCKED STATE (Exact Stitch Match) */
        <div className="relative w-full max-w-md flex flex-col items-center text-center my-auto py-8">
          {/* Biometric / Lock Prompt Area */}
          <div 
            onClick={handleBiometricUnlock}
            className={`relative w-40 h-40 mb-10 flex items-center justify-center rounded-full bg-surface-container-highest/50 backdrop-blur-md glass-panel shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-pointer group transition-all duration-300 ${
              biometricScanning ? 'scale-105 border-primary shadow-[0_0_40px_rgba(137,206,255,0.4)]' : 'biometric-pulse'
            }`}
          >
            {/* Inner glow ring */}
            <div className="absolute inset-2 rounded-full border border-primary/30 group-hover:border-primary/60 transition-colors" />

            {/* Icon */}
            <span
              className={`material-symbols-outlined text-6xl text-primary drop-shadow-[0_0_15px_rgba(137,206,255,0.5)] group-hover:scale-110 transition-transform ${
                biometricScanning ? 'animate-pulse' : ''
              }`}
              style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}
            >
              {biometricScanning ? 'fingerprint' : 'lock'}
            </span>
          </div>

          {/* Headers */}
          <div className="text-center mb-10 space-y-3">
            <h1 className="font-headline-xl text-2xl md:text-3xl font-bold text-on-surface">
              Hidden Nest is Locked
            </h1>
            <p className="font-body-md text-sm text-on-surface-variant max-w-xs mx-auto leading-relaxed">
              Authentication required to access isolated secure environment.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-4 px-2">
            {/* Primary Action (Biometrics) */}
            <button
              id="unlock-biometrics-btn"
              onClick={handleBiometricUnlock}
              disabled={biometricScanning}
              className="w-full relative group overflow-hidden rounded-xl p-0.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-container to-primary-container opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-surface/20 backdrop-blur-sm rounded-[10px] flex items-center justify-center gap-3 py-4 px-6 font-label-md text-sm text-white font-bold tracking-wide">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  fingerprint
                </span>
                <span>{biometricScanning ? 'Scanning Biometrics...' : 'Unlock with Biometrics'}</span>
              </div>
            </button>

            {/* Secondary Action (PIN Keypad) */}
            <button
              id="unlock-pin-btn"
              onClick={() => setPinModalOpen(true)}
              className="w-full relative group rounded-xl glass-panel hover:bg-surface-container/70 backdrop-blur-md transition-all duration-300 active:scale-[0.98] py-4 px-6 flex items-center justify-center gap-3 font-label-md text-sm text-on-surface border border-white/10"
            >
              <span className="material-symbols-outlined text-xl text-on-surface-variant">dialpad</span>
              <span>Enter with PIN</span>
            </button>
          </div>

          {/* Isolation Footer */}
          <div className="mt-12 flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container/60 border border-white/10 backdrop-blur-sm">
            <span className="material-symbols-outlined text-sm text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
              shield
            </span>
            <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-widest opacity-90">
              This section is completely isolated from your main SafeNest.
            </span>
          </div>
        </div>
      ) : (
        /* UNLOCKED ENVIRONMENT */
        <div className="w-full max-w-3xl flex flex-col gap-6 py-4 animate-fade-in">
          {/* Unlocked Banner */}
          <div className="glass-panel border-emerald-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  lock_open
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <h2 className="font-headline-md text-xl font-bold text-on-surface">Hidden Nest Unlocked</h2>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono uppercase font-semibold">
                    Air-Gapped
                  </span>
                </div>
                <p className="font-body-md text-xs text-on-surface-variant mt-0.5">
                  Decrypted in transient sandbox. Do not leave unattended.
                </p>
              </div>
            </div>

            <button
              id="lock-hidden-nest-btn"
              onClick={lockHiddenNest}
              className="px-5 py-2.5 rounded-xl bg-error/90 hover:bg-error text-white font-label-md text-sm shadow-md active:scale-95 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">lock</span>
              <span>Lock Vault Now</span>
            </button>
          </div>

          {/* Classified Vault Items */}
          <div className="glass-panel rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <h3 className="font-label-md text-xs text-on-surface-variant uppercase tracking-widest font-semibold pb-2 border-b border-white/5">
              Classified Assets & Secrets
            </h3>

            <div className="flex flex-col gap-4">
              {hiddenNestFiles.map((item) => {
                const isSecretRevealed = !!revealedSecrets[item.id];
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-surface-container/60 border border-white/10 hover:border-primary/40 transition-colors flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-2xl">
                          {item.type === 'pdf' ? 'receipt_long' : item.type === 'key' ? 'vpn_key' : 'password'}
                        </span>
                        <div>
                          <h4 className="font-headline-md text-sm font-semibold text-on-surface">{item.name}</h4>
                          <span className="font-label-sm text-[11px] text-emerald-400 font-mono">
                            {item.classification}
                          </span>
                        </div>
                      </div>

                      <span className="font-label-sm text-xs text-on-surface-variant">{item.size}</span>
                    </div>

                    {item.content && (
                      <div className="bg-[#080C14] p-3 rounded-lg border border-white/5 flex items-center justify-between gap-2">
                        <p className="font-mono text-xs text-primary/90 break-all select-all">
                          {isSecretRevealed ? item.content : '•••••••• •••••••• •••••••• •••••••• •••••••• ••••••••'}
                        </p>
                        <button
                          onClick={() => toggleRevealSecret(item.id)}
                          className="text-on-surface-variant hover:text-primary text-xs p-1"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {isSecretRevealed ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-[11px] text-on-surface-variant pt-1">
                      <span>Modified {item.date}</span>
                      <button
                        onClick={() => {
                          showToast(`Classified item ${item.name} copied to secure memory buffer`, 'success');
                        }}
                        className="text-primary hover:underline flex items-center gap-1 font-label-sm"
                      >
                        <span className="material-symbols-outlined text-[14px]">content_copy</span>
                        Copy Safe Buffer
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
