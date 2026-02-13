import React, { useState, useEffect } from 'react';

const POSES = [
  { name: "Sky Reach", icon: "accessibility_new" },
  { name: "Toe Touch", icon: "arrow_downward" },
  { name: "Shoulder Roll", icon: "refresh" },
  { name: "Neck Stretch", icon: "sentiment_neutral" },
  { name: "Twist Left", icon: "keyboard_double_arrow_left" },
  { name: "Twist Right", icon: "keyboard_double_arrow_right" },
];

export const StretchMove: React.FC = () => {
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    let int: number;
    if (active) {
      int = window.setInterval(() => {
        setTimer(t => {
           if (t <= 1) {
             setIndex(i => (i + 1) % POSES.length);
             return 10;
           }
           return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(int);
  }, [active]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 bg-green-50 dark:bg-[#0f181e]">
      <div className="text-center">
         <div className="text-8xl md:text-9xl mb-8 animate-bounce text-green-600">
           <span className="material-symbols-outlined text-[150px]">{POSES[index].icon}</span>
         </div>
         <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">{POSES[index].name}</h2>
         <div className="text-6xl font-mono text-green-500 font-bold my-8">{timer}s</div>
         
         <button 
           onClick={() => setActive(!active)}
           className="px-12 py-4 bg-green-600 text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-transform"
         >
           {active ? 'PAUSE' : 'START ROUTINE'}
         </button>
      </div>
    </div>
  );
};