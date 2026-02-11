
import React from 'react';
import { CANDIDATE, ALIM_IMAGES, LOGOS } from '../constants';
import { ArrowRight, UserPlus, ShieldCheck, Sparkles, Wand2, Star, CheckCircle2 } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';

export const Hero: React.FC<{ onGetStarted: () => void, onJoinClick: () => void }> = ({ onGetStarted, onJoinClick }) => {
  return (
    <section className="relative min-h-[100vh] flex items-center bg-gradient-to-b from-[#004d3b] to-[#002d1e] overflow-hidden pt-28">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-32 left-20 w-80 h-80 bg-green-400/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/5 rounded-full blur-[180px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-20 md:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          <div className="lg:w-3/5 text-white space-y-14 text-center lg:text-left">
            <div className="inline-flex items-center gap-6 bg-white/10 backdrop-blur-xl border border-white/30 px-10 py-5 rounded-full text-sm md:text-xl font-black tracking-[0.3em] uppercase text-green-300 shadow-3xl animate-bounce">
              <Star size={24} fill="currentColor" className="text-yellow-400" />
              ইনসাফের জয় নিশ্চিত করুন - দাড়িপাল্লা
            </div>
            
            <div className="space-y-8">
              <h1 className="text-7xl md:text-9xl lg:text-[160px] font-black leading-[0.75] tracking-tighter drop-shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
                বিজয় <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-yellow-100 to-white italic">আসছে!</span>
              </h1>
              <p className="text-3xl md:text-6xl text-green-50/90 font-black tracking-tight leading-tight">
                বাগেরহাট-৪ আসনের নয়নমণি <br />
                <span className="text-white font-black border-b-[14px] border-red-600 pb-4 inline-block mt-8 shadow-2xl">{CANDIDATE.name}</span>
              </p>
            </div>

            {/* MASSIVE CALL TO ACTION BUTTON */}
            <div className="max-w-4xl mx-auto lg:mx-0 pt-8">
              <div className="relative group mb-16">
                <div className="absolute -inset-10 bg-gradient-to-r from-yellow-400 via-green-400 to-emerald-500 rounded-[80px] blur-[60px] opacity-50 group-hover:opacity-100 transition-all duration-1000 animate-pulse"></div>
                <button 
                  onClick={onGetStarted}
                  className="relative w-full bg-white text-green-950 p-16 md:p-24 rounded-[70px] font-black text-3xl md:text-6xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] hover:scale-[1.05] active:scale-95 transition-all flex flex-col items-center justify-center gap-10 border-b-[24px] border-green-800"
                >
                  <div className="flex items-center gap-6 text-green-600 bg-green-50 px-12 py-5 rounded-full mb-2 shadow-inner">
                    <Sparkles size={64} className="animate-spin-slow" />
                    <span className="uppercase tracking-[0.5em] text-sm md:text-2xl font-black">ডিজিটাল নির্বাচনী সেল</span>
                    <Wand2 size={64} />
                  </div>
                  <span className="text-center leading-[1.1] md:px-10">এই ক্লিকে বানিয়ে ফেলুন প্রফেসর আবদুল আলিম এর সাথে নির্বাচনি পোস্টার</span>
                  <div className="flex items-center gap-8 text-green-700 mt-4 text-2xl md:text-5xl font-black">
                    <img src={LOGOS.SCALE} alt="Logo" className="w-20 h-20 object-contain" />
                    <span>মার্কা: দাড়িপাল্লা</span>
                    <ArrowRight size={64} className="group-hover:translate-x-8 transition-transform" />
                  </div>
                </button>
                <div className="absolute -top-10 -right-10 bg-red-600 text-white px-12 py-5 rounded-3xl font-black text-2xl uppercase tracking-widest shadow-4xl rotate-12 border-8 border-white">
                  WINNER
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <button 
                  onClick={onJoinClick}
                  className="bg-yellow-400 text-green-950 py-10 rounded-[50px] font-black text-3xl shadow-4xl hover:bg-yellow-500 transition-all flex items-center justify-center gap-6 border-b-[10px] border-yellow-700"
                >
                  <UserPlus size={40} /> সদস্য হোন
                </button>
                <div className="bg-white/10 backdrop-blur-3xl border border-white/20 px-12 py-10 rounded-[50px] text-green-100 font-black flex items-center justify-center gap-6 shadow-3xl">
                  <CheckCircle2 size={48} className="text-green-400" /> 
                  <span className="leading-tight text-2xl">ইনসাফের কাফেলা</span>
                </div>
              </div>
            </div>

            <div className="pt-16">
              <CountdownTimer />
            </div>
          </div>

          <div className="lg:w-2/5 flex justify-center relative">
            <div className="absolute -inset-32 bg-green-500/40 rounded-full blur-[180px] animate-pulse"></div>
            <div className="relative group">
              <div className="relative w-80 h-[600px] md:w-[600px] md:h-[800px] bg-white p-10 rounded-[100px] shadow-[0_80px_160px_-30px_rgba(0,0,0,0.8)] transform lg:rotate-6 group-hover:rotate-0 transition-all duration-1000 ease-out border-[16px] border-white">
                <div className="w-full h-full overflow-hidden rounded-[80px] relative shadow-inner">
                  <img 
                    src={ALIM_IMAGES.portrait_bg} 
                    alt={CANDIDATE.name}
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-950/95 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-20 left-16 right-16">
                    <div className="text-lg font-black text-green-400 uppercase tracking-[0.6em] mb-6">বাগেরহাট-৪ আসন</div>
                    <div className="text-6xl font-black text-white leading-[1] drop-shadow-4xl">ইনসাফের <br/> জয়গান</div>
                  </div>
                </div>
                
                <div className="absolute -bottom-16 -left-16 bg-red-600 text-white p-14 rounded-[70px] shadow-4xl transform -rotate-12 group-hover:rotate-0 transition-all border-[10px] border-white">
                  <div className="text-6xl font-black flex items-center gap-8">
                    দাঁড়িপাল্লা <img src={LOGOS.SCALE} alt="Logo" className="w-20 h-20 object-contain invert brightness-0" />
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
