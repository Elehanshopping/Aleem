
import { CandidateInfo, DeveloperInfo, FrameOption } from './types';

export const CANDIDATE: CandidateInfo = {
  name: "অধ্যক্ষ মোঃ আব্দুল আলীম",
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
  office: "Mohakhali, Dhaka",
  image: "https://i.ibb.co.com/WW3588H1/IMG-6857.jpg"
};

export const ELECTION_DATE = "2026-02-12T09:00:00+06:00";

export const LOGOS = {
  PARTY: "https://i.ibb.co.com/XfPPtcRz/Bangladesh-Jamaat-e-Islami-Logo.png",
  SCALE: "https://i.ibb.co.com/VWGs1s28/bangladesh-jamaat-e-islami-marka-daripalla-logo-png-seeklogo-623252.png",
  PADDY: "https://i.ibb.co.com/YH5cR50/images.png", // Verified BNP Logo from user source
  DEER: "https://i.ibb.co.com/Mk6dz5RV/MV5-BZDM3-Y2-Rh-Nj-Ut-ZWJl-Ny00-Mj-Qy-LWJj-Yj-Qt-OGE0-ZTA1-Zm-Y3-NDZm-Xk-Ey-Xk-Fqc-Gc-V1.jpg" // Updated Independent/Others logo
};

// 300 Parliamentary Seats for Bangladesh
export const SEATS_300 = Array.from({ length: 300 }, (_, i) => ({
  id: i + 1,
  name: `${['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'][i % 8]}-${i + 1}`,
  status: i % 10 === 0 ? 'ঘোষিত' : 'গণনা চলছে'
}));

export const SUPPORTERS = [
  {
    name: "শফিউল আজম",
    title: "সভাপতি: যুব-জামাত মোড়েলগঞ্জ উপজেলা শাখা",
    contact: "01990549103",
    image: "https://i.ibb.co.com/jP27hSyf/629458615-919199897465844-4650439013684776058-n.jpg"
  },
  {
    name: "ওয়ালিদ হাসান তাকসিদ",
    title: "সদস্য: যুব-জামাত মোরেলগঞ্জ উপজেলা শাখা",
    contact: "01862109990",
    image: "https://i.ibb.co.com/s9mLz0Zj/526986981-1133085225535496-1536184394491002098-n.jpg"
  }
];

export const CENTRAL_LEADERS = [
  {
    name: "ডা. শফিকুর রহমান",
    title: "আমীর, বাংলাদেশ জামায়াতে ইসলামী (বিজেআই)",
    description: "বাংলাদেশ জামায়াতে ইসলামীর বর্তমান আমীর ও জননন্দিত নেতা। ইনসাফ কায়েমের লড়াইয়ে অকুতোভয় সিপাহসালার।",
    image: "https://i.ibb.co.com/9mtk7jKz/AP25200482736897-1770410709.webp"
  },
  {
    name: "মাওলানা দেলাওয়ার হোসাইন সাঈদী",
    title: "সাবেক নায়েবে আমীর ও বিশ্বনন্দিত মুফাসসিরে কুরআন",
    description: "সংসদ সদস্য হিসেবে বাগেরহাটসহ সারা বাংলাদেশে কুরআনের দাওয়াত পৌঁছে দিয়েছেন।",
    image: "https://i.ibb.co.com/Vc9r8ttv/image.jpg"
  },
  {
    name: "কেন্দ্রীয় নেতৃবৃন্দ",
    title: "বাংলাদেশ জামায়াতে ইসলামী (জামাত)",
    description: "ইনসাফ ভিত্তিক সমাজ কায়েমের লক্ষ্যে ঐক্যবদ্ধ মেহনতি নেতৃত্বের কাফেলা।",
    image: "https://i.ibb.co.com/TMK3BjdG/7-jamaat-leaders-20260120201024.webp"
  }
];

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
  "ইনসাফ ভিত্তিক সমাজ গড়ি, আলীম সাহেবকে ভোট করি",
  "উন্নয়নের ধারা অব্যাহত রাখতে দাড়িপাল্লায় ভোট দিন",
  "আমাদের লক্ষ্য জনসেবা, আমাদের মার্কা দাড়িপাল্লা",
  "দুর্নীতিমুক্ত বাগেরহাট গড়তে আলীম সাহেবকে বেছে নিন",
  "পরিবর্তনের অঙ্গীকার, দাড়িপাল্লা এবার",
  "মানুষের জয়, দাড়িপাল্লার জয়",
  "সুশাসন ও ন্যায়বিচারের প্রতীক দাড়িপাল্লা",
  "বাগেরহাট-৪ এর উজ্জ্বল ভবিষ্যৎ দাড়িপাল্লা",
  "শান্তি ও অগ্রগতির মার্কা দাড়িপাল্লা",
  "ইনসাফ কায়েমে আপোষহীন অধ্যক্ষ আব্দুল আলীম",
  "দাড়িপাল্লায় দিন ভোট, রুখে দিন দুর্নীতিবাজ জোট",
  "যোগ্য নেতা আলীম ভাই, দাড়িপাল্লায় বিকল্প নাই"
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

export const GONOVOTE_INFO = {
  yes: {
    title: "কেন 'হ্যাঁ' ভোট দেবেন?",
    points: [
      { id: 1, title: "সততা ও নৈতিকতা", desc: "অধ্যক্ষ মোঃ আব্দুল আলীম একজন সৎ ও নীতিবান মানুষ, যিনি দুর্নীতির ঊর্ধ্বে।" },
      { id: 2, title: "এলাকার উন্নয়ন", desc: "মোরেলগঞ্জ ও শরণখোলার অবকাঠামোগত উন্নয়নে তার পরিকল্পনা সুদূরপ্রসারী।" },
      { id: 3, title: "সুশাসন প্রতিষ্ঠা", desc: "ন্যায়বিচার ও ইনসাফ ভিত্তিক সমাজ প্রতিষ্ঠায় তার অঙ্গীকার অবিচল।" }
    ]
  },
  no: {
    title: "কেন 'না' ভোট দেবেন না?",
    points: [
      { id: 1, title: "উন্নয়নের ব্যাঘাত", desc: "সঠিক নেতা নির্বাচিত না হলে এলাকার উন্নয়ন থমকে যেতে পারে।" },
      { id: 2, title: "দুর্নীতির আশঙ্কা", desc: "অযোগ্য নেতৃত্ব দুর্নীতি ও অনিয়মকে প্রশ্রয় দেয়।" },
      { id: 3, title: "অস্থিরতা বৃদ্ধি", desc: "সুশাসনের অভাবে সামাজিক ও রাজনৈতিক অস্থিরতা বৃদ্ধি পেতে পারে।" }
    ]
  },
  conclusion: "আপনার একটি ভোটই পারে মোরেলগঞ্জ ও শরণখোলার ভাগ্য পরিবর্তন করতে। ১২ ফেব্রুয়ারি সঠিক সিদ্ধান্ত নিন।"
};
