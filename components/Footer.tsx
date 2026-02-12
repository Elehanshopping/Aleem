
import React from 'react';
import { DEVELOPER, CANDIDATE, LOGOS } from '../constants';
import { Phone, Mail, Globe, Facebook, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';

interface FooterProps {
  onPrivacyClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onPrivacyClick }) => {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Campaign Branding */}
          <div className="space-y-8">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-white rounded-2xl p-2 shadow-2xl shadow-green-900/20">
                <img src={LOGOS.PARTY} alt="Party Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h4 className="text-white text-2xl font-black tracking-tight">নির্বাচনী প্রচারণা</h4>
                <p className="text-green-500 font-bold text-sm uppercase tracking-widest leading-tight">
                  বাংলাদেশ জামায়াতে ইসলামী <br />
                  <span className="text-green-400">বাগেরহাট-৪ শাখা</span>
                </p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-lg font-medium">
              মোরেলগঞ্জ ও শরণখোলার মাটি ও মানুষের অধিকার আদায়ের লক্ষ্যে আমরা কাজ করে যাচ্ছি। ইনসাফ ও সমৃদ্ধির এই পথচলায় আপনার সমর্থন আমাদের শক্তি।
            </p>
            <div className="flex gap-4">
              <SocialLink href="https://www.facebook.com/share/1D3UhcYn5Q/?mibextid=wwXIfr" icon={<Facebook size={20} />} label="ফেসবুক" />
              <SocialLink href="https://taksid.com" icon={<Globe size={20} />} label="ওয়েবসাইট" />
            </div>
          </div>

          {/* Quick Links / Policy Section */}
          <div className="bg-white/5 backdrop-blur-sm p-10 rounded-[40px] border border-white/10 space-y-8">
            <h4 className="text-white text-xl font-black flex items-center gap-3">
              <ShieldCheck className="text-green-500" /> তথ্য ও সুরক্ষা
            </h4>
            <div className="space-y-4">
              <p className="text-gray-400 text-sm leading-relaxed">
                আপনার তথ্যের গোপনীয়তা রক্ষা করা আমাদের দায়িত্ব। আমাদের অ্যাপ এবং ওয়েবসাইটের ব্যবহারের নীতিমালা জানতে নিচের বাটনে ক্লিক করুন।
              </p>
              <button 
                onClick={onPrivacyClick}
                className="w-full flex items-center justify-between px-6 py-4 bg-green-600/10 hover:bg-green-600 text-green-400 hover:text-white border border-green-600/30 rounded-2xl font-black transition-all group"
              >
                প্রাইভেসি পলিসি দেখুন
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Developer Section */}
          <div className="bg-gray-900 p-10 rounded-[40px] border border-white/5 shadow-2xl space-y-6">
            <h4 className="text-white text-xl font-bold border-b border-white/10 pb-4">টেকনিক্যাল সাপোর্ট</h4>
            <div className="space-y-5">
              <div className="font-black text-green-500 text-xl tracking-tight">{DEVELOPER.company}</div>
              <div className="flex items-center gap-4 group">
                <div className="relative w-14 h-14 md:w-16 md:h-16 shrink-0">
                  <div className="absolute inset-0 bg-green-600 rounded-2xl blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <img 
                    src={DEVELOPER.image} 
                    alt={DEVELOPER.ceo} 
                    className="relative w-full h-full object-cover rounded-2xl border-2 border-white/10 shadow-xl group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <div className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-1">CEO & Founder</div>
                  <span className="text-gray-200 font-bold text-lg">{DEVELOPER.ceo}</span>
                </div>
              </div>
              <FooterInfoItem icon={<Mail size={18} />} text={DEVELOPER.email || ''} />
              <FooterInfoItem icon={<MapPin size={18} />} text={DEVELOPER.office || ''} />
              <FooterInfoItem icon={<Phone size={18} />} text={DEVELOPER.phone} />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <div className="text-gray-500 font-medium text-center md:text-left">
            © {new Date().getFullYear()} {CANDIDATE.name} নির্বাচনী প্রচারণা। <br className="md:hidden" /> সর্বস্বত্ব সংরক্ষিত।
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            Managed with <span className="text-red-600 animate-pulse">❤</span> by 
            <a 
              href="https://taksid.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white font-black hover:text-green-500 transition-colors border-b border-white/20 hover:border-green-500"
            >
              {DEVELOPER.company}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink: React.FC<{ href: string, icon: React.ReactNode, label: string }> = ({ href, icon, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex items-center gap-3 p-3 bg-white/5 hover:bg-green-600 rounded-2xl text-gray-300 hover:text-white transition-all shadow-lg"
    title={label}
  >
    {icon}
  </a>
);

const FooterInfoItem: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors cursor-default">
    <div className="text-green-600">{icon}</div>
    <span className="text-sm font-medium">{text}</span>
  </div>
);
