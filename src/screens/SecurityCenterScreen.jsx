import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';

export default function SecurityCenterScreen() {
  const { navigateTo, showToast } = useVault();
  const [recommendations, setRecommendations] = useState([
    { id: 'rec-1', title: 'Rotate 1 credential older than 90 days', done: false, impact: '+4 pts' },
    { id: 'rec-2', title: 'Verify offline emergency seed recovery phrase', done: false, impact: '+4 pts' },
    { id: 'rec-3', title: 'Audit trusted connected hardware keys (YubiKey)', done: true, impact: 'Verified' },
  ]);

  const [score, setScore] = useState(92);

  const handleResolveRec = (id) => {
    setRecommendations(prev =>
      prev.map(r => (r.id === id ? { ...r, done: true } : r))
    );
    setScore(prev => Math.min(100, prev + 4));
    showToast('Security recommendation completed! Vault hardened.', 'success');
  };

  return (
    <div className="min-h-screen pt-20 md:pt-28 pb-28 md:pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-surface-container text-on-surface transition-colors"
            aria-label="Back to Home"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <div>
            <h1 className="font-headline-md text-xl md:text-2xl font-bold text-on-surface">
              Security Center
            </h1>
            <p className="font-label-sm text-xs text-on-surface-variant">
              Comprehensive defense & cryptographic integrity
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            showToast('Running full vault integrity audit...', 'info');
            setTimeout(() => showToast('Audit complete: 0 vulnerabilities found', 'success'), 1500);
          }}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-white/10 text-xs font-label-md text-primary transition-all"
        >
          <span className="material-symbols-outlined text-sm">verified_user</span>
          <span>Run Security Audit</span>
        </button>
      </div>

      {/* Main Grid Layout: Score & Features */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {/* Left Column: Radial Score Card */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="glass-panel inner-glow rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-xl">
            {/* Background glow */}
            <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full scale-150 transform -translate-y-1/4 pointer-events-none" />

            <h2 className="font-label-md text-xs text-on-surface-variant uppercase tracking-widest mb-6 relative z-10 font-semibold">
              Overall Security Score
            </h2>

            {/* Radial Chart */}
            <div className="relative w-48 h-48 mb-6 z-10">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Circle */}
                <circle
                  className="text-surface-container-high"
                  cx="50"
                  cy="50"
                  r="45"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="6"
                />
                {/* Progress Circle */}
                <circle
                  className="text-primary progress-circle"
                  cx="50"
                  cy="50"
                  r="45"
                  fill="transparent"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="7"
                  style={{
                    strokeDasharray: 283,
                    strokeDashoffset: 283 - (score / 100) * 283,
                    transition: 'stroke-dashoffset 1s ease-in-out'
                  }}
                />
              </svg>

              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-headline-xl text-4xl text-primary font-bold">
                  {score}
                </span>
                <span className="font-label-md text-xs text-secondary font-medium mt-0.5">
                  {score >= 95 ? 'Fortified' : 'Excellent'}
                </span>
              </div>
            </div>

            <p className="font-body-md text-xs md:text-sm text-on-surface-variant max-w-xs relative z-10 leading-relaxed">
              Your SafeNest is protected by continuous multi-layer defense, hardware-bound keys, and AES-256 GCM encryption.
            </p>
          </div>

          {/* Device & Session Card */}
          <div className="glass-panel rounded-2xl p-5 flex flex-col gap-3">
            <h3 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              Active Authorized Nodes
            </h3>
            <div className="flex items-center justify-between text-xs py-1">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-lg">computer</span>
                <span className="text-on-surface font-medium">Windows Secure Client (This device)</span>
              </div>
              <span className="text-emerald-400 font-label-sm">Active Now</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1 border-t border-white/5">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-on-surface-variant text-lg">phone_iphone</span>
                <span className="text-on-surface font-medium">iPhone 15 Pro (Secure Enclave)</span>
              </div>
              <span className="text-on-surface-variant font-label-sm">Synced 12m ago</span>
            </div>
          </div>
        </div>

        {/* Right Column: Active Defenses & Recommendations */}
        <div className="md:col-span-7 flex flex-col gap-6">
          {/* Active Defenses List */}
          <div className="glass-panel inner-glow rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-white/10 bg-surface-container/30 flex justify-between items-center">
              <h3 className="font-label-md text-xs text-on-surface-variant uppercase tracking-widest font-semibold">
                Active Defenses
              </h3>
              <span className="text-[11px] text-emerald-400 font-label-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                All Systems Operational
              </span>
            </div>

            <div className="flex flex-col divide-y divide-white/5">
              {/* Feature 1 */}
              <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      password
                    </span>
                  </div>
                  <div>
                    <h4 className="font-body-md text-sm text-on-surface font-semibold">Password Complexity</h4>
                    <p className="font-label-sm text-xs text-on-surface-variant">Zero reused passwords, high entropy</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-primary text-xs font-label-sm font-medium">
                  <span>Strong</span>
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      security
                    </span>
                  </div>
                  <div>
                    <h4 className="font-body-md text-sm text-on-surface font-semibold">Two-Factor Authentication</h4>
                    <p className="font-label-sm text-xs text-on-surface-variant">Hardware & App Authenticator bound</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-secondary text-xs font-label-sm font-medium">
                  <span>Active</span>
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      fingerprint
                    </span>
                  </div>
                  <div>
                    <h4 className="font-body-md text-sm text-on-surface font-semibold">Biometric Isolation</h4>
                    <p className="font-label-sm text-xs text-on-surface-variant">Hidden Nest isolated from main vault</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-label-sm font-medium">
                  <span>Locked</span>
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary-container group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      enhanced_encryption
                    </span>
                  </div>
                  <div>
                    <h4 className="font-body-md text-sm text-on-surface font-semibold">Zero-Knowledge Cipher</h4>
                    <p className="font-label-sm text-xs text-on-surface-variant">AES-256 GCM client-side encryption</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-primary text-xs font-label-sm font-medium">
                  <span>256-Bit</span>
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hardening Recommendations */}
          <div className="glass-panel inner-glow rounded-2xl p-5 flex flex-col gap-3">
            <h3 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              Security Recommendations
            </h3>
            <div className="flex flex-col gap-2.5">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                    rec.done
                      ? 'bg-emerald-500/5 border-emerald-500/20 text-on-surface-variant'
                      : 'bg-surface-container border-white/10 text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`material-symbols-outlined text-base ${rec.done ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {rec.done ? 'check_circle' : 'pending'}
                    </span>
                    <span className={rec.done ? 'line-through opacity-70' : 'font-medium'}>
                      {rec.title}
                    </span>
                  </div>

                  {!rec.done ? (
                    <button
                      onClick={() => handleResolveRec(rec.id)}
                      className="px-3 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-label-sm font-semibold transition-colors"
                    >
                      Resolve ({rec.impact})
                    </button>
                  ) : (
                    <span className="text-emerald-400 font-label-sm">{rec.impact}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
