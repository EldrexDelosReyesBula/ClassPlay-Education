import React, { useState } from 'react';

const TOPICS = [
  "Cats are better than dogs",
  "Summer is better than Winter",
  "Pizza is the best food",
  "School should start later",
  "Video games are good for you",
  "Books are better than movies",
  "Robots will take over the world"
];

export const SpeedDebate: React.FC = () => {
  const [topic, setTopic] = useState("Ready?");
  const [timer, setTimer] = useState(30);

  const next = () => {
    setTopic(TOPICS[Math.floor(Math.random() * TOPICS.length)]);
    setTimer(30);
  };

  React.useEffect(() => {
    let int: number;
    if (timer > 0 && topic !== "Ready?") {
       int = window.setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(int);
  }, [timer, topic]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 text-center">
       <div className="flex-1 flex flex-col justify-center">
         <h2 className="text-4xl font-black dark:text-white mb-8 max-w-2xl">{topic}</h2>
         <div className={`text-6xl font-mono font-bold ${timer < 10 ? 'text-red-500' : 'text-slate-400'}`}>{timer}s</div>
       </div>
       <button onClick={next} className="px-12 py-5 bg-red-500 text-white font-black text-2xl rounded-2xl shadow-xl hover:bg-red-600">NEXT TOPIC</button>
    </div>
  );
};