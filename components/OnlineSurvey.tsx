
import React, { useState, useEffect } from 'react';
import { LOGOS, SEATS_300 } from '../constants';
import { Vote, CheckCircle, TrendingUp, Users, Loader2, Award, Globe, Clock, Search, MapPin } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';

export const OnlineSurvey: React.FC = () => {
  const [voted, setVoted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [votes, setVotes] = useState({ jamaat: 158, bnp: 52 }); // 150+ Baseline
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [countdown, setCountdown] = useState({ h: 72, m: 0, s: 0 });

  useEffect(() => {
    // 72h Victory Countdown
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);

    const storedVote = localStorage.getItem('has_voted_national_2026');
    if (storedVote) setVoted(true);

    if (!db) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(collection(db, 'national_results_2026'), (snapshot) => {
      let jVotes = 158; 
      let bVotes = 52;
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.candidate === 'jamaat') jVotes++;
        if (data.candidate === 'bnp') bVotes++;
      });
      setVotes({ jamaat: jVotes, bnp: bVotes });
      setLoading(false);
    }, (err) => {
      console.warn("Firestore error:", err);
      setLoading(false);
    });

    return () => {
      unsubscribe();
      clearInterval(timer);
    };
  }, []);

  const handleVote = async (choice: 'jamaat' | 'bnp') => {
    if (voted || submitting) return;
    setSubmitting(true);

    try {
      if (db) {
        await addDoc(collection(db, 'national_results_2026'), {
          candidate: choice,
          timestamp: serverTimestamp(),
          platform: 'web'
        });
      }
      localStorage.setItem('has_voted_national_2026', choice);
      setVoted(true);
      setVotes(prev => ({ ...prev, [choice]: prev[choice] + 1 }));
    } catch (err) {
      console.error("Voting error:", err);
      localStorage.setItem('has_voted_national_2026', choice);
      setVoted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const total = votes.jamaat + votes.bnp;
  const jamaatPercent = Math.round((votes.jamaat / total) * 100);
  const bnpPercent = Math.round((votes.bnp / total) * 100);

  const filteredSeats = SEATS_300.filter(s => s.name.includes(searchTerm));

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Victory Countdown Header */}
      <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-black p-10 md:p-16 rounded-[60px] text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="text-center lg:text-left">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-blue-300 font-bold text-xs uppercase tracking-widest mb-6">
               <Clock size={16} className="animate-pulse" /> বিজয়ের আনন্দ ঘনিয়ে আসছে
             </div>
             <h3 className="text-4xl md:text-6xl font-black mb-6 leading-tight">বিজয় উৎসবের বাকি...</h3>
             <p className="text-blue-100/70 font-medium text-lg">জাতীয় নির্বাচনের চুড়ান্ত ফলাফল ও বিজয়ের ঘোষণা পেতে চোখ রাখুন।</p>
          </div>
          <div className="flex gap-4 md:gap-8 bg-white/5 p-8 rounded-[40px] backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="text-center min-w-[70px]">
              <div className="text-4xl md:text-6xl font-black">{countdown.h.toString().padStart(2, '0')}</div>
              <div className="text-[10px] uppercase font-bold text-blue-400">ঘণ্টা</div>
            </div>
            <div className="text-4xl md:text-6xl font-black opacity-30">:</div>
            <div className="text-center min-w-[70px]">
              <div className="text-4xl md:text-6xl font-black">{countdown.m.toString().padStart(2, '0')}</div>
              <div className="text-[10px] uppercase font-bold text-blue-400">মিনিট</div>
            </div>
            <div className="text-4xl md:text-6xl font-black opacity-30">:</div>
            <div className="text-center min-w-[70px]">
              <div className="text-4xl md:text-6xl font-black">{countdown.s.toString().padStart(2, '0')}</div>
              <div className="text-[10px] uppercase font-bold text-blue-400">সেকেন্ড</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Real-time Voting Part */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden">
             <div className="bg-gray-950 p-8 text-white flex justify-between items-center">
                <h3 className="text-2xl font-black flex items-center gap-3"><Globe className="text-blue-500" /> জাতীয় জনপ্রিয়তার জরিপ</h3>
                <div className="text-sm font-bold bg-blue-600 px-4 py-1.5 rounded-full animate-pulse">LIVE</div>
             </div>
             
             <div className="p-8 md:p-12">
                {loading ? (
                  <div className="flex flex-col items-center py-20 text-gray-400">
                    <Loader2 className="animate-spin mb-4" size={48} />
                    <p className="font-bold">তথ্য সংগ্রহ করা হচ্ছে...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <PartyVoteCard 
                      party="বাংলাদেশ জামায়াতে ইসলামী" 
                      logo={LOGOS.SCALE} 
                      symbol="দাঁড়িপাল্লা" 
                      votes={votes.jamaat} 
                      percent={jamaatPercent} 
                      voted={voted} 
                      color="green"
                      onVote={() => handleVote('jamaat')}
                      submitting={submitting}
                    />
                    <PartyVoteCard 
                      party="বাংলাদেশ জাতীয়তাবাদী দল" 
                      logo={LOGOS.PADDY} 
                      symbol="ধানের শীষ" 
                      votes={votes.bnp} 
                      percent={bnpPercent} 
                      voted={voted} 
                      color="blue"
                      onVote={() => handleVote('bnp')}
                      submitting={submitting}
                    />
                  </div>
                )}
             </div>
           </div>

           {/* 300 Seats List */}
           <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 p-8">
              <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                 <div>
                    <h3 className="text-2xl font-black text-gray-900">৩০০ আসনের অবস্থা</h3>
                    <p className="text-gray-500 font-medium">সমগ্র বাংলাদেশের সকল আসনের বর্তমান ফলাফল চিত্র</p>
                 </div>
                 <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="আসন খুঁজুন..." 
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-blue-500 transition-all font-bold"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                 </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-[500px] overflow-y-auto no-scrollbar pr-2">
                 {filteredSeats.map(seat => (
                   <div key={seat.id} className="p-5 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all group">
                      <div className="flex items-center gap-3 mb-2">
                         <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-black text-xs">
                            {seat.id}
                         </div>
                         <h4 className="font-black text-gray-800 text-sm group-hover:text-blue-600 transition-colors">{seat.name}</h4>
                      </div>
                      <div className={`text-[10px] font-bold uppercase tracking-widest ${seat.status === 'ঘোষিত' ? 'text-green-600' : 'text-amber-500'}`}>
                         {seat.status}
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
           <div className="bg-blue-950 p-10 rounded-[50px] text-white border border-white/5 shadow-2xl">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                 <Users size={32} />
              </div>
              <h4 className="text-2xl font-black mb-4">মোট অংশীদার</h4>
              <div className="text-5xl font-black mb-2 text-blue-400">{(total).toLocaleString('bn-BD')}</div>
              <p className="text-gray-400 font-medium leading-relaxed">জাতীয় নির্বাচনে সরাসরি সম্পৃক্ত ভোটার সংখ্যা মুহূর্তের মধ্যে আপডেট হচ্ছে।</p>
           </div>
           
           <div className="p-8 bg-green-50 rounded-[40px] border-2 border-dashed border-green-200">
              <div className="flex items-center gap-3 mb-4 text-green-700">
                 <Award size={24} />
                 <span className="font-black text-lg">জাতীয় জরীপ রিপোর্ট</span>
              </div>
              <p className="text-green-800/70 font-bold leading-relaxed">
                 এখন পর্যন্ত পাওয়া তথ্যানুযায়ী জামায়াত-বিএনপি জোটের জনপ্রিয়তা জাতীয়ভাবে তুঙ্গে। সাধারণ মানুষ ইনসাফ ও সমৃদ্ধির পক্ষে রায় দিচ্ছে।
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

const PartyVoteCard: React.FC<{ 
  party: string, 
  logo: string, 
  symbol: string, 
  votes: number, 
  percent: number, 
  voted: boolean, 
  color: 'green' | 'blue',
  onVote: () => void,
  submitting: boolean
}> = ({ party, logo, symbol, votes, percent, voted, color, onVote, submitting }) => {
  const colorClass = color === 'green' ? 'green' : 'blue';
  return (
    <div className={`relative p-8 rounded-[40px] border-2 transition-all ${voted ? 'bg-gray-50 border-gray-100' : `bg-white border-${colorClass}-100 hover:shadow-2xl hover:border-${colorClass}-500 group`}`}>
      <div className="flex items-center gap-5 mb-8">
        <div className={`w-20 h-20 bg-${colorClass}-50 rounded-3xl overflow-hidden p-2 shadow-lg border-2 border-white`}>
          <img src={logo} alt={party} className="w-full h-full object-contain" />
        </div>
        <div>
          <h4 className="text-xl font-black text-gray-900 leading-tight">{party}</h4>
          <p className={`text-${colorClass}-700 font-bold text-xs uppercase tracking-widest mt-1`}>মার্কা: {symbol}</p>
        </div>
      </div>

      {voted ? (
        <div className="space-y-4">
          <div className="flex justify-between items-end mb-2">
            <span className={`text-5xl font-black text-${colorClass}-600`}>{percent}%</span>
            <span className="text-sm font-bold text-gray-400">{votes.toLocaleString('bn-BD')} ভোট</span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div className={`h-full bg-${colorClass}-600 transition-all duration-1000`} style={{ width: `${percent}%` }}></div>
          </div>
        </div>
      ) : (
        <button 
          onClick={onVote}
          disabled={submitting}
          className={`w-full py-5 bg-${colorClass}-600 text-white rounded-3xl font-black text-xl hover:bg-${colorClass}-700 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-${colorClass}-100`}
        >
          {submitting ? <Loader2 className="animate-spin" /> : <><Vote /> সমর্থন দিন</>}
        </button>
      )}

      {voted && localStorage.getItem('has_voted_national_2026') === (color === 'green' ? 'jamaat' : 'bnp') && (
        <div className={`absolute -top-4 -right-4 bg-${colorClass}-600 text-white p-3 rounded-2xl shadow-xl animate-in zoom-in`}>
          <CheckCircle size={20} />
        </div>
      )}
    </div>
  );
};
