
import React, { useState, useRef } from 'react';

const BADGES = [
  { icon: 'military_tech', label: 'Leader', color: 'text-yellow-500' },
  { icon: 'psychology', label: 'Thinker', color: 'text-blue-500' },
  { icon: 'favorite', label: 'Kindness', color: 'text-pink-500' },
  { icon: 'bolt', label: 'Energy', color: 'text-orange-500' },
  { icon: 'palette', label: 'Creative', color: 'text-purple-500' },
  { icon: 'verified', label: 'On Task', color: 'text-green-500' },
  { icon: 'thumb_up', label: 'Good Job', color: 'text-blue-400' },
  { icon: 'star', label: 'Star', color: 'text-yellow-400' },
  { icon: 'workspace_premium', label: 'Expert', color: 'text-red-500' },
  { icon: 'emoji_events', label: 'Winner', color: 'text-amber-500' },
  { icon: 'rocket', label: 'Great', color: 'text-purple-400' },
  { icon: 'sentiment_very_satisfied', label: 'Nice', color: 'text-green-400' },
];

export const VirtualBadge: React.FC = () => {
  const [awarded, setAwarded] = useState<{icon:string, label:string, color:string} | null>(null);
  const [studentName, setStudentName] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const downloadBadge = () => {
      const canvas = canvasRef.current;
      if (!canvas || !awarded) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw Background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0,0,500,500);
      
      // Draw Border
      ctx.strokeStyle = awarded.color === 'text-yellow-500' ? '#eab308' : '#3b82f6'; // Simplify logic or map colors
      ctx.lineWidth = 20;
      ctx.strokeRect(20,20,460,460);

      // Text
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 40px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(awarded.label.toUpperCase() + " AWARD", 250, 100);

      ctx.fillStyle = "#334155";
      ctx.font = "30px sans-serif";
      ctx.fillText("Presented to:", 250, 350);

      ctx.fillStyle = "#000000";
      ctx.font = "bold 50px sans-serif";
      ctx.fillText(studentName || "Student", 250, 420);

      // Icon placeholder (Canvas text symbol)
      // Material symbols font might not load in canvas without explicit loading, simple fallback text for now or simple shapes
      ctx.font = "150px sans-serif";
      ctx.fillText("⭐", 250, 250); 

      const link = document.createElement('a');
      link.download = `badge-${studentName || 'student'}.png`;
      link.href = canvas.toDataURL();
      link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 overflow-y-auto">
       <canvas ref={canvasRef} width={500} height={500} className="hidden" />
       
       {awarded ? (
          <div className="text-center animate-[popIn_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]">
             <div className="mb-4">
               <span className={`material-symbols-outlined text-[150px] ${awarded.color} drop-shadow-xl`}>{awarded.icon}</span>
             </div>
             <h2 className="text-4xl font-black dark:text-white mb-2">{awarded.label} Award!</h2>
             
             <input 
               value={studentName}
               onChange={e => setStudentName(e.target.value)}
               placeholder="Student Name"
               className="mt-4 px-4 py-2 rounded-lg border text-center font-bold text-xl block mx-auto dark:bg-[#1a2b34] dark:text-white"
             />

             <div className="flex gap-4 justify-center mt-8">
                 <button onClick={() => setAwarded(null)} className="px-8 py-3 bg-slate-200 dark:bg-[#1a2b34] rounded-xl font-bold text-slate-700 dark:text-white">Back</button>
                 <button onClick={downloadBadge} className="px-8 py-3 bg-blue-500 text-white rounded-xl font-bold flex items-center gap-2">
                     <span className="material-symbols-outlined">download</span> Save
                 </button>
             </div>
          </div>
       ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl pb-10">
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
