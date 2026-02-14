import React, { useState, useEffect } from 'react';
import { saveQuestions, getQuestions } from '../../utils/db';

const DEFAULT_QUESTIONS = [
  "What is your favorite food?",
  "If you could have a superpower, what would it be?",
  "What is your dream vacation?",
  "Cats or Dogs?",
  "What's the best book you've read?",
  "What is your favorite hobby?",
  "If you could be any animal, what would you be?"
];

const QUESTIONS_KEY = "icebreaker_custom";

export const IcebreakerRoulette: React.FC = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("Ready?");
  const [isSpinning, setIsSpinning] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const [newQ, setNewQ] = useState("");
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    // Load from DB or use Default
    getQuestions(QUESTIONS_KEY).then(saved => {
        if (saved && saved.length > 0) {
            setQuestions(saved);
        } else {
            setQuestions(DEFAULT_QUESTIONS);
        }
    });
  }, []);

  const persistQuestions = (updated: string[]) => {
      setQuestions(updated);
      saveQuestions(QUESTIONS_KEY, updated);
  };

  useEffect(() => {
     let interval: number;
     if (timerActive && timer > 0) {
       interval = window.setInterval(() => setTimer(t => t - 1), 1000);
     } else if (timer === 0) {
       setTimerActive(false);
     }
     return () => clearInterval(interval);
  }, [timer, timerActive]);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    let dur = 0;
    const int = setInterval(() => {
       setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)]);
       dur += 100;
       if (dur > 2000) {
         clearInterval(int);
         setIsSpinning(false);
         setTimer(30); // Auto 30s timer
         setTimerActive(true);
       }
    }, 100);
  };

  const addQuestion = () => {
    if (newQ.trim()) {
      persistQuestions([...questions, newQ.trim()]);
      setNewQ("");
    }
  };

  const removeQuestion = (idx: number) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      persistQuestions(questions.filter((_, i) => i !== idx));
    }
  };

  if (customMode) {
    return (
      <div className="flex flex-col h-full max-w-2xl mx-auto w-full p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold dark:text-white">Edit Questions</h2>
          <button onClick={() => setCustomMode(false)} className="text-primary font-bold">Done</button>
        </div>
        <div className="flex gap-2 mb-4">
           <input 
             className="flex-1 px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#1a2b34] dark:text-white border-none"
             placeholder="Add new question..."
             value={newQ}
             onChange={(e) => setNewQ(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && addQuestion()}
           />
           <button onClick={addQuestion} className="px-4 py-2 bg-primary text-white rounded-xl">Add</button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-[#111c22] rounded-xl p-2">
           {questions.map((q, i) => (
             <div key={i} className="flex justify-between p-3 border-b border-slate-100 dark:border-[#233c48]">
               <span className="dark:text-white">{q}</span>
               <button onClick={() => removeQuestion(i)} className="text-red-400">
                 <span className="material-symbols-outlined text-sm">close</span>
               </button>
             </div>
           ))}
        </div>
        <div className="mt-4 text-center">
             <button onClick={() => persistQuestions(DEFAULT_QUESTIONS)} className="text-xs text-slate-400 hover:text-red-400">Reset to Default</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto w-full p-8 text-center relative">
      <button 
        onClick={() => setCustomMode(true)} 
        className="absolute top-0 right-4 text-slate-400 hover:text-primary flex items-center gap-1 text-sm font-bold"
      >
        <span className="material-symbols-outlined text-lg">edit</span> Customize
      </button>

      <div className="flex-1 flex flex-col items-center justify-center">
        <h2 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white leading-tight animate-[fadeIn_0.5s] mb-8 max-w-2xl">
           {currentQuestion}
        </h2>
        {timer > 0 && (
          <div className="text-2xl font-mono font-bold text-teal-500 animate-pulse">{timer}s remaining</div>
        )}
      </div>

      <div className="flex gap-4">
        <button 
            onClick={spin}
            disabled={isSpinning}
            className="px-12 py-5 bg-teal-500 hover:bg-teal-600 text-white font-black text-2xl rounded-2xl shadow-xl transition-all active:scale-95 disabled:opacity-50"
        >
            {isSpinning ? 'Mixing...' : 'NEW QUESTION'}
        </button>
      </div>
    </div>
  );
};
