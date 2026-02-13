import React, { useState } from 'react';

export const QuestionBag: React.FC = () => {
    const [questions, setQuestions] = useState<string[]>([]);
    const [input, setInput] = useState("");
    const [drawn, setDrawn] = useState<string | null>(null);

    const add = () => {
        if(input.trim()) {
            setQuestions([...questions, input.trim()]);
            setInput("");
        }
    };

    const draw = () => {
        if(questions.length === 0) return;
        const idx = Math.floor(Math.random() * questions.length);
        setDrawn(questions[idx]);
        setQuestions(questions.filter((_, i) => i !== idx));
    };

    return (
        <div className="flex flex-col h-full w-full max-w-4xl mx-auto p-4">
            <div className="flex gap-8 h-full">
                {/* Input Side */}
                <div className="w-1/3 bg-white dark:bg-[#111c22] rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-[#233c48] flex flex-col">
                    <h3 className="font-bold dark:text-white mb-4">Bag Contents ({questions.length})</h3>
                    <div className="flex gap-2 mb-4">
                        <input 
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && add()}
                            className="flex-1 rounded-lg border-slate-200 dark:bg-[#1a2b34] dark:border-none dark:text-white px-3 py-2 text-sm"
                            placeholder="Type question..."
                        />
                        <button onClick={add} className="bg-primary text-white rounded-lg px-3 font-bold">+</button>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
                        {questions.map((q, i) => (
                            <div key={i} className="bg-slate-50 dark:bg-[#1a2b34] p-2 rounded text-xs dark:text-slate-300 break-words">
                                {q}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Draw Side */}
                <div className="flex-1 flex flex-col items-center justify-center relative">
                    {drawn && (
                         <div className="absolute top-10 left-0 right-0 text-center animate-[popIn_0.3s]">
                             <div className="bg-white dark:bg-[#111c22] p-8 rounded-3xl shadow-2xl border-2 border-amber-500 inline-block max-w-md">
                                 <h2 className="text-2xl font-bold dark:text-white">{drawn}</h2>
                             </div>
                         </div>
                    )}
                    
                    <button 
                        onClick={draw}
                        disabled={questions.length === 0}
                        className="group relative w-64 h-64 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="material-symbols-outlined text-[250px] text-amber-600 drop-shadow-2xl">shopping_bag</span>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-black text-2xl uppercase mt-8 group-hover:-translate-y-20 transition-transform">
                            {questions.length > 0 ? 'DRAW' : 'EMPTY'}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};
