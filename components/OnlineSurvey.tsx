
import React, { useState, useEffect } from 'react';
import { LOGOS, SEATS_300 } from '../constants';
import { Vote, CheckCircle, TrendingUp, Users, Loader2, Award, Globe, Clock, Search, MapPin } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';

export const OnlineSurvey: React.FC = () => {
  const [voted, setVoted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [votes, setVotes] = useState({ jamaat: 158, bnp: 52 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedVote = localStorage.getItem('has_voted_national_2026');
    if (storedVote) setVoted(true);

    if (db) {
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
      }, () => setLoading(false));
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const handleVote = async (choice: 'jamaat' | 'bnp') => {
    if (voted || submitting) return;
    setSubmitting(true);

    const processVote = async () => {
      try {
        if (db) {
          await Promise.race([
            addDoc(collection(db, 'national_results_2026'), { candidate: choice, timestamp: serverTimestamp() }),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2500))
          ]);
        }
      } catch (e) {
        console.warn("National survey DB timeout");
      }
      
      localStorage.setItem('has_voted_national_2026', choice);
      setVoted(true);
      setVotes(prev => ({ ...prev, [choice]: prev[choice] + 1 }));
      setSubmitting(false);
    };

    processVote();
  };

  const total = votes.jamaat + votes.bnp;
  const jamaatPercent = Math.round((votes.jamaat / total) * 100) || 0;
  const bnpPercent = Math.round((votes.bnp / total) * 100) || 0;

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-black p-10 md:p-16 rounded-[60px] text-white relative shadow-2xl">
         <h3 className="text-4xl md:text-6xl font-black mb-6 leading-tight">জাতীয় জনপ্রিয়তার জরিপ</h3>
         <p className="text-blue-100/70 font-medium text-lg">আপনার সমর্থনটি আজই রেজিস্টার করুন।</p>
      </div>

      <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PartyVoteCard 
            party="বাংলাদেশ জামায়াতে ইসলামী" logo={LOGOS.SCALE} symbol="দাঁড়িপাল্লা" 
            votes={votes.jamaat} percent={jamaatPercent} voted={voted} color="green"
            onVote={() => handleVote('jamaat')} submitting={submitting}
          />
          <PartyVoteCard 
            party="বাংলাদেশ জাতীয়তাবাদী দল" logo={LOGOS.PADDY} symbol="ধানের শীষ" 
            votes={votes.bnp} percent={bnpPercent} voted={voted} color="blue"
            onVote={() => handleVote('bnp')} submitting={submitting}
          />
        </div>
      </div>
    </div>
  );
};

const PartyVoteCard: React.FC<any> = ({ party, logo, symbol, votes, percent, voted, color, onVote, submitting }) => {
  const colorClass = color === 'green' ? 'green' : 'blue';
  return (
    <div className={`p-8 rounded-[40px] border-2 ${voted ? 'bg-gray-50 border-gray-100 shadow-inner' : `bg-white border-${colorClass}-100 hover:shadow-2xl`}`}>
      <div className="flex items-center gap-5 mb-8">
        <div className={`w-20 h-20 bg-${colorClass}-50 rounded-3xl p-2 shadow-lg border-2 border-white`}><img src={logo} alt={party} className="w-full h-full object-contain" /></div>
        <div><h4 className="text-xl font-black leading-tight">{party}</h4><p className={`text-${colorClass}-700 font-bold mt-1`}>মার্কা: {symbol}</p></div>
      </div>
      {voted ? (
        <div className="space-y-4">
          <div className="flex justify-between items-end mb-2"><span className={`text-5xl font-black text-${colorClass}-600`}>{percent}%</span><span className="text-sm font-bold text-gray-400">{votes.toLocaleString('bn-BD')} ভোট</span></div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden"><div className={`h-full bg-${colorClass}-600 transition-all duration-1000`} style={{ width: `${percent}%` }}></div></div>
        </div>
      ) : (
        <button onClick={onVote} disabled={submitting} className={`w-full py-5 bg-${colorClass}-600 text-white rounded-3xl font-black text-xl flex items-center justify-center gap-3 shadow-xl`}>
          {submitting ? <Loader2 className="animate-spin" /> : <><Vote /> সমর্থন দিন</>}
        </button>
      )}
    </div>
  );
};
