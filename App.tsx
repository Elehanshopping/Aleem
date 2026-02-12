
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FrameCreator } from './components/FrameCreator';
import { AISloganGenerator } from './components/AISloganGenerator';
import { CandidateProfile } from './components/CandidateProfile';
import { PhotoGallery } from './components/PhotoGallery';
import { Footer } from './components/Footer';
import { ElectionBoard } from './components/ElectionBoard';
import { NationalResults } from './components/NationalResults';
import { VolunteerSystem } from './components/VolunteerSystem';
import { GonovoteGuide } from './components/GonovoteGuide';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { JoinJamaat } from './components/JoinJamaat';
import { CentralLeaders } from './components/CentralLeaders';
import { LOGOS, SLOGANS } from './constants';
import { UserPlus, ArrowRight, ShieldCheck, Radio } from 'lucide-react';

type Tab = 'home' | 'frame' | 'ai' | 'results' | 'national' | 'volunteers' | 'guide' | 'privacy' | 'join';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  // Fixed broken JSX syntax in return and restored the Navbar component with correct props.
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar 
        activeTab={activeTab === 'privacy' ? 'home' : (activeTab as any)} 
        setActiveTab={setActiveTab as any} 
      />
      
      <main className="flex-grow pt-24 md:pt-32">
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-1000">
            <Hero 
              onGetStarted={() => setActiveTab('frame')} 
              onJoinClick={() => setActiveTab('join')}
            />
            
            <section className="relative overflow-hidden py-10 md:py-24 bg-white">
              <div className="container mx-auto px-4">
                <div className="bg-gradient-to-br from-[#004d3b] to-black rounded-[30px] md:rounded-[60px] p-6 md:p-24 text-white shadow-2xl relative border border-white/10">
                  <div className="absolute top-0 right-0 w-40 md:w-[500px] h-40 md:h-[500px] bg-green-400/5 rounded-full -mr-20 md:-mr-96 -mt-20 md:-mt-96 blur-[80px] md:blur-[120px]"></div>
                  <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-16 text-center lg:text-left">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-1.5 md:py-2 bg-white/10 rounded-full text-green-300 font-black text-[8px] md:text-xs mb-4 md:mb-10 uppercase tracking-widest shadow-xl">
                        <ShieldCheck size={14} /> লাইভ নির্বাচনী রিপোর্ট
                      </div>
                      <h2 className="text-3xl md:text-8xl font-black mb-4 md:mb-8 leading-[1.1] tracking-tighter">
                        ইনসাফের <br /> জয়যাত্রা!
                      </h2>
                      <p className="text-sm md:text-2xl text-green-100/70 mb-6 md:mb-12 leading-relaxed font-bold">
                        সর্বশেষ নির্বাচনী ফলাফল সরাসরি দেখুন এখানে।
                      </p>
                      <button 
                        onClick={() => setActiveTab('results')}
                        className="bg-yellow-400 text-green-950 px-6 md:px-14 py-4 md:py-8 rounded-2xl md:rounded-[40px] font-black text-lg md:text-2xl hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3 md:gap-5 mx-auto lg:mx-0 border-b-4 md:border-b-[10px] border-yellow-600"
                      >
                         লাইভ রেজাল্ট
                        <ArrowRight className="md:w-8 md:h-8" size={20} />
                      </button>
                    </div>
                    <div className="shrink-0 relative">
                      <div className="w-40 h-40 md:w-[450px] md:h-[450px] bg-white/5 backdrop-blur-3xl rounded-[24px] md:rounded-[60px] border border-white/10 flex items-center justify-center p-4 md:p-12 relative rotate-2 shadow-2xl">
                         <img src={LOGOS.PARTY} alt="Logo" className="w-full h-full object-contain opacity-90" />
                         <div className="absolute -bottom-2 md:-bottom-6 -left-2 md:-left-6 bg-green-600 px-3 md:px-8 py-1.5 md:py-4 rounded-xl md:rounded-[30px] font-black text-[10px] md:text-xl uppercase tracking-widest border-2 md:border-4 border-white shadow-xl">
                            LIVE
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="container mx-auto px-4 py-6 md:py-16">
               <CandidateProfile />
            </div>
            <PhotoGallery />
          </div>
        )}
        
        {activeTab === 'frame' && (
          <div className="container mx-auto px-4 py-8 md:py-16 animate-in slide-in-from-bottom-8 duration-500">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16 space-y-2 md:space-y-6">
              <h2 className="text-3xl md:text-7xl font-black text-green-900 uppercase tracking-tighter">ডিজিটাল এভাটার</h2>
              <p className="text-sm md:text-xl text-gray-500 font-black">আপনার পছন্দের ফ্রেমটি নির্বাচন করুন</p>
            </div>
            <FrameCreator />
          </div>
        )}
        
        {activeTab === 'ai' && <div className="container mx-auto px-4 py-8 md:py-16"><AISloganGenerator /></div>}
        {activeTab === 'national' && <div className="container mx-auto px-4 py-8 md:py-16"><NationalResults /></div>}
        {activeTab === 'results' && <div className="container mx-auto px-4 py-8 md:py-16"><ElectionBoard /></div>}
        {activeTab === 'volunteers' && <div className="container mx-auto px-4 py-8 md:py-16"><VolunteerSystem /></div>}
        {activeTab === 'join' && <div className="container mx-auto px-4 py-8 md:py-16"><JoinJamaat /></div>}
        {activeTab === 'guide' && <div className="container mx-auto px-4 py-8 md:py-16"><GonovoteGuide /></div>}
        {activeTab === 'privacy' && <div className="container mx-auto px-4 py-8 md:py-16"><PrivacyPolicy /></div>}

        <CentralLeaders />
      </main>

      <Footer onPrivacyClick={() => setActiveTab('privacy')} />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
