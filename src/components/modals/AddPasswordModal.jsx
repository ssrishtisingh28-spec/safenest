import React, { useState } from 'react';
import { useVault } from '../../context/VaultContext';

export default function AddPasswordModal() {
  const { addPasswordModalOpen, setAddPasswordModalOpen, addPassword, showToast } = useVault();

  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('Work');
  const [showPass, setShowPass] = useState(false);
  const [showGen, setShowGen] = useState(false);
  const [genLength, setGenLength] = useState(16);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);

  if (!addPasswordModalOpen) return null;

  const generatePassword = () => {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+~|}{[]:;?><,./-=';
    let result = '';
    for (let i = 0; i < genLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
    showToast('Secure random password generated!', 'info');
  };

  const getStrength = (pwd) => {
    if (!pwd) return { label: 'None', width: '0%', color: 'bg-surface-container-highest' };
    if (pwd.length < 8) return { label: 'Weak', width: '25%', color: 'bg-error' };
    if (pwd.length < 12) return { label: 'Moderate', width: '50%', color: 'bg-amber-400' };
    if (pwd.length < 16) return { label: 'Strong', width: '75%', color: 'bg-primary' };
    return { label: 'Fortified', width: '100%', color: 'bg-emerald-400' };
  };

  const strength = getStrength(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !username || !password) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    const newEntry = {
      id: 'p-' + Date.now(),
      title,
      username,
      password,
      category,
      strength: strength.label,
      lastUpdated: 'Just now',
      icon: category === 'Banking' ? 'account_balance' : category === 'Email' ? 'mail' : category === 'Shopping' ? 'shopping_bag' : 'key'
    };

    addPassword(newEntry);
    setAddPasswordModalOpen(false);
    setTitle('');
    setUsername('');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={() => setAddPasswordModalOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg glass-panel-heavy rounded-2xl p-6 md:p-8 border border-white/10 z-10 shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                password
              </span>
            </div>
            <div>
              <h3 className="font-headline-md text-xl font-bold text-on-surface">Store New Credential</h3>
              <p className="font-label-sm text-xs text-on-surface-variant">Zero-knowledge client-side encrypted</p>
            </div>
          </div>
          <button 
            onClick={() => setAddPasswordModalOpen(false)}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title / Service */}
          <div>
            <label className="font-label-sm text-xs text-on-surface-variant mb-1 block">
              Service / Website Name *
            </label>
            <input
              type="text"
              id="new-pass-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. ProtonMail, Fidelity, Cloudflare"
              required
              className="w-full bg-[#080C14] recessed-input rounded-xl px-4 py-3 font-body-md text-sm text-on-surface focus:ring-1 focus:ring-primary focus:outline-none transition-all placeholder:text-on-surface-variant/40"
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="font-label-sm text-xs text-on-surface-variant mb-1 block">
              Category
            </label>
            <select
              id="new-pass-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#080C14] recessed-input rounded-xl px-4 py-3 font-body-md text-sm text-on-surface focus:ring-1 focus:ring-primary focus:outline-none transition-all"
            >
              <option value="Banking">Banking & Finance</option>
              <option value="Work">Work & Infrastructure</option>
              <option value="Email">Email & Communication</option>
              <option value="Social Media">Social & Streaming</option>
              <option value="Shopping">Shopping & Commerce</option>
              <option value="Other">Other Vault Items</option>
            </select>
          </div>

          {/* Username / Email */}
          <div>
            <label className="font-label-sm text-xs text-on-surface-variant mb-1 block">
              Username / Account ID / Email *
            </label>
            <input
              type="text"
              id="new-pass-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. alex.sterling@vault.io"
              required
              className="w-full bg-[#080C14] recessed-input rounded-xl px-4 py-3 font-body-md text-sm text-on-surface focus:ring-1 focus:ring-primary focus:outline-none transition-all placeholder:text-on-surface-variant/40"
            />
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-label-sm text-xs text-on-surface-variant">
                Master Password *
              </label>
              <button
                type="button"
                onClick={() => setShowGen(!showGen)}
                className="font-label-sm text-xs text-primary hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-xs">auto_fix_high</span>
                {showGen ? 'Hide Generator' : 'Generate Password'}
              </button>
            </div>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                id="new-pass-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter or generate a strong password"
                required
                className="w-full bg-[#080C14] recessed-input rounded-xl pl-4 pr-12 py-3 font-mono text-sm text-on-surface focus:ring-1 focus:ring-primary focus:outline-none transition-all placeholder:text-on-surface-variant/40"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors p-1"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPass ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>

            {/* Strength Bar */}
            {password && (
              <div className="mt-2">
                <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${strength.color} transition-all duration-300`} 
                    style={{ width: strength.width }}
                  />
                </div>
                <div className="flex justify-between items-center mt-1 text-[11px] text-on-surface-variant">
                  <span>Strength: <strong className="text-on-surface">{strength.label}</strong></span>
                  <span>AES-256 Validated</span>
                </div>
              </div>
            )}
          </div>

          {/* Generator Sub-panel */}
          {showGen && (
            <div className="p-4 rounded-xl bg-surface-container/60 border border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-xs text-on-surface">Password Length: {genLength}</span>
                <input
                  type="range"
                  min="8"
                  max="32"
                  value={genLength}
                  onChange={(e) => setGenLength(parseInt(e.target.value))}
                  className="w-32 accent-primary cursor-pointer"
                />
              </div>
              <div className="flex gap-4 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    className="rounded text-primary focus:ring-0"
                  />
                  <span>Numbers (0-9)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                    className="rounded text-primary focus:ring-0"
                  />
                  <span>Symbols (!@#$)</span>
                </label>
              </div>
              <button
                type="button"
                onClick={generatePassword}
                className="w-full py-2 rounded-lg bg-surface-container-highest hover:bg-white/10 text-primary border border-primary/20 font-label-sm text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">cached</span>
                Generate Now
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setAddPasswordModalOpen(false)}
              className="px-5 py-2.5 rounded-xl font-label-md text-sm text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="save-password-submit-btn"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-secondary-container to-primary-container text-white font-label-md text-sm shadow-md hover:opacity-95 active:scale-95 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">lock</span>
              Save Credential
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
