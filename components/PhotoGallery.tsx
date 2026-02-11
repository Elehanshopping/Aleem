
import React from 'react';
import { ALIM_IMAGES } from '../constants';

const campaignPhotos = [
  ALIM_IMAGES.meeting,
  ALIM_IMAGES.press,
  ALIM_IMAGES.speech,
  ALIM_IMAGES.poster1,
  ALIM_IMAGES.banner,
  ALIM_IMAGES.poster2,
  ALIM_IMAGES.flyer,
  ALIM_IMAGES.portrait_bg
];

export const PhotoGallery: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-900">প্রচারণার খণ্ডচিত্র</h2>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {campaignPhotos.map((src, idx) => (
            <div key={idx} className="break-inside-avoid rounded-3xl overflow-hidden shadow-lg border-4 border-white hover:scale-[1.02] transition-transform bg-white">
              <img src={src} alt={`Campaign ${idx}`} className="w-full h-auto object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
