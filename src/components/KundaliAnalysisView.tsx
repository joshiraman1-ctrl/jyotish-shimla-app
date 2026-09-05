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
  BookOpen,
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

  if (!kundali || !kundali.birthDetails || !kundali.lagnaRashi) {
    return (
      <div className="bg-white rounded-3xl border-2 border-orange-200 p-8 text-center space-y-4">
        <p className="text-orange-950 font-serif text-base font-bold">जन्म कुंडली गणना की जा रही है...</p>
        <p className="text-xs text-stone-600">कृपया प्रतीक्षा करें, वैदिक ज्योतिष इंजन डेटा प्रोसेस कर रहा है।</p>
      </div>
    );
  }

  const { birthDetails, lagnaRashi, dasha, doshas, aiAnalysisText } = kundali;

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
      <div className="space-y-3.5 text-stone-800 leading-relaxed font-sans">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-1.5" />;

          // Heading Level 3 (###) or Main Section
          if (trimmed.startsWith('###')) {
            const headingText = trimmed.replace(/^###\s*/, '').replace(/\*\*/g, '');
            return (
              <h3
                key={idx}
                className="text-lg sm:text-xl font-serif font-extrabold text-orange-950 pt-3 pb-1 border-b-2 border-orange-200"
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
                <span className="text-orange-600 font-bold text-base select-none mt-0.5">•</span>
                <p className="text-sm text-stone-800 leading-relaxed flex-1">
                  {parts.map((p, pIdx) => {
                    if (p.startsWith('**') && p.endsWith('**')) {
                      return (
                        <strong key={pIdx} className="text-orange-950 font-bold">
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
            return <hr key={idx} className="border-orange-200 my-4" />;
          }

          // General Paragraph with bold
          const parts = line.split(/(\*\*.*?\*\*)/g);
          return (
            <p key={idx} className="text-sm text-stone-800 leading-relaxed">
              {parts.map((p, pIdx) => {
                if (p.startsWith('**') && p.endsWith('**')) {
                  return (
                    <strong key={pIdx} className="text-orange-950 font-bold">
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
    <div className="space-y-6">
      {/* Top Banner Overview Card */}
      <div className="bg-gradient-to-br from-orange-100 via-amber-50 to-white rounded-3xl border-2 border-orange-300 p-5 sm:p-7 shadow-lg shadow-orange-950/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" /> प्रामाणिक वैदिक कुंडली विश्लेषण • ज्योतिष शिमला
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-orange-950">
              {birthDetails.name} जी की जन्म कुंडली
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              जन्म: {birthDetails.dateOfBirth} | समय: {birthDetails.timeOfBirth} | स्थान: {birthDetails.placeOfBirth}
            </p>
          </div>

          {/* Key Panchang Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center bg-white/70 backdrop-blur-sm p-3.5 rounded-2xl border border-orange-200">
            <div>
              <span className="text-[10px] text-stone-500 block uppercase font-medium">लग्न</span>
              <strong className="text-orange-950 font-serif text-sm block mt-0.5 font-bold">
                {lagnaRashi.lagnaHindi}
              </strong>
              <span className="text-[10px] text-orange-800 font-medium">स्वामी: {lagnaRashi.lagnaLord}</span>
            </div>

            <div>
              <span className="text-[10px] text-stone-500 block uppercase font-medium">चन्द्र राशि</span>
              <strong className="text-orange-950 font-serif text-sm block mt-0.5 font-bold">
                {lagnaRashi.moonSignHindi}
              </strong>
              <span className="text-[10px] text-orange-800 font-medium">स्वामी: {lagnaRashi.moonSignLord}</span>
            </div>

            <div>
              <span className="text-[10px] text-stone-500 block uppercase font-medium">जन्म नक्षत्र</span>
              <strong className="text-orange-950 font-serif text-sm block mt-0.5 font-bold">
                {lagnaRashi.nakshatra}
              </strong>
              <span className="text-[10px] text-orange-800 font-medium">पद {lagnaRashi.nakshatraPada} ({lagnaRashi.nakshatraLord})</span>
            </div>

            <div>
              <span className="text-[10px] text-stone-500 block uppercase font-medium">वर्तमान महादशा</span>
              <strong className="text-orange-950 font-serif text-sm block mt-0.5 font-bold">
                {dasha.currentMahadasha}
              </strong>
              <span className="text-[10px] text-orange-800 font-medium">अंतर्दशा: {dasha.currentAntardasha}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Astrological Synthesis Text formatted with mandated sections */}
      <div className="bg-white rounded-2xl border-2 border-orange-200 p-6 sm:p-8 shadow-lg shadow-orange-950/5 space-y-4">
        {/* Action Controls & Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-orange-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-serif font-bold text-xs shadow-sm">
              ॐ
            </div>
            <span className="text-sm font-serif font-bold text-orange-950">वैदिक फलादेश एवं विश्लेषण</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onRefreshAI}
              disabled={isLoadingAI}
              className="px-3 py-1.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-950 text-xs font-semibold border border-orange-300 flex items-center gap-1.5 transition-colors disabled:opacity-50"
              title="पुनः गहन विश्लेषण करें"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAI ? 'animate-spin' : ''}`} />
              <span>रीफ्रेश AI</span>
            </button>

            <button
              type="button"
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-orange-100 text-orange-950 text-xs font-semibold border border-orange-300 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-orange-600" />}
              <span>{copied ? 'कॉपी हुआ' : 'कॉपी'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-orange-100 text-orange-950 text-xs font-semibold border border-orange-300 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-orange-600" />
              <span>प्रिंट</span>
            </button>
          </div>
        </div>

        {isLoadingAI ? (
          <div className="py-16 text-center space-y-4">
            <RefreshCw className="w-8 h-8 animate-spin text-orange-600 mx-auto" />
            <p className="text-orange-950 font-serif font-bold text-base">
              ज्योतिष शिमला AI इंजन आपकी कुंडली के समस्त ग्रहों, नक्षत्रों एवं महादशाओं का संश्लेषण कर रहा है...
            </p>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              लग्न एवं राशि विश्लेषण, ग्रह स्थिति एवं महादशा, भविष्यवाणी (करियर, स्वास्थ्य, विवाह) और सटीक रत्न एवं वैदिक उपाय तैयार किए जा रहे हैं।
            </p>
          </div>
        ) : (
          renderFormattedAstrologyText(aiAnalysisText || '')
        )}
      </div>

      {/* Doshas & Astrological Influences Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Manglik & Kaal Sarp */}
        <div className="bg-white rounded-2xl border-2 border-orange-200 p-5 shadow-lg shadow-orange-950/5 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-orange-100">
            <ShieldAlert className="w-4 h-4 text-orange-600" />
            <h4 className="text-sm font-serif font-bold text-orange-950">
              मांगलिक एवं कालसर्प विश्लेषण
            </h4>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-orange-50/50 p-3.5 rounded-xl border border-orange-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-orange-950">मांगलिक प्रभाव:</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    doshas.hasManglikDosha
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}
                >
                  {doshas.hasManglikDosha ? `${doshas.manglikSeverity} मांगलिक` : 'दोष मुक्त'}
                </span>
              </div>
              <p className="text-stone-700 leading-relaxed font-normal">{doshas.manglikDetails}</p>
            </div>

            <div className="bg-orange-50/50 p-3.5 rounded-xl border border-orange-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-orange-950">कालसर्प योग:</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    doshas.hasKaalSarpDosha
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}
                >
                  {doshas.hasKaalSarpDosha ? 'सक्रिय' : 'नहीं है'}
                </span>
              </div>
              <p className="text-stone-700 leading-relaxed font-normal">{doshas.kaalSarpDetails}</p>
            </div>
          </div>
        </div>

        {/* Shani Sade Sati & Pitra Dosha */}
        <div className="bg-white rounded-2xl border-2 border-orange-200 p-5 shadow-lg shadow-orange-950/5 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-orange-100">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <h4 className="text-sm font-serif font-bold text-orange-950">
              शनि साढ़ेसाती एवं पितृ कृपा स्थिति
            </h4>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-orange-50/50 p-3.5 rounded-xl border border-orange-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-orange-950">शनि की साढ़ेसाती (2026):</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    doshas.hasSadeSati
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}
                >
                  {doshas.hasSadeSati ? doshas.sadeSatiPhase : 'मुक्त'}
                </span>
              </div>
              <p className="text-stone-700 leading-relaxed font-normal">{doshas.sadeSatiDetails}</p>
            </div>

            <div className="bg-orange-50/50 p-3.5 rounded-xl border border-orange-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-orange-950">पितृ योग स्थिति:</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    doshas.hasPitraDosha
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}
                >
                  {doshas.hasPitraDosha ? 'शांति आवश्यक' : 'पितृ कृपा'}
                </span>
              </div>
              <p className="text-stone-700 leading-relaxed font-normal">{doshas.pitraDoshaDetails}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
