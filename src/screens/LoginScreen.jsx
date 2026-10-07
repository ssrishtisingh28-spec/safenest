import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';

export default function LoginScreen() {
  const { navigateTo, login, theme, toggleTheme, showToast } = useVault();
  const [email, setEmail] = useState('alex.sterling@example.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [biometricScanning, setBiometricScanning] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    login(email);
  };

  const handleBiometricLogin = () => {
    setBiometricScanning(true);
    showToast('Scanning fingerprint / FaceID sensor...', 'info');
    setTimeout(() => {
      setBiometricScanning(false);
      login('alex.sterling@example.com');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-margin-mobile md:p-margin-desktop relative overflow-hidden bg-background text-on-surface">
      {/* Ambient background glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary-container/10 blur-[150px] pointer-events-none" />

      {/* Theme toggle top-right */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors z-20"
        title="Toggle Theme"
      >
        <span className="material-symbols-outlined text-[20px]">
          {theme === 'dark' ? 'light_mode' : 'dark_mode'}
        </span>
      </button>

      <div className="w-full max-w-[440px] z-10 py-8">
        {/* Logo Container */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl glass-panel inner-glow flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <img
              alt="SafeNest Logo"
              className="w-12 h-12 object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6G6HdAsLW1o7wOiQu_0WAMCeymisE3Q-2W1lpegFKj8d14TsFF5GoMs0dN5Lns_QgvUzZAoYhQTSsdSIf237rMf3vASa_RAvFFHEejLL6rUISuT4PwEfQ31DG9xaA8_C3HnL0M2UNZWEfsOslsyzlWQ7OywMqZE_lmcsd1dPIRVNbNg6pqL1GgsfGTFonKGwpDOuE34JSMssqDJDs-qoet9tTYaz1KXPfo_f-JnsbAGvTGJRaNbRt"
              onError={(e) => { e.currentTarget.src = "/safenest_logo.png"; }}
            />
          </div>
        </div>

        {/* Login Card */}
        <div className="glass-panel inner-glow rounded-2xl p-8 flex flex-col gap-6 shadow-2xl">
          {/* Header */}
          <div className="text-center">
            <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface mb-2">
              Welcome Back
            </h1>
            <p className="font-body-md text-sm text-on-surface-variant">
              Your digital nest is waiting.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-xs text-on-surface-variant px-1" htmlFor="email">
                Email / User ID
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors z-10 text-[20px]">
                  person
                </span>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your credentials"
                  required
                  className="w-full bg-[#080C14] recessed-input rounded-xl font-body-md text-sm text-on-surface pl-11 pr-4 py-3 focus:ring-1 focus:ring-primary focus:outline-none transition-all placeholder:text-on-surface-variant/50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-xs text-on-surface-variant px-1" htmlFor="password">
                Password
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors z-10 text-[20px]">
                  lock
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#080C14] recessed-input rounded-xl font-body-md text-sm text-on-surface pl-11 pr-12 py-3 focus:ring-1 focus:ring-primary focus:outline-none transition-all placeholder:text-on-surface-variant/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors p-1"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Options Row */}
            <div className="flex items-center justify-between mt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer group select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-outline-variant bg-[#080C14] text-primary focus:ring-primary/50"
                />
                <span className="font-label-md text-on-surface-variant group-hover:text-on-surface transition-colors">
                  Remember Me
                </span>
              </label>
              <button
                type="button"
                onClick={() => showToast('Password reset link sent to registered phone & email', 'info')}
                className="font-label-md text-primary hover:underline transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3.5 mt-2">
              <button
                type="submit"
                id="login-submit-btn"
                className="w-full bg-gradient-to-r from-primary-container to-secondary-container hover:from-primary hover:to-secondary text-white rounded-xl py-3.5 font-label-md text-sm shadow-[0_4px_16px_rgba(14,165,233,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 font-semibold"
              >
                <span>Login to SafeNest</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <div className="relative flex items-center py-1">
                <div className="flex-grow border-t border-white/10" />
                <span className="flex-shrink-0 mx-4 font-label-sm text-xs text-on-surface-variant">OR</span>
                <div className="flex-grow border-t border-white/10" />
              </div>

              <button
                type="button"
                id="biometric-login-btn"
                onClick={handleBiometricLogin}
                disabled={biometricScanning}
                className="w-full bg-surface-container/60 hover:bg-surface-container border border-white/10 rounded-xl py-3.5 font-label-md text-sm text-on-surface transition-all active:scale-[0.98] flex items-center justify-center gap-2.5"
              >
                <span className={`material-symbols-outlined text-primary text-[22px] ${biometricScanning ? 'animate-pulse' : ''}`}>
                  fingerprint
                </span>
                <span>{biometricScanning ? 'Verifying Biometrics...' : 'Login with Biometrics'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="font-label-md text-sm text-on-surface-variant">
            New to SafeNest?{' '}
            <button
              id="goto-signup-btn"
              onClick={() => navigateTo('signup')}
              className="text-primary hover:underline font-semibold transition-colors ml-1"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
