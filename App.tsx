
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
import { UserPlus, ArrowRight, ShieldCheck, Volume2, VolumeX, Radio, Play, Music, Settings, UploadCloud } from 'lucide-react';

type Tab = 'home' | 'frame' | 'ai' | 'results' | 'survey' | 'volunteers' | 'guide' | 'privacy' | 'join';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Default song link (Direct MP3)
  const [songUrl, setSongUrl] = useState("https://jumpshare.com/s/ry9aav5h09lNHw0s672w");
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const syncAndPlay = () => {
    const audio = audioRef.current;
    if (audio && !isPlaying) {
      // Logic to sync or just start playing
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Autoplay blocked. User interaction required.");
      });
    }
  };

  // Play on the very first click anywhere on the document (Standard Browser Policy)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isPlaying) {
        syncAndPlay();
      }
      document.removeEventListener('click', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    return () => document.removeEventListener('click', handleFirstInteraction);
  }, [isPlaying, songUrl]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Handle local file upload and start playing immediately
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSongUrl(url);
      setIsPlaying(false); // Reset to trigger play effect
      
      // Short delay to ensure source is updated before playing
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          });
        }
      }, 100);
    }
  };

  const handleSetSongLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newLink = prompt("আপনার গানের ডিরেক্ট .mp3 লিঙ্কটি এখানে দিন:", songUrl);
    if (newLink && newLink.trim() !== "") {
      setSongUrl(newLink);
      setIsPlaying(false);
      alert("গানের লিঙ্কটি সেভ করা হয়েছে।");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc] selection:bg-green-100 selection:text-green-900">
      {/* Background Audio */}
      <audio 
        ref={audioRef}
        src={songUrl}
        loop 
        muted={isMuted}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Music Control */}
      <div className="fixed bottom-10 left-8 z-[100] flex flex-col items-start gap-3">
        <div className="flex items-center gap-2">
          <button 
            onClick={togglePlay}
            className={`${isPlaying ? 'bg-green-600' : 'bg-red-600'} text-white p-4 rounded-2xl shadow-2xl hover:scale-110 transition-all flex items-center justify-center`}
            title={isPlaying ? "বন্ধ করুন" : "বাজান"}
          >
            {isPlaying ? <Music className="animate-pulse" size={24} /> : <Play size={24} />}
          </button>

          <button 
            onClick={toggleMute}
            className="bg-white text-green-800 p-4 rounded-2xl shadow-2xl hover:scale-110 transition-all flex items-center justify-center border border-green-100"
            title={isMuted ? "সাউন্ড অন" : "সাউন্ড অফ"}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>

          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 text-white p-4 rounded-2xl shadow-2xl hover:scale-110 transition-all flex items-center justify-center border border-white/10"
            title="নিজস্ব গান আপলোড করুন"
          >
            <UploadCloud size={24} />
          </button>

          <button 
            onClick={handleSetSongLink}
            className="bg-gray-900 text-white p-4 rounded-2xl shadow-2xl hover:scale-110 transition-all flex items-center justify-center border border-white/10"
            title="গানের লিঙ্ক সেট করুন"
          >
            <Settings size={24} />
          </button>
        </div>

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileUpload} 
          accept="audio/*" 
          className="hidden" 
        />

        <div className="bg-black/85 backdrop-blur-xl text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border border-white/10 flex items-center gap-3 shadow-2xl">
          <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-600 animate-ping' : 'bg-gray-600'}`}></div>
          প্রচার রেডিও সক্রিয়
        </div>
      </div>

      {/* Trending News Marquee */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-green-900/90 backdrop-blur-xl text-white overflow-hidden py-2.5 border-y border-white/5 shadow-lg">
        <div className="flex items-center">
          <div className="bg-red-600 px-6 py-1.5 font-black text-xs uppercase tracking-widest flex items-center gap-2 z-10 shadow-2xl skew-x-[-15deg] ml-[-5px]">
             <span className="skew-x-[15deg] flex items-center gap-2">
                <Radio size={16} className="animate-pulse" /> Trending
             </span>
          </div>
          <div className="marquee-content whitespace-nowrap animate-marquee flex items-center gap-24 font-black text-xs md:text-sm uppercase tracking-wide opacity-90">
            {[...SLOGANS, "ইনসাফ কায়েমে দাড়িপাল্লায় ভোট দিন", "বাংলাদেশ জামায়াতে ইসলামীকে জয়যুক্ত করুন", ...SLOGANS].map((s, i) => (
              <span key={i} className="flex items-center gap-6">
                <img src={LOGOS.SCALE} alt="Logo" className="w-5 h-5 object-contain" />
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
            
            <section className="relative overflow-hidden py-24 bg-white">
              <div className="container mx-auto px-4">
                <div className="bg-gradient-to-br from-[#004d3b] to-black rounded-[60px] p-10 md:p-24 text-white shadow-3xl relative border border-white/10">
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-400/5 rounded-full -mr-96 -mt-96 blur-[120px]"></div>
                  <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                    <div className="max-w-2xl text-center lg:text-left">
                      <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/10 rounded-full text-green-300 font-black text-xs mb-10 uppercase tracking-[0.3em] shadow-xl">
                        <ShieldCheck size={20} /> ইনসাফ কায়েমের লড়াই
                      </div>
                      <h2 className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
                        বিজয় এবার <br /> আমাদেরই!
                      </h2>
                      <p className="text-xl md:text-2xl text-green-100/70 mb-12 leading-relaxed font-bold">
                        মোরেলগঞ্জ ও শরণখোলার প্রতিটি ঘরে সুশাসন পৌঁছে দিতে আমরা বদ্ধপরিকর। দাড়িপাল্লা মার্কায় ভোট দিন।
                      </p>
                      <button 
                        onClick={() => setActiveTab('join')}
                        className="bg-yellow-400 text-green-950 px-14 py-8 rounded-[40px] font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-4xl flex items-center justify-center gap-5 group mx-auto lg:mx-0 border-b-[10px] border-yellow-600"
                      >
                        <UserPlus size={32} /> সদস্য ফরম
                        <ArrowRight className="group-hover:translate-x-3 transition-transform" size={32} />
                      </button>
                    </div>
                    <div className="shrink-0 relative">
                      <div className="w-72 h-72 md:w-[450px] md:h-[450px] bg-white/5 backdrop-blur-3xl rounded-[60px] border border-white/10 flex items-center justify-center p-12 relative rotate-3 hover:rotate-0 transition-transform duration-700 shadow-3xl">
                         <img src={LOGOS.PARTY} alt="Logo" className="w-full h-full object-contain opacity-90" />
                         <div className="absolute -bottom-6 -left-6 bg-green-600 px-8 py-4 rounded-[30px] font-black text-xl uppercase tracking-widest shadow-2xl border-4 border-white">
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
          <div className="container mx-auto px-4 py-16 animate-in slide-in-from-bottom-8 duration-500">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
              <h2 className="text-4xl md:text-7xl font-black text-green-900 uppercase tracking-tighter">পোস্টার জেনারেটর</h2>
              <p className="text-xl text-gray-500 font-black">আপনার পছন্দের স্টাইলটি বেছে নিন</p>
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
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
