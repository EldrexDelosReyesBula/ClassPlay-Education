
import React, { useState, useEffect } from 'react';
import { saveToolState, getToolState } from '../../utils/db';

const TOOL_ID = 'probability_quiz';

interface Question {
    q: string;
    a: string;
}

export const ProbabilityQuiz: React.FC = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);
  const [mode, setMode] = useState<'random' | 'custom'>('random');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
      getToolState(TOOL_ID).then(data => {
          if (data && data.questions) setCustomQuestions(data.questions);
      });
  }, []);

  const saveCustom = (qs: Question[]) => {
      setCustomQuestions(qs);
      saveToolState(TOOL_ID, { questions: qs });
  };

  const generate = () => {
    if (mode === 'custom' && customQuestions.length > 0) {
        setQuestion(customQuestions[Math.floor(Math.random() * customQuestions.length)]);
    } else {
        // Default Logic
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
          },
          () => {
              const r = Math.floor(Math.random() * 5) + 3;
              const b = Math.floor(Math.random() * 5) + 3;
              return {
                  q: `Bag contains ${r} red marbles and ${b} blue marbles. Probability of picking red?`,
                  a: `${r}/${r+b} or ${Math.round((r/(r+b))*100)}%`
              }
          }
        ];
        setQuestion(types[Math.floor(Math.random()*types.length)]());
    }
    setRevealed(false);
  };

  // Editor Sub-component logic
  const [newQ, setNewQ] = useState("");
  const [newA, setNewA] = useState("");

  const addCustom = () => {
      if(newQ && newA) {
          saveCustom([...customQuestions, {q: newQ, a: newA}]);
          setNewQ("");
          setNewA("");
      }
  };

  const removeCustom = (idx: number) => {
      saveCustom(customQuestions.filter((_, i) => i !== idx));
  };

  if (isEditing) {
      return (
          <div className="flex flex-col h-full w-full max-w-2xl mx-auto p-4">
              <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold dark:text-white">Edit Custom Questions</h2>
                  <button onClick={() => setIsEditing(false)} className="text-primary font-bold">Done</button>
              </div>
              <div className="flex flex-col gap-2 mb-6 bg-slate-50 dark:bg-[#1a2b34] p-4 rounded-xl">
                  <input placeholder="Question" value={newQ} onChange={e => setNewQ(e.target.value)} className="p-2 rounded border dark:border-none" />
                  <input placeholder="Answer" value={newA} onChange={e => setNewA(e.target.value)} className="p-2 rounded border dark:border-none" />
                  <button onClick={addCustom} className="bg-green-500 text-white font-bold py-2 rounded hover:brightness-110">Add Question</button>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
                  {customQuestions.map((item, i) => (
                      <div key={i} className="bg-white dark:bg-[#111c22] p-3 rounded shadow-sm border border-slate-200 dark:border-[#233c48] flex justify-between items-center">
                          <div>
                              <div className="font-bold text-sm dark:text-white">{item.q}</div>
                              <div className="text-xs text-green-600 font-bold">{item.a}</div>
                          </div>
                          <button onClick={() => removeCustom(i)} className="text-red-400 hover:text-red-600"><span className="material-symbols-outlined">delete</span></button>
                      </div>
                  ))}
              </div>
          </div>
      );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto w-full p-4 text-center relative">
      <div className="absolute top-0 right-0 flex gap-2">
          <select 
            value={mode} 
            onChange={e => setMode(e.target.value as any)}
            className="bg-white dark:bg-[#1a2b34] border border-slate-200 dark:border-[#233c48] rounded-lg px-2 py-1 text-sm font-bold"
          >
              <option value="random">Random Logic</option>
              <option value="custom">My Questions</option>
          </select>
          <button onClick={() => setIsEditing(true)} className="p-2 bg-slate-200 dark:bg-[#233c48] rounded-lg text-slate-600 dark:text-white">
              <span className="material-symbols-outlined text-lg">edit</span>
          </button>
      </div>

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
        <div className="text-center">
            <h2 className="text-2xl font-bold dark:text-white mb-4">Probability Quiz</h2>
            <button onClick={generate} className="px-12 py-6 bg-primary text-white font-black text-2xl rounded-2xl shadow-xl">Start Quiz</button>
            {mode === 'custom' && customQuestions.length === 0 && <p className="mt-4 text-red-400 font-bold">No custom questions added!</p>}
        </div>
      )}
    </div>
  );
};
