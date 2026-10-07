import React from 'react';
import { useVault } from '../../context/VaultContext';

export default function BottomNavMobile() {
  const { currentScreen, navigateTo } = useVault();

  // Hidden on splash, login, signup
  if (['splash', 'login', 'signup'].includes(currentScreen)) {
    return null;
  }

  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'files', label: 'Files', icon: 'folder_open' },
    { id: 'upload', label: 'Upload', icon: 'add', isFab: true },
    { id: 'passwords', label: 'Passwords', icon: 'password' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel-heavy border-t border-white/10 shadow-[0_-15px_30px_rgba(0,0,0,0.35)] flex justify-around items-center px-3 py-2">
      {navItems.map((item) => {
        const isActive = currentScreen === item.id;

        if (item.isFab) {
          return (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => navigateTo(item.id)}
              className="flex flex-col items-center justify-center -top-3 relative group active:scale-90 transition-transform"
              aria-label="Upload File"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-secondary-container to-primary-container flex items-center justify-center shadow-lg shadow-teal-500/30 text-white border border-white/20 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-2xl font-bold">add</span>
              </div>
              <span className="font-label-sm text-[10px] text-on-surface-variant mt-0.5">Upload</span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            id={`mobile-nav-${item.id}`}
            onClick={() => navigateTo(item.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-xl scale-95 active:scale-90 transition-all duration-200 ${
              isActive
                ? 'text-primary bg-primary/10 font-medium'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span
              className="material-symbols-outlined mb-0.5 text-[22px]"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className="font-label-sm text-[11px]">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
