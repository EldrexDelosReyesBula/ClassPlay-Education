import React, { useState, useEffect } from 'react';

export const QuickDance: React.FC = () => {
  const [active, setActive] = useState(false);
  const [time, setTime] = useState(60);

  useEffect(() => {
     let int: number;
     if (active && time > 0) int = window.setInterval(() => setTime(t => t - 1), 1000);
     return () => clearInterval(int);
  }, [active, time]);

  return (
    <div className={`flex flex-col items-center justify-center h-full w-full p-4 transition-colors duration-500 ${active ? 'bg-pink-500' : 'bg-white dark:bg-[#0b1419]'}`}>
       {active ? (
          <div className="text-center animate-bounce">
             <div className="text-9xl font-black text-white mb-4">{time}</div>
             <div className="text-4xl font-bold text-white/80 uppercase">Dance!</div>
          </div>
       ) : (
          <div className="text-center">
             <span className="material-symbols-outlined text-9xl text-pink-500 mb-4">music_note</span>
             <h2 className="text-4xl font-black dark:text-white mb-8">60s Dance Break</h2>
             <button onClick={() => setActive(true)} className="px-12 py-5 bg-pink-500 text-white font-black text-2xl rounded-2xl shadow-xl hover:scale-105 transition-transform">START MUSIC</button>
          </div>
       )}
    </div>
  );
};