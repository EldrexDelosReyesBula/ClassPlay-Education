import React, { useState, useEffect } from 'react';
import { ClassGroup, Student } from '../../types';
import { getClasses } from '../../utils/db';

export const ExitTicket: React.FC = () => {
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [answeredIds, setAnsweredIds] = useState<string[]>([]);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

  useEffect(() => {
    getClasses().then(data => {
      setClasses(data);
      if (data.length > 0) setSelectedClassId(data[0].id);
    });
  }, []);

  const currentClass = classes.find(c => c.id === selectedClassId);
  const students = currentClass?.students || [];

  const pickNext = () => {
    const remaining = students.filter(s => !answeredIds.includes(s.id));
    if (remaining.length === 0) {
      alert("All students have been called!");
      return;
    }
    const winner = remaining[Math.floor(Math.random() * remaining.length)];
    setCurrentStudent(winner);
  };

  const markDone = () => {
    if (currentStudent) {
      setAnsweredIds(prev => [...prev, currentStudent.id]);
      setCurrentStudent(null);
    }
  };

  const skip = () => {
    pickNext();
  };

  if (classes.length === 0) return <div className="text-center p-8">Create a class list first.</div>;

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full p-4">
      <div className="flex justify-between items-center mb-6">
        <select 
          value={selectedClassId}
          onChange={(e) => { setSelectedClassId(e.target.value); setAnsweredIds([]); setCurrentStudent(null); }}
          className="bg-white dark:bg-[#1a2b34] border border-slate-200 dark:border-[#233c48] rounded-xl px-4 py-2 font-bold"
        >
          {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <div className="text-sm font-bold text-slate-500">
          {answeredIds.length} / {students.length} Completed
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {currentStudent ? (
          <div className="text-center animate-[popIn_0.3s_ease-out]">
            <h2 className="text-4xl font-bold dark:text-white mb-2">{currentStudent.firstName} {currentStudent.lastName}</h2>
            <p className="text-slate-500 mb-8">Please answer the exit question.</p>
            <div className="flex gap-4">
              <button onClick={skip} className="px-6 py-3 rounded-xl bg-slate-200 dark:bg-[#1a2b34] text-slate-600 dark:text-white font-bold">Skip</button>
              <button onClick={markDone} className="px-8 py-3 rounded-xl bg-emerald-500 text-white font-bold shadow-lg hover:brightness-110">Mark as Done</button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <button 
              onClick={pickNext}
              disabled={answeredIds.length === students.length}
              className="w-48 h-48 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-2xl shadow-xl transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-4xl">touch_app</span>
              PICK NEXT
            </button>
            {answeredIds.length === students.length && (
              <p className="mt-4 text-emerald-600 font-bold">Class Complete!</p>
            )}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mt-8 h-4 bg-slate-200 dark:bg-[#1a2b34] rounded-full overflow-hidden">
        <div 
          className="h-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${(answeredIds.length / Math.max(1, students.length)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};