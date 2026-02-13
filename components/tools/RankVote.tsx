import React, { useState } from 'react';

export const RankVote: React.FC = () => {
  const [items, setItems] = useState([{id: 1, text: 'Pizza', votes: 0}, {id: 2, text: 'Tacos', votes: 0}]);

  const vote = (id: number) => {
     setItems(prev => {
        const updated = prev.map(i => i.id === id ? {...i, votes: i.votes + 1} : i);
        return updated.sort((a, b) => b.votes - a.votes);
     });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
       <div className="w-full max-w-xl space-y-4">
          {items.map((item, i) => (
             <div key={item.id} className="flex gap-4 items-center animate-[flipInX_0.5s]">
                <div className="text-2xl font-black text-slate-300 w-8">#{i+1}</div>
                <div className="flex-1 bg-white dark:bg-[#1a2b34] p-4 rounded-xl shadow border border-slate-200 dark:border-[#233c48] flex justify-between items-center">
                   <input 
                      value={item.text}
                      onChange={e => setItems(items.map(it => it.id === item.id ? {...it, text: e.target.value} : it))}
                      className="bg-transparent border-none font-bold dark:text-white focus:ring-0"
                   />
                   <div className="flex items-center gap-4">
                      <span className="font-mono font-bold text-blue-500">{item.votes}</span>
                      <button onClick={() => vote(item.id)} className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold hover:bg-blue-200">+</button>
                   </div>
                </div>
             </div>
          ))}
       </div>
       <button onClick={() => setItems([...items, {id: Date.now(), text: 'New Option', votes: 0}])} className="mt-8 text-slate-500 font-bold hover:text-primary">+ Add Option</button>
    </div>
  );
};