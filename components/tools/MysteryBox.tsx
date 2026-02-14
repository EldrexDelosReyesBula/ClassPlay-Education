
import React, { useState, useEffect } from 'react';
import { saveToolState, getToolState } from '../../utils/db';

const TOOL_ID = 'mystery_box_rewards';
const DEFAULT_REWARDS = [
  "No Homework Pass",
  "Sit Next to a Friend",
  "DJ for 5 Minutes",
  "Teacher's Helper",
  "Extra 5min Recess",
  "Pick the Next Game",
  "Hat Day",
  "First in Line",
  "Sticker Prize",
  "Positive Note Home"
];

export const MysteryBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [reward, setReward] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [rewards, setRewards] = useState<string[]>(DEFAULT_REWARDS);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
      getToolState(TOOL_ID).then(data => {
          if(data && data.rewards) setRewards(data.rewards);
      });
  }, []);

  const saveRewards = (newR: string[]) => {
      setRewards(newR);
      saveToolState(TOOL_ID, { rewards: newR });
  };

  const openBox = () => {
    if (isOpen) {
      setIsOpen(false);
      setReward("");
      return;
    }
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      setIsOpen(true);
      setReward(rewards[Math.floor(Math.random() * rewards.length)]);
    }, 1000);
  };

  if (isEditing) {
      return (
          <div className="flex flex-col h-full w-full max-w-2xl mx-auto p-4">
              <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold dark:text-white">Edit Rewards</h2>
                  <button onClick={() => setIsEditing(false)} className="text-primary font-bold">Done</button>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
                  {rewards.map((r, i) => (
                      <div key={i} className="flex gap-2">
                          <input 
                            value={r}
                            onChange={e => {
                                const n = [...rewards];
                                n[i] = e.target.value;
                                saveRewards(n);
                            }}
                            className="flex-1 p-2 rounded border dark:bg-[#1a2b34] dark:border-none dark:text-white"
                          />
                          <button onClick={() => saveRewards(rewards.filter((_, idx) => idx !== i))} className="text-red-500"><span className="material-symbols-outlined">delete</span></button>
                      </div>
                  ))}
                  <button onClick={() => saveRewards([...rewards, "New Reward"])} className="w-full py-2 bg-green-500 text-white rounded font-bold mt-4">Add Reward</button>
              </div>
          </div>
      );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 relative">
      <button onClick={() => setIsEditing(true)} className="absolute top-4 right-4 text-slate-400 hover:text-primary"><span className="material-symbols-outlined">edit</span></button>

      <div 
        onClick={openBox}
        className={`relative cursor-pointer transition-transform duration-100 ${isShaking ? 'animate-[shake_0.5s_infinite]' : 'hover:scale-105 active:scale-95'}`}
      >
        <span className={`material-symbols-outlined text-[200px] md:text-[300px] drop-shadow-2xl transition-all duration-500 ${isOpen ? 'text-slate-300 opacity-50 scale-110' : 'text-indigo-600'}`}>
          {isOpen ? 'drafts' : 'inventory_2'}
        </span>
        
        {isOpen && (
          <div className="absolute inset-0 flex items-center justify-center animate-[popIn_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)]">
             <div className="bg-white dark:bg-[#1a2b34] p-8 rounded-3xl shadow-2xl border-4 border-indigo-500 text-center max-w-sm rotate-3">
                <span className="text-xs font-bold uppercase text-indigo-400 tracking-widest">You got</span>
                <h2 className="text-3xl font-black text-slate-800 dark:text-white mt-2">{reward}</h2>
             </div>
          </div>
        )}
      </div>

      <p className="mt-8 text-slate-400 font-bold uppercase tracking-widest">
        {isOpen ? 'Click to Close' : isShaking ? 'Opening...' : 'Tap to Open'}
      </p>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px) rotate(-5deg); }
          75% { transform: translateX(10px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
};
