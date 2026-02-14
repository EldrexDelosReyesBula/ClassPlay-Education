
import React, { useState } from 'react';

const EMOJIS = [
    "😀","🚀","🌈","🍕","🐉","🎩","🎸","🏝️","⏰","💡","📸","🎈","🚗","🏰","👻","🤖","🐱","🌺","⛈️","🎁","🔑","🚪","🧸","📚","🔭","🎨","🧶","🏆",
    "👽","🦄","🧜‍♀️","🧛‍♂️","🧟","🧞‍♂️","🧚","🧝","🧙","🦸","🦹","🕵️","👮","🧑‍🚀","🧑‍🚒","🧑‍🔬","🧑‍✈️","🧑‍🍳","🧑‍🔧","🧑‍🏭","🧑‍🏫","🧑‍🌾","🧑‍🎨","🧑‍🎤",
    "🦁","🐯","🐻","🐨","🐼","🐸","🐙","🦋","🐞","🕸️","🦂","🦟","🦠","💐","🌸","🌹","🌻","🌼","🌷","🌱","🌲","🌳","🌴","🌵","🌾","🌿","☘️",
    "🌍","🌎","🌏","🌙","☀️","⭐","🌟","🌠","☁️","","⛈️","🌤️","🌥️","🌦️","🌧️","🌨️","🌩️","🌪️","🌫️","🌬️","🌀","🌈","🌂","☂️","☔","⛱️","⚡","❄️"
];

export const EmojiStory: React.FC = () => {
    const [story, setStory] = useState<string[]>([]);
    
    const generate = () => {
        const count = 3;
        const newStory = [];
        for(let i=0; i<count; i++) {
            newStory.push(EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);
        }
        setStory(newStory);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-4">
            <div className="flex gap-4 mb-12">
                {story.length > 0 ? story.map((e, i) => (
                    <div key={i} className="w-32 h-32 bg-white dark:bg-[#1a2b34] rounded-3xl shadow-xl flex items-center justify-center text-7xl animate-[popIn_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)]" style={{animationDelay: `${i*0.1}s`}}>
                        {e}
                    </div>
                )) : (
                     <div className="text-slate-400 text-xl font-bold">Press Generate to create a story prompt</div>
                )}
            </div>
            
            <button 
                onClick={generate}
                className="px-12 py-4 bg-yellow-500 text-white font-black text-2xl rounded-2xl shadow-xl hover:bg-yellow-600 transition-transform active:scale-95"
            >
                GENERATE STORY
            </button>
        </div>
    );
};
