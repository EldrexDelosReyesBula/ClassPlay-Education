
import React, { useState, useRef } from 'react';
import { exportBackup, importBackup } from '../utils/db';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  analyticsEnabled: boolean;
  onAnalyticsChange: (enabled: boolean) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose,
  analyticsEnabled,
  onAnalyticsChange
}) => {
  const [theme, setTheme] = useState('dark');
  const [sound, setSound] = useState(true);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    try {
        const json = await exportBackup();
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `classplay_backup_${new Date().toISOString().slice(0,10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setMessage('Backup downloaded successfully!');
    } catch (e) {
        setMessage('Export failed.');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (evt) => {
          try {
              const json = evt.target?.result as string;
              await importBackup(json);
              setMessage('Data restored successfully! Refreshing...');
              setTimeout(() => window.location.reload(), 1500);
          } catch (err) {
              setMessage('Import failed. Invalid file.');
          }
      };
      reader.readAsText(file);
      if (fileInputRef.current) fileInputRef.current.value = '';
  };

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
        
        <div className="p-6 space-y-8 overflow-y-auto max-h-[70vh] custom-scrollbar">
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

          {/* Preferences */}
          <div>
             <label className="block text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">Preferences</label>
             <div className="space-y-4">
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

                {/* Analytics Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                       <span className="material-symbols-outlined">insights</span>
                     </div>
                     <div>
                       <p className="font-bold dark:text-white">Analytics</p>
                       <p className="text-xs text-slate-500">Allow anonymous usage data</p>
                     </div>
                  </div>
                  <button 
                    onClick={() => onAnalyticsChange(!analyticsEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${analyticsEnabled ? 'bg-primary' : 'bg-slate-300 dark:bg-[#233c48]'}`}
                  >
                    <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${analyticsEnabled ? 'translate-x-6' : ''}`} />
                  </button>
                </div>
             </div>
          </div>

          {/* Donation */}
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/10 dark:to-rose-900/10 p-4 rounded-xl border border-pink-100 dark:border-pink-900/30">
             <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-pink-500">volunteer_activism</span>
                <h3 className="font-bold text-pink-700 dark:text-pink-300">Support ClassPlay</h3>
             </div>
             <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
               ClassPlay is free for everyone. Help us keep it that way!
             </p>
             <a 
               href="https://www.landecs.org/docs/donation" 
               target="_blank" 
               rel="noopener noreferrer"
               className="block w-full py-2 bg-pink-500 hover:bg-pink-600 text-white font-bold text-center rounded-lg text-sm transition-colors"
             >
               Donate
             </a>
          </div>

          {/* Data Management */}
          <div>
              <label className="block text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">Data & Backup</label>
              <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleExport}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-200 dark:border-[#233c48] hover:bg-slate-50 dark:hover:bg-[#1a2b34] font-bold dark:text-white transition-colors"
                  >
                      <span className="material-symbols-outlined">download</span>
                      Export Backup (JSON)
                  </button>
                  
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-200 dark:border-[#233c48] hover:bg-slate-50 dark:hover:bg-[#1a2b34] font-bold dark:text-white transition-colors"
                  >
                      <span className="material-symbols-outlined">upload</span>
                      Import Backup
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept=".json" 
                    onChange={handleImport}
                  />
                  
                  {message && (
                      <div className={`text-center text-sm font-bold mt-2 ${message.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>
                          {message}
                      </div>
                  )}
              </div>
          </div>
        </div>
        
        <div className="p-6 bg-slate-50 dark:bg-[#0f181e] text-center border-t border-slate-100 dark:border-[#233c48]">
          <p className="text-xs text-slate-400">ClassPlay v1.2.0 • Offline Ready</p>
        </div>
      </div>
    </div>
  );
};
