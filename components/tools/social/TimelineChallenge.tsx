
import React, { useState, useEffect } from 'react';
import { saveToolState, getToolState } from '../../../utils/db';

const TOOL_ID = 'timeline_custom';

const DEFAULT_EVENTS = [
  { id: 1, text: "Pyramids Built", year: -2500 },
  { id: 2, text: "Moon Landing", year: 1969 },
  { id: 3, text: "Printing Press", year: 1440 },
  { id: 4, text: "Wheel Invented", year: -3500 },
];

export const TimelineChallenge: React.FC = () => {
  const [events, setEvents] = useState(DEFAULT_EVENTS);
  const [items, setItems] = useState([...DEFAULT_EVENTS].sort(() => Math.random() - 0.5));
  const [checked, setChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
      getToolState(TOOL_ID).then(data => {
          if(data && data.events) {
              setEvents(data.events);
              setItems(data.events.sort(() => Math.random() - 0.5));
          }
      });
  }, []);

  const saveCustom = (newEvents: any[]) => {
      setEvents(newEvents);
      saveToolState(TOOL_ID, { events: newEvents });
  };

  const move = (idx: number, dir: -1 | 1) => {
     if ((idx === 0 && dir === -1) || (idx === items.length - 1 && dir === 1)) return;
     const newItems = [...items];
     const temp = newItems[idx];
     newItems[idx] = newItems[idx + dir];
     newItems[idx + dir] = temp;
     setItems(newItems);
     setChecked(false);
  };

  const isCorrect = () => {
    for(let i=0; i<items.length-1; i++) {
       if (items[i].year > items[i+1].year) return false;
    }
    return true;
  };

  const shuffle = () => {
      setItems([...events].sort(() => Math.random() - 0.5));
      setChecked(false);
  };

  if (isEditing) {
      return (
          <div className="flex flex-col h-full w-full max-w-2xl mx-auto p-4">
              <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold dark:text-white">Edit Events</h2>
                  <button onClick={() => { setIsEditing(false); shuffle(); }} className="text-primary font-bold">Done</button>
              </div>
              <div className="space-y-2 overflow-y-auto flex-1 pb-4 custom-scrollbar">
                  {events.map((ev, i) => (
                      <div key={ev.id} className="flex gap-2 bg-slate-100 dark:bg-[#1a2b34] p-2 rounded">
                          <input 
                            value={ev.text} 
                            onChange={e => {
                                const newE = [...events];
                                newE[i] = {...newE[i], text: e.target.value};
                                saveCustom(newE);
                            }}
                            className="flex-1 p-2 rounded border dark:border-none" 
                            placeholder="Event Name"
                          />
                          <input 
                            type="number"
                            value={ev.year} 
                            onChange={e => {
                                const newE = [...events];
                                newE[i] = {...newE[i], year: parseInt(e.target.value)};
                                saveCustom(newE);
                            }}
                            className="w-24 p-2 rounded border dark:border-none" 
                            placeholder="Year"
                          />
                          <button onClick={() => saveCustom(events.filter((_, idx) => idx !== i))} className="text-red-500"><span className="material-symbols-outlined">delete</span></button>
                      </div>
                  ))}
                  <button onClick={() => saveCustom([...events, {id: Date.now(), text: "New Event", year: 2000}])} className="w-full py-2 bg-green-500 text-white font-bold rounded">Add Event</button>
              </div>
          </div>
      );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 relative">
       <button onClick={() => setIsEditing(true)} className="absolute top-4 right-4 bg-slate-200 dark:bg-[#233c48] p-2 rounded-full text-slate-600 dark:text-white">
           <span className="material-symbols-outlined">edit</span>
       </button>

       <h2 className="text-2xl font-bold dark:text-white mb-6">Order Oldest (Top) to Newest (Bottom)</h2>
       
       <div className="flex flex-col gap-2 w-full max-w-lg mb-8 overflow-y-auto custom-scrollbar flex-1">
          {items.map((evt, i) => (
             <div key={evt.id} className="flex items-center gap-4 bg-white dark:bg-[#111c22] p-4 rounded-xl shadow-sm border border-slate-200 dark:border-[#233c48] shrink-0">
                <div className="flex flex-col gap-1">
                   <button onClick={() => move(i, -1)} className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined">keyboard_arrow_up</span></button>
                   <button onClick={() => move(i, 1)} className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined">keyboard_arrow_down</span></button>
                </div>
                <div className="flex-1 font-bold text-lg dark:text-white">{evt.text}</div>
                {checked && (
                   <div className="text-sm font-mono font-bold text-slate-500">{evt.year < 0 ? `${Math.abs(evt.year)} BC` : evt.year}</div>
                )}
             </div>
          ))}
       </div>

       <div className="flex gap-4">
           <button onClick={shuffle} className="px-6 py-4 bg-slate-500 text-white font-bold rounded-2xl">Shuffle</button>
           <button 
             onClick={() => setChecked(true)}
             className={`px-12 py-4 text-white font-black rounded-2xl shadow-xl transition-all ${checked ? (isCorrect() ? 'bg-green-500' : 'bg-red-500') : 'bg-amber-600'}`}
           >
              {checked ? (isCorrect() ? 'CORRECT!' : 'INCORRECT ORDER') : 'CHECK TIMELINE'}
           </button>
       </div>
    </div>
  );
};
