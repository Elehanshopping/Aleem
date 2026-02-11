
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
  office: "Mohakhali, Dhaka"
};

export const ELECTION_DATE = "2026-02-12T09:00:00+06:00";

export const LOGOS = {
  PARTY: "https://i.ibb.co.com/XfPPtcRz/Bangladesh-Jamaat-e-Islami-Logo.png",
  SCALE: "https://i.ibb.co.com/VWGs1s28/bangladesh-jamaat-e-islami-marka-daripalla-logo-png-seeklogo-623252.png",
  PADDY: "https://i.ibb.co.com/0RqkNtpR/images.jpg", 
  DEER: "https://static.thenounproject.com/png/1183313-200.png" 
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
    title: "সদস্য: যুব-জামাত মোড়েলগঞ্জ উপজেলা শাখা",
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

export const GONOVOTE_INFO = {
  yes: {
    title: "গণভোট দিলে কী হবে?",
    points: [
      {
        id: 1,
        title: "জনগণের সরাসরি অংশগ্রহণ নিশ্চিত হবে",
        desc: "গণভোটের মাধ্যমে জনগণ সরাসরি সিদ্ধান্ত গ্রহণে অংশ নেয়। এতে মানুষ মনে করে যে রাষ্ট্র পরিচালনায় তাদের মতামতের মূল্য আছে। গণতন্ত্রের মূল ভিত্তি হলো জনগণের মতামত, তাই গণভোট সেই ভিত্তিকে শক্তিশালী করে।"
      },
      {
        id: 2,
        title: "সিদ্ধান্তের বৈধতা ও গ্রহণযোগ্যতা বাড়বে",
        desc: "যদি কোনো সিদ্ধান্ত জনগণের ভোটের মাধ্যমে গৃহীত হয়, তবে সেটির গ্রহণযোগ্যতা অনেক বেশি হয়। বিরোধী পক্ষও সাধারণত ফলাফল মেনে নিতে বাধ্য হয়, কারণ এটি জনগণের রায়।"
      },
      {
        id: 3,
        title: "রাজনৈতিক সংকট সমাধানে সহায়ক হতে পারে",
        desc: "কখনও কখনও কোনো ইস্যু নিয়ে রাজনৈতিক দলগুলোর মধ্যে তীব্র মতভেদ থাকে। সে ক্ষেত্রে গণভোট একটি চূড়ান্ত সমাধান দিতে পারে এবং দীর্ঘমেয়াদি অস্থিরতা কমাতে সাহায্য করতে পারে।"
      },
      {
        id: 4,
        title: "সচেতনতা ও রাজনৈতিক শিক্ষার প্রসার ঘটবে",
        desc: "গণভোটের আগে মানুষ বিষয়টি নিয়ে আলোচনা করে, প্রচার-প্রচারণা চলে, গণমাধ্যমে বিতর্ক হয়। এতে জনগণের রাজনৈতিক সচেতনতা বৃদ্ধি পায়।"
      },
      {
        id: 5,
        title: "সময় ও ব্যয়ের বিষয়",
        desc: "গণভোট আয়োজন করা একটি বড় চ্যালেঞ্জ হতে পারে, তবে এটি দীর্ঘমেয়াদী স্থায়িত্ব ও ইনসাফ কায়েমের জন্য প্রয়োজনীয় বিনিয়োগ।"
      }
    ]
  },
  no: {
    title: "গণভোট না দিলে কী হবে?",
    points: [
      {
        id: 1,
        title: "সিদ্ধান্ত সংসদ বা সরকারের মাধ্যমে নেওয়া হবে",
        desc: "গণভোট না হলে সাধারণত নির্বাচিত প্রতিনিধিরা (সংসদ সদস্যরা) সিদ্ধান্ত নেন। এটি প্রতিনিধিত্বমূলক গণতন্ত্রের স্বাভাবিক প্রক্রিয়া হলেও সরাসরি জনমতের অভাব থাকে।"
      },
      {
        id: 2,
        title: "দ্রুত সিদ্ধান্ত নেওয়া সম্ভব",
        desc: "গণভোট আয়োজন না করলে সময় ও খরচ কম লাগে। জরুরি পরিস্থিতিতে দ্রুত সিদ্ধান্ত নেওয়া সহজ হয়, তবে জনমতের প্রতিফলন না ঘটার ঝুঁকি থাকে।"
      },
      {
        id: 3,
        title: "জনগণের সরাসরি মতামত জানা যাবে না",
        desc: "এতে অনেক সময় জনগণের একটি অংশ মনে করতে পারে যে তাদের মতামত গুরুত্ব পায়নি। ফলে জনগণের মধ্যে অসন্তোষ তৈরি হতে পারে।"
      },
      {
        id: 4,
        title: "রাজনৈতিক বিতর্ক দীর্ঘস্থায়ী হতে পারে",
        desc: "গণভোটের মাধ্যমে সরাসরি রায় না হলে কোনো ইস্যু নিয়ে দীর্ঘদিন বিতর্ক চলতে পারে এবং রাজনৈতিক অস্থিরতা বাড়তে পারে।"
      }
    ]
  },
  conclusion: "গণভোট হলো জনগণের সরাসরি মতামত প্রকাশের একটি শক্তিশালী গণতান্ত্রিক মাধ্যম. এটি সিদ্ধান্তের বৈধতা ও গ্রহণযোগ্যতা বাড়ায় এবং জনগণের অংশগ্রহণ নিশ্চিত করে। বাগেরহাট-৪ এর ভবিষ্যৎ নির্ধারণে আপনার মতামত অত্যন্ত গুরুত্বপূর্ণ।"
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
