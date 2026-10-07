import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';

export default function FilesScreen() {
  const { 
    files, 
    activeFileCategory, 
    setActiveFileCategory, 
    fileSearchQuery, 
    setFileSearchQuery, 
    viewMode, 
    setViewMode, 
    setFilePreviewItem,
    navigateTo 
  } = useVault();

  const [activeSort, setActiveSort] = useState('newest'); // 'newest' | 'name' | 'size'

  const categories = [
    { id: 'all', label: 'All Files' },
    { id: 'documents', label: 'Documents' },
    { id: 'photos', label: 'Photos' },
    { id: 'videos', label: 'Videos' },
    { id: 'pdfs', label: 'PDFs' },
    { id: 'ids', label: 'IDs' }
  ];

  // Filtering
  const filteredFiles = files.filter((f) => {
    const matchesCategory = 
      activeFileCategory === 'all' || 
      f.category === activeFileCategory ||
      (activeFileCategory === 'pdfs' && f.type === 'pdf');
    const matchesSearch = 
      f.name.toLowerCase().includes(fileSearchQuery.toLowerCase()) ||
      (f.category && f.category.toLowerCase().includes(fileSearchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20 md:pt-28 pb-28 md:pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col gap-6">
      {/* Search and Actions Bar */}
      <div className="flex flex-col md:flex-row gap-4 w-full justify-between items-start md:items-center">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
            search
          </span>
          <input
            id="files-search-input"
            type="text"
            value={fileSearchQuery}
            onChange={(e) => setFileSearchQuery(e.target.value)}
            placeholder="Search your encrypted vault..."
            className="w-full bg-[#080C14] recessed-input text-on-surface border-none rounded-xl pl-11 pr-4 py-2.5 font-body-md text-sm focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50 transition-all"
          />
          {fileSearchQuery && (
            <button
              onClick={() => setFileSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Sorting / Filter dropdown */}
          <div className="relative">
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-white/10 text-on-surface font-label-md text-xs focus:outline-none cursor-pointer"
            >
              <option value="newest">Sort: Recent First</option>
              <option value="name">Sort: Name (A-Z)</option>
              <option value="size">Sort: Size</option>
            </select>
          </div>

          {/* Grid / List View Toggle */}
          <div className="flex bg-surface-container rounded-xl p-1 border border-white/5">
            <button
              id="view-grid-btn"
              onClick={() => setViewMode('grid')}
              aria-label="Grid View"
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-primary/20 text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
            </button>
            <button
              id="view-list-btn"
              onClick={() => setViewMode('list')}
              aria-label="List View"
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-primary/20 text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">view_list</span>
            </button>
          </div>

          {/* Upload Button */}
          <button
            id="files-upload-cta-btn"
            onClick={() => navigateTo('upload')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-secondary-container to-primary-container text-white font-label-md text-xs md:text-sm hover:opacity-90 active:scale-95 transition-all shadow-[0_2px_12px_rgba(14,165,233,0.25)]"
          >
            <span className="material-symbols-outlined text-[18px]">upload</span>
            <span>Upload File</span>
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="w-full overflow-x-auto pb-1 no-scrollbar -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
        <div className="flex gap-2 min-w-max">
          {categories.map((cat) => {
            const isActive = activeFileCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-filter-${cat.id}`}
                onClick={() => setActiveFileCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full font-label-md text-xs md:text-sm whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/15 text-primary border border-primary/35 shadow-[0_0_12px_rgba(137,206,255,0.15)] font-medium'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Files Display: Grid or List */}
      {filteredFiles.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant opacity-60">
            search_off
          </span>
          <h3 className="font-headline-md text-lg text-on-surface">No matching files in vault</h3>
          <p className="font-body-md text-xs text-on-surface-variant max-w-sm">
            Try adjusting your search criteria or upload new sensitive documents.
          </p>
          <button
            onClick={() => { setFileSearchQuery(''); setActiveFileCategory('all'); }}
            className="mt-2 text-xs text-primary hover:underline font-label-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 mt-1">
          {filteredFiles.map((file) => {
            const isImage = !!file.previewUrl;
            return (
              <div
                key={file.id}
                onClick={() => setFilePreviewItem(file)}
                className="group relative flex flex-col glass-panel rounded-2xl p-4 hover:border-primary/40 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Top badges / menu */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setFilePreviewItem(file); }}
                    className="p-1 rounded-lg bg-surface/80 backdrop-blur-md text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">more_horiz</span>
                  </button>
                </div>

                {/* Thumbnail / Icon Container */}
                <div className="w-full aspect-square bg-[#080C14] rounded-xl mb-3 flex items-center justify-center relative overflow-hidden border border-white/5">
                  {isImage ? (
                    <>
                      <img
                        src={file.previewUrl}
                        alt={file.name}
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-300"
                      />
                      <div className="absolute top-2.5 left-2.5 z-10">
                        <span className="px-2 py-0.5 rounded-full bg-surface/80 backdrop-blur-md text-primary font-label-sm text-[10px] border border-primary/30 flex items-center gap-1 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          Secure
                        </span>
                      </div>
                    </>
                  ) : (
                    <span 
                      className={`material-symbols-outlined text-5xl ${file.iconColor || 'text-primary'} opacity-80 group-hover:scale-110 transition-transform`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {file.icon || 'description'}
                    </span>
                  )}
                  {/* Decorative gloss gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/5 pointer-events-none" />
                </div>

                {/* Details */}
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-sm text-on-surface font-semibold truncate group-hover:text-primary transition-colors">
                    {file.name}
                  </span>
                  <div className="flex items-center justify-between mt-1 text-xs text-on-surface-variant">
                    <span>{file.size}</span>
                    <span>{file.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="glass-panel rounded-2xl overflow-hidden divide-y divide-white/5">
          <div className="grid grid-cols-12 px-5 py-3 text-xs font-label-sm text-on-surface-variant uppercase tracking-wider bg-surface-container/30">
            <span className="col-span-6 md:col-span-5">Name</span>
            <span className="col-span-3 md:col-span-2">Size</span>
            <span className="hidden md:block col-span-3">Encryption</span>
            <span className="col-span-3 md:col-span-2 text-right">Date</span>
          </div>

          {filteredFiles.map((file) => (
            <div
              key={file.id}
              onClick={() => setFilePreviewItem(file)}
              className="grid grid-cols-12 items-center px-5 py-3.5 hover:bg-surface-bright transition-colors cursor-pointer group text-xs md:text-sm"
            >
              <div className="col-span-6 md:col-span-5 flex items-center gap-3 min-w-0 pr-2">
                <span className={`material-symbols-outlined text-xl ${file.iconColor || 'text-primary'}`}>
                  {file.icon || 'description'}
                </span>
                <span className="font-medium text-on-surface truncate group-hover:text-primary transition-colors">
                  {file.name}
                </span>
              </div>
              <div className="col-span-3 md:col-span-2 text-on-surface-variant">
                {file.size}
              </div>
              <div className="hidden md:block col-span-3 text-primary/80 font-mono text-xs">
                {file.encryption || 'AES-256 GCM'}
              </div>
              <div className="col-span-3 md:col-span-2 text-right text-on-surface-variant flex items-center justify-end gap-2">
                <span>{file.date}</span>
                <span className="material-symbols-outlined text-base opacity-0 group-hover:opacity-100 text-primary transition-opacity">
                  chevron_right
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
