import React, { useState } from 'react';

const QUESTIONS = [
  { q: "Largest Continent?", a: "Asia", opts: ["Africa", "Asia", "Europe"] },
  { q: "Continent with the Amazon?", a: "South America", opts: ["Africa", "South America", "Asia"] },
  { q: "Which is an Ocean?", a: "Pacific", opts: ["Pacific", "Sahara", "Amazon"] },
  { q: "Continent containing France?", a: "Europe", opts: ["Asia", "Europe", "North America"] },
];

export const MapQuiz: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (opt: string) => {
    setSelected(opt);
    setTimeout(() => {
       setSelected(null);
       setIdx((idx + 1) % QUESTIONS.length);
    }, 1500);
  };

  const current = QUESTIONS[idx];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
       <span className="material-symbols-outlined text-8xl text-blue-300 mb-6">public</span>
       <h2 className="text-3xl font-black dark:text-white mb-8 text-center">{current.q}</h2>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
          {current.opts.map(opt => {
             let stateClass = "bg-white dark:bg-[#111c22] border-slate-200 dark:border-[#233c48]";
             if (selected) {
                if (opt === current.a) stateClass = "bg-green-500 text-white border-green-600";
                else if (opt === selected) stateClass = "bg-red-500 text-white border-red-600";
                else stateClass = "opacity-50 bg-white dark:bg-[#111c22]";
             }

             return (
               <button 
                 key={opt}
                 disabled={!!selected}
                 onClick={() => handleSelect(opt)}
                 className={`p-8 rounded-2xl font-bold text-xl border-b-4 transition-all ${stateClass}`}
               >
                 {opt}
               </button>
             );
          })}
       </div>
       <p className="mt-8 text-slate-400 font-bold">{idx + 1} / {QUESTIONS.length}</p>
    </div>
  );
};