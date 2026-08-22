import React from 'react';
import { Sparkles, Moon, Sun, Compass, Gem, Flame, BookOpen, MessageSquare, ExternalLink, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hasKundali: boolean;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, hasKundali }) => {
  const tabs = [
    { id: 'home', label: 'मुख्य पृष्ठ', icon: Compass, sub: 'Birth Chart' },
    { id: 'analysis', label: 'कुंडली विश्लेषण', icon: BookOpen, sub: 'Kundali Analysis' },
    { id: 'gemstones', label: 'रत्न एवं उपचार', icon: Gem, sub: 'Gemstones' },
    { id: 'remedies', label: 'वैदिक उपाय व मंत्र', icon: Flame, sub: 'Vedic Upay' },
    { id: 'esoteric', label: 'गूढ़ चेतना (1D-12D)', icon: Sparkles, sub: 'Esoteric 1D-12D' },
    { id: 'chat', label: 'AI ज्योतिषी संवाद', icon: MessageSquare, sub: 'Ask Astrologer' },
  ];

  return (
    <header className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-amber-50 border-b border-amber-800/40 shadow-xl sticky top-0 z-50">
      {/* Top Banner with Jyotish Shimla link and auspicious tithi */}
      <div className="bg-amber-950/80 border-b border-amber-800/30 px-4 py-1.5 text-xs text-amber-200/90 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded-full text-[11px] font-medium border border-amber-700/50">
            <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" /> देवभूमि हिमाचल • ज्योतिष शिमला
          </span>
          <span className="hidden sm:inline text-amber-300/70">|</span>
          <span className="hidden sm:inline text-amber-200/80">
            वैदिक पराशर सिद्धांत • महर्षि जैमिनी सूत्र • प्रामाणिक गणना
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://sites.google.com/view/jyotishshimla/home"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-100 transition-colors font-medium hover:underline text-[11px]"
          >
            <span>ऑफिशियल वेबसाइट Jyotish Shimla</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-800 flex items-center justify-center shadow-lg border border-amber-400/40 shrink-0">
            <span className="text-2xl font-serif font-bold text-amber-950 select-none">ॐ</span>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-stone-900 flex items-center justify-center">
              <ShieldCheck className="w-2.5 h-2.5 text-white" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-orange-200">
                ज्योतिष शिमला
              </h1>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border border-amber-500/40">
                AI Engine
              </span>
            </div>
            <p className="text-xs text-amber-300/80 font-medium">
              Vedic Astrology & Multi-Dimensional Consciousness System
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-thin scrollbar-thumb-amber-700">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md border border-amber-400/30'
                    : 'bg-stone-800/60 hover:bg-stone-800 text-amber-200/90 hover:text-white border border-amber-900/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-200' : 'text-amber-400'}`} />
                <div className="flex flex-col items-start text-left">
                  <span>{tab.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
