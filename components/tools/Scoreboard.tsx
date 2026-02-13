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
    setTeams(teams.filter(t => t.id !== id));
  };

  return (
    <div className="flex flex-col h-full w-full p-4 overflow-hidden">
      <div className="flex justify-between items-center mb-6 px-4">
         <h2 className="text-2xl font-bold dark:text-white">Scoreboard</h2>
         <button 
           onClick={addTeam}
           className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all"
         >
           <span className="material-symbols-outlined">add</span>
           Add Team
         </button>
      </div>

      {/* Carousel Container */}
      <div className="flex-1 flex gap-6 overflow-x-auto overflow-y-hidden pb-8 px-4 snap-x snap-mandatory items-center custom-scrollbar">
        {teams.map(team => (
          <div 
            key={team.id} 
            className="flex-shrink-0 w-full max-w-[350px] md:max-w-[400px] h-[500px] bg-white dark:bg-[#111c22] rounded-3xl shadow-xl border border-slate-200 dark:border-[#233c48] overflow-hidden flex flex-col snap-center relative transition-transform hover:scale-[1.02] duration-300"
          >
            {/* Header */}
            <div className={`${team.color} p-6 flex justify-between items-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></div>
              <input 
                className="bg-transparent border-none text-2xl font-black text-white placeholder-white/70 focus:ring-0 w-full p-0 shadow-sm"
                value={team.name}
                onChange={(e) => setTeams(prev => prev.map(t => t.id === team.id ? { ...t, name: e.target.value } : t))}
              />
              <button 
                onClick={() => removeTeam(team.id)} 
                className="ml-2 text-white/70 hover:text-white transition-colors"
                aria-label="Remove Team"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            {/* Score Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-[#0f181e]">
               <span className="text-[10rem] leading-none font-black tabular-nums text-slate-800 dark:text-white drop-shadow-sm select-none">
                 {team.score}
               </span>
            </div>

            {/* Controls */}
            <div className="p-6 bg-white dark:bg-[#111c22] border-t border-slate-100 dark:border-[#233c48]">
               <div className="flex gap-4 mb-6">
                 <button 
                   onClick={() => updateScore(team.id, -1)}
                   className="flex-1 h-16 rounded-2xl bg-slate-100 dark:bg-[#1a2b34] text-slate-600 dark:text-white flex items-center justify-center text-4xl font-bold hover:bg-slate-200 dark:hover:bg-[#233c48] active:scale-95 transition-all shadow-sm"
                 >
                   -
                 </button>
                 <button 
                   onClick={() => updateScore(team.id, 1)}
                   className="flex-1 h-16 rounded-2xl bg-slate-800 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-4xl font-bold hover:bg-slate-700 dark:hover:bg-slate-200 active:scale-95 transition-all shadow-lg"
                 >
                   +
                 </button>
               </div>
               <div className="flex gap-2">
                  <button onClick={() => updateScore(team.id, 5)} className="flex-1 py-3 rounded-lg text-sm font-bold bg-slate-50 dark:bg-[#1a2b34] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#233c48] transition-colors">+5</button>
                  <button onClick={() => updateScore(team.id, 10)} className="flex-1 py-3 rounded-lg text-sm font-bold bg-slate-50 dark:bg-[#1a2b34] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#233c48] transition-colors">+10</button>
               </div>
            </div>
          </div>
        ))}
        {/* Add button at end of scroll as well */}
         <div className="flex-shrink-0 w-[100px] h-[500px] flex items-center justify-center snap-center">
            <button 
               onClick={addTeam}
               className="w-16 h-16 rounded-full bg-slate-200 dark:bg-[#233c48] flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all shadow-lg hover:scale-110"
            >
               <span className="material-symbols-outlined text-3xl">add</span>
            </button>
         </div>
      </div>
    </div>
  );
};