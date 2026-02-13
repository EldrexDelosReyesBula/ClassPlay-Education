import React, { useState, useRef } from 'react';

export const ReactionGame: React.FC = () => {
    const [state, setState] = useState<'idle' | 'waiting' | 'ready' | 'result'>('idle');
    const [time, setTime] = useState(0);
    const startTime = useRef(0);
    const timeout = useRef<number | null>(null);

    const start = () => {
        setState('waiting');
        const delay = Math.random() * 2000 + 1000;
        timeout.current = window.setTimeout(() => {
            setState('ready');
            startTime.current = Date.now();
        }, delay);
    };

    const handleClick = () => {
        if (state === 'waiting') {
            if (timeout.current) clearTimeout(timeout.current);
            setState('idle');
            alert("Too early!");
        } else if (state === 'ready') {
            const diff = Date.now() - startTime.current;
            setTime(diff);
            setState('result');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-4">
             <div 
                className={`w-full max-w-2xl aspect-video rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-colors shadow-2xl select-none ${
                    state === 'idle' ? 'bg-slate-200 dark:bg-[#1a2b34] hover:bg-slate-300' :
                    state === 'waiting' ? 'bg-red-500' :
                    state === 'ready' ? 'bg-green-500' :
                    'bg-blue-500'
                }`}
                onMouseDown={handleClick}
                onClick={state === 'idle' || state === 'result' ? start : undefined}
             >
                 {state === 'idle' && <h2 className="text-4xl font-black text-slate-500">CLICK TO START</h2>}
                 {state === 'waiting' && <h2 className="text-4xl font-black text-white">WAIT FOR GREEN...</h2>}
                 {state === 'ready' && <h2 className="text-6xl font-black text-white scale-110">CLICK!</h2>}
                 {state === 'result' && (
                     <div className="text-center text-white">
                         <h2 className="text-8xl font-black mb-2">{time}ms</h2>
                         <p className="font-bold opacity-80">Click to try again</p>
                     </div>
                 )}
             </div>
        </div>
    );
};
