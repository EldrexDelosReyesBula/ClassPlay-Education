
import React, { useState } from 'react';

const COLORS = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-red-500'];

export const PollMaker: React.FC = () => {
  const [options, setOptions] = useState([
    { id: 1, label: 'Option A', count: 0, color: 'bg-blue-500' },
    { id: 2, label: 'Option B', count: 0, color: 'bg-green-500' },
    { id: 3, label: 'Option C', count: 0, color: 'bg-purple-500' },
  ]);

  const increment = (id: number) => {
    setOptions(prev => prev.map(o => o.id === id ? { ...o, count: o.count + 1 } : o));
  };
  
  const decrement = (id: number) => {
    setOptions(prev => prev.map(o => o.id === id ? { ...o, count: Math.max(0, o.count - 1) } : o));
  };

  const reset = () => {
     setOptions(prev => prev.map(o => ({...o, count: 0})));
  };

  const addOption = () => {
      const nextId = Math.max(...options.map(o => o.id), 0) + 1;
      const nextColor = COLORS[options.length % COLORS.length];
      setOptions([...options, { id: nextId, label: 'New Option', count: 0, color: nextColor }]);
  };

  const removeOption = (id: number) => {
      setOptions(prev => prev.filter(o => o.id !== id));
  };

  const total = options.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto w-full p-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold dark:text-white">Live Poll</h2>
        <div className="flex gap-2">
            <button onClick={addOption} className="px-4 py-2 text-sm font-bold bg-primary text-white rounded-lg">+ Option</button>
            <button onClick={reset} className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-[#1a2b34] rounded-lg">Reset Votes</button>
        </div>
      </div>

      <div className="flex-1 flex items-end gap-4 md:gap-8 h-full min-h-[300px] px-4 pb-12 overflow-x-auto custom-scrollbar">
        {options.map(option => {
          const percentage = total > 0 ? (option.count / total) * 100 : 0;
          return (
            <div key={option.id} className="flex-1 flex flex-col items-center justify-end h-full group min-w-[100px]">
               <div className="mb-2 font-bold text-xl dark:text-white">{option.count}</div>
               <div 
                 className={`w-full max-w-[120px] rounded-t-xl transition-all duration-500 ease-out relative group-hover:brightness-110 ${option.color}`}
                 style={{ height: `${Math.max(5, percentage)}%` }}
               >
                 <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                   {percentage.toFixed(1)}%
                 </div>
               </div>
               
               <div className="mt-4 w-full flex flex-col items-center gap-2">
                 <input 
                   className="text-center font-bold bg-transparent border-none focus:ring-0 dark:text-white w-full"
                   value={option.label}
                   onChange={(e) => setOptions(prev => prev.map(o => o.id === option.id ? { ...o, label: e.target.value } : o))}
                 />
                 <div className="flex gap-2">
                   <button 
                     onClick={() => decrement(option.id)}
                     className="w-8 h-8 rounded-full bg-slate-200 dark:bg-[#1a2b34] flex items-center justify-center font-bold text-slate-600 dark:text-white hover:bg-slate-300"
                   >
                     -
                   </button>
                   <button 
                     onClick={() => increment(option.id)}
                     className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold hover:brightness-110"
                   >
                     +
                   </button>
                 </div>
                 {options.length > 2 && (
                     <button onClick={() => removeOption(option.id)} className="text-xs text-red-300 hover:text-red-500 mt-1 opacity-0 group-hover:opacity-100">Delete</button>
                 )}
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
