import React, { useState, useEffect } from 'react';
import { saveToolState, getToolState } from '../../utils/db';

const DEFAULT_GOALS = ["Everyone on time", "100% Homework", "Clean Floor", "Kind Words", "Quiet Transition", "Good Line Up", "Raise Hands", "Help a Friend", "Focus 10m"];
const TOOL_ID = 'behavior_bingo';

export const BehaviorBingo: React.FC = () => {
  const [checked, setChecked] = useState<number[]>([]);
  const [goals, setGoals] = useState<string[]>(DEFAULT_GOALS);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadState();
  }, []);

  const loadState = async () => {
    try {
      const saved = await getToolState(TOOL_ID);
      if (saved) {
        if (saved.checked) setChecked(saved.checked);
        if (saved.goals) setGoals(saved.goals);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const saveState = async (newChecked: number[], newGoals: string[]) => {
    await saveToolState(TOOL_ID, { checked: newChecked, goals: newGoals });
  };

  const toggle = (i: number) => {
     if (isEditing) return;
     let newChecked;
     if(checked.includes(i)) newChecked = checked.filter(n => n !== i);
     else newChecked = [...checked, i];
     
     setChecked(newChecked);
     saveState(newChecked, goals);
  };

  const updateGoal = (index: number, text: string) => {
      const newGoals = [...goals];
      newGoals[index] = text;
      setGoals(newGoals);
      // Auto save on edit? Maybe better on 'Done'
  };

  const handleSaveEdit = () => {
      setIsEditing(false);
      saveState([], goals); // Reset checks on goal change? Or keep? Let's clear checks to avoid confusion if goal changes significantly, or optional. Let's reset for safety.
      if (window.confirm("Changing goals will reset the board. Continue?")) {
          setChecked([]);
          saveState([], goals);
      } else {
          loadState(); // Revert
      }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading Bingo...</div>;

  return (
    <div className="flex flex-col items-center h-full w-full p-4 overflow-y-auto">
       <div className="flex justify-between items-center w-full max-w-2xl mb-6">
           <h2 className="text-2xl font-bold dark:text-white">Class Goals Bingo</h2>
           <button 
             onClick={() => isEditing ? handleSaveEdit() : setIsEditing(true)}
             className={`px-4 py-2 rounded-lg font-bold text-sm ${isEditing ? 'bg-green-500 text-white' : 'bg-slate-200 dark:bg-[#1a2b34] text-slate-600 dark:text-white'}`}
           >
             {isEditing ? 'Save Board' : 'Edit Goals'}
           </button>
       </div>

       <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-2xl w-full aspect-square mb-8">
          {goals.map((g, i) => (
             <div key={i} className="relative w-full h-full">
                {isEditing ? (
                    <textarea 
                        value={g}
                        onChange={(e) => updateGoal(i, e.target.value)}
                        className="w-full h-full p-2 rounded-xl border-2 border-blue-400 bg-white dark:bg-[#1a2b34] dark:text-white text-center text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                ) : (
                    <button 
                        onClick={() => toggle(i)}
                        className={`w-full h-full rounded-2xl flex flex-col items-center justify-center p-2 text-center font-bold text-xs md:text-lg transition-all shadow-sm ${
                            checked.includes(i) 
                                ? 'bg-green-500 text-white scale-[0.98] shadow-inner ring-4 ring-green-500/30' 
                                : 'bg-white dark:bg-[#1a2b34] dark:text-white hover:scale-[1.02] hover:shadow-lg'
                        }`}
                    >
                        {checked.includes(i) && <span className="material-symbols-outlined text-3xl mb-1 animate-[popIn_0.3s]">check_circle</span>}
                        <span className="line-clamp-3">{g}</span>
                    </button>
                )}
             </div>
          ))}
       </div>
       
       {!isEditing && (
           <button 
             onClick={() => {
                 if(window.confirm("Clear all checks?")) {
                     setChecked([]);
                     saveState([], goals);
                 }
             }}
             className="text-slate-400 hover:text-red-500 font-bold text-sm"
           >
               Clear Board
           </button>
       )}
    </div>
  );
};