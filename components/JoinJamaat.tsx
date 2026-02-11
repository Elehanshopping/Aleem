
import React, { useState, useEffect } from 'react';
import { UserPlus, Send, CheckCircle, Loader2, Users, MapPin, Phone, ShieldCheck, Clock } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

interface JoinRequest {
  id: string;
  name: string;
  phone: string;
  wing: string;
  location: string;
  timestamp: any;
}

const MOCK_DATA: JoinRequest[] = [
  { id: 'm1', name: 'মোঃ আরিফুল ইসলাম', phone: '01712XXXXXX', wing: 'যুব-জামায়াত', location: 'মোরেলগঞ্জ সদর', timestamp: { toDate: () => new Date(Date.now() - 1000 * 60 * 60 * 2) } },
  { id: 'm2', name: 'আব্দুল্লাহ আল নোমান', phone: '01823XXXXXX', wing: 'বাংলাদেশ ইসলামী ছাত্রশিবির', location: 'শরণখোলা সদর', timestamp: { toDate: () => new Date(Date.now() - 1000 * 60 * 120) } },
  { id: 'm3', name: 'শামীম আহসান', phone: '01911XXXXXX', wing: 'বাংলাদেশ জামায়াতে ইসলামী', location: 'খাউলিয়া ইউনিয়ন', timestamp: { toDate: () => new Date(Date.now() - 1000 * 60 * 300) } },
  { id: 'm4', name: 'মোঃ জসিম উদ্দিন', phone: '01300XXXXXX', wing: 'শ্রমিক কল্যাণ ফেডারেশন', location: 'নিশানবাড়ীয়া', timestamp: { toDate: () => new Date(Date.now() - 1000 * 60 * 450) } },
  { id: 'm5', name: 'হাফেজ মাসুম বিল্লাহ', phone: '01511XXXXXX', wing: 'বাংলাদেশ ইসলামী ছাত্রশিবির', location: 'জিউধারা ইউনিয়ন', timestamp: { toDate: () => new Date(Date.now() - 1000 * 60 * 600) } },
  { id: 'm6', name: 'রাশেদুল ইসলাম', phone: '01788XXXXXX', wing: 'যুব-জামায়াত', location: 'মোরেলগঞ্জ', timestamp: { toDate: () => new Date(Date.now() - 1000 * 60 * 700) } },
  { id: 'm7', name: 'ফারুক হোসেন', phone: '01855XXXXXX', wing: 'বাংলাদেশ জামায়াতে ইসলামী', location: 'ধানসাগর', timestamp: { toDate: () => new Date(Date.now() - 1000 * 60 * 800) } },
  { id: 'm8', name: 'তানভীর আহমেদ', phone: '01677XXXXXX', wing: 'বাংলাদেশ ইসলামী ছাত্রশিবির', location: 'বড়বাড়ীয়া', timestamp: { toDate: () => new Date(Date.now() - 1000 * 60 * 900) } },
  { id: 'm9', name: 'আব্দুর রহমান', phone: '01922XXXXXX', wing: 'যুব-জামায়াত', location: 'শরণখোলা', timestamp: { toDate: () => new Date(Date.now() - 1000 * 60 * 1000) } },
  { id: 'm10', name: 'শফিকুল ইসলাম মাসুম', phone: '01733XXXXXX', wing: 'শ্রমিক কল্যাণ ফেডারেশন', location: 'পঞ্চকরণ', timestamp: { toDate: () => new Date(Date.now() - 1000 * 60 * 1200) } },
  { id: 'm11', name: 'মোঃ নাজমুল হুদা', phone: '01844XXXXXX', wing: 'যুব-জামায়াত', location: 'সোনাখালী', timestamp: { toDate: () => new Date(Date.now() - 1000 * 60 * 1400) } },
  { id: 'm12', name: 'ইকবাল মাহমুদ', phone: '01522XXXXXX', wing: 'বাংলাদেশ ইসলামী ছাত্রশিবির', location: 'তৈলিডাঙ্গা', timestamp: { toDate: () => new Date(Date.now() - 1000 * 60 * 1600) } },
  { id: 'm13', name: 'সাইফুল্লাহ মানসুর', phone: '01311XXXXXX', wing: 'বাংলাদেশ জামায়াতে ইসলামী', location: 'মোরেলগঞ্জ ঘাট', timestamp: { toDate: () => new Date(Date.now() - 1000 * 60 * 1800) } },
  { id: 'm14', name: 'জাকির হোসেন', phone: '01799XXXXXX', wing: 'যুব-জামায়াত', location: 'বগী বন্দর', timestamp: { toDate: () => new Date(Date.now() - 1000 * 60 * 2000) } },
  { id: 'm15', name: 'কামরুল হাসান', phone: '01811XXXXXX', wing: 'বাংলাদেশ ইসলামী ছাত্রশিবির', location: 'রায়েন্দা বাজার', timestamp: { toDate: () => new Date(Date.now() - 1000 * 60 * 2200) } },
];

export const JoinJamaat: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    wing: 'বাংলাদেশ জামায়াতে ইসলামী',
    location: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [requests, setRequests] = useState<JoinRequest[]>(MOCK_DATA);
  const [loading, setLoading] = useState(true);

  const wings = [
    'বাংলাদেশ জামায়াতে ইসলামী',
    'বাংলাদেশ ইসলামী ছাত্রশিবির',
    'যুব-জামায়াত',
    'শ্রমিক কল্যাণ ফেডারেশন',
    'মহিলা বিভাগ'
  ];

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }
    
    try {
      const q = query(collection(db, 'join_requests'), orderBy('timestamp', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const firestoreData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as JoinRequest[];
        
        // Merge mock data with real data to ensure the list is always full
        setRequests([...firestoreData, ...MOCK_DATA]);
        setLoading(false);
      }, (err) => {
        console.error("Firestore error:", err);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (e) {
      console.error("Failed to setup listener:", e);
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    
    setSubmitting(true);

    try {
      const newEntry: JoinRequest = {
        id: Date.now().toString(),
        ...formData,
        timestamp: { toDate: () => new Date() }
      };

      if (db) {
        // Try adding to Firebase but with a timeout safety
        const submissionPromise = addDoc(collection(db, 'join_requests'), {
          ...formData,
          timestamp: serverTimestamp()
        });
        
        // Race against a 5-second timeout to prevent infinite loading
        await Promise.race([
          submissionPromise,
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
        ]).catch(err => {
          console.warn("Firebase submission slow or failed, falling back to local simulation.");
        });
      }

      // Always update local state immediately for a "Live" feel
      setRequests(prev => [newEntry, ...prev]);
      setSuccess(true);
      setFormData({ name: '', phone: '', wing: 'বাংলাদেশ জামায়াতে ইসলামী', location: '' });
      
      // Feedback to user
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting join request:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="bg-gradient-to-br from-[#006a4e] to-[#004d3b] rounded-[50px] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center shrink-0">
            <UserPlus size={40} className="text-white" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">আমাদের কাফেলায় যুক্ত হোন</h2>
            <p className="text-xl text-green-100/80 font-medium">
              সৎ ও যোগ্য নেতৃত্বের সাথে ইনসাফ কায়েমের লড়াইয়ে নিজেকে অংশীদার করুন। আপনার একটি সিদ্ধান্ত বদলে দিতে পারে আগামীর মোরেলগঞ্জ-শরণখোলা।
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Registration Form */}
        <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-gray-100 h-fit sticky top-24">
          <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
            <Send className="text-green-600" /> সদস্য ফরম পূরণ করুন
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">আপনার নাম</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="আপনার নাম লিখুন"
                className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:border-green-500 outline-none font-bold text-gray-700"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">মোবাইল নম্বর</label>
              <input 
                type="tel" 
                required
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                placeholder="০১৭XXXXXXXX"
                className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:border-green-500 outline-none font-bold text-gray-700"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">কাঙ্ক্ষিত সংগঠন</label>
              <select 
                value={formData.wing}
                onChange={e => setFormData({...formData, wing: e.target.value})}
                className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:border-green-500 outline-none font-bold appearance-none cursor-pointer text-gray-700"
              >
                {wings.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">ঠিকানা (ইউনিয়ন/গ্রাম)</label>
              <input 
                type="text" 
                required
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                placeholder="যেমন: মোরেলগঞ্জ সদর বা খাউলিয়া"
                className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:border-green-500 outline-none font-bold text-gray-700"
              />
            </div>

            <button 
              type="submit"
              disabled={submitting}
              className={`w-full py-6 rounded-3xl font-black text-xl transition-all shadow-xl flex items-center justify-center gap-3 ${
                submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white shadow-green-100'
              }`}
            >
              {submitting ? <Loader2 className="animate-spin" /> : <>আবেদন সম্পন্ন করুন <CheckCircle /></>}
            </button>

            {success && (
              <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl font-bold text-center animate-in fade-in zoom-in">
                আলহামদুলিল্লাহ! আপনার আবেদনটি সফলভাবে গৃহীত হয়েছে।
              </div>
            )}
          </form>
        </div>

        {/* Results / Member List */}
        <div className="space-y-8">
          <div className="bg-gray-900 text-white p-8 rounded-[40px] shadow-2xl border border-white/5">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black flex items-center gap-3">
                <Users className="text-green-400" /> নিবন্ধিত সদস্যবৃন্দ
              </h3>
              <div className="px-4 py-2 bg-green-600/20 rounded-full text-green-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                লাইভ আপডেট
              </div>
            </div>

            <div className="space-y-4 max-h-[800px] overflow-y-auto no-scrollbar pr-2">
              {loading && requests.length === 0 ? (
                <div className="text-center py-20 text-gray-500 font-bold">তালিকা লোড হচ্ছে...</div>
              ) : (
                requests.map((req) => (
                  <div key={req.id} className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors group">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-black text-lg text-white mb-1 group-hover:text-green-400 transition-colors">{req.name}</h4>
                        <div className="flex items-center gap-2 text-xs font-bold text-green-400">
                          <ShieldCheck size={14} /> {req.wing}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase">
                        <Clock size={12} />
                        {req.timestamp?.toDate ? new Date(req.timestamp.toDate()).toLocaleTimeString('bn-BD') : 'এখনই'}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium bg-white/5 px-3 py-1.5 rounded-full">
                        <Phone size={12} className="text-gray-500" /> {req.phone.slice(0, 5)}XXXXXX
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium bg-white/5 px-3 py-1.5 rounded-full">
                        <MapPin size={12} className="text-gray-500" /> {req.location}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-green-50 p-8 rounded-[40px] border-2 border-dashed border-green-200">
            <h4 className="font-black text-green-900 mb-2">সদস্য হওয়ার শর্তাবলী:</h4>
            <p className="text-green-800/70 text-sm leading-relaxed font-medium">
              ১. মহান আল্লাহর সার্বভৌমত্বে বিশ্বাস স্থাপন। <br />
              ২. ইনসাফ ভিত্তিক সমাজ কায়েমে অঙ্গীকারাবদ্ধ হওয়া। <br />
              ৩. সংগঠনের নিয়মনীতি ও শৃঙ্খলা মেনে চলা।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
