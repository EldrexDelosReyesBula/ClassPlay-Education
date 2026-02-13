import React, { useState, useEffect } from 'react';
import { ClassGroup, Student } from '../../types';
import { getClasses } from '../../utils/db';

export const DebateDuel: React.FC = () => {
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [speakers, setSpeakers] = useState<[Student | null, Student | null]>([null, null]);
  const [timer, setTimer] = useState(60); // 60s default
  const [activeTimer, setActiveTimer] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    getClasses().then(data => {
      setClasses(data);
      if (data.length > 0) setSelectedClassId(data[0].id);
    });
  }, []);

  useEffect(() => {
    let int: number;
    if (activeTimer && timer > 0) {
      int = window.setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(int);
  }, [activeTimer, timer]);

  const pickSpeakers = () => {
    const currentClass = classes.find(c => c.id === selectedClassId);
    if (!currentClass || currentClass.students.length < 2) return;
    
    const s1 = currentClass.students[Math.floor(Math.random() * currentClass.students.length)];
    let s2 = s1;
    while(s2.id === s1.id) {
       s2 = currentClass.students[Math.floor(Math.random() * currentClass.students.length)];
    }
    setSpeakers([s1, s2]);
    setTimer(60);
    setActiveTimer(null);
  };

  if (classes.length === 0) return <div className="text-center p-8">Create a class list first.</div>;

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full p-4">
      <div className="flex justify-center mb-8">
        <select 
          value={selectedClassId}
          onChange={(e) => setSelectedClassId(e.target.value)}
          className="bg-white dark:bg-[#1a2b34] border border-slate-200 dark:border-[#233c48] rounded-xl px-4 py-2 font-bold"
        >
          {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Speaker 1 */}
        <div className={`flex-1 w-full p-6 rounded-2xl border-4 transition-all ${activeTimer === 'left' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-slate-200 dark:border-[#233c48] bg-white dark:bg-[#111c22]'}`}>
           <h3 className="text-slate-400 font-bold uppercase mb-4 text-center">Pro / Speaker 1</h3>
           <div className="text-center mb-6">
              <div className="w-24 h-24 bg-orange-200 text-orange-700 rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-2">
                 {speakers[0]?.firstName[0] || '?'}
              </div>
              <h2 className="text-2xl font-black dark:text-white">{speakers[0] ? `${speakers[0].firstName} ${speakers[0].lastName}` : '???'}</h2>
           </div>
           <button 
             onClick={() => setActiveTimer(activeTimer === 'left' ? null : 'left')}
             className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl"
             disabled={!speakers[0]}
           >
             {activeTimer === 'left' ? 'PAUSE' : 'START TURN'}
           </button>
        </div>

        {/* Center Controls */}
        <div className="flex flex-col items-center gap-4">
           <div className="text-5xl font-mono font-black tabular-nums dark:text-white">{timer}s</div>
           <button onClick={() => setTimer(60)} className="text-xs font-bold text-slate-500">RESET TIMER</button>
           <div className="h-16 w-1 bg-slate-200 dark:bg-[#233c48] hidden md:block"></div>
           <button 
             onClick={pickSpeakers}
             className="w-20 h-20 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
           >
             <span className="material-symbols-outlined text-3xl">shuffle</span>
           </button>
        </div>

        {/* Speaker 2 */}
        <div className={`flex-1 w-full p-6 rounded-2xl border-4 transition-all ${activeTimer === 'right' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-[#233c48] bg-white dark:bg-[#111c22]'}`}>
           <h3 className="text-slate-400 font-bold uppercase mb-4 text-center">Con / Speaker 2</h3>
           <div className="text-center mb-6">
              <div className="w-24 h-24 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-2">
                 {speakers[1]?.firstName[0] || '?'}
              </div>
              <h2 className="text-2xl font-black dark:text-white">{speakers[1] ? `${speakers[1].firstName} ${speakers[1].lastName}` : '???'}</h2>
           </div>
           <button 
             onClick={() => setActiveTimer(activeTimer === 'right' ? null : 'right')}
             className="w-full py-3 bg-blue-500 text-white font-bold rounded-xl"
             disabled={!speakers[1]}
           >
             {activeTimer === 'right' ? 'PAUSE' : 'START TURN'}
           </button>
        </div>
      </div>
    </div>
  );
};