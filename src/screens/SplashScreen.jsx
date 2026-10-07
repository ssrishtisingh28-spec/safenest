import React, { useEffect } from 'react';
import { useVault } from '../context/VaultContext';

export default function SplashScreen() {
  const { navigateTo, user, theme, toggleTheme } = useVault();

  // Auto transition after 2.5s if not manually clicked
  useEffect(() => {
    const timer = setTimeout(() => {
      if (user.isAuthenticated) {
        navigateTo('home');
      } else {
        navigateTo('login');
      }
    }, 2800);
    return () => clearTimeout(timer);
  }, [user.isAuthenticated]);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col justify-center items-center relative font-body-lg bg-background text-on-surface select-none">
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 ambient-glow pointer-events-none" />

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-margin-mobile md:px-margin-desktop max-w-md w-full">
        {/* Logo Container with Pulse Effect */}
        <div 
          onClick={() => navigateTo(user.isAuthenticated ? 'home' : 'login')}
          className="relative w-32 h-32 mb-8 flex items-center justify-center cursor-pointer group"
        >
          {/* Pulsing background circle */}
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl pulse-glow" />
          
          {/* Logo Image */}
          <img
            alt="SafeNest Logo"
            className="relative z-10 w-24 h-24 object-contain drop-shadow-[0_0_20px_rgba(14,165,233,0.5)] group-hover:scale-105 transition-transform"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6G6HdAsLW1o7wOiQu_0WAMCeymisE3Q-2W1lpegFKj8d14TsFF5GoMs0dN5Lns_QgvUzZAoYhQTSsdSIf237rMf3vASa_RAvFFHEejLL6rUISuT4PwEfQ31DG9xaA8_C3HnL0M2UNZWEfsOslsyzlWQ7OywMqZE_lmcsd1dPIRVNbNg6pqL1GgsfGTFonKGwpDOuE34JSMssqDJDs-qoet9tTYaz1KXPfo_f-JnsbAGvTGJRaNbRt"
            onError={(e) => {
              // Fallback to local shield if external URL fails
              e.currentTarget.src = "/safenest_logo.png";
            }}
          />
        </div>

        {/* Typography */}
        <h1 className="font-headline-xl text-4xl md:text-5xl font-bold text-on-surface mb-3 tracking-tight drop-shadow-sm">
          SafeNest
        </h1>
        <p className="font-body-lg text-base md:text-lg text-on-surface-variant max-w-xs mx-auto drop-shadow-sm mb-6">
          Your private space for everything important.
        </p>

        {/* Quick Skip / Enter Button */}
        <div className="flex items-center gap-3">
          <button
            id="splash-enter-btn"
            onClick={() => navigateTo('home')}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-secondary-container to-primary-container text-white font-label-md text-sm shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>Enter Vault</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
          
          <button
            id="splash-theme-btn"
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
            title="Toggle theme"
          >
            <span className="material-symbols-outlined text-[18px]">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>
      </div>

      {/* Loading Indicator */}
      <div className="absolute bottom-12 left-0 right-0 flex flex-col justify-center items-center z-10 gap-2">
        <div className="spinner" />
        <span className="font-label-sm text-[11px] text-on-surface-variant tracking-wider uppercase">
          Fortifying Sanctuary
        </span>
      </div>
    </div>
  );
}
