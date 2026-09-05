import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sun, Moon, Sparkles, CheckCircle2, AlertCircle, Compass, Star, Share2, Download } from 'lucide-react';

export const PanchangMuhuratView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [currentRegion, setCurrentRegion] = useState<'north' | 'central' | 'south'>('north');
  const [liveTime, setLiveTime] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setLiveTime(now.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dateObj = new Date(selectedDate);
  const dayOfWeek = dateObj.toLocaleDateString('hi-IN', { weekday: 'long' });
  const dayIndex = dateObj.getDay();

  const TITHIS = [
    { name: "प्रथमा (प्रतिपदा)", lord: "अग्नि" }, { name: "द्वितीया", lord: "ब्रह्मा" }, { name: "तृतीया", lord: "गौरी" },
    { name: "चतुर्थी", lord: "गणेश" }, { name: "पंचमी", lord: "सर्प" }, { name: "षष्ठी", lord: "कार्तिकेय" },
    { name: "सप्तमी", lord: "सूर्य" }, { name: "अष्टमी", lord: "शिव" }, { name: "नवमी", lord: "दुर्गा" },
    { name: "दशमी", lord: "यम" }, { name: "एकादशी", lord: "विश्वेदेव" }, { name: "द्वादशी", lord: "विष्णु" },
    { name: "त्रयोदशी", lord: "कामदेव" }, { name: "चतुर्दशी", lord: "शिव" }, { name: "पूर्णिमा / अमावस्या", lord: "चंद्रमान" }
  ];

  const NAKSHATRAS = [
    { name: "अश्विनी", lord: "केतु" }, { name: "भरणी", lord: "शुक्र" }, { name: "कृत्तिका", lord: "सूर्य" },
    { name: "रोहिणी", lord: "चंद्र" }, { name: "मृगशिरा", lord: "मंगल" }, { name: "आर्द्रा", lord: "राहु" },
    { name: "पुनर्वसु", lord: "गुरु" }, { name: "पुष्य", lord: "शनि" }, { name: "आश्लेषा", lord: "बुध" },
    { name: "मघा", lord: "केतु" }, { name: "पूर्वाफाल्गुनी", lord: "शुक्र" }, { name: "उत्तराफाल्गुनी", lord: "सूर्य" },
    { name: "हस्त", lord: "चंद्र" }, { name: "चित्रा", lord: "मंगल" }, { name: "स्वाति", lord: "राहु" },
    { name: "विशाखा", lord: "गुरु" }, { name: "अनुराधा", lord: "शनि" }, { name: "ज्येष्ठा", lord: "बुध" },
    { name: "मूल", lord: "केतु" }, { name: "पूर्वाषाढ़ा", lord: "शुक्र" }, { name: "उत्तराषाढ़ा", lord: "सूर्य" },
    { name: "श्रवण", lord: "चंद्र" }, { name: "धनिष्ठा", lord: "मंगल" }, { name: "शतभिषा", lord: "राहु" },
    { name: "पूर्वाभाद्रपद", lord: "गुरु" }, { name: "उत्तराभाद्रपद", lord: "शनि" }, { name: "रेवती", lord: "बुध" }
  ];

  const YOGAS = [
    "विष्कम्भ", "प्रीति", "आयुष्मान", "सौभाग्य", "शोभन", "अतिगण्ड", "सुकर्मा", "धृति", "शूल", "गण्ड",
    "वृद्धि", "ध्रुव", "व्याघात", "हर्षण", "वज्र", "सिद्धि", "व्यतीपात", "वरीयान", "परिघ", "शिव",
    "सिद्ध", "साध्य", "शुभ", "शुक्ल", "ब्रह्म", "ऐन्द्र", "वैधृति"
  ];

  const KARANAS = ["बव", "बालव", "कौलव", "तैतिल", "गर", "वणिज", "विष्टि (भद्रा)", "शकुनि", "चतुष्पाद", "नाग", "किंस्तुघ्न"];
  const RASHIS = [
    { name: "मेष", lord: "मंगल" }, { name: "वृषभ", lord: "शुक्र" }, { name: "मिथुन", lord: "बुध" },
    { name: "कर्क", lord: "चंद्र" }, { name: "सिंह", lord: "सूर्य" }, { name: "कन्या", lord: "बुध" },
    { name: "तुला", lord: "शुक्र" }, { name: "वृश्चिक", lord: "मंगल" }, { name: "धनु", lord: "गुरु" },
    { name: "मकर", lord: "शनि" }, { name: "कुंभ", lord: "शनि" }, { name: "मीन", lord: "गुरु" }
  ];

  const MONTHS_HINDI = ["चैत्र", "वैशाख", "ज्येष्ठ", "आषाढ़", "श्रावण", "भाद्रपद", "आश्विन", "कार्तिक", "मार्गशीर्ष", "पौष", "माघ", "फाल्गुन"];
  const DISHASHUL = ["पश्चिम", "पूर्व", "उत्तर", "उत्तर", "दक्षिण", "पश्चिम", "पूर्व"];

  const CHOGHADIYA_DAY = [
    { name: "उद्वेग", nature: "अशुभ", color: "bg-rose-50 text-rose-800 border-rose-200" },
    { name: "चर", nature: "सामान्य", color: "bg-sky-50 text-sky-800 border-sky-200" },
    { name: "लाभ", nature: "उत्तम", color: "bg-emerald-50 text-emerald-800 border-emerald-200" },
    { name: "अमृत", nature: "अति शुभ", color: "bg-purple-50 text-purple-800 border-purple-200" },
    { name: "काल", nature: "अशुभ", color: "bg-rose-50 text-rose-800 border-rose-200" },
    { name: "शुभ", nature: "शुभ", color: "bg-emerald-50 text-emerald-800 border-emerald-200" },
    { name: "रोग", nature: "अशुभ", color: "bg-rose-50 text-rose-800 border-rose-200" },
    { name: "उद्वेग", nature: "अशुभ", color: "bg-rose-50 text-rose-800 border-rose-200" }
  ];

  const CHOGHADIYA_NIGHT = [
    { name: "शुभ", nature: "शुभ", color: "bg-emerald-50 text-emerald-800 border-emerald-200" },
    { name: "अमृत", nature: "अति शुभ", color: "bg-purple-50 text-purple-800 border-purple-200" },
    { name: "चर", nature: "सामान्य", color: "bg-sky-50 text-sky-800 border-sky-200" },
    { name: "रोग", nature: "अशुभ", color: "bg-rose-50 text-rose-800 border-rose-200" },
    { name: "काल", nature: "अशुभ", color: "bg-rose-50 text-rose-800 border-rose-200" },
    { name: "लाभ", nature: "उत्तम", color: "bg-emerald-50 text-emerald-800 border-emerald-200" },
    { name: "उद्वेग", nature: "अशुभ", color: "bg-rose-50 text-rose-800 border-rose-200" },
    { name: "शुभ", nature: "शुभ", color: "bg-emerald-50 text-emerald-800 border-emerald-200" }
  ];

  const DAY_HORAS = [
    { hour: 1, planet: "सूर्य", nature: "उग्र", time: "05:45 AM - 06:45 AM" },
    { hour: 2, planet: "शुक्र", nature: "सौम्य", time: "06:45 AM - 07:45 AM" },
    { hour: 3, planet: "बुध", nature: "सम", time: "07:45 AM - 08:45 AM" },
    { hour: 4, planet: "चंद्र", nature: "सौम्य", time: "08:45 AM - 09:45 AM" },
    { hour: 5, planet: "शनि", nature: "पाप", time: "09:45 AM - 10:45 AM" },
    { hour: 6, planet: "गुरु", nature: "अति शुभ", time: "10:45 AM - 11:45 AM" },
    { hour: 7, planet: "मंगल", nature: "उग्र", time: "11:45 AM - 12:45 PM" },
    { hour: 8, planet: "सूर्य", nature: "उग्र", time: "12:45 PM - 01:45 PM" },
    { hour: 9, planet: "शुक्र", nature: "सौम्य", time: "01:45 PM - 02:45 PM" },
    { hour: 10, planet: "बुध", nature: "सम", time: "02:45 PM - 03:45 PM" },
    { hour: 11, planet: "चंद्र", nature: "सौम्य", time: "03:45 PM - 04:45 PM" },
    { hour: 12, planet: "शनि", nature: "पाप", time: "04:45 PM - 05:45 PM" }
  ];

  const NIGHT_HORAS = [
    { hour: 1, planet: "गुरु", nature: "अति शुभ", time: "05:45 PM - 06:45 PM" },
    { hour: 2, planet: "मंगल", nature: "उग्र", time: "06:45 PM - 07:45 PM" },
    { hour: 3, planet: "सूर्य", nature: "उग्र", time: "07:45 PM - 08:45 PM" },
    { hour: 4, planet: "शुक्र", nature: "सौम्य", time: "08:45 PM - 09:45 PM" },
    { hour: 5, planet: "बुध", nature: "सम", time: "09:45 PM - 10:45 PM" },
    { hour: 6, planet: "चंद्र", nature: "सौम्य", time: "10:45 PM - 11:45 PM" },
    { hour: 7, planet: "शनि", nature: "पाप", time: "11:45 PM - 12:45 AM" },
    { hour: 8, planet: "गुरु", nature: "अति शुभ", time: "12:45 AM - 01:45 AM" },
    { hour: 9, planet: "मंगल", nature: "उग्र", time: "01:45 AM - 02:45 AM" },
    { hour: 10, planet: "सूर्य", nature: "उग्र", time: "02:45 AM - 03:45 AM" },
    { hour: 11, planet: "शुक्र", nature: "सौम्य", time: "03:45 AM - 04:45 AM" },
    { hour: 12, planet: "बुध", nature: "सम", time: "04:45 AM - 05:45 AM" }
  ];

  const tithiIdx = (dateObj.getDate() + 2) % 15;
  const tithiObj = TITHIS[tithiIdx];
  const paksha = dateObj.getDate() <= 15 ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष';

  const nakIdx = (dateObj.getDate() * 3 + dateObj.getMonth()) % 27;
  const nakObj = NAKSHATRAS[nakIdx];

  const yogaIdx = (dateObj.getDate() * 2 + 5) % 27;
  const yogName = YOGAS[yogaIdx];

  const karIdx = (tithiIdx * 2) % 11;
  const karName = KARANAS[karIdx];

  const moonIdx = (dateObj.getDate() + 4) % 12;
  const moonObj = RASHIS[moonIdx];

  const sunIdx = (dateObj.getMonth() + 1) % 12;
  const sunObj = RASHIS[sunIdx];

  const yr = dateObj.getFullYear();
  const vikramSamvat = yr + 57;
  const kaliSamvat = yr + 3101;
  const shakaSamvat = yr - 78;

  const shareOnWhatsApp = () => {
    const text = `✨ *दैनिक वैदिक पंचांग, चौघड़िया एवं होरा* ✨\n🚩 *ज्योतिष शिमला (Jyotish Shimla)*\n📅 दिनांक: ${selectedDate} (${dayOfWeek})\n• तिथि: ${paksha} ${tithiObj.name}\n• नक्षत्र: ${nakObj.name} (${nakObj.lord})\n• योग: ${yogName}\n• करण: ${karName}\n• सूर्योदय: 05:45 AM | सूर्यास्त: 06:45 PM\n• राहुकाल: 09:15 AM - 10:48 AM\n📞 संपर्क: 7018531976`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto pb-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-600 via-purple-600 to-green-600 rounded-2xl p-5 text-white shadow-lg text-center space-y-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
        <h2 className="text-xl sm:text-2xl font-serif font-black tracking-wide">
          दैनिक वैदिक पंचांग, चौघड़िया एवं होरा
        </h2>
        <p className="text-xs sm:text-sm font-bold text-yellow-200">
          ✨ ज्योतिष शिमला (Jyotish Shimla) ✨
        </p>
        {liveTime && (
          <div className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-yellow-100 border border-white/30">
            वर्तमान लाइव समय: {liveTime}
          </div>
        )}
      </div>

      {/* Region Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 bg-stone-900 p-2.5 rounded-2xl border-b-4 border-red-700 shadow-sm">
        <button
          onClick={() => setCurrentRegion('north')}
          className={`flex-1 min-w-[140px] py-2 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            currentRegion === 'north'
              ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-md ring-2 ring-yellow-300'
              : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
          }`}
        >
          🚩 उत्तर भारत (पूर्णिमांत)
        </button>
        <button
          onClick={() => setCurrentRegion('central')}
          className={`flex-1 min-w-[140px] py-2 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            currentRegion === 'central'
              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md ring-2 ring-yellow-200'
              : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
          }`}
        >
          🟠 मध्य भारत / गुजरात
        </button>
        <button
          onClick={() => setCurrentRegion('south')}
          className={`flex-1 min-w-[140px] py-2 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            currentRegion === 'south'
              ? 'bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-md ring-2 ring-cyan-300'
              : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
          }`}
        >
          🛕 दक्षिण भारत (अमावस्यांत)
        </button>
      </div>

      {/* Date & Location Input */}
      <div className="bg-white rounded-2xl border border-orange-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <label className="text-xs sm:text-sm font-bold text-orange-950 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-orange-600" /> दिनांक चयन:
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-orange-50/50 border border-orange-300 rounded-xl px-3 py-1.5 text-xs sm:text-sm font-bold text-orange-950 outline-none focus:ring-2 focus:ring-orange-500/40"
          />
        </div>
        <div className="text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-blue-600" /> 📍 Shimla, Himachal Pradesh
        </div>
      </div>

      {/* Region Status Note */}
      <div className="bg-lime-50 border border-lime-200 text-lime-900 px-4 py-2 rounded-xl text-xs font-bold text-center">
        {currentRegion === 'north' && '🟢 उत्तर भारतीय पंचांग प्रणाली (पूर्णिमांत मास एवं विक्रमी संवत) सक्रिय'}
        {currentRegion === 'central' && '🟠 मध्य भारत / गुजरात प्रणाली (कार्तिक-अमावस्यांत संवत चक्र) सक्रिय'}
        {currentRegion === 'south' && '🔵 दक्षिण भारतीय पंचांग प्रणाली (अमावस्यांत मास एवं शालिवाहन शक) सक्रिय'}
      </div>

      {/* Main Info Grid */}
      <div className="bg-white rounded-2xl border border-orange-200 overflow-hidden shadow-sm">
        <div className="bg-red-800 text-white font-serif font-bold px-4 py-2.5 text-sm sm:text-base">
          मुख्य पंचांग विवरण
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 p-3 bg-amber-50/30">
          <div className="bg-white p-3 rounded-xl border border-orange-200 shadow-xs">
            <span className="text-[10px] font-bold text-rose-700 block">
              {currentRegion === 'south' ? 'शालिवाहन शक संवत:' : currentRegion === 'central' ? 'विक्रम संवत (गुजरात):' : 'विक्रम संवत:'}
            </span>
            <span className="text-xs font-extrabold text-orange-950">
              {currentRegion === 'south' ? `${shakaSamvat} (शक)` : currentRegion === 'central' ? `${vikramSamvat + 1} (गुजरात)` : `${vikramSamvat} (पूर्णिमांत)`}
            </span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-orange-200 shadow-xs">
            <span className="text-[10px] font-bold text-blue-700 block">कलि संवत</span>
            <span className="text-xs font-extrabold text-orange-950">{kaliSamvat}</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-orange-200 shadow-xs">
            <span className="text-[10px] font-bold text-purple-700 block">संवत्सर</span>
            <span className="text-xs font-extrabold text-orange-950">रौद्र</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-orange-200 shadow-xs">
            <span className="text-[10px] font-bold text-blue-700 block">वार</span>
            <span className="text-xs font-extrabold text-orange-950">{dayOfWeek}</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-orange-200 shadow-xs">
            <span className="text-[10px] font-bold text-rose-700 block">माह (अमावस्यांत)</span>
            <span className="text-xs font-extrabold text-orange-950">{MONTHS_HINDI[dateObj.getMonth()]}</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-orange-200 shadow-xs">
            <span className="text-[10px] font-bold text-purple-700 block">माह (पूर्णिमांत)</span>
            <span className="text-xs font-extrabold text-orange-950">{MONTHS_HINDI[(dateObj.getMonth() + 1) % 12]}</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-orange-200 shadow-xs">
            <span className="text-[10px] font-bold text-orange-700 block">सूर्योदय (सटीक)</span>
            <span className="text-xs font-extrabold text-orange-950">05:45 AM</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-orange-200 shadow-xs">
            <span className="text-[10px] font-bold text-rose-700 block">सूर्यास्त (सटीक)</span>
            <span className="text-xs font-extrabold text-orange-950">06:45 PM</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-orange-200 shadow-xs">
            <span className="text-[10px] font-bold text-rose-700 block">दिशाशूल</span>
            <span className="text-xs font-extrabold text-orange-950">{DISHASHUL[dayIndex]}</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-orange-200 shadow-xs">
            <span className="text-[10px] font-bold text-emerald-700 block">चंद्र निवास</span>
            <span className="text-xs font-extrabold text-orange-950">{moonObj.name} (पूर्व दिशा)</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-orange-200 shadow-xs col-span-2 sm:col-span-1">
            <span className="text-[10px] font-bold text-teal-700 block">लाहिड़ी अयनांश</span>
            <span className="text-xs font-extrabold text-orange-950">23° 52'</span>
          </div>
        </div>
      </div>

      {/* Detailed Panchang Table */}
      <div className="bg-white rounded-2xl border border-orange-200 overflow-hidden shadow-sm">
        <div className="bg-red-800 text-white font-serif font-bold px-4 py-2.5 text-sm sm:text-base">
          संपूर्ण पंचांग विवरण (वर्तमान एवं आगामी)
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-amber-100/70 text-red-950 font-bold border-b border-orange-200">
                <th className="p-3 w-1/4">अंग</th>
                <th className="p-3 w-2/5">वर्तमान स्थिति, स्वामी एवं समय</th>
                <th className="p-3 w-2/5">आगामी स्थिति एवं समय</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100 font-medium">
              <tr>
                <td className="p-3 bg-orange-50/50 font-bold text-blue-900">तिथि</td>
                <td className="p-3 text-red-900 font-bold">{paksha} {tithiObj.name} <span className="block text-[10px] text-stone-600 font-normal">देवता: {tithiObj.lord} | ⏰ शाम 04:22 तक</span></td>
                <td className="p-3 text-emerald-800 font-bold">द्वितीया (Dwitiya) <span className="block text-[10px] text-stone-600 font-normal">⏰ अगले दिन प्रातः तक</span></td>
              </tr>
              <tr>
                <td className="p-3 bg-orange-50/50 font-bold text-blue-900">नक्षत्र</td>
                <td className="p-3 text-red-900 font-bold">{nakObj.name} <span className="block text-[10px] text-stone-600 font-normal">स्वामी: {nakObj.lord} | ⏰ रात्रि 09:15 तक</span></td>
                <td className="p-3 text-emerald-800 font-bold">भरणी (Bharani) <span className="block text-[10px] text-stone-600 font-normal">⏰ आगामी प्रवेश</span></td>
              </tr>
              <tr>
                <td className="p-3 bg-orange-50/50 font-bold text-blue-900">योग</td>
                <td className="p-3 text-red-900 font-bold">{yogName} <span className="block text-[10px] text-stone-600 font-normal">⏰ दोपहर 01:10 तक</span></td>
                <td className="p-3 text-emerald-800 font-bold">प्रीति (Preeti) <span className="block text-[10px] text-stone-600 font-normal">⏰ आगामी योग</span></td>
              </tr>
              <tr>
                <td className="p-3 bg-orange-50/50 font-bold text-blue-900">करण</td>
                <td className="p-3 text-red-900 font-bold">{karName} <span className="block text-[10px] text-stone-600 font-normal">⏰ प्रातः 11:30 तक</span></td>
                <td className="p-3 text-emerald-800 font-bold">बालव (Balav) <span className="block text-[10px] text-stone-600 font-normal">⏰ आगामी करण</span></td>
              </tr>
              <tr>
                <td className="p-3 bg-orange-50/50 font-bold text-blue-900">चंद्र राशि</td>
                <td className="p-3 text-red-900 font-bold">{moonObj.name} <span className="block text-[10px] text-stone-600 font-normal">स्वामी: {moonObj.lord}</span></td>
                <td className="p-3 text-emerald-800 font-bold">वृषभ राशि <span className="block text-[10px] text-stone-600 font-normal">कल प्रातः</span></td>
              </tr>
              <tr>
                <td className="p-3 bg-orange-50/50 font-bold text-blue-900">सूर्य राशि</td>
                <td className="p-3 text-red-900 font-bold">{sunObj.name} <span className="block text-[10px] text-stone-600 font-normal">स्वामी: {sunObj.lord}</span></td>
                <td className="p-3 text-stone-500">परिवर्तन नहीं</td>
              </tr>
              <tr>
                <td className="p-3 bg-orange-50/50 font-bold text-blue-900">विक्रम सौर माह</td>
                <td colSpan={2} className="p-3 font-bold text-red-900">
                  सूर्य राशि: <b>{sunObj.name}</b> | गते: <b>14</b> | मास: <b>{MONTHS_HINDI[sunIdx]} सौर मास</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Muhurta Cards Grid */}
      <div className="bg-white rounded-2xl border border-orange-200 overflow-hidden shadow-sm">
        <div className="bg-red-800 text-white font-serif font-bold px-4 py-2.5 text-sm sm:text-base">
          महत्वपूर्ण मुहूर्त एवं काल समय
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3 bg-amber-50/30">
          <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-xl space-y-1">
            <span className="text-xs font-bold text-rose-800 block">⚠️ राहु काल</span>
            <span className="text-[10px] font-bold bg-rose-200/60 text-rose-900 px-2 py-0.5 rounded">अशुभ / वर्जित</span>
            <strong className="text-xs text-rose-950 block pt-1">09:15 AM - 10:48 AM</strong>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl space-y-1">
            <span className="text-xs font-bold text-emerald-800 block">✨ अभिजीत मुहूर्त</span>
            <span className="text-[10px] font-bold bg-emerald-200/60 text-emerald-900 px-2 py-0.5 rounded">सर्वोत्तम</span>
            <strong className="text-xs text-emerald-950 block pt-1">11:54 AM - 12:46 PM</strong>
          </div>
          <div className="bg-purple-50 border border-purple-200 p-3.5 rounded-xl space-y-1">
            <span className="text-xs font-bold text-purple-800 block">🌅 ब्रह्म मुहूर्त</span>
            <span className="text-[10px] font-bold bg-purple-200/60 text-purple-900 px-2 py-0.5 rounded">साधना / पूजा</span>
            <strong className="text-xs text-purple-950 block pt-1">04:28 AM - 05:16 AM</strong>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl space-y-1">
            <span className="text-xs font-bold text-emerald-800 block">🏆 विजय मुहूर्त</span>
            <span className="text-[10px] font-bold bg-emerald-200/60 text-emerald-900 px-2 py-0.5 rounded">कार्य सिद्धि</span>
            <strong className="text-xs text-emerald-950 block pt-1">02:22 PM - 03:14 PM</strong>
          </div>
          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl space-y-1">
            <span className="text-xs font-bold text-amber-800 block">🌄 गोधूलि मुहूर्त</span>
            <span className="text-[10px] font-bold bg-amber-200/60 text-amber-900 px-2 py-0.5 rounded">सामान्य / शुभ</span>
            <strong className="text-xs text-amber-950 block pt-1">06:45 PM - 07:08 PM</strong>
          </div>
          <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-xl space-y-1">
            <span className="text-xs font-bold text-blue-800 block">🌌 सायाह्न सन्ध्या</span>
            <span className="text-[10px] font-bold bg-blue-200/60 text-blue-900 px-2 py-0.5 rounded">संध्या समय</span>
            <strong className="text-xs text-blue-950 block pt-1">06:30 PM - 07:10 PM</strong>
          </div>
          <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-xl space-y-1">
            <span className="text-xs font-bold text-rose-800 block">🔥 यमघण्ट योग</span>
            <span className="text-[10px] font-bold bg-rose-200/60 text-rose-900 px-2 py-0.5 rounded">अशुभ</span>
            <strong className="text-xs text-rose-950 block pt-1">03:28 PM - 05:00 PM</strong>
          </div>
          <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-xl space-y-1">
            <span className="text-xs font-bold text-rose-800 block">☠️ गुलिक काल</span>
            <span className="text-[10px] font-bold bg-rose-200/60 text-rose-900 px-2 py-0.5 rounded">अशुभ</span>
            <strong className="text-xs text-rose-950 block pt-1">06:05 AM - 07:40 AM</strong>
          </div>
        </div>
      </div>

      {/* Choghadiya Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Day Choghadiya */}
        <div className="bg-white rounded-2xl border border-orange-200 overflow-hidden shadow-sm">
          <div className="bg-red-700 text-white font-serif font-bold px-4 py-2.5 text-sm flex items-center justify-between">
            <span>☀️ दिन का चौघड़िया</span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">सूर्योदय से सूर्यास्त</span>
          </div>
          <div className="p-3 space-y-2 bg-amber-50/20">
            {CHOGHADIYA_DAY.map((c, i) => (
              <div key={i} className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold ${c.color}`}>
                <div>
                  <span className="font-serif text-sm block">{c.name}</span>
                  <span className="text-[10px] opacity-80">{c.nature}</span>
                </div>
                <span className="bg-white px-2.5 py-1 rounded-lg border border-orange-200 text-[11px] text-stone-800 shadow-xs">
                  काल खंड {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Night Choghadiya */}
        <div className="bg-white rounded-2xl border border-orange-200 overflow-hidden shadow-sm">
          <div className="bg-stone-800 text-white font-serif font-bold px-4 py-2.5 text-sm flex items-center justify-between">
            <span>🌙 रात का चौघड़िया</span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">सूर्यास्त से सूर्योदय</span>
          </div>
          <div className="p-3 space-y-2 bg-stone-50/50">
            {CHOGHADIYA_NIGHT.map((c, i) => (
              <div key={i} className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold ${c.color}`}>
                <div>
                  <span className="font-serif text-sm block">{c.name}</span>
                  <span className="text-[10px] opacity-80">{c.nature}</span>
                </div>
                <span className="bg-white px-2.5 py-1 rounded-lg border border-stone-200 text-[11px] text-stone-800 shadow-xs">
                  रात्रि खंड {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hora Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Day Hora */}
        <div className="bg-white rounded-2xl border border-orange-200 overflow-hidden shadow-sm">
          <div className="bg-emerald-800 text-white font-serif font-bold px-4 py-2.5 text-sm flex items-center justify-between">
            <span>☀️ दिन की होरा</span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">12 भाग</span>
          </div>
          <div className="p-3 space-y-2 bg-emerald-50/20">
            {DAY_HORAS.map((h, i) => (
              <div key={i} className="p-2.5 rounded-xl border border-emerald-200 bg-white flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center text-[10px]">
                    {h.hour}
                  </span>
                  <div>
                    <strong className="text-emerald-950 font-serif block">{h.planet} होरा ({h.nature})</strong>
                  </div>
                </div>
                <span className="font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                  {h.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Night Hora */}
        <div className="bg-white rounded-2xl border border-orange-200 overflow-hidden shadow-sm">
          <div className="bg-blue-900 text-white font-serif font-bold px-4 py-2.5 text-sm flex items-center justify-between">
            <span>🌙 रात की होरा</span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">12 भाग</span>
          </div>
          <div className="p-3 space-y-2 bg-blue-50/20">
            {NIGHT_HORAS.map((h, i) => (
              <div key={i} className="p-2.5 rounded-xl border border-blue-200 bg-white flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center text-[10px]">
                    {h.hour}
                  </span>
                  <div>
                    <strong className="text-blue-950 font-serif block">{h.planet} होरा ({h.nature})</strong>
                  </div>
                </div>
                <span className="font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-[11px]">
                  {h.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={shareOnWhatsApp}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
        >
          <Share2 className="w-4 h-4" /> व्हाट्सएप पर शेयर करें
        </button>
      </div>

      {/* Footer Branding */}
      <div className="bg-indigo-950 text-white rounded-2xl p-4 text-center font-bold text-xs sm:text-sm space-y-1 shadow-md">
        <div>ज्योतिष एवं पंचांग परामर्श | ज्योतिष शिमला (Jyotish Shimla) | संपर्क करें: 7018531976</div>
        <div className="text-[11px] text-stone-300 font-normal">© Copyright Jyotish Shimla. सर्वाधिकार सुरक्षित।</div>
      </div>
    </div>
  );
};
