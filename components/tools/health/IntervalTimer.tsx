import React, { useState, useEffect } from 'react';

export const IntervalTimer: React.FC = () => {
  const [work, setWork] = useState(30);
  const [rest, setRest] = useState(10);
  const [rounds, setRounds] = useState(5);
  
  const [currentRound, setCurrentRound] = useState(1);
  const [phase, setPhase] = useState<'work' | 'rest' | 'idle' | 'done'>('idle');
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let timer: number;
    if (phase === 'work' || phase === 'rest') {
       if (timeLeft > 0) {
         timer = window.setInterval(() => setTimeLeft(t => t - 1), 1000);
       } else {
         // Phase complete
         if (phase === 'work') {
            setPhase('rest');
            setTimeLeft(rest);
         } else {
            // Rest complete
            if (currentRound < rounds) {
               setCurrentRound(r => r + 1);
               setPhase('work');
               setTimeLeft(work);
            } else {
               setPhase('done');
            }
         }
       }
    }
    return () => clearInterval(timer);
  }, [phase, timeLeft, rest, work, currentRound, rounds]);

  const start = () => {
     setPhase('work');
     setCurrentRound(1);
     setTimeLeft(work);
  };

  const reset = () => {
     setPhase('idle');
     setCurrentRound(1);
     setTimeLeft(0);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
       {phase === 'idle' ? (
          <div className="bg-white dark:bg-[#111c22] p-8 rounded-3xl shadow-xl w-full max-w-md">
             <h2 className="text-2xl font-black dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-500">fitness_center</span>
                Workout Setup
             </h2>
             <div className="space-y-4 mb-8">
                <div>
                   <label className="text-xs font-bold uppercase text-slate-500">Work (sec)</label>
                   <input type="number" value={work} onChange={e => setWork(Number(e.target.value))} className="w-full font-bold dark:bg-[#1a2b34] dark:text-white rounded-lg" />
                </div>
                <div>
                   <label className="text-xs font-bold uppercase text-slate-500">Rest (sec)</label>
                   <input type="number" value={rest} onChange={e => setRest(Number(e.target.value))} className="w-full font-bold dark:bg-[#1a2b34] dark:text-white rounded-lg" />
                </div>
                <div>
                   <label className="text-xs font-bold uppercase text-slate-500">Rounds</label>
                   <input type="number" value={rounds} onChange={e => setRounds(Number(e.target.value))} className="w-full font-bold dark:bg-[#1a2b34] dark:text-white rounded-lg" />
                </div>
             </div>
             <button onClick={start} className="w-full py-4 bg-orange-500 text-white font-black rounded-xl shadow-lg">START WORKOUT</button>
          </div>
       ) : (
          <div className={`text-center w-full max-w-2xl p-12 rounded-[3rem] transition-colors duration-500 ${phase === 'work' ? 'bg-green-500' : phase === 'rest' ? 'bg-blue-500' : 'bg-slate-800'}`}>
             <h3 className="text-white/80 font-bold uppercase text-xl mb-4">
                {phase === 'done' ? 'Workout Complete' : `Round ${currentRound}/${rounds}`}
             </h3>
             <h1 className="text-9xl font-black text-white mb-2">
                {phase === 'done' ? 'DONE' : timeLeft}
             </h1>
             <h2 className="text-4xl font-black text-white/90 uppercase mb-8">{phase}</h2>
             
             {phase !== 'done' && (
                <button onClick={reset} className="px-8 py-2 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30">STOP</button>
             )}
             {phase === 'done' && (
                <button onClick={reset} className="px-12 py-4 bg-white text-slate-800 font-black rounded-xl shadow-xl">NEW WORKOUT</button>
             )}
          </div>
       )}
    </div>
  );
};