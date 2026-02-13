import React, { useState, useEffect, useRef } from 'react';

export const Stopwatch: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime(t => t + 10);
      }, 10);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const handleLap = () => {
    setLaps(prev => [time, ...prev]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full p-4">
      <div className="flex-1 flex flex-col items-center justify-center min-h-[200px]">
        <div className="text-7xl md:text-9xl font-black font-mono tracking-wider text-slate-800 dark:text-white tabular-nums mb-12">
          {formatTime(time)}
        </div>

        <div className="flex gap-6 mb-8">
           <button 
             onClick={() => setIsRunning(!isRunning)} 
             className={`w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-xl transition-all active:scale-95 ${isRunning ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
           >
             <span className="material-symbols-outlined text-3xl mb-1">{isRunning ? 'stop' : 'play_arrow'}</span>
             <span className="text-xs font-bold uppercase">{isRunning ? 'Stop' : 'Start'}</span>
           </button>
           
           <button 
             onClick={isRunning ? handleLap : handleReset}
             className="w-24 h-24 rounded-full bg-slate-200 dark:bg-[#1a2b34] text-slate-700 dark:text-white flex flex-col items-center justify-center shadow-xl transition-all active:scale-95 hover:bg-slate-300 dark:hover:bg-[#233c48]"
           >
             <span className="material-symbols-outlined text-3xl mb-1">{isRunning ? 'flag' : 'replay'}</span>
             <span className="text-xs font-bold uppercase">{isRunning ? 'Lap' : 'Reset'}</span>
           </button>
        </div>
      </div>

      {/* Laps */}
      <div className="flex-1 bg-white dark:bg-[#111c22] rounded-2xl border border-slate-200 dark:border-[#233c48] overflow-hidden flex flex-col max-h-[300px]">
        <div className="p-4 border-b border-slate-200 dark:border-[#233c48] font-bold text-slate-500 dark:text-[#92b7c9] flex justify-between">
          <span>Lap #</span>
          <span>Split</span>
        </div>
        <div className="overflow-y-auto custom-scrollbar p-2">
           {laps.length === 0 ? (
             <div className="text-center py-8 text-slate-400 italic">No laps recorded</div>
           ) : (
             laps.map((lapTime, idx) => (
               <div key={idx} className="flex justify-between p-3 border-b border-slate-100 dark:border-[#1a2b34] last:border-0 dark:text-white font-mono">
                 <span className="text-slate-500">Lap {laps.length - idx}</span>
                 <span>{formatTime(lapTime)}</span>
               </div>
             ))
           )}
        </div>
      </div>
    </div>
  );
};