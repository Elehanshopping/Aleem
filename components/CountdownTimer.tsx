
import React, { useState, useEffect } from 'react';
import { ELECTION_DATE } from '../constants';
import { Clock } from 'lucide-react';

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{ d: number, h: number, m: number, s: number } | null>(null);

  useEffect(() => {
    const target = new Date(ELECTION_DATE).getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft(null);
      } else {
        setTimeLeft({
          d: Math.floor(difference / (1000 * 60 * 60 * 24)),
          h: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return (
    <div className="bg-red-600 text-white p-6 rounded-3xl text-center font-bold text-2xl animate-pulse">
      ভোট গ্রহণ চলছে... আপনার মূল্যবান ভোট প্রদান করুন!
    </div>
  );

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[40px] shadow-2xl">
      <div className="flex items-center justify-center gap-3 mb-6 text-green-300">
        <Clock size={24} />
        <span className="font-bold uppercase tracking-widest text-sm">ভোট শুরুর বাকি</span>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <TimeUnit value={timeLeft.d} label="দিন" />
        <TimeUnit value={timeLeft.h} label="ঘণ্টা" />
        <TimeUnit value={timeLeft.m} label="মিনিট" />
        <TimeUnit value={timeLeft.s} label="সেকেন্ড" />
      </div>
    </div>
  );
};

const TimeUnit: React.FC<{ value: number, label: string }> = ({ value, label }) => (
  <div className="text-center">
    <div className="text-3xl md:text-5xl font-black text-white">{value.toString().padStart(2, '0')}</div>
    <div className="text-[10px] md:text-xs text-green-200 uppercase font-bold mt-1">{label}</div>
  </div>
);
