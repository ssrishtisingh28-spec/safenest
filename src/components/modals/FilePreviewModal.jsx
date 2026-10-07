import React from 'react';
import { useVault } from '../../context/VaultContext';

export default function FilePreviewModal() {
  const { filePreviewItem, setFilePreviewItem, deleteFile, showToast } = useVault();

  if (!filePreviewItem) return null;

  const handleDownload = () => {
    showToast(`Decrypting and downloading ${filePreviewItem.name}...`, 'info');
    setTimeout(() => {
      showToast(`${filePreviewItem.name} successfully decrypted!`, 'success');
    }, 1200);
  };

  const copyHash = () => {
    if (filePreviewItem.hash) {
      navigator.clipboard?.writeText(filePreviewItem.hash);
      showToast('SHA-256 checksum copied to clipboard', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={() => setFilePreviewItem(null)}
        className="fixed inset-0 bg-black/75 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl glass-panel-heavy rounded-2xl p-6 md:p-8 border border-white/10 z-10 shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3 min-w-0 pr-4">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0 border border-white/10">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                {filePreviewItem.icon || 'description'}
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="font-headline-md text-xl font-bold text-on-surface truncate">
                {filePreviewItem.name}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-xs text-on-surface-variant">
                <span>{filePreviewItem.size}</span>
                <span>•</span>
                <span>Encrypted on {filePreviewItem.date}</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Verified
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setFilePreviewItem(null)}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Preview Container */}
        <div className="w-full rounded-xl bg-[#080C14] border border-white/5 overflow-hidden flex items-center justify-center min-h-[220px] max-h-[340px] relative">
          {filePreviewItem.previewUrl ? (
            <img
              src={filePreviewItem.previewUrl}
              alt={filePreviewItem.name}
              className="w-full h-full max-h-[340px] object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center text-on-surface-variant gap-3">
              <span className="material-symbols-outlined text-6xl text-primary/70">
                {filePreviewItem.icon || 'file_present'}
              </span>
              <div>
                <p className="font-headline-md text-base text-on-surface mb-1">Encrypted File Container</p>
                <p className="font-label-sm text-xs text-on-surface-variant max-w-sm">
                  Client-side encrypted using 256-bit AES-GCM. Contents are decrypted in volatile memory only during authorized download.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Security & Cryptographic Details */}
        <div className="p-4 rounded-xl bg-surface-container/50 border border-white/5 space-y-2.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant">Cipher Suite:</span>
            <span className="text-primary font-mono font-medium">{filePreviewItem.encryption || 'AES-256 GCM authenticated'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant">Zero-Knowledge Key ID:</span>
            <span className="font-mono text-on-surface">ZKP-VLT-{filePreviewItem.id}-99X</span>
          </div>
          {filePreviewItem.hash && (
            <div className="flex flex-col gap-1 pt-1 border-t border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">SHA-256 Integrity Hash:</span>
                <button onClick={copyHash} className="text-primary hover:underline flex items-center gap-1 font-label-sm">
                  <span className="material-symbols-outlined text-[13px]">content_copy</span> Copy
                </button>
              </div>
              <p className="font-mono text-[11px] text-on-surface-variant break-all bg-background/50 p-2 rounded border border-white/5">
                {filePreviewItem.hash}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => deleteFile(filePreviewItem.id)}
            className="px-4 py-2.5 rounded-xl font-label-md text-sm text-error hover:bg-error/10 transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
            Delete File
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilePreviewItem(null)}
              className="px-5 py-2.5 rounded-xl font-label-md text-sm text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-secondary-container to-primary-container text-white font-label-md text-sm shadow-md hover:opacity-95 active:scale-95 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Decrypt & Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
