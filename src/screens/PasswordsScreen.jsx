import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';

export default function PasswordsScreen() {
  const {
    passwords,
    activePasswordCategory,
    setActivePasswordCategory,
    passwordSearchQuery,
    setPasswordSearchQuery,
    setAddPasswordModalOpen,
    deletePassword,
    showToast
  } = useVault();

  const [revealedPasswords, setRevealedPasswords] = useState({});

  const categories = [
    { id: 'all', label: 'All Vaults' },
    { id: 'Banking', label: 'Banking' },
    { id: 'Work', label: 'Work' },
    { id: 'Email', label: 'Email' },
    { id: 'Social Media', label: 'Social Media' },
    { id: 'Shopping', label: 'Shopping' }
  ];

  const toggleReveal = (id) => {
    setRevealedPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text, title) => {
    navigator.clipboard?.writeText(text);
    showToast(`Password for ${title} copied to clipboard!`, 'success');
  };

  const filteredPasswords = passwords.filter((p) => {
    const matchesCategory = 
      activePasswordCategory === 'all' || 
      p.category.toLowerCase() === activePasswordCategory.toLowerCase();
    const matchesSearch = 
      p.title.toLowerCase().includes(passwordSearchQuery.toLowerCase()) ||
      p.username.toLowerCase().includes(passwordSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20 md:pt-28 pb-28 md:pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col gap-6">
      {/* Search and Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
        {/* Search */}
        <div className="relative w-full md:w-96 group">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors text-[20px]">
            search
          </span>
          <input
            id="passwords-search-input"
            type="text"
            value={passwordSearchQuery}
            onChange={(e) => setPasswordSearchQuery(e.target.value)}
            placeholder="Search passwords..."
            className="w-full bg-[#080C14] recessed-input text-on-surface border-none rounded-xl pl-11 pr-4 py-2.5 font-body-md text-sm focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50 transition-all"
          />
        </div>

        {/* Add Password CTA */}
        <button
          id="add-password-cta-btn"
          onClick={() => setAddPasswordModalOpen(true)}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-secondary-container to-primary-container text-white font-label-md text-sm px-6 py-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-[0_4px_14px_rgba(14,165,233,0.25)]"
        >
          <span className="material-symbols-outlined text-[19px]">add</span>
          <span>Add Password</span>
        </button>
      </div>

      {/* Categories Horizontal Carousel */}
      <div className="w-full overflow-x-auto no-scrollbar pb-1 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
        <div className="flex gap-2.5 min-w-max">
          {categories.map((cat) => {
            const isActive = activePasswordCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`pass-cat-${cat.id}`}
                onClick={() => setActivePasswordCategory(cat.id)}
                className={`px-5 py-2 rounded-full font-label-md text-xs md:text-sm flex items-center gap-2 transition-all ${
                  isActive
                    ? 'glass-panel text-primary border border-primary/35 shadow-sm font-semibold'
                    : 'glass-panel text-on-surface-variant hover:text-on-surface border border-white/5'
                }`}
              >
                {isActive && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Password Grid */}
      {filteredPasswords.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant opacity-60">
            key_off
          </span>
          <h3 className="font-headline-md text-lg text-on-surface">No credentials found</h3>
          <p className="font-body-md text-xs text-on-surface-variant">
            No password entries match your search or category filter.
          </p>
          <button
            onClick={() => { setPasswordSearchQuery(''); setActivePasswordCategory('all'); }}
            className="mt-2 text-xs text-primary hover:underline font-label-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
          {filteredPasswords.map((item) => {
            const isRevealed = !!revealedPasswords[item.id];
            return (
              <div
                key={item.id}
                className="glass-panel rounded-2xl p-6 flex flex-col justify-between gap-5 group hover:border-primary/40 hover:bg-surface-container-high/60 transition-all duration-300 shadow-lg"
              >
                {/* Header */}
                <div className="flex justify-between items-start border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3.5 min-w-0 pr-2">
                    <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center border border-white/5 text-primary shrink-0">
                      <span className="material-symbols-outlined text-[26px]">
                        {item.icon || 'key'}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-headline-md text-base md:text-lg font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-label-sm text-xs text-on-surface-variant truncate">
                        {item.username}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => deletePassword(item.id)}
                      title="Delete entry"
                      className="text-on-surface-variant hover:text-error opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>

                {/* Password Display & Copy Action */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <div className="font-mono text-sm tracking-widest bg-surface-container-low px-3.5 py-2 rounded-xl border border-white/5 text-on-surface flex-1 truncate select-all">
                    {isRevealed ? item.password : '••••••••••••'}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => toggleReveal(item.id)}
                      title={isRevealed ? 'Hide Password' : 'Show Password'}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-on-surface-variant hover:bg-white/5 hover:text-primary transition-all active:scale-95 border border-white/5"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {isRevealed ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>

                    <button
                      onClick={() => copyToClipboard(item.password, item.title)}
                      title="Copy Password"
                      className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20 transition-all active:scale-95 border border-primary/20 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[20px]">content_copy</span>
                    </button>
                  </div>
                </div>

                {/* Bottom Metadata */}
                <div className="flex justify-between items-center text-[11px] text-on-surface-variant pt-1">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {item.category}
                  </span>
                  <span>Updated {item.lastUpdated}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
