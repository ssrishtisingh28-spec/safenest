import React, { useState, useRef } from 'react';
import { useVault } from '../context/VaultContext';

export default function UploadScreen() {
  const { activeUploads, setActiveUploads, addFile, showToast, navigateTo } = useVault();
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const simulateUploadProcess = (file) => {
    const uploadId = 'up-' + Date.now();
    const totalSizeMb = (file.size / (1024 * 1024)).toFixed(1);
    
    const newUpload = {
      id: uploadId,
      name: file.name,
      progress: 10,
      totalSize: `${Math.max(0.1, totalSizeMb)} MB`,
      uploadedSize: '0.1 MB',
      status: 'Generating AES keys and chunking...',
      active: true
    };

    setActiveUploads(prev => [newUpload, ...prev]);
    showToast(`Encrypting "${file.name}" with AES-256...`, 'info');

    let currentProgress = 15;
    const interval = setInterval(() => {
      currentProgress += 18;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setActiveUploads(prev =>
          prev.map(u => u.id === uploadId ? { ...u, progress: 100, status: 'Encryption Complete & Stored!' } : u)
        );

        // Append to Vault Files
        const newVaultFile = {
          id: 'f-uploaded-' + Date.now(),
          name: file.name,
          category: file.type.includes('image') ? 'photos' : file.type.includes('video') ? 'videos' : 'documents',
          type: file.name.split('.').pop() || 'dat',
          size: `${Math.max(0.1, totalSizeMb)} MB`,
          date: 'Just now',
          secure: true,
          encryption: 'AES-256 GCM Client Verified',
          hash: '7c4a8d09f2b1e6c5d3a8e7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6',
          icon: file.type.includes('image') ? 'image' : file.type.includes('video') ? 'movie' : 'description',
          iconColor: 'text-primary'
        };
        addFile(newVaultFile);
      } else {
        setActiveUploads(prev =>
          prev.map(u => u.id === uploadId ? {
            ...u,
            progress: currentProgress,
            uploadedSize: `${((currentProgress / 100) * totalSizeMb).toFixed(1)} MB`,
            status: 'Encrypting and uploading payload...'
          } : u)
        );
      }
    }, 450);
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        simulateUploadProcess(files[i]);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        simulateUploadProcess(files[i]);
      }
    }
  };

  const cancelUpload = (id) => {
    setActiveUploads(prev => prev.filter(u => u.id !== id));
    showToast('Upload operation cancelled', 'info');
  };

  return (
    <div className="min-h-screen pt-20 md:pt-28 pb-28 md:pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col gap-6">
      {/* Header */}
      <header className="flex flex-col gap-2 mb-2">
        <h1 className="font-headline-xl text-2xl md:text-3xl font-bold text-on-surface">
          Add to Your SafeNest
        </h1>
        <p className="font-body-lg text-xs md:text-sm text-on-surface-variant max-w-2xl">
          Securely upload and encrypt your most sensitive documents, credentials, and media to your personal vault.
        </p>
      </header>

      {/* Main Upload Dropzone */}
      <section className="w-full">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`recessed-area rounded-2xl p-8 md:p-14 flex flex-col items-center justify-center text-center gap-5 cursor-pointer transition-all duration-300 group relative overflow-hidden ${
            dragOver ? 'border-primary bg-primary/10 scale-[1.01]' : 'hover:border-primary/60'
          }`}
        >
          {/* Subtle hover glow */}
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          <div className="w-20 h-20 rounded-full bg-surface-variant/40 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-105 transition-all">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-primary transition-colors">
              cloud_upload
            </span>
          </div>

          <div>
            <h3 className="font-headline-md text-lg md:text-xl font-bold text-on-surface mb-1">
              Drop or select your files
            </h3>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant max-w-md">
              Zero-knowledge end-to-end encryption ensures only you have access to unsealed contents.
            </p>
          </div>

          <button
            type="button"
            className="mt-2 px-6 py-3 bg-gradient-to-r from-secondary-container to-primary-container text-white rounded-xl font-label-md text-sm inner-glow hover:opacity-95 active:scale-95 transition-all flex items-center gap-2 font-semibold shadow-lg shadow-teal-500/20"
          >
            <span className="material-symbols-outlined text-lg">folder_open</span>
            <span>Browse Files</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </section>

      {/* Active Upload Status Container */}
      <section className="w-full glass-panel rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
          <h4 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
            Active Encrypted Uploads
          </h4>
          <span className="font-label-sm text-xs text-primary font-medium">
            {activeUploads.length} In Queue
          </span>
        </div>

        {activeUploads.length === 0 ? (
          <div className="py-8 text-center text-on-surface-variant flex flex-col items-center justify-center gap-2">
            <span className="material-symbols-outlined text-3xl opacity-50">done</span>
            <p className="font-body-md text-xs">All queues idle. Ready for secure transfers.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeUploads.map((upload) => (
              <div
                key={upload.id}
                className="flex items-center gap-4 bg-surface-container-low/70 p-4 rounded-xl border border-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-surface-variant flex items-center justify-center shrink-0 uploading-pulse text-primary">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    picture_as_pdf
                  </span>
                </div>

                <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-body-md text-sm text-on-surface font-semibold truncate pr-4">
                      {upload.name}
                    </span>
                    <span className="font-label-sm text-xs text-primary font-bold shrink-0">
                      {upload.progress}%
                    </span>
                  </div>

                  {/* Progress Bar Track */}
                  <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-secondary-container to-primary-container rounded-full progress-stripe transition-all duration-300"
                      style={{ width: `${upload.progress}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-xs text-on-surface-variant">
                    <span>{upload.status} {upload.uploadedSize} / {upload.totalSize}</span>
                    <button
                      onClick={() => cancelUpload(upload.id)}
                      className="text-on-surface-variant hover:text-error transition-colors p-1"
                      title="Cancel Upload"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
