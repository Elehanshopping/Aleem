
import React from 'react';
import { CANDIDATE, LOGOS } from '../constants';
import { BarChart3, TrendingUp, Users } from 'lucide-react';

export const ElectionBoard: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Users className="text-blue-500" />} label="মোট ভোটার" value="৩,৪২,৫৬০" />
        <StatCard icon={<TrendingUp className="text-green-500" />} label="প্রত্যাশিত ভোট" value="৮৫%" />
        <StatCard icon={<BarChart3 className="text-purple-500" />} label="কেন্দ্র সংখ্যা" value="১২৪" />
      </div>

      <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gray-900 p-8 text-white flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-2xl font-bold">লাইভ ফলাফল বোর্ড (বাগেরহাট-৪)</h3>
            <p className="text-gray-400 text-sm italic">সর্বশেষ আপডেট: ১২ ফেব্রুয়ারি, ২০২৬</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-red-600 rounded-full text-xs font-bold animate-pulse">UPCOMING / LIVE</div>
            <div className="px-4 py-2 bg-green-600 rounded-full text-xs font-bold">১২ ফেব্রুয়ারি</div>
          </div>
        </div>

        <div className="p-8 space-y-10">
          <CandidateResult 
            name={CANDIDATE.name} 
            party="বাংলাদেশ জামায়াতে ইসলামী" 
            symbol="দাঁড়িপাল্লা"
            symbolImage={LOGOS.SCALE}
            votes={0} 
            percentage={0} 
            color="bg-green-600" 
            isPrimary 
          />
          <CandidateResult 
            name="সোমনাথ দে" 
            party="বি.এন.পি" 
            symbol="ধানের শীষ"
            symbolImage={LOGOS.PADDY}
            votes={0} 
            percentage={0} 
            color="bg-blue-600" 
          />
          <CandidateResult 
            name="কাজী খায়রুজ্জামান শিপন" 
            party="স্বতন্ত্র" 
            symbol="হরিণ"
            symbolImage={LOGOS.DEER}
            votes={0} 
            percentage={0} 
            color="bg-gray-500" 
          />
        </div>
        
        <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
          <p className="text-gray-500 text-sm font-medium">১২ ফেব্রুয়ারি ভোট গ্রহণ শেষে এখানে স্বয়ংক্রিয়ভাবে ফলাফল আপডেট হবে। সকল কেন্দ্রে নজর রাখুন।</p>
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
  symbolImage: string,
  votes: number, 
  percentage: number, 
  color: string, 
  isPrimary?: boolean 
}> = ({ name, party, symbol, symbolImage, votes, percentage, color, isPrimary }) => (
  <div className={`p-6 rounded-[32px] transition-all ${isPrimary ? 'bg-green-50/50 border-2 border-green-100' : 'bg-white border border-gray-100'}`}>
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center justify-center p-2">
          <img src={symbolImage} alt={symbol} className="w-full h-full object-contain" />
        </div>
        <div>
          <div className={`font-black tracking-tight ${isPrimary ? 'text-2xl text-green-900' : 'text-xl text-gray-700'}`}>
            {name} 
            {isPrimary && <span className="ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded-full uppercase">মূল প্রার্থী</span>}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-bold text-gray-400">{party}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="text-sm font-black text-green-700">মার্কা: {symbol}</span>
          </div>
        </div>
      </div>
      <div className="text-left md:text-right min-w-[120px]">
        <div className="font-black text-3xl text-gray-900">{percentage}%</div>
        <div className="text-sm text-gray-400 font-bold">{votes.toLocaleString()} ভোট</div>
      </div>
    </div>
    <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden shadow-inner">
      <div 
        className={`h-full ${color} transition-all duration-1000 relative`} 
        style={{ width: `${Math.max(percentage, 2)}%` }}
      >
        <div className="absolute inset-0 bg-white/20"></div>
      </div>
    </div>
  </div>
);
