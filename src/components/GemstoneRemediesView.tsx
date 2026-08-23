import React, { useState } from 'react';
import { KundaliAnalysisResult, GemstoneRecommendation, PlanetName } from '../types';
import { Gem, ShieldCheck, AlertTriangle, Sparkles, CheckCircle2, Info, Moon, Sun } from 'lucide-react';

interface GemstoneRemediesViewProps {
  kundali: KundaliAnalysisResult;
}

export const GemstoneRemediesView: React.FC<GemstoneRemediesViewProps> = ({ kundali }) => {
  const { gemstones, lagnaRashi } = kundali;
  const [selectedGemIndex, setSelectedGemIndex] = useState(0);

  const ALL_GEMSTONES: {
    name: string;
    hindiName: string;
    planet: PlanetName;
    planetHindi: string;
    color: string;
    metal: string;
    finger: string;
    day: string;
    caution: string;
  }[] = [
    {
      name: 'Ruby (Manik)',
      hindiName: 'माणिक्य',
      planet: 'Surya',
      planetHindi: 'सूर्य देव',
      color: 'bg-rose-100 text-rose-800 border-rose-300',
      metal: 'स्वर्ण / तांबा',
      finger: 'अनामिका (Ring Finger)',
      day: 'रविवार प्रातः',
      caution: 'नीलम, गोमेद अथवा लहसुनिया के साथ कभी न पहनें।',
    },
    {
      name: 'Pearl (Moti)',
      hindiName: 'मोती',
      planet: 'Chandra',
      planetHindi: 'चन्द्र देव',
      color: 'bg-slate-100 text-slate-800 border-slate-300',
      metal: 'शुद्ध चांदी',
      finger: 'कनिष्ठिका (Little Finger)',
      day: 'सोमवार सायं',
      caution: 'गोमेद या नीलम के साथ वर्जित।',
    },
    {
      name: 'Red Coral (Moonga)',
      hindiName: 'मूंगा',
      planet: 'Mangal',
      planetHindi: 'मंगल देव',
      color: 'bg-orange-100 text-orange-800 border-orange-300',
      metal: 'तांबा / स्वर्ण',
      finger: 'अनामिका (Ring Finger)',
      day: 'मंगलवार प्रातः',
      caution: 'पन्ना या हीरा के साथ धारण न करें।',
    },
    {
      name: 'Emerald (Panna)',
      hindiName: 'पन्ना',
      planet: 'Budh',
      planetHindi: 'बुध देव',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      metal: 'स्वर्ण / कांसा / चांदी',
      finger: 'कनिष्ठिका (Little Finger)',
      day: 'बुधवार प्रातः',
      caution: 'मूंगा के साथ सामान्यतः वर्जित।',
    },
    {
      name: 'Yellow Sapphire (Pukhraj)',
      hindiName: 'पुखराज',
      planet: 'Guru',
      planetHindi: 'बृहस्पति देव',
      color: 'bg-amber-100 text-amber-900 border-amber-300',
      metal: 'पीला स्वर्ण / पीतल',
      finger: 'तर्जनी (Index Finger)',
      day: 'गुरुवार प्रातः',
      caution: 'हीरा या नीलम के साथ विशेषज्ञ परामर्श के बिना न पहनें।',
    },
    {
      name: 'Diamond / Opal (Heera)',
      hindiName: 'हीरा / ओपल',
      planet: 'Shukra',
      planetHindi: 'शुक्र देव',
      color: 'bg-cyan-100 text-cyan-900 border-cyan-300',
      metal: 'प्लैटिनम / चांदी / श्वेत स्वर्ण',
      finger: 'मध्यमा या कनिष्ठिका',
      day: 'शुक्रवार प्रातः',
      caution: 'माणिक्य या मूंगा के साथ वर्जित।',
    },
    {
      name: 'Blue Sapphire (Neelam)',
      hindiName: 'नीलम',
      planet: 'Shani',
      planetHindi: 'शनि देव',
      color: 'bg-blue-100 text-blue-900 border-blue-300',
      metal: 'पंचधातु / अष्टधातु / श्वेत स्वर्ण',
      finger: 'मध्यमा (Middle Finger)',
      day: 'शनिवार सायं',
      caution: 'धारण करने से पूर्व 3 दिन तक तकिये के नीचे रखकर परीक्षण अनिवार्य है।',
    },
    {
      name: 'Hessonite (Gomed)',
      hindiName: 'गोमेद',
      planet: 'Rahu',
      planetHindi: 'राहु देव',
      color: 'bg-stone-100 text-stone-900 border-stone-300',
      metal: 'चांदी / अष्टधातु',
      finger: 'मध्यमा (Middle Finger)',
      day: 'शनिवार रात्रि',
      caution: 'माणिक्य, मोती, मूंगा, पुखराज के साथ धारण न करें।',
    },
    {
      name: 'Cat’s Eye (Lehsuniya)',
      hindiName: 'लहसुनिया',
      planet: 'Ketu',
      planetHindi: 'केतु देव',
      color: 'bg-yellow-100 text-yellow-900 border-yellow-300',
      metal: 'चांदी / पंचधातु',
      finger: 'कनिष्ठिका या अनामिका',
      day: 'गुरुवार रात्रि',
      caution: 'माणिक्य या मोती के साथ वर्जित।',
    },
  ];

  const currentGem = gemstones[selectedGemIndex] || gemstones[0];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-orange-100 via-amber-50 to-white rounded-3xl border-2 border-orange-300 p-6 sm:p-7 shadow-lg shadow-orange-950/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-orange-200">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm mb-2">
              <Gem className="w-3.5 h-3.5 text-amber-200" /> रत्न एवं रुद्राक्ष शास्त्र
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-orange-950">
              जातक के लिए अनुशंसित रत्न एवं धारण विधि
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 mt-1">
              लग्न: <strong className="text-orange-900">{lagnaRashi.lagnaHindi}</strong> | लग्नेश: <strong className="text-orange-900">{lagnaRashi.lagnaLord}</strong> के अनुकूल भाग्यशाली रत्नों की प्रामाणिक सूची
            </p>
          </div>
        </div>

        {/* Recommended Gemstones Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-5">
          {gemstones.map((gem, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedGemIndex(idx)}
              className={`p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden ${
                selectedGemIndex === idx
                  ? 'bg-gradient-to-br from-orange-600 via-amber-600 to-orange-600 text-white border-orange-500 shadow-lg shadow-orange-600/25'
                  : 'bg-white border-orange-200 hover:bg-orange-50/70 text-stone-800'
              }`}
            >
              <span className={`text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded inline-block mb-1.5 ${
                selectedGemIndex === idx
                  ? 'bg-white/20 text-white border border-white/30'
                  : 'bg-orange-100 text-orange-800 border border-orange-200'
              }`}>
                {gem.purpose}
              </span>
              <h4 className={`text-base font-serif font-bold ${
                selectedGemIndex === idx ? 'text-white' : 'text-orange-950'
              }`}>
                {gem.gemstoneHindi}
              </h4>
              <p className={`text-xs mt-1 line-clamp-2 ${
                selectedGemIndex === idx ? 'text-orange-100' : 'text-stone-600'
              }`}>
                {gem.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Gemstone Detailed Wearing Ritual Card */}
      {currentGem && (
        <div className="bg-white rounded-2xl border-2 border-orange-200 p-6 sm:p-8 shadow-lg shadow-orange-950/5 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-orange-100">
            <div>
              <span className="text-xs font-bold text-orange-700 uppercase tracking-wider block">
                {currentGem.purpose}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-orange-950">
                {currentGem.gemstoneHindi} ({currentGem.gemstoneEnglish}) धारण विधान
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% अनुकूल (Auspicious)
              </span>
            </div>
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-orange-50/50 p-3.5 rounded-xl border border-orange-200">
              <span className="text-[11px] text-stone-500 block">धातु (Metal):</span>
              <strong className="text-orange-950 text-sm block mt-0.5 font-bold">
                {currentGem.metal}
              </strong>
            </div>

            <div className="bg-orange-50/50 p-3.5 rounded-xl border border-orange-200">
              <span className="text-[11px] text-stone-500 block">उंगली (Finger):</span>
              <strong className="text-orange-950 text-sm block mt-0.5 font-bold">
                {currentGem.finger}
              </strong>
            </div>

            <div className="bg-orange-50/50 p-3.5 rounded-xl border border-orange-200">
              <span className="text-[11px] text-stone-500 block">शुभ वार (Day):</span>
              <strong className="text-orange-950 text-sm block mt-0.5 font-bold">
                {currentGem.day}
              </strong>
            </div>

            <div className="bg-orange-50/50 p-3.5 rounded-xl border border-orange-200">
              <span className="text-[11px] text-stone-500 block">मुहूर्त (Time):</span>
              <strong className="text-orange-950 text-sm block mt-0.5 font-bold">
                {currentGem.muhurat}
              </strong>
            </div>
          </div>

          {/* Beej Mantra for Gemstone Activation */}
          <div className="bg-gradient-to-r from-orange-100 via-amber-50 to-orange-100 p-4 sm:p-5 rounded-2xl border-2 border-orange-300 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-900">
              <Sparkles className="w-4 h-4 text-orange-600" /> प्राण प्रतिष्ठा बीज मंत्र ({currentGem.chantCount} बार जप)
            </div>
            <p className="text-lg sm:text-xl font-serif font-bold text-orange-950 tracking-wide text-center py-2 select-all">
              {currentGem.beejMantra}
            </p>
            <p className="text-xs text-stone-700 text-center font-medium">
              रत्न जड़ित मुद्रिका को हाथ में लेकर उक्त मंत्र का {currentGem.chantCount} बार शुद्ध उच्चारण पूर्वक जप करें।
            </p>
          </div>

          {/* Purification & Wearing Ritual */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-bold text-orange-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-orange-600" />
              वैदिक शुद्धिकरण एवं प्राण-प्रतिष्ठा विधि:
            </h4>
            <div className="bg-orange-50/40 p-4 rounded-xl border border-orange-200 text-xs text-stone-700 space-y-2 leading-relaxed font-medium">
              <p>1. {currentGem.purificationVidhi}</p>
              <p>2. प्रातःकाल स्नान उपरांत स्वच्छ वस्त्र धारण करें तथा पूर्व दिशा की ओर मुख करके बैठें।</p>
              <p>3. तांबे अथवा चांदी की थाली में लाल/पीला वस्त्र बिछाकर मुद्रिका स्थापित करें और धूप-दीप नैवेद्य अर्पित करें।</p>
              <p>4. बीज मंत्र जप पूर्ण होने पर इष्टदेव का ध्यान करते हुए संबंधित उंगली में धारण करें।</p>
            </div>
          </div>

          {/* Warnings & Incompatible Gemstones */}
          <div className="bg-rose-50 rounded-xl p-4 border border-rose-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600" /> वर्जित रत्न (Do NOT Wear Together):
            </div>
            <p className="text-xs text-rose-900 leading-relaxed">
              इस रत्न के साथ निम्नलिखित रत्नों को कभी भी एक साथ धारण न करें, अन्यथा विपरीत फल प्राप्त हो सकते हैं:{' '}
              <strong className="text-rose-950 font-bold">
                {currentGem.contraindications.join(' • ')}
              </strong>
            </p>
          </div>

          {/* Affordable Substitutes (Upratna) */}
          {currentGem.substitutes.length > 0 && (
            <div className="bg-orange-50/50 rounded-xl p-3.5 border border-orange-200 text-xs text-stone-700 flex flex-wrap items-center gap-2">
              <span className="font-bold text-orange-950">किफायती विकल्प (Upratna):</span>
              {currentGem.substitutes.map((sub, sIdx) => (
                <span
                  key={sIdx}
                  className="bg-white text-orange-950 font-semibold px-2.5 py-0.5 rounded text-[11px] border border-orange-200 shadow-sm"
                >
                  {sub}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Navagraha Gemstone Reference Guide */}
      <div className="bg-white rounded-2xl border-2 border-orange-200 p-6 shadow-lg shadow-orange-950/5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-orange-100">
          <div>
            <h3 className="text-base font-serif font-bold text-orange-950 flex items-center gap-2">
              <Gem className="w-4 h-4 text-orange-600" />
              नवग्रह रत्न संदर्भ तालिका (All 9 Vedic Gemstones)
            </h3>
            <p className="text-xs text-stone-600">
              रत्न, ग्रह, धातु, धारण उंगली एवं मुख्य सावधानियां
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {ALL_GEMSTONES.map((g, idx) => (
            <div
              key={idx}
              className="bg-orange-50/40 p-4 rounded-xl border border-orange-200 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <strong className="text-sm font-serif font-bold text-orange-950">
                  {g.hindiName} ({g.name})
                </strong>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${g.color}`}>
                  {g.planetHindi}
                </span>
              </div>
              <div className="text-stone-700 space-y-0.5 text-[11px]">
                <div><span className="text-stone-500">धातु:</span> {g.metal}</div>
                <div><span className="text-stone-500">उंगली:</span> {g.finger}</div>
                <div><span className="text-stone-500">वार:</span> {g.day}</div>
              </div>
              <div className="text-[10px] text-orange-900 font-semibold pt-1 border-t border-orange-200">
                ⚠️ {g.caution}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
