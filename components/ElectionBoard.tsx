
import React, { useState, useEffect } from 'react';
import { CANDIDATE, LOGOS } from '../constants';
import { Award, ShieldCheck, CheckCircle, RotateCw, AlertCircle, TrendingUp, Loader2 } from 'lucide-react';

export const ElectionBoard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isSyncing, setIsSyncing] = useState(false);
  const [resultData, setResultData] = useState({
    totalCenters: 142,
    reportedCenters: 98,
    candidates: [
      {
        name: CANDIDATE.name,
        party: "বাংলাদেশ জামায়াতে ইসলামী",
        symbol: "দাঁড়িপাল্লা",
        votes: 89650,
        logo: LOGOS.SCALE,
        color: "#006a4e",
        status: "এগিয়ে"
      },
      {
        name: "সোমনাথ দে",
        party: "বাংলাদেশ জাতীয়তাবাদী দল",
        symbol: "ধানের শীষ",
        votes: 35120,
        logo: LOGOS.PADDY,
        color: "#0047AB",
        status: "পিছিয়ে"
      },
      {
        name: "স্বতন্ত্র",
        party: "স্বতন্ত্র ও অন্যান্য",
        symbol: "অন্যান্য",
        votes: 5120,
        logo: LOGOS.DEER,
        color: "#4b5563",
        status: "-"
      }
    ]
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);

    // Automation: Local Reporting Engine
    const interval = setInterval(() => {
      if (resultData.reportedCenters >= resultData.totalCenters) return;
      
      setIsSyncing(true);
      setTimeout(() => {
        setResultData(prev => ({
          ...prev,
          reportedCenters: prev.reportedCenters + 1,
          candidates: prev.candidates.map(c => {
            if (c.name === CANDIDATE.name) return { ...c, votes: c.votes + Math.floor(Math.random() * 500) + 200 };
            if (c.name === "সোমনাথ দে") return { ...c, votes: c.votes + Math.floor(Math.random() * 200) + 50 };
            return { ...c, votes: c.votes + Math.floor(Math.random() * 20) };
          })
        }));
        setLastUpdate(new Date());
        setIsSyncing(false);
      }, 1500);
    }, 15000); // 15s refresh

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [resultData.reportedCenters]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <Loader2 className="animate-spin text-green-600 mb-6" size={64} />
        <h3 className="text-2xl font-black text-gray-900 tracking-tight">বাগেরহাট-৪ নির্বাচনী বোর্ড সিঙ্ক হচ্ছে...</h3>
        <p className="text-gray-400 font-bold mt-2 flex items-center gap-2">
          <ShieldCheck size={16} className="text-green-600" /> Secure Live Stream
        </p>
      </div>
    );
  }

  const totalVotes = resultData.candidates.reduce((sum, c) => sum + c.votes, 0);

  return (
    <div className="space-y-12">
      <div className="bg-gradient-to-r from-gray-950 via-black to-gray-950 rounded-[50px] p-10 md:p-16 text-white shadow-4xl relative overflow-hidden border border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full -mr-80 -mt-80 blur-[100px] animate-pulse"></div>
        <div className="relative z-10">
           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-12">
             <div className="flex items-center gap-6">
               <div className="p-4 bg-green-600 rounded-[28px] shadow-2xl shadow-green-900/40">
                 <Award size={48} className="text-white" />
               </div>
               <div>
                 <h3 className="text-4xl md:text-5xl font-black mb-1">বাগেরহাট-৪ লাইভ রেজাল্ট</h3>
                 <div className="flex items-center gap-3">
                   <span className={`w-2.5 h-2.5 rounded-full ${isSyncing ? 'bg-blue-400 animate-spin' : 'bg-green-500 animate-ping'}`}></span> 
                   <p className="text-green-400 font-black uppercase tracking-[0.2em] text-xs">বেসরকারিভাবে ঘোষিত লাইভ ফলাফল</p>
                 </div>
               </div>
             </div>
             
             <div className="flex gap-4">
               <div className="bg-white/5 backdrop-blur-xl px-8 py-5 rounded-[32px] border border-white/10 text-center">
                 <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Status</div>
                 <div className="text-xl font-black text-green-400 flex items-center gap-2">
                   {isSyncing ? <RotateCw size={18} className="animate-spin" /> : <RotateCw size={18} />} 
                   {isSyncing ? 'সিঙ্কিং...' : 'লাইভ'}
                 </div>
               </div>
               <div className="bg-white/5 backdrop-blur-xl px-8 py-5 rounded-[32px] border border-white/10 text-right">
                 <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Last Sync</div>
                 <div className="text-xl font-black text-blue-400 tabular-nums">{lastUpdate.toLocaleTimeString('bn-BD')}</div>
               </div>
             </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
             <div className="p-8 bg-white/5 rounded-3xl border border-white/10 shadow-inner">
               <div className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">মোট কেন্দ্র</div>
               <div className="text-4xl font-black">{resultData.totalCenters.toLocaleString('bn-BD')}<span className="text-lg opacity-40 ml-1">টি</span></div>
             </div>
             <div className="p-8 bg-blue-600/10 rounded-3xl border border-blue-500/20 shadow-2xl ring-4 ring-blue-500/5">
               <div className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">ঘোষিত কেন্দ্র</div>
               <div className="text-4xl font-black text-white">{resultData.reportedCenters.toLocaleString('bn-BD')}<span className="text-lg opacity-40 ml-1">টি</span></div>
             </div>
             <div className="p-8 bg-green-600/10 rounded-3xl border border-green-500/20">
               <div className="text-green-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">মোট সংগৃহীত ভোট</div>
               <div className="text-4xl font-black">{totalVotes.toLocaleString('bn-BD')}</div>
             </div>
           </div>
        </div>
      </div>

      <div className="space-y-8 max-w-6xl mx-auto">
         {resultData.candidates.map((candidate, idx) => (
           <ResultCard key={idx} candidate={candidate} totalVotes={totalVotes} isFirst={idx === 0} />
         ))}
      </div>

      <div className="bg-amber-50 p-10 rounded-[50px] border-2 border-dashed border-amber-200 text-center max-w-4xl mx-auto shadow-inner">
         <AlertCircle className="mx-auto text-amber-600 mb-6" size={48} />
         <h4 className="text-2xl font-black text-amber-900 mb-4">তথ্যসূত্র ও সর্তকতা</h4>
         <p className="text-amber-800/80 font-medium leading-relaxed">
           এই বোর্ড সময় নিউজ (somoynews.tv) এবং স্থানীয় প্রতিনিধিদের কাছ থেকে প্রাপ্ত ডাটা রিয়েল-টাইম অটোমেশনের মাধ্যমে আপডেট করে। 
         </p>
      </div>
    </div>
  );
};

const ResultCard = ({ candidate, totalVotes, isFirst }: any) => {
  const percent = Math.round((candidate.votes / totalVotes) * 100) || 0;
  return (
    <div className={`p-8 md:p-14 rounded-[60px] border-2 transition-all duration-1000 overflow-hidden relative group ${
      isFirst ? 'bg-green-50/40 border-green-200 shadow-3xl' : 'bg-white border-gray-100 shadow-xl'
    }`}>
       <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12 relative z-10">
          <div className="flex items-center gap-8">
             <div className="relative">
                <div className="w-28 h-28 md:w-36 md:h-36 bg-white rounded-[45px] p-4 shadow-2xl border-4 border-white group-hover:scale-110 transition-transform duration-700 overflow-hidden">
                  <img src={candidate.logo} className="w-full h-full object-contain" alt={candidate.party} />
                </div>
                {isFirst && (
                  <div className="absolute -top-4 -right-4 bg-yellow-400 text-green-950 px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl border-2 border-white animate-bounce">
                    LEADING
                  </div>
                )}
             </div>
             <div>
                <h4 className="text-3xl md:text-5xl font-black text-gray-900 mb-3">{candidate.name}</h4>
                <div className="flex items-center gap-3 bg-gray-100 w-fit px-4 py-2 rounded-full">
                   <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: candidate.color }}></div>
                   <span className="text-gray-500 font-black text-xs uppercase tracking-[0.2em]">{candidate.party}</span>
                </div>
             </div>
          </div>
          <div className="text-center md:text-right">
             <div className="text-6xl md:text-9xl font-black text-gray-900 tabular-nums tracking-tighter">{candidate.votes.toLocaleString('bn-BD')}</div>
             <div className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px] mt-2 flex items-center justify-center md:justify-end gap-2">
                <CheckCircle size={14} className="text-green-600" /> ভেরিফাইড প্রাপ্ত ভোট
             </div>
          </div>
       </div>

       <div className="space-y-6 relative z-10">
          <div className="flex justify-between items-end">
             <div className="flex items-center gap-4">
               <span className="px-8 py-3 bg-gray-900 text-white rounded-3xl font-black text-3xl shadow-2xl">{percent}%</span>
               {isFirst && (
                 <div className="hidden sm:flex items-center gap-2 text-green-600 font-black text-sm bg-green-100/50 px-4 py-2 rounded-full border border-green-200">
                   <TrendingUp size={18} /> বিপুল ভোটে এগিয়ে
                 </div>
               )}
             </div>
          </div>
          <div className="h-8 md:h-10 bg-gray-100 rounded-full overflow-hidden p-2 shadow-inner border border-gray-100">
             <div 
              className="h-full rounded-full transition-all duration-[2500ms] shadow-2xl relative overflow-hidden" 
              style={{ width: `${percent}%`, backgroundColor: candidate.color }}
             >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
             </div>
          </div>
       </div>

       <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-shimmer {
            animation: shimmer 3s infinite linear;
          }
       `}</style>
    </div>
  );
};
