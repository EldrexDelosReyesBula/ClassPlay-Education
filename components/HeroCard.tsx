import React from 'react';
import { HeroGame } from '../types';

interface HeroCardProps {
  game: HeroGame;
}

export const HeroCard: React.FC<HeroCardProps> = ({ game }) => {
  return (
    <div className={`min-w-[400px] flex-shrink-0 bg-gradient-to-br ${game.gradientClass} rounded-xl p-8 text-white relative overflow-hidden group shadow-xl`}>
      <div className="relative z-10">
        <span className="bg-white/20 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md uppercase tracking-widest">
          {game.tag}
        </span>
        <h3 className="text-2xl font-bold mt-4 mb-2">{game.title}</h3>
        <p className={`${game.textColorClass} max-w-[200px] text-sm leading-relaxed mb-6`}>
          {game.description}
        </p>
        <button className={`bg-white ${game.buttonTextColorClass} px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg hover:bg-opacity-90 transition-colors`}>
          {game.buttonText}
        </button>
      </div>
      <div className="absolute right-0 bottom-0 translate-y-1/4 translate-x-4 opacity-40 group-hover:scale-110 transition-transform duration-500">
        <span className="material-symbols-outlined text-[180px] select-none">
          {game.icon}
        </span>
      </div>
    </div>
  );
};