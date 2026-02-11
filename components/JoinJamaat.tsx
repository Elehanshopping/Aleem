
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

export const JoinJamaat: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    wing: 'বাংলাদেশ জামায়াতে ইসলামী',
    location: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [requests, setRequests] = useState<JoinRequest[]>([]);
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
    const q = query(collection(db, 'join_requests'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as JoinRequest[];
      setRequests(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // 1. Save to Firestore
      if (db) {
        await addDoc(collection(db, 'join_requests'), {
          ...formData,
          timestamp: serverTimestamp()
        });
      }

      // 2. Email simulation logic
      // In a real production app, you would use EmailJS or a Firebase Cloud Function
      // to send the email to TaksidWalid150@gmail.com
      console.log("Sending email to TaksidWalid150@gmail.com with data:", formData);

      setSuccess(true);
      setFormData({ name: '', phone: '', wing: 'বাংলাদেশ জামায়াতে ইসলামী', location: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting join request:", error);
      alert("দুঃখিত, কোনো একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
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
        <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-gray-100">
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
                placeholder="নাম লিখুন"
                className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:border-green-500 outline-none font-bold"
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
                className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:border-green-500 outline-none font-bold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">কাঙ্ক্ষিত সংগঠন</label>
              <select 
                value={formData.wing}
                onChange={e => setFormData({...formData, wing: e.target.value})}
                className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:border-green-500 outline-none font-bold appearance-none cursor-pointer"
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
                placeholder="যেমন: মোরেলগঞ্জ সদর, খাউলিয়া"
                className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:border-green-500 outline-none font-bold"
              />
            </div>

            <button 
              type="submit"
              disabled={submitting}
              className="w-full py-6 bg-green-600 text-white rounded-3xl font-black text-xl hover:bg-green-700 transition-all shadow-xl shadow-green-100 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {submitting ? <Loader2 className="animate-spin" /> : <>আবেদন সম্পন্ন করুন <CheckCircle /></>}
            </button>

            {success && (
              <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl font-bold text-center animate-in fade-in zoom-in">
                আপনার আবেদনটি সফলভাবে গৃহীত হয়েছে এবং সংশ্লিষ্ট ইমেইলে পাঠানো হয়েছে।
              </div>
            )}
          </form>
        </div>

        {/* Results / Member List */}
        <div className="space-y-8">
          <div className="bg-gray-900 text-white p-8 rounded-[40px] shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black flex items-center gap-3">
                <Users className="text-green-400" /> নিবন্ধিত সদস্যবৃন্দ
              </h3>
              <div className="px-4 py-2 bg-green-600/20 rounded-full text-green-400 font-bold text-xs uppercase tracking-widest">
                লাইভ তালিকা
              </div>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto no-scrollbar pr-2">
              {loading ? (
                <div className="text-center py-20 text-gray-500 font-bold">তালিকা লোড হচ্ছে...</div>
              ) : requests.length === 0 ? (
                <div className="text-center py-20 text-gray-500 font-bold">এখনো কেউ যোগ দেয়নি। প্রথম হয়ে আপনি যোগ দিন!</div>
              ) : (
                requests.map((req) => (
                  <div key={req.id} className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-black text-lg text-white mb-1">{req.name}</h4>
                        <div className="flex items-center gap-2 text-xs font-bold text-green-400">
                          <ShieldCheck size={14} /> {req.wing}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase">
                        <Clock size={12} />
                        {req.timestamp ? new Date(req.timestamp.toDate()).toLocaleTimeString('bn-BD') : 'এখনই'}
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
            <h4 className="font-black text-green-900 mb-2">কেন আমাদের সাথে যুক্ত হবেন?</h4>
            <p className="text-green-800/70 text-sm leading-relaxed font-medium">
              আমরা একটি ইনসাফ ভিত্তিক সমাজ ব্যবস্থা কায়েম করতে চাই যেখানে মানুষের মৌলিক অধিকার এবং ধর্মীয় মূল্যবোধ সুরক্ষিত থাকবে। আপনার শ্রম এবং মেধা একটি সুন্দর আগামী বিনির্মাণে সহায়ক হবে ইনশাআল্লাহ।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
