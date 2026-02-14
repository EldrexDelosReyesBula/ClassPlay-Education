
import React from 'react';

interface DonationSheetProps {
  onDismiss: () => void;
  isOpen: boolean;
}

export const DonationSheet: React.FC<DonationSheetProps> = ({ onDismiss, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center p-4 pointer-events-none">
      <div className="bg-white dark:bg-[#1a2b34] w-full max-w-lg rounded-2xl shadow-2xl border-t border-slate-200 dark:border-[#233c48] p-6 pointer-events-auto animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]">
        <div className="flex items-start gap-4">
           <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-3 rounded-xl text-white shadow-lg shrink-0">
              <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
           </div>
           <div className="flex-1">
              <h3 className="text-lg font-bold dark:text-white mb-1">Enjoying ClassPlay?</h3>
              <p className="text-slate-500 dark:text-[#92b7c9] text-sm leading-relaxed mb-4">
                 ClassPlay is free and open for teachers everywhere. Your support keeps the servers running and new tools coming!
              </p>
              <div className="flex gap-3">
                 <a 
                   href="https://www.landecs.org/docs/donation" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   onClick={onDismiss}
                   className="flex-1 bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold py-2.5 rounded-lg text-center text-sm hover:brightness-110 transition-all shadow-md"
                 >
                   Donate Now
                 </a>
                 <button 
                   onClick={onDismiss}
                   className="px-4 py-2.5 rounded-lg border border-slate-200 dark:border-[#233c48] font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-[#111c22] text-sm transition-colors"
                 >
                   Later
                 </button>
              </div>
           </div>
        </div>
      </div>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
