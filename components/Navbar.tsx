
import React, { useState, useEffect } from 'react';
import { ImageIcon, Sparkles, UserPlus, Home, BarChart2, HelpCircle, ClipboardList, Clock as ClockIcon, Calendar, Info, Globe } from 'lucide-react';
import { CANDIDATE, LOGOS } from '../constants';

interface NavbarProps {
  activeTab: 'home' | 'frame' | 'ai' | 'results' | 'national' | 'volunteers' | 'guide' | 'join';
  setActiveTab: (tab: 'home' | 'frame' | 'ai' | 'results' | 'national' | 'volunteers' | 'guide' | 'join') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50 border-b border-gray-100">
      <div className="container mx-auto px-2 md:px-4 h-16 md:h-20 flex items-center justify-between gap-2 md:gap-4">
        <div 
          className="flex items-center gap-2 cursor-pointer shrink-0 group"
          onClick={() => setActiveTab('home')}
        >
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center overflow-hidden shadow-md group-hover:scale-110 transition-transform">
            <img src={LOGOS.PARTY} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-black text-[10px] md:text-lg leading-tight text-green-800">{CANDIDATE.name}</h1>
            <p className="text-[7px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest">{CANDIDATE.constituency}</p>
            {/* User Requested: Small Developer Credit in Header */}
            <div className="text-[6px] md:text-[8px] text-gray-400 font-medium mt-0.5 leading-none italic border-t border-gray-100 pt-0.5 mt-1">
              dev by: ওয়ালিদ হাসান তাকসিদ | সদস্য: যুব-জামাত মোরেলগঞ্জ
            </div>
          </div>
        </div>

        {/* Live Clock (Compact for mobile) */}
        <div className="hidden xs:flex items-center gap-2 px-2 py-1 bg-gray-50 rounded-lg border border-gray-100 shadow-inner md:px-6 md:py-2 md:rounded-2xl">
          <div className="flex items-center gap-1 md:gap-1.5 text-green-700 font-black">
            <ClockIcon size={12} className="animate-pulse md:w-5 md:h-5" />
            <span className="text-[8px] md:text-sm tabular-nums">{formatTime(time)}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar py-1 shrink">
          <NavItem icon={<Home size={14} />} label="হোম" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<Globe size={14} />} label="জাতীয়" active={activeTab === 'national'} onClick={() => setActiveTab('national')} />
          <NavItem icon={<BarChart2 size={14} />} label="ফলাফল" active={activeTab === 'results'} onClick={() => setActiveTab('results')} />
          <NavItem icon={<ImageIcon size={14} />} label="পোস্টার" active={activeTab === 'frame'} onClick={() => setActiveTab('frame')} />
          <NavItem icon={<UserPlus size={14} />} label="যোগ" active={activeTab === 'join'} onClick={() => setActiveTab('join')} />
        </div>
      </div>
      <style>{`
        @media (max-width: 400px) {
          .xs\\:hidden { display: none; }
          .xs\\:flex { display: flex; }
        }
      `}</style>
    </nav>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center min-w-[40px] md:min-w-0 md:flex-row gap-0.5 md:gap-1.5 px-2 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl transition-all duration-300 whitespace-nowrap ${
      active 
        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black shadow-md md:scale-105' 
        : 'bg-transparent text-gray-600 hover:bg-gray-50 hover:text-green-700 font-bold'
    }`}
  >
    <span className={`${active ? 'text-white' : 'text-green-600'} md:w-5 md:h-5`}>{icon}</span>
    <span className="text-[7px] md:text-xs tracking-tight">{label}</span>
  </button>
);
