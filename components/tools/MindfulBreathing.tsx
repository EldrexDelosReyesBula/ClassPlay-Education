import React, { useState, useEffect } from 'react';

export const MindfulBreathing: React.FC = () => {
  const [active, setActive] = useState(false);
  const [text, setText] = useState('Ready');
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (active) {
       const cycle = async () => {
         // Inhale 4
         setText('Inhale...');
         setScale(1.5);
         await new Promise(r => setTimeout(r, 4000));
         if(!active) return;
         
         // Hold 7
         setText('Hold');
         await new Promise(r => setTimeout(r, 7000));
         if(!active) return;

         // Exhale 8
         setText('Exhale...');
         setScale(1);
         await new Promise(r => setTimeout(r, 8000));
         if(!active) return;
         
         cycle();
       };
       cycle();
    } else {
       setScale(1);
       setText('Ready');
    }
  }, [active]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-cyan-50 dark:bg-[#0f181e] transition-colors p-4">
       <div 
         className="w-64 h-64 bg-cyan-200 dark:bg-cyan-900/40 rounded-full flex items-center justify-center transition-all duration-[4000ms] ease-in-out relative"
         style={{ transform: `scale(${scale})` }}
       >
          <div className="w-56 h-56 bg-white/50 dark:bg-cyan-500/20 rounded-full blur-md absolute"></div>
          <span className="relative z-10 text-2xl font-bold text-cyan-800 dark:text-cyan-100">{text}</span>
       </div>
       
       <button 
         onClick={() => setActive(!active)}
         className="mt-20 px-8 py-3 bg-cyan-600 text-white font-bold rounded-xl shadow-lg z-20"
       >
         {active ? 'Stop' : 'Start 4-7-8 Breathing'}
       </button>
    </div>
  );
};