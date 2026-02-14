
import React, { useState } from 'react';

export const CollaborativePuzzle: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [prize, setPrize] = useState("");
  const [autoReset, setAutoReset] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 relative">
       {isEditing && (
           <div className="absolute top-20 bg-white dark:bg-[#1a2b34] p-4 rounded-xl shadow-xl z-20 border border-slate-200 dark:border-[#233c48]">
               <h3 className="font-bold mb-2 dark:text-white">Settings</h3>
               <input placeholder="Unlock Prize Name" value={prize} onChange={e => setPrize(e.target.value)} className="w-full p-2 border rounded mb-2 dark:bg-[#111c22] dark:text-white" />
               <label className="flex items-center gap-2 dark:text-white text-sm cursor-pointer">
                   <input type="checkbox" checked={autoReset} onChange={e => setAutoReset(e.target.checked)} /> Auto Reset on Unlock
               </label>
               <button onClick={() => setIsEditing(false)} className="mt-4 w-full bg-blue-500 text-white py-1 rounded">Done</button>
           </div>
       )}

       <button onClick={() => setIsEditing(!isEditing)} className="absolute top-4 right-4 text-slate-400"><span className="material-symbols-outlined">settings</span></button>

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
             {prize && <div className="text-2xl font-bold text-green-500 mt-2">{prize}</div>}
             <button 
                onClick={() => setProgress(0)} 
                className="mt-8 px-8 py-3 bg-slate-700 text-white rounded-xl"
                ref={btn => { if(autoReset && btn) setTimeout(() => setProgress(0), 3000); }}
             >
                 Reset
             </button>
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
