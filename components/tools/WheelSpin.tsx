
import React, { useState, useEffect, useRef } from 'react';
import { ClassGroup } from '../../types';
import { getClasses } from '../../utils/db';

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#FFCC5C', '#FF9671', '#D4A5A5'];

export const WheelSpin: React.FC = () => {
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  
  // Feature states
  const [autoRemove, setAutoRemove] = useState(false);
  const [currentItems, setCurrentItems] = useState<string[]>([]);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const reqRef = useRef<number | null>(null);
  const confettiRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    getClasses().then(data => {
      setClasses(data);
      if (data.length > 0) setSelectedClassId(data[0].id);
    });
  }, []);

  // Sync items when class changes
  useEffect(() => {
    if (!selectedClassId) {
       setCurrentItems(['Prize 1', 'Prize 2', 'Prize 3', 'Prize 4', 'Prize 5', 'Prize 6']);
       return;
    }
    const cls = classes.find(c => c.id === selectedClassId);
    if (cls) {
      setCurrentItems(cls.students.map(s => s.firstName));
    }
  }, [selectedClassId, classes]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) / 2 - 20;
    
    // Fallback if empty
    const itemsToDraw = currentItems.length > 0 ? currentItems : ['Empty'];
    const arc = (Math.PI * 2) / itemsToDraw.length;

    ctx.clearRect(0, 0, width, height);
    
    // Draw segments
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotationRef.current);

    itemsToDraw.forEach((item, i) => {
      const angle = i * arc;
      ctx.beginPath();
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, angle, angle + arc);
      ctx.lineTo(0, 0);
      ctx.fill();
      ctx.stroke();

      // Text
      ctx.save();
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(item.substring(0, 15), radius - 20, 5);
      ctx.restore();
    });
    ctx.restore();

    // Draw Arrow
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.moveTo(cx + 20, cy - radius - 10);
    ctx.lineTo(cx - 20, cy - radius - 10);
    ctx.lineTo(cx, cy - radius + 20);
    ctx.fill();
  };

  useEffect(() => {
    drawWheel();
  }, [currentItems]);

  const fireConfetti = () => {
    const canvas = confettiRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = canvas.parentElement?.clientWidth || 400;
    canvas.height = canvas.parentElement?.clientHeight || 400;

    const particles: any[] = [];
    for(let i=0; i<100; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            size: Math.random() * 5 + 2,
            life: 100
        });
    }

    const animateConfetti = () => {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        let active = false;
        particles.forEach(p => {
            if(p.life > 0) {
                active = true;
                p.x += p.vx;
                p.y += p.vy;
                p.life--;
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, p.size, p.size);
            }
        });
        if(active) requestAnimationFrame(animateConfetti);
        else ctx.clearRect(0,0,canvas.width, canvas.height);
    };
    animateConfetti();
  };

  const animate = () => {
    if (velocityRef.current > 0.001) {
      rotationRef.current += velocityRef.current;
      velocityRef.current *= 0.985; // friction
      drawWheel();
      reqRef.current = requestAnimationFrame(animate);
    } else {
      setIsSpinning(false);
      
      const itemsToDraw = currentItems.length > 0 ? currentItems : ['Empty'];
      const arc = (Math.PI * 2) / itemsToDraw.length;
      const normalizedRot = rotationRef.current % (Math.PI * 2);
      const pointerAngle = (Math.PI * 3 / 2) - normalizedRot;
      const positivePointerAngle = (pointerAngle % (Math.PI * 2) + (Math.PI * 2)) % (Math.PI * 2);
      const winningIndex = Math.floor(positivePointerAngle / arc);
      const winItem = itemsToDraw[winningIndex];
      
      setWinner(winItem);
      fireConfetti();

      if (autoRemove && currentItems.length > 1) {
        setTimeout(() => {
             setCurrentItems(prev => prev.filter(i => i !== winItem));
        }, 2000);
      }
    }
  };

  const spin = () => {
    if (isSpinning || currentItems.length === 0) return;
    setIsSpinning(true);
    setWinner(null);
    velocityRef.current = Math.random() * 0.3 + 0.3; // Initial kick
    if (reqRef.current) cancelAnimationFrame(reqRef.current);
    animate();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto w-full p-4">
      <div className="flex justify-between items-center mb-6 w-full max-w-md gap-4">
        <select 
          value={selectedClassId}
          onChange={(e) => setSelectedClassId(e.target.value)}
          className="bg-white dark:bg-[#1a2b34] border border-slate-200 dark:border-[#233c48] rounded-xl px-4 py-2 font-bold flex-1"
          aria-label="Select Class for Wheel"
        >
          {classes.length === 0 && <option>Demo Mode</option>}
          {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        
        <label className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 cursor-pointer select-none">
            <input 
                type="checkbox" 
                checked={autoRemove} 
                onChange={e => setAutoRemove(e.target.checked)}
                className="w-5 h-5 rounded text-pink-500 focus:ring-pink-500 border-gray-300"
            />
            Remove Winner
        </label>
      </div>

      <div className="relative">
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={400} 
          className="max-w-full h-auto cursor-pointer"
          onClick={spin}
          role="img"
          aria-label={`Spinning wheel with options: ${currentItems.join(', ')}`}
        />
        <canvas 
            ref={confettiRef}
            className="absolute inset-0 pointer-events-none"
        />
        
        {winner && !isSpinning && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/95 dark:bg-black/80 backdrop-blur px-8 py-6 rounded-2xl shadow-2xl transform animate-[popIn_0.4s_ease-out] border-4 border-pink-500 text-center">
              <div className="text-sm text-slate-500 uppercase font-bold mb-1">Winner</div>
              <h3 role="alert" className="text-4xl font-black text-slate-900 dark:text-white">{winner}</h3>
              {autoRemove && <p className="text-xs text-red-400 mt-2 font-bold animate-pulse">Removing...</p>}
            </div>
          </div>
        )}
      </div>

      <button 
        onClick={spin} 
        disabled={isSpinning || currentItems.length === 0}
        className="mt-8 px-12 py-4 bg-pink-500 text-white font-black text-xl rounded-2xl shadow-lg hover:bg-pink-600 disabled:opacity-50 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-pink-400"
      >
        {isSpinning ? 'Spinning...' : 'SPIN'}
      </button>
      
      <p className="mt-4 text-xs text-slate-400">{currentItems.length} items on wheel</p>
    </div>
  );
};
