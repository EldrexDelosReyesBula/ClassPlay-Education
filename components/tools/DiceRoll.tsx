
import React, { useState } from 'react';

export const DiceRoll: React.FC = () => {
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<number>(1);

  const roll = () => {
    if (isRolling) return;
    setIsRolling(true);

    // Animation frames
    const duration = 1000;
    const interval = 100;
    let elapsed = 0;

    const shuffle = setInterval(() => {
      setResult(Math.floor(Math.random() * 6) + 1);
      elapsed += interval;
      if (elapsed >= duration) {
        clearInterval(shuffle);
        // Final result
        setResult(Math.floor(Math.random() * 6) + 1);
        setIsRolling(false);
      }
    }, interval);
  };

  const renderDots = (num: number) => {
    // Dot positions based on grid 3x3
    const positions: Record<number, string[]> = {
      1: ['center'],
      2: ['top-left', 'bottom-right'],
      3: ['top-left', 'center', 'bottom-right'],
      4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
      6: ['top-left', 'top-right', 'center-left', 'center-right', 'bottom-left', 'bottom-right']
    };

    const getGridClass = (pos: string) => {
      switch(pos) {
        case 'top-left': return 'col-start-1 row-start-1';
        case 'top-right': return 'col-start-3 row-start-1';
        case 'center-left': return 'col-start-1 row-start-2';
        case 'center': return 'col-start-2 row-start-2';
        case 'center-right': return 'col-start-3 row-start-2';
        case 'bottom-left': return 'col-start-1 row-start-3';
        case 'bottom-right': return 'col-start-3 row-start-3';
        default: return '';
      }
    };

    return positions[num].map((pos, i) => (
      <div key={i} className={`w-4 h-4 md:w-6 md:h-6 bg-slate-800 dark:bg-slate-200 rounded-full ${getGridClass(pos)} place-self-center shadow-sm`}></div>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-4xl mx-auto p-4">
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
        
        <div 
          className={`
            relative w-48 h-48 md:w-64 md:h-64 bg-white dark:bg-[#1a2b34] rounded-[2rem] shadow-2xl border-4 border-slate-100 dark:border-[#233c48]
            grid grid-cols-3 grid-rows-3 p-6 transition-transform duration-100
            ${isRolling ? 'animate-[shake_0.5s_infinite]' : 'transform hover:scale-105'}
          `}
          role="img"
          aria-label={`Dice showing ${result}`}
        >
          {renderDots(result)}
        </div>

        <div aria-live="polite" className="h-16 flex items-center justify-center mt-12">
            {!isRolling && (
              <div className="text-4xl font-black text-slate-800 dark:text-white animate-[popIn_0.3s_cubic-bezier(0.175,0.885,0.32,1.275)]">
                 You rolled a {result}!
              </div>
            )}
            {isRolling && (
              <div className="text-2xl font-bold text-slate-400 animate-pulse">Rolling...</div>
            )}
        </div>
      </div>

      <button 
        onClick={roll}
        disabled={isRolling}
        className="px-16 py-5 bg-purple-600 hover:bg-purple-700 text-white text-2xl font-black rounded-2xl shadow-xl shadow-purple-500/30 transition-all active:scale-95 disabled:opacity-70 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-purple-400"
      >
        {isRolling ? 'ROLLING...' : 'ROLL DICE'}
      </button>

      <style>{`
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
};
