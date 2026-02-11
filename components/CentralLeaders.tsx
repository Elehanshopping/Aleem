
import React from 'react';
import { CENTRAL_LEADERS } from '../constants';
import { ShieldCheck, Star } from 'lucide-react';

export const CentralLeaders: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full font-bold text-xs uppercase tracking-widest mb-4">
            <Star size={14} fill="currentColor" /> আদর্শিক নেতৃত্ব
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">কেন্দ্রীয় ও বরেণ্য নেতৃবৃন্দ</h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            যাদের ত্যাগের বিনিময়ে আজ আমরা ইনসাফ কায়েমের স্বপ্ন দেখছি। তাদের দেখানো পথেই আমাদের এগিয়ে চলা।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {CENTRAL_LEADERS.map((leader, index) => (
            <div key={index} className="group relative bg-gray-50 rounded-[40px] p-4 overflow-hidden hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-green-100">
              <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-6">
                <img 
                  src={leader.image} 
                  alt={leader.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-white/80 font-bold text-xs uppercase tracking-widest mb-1">
                    <ShieldCheck size={14} className="text-green-400" /> ভেরিফাইড লিডারশিপ
                  </div>
                  <h4 className="text-white text-xl font-black">{leader.name}</h4>
                </div>
              </div>
              <div className="px-4 pb-4">
                <div className="text-green-700 font-black text-sm mb-3">{leader.title}</div>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  {leader.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
