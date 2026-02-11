
import React from 'react';
import { CANDIDATE, ALIM_IMAGES, LOGOS } from '../constants';
import { ArrowRight, UserPlus, ShieldCheck, Sparkles, Wand2, Star } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';

export const Hero: React.FC<{ onGetStarted: () => void, onJoinClick: () => void }> = ({ onGetStarted, onJoinClick }) => {
  return (
    <section className="relative min-h-[100vh] flex items-center bg-gradient-to-b from-[#004d3b] to-[#003d2e] overflow-hidden pt-20">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="lg:w-3/5 text-white space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-xs md:text-sm font-black tracking-widest uppercase text-green-300 shadow-xl">
              <Star size={18} fill="currentColor" className="text-yellow-400" />
              ইনসাফ ও ন্যায়বিচার প্রতিষ্ঠার শপথ - বাংলাদেশ জামায়াতে ইসলামী
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[110px] font-black leading-[0.95] tracking-tighter drop-shadow-2xl">
              ইনসাফ কায়েমে <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-100 to-white">দাঁড়িপাল্লা</span>
            </h1>
            
            <p className="text-xl md:text-4xl text-green-50/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              বাগেরহাট-৪ আসনের অকুতোভয় সিপাহসালার <br />
              <span className="text-white font-black border-b-8 border-red-600 pb-2 inline-block mt-4">{CANDIDATE.name}</span>
            </p>

            {/* Massive "Make Poster" CTA - Target: win for Jamaat and Insaf */}
            <div className="max-w-2xl mx-auto lg:mx-0 pt-6">
              <div className="relative group mb-10">
                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-green-400 to-emerald-500 rounded-[50px] blur-2xl opacity-30 group-hover:opacity-60 transition-all duration-700 animate-pulse"></div>
                <button 
                  onClick={onGetStarted}
                  className="relative w-full bg-white text-green-950 p-6 md:p-10 rounded-[45px] font-black text-xl md:text-3xl shadow-2xl hover:scale-[1.03] active:scale-95 transition-all flex flex-col items-center justify-center gap-4 border-b-[12px] border-green-800"
                >
                  <div className="flex items-center gap-3 text-green-600 bg-green-50 px-6 py-2 rounded-full mb-2">
                    <Sparkles size={32} className="animate-spin-slow" />
                    <span className="uppercase tracking-[0.3em] text-xs font-black">ডিজিটাল প্রচার সেল</span>
                    <Wand2 size={32} />
                  </div>
                  <span className="text-center leading-tight">এই ক্লিকে বানিয়ে ফেলুন প্রফেসর আবদুল আলিম এর সাথে নির্বাচনি পোস্টার</span>
                  <div className="flex items-center gap-3 text-green-700 mt-2 text-sm md:text-lg">
                    <img src={LOGOS.SCALE} alt="Logo" className="w-8 h-8 object-contain" />
                    <span>মার্কা: দাড়িপাল্লা</span>
                    <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform" />
                  </div>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button 
                  onClick={onJoinClick}
                  className="bg-yellow-400 text-green-950 py-6 rounded-[32px] font-black text-xl shadow-xl hover:bg-yellow-500 transition-all flex items-center justify-center gap-3 border-b-4 border-yellow-600"
                >
                  <UserPlus size={24} /> সদস্য ফর্ম পূরণ করুন
                </button>
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-6 rounded-[32px] text-green-100 font-bold flex items-center justify-center gap-4 shadow-lg">
                  <ShieldCheck size={28} className="text-green-400" /> 
                  <span className="leading-tight text-sm">ইনসাফ ও সমৃদ্ধির কাফেলা</span>
                </div>
              </div>
            </div>

            <div className="pt-10">
              <CountdownTimer />
            </div>
          </div>

          {/* Candidate Image Feature */}
          <div className="lg:w-2/5 flex justify-center relative">
            <div className="absolute -inset-20 bg-green-500/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="relative group">
              <div className="absolute -inset-8 bg-green-600/30 rounded-[70px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative w-72 h-[480px] md:w-[480px] md:h-[650px] bg-white p-5 rounded-[60px] shadow-2xl transform lg:rotate-3 group-hover:rotate-0 transition-all duration-1000 ease-out border-8 border-white">
                <div className="w-full h-full overflow-hidden rounded-[45px] relative">
                  <img 
                    src={ALIM_IMAGES.portrait_bg} 
                    alt={CANDIDATE.name}
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-10 left-10 right-10">
                    <div className="text-xs font-black text-green-400 uppercase tracking-[0.4em] mb-2 drop-shadow-lg">নির্বাচনি আসন</div>
                    <div className="text-3xl font-black text-white leading-tight drop-shadow-xl">বাগেরহাট-৪ <br/> (মোরেলগঞ্জ-শরণখোলা)</div>
                  </div>
                </div>
                
                <div className="absolute -bottom-10 -left-10 bg-red-600 text-white p-8 rounded-[45px] shadow-2xl transform -rotate-12 group-hover:rotate-0 transition-all border-4 border-white border-dashed">
                  <div className="text-3xl font-black flex items-center gap-4">
                    দাঁড়িপাল্লা <img src={LOGOS.SCALE} alt="Logo" className="w-12 h-12 object-contain invert brightness-0" />
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
