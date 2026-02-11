
import React from 'react';
import { CANDIDATE, ALIM_IMAGES } from '../constants';
import { GraduationCap, MapPin, Award, Heart, MessageSquare, Users } from 'lucide-react';

export const CandidateProfile: React.FC = () => {
  return (
    <section className="py-24 bg-[#fdfdfd] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-20 text-center">
          <span className="text-green-600 font-bold uppercase tracking-widest text-sm mb-4">আমাদের কাণ্ডারি</span>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">প্রফেসর মোঃ আবদুল আলিম</h2>
          <div className="flex gap-2">
            <div className="w-16 h-2 bg-red-600 rounded-full"></div>
            <div className="w-8 h-2 bg-green-600 rounded-full"></div>
            <div className="w-4 h-2 bg-green-600 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="grid grid-cols-2 gap-4">
             <img src={ALIM_IMAGES.meeting} className="rounded-3xl shadow-xl mt-12 hover:-translate-y-2 transition-transform duration-500 aspect-square object-cover" alt="Meeting people" />
             <img src={ALIM_IMAGES.press} className="rounded-3xl shadow-xl hover:-translate-y-2 transition-transform duration-500 aspect-square object-cover" alt="Press Conference" />
             <div className="col-span-2 relative">
                <img src={ALIM_IMAGES.speech} className="rounded-3xl shadow-2xl border-8 border-white w-full h-[400px] object-cover" alt="Speech at Podium" />
                <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[40px] shadow-2xl border border-gray-100 hidden md:block">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-green-100 text-green-700 rounded-2xl">
                       <MessageSquare size={32} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">জনগণের সাথে</div>
                      <div className="text-sm text-gray-500">অবিরাম পথচলা...</div>
                    </div>
                  </div>
                </div>
             </div>
          </div>

          <div className="space-y-12">
            <h3 className="text-3xl font-bold text-gray-800 leading-tight">
              সুশিক্ষিত সমাজ এবং উন্নত <br /> মোরেলগঞ্জ-শরণখোলার জন্য...
            </h3>
            
            <div className="space-y-8">
              <ProfileCard 
                icon={<GraduationCap size={28} />} 
                title="শিক্ষাক্ষেত্রে বিপ্লব" 
                desc="তিনি বিশ্বাস করেন শিক্ষাই জাতির মেরুদণ্ড। প্রথিতযশা এই শিক্ষক এলাকার প্রতিটি ঘরে শিক্ষার আলো পৌঁছে দিতে নিরলস কাজ করছেন।"
                bgColor="bg-blue-50"
                iconColor="text-blue-600"
              />
              <ProfileCard 
                icon={<Users size={28} />} 
                title="জনগণের সেবক" 
                desc="মোরেলগঞ্জ ও শরণখোলার সাধারণ মানুষের সুখে-দুঃখে তিনি সব সময় পাশে ছিলেন এবং থাকবেন।"
                bgColor="bg-green-50"
                iconColor="text-green-600"
              />
              <ProfileCard 
                icon={<Heart size={28} />} 
                title="নিষ্ঠা ও সততা" 
                desc="সারা জীবন তিনি যে সততার আদর্শ লালন করেছেন, তা নিয়ে তিনি এলাকার রাজনীতিতে এক নতুন মাত্রা যোগ করতে চান।"
                bgColor="bg-red-50"
                iconColor="text-red-600"
              />
            </div>
            
            <div className="p-8 bg-gray-900 rounded-[32px] text-white flex items-center justify-between group">
              <div>
                <div className="text-3xl font-black mb-1">বাগেরহাট-৪</div>
                <div className="text-gray-400 text-sm">আমাদের গর্ব, আমাদের এলাকা</div>
              </div>
              <MapPin size={48} className="text-green-500 group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProfileCard: React.FC<{ icon: React.ReactNode, title: string, desc: string, bgColor: string, iconColor: string }> = ({ icon, title, desc, bgColor, iconColor }) => (
  <div className="flex gap-6 group">
    <div className={`p-5 ${bgColor} ${iconColor} rounded-3xl shrink-0 group-hover:scale-110 transition-transform h-fit shadow-lg shadow-black/5`}>
      {icon}
    </div>
    <div>
      <h4 className="text-xl font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  </div>
);
