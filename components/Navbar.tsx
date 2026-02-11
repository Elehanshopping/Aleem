
import React from 'react';
import { Image as ImageIcon, Sparkles, User, Home, BarChart2, ShieldCheck, HelpCircle } from 'lucide-react';
import { CANDIDATE } from '../constants';

interface NavbarProps {
  activeTab: 'home' | 'frame' | 'ai' | 'results' | 'volunteers' | 'guide';
  setActiveTab: (tab: 'home' | 'frame' | 'ai' | 'results' | 'volunteers' | 'guide') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer shrink-0"
          onClick={() => setActiveTab('home')}
        >
          <div className="w-10 h-10 bg-green-700 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-green-200">
            BA
          </div>
          <div className="hidden lg:block">
            <h1 className="font-black text-lg leading-tight text-green-800">{CANDIDATE.name}</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{CANDIDATE.constituency}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <NavItem icon={<Home size={18} />} label="হোম" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<ImageIcon size={18} />} label="এভাটার" active={activeTab === 'frame'} onClick={() => setActiveTab('frame')} />
          <NavItem icon={<BarChart2 size={18} />} label="ফলাফল" active={activeTab === 'results'} onClick={() => setActiveTab('results')} />
          <NavItem icon={<ShieldCheck size={18} />} label="ভলান্টিয়ার" active={activeTab === 'volunteers'} onClick={() => setActiveTab('volunteers')} />
          <NavItem icon={<HelpCircle size={18} />} label="নির্দেশিকা" active={activeTab === 'guide'} onClick={() => setActiveTab('guide')} />
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
    className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-2 md:px-4 py-2 rounded-xl transition-all ${
      active ? 'bg-green-600 text-white font-bold shadow-lg shadow-green-200 scale-105' : 'text-gray-500 hover:bg-gray-100 font-medium'
    }`}
  >
    {icon}
    <span className="text-[10px] md:text-sm">{label}</span>
  </button>
);
