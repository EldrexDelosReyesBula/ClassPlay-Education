import React, { useState } from 'react';

export const CollaborativePuzzle: React.FC = () => {
  const [progress, setProgress] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
       <h2 className="text-3xl font-black dark:text-white mb-2">Unlock the Vault</h2>
       <p className="text-slate-500 mb-12">Class must answer correctly to fill the bar</p>

       <div className="w-full max-w-2xl h-12 bg-slate-200 dark:bg-[#1a2b34] rounded-full overflow-hidden border-4 border-slate-300 dark:border-[#233c48] mb-12 relative">
          <div 
             className="h-full bg-blue-500 transition-all duration-500 relative overflow-hidden" 
             style={{width: `${progress}%`}}
          >
             <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite]"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-700 mix-blend-difference">{progress}%</div>
       </div>

       {progress >= 100 ? (
          <div className="text-center animate-[popIn_0.5s]">
             <span className="material-symbols-outlined text-9xl text-yellow-400 mb-4">lock_open</span>
             <h3 className="text-4xl font-black dark:text-white">UNLOCKED!</h3>
             <button onClick={() => setProgress(0)} className="mt-8 px-8 py-3 bg-slate-700 text-white rounded-xl">Reset</button>
          </div>
       ) : (
          <div className="flex gap-4">
             <button onClick={() => setProgress(p => Math.max(0, p - 10))} className="w-20 h-20 rounded-xl bg-red-100 text-red-600 font-bold text-3xl hover:bg-red-200">-</button>
             <button onClick={() => setProgress(p => Math.min(100, p + 10))} className="w-20 h-20 rounded-xl bg-green-100 text-green-600 font-bold text-3xl hover:bg-green-200">+</button>
          </div>
       )}
    </div>
  );
};