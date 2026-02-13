import React, { useState } from 'react';

const GOALS = ["Everyone on time", "100% Homework", "Clean Floor", "Kind Words", "Quiet Transition", "Good Line Up", "Raise Hands", "Help a Friend", "Focus 10m"];

export const BehaviorBingo: React.FC = () => {
  const [checked, setChecked] = useState<number[]>([]);

  const toggle = (i: number) => {
     if(checked.includes(i)) setChecked(checked.filter(n => n !== i));
     else setChecked([...checked, i]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
       <h2 className="text-2xl font-bold mb-8 dark:text-white">Class Goals Bingo</h2>
       <div className="grid grid-cols-3 gap-4 max-w-2xl w-full aspect-square">
          {GOALS.map((g, i) => (
             <button 
               key={i} 
               onClick={() => toggle(i)}
               className={`rounded-2xl flex items-center justify-center p-4 text-center font-bold text-sm md:text-lg transition-all ${
                  checked.includes(i) ? 'bg-green-500 text-white scale-95 shadow-inner' : 'bg-white dark:bg-[#1a2b34] shadow-md dark:text-white hover:scale-105'
               }`}
             >
                {checked.includes(i) && <span className="material-symbols-outlined block text-3xl mb-1">check_circle</span>}
                {g}
             </button>
          ))}
       </div>
    </div>
  );
};