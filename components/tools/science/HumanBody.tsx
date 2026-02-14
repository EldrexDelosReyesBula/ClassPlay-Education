
import React, { useState } from 'react';

const ORGANS = [
  { id: 'brain', name: 'Brain', func: 'Controls thoughts and body', color: 'bg-pink-300' },
  { id: 'heart', name: 'Heart', func: 'Pumps blood', color: 'bg-red-500' },
  { id: 'lungs', name: 'Lungs', func: 'Breathing air', color: 'bg-blue-300' },
  { id: 'stomach', name: 'Stomach', func: 'Digests food', color: 'bg-orange-300' },
  { id: 'liver', name: 'Liver', func: 'Cleans blood & aids digestion', color: 'bg-red-800' },
  { id: 'kidneys', name: 'Kidneys', func: 'Filters waste from blood', color: 'bg-purple-400' },
  { id: 'skeleton', name: 'Skeleton', func: 'Structure and protection', color: 'bg-slate-200' },
  { id: 'intestines', name: 'Intestines', func: 'Absorbs nutrients', color: 'bg-pink-400' }
];

export const HumanBody: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const next = () => {
    setCurrent((current + 1) % ORGANS.length);
    setRevealed(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 text-center">
       <h2 className="text-xl font-bold text-slate-400 uppercase tracking-widest mb-12">Anatomy Quiz</h2>
       
       <div className={`w-48 h-48 rounded-full flex items-center justify-center shadow-2xl mb-8 transition-transform ${ORGANS[current].color} animate-[popIn_0.3s]`}>
          <span className="material-symbols-outlined text-8xl text-white opacity-80">
            {ORGANS[current].id === 'brain' ? 'psychology' : 
             ORGANS[current].id === 'heart' ? 'favorite' :
             ORGANS[current].id === 'lungs' ? 'air' : 
             ORGANS[current].id === 'skeleton' ? 'accessibility' : 'water_drop'}
          </span>
       </div>

       <h1 className="text-5xl font-black dark:text-white mb-4">{ORGANS[current].name}</h1>
       
       <div className="h-16 flex items-center justify-center mb-8">
         {revealed ? (
            <p className="text-xl text-slate-600 dark:text-slate-300 font-bold animate-[fadeIn_0.3s]">{ORGANS[current].func}</p>
         ) : (
            <button onClick={() => setRevealed(true)} className="text-blue-500 font-bold hover:underline">Reveal Function</button>
         )}
       </div>

       <button onClick={next} className="px-12 py-4 bg-slate-800 dark:bg-white dark:text-black text-white font-bold rounded-2xl shadow-lg">
         Next Organ
       </button>
    </div>
  );
};
