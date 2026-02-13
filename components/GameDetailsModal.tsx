import React from 'react';
import { Game } from '../types';

interface GameDetailsModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
  onPlay: (gameId: string) => void;
}

export const GameDetailsModal: React.FC<GameDetailsModalProps> = ({ game, isOpen, onClose, onPlay }) => {
  if (!isOpen || !game) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-[fadeIn_0.2s_ease-out]" 
        onClick={onClose}
      ></div>
      <div className="bg-white dark:bg-[#111c22] w-full max-w-lg rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden relative transform transition-all animate-[popIn_0.3s_cubic-bezier(0.16,1,0.3,1)] max-h-[90vh] flex flex-col">
        
        {/* Header Image/Icon */}
        <div className={`h-40 bg-gradient-to-br ${game.gradientFrom} to-transparent flex items-center justify-center relative shrink-0`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/10 hover:bg-black/20 text-white rounded-full p-2 transition-colors z-10"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          
          <div className="bg-white dark:bg-[#111c22] p-6 rounded-2xl shadow-lg transform translate-y-8">
            <span className={`material-symbols-outlined text-6xl ${game.iconColorClass}`}>
                {game.icon}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 pt-12 overflow-y-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-black dark:text-white mb-2">{game.title}</h2>
            <div className="flex gap-2 justify-center">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${game.categoryColorClass}`}>
                    {game.category}
                </span>
                {game.isPremium && (
                    <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-3 py-1 rounded-full text-[11px] font-bold shadow-sm">
                        PREMIUM
                    </div>
                )}
            </div>
          </div>
          
          <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed text-center text-lg">
            {game.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 dark:bg-[#1a2b34] p-4 rounded-2xl flex flex-col items-center gap-2 text-center border border-slate-100 dark:border-[#233c48]">
                <span className="material-symbols-outlined text-slate-400">group</span>
                <div>
                    <p className="text-xs text-slate-400 dark:text-[#5f7a8c] font-bold uppercase">Players</p>
                    <p className="font-bold dark:text-white">{game.metaText}</p>
                </div>
            </div>
            <div className="bg-slate-50 dark:bg-[#1a2b34] p-4 rounded-2xl flex flex-col items-center gap-2 text-center border border-slate-100 dark:border-[#233c48]">
                <span className="material-symbols-outlined text-slate-400">timer</span>
                <div>
                    <p className="text-xs text-slate-400 dark:text-[#5f7a8c] font-bold uppercase">Duration</p>
                    <p className="font-bold dark:text-white">~5 mins</p>
                </div>
            </div>
          </div>

          <button 
              onClick={() => {
                onPlay(game.id);
                onClose();
              }}
              className="w-full bg-primary text-white font-black text-lg py-4 rounded-2xl shadow-xl shadow-primary/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined filled">play_arrow</span>
              LAUNCH ACTIVITY
            </button>
        </div>
      </div>
    </div>
  );
};