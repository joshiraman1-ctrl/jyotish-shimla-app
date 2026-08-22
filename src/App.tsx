import React, { useState, useEffect } from 'react';
import { BirthDetails, KundaliAnalysisResult } from './types';
import { calculateVedicKundali } from './utils/vedicAstrology';
import { Header } from './components/Header';
import { BirthInputForm } from './components/BirthInputForm';
import { KundaliChart } from './components/KundaliChart';
import { KundaliAnalysisView } from './components/KundaliAnalysisView';
import { GemstoneRemediesView } from './components/GemstoneRemediesView';
import { VedicUpayMantraView } from './components/VedicUpayMantraView';
import { EsotericConsciousnessView } from './components/EsotericConsciousnessView';
import { AskAstrologerView } from './components/AskAstrologerView';
import {
  Sparkles,
  Compass,
  BookOpen,
  Gem,
  Flame,
  MessageSquare,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Sun,
  Moon,
} from 'lucide-react';

const DEFAULT_BIRTH_DETAILS: BirthDetails = {
  name: 'रोहित शर्मा',
  gender: 'male',
  dateOfBirth: '1995-10-18',
  timeOfBirth: '07:45',
  placeOfBirth: 'Shimla, Himachal Pradesh (देवभूमि)',
  latitude: 31.1048,
  longitude: 77.1734,
  timezone: 5.5,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [birthDetails, setBirthDetails] = useState<BirthDetails>(DEFAULT_BIRTH_DETAILS);
  const [kundali, setKundali] = useState<KundaliAnalysisResult | null>(null);
  const [isComputing, setIsComputing] = useState<boolean>(false);
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);

  // Compute initial chart on mount
  useEffect(() => {
    handleCalculate(DEFAULT_BIRTH_DETAILS, false);
  }, []);

  const handleCalculate = async (details: BirthDetails, autoSwitchTab = true) => {
    setIsComputing(true);
    setBirthDetails(details);

    try {
      // 1. Instant mathematical Vedic calculation
      const initialKundali = calculateVedicKundali(details);
      setKundali(initialKundali);

      if (autoSwitchTab) {
        setActiveTab('analysis');
      }

      // 2. Fetch Deep AI Astrological Synthesis from server
      setIsLoadingAI(true);
      const response = await fetch('/api/astrology/full-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          birthDetails: details,
          lagnaRashi: initialKundali.lagnaRashi,
          planets: initialKundali.planets,
          dasha: initialKundali.dasha,
          doshas: initialKundali.doshas,
          transits: initialKundali.transits,
          gemstones: initialKundali.gemstones,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setKundali((prev) => (prev ? { ...prev, aiAnalysisText: data.aiAnalysisText } : prev));
      }
    } catch (error) {
      console.error('Failed to compute full astrology analysis:', error);
    } finally {
      setIsComputing(false);
      setIsLoadingAI(false);
    }
  };

  const handleRefreshAI = async () => {
    if (!kundali) return;
    setIsLoadingAI(true);
    try {
      const response = await fetch('/api/astrology/full-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          birthDetails: kundali.birthDetails,
          lagnaRashi: kundali.lagnaRashi,
          planets: kundali.planets,
          dasha: kundali.dasha,
          doshas: kundali.doshas,
          transits: kundali.transits,
          gemstones: kundali.gemstones,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setKundali((prev) => (prev ? { ...prev, aiAnalysisText: data.aiAnalysisText } : prev));
      }
    } catch (error) {
      console.error('Failed to refresh AI analysis:', error);
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-600 selection:text-white">
      {/* Universal Vedic Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasKundali={!!kundali}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Tab 1: Home / Main Birth Input & Quick Chart */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            {/* Hero Banner with Vedic Aesthetics */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-950 via-stone-900 to-stone-950 border-2 border-amber-600/40 p-6 sm:p-10 shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-amber-500/40 shadow">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>देवभूमि हिमाचल • ज्योतिष शिमला ऑफिशियल AI इंजन</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-orange-200 tracking-wide leading-tight">
                  प्रामाणिक वैदिक ज्योतिष एवं बहुआयामी चेतना प्रणाली
                </h1>

                <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
                  महर्षि पराशर एवं जैमिनी सूत्रों पर आधारित सटीक लग्न, राशि, ग्रह स्थिति, विंशोत्तरी महादशा, गोचर, मांगलिक/साढ़ेसाती विश्लेषण, सटीक रत्न विधान तथा 1D-12D चेतना का मार्गदर्शन प्राप्त करें।
                </p>

                {/* Quick Action Navigation Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('analysis')}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs sm:text-sm font-semibold shadow-lg border border-amber-400/40 flex items-center gap-2 transition-all transform hover:scale-[1.02]"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>कुंडली विश्लेषण देखें</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('gemstones')}
                    className="px-4 py-2.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-amber-200 text-xs sm:text-sm font-medium border border-amber-800/50 flex items-center gap-2 transition-colors"
                  >
                    <Gem className="w-4 h-4 text-amber-400" />
                    <span>रत्न एवं रुद्राक्ष विधान</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('chat')}
                    className="px-4 py-2.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-amber-200 text-xs sm:text-sm font-medium border border-amber-800/50 flex items-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                    <span>AI ज्योतिषी से पूछें</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Birth Details Input Form */}
            <BirthInputForm
              onCalculate={(d) => handleCalculate(d, true)}
              isLoading={isComputing || isLoadingAI}
              initialDetails={birthDetails}
            />

            {/* Active Kundali Chart Preview */}
            {kundali && (
              <div className="space-y-6">
                <KundaliChart kundali={kundali} />
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Free Kundali Analysis Page (Kanya / Rashi / Lagna Analysis) */}
        {activeTab === 'analysis' && kundali && (
          <div className="space-y-8">
            <KundaliChart kundali={kundali} />
            <KundaliAnalysisView
              kundali={kundali}
              onRefreshAI={handleRefreshAI}
              isLoadingAI={isLoadingAI}
            />
          </div>
        )}

        {/* Tab 3: Gemstone & Remedies Page */}
        {activeTab === 'gemstones' && kundali && (
          <GemstoneRemediesView kundali={kundali} />
        )}

        {/* Tab 4: Vedic Upay & Mantra Page */}
        {activeTab === 'remedies' && kundali && (
          <VedicUpayMantraView kundali={kundali} />
        )}

        {/* Tab 5: Esoteric & Consciousness Page (1D-12D) */}
        {activeTab === 'esoteric' && kundali && (
          <EsotericConsciousnessView kundali={kundali} />
        )}

        {/* Tab 6: Interactive Ask AI Astrologer */}
        {activeTab === 'chat' && kundali && (
          <AskAstrologerView kundali={kundali} />
        )}
      </main>

      {/* Vedic Footer */}
      <footer className="bg-stone-950 border-t border-amber-900/40 text-stone-400 text-xs py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-serif font-bold text-sm">
              ॐ
            </div>
            <div>
              <p className="text-amber-200 font-serif font-semibold text-sm">
                ज्योतिष शिमला (Jyotish Shimla) • देवभूमि वैदिक अनुसंधान
              </p>
              <p className="text-stone-400 text-[11px]">
                शुद्ध लहिरी अयनांश गणना • पराशर होरा शास्त्र • जैमिनी उपदेश सूत्र
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href="https://sites.google.com/view/jyotishshimla/home"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-200 font-medium inline-flex items-center gap-1 hover:underline"
            >
              <span>Jyotish Shimla Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="text-stone-700">|</span>
            <span className="text-stone-400">© 2026 Jyotish Shimla AI Engine. All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
