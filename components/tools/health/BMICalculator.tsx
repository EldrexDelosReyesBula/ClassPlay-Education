import React, { useState } from 'react';

export const BMICalculator: React.FC = () => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h) return;

    let val = 0;
    if (unit === 'metric') {
      // kg / m^2 (h is usually cm)
      val = w / Math.pow(h / 100, 2);
    } else {
      // (lbs / in^2) * 703
      val = (w / Math.pow(h, 2)) * 703;
    }
    setBmi(val);
  };

  const getCategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-blue-500' };
    if (val < 25) return { label: 'Healthy Weight', color: 'text-green-500' };
    if (val < 30) return { label: 'Overweight', color: 'text-orange-500' };
    return { label: 'Obese', color: 'text-red-500' };
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
      <div className="w-full max-w-lg bg-white dark:bg-[#111c22] p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-[#233c48]">
        <h2 className="text-2xl font-black dark:text-white mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-teal-500">monitor_weight</span>
          BMI Calculator
        </h2>

        <div className="flex gap-2 mb-6 bg-slate-100 dark:bg-[#1a2b34] p-1 rounded-xl">
           <button onClick={() => setUnit('metric')} className={`flex-1 py-2 rounded-lg font-bold text-sm ${unit === 'metric' ? 'bg-white dark:bg-[#233c48] shadow text-teal-600' : 'text-slate-500'}`}>Metric (kg/cm)</button>
           <button onClick={() => setUnit('imperial')} className={`flex-1 py-2 rounded-lg font-bold text-sm ${unit === 'imperial' ? 'bg-white dark:bg-[#233c48] shadow text-teal-600' : 'text-slate-500'}`}>Imperial (lbs/in)</button>
        </div>

        <div className="space-y-4 mb-8">
           <div>
             <label className="text-xs font-bold text-slate-500 uppercase">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
             <input 
               type="number" 
               value={weight}
               onChange={e => setWeight(e.target.value)}
               className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#1a2b34] border-none font-bold dark:text-white focus:ring-2 focus:ring-teal-500"
               placeholder="0"
             />
           </div>
           <div>
             <label className="text-xs font-bold text-slate-500 uppercase">Height ({unit === 'metric' ? 'cm' : 'inches'})</label>
             <input 
               type="number" 
               value={height}
               onChange={e => setHeight(e.target.value)}
               className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#1a2b34] border-none font-bold dark:text-white focus:ring-2 focus:ring-teal-500"
               placeholder="0"
             />
           </div>
        </div>

        <button onClick={calculate} className="w-full py-4 bg-teal-500 text-white font-black rounded-xl shadow-lg hover:bg-teal-600 transition-transform active:scale-95">CALCULATE</button>

        {bmi !== null && (
          <div className="mt-8 text-center animate-[popIn_0.3s]">
             <div className="text-xs text-slate-400 font-bold uppercase">Your BMI</div>
             <div className="text-5xl font-black text-slate-800 dark:text-white mb-2">{bmi.toFixed(1)}</div>
             <div className={`text-xl font-bold ${getCategory(bmi).color}`}>{getCategory(bmi).label}</div>
          </div>
        )}
      </div>
    </div>
  );
};
