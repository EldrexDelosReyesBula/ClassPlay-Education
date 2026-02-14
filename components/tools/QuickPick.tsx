
import React, { useState, useEffect, useRef } from 'react';
import { ClassGroup, Student } from '../../types';
import { getClasses } from '../../utils/db';

export const QuickPick: React.FC = () => {
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [pickedHistory, setPickedHistory] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  
  // Animation state
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    getClasses().then(data => {
      setClasses(data);
      if (data.length > 0) setSelectedClassId(data[0].id);
    });
  }, []);

  const currentClass = classes.find(c => c.id === selectedClassId);
  const students = currentClass?.students || [];

  const handlePick = () => {
    if (isAnimating || students.length === 0) return;

    const availableStudents = students.filter(s => !pickedHistory.includes(s.id));
    
    // Auto-reset if everyone has been picked
    let pool = availableStudents;
    if (pool.length === 0) {
      setPickedHistory([]);
      pool = students;
    }

    setIsAnimating(true);
    setSelectedStudent(null);
    setAnnouncement("Picking a student...");

    let duration = 0;
    const maxDuration = 2000; // 2 seconds spin
    const interval = 100;

    const spin = () => {
      // Pick a random index from the WHOLE class for the visual effect
      const randomIndex = Math.floor(Math.random() * students.length);
      setHighlightIndex(randomIndex);

      duration += interval;
      if (duration < maxDuration) {
        animationRef.current = window.setTimeout(spin, interval);
      } else {
        // Final selection from the AVAILABLE pool
        const winner = pool[Math.floor(Math.random() * pool.length)];
        const winnerIndex = students.findIndex(s => s.id === winner.id);
        
        setHighlightIndex(winnerIndex);
        setSelectedStudent(winner);
        setPickedHistory(prev => [...prev, winner.id]);
        setIsAnimating(false);
        setAnnouncement(`Selected ${winner.firstName} ${winner.lastName}`);
      }
    };

    spin();
  };

  const resetHistory = () => {
    setPickedHistory([]);
    setSelectedStudent(null);
    setHighlightIndex(-1);
    setAnnouncement("History reset");
  };

  if (classes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full text-center p-8">
        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">group_off</span>
        <h3 className="text-xl font-bold dark:text-white mb-2">No Classes Found</h3>
        <p className="text-slate-500 mb-6">Create a class list in the sidebar to use Quick Pick.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full max-w-4xl mx-auto w-full">
      <div role="status" aria-live="polite" className="sr-only">{announcement}</div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-8 bg-white dark:bg-[#111c22] p-4 rounded-2xl border border-slate-200 dark:border-[#233c48] shadow-sm">
        <div className="flex items-center gap-4">
          <label htmlFor="class-select" className="sr-only">Select Class</label>
          <select 
            id="class-select"
            value={selectedClassId}
            onChange={(e) => {
              setSelectedClassId(e.target.value);
              resetHistory();
            }}
            className="bg-slate-100 dark:bg-[#1a2b34] border-none rounded-xl px-4 py-2 font-bold text-slate-700 dark:text-white focus:ring-2 focus:ring-primary cursor-pointer"
          >
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <span className="text-sm text-slate-500 dark:text-[#92b7c9] font-medium">
            {pickedHistory.length} / {students.length} picked
          </span>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={resetHistory}
            className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 dark:text-[#92b7c9] dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-xl"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Stage */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
        {selectedStudent ? (
          <div className="text-center animate-[popIn_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]">
            <div className="w-40 h-40 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-2xl mx-auto mb-6 ring-8 ring-primary/20">
              {selectedStudent.firstName[0]}
            </div>
            <h2 className="text-5xl font-black text-slate-800 dark:text-white mb-2 tracking-tight">
              {selectedStudent.firstName} {selectedStudent.lastName}
            </h2>
            <p className="text-xl text-primary font-medium animate-pulse">Selected!</p>
          </div>
        ) : (
          <div className="text-center text-slate-400 dark:text-slate-600">
            <span className="material-symbols-outlined text-8xl mb-4 opacity-50">touch_app</span>
            <p className="text-xl font-medium">Ready to pick...</p>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="flex justify-center my-8">
        <button
          onClick={handlePick}
          disabled={isAnimating}
          className="bg-primary hover:brightness-110 active:scale-95 text-white text-2xl font-black py-6 px-16 rounded-2xl shadow-xl shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-primary/50"
        >
          {isAnimating ? 'Picking...' : 'PICK STUDENT'}
        </button>
      </div>

      {/* Student Grid */}
      <div className="mt-auto max-h-48 overflow-y-auto custom-scrollbar bg-slate-100 dark:bg-[#0f181e] p-6 rounded-2xl border-t border-slate-200 dark:border-[#233c48]">
        <div className="flex flex-wrap gap-2 justify-center">
          {students.map((student, idx) => {
            const isPicked = pickedHistory.includes(student.id);
            const isHighlighted = idx === highlightIndex;
            
            return (
              <div 
                key={student.id}
                className={`
                  px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-100
                  ${isHighlighted 
                    ? 'bg-primary text-white scale-110 shadow-lg z-10' 
                    : isPicked 
                      ? 'bg-slate-200 dark:bg-[#1a2b34] text-slate-400 dark:text-slate-600 opacity-50'
                      : 'bg-white dark:bg-[#111c22] text-slate-700 dark:text-[#92b7c9] border border-slate-200 dark:border-[#233c48]'
                  }
                `}
              >
                {student.firstName}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
