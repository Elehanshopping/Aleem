
import React from 'react';
import { CANDIDATE, ALIM_IMAGES, LOGOS } from '../constants';
import { ArrowRight, UserPlus } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';

export const Hero: React.FC<{ onGetStarted: () => void, onJoinClick: () => void }> = ({ onGetStarted, onJoinClick }) => {
  return (
    <section className="relative min-h-[95vh] flex items-center bg-[#004d3b] overflow-hidden pt-10">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-green-400 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-3/5 text-white space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-sm font-black tracking-widest uppercase text-green-300">
              <img src={LOGOS.SCALE} alt="Daris Palla" className="w-8 h-8 object-contain" />
              দাঁড়িপাল্লা মার্কায় ভোট দিন
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black leading-[1.05] tracking-tighter">
              ইনসাফের প্রতীক <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-100 to-white">দাঁড়িপাল্লা</span>
            </h1>
            
            <p className="text-xl md:text-3xl text-green-50/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              বাগেরহাট-৪ এর উজ্জ্বল নক্ষত্র, <br className="hidden md:block" />
              <span className="text-white font-black border-b-8 border-red-600 pb-1">{CANDIDATE.name}</span>
            </p>

            <div className="max-w-md mx-auto lg:mx-0 py-8 space-y-6">
              <CountdownTimer />
              <button 
                onClick={onJoinClick}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-green-950 py-5 rounded-3xl font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 animate-bounce"
              >
                <UserPlus size={24} /> এখনই সদস্য হোন
              </button>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              <button 
                onClick={onGetStarted}
                className="bg-white text-green-900 px-10 py-5 rounded-3xl font-black shadow-2xl hover:bg-green-50 transition-all hover:scale-105 active:scale-95 flex items-center gap-4 text-lg group"
              >
                নিজের এভাটার তৈরি করুন
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-3xl font-black hover:bg-white/10 transition-all backdrop-blur-sm text-lg flex items-center gap-3">
                <img src={LOGOS.PARTY} alt="Party Logo" className="w-8 h-8" /> প্রচারণা
              </button>
            </div>
          </div>

          <div className="lg:w-2/5 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-8 bg-green-500/30 rounded-[60px] blur-3xl group-hover:bg-green-500/40 transition-all"></div>
              <div className="relative w-80 h-[500px] md:w-[450px] md:h-[620px] bg-white p-4 rounded-[48px] shadow-2xl transform lg:rotate-2 group-hover:rotate-0 transition-transform duration-700 ease-out">
                <div className="w-full h-full overflow-hidden rounded-[36px] relative">
                  <img 
                    src={ALIM_IMAGES.portrait_bg} 
                    alt={CANDIDATE.name}
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-transparent to-transparent"></div>
                </div>
                <div className="absolute -bottom-8 -left-8 bg-red-600 text-white p-8 rounded-[40px] shadow-2xl transform -rotate-12 group-hover:rotate-0 transition-all border-4 border-white">
                  <div className="text-xs font-black uppercase tracking-[0.3em] opacity-80 mb-1">প্রতীক</div>
                  <div className="text-3xl font-black flex items-center gap-3">
                    দাঁড়িপাল্লা <img src={LOGOS.SCALE} alt="Logo" className="w-10 h-10 object-contain invert brightness-0" />
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-white text-green-800 p-5 rounded-3xl shadow-xl font-black border-2 border-green-50 flex flex-col items-center">
                  <img src={LOGOS.PARTY} alt="Logo" className="w-10 h-10 mb-2 object-contain" />
                  <div className="text-[11px] leading-tight text-center uppercase tracking-tighter">বাংলাদেশ জামায়াতে ইসলামী<br/>মনোনীত</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
