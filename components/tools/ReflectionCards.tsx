
import React, { useState, useEffect } from 'react';
import { saveToolState, getToolState } from '../../utils/db';

const TOOL_ID = 'reflection_custom';
const DEFAULT_PROMPTS = [
  "What was the most important thing you learned today?",
  "What was confusing about today's lesson?",
  "How did you help someone today?",
  "What is one goal for tomorrow?",
  "Rate your effort today from 1-10 and explain why.",
  "What was the most fun part of class?"
];

export const ReflectionCards: React.FC = () => {
  const [prompts, setPrompts] = useState(DEFAULT_PROMPTS);
  const [current, setCurrent] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
      getToolState(TOOL_ID).then(data => {
          if(data && data.prompts) setPrompts(data.prompts);
      });
  }, []);

  const savePrompts = (p: string[]) => {
      setPrompts(p);
      saveToolState(TOOL_ID, { prompts: p });
  };

  if (isEditing) {
      return (
          <div className="flex flex-col h-full w-full max-w-2xl mx-auto p-4">
              <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold dark:text-white">Edit Prompts</h2>
                  <button onClick={() => setIsEditing(false)} className="text-primary font-bold">Done</button>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
                  {prompts.map((p, i) => (
                      <div key={i} className="flex gap-2">
                          <input 
                            value={p}
                            onChange={e => {
                                const n = [...prompts];
                                n[i] = e.target.value;
                                savePrompts(n);
                            }}
                            className="flex-1 p-2 rounded border dark:bg-[#1a2b34] dark:border-none dark:text-white"
                          />
                          <button onClick={() => savePrompts(prompts.filter((_, idx) => idx !== i))} className="text-red-500 px-2"><span className="material-symbols-outlined">delete</span></button>
                      </div>
                  ))}
                  <button onClick={() => savePrompts([...prompts, "New Prompt"])} className="w-full py-2 bg-purple-500 text-white rounded font-bold mt-4">Add Prompt</button>
              </div>
          </div>
      );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 relative">
       <button onClick={() => setIsEditing(true)} className="absolute top-4 right-4 text-slate-400 hover:text-primary"><span className="material-symbols-outlined">edit</span></button>

       <div className="w-full max-w-2xl bg-white dark:bg-[#111c22] aspect-video rounded-3xl shadow-2xl border-b-8 border-orange-500 flex items-center justify-center p-8 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white leading-tight">{prompts[current]}</h2>
          <div className="absolute top-4 right-4 text-slate-300 font-bold">{current + 1}/{prompts.length}</div>
       </div>

       <div className="flex gap-4 mt-12">
          <button onClick={() => setCurrent(c => (c - 1 + prompts.length) % prompts.length)} className="w-16 h-16 rounded-full bg-slate-200 dark:bg-[#1a2b34] flex items-center justify-center text-2xl hover:bg-slate-300">←</button>
          <button onClick={() => setCurrent(Math.floor(Math.random() * prompts.length))} className="px-8 bg-orange-500 text-white font-bold rounded-2xl shadow-lg">Random</button>
          <button onClick={() => setCurrent(c => (c + 1) % prompts.length)} className="w-16 h-16 rounded-full bg-slate-200 dark:bg-[#1a2b34] flex items-center justify-center text-2xl hover:bg-slate-300">→</button>
       </div>
    </div>
  );
};
