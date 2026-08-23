import React, { useState } from 'react';
import { Calendar, Clock, Sun, Moon, Sparkles, CheckCircle2, AlertCircle, Compass, Star } from 'lucide-react';

const TITHIS = [
  'प्रतिपदा (Pratipada)', 'द्वितीया (Dwitiya)', 'तृतीया (Tritiya)', 'चतुर्थी (Chaturthi)', 'पंचमी (Panchami)',
  'षष्ठी (Shashthi)', 'सप्तमी (Saptami)', 'अष्टमी (Ashtami)', 'नवमी (Navami)', 'दशमी (Dashami)',
  'एकादशी (Ekadashi)', 'द्वादशी (Dwadashi)', 'त्रयोदशी (Trayodashi)', 'चतुर्दशी (Chaturdashi)', 'पूर्णिमा / अमावस्या (Purnima / Amavasya)'
];

const NAKSHATRAS = [
  'अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशिरा', 'आर्द्रा', 'पुनर्वसु', 'पुष्य', 'आश्लेषा',
  'मघा', 'पूर्वाफाल्गुनी', 'उत्तराफाल्गुनी', 'हस्त', 'चित्रा', 'स्वाती', 'विशाखा', 'अनुराधा',
  'ज्येष्ठा', 'मूल', 'पूर्वाषाढ़ा', 'उत्तराषाढ़ा', 'श्रवण', 'धनिष्ठा', 'शतभिषा', 'पूर्वाभाद्रपद', 'उत्तराभाद्रपद', 'रेवती'
];

const YOGAS = [
  'विष्कुम्भ', 'प्रीति', 'आयुष्मान्', 'सौभाग्य', 'शोभन', 'अतिगण्ड', 'सुकर्मा', 'धृति', 'शूल',
  'गण्ड', 'वृद्धि', 'ध्रुव', 'व्याघात', 'हर्षण', 'वज्र', 'सिद्धि', 'व्यतीपात', 'वरीयान्',
  'परिघ', 'शिव', 'सिद्ध', 'साध्य', 'शुभ', 'शुक्ल', 'ब्रह्म', 'इन्द्र', 'वैधृति'
];

const KARANAS = ['बव', 'बालव', 'कौलव', 'तैतिल', 'गर', 'वणिज', 'विष्टि (भद्रा)', 'शकुनि', 'चतुष्पाद', 'नाग', 'किंस्तुघ्न'];

const CHOGHADIYA_DAY = [
  { name: 'उद्वेग (Udveg)', nature: 'अशुभ (Inauspicious)', planet: 'सूर्य', color: 'text-rose-600 bg-rose-50' },
  { name: 'चर (Char)', nature: 'शुभ (Auspicious)', planet: 'शुक्र', color: 'text-emerald-700 bg-emerald-50' },
  { name: 'लाभ (Labh)', nature: 'उन्नतिप्रद (Very Good)', planet: 'बुध', color: 'text-emerald-700 bg-emerald-50' },
  { name: 'अमृत (Amrit)', nature: 'सर्वश्रेष्ठ (Best)', planet: 'चंद्र', color: 'text-orange-700 bg-orange-50 font-bold' },
  { name: 'काल (Kaal)', nature: 'अशुभ (Harmful)', planet: 'शनि', color: 'text-rose-600 bg-rose-50' },
  { name: 'शुभ (Shubh)', nature: 'उत्तम (Good)', planet: 'गुरु', color: 'text-emerald-700 bg-emerald-50' },
  { name: 'रोग (Rog)', nature: 'अशुभ (Bad)', planet: 'मंगल', color: 'text-rose-600 bg-rose-50' },
  { name: 'उद्वेग (Udveg)', nature: 'अशुभ (Inauspicious)', planet: 'सूर्य', color: 'text-rose-600 bg-rose-50' },
];

export const PanchangMuhuratView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const dateObj = new Date(selectedDate);
  const dayOfWeek = dateObj.toLocaleDateString('hi-IN', { weekday: 'long' });
  const dayIndex = dateObj.getDay();

  // Pseudo-astronomical calculations for display
  const tithiIdx = (dateObj.getDate() + 2) % 15;
  const nakshatraIdx = (dateObj.getDate() * 3 + dateObj.getMonth()) % 27;
  const yogaIdx = (dateObj.getDate() * 2 + 5) % 27;
  const karanaIdx = (tithiIdx * 2) % 11;

  const paksha = dateObj.getDate() <= 15 ? 'शुक्ल पक्ष (Shukla Paksha)' : 'कृष्ण पक्ष (Krishna Paksha)';
  const vikramSamvat = 2081;
  const shakaSamvat = 1946;

  return (
    <div className="space-y-4">
      {/* Top Header & 5 Angas */}
      <div className="bg-white rounded-2xl border-2 border-orange-200 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-orange-100">
          <div>
            <h2 className="text-lg sm:text-xl font-serif font-extrabold text-orange-950 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" /> वैदिक दैनिक पंचांग, चौघड़िया एवं काल मुहूर्त
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              तिथि, वार, नक्षत्र, योग, करण, राहुकाल, अभिजीत मुहूर्त एवं शुभ कार्य काल निर्णय (स्थान: शिमला)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-orange-950 whitespace-nowrap">तिथि चुनें:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-orange-50/55 border border-orange-300 rounded-xl px-3 py-1 text-xs font-bold text-orange-950 shadow-xs focus:ring-2 focus:ring-orange-500/40"
            />
          </div>
        </div>

        {/* 5 Angas of Panchang Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          <div className="bg-orange-50/50 p-3 rounded-xl border border-orange-200 space-y-0.5">
            <span className="text-[10px] font-bold text-orange-700 block">1. तिथि</span>
            <strong className="text-xs font-serif font-bold text-orange-950 block">
              {TITHIS[tithiIdx]}
            </strong>
            <span className="text-[10px] text-stone-500">{paksha}</span>
          </div>

          <div className="bg-orange-50/50 p-3 rounded-xl border border-orange-200 space-y-0.5">
            <span className="text-[10px] font-bold text-orange-700 block">2. वार</span>
            <strong className="text-xs font-serif font-bold text-orange-950 block">
              {dayOfWeek}
            </strong>
            <span className="text-[10px] text-stone-500">विक्रम संवत {vikramSamvat}</span>
          </div>

          <div className="bg-orange-50/50 p-3 rounded-xl border border-orange-200 space-y-0.5">
            <span className="text-[10px] font-bold text-orange-700 block">3. नक्षत्र</span>
            <strong className="text-xs font-serif font-bold text-orange-950 block">
              {NAKSHATRAS[nakshatraIdx]}
            </strong>
            <span className="text-[10px] text-stone-500">चरण 1, 2, 3</span>
          </div>

          <div className="bg-orange-50/50 p-3 rounded-xl border border-orange-200 space-y-0.5">
            <span className="text-[10px] font-bold text-orange-700 block">4. योग</span>
            <strong className="text-xs font-serif font-bold text-orange-950 block">
              {YOGAS[yogaIdx]}
            </strong>
            <span className="text-[10px] text-stone-500">शुभ योग प्रभाव</span>
          </div>

          <div className="bg-orange-50/50 p-3 rounded-xl border border-orange-200 space-y-0.5 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-bold text-orange-700 block">5. करण</span>
            <strong className="text-xs font-serif font-bold text-orange-950 block">
              {KARANAS[karanaIdx]}
            </strong>
            <span className="text-[10px] text-stone-500">सूर्योदय पर्यन्त</span>
          </div>
        </div>
      </div>

      {/* Auspicious & Inauspicious Times (Shubh & Ashubh Kaal) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Shubh Muhurats */}
        <div className="bg-white rounded-2xl border-2 border-emerald-200 p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 pb-2.5 border-b border-emerald-100">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-serif font-bold text-emerald-950">
                शुभ काल मुहूर्त
              </h3>
              <span className="text-[10px] text-emerald-700 font-medium">कार्य सिद्धि एवं नवीन शुभारंभ हेतु</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
              <div>
                <strong className="text-emerald-950 block">अभिजीत मुहूर्त</strong>
                <span className="text-stone-600 text-[10px]">सर्वकार्य सिद्धिदायक सर्वश्रेष्ठ मुहूर्त</span>
              </div>
              <span className="font-bold text-emerald-900 bg-white px-2.5 py-1 rounded-lg border border-emerald-300 text-[11px]">
                11:54 AM - 12:46 PM
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
              <div>
                <strong className="text-emerald-950 block">ब्रह्म मुहूर्त</strong>
                <span className="text-stone-600 text-[10px]">ध्यान, योग, साधना व मंत्र जप हेतु</span>
              </div>
              <span className="font-bold text-emerald-900 bg-white px-2.5 py-1 rounded-lg border border-emerald-300 text-[11px]">
                04:28 AM - 05:16 AM
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
              <div>
                <strong className="text-emerald-950 block">विजय मुहूर्त</strong>
                <span className="text-stone-600 text-[10px]">व्यापार व मुकदमे में विजय हेतु</span>
              </div>
              <span className="font-bold text-emerald-900 bg-white px-2.5 py-1 rounded-lg border border-emerald-300 text-[11px]">
                02:22 PM - 03:14 PM
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
              <div>
                <strong className="text-emerald-950 block">गोधूलि मुहूर्त</strong>
                <span className="text-stone-600 text-[10px]">संध्या दीपदान व गृह पूजन</span>
              </div>
              <span className="font-bold text-emerald-900 bg-white px-2.5 py-1 rounded-lg border border-emerald-300 text-[11px]">
                06:45 PM - 07:08 PM
              </span>
            </div>
          </div>
        </div>

        {/* Ashubh Kaal (Rahu Kaal, Yamaganda) */}
        <div className="bg-white rounded-2xl border-2 border-rose-200 p-4 sm:p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 pb-2.5 border-b border-rose-100">
            <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-serif font-bold text-rose-950">
                वर्जित / अशुभ काल
              </h3>
              <span className="text-[10px] text-rose-700 font-medium">इन समयों में नवीन व मांगलिक कार्य वर्जित हैं</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200 flex items-center justify-between">
              <div>
                <strong className="text-rose-950 block">राहुकाल</strong>
                <span className="text-stone-600 text-[10px]">नवीन कार्य, यात्रा व धन निवेश सर्वथा वर्जित</span>
              </div>
              <span className="font-bold text-rose-900 bg-white px-2.5 py-1 rounded-lg border border-rose-300 text-[11px]">
                09:15 AM - 10:48 AM
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200 flex items-center justify-between">
              <div>
                <strong className="text-rose-950 block">यमगण्ड</strong>
                <span className="text-stone-600 text-[10px]">अशुभ फलप्रद समय</span>
              </div>
              <span className="font-bold text-rose-900 bg-white px-2.5 py-1 rounded-lg border border-rose-300 text-[11px]">
                01:55 PM - 03:28 PM
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200 flex items-center justify-between">
              <div>
                <strong className="text-rose-950 block">गुलिक काल</strong>
                <span className="text-stone-600 text-[10px]">शनि पुत्र गुलिक का प्रभाव</span>
              </div>
              <span className="font-bold text-rose-900 bg-white px-2.5 py-1 rounded-lg border border-rose-300 text-[11px]">
                06:05 AM - 07:40 AM
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200 flex items-center justify-between">
              <div>
                <strong className="text-rose-950 block">दिशा शूल</strong>
                <span className="text-stone-600 text-[10px]">आज की यात्रा हेतु वर्जित दिशा</span>
              </div>
              <span className="font-bold text-rose-900 bg-white px-2.5 py-1 rounded-lg border border-rose-300 text-[11px]">
                पूर्व / उत्तर दिशा
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Day Choghadiya Table */}
      <div className="bg-white rounded-2xl border-2 border-orange-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-2.5 border-b border-orange-100">
          <div>
            <h3 className="text-sm font-serif font-bold text-orange-950">
              दिन का चौघड़िया
            </h3>
            <p className="text-[11px] text-stone-600 font-medium">
              शुभ, लाभ, अमृत चौघड़िया में किए गए कार्य चिरस्थायी एवं फलदायी होते हैं
            </p>
          </div>
          <span className="bg-orange-100 text-orange-900 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-orange-300">
            सूर्योदय से सूर्यास्त
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {CHOGHADIYA_DAY.map((c, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border ${c.color} flex flex-col justify-between space-y-0.5`}
            >
              <div className="flex items-center justify-between">
                <strong className="font-serif text-xs font-bold">{c.name}</strong>
                <span className="text-[10px] font-bold opacity-80">{c.nature}</span>
              </div>
              <div className="text-[10px] text-stone-600">
                स्वामी: <strong>{c.planet}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
