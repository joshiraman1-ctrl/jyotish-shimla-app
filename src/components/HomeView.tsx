import React from 'react';
import {
  Calendar,
  Layers,
  HeartHandshake,
  FileQuestion,
  ShieldAlert,
  Gem,
  Flame,
  Home as HomeIcon,
  Sparkles,
  Compass,
  MessageSquare,
  ShieldCheck,
  Code2,
  Clock,
  Info,
  Settings,
  Share2,
  ChevronRight,
  Sun,
  Moon,
  Search,
  Bell,
  Users,
  BookOpen
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab }) => {
  const { t } = useLanguage();

  const currentDateStr = "09:53 am, 04 सितं 2026";
  const hinduTimeStr = "हिन्दू समय 09:44";
  const tithiStr = "अष्टमी, कृष्ण पक्ष, भाद्रपद";
  const nakshatraStr = "(2 वा) रोहिणी, शुक्रवार, 2083 विक्रम संवत";
  const choghadiyaStr = "अमृत 09:10 - 10:45";

  return (
    <div className="space-y-3 pb-8">
      {/* 1. Top Hindu Calendar Widget Card matching the screenshot */}
      <div className="bg-white rounded-2xl border border-stone-200 p-3.5 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌙</span>
            <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold shadow-2xs">
              {currentDateStr}
            </span>
          </div>
          <button type="button" className="p-1.5 rounded-full hover:bg-stone-100 text-stone-700">
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Hindu Time & Tithi Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl px-3 py-2 text-center">
            <span className="text-[11px] font-bold text-amber-900 block">{hinduTimeStr}</span>
          </div>
          <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl px-3 py-2 text-center">
            <span className="text-[11px] font-bold text-amber-900 block">{tithiStr}</span>
          </div>
        </div>

        {/* Nakshatra & Vikram Samvat Strip */}
        <div className="bg-amber-100/60 border border-amber-200 rounded-xl p-2 text-center">
          <span className="text-xs font-bold text-amber-950">{nakshatraStr}</span>
        </div>

        {/* Choghadiya Box */}
        <div className="flex items-center justify-between bg-stone-50 border border-stone-200 rounded-xl px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-700">चौघड़िया</span>
            <span className="text-xs font-bold text-emerald-700">{choghadiyaStr}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400 rotate-90" />
        </div>
      </div>

      {/* 2. Today Special Event Header */}
      <div className="bg-white rounded-2xl border border-stone-200 px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="text-lg">🏺</span>
          <h2 className="font-serif font-bold text-orange-950 text-sm sm:text-base">कृष्णा जन्माष्टमी</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-600">Today</span>
          <Bell className="w-4 h-4 text-amber-600" />
        </div>
      </div>

      {/* 3. Main 2-Column Menu Grid matching the screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        
        {/* 1. Daily Panchang & Muhurat */}
        <button
          type="button"
          onClick={() => setActiveTab('panchang')}
          className="bg-gradient-to-r from-amber-50 via-orange-50/80 to-yellow-50 rounded-2xl border-2 border-orange-300/80 p-4 text-left hover:border-orange-500 hover:shadow-lg transition-all flex items-start gap-4 group col-span-1 sm:col-span-2 shadow-sm"
        >
          <div className="w-12 h-12 rounded-xl bg-orange-600 text-amber-100 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-orange-950 text-base sm:text-lg group-hover:text-orange-800 transition-colors">Daily Panchang & Muhurat</h3>
              <span className="text-[10px] font-bold px-2.5 py-1 bg-amber-200/80 text-amber-950 rounded-full border border-amber-300">दैनिक एवं मासिक</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 mt-1 font-medium">मासिक, दैनिक पंचांग, सूर्य/चन्द्र उदय, मुहूर्त एवं त्यौहार</p>
          </div>
        </button>

        {/* 2. जन्म कुंडली (Janm Kundali - 3rd position in app overall) */}
        <button
          type="button"
          onClick={() => setActiveTab('birth-chart')}
          className="bg-gradient-to-r from-orange-50 via-amber-50 to-white rounded-2xl border-2 border-orange-300 p-4 text-left hover:border-orange-500 hover:shadow-md transition-all flex items-start gap-3.5 group shadow-sm col-span-1 sm:col-span-2"
        >
          <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-orange-950 text-base sm:text-lg group-hover:text-orange-800 transition-colors">जन्म कुंडली, चक्र व विश्लेषण (Janm Kundali)</h3>
              <span className="text-[10px] font-bold px-2.5 py-1 bg-orange-200 text-orange-950 rounded-full border border-orange-300">संपूर्ण फलादेश</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 mt-1 font-medium">लग्न चक्र, नवमांश, 120-वर्षीय विंशोत्तरी महादशा, गोचर व AI फलादेश</p>
          </div>
        </button>



        {/* 6. प्रश्न कुंडली */}
        <button
          type="button"
          onClick={() => setActiveTab('prashna')}
          className="bg-white rounded-2xl border border-stone-200 p-4 text-left hover:border-amber-400 hover:shadow-md transition-all flex items-start gap-3.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <FileQuestion className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-amber-950 text-base group-hover:text-amber-700 transition-colors">प्रश्न कुंडली</h3>
            <p className="text-xs text-stone-500 mt-0.5">तत्कालिक प्रश्न और उत्तर</p>
          </div>
        </button>

        {/* 7. कुंडली मिलान */}
        <button
          type="button"
          onClick={() => setActiveTab('milan')}
          className="bg-white rounded-2xl border border-stone-200 p-4 text-left hover:border-amber-400 hover:shadow-md transition-all flex items-start gap-3.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-amber-950 text-base group-hover:text-amber-700 transition-colors">कुंडली मिलान</h3>
            <p className="text-xs text-stone-500 mt-0.5">36 गुण मिलान, अष्ट कूट</p>
          </div>
        </button>

        {/* 8. दोष निवारण */}
        <button
          type="button"
          onClick={() => setActiveTab('dosh')}
          className="bg-white rounded-2xl border border-stone-200 p-4 text-left hover:border-amber-400 hover:shadow-md transition-all flex items-start gap-3.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-amber-950 text-base group-hover:text-amber-700 transition-colors">दोष निवारण</h3>
            <p className="text-xs text-stone-500 mt-0.5">कालसर्प, मांगलिक, पितृ दोष</p>
          </div>
        </button>

        {/* 9. रत्न फलादेश */}
        <button
          type="button"
          onClick={() => setActiveTab('gemstones')}
          className="bg-white rounded-2xl border border-stone-200 p-4 text-left hover:border-amber-400 hover:shadow-md transition-all flex items-start gap-3.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <Gem className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-amber-950 text-base group-hover:text-amber-700 transition-colors">रत्न फलादेश</h3>
            <p className="text-xs text-stone-500 mt-0.5">शुभ रत्न एवं धारण विधि</p>
          </div>
        </button>

        {/* 10. वैदिक उपाय */}
        <button
          type="button"
          onClick={() => setActiveTab('remedies')}
          className="bg-white rounded-2xl border border-stone-200 p-4 text-left hover:border-amber-400 hover:shadow-md transition-all flex items-start gap-3.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-amber-950 text-base group-hover:text-amber-700 transition-colors">वैदिक उपाय</h3>
            <p className="text-xs text-stone-500 mt-0.5">मंत्र, दान, हवन एवं पूजा</p>
          </div>
        </button>

        {/* 11. वास्तु शास्त्र */}
        <button
          type="button"
          onClick={() => setActiveTab('vastu')}
          className="bg-white rounded-2xl border border-stone-200 p-4 text-left hover:border-amber-400 hover:shadow-md transition-all flex items-start gap-3.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-amber-950 text-base group-hover:text-amber-700 transition-colors">वास्तु शास्त्र</h3>
            <p className="text-xs text-stone-500 mt-0.5">दिशा एवं ऊर्जा संतुलन</p>
          </div>
        </button>

        {/* 12. आध्यात्मिक चेतना */}
        <button
          type="button"
          onClick={() => setActiveTab('esoteric')}
          className="bg-white rounded-2xl border border-stone-200 p-4 text-left hover:border-amber-400 hover:shadow-md transition-all flex items-start gap-3.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <Sun className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-amber-950 text-base group-hover:text-amber-700 transition-colors">आध्यात्मिक चेतना</h3>
            <p className="text-xs text-stone-500 mt-0.5">1D से 12D चेतना आयाम</p>
          </div>
        </button>

        {/* 13. AI ज्योतिषी चैट */}
        <button
          type="button"
          onClick={() => setActiveTab('chat')}
          className="bg-white rounded-2xl border border-stone-200 p-4 text-left hover:border-amber-400 hover:shadow-md transition-all flex items-start gap-3.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-amber-950 text-base group-hover:text-amber-700 transition-colors">AI ज्योतिषी चैट</h3>
            <p className="text-xs text-stone-500 mt-0.5">लाइव ज्योतिषीय प्रश्न पूछें</p>
          </div>
        </button>

        {/* 14. ज्योतिष शिमला पोर्टल */}
        <button
          type="button"
          onClick={() => setActiveTab('portal')}
          className="bg-white rounded-2xl border border-stone-200 p-4 text-left hover:border-amber-400 hover:shadow-md transition-all flex items-start gap-3.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-amber-950 text-base group-hover:text-amber-700 transition-colors">ज्योतिष शिमला पोर्टल</h3>
            <p className="text-xs text-stone-500 mt-0.5">आधिकारिक सेवाएं एवं मार्गदर्शन</p>
          </div>
        </button>

      </div>

    </div>
  );
};
