import React from 'react';
import { useVault } from '../../context/VaultContext';

export default function NotificationDrawer() {
  const { 
    notificationDrawerOpen, 
    setNotificationDrawerOpen, 
    notifications, 
    setNotifications,
    showToast 
  } = useVault();

  if (!notificationDrawerOpen) return null;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    showToast('All alerts marked as read', 'info');
  };

  const clearAll = () => {
    setNotifications([]);
    showToast('Notifications cleared', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={() => setNotificationDrawerOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full glass-panel-heavy border-l border-white/10 p-6 flex flex-col z-10 shadow-2xl animate-slide-left overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl">notifications_active</span>
            <div>
              <h2 className="font-headline-md text-lg font-bold text-on-surface">Security & System Alerts</h2>
              <p className="font-label-sm text-xs text-on-surface-variant">Real-time digital vault events</p>
            </div>
          </div>
          <button 
            onClick={() => setNotificationDrawerOpen(false)}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center py-3 text-xs border-b border-white/5">
          <button 
            onClick={markAllRead} 
            className="text-primary hover:underline font-label-sm"
          >
            Mark all read
          </button>
          <button 
            onClick={clearAll} 
            className="text-on-surface-variant hover:text-error transition-colors font-label-sm"
          >
            Clear all
          </button>
        </div>

        {/* Notification list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 no-scrollbar">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-on-surface-variant text-center gap-2">
              <span className="material-symbols-outlined text-4xl opacity-50">done_all</span>
              <p className="font-body-md text-sm">No new notifications</p>
              <p className="font-label-sm text-xs opacity-75">All vault systems are optimal</p>
            </div>
          ) : (
            notifications.map((item) => (
              <div 
                key={item.id}
                className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                  item.unread 
                    ? 'bg-surface-container-high/80 border-primary/25 shadow-sm' 
                    : 'bg-surface-container-low/50 border-white/5 opacity-80'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center shrink-0 ${item.color || 'text-primary'}`}>
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-label-md text-sm text-on-surface font-medium truncate">{item.title}</h4>
                    {item.unread && (
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1" />
                    )}
                  </div>
                  <span className="font-label-sm text-[11px] text-on-surface-variant mt-1 block">
                    {item.time}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Security Badge */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-on-surface-variant">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="material-symbols-outlined text-sm">lock</span>
            <span className="font-label-sm">256-Bit Encrypted Log</span>
          </div>
          <span className="font-label-sm font-mono">NODE-01-SEC</span>
        </div>
      </div>
    </div>
  );
}
