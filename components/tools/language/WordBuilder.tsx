import React, { useState, useEffect } from 'react';
import { saveToolState, getToolState } from '../../../utils/db';

const DEFAULT_WORDS = ["APPLE", "BEACH", "CHAIR", "DANCE", "EAGLE", "FLAME", "GRAPE", "HOUSE", "IMAGE", "JUMP", "KITE", "LEMON"];
const TOOL_ID = 'word_builder';

export const WordBuilder: React.FC = () => {
  const [wordList, setWordList] = useState<string[]>(DEFAULT_WORDS);
  const [target, setTarget] = useState("");
  const [scrambled, setScrambled] = useState("");
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<'playing'|'won'|'editing'>('playing');
  const [editInput, setEditInput] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
      const saved = await getToolState(TOOL_ID);
      if (saved && saved.words && saved.words.length > 0) {
          setWordList(saved.words);
          startGame(saved.words);
      } else {
          startGame(DEFAULT_WORDS);
      }
  };

  const startGame = (words: string[]) => {
    const w = words[Math.floor(Math.random() * words.length)];
    setTarget(w);
    setScrambled(w.split('').sort(() => 0.5 - Math.random()).join(''));
    setInput("");
    setStatus('playing');
  };

  const nextWord = () => {
    startGame(wordList);
  };

  const check = (val: string) => {
    const upper = val.toUpperCase();
    setInput(upper);
    if (upper === target) setStatus('won');
  };

  const addWord = () => {
      if (!editInput.trim()) return;
      const clean = editInput.trim().toUpperCase().replace(/[^A-Z]/g, '');
      if (clean.length < 3) {
          alert("Word too short");
          return;
      }
      const newList = [...wordList, clean];
      setWordList(newList);
      saveToolState(TOOL_ID, { words: newList });
      setEditInput("");
  };

  const removeWord = (word: string) => {
      const newList = wordList.filter(w => w !== word);
      setWordList(newList);
      saveToolState(TOOL_ID, { words: newList });
  };

  if (status === 'editing') {
      return (
          <div className="flex flex-col h-full w-full max-w-2xl mx-auto p-4">
              <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold dark:text-white">Edit Word List</h2>
                  <button onClick={() => { setStatus('playing'); nextWord(); }} className="px-4 py-2 bg-green-500 text-white rounded-lg font-bold">Done</button>
              </div>
              
              <div className="flex gap-2 mb-4">
                  <input 
                    value={editInput}
                    onChange={e => setEditInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addWord()}
                    placeholder="Enter new word..."
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:bg-[#1a2b34] dark:border-none dark:text-white"
                  />
                  <button onClick={addWord} className="px-6 bg-primary text-white rounded-xl font-bold">Add</button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50 dark:bg-[#1a2b34] rounded-xl p-2 space-y-2">
                  {wordList.map((w, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-white dark:bg-[#111c22] rounded-lg shadow-sm">
                          <span className="font-bold dark:text-white tracking-widest">{w}</span>
                          <button onClick={() => removeWord(w)} className="text-red-400 hover:text-red-600">
                              <span className="material-symbols-outlined">delete</span>
                          </button>
                      </div>
                  ))}
                  {wordList.length === 0 && <p className="text-center text-slate-400 p-4">No words. Add some!</p>}
              </div>
              <div className="mt-4 text-center">
                   <button 
                     onClick={() => {
                         if(window.confirm("Reset to default words?")) {
                             setWordList(DEFAULT_WORDS);
                             saveToolState(TOOL_ID, { words: DEFAULT_WORDS });
                         }
                     }} 
                     className="text-xs text-slate-400 hover:text-red-400"
                   >
                       Reset Defaults
                   </button>
              </div>
          </div>
      );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 text-center relative">
       <button 
         onClick={() => setStatus('editing')}
         className="absolute top-0 right-4 text-slate-400 hover:text-primary flex items-center gap-1 text-sm font-bold"
       >
         <span className="material-symbols-outlined text-lg">edit</span> List
       </button>

       <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Unscramble the Word</h2>
       
       <div className="flex flex-wrap justify-center gap-4 mb-12">
          {scrambled.split('').map((char, i) => (
             <div key={i} className="w-14 h-14 md:w-20 md:h-20 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-200 rounded-xl flex items-center justify-center text-3xl md:text-4xl font-black shadow-sm animate-[popIn_0.3s]" style={{animationDelay: `${i*0.05}s`}}>
                {char}
             </div>
          ))}
       </div>

       {status === 'won' ? (
         <div className="animate-[popIn_0.3s]">
            <h3 className="text-4xl font-bold text-green-500 mb-6">Correct!</h3>
            <button onClick={nextWord} className="px-8 py-3 bg-slate-800 dark:bg-white dark:text-black text-white font-bold rounded-xl shadow-lg">Next Word</button>
         </div>
       ) : (
         <input 
           value={input}
           onChange={e => check(e.target.value)}
           maxLength={target.length}
           className="text-center text-4xl tracking-[0.5em] font-bold uppercase border-b-4 border-slate-300 dark:border-[#233c48] bg-transparent focus:outline-none focus:border-yellow-500 dark:text-white w-full max-w-md py-4 transition-colors"
           placeholder={target.split('').map(() => '_').join(' ')}
           autoFocus
         />
       )}
    </div>
  );
};