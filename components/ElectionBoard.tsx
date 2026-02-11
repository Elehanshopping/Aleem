
import React from 'react';
import { CANDIDATE, LOGOS } from '../constants';
import { BarChart3, TrendingUp, Users, AlertCircle } from 'lucide-react';

export const ElectionBoard: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Users className="text-blue-500" />} label="মোট ভোটার" value="৩,৪২,৫৬০" />
        <StatCard icon={<TrendingUp className="text-green-500" />} label="ভোট কাস্টিং (২টা পর্যন্ত)" value="৬৪%" />
        <StatCard icon={<BarChart3 className="text-purple-500" />} label="গণনাকৃত কেন্দ্র" value="৮২/১২৪" />
      </div>

      <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gray-950 p-8 text-white flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-2xl font-bold">লাইভ ফলাফল বোর্ড (বাগেরহাট-৪)</h3>
            <p className="text-green-400 text-sm font-bold animate-pulse">আজ দুপুর ০২:০০ টার আপডেট</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-red-600 rounded-full text-xs font-bold animate-pulse">LIVE UPDATE</div>
            <div className="px-4 py-2 bg-green-600 rounded-full text-xs font-bold">১২ ফেব্রুয়ারি</div>
          </div>
        </div>

        <div className="p-8 space-y-10">
          <CandidateResult 
            name={CANDIDATE.name} 
            party="বাংলাদেশ জামায়াতে ইসলামী" 
            symbol="দাঁড়িপাল্লা"
            symbolImage={LOGOS.SCALE}
            votes={112450} 
            percentage={72} 
            color="bg-green-600" 
            isPrimary 
          />
          <CandidateResult 
            name="সোমনাথ দে" 
            party="বি.এন.পি" 
            symbol="ধানের শীষ"
            votes={43500} 
            percentage={28} 
            color="bg-blue-600" 
          />
          <CandidateResult 
            name="কাজী খায়রুজ্জামান শিপন" 
            party="স্বতন্ত্র (হরিণ)" 
            symbol="পদত্যাগ করেছেন"
            symbolImage={LOGOS.DEER}
            votes={0} 
            percentage={0} 
            color="bg-gray-300" 
            statusText="পুদ কৈরা দিসে (নিখোঁজ)"
          />
        </div>
        
        <div className="bg-yellow-50 p-6 text-center border-t border-yellow-100 flex items-center justify-center gap-3">
          <AlertCircle className="text-yellow-600" size={20} />
          <p className="text-yellow-800 text-sm font-bold">বিশেষ দ্রষ্টব্য: কাজী খায়রুজ্জামান শিপন ভোটের মাঠ ছেড়ে পলায়ন/পদত্যাগ করেছেন। তাকে আর খোঁজাখুঁজি করে লাভ নেই!</p>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
  <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex items-center gap-6">
    <div className="p-4 bg-gray-50 rounded-2xl">{icon}</div>
    <div>
      <div className="text-gray-500 text-sm font-medium">{label}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  </div>
);

const CandidateResult: React.FC<{ 
  name: string, 
  party: string, 
  symbol: string,
  symbolImage?: string,
  votes: number, 
  percentage: number, 
  color: string, 
  isPrimary?: boolean,
  statusText?: string
}> = ({ name, party, symbol, symbolImage, votes, percentage, color, isPrimary, statusText }) => (
  <div className={`p-6 rounded-[32px] transition-all ${isPrimary ? 'bg-green-50/50 border-2 border-green-100 shadow-inner' : 'bg-white border border-gray-100'}`}>
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center justify-center p-2 relative overflow-hidden">
          {symbolImage ? (
            <>
              <img src={symbolImage} alt={symbol} className={`w-full h-full object-contain ${percentage === 0 ? 'opacity-20 grayscale' : ''}`} />
              {percentage === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-red-500 rotate-45"></div>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gray-50 flex items-center justify-center">
              <span className="text-[10px] font-bold text-gray-300 uppercase text-center">No Image</span>
            </div>
          )}
        </div>
        <div>
          <div className={`font-black tracking-tight ${isPrimary ? 'text-2xl text-green-900' : 'text-xl text-gray-700'}`}>
            {name} 
            {isPrimary && <span className="ml-2 text-[10px] bg-green-600 text-white px-2 py-1 rounded-full uppercase">বিজয় পথে</span>}
            {statusText && <span className="ml-2 text-[10px] bg-red-600 text-white px-2 py-1 rounded-full uppercase">{statusText}</span>}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-bold text-gray-400">{party}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="text-sm font-black text-green-700">মার্কা: {symbol}</span>
          </div>
        </div>
      </div>
      <div className="text-left md:text-right min-w-[120px]">
        <div className={`font-black text-3xl ${percentage === 0 ? 'text-red-500' : 'text-gray-900'}`}>
          {percentage.toLocaleString('bn-BD')}% {percentage === 0 && <span className="text-sm">(নাই)</span>}
        </div>
        <div className="text-sm text-gray-400 font-bold">{votes.toLocaleString('bn-BD')} ভোট</div>
      </div>
    </div>
    <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200">
      <div 
        className={`h-full ${color} transition-all duration-1000 relative`} 
        style={{ width: `${Math.max(percentage, 0)}%` }}
      >
        <div className="absolute inset-0 bg-white/20"></div>
      </div>
      {percentage === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ফলাফল পাওয়া যায়নি</span>
        </div>
      )}
    </div>
  </div>
);
