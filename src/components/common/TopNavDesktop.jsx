import React from 'react';
import { useVault } from '../../context/VaultContext';

export default function TopNavDesktop() {
  const { 
    currentScreen, 
    navigateTo, 
    user, 
    theme, 
    toggleTheme, 
    notifications, 
    setNotificationDrawerOpen,
    hiddenNestLocked 
  } = useVault();

  const unreadCount = notifications.filter(n => n.unread).length;

  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'files', label: 'Files', icon: 'folder_open' },
    { id: 'passwords', label: 'Passwords', icon: 'password' },
    { id: 'security', label: 'Security Center', icon: 'shield' },
    { 
      id: 'hidden-nest', 
      label: 'Hidden Nest', 
      icon: hiddenNestLocked ? 'lock' : 'lock_open',
      badge: hiddenNestLocked ? 'Locked' : 'Unlocked'
    },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 glass-panel-heavy border-b border-white/5 px-margin-desktop py-3.5 transition-all">
      <div className="max-w-container-max mx-auto w-full flex justify-between items-center">
        {/* Brand */}
        <div 
          onClick={() => navigateTo('home')} 
          className="flex items-center gap-3 cursor-pointer group active:scale-95 transition-transform"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-container to-secondary-container flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              shield
            </span>
          </div>
          <div>
            <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight block leading-none">
              SafeNest
            </span>
            <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest block mt-0.5">
              Digital Vault
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1.5 lg:gap-2">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                id={`desktop-nav-${item.id}`}
                onClick={() => navigateTo(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-label-md text-label-md transition-all duration-200 relative ${
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/25 shadow-[0_0_12px_rgba(137,206,255,0.15)] font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
                }`}
              >
                <span 
                  className="material-symbols-outlined text-[20px]" 
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full uppercase font-bold tracking-wider ${
                    hiddenNestLocked 
                      ? 'bg-primary/20 text-primary border border-primary/30' 
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action controls & Avatar */}
        <div className="flex items-center gap-3">
          {/* Quick Upload Button */}
          <button
            id="desktop-quick-upload-btn"
            onClick={() => navigateTo('upload')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-secondary-container to-primary-container text-white font-label-md text-label-md hover:opacity-95 active:scale-95 transition-all shadow-[0_4px_12px_rgba(14,165,233,0.25)]"
          >
            <span className="material-symbols-outlined text-[19px]">upload</span>
            <span className="hidden lg:inline">Upload</span>
          </button>

          {/* Theme Switcher */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors bg-surface-container hover:bg-surface-container-high border border-white/5 active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Notification Button */}
          <button
            id="notification-bell-btn"
            onClick={() => setNotificationDrawerOpen(true)}
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors bg-surface-container hover:bg-surface-container-high border border-white/5 active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary ring-2 ring-background animate-pulse" />
            )}
          </button>

          {/* User Profile Avatar */}
          <div 
            id="user-profile-chip"
            onClick={() => navigateTo('profile')}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full hover:bg-white/5 border border-white/10 cursor-pointer transition-colors active:scale-95"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-7 h-7 rounded-full object-cover border border-primary/30"
            />
            <span className="font-label-md text-label-md text-on-surface font-medium hidden xl:inline">
              Alex
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
