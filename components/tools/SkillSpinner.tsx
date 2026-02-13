import React, { useState, useEffect } from 'react';
import { ClassGroup } from '../../types';
import { getClasses } from '../../utils/db';

export const SkillSpinner: React.FC = () => {
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<{ student: string, skill: string } | null>(null);

  const SKILLS = ['Math Problem', 'Reading Aloud', 'Creative Idea', 'Quick Fact', 'Spelling'];
  const COLORS = ['bg-blue-100 text-blue-800', 'bg-green-100 text-green-800', 'bg-purple-100 text-purple-800', 'bg-orange-100 text-orange-800', 'bg-pink-100 text-pink-800'];

  useEffect(() => {
    getClasses().then(data => {
      setClasses(data);
      if (data.length > 0) setSelectedClassId(data[0].id);
    });
  }, []);

  const spin = () => {
      if (spinning) return;
      const cls = classes.find(c => c.id === selectedClassId);
      if (!cls || cls.students.length === 0) return;

      setSpinning(true);
      setResult(null);

      let ticks = 0;
      const interval = setInterval(() => {
          ticks++;
          const randomStudent = cls.students[Math.floor(Math.random() * cls.students.length)].firstName;
          const randomSkill = SKILLS[Math.floor(Math.random() * SKILLS.length)];
          setResult({ student: randomStudent, skill: randomSkill });

          if (ticks > 20) {
              clearInterval(interval);
              setSpinning(false);
          }
      }, 100);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-4xl mx-auto p-4">
       <div className="mb-8">
         <select 
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="bg-white dark:bg-[#1a2b34] border border-slate-200 dark:border-[#233c48] rounded-xl px-4 py-2 font-bold"
         >
            {classes.length === 0 && <option>No Classes</option>}
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
         </select>
       </div>

       <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-3xl">
           {/* Student Card */}
           <div className="flex-1 w-full bg-white dark:bg-[#111c22] rounded-3xl p-8 shadow-xl flex flex-col items-center justify-center h-64 border-b-8 border-primary relative overflow-hidden">
               <span className="text-slate-400 font-bold uppercase text-xs mb-2">Student</span>
               {result ? (
                   <h2 className="text-4xl font-black dark:text-white animate-[popIn_0.2s]">{result.student}</h2>
               ) : (
                   <span className="text-6xl text-slate-200">?</span>
               )}
           </div>

           <span className="material-symbols-outlined text-4xl text-slate-300">add</span>

           {/* Skill Card */}
           <div className="flex-1 w-full bg-white dark:bg-[#111c22] rounded-3xl p-8 shadow-xl flex flex-col items-center justify-center h-64 border-b-8 border-purple-500 relative overflow-hidden">
               <span className="text-slate-400 font-bold uppercase text-xs mb-2">Task</span>
               {result ? (
                   <div className={`text-2xl font-bold px-4 py-2 rounded-lg text-center ${COLORS[SKILLS.indexOf(result.skill) % COLORS.length]}`}>
                       {result.skill}
                   </div>
               ) : (
                   <span className="text-6xl text-slate-200">?</span>
               )}
           </div>
       </div>

       <button 
        onClick={spin}
        disabled={spinning || classes.length === 0}
        className="mt-12 px-12 py-4 bg-primary text-white font-black text-xl rounded-2xl shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
       >
           {spinning ? 'Allocating...' : 'ASSIGN TASK'}
       </button>
    </div>
  );
};
