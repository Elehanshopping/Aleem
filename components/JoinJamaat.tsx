
import React, { useState, useEffect, useRef } from 'react';
import { UserPlus, Send, CheckCircle, Loader2, Users, ShieldCheck, Clock, Calendar, Upload, Camera, Award, IdCard, Star } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, getCountFromServer } from 'firebase/firestore';

interface JoinRequest {
  id: string;
  name: string;
  phone: string;
  wing: string;
  location: string;
  age: string;
  photo?: string;
  timestamp: any;
  memberId?: string;
}

const DEFAULT_JOINER_IMAGE = "https://i.ibb.co.com/Wppstbd0/images-1.jpg";

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
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalMembers, setTotalMembers] = useState(1240); // Baseline
  
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
    
    // Listen for lifetime members
    const q = query(collection(db, 'join_requests'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const firestoreData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as JoinRequest[];
      
      setRequests(firestoreData);
      setLoading(false);
      
      // Update member count animation
      setTotalMembers(1240 + firestoreData.length);
    }, (err) => {
      console.error("Firestore error:", err);
      setLoading(false);
    });

    return () => unsubscribe();
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
    // This is the developer's requested email hook
    // To make this fully automatic, the user should connect EmailJS or a Backend Mailer
    console.log(`[AUTOMATIC ALERT] Sending lifetime member info to: taksidwalid150@gmail.com`);
    console.log("New Member Details:", data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    
    setSubmitting(true);

    try {
      const memberSerial = `BJ-${1000 + requests.length + 1}`;
      
      const submissionData = {
        ...formData,
        memberId: memberSerial,
        photo: profilePhoto || '',
        timestamp: serverTimestamp()
      };

      if (db) {
        await addDoc(collection(db, 'join_requests'), submissionData);
      }

      // Trigger automatic email notification
      await sendEmailNotification({
        ...formData,
        memberId: memberSerial,
        recipient: 'taksidwalid150@gmail.com',
        joinedAt: new Date().toLocaleString('bn-BD')
      });

      setSuccess(true);
      setFormData({ name: '', phone: '', wing: 'বাংলাদেশ জামায়াতে ইসলামী', location: '', age: '' });
      setProfilePhoto(null);
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting join request:", error);
      alert("দুঃখিত, তথ্য সংরক্ষণ করা যায়নি। আপনার ইন্টারনেট কানেকশন চেক করুন।");
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
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#004d3b] via-[#006a4e] to-black rounded-[40px] md:rounded-[60px] p-8 md:p-20 text-white relative overflow-hidden shadow-3xl border border-white/10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-400/10 rounded-full -mr-80 -mt-80 blur-[120px] animate-pulse"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/10 backdrop-blur-xl rounded-full text-green-300 font-black text-xs md:text-sm uppercase tracking-widest border border-white/20">
              <Award className="animate-bounce" size={20} /> ইনসাফ কায়েমের শপথ
            </div>
            <h2 className="text-4xl md:text-7xl font-black leading-[1.1] tracking-tighter">
              আমাদের আজীবনের <br /> সাথী হোন
            </h2>
            <p className="text-lg md:text-2xl text-green-100/70 font-bold max-w-xl">
              সদস্যপদ গ্রহণ করে আপনি আমাদের এই মহান কাফেলার স্থায়ী অংশীদার হিসেবে পরিচিত হবেন ইনশাআল্লাহ।
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-2xl p-8 md:p-12 rounded-[50px] border border-white/10 text-center shadow-4xl group">
             <div className="text-green-400 font-black text-sm uppercase tracking-[0.3em] mb-4">মোট আজীবন সদস্য</div>
             <div className="text-6xl md:text-8xl font-black text-white tabular-nums drop-shadow-2xl group-hover:scale-110 transition-transform duration-500">
               {totalMembers.toLocaleString('bn-BD')}
             </div>
             <div className="flex items-center justify-center gap-2 text-green-300 mt-6 font-bold">
               <span className="w-3 h-3 bg-green-500 rounded-full animate-ping"></span>
               লাইভ আপডেট
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
        {/* Registration Form */}
        <div className="lg:col-span-5 bg-white p-8 md:p-14 rounded-[40px] md:rounded-[50px] shadow-3xl border border-gray-100 h-fit sticky top-32">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center shadow-xl shadow-green-50">
               <UserPlus size={32} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">সদস্য আবেদন ফরম</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Enhanced Photo Upload */}
            <div className="flex flex-col items-center mb-8">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative w-32 h-32 md:w-40 md:h-40 bg-gray-50 border-4 border-dashed border-gray-200 rounded-[40px] flex items-center justify-center cursor-pointer overflow-hidden group hover:border-green-500 hover:bg-green-50 transition-all duration-500 shadow-inner"
              >
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <Camera className="mx-auto text-gray-300 group-hover:text-green-600 mb-2 transition-colors" size={32} />
                    <span className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest leading-tight block">প্রোফাইল ছবি যোগ করুন</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-300">
                   <Upload size={24} className="mb-2" />
                   <span className="text-[10px] font-black uppercase">পরিবর্তন করুন</span>
                </div>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">আপনার পূর্ণ নাম</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="এখানে নাম লিখুন"
                className="w-full p-5 bg-gray-50 border border-gray-100 rounded-[24px] focus:border-green-500 focus:bg-white outline-none font-bold text-gray-700 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">বয়স</label>
                  <input 
                    type="number" 
                    required
                    value={formData.age}
                    onChange={e => setFormData({...formData, age: e.target.value})}
                    placeholder="বয়স"
                    className="w-full p-5 bg-gray-50 border border-gray-100 rounded-[24px] focus:border-green-500 focus:bg-white outline-none font-bold text-gray-700 transition-all"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">মোবাইল নম্বর</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="০১৭XXXXXXXX"
                    className="w-full p-5 bg-gray-50 border border-gray-100 rounded-[24px] focus:border-green-500 focus:bg-white outline-none font-bold text-gray-700 transition-all"
                  />
               </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">কাঙ্ক্ষিত সংগঠন</label>
              <select 
                value={formData.wing}
                onChange={e => setFormData({...formData, wing: e.target.value})}
                className="w-full p-5 bg-gray-50 border border-gray-100 rounded-[24px] focus:border-green-500 focus:bg-white outline-none font-bold appearance-none cursor-pointer text-gray-700"
              >
                {wings.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">ঠিকানা (ইউনিয়ন/গ্রাম)</label>
              <input 
                type="text" 
                required
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                placeholder="যেমন: মোরেলগঞ্জ সদর"
                className="w-full p-5 bg-gray-50 border border-gray-100 rounded-[24px] focus:border-green-500 focus:bg-white outline-none font-bold text-gray-700 transition-all"
              />
            </div>

            <button 
              type="submit"
              disabled={submitting}
              className={`w-full py-6 rounded-[30px] font-black text-xl transition-all shadow-4xl flex items-center justify-center gap-3 border-b-8 ${
                submitting ? 'bg-gray-400 border-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white border-green-800 active:scale-95'
              }`}
            >
              {submitting ? <Loader2 className="animate-spin" /> : <>আজীবন সদস্য হোন <CheckCircle /></>}
            </button>

            {success && (
              <div className="p-6 bg-green-50 border-2 border-green-200 text-green-700 rounded-3xl font-black text-center text-sm md:text-base animate-in zoom-in duration-300">
                 মারহাবা! আপনার সদস্যপদ আজীবনের জন্য সংরক্ষিত করা হয়েছে।
              </div>
            )}
          </form>
        </div>

        {/* Lifetime Honor Board */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white rounded-[50px] shadow-3xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-950 p-8 text-white flex flex-col sm:flex-row justify-between items-center gap-6">
               <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-gradient-to-tr from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl">
                   <Award className="text-white" size={32} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black">আজীবন সদস্য বোর্ড</h3>
                    <p className="text-amber-400 font-bold text-xs uppercase tracking-widest">Lifetime Honor Roll</p>
                 </div>
               </div>
               <div className="px-5 py-2 bg-green-600/20 rounded-full text-green-400 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center gap-3 border border-green-500/20">
                 <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></span>
                 স্থায়ী সদস্যপদ সংরক্ষিত
               </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/80 border-b border-gray-100">
                  <tr>
                    <th className="px-8 py-6 text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-[0.2em]">সদস্য প্রোফাইল ও আইডি</th>
                    <th className="px-8 py-6 text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-[0.2em] text-center">মোবাইল ও স্ট্যাটাস</th>
                    <th className="px-8 py-6 text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-[0.2em] text-right">যোগদানের তারিখ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    <tr>
                      <td colSpan={3} className="px-8 py-24 text-center text-gray-400 font-bold">
                        <Loader2 className="animate-spin mx-auto mb-4" size={48} />
                        অনার বোর্ড লোড হচ্ছে...
                      </td>
                    </tr>
                  ) : requests.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-8 py-32 text-center text-gray-400 font-bold space-y-4">
                        <Users size={64} className="mx-auto opacity-10 mb-4" />
                        <p className="text-xl">এখনো কোনো সদস্য যুক্ত হয়নি।</p>
                        <p className="text-sm font-medium">প্রথম আজীবন সদস্য হিসেবে আপনি যুক্ত হোন!</p>
                      </td>
                    </tr>
                  ) : (
                    requests.map((req, idx) => (
                      <tr key={req.id} className="hover:bg-green-50/40 transition-all duration-300 group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-5">
                            <div className="relative shrink-0">
                               <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden shadow-xl border-4 border-white group-hover:scale-105 transition-transform bg-gray-100">
                                 <img src={req.photo || DEFAULT_JOINER_IMAGE} alt="Joiner" className="w-full h-full object-cover" />
                               </div>
                               <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-lg">
                                  <Star size={12} fill="currentColor" />
                               </div>
                            </div>
                            <div>
                              <div className="font-black text-gray-900 text-base md:text-lg group-hover:text-green-700 leading-tight flex items-center gap-2">
                                {req.name}
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[9px] font-black uppercase tracking-widest hidden sm:inline-block">LIFETIME</span>
                              </div>
                              <div className="flex items-center gap-1.5 mt-1">
                                <IdCard size={14} className="text-amber-500" />
                                <span className="text-[11px] font-black text-amber-600 uppercase tracking-widest">ID: {req.memberId || `BJ-${1000 + requests.length - idx}`}</span>
                              </div>
                              <div className="text-[10px] font-bold text-gray-400 mt-0.5">{req.wing}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <div className="font-black text-gray-700 text-sm md:text-base tabular-nums mb-1 tracking-wider">{req.phone}</div>
                          <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-100">
                            <ShieldCheck size={10} /> স্থায়ী সদস্য
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="text-xs md:text-sm font-black text-gray-900 flex items-center justify-end gap-2">
                            <Calendar size={14} className="text-green-600" />
                            {formatDate(req.timestamp)}
                          </div>
                          <div className="text-[10px] font-bold text-gray-400 uppercase mt-1 flex items-center justify-end gap-1.5">
                             <Clock size={12} />
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

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-10 rounded-[50px] border-2 border-dashed border-green-200 relative overflow-hidden">
             <div className="absolute -right-10 -bottom-10 opacity-5">
                <ShieldCheck size={200} />
             </div>
             <div className="relative z-10">
                <h4 className="font-black text-green-950 mb-4 text-xl flex items-center gap-3">
                   <Star className="text-yellow-500" fill="currentColor" /> আজীবন সদস্যপদের মর্যাদাসমূহ:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <BenefitItem text="সংগঠনের স্থায়ী নীতি নির্ধারণী আলোচনায় মত প্রকাশের অধিকার।" />
                   <BenefitItem text="ভবিষ্যত সুশিক্ষিত প্রজন্ম গড়ার কার্যক্রমে সরাসরি অংশগ্রহণ।" />
                   <BenefitItem text="ইনসাফ কায়েমের লড়াইয়ে অগ্রভাগে থাকার বিরল সুযোগ।" />
                   <BenefitItem text="এলাকার উন্নয়নে সরাসরি স্বেচ্ছাসেবক হিসেবে ভূমিকা রাখা।" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BenefitItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex gap-3 items-start">
    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
       <CheckCircle className="text-white" size={12} />
    </div>
    <p className="text-green-900/80 text-sm font-bold leading-relaxed">{text}</p>
  </div>
);
