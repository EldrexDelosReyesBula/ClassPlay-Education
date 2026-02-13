import React, { useState } from 'react';

const PROMPTS = [
  "What was the most important thing you learned today?",
  "What was confusing about today's lesson?",
  "How did you help someone today?",
  "What is one goal for tomorrow?",
  "Rate your effort today from 1-10 and explain why.",
  "What was the most fun part of class?"
];

export const ReflectionCards: React.FC = () => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
       <div className="w-full max-w-2xl bg-white dark:bg-[#111c22] aspect-video rounded-3xl shadow-2xl border-b-8 border-orange-500 flex items-center justify-center p-8 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white leading-tight">{PROMPTS[current]}</h2>
          <div className="absolute top-4 right-4 text-slate-300 font-bold">{current + 1}/{PROMPTS.length}</div>
       </div>

       <div className="flex gap-4 mt-12">
          <button onClick={() => setCurrent(c => (c - 1 + PROMPTS.length) % PROMPTS.length)} className="w-16 h-16 rounded-full bg-slate-200 dark:bg-[#1a2b34] flex items-center justify-center text-2xl hover:bg-slate-300">←</button>
          <button onClick={() => setCurrent(Math.floor(Math.random() * PROMPTS.length))} className="px-8 bg-orange-500 text-white font-bold rounded-2xl shadow-lg">Random</button>
          <button onClick={() => setCurrent(c => (c + 1) % PROMPTS.length)} className="w-16 h-16 rounded-full bg-slate-200 dark:bg-[#1a2b34] flex items-center justify-center text-2xl hover:bg-slate-300">→</button>
       </div>
    </div>
  );
};