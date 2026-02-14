
import React, { useState, useEffect } from 'react';
import { saveToolState, getToolState } from '../../utils/db';
import { v4 as uuidv4 } from 'uuid';

const TOOL_ID = 'quick_quiz_sets';

interface QuizSet {
    id: string;
    name: string;
    question: string;
    correct: 'A'|'B'|'C'|'D'|null;
}

export const QuickQuiz: React.FC = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [correct, setCorrect] = useState<'A'|'B'|'C'|'D'|null>(null);
  const [question, setQuestion] = useState("");
  
  const [sets, setSets] = useState<QuizSet[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    getToolState(TOOL_ID).then(data => {
      if (data && data.sets) setSets(data.sets);
    });
  }, []);

  const saveCurrent = () => {
      const name = prompt("Name this question set:");
      if (!name) return;
      const newSets = [...sets, { id: uuidv4(), name, question, correct }];
      setSets(newSets);
      saveToolState(TOOL_ID, { sets: newSets });
  };

  const loadSet = (set: QuizSet) => {
      setQuestion(set.question);
      setCorrect(set.correct);
      setShowAnswer(false);
      setIsMenuOpen(false);
  };

  const deleteSet = (id: string) => {
      const newSets = sets.filter(s => s.id !== id);
      setSets(newSets);
      saveToolState(TOOL_ID, { sets: newSets });
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto p-4 overflow-y-auto relative">
       
       <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="absolute top-0 right-4 flex items-center gap-1 text-slate-500 font-bold bg-white/50 px-3 py-1 rounded-full hover:bg-white">
           <span className="material-symbols-outlined">folder_open</span> Saved Sets
       </button>

       {isMenuOpen && (
           <div className="absolute top-10 right-4 w-64 bg-white dark:bg-[#1a2b34] shadow-xl rounded-xl p-4 border z-20">
               <h3 className="font-bold mb-2 dark:text-white">Saved Questions</h3>
               <div className="max-h-48 overflow-y-auto space-y-2">
                   {sets.length === 0 && <p className="text-xs text-slate-400">No saved sets.</p>}
                   {sets.map(s => (
                       <div key={s.id} className="flex justify-between items-center text-sm p-2 hover:bg-slate-50 dark:hover:bg-[#111c22] rounded cursor-pointer" onClick={() => loadSet(s)}>
                           <span className="truncate dark:text-white">{s.name}</span>
                           <button onClick={(e) => {e.stopPropagation(); deleteSet(s.id);}} className="text-red-400 hover:text-red-600 px-1">×</button>
                       </div>
                   ))}
               </div>
               <button onClick={saveCurrent} className="w-full mt-2 bg-blue-500 text-white text-xs font-bold py-2 rounded">Save Current</button>
           </div>
       )}

       <div className="flex-1 flex flex-col items-center justify-center min-h-[500px]">
          <input 
            className="text-3xl font-bold text-center bg-transparent border-none placeholder-slate-300 dark:text-white w-full mb-12 focus:ring-0" 
            placeholder="Type Question Here..." 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          
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

          <div className="flex gap-4">
             <button onClick={() => setShowAnswer(!showAnswer)} className="px-12 py-4 bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-bold rounded-2xl shadow-xl hover:scale-105 transition-transform">
                {showAnswer ? 'HIDE ANSWER' : 'REVEAL ANSWER'}
             </button>
             <button 
               onClick={() => {
                   setQuestion("");
                   setCorrect(null);
                   setShowAnswer(false);
               }}
               className="px-6 py-4 bg-slate-200 dark:bg-[#1a2b34] text-slate-500 font-bold rounded-2xl hover:bg-red-100 hover:text-red-500 transition-colors"
             >
               CLEAR
             </button>
          </div>
       </div>
    </div>
  );
};
