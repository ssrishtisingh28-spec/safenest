import React from 'react';
import { useVault } from '../../context/VaultContext';

export default function TopNavMobile() {
  const { 
    currentScreen, 
    navigateTo, 
    user, 
    theme, 
    toggleTheme, 
    notifications, 
    setNotificationDrawerOpen 
  } = useVault();

  const unreadCount = notifications.filter(n => n.unread).length;

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'home':
        return 'Welcome';
      case 'files':
        return 'Files';
      case 'passwords':
        return 'Passwords';
      case 'security':
        return 'Security Center';
      case 'hidden-nest':
        return 'Hidden Nest';
      case 'upload':
        return 'Upload';
      case 'profile':
        return 'Profile';
      default:
        return 'SafeNest';
    }
  };

  const showBackButton = ['security', 'hidden-nest', 'upload'].includes(currentScreen);

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 px-margin-mobile py-3.5 flex justify-between items-center transition-all">
      <div className="flex items-center gap-3">
        {showBackButton ? (
          <button
            id="mobile-back-btn"
            onClick={() => navigateTo('home')}
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:text-primary active:scale-90 transition-transform"
            aria-label="Go Back"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
        ) : (
          <div 
            onClick={() => navigateTo('profile')}
            className="w-8 h-8 rounded-full overflow-hidden border border-white/15 cursor-pointer active:scale-95 transition-transform"
          >
            <img 
              src={user.avatarUrl} 
              alt={user.name} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}
        <h1 className="font-headline-lg-mobile text-xl font-bold text-primary truncate max-w-[200px]">
          {getScreenTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Theme switch button */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors bg-surface-container border border-white/5 active:scale-90"
        >
          <span className="material-symbols-outlined text-[18px]">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        {/* Notifications button */}
        <button
          onClick={() => setNotificationDrawerOpen(true)}
          className="relative w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors bg-surface-container border border-white/5 active:scale-90"
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined text-[18px]">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-background animate-pulse" />
          )}
        </button>
      </div>
    </header>
  );
}
