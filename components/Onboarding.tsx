
import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      icon: "waving_hand",
      color: "text-yellow-500",
      title: "Welcome to ClassPlay",
      desc: "Your new digital Swiss Army Knife for the classroom. Engaging games, fair pickers, and useful utilities—all in one place."
    },
    {
      icon: "group_add",
      color: "text-green-500",
      title: "Create Your Class",
      desc: "Start by creating a class list in the sidebar. This unlocks powerful tools like the Random Picker, Team Maker, and Scoreboard."
    },
    {
      icon: "offline_bolt",
      color: "text-blue-500",
      title: "Works Offline",
      desc: "ClassPlay saves everything to your device. No internet required after the first load, and no data leaves your computer."
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />
      
      <div className="relative bg-white dark:bg-[#111c22] w-full max-w-md rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center animate-[popIn_0.4s_ease-out]">
        
        {/* Progress Dots */}
        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-[250px]">
           <span className={`material-symbols-outlined text-8xl mb-6 ${steps[step].color} animate-[popIn_0.3s]`}>
             {steps[step].icon}
           </span>
           <h2 className="text-3xl font-black dark:text-white mb-4 animate-[fadeIn_0.5s]">{steps[step].title}</h2>
           <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed animate-[fadeIn_0.5s]">
             {steps[step].desc}
           </p>
        </div>

        {/* Controls */}
        <div className="w-full mt-8 flex gap-4">
          <button 
            onClick={onComplete}
            className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-[#1a2b34] rounded-xl transition-colors"
          >
            Skip
          </button>
          <button 
            onClick={handleNext}
            className="flex-[2] py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:brightness-110 active:scale-95 transition-all"
          >
            {step === steps.length - 1 ? "Let's Go!" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};
