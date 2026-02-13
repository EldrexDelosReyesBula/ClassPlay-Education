import React, { useState, useEffect } from 'react';

const WORDS = ["APPLE", "BEACH", "CHAIR", "DANCE", "EAGLE", "FLAME", "GRAPE", "HOUSE", "IMAGE", "JUMP", "KITE", "LEMON"];

export const WordBuilder: React.FC = () => {
  const [target, setTarget] = useState("");
  const [scrambled, setScrambled] = useState("");
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<'playing'|'won'>('playing');

  useEffect(() => {
    nextWord();
  }, []);

  const nextWord = () => {
    const w = WORDS[Math.floor(Math.random() * WORDS.length)];
    setTarget(w);
    setScrambled(w.split('').sort(() => 0.5 - Math.random()).join(''));
    setInput("");
    setStatus('playing');
  };

  const check = (val: string) => {
    const upper = val.toUpperCase();
    setInput(upper);
    if (upper === target) setStatus('won');
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 text-center">
       <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Unscramble the Word</h2>
       
       <div className="flex gap-4 mb-12">
          {scrambled.split('').map((char, i) => (
             <div key={i} className="w-16 h-16 md:w-20 md:h-20 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-200 rounded-xl flex items-center justify-center text-4xl font-black shadow-sm">
                {char}
             </div>
          ))}
       </div>

       {status === 'won' ? (
         <div className="animate-[popIn_0.3s]">
            <h3 className="text-4xl font-bold text-green-500 mb-6">Correct!</h3>
            <button onClick={nextWord} className="px-8 py-3 bg-slate-800 dark:bg-white dark:text-black text-white font-bold rounded-xl">Next Word</button>
         </div>
       ) : (
         <input 
           value={input}
           onChange={e => check(e.target.value)}
           maxLength={target.length}
           className="text-center text-4xl tracking-[0.5em] font-bold uppercase border-b-4 border-slate-300 dark:border-[#233c48] bg-transparent focus:outline-none focus:border-yellow-500 dark:text-white w-full max-w-md py-4"
           placeholder="_ _ _ _ _"
         />
       )}
    </div>
  );
};
