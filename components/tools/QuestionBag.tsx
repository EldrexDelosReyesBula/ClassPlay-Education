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

    const remove = (index: number) => {
        if (window.confirm("Are you sure you want to delete this question?")) {
            setQuestions(questions.filter((_, i) => i !== index));
        }
    };

    return (
        <div className="flex flex-col h-full w-full max-w-4xl mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-8 h-full">
                {/* Input Side */}
                <div className="w-full md:w-1/3 bg-white dark:bg-[#111c22] rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-[#233c48] flex flex-col h-1/2 md:h-full">
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
                            <div key={i} className="bg-slate-50 dark:bg-[#1a2b34] p-2 rounded text-xs dark:text-slate-300 break-words flex justify-between items-center group">
                                <span>{q}</span>
                                <button 
                                    onClick={() => remove(i)} 
                                    className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <span className="material-symbols-outlined text-sm">close</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Draw Side */}
                <div className="flex-1 flex flex-col items-center justify-center relative min-h-[300px]">
                    {drawn && (
                         <div className="absolute top-0 left-0 right-0 text-center animate-[popIn_0.3s] z-10">
                             <div className="bg-white dark:bg-[#111c22] p-6 md:p-8 rounded-3xl shadow-2xl border-2 border-amber-500 inline-block max-w-md mx-4">
                                 <h2 className="text-xl md:text-2xl font-bold dark:text-white">{drawn}</h2>
                             </div>
                         </div>
                    )}
                    
                    <button 
                        onClick={draw}
                        disabled={questions.length === 0}
                        className="group relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="material-symbols-outlined text-[180px] md:text-[250px] text-amber-600 drop-shadow-2xl">shopping_bag</span>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-black text-2xl uppercase mt-8 group-hover:-translate-y-20 transition-transform">
                            {questions.length > 0 ? 'DRAW' : 'EMPTY'}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};
