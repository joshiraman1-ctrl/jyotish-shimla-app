import React, { useState } from 'react';
import { KundaliAnalysisResult, RemedialUpay, PlanetName } from '../types';
import {
  Flame,
  Volume2,
  RotateCcw,
  Sparkles,
  HeartHandshake,
  Calendar,
  Compass,
  CheckCircle2,
  Layers,
  Award,
  Clock,
  BookOpen,
} from 'lucide-react';

interface VedicUpayMantraViewProps {
  kundali: KundaliAnalysisResult;
}

export const VedicUpayMantraView: React.FC<VedicUpayMantraViewProps> = ({ kundali }) => {
  const { remedies, lagnaRashi } = kundali;
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useState(0);

  // Digital Japa Mala State
  const [japaCount, setJapaCount] = useState(0);
  const [targetCount] = useState(108);
  const [malaCompleted, setMalaCompleted] = useState(0);

  const activeRemedy = remedies[selectedPlanetIndex] || remedies[0];

  const handleIncrementJapa = () => {
    if (japaCount + 1 === targetCount) {
      setJapaCount(0);
      setMalaCompleted((prev) => prev + 1);
    } else {
      setJapaCount((prev) => prev + 1);
    }
  };

  const handleResetJapa = () => {
    setJapaCount(0);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-stone-900/90 rounded-2xl border border-amber-800/40 p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-amber-800/30">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold border border-amber-500/30 mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-400" /> वैदिक शांति एवं निवारण कर्म
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
              वैदिक उपाय, स्तोत्र, दान एवं मंत्र साधना
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              नवग्रहों के अनिष्ट प्रभावों की शांति, महादशा अनुकूलन एवं पूर्व संचित कर्मों के निवारण हेतु सिद्ध उपाय
            </p>
          </div>
        </div>

        {/* Planet Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-2 scrollbar-thin scrollbar-thumb-amber-700">
          {remedies.map((rem, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedPlanetIndex(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedPlanetIndex === idx
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white border-amber-400 shadow-md'
                  : 'bg-stone-950/70 text-stone-300 border-amber-900/40 hover:bg-stone-800'
              }`}
            >
              {rem.planetHindi}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Active Planet Remedies & Digital Japa Mala */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Planet Remedy Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Mantra Chanting Card */}
          <div className="bg-stone-900/90 rounded-2xl border border-amber-800/40 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-amber-800/30">
              <div>
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                  ग्रह बीज मंत्र साधना
                </span>
                <h3 className="text-lg font-serif font-bold text-amber-100">
                  {activeRemedy.planetHindi} सिद्ध बीज मंत्र
                </h3>
              </div>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-medium">
                जप संख्या: {activeRemedy.mantra.count} बार नित्य
              </span>
            </div>

            {/* Sanskrit Shloka Box */}
            <div className="bg-gradient-to-r from-amber-950/80 via-stone-950 to-amber-950/80 p-5 rounded-xl border border-amber-700/50 text-center space-y-2">
              <p className="text-xl sm:text-2xl font-serif font-bold text-amber-100 tracking-wider select-all">
                {activeRemedy.mantra.sanskrit}
              </p>
              <p className="text-xs text-amber-300/80 font-mono">
                {activeRemedy.mantra.transliteration}
              </p>
              <p className="text-xs text-stone-300 pt-2 border-t border-amber-900/40 italic">
                अर्थ: {activeRemedy.mantra.meaning}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-300 bg-stone-950/60 p-3 rounded-lg border border-amber-900/30">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>शुभ समय:</strong> {activeRemedy.mantra.bestTime}</span>
            </div>
          </div>

          {/* Stotra & Vedic Recitation */}
          <div className="bg-stone-900/90 rounded-2xl border border-amber-800/40 p-6 shadow-xl space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-amber-800/30">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <h4 className="text-base font-serif font-bold text-amber-100">
                कल्याणकारी वैदिक स्तोत्र पाठ (Stotra)
              </h4>
            </div>

            <div className="bg-stone-950/80 p-4 rounded-xl border border-amber-900/30 space-y-1.5">
              <strong className="text-amber-200 font-serif text-sm block">
                {activeRemedy.stotra.name}
              </strong>
              <p className="text-xs text-stone-300 leading-relaxed">
                {activeRemedy.stotra.benefit}
              </p>
            </div>
          </div>

          {/* Daan (Charity) & Vrat (Fasting) Rules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Daan */}
            <div className="bg-stone-900/90 rounded-2xl border border-amber-800/40 p-5 shadow-xl space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-amber-800/30">
                <HeartHandshake className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-serif font-bold text-amber-100">
                  दान सामग्री एवं पात्र (Charity)
                </h4>
              </div>
              <div className="space-y-2 text-xs text-stone-300">
                <div>
                  <span className="text-stone-400 font-medium block">दान योग्य वस्तुएं:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {activeRemedy.daan.items.map((it, i) => (
                      <span key={i} className="bg-stone-950 text-amber-200 px-2 py-0.5 rounded border border-amber-900/40 text-[11px]">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-stone-400 font-medium">शुभ दिन:</span> <strong className="text-amber-200">{activeRemedy.daan.idealDay}</strong>
                </div>
                <div>
                  <span className="text-stone-400 font-medium">योग्य पात्र:</span> <span className="text-stone-300">{activeRemedy.daan.recipient}</span>
                </div>
              </div>
            </div>

            {/* Vrat */}
            <div className="bg-stone-900/90 rounded-2xl border border-amber-800/40 p-5 shadow-xl space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-amber-800/30">
                <Calendar className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-serif font-bold text-amber-100">
                  व्रत एवं उपवास नियम (Vedic Vrat)
                </h4>
              </div>
              <div className="space-y-2 text-xs text-stone-300">
                <div>
                  <span className="text-stone-400 font-medium">व्रत का दिन:</span> <strong className="text-amber-200">{activeRemedy.vrat.day}</strong>
                </div>
                <div>
                  <span className="text-stone-400 font-medium">अधिष्ठाता देव:</span> <span className="text-amber-200">{activeRemedy.vrat.deity}</span>
                </div>
                <div>
                  <span className="text-stone-400 font-medium">नियम व आचरण:</span> <p className="text-stone-300 mt-0.5">{activeRemedy.vrat.rules}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rudraksha & Yantra Recommendation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-stone-900/90 rounded-2xl border border-amber-800/40 p-5 shadow-xl space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-amber-400">रुद्राक्ष कवच</span>
              <strong className="text-amber-200 font-serif text-sm block">
                {activeRemedy.rudraksha.mukhi}
              </strong>
              <p className="text-stone-300">{activeRemedy.rudraksha.benefits}</p>
            </div>

            <div className="bg-stone-900/90 rounded-2xl border border-amber-800/40 p-5 shadow-xl space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-amber-400">सिद्ध यंत्र स्थापना</span>
              <strong className="text-amber-200 font-serif text-sm block">
                {activeRemedy.yantra.name}
              </strong>
              <p className="text-stone-300">दिशा एवं स्थान: {activeRemedy.yantra.placement}</p>
            </div>
          </div>
        </div>

        {/* Digital Japa Mala Counter Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-b from-amber-950/90 via-stone-900 to-stone-950 rounded-2xl border-2 border-amber-600/50 p-6 shadow-2xl text-center space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-amber-800/40">
              <h4 className="text-sm font-serif font-bold text-amber-100 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                डिजिटल जप माला (108 Japa Counter)
              </h4>
              <button
                type="button"
                onClick={handleResetJapa}
                className="text-xs text-amber-400 hover:text-amber-200 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> रीसेट
              </button>
            </div>

            {/* Active Planet Mantra Snippet */}
            <div className="bg-stone-950/80 p-3 rounded-xl border border-amber-900/40 text-xs">
              <span className="text-[10px] text-amber-400 block font-semibold mb-1">
                वर्तमान जप मंत्र:
              </span>
              <p className="text-amber-100 font-serif font-bold text-sm">
                {activeRemedy.mantra.sanskrit}
              </p>
            </div>

            {/* Big Interactive Bead / Tap Area */}
            <div className="relative flex flex-col items-center justify-center py-4">
              <button
                type="button"
                id="btn-japa-counter"
                onClick={handleIncrementJapa}
                className="w-44 h-44 rounded-full bg-gradient-to-br from-amber-600 via-orange-600 to-amber-800 text-amber-50 shadow-2xl border-4 border-amber-300/60 flex flex-col items-center justify-center hover:scale-105 active:scale-95 transition-all select-none group"
              >
                <span className="text-[11px] uppercase tracking-widest text-amber-200 font-bold mb-1">
                  मनका स्पर्श करें
                </span>
                <span className="text-5xl font-serif font-extrabold text-white group-hover:scale-110 transition-transform">
                  {japaCount}
                </span>
                <span className="text-xs text-amber-200 mt-1 font-medium">
                  / {targetCount}
                </span>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-stone-300 font-medium">
                <span>माला प्रगति</span>
                <span>{Math.round((japaCount / targetCount) * 100)}%</span>
              </div>
              <div className="w-full h-2.5 bg-stone-950 rounded-full overflow-hidden border border-amber-900/40">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-200"
                  style={{ width: `${(japaCount / targetCount) * 100}%` }}
                />
              </div>
            </div>

            {/* Total Malas Completed */}
            <div className="bg-stone-950/90 p-3.5 rounded-xl border border-amber-900/40 flex items-center justify-between text-xs">
              <span className="text-stone-300">पूर्ण मालाएं (Total Malas):</span>
              <strong className="text-amber-300 text-base font-serif font-bold">
                {malaCompleted} माला ( {malaCompleted * 108} मंत्र )
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
