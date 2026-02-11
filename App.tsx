
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FrameCreator } from './components/FrameCreator';
import { AISloganGenerator } from './components/AISloganGenerator';
import { CandidateProfile } from './components/CandidateProfile';
import { PhotoGallery } from './components/PhotoGallery';
import { Footer } from './components/Footer';
import { ElectionBoard } from './components/ElectionBoard';
import { VolunteerSystem } from './components/VolunteerSystem';
import { GonovoteGuide } from './components/GonovoteGuide';
import { PrivacyPolicy } from './components/PrivacyPolicy';

type Tab = 'home' | 'frame' | 'ai' | 'results' | 'volunteers' | 'guide' | 'privacy';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc] selection:bg-green-100 selection:text-green-900">
      <Navbar activeTab={activeTab === 'privacy' ? 'home' : activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow pt-20">
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-700">
            <Hero onGetStarted={() => setActiveTab('frame')} />
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

        {activeTab === 'results' && (
          <div className="container mx-auto px-4 py-12 animate-in fade-in duration-500">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl md:text-6xl font-black text-green-900 mb-6 uppercase tracking-tight">নির্বাচনী ফলাফল</h2>
              <p className="text-lg text-gray-500 leading-relaxed font-medium">
                বাগেরহাট-৪ আসনের লাইভ নির্বাচনী বোর্ড। ১২ ফেব্রুয়ারি ভোট গ্রহণ শেষে এখানে বিস্তারিত ফলাফল প্রদর্শিত হবে।
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

        {activeTab === 'guide' && (
          <div className="container mx-auto px-4 py-12 animate-in fade-in duration-500">
            <GonovoteGuide />
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="container mx-auto px-4 py-12 animate-in fade-in duration-500">
            <PrivacyPolicy />
          </div>
        )}
      </main>

      <Footer onPrivacyClick={() => setActiveTab('privacy')} />
    </div>
  );
};

export default App;
