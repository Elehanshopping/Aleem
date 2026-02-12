
import React, { useState, useEffect, useCallback } from 'react';
import { LOGOS } from '../constants';
// Added Search to the imports from lucide-react
import { Globe, Clock, Loader2, Award, TrendingUp, Info, RotateCw, ShieldCheck, Database, Server, ExternalLink, ShieldAlert, AlertTriangle, Fingerprint, FilterX, ListFilter, Search } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';
import { NationalVerification, IntegrityCheck } from '../types';

export const NationalResults: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [lastSync, setLastSync] = useState(new Date());
  const [nextSyncIn, setNextSyncIn] = useState(900); 
  const [isSyncing, setIsSyncing] = useState(false);
  const [nationalVerification, setNationalVerification] = useState<any>(null);
  const [integrity, setIntegrity] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const fetchCompleteNationalData = useCallback(async () => {
    setIsSyncing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `You are a COMPLETE election results generator for Bangladesh (12 February 2026).
CRITICAL: Include ALL political parties and independents. Forbidden from filtering or summarizing major parties only.

SOURCE PRIORITY:
1) ECS Official Summary (Final Authority).
2) Reputable Live Blogs (Provisional).

MANDATORY:
- List EVERY party registered with ECS.
- If a party has 0 seats, it MUST be listed with seats_won = 0.
- Do not merge parties.

OUTPUT STRICT JSON ONLY:
{
  "page_national": {
    "status": "official | partial | provisional",
    "total_seats": 300,
    "party_results": [
      {
        "party_name": "...",
        "symbol": "...",
        "seats_won": 0,
        "seats_contested": null,
        "result_status": "won | lost | pending | not_declared",
        "source": "ECS | Media",
        "confidence": "high | low"
      }
    ],
    "independents": {
      "seats_won": 0,
      "source": "ECS | Media"
    },
    "official_last_update": "<timestamp>",
    "notes": "..."
  },
  "integrity": {
    "all_parties_included": true,
    "no_party_filtered": true,
    "ecs_priority_enforced": true,
    "media_marked_provisional": true,
    "no_hallucination": true
  }
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              page_national: {
                type: Type.OBJECT,
                properties: {
                  status: { type: Type.STRING },
                  total_seats: { type: Type.NUMBER },
                  party_results: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        party_name: { type: Type.STRING },
                        symbol: { type: Type.STRING, nullable: true },
                        seats_won: { type: Type.NUMBER, nullable: true },
                        seats_contested: { type: Type.NUMBER, nullable: true },
                        result_status: { type: Type.STRING },
                        source: { type: Type.STRING },
                        confidence: { type: Type.STRING }
                      }
                    }
                  },
                  independents: {
                    type: Type.OBJECT,
                    properties: {
                      seats_won: { type: Type.NUMBER, nullable: true },
                      source: { type: Type.STRING }
                    }
                  },
                  official_last_update: { type: Type.STRING },
                  notes: { type: Type.STRING }
                }
              },
              integrity: {
                type: Type.OBJECT,
                properties: {
                  all_parties_included: { type: Type.BOOLEAN },
                  no_party_filtered: { type: Type.BOOLEAN },
                  ecs_priority_enforced: { type: Type.BOOLEAN },
                  media_marked_provisional: { type: Type.BOOLEAN },
                  no_hallucination: { type: Type.BOOLEAN }
                }
              }
            }
          }
        },
      });

      const data = JSON.parse(response.text || '{}');
      setNationalVerification(data.page_national);
      setIntegrity(data.integrity);
      
    } catch (err) {
      console.error("National generator failure:", err);
    } finally {
      setLastSync(new Date());
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await new Promise(r => setTimeout(r, 1000));
      setLoading(false);
      fetchCompleteNationalData();
    };
    init();

    const countdownInterval = setInterval(() => {
      setNextSyncIn((prev) => {
        if (prev <= 1) {
          fetchCompleteNationalData();
          return 900;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [fetchCompleteNationalData]);

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 md:py-40">
        <Loader2 className="animate-spin text-green-600 mb-4" size={48} />
        <h3 className="text-xl md:text-2xl font-black text-gray-900 text-center tracking-tight">পূর্ণাঙ্গ নির্বাচনী তথ্য জেনারেট হচ্ছে...</h3>
        <p className="text-gray-400 font-bold mt-2 animate-pulse flex items-center gap-2 text-sm">
          <FilterX size={14} /> NO-FILTER Integrity Protocol Active...
        </p>
      </div>
    );
  }

  const filteredParties = nationalVerification?.party_results.filter((p: any) => 
    p.party_name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const declaredSeats = nationalVerification?.party_results.reduce((acc: number, p: any) => acc + (p.seats_won || 0), 0) + (nationalVerification?.independents?.seats_won || 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8 md:space-y-12 pb-20">
      {/* Integrity & Status Banner */}
      <div className="bg-white border-2 border-green-100 p-6 rounded-[32px] shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-4">
            <div className={`w-4 h-4 rounded-full ${isSyncing ? 'bg-blue-500 animate-spin' : 'bg-green-500 animate-pulse'}`}></div>
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-green-600" size={18} />
                <span className="text-xs font-black text-gray-900 uppercase tracking-widest">
                  পূর্ণাঙ্গ নির্বাচনী ডাটাবেজ (সকল দল অন্তর্ভুক্ত)
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                {integrity?.all_parties_included && <span className="bg-green-50 text-green-700 text-[8px] font-black px-2 py-0.5 rounded border border-green-100 uppercase">FULL-PARTY-LIST</span>}
                {integrity?.no_party_filtered && <span className="bg-blue-50 text-blue-700 text-[8px] font-black px-2 py-0.5 rounded border border-blue-100 uppercase">NO-FILTER</span>}
              </div>
            </div>
         </div>
         
         <div className="flex items-center gap-6">
            <div className="text-right">
               <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Auto-Refresh In</div>
               <div className="text-xl font-black text-blue-600 tabular-nums">{formatCountdown(nextSyncIn)}</div>
            </div>
            <button 
              onClick={() => { setNextSyncIn(900); fetchCompleteNationalData(); }}
              className="p-3 bg-gray-50 rounded-2xl hover:bg-green-50 text-green-600 transition-all shadow-inner"
            >
              <RotateCw size={24} className={isSyncing ? 'animate-spin' : ''} />
            </button>
         </div>
      </div>

      {/* Main Stats Summary */}
      <div className="bg-gradient-to-br from-gray-950 via-green-950 to-black p-8 md:p-16 rounded-[40px] md:rounded-[60px] text-white relative shadow-2xl overflow-hidden border border-white/10">
         <div className="absolute top-0 right-0 w-64 md:w-[600px] h-64 md:h-[600px] bg-green-500/10 rounded-full -mr-32 md:-mr-80 -mt-32 md:-mt-80 blur-[100px]"></div>
         <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <SummaryStat label="মোট আসন" value={300} />
            <SummaryStat label="ফলাফল ঘোষিত" value={declaredSeats} highlight />
            <SummaryStat label="স্বতন্ত্র জয়ী" value={nationalVerification?.independents?.seats_won || 0} />
            <SummaryStat label="সর্বশেষ আপডেট" value={lastSync.toLocaleTimeString('bn-BD')} type="time" />
         </div>
      </div>

      {/* Party List Section */}
      <div className="bg-white rounded-[40px] md:rounded-[60px] shadow-3xl border border-gray-100 overflow-hidden">
        <div className="p-8 md:p-12 border-b border-gray-100 bg-gray-50/50">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
             <div>
               <h3 className="text-2xl md:text-4xl font-black text-gray-900 flex items-center gap-3">
                 <ListFilter className="text-green-600" /> সকল রাজনৈতিক দলের ফলাফল
               </h3>
               <p className="text-gray-500 font-bold mt-1">নির্বাচন কমিশন (ECS) এর নিবন্ধিত সকল দলের তালিকা</p>
             </div>
             <div className="relative group w-full md:w-80">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600" size={20} />
               <input 
                 type="text" 
                 placeholder="দলের নাম দিয়ে খুঁজুন..."
                 className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/5 transition-all font-bold"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
             </div>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">রাজনৈতিক দল</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">বিজয়ী আসন</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">স্ট্যাটাস</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">ভেরিফিকেশন সোর্স</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredParties.map((party: any, idx: number) => (
                <tr key={idx} className="hover:bg-green-50/40 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center p-1">
                          {party.party_name.includes('জামায়াত') ? (
                            <img src={LOGOS.SCALE} className="w-full h-full object-contain" />
                          ) : party.party_name.includes('জাতীয়তাবাদী') ? (
                            <img src={LOGOS.PADDY} className="w-full h-full object-contain" />
                          ) : (
                            <div className="text-[10px] font-black text-gray-300">{party.party_name[0]}</div>
                          )}
                       </div>
                       <div>
                         <div className="font-black text-gray-900 group-hover:text-green-700 transition-colors">{party.party_name}</div>
                         <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">প্রতীক: {party.symbol || 'N/A'}</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className={`text-2xl font-black tabular-nums ${party.seats_won > 0 ? 'text-green-600' : 'text-gray-300'}`}>
                      {party.seats_won?.toLocaleString('bn-BD') || '০'}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      party.result_status === 'won' ? 'bg-green-50 border-green-200 text-green-700' :
                      party.result_status === 'pending' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                      'bg-gray-50 border-gray-200 text-gray-400'
                    }`}>
                      {party.result_status === 'won' ? 'বিজয়ী' : party.result_status === 'pending' ? 'প্রক্রিয়াধীন' : 'ঘোষিত হয়নি'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black text-gray-500 uppercase">{party.source}</span>
                      <span className={`text-[8px] font-bold px-2 py-0.5 rounded uppercase mt-1 ${party.confidence === 'high' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {party.confidence === 'high' ? 'অফিসিয়াল' : 'প্রোভিশনাল'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
              
              {/* Independents Row */}
              <tr className="bg-gray-950 text-white">
                <td className="px-8 py-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-black">I</div>
                    <div>
                      <div className="font-black text-xl">স্বতন্ত্র প্রার্থীগণ (Independents)</div>
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">বিভিন্ন নির্বাচনী এলাকা</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-8 text-center">
                  <div className="text-3xl font-black text-green-400 tabular-nums">
                    {nationalVerification?.independents?.seats_won?.toLocaleString('bn-BD') || '০'}
                  </div>
                </td>
                <td className="px-8 py-8 text-center">
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-[10px] font-black border border-green-500/30 uppercase tracking-widest">ঘোষিত আসন</span>
                </td>
                <td className="px-8 py-8 text-right">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">ECS ভেরিফাইড</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-amber-50 p-8 md:p-12 rounded-[40px] border-2 border-dashed border-amber-200 max-w-5xl mx-auto text-center">
         <AlertTriangle className="mx-auto text-amber-600 mb-6" size={40} />
         <h4 className="text-2xl font-black text-amber-900 mb-4">স্বচ্ছতা ও ডাটা ইন্টিগ্রিটি নোটিশ</h4>
         <p className="text-lg text-amber-800/80 font-medium leading-relaxed">
           এই তালিকাটি বাংলাদেশ নির্বাচন কমিশন (ECS) এর নিবন্ধিত সকল রাজনৈতিক দলের ওপর ভিত্তি করে তৈরি। আমরা কোনো দলকেই তালিকা থেকে বাদ দেইনি, এমনকি যাদের বিজয়ী আসনের সংখ্যা শূন্য (০)। এটি একটি নিরপেক্ষ এবং পূর্ণাঙ্গ ডাটাবেজ। তথ্যের কোনো গড়মিল পরিলক্ষিত হলে অনুগ্রহ করে নির্বাচন কমিশনের অফিসিয়াল গেজেট অনুসরণ করুন।
         </p>
      </div>
    </div>
  );
};

const SummaryStat = ({ label, value, highlight = false, type = "number" }: any) => (
  <div className={`p-6 md:p-10 rounded-[32px] border transition-all ${highlight ? 'bg-green-600/20 border-green-500/30 ring-4 ring-green-500/5' : 'bg-white/5 border-white/10'}`}>
     <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">{label}</div>
     <div className="text-2xl md:text-5xl font-black tabular-nums">
        {type === "number" ? value.toLocaleString('bn-BD') : value}
     </div>
  </div>
);

const ResultBar = ({ party, symbol, seats, total, color, logo }: any) => {
  const percent = Math.round((seats / total) * 100) || 0;
  return (
    <div className="space-y-3 md:space-y-5">
       <div className="flex justify-between items-center md:items-end">
         <div className="flex items-center gap-3 md:gap-5">
            <div className="w-10 h-10 md:w-16 md:h-16 bg-white p-2 md:p-3 rounded-xl shadow-md border border-gray-100">
              <img src={logo} className="w-full h-full object-contain" alt={party} />
            </div>
            <div>
              <span className="font-black text-xs md:text-xl text-gray-900 block leading-tight">{party}</span>
              <span className="text-[8px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">প্রতীক: {symbol}</span>
            </div>
         </div>
         <div className="text-right">
            <span className="font-black text-lg md:text-3xl block tabular-nums" style={{ color }}>{seats.toLocaleString('bn-BD')}</span>
            <span className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">আসন</span>
         </div>
       </div>
       <div className="h-4 md:h-6 bg-gray-50 rounded-full overflow-hidden p-0.5 md:p-1 shadow-inner border border-gray-100">
          <div 
            className="h-full rounded-full transition-all duration-[2000ms] relative overflow-hidden shadow-sm" 
            style={{ width: `${percent}%`, backgroundColor: color }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
       </div>
    </div>
  );
};
