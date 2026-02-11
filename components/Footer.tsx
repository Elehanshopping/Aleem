
import React from 'react';
import { DEVELOPER, CANDIDATE } from '../constants';
import { Phone, Mail, Globe, Facebook, MapPin } from 'lucide-react';

interface FooterProps {
  onPrivacyClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onPrivacyClick }) => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h4 className="text-white text-xl font-bold mb-6">নির্বাচনী প্রচারণা</h4>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {CANDIDATE.name} - এর সমর্থনে ডিজিটাল প্ল্যাটফর্ম। <br />
              মোরেলগঞ্জ ও শরণখোলার সুন্দর আগামী নিশ্চিত করতে আপনার মূল্যবান ভোট ও দোয়া প্রত্যাশী।
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/share/1D3UhcYn5Q/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-gray-800 rounded-xl hover:bg-green-700 transition-colors"
                title="ফেসবুক পেজ"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://taksid.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-gray-800 rounded-xl hover:bg-green-700 transition-colors"
                title="অফিসিয়াল ওয়েবসাইট"
              >
                <Globe size={20} />
              </a>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-3xl border border-gray-700/50">
            <h4 className="text-white text-xl font-bold mb-6">ডেভলপার ইনফো</h4>
            <div className="space-y-4">
              <div className="font-bold text-green-500 text-lg">{DEVELOPER.company}</div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-[10px] font-bold">CEO</div>
                <span className="text-gray-200">{DEVELOPER.ceo}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gray-400" />
                <span className="text-gray-200 text-sm">{DEVELOPER.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-gray-400" />
                <span className="text-gray-200 text-sm">{DEVELOPER.office}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-gray-400" />
                <span className="text-gray-200">{DEVELOPER.phone}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {CANDIDATE.name} নির্বাচনী প্রচারণা। সর্বস্বত্ব সংরক্ষিত।</p>
          <p>Managed by <a href="https://taksid.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 font-medium hover:text-green-400 transition-colors">{DEVELOPER.company}</a></p>
        </div>
      </div>
    </footer>
  );
};
