
import React from 'react';
import { GONOVOTE_INFO } from '../constants';
import { CheckCircle2, XCircle, Info, Users, ShieldCheck, Zap, AlertTriangle, Scale } from 'lucide-react';

export const GonovoteGuide: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-10 md:p-20 rounded-[50px] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-40 -mt-40 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full -ml-32 -mb-32 blur-2xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
              <Info size={32} className="text-blue-100" />
            </div>
            <span className="font-black uppercase tracking-[0.2em] text-blue-200 text-sm">নির্বাচনী গাইডলাইন</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tight">
            গণভোট: আপনার আগামী <br className="hidden md:block" /> প্রজন্মের জন্য সঠিক সিদ্ধান্ত
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-2xl font-medium">
            ১২ ফেব্রুয়ারি আপনার একটি ভোট নির্ধারণ করবে মোরেলগঞ্জ ও শরণখোলার ভবিষ্যৎ। কেন গণভোটে আপনার অংশগ্রহণ ও সঠিক রায় জরুরি, তা নিচে বিস্তারিত আলোচনা করা হলো।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Yes Section */}
        <div className="space-y-8 animate-in slide-in-from-left duration-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-green-100 text-green-600 rounded-[20px] shadow-lg shadow-green-100">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-3xl font-black text-green-900">{GONOVOTE_INFO.yes.title}</h3>
          </div>

          <div className="space-y-6">
            {GONOVOTE_INFO.yes.points.map((point) => (
              <div key={point.id} className="bg-white p-8 rounded-[32px] shadow-xl border border-gray-50 hover:border-green-200 transition-all hover:-translate-y-1 group">
                <div className="flex gap-5">
                  <div className="shrink-0 w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center font-black text-sm group-hover:bg-green-600 group-hover:text-white transition-colors">
                    {point.id}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-gray-900 mb-3">{point.title}</h4>
                    <p className="text-gray-600 leading-relaxed font-medium">{point.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-green-900 text-white p-10 rounded-[40px] shadow-2xl border-4 border-green-500/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="text-green-400" size={24} />
                <span className="font-bold text-green-300 uppercase tracking-widest text-sm">ইনসাফ কায়েমের শপথ</span>
              </div>
              <p className="text-2xl font-black leading-tight italic">
                "বিজয় নিশ্চিত করতে এবং ইনসাফ ভিত্তিক সমাজ গড়তে ১২ ফেব্রুয়ারি দাঁড়িপাল্লায় 'হ্যাঁ' ভোট দিন।"
              </p>
            </div>
          </div>
        </div>

        {/* No Section */}
        <div className="space-y-8 animate-in slide-in-from-right duration-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-red-100 text-red-600 rounded-[20px] shadow-lg shadow-red-100">
              <XCircle size={32} />
            </div>
            <h3 className="text-3xl font-black text-red-900">{GONOVOTE_INFO.no.title}</h3>
          </div>

          <div className="space-y-6">
            {GONOVOTE_INFO.no.points.map((point) => (
              <div key={point.id} className="bg-white p-8 rounded-[32px] shadow-xl border border-gray-50 hover:border-red-100 transition-all hover:-translate-y-1 group">
                <div className="flex gap-5">
                  <div className="shrink-0 w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center font-black text-sm group-hover:bg-red-600 group-hover:text-white transition-colors">
                    {point.id}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-gray-900 mb-3">{point.title}</h4>
                    <p className="text-gray-600 leading-relaxed font-medium">{point.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 p-8 rounded-[40px] border-2 border-dashed border-amber-200 flex items-start gap-6">
            <div className="shrink-0 p-4 bg-amber-100 text-amber-600 rounded-2xl">
              <AlertTriangle size={28} />
            </div>
            <div>
              <h4 className="font-black text-amber-900 text-lg mb-2">সচেতন হোন!</h4>
              <p className="text-amber-800/80 font-medium italic">
                গণভোট না দেওয়া বা অংশগ্রহণ না করার অর্থ হলো আপনার মূল্যবান মতামত থেকে রাষ্ট্রকে বঞ্চিত করা, যা এলাকায় রাজনৈতিক অস্থিরতা বাড়াতে পারে।
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final Conclusion */}
      <div className="bg-gray-50 p-12 md:p-20 rounded-[60px] border border-gray-100 text-center max-w-5xl mx-auto shadow-inner">
        <Scale size={64} className="mx-auto text-green-600 mb-10" />
        <h3 className="text-3xl md:text-5xl font-black text-gray-900 mb-8">উপসংহার</h3>
        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium mb-12">
          {GONOVOTE_INFO.conclusion}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="px-8 py-4 bg-green-600 text-white rounded-full font-black shadow-lg shadow-green-100 flex items-center gap-3">
            <Zap size={20} /> ইনসাফ
          </div>
          <div className="px-8 py-4 bg-blue-600 text-white rounded-full font-black shadow-lg shadow-blue-100 flex items-center gap-3">
            <Users size={20} /> গণমতামত
          </div>
          <div className="px-8 py-4 bg-indigo-600 text-white rounded-full font-black shadow-lg shadow-indigo-100 flex items-center gap-3">
            <ShieldCheck size={20} /> সুশাসন
          </div>
        </div>
      </div>
    </div>
  );
};
