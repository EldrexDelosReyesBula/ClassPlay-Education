
import React, { useState, useEffect } from 'react';
import { saveToolState, getToolState } from '../../../utils/db';

const TOOL_ID = 'math_relay_custom';

export const MathRelay: React.FC = () => {
  const [gameStatus, setGameStatus] = useState<'setup' | 'playing' | 'finished'>('setup');
  const [problems, setProblems] = useState<{q: string, a: number}[]>([]);
  const [customProblems, setCustomProblems] = useState<{q: string, a: number}[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState('');
  const [difficulty, setDifficulty] = useState<'easy'|'medium'|'hard'|'custom'>('easy');
  const [isEditing, setIsEditing] = useState(false);

  // Editor State
  const [newQ, setNewQ] = useState("");
  const [newA, setNewA] = useState("");

  useEffect(() => {
      getToolState(TOOL_ID).then(data => {
          if (data && data.problems) setCustomProblems(data.problems);
      });
  }, []);

  const saveCustom = (probs: {q: string, a: number}[]) => {
      setCustomProblems(probs);
      saveToolState(TOOL_ID, { problems: probs });
  };

  const generateProblems = () => {
    if (difficulty === 'custom') {
        if (customProblems.length === 0) {
            alert("No custom problems added!");
            return;
        }
        setProblems([...customProblems].sort(() => 0.5 - Math.random()));
    } else {
        const newProblems = [];
        for(let i=0; i<10; i++) {
          let a = 0, b = 0, op = '+';
          if(difficulty === 'easy') {
            a = Math.floor(Math.random() * 20);
            b = Math.floor(Math.random() * 20);
          } else if (difficulty === 'medium') {
            a = Math.floor(Math.random() * 50);
            b = Math.floor(Math.random() * 50);
            op = Math.random() > 0.5 ? '+' : '-';
          } else {
            a = Math.floor(Math.random() * 12) + 2;
            b = Math.floor(Math.random() * 12) + 2;
            op = 'x';
          }
          
          let ans = 0;
          if(op === '+') ans = a + b;
          if(op === '-') ans = a - b;
          if(op === 'x') ans = a * b;

          newProblems.push({ q: `${a} ${op} ${b} = ?`, a: ans });
        }
        setProblems(newProblems);
    }
    setGameStatus('playing');
    setCurrentProblemIndex(0);
    setScore(0);
    setInput('');
  };

  const checkAnswer = () => {
    if(parseInt(input) === problems[currentProblemIndex].a) {
      if(currentProblemIndex + 1 >= problems.length) {
        setGameStatus('finished');
      } else {
        setCurrentProblemIndex(p => p + 1);
        setInput('');
        setScore(s => s + 10);
      }
    } else {
      setInput('');
    }
  };

  if (isEditing) {
      return (
          <div className="flex flex-col h-full w-full max-w-2xl mx-auto p-4">
              <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold dark:text-white">Edit Custom Problems</h2>
                  <button onClick={() => setIsEditing(false)} className="text-primary font-bold">Done</button>
              </div>
              <div className="bg-slate-100 dark:bg-[#1a2b34] p-4 rounded-xl mb-4 flex gap-2">
                  <input placeholder="Question (e.g. 5 + 5)" value={newQ} onChange={e => setNewQ(e.target.value)} className="flex-1 px-3 rounded border dark:border-none" />
                  <input placeholder="Ans" type="number" value={newA} onChange={e => setNewA(e.target.value)} className="w-20 px-3 rounded border dark:border-none" />
                  <button onClick={() => { 
                      if(newQ && newA) {
                          saveCustom([...customProblems, {q: newQ, a: parseInt(newA)}]);
                          setNewQ(""); setNewA("");
                      }
                  }} className="bg-green-500 text-white font-bold px-4 rounded">Add</button>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
                  {customProblems.map((p, i) => (
                      <div key={i} className="flex justify-between p-3 bg-white dark:bg-[#111c22] border border-slate-200 dark:border-[#233c48] rounded">
                          <span className="font-bold dark:text-white">{p.q} = {p.a}</span>
                          <button onClick={() => saveCustom(customProblems.filter((_, idx) => idx !== i))} className="text-red-500"><span className="material-symbols-outlined">delete</span></button>
                      </div>
                  ))}
              </div>
          </div>
      );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 relative">
      {gameStatus === 'setup' && (
        <div className="text-center">
          <h2 className="text-3xl font-black dark:text-white mb-6">Math Relay</h2>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {(['easy', 'medium', 'hard', 'custom'] as const).map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-6 py-3 rounded-xl font-bold capitalize ${difficulty === d ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-[#1a2b34] text-slate-600 dark:text-white'}`}
              >
                {d}
              </button>
            ))}
          </div>
          {difficulty === 'custom' && (
              <button onClick={() => setIsEditing(true)} className="mb-8 text-blue-500 font-bold flex items-center gap-1 mx-auto hover:underline">
                  <span className="material-symbols-outlined">edit</span> Edit Problems ({customProblems.length})
              </button>
          )}
          <button onClick={generateProblems} className="px-12 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-transform">START RACE</button>
        </div>
      )}

      {gameStatus === 'playing' && (
        <div className="w-full max-w-md text-center">
           <div className="flex justify-between text-slate-500 font-bold mb-4">
              <span>Problem {currentProblemIndex + 1}/{problems.length}</span>
              <span>Score: {score}</span>
           </div>
           
           <div className="bg-white dark:bg-[#111c22] p-12 rounded-3xl shadow-xl border-b-8 border-blue-600 mb-8">
              <h2 className="text-5xl font-black dark:text-white">{problems[currentProblemIndex].q}</h2>
           </div>

           <div className="grid grid-cols-3 gap-4">
              {[1,2,3,4,5,6,7,8,9,0].map(num => (
                <button 
                  key={num}
                  onClick={() => setInput(prev => prev + num)}
                  className="bg-slate-200 dark:bg-[#1a2b34] p-4 rounded-xl text-2xl font-bold dark:text-white hover:bg-white dark:hover:bg-[#233c48]"
                >
                  {num}
                </button>
              ))}
              <button onClick={() => setInput(prev => prev.slice(0, -1))} className="bg-red-100 text-red-600 p-4 rounded-xl font-bold">DEL</button>
              <button onClick={checkAnswer} className="col-span-2 bg-green-500 text-white p-4 rounded-xl font-bold text-xl">ENTER</button>
           </div>
           
           <div className="mt-4 h-12 bg-white dark:bg-[#1a2b34] rounded-xl flex items-center justify-center text-3xl font-mono font-bold dark:text-white border border-slate-200 dark:border-[#233c48]">
              {input}
           </div>
        </div>
      )}

      {gameStatus === 'finished' && (
        <div className="text-center animate-[popIn_0.5s]">
           <span className="material-symbols-outlined text-8xl text-yellow-400 mb-4">emoji_events</span>
           <h2 className="text-4xl font-black dark:text-white mb-4">Course Complete!</h2>
           <p className="text-xl text-slate-500 mb-8">Great teamwork!</p>
           <button onClick={() => setGameStatus('setup')} className="px-8 py-3 bg-slate-700 text-white font-bold rounded-xl">Race Again</button>
        </div>
      )}
    </div>
  );
};
