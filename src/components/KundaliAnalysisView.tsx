import React, { useState } from 'react';
import { KundaliAnalysisResult, PlanetName } from '../types';
import {
  Sparkles,
  RefreshCw,
  Printer,
  Copy,
  Check,
  ShieldAlert,
  ShieldCheck,
  Flame,
  Gem,
  Award,
  Calendar,
  Compass,
} from 'lucide-react';

interface KundaliAnalysisViewProps {
  kundali: KundaliAnalysisResult;
  onRefreshAI: () => void;
  isLoadingAI: boolean;
}

export const KundaliAnalysisView: React.FC<KundaliAnalysisViewProps> = ({
  kundali,
  onRefreshAI,
  isLoadingAI,
}) => {
  const [copied, setCopied] = useState(false);
  const { birthDetails, lagnaRashi, planets, dasha, doshas, transits, gemstones, aiAnalysisText } = kundali;

  const handleCopyText = () => {
    if (aiAnalysisText) {
      navigator.clipboard.writeText(aiAnalysisText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Helper to render markdown-like bold text & bullet points cleanly
  const renderFormattedAstrologyText = (rawText: string) => {
    const lines = rawText.split('\n');
    return (
      <div className="space-y-3.5 text-stone-200 leading-relaxed font-sans">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-1.5" />;

          // Heading Level 3 (###) or Main Section
          if (trimmed.startsWith('###')) {
            const headingText = trimmed.replace(/^###\s*/, '').replace(/\*\*/g, '');
            return (
              <h3
                key={idx}
                className="text-lg sm:text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-orange-200 pt-3 pb-1 border-b border-amber-800/40"
              >
                {headingText}
              </h3>
            );
          }

          // Bullet Point (*)
          if (trimmed.startsWith('*')) {
            const content = trimmed.substring(1).trim();
            // Parse bold tags **text**
            const parts = content.split(/(\*\*.*?\*\*)/g);
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-2 sm:pl-4">
                <span className="text-amber-400 font-bold text-base select-none mt-0.5">•</span>
                <p className="text-sm text-stone-200 leading-relaxed flex-1">
                  {parts.map((p, pIdx) => {
                    if (p.startsWith('**') && p.endsWith('**')) {
                      return (
                        <strong key={pIdx} className="text-amber-300 font-semibold">
                          {p.slice(2, -2)}
                        </strong>
                      );
                    }
                    return p;
                  })}
                </p>
              </div>
            );
          }

          // Horizontal Divider (---)
          if (trimmed === '---') {
            return <hr key={idx} className="border-amber-800/30 my-4" />;
          }

          // General Paragraph with bold
          const parts = line.split(/(\*\*.*?\*\*)/g);
          return (
            <p key={idx} className="text-sm text-stone-200 leading-relaxed">
              {parts.map((p, pIdx) => {
                if (p.startsWith('**') && p.endsWith('**')) {
                  return (
                    <strong key={pIdx} className="text-amber-300 font-semibold">
                      {p.slice(2, -2)}
                    </strong>
                  );
                }
                return p;
              })}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Overview Card */}
      <div className="bg-gradient-to-br from-amber-950 via-stone-900 to-stone-950 rounded-2xl border-2 border-amber-600/40 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold border border-amber-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> प्रामाणिक वैदिक कुंडली विश्लेषण • ज्योतिष शिमला
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              {birthDetails.name} जी की जन्म कुंडली
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              जन्म: {birthDetails.dateOfBirth} | समय: {birthDetails.timeOfBirth} | स्थान: {birthDetails.placeOfBirth}
            </p>
          </div>

          {/* Key Panchang Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
            <div className="bg-stone-900/90 p-3 rounded-xl border border-amber-800/40">
              <span className="text-[10px] text-stone-400 block uppercase font-medium">लग्न (Ascendant)</span>
              <strong className="text-amber-300 font-serif text-sm block mt-0.5">
                {lagnaRashi.lagnaHindi}
              </strong>
              <span className="text-[10px] text-stone-400">स्वामी: {lagnaRashi.lagnaLord}</span>
            </div>

            <div className="bg-stone-900/90 p-3 rounded-xl border border-amber-800/40">
              <span className="text-[10px] text-stone-400 block uppercase font-medium">चन्द्र राशि (Moon)</span>
              <strong className="text-amber-300 font-serif text-sm block mt-0.5">
                {lagnaRashi.moonSignHindi}
              </strong>
              <span className="text-[10px] text-stone-400">स्वामी: {lagnaRashi.moonSignLord}</span>
            </div>

            <div className="bg-stone-900/90 p-3 rounded-xl border border-amber-800/40">
              <span className="text-[10px] text-stone-400 block uppercase font-medium">जन्म नक्षत्र</span>
              <strong className="text-amber-300 font-serif text-sm block mt-0.5">
                {lagnaRashi.nakshatra}
              </strong>
              <span className="text-[10px] text-stone-400">पद {lagnaRashi.nakshatraPada} ({lagnaRashi.nakshatraLord})</span>
            </div>

            <div className="bg-stone-900/90 p-3 rounded-xl border border-amber-800/40">
              <span className="text-[10px] text-stone-400 block uppercase font-medium">वर्तमान महादशा</span>
              <strong className="text-amber-300 font-serif text-sm block mt-0.5">
                {dasha.currentMahadasha}
              </strong>
              <span className="text-[10px] text-stone-400">अंतर्दशा: {dasha.currentAntardasha}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Controls for Analysis */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-900/80 p-3 rounded-xl border border-amber-800/30">
        <div className="flex items-center gap-2">
          <span className="text-xs text-amber-200 font-medium">
            AI इंजन स्थिति: <span className="text-emerald-400 font-semibold">सक्रिय (Gemini 3.7 Flash)</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRefreshAI}
            disabled={isLoadingAI}
            className="px-3.5 py-1.5 rounded-lg bg-amber-700/80 hover:bg-amber-600 text-white text-xs font-medium border border-amber-500/40 flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAI ? 'animate-spin' : ''}`} />
            <span>पुनः गहन विश्लेषण करें</span>
          </button>

          <button
            type="button"
            onClick={handleCopyText}
            className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-amber-900/40 flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'कॉपी हो गया' : 'टेक्स्ट कॉपी'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-amber-900/40 flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>प्रिंट / सेव</span>
          </button>
        </div>
      </div>

      {/* Main Astrological Synthesis Text formatted with mandated sections */}
      <div className="bg-stone-900/90 rounded-2xl border border-amber-800/40 p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-amber-800/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-600/30 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold">
              ॐ
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-amber-100">
                वैदिक कुंडली विस्तृत विश्लेषण (Four Pillars of Jyotish Analysis)
              </h3>
              <p className="text-xs text-stone-400">
                लग्न, राशि, ग्रह स्थिति, महादशा, त्रिकोण फल एवं वैदिक उपाय
              </p>
            </div>
          </div>
        </div>

        {isLoadingAI ? (
          <div className="py-16 text-center space-y-4">
            <RefreshCw className="w-8 h-8 animate-spin text-amber-400 mx-auto" />
            <p className="text-amber-200 font-serif font-medium text-base">
              ज्योतिष शिमला AI इंजन आपकी कुंडली के समस्त ग्रहों, नक्षत्रों एवं महादशाओं का संश्लेषण कर रहा है...
            </p>
            <p className="text-xs text-stone-400 max-w-md mx-auto">
              लग्न एवं राशि विश्लेषण, ग्रह स्थिति एवं महादशा, भविष्यवाणी (करियर, स्वास्थ्य, विवाह) और सटीक रत्न एवं वैदिक उपाय तैयार किए जा रहे हैं।
            </p>
          </div>
        ) : (
          renderFormattedAstrologyText(aiAnalysisText || '')
        )}
      </div>

      {/* Planetary Positions Grid (Graha Sthiti & Shadbala Dignities) */}
      <div className="bg-stone-900/90 rounded-2xl border border-amber-800/40 p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-amber-800/30">
          <div>
            <h3 className="text-base font-serif font-bold text-amber-100 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              ग्रह स्थिति एवं दिग्बल तालिका (Planetary Degrees & Dignities)
            </h3>
            <p className="text-xs text-stone-400">
              सिद्ध लहिरी अयनांश आधारित नौ ग्रहों की भाव स्थिति एवं उच्च/नीच बल
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-950/80 text-amber-300/90 border-b border-amber-800/40">
                <th className="p-3 font-semibold">ग्रह (Planet)</th>
                <th className="p-3 font-semibold">भाव (House)</th>
                <th className="p-3 font-semibold">राशि (Rashi)</th>
                <th className="p-3 font-semibold">अंश (Degree)</th>
                <th className="p-3 font-semibold">नक्षत्र (Nakshatra)</th>
                <th className="p-3 font-semibold">पद (Pada)</th>
                <th className="p-3 font-semibold">स्थिति / Dignity</th>
                <th className="p-3 font-semibold">गति</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {(Object.keys(planets) as PlanetName[]).map((pKey) => {
                const p = planets[pKey];
                const isBenefic = ['Exalted', 'Own Sign', 'Moolatrikona'].includes(p.dignity);
                const isMalefic = p.dignity === 'Debilitated';

                return (
                  <tr key={pKey} className="hover:bg-amber-950/30 transition-colors">
                    <td className="p-3 font-medium text-amber-200">
                      {p.hindiName} ({p.name})
                    </td>
                    <td className="p-3 font-bold text-amber-300">
                      भाव {p.house}
                    </td>
                    <td className="p-3 text-stone-300">
                      {p.rashiHindi} ({p.rashiName})
                    </td>
                    <td className="p-3 text-stone-300 font-mono">
                      {p.signDegree.toFixed(2)}°
                    </td>
                    <td className="p-3 text-stone-300">
                      {p.nakshatra}
                    </td>
                    <td className="p-3 text-stone-300">
                      {p.pada}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                          isBenefic
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50'
                            : isMalefic
                            ? 'bg-rose-950/80 text-rose-300 border-rose-700/50'
                            : 'bg-stone-800 text-stone-300 border-stone-700'
                        }`}
                      >
                        {p.dignityHindi}
                      </span>
                    </td>
                    <td className="p-3 text-stone-400">
                      {p.isRetrograde ? (
                        <span className="text-amber-400 font-medium">वक्री (Retrograde)</span>
                      ) : (
                        'मार्गी (Direct)'
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vimshottari Mahadasha Timeline */}
      <div className="bg-stone-900/90 rounded-2xl border border-amber-800/40 p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-amber-800/30">
          <div>
            <h3 className="text-base font-serif font-bold text-amber-100 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              विंशोत्तरी महादशा चक्र (Vimshottari Dasha 120 Years System)
            </h3>
            <p className="text-xs text-stone-400">
              {dasha.dashaBalanceAtBirth}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {dasha.mahadashas.map((m, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border text-xs transition-all ${
                m.isCurrent
                  ? 'bg-gradient-to-br from-amber-900/70 to-stone-900 border-amber-400 ring-1 ring-amber-400 shadow-md'
                  : 'bg-stone-950/60 border-amber-900/30 text-stone-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <strong className={`font-serif text-sm ${m.isCurrent ? 'text-amber-200' : 'text-stone-200'}`}>
                  {m.hindiName} महादशा
                </strong>
                {m.isCurrent && (
                  <span className="bg-amber-500 text-stone-950 font-bold px-1.5 py-0.2 rounded text-[10px]">
                    वर्तमान (Active)
                  </span>
                )}
              </div>
              <div className="text-[11px] text-stone-400 space-y-0.5">
                <div>प्रारंभ: {m.startDate}</div>
                <div>समाप्ति: {m.endDate}</div>
                <div>अवधि: {m.years} वर्ष</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Doshas & Astrological Influences Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Manglik & Kaal Sarp */}
        <div className="bg-stone-900/90 rounded-2xl border border-amber-800/40 p-5 shadow-xl space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-amber-800/30">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-serif font-bold text-amber-100">
              मांगलिक एवं कालसर्प विश्लेषण
            </h4>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-stone-950/80 p-3 rounded-xl border border-amber-900/30">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-amber-300">मांगलिक प्रभाव:</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    doshas.hasManglikDosha
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  {doshas.hasManglikDosha ? `${doshas.manglikSeverity} मांगलिक` : 'दोष मुक्त'}
                </span>
              </div>
              <p className="text-stone-300 leading-relaxed">{doshas.manglikDetails}</p>
            </div>

            <div className="bg-stone-950/80 p-3 rounded-xl border border-amber-900/30">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-amber-300">कालसर्प योग:</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    doshas.hasKaalSarpDosha
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  {doshas.hasKaalSarpDosha ? 'सक्रिय' : 'नहीं है'}
                </span>
              </div>
              <p className="text-stone-300 leading-relaxed">{doshas.kaalSarpDetails}</p>
            </div>
          </div>
        </div>

        {/* Shani Sade Sati & Pitra Dosha */}
        <div className="bg-stone-900/90 rounded-2xl border border-amber-800/40 p-5 shadow-xl space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-amber-800/30">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-serif font-bold text-amber-100">
              शनि साढ़ेसाती एवं पितृ कृपा स्थिति
            </h4>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-stone-950/80 p-3 rounded-xl border border-amber-900/30">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-amber-300">शनि की साढ़ेसाती (2026):</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    doshas.hasSadeSati
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  {doshas.hasSadeSati ? doshas.sadeSatiPhase : 'मुक्त'}
                </span>
              </div>
              <p className="text-stone-300 leading-relaxed">{doshas.sadeSatiDetails}</p>
            </div>

            <div className="bg-stone-950/80 p-3 rounded-xl border border-amber-900/30">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-amber-300">पितृ योग स्थिति:</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    doshas.hasPitraDosha
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}
                >
                  {doshas.hasPitraDosha ? 'शांति आवश्यक' : 'पितृ कृपा'}
                </span>
              </div>
              <p className="text-stone-300 leading-relaxed">{doshas.pitraDoshaDetails}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
