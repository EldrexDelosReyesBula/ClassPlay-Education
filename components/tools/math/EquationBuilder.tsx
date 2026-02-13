import React, { useState } from 'react';

export const EquationBuilder: React.FC = () => {
  const [target, setTarget] = useState(24);
  const [currentExpr, setCurrentExpr] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const numbers = [2, 3, 4, 6, 8, 12];
  const ops = ['+', '-', '*', '/'];

  const addToExpr = (val: string | number) => {
    setCurrentExpr(prev => prev + val);
  };

  const clear = () => {
    setCurrentExpr("");
    setResult(null);
  };

  const check = () => {
    try {
      // eslint-disable-next-line no-eval
      const res = eval(currentExpr);
      setResult(res);
    } catch {
      setResult(NaN);
    }
  };

  const nextTarget = () => {
    setTarget(Math.floor(Math.random() * 50) + 10);
    clear();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
      <div className="bg-white dark:bg-[#111c22] p-8 rounded-3xl shadow-xl w-full max-w-xl text-center">
        <h2 className="text-slate-400 font-bold uppercase tracking-widest mb-2">Target Number</h2>
        <div className="text-6xl font-black text-cyan-600 mb-8">{target}</div>
        
        <div className="bg-slate-100 dark:bg-[#1a2b34] p-4 rounded-xl min-h-[4rem] flex items-center justify-center text-3xl font-mono font-bold dark:text-white mb-4 overflow-hidden">
           {currentExpr || "..."}
        </div>

        {result !== null && (
           <div className={`text-xl font-bold mb-6 ${result === target ? 'text-green-500' : 'text-red-500'}`}>
              Result: {result} {result === target ? '🎉' : '❌'}
           </div>
        )}

        <div className="grid grid-cols-4 gap-2 mb-4">
           {numbers.map(n => (
             <button key={n} onClick={() => addToExpr(n)} className="p-4 bg-slate-200 dark:bg-[#233c48] rounded-xl font-bold text-xl hover:bg-white dark:hover:bg-[#1a2b34] dark:text-white transition-colors">{n}</button>
           ))}
        </div>
        
        <div className="grid grid-cols-4 gap-2 mb-6">
           {ops.map(op => (
             <button key={op} onClick={() => addToExpr(op)} className="p-4 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-xl font-bold text-xl hover:bg-cyan-200 transition-colors">{op}</button>
           ))}
        </div>

        <div className="flex gap-2">
           <button onClick={clear} className="flex-1 py-3 bg-slate-300 dark:bg-[#233c48] rounded-xl font-bold text-slate-700 dark:text-white">Clear</button>
           <button onClick={check} className="flex-1 py-3 bg-cyan-600 text-white rounded-xl font-bold shadow-lg">Check</button>
           <button onClick={nextTarget} className="flex-1 py-3 bg-slate-800 text-white rounded-xl font-bold">New Target</button>
        </div>
      </div>
    </div>
  );
};