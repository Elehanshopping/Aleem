
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { CANDIDATE } from '../constants';
import { Send, Copy, Sparkles, Loader2, Share2 } from 'lucide-react';

export const AISloganGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateSlogan = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `আপনি প্রফেসর মোঃ আবদুল আলিম (বাগেরহাট-৪, মোরেলগঞ্জ-শরণখোলা) এর নির্বাচনী প্রচারণার একজন ডিজিটাল বিশেষজ্ঞ। 
                  ইউজার আপনাকে একটি টপিক দেবে: "${prompt}"। 
                  এই টপিকের ওপর ভিত্তি করে ৫টি আকর্ষণীয় ও শক্তিশালী নির্বাচনী স্লোগান বা ফেসবুক পোস্ট তৈরি করুন যা এলাকার ভোটারদের মনে দাগ কাটবে। 
                  স্লোগানগুলো অবশ্যই খাঁটি বাংলায় হতে হবে এবং প্রার্থীর সততা ও এলাকার উন্নয়নের ওপর জোর দিতে হবে।`,
        config: {
          temperature: 0.8,
          topP: 0.9,
          maxOutputTokens: 1000,
        }
      });

      setResult(response.text || 'কোন স্লোগান তৈরি করা সম্ভব হয়নি। আবার চেষ্টা করুন।');
    } catch (err) {
      console.error(err);
      setError('AI সংযোগে সমস্যা হচ্ছে। কিছুক্ষণ পর আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert('কপি করা হয়েছে!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
              <Sparkles size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">স্মার্ট ক্যাম্পেইন আইডিয়া</h3>
              <p className="text-gray-500 text-sm">স্লোগান বা ফেসবুক পোস্টের জন্য টপিক লিখুন</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="যেমন: এলাকার রাস্তাঘাট উন্নয়ন, তরুণদের কর্মসংস্থান বা প্রার্থীর সততা নিয়ে স্লোগান তৈরি করুন..."
                className="w-full h-32 p-6 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-purple-500 focus:ring-0 transition-all resize-none text-lg"
              />
              <button
                onClick={generateSlogan}
                disabled={loading || !prompt.trim()}
                className="absolute bottom-4 right-4 bg-purple-600 text-white p-4 rounded-xl hover:bg-purple-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Send />}
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                {error}
              </div>
            )}

            {result && (
              <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-700">AI এর পরামর্শ:</h4>
                  <div className="flex gap-2">
                    <button 
                      onClick={copyToClipboard}
                      className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 text-sm"
                    >
                      <Copy size={16} /> কপি করুন
                    </button>
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 text-sm">
                      <Share2 size={16} /> শেয়ার করুন
                    </button>
                  </div>
                </div>
                <div className="p-8 bg-purple-50/50 rounded-2xl border-2 border-dashed border-purple-200 whitespace-pre-wrap leading-relaxed text-gray-800 italic text-lg">
                  {result}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-6 flex flex-wrap gap-4 items-center justify-center border-t border-gray-100">
          <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">জনপ্রিয় টপিক:</span>
          {['উন্নয়ন', 'শিক্ষা', 'সততা', 'কর্মসংস্থান', 'কৃষি'].map(topic => (
            <button 
              key={topic}
              onClick={() => setPrompt(topic + ' নিয়ে প্রচারণা')}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-all"
            >
              #{topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
