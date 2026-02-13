import React, { useState } from 'react';

export const PeerQuiz: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [display, setDisplay] = useState("");

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
       <div className="flex-1 w-full max-w-4xl flex items-center justify-center">
          {display ? (
             <h2 className="text-4xl md:text-6xl font-black text-center dark:text-white animate-[popIn_0.3s]">{display}</h2>
          ) : (
             <div className="text-slate-400 text-xl">Enter a student's question below</div>
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