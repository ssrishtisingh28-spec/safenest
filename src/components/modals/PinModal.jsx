import React, { useState, useEffect } from 'react';
import { useVault } from '../../context/VaultContext';

export default function PinModal() {
  const { pinModalOpen, setPinModalOpen, unlockHiddenNest, showToast } = useVault();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const correctPin = '1234';

  useEffect(() => {
    if (!pinModalOpen) {
      setPin('');
      setError(false);
    }
  }, [pinModalOpen]);

  // Handle keyboard typing
  useEffect(() => {
    if (!pinModalOpen) return;

    const handleKeyDown = (e) => {
      if (/^[0-9]$/.test(e.key)) {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        setPinModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pinModalOpen, pin]);

  if (!pinModalOpen) return null;

  const handleDigit = (digit) => {
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      setError(false);

      if (nextPin.length === 4) {
        if (nextPin === correctPin) {
          setTimeout(() => {
            unlockHiddenNest();
          }, 200);
        } else {
          setTimeout(() => {
            setError(true);
            showToast('Invalid PIN. Hint: default PIN is 1234', 'error');
            setTimeout(() => {
              setPin('');
            }, 600);
          }, 200);
        }
      }
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError(false);
  };

  const keypadButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={() => setPinModalOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
      />

      {/* Card */}
      <div className={`relative w-full max-w-sm glass-panel-heavy rounded-2xl p-6 border border-white/15 z-10 flex flex-col items-center gap-6 shadow-2xl transition-all ${
        error ? 'animate-bounce text-error' : ''
      }`}>
        {/* Close Button */}
        <button
          onClick={() => setPinModalOpen(false)}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface w-8 h-8 rounded-full flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>

        {/* Lock Icon */}
        <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center text-primary mt-2">
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            dialpad
          </span>
        </div>

        {/* Header */}
        <div className="text-center">
          <h3 className="font-headline-md text-xl text-on-surface font-semibold mb-1">Enter Master PIN</h3>
          <p className="font-label-sm text-xs text-on-surface-variant">
            Enter 4-digit code to decrypt isolated environment
          </p>
          <p className="text-[11px] text-primary/80 font-mono mt-1">Default PIN: 1234</p>
        </div>

        {/* PIN Indicators */}
        <div className="flex gap-4 my-2">
          {[0, 1, 2, 3].map((index) => {
            const isFilled = index < pin.length;
            return (
              <div
                key={index}
                className={`w-4 h-4 rounded-full border transition-all duration-200 ${
                  error
                    ? 'border-error bg-error'
                    : isFilled
                    ? 'border-primary bg-primary shadow-[0_0_12px_rgba(137,206,255,0.8)] scale-110'
                    : 'border-white/30 bg-surface-container'
                }`}
              />
            );
          })}
        </div>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[260px]">
          {keypadButtons.map((btn) => {
            const isAction = btn === 'C' || btn === '⌫';
            return (
              <button
                key={btn}
                id={`pin-key-${btn}`}
                type="button"
                onClick={() => {
                  if (btn === 'C') setPin('');
                  else if (btn === '⌫') handleBackspace();
                  else handleDigit(btn);
                }}
                className={`h-14 rounded-xl font-headline-md text-lg flex items-center justify-center active:scale-95 transition-all ${
                  isAction
                    ? 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high border border-white/5 text-sm'
                    : 'bg-surface-container hover:bg-surface-container-highest border border-white/10 text-on-surface font-semibold hover:border-primary/40'
                }`}
              >
                {btn}
              </button>
            );
          })}
        </div>

        {/* Bottom Helper */}
        <button
          onClick={() => {
            setPin('1234');
            setTimeout(() => unlockHiddenNest(), 300);
          }}
          className="font-label-sm text-xs text-primary hover:underline"
        >
          Auto-fill Test PIN (1234)
        </button>
      </div>
    </div>
  );
}
