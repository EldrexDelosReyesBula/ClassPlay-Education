
import React, { useState, useEffect } from 'react';
import { ClassGroup } from '../../types';
import { getClasses, saveToolState, getToolState } from '../../utils/db';

const TOOL_ID = 'skill_spinner_custom';
const DEFAULT_SKILLS = ['Math Problem', 'Reading Aloud', 'Creative Idea', 'Quick Fact', 'Spelling'];
const COLORS = ['bg-blue-100 text-blue-800', 'bg-green-100 text-green-800', 'bg-purple-100 text-purple-800', 'bg-orange-100 text-orange-800', 'bg-pink-100 text-pink-800'];

export const SkillSpinner: React.FC = () => {
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<{ student: string, skill: string } | null>(null);
  
  const [skills, setSkills] = useState(DEFAULT_SKILLS);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getClasses().then(data => {
      setClasses(data);
      if (data.length > 0) setSelectedClassId(data[0].id);
    });
    getToolState(TOOL_ID).then(data => {
        if(data && data.skills) setSkills(data.skills);
    });
  }, []);

  const saveSkills = (newS: string[]) => {
      setSkills(newS);
      saveToolState(TOOL_ID, { skills: newS });
  };

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
          const randomSkill = skills[Math.floor(Math.random() * skills.length)];
          setResult({ student: randomStudent, skill: randomSkill });

          if (ticks > 20) {
              clearInterval(interval);
              setSpinning(false);
          }
      }, 100);
  };

  if (isEditing) {
      return (
          <div className="flex flex-col h-full w-full max-w-2xl mx-auto p-4">
              <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold dark:text-white">Edit Tasks</h2>
                  <button onClick={() => setIsEditing(false)} className="text-primary font-bold">Done</button>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
                  {skills.map((s, i) => (
                      <div key={i} className="flex gap-2">
                          <input 
                            value={s} 
                            onChange={e => {
                                const n = [...skills];
                                n[i] = e.target.value;
                                saveSkills(n);
                            }}
                            className="flex-1 p-2 rounded border dark:bg-[#1a2b34] dark:border-none dark:text-white"
                          />
                          <button onClick={() => saveSkills(skills.filter((_, idx) => idx !== i))} className="text-red-500 px-2"><span className="material-symbols-outlined">delete</span></button>
                      </div>
                  ))}
                  <button onClick={() => saveSkills([...skills, "New Task"])} className="w-full py-2 bg-purple-500 text-white font-bold rounded mt-2">Add Task</button>
              </div>
          </div>
      );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-4xl mx-auto p-4 relative">
       <button onClick={() => setIsEditing(true)} className="absolute top-4 right-4 bg-slate-200 dark:bg-[#233c48] p-2 rounded-full text-slate-600 dark:text-white"><span className="material-symbols-outlined">edit</span></button>

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
                   <div className={`text-2xl font-bold px-4 py-2 rounded-lg text-center ${COLORS[skills.indexOf(result.skill) % COLORS.length] || 'bg-slate-100 text-slate-800'}`}>
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
