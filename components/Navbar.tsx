
import React, { useState, useEffect } from 'react';
import { ImageIcon, Sparkles, UserPlus, Home, BarChart2, HelpCircle, ClipboardList, Clock as ClockIcon, Calendar } from 'lucide-react';
import { CANDIDATE, LOGOS } from '../constants';

interface NavbarProps {
  activeTab: 'home' | 'frame' | 'ai' | 'results' | 'survey' | 'volunteers' | 'guide' | 'join';
  setActiveTab: (tab: 'home' | 'frame' | 'ai' | 'results' | 'survey' | 'volunteers' | 'guide' | 'join') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        <div 
          className="flex items-center gap-3 cursor-pointer shrink-0 group"
          onClick={() => setActiveTab('home')}
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center overflow-hidden shadow-lg shadow-green-100 group-hover:scale-110 transition-transform">
            <img src={LOGOS.PARTY} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className="hidden lg:block">
            <h1 className="font-black text-lg leading-tight text-green-800">{CANDIDATE.name}</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{CANDIDATE.constituency}</p>
          </div>
        </div>

        {/* Live Clock & Date for All Pages */}
        <div className="hidden md:flex items-center gap-6 px-6 py-2 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner shrink-0">
          <div className="flex items-center gap-2 text-green-700 font-black">
            <ClockIcon size={18} className="animate-pulse" />
            <span className="text-sm tabular-nums">{formatTime(time)}</span>
          </div>
          <div className="h-4 w-px bg-gray-200"></div>
          <div className="flex items-center gap-2 text-gray-600 font-bold">
            <Calendar size={18} />
            <span className="text-xs">{formatDate(time)}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar py-2 shrink">
          <NavItem icon={<Home size={18} />} label="হোম" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<ClipboardList size={18} />} label="জাতীয় ফল" active={activeTab === 'survey'} onClick={() => setActiveTab('survey')} />
          <NavItem icon={<BarChart2 size={18} />} label="বাগেরহাট ৪" active={activeTab === 'results'} onClick={() => setActiveTab('results')} />
          <NavItem icon={<ImageIcon size={18} />} label="এভাটার" active={activeTab === 'frame'} onClick={() => setActiveTab('frame')} />
          <NavItem icon={<UserPlus size={18} />} label="যোগ দিন" active={activeTab === 'join'} onClick={() => setActiveTab('join')} />
          <NavItem icon={<HelpCircle size={18} />} label="গাইড" active={activeTab === 'guide'} onClick={() => setActiveTab('guide')} />
        </div>
      </div>
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
    className={`flex flex-col md:flex-row items-center gap-1 md:gap-1.5 px-2 md:px-4 py-2 rounded-xl transition-all duration-300 whitespace-nowrap ${
      active 
        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black shadow-lg scale-105' 
        : 'bg-transparent text-gray-600 hover:bg-gray-50 hover:text-green-700 font-bold'
    }`}
  >
    <span className={`${active ? 'text-white' : 'text-green-600'}`}>{icon}</span>
    <span className="text-[9px] md:text-xs tracking-tight">{label}</span>
  </button>
);
