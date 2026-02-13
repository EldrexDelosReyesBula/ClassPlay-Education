import React, { useState } from 'react';

export const StoryChain: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addLine = () => {
     if (input.trim()) {
       setLines([...lines, input.trim()]);
       setInput("");
     }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto w-full p-4">
       <div className="flex-1 bg-white dark:bg-[#111c22] rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-[#233c48] overflow-y-auto custom-scrollbar mb-4 space-y-4">
          {lines.length === 0 ? (
            <div className="text-center text-slate-400 italic mt-20">Once upon a time...</div>
          ) : (
            lines.map((l, i) => (
              <p key={i} className="text-xl dark:text-white leading-relaxed animate-[fadeIn_0.5s]">
                 <span className="font-bold text-emerald-500 mr-2">{i+1}.</span>
                 {l}
              </p>
            ))
          )}
       </div>
       <div className="flex gap-4">
          <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addLine()}
            placeholder="Add the next sentence..."
            className="flex-1 px-6 py-4 rounded-xl border-none bg-slate-100 dark:bg-[#1a2b34] dark:text-white focus:ring-2 focus:ring-emerald-500"
            autoFocus
          />
          <button onClick={addLine} className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-xl shadow-lg">Add</button>
       </div>
    </div>
  );
};