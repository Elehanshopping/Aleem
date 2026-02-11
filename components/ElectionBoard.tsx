
import React, { useState, useEffect } from 'react';
import { CANDIDATE, LOGOS } from '../constants';
import { BarChart3, TrendingUp, Users, AlertCircle, Clock, Search, Ghost, Loader2, Vote, CheckCircle } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

export const ElectionBoard: React.FC = () => {
  const [countdown, setCountdown] = useState({ h: 72, m: 0, s: 0 });
  const [votes, setVotes] = useState({ jamaat: 155, bnp: 51 }); // 150+ Baseline
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);

    const storedVote = localStorage.getItem('has_voted_bagerhat4_local');
    if (storedVote) setVoted(true);

    if (!db) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(collection(db, 'local_bagerhat_votes'), (snapshot) => {
      let jVotes = 155; 
      let bVotes = 51; 
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
      clearInterval(timer);
      unsubscribe();
    };
  }, []);

  const handleLocalVote = async (choice: 'jamaat' | 'bnp') => {
    if (voted || submitting) return;
    setSubmitting(true);

    try {
      if (db) {
        await addDoc(collection(db, 'local_bagerhat_votes'), {
          candidate: choice,
          timestamp: serverTimestamp(),
          platform: 'web'
        });
      }
      localStorage.setItem('has_voted_bagerhat4_local', choice);
      setVoted(true);
      setVotes(prev => ({ ...prev, [choice]: prev[choice] + 1 }));
    } catch (err) {
      console.error("Local voting error:", err);
      localStorage.setItem('has_voted_bagerhat4_local', choice);
      setVoted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const total = votes.jamaat + votes.bnp;
  const jamaatPercent = Math.round((votes.jamaat / total) * 100);
  const bnpPercent = Math.round((votes.bnp / total) * 100);

  return (
    <div className="space-y-12">
      {/* 72h Result Countdown */}
      <div className="bg-gradient-to-r from-gray-900 to-black rounded-[50px] p-10 text-white shadow-2xl relative overflow-hidden border border-white/10">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-green-600/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 rounded-full text-green-400 font-bold text-xs uppercase tracking-widest mb-4">
               <Clock size={16} /> অফিসিয়াল ফলাফল প্রকাশ
             </div>
             <h3 className="text-4xl md:text-5xl font-black mb-2">ফলাফল ঘোষণার বাকি...</h3>
             <p className="text-gray-400 font-medium">১২ ফেব্রুয়ারি ভোট গ্রহণ শেষে এখানে বিস্তারিত চুড়ান্ত আপডেট পাওয়া যাবে।</p>
          </div>
          <div className="flex gap-4 md:gap-8">
            <ResultTimeUnit value={countdown.h} label="ঘণ্টা" />
            <ResultTimeUnit value={countdown.m} label="মিনিট" />
            <ResultTimeUnit value={countdown.s} label="সেকেন্ড" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Users className="text-blue-500" />} label="মোট ভোটার (আসন)" value="৩,৪২,৫৬০" />
        <StatCard icon={<TrendingUp className="text-green-500" />} label="ভোট কাস্টিং" value="অপেক্ষিত" />
        <StatCard icon={<BarChart3 className="text-purple-500" />} label="গণনাকৃত কেন্দ্র" value="০/১২৪" />
      </div>

      <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gray-950 p-8 text-white flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-2xl font-bold">ফলাফল বাগেরহাট ৪</h3>
            <p className="text-green-400 text-sm font-bold animate-pulse">সোস্যাল ভোট অনুযায়ী আপডেট চলছে</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-red-600 rounded-full text-xs font-bold animate-pulse">LIVE UPDATE</div>
            <div className="px-4 py-2 bg-green-600 rounded-full text-xs font-bold">১২ ফেব্রুয়ারি</div>
          </div>
        </div>

        <div className="p-8 space-y-10">
          {loading ? (
             <div className="flex flex-col items-center py-20 text-gray-400">
                <Loader2 className="animate-spin mb-4" size={48} />
                <p className="font-bold">ফলাফল যাচাই করা হচ্ছে...</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <LocalCandidateCard 
                name={CANDIDATE.name} 
                party="বাংলাদেশ জামায়াতে ইসলামী" 
                symbol="দাঁড়িপাল্লা" 
                logo={LOGOS.SCALE} 
                votes={votes.jamaat} 
                percent={jamaatPercent} 
                voted={voted}
                color="green"
                onVote={() => handleLocalVote('jamaat')}
                submitting={submitting}
              />
              <LocalCandidateCard 
                name="সোমনাথ দে" 
                party="বি.এন.পি" 
                symbol="ধানের শীষ" 
                logo={LOGOS.PADDY} 
                votes={votes.bnp} 
                percent={bnpPercent} 
                voted={voted}
                color="blue"
                onVote={() => handleLocalVote('bnp')}
                submitting={submitting}
              />
            </div>
          )}
          
          <div className="p-8 bg-pink-50 rounded-[40px] border-4 border-dashed border-pink-200 relative group overflow-hidden">
             <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-150 transition-transform">
                <Ghost size={200} />
             </div>
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center p-4 transform rotate-12 group-hover:rotate-0 transition-transform">
                   <img src={LOGOS.DEER} alt="Deer" className="w-full h-full object-contain grayscale opacity-30" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-1 bg-red-600 -rotate-45"></div>
                   </div>
                </div>
                <div>
                   <div className="inline-block px-4 py-1 bg-red-600 text-white rounded-full text-xs font-black uppercase mb-3">নিখোঁজ / পদত্যাগ</div>
                   <h4 className="text-2xl font-black text-gray-900 mb-1">কাজী খায়রুজ্জামান শিপন</h4>
                   <p className="text-pink-700 font-bold mb-4">স্বতন্ত্র (হরিণ) - মাঠ ছাইড়া দৌড় দিছে!</p>
                   <div className="flex items-center gap-2 text-sm text-gray-500 font-bold italic">
                      <Search size={16} className="animate-bounce" /> তাকে আর খুঁজে পাওয়া যাচ্ছে না...
                   </div>
                </div>
                <div className="flex-grow flex flex-col items-center justify-center">
                   <div className="text-6xl font-black text-gray-200">০%</div>
                   <div className="text-xs font-bold text-gray-400 uppercase">ভোটের অবস্থা: নাই</div>
                </div>
             </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-6 text-center border-t border-yellow-100 flex items-center justify-center gap-3">
          <AlertCircle className="text-yellow-600" size={20} />
          <p className="text-yellow-800 text-sm font-bold">বিশেষ দ্রষ্টব্য: লাইভ ভোট গণনা শুরু হবে ১২ ফেব্রুয়ারি বিকাল ৪টার পর।</p>
        </div>
      </div>
    </div>
  );
};

const LocalCandidateCard: React.FC<{ 
  name: string, 
  party: string, 
  symbol: string, 
  logo: string, 
  votes: number, 
  percent: number, 
  voted: boolean,
  color: 'green' | 'blue',
  onVote: () => void,
  submitting: boolean
}> = ({ name, party, symbol, logo, votes, percent, voted, color, onVote, submitting }) => {
  const colorClass = color === 'green' ? 'green' : 'blue';
  return (
    <div className={`p-8 rounded-[40px] border-2 transition-all ${voted ? 'bg-gray-50 border-gray-100 shadow-inner' : `bg-white border-${colorClass}-100 hover:shadow-2xl hover:border-${colorClass}-500 group`}`}>
      <div className="flex items-center gap-5 mb-8">
        <div className={`w-20 h-20 bg-${colorClass}-50 rounded-3xl overflow-hidden p-2 shadow-lg border-2 border-white`}>
          <img src={logo} alt={symbol} className="w-full h-full object-contain" />
        </div>
        <div>
          <h4 className="text-2xl font-black text-gray-900 leading-tight">{name}</h4>
          <p className={`text-${colorClass}-700 font-bold text-sm tracking-widest mt-1`}>মার্কা: {symbol}</p>
        </div>
      </div>

      {voted ? (
        <div className="space-y-4">
          <div className="flex justify-between items-end mb-2">
            <span className={`text-5xl font-black text-${colorClass}-600`}>{percent}%</span>
            <span className="text-sm font-bold text-gray-400">{votes.toLocaleString('bn-BD')} ভোট</span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner border border-gray-200">
            <div className={`h-full bg-${colorClass}-600 transition-all duration-1000`} style={{ width: `${percent}%` }}></div>
          </div>
        </div>
      ) : (
        <button 
          onClick={onVote}
          disabled={submitting}
          className={`w-full py-5 bg-${colorClass}-600 text-white rounded-3xl font-black text-xl hover:bg-${colorClass}-700 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-${colorClass}-100`}
        >
          {submitting ? <Loader2 className="animate-spin" /> : <><Vote /> ভোট দিন</>}
        </button>
      )}
    </div>
  );
};

const ResultTimeUnit: React.FC<{ value: number, label: string }> = ({ value, label }) => (
  <div className="text-center">
    <div className="text-3xl md:text-5xl font-black text-white">{value.toString().padStart(2, '0')}</div>
    <div className="text-[10px] md:text-xs text-green-400 uppercase font-bold mt-1 tracking-widest">{label}</div>
  </div>
);

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
  <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex items-center gap-6">
    <div className="p-4 bg-gray-50 rounded-2xl">{icon}</div>
    <div>
      <div className="text-gray-500 text-sm font-medium">{label}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  </div>
);
