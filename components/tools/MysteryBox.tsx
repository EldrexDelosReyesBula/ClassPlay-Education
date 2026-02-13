import React, { useState } from 'react';

const REWARDS = [
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
      setReward(REWARDS[Math.floor(Math.random() * REWARDS.length)]);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
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