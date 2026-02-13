import React, { useState } from 'react';

const TRAITS = [
  "Has a pet dog", "Likes spicy food", "Plays an instrument", "Has broken a bone",
  "Speaks 2+ languages", "Born in another state", "Likes broccoli", "Has met a celebrity",
  "Can whistle", "Is left-handed", "Likes to draw", "Has a younger brother",
  "Walked to school today", "Has been camping", "Dislikes chocolate", "Has a birthday this month",
  "Can do a cartwheel", "Wears glasses", "Likes scary movies", "Has run a 5k",
  "Has a cat", "Can cook a meal", "Likes sushi", "Has been on a plane", "Loves math"
];

export const HumanBingo: React.FC = () => {
  const [grid, setGrid] = useState<string[]>([]);
  
  const generate = () => {
    const shuffled = [...TRAITS].sort(() => 0.5 - Math.random());
    setGrid(shuffled.slice(0, 25)); // 5x5
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full p-4 items-center">
       {grid.length === 0 ? (
         <div className="flex-1 flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-9xl text-slate-300 mb-6">grid_on</span>
            <button onClick={generate} className="px-8 py-4 bg-cyan-600 text-white font-bold rounded-2xl text-xl shadow-xl">Generate Bingo Card</button>
         </div>
       ) : (
         <div className="flex flex-col items-center h-full">
            <div className="grid grid-cols-5 gap-1 md:gap-2 mb-6 w-full max-w-2xl aspect-square">
               {grid.map((trait, i) => (
                  <div key={i} className="bg-white dark:bg-[#1a2b34] border border-slate-200 dark:border-[#233c48] p-1 flex items-center justify-center text-center">
                     <span className="text-[9px] md:text-xs font-bold dark:text-slate-300 leading-tight">{i === 12 ? "FREE SPACE" : trait}</span>
                  </div>
               ))}
            </div>
            <div className="flex gap-4">
              <button onClick={generate} className="px-6 py-2 bg-slate-200 dark:bg-[#233c48] text-slate-700 dark:text-white font-bold rounded-xl">Shuffle New</button>
              <button onClick={() => window.print()} className="px-6 py-2 bg-primary text-white font-bold rounded-xl">Print</button>
            </div>
         </div>
       )}
    </div>
  );
};