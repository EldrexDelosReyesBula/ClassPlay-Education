import React, { useState, useEffect } from 'react';

export const FocusTracker: React.FC = () => {
  const [isFocusing, setIsFocusing] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let int: number;
    if (isFocusing) {
       int = window.setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(int);
  }, [isFocusing]);

  const fmt = (s: number) => {
      const m = Math.floor(s / 60);
      const sec = s % 60;
      return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
       <h2 className="text-slate-400 font-bold uppercase tracking-widest mb-4">Focus Time</h2>
       <div className={`text-9xl font-mono font-black mb-12 ${isFocusing ? 'text-blue-600' : 'text-slate-300'}`}>
          {fmt(seconds)}
       </div>
       <div className="flex gap-4">
          <button 
            onClick={() => setIsFocusing(!isFocusing)}
            className={`px-8 py-4 rounded-xl font-bold text-xl shadow-lg ${isFocusing ? 'bg-orange-500 text-white' : 'bg-blue-600 text-white'}`}
          >
             {isFocusing ? 'PAUSE' : 'START FOCUS'}
          </button>
          <button 
             onClick={() => { setIsFocusing(false); setSeconds(0); }}
             className="px-8 py-4 bg-slate-200 dark:bg-[#1a2b34] text-slate-600 dark:text-white rounded-xl font-bold"
          >
             RESET
          </button>
       </div>
    </div>
  );
};