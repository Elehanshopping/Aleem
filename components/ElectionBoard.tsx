
import React, { useState, useEffect } from 'react';
import { CANDIDATE, LOGOS } from '../constants';
import { BarChart3, TrendingUp, Users, AlertCircle, Clock, Search, Ghost, Loader2, Vote, CheckCircle } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

export const ElectionBoard: React.FC = () => {
  const [votes, setVotes] = useState({ jamaat: 155, bnp: 51 });
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const storedVote = localStorage.getItem('has_voted_bagerhat4_local');
    if (storedVote) setVoted(true);

    if (db) {
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
      }, () => setLoading(false));
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLocalVote = async (choice: 'jamaat' | 'bnp') => {
    if (voted || submitting) return;
    setSubmitting(true);

    const processVote = async () => {
      try {
        if (db) {
          await Promise.race([
            addDoc(collection(db, 'local_bagerhat_votes'), { candidate: choice, timestamp: serverTimestamp() }),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2500))
          ]);
        }
      } catch (e) {
        console.warn("DB Timeout, but continuing locally");
      }
      
      localStorage.setItem('has_voted_bagerhat4_local', choice);
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
    <div className="space-y-12">
      <div className="bg-gradient-to-r from-gray-900 to-black rounded-[50px] p-10 text-white shadow-2xl relative overflow-hidden border border-white/10">
        <h3 className="text-4xl md:text-5xl font-black mb-2">নির্বাচনী ফলাফল বোর্ড</h3>
        <p className="text-gray-400 font-medium">বাগেরহাট-৪ আসনের লাইভ আপডেট এবং জরিপ</p>
      </div>

      <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LocalCandidateCard 
            name={CANDIDATE.name} party="বাংলাদেশ জামায়াতে ইসলামী" symbol="দাঁড়িপাল্লা" logo={LOGOS.SCALE} 
            votes={votes.jamaat} percent={jamaatPercent} voted={voted} color="green"
            onVote={() => handleLocalVote('jamaat')} submitting={submitting}
          />
          <LocalCandidateCard 
            name="সোমনাথ দে" party="বি.এন.পি" symbol="ধানের শীষ" logo={LOGOS.PADDY} 
            votes={votes.bnp} percent={bnpPercent} voted={voted} color="blue"
            onVote={() => handleLocalVote('bnp')} submitting={submitting}
          />
        </div>
      </div>
    </div>
  );
};

const LocalCandidateCard: React.FC<any> = ({ name, party, symbol, logo, votes, percent, voted, color, onVote, submitting }) => {
  const colorClass = color === 'green' ? 'green' : 'blue';
  return (
    <div className={`p-8 rounded-[40px] border-2 ${voted ? 'bg-gray-50 border-gray-100 shadow-inner' : `bg-white border-${colorClass}-100 hover:shadow-2xl`}`}>
      <div className="flex items-center gap-5 mb-8">
        <div className={`w-20 h-20 bg-${colorClass}-50 rounded-3xl p-2 shadow-lg border-2 border-white`}><img src={logo} alt={symbol} className="w-full h-full object-contain" /></div>
        <div><h4 className="text-2xl font-black">{name}</h4><p className={`text-${colorClass}-700 font-bold`}>মার্কা: {symbol}</p></div>
      </div>
      {voted ? (
        <div className="space-y-4">
          <div className="flex justify-between items-end mb-2"><span className={`text-5xl font-black text-${colorClass}-600`}>{percent}%</span><span className="text-sm font-bold text-gray-400">{votes.toLocaleString('bn-BD')} ভোট</span></div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden"><div className={`h-full bg-${colorClass}-600 transition-all duration-1000`} style={{ width: `${percent}%` }}></div></div>
        </div>
      ) : (
        <button onClick={onVote} disabled={submitting} className={`w-full py-5 bg-${colorClass}-600 text-white rounded-3xl font-black text-xl flex items-center justify-center gap-3 shadow-xl`}>
          {submitting ? <Loader2 className="animate-spin" /> : <><Vote /> ভোট দিন</>}
        </button>
      )}
    </div>
  );
};
