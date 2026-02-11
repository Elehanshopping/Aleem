
import React from 'react';
import { Image as ImageIcon, Sparkles, User, Home, BarChart2, ShieldCheck, HelpCircle } from 'lucide-react';
import { CANDIDATE } from '../constants';

interface NavbarProps {
  activeTab: 'home' | 'frame' | 'ai' | 'results' | 'volunteers' | 'guide';
  setActiveTab: (tab: 'home' | 'frame' | 'ai' | 'results' | 'volunteers' | 'guide') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer shrink-0 group"
          onClick={() => setActiveTab('home')}
        >
          <div className="w-11 h-11 bg-gradient-to-br from-green-700 to-emerald-800 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-green-200 group-hover:scale-110 transition-transform">
            BA
          </div>
          <div className="hidden lg:block">
            <h1 className="font-black text-lg leading-tight text-green-800">{CANDIDATE.name}</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{CANDIDATE.constituency}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 md:gap-3 overflow-x-auto no-scrollbar py-2">
          <NavItem icon={<Home size={18} />} label="হোম" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<ImageIcon size={18} />} label="এভাটার" active={activeTab === 'frame'} onClick={() => setActiveTab('frame')} />
          <NavItem icon={<BarChart2 size={18} />} label="ফলাফল" active={activeTab === 'results'} onClick={() => setActiveTab('results')} />
          <NavItem icon={<ShieldCheck size={18} />} label="ভলান্টিয়ার" active={activeTab === 'volunteers'} onClick={() => setActiveTab('volunteers')} />
          <NavItem icon={<HelpCircle size={18} />} label="গণভোট কী" active={activeTab === 'guide'} onClick={() => setActiveTab('guide')} />
          <NavItem icon={<Sparkles size={18} />} label="AI পোস্ট" active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} />
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
    className={`flex flex-col md:flex-row items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2.5 rounded-2xl transition-all duration-300 whitespace-nowrap ${
      active 
        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black shadow-[0_10px_20px_-5px_rgba(16,185,129,0.3)] scale-105 border-b-4 border-green-800' 
        : 'bg-gray-50 text-gray-700 hover:bg-white hover:text-green-700 font-bold border border-gray-200 shadow-sm hover:shadow-md hover:scale-105'
    }`}
  >
    <span className={`${active ? 'text-white' : 'text-green-600'}`}>{icon}</span>
    <span className="text-[10px] md:text-sm tracking-tight">{label}</span>
  </button>
);
