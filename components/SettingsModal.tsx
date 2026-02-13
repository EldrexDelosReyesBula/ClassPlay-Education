import React, { useState, useEffect } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [theme, setTheme] = useState('dark');
  const [sound, setSound] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="bg-white dark:bg-[#111c22] w-full max-w-md rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-[popIn_0.2s_ease-out]">
        <div className="p-6 border-b border-slate-200 dark:border-[#233c48] flex justify-between items-center">
          <h2 className="text-xl font-bold dark:text-white">Settings</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:hover:text-white">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Theme */}
          <div>
            <label className="block text-sm font-bold text-slate-500 mb-2">Theme</label>
            <div className="flex bg-slate-100 dark:bg-[#1a2b34] p-1 rounded-xl">
              {['light', 'dark', 'system'].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTheme(t);
                    if (t === 'dark') document.documentElement.classList.add('dark');
                    else if (t === 'light') document.documentElement.classList.remove('dark');
                  }}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold capitalize transition-all ${theme === t ? 'bg-white dark:bg-[#233c48] shadow-sm text-primary' : 'text-slate-500'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Sound */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                 <span className="material-symbols-outlined">volume_up</span>
               </div>
               <div>
                 <p className="font-bold dark:text-white">Sound Effects</p>
                 <p className="text-xs text-slate-500">Enable audio cues</p>
               </div>
            </div>
            <button 
              onClick={() => setSound(!sound)}
              className={`w-12 h-6 rounded-full transition-colors relative ${sound ? 'bg-primary' : 'bg-slate-300 dark:bg-[#233c48]'}`}
            >
              <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${sound ? 'translate-x-6' : ''}`} />
            </button>
          </div>
        </div>
        
        <div className="p-6 bg-slate-50 dark:bg-[#0f181e] text-center">
          <p className="text-xs text-slate-400">ClassPlay v1.0.0 • Offline Ready</p>
        </div>
      </div>
    </div>
  );
};