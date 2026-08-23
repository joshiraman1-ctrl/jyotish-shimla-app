import React, { useState } from 'react';
import { KundaliAnalysisResult, EsotericDimension } from '../types';
import { ESOTERIC_DIMENSIONS, TIME_CONCEPTS, KARMIC_MODELS } from '../utils/esotericData';
import { Sparkles, Globe, Clock, Compass, Layers, RefreshCw, Zap, Flame, ShieldCheck } from 'lucide-react';

interface EsotericConsciousnessViewProps {
  kundali: KundaliAnalysisResult;
}

export const EsotericConsciousnessView: React.FC<EsotericConsciousnessViewProps> = ({ kundali }) => {
  const [selectedDimension, setSelectedDimension] = useState<EsotericDimension>(ESOTERIC_DIMENSIONS[4]); // 5D default
  const [esotericReading, setEsotericReading] = useState<string>('');
  const [isLoadingReading, setIsLoadingReading] = useState<boolean>(false);

  const { birthDetails, lagnaRashi, planets } = kundali;

  const handleGenerateEsotericReading = async () => {
    setIsLoadingReading(true);
    try {
      const response = await fetch('/api/astrology/esoteric-reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          birthDetails,
          lagnaRashi,
          planets,
          selectedDimension: `${selectedDimension.dimension} - ${selectedDimension.sanskritName}`,
        }),
      });
      const data = await response.json();
      setEsotericReading(data.reading || '');
    } catch (err) {
      console.error('Failed to get esoteric reading:', err);
    } finally {
      setIsLoadingReading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-orange-100 via-amber-50 to-white rounded-3xl border-2 border-orange-300 p-6 sm:p-7 shadow-lg shadow-orange-950/5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-orange-200">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" /> गूढ़ चेतना एवं काल विज्ञान
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-orange-950">
              बहुआयामी अस्तित्व (1D-12D) एवं कर्मिक संरेखण
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 mt-1 font-medium">
              भौतिक स्थूल शरीर (3D) से परब्रह्म (12D) तक चेतना का वैदिक मानचित्र एवं कालचक्र का रहस्य
            </p>
          </div>

          <button
            type="button"
            onClick={handleGenerateEsotericReading}
            disabled={isLoadingReading}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold shadow-md shadow-orange-600/20 border border-orange-400 flex items-center gap-2 transition-all self-start md:self-auto disabled:opacity-50"
          >
            {isLoadingReading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>गूढ़ संश्लेषण जारी है...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-amber-200" />
                <span>आत्मा का गूढ़ उद्देश्य विश्लेषित करें</span>
              </>
            )}
          </button>
        </div>

        {/* 1D to 12D Horizontal Dimension Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-2 scrollbar-thin scrollbar-thumb-orange-400">
          {ESOTERIC_DIMENSIONS.map((dim) => {
            const isSelected = selectedDimension.dimension === dim.dimension;
            return (
              <button
                key={dim.dimension}
                type="button"
                onClick={() => setSelectedDimension(dim)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-md shadow-orange-600/20'
                    : 'bg-white text-stone-700 border-orange-200 hover:bg-orange-50'
                }`}
              >
                {dim.dimension} • {dim.elementTattva.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Esoteric Soul Reading Output (if generated) */}
      {esotericReading && (
        <div className="bg-white rounded-2xl border-2 border-orange-300 p-6 sm:p-7 shadow-lg shadow-orange-950/5 space-y-3">
          <div className="flex items-center gap-2 pb-3 border-b border-orange-100">
            <Sparkles className="w-5 h-5 text-orange-600" />
            <h3 className="text-base font-serif font-bold text-orange-950">
              ज्योतिष शिमला - आत्मकारक एवं बहुआयामी चेतना पठन
            </h3>
          </div>
          <div className="text-xs text-stone-800 leading-relaxed space-y-2 font-medium">
            {esotericReading.split('\n').map((line, lIdx) => {
              const trimmed = line.trim();
              if (trimmed.startsWith('*')) {
                const parts = trimmed.substring(1).split(/(\*\*.*?\*\*)/g);
                return (
                  <p key={lIdx} className="pl-3">
                    <span className="text-orange-600 font-bold">• </span>
                    {parts.map((p, pIdx) =>
                      p.startsWith('**') && p.endsWith('**') ? (
                        <strong key={pIdx} className="text-orange-950 font-bold">
                          {p.slice(2, -2)}
                        </strong>
                      ) : (
                        p
                      )
                    )}
                  </p>
                );
              }
              return <p key={lIdx}>{line}</p>;
            })}
          </div>
        </div>
      )}

      {/* Selected Dimension Deep Dive */}
      <div className="bg-white rounded-2xl border-2 border-orange-200 p-6 sm:p-8 shadow-lg shadow-orange-950/5 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-orange-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-orange-100 border border-orange-300 text-orange-900 font-bold flex items-center justify-center text-sm">
                {selectedDimension.dimension}
              </span>
              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-orange-950">
                  {selectedDimension.sanskritName}
                </h3>
                <span className="text-xs text-orange-700 font-semibold">
                  {selectedDimension.englishTitle}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-orange-50/70 px-3.5 py-1.5 rounded-xl border border-orange-200 text-xs">
            <span className="text-stone-500 font-medium">कोष (Plane):</span>{' '}
            <strong className="text-orange-950 font-bold">{selectedDimension.planeOfConsciousness}</strong>
          </div>
        </div>

        {/* Dimension Attributes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-orange-50/40 p-4 rounded-xl border border-orange-200 space-y-2">
            <span className="text-orange-900 font-bold block">आयाम का विवरण (Nature):</span>
            <p className="text-stone-700 leading-relaxed font-medium">{selectedDimension.description}</p>
          </div>

          <div className="bg-orange-50/40 p-4 rounded-xl border border-orange-200 space-y-2">
            <span className="text-orange-900 font-bold block">ग्रह एवं तात्विक संबंध:</span>
            <p className="text-stone-700 leading-relaxed font-medium">{selectedDimension.planetaryConnection}</p>
          </div>

          <div className="bg-orange-50/40 p-4 rounded-xl border border-orange-200 space-y-2">
            <span className="text-orange-900 font-bold block">साधना एवं चेतना अभ्यास:</span>
            <p className="text-stone-700 leading-relaxed font-medium">{selectedDimension.spiritualPractice}</p>
          </div>

          <div className="bg-orange-50/40 p-4 rounded-xl border border-orange-200 space-y-2">
            <span className="text-orange-900 font-bold block">कर्मिक महत्व (Karmic Transcendence):</span>
            <p className="text-stone-700 leading-relaxed font-medium">{selectedDimension.karmicSignificance}</p>
          </div>
        </div>
      </div>

      {/* Karmic Models (Sanchita, Prarabdha, Kriyamana, Agama) */}
      <div className="bg-white rounded-2xl border-2 border-orange-200 p-6 shadow-lg shadow-orange-950/5 space-y-5">
        <div className="pb-3 border-b border-orange-100">
          <h3 className="text-base font-serif font-bold text-orange-950 flex items-center gap-2">
            <Compass className="w-4 h-4 text-orange-600" />
            कर्म के चार स्तंभ (The 4 Models of Vedic Karma)
          </h3>
          <p className="text-xs text-stone-600 mt-0.5 font-medium">
            आपकी जन्म कुंडली में प्रारब्ध और क्रियमाण कर्म का संतुलन
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {KARMIC_MODELS.map((k, idx) => (
            <div
              key={idx}
              className="bg-orange-50/40 p-4 rounded-xl border border-orange-200 text-xs space-y-2"
            >
              <span className="text-[10px] font-bold uppercase text-orange-700 block">
                {k.title}
              </span>
              <strong className="text-sm font-serif font-bold text-orange-950 block">
                {k.name}
              </strong>
              <p className="text-stone-700 text-[11px] leading-relaxed font-medium">{k.explanation}</p>
              <div className="pt-2 border-t border-orange-200 text-[11px]">
                <span className="text-stone-500 block font-medium">कुंडली संकेत:</span>
                <span className="text-orange-950 font-bold">{k.astrologicalIndicator}</span>
              </div>
              <div className="text-[11px]">
                <span className="text-stone-500 block font-medium">संतुलन उपाय:</span>
                <span className="text-stone-800 font-medium">{k.remedy}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time & Kala Concepts */}
      <div className="bg-white rounded-2xl border-2 border-orange-200 p-6 shadow-lg shadow-orange-950/5 space-y-5">
        <div className="pb-3 border-b border-orange-100">
          <h3 className="text-base font-serif font-bold text-orange-950 flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-600" />
            काल चक्र एवं मुहूर्त भौतिकी (Vedic Chronobiology & Time Physics)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {TIME_CONCEPTS.map((tc, idx) => (
            <div
              key={idx}
              className="bg-orange-50/40 p-4 rounded-xl border border-orange-200 space-y-2"
            >
              <strong className="text-sm font-serif font-bold text-orange-950 block">
                {tc.hindiTitle}
              </strong>
              <p className="text-stone-700 text-[11px] leading-relaxed font-medium">{tc.description}</p>
              <div className="bg-orange-100/70 p-2.5 rounded-lg border border-orange-200 font-mono text-[10px] text-orange-950 font-semibold">
                {tc.formula}
              </div>
              <div className="text-[11px] text-stone-700 font-medium">
                <strong className="text-orange-950">ज्योतिषीय प्रयोग:</strong> {tc.relevance}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
