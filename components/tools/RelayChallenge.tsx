import React, { useState, useEffect } from 'react';

export const RelayChallenge: React.FC = () => {
  const [time, setTime] = useState(0);
  const [active, setActive] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
     let int: number;
     if (active) int = window.setInterval(() => setTime(t => t+100), 100);
     return () => clearInterval(int);
  }, [active]);

  const fmt = (ms: number) => {
     return (ms/1000).toFixed(1);
  };

  const nextLeg = () => {
     setLaps([...laps, time]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
       <div className="text-[10rem] font-black font-mono tabular-nums dark:text-white leading-none mb-8">
          {fmt(time)}
       </div>

       <div className="flex gap-6 mb-8">
          <button onClick={() => setActive(!active)} className={`px-8 py-4 rounded-xl font-bold text-xl ${active ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
             {active ? 'STOP' : 'START'}
          </button>
          <button onClick={nextLeg} disabled={!active} className="px-8 py-4 rounded-xl font-bold text-xl bg-orange-500 text-white disabled:opacity-50">
             NEXT LEG
          </button>
          <button onClick={() => {setActive(false); setTime(0); setLaps([]);}} className="px-8 py-4 rounded-xl font-bold text-xl bg-slate-200 dark:bg-[#1a2b34] text-slate-600 dark:text-white">
             RESET
          </button>
       </div>

       <div className="flex gap-4 overflow-x-auto max-w-full pb-4">
          {laps.map((l, i) => (
             <div key={i} className="bg-white dark:bg-[#1a2b34] p-4 rounded-xl shadow min-w-[100px] text-center">
                <div className="text-xs text-slate-400 font-bold uppercase">Leg {i+1}</div>
                <div className="text-xl font-bold dark:text-white">{fmt(l)}s</div>
             </div>
          ))}
       </div>
    </div>
  );
};