import React, { useState } from 'react';

export const TwoTruthsLie: React.FC = () => {
  const [step, setStep] = useState(0); // 0: input, 1: voting, 2: reveal
  const [statements, setStatements] = useState(['', '', '']);
  const [lieIndex, setLieIndex] = useState<number | null>(null);

  const handleStart = () => {
    if (statements.every(s => s.trim()) && lieIndex !== null) {
      setStep(1);
    }
  };

  const handleReveal = () => setStep(2);
  const handleReset = () => {
    setStep(0);
    setStatements(['', '', '']);
    setLieIndex(null);
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto w-full p-4 items-center justify-center">
      {step === 0 && (
        <div className="w-full bg-white dark:bg-[#111c22] p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-[#233c48]">
          <h2 className="text-2xl font-bold mb-6 dark:text-white text-center">Enter Statements</h2>
          <div className="space-y-4 mb-8">
            {statements.map((stmt, i) => (
              <div key={i} className="flex gap-4 items-center">
                <input 
                   placeholder={`Statement ${i+1}`}
                   value={stmt}
                   onChange={e => {
                     const newStmts = [...statements];
                     newStmts[i] = e.target.value;
                     setStatements(newStmts);
                   }}
                   className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#1a2b34] border-none dark:text-white"
                />
                <button 
                  onClick={() => setLieIndex(i)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${lieIndex === i ? 'bg-red-500 text-white shadow-lg scale-110' : 'bg-slate-200 dark:bg-[#233c48] text-slate-400'}`}
                  title="Mark as Lie"
                >
                  <span className="material-symbols-outlined">{lieIndex === i ? 'check' : 'close'}</span>
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mb-6">Mark the lie (hidden next step)</p>
          <button 
            onClick={handleStart}
            disabled={!statements.every(s => s.trim()) || lieIndex === null}
            className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg disabled:opacity-50"
          >
            Start Game
          </button>
        </div>
      )}

      {step > 0 && (
        <div className="w-full space-y-6">
           <h2 className="text-3xl font-black text-center dark:text-white mb-8">Which is the Lie?</h2>
           {statements.map((stmt, i) => (
             <div 
               key={i}
               className={`p-6 rounded-2xl text-xl font-bold text-center border-2 transition-all duration-500 ${
                 step === 2 && lieIndex === i 
                   ? 'bg-red-500 border-red-600 text-white scale-105 shadow-xl' 
                   : step === 2 
                     ? 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-200 opacity-50'
                     : 'bg-white dark:bg-[#111c22] border-slate-200 dark:border-[#233c48] dark:text-white'
               }`}
             >
               {stmt}
               {step === 2 && lieIndex === i && <span className="block text-sm uppercase mt-2 opacity-80">The Lie!</span>}
             </div>
           ))}

           <div className="flex justify-center mt-8">
             {step === 1 ? (
               <button onClick={handleReveal} className="px-12 py-4 bg-primary text-white font-black rounded-2xl shadow-xl">REVEAL</button>
             ) : (
               <button onClick={handleReset} className="px-12 py-4 bg-slate-700 text-white font-black rounded-2xl shadow-xl">PLAY AGAIN</button>
             )}
           </div>
        </div>
      )}
    </div>
  );
};