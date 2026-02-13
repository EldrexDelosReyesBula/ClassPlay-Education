import React, { useState } from 'react';

export const QuickQuiz: React.FC = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [correct, setCorrect] = useState<'A'|'B'|'C'|'D'|null>(null);

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto p-4">
       <div className="flex-1 flex flex-col items-center justify-center">
          <input className="text-3xl font-bold text-center bg-transparent border-none placeholder-slate-300 dark:text-white w-full mb-12 focus:ring-0" placeholder="Type Question Here..." />
          
          <div className="grid grid-cols-2 gap-6 w-full max-w-2xl mb-12">
             {['A', 'B', 'C', 'D'].map(opt => (
                <button 
                  key={opt}
                  onClick={() => setCorrect(opt as any)}
                  className={`p-8 rounded-2xl text-4xl font-black border-4 transition-all ${
                     showAnswer && correct === opt 
                        ? 'bg-green-500 border-green-600 text-white scale-110' 
                        : 'bg-white dark:bg-[#1a2b34] border-slate-200 dark:border-[#233c48] dark:text-white hover:border-blue-400'
                  } ${correct === opt && !showAnswer ? 'border-blue-500 ring-4 ring-blue-500/20' : ''}`}
                >
                   {opt}
                </button>
             ))}
          </div>

          <button onClick={() => setShowAnswer(!showAnswer)} className="px-12 py-4 bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-bold rounded-2xl shadow-xl">
             {showAnswer ? 'HIDE ANSWER' : 'REVEAL ANSWER'}
          </button>
       </div>
    </div>
  );
};