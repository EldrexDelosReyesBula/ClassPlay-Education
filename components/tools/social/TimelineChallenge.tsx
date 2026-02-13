import React, { useState } from 'react';

const EVENTS = [
  { id: 1, text: "Pyramids Built", year: -2500 },
  { id: 2, text: "Moon Landing", year: 1969 },
  { id: 3, text: "Printing Press", year: 1440 },
  { id: 4, text: "Wheel Invented", year: -3500 },
];

export const TimelineChallenge: React.FC = () => {
  const [items, setItems] = useState([...EVENTS].sort(() => Math.random() - 0.5));
  const [checked, setChecked] = useState(false);

  const move = (idx: number, dir: -1 | 1) => {
     if ((idx === 0 && dir === -1) || (idx === items.length - 1 && dir === 1)) return;
     const newItems = [...items];
     const temp = newItems[idx];
     newItems[idx] = newItems[idx + dir];
     newItems[idx + dir] = temp;
     setItems(newItems);
     setChecked(false);
  };

  const isCorrect = () => {
    for(let i=0; i<items.length-1; i++) {
       if (items[i].year > items[i+1].year) return false;
    }
    return true;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
       <h2 className="text-2xl font-bold dark:text-white mb-6">Order Oldest (Top) to Newest (Bottom)</h2>
       
       <div className="flex flex-col gap-2 w-full max-w-lg mb-8">
          {items.map((evt, i) => (
             <div key={evt.id} className="flex items-center gap-4 bg-white dark:bg-[#111c22] p-4 rounded-xl shadow-sm border border-slate-200 dark:border-[#233c48]">
                <div className="flex flex-col gap-1">
                   <button onClick={() => move(i, -1)} className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined">keyboard_arrow_up</span></button>
                   <button onClick={() => move(i, 1)} className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined">keyboard_arrow_down</span></button>
                </div>
                <div className="flex-1 font-bold text-lg dark:text-white">{evt.text}</div>
                {checked && (
                   <div className="text-sm font-mono font-bold text-slate-500">{evt.year < 0 ? `${Math.abs(evt.year)} BC` : evt.year}</div>
                )}
             </div>
          ))}
       </div>

       <button 
         onClick={() => setChecked(true)}
         className={`px-12 py-4 text-white font-black rounded-2xl shadow-xl transition-all ${checked ? (isCorrect() ? 'bg-green-500' : 'bg-red-500') : 'bg-amber-600'}`}
       >
          {checked ? (isCorrect() ? 'CORRECT!' : 'INCORRECT ORDER') : 'CHECK TIMELINE'}
       </button>
    </div>
  );
};