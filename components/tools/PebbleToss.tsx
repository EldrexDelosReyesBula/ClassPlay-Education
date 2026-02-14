
import React, { useState, useEffect } from 'react';
import { saveToolState, getToolState } from '../../utils/db';

const TOOL_ID = 'pebble_toss_custom';
const DEFAULT_OUTCOMES = ["Yes", "No", "Maybe", "Ask Later"];

export const PebbleToss: React.FC = () => {
  const [outcomes, setOutcomes] = useState<string[]>(DEFAULT_OUTCOMES);
  const [isTossing, setIsTossing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newOutcome, setNewOutcome] = useState("");
  const [rippleKey, setRippleKey] = useState(0); // To reset ripple animation

  useEffect(() => {
    getToolState(TOOL_ID).then(data => {
      if (data && data.outcomes) setOutcomes(data.outcomes);
    });
  }, []);

  const saveOutcomes = (newList: string[]) => {
    setOutcomes(newList);
    saveToolState(TOOL_ID, { outcomes: newList });
  };

  const handleToss = () => {
    if (isTossing || isEditing) return;
    setIsTossing(true);
    setResult(null);
    setRippleKey(prev => prev + 1);

    // Animation duration matches CSS
    setTimeout(() => {
        const pick = outcomes[Math.floor(Math.random() * outcomes.length)];
        setResult(pick);
        setIsTossing(false);
    }, 1500);
  };

  const handleAdd = () => {
    if (newOutcome.trim()) {
      saveOutcomes([...outcomes, newOutcome.trim()]);
      setNewOutcome("");
    }
  };

  const handleRemove = (index: number) => {
    if (outcomes.length <= 1) {
      alert("Must have at least one outcome!");
      return;
    }
    saveOutcomes(outcomes.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col h-full w-full relative bg-gradient-to-b from-sky-100 to-sky-300 dark:from-slate-900 dark:to-slate-800 p-4 overflow-hidden">
      
      {/* Edit Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="bg-white/50 dark:bg-black/30 hover:bg-white dark:hover:bg-black/50 backdrop-blur-md p-2 rounded-full text-slate-600 dark:text-white transition-all shadow-sm"
        >
          <span className="material-symbols-outlined">{isEditing ? 'close' : 'settings'}</span>
        </button>
      </div>

      {/* Editor Overlay */}
      {isEditing && (
        <div className="absolute top-16 right-4 w-72 bg-white dark:bg-[#111c22] rounded-2xl shadow-2xl z-30 border border-slate-200 dark:border-[#233c48] flex flex-col max-h-[calc(100%-5rem)] animate-[popIn_0.2s_ease-out]">
          <div className="p-4 border-b border-slate-100 dark:border-[#233c48]">
            <h3 className="font-bold dark:text-white">Pond Outcomes</h3>
          </div>
          <div className="p-2 overflow-y-auto custom-scrollbar flex-1">
            {outcomes.map((o, i) => (
              <div key={i} className="flex justify-between items-center p-2 hover:bg-slate-50 dark:hover:bg-[#1a2b34] rounded-lg group">
                <span className="text-sm font-medium dark:text-slate-300">{o}</span>
                <button 
                  onClick={() => handleRemove(i)}
                  className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-slate-100 dark:border-[#233c48] flex gap-2">
            <input 
              value={newOutcome}
              onChange={(e) => setNewOutcome(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="Add outcome..."
              className="flex-1 px-3 py-2 rounded-lg bg-slate-100 dark:bg-[#1a2b34] border-none text-sm dark:text-white focus:ring-2 focus:ring-sky-500"
            />
            <button 
              onClick={handleAdd}
              className="bg-sky-500 hover:bg-sky-600 text-white p-2 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-sm">add</span>
            </button>
          </div>
          <div className="p-2 text-center border-t border-slate-100 dark:border-[#233c48]">
             <button onClick={() => saveOutcomes(DEFAULT_OUTCOMES)} className="text-xs text-slate-400 hover:text-sky-500 font-bold">Reset to Default</button>
          </div>
        </div>
      )}

      {/* 2D Pond Scene */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[inset_0_0_40px_rgba(0,0,0,0.2)] border-8 border-white/20 dark:border-white/5 flex items-center justify-center overflow-hidden">
             {/* Ripples */}
             {isTossing && (
                <>
                   <div key={`r1-${rippleKey}`} className="absolute w-full h-full rounded-full border-2 border-white/40 animate-[ripple_1.5s_ease-out_0.6s_forwards] opacity-0"></div>
                   <div key={`r2-${rippleKey}`} className="absolute w-full h-full rounded-full border-2 border-white/30 animate-[ripple_1.5s_ease-out_0.9s_forwards] opacity-0"></div>
                </>
             )}
             
             {/* Pebble */}
             {isTossing && !result && (
                <div className="absolute w-6 h-6 bg-slate-300 rounded-full shadow-lg animate-[toss_0.6s_ease-in_forwards]"></div>
             )}

             {/* Result Display */}
             {result && (
                 <div className="z-10 bg-white/90 dark:bg-[#111c22]/90 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-xl border border-sky-200 dark:border-sky-800 text-center animate-[popIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)]">
                    <span className="block text-xs font-bold uppercase text-sky-600 dark:text-sky-400 tracking-widest mb-2">The Pond Says</span>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white leading-tight">{result}</h2>
                 </div>
             )}
             
             {!isTossing && !result && (
                 <div className="text-white/50 font-bold text-lg animate-pulse">Ready to toss...</div>
             )}
          </div>
      </div>

      {/* Controls */}
      <div className="h-32 flex items-center justify-center">
          <button 
            onClick={handleToss}
            disabled={isTossing}
            className="group relative px-12 py-5 bg-sky-600 hover:bg-sky-500 text-white rounded-3xl shadow-[0_10px_20px_rgba(14,165,233,0.3)] transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-1"
          >
            <span className="text-2xl font-black tracking-wide flex items-center gap-3">
              {isTossing ? 'SPLASHING...' : 'TOSS PEBBLE'}
              {!isTossing && <span className="material-symbols-outlined">water_drop</span>}
            </span>
          </button>
      </div>

      <style>{`
        @keyframes toss {
            0% { transform: translateY(200px) scale(1.5); opacity: 0; }
            20% { opacity: 1; }
            100% { transform: translateY(0) scale(0.5); opacity: 0; }
        }
        @keyframes ripple {
            0% { transform: scale(0); opacity: 1; border-width: 4px; }
            100% { transform: scale(1.5); opacity: 0; border-width: 0px; }
        }
      `}</style>
    </div>
  );
};
