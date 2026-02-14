
import React, { useState, useEffect } from 'react';
import { ClassGroup, Student } from '../../types';
import { getClasses, saveToolState, getToolState } from '../../utils/db';
import { v4 as uuidv4 } from 'uuid';

const TOOL_ID = 'team_maker_history';

interface TeamRecord {
    id: string;
    date: number;
    className: string;
    groups: Student[][];
}

export const TeamMaker: React.FC = () => {
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [groupCount, setGroupCount] = useState<number>(4);
  const [teams, setTeams] = useState<Student[][]>([]);
  const [generated, setGenerated] = useState(false);
  const [history, setHistory] = useState<TeamRecord[]>([]);
  const [view, setView] = useState<'generate' | 'history'>('generate');

  useEffect(() => {
    getClasses().then(data => {
      setClasses(data);
      if (data.length > 0) setSelectedClassId(data[0].id);
    });
    loadHistory();
  }, []);

  const loadHistory = async () => {
      const data = await getToolState(TOOL_ID);
      if (data && Array.isArray(data)) {
          setHistory(data);
      }
  };

  const currentClass = classes.find(c => c.id === selectedClassId);

  const generateTeams = () => {
    if (!currentClass) return;
    
    // Fisher-Yates shuffle
    const students = [...currentClass.students];
    for (let i = students.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [students[i], students[j]] = [students[j], students[i]];
    }

    // Distribute into groups
    const newTeams: Student[][] = Array.from({ length: groupCount }, () => []);
    
    students.forEach((student, index) => {
      newTeams[index % groupCount].push(student);
    });

    setTeams(newTeams);
    setGenerated(true);
  };

  const saveToHistory = async () => {
      if (!currentClass || teams.length === 0) return;
      const newRecord: TeamRecord = {
          id: uuidv4(),
          date: Date.now(),
          className: currentClass.name,
          groups: teams
      };
      const newHistory = [newRecord, ...history].slice(0, 20); // Keep last 20
      setHistory(newHistory);
      await saveToolState(TOOL_ID, newHistory);
      alert("Teams saved to History!");
  };

  const loadFromHistory = (record: TeamRecord) => {
      setTeams(record.groups);
      setGenerated(true);
      setView('generate');
  };

  if (classes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full text-center p-8">
        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">group_off</span>
        <h3 className="text-xl font-bold dark:text-white mb-2">No Classes Found</h3>
        <p className="text-slate-500 mb-6">Create a class list to use Team Maker.</p>
      </div>
    );
  }

  if (view === 'history') {
      return (
          <div className="flex flex-col min-h-full max-w-6xl mx-auto w-full p-4">
              <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold dark:text-white">Saved Teams</h2>
                  <button onClick={() => setView('generate')} className="text-primary font-bold">Back to Generator</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8">
                  {history.length === 0 && <p className="text-slate-400 col-span-2 text-center py-10">No saved history yet.</p>}
                  {history.map(rec => (
                      <div key={rec.id} className="bg-white dark:bg-[#111c22] p-6 rounded-xl border border-slate-200 dark:border-[#233c48]">
                          <div className="flex justify-between mb-4">
                              <div>
                                  <div className="font-bold dark:text-white">{rec.className}</div>
                                  <div className="text-xs text-slate-500">{new Date(rec.date).toLocaleString()}</div>
                              </div>
                              <button onClick={() => loadFromHistory(rec)} className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-bold text-sm hover:bg-blue-200">Load</button>
                          </div>
                          <div className="text-sm text-slate-500">{rec.groups.length} Groups created</div>
                      </div>
                  ))}
              </div>
          </div>
      );
  }

  return (
    <div className="flex flex-col min-h-full max-w-6xl mx-auto w-full">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-6 mb-8 bg-white dark:bg-[#111c22] p-6 rounded-2xl border border-slate-200 dark:border-[#233c48] shadow-sm">
        <div className="flex items-center gap-4">
          <label htmlFor="class-select" className="text-sm font-bold text-slate-500 dark:text-[#92b7c9]">Class:</label>
          <select 
            id="class-select"
            value={selectedClassId}
            onChange={(e) => {
              setSelectedClassId(e.target.value);
              setGenerated(false);
            }}
            className="bg-slate-100 dark:bg-[#1a2b34] border-none rounded-xl px-4 py-2 font-bold text-slate-700 dark:text-white focus:ring-2 focus:ring-primary cursor-pointer"
          >
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4 flex-1 max-w-xs">
          <label htmlFor="group-count" className="text-sm font-bold text-slate-500 dark:text-[#92b7c9] whitespace-nowrap">
            Groups: <span className="text-primary">{groupCount}</span>
          </label>
          <input 
            id="group-count"
            type="range" 
            min="2" 
            max={currentClass ? Math.floor(currentClass.students.length / 2) : 10} 
            value={groupCount}
            onChange={(e) => setGroupCount(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        <div className="flex gap-2">
            <button 
              onClick={() => setView('history')}
              className="px-4 py-2.5 text-slate-500 font-bold hover:text-slate-700 dark:hover:text-white"
            >
                History
            </button>
            <button 
              onClick={generateTeams}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-green-500/30 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined">shuffle</span>
              {generated ? 'Reshuffle' : 'Create Teams'}
            </button>
        </div>
      </div>

      {/* Teams Grid */}
      {generated ? (
        <div className="flex flex-col w-full">
             <div className="flex justify-end mb-4 px-2">
                 <button onClick={saveToHistory} className="text-sm font-bold text-blue-500 flex items-center gap-1 hover:text-blue-600">
                     <span className="material-symbols-outlined text-sm">save</span> Save This Set
                 </button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
              {teams.map((team, idx) => (
                <div key={idx} className="bg-white dark:bg-[#111c22] rounded-2xl border border-slate-200 dark:border-[#233c48] overflow-hidden shadow-sm animate-[fadeIn_0.3s_ease-out]">
                  <div className="bg-slate-50 dark:bg-[#1a2b34] px-4 py-3 border-b border-slate-100 dark:border-[#233c48] flex justify-between items-center">
                    <h3 className="font-bold text-slate-700 dark:text-white">Group {idx + 1}</h3>
                    <span className="text-xs font-bold bg-white dark:bg-[#233c48] px-2 py-1 rounded-md text-slate-500 dark:text-[#92b7c9]">
                      {team.length}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    {team.map(student => (
                      <div key={student.id} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white flex items-center justify-center text-xs font-bold">
                          {student.firstName[0]}
                        </div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {student.firstName} {student.lastName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 opacity-50 py-12">
           <span className="material-symbols-outlined text-9xl mb-4">groups</span>
           <p className="text-xl font-bold">Ready to create teams?</p>
        </div>
      )}
    </div>
  );
};
