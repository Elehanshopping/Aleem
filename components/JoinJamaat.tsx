
import React, { useState, useEffect, useRef } from 'react';
import { UserPlus, Send, CheckCircle, Loader2, Users, MapPin, Phone, ShieldCheck, Clock, Calendar, Upload, Camera } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

interface JoinRequest {
  id: string;
  name: string;
  phone: string;
  wing: string;
  location: string;
  age: string;
  photo?: string;
  timestamp: any;
}

const DEFAULT_JOINER_IMAGE = "https://i.ibb.co.com/Wppstbd0/images-1.jpg";

const MOCK_DATA: JoinRequest[] = [
  { id: 'm1', name: 'মোঃ আরিফুল ইসলাম', phone: '01712XXXXXX', wing: 'যুব-জামায়াত', location: 'মোরেলগঞ্জ সদর', age: '২৬', timestamp: { toDate: () => new Date(Date.now() - 1000 * 60 * 60 * 2) } },
  { id: 'm2', name: 'আব্দুল্লাহ আল নোমান', phone: '01823XXXXXX', wing: 'ছাত্রশিবির', location: 'শরণখোলা সদর', age: '২২', timestamp: { toDate: () => new Date(Date.now() - 1000 * 60 * 120) } },
];

export const JoinJamaat: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    wing: 'বাংলাদেশ জামায়াতে ইসলামী',
    location: '',
    age: ''
  });
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [requests, setRequests] = useState<JoinRequest[]>(MOCK_DATA);
  const [loading, setLoading] = useState(true);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePhoto(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendEmailNotification = async (data: any) => {
    // In a real application, you would use a backend API or EmailJS
    // This is a simulation logic for the requested feature
    console.log(`Sending joiner data to: taksidwalid150@gmail.com`);
    console.log("Joiner Data:", data);
    
    // Example fetch to a hypothetical mailer API
    try {
      // In production: await fetch('https://your-api.com/send-email', { method: 'POST', body: JSON.stringify({...data, recipient: 'taksidwalid150@gmail.com'}) });
    } catch (e) {
      console.error("Email simulation failed", e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    
    setSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        photo: profilePhoto || '', // Store base64 photo if provided
        timestamp: serverTimestamp()
      };

      const newEntry: JoinRequest = {
        id: Date.now().toString(),
        ...formData,
        photo: profilePhoto || '',
        timestamp: { toDate: () => new Date() }
      };

      if (db) {
        await addDoc(collection(db, 'join_requests'), submissionData);
      }

      // Automatically send info to the developer mail
      await sendEmailNotification({
        ...formData,
        timestamp: new Date().toISOString()
      });

      setRequests(prev => [newEntry, ...prev]);
      setSuccess(true);
      setFormData({ name: '', phone: '', wing: 'বাংলাদেশ জামায়াতে ইসলামী', location: '', age: '' });
      setProfilePhoto(null);
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting join request:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date: any) => {
    if (!date) return 'এখনই';
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      <div className="bg-gradient-to-br from-[#006a4e] to-[#004d3b] rounded-[40px] md:rounded-[50px] p-6 md:p-16 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full -mr-24 md:-mr-32 -mt-24 md:-mt-32 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-2xl md:rounded-3xl flex items-center justify-center shrink-0">
            <UserPlus size={32} className="text-white md:w-10 md:h-10" />
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black mb-2 md:mb-4">আমাদের কাফেলায় যুক্ত হোন</h2>
            <p className="text-base md:text-xl text-green-100/80 font-medium">
              সৎ ও যোগ্য নেতৃত্বের সাথে ইনসাফ কায়েমের লড়াইয়ে নিজেকে অংশীদার করুন।
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Registration Form */}
        <div className="lg:col-span-5 bg-white p-6 md:p-12 rounded-[30px] md:rounded-[40px] shadow-xl border border-gray-100 h-fit">
          <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-6 md:mb-8 flex items-center gap-3">
            <Send className="text-green-600" size={20} /> সদস্য ফরম পূরণ করুন
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Photo Upload Area */}
            <div className="flex flex-col items-center mb-6">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative w-28 h-28 md:w-32 md:h-32 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center cursor-pointer overflow-hidden group hover:border-green-500 transition-all"
              >
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <Camera className="mx-auto text-gray-400 group-hover:text-green-600 mb-1" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ছবি যোগ করুন</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                   <Upload size={20} />
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
              <p className="text-[10px] text-gray-400 font-bold mt-2 text-center">নিজের পরিষ্কার ছবি আপলোড করলে লাইভ বোর্ডে দেখা যাবে (ঐচ্ছিক)</p>
            </div>

            <div className="space-y-1 md:space-y-2">
              <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">আপনার নাম</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="নাম লিখুন"
                className="w-full p-4 md:p-5 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:border-green-500 outline-none font-bold text-gray-700 text-sm md:text-base"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1 md:space-y-2">
                  <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">বয়স</label>
                  <input 
                    type="number" 
                    required
                    value={formData.age}
                    onChange={e => setFormData({...formData, age: e.target.value})}
                    placeholder="বয়স"
                    className="w-full p-4 md:p-5 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:border-green-500 outline-none font-bold text-gray-700 text-sm md:text-base"
                  />
               </div>
               <div className="space-y-1 md:space-y-2">
                  <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">মোবাইল নম্বর</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="০১৭XXXXXXXX"
                    className="w-full p-4 md:p-5 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:border-green-500 outline-none font-bold text-gray-700 text-sm md:text-base"
                  />
               </div>
            </div>

            <div className="space-y-1 md:space-y-2">
              <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">কাঙ্ক্ষিত সংগঠন</label>
              <select 
                value={formData.wing}
                onChange={e => setFormData({...formData, wing: e.target.value})}
                className="w-full p-4 md:p-5 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:border-green-500 outline-none font-bold appearance-none cursor-pointer text-gray-700 text-sm md:text-base"
              >
                {wings.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>

            <div className="space-y-1 md:space-y-2">
              <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">ঠিকানা (ইউনিয়ন/গ্রাম)</label>
              <input 
                type="text" 
                required
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                placeholder="যেমন: মোরেলগঞ্জ সদর"
                className="w-full p-4 md:p-5 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:border-green-500 outline-none font-bold text-gray-700 text-sm md:text-base"
              />
            </div>

            <button 
              type="submit"
              disabled={submitting}
              className={`w-full py-5 md:py-6 rounded-2xl md:rounded-3xl font-black text-lg md:text-xl transition-all shadow-xl flex items-center justify-center gap-3 ${
                submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white shadow-green-100'
              }`}
            >
              {submitting ? <Loader2 className="animate-spin" /> : <>আবেদন করুন <CheckCircle /></>}
            </button>

            {success && (
              <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl font-bold text-center text-sm md:text-base animate-in fade-in zoom-in">
                আলহামদুলিল্লাহ! আপনার আবেদনটি সফলভাবে গৃহীত হয়েছে।
              </div>
            )}
          </form>
        </div>

        {/* Members Board Table */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white rounded-[30px] md:rounded-[40px] shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-950 p-6 md:p-8 text-white flex flex-col sm:flex-row justify-between items-center gap-4">
               <h3 className="text-xl md:text-2xl font-black flex items-center gap-3">
                 <Users className="text-green-400" size={24} /> সদস্য বোর্ড
               </h3>
               <div className="px-4 py-1.5 bg-green-600/20 rounded-full text-green-400 font-bold text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                 লাইভ আপডেট
               </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest">নাম ও সংগঠন</th>
                    <th className="px-6 py-4 text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest text-center">মোবাইল নম্বর</th>
                    <th className="px-6 py-4 text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest text-right">তারিখ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading && requests.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-20 text-center text-gray-400 font-bold">লোড হচ্ছে...</td>
                    </tr>
                  ) : (
                    requests.map((req) => (
                      <tr key={req.id} className="hover:bg-green-50/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden shadow-lg border-2 border-white shrink-0 bg-gray-100">
                              <img src={req.photo || DEFAULT_JOINER_IMAGE} alt="Joiner" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-black text-gray-900 text-sm md:text-base group-hover:text-green-700">{req.name}</div>
                              <div className="text-[10px] md:text-[11px] font-bold text-green-600/70">{req.wing}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs md:text-sm font-black tabular-nums">
                            {req.phone || '—'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="text-[10px] md:text-xs font-bold text-gray-400 flex items-center justify-end gap-1.5">
                            <Calendar size={12} className="text-gray-300" />
                            {formatDate(req.timestamp)}
                          </div>
                          <div className="text-[9px] md:text-[10px] font-bold text-gray-300 uppercase mt-1 flex items-center justify-end gap-1.5">
                             <Clock size={10} />
                             {req.timestamp?.toDate ? new Date(req.timestamp.toDate()).toLocaleTimeString('bn-BD', {hour: '2-digit', minute: '2-digit'}) : 'এখনই'}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-green-50 p-6 md:p-8 rounded-[30px] md:rounded-[40px] border-2 border-dashed border-green-200">
            <h4 className="font-black text-green-900 mb-2 text-base md:text-lg">সদস্য হওয়ার নির্দেশনাবলী:</h4>
            <p className="text-green-800/70 text-xs md:text-sm leading-relaxed font-medium">
              ১. মহান আল্লাহর সার্বভৌমত্বে বিশ্বাস। <br />
              ২. ইনসাফ কায়েমে দায়বদ্ধ হওয়া। <br />
              ৩. দলীয় শৃঙ্খলা মেনে চলা।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
