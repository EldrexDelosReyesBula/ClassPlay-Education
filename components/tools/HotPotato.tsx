import React, { useState, useEffect, useRef } from 'react';

export const HotPotato: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  
  const timerRef = useRef<number | null>(null);

  const startGame = () => {
    setExploded(false);
    setIsPlaying(true);
    // Random duration between 10 and 30 seconds
    const duration = Math.floor(Math.random() * 20) + 10;
    setTimeLeft(duration);
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (isPlaying && timeLeft <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsPlaying(false);
      setExploded(true);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, timeLeft]);

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto w-full p-4">
      <div 
        role="status"
        aria-live="assertive"
        className={`relative w-64 h-64 flex items-center justify-center rounded-full transition-all duration-300 ${
          exploded ? 'bg-red-500 scale-110 animate-bounce' : isPlaying ? 'bg-orange-400 animate-pulse' : 'bg-slate-200 dark:bg-[#1a2b34]'
        }`}
      >
        <span className={`material-symbols-outlined text-[100px] ${exploded ? 'text-white' : isPlaying ? 'text-white' : 'text-slate-400'}`}>
          {exploded ? 'report' : 'local_fire_department'}
        </span>
        
        {isPlaying && (
           <div className="absolute inset-0 border-8 border-orange-300/50 rounded-full animate-[spin_3s_linear_infinite]"></div>
        )}
      </div>

      <div className="mt-12 text-center">
        {exploded ? (
          <h2 className="text-4xl font-black text-red-500 animate-[popIn_0.3s_ease-out]">TIME'S UP!</h2>
        ) : isPlaying ? (
          <h2 className="text-3xl font-bold text-orange-500">Passing...</h2>
        ) : (
          <h2 className="text-3xl font-bold text-slate-700 dark:text-white">Ready to Pass?</h2>
        )}
      </div>

      <button
        onClick={startGame}
        disabled={isPlaying}
        className="mt-8 px-12 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-xl rounded-2xl shadow-xl shadow-orange-500/30 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Start Hot Potato Timer"
      >
        {isPlaying ? 'Playing...' : exploded ? 'PLAY AGAIN' : 'START TIMER'}
      </button>
      
      <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm">Pass an object around. The person holding it when the timer stops is "out"!</p>
    </div>
  );
};