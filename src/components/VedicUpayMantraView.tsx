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
      <div className="bg-gradient-to-br from-orange-100 via-amber-50 to-white rounded-3xl border-2 border-orange-300 p-6 sm:p-7 shadow-lg shadow-orange-950/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-orange-200">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-200" /> वैदिक शांति एवं निवारण कर्म
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-orange-950">
              वैदिक उपाय, स्तोत्र, दान एवं मंत्र साधना
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 mt-1 font-medium">
              नवग्रहों के अनिष्ट प्रभावों की शांति, महादशा अनुकूलन एवं पूर्व संचित कर्मों के निवारण हेतु सिद्ध उपाय
            </p>
          </div>
        </div>

        {/* Planet Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-2 scrollbar-thin scrollbar-thumb-orange-400">
          {remedies.map((rem, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedPlanetIndex(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border-2 ${
                selectedPlanetIndex === idx
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-md shadow-orange-600/20'
                  : 'bg-white text-stone-700 border-orange-200 hover:bg-orange-50'
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
          <div className="bg-white rounded-2xl border-2 border-orange-200 p-6 shadow-lg shadow-orange-950/5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-orange-100">
              <div>
                <span className="text-[11px] font-bold text-orange-700 uppercase tracking-wider">
                  ग्रह बीज मंत्र साधना
                </span>
                <h3 className="text-lg font-serif font-bold text-orange-950">
                  {activeRemedy.planetHindi} सिद्ध बीज मंत्र
                </h3>
              </div>
              <span className="bg-orange-100 text-orange-900 border border-orange-300 px-3 py-1 rounded-full text-xs font-bold">
                जप संख्या: {activeRemedy.mantra.count} बार नित्य
              </span>
            </div>

            {/* Sanskrit Shloka Box */}
            <div className="bg-gradient-to-r from-orange-100 via-amber-50 to-orange-100 p-5 rounded-2xl border-2 border-orange-300 text-center space-y-2">
              <p className="text-xl sm:text-2xl font-serif font-extrabold text-orange-950 tracking-wider select-all">
                {activeRemedy.mantra.sanskrit}
              </p>
              <p className="text-xs text-orange-800 font-mono font-semibold">
                {activeRemedy.mantra.transliteration}
              </p>
              <p className="text-xs text-stone-700 pt-2 border-t border-orange-200 italic font-medium">
                अर्थ: {activeRemedy.mantra.meaning}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-700 bg-orange-50/60 p-3.5 rounded-xl border border-orange-200">
              <Clock className="w-4 h-4 text-orange-600 shrink-0" />
              <span><strong>शुभ समय:</strong> {activeRemedy.mantra.bestTime}</span>
            </div>
          </div>

          {/* Stotra & Vedic Recitation */}
          <div className="bg-white rounded-2xl border-2 border-orange-200 p-6 shadow-lg shadow-orange-950/5 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-orange-100">
              <BookOpen className="w-4 h-4 text-orange-600" />
              <h4 className="text-base font-serif font-bold text-orange-950">
                कल्याणकारी वैदिक स्तोत्र पाठ (Stotra)
              </h4>
            </div>

            <div className="bg-orange-50/40 p-4 rounded-xl border border-orange-200 space-y-1.5">
              <strong className="text-orange-950 font-serif text-sm block font-bold">
                {activeRemedy.stotra.name}
              </strong>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                {activeRemedy.stotra.benefit}
              </p>
            </div>
          </div>

          {/* Daan (Charity) & Vrat (Fasting) Rules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Daan */}
            <div className="bg-white rounded-2xl border-2 border-orange-200 p-5 shadow-lg shadow-orange-950/5 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-orange-100">
                <HeartHandshake className="w-4 h-4 text-orange-600" />
                <h4 className="text-sm font-serif font-bold text-orange-950">
                  दान सामग्री एवं पात्र (Charity)
                </h4>
              </div>
              <div className="space-y-2 text-xs text-stone-700">
                <div>
                  <span className="text-stone-500 font-medium block">दान योग्य वस्तुएं:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {activeRemedy.daan.items.map((it, i) => (
                      <span key={i} className="bg-orange-50 text-orange-950 font-semibold px-2.5 py-0.5 rounded border border-orange-200 text-[11px]">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-stone-500 font-medium">शुभ दिन:</span> <strong className="text-orange-950 font-bold">{activeRemedy.daan.idealDay}</strong>
                </div>
                <div>
                  <span className="text-stone-500 font-medium">योग्य पात्र:</span> <span className="text-stone-800 font-medium">{activeRemedy.daan.recipient}</span>
                </div>
              </div>
            </div>

            {/* Vrat */}
            <div className="bg-white rounded-2xl border-2 border-orange-200 p-5 shadow-lg shadow-orange-950/5 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-orange-100">
                <Calendar className="w-4 h-4 text-orange-600" />
                <h4 className="text-sm font-serif font-bold text-orange-950">
                  व्रत एवं उपवास नियम (Vedic Vrat)
                </h4>
              </div>
              <div className="space-y-2 text-xs text-stone-700">
                <div>
                  <span className="text-stone-500 font-medium">व्रत का दिन:</span> <strong className="text-orange-950 font-bold">{activeRemedy.vrat.day}</strong>
                </div>
                <div>
                  <span className="text-stone-500 font-medium">अधिष्ठाता देव:</span> <span className="text-orange-950 font-bold">{activeRemedy.vrat.deity}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-medium">नियम व आचरण:</span> <p className="text-stone-800 mt-0.5 font-medium">{activeRemedy.vrat.rules}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rudraksha & Yantra Recommendation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border-2 border-orange-200 p-5 shadow-lg shadow-orange-950/5 space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-orange-700">रुद्राक्ष कवच</span>
              <strong className="text-orange-950 font-serif text-sm block font-bold">
                {activeRemedy.rudraksha.mukhi}
              </strong>
              <p className="text-stone-700 font-medium">{activeRemedy.rudraksha.benefits}</p>
            </div>

            <div className="bg-white rounded-2xl border-2 border-orange-200 p-5 shadow-lg shadow-orange-950/5 space-y-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-orange-700">सिद्ध यंत्र स्थापना</span>
              <strong className="text-orange-950 font-serif text-sm block font-bold">
                {activeRemedy.yantra.name}
              </strong>
              <p className="text-stone-700 font-medium">दिशा एवं स्थान: {activeRemedy.yantra.placement}</p>
            </div>
          </div>
        </div>

        {/* Digital Japa Mala Counter Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-b from-orange-100 via-white to-orange-50/80 rounded-2xl border-2 border-orange-300 p-6 shadow-xl text-center space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-orange-200">
              <h4 className="text-sm font-serif font-bold text-orange-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-orange-600" />
                डिजिटल जप माला (108 Japa Counter)
              </h4>
              <button
                type="button"
                onClick={handleResetJapa}
                className="text-xs text-orange-700 hover:text-orange-900 font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> रीसेट
              </button>
            </div>

            {/* Active Planet Mantra Snippet */}
            <div className="bg-white p-3.5 rounded-xl border border-orange-200 text-xs shadow-sm">
              <span className="text-[10px] text-orange-700 block font-bold mb-1">
                वर्तमान जप मंत्र:
              </span>
              <p className="text-orange-950 font-serif font-bold text-sm">
                {activeRemedy.mantra.sanskrit}
              </p>
            </div>

            {/* Big Interactive Bead / Tap Area */}
            <div className="relative flex flex-col items-center justify-center py-4">
              <button
                type="button"
                id="btn-japa-counter"
                onClick={handleIncrementJapa}
                className="w-44 h-44 rounded-full bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 text-white shadow-xl shadow-orange-600/30 border-4 border-amber-200 flex flex-col items-center justify-center hover:scale-105 active:scale-95 transition-all select-none group"
              >
                <span className="text-[11px] uppercase tracking-widest text-amber-100 font-bold mb-1">
                  मनका स्पर्श करें
                </span>
                <span className="text-5xl font-serif font-extrabold text-white group-hover:scale-110 transition-transform">
                  {japaCount}
                </span>
                <span className="text-xs text-amber-100 mt-1 font-bold">
                  / {targetCount}
                </span>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-stone-700 font-bold">
                <span>माला प्रगति</span>
                <span>{Math.round((japaCount / targetCount) * 100)}%</span>
              </div>
              <div className="w-full h-2.5 bg-orange-100 rounded-full overflow-hidden border border-orange-200">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-200"
                  style={{ width: `${(japaCount / targetCount) * 100}%` }}
                />
              </div>
            </div>

            {/* Total Malas Completed */}
            <div className="bg-white p-3.5 rounded-xl border border-orange-200 flex items-center justify-between text-xs shadow-sm">
              <span className="text-stone-700 font-medium">पूर्ण मालाएं (Total Malas):</span>
              <strong className="text-orange-700 text-base font-serif font-bold">
                {malaCompleted} माला ( {malaCompleted * 108} मंत्र )
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
