import React, { useState } from 'react';

export const TrafficLight: React.FC = () => {
  const [activeLight, setActiveLight] = useState<'red' | 'yellow' | 'green'>('green');

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto w-full p-4">
      <div 
        className="bg-slate-800 p-8 rounded-[3rem] shadow-2xl flex flex-col gap-6 border-8 border-slate-900"
        role="radiogroup"
        aria-label="Traffic Light Controls"
      >
        <button
          role="radio"
          aria-checked={activeLight === 'red'}
          aria-label="Red Light - Stop"
          onClick={() => setActiveLight('red')}
          className={`w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-black/20 transition-all duration-300 ${
            activeLight === 'red' 
              ? 'bg-red-500 shadow-[0_0_60px_rgba(239,68,68,0.6)] scale-105' 
              : 'bg-red-900/50 opacity-50 hover:opacity-75'
          }`}
        />
        <button
          role="radio"
          aria-checked={activeLight === 'yellow'}
          aria-label="Yellow Light - Quiet"
          onClick={() => setActiveLight('yellow')}
          className={`w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-black/20 transition-all duration-300 ${
            activeLight === 'yellow' 
              ? 'bg-yellow-400 shadow-[0_0_60px_rgba(250,204,21,0.6)] scale-105' 
              : 'bg-yellow-900/50 opacity-50 hover:opacity-75'
          }`}
        />
        <button
          role="radio"
          aria-checked={activeLight === 'green'}
          aria-label="Green Light - Go"
          onClick={() => setActiveLight('green')}
          className={`w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-black/20 transition-all duration-300 ${
            activeLight === 'green' 
              ? 'bg-green-500 shadow-[0_0_60px_rgba(34,197,94,0.6)] scale-105' 
              : 'bg-green-900/50 opacity-50 hover:opacity-75'
          }`}
        />
      </div>

      <div className="mt-8 text-center" aria-live="polite">
        <h2 className="text-3xl font-black dark:text-white uppercase tracking-widest">
          {activeLight === 'red' ? 'Stop / Focus' : activeLight === 'yellow' ? 'Whisper / Quiet' : 'Go / Active'}
        </h2>
      </div>
    </div>
  );
};