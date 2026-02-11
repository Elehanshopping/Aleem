
import React from 'react';
import { CANDIDATE, ALIM_IMAGES, LOGOS } from '../constants';
import { ArrowRight, UserPlus, ShieldCheck, Sparkles, Wand2, Star, CheckCircle2 } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';

export const Hero: React.FC<{ onGetStarted: () => void, onJoinClick: () => void }> = ({ onGetStarted, onJoinClick }) => {
  return (
    <section className="relative min-h-[100vh] flex items-center bg-gradient-to-b from-[#004d3b] to-[#002d1e] overflow-hidden pt-24 md:pt-28">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-32 left-20 w-80 h-80 bg-green-400/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/5 rounded-full blur-[180px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-12 md:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-32">
          <div className="lg:w-3/5 text-white space-y-8 md:space-y-14 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 md:gap-6 bg-white/10 backdrop-blur-xl border border-white/30 px-6 md:px-10 py-3 md:py-5 rounded-full text-xs md:text-xl font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-green-300 shadow-3xl animate-bounce mx-auto lg:mx-0">
              <Star size={18} fill="currentColor" className="text-yellow-400 md:w-6 md:h-6" />
              ইনসাফের জয় - দাড়িপাল্লা
            </div>
            
            <div className="space-y-4 md:space-y-8">
              <h1 className="text-5xl md:text-9xl lg:text-[140px] font-black leading-[1] md:leading-[0.75] tracking-tighter drop-shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
                বিজয় <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-yellow-100 to-white italic">আসছে!</span>
              </h1>
              <p className="text-2xl md:text-6xl text-green-50/90 font-black tracking-tight leading-tight">
                বাগেরহাট-৪ আসনের নয়নমণি <br />
                <span className="text-white font-black border-b-[6px] md:border-b-[14px] border-red-600 pb-2 md:pb-4 inline-block mt-4 md:mt-8 shadow-2xl">{CANDIDATE.name}</span>
              </p>
            </div>

            {/* CALL TO ACTION BUTTON */}
            <div className="max-w-4xl mx-auto lg:mx-0 pt-4 md:pt-8">
              <div className="relative group mb-10 md:mb-16">
                <div className="absolute -inset-4 md:-inset-10 bg-gradient-to-r from-yellow-400 via-green-400 to-emerald-500 rounded-[40px] md:rounded-[80px] blur-[30px] md:blur-[60px] opacity-50 group-hover:opacity-100 transition-all duration-1000 animate-pulse"></div>
                <button 
                  onClick={onGetStarted}
                  className="relative w-full bg-white text-green-950 p-10 md:p-24 rounded-[40px] md:rounded-[70px] font-black text-xl md:text-5xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] hover:scale-[1.03] active:scale-95 transition-all flex flex-col items-center justify-center gap-4 md:gap-10 border-b-[12px] md:border-b-[24px] border-green-800"
                >
                  <div className="flex items-center gap-3 md:gap-6 text-green-600 bg-green-50 px-6 md:px-12 py-2 md:py-5 rounded-full mb-1 md:mb-2 shadow-inner">
                    <Sparkles size={24} className="animate-spin-slow md:w-16 md:h-16" />
                    <span className="uppercase tracking-[0.2em] md:tracking-[0.5em] text-[10px] md:text-2xl font-black">ডিজিটাল নির্বাচনী সেল</span>
                    <Wand2 size={24} className="md:w-16 md:h-16" />
                  </div>
                  <span className="text-center leading-[1.1] px-4 md:px-10">আপনার ছবি দিয়ে পোস্টার বানান</span>
                  <div className="flex items-center gap-4 md:gap-8 text-green-700 mt-2 text-lg md:text-5xl font-black">
                    <img src={LOGOS.SCALE} alt="Logo" className="w-10 h-10 md:w-20 md:h-20 object-contain" />
                    <span>মার্কা: দাড়িপাল্লা</span>
                    <ArrowRight size={24} className="group-hover:translate-x-4 transition-transform md:w-16 md:h-16" />
                  </div>
                </button>
                <div className="absolute -top-4 -right-4 md:-top-10 md:-right-10 bg-red-600 text-white px-6 md:px-12 py-2 md:py-5 rounded-xl md:rounded-3xl font-black text-sm md:text-2xl uppercase tracking-widest shadow-4xl rotate-12 border-4 md:border-8 border-white">
                  WINNER
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
                <button 
                  onClick={onJoinClick}
                  className="bg-yellow-400 text-green-950 py-6 md:py-10 rounded-3xl md:rounded-[50px] font-black text-xl md:text-3xl shadow-4xl hover:bg-yellow-500 transition-all flex items-center justify-center gap-4 md:gap-6 border-b-[6px] md:border-b-[10px] border-yellow-700"
                >
                  <UserPlus size={24} className="md:w-10 md:h-10" /> সদস্য হোন
                </button>
                <div className="bg-white/10 backdrop-blur-3xl border border-white/20 px-6 md:px-12 py-6 md:py-10 rounded-3xl md:rounded-[50px] text-green-100 font-black flex items-center justify-center gap-4 md:gap-6 shadow-3xl">
                  <CheckCircle2 size={32} className="text-green-400 md:w-12 md:h-12" /> 
                  <span className="leading-tight text-lg md:text-2xl">ইনসাফের কাফেলা</span>
                </div>
              </div>
            </div>

            <div className="pt-8 md:pt-16 max-w-lg mx-auto lg:mx-0">
              <CountdownTimer />
            </div>
          </div>

          <div className="lg:w-2/5 flex justify-center relative mt-12 lg:mt-0">
            <div className="absolute -inset-16 md:-inset-32 bg-green-500/40 rounded-full blur-[100px] md:blur-[180px] animate-pulse"></div>
            <div className="relative group">
              <div className="relative w-64 h-[400px] md:w-[600px] md:h-[800px] bg-white p-4 md:p-10 rounded-[60px] md:rounded-[100px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] transform lg:rotate-6 group-hover:rotate-0 transition-all duration-1000 ease-out border-[8px] md:border-[16px] border-white">
                <div className="w-full h-full overflow-hidden rounded-[40px] md:rounded-[80px] relative shadow-inner">
                  <img 
                    src={ALIM_IMAGES.portrait_bg} 
                    alt={CANDIDATE.name}
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-950/95 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-10 md:bottom-20 left-8 md:left-16 right-8 md:right-16">
                    <div className="text-[10px] md:text-lg font-black text-green-400 uppercase tracking-[0.4em] md:tracking-[0.6em] mb-2 md:mb-6">বাগেরহাট-৪ আসন</div>
                    <div className="text-3xl md:text-6xl font-black text-white leading-[1] drop-shadow-4xl">ইনসাফের <br/> জয়গান</div>
                  </div>
                </div>
                
                <div className="absolute -bottom-8 -left-8 md:-bottom-16 md:-left-16 bg-red-600 text-white p-6 md:p-14 rounded-[30px] md:rounded-[70px] shadow-4xl transform -rotate-12 group-hover:rotate-0 transition-all border-[6px] md:border-[10px] border-white">
                  <div className="text-2xl md:text-6xl font-black flex items-center gap-4 md:gap-8">
                    দাঁড়িপাল্লা <img src={LOGOS.SCALE} alt="Logo" className="w-10 h-10 md:w-20 md:h-20 object-contain invert brightness-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
