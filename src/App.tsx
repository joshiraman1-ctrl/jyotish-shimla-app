import React, { useState, useEffect } from 'react';
import { BirthDetails, KundaliAnalysisResult } from './types';
import { calculateVedicKundali } from './utils/vedicAstrology';
import { Header } from './components/Header';
import { BirthInputForm } from './components/BirthInputForm';
import { KundaliChart } from './components/KundaliChart';
import { DashaGocharView } from './components/DashaGocharView';
import { KundaliAnalysisView } from './components/KundaliAnalysisView';
import { PrashanKundaliView } from './components/PrashanKundaliView';
import { GemstoneRemediesView } from './components/GemstoneRemediesView';
import { VedicUpayMantraView } from './components/VedicUpayMantraView';
import { EsotericConsciousnessView } from './components/EsotericConsciousnessView';
import { AskAstrologerView } from './components/AskAstrologerView';
import { JyotishShimlaPortalView } from './components/JyotishShimlaPortalView';
import { KundaliMilanView } from './components/KundaliMilanView';
import { PanchangMuhuratView } from './components/PanchangMuhuratView';
import { DoshNivaranView } from './components/DoshNivaranView';
import { VastuShastraView } from './components/VastuShastraView';
import { CustomPageEditorView } from './components/CustomPageEditorView';
import { JanmKundaliPageView } from './components/JanmKundaliPageView';
import { HomeView } from './components/HomeView';
import { useLanguage } from './context/LanguageContext';
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
  HeartHandshake,
  Calendar,
  ShieldAlert,
  Home,
  Code2,
  Layers,
  Clock,
  UserPlus,
  Zap,
  FileQuestion,
} from 'lucide-react';

const DEFAULT_BIRTH_DETAILS: BirthDetails = {
  name: 'Kushagar',
  gender: 'male',
  dateOfBirth: '1997-01-22',
  timeOfBirth: '20:56',
  placeOfBirth: 'शिमला, हिमाचल प्रदेश (Shimla)',
  latitude: 31.1048,
  longitude: 77.1734,
  timezone: 5.5,
};

export default function App() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('birth-chart');
  const [birthDetails, setBirthDetails] = useState<BirthDetails>(DEFAULT_BIRTH_DETAILS);
  const [initialSubView, setInitialSubView] = useState<'analysis' | 'calculations'>('analysis');
  const [kundali, setKundali] = useState<KundaliAnalysisResult | null>(null);
  const [isComputing, setIsComputing] = useState<boolean>(false);
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);

  // Compute initial chart on mount only if dateOfBirth is provided
  useEffect(() => {
    if (DEFAULT_BIRTH_DETAILS.dateOfBirth) {
      handleCalculate(DEFAULT_BIRTH_DETAILS, 'analysis');
    }
  }, []);

  const handleCalculate = async (details: BirthDetails, viewMode: 'analysis' | 'calculations' = 'analysis') => {
    setIsComputing(true);
    setBirthDetails(details);
    setInitialSubView(viewMode);
    setActiveTab('birth-chart');

    try {
      // 1. Instant mathematical Vedic calculation
      const initialKundali = calculateVedicKundali(details);
      setKundali(initialKundali);

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
        const text = data.aiAnalysisText || data.analysis;
        if (text) {
          setKundali((prev) => (prev ? { ...prev, aiAnalysisText: text } : prev));
        }
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
        const text = data.aiAnalysisText || data.analysis;
        if (text) {
          setKundali((prev) => (prev ? { ...prev, aiAnalysisText: text } : prev));
        }
      }
    } catch (error) {
      console.error('Failed to refresh AI analysis:', error);
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/70 via-orange-50/40 to-amber-50/70 text-stone-900 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Universal Vedic Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasKundali={!!kundali}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-3 space-y-3">
        {/* Tab 1: Home / Main Vedic Dashboard */}
        {activeTab === 'home' && (
          <HomeView setActiveTab={setActiveTab} />
        )}

        {/* Tab 3: Janm Kundali Page (Direct HTML Code Integration) */}
        {activeTab === 'birth-chart' && (
          <JanmKundaliPageView />
        )}

        {/* Other Tabs */}
        {(activeTab === 'birth-input' || activeTab === 'chart' || activeTab === 'dasha' || activeTab === 'analysis') && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-amber-100 via-orange-50 to-white rounded-3xl border-2 border-orange-300 p-6 sm:p-8 shadow-lg shadow-orange-950/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                  <Layers className="w-3.5 h-3.5 text-amber-200" /> {t('matrix.tab_all')}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-orange-950">
                {t('matrix.title')}
              </h2>
              <p className="text-xs sm:text-sm text-stone-700 mt-1 font-medium">
                {t('matrix.desc')}
              </p>
            </div>

            {/* Birth Details Input Form */}
            <BirthInputForm
              onCalculate={(d, mode) => handleCalculate(d, mode)}
              isLoading={isComputing || isLoadingAI}
              initialDetails={birthDetails}
            />

            {/* Complete Kundali Chart, Navamsha, Analysis, Dasha & Gochar Matrix */}
            {kundali && (
              <div className="pt-2">
                <KundaliChart
                  kundali={kundali}
                  onRefreshAI={handleRefreshAI}
                  isLoadingAI={isLoadingAI}
                  initialSubView={initialSubView}
                />
              </div>
            )}
          </div>
        )}

        {/* Tab: Dedicated Prashan Kundali & Horary Answer View */}
        {activeTab === 'prashna' && <PrashanKundaliView />}

        {/* Tab 6: 36 Guna Milan & Kundali Matching */}
        {activeTab === 'milan' && <KundaliMilanView />}

        {/* Tab 7: Daily Vedic Panchang & Shubh Muhurat */}
        {activeTab === 'panchang' && <PanchangMuhuratView />}

        {/* Tab 8: Vedic Dosha Analysis & Shanti */}
        {activeTab === 'dosh' && <DoshNivaranView />}

        {/* Tab 9: Gemstone & Remedies Page */}
        {activeTab === 'gemstones' && kundali && (
          <GemstoneRemediesView kundali={kundali} />
        )}

        {/* Tab 10: Vedic Upay & Mantra Page */}
        {activeTab === 'remedies' && kundali && (
          <VedicUpayMantraView kundali={kundali} />
        )}

        {/* Tab 11: Vedic Vastu Shastra Page */}
        {activeTab === 'vastu' && <VastuShastraView />}

        {/* Tab 12: Esoteric & Consciousness Page (1D-12D) */}
        {activeTab === 'esoteric' && kundali && (
          <EsotericConsciousnessView kundali={kundali} />
        )}

        {/* Tab 13: Interactive Ask AI Astrologer */}
        {activeTab === 'chat' && kundali && (
          <AskAstrologerView kundali={kundali} />
        )}

        {/* Tab 14: Jyotish Shimla Official Services & Guidance */}
        {activeTab === 'portal' && (
          <JyotishShimlaPortalView
            onOpenAnalysis={() => setActiveTab('analysis')}
            onOpenGemstones={() => setActiveTab('gemstones')}
            onOpenRemedies={() => setActiveTab('remedies')}
            onOpenChat={() => setActiveTab('chat')}
          />
        )}

        {/* Tab 15: Custom Page & Code Editor */}
        {activeTab === 'editor' && <CustomPageEditorView />}
      </main>

      {/* Light Bhagwa / Saffron Footer */}
      <footer className="bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 border-t-2 border-orange-300 text-orange-950 text-xs py-7 mt-12 mb-16 md:mb-0 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-600 border border-orange-400 flex items-center justify-center text-white font-serif font-bold text-base shadow-sm">
              ॐ
            </div>
            <div>
              <p className="text-orange-950 font-serif font-bold text-sm">
                {t('app.title')} • {t('app.tagline')}
              </p>
              <p className="text-stone-600 text-[11px] font-medium">
                {t('app.principles')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href="https://sites.google.com/view/jyotishshimla/home"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-800 hover:text-orange-950 font-bold inline-flex items-center gap-1 hover:underline"
            >
              <span>{t('app.official_website')}</span>
              <ExternalLink className="w-3.5 h-3.5 text-orange-700" />
            </a>
            <span className="text-orange-300">|</span>
            <span className="text-stone-600 font-medium">© 2026 Jyotish Shimla. All Rights Reserved.</span>
          </div>
        </div>
      </footer>

      {/* Material Design 3 Fixed Bottom Navigation Bar for Mobile */}
      <nav aria-label="Mobile Bottom Navigation" className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-orange-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-50 px-2 py-1.5 flex items-center justify-around">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'home'
              ? 'text-orange-600 font-bold bg-orange-50 scale-105'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-medium">होम</span>
        </button>

        <button
          onClick={() => setActiveTab('birth-chart')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'birth-chart'
              ? 'text-orange-600 font-bold bg-orange-50 scale-105'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Sparkles className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-medium">कुंडली</span>
        </button>

        <button
          onClick={() => setActiveTab('panchang')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'panchang'
              ? 'text-orange-600 font-bold bg-orange-50 scale-105'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Calendar className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-medium">पंचांग</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'chat'
              ? 'text-orange-600 font-bold bg-orange-50 scale-105'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <MessageSquare className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-medium">ज्योतिषी</span>
        </button>
      </nav>
    </div>
  );
}
