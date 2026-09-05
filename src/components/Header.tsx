import React from 'react';
import {
  Sparkles,
  Compass,
  Gem,
  Flame,
  MessageSquare,
  ExternalLink,
  ShieldCheck,
  HeartHandshake,
  Calendar,
  ShieldAlert,
  Home,
  Code2,
  Layers,
  FileQuestion,
  Languages,
} from 'lucide-react';
import { useLanguage, AppLanguage } from '../context/LanguageContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hasKundali: boolean;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, hasKundali }) => {
  const { language, setLanguage, t } = useLanguage();

  const tabs = [
    { id: 'home', label: t('tab.home'), icon: Compass },
    { id: 'panchang', label: t('tab.panchang'), icon: Calendar },
    { id: 'birth-chart', label: t('tab.birth_chart'), icon: Layers },
    { id: 'prashna', label: t('tab.prashna'), icon: FileQuestion },
    { id: 'milan', label: t('tab.milan'), icon: HeartHandshake },
    { id: 'dosh', label: t('tab.dosh'), icon: ShieldAlert },
    { id: 'gemstones', label: t('tab.gemstones'), icon: Gem },
    { id: 'remedies', label: t('tab.remedies'), icon: Flame },
    { id: 'vastu', label: t('tab.vastu'), icon: Home },
    { id: 'esoteric', label: t('tab.esoteric'), icon: Sparkles },
    { id: 'chat', label: t('tab.chat'), icon: MessageSquare },
    { id: 'portal', label: t('tab.portal'), icon: ShieldCheck },
    { id: 'editor', label: t('tab.editor'), icon: Code2 },
  ];

  const languageOptions: { id: AppLanguage; label: string; short: string }[] = [
    { id: 'hi', label: 'हिन्दी', short: 'हिं' },
    { id: 'en', label: 'English', short: 'Eng' },
  ];

  return (
    <header className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white border-b border-orange-400 shadow-xs sticky top-0 z-50">
      {/* Top Saffron / Bhagwa Strip */}
      <div className="bg-amber-100 border-b border-amber-200 px-3 py-0.5 text-[11px] text-orange-950 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-orange-600 text-white px-2 py-0.2 rounded-full text-[10px] font-semibold border border-orange-500">
            <Sparkles className="w-2.5 h-2.5 text-amber-200 animate-pulse" /> {t('app.tagline')}
          </span>
          <span className="hidden sm:inline text-amber-400">|</span>
          <span className="hidden sm:inline text-orange-900 font-medium text-[10px]">
            {t('app.principles')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Selector Provision */}
          <div className="flex items-center bg-white rounded-md p-0.5 border border-orange-300 shadow-2xs">
            <Languages className="w-3 h-3 text-orange-700 mx-1 shrink-0" />
            <div className="flex items-center gap-0.5">
              {languageOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setLanguage(opt.id)}
                  title={opt.label}
                  className={`px-1.5 py-0.2 rounded text-[10px] font-bold transition-all ${
                    language === opt.id
                      ? 'bg-orange-600 text-white shadow-2xs'
                      : 'text-orange-950 hover:bg-orange-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <a
            href="https://sites.google.com/view/jyotishshimla/home"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-orange-800 hover:text-orange-950 transition-colors font-bold hover:underline text-[10px]"
          >
            <span>{t('app.official_website')}</span>
            <ExternalLink className="w-2.5 h-2.5 text-orange-700" />
          </a>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-3 py-1.5 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        {/* Brand identity */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="relative w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-xs border border-amber-200 shrink-0">
            <span className="text-lg font-serif font-bold text-orange-600 select-none">ॐ</span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm sm:text-base font-serif font-extrabold tracking-wide text-white drop-shadow-2xs">
                {t('app.title')}
              </h1>
              <span className="bg-amber-300 text-orange-950 text-[9px] uppercase font-extrabold tracking-wider px-1.5 py-0.2 rounded shadow-2xs">
                AI
              </span>
            </div>
            <p className="text-[10px] text-amber-100 font-medium leading-tight">
              {t('app.subtitle')}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive =
              activeTab === tab.id ||
              (tab.id === 'birth-chart' && (activeTab === 'birth-input' || activeTab === 'chart' || activeTab === 'dasha' || activeTab === 'analysis'));
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-orange-950 shadow-sm border border-amber-300 font-bold'
                    : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
                }`}
              >
                <Icon className={`w-3 h-3 ${isActive ? 'text-orange-600' : 'text-amber-100'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

