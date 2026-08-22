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
      color: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
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
      color: 'bg-slate-200/20 text-slate-100 border-slate-300/40',
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
      color: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
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
      color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
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
      color: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
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
      color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
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
      color: 'bg-blue-600/20 text-blue-300 border-blue-500/40',
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
      color: 'bg-amber-900/40 text-amber-300 border-amber-700/40',
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
      color: 'bg-yellow-700/20 text-yellow-300 border-yellow-600/40',
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
      <div className="bg-stone-900/90 rounded-2xl border border-amber-800/40 p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-amber-800/30">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold border border-amber-500/30 mb-2">
              <Gem className="w-3.5 h-3.5 text-amber-400" /> रत्न एवं रुद्राक्ष शास्त्र
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
              जातक के लिए अनुशंसित रत्न एवं धारण विधि
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              लग्न: <strong className="text-amber-300">{lagnaRashi.lagnaHindi}</strong> | लग्नेश: <strong className="text-amber-300">{lagnaRashi.lagnaLord}</strong> के अनुकूल भाग्यशाली रत्नों की प्रामाणिक सूची
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
              className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                selectedGemIndex === idx
                  ? 'bg-gradient-to-br from-amber-900/80 to-stone-900 border-amber-400 ring-2 ring-amber-400/40 shadow-lg'
                  : 'bg-stone-950/60 border-amber-900/40 hover:bg-stone-800'
              }`}
            >
              <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-block mb-1.5">
                {gem.purpose}
              </span>
              <h4 className="text-base font-serif font-bold text-amber-100">
                {gem.gemstoneHindi}
              </h4>
              <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                {gem.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Gemstone Detailed Wearing Ritual Card */}
      {currentGem && (
        <div className="bg-stone-900/90 rounded-2xl border border-amber-800/40 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-amber-800/30">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
                {currentGem.purpose}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
                {currentGem.gemstoneHindi} ({currentGem.gemstoneEnglish}) धारण विधान
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% अनुकूल (Auspicious)
              </span>
            </div>
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-stone-950/80 p-3.5 rounded-xl border border-amber-900/40">
              <span className="text-[11px] text-stone-400 block">धातु (Metal):</span>
              <strong className="text-amber-200 text-sm block mt-0.5">
                {currentGem.metal}
              </strong>
            </div>

            <div className="bg-stone-950/80 p-3.5 rounded-xl border border-amber-900/40">
              <span className="text-[11px] text-stone-400 block">उंगली (Finger):</span>
              <strong className="text-amber-200 text-sm block mt-0.5">
                {currentGem.finger}
              </strong>
            </div>

            <div className="bg-stone-950/80 p-3.5 rounded-xl border border-amber-900/40">
              <span className="text-[11px] text-stone-400 block">शुभ वार (Day):</span>
              <strong className="text-amber-200 text-sm block mt-0.5">
                {currentGem.day}
              </strong>
            </div>

            <div className="bg-stone-950/80 p-3.5 rounded-xl border border-amber-900/40">
              <span className="text-[11px] text-stone-400 block">मुहूर्त (Time):</span>
              <strong className="text-amber-200 text-sm block mt-0.5">
                {currentGem.muhurat}
              </strong>
            </div>
          </div>

          {/* Beej Mantra for Gemstone Activation */}
          <div className="bg-gradient-to-r from-amber-950/70 via-stone-900 to-amber-950/70 p-4 sm:p-5 rounded-xl border border-amber-700/50 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400" /> प्राण प्रतिष्ठा बीज मंत्र ({currentGem.chantCount} बार जप)
            </div>
            <p className="text-lg sm:text-xl font-serif font-bold text-amber-100 tracking-wide text-center py-2 select-all">
              {currentGem.beejMantra}
            </p>
            <p className="text-xs text-stone-300 text-center">
              रत्न जड़ित मुद्रिका को हाथ में लेकर उक्त मंत्र का {currentGem.chantCount} बार शुद्ध उच्चारण पूर्वक जप करें।
            </p>
          </div>

          {/* Purification & Wearing Ritual */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-bold text-amber-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              वैदिक शुद्धिकरण एवं प्राण-प्रतिष्ठा विधि:
            </h4>
            <div className="bg-stone-950/80 p-4 rounded-xl border border-amber-900/30 text-xs text-stone-300 space-y-2 leading-relaxed">
              <p>1. {currentGem.purificationVidhi}</p>
              <p>2. प्रातःकाल स्नान उपरांत स्वच्छ वस्त्र धारण करें तथा पूर्व दिशा की ओर मुख करके बैठें।</p>
              <p>3. तांबे अथवा चांदी की थाली में लाल/पीला वस्त्र बिछाकर मुद्रिका स्थापित करें और धूप-दीप नैवेद्य अर्पित करें।</p>
              <p>4. बीज मंत्र जप पूर्ण होने पर इष्टदेव का ध्यान करते हुए संबंधित उंगली में धारण करें।</p>
            </div>
          </div>

          {/* Warnings & Incompatible Gemstones */}
          <div className="bg-rose-950/30 rounded-xl p-4 border border-rose-800/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
              <AlertTriangle className="w-4 h-4 text-rose-400" /> वर्जित रत्न (Do NOT Wear Together):
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              इस रत्न के साथ निम्नलिखित रत्नों को कभी भी एक साथ धारण न करें, अन्यथा विपरीत फल प्राप्त हो सकते हैं:{' '}
              <strong className="text-rose-200 font-semibold">
                {currentGem.contraindications.join(' • ')}
              </strong>
            </p>
          </div>

          {/* Affordable Substitutes (Upratna) */}
          {currentGem.substitutes.length > 0 && (
            <div className="bg-stone-950/60 rounded-xl p-3.5 border border-amber-900/30 text-xs text-stone-300 flex flex-wrap items-center gap-2">
              <span className="font-semibold text-amber-300">किफायती विकल्प (Upratna):</span>
              {currentGem.substitutes.map((sub, sIdx) => (
                <span
                  key={sIdx}
                  className="bg-stone-800 text-amber-200 px-2.5 py-0.5 rounded text-[11px] border border-amber-800/40"
                >
                  {sub}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Navagraha Gemstone Reference Guide */}
      <div className="bg-stone-900/90 rounded-2xl border border-amber-800/40 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-amber-800/30">
          <div>
            <h3 className="text-base font-serif font-bold text-amber-100 flex items-center gap-2">
              <Gem className="w-4 h-4 text-amber-400" />
              नवग्रह रत्न संदर्भ तालिका (All 9 Vedic Gemstones)
            </h3>
            <p className="text-xs text-stone-400">
              रत्न, ग्रह, धातु, धारण उंगली एवं मुख्य सावधानियां
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {ALL_GEMSTONES.map((g, idx) => (
            <div
              key={idx}
              className="bg-stone-950/70 p-4 rounded-xl border border-amber-900/30 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <strong className="text-sm font-serif font-bold text-amber-200">
                  {g.hindiName} ({g.name})
                </strong>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${g.color}`}>
                  {g.planetHindi}
                </span>
              </div>
              <div className="text-stone-300 space-y-0.5 text-[11px]">
                <div><span className="text-stone-400">धातु:</span> {g.metal}</div>
                <div><span className="text-stone-400">उंगली:</span> {g.finger}</div>
                <div><span className="text-stone-400">वार:</span> {g.day}</div>
              </div>
              <div className="text-[10px] text-amber-400/90 pt-1 border-t border-stone-800">
                ⚠️ {g.caution}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
