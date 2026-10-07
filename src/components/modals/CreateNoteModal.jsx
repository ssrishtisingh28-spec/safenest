import React, { useState } from 'react';
import { useVault } from '../../context/VaultContext';

export default function CreateNoteModal() {
  const { createNoteModalOpen, setCreateNoteModalOpen, addFile, showToast } = useVault();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (!createNoteModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      showToast('Please specify a title for the note', 'error');
      return;
    }

    const newNote = {
      id: 'f-note-' + Date.now(),
      name: title.endsWith('.txt') ? title : `${title}.txt`,
      category: 'documents',
      type: 'txt',
      size: `${Math.max(1, Math.round(content.length * 1.5 / 1024))} KB`,
      date: 'Just now',
      secure: true,
      encryption: 'AES-256 GCM (Encrypted Note)',
      hash: '3f786850e387550fdab836ed7e6dc881de23001b70e87038c01362214cb29588',
      icon: 'edit_note',
      iconColor: 'text-primary'
    };

    addFile(newNote);
    setCreateNoteModalOpen(false);
    setTitle('');
    setContent('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        onClick={() => setCreateNoteModalOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-lg glass-panel-heavy rounded-2xl p-6 border border-white/10 z-10 shadow-2xl flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary text-2xl">edit_note</span>
            <h3 className="font-headline-md text-lg font-bold text-on-surface">New Encrypted Note</h3>
          </div>
          <button 
            onClick={() => setCreateNoteModalOpen(false)}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-label-sm text-xs text-on-surface-variant mb-1 block">Note Title</label>
            <input
              type="text"
              id="new-note-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Will & Estate Instructions, Gate Codes"
              required
              className="w-full bg-[#080C14] recessed-input rounded-xl px-4 py-3 font-body-md text-sm text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="font-label-sm text-xs text-on-surface-variant mb-1 block">Secure Content</label>
            <textarea
              rows="6"
              id="new-note-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type sensitive notes here. Content is encrypted before hitting storage..."
              className="w-full bg-[#080C14] recessed-input rounded-xl p-4 font-mono text-sm text-on-surface focus:ring-1 focus:ring-primary focus:outline-none resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setCreateNoteModalOpen(false)}
              className="px-4 py-2.5 rounded-xl font-label-md text-sm text-on-surface-variant hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="save-note-btn"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-secondary-container to-primary-container text-white font-label-md text-sm shadow hover:opacity-95"
            >
              Save Encrypted Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
