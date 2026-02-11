
import React from 'react';
import { Shield, Lock, Eye, FileText, Mail, MapPin } from 'lucide-react';
import { DEVELOPER, CANDIDATE } from '../constants';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="bg-green-900 text-white p-12 md:p-20 rounded-[60px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <Shield size={40} className="text-green-400" />
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">প্রাইভেসি পলিসি</h1>
          </div>
          <p className="text-xl text-green-100/80 leading-relaxed max-w-2xl">
            {CANDIDATE.name}-এর নির্বাচনী প্রচারণা অ্যাপে আপনার তথ্যের সুরক্ষা আমাদের প্রধান অঙ্গীকার। আমরা কীভাবে আপনার তথ্য ব্যবহার করি তা এখানে বিস্তারিত আলোচনা করা হলো।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PolicyCard 
          icon={<Eye className="text-blue-500" />}
          title="কোন তথ্য সংগ্রহ করি?"
          content="এভাটার তৈরির সময় আপনার আপলোড করা ছবি এবং ভলান্টিয়ার নিবন্ধনের সময় আপনার নাম ও মোবাইল নম্বর সংগ্রহ করা হয়।"
        />
        <PolicyCard 
          icon={<Lock className="text-green-500" />}
          title="তথ্য সুরক্ষা"
          content="আপনার আপলোড করা ছবিগুলো এভাটার তৈরির পর আমাদের সার্ভার থেকে স্বয়ংক্রিয়ভাবে মুছে ফেলা হয়। আমরা কোনো তথ্য তৃতীয় পক্ষের কাছে বিক্রি করি না।"
        />
        <PolicyCard 
          icon={<FileText className="text-purple-500" />}
          title="ব্যবহারের উদ্দেশ্য"
          content="সংগৃহীত তথ্য শুধুমাত্র নির্বাচনী প্রচারণা এবং আপনার সাথে যোগাযোগের জন্য ব্যবহার করা হয়। অন্য কোনো বাণিজ্যিক উদ্দেশ্যে নয়।"
        />
        <PolicyCard 
          icon={<Shield className="text-red-500" />}
          title="আপনার অধিকার"
          content="আপনি যেকোনো সময় আপনার ভলান্টিয়ার তথ্য মুছে ফেলার জন্য আমাদের সাথে যোগাযোগ করতে পারেন।"
        />
      </div>

      <div className="bg-white p-10 md:p-14 rounded-[50px] shadow-xl border border-gray-100">
        <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
          <Mail className="text-green-600" /> যোগাযোগের ঠিকানা
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">ইমেইল করুন</div>
            <div className="text-xl font-bold text-gray-800">{DEVELOPER.email}</div>
          </div>
          <div className="space-y-4">
            <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">অফিস</div>
            <div className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <MapPin size={20} className="text-red-500" /> {DEVELOPER.office}
            </div>
          </div>
          <div className="space-y-4 md:col-span-2">
            <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">ডেভেলপার প্রতিষ্ঠান</div>
            <div className="text-xl font-bold text-gray-800">{DEVELOPER.company}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PolicyCard: React.FC<{ icon: React.ReactNode, title: string, content: string }> = ({ icon, title, content }) => (
  <div className="bg-white p-10 rounded-[40px] shadow-lg border border-gray-50 hover:shadow-xl transition-shadow">
    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-black text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed font-medium">{content}</p>
  </div>
);
