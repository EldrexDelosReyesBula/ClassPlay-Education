import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(game);
    }
  };

  return (
    <div 
      role="button"
      tabIndex={0}
      onClick={() => onClick(game)}
      onKeyDown={handleKeyDown}
      className="bg-white dark:bg-[#111c22] rounded-xl p-5 border border-slate-100 dark:border-[#233c48] hover:shadow-2xl hover:-translate-y-1 transition-all group flex flex-col cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary/50 relative overflow-hidden"
      aria-label={`Open tool: ${game.title}`}
    >
      <div className="relative w-full aspect-square rounded-lg bg-slate-100 dark:bg-[#1a2b34] flex items-center justify-center mb-4 overflow-hidden" aria-hidden="true">
        <div className={`absolute inset-0 bg-gradient-to-tr ${game.gradientFrom} to-transparent opacity-50 group-hover:opacity-100 transition-opacity`}></div>
        <span className={`material-symbols-outlined text-7xl ${game.iconColorClass} transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300 select-none`}>
          {game.icon}
        </span>
        {game.isPremium && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-2 py-1 rounded-md text-[10px] font-bold uppercase shadow-sm">
            Premium
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-bold mb-1 dark:text-white group-hover:text-primary transition-colors">{game.title}</h3>
      <p className="text-slate-500 dark:text-[#92b7c9] text-xs mb-4 line-clamp-1">{game.subtitle}</p>
      
      <div className="mt-auto flex items-center justify-between" aria-hidden="true">
        <span className={`${game.categoryColorClass} text-[11px] font-bold px-3 py-1 rounded-full uppercase`}>
          {game.category}
        </span>
        <div className="flex items-center gap-1 text-slate-400 text-xs">
          <span className="material-symbols-outlined text-sm">{game.metaIcon}</span>
          <span>{game.metaText}</span>
        </div>
      </div>
    </div>
  );
};
