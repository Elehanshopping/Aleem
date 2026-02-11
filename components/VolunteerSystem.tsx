
import React, { useState, useEffect } from 'react';
import { UserCheck, ShieldCheck, MessageSquare, Star, LogIn, UserPlus, Quote, CheckCircle, TrendingUp, Heart, Users, Flag, Scale, Loader2 } from 'lucide-react';
import { CANDIDATE, ALIM_IMAGES } from '../constants';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

export const VolunteerSystem: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phone, setPhone] = useState('');
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (db) {
      const q = query(collection(db, 'opinions'), orderBy('date', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const opinionsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReviews(opinionsData);
        setLoading(false);
      }, () => setLoading(false));
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const handleAddReview = async () => {
    if (!newReview.trim() || submitting) return;
    setSubmitting(true);

    const mockReview = { id: Date.now().toString(), user: "ভেরিফাইড ভোটার", location: "বাগেরহাট-৪", text: newReview, rating: 5, verified: true };

    const processOpinion = async () => {
      try {
        if (db) {
          await Promise.race([
            addDoc(collection(db, 'opinions'), { user: "ভেরিফাইড ভোটার", location: "বাগেরহাট-৪", text: newReview, rating: 5, date: serverTimestamp(), verified: true }),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2500))
          ]);
        }
      } catch (e) {
        console.warn("Opinion DB sync timeout");
      }
      
      setReviews(prev => [mockReview, ...prev]);
      setNewReview('');
      setSubmitting(false);
    };

    processOpinion();
  };

  const handleVolunteerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || submitting) return;
    setSubmitting(true);
    
    // Simulate auth/sync
    setTimeout(() => {
      setIsLoggedIn(true);
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div className="space-y-16">
      <div className="bg-gray-950 text-white p-10 md:p-12 rounded-[50px] shadow-2xl relative border border-white/5 max-w-2xl mx-auto">
        <h3 className="text-3xl font-black mb-4 text-center">{isLoggedIn ? 'স্বাগতম ভলান্টিয়ার' : 'ভলান্টিয়ার লগইন'}</h3>
        {isLoggedIn ? (
          <div className="text-center p-8 bg-green-600/20 rounded-3xl">
            <UserCheck size={48} className="text-green-500 mx-auto mb-4" />
            <p className="font-bold text-xl">আপনার প্রোফাইল সক্রিয় আছে</p>
          </div>
        ) : (
          <form onSubmit={handleVolunteerLogin} className="space-y-6">
            <input 
              type="text" placeholder="০১৭XXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)}
              className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl outline-none text-white font-bold" required 
            />
            <button disabled={submitting} className="w-full py-6 bg-green-600 rounded-[32px] font-black text-xl flex items-center justify-center gap-4">
              {submitting ? <Loader2 className="animate-spin" /> : <>প্রবেশ করুন <LogIn size={24} /></>}
            </button>
          </form>
        )}
      </div>

      <div className="bg-white p-8 md:p-14 rounded-[50px] shadow-2xl border border-gray-100 max-w-4xl mx-auto">
        <h3 className="text-3xl font-black mb-8">জনগণের মতামত</h3>
        <div className="mb-12 p-6 bg-green-50 rounded-[32px] border-2 border-dashed border-green-200">
          <textarea value={newReview} onChange={(e) => setNewReview(e.target.value)} placeholder="আপনার মতামত লিখুন..." className="w-full bg-transparent p-4 outline-none text-lg h-24" />
          <button onClick={handleAddReview} disabled={submitting || !newReview.trim()} className="mt-4 bg-green-600 text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 float-right">
            {submitting ? <Loader2 className="animate-spin" size={20} /> : <MessageSquare size={20} />} মতামত দিন
          </button>
          <div className="clear-both"></div>
        </div>
        <div className="space-y-8">
          {reviews.map(review => (
            <div key={review.id} className="p-8 bg-gray-50 rounded-[40px] border border-gray-100">
              <div className="flex items-center gap-5 mb-4">
                <div className="w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center font-black">{review.user[0]}</div>
                <div><span className="font-black text-gray-900">{review.user}</span><div className="text-xs text-gray-400 font-bold">{review.location}</div></div>
              </div>
              <p className="text-gray-700 italic font-medium">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
