import React, { useState, useEffect, useRef } from 'react';

export const NoiseLevel: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [level, setLevel] = useState(0);
  const [error, setError] = useState('');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const frameRef = useRef<number | null>(null);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;
      
      setIsListening(true);
      setError('');
      updateLevel();
    } catch (err) {
      setError('Microphone access denied or not available.');
      console.error(err);
    }
  };

  const stopListening = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (audioContextRef.current) audioContextRef.current.close();
    setIsListening(false);
    setLevel(0);
  };

  const updateLevel = () => {
    if (!analyserRef.current) return;
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    // Average
    const sum = dataArray.reduce((a, b) => a + b, 0);
    const avg = sum / dataArray.length;
    // Normalize roughly 0-100
    const normalized = Math.min(100, Math.max(0, (avg / 128) * 100));
    
    setLevel(l => l + (normalized - l) * 0.2); // smooth
    
    frameRef.current = requestAnimationFrame(updateLevel);
  };

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto w-full p-4">
      <div className="relative w-40 h-[300px] bg-slate-200 dark:bg-[#1a2b34] rounded-full overflow-hidden border-4 border-slate-300 dark:border-[#233c48] mb-8">
        {/* Fill */}
        <div 
          className={`absolute bottom-0 w-full transition-all duration-75 ease-linear ${level > 80 ? 'bg-red-500' : level > 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
          style={{ height: `${level}%` }}
        ></div>
        {/* Markers */}
        <div className="absolute top-[20%] w-full border-t border-slate-400/30"></div>
        <div className="absolute top-[50%] w-full border-t border-slate-400/30"></div>
        <div className="absolute top-[80%] w-full border-t border-slate-400/30"></div>
      </div>

      <h2 className="text-4xl font-black tabular-nums dark:text-white mb-8">{Math.round(level)}%</h2>

      {error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-4">{error}</div>
      ) : (
        <button 
          onClick={isListening ? stopListening : startListening}
          className={`px-12 py-4 rounded-2xl text-xl font-bold shadow-xl transition-all active:scale-95 ${isListening ? 'bg-red-500 text-white' : 'bg-primary text-white'}`}
        >
          {isListening ? 'Stop Monitor' : 'Start Monitor'}
        </button>
      )}
      <p className="mt-4 text-slate-500 text-sm">Microphone permission required</p>
    </div>
  );
};