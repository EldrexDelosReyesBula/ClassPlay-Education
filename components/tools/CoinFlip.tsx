import React, { useState } from 'react';

export const CoinFlip: React.FC = () => {
  const [result, setResult] = useState<'HEADS' | 'TAILS' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [labels, setLabels] = useState({ heads: 'HEADS', tails: 'TAILS' });
  const [showSettings, setShowSettings] = useState(false);

  const flip = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setResult(null);

    // CSS Animation Duration
    setTimeout(() => {
      const outcome = Math.random() > 0.5 ? 'HEADS' : 'TAILS';
      setResult(outcome);
      setIsFlipping(false);
    }, 2000); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-4xl mx-auto p-4 relative">
      
      {/* Customization Toggle */}
      <div className="absolute top-0 right-4 z-10">
         <button 
           onClick={() => setShowSettings(!showSettings)}
           className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm bg-white/50 dark:bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm"
         >
           <span className="material-symbols-outlined text-lg">edit</span>
           Customize
         </button>
      </div>

      {showSettings && (
        <div className="absolute top-12 right-4 z-20 bg-white dark:bg-[#111c22] p-4 rounded-xl shadow-xl border border-slate-200 dark:border-[#233c48] w-64 animate-[popIn_0.2s_ease-out]">
           <h3 className="text-sm font-bold mb-3 dark:text-white">Coin Labels</h3>
           <div className="space-y-3">
             <div>
               <label className="text-xs text-amber-600 font-bold block mb-1">Side A (Gold)</label>
               <input 
                 value={labels.heads}
                 onChange={e => setLabels(l => ({...l, heads: e.target.value.substring(0, 10)}))}
                 className="w-full px-2 py-1 rounded border dark:bg-[#1a2b34] dark:border-[#233c48] dark:text-white text-sm"
                 maxLength={10}
               />
             </div>
             <div>
               <label className="text-xs text-slate-500 font-bold block mb-1">Side B (Silver)</label>
               <input 
                 value={labels.tails}
                 onChange={e => setLabels(l => ({...l, tails: e.target.value.substring(0, 10)}))}
                 className="w-full px-2 py-1 rounded border dark:bg-[#1a2b34] dark:border-[#233c48] dark:text-white text-sm"
                 maxLength={10}
               />
             </div>
           </div>
        </div>
      )}

      {/* Coin Animation Container */}
      <div className="relative w-64 h-64 mb-12 perspective-1000">
         <div 
           className={`w-full h-full relative preserve-3d transition-transform duration-[2000ms] ease-out ${
             isFlipping 
                ? 'animate-[spinCoin_2s_ease-in-out_forwards]' 
                : result === 'TAILS' ? 'rotate-y-180' : 'rotate-y-0'
           }`}
           style={{ transformStyle: 'preserve-3d' }}
         >
            {/* Front (Heads) */}
            <div className="absolute inset-0 backface-hidden rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 border-4 border-amber-600 shadow-xl flex items-center justify-center">
                <div className="text-center">
                   <span className="material-symbols-outlined text-6xl text-amber-800 drop-shadow-sm mb-2">stars</span>
                   <div className="text-xl font-black text-amber-800 uppercase tracking-wider px-4">{labels.heads}</div>
                </div>
            </div>

            {/* Back (Tails) */}
            <div 
              className="absolute inset-0 backface-hidden rounded-full bg-gradient-to-br from-slate-200 to-slate-400 border-4 border-slate-500 shadow-xl flex items-center justify-center"
              style={{ transform: 'rotateY(180deg)' }}
            >
                <div className="text-center">
                   <span className="material-symbols-outlined text-6xl text-slate-700 drop-shadow-sm mb-2">diamond</span>
                   <div className="text-xl font-black text-slate-700 uppercase tracking-wider px-4">{labels.tails}</div>
                </div>
            </div>
         </div>
         {/* Shadow */}
         <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black/20 blur-xl rounded-[100%] transition-all duration-[2000ms] ${isFlipping ? 'w-20 h-4 opacity-30 animate-[shadowScale_2s_ease-in-out_forwards]' : 'w-48 h-8 opacity-40'}`}></div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div aria-live="polite" className="h-12 flex items-center justify-center">
             {result && !isFlipping && (
               <div className="flex flex-col items-center animate-[popIn_0.3s_cubic-bezier(0.175,0.885,0.32,1.275)]">
                  <span className="text-sm text-slate-500 font-bold uppercase tracking-widest">Result</span>
                  <span className="text-4xl font-black text-slate-800 dark:text-white">
                    {result === 'HEADS' ? labels.heads : labels.tails}
                  </span>
               </div>
             )}
             {isFlipping && (
               <div className="text-2xl font-bold text-amber-500 animate-pulse">Flipping...</div>
             )}
        </div>

        <button 
          onClick={flip}
          disabled={isFlipping}
          className="px-16 py-5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-white text-2xl font-black rounded-2xl shadow-xl shadow-amber-500/30 transition-all active:scale-95 disabled:opacity-70 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-amber-300"
        >
          {isFlipping ? '...' : result ? 'FLIP AGAIN' : 'FLIP COIN'}
        </button>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .rotate-y-0 { transform: rotateY(0deg); }

        @keyframes spinCoin {
          0% { transform: rotateY(0); bottom: 0; }
          50% { transform: rotateY(900deg) scale(1.5); bottom: 100px; } /* High toss */
          100% { transform: rotateY(1800deg) scale(1); bottom: 0; } /* Land on 0 or 180 is handled by JS setting class after anim, visually we spin a lot */
        }
        
        @keyframes shadowScale {
          0% { width: 12rem; opacity: 0.4; }
          50% { width: 4rem; opacity: 0.2; }
          100% { width: 12rem; opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};