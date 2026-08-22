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
      <div className="bg-gradient-to-r from-purple-950 via-stone-900 to-amber-950 rounded-2xl border border-purple-800/40 p-6 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-purple-800/30">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-semibold border border-purple-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" /> गूढ़ चेतना एवं काल विज्ञान
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
              बहुआयामी अस्तित्व (1D-12D) एवं कर्मिक संरेखण
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              भौतिक स्थूल शरीर (3D) से परब्रह्म (12D) तक चेतना का वैदिक मानचित्र एवं कालचक्र का रहस्य
            </p>
          </div>

          <button
            type="button"
            onClick={handleGenerateEsotericReading}
            disabled={isLoadingReading}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white text-xs font-semibold shadow-lg border border-purple-400/40 flex items-center gap-2 transition-all self-start md:self-auto disabled:opacity-50"
          >
            {isLoadingReading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-purple-200" />
                <span>गूढ़ संश्लेषण जारी है...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-purple-200" />
                <span>आत्मा का गूढ़ उद्देश्य विश्लेषित करें</span>
              </>
            )}
          </button>
        </div>

        {/* 1D to 12D Horizontal Dimension Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-2 scrollbar-thin scrollbar-thumb-purple-700">
          {ESOTERIC_DIMENSIONS.map((dim) => {
            const isSelected = selectedDimension.dimension === dim.dimension;
            return (
              <button
                key={dim.dimension}
                type="button"
                onClick={() => setSelectedDimension(dim)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-amber-600 text-white border-purple-400 shadow-md ring-1 ring-purple-300'
                    : 'bg-stone-950/80 text-stone-300 border-purple-900/40 hover:bg-stone-800'
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
        <div className="bg-stone-900/90 rounded-2xl border-2 border-purple-500/40 p-6 sm:p-7 shadow-2xl space-y-3">
          <div className="flex items-center gap-2 pb-3 border-b border-purple-800/30">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-serif font-bold text-purple-200">
              ज्योतिष शिमला - आत्मकारक एवं बहुआयामी चेतना पठन
            </h3>
          </div>
          <div className="text-xs text-stone-200 leading-relaxed space-y-2">
            {esotericReading.split('\n').map((line, lIdx) => {
              const trimmed = line.trim();
              if (trimmed.startsWith('*')) {
                const parts = trimmed.substring(1).split(/(\*\*.*?\*\*)/g);
                return (
                  <p key={lIdx} className="pl-3">
                    <span className="text-purple-400 font-bold">• </span>
                    {parts.map((p, pIdx) =>
                      p.startsWith('**') && p.endsWith('**') ? (
                        <strong key={pIdx} className="text-amber-300 font-semibold">
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
      <div className="bg-stone-900/90 rounded-2xl border border-amber-800/40 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-amber-800/30">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-300 font-bold flex items-center justify-center text-sm">
                {selectedDimension.dimension}
              </span>
              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-amber-100">
                  {selectedDimension.sanskritName}
                </h3>
                <span className="text-xs text-purple-300 font-medium">
                  {selectedDimension.englishTitle}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-stone-950/80 px-3.5 py-1.5 rounded-xl border border-amber-900/40 text-xs">
            <span className="text-stone-400">कोष (Plane):</span>{' '}
            <strong className="text-amber-300">{selectedDimension.planeOfConsciousness}</strong>
          </div>
        </div>

        {/* Dimension Attributes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-stone-950/80 p-4 rounded-xl border border-amber-900/30 space-y-2">
            <span className="text-amber-400 font-semibold block">आयाम का विवरण (Nature):</span>
            <p className="text-stone-300 leading-relaxed">{selectedDimension.description}</p>
          </div>

          <div className="bg-stone-950/80 p-4 rounded-xl border border-amber-900/30 space-y-2">
            <span className="text-amber-400 font-semibold block">ग्रह एवं तात्विक संबंध:</span>
            <p className="text-stone-300 leading-relaxed">{selectedDimension.planetaryConnection}</p>
          </div>

          <div className="bg-stone-950/80 p-4 rounded-xl border border-amber-900/30 space-y-2">
            <span className="text-amber-400 font-semibold block">साधना एवं चेतना अभ्यास:</span>
            <p className="text-stone-300 leading-relaxed">{selectedDimension.spiritualPractice}</p>
          </div>

          <div className="bg-stone-950/80 p-4 rounded-xl border border-amber-900/30 space-y-2">
            <span className="text-amber-400 font-semibold block">कर्मिक महत्व (Karmic Transcendence):</span>
            <p className="text-stone-300 leading-relaxed">{selectedDimension.karmicSignificance}</p>
          </div>
        </div>
      </div>

      {/* Karmic Models (Sanchita, Prarabdha, Kriyamana, Agama) */}
      <div className="bg-stone-900/90 rounded-2xl border border-amber-800/40 p-6 shadow-xl space-y-5">
        <div className="pb-3 border-b border-amber-800/30">
          <h3 className="text-base font-serif font-bold text-amber-100 flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            कर्म के चार स्तंभ (The 4 Models of Vedic Karma)
          </h3>
          <p className="text-xs text-stone-400 mt-0.5">
            आपकी जन्म कुंडली में प्रारब्ध और क्रियमाण कर्म का संतुलन
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {KARMIC_MODELS.map((k, idx) => (
            <div
              key={idx}
              className="bg-stone-950/80 p-4 rounded-xl border border-amber-900/40 text-xs space-y-2"
            >
              <span className="text-[10px] font-bold uppercase text-amber-400 block">
                {k.title}
              </span>
              <strong className="text-sm font-serif font-bold text-amber-200 block">
                {k.name}
              </strong>
              <p className="text-stone-300 text-[11px] leading-relaxed">{k.explanation}</p>
              <div className="pt-2 border-t border-stone-800 text-[11px]">
                <span className="text-stone-400 block">कुंडली संकेत:</span>
                <span className="text-amber-300">{k.astrologicalIndicator}</span>
              </div>
              <div className="text-[11px]">
                <span className="text-stone-400 block">संतुलन उपाय:</span>
                <span className="text-stone-300">{k.remedy}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time & Kala Concepts */}
      <div className="bg-stone-900/90 rounded-2xl border border-amber-800/40 p-6 shadow-xl space-y-5">
        <div className="pb-3 border-b border-amber-800/30">
          <h3 className="text-base font-serif font-bold text-amber-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            काल चक्र एवं मुहूर्त भौतिकी (Vedic Chronobiology & Time Physics)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {TIME_CONCEPTS.map((tc, idx) => (
            <div
              key={idx}
              className="bg-stone-950/80 p-4 rounded-xl border border-amber-900/30 space-y-2"
            >
              <strong className="text-sm font-serif font-bold text-amber-200 block">
                {tc.hindiTitle}
              </strong>
              <p className="text-stone-300 text-[11px] leading-relaxed">{tc.description}</p>
              <div className="bg-stone-900 p-2.5 rounded-lg border border-stone-800 font-mono text-[10px] text-amber-300/90">
                {tc.formula}
              </div>
              <div className="text-[11px] text-stone-400">
                <strong>ज्योतिषीय प्रयोग:</strong> {tc.relevance}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
