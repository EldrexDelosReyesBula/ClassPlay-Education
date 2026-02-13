import React, { useState } from 'react';

export const HeartRate: React.FC = () => {
  const [bpm, setBpm] = useState<number>(0);

  const getZone = (b: number) => {
    if (b < 60) return { t: 'Resting', c: 'text-blue-400' };
    if (b < 100) return { t: 'Light Activity', c: 'text-green-500' };
    if (b < 140) return { t: 'Fat Burn / Aerobic', c: 'text-orange-500' };
    return { t: 'Peak / Anaerobic', c: 'text-red-500' };
  };

  const zone = getZone(bpm);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
       <div className="relative w-64 h-64 flex items-center justify-center">
          <div className={`absolute inset-0 rounded-full opacity-20 ${zone.c.replace('text', 'bg')} animate-ping`}></div>
          <span className={`material-symbols-outlined text-9xl ${zone.c} animate-pulse`}>favorite</span>
       </div>
       
       <h2 className={`text-4xl font-black mt-8 mb-2 ${zone.c}`}>{zone.t}</h2>
       <p className="text-slate-500 mb-8">Enter your pulse (BPM)</p>

       <div className="flex items-center gap-4">
          <button onClick={() => setBpm(Math.max(0, bpm - 5))} className="w-12 h-12 rounded-full bg-slate-200 dark:bg-[#1a2b34] text-xl font-bold hover:bg-slate-300">-</button>
          <input 
            type="number" 
            value={bpm}
            onChange={e => setBpm(parseInt(e.target.value) || 0)}
            className="w-32 text-center text-4xl font-black bg-transparent border-b-2 border-slate-300 focus:border-red-500 focus:ring-0 dark:text-white"
          />
          <button onClick={() => setBpm(bpm + 5)} className="w-12 h-12 rounded-full bg-slate-200 dark:bg-[#1a2b34] text-xl font-bold hover:bg-slate-300">+</button>
       </div>
    </div>
  );
};
