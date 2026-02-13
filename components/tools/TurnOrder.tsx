import React, { useState, useEffect } from 'react';
import { ClassGroup, Student } from '../../types';
import { getClasses } from '../../utils/db';

export const TurnOrder: React.FC = () => {
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [order, setOrder] = useState<Student[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    getClasses().then(data => {
      setClasses(data);
      if (data.length > 0) setSelectedClassId(data[0].id);
    });
  }, []);

  const generateOrder = () => {
    const cls = classes.find(c => c.id === selectedClassId);
    if (!cls) return;
    const shuffled = [...cls.students].sort(() => Math.random() - 0.5);
    setOrder(shuffled);
    setRevealedCount(0);
  };

  const revealNext = () => {
    if (revealedCount < order.length) {
      setRevealedCount(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full p-4">
      <div className="flex justify-between items-center mb-6">
         <select 
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="bg-white dark:bg-[#1a2b34] border border-slate-200 dark:border-[#233c48] rounded-xl px-4 py-2 font-bold"
         >
           {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
         </select>
         <button onClick={generateOrder} className="px-4 py-2 bg-teal-500 text-white font-bold rounded-lg shadow hover:bg-teal-600">
           New Random Order
         </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3">
         {order.length === 0 ? (
           <div className="text-center py-20 text-slate-400">Select a class and click "New Random Order"</div>
         ) : (
           order.map((student, idx) => (
             <div 
               key={student.id}
               className={`p-4 rounded-xl flex items-center justify-between border-2 transition-all duration-500 ${
                 idx < revealedCount 
                   ? 'bg-white dark:bg-[#111c22] border-teal-500/50 opacity-100 transform translate-x-0' 
                   : 'bg-slate-100 dark:bg-[#1a2b34] border-transparent opacity-30 transform translate-x-4 blur-sm'
               }`}
             >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${idx < revealedCount ? 'bg-teal-100 text-teal-700' : 'bg-slate-300 text-slate-500'}`}>
                    {idx + 1}
                  </div>
                  <span className="text-xl font-bold dark:text-white">
                    {idx < revealedCount ? `${student.firstName} ${student.lastName}` : '???'}
                  </span>
                </div>
                {idx === revealedCount - 1 && (
                  <span className="text-xs font-bold bg-teal-500 text-white px-2 py-1 rounded">CURRENT</span>
                )}
             </div>
           ))
         )}
      </div>

      <div className="mt-6 flex justify-center">
         <button 
           onClick={revealNext}
           disabled={revealedCount >= order.length || order.length === 0}
           className="px-12 py-4 bg-teal-600 hover:bg-teal-700 text-white font-black text-xl rounded-2xl shadow-xl transition-all active:scale-95 disabled:opacity-50"
         >
           REVEAL NEXT
         </button>
      </div>
    </div>
  );
};