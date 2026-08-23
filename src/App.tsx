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
  name: '',
  gender: 'male',
  dateOfBirth: '',
  timeOfBirth: '12:00',
  placeOfBirth: 'Shimla, Himachal Pradesh (देवभूमि)',
  latitude: 31.1048,
  longitude: 77.1734,
  timezone: 5.5,
};

export default function App() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('home');
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
          <div className="space-y-3">
            {/* Hero Banner with Vedic Bhagwa & Light Aesthetics */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100/90 via-orange-50 to-amber-50 border-2 border-orange-300/80 p-5 sm:p-6 shadow-md shadow-orange-900/5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
                  <span>{t('hero.badge')}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold text-orange-950 tracking-wide leading-tight">
                  {t('hero.title')}
                </h1>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                  {t('hero.desc')}
                </p>

                {/* Primary Fast Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab('birth-chart')}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold shadow-md shadow-orange-600/25 border border-orange-400/40 flex items-center gap-1.5 transition-all transform hover:scale-[1.02]"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{t('hero.btn_kundali')}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('prashna')}
                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-orange-50 text-orange-950 text-xs font-bold border-2 border-orange-200 flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <FileQuestion className="w-3.5 h-3.5 text-orange-600" />
                    <span>{t('hero.btn_prashna')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('chat')}
                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-orange-50 text-orange-950 text-xs font-bold border-2 border-orange-200 flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-orange-600" />
                    <span>{t('hero.btn_chat')}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* All Standalone Main Pages Grid Directory */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-serif font-extrabold text-orange-950 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-orange-600" />
                    <span>{t('directory.title')}</span>
                  </h2>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {t('directory.desc')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {/* 1. Merged Birth Details, Kundali, Navamsha, Analysis, Dasha & Gochar Page */}
                <button
                  type="button"
                  onClick={() => setActiveTab('birth-chart')}
                  className="p-3.5 rounded-xl bg-white border-2 border-orange-200 hover:border-orange-500 shadow-sm hover:shadow transition-all text-left group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-orange-100 group-hover:bg-orange-600 text-orange-600 group-hover:text-white flex items-center justify-center transition-colors mb-2">
                      <Layers className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif font-bold text-orange-950 text-sm group-hover:text-orange-600 transition-colors">
                      {t('tab.birth_chart')}
                    </h3>
                    <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-2">
                      {t('card.birth_chart.desc')}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-orange-100 text-[10px] font-bold text-orange-600">
                    <span>{t('directory.open')}</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* 2. Prashna Kundali Page */}
                <button
                  type="button"
                  onClick={() => setActiveTab('prashna')}
                  className="p-3.5 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-300 hover:border-orange-500 shadow-sm hover:shadow transition-all text-left group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center transition-colors mb-2 shadow-xs">
                      <FileQuestion className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif font-bold text-orange-950 text-sm group-hover:text-orange-600 transition-colors flex items-center gap-1">
                      <span>{t('tab.prashna')}</span>
                    </h3>
                    <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-2">
                      {t('card.prashna.desc')}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-orange-200 text-[10px] font-bold text-orange-600">
                    <span>{t('directory.open')}</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* 3. Kundali Milan */}
                <button
                  type="button"
                  onClick={() => setActiveTab('milan')}
                  className="p-3.5 rounded-xl bg-white border-2 border-orange-200 hover:border-orange-500 shadow-sm hover:shadow transition-all text-left group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-orange-100 group-hover:bg-orange-600 text-orange-600 group-hover:text-white flex items-center justify-center transition-colors mb-2">
                      <HeartHandshake className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif font-bold text-orange-950 text-sm group-hover:text-orange-600 transition-colors">
                      {t('tab.milan')}
                    </h3>
                    <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-2">
                      {t('card.milan.desc')}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-orange-100 text-[10px] font-bold text-orange-600">
                    <span>{t('directory.open')}</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* 4. Panchang & Muhurat */}
                <button
                  type="button"
                  onClick={() => setActiveTab('panchang')}
                  className="p-3.5 rounded-xl bg-white border-2 border-orange-200 hover:border-orange-500 shadow-sm hover:shadow transition-all text-left group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-orange-100 group-hover:bg-orange-600 text-orange-600 group-hover:text-white flex items-center justify-center transition-colors mb-2">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif font-bold text-orange-950 text-sm group-hover:text-orange-600 transition-colors">
                      {t('tab.panchang')}
                    </h3>
                    <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-2">
                      {t('card.panchang.desc')}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-orange-100 text-[10px] font-bold text-orange-600">
                    <span>{t('directory.open')}</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* 5. Dosha Shanti */}
                <button
                  type="button"
                  onClick={() => setActiveTab('dosh')}
                  className="p-3.5 rounded-xl bg-white border-2 border-orange-200 hover:border-orange-500 shadow-sm hover:shadow transition-all text-left group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-orange-100 group-hover:bg-orange-600 text-orange-600 group-hover:text-white flex items-center justify-center transition-colors mb-2">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif font-bold text-orange-950 text-sm group-hover:text-orange-600 transition-colors">
                      {t('tab.dosh')}
                    </h3>
                    <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-2">
                      {t('card.dosh.desc')}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-orange-100 text-[10px] font-bold text-orange-600">
                    <span>{t('directory.open')}</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* 6. Gemstones */}
                <button
                  type="button"
                  onClick={() => setActiveTab('gemstones')}
                  className="p-3.5 rounded-xl bg-white border-2 border-orange-200 hover:border-orange-500 shadow-sm hover:shadow transition-all text-left group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-orange-100 group-hover:bg-orange-600 text-orange-600 group-hover:text-white flex items-center justify-center transition-colors mb-2">
                      <Gem className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif font-bold text-orange-950 text-sm group-hover:text-orange-600 transition-colors">
                      {t('tab.gemstones')}
                    </h3>
                    <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-2">
                      {t('card.gemstones.desc')}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-orange-100 text-[10px] font-bold text-orange-600">
                    <span>{t('directory.open')}</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* 7. Vedic Upay */}
                <button
                  type="button"
                  onClick={() => setActiveTab('remedies')}
                  className="p-3.5 rounded-xl bg-white border-2 border-orange-200 hover:border-orange-500 shadow-sm hover:shadow transition-all text-left group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-orange-100 group-hover:bg-orange-600 text-orange-600 group-hover:text-white flex items-center justify-center transition-colors mb-2">
                      <Flame className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif font-bold text-orange-950 text-sm group-hover:text-orange-600 transition-colors">
                      {t('tab.remedies')}
                    </h3>
                    <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-2">
                      {t('card.remedies.desc')}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-orange-100 text-[10px] font-bold text-orange-600">
                    <span>{t('directory.open')}</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* 8. Vastu Shastra */}
                <button
                  type="button"
                  onClick={() => setActiveTab('vastu')}
                  className="p-3.5 rounded-xl bg-white border-2 border-orange-200 hover:border-orange-500 shadow-sm hover:shadow transition-all text-left group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-orange-100 group-hover:bg-orange-600 text-orange-600 group-hover:text-white flex items-center justify-center transition-colors mb-2">
                      <Home className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif font-bold text-orange-950 text-sm group-hover:text-orange-600 transition-colors">
                      {t('tab.vastu')}
                    </h3>
                    <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-2">
                      {t('card.vastu.desc')}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-orange-100 text-[10px] font-bold text-orange-600">
                    <span>{t('directory.open')}</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* 9. Esoteric Consciousness */}
                <button
                  type="button"
                  onClick={() => setActiveTab('esoteric')}
                  className="p-3.5 rounded-xl bg-white border-2 border-orange-200 hover:border-orange-500 shadow-sm hover:shadow transition-all text-left group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-orange-100 group-hover:bg-orange-600 text-orange-600 group-hover:text-white flex items-center justify-center transition-colors mb-2">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif font-bold text-orange-950 text-sm group-hover:text-orange-600 transition-colors">
                      {t('tab.esoteric')}
                    </h3>
                    <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-2">
                      {t('card.esoteric.desc')}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-orange-100 text-[10px] font-bold text-orange-600">
                    <span>{t('directory.open')}</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* 10. Ask AI Astrologer */}
                <button
                  type="button"
                  onClick={() => setActiveTab('chat')}
                  className="p-3.5 rounded-xl bg-white border-2 border-orange-200 hover:border-orange-500 shadow-sm hover:shadow transition-all text-left group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-orange-100 group-hover:bg-orange-600 text-orange-600 group-hover:text-white flex items-center justify-center transition-colors mb-2">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif font-bold text-orange-950 text-sm group-hover:text-orange-600 transition-colors">
                      {t('tab.chat')}
                    </h3>
                    <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-2">
                      {t('card.chat.desc')}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-orange-100 text-[10px] font-bold text-orange-600">
                    <span>{t('directory.open')}</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* 11. Official Portal */}
                <button
                  type="button"
                  onClick={() => setActiveTab('portal')}
                  className="p-3.5 rounded-xl bg-white border-2 border-orange-200 hover:border-orange-500 shadow-sm hover:shadow transition-all text-left group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-orange-100 group-hover:bg-orange-600 text-orange-600 group-hover:text-white flex items-center justify-center transition-colors mb-2">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif font-bold text-orange-950 text-sm group-hover:text-orange-600 transition-colors">
                      {t('tab.portal')}
                    </h3>
                    <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-2">
                      {t('card.portal.desc')}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-orange-100 text-[10px] font-bold text-orange-600">
                    <span>{t('directory.open')}</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* 12. Page Editor */}
                <button
                  type="button"
                  onClick={() => setActiveTab('editor')}
                  className="p-3.5 rounded-xl bg-white border-2 border-orange-200 hover:border-orange-500 shadow-sm hover:shadow transition-all text-left group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-orange-100 group-hover:bg-orange-600 text-orange-600 group-hover:text-white flex items-center justify-center transition-colors mb-2">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif font-bold text-orange-950 text-sm group-hover:text-orange-600 transition-colors">
                      {t('tab.editor')}
                    </h3>
                    <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-2">
                      {t('card.editor.desc')}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-orange-100 text-[10px] font-bold text-orange-600">
                    <span>{t('directory.open')}</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            </div>

            {/* Jyotish Shimla Official Portal Spotlight Card */}
            <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 rounded-3xl p-5 sm:p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 border-2 border-amber-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white text-orange-600 font-serif font-extrabold text-2xl flex items-center justify-center shadow-md shrink-0">
                  ॐ
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-white/20 text-white border border-white/40 px-2.5 py-0.5 rounded-full text-[11px] font-semibold mb-1">
                    <Sparkles className="w-3 h-3 text-amber-200" /> {t('app.tagline')}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white">
                    {t('app.title')} • {t('app.subtitle')}
                  </h3>
                  <p className="text-xs text-amber-100 mt-0.5 font-medium">
                    {t('hero.desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTab('portal')}
                  className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold border border-white/50 transition-colors"
                >
                  {t('tab.portal')}
                </button>
                <a
                  href="https://sites.google.com/view/jyotishshimla/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white hover:bg-orange-50 text-orange-950 text-xs font-bold shadow flex items-center gap-1.5 transition-transform hover:scale-105"
                >
                  <span>{t('app.official_website')}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-orange-600" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Merged Tab 2: Birth Details Input, Kundali Charts, Analysis, Dasha & Gochar Matrix */}
        {(activeTab === 'birth-chart' || activeTab === 'birth-input' || activeTab === 'chart' || activeTab === 'dasha' || activeTab === 'analysis') && (
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
      <footer className="bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 border-t-2 border-orange-300 text-orange-950 text-xs py-7 mt-12 shadow-sm">
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
    </div>
  );
}
