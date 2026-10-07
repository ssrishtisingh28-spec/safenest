import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';

export default function SignUpScreen() {
  const { navigateTo, login, theme, toggleTheme, showToast } = useVault();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Compute password strength (4 segments)
  const getPasswordScore = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const score = getPasswordScore(password);
  const strengthLabels = ['No password', 'Weak password', 'Moderate security', 'Strong sanctuary', 'Fortified (Military Grade)'];

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast('Passwords do not match!', 'error');
      return;
    }
    if (!termsAccepted) {
      showToast('Please agree to the Terms of Service & Privacy Policy', 'error');
      return;
    }

    showToast('Vault created successfully! Generating AES master keys...', 'success');
    login(email || fullName);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-margin-mobile md:p-margin-desktop relative overflow-hidden bg-background text-on-surface">
      {/* Atmospheric Background Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface-container-high/50 via-background to-background pointer-events-none" />
      <div className="absolute -top-64 -left-64 w-128 h-128 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-64 -right-64 w-128 h-128 bg-secondary-container/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors z-20"
        title="Toggle Theme"
      >
        <span className="material-symbols-outlined text-[20px]">
          {theme === 'dark' ? 'light_mode' : 'dark_mode'}
        </span>
      </button>

      <main className="w-full max-w-[480px] glass-panel inner-glow rounded-2xl p-6 md:p-8 flex flex-col gap-6 relative z-10 my-8 shadow-2xl">
        {/* Header */}
        <header className="text-center flex flex-col gap-2">
          <div className="flex justify-center mb-1">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                shield_lock
              </span>
            </div>
          </div>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
            Create SafeNest
          </h1>
          <p className="font-body-md text-sm text-on-surface-variant">
            Fortify your digital sanctuary.
          </p>
        </header>

        {/* Divider */}
        <div className="h-px w-full bg-white/10" />

        {/* Form */}
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-xs text-on-surface-variant ml-1" htmlFor="fullName">
              Full Name
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                person
              </span>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full bg-[#080C14] recessed-input text-on-surface font-body-md text-sm rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-xs text-on-surface-variant ml-1" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                mail
              </span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full bg-[#080C14] recessed-input text-on-surface font-body-md text-sm rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-xs text-on-surface-variant ml-1" htmlFor="phone">
              Phone Number
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                call
              </span>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 019-2834"
                className="w-full bg-[#080C14] recessed-input text-on-surface font-body-md text-sm rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-xs text-on-surface-variant ml-1" htmlFor="password">
              Create Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                key
              </span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
                className="w-full bg-[#080C14] recessed-input text-on-surface font-body-md text-sm rounded-xl py-3 pl-11 pr-12 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors p-1"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>

            {/* Strength Indicator (4 bars) */}
            <div className="mt-2 flex gap-1.5 w-full h-1.5 rounded-full overflow-hidden bg-surface-container-highest">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`h-full flex-1 transition-all duration-300 ${
                    score >= i
                      ? score === 1
                        ? 'bg-error'
                        : score === 2
                        ? 'bg-amber-400'
                        : score === 3
                        ? 'bg-primary'
                        : 'bg-emerald-400'
                      : 'bg-surface-container-highest'
                  }`}
                />
              ))}
            </div>
            <p className="font-label-sm text-xs text-on-surface-variant mt-0.5 ml-1">
              {strengthLabels[score]}
            </p>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-xs text-on-surface-variant ml-1" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                lock
              </span>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="w-full bg-[#080C14] recessed-input text-on-surface font-body-md text-sm rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40 font-mono"
              />
            </div>
          </div>

          {/* Terms & Privacy */}
          <div className="flex items-start gap-2.5 mt-2">
            <input
              id="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded bg-[#080C14] border-outline-variant text-primary focus:ring-primary"
            />
            <label htmlFor="terms" className="font-label-md text-xs text-on-surface-variant cursor-pointer">
              I agree to the{' '}
              <span className="text-primary hover:underline">Terms of Service</span> and{' '}
              <span className="text-primary hover:underline">Privacy Policy</span>.
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="signup-submit-btn"
            className="mt-3 w-full py-3.5 rounded-xl font-label-md text-sm text-white bg-gradient-to-r from-secondary-container to-primary-container shadow-[0_4px_16px_rgba(137,206,255,0.35)] hover:opacity-95 active:scale-[0.98] transition-all duration-200 flex justify-center items-center gap-2 font-semibold"
          >
            <span>Create SafeNest</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </form>

        {/* Footer */}
        <div className="text-center">
          <p className="font-label-md text-xs text-on-surface-variant">
            Already have an account?{' '}
            <button
              id="goto-login-btn"
              onClick={() => navigateTo('login')}
              className="text-primary font-semibold hover:underline transition-colors ml-1"
            >
              Login
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
