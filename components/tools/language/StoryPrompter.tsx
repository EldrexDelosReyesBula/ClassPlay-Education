import React, { useState } from 'react';

const GENRES = ["Sci-Fi", "Fantasy", "Mystery", "Adventure", "Comedy"];
const CHARACTERS = ["A robot", "A wizard", "A detective", "A talking cat", "An astronaut"];
const SETTINGS = ["on Mars", "in a castle", "underwater", "in a forest", "at school"];
const PLOTS = ["finds a map", "loses a key", "meets a stranger", "discovers a secret", "saves the day"];

export const StoryPrompter: React.FC = () => {
  const [prompt, setPrompt] = useState<{g:string, c:string, s:string, p:string} | null>(null);

  const generate = () => {
     setPrompt({
        g: GENRES[Math.floor(Math.random() * GENRES.length)],
        c: CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
        s: SETTINGS[Math.floor(Math.random() * SETTINGS.length)],
        p: PLOTS[Math.floor(Math.random() * PLOTS.length)]
     });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
       <h2 className="text-3xl font-black dark:text-white mb-8">Story Spark</h2>
       
       {prompt ? (
          <div className="bg-white dark:bg-[#111c22] p-8 rounded-3xl shadow-xl max-w-2xl w-full border border-pink-200 dark:border-pink-900/30 animate-[popIn_0.3s]">
             <div className="grid gap-6">
                <div>
                   <span className="text-xs font-bold uppercase text-pink-500">Genre</span>
                   <div className="text-2xl font-bold dark:text-white">{prompt.g}</div>
                </div>
                <div>
                   <span className="text-xs font-bold uppercase text-blue-500">Character</span>
                   <div className="text-2xl font-bold dark:text-white">{prompt.c}</div>
                </div>
                <div>
                   <span className="text-xs font-bold uppercase text-green-500">Setting</span>
                   <div className="text-2xl font-bold dark:text-white">{prompt.s}</div>
                </div>
                <div>
                   <span className="text-xs font-bold uppercase text-orange-500">Plot</span>
                   <div className="text-2xl font-bold dark:text-white">...who {prompt.p}.</div>
                </div>
             </div>
          </div>
       ) : (
          <div className="bg-slate-100 dark:bg-[#1a2b34] w-full max-w-2xl h-64 rounded-3xl flex items-center justify-center text-slate-400 font-bold">
             Press Generate for a prompt...
          </div>
       )}

       <button 
         onClick={generate}
         className="mt-8 px-12 py-4 bg-pink-500 text-white font-black text-xl rounded-2xl shadow-xl hover:bg-pink-600 transition-transform active:scale-95"
       >
          GENERATE PROMPT
       </button>
    </div>
  );
};