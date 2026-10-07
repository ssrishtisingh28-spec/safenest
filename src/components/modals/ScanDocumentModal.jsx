import React, { useState } from 'react';
import { useVault } from '../../context/VaultContext';

export default function ScanDocumentModal() {
  const { scanModalOpen, setScanModalOpen, addFile, showToast } = useVault();
  const [scanning, setScanning] = useState(false);
  const [docName, setDocName] = useState('Scanned_Document_' + new Date().toISOString().slice(0, 10) + '.pdf');

  if (!scanModalOpen) return null;

  const handleStartScan = () => {
    setScanning(true);
    showToast('Initializing optical sensor and camera scanner...', 'info');

    setTimeout(() => {
      setScanning(false);
      const newScannedDoc = {
        id: 'f-scan-' + Date.now(),
        name: docName,
        category: 'documents',
        type: 'pdf',
        size: '1.8 MB',
        date: 'Just now',
        secure: true,
        encryption: 'AES-256 GCM Hardware Encrypted',
        hash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
        icon: 'document_scanner',
        iconColor: 'text-primary'
      };
      addFile(newScannedDoc);
      setScanModalOpen(false);
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        onClick={() => !scanning && setScanModalOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-md glass-panel-heavy rounded-2xl p-6 border border-white/15 z-10 shadow-2xl flex flex-col items-center text-center gap-5">
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary relative">
          <span className="material-symbols-outlined text-4xl">document_scanner</span>
          {scanning && (
            <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-30" />
          )}
        </div>

        <div>
          <h3 className="font-headline-md text-xl font-bold text-on-surface mb-1">
            {scanning ? 'Scanning & Encrypting...' : 'Hardware Document Scanner'}
          </h3>
          <p className="font-body-md text-xs text-on-surface-variant max-w-xs mx-auto">
            {scanning 
              ? 'Detecting edges, applying OCR perspective correction, and generating cryptographic signatures...' 
              : 'Position paper document in frame to automatically capture and encrypt into vault.'}
          </p>
        </div>

        {!scanning ? (
          <div className="w-full space-y-4">
            <div className="text-left">
              <label className="font-label-sm text-xs text-on-surface-variant mb-1 block">Output Filename</label>
              <input
                type="text"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                className="w-full bg-[#080C14] recessed-input rounded-xl px-4 py-2.5 font-body-md text-xs text-on-surface focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setScanModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-white/10 font-label-md text-sm text-on-surface hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="button"
                id="execute-scan-btn"
                onClick={handleStartScan}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-secondary-container to-primary-container text-white font-label-md text-sm shadow hover:opacity-95"
              >
                Capture Document
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full py-4 flex flex-col items-center gap-3">
            <div className="spinner" />
            <span className="font-label-sm text-xs text-primary animate-pulse">
              Encrypting bytes with AES-256...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
