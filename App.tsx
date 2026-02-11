
import React, { useState, useEffect, useRef } from 'react';
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
import { LOGOS, SLOGANS } from './constants';
import { UserPlus, ArrowRight, ShieldCheck, Volume2, VolumeX, Radio, UploadCloud, Play, Music } from 'lucide-react';

type Tab = 'home' | 'frame' | 'ai' | 'results' | 'survey' | 'volunteers' | 'guide' | 'privacy' | 'join';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [songUrl, setSongUrl] = useState("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync Audio to feel like a "Live Broadcast"
  const syncAndPlay = () => {
    const audio = audioRef.current;
    if (audio) {
      const duration = 240; 
      const now = Math.floor(Date.now() / 1000);
      const startOffset = now % (audio.duration || duration);
      audio.currentTime = startOffset;
      
      audio.play().then(() => {
        setIsPlaying(true);
        setShowOverlay(false);
      }).catch((err) => {
        console.log("Autoplay blocked, waiting for user interaction.");
      });
    }
  };

  const handleStart = () => {
    syncAndPlay();
  };

  const handleSongUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSongUrl(url);
      setIsMuted(false);
      setIsPlaying(true);
      setShowOverlay(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc] selection:bg-green-100 selection:text-green-900">
      {/* Autoplay Fix Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 z-[200] bg-green-950/90 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-8 animate-bounce shadow-2xl">
             <img src={LOGOS.PARTY} alt="Logo" className="w-20 h-20 object-contain" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">ইনসাফের বিজয় সুনিশ্চিত!</h2>
          <p className="text-green-200 text-xl mb-12 font-bold">প্রফেসর আবদুল আলিম এর নির্বাচনী প্রচারণায় আপনাকে স্বাগতম</p>
          <button 
            onClick={handleStart}
            className="bg-yellow-400 text-green-950 px-12 py-6 rounded-full font-black text-2xl shadow-3xl hover:scale-110 active:scale-95 transition-all flex items-center gap-4"
          >
            <Play fill="currentColor" /> ওয়েবসাইট ভিজিট করুন
          </button>
        </div>
      )}

      {/* Background Audio */}
      <audio 
        ref={audioRef}
        src={songUrl}
        loop 
        muted={isMuted}
        onPlay={() => setIsPlaying(true)}
      />

      {/* Prominent Music Control Panel */}
      <div className="fixed bottom-10 left-8 z-[100] flex flex-col items-start gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              if (audioRef.current) {
                if (isPlaying) {
                  audioRef.current.pause();
                  setIsPlaying(false);
                } else {
                  audioRef.current.play();
                  setIsPlaying(true);
                }
              }
            }}
            className={`${isPlaying ? 'bg-green-600' : 'bg-red-600'} text-white p-5 rounded-3xl shadow-2xl hover:scale-110 transition-all flex items-center justify-center`}
          >
            {isPlaying ? <Music className="animate-pulse" size={28} /> : <Play size={28} />}
          </button>

          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="bg-white text-green-800 p-5 rounded-3xl shadow-2xl hover:scale-110 transition-all flex items-center justify-center border border-green-100"
          >
            {isMuted ? <VolumeX size={28} /> : <Volume2 size={28} />}
          </button>
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 text-white p-5 rounded-3xl shadow-2xl hover:scale-110 transition-all flex items-center justify-center"
            title="নির্বাচনী গান আপলোড করুন"
          >
            <UploadCloud size={28} />
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleSongUpload} 
            accept="audio/*" 
            className="hidden" 
          />
        </div>

        <div className="bg-black/90 backdrop-blur-2xl text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 flex items-center gap-4 shadow-2xl">
          <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-red-600 animate-ping' : 'bg-gray-600'}`}></div>
          লাইভ নির্বাচনী রেডিও
        </div>
      </div>

      {/* Improved Trending Marquee */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-green-900/95 backdrop-blur-xl text-white overflow-hidden py-3 border-y border-white/10 shadow-lg">
        <div className="flex items-center">
          <div className="bg-red-600 px-8 py-2 font-black text-sm uppercase tracking-widest flex items-center gap-3 z-10 shadow-2xl skew-x-[-12deg] ml-[-10px]">
             <span className="skew-x-[12deg] flex items-center gap-2">
                <Radio size={18} className="animate-pulse" /> LIVE
             </span>
          </div>
          <div className="marquee-content whitespace-nowrap animate-marquee flex items-center gap-28 font-black text-sm md:text-lg">
            {[...SLOGANS, "ইনসাফ কায়েমে দাড়িপাল্লা মার্কায় ভোট দিন", "বাংলাদেশ জামায়াতে ইসলামীকে জয়যুক্ত করুন", ...SLOGANS].map((s, i) => (
              <span key={i} className="flex items-center gap-8">
                <img src={LOGOS.SCALE} alt="Logo" className="w-6 h-6 object-contain" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Navbar activeTab={activeTab === 'privacy' ? 'home' : activeTab as any} setActiveTab={setActiveTab as any} />
      
      <main className="flex-grow pt-32">
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-1000">
            <Hero 
              onGetStarted={() => setActiveTab('frame')} 
              onJoinClick={() => setActiveTab('join')}
            />
            
            <section className="relative overflow-hidden py-32 bg-white">
              <div className="container mx-auto px-4">
                <div className="bg-gradient-to-br from-[#004d3b] to-black rounded-[80px] p-12 md:p-28 text-white shadow-3xl relative border-4 border-green-900/50">
                  <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-400/5 rounded-full -mr-96 -mt-96 blur-[120px]"></div>
                  <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                    <div className="max-w-3xl text-center lg:text-left">
                      <div className="inline-flex items-center gap-3 px-8 py-3 bg-white/10 rounded-full text-green-300 font-black text-sm mb-12 uppercase tracking-[0.4em] shadow-xl">
                        <ShieldCheck size={24} /> ইনসাফ কায়েমের শপথ
                      </div>
                      <h2 className="text-6xl md:text-9xl font-black mb-8 leading-[0.95] tracking-tighter">
                        ইনসাফের জন্য <br /> লড়াই চলবেই!
                      </h2>
                      <p className="text-2xl md:text-3xl text-green-100/80 mb-14 leading-relaxed font-bold">
                        মোরেলগঞ্জ ও শরণখোলার প্রতিটি ঘরে ইনসাফ ও ন্যায়বিচার পৌঁছে দিতে আমরা প্রতিজ্ঞাবদ্ধ। দাড়িপাল্লা মার্কায় ভোট দিয়ে এই বিজয়কে ত্বরান্বিত করুন।
                      </p>
                      <button 
                        onClick={() => setActiveTab('join')}
                        className="bg-yellow-400 text-green-950 px-16 py-10 rounded-[50px] font-black text-3xl hover:scale-105 active:scale-95 transition-all shadow-4xl flex items-center justify-center gap-6 group mx-auto lg:mx-0 border-b-[12px] border-yellow-600"
                      >
                        <UserPlus size={40} /> এখনই সদস্য হোন
                        <ArrowRight className="group-hover:translate-x-4 transition-transform" size={40} />
                      </button>
                    </div>
                    <div className="shrink-0 relative">
                      <div className="w-80 h-80 md:w-[500px] md:h-[500px] bg-white/5 backdrop-blur-3xl rounded-[80px] border-2 border-white/10 flex items-center justify-center p-16 relative rotate-6 hover:rotate-0 transition-transform duration-1000 shadow-3xl">
                         <img src={LOGOS.PARTY} alt="Big Logo" className="w-full h-full object-contain animate-pulse-slow" />
                         <div className="absolute -bottom-10 -left-10 bg-green-600 px-12 py-6 rounded-[40px] font-black text-2xl uppercase tracking-widest shadow-3xl border-4 border-white">
                            INSAF
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="container mx-auto px-4 py-16">
               <CandidateProfile />
            </div>
            <PhotoGallery />
          </div>
        )}
        
        {activeTab === 'frame' && (
          <div className="container mx-auto px-4 py-16 animate-in slide-in-from-bottom-12 duration-700">
            <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
              <h2 className="text-5xl md:text-8xl font-black text-green-900 uppercase tracking-tighter">পোস্টার ও এভাটার</h2>
              <div className="h-3 w-48 bg-red-600 mx-auto rounded-full"></div>
              <p className="text-2xl text-gray-500 leading-relaxed font-black">
                বাংলাদেশ জামায়াতে ইসলামী ও ইনসাফের জয় নিশ্চিত করতে আপনার প্রোফাইল সাজান।
              </p>
            </div>
            <FrameCreator />
          </div>
        )}
        
        {activeTab === 'ai' && <div className="container mx-auto px-4 py-16"><AISloganGenerator /></div>}
        {activeTab === 'survey' && <div className="container mx-auto px-4 py-16"><OnlineSurvey /></div>}
        {activeTab === 'results' && <div className="container mx-auto px-4 py-16"><ElectionBoard /></div>}
        {activeTab === 'volunteers' && <div className="container mx-auto px-4 py-16"><VolunteerSystem /></div>}
        {activeTab === 'join' && <div className="container mx-auto px-4 py-16"><JoinJamaat /></div>}
        {activeTab === 'guide' && <div className="container mx-auto px-4 py-16"><GonovoteGuide /></div>}
        {activeTab === 'privacy' && <div className="container mx-auto px-4 py-16"><PrivacyPolicy /></div>}

        <CentralLeaders />
      </main>

      <Footer onPrivacyClick={() => setActiveTab('privacy')} />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
