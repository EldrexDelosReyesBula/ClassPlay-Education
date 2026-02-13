import React, { useState, useEffect } from 'react';

export const ZenForest: React.FC = () => {
  const [phase, setPhase] = useState<'In' | 'Hold' | 'Out'>('In');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3m

  useEffect(() => {
    let timer: number;
    if (isActive && timeLeft > 0) {
      timer = window.setInterval(() => setTimeLeft(t => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  useEffect(() => {
    let breathTimer: number;
    if (isActive) {
      const cycle = async () => {
        setPhase('In');
        await new Promise(r => setTimeout(r, 4000));
        if(!isActive) return;
        setPhase('Hold');
        await new Promise(r => setTimeout(r, 4000));
        if(!isActive) return;
        setPhase('Out');
        await new Promise(r => setTimeout(r, 4000));
        if(!isActive) return;
        cycle();
      };
      cycle();
    }
    return () => {}; // Cleanup complex logic in real app
  }, [isActive]);

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto w-full p-4 bg-gradient-to-b from-indigo-50 to-purple-50 dark:from-[#111c22] dark:to-[#1a2b34] rounded-3xl">
      <div className="text-slate-400 font-mono mb-8">{Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2, '0')} remaining</div>
      
      <div className={`w-64 h-64 md:w-96 md:h-96 rounded-full flex items-center justify-center bg-white/50 dark:bg-white/5 backdrop-blur-xl transition-all duration-[4000ms] ${phase === 'In' ? 'scale-110 bg-indigo-200/50' : phase === 'Out' ? 'scale-90 bg-purple-200/50' : 'scale-100'}`}>
        <div className="text-4xl md:text-6xl font-bold text-indigo-800 dark:text-indigo-200">
           {isActive ? `Breathe ${phase}` : 'Ready'}
        </div>
      </div>

      <button 
        onClick={() => setIsActive(!isActive)}
        className="mt-12 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700"
      >
        {isActive ? 'Pause Session' : 'Start Journey'}
      </button>
    </div>
  );
};