
import React from 'react';
import { GONOVOTE_INFO } from '../constants';
import { ThumbsUp, ThumbsDown, Info } from 'lucide-react';

export const GonovoteGuide: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="bg-blue-600 text-white p-10 md:p-16 rounded-[50px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Info size={32} className="text-blue-200" />
            <span className="font-bold uppercase tracking-widest opacity-80">নির্বাচনী নির্দেশিকা</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">গণভোট: সঠিক সিদ্ধান্ত নিন আপনার আগামী প্রজন্মের জন্য</h2>
          <p className="text-xl text-blue-100 leading-relaxed">
            ১২ ফেব্রুয়ারি আপনার একটি ভোট নির্ধারণ করবে মোরেলগঞ্জ ও শরণখোলার ভবিষ্যৎ। কেন আপনার ভোটটি "হ্যাঁ" হওয়া প্রয়োজন তা বিস্তারিত জানুন।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[40px] shadow-xl border-b-8 border-green-600 group hover:-translate-y-2 transition-transform">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform">
            <ThumbsUp size={40} />
          </div>
          <h3 className="text-3xl font-black text-green-900 mb-6">{GONOVOTE_INFO.yes.title}</h3>
          <p className="text-gray-600 text-lg leading-relaxed italic">
            "{GONOVOTE_INFO.yes.desc}"
          </p>
          <div className="mt-8 flex items-center gap-3 text-green-600 font-bold uppercase tracking-widest text-sm">
            <span>বিজয় নিশ্চিত করুন</span>
            <div className="h-0.5 w-12 bg-green-600"></div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[40px] shadow-xl border-b-8 border-red-600 group hover:-translate-y-2 transition-transform">
          <div className="w-20 h-20 bg-red-100 text-red-600 rounded-3xl flex items-center justify-center mb-8 group-hover:-rotate-6 transition-transform">
            <ThumbsDown size={40} />
          </div>
          <h3 className="text-3xl font-black text-red-900 mb-6">{GONOVOTE_INFO.no.title}</h3>
          <p className="text-gray-600 text-lg leading-relaxed italic">
            "{GONOVOTE_INFO.no.desc}"
          </p>
          <div className="mt-8 flex items-center gap-3 text-red-600 font-bold uppercase tracking-widest text-sm">
            <span>সচেতন হোন</span>
            <div className="h-0.5 w-12 bg-red-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
