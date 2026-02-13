import React, { useState, useEffect, useRef } from 'react';

export const ClassTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
  const [initialTime, setInitialTime] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Play alarm sound here if possible
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const adjustTime = (amount: number) => {
    const newTime = Math.max(0, initialTime + amount);
    setInitialTime(newTime);
    setTimeLeft(newTime);
  };

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const presets = [60, 180, 300, 600, 900, 1200, 1800, 3600];

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto w-full p-4">
      <div className={`text-[20vw] md:text-[12rem] font-black font-mono leading-none tracking-tighter tabular-nums transition-colors ${timeLeft === 0 ? 'text-red-500 animate-pulse' : 'text-slate-800 dark:text-white'}`}>
        {formatTime(timeLeft)}
      </div>
      
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        <button onClick={toggleTimer} className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-lg transition-transform active:scale-95 ${isRunning ? 'bg-amber-500 text-white' : 'bg-primary text-white'}`}>
          <span className="material-symbols-outlined">{isRunning ? 'pause' : 'play_arrow'}</span>
        </button>
        <button onClick={resetTimer} className="w-20 h-20 rounded-full bg-slate-200 dark:bg-[#1a2b34] text-slate-600 dark:text-white flex items-center justify-center text-3xl shadow-lg transition-transform active:scale-95">
          <span className="material-symbols-outlined">replay</span>
        </button>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-8 gap-2 w-full max-w-3xl">
        {presets.map(seconds => (
          <button
            key={seconds}
            onClick={() => {
              setInitialTime(seconds);
              setTimeLeft(seconds);
              setIsRunning(false);
            }}
            className="py-2 px-1 rounded-lg bg-white dark:bg-[#111c22] border border-slate-200 dark:border-[#233c48] text-sm font-bold text-slate-600 dark:text-[#92b7c9] hover:bg-slate-50 dark:hover:bg-[#1a2b34] transition-colors"
          >
            {seconds / 60}m
          </button>
        ))}
      </div>
      
      <div className="mt-8 flex gap-4">
        <button onClick={() => adjustTime(60)} className="px-6 py-2 rounded-xl bg-slate-100 dark:bg-[#1a2b34] text-slate-600 dark:text-white font-bold hover:brightness-95">+ 1m</button>
        <button onClick={() => adjustTime(-60)} className="px-6 py-2 rounded-xl bg-slate-100 dark:bg-[#1a2b34] text-slate-600 dark:text-white font-bold hover:brightness-95">- 1m</button>
      </div>
    </div>
  );
};