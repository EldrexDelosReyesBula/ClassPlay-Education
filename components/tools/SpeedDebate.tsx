
import React, { useState, useEffect } from 'react';
import { saveToolState, getToolState } from '../../utils/db';

const DEFAULT_TOPICS = [
  "Cats are better than dogs",
  "Summer is better than Winter",
  "Pizza is the best food",
  "School should start later",
  "Video games are good for you",
  "Books are better than movies",
  "Robots will take over the world"
];

const TOOL_ID = 'speed_debate_custom';

export const SpeedDebate: React.FC = () => {
  const [topics, setTopics] = useState(DEFAULT_TOPICS);
  const [topic, setTopic] = useState("Ready?");
  const [timer, setTimer] = useState(30);
  const [defaultTime, setDefaultTime] = useState(30);
  const [isEditing, setIsEditing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
      getToolState(TOOL_ID).then(data => {
          if (data && data.topics) setTopics(data.topics);
          if (data && data.time) setDefaultTime(data.time);
      });
  }, []);

  const saveData = (newTopics: string[], time: number) => {
      setTopics(newTopics);
      setDefaultTime(time);
      saveToolState(TOOL_ID, { topics: newTopics, time });
  };

  const next = () => {
    setTopic(topics[Math.floor(Math.random() * topics.length)]);
    setTimer(defaultTime);
    setIsPlaying(true);
  };

  useEffect(() => {
    let int: number;
    if (isPlaying && timer > 0 && topic !== "Ready?") {
       int = window.setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(int);
  }, [timer, topic, isPlaying]);

  if (isEditing) {
      return (
          <div className="flex flex-col h-full w-full max-w-2xl mx-auto p-4">
              <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold dark:text-white">Edit Speed Debate</h2>
                  <button onClick={() => setIsEditing(false)} className="text-primary font-bold">Done</button>
              </div>
              <div className="mb-6">
                  <label className="text-xs font-bold uppercase text-slate-500">Timer Duration (seconds)</label>
                  <input type="number" value={defaultTime} onChange={e => saveData(topics, parseInt(e.target.value) || 30)} className="w-full p-2 border rounded dark:bg-[#1a2b34] dark:text-white" />
              </div>
              <div className="flex gap-2 mb-2">
                  <button onClick={() => saveData([...topics, "New Topic"], defaultTime)} className="bg-green-500 text-white px-4 py-2 rounded font-bold">+ Add Topic</button>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
                  {topics.map((t, i) => (
                      <div key={i} className="flex gap-2">
                          <input 
                            value={t} 
                            onChange={e => {
                                const newT = [...topics];
                                newT[i] = e.target.value;
                                saveData(newT, defaultTime);
                            }}
                            className="flex-1 p-2 border rounded dark:bg-[#1a2b34] dark:text-white"
                          />
                          <button onClick={() => saveData(topics.filter((_, idx) => idx !== i), defaultTime)} className="text-red-500 px-2"><span className="material-symbols-outlined">delete</span></button>
                      </div>
                  ))}
              </div>
          </div>
      );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 text-center relative">
       <button onClick={() => setIsEditing(true)} className="absolute top-4 right-4 bg-slate-200 dark:bg-[#233c48] p-2 rounded-full text-slate-600 dark:text-white">
           <span className="material-symbols-outlined">settings</span>
       </button>

       <div className="flex-1 flex flex-col justify-center">
         <h2 className="text-4xl font-black dark:text-white mb-8 max-w-2xl">{topic}</h2>
         <div className={`text-6xl font-mono font-bold ${timer < 10 ? 'text-red-500' : 'text-slate-400'}`}>{timer}s</div>
       </div>
       <button onClick={next} className="px-12 py-5 bg-red-500 text-white font-black text-2xl rounded-2xl shadow-xl hover:bg-red-600">NEXT TOPIC</button>
    </div>
  );
};
