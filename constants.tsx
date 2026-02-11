
import { CandidateInfo, DeveloperInfo, FrameOption } from './types';

export const CANDIDATE: CandidateInfo = {
  name: "প্রফেসর মোঃ আবদুল আলিম",
  party: "বাংলাদেশ জামায়াতে ইসলামী",
  alliance: "১১ দলীয় জোট",
  constituency: "বাগেরহাট-৪",
  regions: ["মোরেলগঞ্জ", "শরণখোলা"]
};

export const DEVELOPER: DeveloperInfo = {
  company: "DevSpark Soft",
  ceo: "Walid Hasan Taksid",
  phone: "+8809649999143",
  email: "Walid@Taksid.com",
  office: "Mohakhali, Dhaka"
};

export const ELECTION_DATE = "2026-02-12T09:00:00+06:00";

export const LOGOS = {
  SCALE: "https://i.ibb.co.com/VWGs1s28/bangladesh-jamaat-e-islami-marka-daripalla-logo-png-seeklogo-623252.png",
  PADDY: "https://i.ibb.co.com/0RqkNtpR/images.jpg", 
  DEER: "https://static.thenounproject.com/png/1183313-200.png" 
};

export const GONOVOTE_INFO = {
  yes: {
    title: "দাঁড়িপাল্লায় ভোট দিলে কি হবে?",
    desc: "ইনসাফ ভিত্তিক সমাজ কায়েম হবে, এলাকার সুষম উন্নয়ন নিশ্চিত হবে এবং দুর্নীতির অবসান ঘটবে। সৎ ও যোগ্য নেতৃত্বের মাধ্যমে মোরেলগঞ্জ-শরণখোলার মর্যাদা পুনঃপ্রতিষ্ঠিত হবে।"
  },
  no: {
    title: "না ভোট দিলে কি হবে?",
    desc: "উন্নয়ন কার্যক্রম বাধাগ্রস্ত হবে, অনিয়ম ও দুর্নীতির ধারা অব্যাহত থাকবে এবং যোগ্য নেতৃত্ব নির্বাচনের সুযোগ হাতছাড়া হবে যা এলাকার পিছিয়ে পড়াকে দীর্ঘায়িত করবে।"
  }
};

export const ALIM_IMAGES = {
  portrait: "https://i.ibb.co.com/TBzz7mTc/596821013-2647753702256569-4013855425610695971-n.jpg",
  portrait_bg: "https://i.ibb.co.com/pBhft63t/600217443-2654651138233492-2010404123088880727-n.jpg",
  meeting: "https://i.ibb.co.com/qMSpbTMr/606060252-2670737486624857-1425802054616174528-n.jpg",
  press: "https://i.ibb.co.com/Ndk2h4py/627787778-2704184373280168-7095053172557067560-n.jpg",
  speech: "https://i.ibb.co.com/PsBBLCqg/623941621-2696306754067930-200072306234992316-n.jpg",
  poster1: "https://i.ibb.co.com/VctP29JC/629278307-2705251856506753-4494963480080133660-n.jpg",
  banner: "https://i.ibb.co.com/BV6dTMWG/619073171-2683837511981521-7474305004397946079-n.jpg",
  poster2: "https://i.ibb.co.com/VW5T1jKm/600217443-2654651138233492-2010404123088880727-n-removebg-preview.png",
  flyer: "https://i.ibb.co.com/23CVHVd1/629441313-2704212979943974-844998305510519225-n.jpg",
  cutout: "https://i.ibb.co.com/VW5T1jKm/600217443-2654651138233492-2010404123088880727-n-removebg-preview.png"
};

export const SLOGANS = [
  "দাড়িপাল্লায় ভোট দিন, ইনসাফ কায়েম করুন",
  "মোরেলগঞ্জ-শরণখোলার উন্নয়ন চাই, দাড়িপাল্লায় ভোট পাই",
  "সৎ ও যোগ্য নেতার জয়, দাড়িপাল্লায় ভয় নাই",
  "ইনসাফ ভিত্তিক সমাজ গড়ি, আলিম সাহেবকে ভোট করি",
  "উন্নয়নের ধারা অব্যাহত রাখতে দাড়িপাল্লায় ভোট দিন",
  "আমাদের লক্ষ্য জনসেবা, আমাদের মার্কা দাড়িপাল্লা",
  "দুর্নীতিমুক্ত বাগেরহাট গড়তে আলিম সাহেবকে বেছে নিন",
  "পরিবর্তনের অঙ্গীকার, দাড়িপাল্লা এবার",
  "মানুষের জয়, দাড়িপাল্লার জয়",
  "সুশাসন ও ন্যায়বিচারের প্রতীক দাড়িপাল্লা",
  "বাগেরহাট-৪ এর উজ্জ্বল ভবিষ্যৎ দাড়িপাল্লা",
  "শান্তি ও অগ্রগতির মার্কা দাড়িপাল্লা",
  "ইনসাফ কায়েমে আপোষহীন অধ্যাপক আলিম",
  "দাড়িপাল্লায় দিন ভোট, রুখে দিন দুর্নীতিবাজ জোট",
  "যোগ্য নেতা আলিম ভাই, দাড়িপাল্লায় বিকল্প নাই"
];

const LAYOUT_TYPES: ('classic' | 'modern' | 'minimal' | 'bold' | 'ribbon' | 'circular' | 'banner_top' | 'banner_bottom' | 'elegant' | 'dynamic')[] = [
  'classic', 'modern', 'minimal', 'bold', 'ribbon', 'circular', 'banner_top', 'banner_bottom', 'elegant', 'dynamic'
];

const COLORS = [
  { main: '#006a4e', accent: '#f42a41' },
  { main: '#1a3a3a', accent: '#d4af37' },
  { main: '#111827', accent: '#10b981' },
  { main: '#065f46', accent: '#ffffff' }
];

export const FRAME_OPTIONS: (FrameOption & { type: string, slogan: string })[] = Array.from({ length: 100 }).map((_, i) => {
  const layout = LAYOUT_TYPES[i % LAYOUT_TYPES.length];
  const slogan = SLOGANS[i % SLOGANS.length];
  const color = COLORS[i % COLORS.length];
  
  return {
    id: `frame-${i + 1}`,
    name: `স্টাইল ${i + 1}`,
    color: color.main,
    accent: color.accent,
    type: layout,
    slogan: slogan
  };
});
