
import React from 'react';

interface ConsentBannerProps {
  onAccept: () => void;
  onDecline: () => void;
}

export const ConsentBanner: React.FC<ConsentBannerProps> = ({ onAccept, onDecline }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 bg-white/95 dark:bg-[#111c22]/95 backdrop-blur-md border-t border-slate-200 dark:border-[#233c48] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4 flex-1">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl shrink-0 hidden md:block">
             <span className="material-symbols-outlined">insights</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-1 text-lg">Allow Analytics & Personalization?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              We use anonymous analytics to improve ClassPlay and personalize your experience. No personal student data is ever collected. You can change this in settings at any time.
            </p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={onDecline}
            className="flex-1 md:flex-none px-6 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1a2b34] transition-colors border border-slate-200 dark:border-[#233c48]"
          >
            Decline
          </button>
          <button 
            onClick={onAccept}
            className="flex-1 md:flex-none px-8 py-3 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
          >
            Allow
          </button>
        </div>
      </div>
    </div>
  );
};
