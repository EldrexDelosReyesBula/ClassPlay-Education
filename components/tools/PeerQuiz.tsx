
import React, { useState } from 'react';

export const PeerQuiz: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [display, setDisplay] = useState("");
  const [projectorMode, setProjectorMode] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 relative">
       
       {projectorMode && (
           <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-12 text-center cursor-pointer" onClick={() => setProjectorMode(false)}>
               <button className="absolute top-4 right-4 text-white/50 hover:text-white"><span className="material-symbols-outlined text-4xl">close</span></button>
               <h1 className="text-6xl md:text-8xl font-black text-white leading-tight">{display || "Waiting for question..."}</h1>
           </div>
       )}

       <div className="flex-1 w-full max-w-4xl flex items-center justify-center flex-col">
          {display ? (
             <h2 className="text-4xl md:text-6xl font-black text-center dark:text-white animate-[popIn_0.3s]">{display}</h2>
          ) : (
             <div className="text-slate-400 text-xl">Enter a student's question below</div>
          )}
          {display && (
              <button onClick={() => setProjectorMode(true)} className="mt-8 flex items-center gap-2 text-slate-500 hover:text-primary font-bold">
                  <span className="material-symbols-outlined">tv</span> Projector View
              </button>
          )}
       </div>
       
       <div className="w-full max-w-2xl bg-white dark:bg-[#111c22] p-4 rounded-2xl shadow-lg border border-slate-200 dark:border-[#233c48] flex gap-4">
          <input 
             value={question}
             onChange={e => setQuestion(e.target.value)}
             className="flex-1 bg-transparent border-none focus:ring-0 text-lg dark:text-white"
             placeholder="Type question here..."
          />
          <button onClick={() => { setDisplay(question); setQuestion(""); }} className="px-6 py-2 bg-purple-600 text-white font-bold rounded-xl">
             Display
          </button>
       </div>
    </div>
  );
};
