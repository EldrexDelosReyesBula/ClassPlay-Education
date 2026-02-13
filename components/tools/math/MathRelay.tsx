import React, { useState } from 'react';

export const MathRelay: React.FC = () => {
  const [gameStatus, setGameStatus] = useState<'setup' | 'playing' | 'finished'>('setup');
  const [problems, setProblems] = useState<{q: string, a: number}[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState('');
  const [difficulty, setDifficulty] = useState<'easy'|'medium'|'hard'>('easy');

  const generateProblems = () => {
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
      // visual shake feedback could go here
      setInput('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
      {gameStatus === 'setup' && (
        <div className="text-center">
          <h2 className="text-3xl font-black dark:text-white mb-6">Math Relay</h2>
          <div className="flex gap-4 justify-center mb-8">
            {(['easy', 'medium', 'hard'] as const).map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-6 py-3 rounded-xl font-bold capitalize ${difficulty === d ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-[#1a2b34] text-slate-600 dark:text-white'}`}
              >
                {d}
              </button>
            ))}
          </div>
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
