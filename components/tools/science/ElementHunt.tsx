import React, { useState } from 'react';

const ELEMENTS = [
  { s: 'H', n: 'Hydrogen' }, { s: 'He', n: 'Helium' }, { s: 'Li', n: 'Lithium' }, 
  { s: 'Be', n: 'Beryllium' }, { s: 'B', n: 'Boron' }, { s: 'C', n: 'Carbon' },
  { s: 'N', n: 'Nitrogen' }, { s: 'O', n: 'Oxygen' }, { s: 'F', n: 'Fluorine' },
  { s: 'Ne', n: 'Neon' }, { s: 'Na', n: 'Sodium' }, { s: 'Mg', n: 'Magnesium' },
  { s: 'Al', n: 'Aluminium' }, { s: 'Si', n: 'Silicon' }, { s: 'P', n: 'Phosphorus' },
  { s: 'S', n: 'Sulfur' }, { s: 'Cl', n: 'Chlorine' }, { s: 'K', n: 'Potassium' },
  { s: 'Ca', n: 'Calcium' }, { s: 'Fe', n: 'Iron' }, { s: 'Cu', n: 'Copper' },
  { s: 'Ag', n: 'Silver' }, { s: 'Au', n: 'Gold' }, { s: 'Hg', n: 'Mercury' }
];

export const ElementHunt: React.FC = () => {
  const [target, setTarget] = useState(ELEMENTS[0]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');

  const nextTurn = () => {
    setTarget(ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)]);
    setMessage('');
  };

  const handleGuess = (el: typeof ELEMENTS[0]) => {
    if (el.s === target.s) {
      setScore(s => s + 1);
      setMessage('Correct!');
      setTimeout(nextTurn, 1000);
    } else {
      setMessage('Try again!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
      <div className="flex justify-between w-full max-w-4xl mb-6 items-center">
         <h2 className="text-2xl font-bold dark:text-white">Element Hunt</h2>
         <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-bold">Score: {score}</div>
      </div>

      <div className="mb-8 text-center">
         <span className="text-slate-500 dark:text-slate-400 text-lg">Find the symbol for:</span>
         <h1 className="text-5xl font-black dark:text-white mt-2 animate-[pulse_2s_infinite]">{target.n}</h1>
         <div className={`h-8 font-bold mt-2 ${message === 'Correct!' ? 'text-green-500' : 'text-red-500'}`}>{message}</div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 gap-3 max-w-4xl">
         {ELEMENTS.map((el) => (
           <button
             key={el.s}
             onClick={() => handleGuess(el)}
             className="aspect-square bg-white dark:bg-[#111c22] border-2 border-slate-200 dark:border-[#233c48] rounded-xl flex flex-col items-center justify-center hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all active:scale-95"
           >
             <span className="text-2xl font-black text-slate-800 dark:text-white">{el.s}</span>
             <span className="text-[10px] text-slate-400 uppercase font-bold">{el.n}</span>
           </button>
         ))}
      </div>
    </div>
  );
};
