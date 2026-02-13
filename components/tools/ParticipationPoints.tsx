import React, { useState, useEffect } from 'react';
import { ClassGroup } from '../../types';
import { getClasses } from '../../utils/db';

export const ParticipationPoints: React.FC = () => {
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [points, setPoints] = useState<Record<string, number>>({});

  useEffect(() => {
    getClasses().then(data => {
      setClasses(data);
      if(data.length > 0) setSelectedClassId(data[0].id);
    });
  }, []);

  const cls = classes.find(c => c.id === selectedClassId);

  const addPoint = (id: string) => {
    setPoints(p => ({...p, [id]: (p[id] || 0) + 1}));
  };

  const removePoint = (id: string) => {
    setPoints(p => ({...p, [id]: Math.max(0, (p[id] || 0) - 1)}));
  };

  if(!cls) return <div className="p-8 text-center">No Class Selected</div>;

  return (
    <div className="flex flex-col h-full w-full p-4">
      <div className="flex justify-between items-center mb-6 px-4">
        <select value={selectedClassId} onChange={e => setSelectedClassId(e.target.value)} className="bg-white dark:bg-[#1a2b34] rounded-lg border border-slate-200 dark:border-[#233c48] px-3 py-2 font-bold">
           {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button onClick={() => setPoints({})} className="text-sm font-bold text-slate-400 hover:text-red-400">Reset All</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto custom-scrollbar pb-8">
         {cls.students.map(s => (
           <div key={s.id} className="bg-white dark:bg-[#111c22] p-4 rounded-2xl border border-slate-200 dark:border-[#233c48] flex flex-col items-center shadow-sm">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-[#1a2b34] flex items-center justify-center font-bold mb-2">
                 {s.firstName[0]}
              </div>
              <h3 className="font-bold dark:text-white truncate w-full text-center">{s.firstName}</h3>
              
              <div className="flex items-center gap-4 mt-3">
                 <button onClick={() => removePoint(s.id)} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#1a2b34] hover:bg-red-100 text-slate-400 hover:text-red-500 font-bold">-</button>
                 <span className="text-2xl font-black text-amber-500">{points[s.id] || 0}</span>
                 <button onClick={() => addPoint(s.id)} className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 hover:scale-110 font-bold transition-transform">+</button>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};