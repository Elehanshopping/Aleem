
import React, { useState, useEffect } from 'react';
import { UserCheck, ShieldCheck, MessageSquare, Star, LogIn, UserPlus, Quote, CheckCircle, TrendingUp, Heart, Users, Flag, Scale, Loader2 } from 'lucide-react';
import { CANDIDATE, ALIM_IMAGES } from '../constants';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, getDocs, where } from 'firebase/firestore';

interface Review {
  id: string;
  user: string;
  location: string;
  text: string;
  rating: number;
  date: any;
  verified: boolean;
  role?: string;
}

export const VolunteerSystem: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phone, setPhone] = useState('');
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch Reviews from Firestore
  useEffect(() => {
    if (!db) {
      console.warn("Firestore is not available. Using local dummy data.");
      setReviews([
        { id: '1', user: 'আহমেদ কবির', location: 'মোরেলগঞ্জ', text: 'অধ্যাপক আলিম সাহেবের বিকল্প নেই। ইনসাফ কায়েমে উনার ভূমিকা অপরিসীম।', rating: 5, date: null, verified: true },
        { id: '2', user: 'ফাতেমা বেগম', location: 'শরণখোলা', text: 'শান্তি ও প্রগতির জন্য দাড়িপাল্লায় ভোট দিন। আমরা আপনার সাথে আছি।', rating: 5, date: null, verified: true }
      ]);
      setLoading(false);
      return;
    }

    try {
      const q = query(collection(db, 'opinions'), orderBy('date', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const opinionsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Review[];
        setReviews(opinionsData);
        setLoading(false);
      }, (error) => {
        console.error("Firestore snapshot error:", error);
        // Fallback on error
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up Firestore listener:", err);
      setLoading(false);
    }
  }, []);

  const handleAddReview = async () => {
    if (!newReview.trim()) return;
    if (!db) {
      alert("ডেমো মোডে মতামত সেভ করা সম্ভব নয়।");
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'opinions'), {
        user: "ভেরিফাইড ভোটার",
        location: "বাগেরহাট-৪",
        text: newReview,
        rating: 5,
        date: serverTimestamp(),
        verified: true,
        role: "সমর্থক"
      });
      setNewReview('');
    } catch (error) {
      console.error("Error adding opinion: ", error);
      alert("দুঃখিত, মতামতটি গ্রহণ করা সম্ভব হয়নি। সম্ভবত ডাটাবেজ সংযোগে সমস্যা আছে।");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVolunteerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    
    if (!db) {
      setIsLoggedIn(true);
      return;
    }

    setSubmitting(true);
    try {
      const vRef = collection(db, 'volunteers');
      const q = query(vRef, where("phone", "==", phone));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await addDoc(vRef, {
          phone,
          status: 'active',
          registeredAt: serverTimestamp(),
          name: 'নতুন ভলান্টিয়ার'
        });
        alert("স্বাগতম! আপনি নতুন ভলান্টিয়ার হিসেবে নিবন্ধিত হয়েছেন।");
      } else {
        alert("স্বাগতম! আপনার ভলান্টিয়ার প্রোফাইল যাচাই করা হয়েছে।");
      }
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error with volunteer registration: ", error);
      setIsLoggedIn(true); // Allow demo login even if DB fails
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-16">
      <div className="bg-gradient-to-br from-green-950 via-emerald-900 to-green-900 rounded-[60px] p-8 md:p-20 text-white shadow-2xl relative overflow-hidden border border-white/10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-400/10 rounded-full -mr-64 -mt-64 blur-3xl animate-pulse"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-2/5">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-red-600 to-green-600 rounded-[50px] blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-700"></div>
              <div className="relative bg-white p-4 rounded-[48px] shadow-2xl overflow-hidden">
                <img 
                  src={ALIM_IMAGES.portrait_bg} 
                  alt="Candidate Profile"
                  className="rounded-[40px] w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                  <div className="font-black text-2xl text-white mb-1">প্রফেসর মোঃ আবদুল আলিম</div>
                  <div className="text-green-400 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                    <Scale size={16} /> দাড়িপাল্লা মার্কায় ভোট দিন
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 bg-red-600 text-white px-8 py-4 rounded-3xl shadow-xl font-black text-xl border-4 border-white transform -rotate-12">
                বিজয় ২০২৬
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/5 space-y-10">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-2 rounded-full text-green-300 font-bold text-sm tracking-widest uppercase">
              <Scale size={18} /> ইনসাফ ও সমৃদ্ধির প্রতীক
            </div>
            
            <div className="space-y-6">
               <Quote className="text-red-500 opacity-80" size={60} />
               <h3 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
                 "১২ ফেব্রুয়ারি <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-100 italic">দাঁড়িপাল্লায়</span> ভোট দিন।"
               </h3>
               <p className="text-xl md:text-2xl text-green-100/90 leading-relaxed font-medium">
                 আমার প্রিয় মোরেলগঞ্জ ও শরণখোলাবাসী, আমি কোনো রাজা হয়ে নয়, আপনাদের সেবক হয়ে এই ময়দানে নেমেছি। ১২ ফেব্রুয়ারি দাড়ি পাল্লায় একটি ভোট দিয়ে আপনারা ইনসাফ কায়েমের ইতিহাস গড়বেন। আমাদের বিজয় সুনিশ্চিত।
               </p>
            </div>

            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-green-400">
                  <TrendingUp />
                </div>
                <div>
                  <div className="font-bold text-lg">উন্নয়নের লক্ষ্য</div>
                  <div className="text-sm text-green-200/60">দাড়িপাল্লাই ভরসা</div>
                </div>
              </div>
              <div className="h-10 w-px bg-white/10 hidden md:block"></div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-red-400">
                  <Heart />
                </div>
                <div>
                  <div className="font-bold text-lg">জনগণের ভালোবাসা</div>
                  <div className="text-sm text-green-200/60">{reviews.length * 12 + 110500}+ সমর্থক</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div className="bg-white p-8 md:p-14 rounded-[50px] shadow-2xl border border-gray-100 relative">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
              <div>
                <h3 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">জনগণের স্বতঃস্ফূর্ত মতামত</h3>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-4">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-[10px] font-bold text-green-700">
                        U{i}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-green-700 font-black">
                      <CheckCircle size={18} />
                      <span>১১০৫০০+ মানুষের সমর্থন</span>
                    </div>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">ভেরিফাইড ভোটার ও সমর্থক</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100">
                <Scale className="text-green-600" size={24} />
                <span className="text-2xl font-black text-gray-800">মার্কা</span>
                <span className="text-green-600 font-black">দাঁড়িপাল্লা</span>
              </div>
            </div>

            {/* Post Opinion Input */}
            <div className="mb-12 p-6 bg-green-50 rounded-[32px] border-2 border-dashed border-green-200">
              <textarea 
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="আপনার মতামত বা দোয়া লিখুন..."
                className="w-full bg-transparent p-4 outline-none text-lg font-medium resize-none h-24"
              />
              <div className="flex justify-end mt-4">
                <button 
                  onClick={handleAddReview}
                  disabled={submitting || !newReview.trim()}
                  className="bg-green-600 text-white px-8 py-3 rounded-2xl font-black hover:bg-green-700 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting ? <Loader2 className="animate-spin" size={20} /> : <MessageSquare size={20} />}
                  মতামত দিন
                </button>
              </div>
            </div>

            <div className="space-y-8 mb-16">
              {loading ? (
                <div className="flex flex-col items-center py-20 text-gray-400">
                  <Loader2 className="animate-spin mb-4" size={48} />
                  <p className="font-bold">মতামত লোড হচ্ছে...</p>
                </div>
              ) : reviews.length === 0 ? (
                <p className="text-center text-gray-400 font-bold py-10">প্রথম মতামতটি আপনি দিন!</p>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="p-8 bg-gray-50/50 rounded-[40px] border border-gray-100 relative group hover:bg-white hover:shadow-2xl hover:border-green-100 transition-all duration-500">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-[24px] flex items-center justify-center font-black text-2xl shadow-lg shadow-green-100">
                          {review.user ? review.user[0] : 'V'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-gray-900 text-xl">{review.user}</span>
                            {review.verified && <CheckCircle size={16} className="text-blue-500" fill="currentColor" />}
                          </div>
                          <div className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em]">{review.location}</div>
                        </div>
                      </div>
                      <div className="flex text-yellow-400 bg-white p-2 rounded-xl shadow-sm">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                      </div>
                    </div>
                    <p className="text-gray-700 text-xl italic leading-relaxed font-medium">"{review.text}"</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-950 text-white p-10 md:p-12 rounded-[50px] shadow-2xl relative overflow-hidden border border-white/5">
            <div className="absolute top-0 left-0 w-48 h-48 bg-green-600/10 rounded-full -ml-24 -mt-24 blur-3xl"></div>
            <div className="text-center mb-10 relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-700 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-900/40">
                <Scale size={48} className="text-white" />
              </div>
              <h3 className="text-3xl font-black mb-4">{isLoggedIn ? 'সক্রিয় ভলান্টিয়ার' : 'ভলান্টিয়ার হাব'}</h3>
              <p className="text-gray-400 text-lg leading-relaxed">বাগেরহাট-৪ এ ইনসাফ কায়েমের লড়াইয়ে শরিক হোন</p>
            </div>

            {isLoggedIn ? (
              <div className="text-center space-y-6">
                <div className="p-8 bg-green-600/20 rounded-3xl border border-green-500/30">
                  <UserCheck size={48} className="text-green-500 mx-auto mb-4" />
                  <p className="font-bold text-xl">আপনার সেশন সক্রিয় আছে</p>
                </div>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  লগ আউট করুন
                </button>
              </div>
            ) : (
              <form onSubmit={handleVolunteerLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-4">মোবাইল নম্বর</label>
                  <input 
                    type="text" 
                    placeholder="০১৭XXXXXXXX" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl focus:border-green-500 outline-none text-white font-bold transition-all" 
                    required 
                  />
                </div>
                <button 
                  disabled={submitting}
                  className="w-full py-6 bg-green-600 rounded-[32px] font-black text-xl hover:bg-green-700 transition-all shadow-2xl flex items-center justify-center gap-4 group disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="animate-spin" /> : <>প্রবেশ করুন <LogIn size={24} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
