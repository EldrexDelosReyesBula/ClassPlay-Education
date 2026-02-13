import React, { useState, useEffect } from 'react';
import { ClassGroup, Student } from '../../types';
import { getClasses } from '../../utils/db';

export const PopcornReading: React.FC = () => {
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    getClasses().then(data => {
      setClasses(data);
      if(data.length > 0) setSelectedClassId(data[0].id);
    });
  }, []);

  const pop = () => {
    const cls = classes.find(c => c.id === selectedClassId);
    if (!cls) return;
    
    // Filter out recently picked if possible, or reset
    let pool = cls.students.filter(s => !history.includes(s.id));
    if (pool.length === 0) {
      pool = cls.students;
      setHistory([]);
    }

    const next = pool[Math.floor(Math.random() * pool.length)];
    setCurrentStudent(next);
    setHistory(prev => [...prev, next.id]);
  };

  if (classes.length === 0) return <div className="p-8 text-center">Create a class list first.</div>;

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto w-full p-4">
      <div className="absolute top-4 right-4">
          <select 
             value={selectedClassId}
             onChange={e => {setSelectedClassId(e.target.value); setHistory([]); setCurrentStudent(null);}}
             className="bg-white dark:bg-[#1a2b34] border border-slate-200 dark:border-[#233c48] rounded-lg px-2 py-1"
          >
             {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
      </div>

      <div className="mb-12 relative">
          <span className="material-symbols-outlined text-[200px] text-yellow-400 drop-shadow-2xl">local_activity</span>
          {currentStudent && (
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
                <div className="bg-white dark:bg-[#111c22] px-8 py-4 rounded-xl shadow-xl border-4 border-yellow-500 animate-[popIn_0.3s_cubic-bezier(0.175,0.885,0.32,1.275)]">
                   <h2 className="text-3xl font-black text-slate-800 dark:text-white whitespace-nowrap">
                      {currentStudent.firstName}
                   </h2>
                </div>
             </div>
          )}
      </div>

      <button 
        onClick={pop}
        className="px-16 py-6 bg-yellow-500 hover:bg-yellow-600 text-white font-black text-3xl rounded-3xl shadow-xl shadow-yellow-500/30 transition-transform active:scale-95 flex items-center gap-3"
      >
        <span className="material-symbols-outlined text-4xl">eject</span>
        POPCORN!
      </button>
      <p className="mt-6 text-slate-400 font-bold">Pass the reading to the next student</p>
    </div>
  );
};