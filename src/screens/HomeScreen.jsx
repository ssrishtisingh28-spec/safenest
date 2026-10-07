import React from 'react';
import { useVault } from '../context/VaultContext';

export default function HomeScreen() {
  const { 
    navigateTo, 
    user, 
    files, 
    setActiveFileCategory, 
    setFilePreviewItem,
    setAddPasswordModalOpen,
    setCreateNoteModalOpen,
    setScanModalOpen 
  } = useVault();

  const categories = [
    { id: 'documents', name: 'Documents', count: 124, icon: 'folder', color: 'text-primary' },
    { id: 'photos', name: 'Photos', count: 892, icon: 'image', color: 'text-secondary' },
    { id: 'videos', name: 'Videos', count: 45, icon: 'movie', color: 'text-tertiary' },
    { id: 'pdfs', name: 'PDFs', count: 67, icon: 'picture_as_pdf', color: 'text-error' },
    { id: 'ids', name: 'IDs', count: 12, icon: 'badge', color: 'text-primary-container' },
    { id: 'other', name: 'Other', count: 203, icon: 'more_horiz', color: 'text-on-surface-variant' },
  ];

  const handleCategoryClick = (catId) => {
    setActiveFileCategory(catId);
    navigateTo('files');
  };

  // Recent 3 activity files
  const recentFiles = files.slice(0, 3);

  return (
    <div className="min-h-screen relative overflow-x-hidden pt-20 md:pt-28 pb-28 md:pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="bg-glow" />

      {/* Greeting Banner */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
            Good Morning, <span className="text-primary">{user.name.split(' ')[0]}</span>
          </h1>
          <p className="font-body-md text-sm text-on-surface-variant mt-1">
            All private vaults and encrypted nodes are actively synchronized.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('security')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel text-xs text-on-surface hover:border-primary/40 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Vault Active & Monitored</span>
          </button>
        </div>
      </div>

      {/* Top Bento Row: Security Card & Storage Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        {/* Security Score Card */}
        <div 
          onClick={() => navigateTo('security')}
          className="glass-panel rounded-2xl p-6 md:col-span-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 relative overflow-hidden group cursor-pointer hover:border-primary/40 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="flex items-start gap-4 z-10 w-full md:w-auto">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary border border-primary/20 relative group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                shield
              </span>
              <div className="absolute inset-0 rounded-2xl border border-primary animate-ping opacity-20" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-headline-md text-lg md:text-xl text-on-surface font-semibold">
                  Your SafeNest is Secure
                </h2>
                <span className="material-symbols-outlined text-sm text-primary group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
              <p className="font-body-md text-xs md:text-sm text-on-surface-variant max-w-md">
                All primary vaults encrypted with AES-256 GCM. 0 exposed passwords, biometric barrier active.
              </p>
            </div>
          </div>

          <div className="z-10 flex flex-col items-center md:items-end w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/5 shrink-0">
            <div className="text-primary font-headline-xl text-3xl md:text-4xl font-bold mb-0.5">
              92<span className="text-on-surface-variant text-lg font-normal">/100</span>
            </div>
            <div className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider">
              Security Score
            </div>
          </div>
        </div>

        {/* Storage Card */}
        <div className="glass-panel rounded-2xl p-6 md:col-span-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-label-md text-sm text-on-surface font-semibold">Vault Storage</h3>
              <span className="material-symbols-outlined text-on-surface-variant text-xl">cloud</span>
            </div>
            <div className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface mb-1">
              42.8 GB
            </div>
            <p className="font-label-sm text-xs text-on-surface-variant mb-5">
              of 100 GB encrypted quota used
            </p>
          </div>

          <div>
            <div className="h-2 w-full recessed-input rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-secondary-container to-primary-container rounded-full transition-all duration-500"
                style={{ width: '42.8%' }}
              />
            </div>
            <div className="flex justify-between mt-2 font-label-sm text-xs text-on-surface-variant">
              <span>Encrypted Data</span>
              <span className="text-primary font-medium">42.8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h3 className="font-label-md text-xs text-on-surface-variant mb-4 uppercase tracking-wider pl-1 font-semibold">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            id="quick-action-upload"
            onClick={() => navigateTo('upload')}
            className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-surface-bright transition-all group active:scale-95"
          >
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all">
              <span className="material-symbols-outlined text-2xl">upload</span>
            </div>
            <span className="font-label-md text-sm text-on-surface group-hover:text-primary transition-colors font-medium">
              Upload
            </span>
          </button>

          <button
            id="quick-action-scan"
            onClick={() => setScanModalOpen(true)}
            className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-surface-bright transition-all group active:scale-95"
          >
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all">
              <span className="material-symbols-outlined text-2xl">document_scanner</span>
            </div>
            <span className="font-label-md text-sm text-on-surface group-hover:text-primary transition-colors font-medium">
              Scan Document
            </span>
          </button>

          <button
            id="quick-action-add-pass"
            onClick={() => setAddPasswordModalOpen(true)}
            className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-surface-bright transition-all group active:scale-95"
          >
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all">
              <span className="material-symbols-outlined text-2xl">key</span>
            </div>
            <span className="font-label-md text-sm text-on-surface group-hover:text-primary transition-colors font-medium">
              Add Password
            </span>
          </button>

          <button
            id="quick-action-create-note"
            onClick={() => setCreateNoteModalOpen(true)}
            className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-surface-bright transition-all group active:scale-95"
          >
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all">
              <span className="material-symbols-outlined text-2xl">edit_note</span>
            </div>
            <span className="font-label-md text-sm text-on-surface group-hover:text-primary transition-colors font-medium">
              Create Note
            </span>
          </button>
        </div>
      </div>

      {/* Categories & Recent Activity Split */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Categories Section */}
        <div className="md:col-span-8">
          <div className="flex justify-between items-center mb-4 pl-1">
            <h3 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              Categories
            </h3>
            <button
              onClick={() => { setActiveFileCategory('all'); navigateTo('files'); }}
              className="font-label-sm text-xs text-primary hover:underline"
            >
              Browse All
            </button>
          </div>

          <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="glass-panel rounded-2xl p-5 min-w-[145px] md:min-w-0 flex flex-col gap-4 cursor-pointer hover:bg-surface-bright hover:border-primary/40 hover:-translate-y-0.5 transition-all group border-l-2 border-l-primary/40"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center">
                  <span className={`material-symbols-outlined ${cat.color} text-2xl group-hover:scale-110 transition-transform`}>
                    {cat.icon}
                  </span>
                </div>
                <div>
                  <div className="font-label-md text-sm text-on-surface font-semibold mb-0.5 group-hover:text-primary transition-colors">
                    {cat.name}
                  </div>
                  <div className="font-label-sm text-xs text-on-surface-variant">
                    {cat.count} Items
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="md:col-span-4">
          <div className="flex justify-between items-center mb-4 pl-1">
            <h3 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              Recent Activity
            </h3>
            <button
              id="view-all-activity-btn"
              onClick={() => { setActiveFileCategory('all'); navigateTo('files'); }}
              className="font-label-sm text-xs text-primary hover:underline transition-colors"
            >
              View All
            </button>
          </div>

          <div className="glass-panel rounded-2xl p-2.5 flex flex-col divide-y divide-white/5">
            {recentFiles.map((file) => (
              <div
                key={file.id}
                onClick={() => setFilePreviewItem(file)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-bright transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary/15 transition-colors shrink-0">
                    <span className={`material-symbols-outlined text-[20px] ${file.iconColor || 'text-primary'}`}>
                      {file.icon || 'description'}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-body-md text-sm text-on-surface font-medium truncate max-w-[150px] group-hover:text-primary transition-colors">
                      {file.name}
                    </div>
                    <div className="font-label-sm text-xs text-on-surface-variant">
                      {file.date}
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  chevron_right
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
