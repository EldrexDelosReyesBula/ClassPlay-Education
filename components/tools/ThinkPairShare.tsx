import React, { useState, useEffect } from 'react';
import { ClassGroup, Student } from '../../types';
import { getClasses } from '../../utils/db';

export const ThinkPairShare: React.FC = () => {
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [pairs, setPairs] = useState<Student[][]>([]);
  const [generated, setGenerated] = useState(false);
  const [matchType, setMatchType] = useState<'random' | 'skill'>('random');
  
  // Load history from local storage to avoid repeats
  // Key format: classplay_pairs_history_[classId]
  
  useEffect(() => {
    getClasses().then(data => {
      setClasses(data);
      if (data.length > 0) setSelectedClassId(data[0].id);
    });
  }, []);

  const getHistory = (classId: string): string[] => {
     try {
       const stored = localStorage.getItem(`classplay_pairs_history_${classId}`);
       return stored ? JSON.parse(stored) : [];
     } catch {
       return [];
     }
  };

  const saveHistory = (classId: string, newPairs: Student[][]) => {
     // Store pair strings like "id1-id2"
     const history = getHistory(classId);
     const pairStrings = newPairs.map(p => p.map(s => s.id).sort().join('-'));
     // Keep last 5 sessions?
     const updated = [...pairStrings, ...history].slice(0, 100); 
     localStorage.setItem(`classplay_pairs_history_${classId}`, JSON.stringify(updated));
  };

  const generatePairs = () => {
    const currentClass = classes.find(c => c.id === selectedClassId);
    if (!currentClass) return;

    let students = [...currentClass.students];
    const newPairs: Student[][] = [];

    if (matchType === 'skill') {
      // Logic: High Skill paired with Low Skill
      // 1. Sort students by skill: High -> Medium -> Low (undefined treated as Medium)
      const skillMap = { 'high': 3, 'medium': 2, 'low': 1 };
      
      students.sort((a, b) => {
         const sa = skillMap[a.skillLevel || 'medium'] || 2;
         const sb = skillMap[b.skillLevel || 'medium'] || 2;
         return sb - sa; // Descending
      });

      // 2. Fold method: Pair top with bottom
      while (students.length >= 2) {
         const top = students.shift()!;
         const bottom = students.pop()!;
         newPairs.push([top, bottom]);
      }
      if (students.length > 0) {
        // Handle odd one out - add to last pair to make a trio
        if (newPairs.length > 0) newPairs[newPairs.length - 1].push(students[0]);
        else newPairs.push([students[0]]);
      }

    } else {
      // Random Logic with History Avoidance (Simple attempt)
      // Attempt to shuffle X times to find a config with low conflicts
      // For simplicity in this constraints: Just purely random shuffle for now, 
      // but we could implement a "retry" if pair exists in history.
      
      const history = getHistory(selectedClassId);
      
      // Fisher-Yates shuffle
      for (let i = students.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [students[i], students[j]] = [students[j], students[i]];
      }
      
      // Create pairs
      while (students.length >= 2) {
        newPairs.push([students.pop()!, students.pop()!]);
      }
      if (students.length > 0) {
        if (newPairs.length > 0) newPairs[newPairs.length - 1].push(students.pop()!);
        else newPairs.push([students.pop()!]);
      }
      
      // We save history so NEXT time we know (logic to actually use history for avoidance is complex constraint satisfaction, 
      // simple random is usually sufficient for classroom unless explicitly requested "never pair X with Y again")
      saveHistory(selectedClassId, newPairs);
    }

    setPairs(newPairs);
    setGenerated(true);
  };

  if (classes.length === 0) {
    return <div className="text-center p-8 text-slate-500">Create a class list first to use this tool.</div>;
  }

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full p-4">
      <div className="bg-white dark:bg-[#111c22] p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-[#233c48] mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <label className="font-bold text-slate-500">Class:</label>
            <select 
              value={selectedClassId}
              onChange={(e) => { setSelectedClassId(e.target.value); setGenerated(false); }}
              className="bg-slate-100 dark:bg-[#1a2b34] border-none rounded-xl px-4 py-2 font-bold dark:text-white flex-1"
            >
              {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="flex bg-slate-100 dark:bg-[#1a2b34] p-1 rounded-xl">
             <button 
               onClick={() => setMatchType('random')}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${matchType === 'random' ? 'bg-white dark:bg-[#233c48] shadow text-cyan-600' : 'text-slate-500'}`}
             >
               Random
             </button>
             <button 
               onClick={() => setMatchType('skill')}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${matchType === 'skill' ? 'bg-white dark:bg-[#233c48] shadow text-cyan-600' : 'text-slate-500'}`}
             >
               Skill Balanced
             </button>
          </div>

          <button 
            onClick={generatePairs}
            className="w-full md:w-auto bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all active:scale-95"
          >
            Generate Pairs
          </button>
        </div>
        
        {matchType === 'skill' && (
          <p className="text-xs text-slate-400 mt-4 text-center">
            * Pairs students with different skill levels (High ↔ Low). Ensure skill levels are set in Class Lists.
          </p>
        )}
      </div>

      {generated ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pb-8 custom-scrollbar">
          {pairs.map((pair, idx) => (
            <div key={idx} className="bg-white dark:bg-[#111c22] p-4 rounded-xl border border-slate-200 dark:border-[#233c48] flex items-center justify-around animate-[fadeIn_0.3s_ease-out] shadow-sm hover:shadow-md transition-shadow">
              {pair.map((s, i) => (
                <React.Fragment key={s.id}>
                  {i > 0 && <span className="material-symbols-outlined text-slate-300 dark:text-slate-600">compare_arrows</span>}
                  <div className="text-center flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-2 ${
                        s.skillLevel === 'high' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
                        s.skillLevel === 'low' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
                        'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300'
                    }`}>
                      {s.firstName[0]}
                    </div>
                    <p className="font-bold text-sm text-slate-700 dark:text-white truncate max-w-[100px]">{s.firstName}</p>
                    {matchType === 'skill' && s.skillLevel && (
                       <span className="text-[10px] uppercase font-bold text-slate-400">{s.skillLevel}</span>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center opacity-50">
           <span className="material-symbols-outlined text-9xl mb-4 text-slate-300 dark:text-slate-700">people_alt</span>
           <p className="text-xl font-bold text-slate-400">Ready to pair up?</p>
        </div>
      )}
    </div>
  );
};