
import React, { useState, useEffect } from 'react';
import { saveToolState, getToolState } from '../../utils/db';

const DEFAULT_TRAITS = [
  "Has a pet dog", "Likes spicy food", "Plays an instrument", "Has broken a bone",
  "Speaks 2+ languages", "Born in another state", "Likes broccoli", "Has met a celebrity",
  "Can whistle", "Is left-handed", "Likes to draw", "Has a younger brother",
  "Walked to school today", "Has been camping", "Dislikes chocolate", "Has a birthday this month",
  "Can do a cartwheel", "Wears glasses", "Likes scary movies", "Has run a 5k",
  "Has a cat", "Can cook a meal", "Likes sushi", "Has been on a plane", "Loves math"
];

const TOOL_ID = 'human_bingo_custom';

export const HumanBingo: React.FC = () => {
  const [traits, setTraits] = useState<string[]>(DEFAULT_TRAITS);
  const [grid, setGrid] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load custom traits
    getToolState(TOOL_ID).then(data => {
        if(data && data.traits) setTraits(data.traits);
    });
  }, []);

  const saveTraits = async (newTraits: string[]) => {
      setTraits(newTraits);
      await saveToolState(TOOL_ID, { traits: newTraits });
  };

  const generate = () => {
    // Ensure we have enough traits, repeat if necessary
    let pool = [...traits];
    if (pool.length < 25) {
        while(pool.length < 25) pool = pool.concat(traits);
    }
    const shuffled = pool.sort(() => 0.5 - Math.random());
    setGrid(shuffled.slice(0, 25)); // 5x5
  };

  const updateTrait = (idx: number, val: string) => {
      const newTraits = [...traits];
      newTraits[idx] = val;
      setTraits(newTraits);
  };

  const addTrait = () => setTraits([...traits, "New Trait"]);
  const removeTrait = (idx: number) => {
      if(window.confirm("Delete this trait?")) {
          setTraits(traits.filter((_, i) => i !== idx));
      }
  };

  if (isEditing) {
      return (
          <div className="flex flex-col h-full w-full max-w-4xl mx-auto p-4">
              <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold dark:text-white">Edit Bingo Traits</h2>
                  <div className="flex gap-2">
                      <button onClick={addTrait} className="px-4 py-2 bg-slate-200 dark:bg-[#233c48] rounded-lg font-bold">+ Add</button>
                      <button onClick={() => { setIsEditing(false); saveTraits(traits); }} className="px-4 py-2 bg-green-500 text-white rounded-lg font-bold">Done</button>
                  </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-y-auto custom-scrollbar flex-1 pb-4">
                  {traits.map((t, i) => (
                      <div key={i} className="flex gap-2">
                          <input 
                            value={t} 
                            onChange={(e) => updateTrait(i, e.target.value)}
                            className="flex-1 px-3 py-2 rounded border border-slate-200 dark:border-[#233c48] dark:bg-[#1a2b34] dark:text-white"
                          />
                          <button onClick={() => removeTrait(i)} className="text-red-500 hover:bg-red-50 px-2 rounded">
                              <span className="material-symbols-outlined">delete</span>
                          </button>
                      </div>
                  ))}
              </div>
          </div>
      );
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full p-4 items-center relative">
       <button 
         onClick={() => setIsEditing(true)}
         className="absolute top-0 right-4 text-slate-400 hover:text-primary flex items-center gap-1 text-sm font-bold bg-white/50 dark:bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm"
       >
         <span className="material-symbols-outlined text-lg">edit</span> Customize
       </button>

       {grid.length === 0 ? (
         <div className="flex-1 flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-9xl text-slate-300 mb-6">grid_on</span>
            <h2 className="text-2xl font-bold dark:text-white mb-2">Human Bingo</h2>
            <p className="text-slate-500 mb-8">Get students moving and talking!</p>
            <button onClick={generate} className="px-8 py-4 bg-cyan-600 text-white font-bold rounded-2xl text-xl shadow-xl hover:scale-105 transition-transform">Generate Bingo Card</button>
         </div>
       ) : (
         <div className="flex flex-col items-center h-full w-full">
            <div className="grid grid-cols-5 gap-1 md:gap-2 mb-6 w-full max-w-2xl aspect-square bg-slate-200 dark:bg-[#233c48] p-1 md:p-2 rounded-xl">
               {grid.map((trait, i) => (
                  <div key={i} className={`bg-white dark:bg-[#111c22] p-1 flex items-center justify-center text-center rounded overflow-hidden ${i === 12 ? 'bg-cyan-100 dark:bg-cyan-900/30' : ''}`}>
                     <span className={`text-[9px] md:text-xs font-bold dark:text-slate-200 leading-tight ${i === 12 ? 'text-cyan-700 dark:text-cyan-300' : ''}`}>
                         {i === 12 ? "FREE SPACE" : trait}
                     </span>
                  </div>
               ))}
            </div>
            <div className="flex gap-4">
              <button onClick={generate} className="px-6 py-2 bg-slate-200 dark:bg-[#233c48] text-slate-700 dark:text-white font-bold rounded-xl shadow-sm hover:bg-slate-300">Shuffle New</button>
              <button onClick={() => window.print()} className="px-6 py-2 bg-primary text-white font-bold rounded-xl shadow-lg hover:brightness-110">Print</button>
            </div>
         </div>
       )}
    </div>
  );
};
