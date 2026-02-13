import React, { useState } from 'react';

const BADGES = [
  { icon: 'military_tech', label: 'Leader', color: 'text-yellow-500' },
  { icon: 'psychology', label: 'Thinker', color: 'text-blue-500' },
  { icon: 'favorite', label: 'Kindness', color: 'text-pink-500' },
  { icon: 'bolt', label: 'Energy', color: 'text-orange-500' },
  { icon: 'palette', label: 'Creative', color: 'text-purple-500' },
  { icon: 'verified', label: 'On Task', color: 'text-green-500' },
];

export const VirtualBadge: React.FC = () => {
  const [awarded, setAwarded] = useState<{icon:string, label:string, color:string} | null>(null);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
       {awarded ? (
          <div className="text-center animate-[popIn_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]">
             <div className="mb-4">
               <span className={`material-symbols-outlined text-[150px] ${awarded.color} drop-shadow-xl`}>{awarded.icon}</span>
             </div>
             <h2 className="text-4xl font-black dark:text-white mb-2">{awarded.label} Award!</h2>
             <p className="text-slate-500 mb-8">Great job!</p>
             <button onClick={() => setAwarded(null)} className="px-8 py-3 bg-slate-200 dark:bg-[#1a2b34] rounded-xl font-bold text-slate-700 dark:text-white">Back</button>
          </div>
       ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl">
             {BADGES.map((b, i) => (
                <button 
                  key={i}
                  onClick={() => setAwarded(b)}
                  className="bg-white dark:bg-[#1a2b34] p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center border border-slate-100 dark:border-[#233c48]"
                >
                   <span className={`material-symbols-outlined text-6xl mb-2 ${b.color}`}>{b.icon}</span>
                   <span className="font-bold dark:text-white">{b.label}</span>
                </button>
             ))}
          </div>
       )}
    </div>
  );
};