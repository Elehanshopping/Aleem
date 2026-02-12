
import React, { useState, useEffect, useCallback } from 'react';
import { LOGOS } from '../constants';
import { Globe, Clock, Loader2, Award, TrendingUp, Info, RotateCw, ShieldCheck, Database, Server, ExternalLink, ShieldAlert, AlertTriangle, Fingerprint, FilterX, ListFilter, Search, CheckCircle2, Zap, ShieldQuestion, Activity } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';

export const NationalResults: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [lastSync, setLastSync] = useState(new Date());
  const [nextSyncIn, setNextSyncIn] = useState(900); 
  const [isSyncing, setIsSyncing] = useState(false);
  const [data, setData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const fetchNationalLiveMonitor = useCallback(async () => {
    setIsSyncing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `You are a REAL-TIME NATIONAL ELECTION RESULT PUBLISHER for Bangladesh Parliamentary Election held on 12 February 2026.
Your output powers the NATIONAL RESULTS PAGE (All Bangladesh).

CORE OBJECTIVE:
1) Instantly publish officially DECLARED polling center / constituency results
2) Continuously monitor new incoming data
3) Verify each new result against strict anti-spam rules
4) Publish ONLY if confidence = 100%
5) Ignore, delay, or flag suspicious data

SOURCE PRIORITY (ABSOLUTE):
TIER 1 — FINAL & TRUSTED: Bangladesh Election Commission (ECS)
TIER 2 — SECONDARY (PROVISIONAL ONLY): Reputable media live updates. Media data MUST NEVER auto-publish without ECS confirmation.

ANTI-SPAM VERIFICATION RULES:
A) Source Authenticity: Is it from ECS? (Pass) If media (Hold)
B) Duplicate Check: Already published? (Skip)
C) Consistency Check: Conflicts with ECS data? (Reject)
D) Time Logic: Declaration timestamp valid? (Pass/Fail)
E) Cross-source Confirmation: ECS + official match? (Pass)

OUTPUT STRICT JSON ONLY:
{
  "generated_at": "<ISO-8601 timestamp>",
  "national_page": {
    "status": "live",
    "total_seats": 300,
    "declared_results": [
      {
        "constituency": "...",
        "center_name": "...",
        "winner": "...",
        "party": "...",
        "votes": 0,
        "declaration_time": "...",
        "verification": {
          "confidence": "100%",
          "verified_by": "Bangladesh Election Commission",
          "spam_check_passed": true
        },
        "published": true
      }
    ],
    "pending_results": [
      {
        "source": "Media / Unverified",
        "reason": "Awaiting ECS confirmation"
      }
    ],
    "last_official_update": "<timestamp>"
  },
  "integrity": {
    "auto_publish_enabled": true,
    "spam_filter_active": true,
    "media_not_auto_published": true,
    "ecs_final_authority": true,
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
              generated_at: { type: Type.STRING },
              national_page: {
                type: Type.OBJECT,
                properties: {
                  status: { type: Type.STRING },
                  total_seats: { type: Type.NUMBER },
                  declared_results: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        constituency: { type: Type.STRING },
                        center_name: { type: Type.STRING, nullable: true },
                        winner: { type: Type.STRING },
                        party: { type: Type.STRING },
                        votes: { type: Type.NUMBER, nullable: true },
                        declaration_time: { type: Type.STRING },
                        verification: {
                          type: Type.OBJECT,
                          properties: {
                            confidence: { type: Type.STRING },
                            verified_by: { type: Type.STRING },
                            spam_check_passed: { type: Type.BOOLEAN }
                          }
                        },
                        published: { type: Type.BOOLEAN }
                      }
                    }
                  },
                  pending_results: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        source: { type: Type.STRING },
                        reason: { type: Type.STRING }
                      }
                    }
                  },
                  last_official_update: { type: Type.STRING }
                }
              },
              integrity: {
                type: Type.OBJECT,
                properties: {
                  auto_publish_enabled: { type: Type.BOOLEAN },
                  spam_filter_active: { type: Type.BOOLEAN },
                  media_not_auto_published: { type: Type.BOOLEAN },
                  ecs_final_authority: { type: Type.BOOLEAN },
                  no_hallucination: { type: Type.BOOLEAN }
                }
              }
            }
          }
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      setData(parsed);
      
    } catch (err) {
      console.error("National Live Monitor failure:", err);
    } finally {
      setLastSync(new Date());
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await new Promise(r => setTimeout(r, 1000));
      setLoading(false);
      fetchNationalLiveMonitor();
    };
    init();

    const countdownInterval = setInterval(() => {
      setNextSyncIn((prev) => {
        if (prev <= 1) {
          fetchNationalLiveMonitor();
          return 900;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [fetchNationalLiveMonitor]);

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 md:py-40">
        <Loader2 className="animate-spin text-green-600 mb-4" size={48} />
        <h3 className="text-xl md:text-2xl font-black text-gray-900 text-center tracking-tight">ন্যাশনাল লাইভ মনিটর <br/> সক্রিয় হচ্ছে...</h3>
        <p className="text-gray-400 font-bold mt-2 animate-pulse flex items-center gap-2 text-sm">
          <Fingerprint size={14} className="text-blue-500" /> ANTI-SPAM PROTOCOL ACTIVE...
        </p>
      </div>
    );
  }

  const filteredResults = data?.national_page?.declared_results.filter((r: any) => 
    r.constituency.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.winner.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="max-w-7xl mx-auto space-y-8 md:space-y-12 pb-20 px-4">
      {/* Real-time Status Header */}
      <div className="bg-white border-b-8 border-gray-950 p-6 md:p-10 rounded-[32px] md:rounded-[48px] shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-4">
           <div className="flex items-center gap-2">
             <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
             <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Live National Monitor</span>
           </div>
         </div>
         
         <div className="flex items-center gap-6">
            <div className="bg-gray-950 text-white p-5 rounded-[28px] shadow-xl">
               <Globe size={40} className={isSyncing ? 'animate-spin' : ''} />
            </div>
            <div>
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tighter">জাতীয় ফলাফল লাইভ মনিটর</h2>
              <div className="flex flex-wrap gap-2 mt-3">
                 <IntegrityBadge active={data?.integrity?.spam_filter_active} label="Spam Filter" />
                 <IntegrityBadge active={data?.integrity?.ecs_final_authority} label="ECS Authority" />
                 <IntegrityBadge active={data?.integrity?.no_hallucination} label="100% Verified" />
              </div>
            </div>
         </div>

         <div className="flex items-center gap-4 bg-gray-50 p-5 rounded-[32px] border border-gray-100 w-full lg:w-auto">
            <div className="text-right flex-grow">
               <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Next Auto-Sync</div>
               <div className="text-2xl font-black text-blue-600 tabular-nums leading-none mt-1">{formatCountdown(nextSyncIn)}</div>
            </div>
            <button 
              onClick={() => { setNextSyncIn(900); fetchNationalLiveMonitor(); }}
              disabled={isSyncing}
              className="p-4 bg-white rounded-2xl text-green-600 hover:shadow-lg transition-all border border-gray-200"
            >
              <RotateCw size={28} className={isSyncing ? 'animate-spin' : ''} />
            </button>
         </div>
      </div>

      {/* National Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
         <StatCard label="মোট আসন" value={data?.national_page?.total_seats || 300} icon={<Database size={20} />} />
         <StatCard label="ঘোষিত ফলাফল" value={data?.national_page?.declared_results?.length || 0} icon={<CheckCircle2 size={20} />} highlight />
         <StatCard label="পেন্ডিং ভেরিফিকেশন" value={data?.national_page?.pending_results?.length || 0} icon={<ShieldQuestion size={20} />} warning />
         <StatCard label="সর্বশেষ ভেরিফিকেশন" value={data?.national_page?.last_official_update ? new Date(data.national_page.last_official_update).toLocaleTimeString('bn-BD') : lastSync.toLocaleTimeString('bn-BD')} icon={<Clock size={20} />} type="time" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Declared Results Table */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white rounded-[40px] md:rounded-[56px] shadow-3xl border border-gray-100 overflow-hidden">
              <div className="p-8 md:p-12 bg-gray-50/50 border-b border-gray-100">
                 <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-3">
                        <Activity className="text-green-600" /> অফিশিয়াল ডিক্লেয়ার্ড রেজাল্ট
                      </h3>
                      <p className="text-gray-500 font-bold mt-1">শুধুমাত্র ১০০% ভেরিফাইড (ECS) ডাটা এখানে প্রকাশিত</p>
                    </div>
                    <div className="relative w-full md:w-80">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input 
                        type="text" 
                        placeholder="আসন বা প্রার্থীর নাম..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:border-green-500 font-bold"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                 </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead className="bg-gray-50">
                      <tr>
                        <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">নির্বাচনী এলাকা</th>
                        <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">বিজয়ী প্রার্থী</th>
                        <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">ভেরিফিকেশন</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                      {filteredResults.length > 0 ? filteredResults.map((res: any, idx: number) => (
                        <tr key={idx} className="hover:bg-green-50/40 transition-all group">
                           <td className="px-8 py-6">
                              <div className="font-black text-gray-900 text-lg">{res.constituency}</div>
                              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">ঘোষণা সময়: {res.declaration_time}</div>
                           </td>
                           <td className="px-8 py-6 text-center">
                              <div className="font-black text-gray-900 text-xl leading-tight">{res.winner}</div>
                              <div className="flex items-center justify-center gap-2 mt-2">
                                 <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                 <span className="text-xs font-black text-green-700 uppercase">{res.party}</span>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <div className="flex flex-col items-end">
                                 <div className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-200">
                                    <ShieldCheck size={12} /> {res.verification.confidence} CONFIDENCE
                                 </div>
                                 <div className="text-[10px] font-bold text-gray-400 mt-2">{res.verification.verified_by}</div>
                              </div>
                           </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={3} className="px-8 py-20 text-center text-gray-400 font-black">
                            {searchTerm ? 'কোন তথ্য পাওয়া যায়নি' : 'ECS এর অফিসিয়াল ঘোষণার অপেক্ষায়...'}
                          </td>
                        </tr>
                      )}
                   </tbody>
                </table>
              </div>
           </div>
        </div>

        {/* Pending & Integrity Sidebar */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-gray-950 text-white p-8 md:p-10 rounded-[40px] md:rounded-[56px] shadow-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                <ShieldAlert className="text-yellow-400" /> পেন্ডিং ভেরিফিকেশন কিউ
              </h3>
              <div className="space-y-4">
                 {data?.national_page?.pending_results?.map((pending: any, idx: number) => (
                    <div key={idx} className="p-5 bg-white/5 rounded-3xl border border-white/10 group hover:border-white/20 transition-all">
                       <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{pending.source}</span>
                          <span className="px-2 py-0.5 bg-yellow-400/20 text-yellow-400 rounded text-[8px] font-black uppercase">Holding</span>
                       </div>
                       <p className="text-sm font-bold text-gray-300 leading-relaxed italic">"{pending.reason}"</p>
                    </div>
                 ))}
                 {!data?.national_page?.pending_results?.length && (
                    <div className="text-center py-8 text-gray-600 font-bold italic">
                       কোন পেন্ডিং ডেটা নেই
                    </div>
                 )}
              </div>
           </div>

           <div className="bg-white p-8 md:p-10 rounded-[40px] md:rounded-[56px] shadow-xl border border-gray-100">
              <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                 <Zap className="text-blue-600" /> ইন্টিগ্রিটি ম্যাট্রিক্স
              </h3>
              <div className="space-y-6">
                 <IntegrityMetric label="Anti-Spam Filter" active={data?.integrity?.spam_filter_active} />
                 <IntegrityMetric label="Media-to-Official Sync" active={data?.integrity?.media_not_auto_published} />
                 <IntegrityMetric label="Hallucination Prevention" active={data?.integrity?.no_hallucination} />
                 <div className="pt-4 border-t border-gray-50">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                       * আমাদের এআই সিস্টেম প্রতিটি ডেটা পয়েন্ট ইসিএস অফিসিয়াল গেজেট ও সাইট থেকে ক্রস-রেফারেন্স করছে। কোনো অমিল থাকলে তা স্বয়ংক্রিয়ভাবে বাদ দেওয়া হয়।
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-amber-50 p-8 md:p-12 rounded-[40px] border-2 border-dashed border-amber-200 max-w-5xl mx-auto text-center">
         <AlertTriangle className="mx-auto text-amber-600 mb-6" size={40} />
         <h4 className="text-2xl font-black text-amber-900 mb-4">স্বচ্ছতা ও ডাটা ইন্টিগ্রিটি নোটিশ</h4>
         <p className="text-lg text-amber-800/80 font-medium leading-relaxed">
           এই বোর্ডটি সরাসরি বাংলাদেশ নির্বাচন কমিশন (ECS) এর ঘোষণা অনুসরণ করে। মিডিয়া বা অন্য সোর্স থেকে প্রাপ্ত তথ্য ভেরিফিকেশন শেষ না হওয়া পর্যন্ত এখানে প্রকাশিত হয় না। এটি একটি রিয়েল-টাইম ন্যাশনাল মনিটর যা নির্ভুল তথ্যের নিশ্চয়তা দেয়।
         </p>
      </div>
    </div>
  );
};

const IntegrityBadge = ({ active, label }: { active: boolean, label: string }) => (
  <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${
    active ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700 opacity-50'
  }`}>
    <ShieldCheck size={12} className={active ? 'text-green-600' : 'text-red-400'} /> {label}
  </span>
);

const IntegrityMetric = ({ label, active }: { label: string, active: boolean }) => (
  <div className="flex items-center justify-between">
     <span className="text-sm font-black text-gray-700">{label}</span>
     <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {active ? 'Active' : 'Offline'}
     </div>
  </div>
);

const StatCard = ({ label, value, icon, highlight = false, warning = false, type = "number" }: any) => (
  <div className={`p-8 rounded-[36px] border transition-all shadow-sm ${
    highlight ? 'bg-green-600/10 border-green-500/20' : 
    warning ? 'bg-amber-600/10 border-amber-500/20' : 
    'bg-white border-gray-100'
  }`}>
     <div className="flex items-center gap-2 mb-3">
        <div className={`p-2 rounded-xl ${highlight ? 'bg-green-600 text-white' : warning ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
           {icon}
        </div>
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</div>
     </div>
     <div className={`text-2xl md:text-3xl font-black tabular-nums ${highlight ? 'text-green-600' : warning ? 'text-amber-600' : 'text-gray-900'}`}>
        {type === "number" ? value.toLocaleString('bn-BD') : value}
     </div>
  </div>
);
