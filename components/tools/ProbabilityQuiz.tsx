import React, { useState } from 'react';

export const ProbabilityQuiz: React.FC = () => {
  const [question, setQuestion] = useState<{q: string, a: string} | null>(null);
  const [revealed, setRevealed] = useState(false);

  const generate = () => {
    const types = [
      () => {
         const sides = [4,6,8,10,12,20][Math.floor(Math.random()*6)];
         const target = Math.floor(Math.random() * (sides/2));
         return {
           q: `What is the probability of rolling a number greater than ${target} on a ${sides}-sided die?`,
           a: `${sides - target}/${sides} or ${Math.round(((sides-target)/sides)*100)}%`
         };
      },
      () => {
        const coins = Math.floor(Math.random() * 3) + 2;
        return {
          q: `If you flip ${coins} coins, what is the probability of getting ALL heads?`,
          a: `1/${Math.pow(2, coins)} or ${(1/Math.pow(2,coins)*100).toFixed(1)}%`
        }
      }
    ];
    setQuestion(types[Math.floor(Math.random()*types.length)]());
    setRevealed(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto w-full p-4 text-center">
      {question ? (
        <div className="animate-[popIn_0.3s]">
           <h2 className="text-3xl font-bold dark:text-white mb-8 leading-snug">{question.q}</h2>
           
           {revealed ? (
             <div className="text-4xl font-black text-green-500 mb-8 animate-[popIn_0.2s]">{question.a}</div>
           ) : (
             <button onClick={() => setRevealed(true)} className="px-8 py-3 rounded-xl bg-slate-200 dark:bg-[#233c48] font-bold text-slate-600 dark:text-slate-300 mb-8">Reveal Answer</button>
           )}
           
           <button onClick={generate} className="px-8 py-4 bg-primary text-white font-black rounded-xl shadow-lg">Next Problem</button>
        </div>
      ) : (
        <button onClick={generate} className="px-12 py-6 bg-primary text-white font-black text-2xl rounded-2xl shadow-xl">Start Quiz</button>
      )}
    </div>
  );
};