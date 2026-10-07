import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';

export default function ProfileScreen() {
  const { 
    user, 
    setUser, 
    theme, 
    toggleTheme, 
    navigateTo, 
    setLogoutModalOpen, 
    showToast 
  } = useVault();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [tempName, setTempName] = useState(user.name);
  const [tempEmail, setTempEmail] = useState(user.email);

  const saveProfile = (e) => {
    e.preventDefault();
    setUser(prev => ({ ...prev, name: tempName, email: tempEmail }));
    setEditingProfile(false);
    showToast('Vault user profile updated', 'success');
  };

  const handleBackup = () => {
    showToast('Generating encrypted off-site cloud & seed backup...', 'info');
    setTimeout(() => {
      showToast('Vault snapshot successfully archived to cold storage', 'success');
    }, 1800);
  };

  return (
    <div className="min-h-screen pt-20 md:pt-28 pb-28 md:pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col gap-6">
      {/* Profile Header Card */}
      <div className="glass-panel inner-glow rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-xl">
        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-primary/40 shrink-0 shadow-lg">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center md:text-left flex-grow space-y-1.5">
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
            {user.name}
          </h1>
          <p className="font-body-lg text-sm text-on-surface-variant">
            {user.email}
          </p>
          <div className="flex items-center justify-center md:justify-start gap-2 pt-1">
            <span className="font-label-md text-xs text-primary font-mono bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
              ID: {user.id}
            </span>
          </div>
        </div>

        <div className="shrink-0 pt-1">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-full shadow-sm text-xs font-label-md font-medium">
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              shield_person
            </span>
            <span>Account Protected</span>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal / Form */}
      {editingProfile && (
        <div className="glass-panel rounded-2xl p-6 border border-primary/40 flex flex-col gap-4 animate-fade-in">
          <h3 className="font-headline-md text-base font-bold text-on-surface">Edit Profile Credentials</h3>
          <form onSubmit={saveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-label-sm text-xs text-on-surface-variant block mb-1">Full Name</label>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                required
                className="w-full bg-[#080C14] recessed-input rounded-xl px-4 py-2.5 text-sm text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="font-label-sm text-xs text-on-surface-variant block mb-1">Email Address</label>
              <input
                type="email"
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
                required
                className="w-full bg-[#080C14] recessed-input rounded-xl px-4 py-2.5 text-sm text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEditingProfile(false)}
                className="px-4 py-2 text-xs text-on-surface-variant hover:text-on-surface"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-primary text-[#001e2f] font-semibold text-xs shadow hover:opacity-90"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Bento Grid Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Section */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col shadow-xl">
          <h2 className="font-headline-md text-base font-bold text-primary mb-3 pb-2.5 border-b border-white/5 flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">manage_accounts</span>
            <span>Account</span>
          </h2>
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => setEditingProfile(!editingProfile)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group text-left"
            >
              <div className="flex items-center gap-3 text-on-surface">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-[20px]">
                  edit_square
                </span>
                <span className="font-body-md text-sm">Edit Profile Details</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-sm">
                chevron_right
              </span>
            </button>

            <button
              onClick={() => showToast('Master password change prompt triggered', 'info')}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group text-left"
            >
              <div className="flex items-center gap-3 text-on-surface">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-[20px]">
                  key
                </span>
                <span className="font-body-md text-sm">Change Master Password</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-sm">
                chevron_right
              </span>
            </button>

            <button
              onClick={() => navigateTo('security')}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group text-left"
            >
              <div className="flex items-center gap-3 text-on-surface">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-[20px]">
                  security
                </span>
                <span className="font-body-md text-sm">Security Center Settings</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-sm">
                chevron_right
              </span>
            </button>
          </div>
        </div>

        {/* SafeNest Vault Management */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col shadow-xl">
          <h2 className="font-headline-md text-base font-bold text-primary mb-3 pb-2.5 border-b border-white/5 flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">cloud</span>
            <span>SafeNest Infrastructure</span>
          </h2>
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => navigateTo('files')}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group text-left"
            >
              <div className="flex items-center gap-3 text-on-surface">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-[20px]">
                  storage
                </span>
                <span className="font-body-md text-sm">Storage (42.8 GB / 100 GB)</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-sm">
                chevron_right
              </span>
            </button>

            <button
              onClick={() => navigateTo('hidden-nest')}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group text-left"
            >
              <div className="flex items-center gap-3 text-on-surface">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-[20px]">
                  visibility_off
                </span>
                <span className="font-body-md text-sm">Hidden Nest (Isolated Sanctuary)</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-sm">
                chevron_right
              </span>
            </button>

            <button
              onClick={handleBackup}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group text-left"
            >
              <div className="flex items-center gap-3 text-on-surface">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-[20px]">
                  backup
                </span>
                <span className="font-body-md text-sm">Encrypted Cold Backup</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-sm">
                chevron_right
              </span>
            </button>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col shadow-xl">
          <h2 className="font-headline-md text-base font-bold text-primary mb-3 pb-2.5 border-b border-white/5 flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">settings</span>
            <span>Preferences</span>
          </h2>
          <div className="flex flex-col space-y-2">
            {/* Notifications toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container/40">
              <div className="flex items-center gap-3 text-on-surface">
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                  notifications_active
                </span>
                <span className="font-body-md text-sm">Security Alerts & Pushes</span>
              </div>
              <button
                onClick={() => {
                  setNotificationsEnabled(!notificationsEnabled);
                  showToast(`Notifications ${!notificationsEnabled ? 'enabled' : 'disabled'}`, 'info');
                }}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  notificationsEnabled ? 'bg-primary' : 'bg-surface-container-highest'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Appearance Theme Selector */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container/40">
              <div className="flex items-center gap-3 text-on-surface">
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                  palette
                </span>
                <div>
                  <span className="font-body-md text-sm block">Appearance Theme</span>
                  <span className="font-label-sm text-[11px] text-on-surface-variant block">
                    {theme === 'dark' ? 'Digital Sanctuary (Dark)' : 'Luminous Sanctuary (Light)'}
                  </span>
                </div>
              </div>
              <button
                id="profile-theme-toggle-btn"
                onClick={toggleTheme}
                className="px-3.5 py-1.5 rounded-xl border border-primary/30 text-primary font-label-md text-xs hover:bg-primary/10 transition-colors flex items-center gap-1.5 font-semibold"
              >
                <span className="material-symbols-outlined text-sm">
                  {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                </span>
                <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'}</span>
              </button>
            </div>

            {/* Language */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container/40">
              <div className="flex items-center gap-3 text-on-surface">
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                  language
                </span>
                <span className="font-body-md text-sm">Vault Language</span>
              </div>
              <span className="font-label-sm text-xs text-on-surface-variant font-mono">English (US)</span>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col shadow-xl">
          <h2 className="font-headline-md text-base font-bold text-primary mb-3 pb-2.5 border-b border-white/5 flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">help</span>
            <span>Support & Compliance</span>
          </h2>
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => showToast('SafeNest Documentation & Knowledge Base opened', 'info')}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group text-left"
            >
              <div className="flex items-center gap-3 text-on-surface">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-[20px]">
                  support_agent
                </span>
                <span className="font-body-md text-sm">Help Center & Whitepaper</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-sm">
                chevron_right
              </span>
            </button>

            <button
              onClick={() => showToast('Contacting dedicated concierge security officer...', 'info')}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group text-left"
            >
              <div className="flex items-center gap-3 text-on-surface">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-[20px]">
                  contact_support
                </span>
                <span className="font-body-md text-sm">Concierge Support</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-sm">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="flex justify-center my-6">
        <button
          id="profile-logout-btn"
          onClick={() => setLogoutModalOpen(true)}
          className="border border-error/40 text-error px-8 py-3 rounded-xl font-label-md text-sm hover:bg-error/10 active:scale-95 transition-all flex items-center gap-2 shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span>Lock & Logout</span>
        </button>
      </div>
    </div>
  );
}
