
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FrameCreator } from './components/FrameCreator';
import { AISloganGenerator } from './components/AISloganGenerator';
import { CandidateProfile } from './components/CandidateProfile';
import { PhotoGallery } from './components/PhotoGallery';
import { Footer } from './components/Footer';
import { ElectionBoard } from './components/ElectionBoard';
import { OnlineSurvey } from './components/OnlineSurvey';
import { VolunteerSystem } from './components/VolunteerSystem';
import { GonovoteGuide } from './components/GonovoteGuide';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { JoinJamaat } from './components/JoinJamaat';
import { CentralLeaders } from './components/CentralLeaders';
import { LOGOS } from './constants';
import { UserPlus, ArrowRight, ShieldCheck } from 'lucide-react';

type Tab = 'home' | 'frame' | 'ai' | 'results' | 'survey' | 'volunteers' | 'guide' | 'privacy' | 'join';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc] selection:bg-green-100 selection:text-green-900">
      <Navbar activeTab={activeTab === 'privacy' ? 'home' : activeTab as any} setActiveTab={setActiveTab as any} />
      
      <main className="flex-grow pt-20">
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-700">
            <Hero 
              onGetStarted={() => setActiveTab('frame')} 
              onJoinClick={() => setActiveTab('join')}
            />
            
            <section className="relative overflow-hidden py-24 bg-white">
              <div className="container mx-auto px-4">
                <div className="bg-gradient-to-br from-green-900 to-emerald-950 rounded-[60px] p-8 md:p-20 text-white shadow-2xl relative">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-green-400/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                  <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="max-w-2xl text-center lg:text-left">
                      <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full text-green-400 font-bold text-sm mb-6 uppercase tracking-widest">
                        <ShieldCheck size={18} /> সৎ নেতৃত্বের কাফেলা
                      </div>
                      <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                        বাগেরহাটের উন্নয়নে <br /> আপনিও শরিক হোন!
                      </h2>
                      <p className="text-xl text-green-100/70 mb-10 leading-relaxed font-medium">
                        সৎ নেতৃত্ব এবং ইনসাফ কায়েমের লক্ষ্যে আমরা সকলে আজ একতাবদ্ধ। মোরেলগঞ্জ ও শরণখোলার মাটি ও মানুষের অধিকার আদায়ের লড়াইয়ে আপনার অংশগ্রহণ আমাদের শক্তিকে বেগবান করবে।
                      </p>
                      <button 
                        onClick={() => setActiveTab('join')}
                        className="bg-white text-green-900 px-12 py-6 rounded-3xl font-black text-2xl hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-4 group mx-auto lg:mx-0"
                      >
                        <UserPlus size={28} className="text-green-600" /> সদস্য ফরম পূরণ করুন
                        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                      </button>
                    </div>
                    <div className="shrink-0">
                      <div className="w-64 h-64 md:w-80 md:h-80 bg-white/5 backdrop-blur-3xl rounded-[40px] border border-white/10 flex items-center justify-center p-8 relative">
                         <img src={LOGOS.PARTY} alt="Big Logo" className="w-full h-full object-contain animate-pulse" />
                         <div className="absolute -bottom-4 -right-4 bg-green-600 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">
                            Join Now
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="container mx-auto px-4 py-12">
               <CandidateProfile />
            </div>
            <PhotoGallery />
          </div>
        )}
        
        {activeTab === 'frame' && (
          <div className="container mx-auto px-4 py-12 animate-in slide-in-from-bottom-8 duration-500">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl md:text-6xl font-black text-green-900 mb-6 uppercase tracking-tight">এভাটার মেকার</h2>
              <p className="text-lg text-gray-500 leading-relaxed font-medium">
                প্রফেসর মোঃ আবদুল আলিম এর সমর্থনে আপনার প্রোফাইল সাজান। বিভিন্ন আধুনিক স্টাইল থেকে বেছে নিন এবং আপনার নিজস্ব এভাটার তৈরি করুন।
              </p>
            </div>
            <FrameCreator />
          </div>
        )}
        
        {activeTab === 'ai' && (
          <div className="container mx-auto px-4 py-12 animate-in zoom-in-95 duration-500">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl md:text-6xl font-black text-green-900 mb-6 uppercase tracking-tight">AI ক্যাম্পেইন হেল্পার</h2>
              <p className="text-lg text-gray-500 leading-relaxed font-medium">
                আমাদের উন্নত AI ব্যবহার করে বাগেরহাট-৪ এর জন্য সেরা সব প্রচারণার ম্যাটেরিয়াল তৈরি করে নিন এক নিমেষেই।
              </p>
            </div>
            <AISloganGenerator />
          </div>
        )}

        {activeTab === 'survey' && (
          <div className="container mx-auto px-4 py-12 animate-in fade-in duration-500">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl md:text-6xl font-black text-green-900 mb-6 uppercase tracking-tight">ফলাফল সারা বাংলাদেশ</h2>
              <p className="text-lg text-gray-500 leading-relaxed font-medium">
                জাতীয় জরিপে জনগণের সরাসরি অংশগ্রহণ ও বর্তমান রাজনৈতিক প্রেক্ষাপটের চিত্র।
              </p>
            </div>
            <OnlineSurvey />
          </div>
        )}

        {activeTab === 'results' && (
          <div className="container mx-auto px-4 py-12 animate-in fade-in duration-500">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl md:text-6xl font-black text-green-900 mb-6 uppercase tracking-tight">ফলাফল বাগেরহাট ৪</h2>
              <p className="text-lg text-gray-500 leading-relaxed font-medium">
                বাগেরহাট-৪ আসনের লাইভ সোস্যাল ভোট ও স্থানীয় নির্বাচনী আপডেট বোর্ড।
              </p>
            </div>
            <ElectionBoard />
          </div>
        )}

        {activeTab === 'volunteers' && (
          <div className="container mx-auto px-4 py-12 animate-in fade-in duration-500">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl md:text-6xl font-black text-green-900 mb-6 uppercase tracking-tight">ভলান্টিয়ার ও মতামত</h2>
              <p className="text-lg text-gray-500 leading-relaxed font-medium">
                আমাদের সাথে যুক্ত হোন এবং মোরেলগঞ্জ-শরণখোলার সুন্দর আগামী নিশ্চিত করতে ভূমিকা রাখুন।
              </p>
            </div>
            <VolunteerSystem />
          </div>
        )}

        {activeTab === 'join' && (
          <div className="container mx-auto px-4 py-12 animate-in fade-in duration-500">
            <JoinJamaat />
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="container mx-auto px-4 py-12 animate-in fade-in duration-500">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl md:text-6xl font-black text-green-900 mb-6 uppercase tracking-tight">গণভোট কি?</h2>
              <p className="text-lg text-gray-500 leading-relaxed font-medium">
                গণতান্ত্রিক প্রক্রিয়ায় জনগণের সরাসরি অংশগ্রহণের গুরুত্ব এবং প্রয়োজনীয়তা সম্পর্কে জানুন।
              </p>
            </div>
            <GonovoteGuide />
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="container mx-auto px-4 py-12 animate-in fade-in duration-500">
            <PrivacyPolicy />
          </div>
        )}

        <CentralLeaders />
      </main>

      <Footer onPrivacyClick={() => setActiveTab('privacy')} />
    </div>
  );
};

export default App;
