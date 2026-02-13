import React, { useState, useEffect } from 'react';

export const NumberHunt: React.FC = () => {
  const [grid, setGrid] = useState<number[]>([]);
  const [target, setTarget] = useState<number>(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    generateLevel();
  };

  const generateLevel = () => {
    const nums = Array.from({length: 12}, () => Math.floor(Math.random() * 99) + 1);
    setGrid(nums);
    setTarget(nums[Math.floor(Math.random() * nums.length)]);
  };

  const handleClick = (num: number) => {
    if (!isPlaying) return;
    if (num === target) {
      setScore(s => s + 10);
      generateLevel();
    } else {
      setScore(s => Math.max(0, s - 5));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
      {!isPlaying ? (
        <div className="text-center">
          <h2 className="text-3xl font-black dark:text-white mb-4">Number Hunt</h2>
          <p className="text-slate-500 mb-8">Find the target number as fast as you can!</p>
          {timeLeft === 0 && <div className="text-2xl font-bold mb-8 text-blue-500">Final Score: {score}</div>}
          <button onClick={startGame} className="px-12 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-transform">START GAME</button>
        </div>
      ) : (
        <div className="w-full max-w-2xl">
           <div className="flex justify-between items-center mb-8 bg-white dark:bg-[#111c22] p-4 rounded-xl shadow-sm">
              <div className="text-xl font-bold text-slate-500">Time: <span className={timeLeft < 10 ? 'text-red-500' : 'text-slate-800 dark:text-white'}>{timeLeft}s</span></div>
              <div className="text-2xl font-black text-indigo-600">Find: {target}</div>
              <div className="text-xl font-bold text-slate-500">Score: {score}</div>
           </div>

           <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {grid.map((num, i) => (
                <button 
                  key={i}
                  onClick={() => handleClick(num)}
                  className="h-24 md:h-32 bg-slate-100 dark:bg-[#1a2b34] rounded-2xl text-3xl font-black text-slate-700 dark:text-white hover:bg-indigo-500 hover:text-white active:scale-95 transition-all shadow-sm"
                >
                  {num}
                </button>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};