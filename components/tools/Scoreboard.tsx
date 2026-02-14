
import React, { useState } from 'react';

interface Team {
  id: number;
  name: string;
  score: number;
  color: string;
  textColor: string;
}

export const Scoreboard: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([
    { id: 1, name: 'Team 1', score: 0, color: 'bg-blue-600', textColor: 'text-blue-100' },
    { id: 2, name: 'Team 2', score: 0, color: 'bg-red-600', textColor: 'text-red-100' },
    { id: 3, name: 'Team 3', score: 0, color: 'bg-emerald-600', textColor: 'text-emerald-100' },
  ]);

  const updateScore = (id: number, delta: number) => {
    setTeams(prev => prev.map(t => t.id === id ? { ...t, score: Math.max(0, t.score + delta) } : t));
  };

  const addTeam = () => {
    const colors = [
      { bg: 'bg-amber-500', txt: 'text-amber-100' },
      { bg: 'bg-purple-600', txt: 'text-purple-100' },
      { bg: 'bg-pink-600', txt: 'text-pink-100' },
      { bg: 'bg-cyan-600', txt: 'text-cyan-100' },
      { bg: 'bg-indigo-600', txt: 'text-indigo-100' }
    ];
    const nextColor = colors[teams.length % colors.length];
    setTeams([...teams, { 
      id: Date.now(), 
      name: `Team ${teams.length + 1}`, 
      score: 0, 
      color: nextColor.bg,
      textColor: nextColor.txt
    }]);
  };

  const removeTeam = (id: number) => {
    if (teams.length <= 1) return;
    if (window.confirm("Are you sure you want to delete this team?")) {
      setTeams(teams.filter(t => t.id !== id));
    }
  };

  return (
    <div className="flex flex-col min-h-full w-full p-4 overflow-hidden">
      <div className="flex justify-between items-center mb-6 px-4">
         <h2 className="text-2xl font-bold dark:text-white">Scoreboard</h2>
         <button 
           onClick={addTeam}
           className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-primary/50"
           aria-label="Add new team"
         >
           <span className="material-symbols-outlined" aria-hidden="true">add</span>
           Add Team
         </button>
      </div>

      {/* Carousel Container */}
      <div className="flex-1 flex gap-6 overflow-x-auto overflow-y-hidden pb-8 px-4 snap-x snap-mandatory items-center custom-scrollbar">
        {teams.map(team => (
          <div 
            key={team.id} 
            className="flex-shrink-0 w-full max-w-[300px] md:max-w-[400px] h-[450px] md:h-[500px] bg-white dark:bg-[#111c22] rounded-3xl shadow-xl border border-slate-200 dark:border-[#233c48] overflow-hidden flex flex-col snap-center relative transition-transform hover:scale-[1.02] duration-300"
          >
            {/* Header */}
            <div className={`${team.color} p-6 flex justify-between items-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></div>
              <label htmlFor={`team-name-${team.id}`} className="sr-only">Team Name</label>
              <input 
                id={`team-name-${team.id}`}
                className="bg-transparent border-none text-2xl font-black text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 rounded w-full p-0 shadow-sm"
                value={team.name}
                onChange={(e) => setTeams(prev => prev.map(t => t.id === team.id ? { ...t, name: e.target.value } : t))}
              />
              <button 
                onClick={() => removeTeam(team.id)} 
                className="ml-2 text-white/70 hover:text-white transition-colors p-1 rounded hover:bg-white/20"
                aria-label={`Remove ${team.name}`}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            {/* Score Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-[#0f181e]">
               <span 
                 className="text-8xl md:text-[10rem] leading-none font-black tabular-nums text-slate-800 dark:text-white drop-shadow-sm select-none"
                 role="status"
                 aria-label={`${team.name} score: ${team.score}`}
               >
                 {team.score}
               </span>
            </div>

            {/* Controls */}
            <div className="p-6 bg-white dark:bg-[#111c22] border-t border-slate-100 dark:border-[#233c48]">
               <div className="flex gap-4 mb-6">
                 <button 
                   onClick={() => updateScore(team.id, -1)}
                   className="flex-1 h-14 md:h-16 rounded-2xl bg-slate-100 dark:bg-[#1a2b34] text-slate-600 dark:text-white flex items-center justify-center text-4xl font-bold hover:bg-slate-200 dark:hover:bg-[#233c48] active:scale-95 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                   aria-label={`Subtract 1 point from ${team.name}`}
                 >
                   -
                 </button>
                 <button 
                   onClick={() => updateScore(team.id, 1)}
                   className="flex-1 h-14 md:h-16 rounded-2xl bg-slate-800 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-4xl font-bold hover:bg-slate-700 dark:hover:bg-slate-200 active:scale-95 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
                   aria-label={`Add 1 point to ${team.name}`}
                 >
                   +
                 </button>
               </div>
               <div className="flex gap-2">
                  <button onClick={() => updateScore(team.id, 5)} className="flex-1 py-3 rounded-lg text-sm font-bold bg-slate-50 dark:bg-[#1a2b34] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#233c48] transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400" aria-label={`Add 5 points to ${team.name}`}>+5</button>
                  <button onClick={() => updateScore(team.id, 10)} className="flex-1 py-3 rounded-lg text-sm font-bold bg-slate-50 dark:bg-[#1a2b34] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#233c48] transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400" aria-label={`Add 10 points to ${team.name}`}>+10</button>
               </div>
            </div>
          </div>
        ))}
        {/* Add button at end of scroll as well */}
         <div className="flex-shrink-0 w-[100px] h-[450px] md:h-[500px] flex items-center justify-center snap-center">
            <button 
               onClick={addTeam}
               className="w-16 h-16 rounded-full bg-slate-200 dark:bg-[#233c48] flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all shadow-lg hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/50"
               aria-label="Add new team"
            >
               <span className="material-symbols-outlined text-3xl">add</span>
            </button>
         </div>
      </div>
    </div>
  );
};
