import React, { useState } from 'react';

const ITEMS = [
  { id: 'goggles', name: 'Safety Goggles', safe: true, icon: 'visibility' },
  { id: 'coat', name: 'Lab Coat', safe: true, icon: 'checkroom' },
  { id: 'gloves', name: 'Nitrile Gloves', safe: true, icon: 'pan_tool' },
  { id: 'sandwich', name: 'Ham Sandwich', safe: false, icon: 'lunch_dining' },
  { id: 'soda', name: 'Open Soda', safe: false, icon: 'local_drink' },
  { id: 'sandals', name: 'Open Sandals', safe: false, icon: 'do_not_step' },
];

export const LabSim: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  const toggle = (id: string) => {
    if (selected.includes(id)) setSelected(selected.filter(i => i !== id));
    else setSelected([...selected, id]);
    setChecked(false);
  };

  const isCorrect = () => {
    const safeIds = ITEMS.filter(i => i.safe).map(i => i.id);
    const unsafeIds = ITEMS.filter(i => !i.safe).map(i => i.id);
    
    // Must select all safe items AND no unsafe items
    const hasAllSafe = safeIds.every(id => selected.includes(id));
    const hasNoUnsafe = !selected.some(id => unsafeIds.includes(id));
    
    return hasAllSafe && hasNoUnsafe;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
       <h2 className="text-3xl font-black dark:text-white mb-2">Lab Safety Check</h2>
       <p className="text-slate-500 mb-8">Select ONLY the items required for a safe experiment.</p>

       <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 max-w-3xl">
          {ITEMS.map(item => (
            <button
               key={item.id}
               onClick={() => toggle(item.id)}
               className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${
                 selected.includes(item.id) 
                   ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                   : 'border-slate-200 dark:border-[#233c48] bg-white dark:bg-[#111c22]'
               }`}
            >
               <span className="material-symbols-outlined text-4xl dark:text-white">{item.icon}</span>
               <span className="font-bold dark:text-white">{item.name}</span>
            </button>
          ))}
       </div>

       {checked ? (
         <div className={`text-2xl font-black mb-6 ${isCorrect() ? 'text-green-500' : 'text-red-500'} animate-[popIn_0.3s]`}>
            {isCorrect() ? 'Ready for Science!' : 'Unsafe! Try Again.'}
         </div>
       ) : (
         <div className="h-8 mb-6"></div>
       )}

       <button 
         onClick={() => setChecked(true)}
         className="px-12 py-4 bg-green-600 text-white font-black text-xl rounded-2xl shadow-xl hover:bg-green-700 transition-transform active:scale-95"
       >
         ENTER LAB
       </button>
    </div>
  );
};