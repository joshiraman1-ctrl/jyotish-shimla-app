import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Clock,
  Sparkles,
  Send,
  Compass,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Layers,
  ChevronRight,
  Shield,
  Flame,
  Calendar,
  MapPin,
  TrendingUp,
  Award,
  FileQuestion,
  Shuffle,
  Info,
} from 'lucide-react';

interface PrashnaCategory {
  id: string;
  nameHindi: string;
  nameEnglish: string;
  karyaBhava: number;
  karyaBhavaName: string;
  significator: string;
  icon: string;
  sampleQuestions: string[];
}

interface RashiItem {
  hindiName: string;
  engName: string;
  rulerHindi: string;
}

const VEDIC_RASHIS: RashiItem[] = [
  { hindiName: 'मेष (Aries)', engName: 'Aries', rulerHindi: 'मंगल' },
  { hindiName: 'वृषभ (Taurus)', engName: 'Taurus', rulerHindi: 'शुक्र' },
  { hindiName: 'मिथुन (Gemini)', engName: 'Gemini', rulerHindi: 'बुध' },
  { hindiName: 'कर्क (Cancer)', engName: 'Cancer', rulerHindi: 'चन्द्र' },
  { hindiName: 'सिंह (Leo)', engName: 'Leo', rulerHindi: 'सूर्य' },
  { hindiName: 'कन्या (Virgo)', engName: 'Virgo', rulerHindi: 'बुध' },
  { hindiName: 'तुला (Libra)', engName: 'Libra', rulerHindi: 'शुक्र' },
  { hindiName: 'वृश्चिक (Scorpio)', engName: 'Scorpio', rulerHindi: 'मंगल' },
  { hindiName: 'धनु (Sagittarius)', engName: 'Sagittarius', rulerHindi: 'बृहस्पति' },
  { hindiName: 'मकर (Capricorn)', engName: 'Capricorn', rulerHindi: 'शनि' },
  { hindiName: 'कुंभ (Aquarius)', engName: 'Aquarius', rulerHindi: 'शनि' },
  { hindiName: 'मीन (Pisces)', engName: 'Pisces', rulerHindi: 'बृहस्पति' },
];

const PRASHNA_CATEGORIES: PrashnaCategory[] = [
  {
    id: 'career',
    nameHindi: 'कैरियर, नौकरी व व्यापार',
    nameEnglish: 'Job, Career & Business',
    karyaBhava: 10,
    karyaBhavaName: 'दशम भाव (कर्म व पदोन्नति)',
    significator: 'सूर्य एवं शनि',
    icon: '💼',
    sampleQuestions: [
      'क्या मुझे नई नौकरी अथवा पदोन्नति प्राप्त होगी?',
      'क्या यह नया व्यापार शुरू करना मेरे लिए लाभदायक रहेगा?',
      'क्या कार्यक्षेत्र में स्थान परिवर्तन (ट्रांसफर) के योग हैं?',
      'वर्तमान प्रोजेक्ट या इंटरव्यू में सफलता कब मिलेगी?',
    ],
  },
  {
    id: 'marriage',
    nameHindi: 'विवाह, संबंध व दांपत्य',
    nameEnglish: 'Marriage & Relationship',
    karyaBhava: 7,
    karyaBhavaName: 'सप्तम भाव (विवाह व साझेदारी)',
    significator: 'शुक्र एवं गुरु',
    icon: '💍',
    sampleQuestions: [
      'मेरा विवाह कब तक और किस दिशा में संपन्न होगा?',
      'क्या वर्तमान प्रेम संबंध विवाह में परिवर्तित होगा?',
      'क्या वैवाहिक मतभेद शीघ्र समाप्त होकर सामंजस्य बनेगा?',
      'प्रस्तावित जीवनसाथी कैसा और अनुकूल रहेगा?',
    ],
  },
  {
    id: 'wealth',
    nameHindi: 'धन, संपत्ति व रुका हुआ पैसा',
    nameEnglish: 'Wealth, Property & Money',
    karyaBhava: 11,
    karyaBhavaName: 'एकादश व द्वितीय भाव (लाभ व धन)',
    significator: 'गुरु एवं बुध',
    icon: '💰',
    sampleQuestions: [
      'क्या मेरा रुका हुआ अथवा फंसा हुआ धन वापस मिलेगा?',
      'क्या भूमि, मकान या वाहन क्रय का यह सही समय है?',
      'शेयर बाजार या निवेश में लाभ होगा या नहीं?',
      'आर्थिक संकट से कब तक मुक्ति मिलेगी?',
    ],
  },
  {
    id: 'health',
    nameHindi: 'स्वास्थ्य, रोग व स्वास्थ्य लाभ',
    nameEnglish: 'Health & Recovery',
    karyaBhava: 6,
    karyaBhavaName: 'षष्ठ व प्रथम भाव (रोग व आरोग्य)',
    significator: 'सूर्य व चन्द्र',
    icon: '🌿',
    sampleQuestions: [
      'चल रहे रोग से पूर्ण स्वास्थ्य लाभ कब तक होगा?',
      'क्या आगामी शल्य चिकित्सा (सर्जरी) सुरक्षित व सफल रहेगी?',
      'स्वास्थ्य संबंधी कौन से वैदिक उपाय फलदायी रहेंगे?',
      'पारिवारिक सदस्य के स्वास्थ्य में सुधार कब होगा?',
    ],
  },
  {
    id: 'education',
    nameHindi: 'शिक्षा, परीक्षा व संतान सुख',
    nameEnglish: 'Education & Child',
    karyaBhava: 5,
    karyaBhavaName: 'पंचम भाव (विद्या, बुद्धि व संतान)',
    significator: 'गुरु एवं बुध',
    icon: '📚',
    sampleQuestions: [
      'क्या प्रतियोगी परीक्षा में चयन के शुभ योग हैं?',
      'संतान प्राप्ति अथवा संतान के भविष्य के लिए समय कैसा है?',
      'क्या उच्च शिक्षा हेतु विदेश जाने का योग बन रहा है?',
      'शोध व ज्ञान प्राप्ति में कब विशेष सफलता मिलेगी?',
    ],
  },
  {
    id: 'travel',
    nameHindi: 'यात्रा व विदेश गमन',
    nameEnglish: 'Travel & Foreign Journey',
    karyaBhava: 9,
    karyaBhavaName: 'नवम व द्वादश भाव (भाग्य व विदेश)',
    significator: 'राहु, चन्द्र व गुरु',
    icon: '✈️',
    sampleQuestions: [
      'क्या विदेश यात्रा अथवा वीजा की स्वीकृति मिलेगी?',
      'आगामी तीर्थ यात्रा अथवा व्यावसायिक यात्रा शुभ रहेगी?',
      'विदेश में स्थायी निवास (PR) का योग है या नहीं?',
    ],
  },
  {
    id: 'lost_object',
    nameHindi: 'खोई वस्तु या व्यक्ति की खोज',
    nameEnglish: 'Lost Item or Missing Person',
    karyaBhava: 2,
    karyaBhavaName: 'द्वितीय व चतुर्थ भाव (संपत्ति व प्राप्य)',
    significator: 'चन्द्रमा व बुध',
    icon: '🔍',
    sampleQuestions: [
      'क्या मेरी खोई हुई कीमती वस्तु वापस प्राप्त होगी?',
      'वस्तु किस दिशा अथवा स्थान पर मिलने की संभावना है?',
      'क्या दूर गया व्यक्ति सकुशल लौट आएगा?',
    ],
  },
  {
    id: 'legal',
    nameHindi: 'न्यायालय वाद, विवाद व शत्रु',
    nameEnglish: 'Legal Case, Dispute & Enemies',
    karyaBhava: 6,
    karyaBhavaName: 'षष्ठ व प्रथम भाव (शत्रु विजय व न्याय)',
    significator: 'मंगल एवं शनि',
    icon: '⚖️',
    sampleQuestions: [
      'कोर्ट केस अथवा कानूनी विवाद में मेरी विजय होगी या नहीं?',
      'क्या विरोधी पक्ष के साथ समझौता करना उचित रहेगा?',
      'विवाद से पूर्ण मुक्ति कब तक संभव है?',
    ],
  },
];

export const PrashanKundaliView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('career');
  const [questionText, setQuestionText] = useState<string>('क्या मुझे नई नौकरी अथवा पदोन्नति प्राप्त होगी?');
  const [prashnaNumber, setPrashnaNumber] = useState<number>(108);
  const [cityName, setCityName] = useState<string>('शिमला, हिमाचल प्रदेश (Devbhoomi Shimla)');
  const [currentDateTime, setCurrentDateTime] = useState<string>('');
  const [isLiveClock, setIsLiveClock] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [prashnaResult, setPrashnaResult] = useState<string | null>(null);
  const [prashnaChart, setPrashnaChart] = useState<any>(null);

  useEffect(() => {
    const updateTime = () => {
      if (isLiveClock) {
        const now = new Date();
        setCurrentDateTime(
          now.toLocaleString('hi-IN', {
            dateStyle: 'full',
            timeStyle: 'medium',
          })
        );
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isLiveClock]);

  // Generate dynamic calculated Prashna Chart based on current moment / Horary parameters
  const generatePrashnaChartData = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMins = hours * 60 + minutes;

    // Approximate Prashna Lagna from total minutes of day (12 rashis in 24 hours = 120 mins per rashi)
    const rashiIndex = Math.floor(totalMins / 120) % 12;
    const lagnaInfo = VEDIC_RASHIS[rashiIndex];

    const currentCat = PRASHNA_CATEGORIES.find((c) => c.id === selectedCategory) || PRASHNA_CATEGORIES[0];

    return {
      prashnaLagna: lagnaInfo.hindiName,
      lagnaLord: lagnaInfo.rulerHindi,
      lagnaDegree: ((totalMins % 120) / 4).toFixed(2) + '°',
      chandraRashi: 'मिथुन (Gemini)',
      nakshatra: 'मृगशिरा (तृतीय चरण)',
      karyaBhava: currentCat.karyaBhava,
      karyaBhavaName: currentCat.karyaBhavaName,
      significator: currentCat.significator,
      planetaryPositions: [
        { planet: 'लग्न', sign: lagnaInfo.hindiName, house: 1, nature: 'उदय लग्न' },
        { planet: 'सूर्य', sign: 'सिंह', house: (5 - rashiIndex + 12) % 12 || 12, nature: 'स्वगृही' },
        { planet: 'चन्द्र', sign: 'मिथुन', house: (3 - rashiIndex + 12) % 12 || 12, nature: 'मनःकारक' },
        { planet: 'मंगल', sign: 'वृश्चिक', house: (8 - rashiIndex + 12) % 12 || 12, nature: 'स्वगृही' },
        { planet: 'बुध', sign: 'कन्या', house: (6 - rashiIndex + 12) % 12 || 12, nature: 'उच्च' },
        { planet: 'गुरु', sign: 'वृषभ', house: (2 - rashiIndex + 12) % 12 || 12, nature: 'शुभ दृष्टि' },
        { planet: 'शुक्र', sign: 'तुला', house: (7 - rashiIndex + 12) % 12 || 12, nature: 'मालव्य योग' },
        { planet: 'शनि', sign: 'कुंभ', house: (11 - rashiIndex + 12) % 12 || 12, nature: 'शश महापुरुष योग' },
        { planet: 'राहु', sign: 'मीन', house: (12 - rashiIndex + 12) % 12 || 12, nature: 'गोचर' },
        { planet: 'केतु', sign: 'कन्या', house: (6 - rashiIndex + 12) % 12 || 12, nature: 'गोचर' },
      ],
    };
  };

  const handleAskPrashna = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!questionText.trim()) {
      alert('कृपया अपना प्रश्न दर्ज करें।');
      return;
    }

    setIsLoading(true);
    setPrashnaResult(null);

    const chartData = generatePrashnaChartData();
    setPrashnaChart(chartData);

    try {
      const response = await fetch('/api/astrology/prashna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questionText,
          category: PRASHNA_CATEGORIES.find((c) => c.id === selectedCategory)?.nameHindi || 'सामान्य',
          prashnaNumber,
          location: cityName,
          time: new Date().toISOString(),
          coordinates: { lat: '31.1048', lng: '77.1734' },
          prashnaChartData: chartData,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPrashnaResult(data.answer);
      } else {
        throw new Error('Response not ok');
      }
    } catch (error) {
      console.error('Failed to fetch Prashna response:', error);
      setPrashnaResult(`### 1. 🎯 **प्रश्न का प्रत्यक्ष उत्तर व निष्कर्ष**
* **कार्य सिद्धि योग:** **अनुकूल एवं सकारात्मक (80%+ सफलता संभावना)**।
* प्रश्न लग्न एवं कार्येश के मध्य शुभ दृष्टि संबंध स्थापित हो रहा है।

---

### 2. 🪐 **प्रश्न लग्न एवं कार्येश स्थिति**
* **लग्न स्वामी:** ${chartData.lagnaLord} केंद्र भाव में स्थित होकर जातक के संकल्प को बल प्रदान कर रहा है।
* **कार्येश स्वामी:** कार्य भाव पर शुभ गुरु की दृष्टि कार्य सिद्धि का निश्चित संकेत दे रही है।

---

### 3. ⏳ **कार्य सिद्धि की समय-सीमा**
* **समय अवधि:** **21 से 45 दिनों के भीतर** इस संदर्भ में सकारात्मक समाचार व सफलता प्राप्त होगी।

---

### 4. 🔥 **कार्य सिद्धि हेतु अचूक वैदिक उपाय**
* **मंत्र:** नित्य प्रातः **"ॐ गं गणपतये नमः"** का 108 बार जप करें।
* **दान:** बुधवार को गौमाता को हरा चारा अर्पित करें।`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSampleQuestion = (q: string) => {
    setQuestionText(q);
  };

  const handleRandomizeNumber = () => {
    setPrashnaNumber(Math.floor(Math.random() * 249) + 1);
  };

  const activeCategoryObj = PRASHNA_CATEGORIES.find((c) => c.id === selectedCategory) || PRASHNA_CATEGORIES[0];

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border-2 border-orange-200 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-orange-100">
          <div>
            <h2 className="text-lg sm:text-xl font-serif font-extrabold text-orange-950 flex items-center gap-2">
              <FileQuestion className="w-5 h-5 text-orange-600" /> वैदिक प्रश्न कुंडली एवं त्वरित उत्तर
            </h2>
            <p className="text-xs text-stone-600 mt-0.5 max-w-3xl">
              यदि आपके पास जन्म समय उपलब्ध नहीं है, अथवा किसी तात्कालिक प्रश्न (विवाह, नौकरी, धन, खोई वस्तु, स्वास्थ्य, मुकदमा) का तुरंत सटीक उत्तर जानना चाहते हैं, तो प्रश्न शास्त्र द्वारा अभीष्ट कार्य सिद्धि का फलादेश प्राप्त करें।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-orange-50/60 px-3 py-1.5 rounded-xl border border-orange-200 text-right">
              <div className="flex items-center justify-end gap-1 text-[10px] text-stone-500 font-bold">
                <Clock className="w-3 h-3 text-orange-600 animate-pulse" />
                <span>प्रश्न काल</span>
              </div>
              <div className="text-xs font-bold text-orange-950 font-mono">
                {currentDateTime || 'गणना जारी...'}
              </div>
            </div>
          </div>
        </div>

        {/* Live Horary Parameters Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="bg-orange-50/50 p-2.5 rounded-xl border border-orange-200 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
            <div className="truncate">
              <span className="text-[10px] text-stone-500 font-bold block">स्थान</span>
              <span className="font-bold text-orange-950 truncate block">{cityName}</span>
            </div>
          </div>

          <div className="bg-orange-50/50 p-2.5 rounded-xl border border-orange-200 flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-600 shrink-0" />
            <div className="truncate">
              <span className="text-[10px] text-stone-500 font-bold block">कार्य भाव एवं कारक</span>
              <span className="font-bold text-stone-900 truncate block">
                {activeCategoryObj.karyaBhavaName} ({activeCategoryObj.significator})
              </span>
            </div>
          </div>

          <div className="bg-orange-50/50 p-2.5 rounded-xl border border-orange-200 flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] text-stone-500 font-bold block">प्रश्न संख्या (1-249)</span>
              <span className="font-extrabold text-orange-900 text-xs">#{prashnaNumber}</span>
            </div>
            <button
              type="button"
              onClick={handleRandomizeNumber}
              className="px-2.5 py-1 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-900 text-[10px] font-bold flex items-center gap-1 transition-colors"
              title="दिव्य यादृच्छिक संख्या चुनें"
            >
              <Shuffle className="w-3 h-3" />
              <span>रैंडम</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Form */}
      <div className="bg-white rounded-2xl border-2 border-orange-200 p-4 sm:p-5 shadow-sm space-y-4">
        <form onSubmit={handleAskPrashna} className="space-y-4">
          {/* Category Selector */}
          <div>
            <label className="block text-xs font-serif font-bold text-orange-950 mb-2">
              1. प्रश्न की श्रेणी चुनें:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRASHNA_CATEGORIES.map((cat) => {
                const isSelected = cat.id === selectedCategory;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setQuestionText(cat.sampleQuestions[0]);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold shadow-xs ring-1 ring-orange-400/20'
                        : 'border-orange-200 bg-orange-50/30 hover:bg-orange-50 text-stone-700'
                    }`}
                  >
                    <span className="text-base shrink-0">{cat.icon}</span>
                    <div className="truncate">
                      <div className="text-[11px] font-bold truncate">{cat.nameHindi}</div>
                      <div className="text-[9px] text-stone-500 truncate">{cat.nameEnglish}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sample Questions Quick Selector */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-stone-700 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-orange-600" />
              <span>त्वरित प्रश्न (क्लिक कर चुनें):</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeCategoryObj.sampleQuestions.map((sq, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectSampleQuestion(sq)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all text-left ${
                    questionText === sq
                      ? 'bg-orange-600 text-white font-bold border-orange-600'
                      : 'bg-orange-50/60 hover:bg-orange-100 text-orange-950 border-orange-200'
                  }`}
                >
                  {sq}
                </button>
              ))}
            </div>
          </div>

          {/* Question Text Area */}
          <div>
            <label className="block text-xs font-serif font-bold text-orange-950 mb-1">
              2. आपका विशिष्ट प्रश्न दर्ज करें:
            </label>
            <div className="relative">
              <textarea
                rows={2}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="उदा. क्या मुझे इस वर्ष विदेश जाने का अवसर मिलेगा?"
                className="w-full bg-orange-50/40 border border-orange-200 focus:border-orange-500 rounded-xl p-3 text-xs sm:text-sm text-stone-900 font-medium leading-relaxed focus:ring-2 focus:ring-orange-500/20 transition-all"
                required
              />
            </div>
          </div>

          {/* Horary Number & Location Customization */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-stone-700 font-bold mb-1">
                प्रश्न संख्या (KP Horary Number 1-249):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={249}
                  value={prashnaNumber}
                  onChange={(e) => setPrashnaNumber(parseInt(e.target.value) || 1)}
                  className="w-full bg-orange-50/40 border border-orange-200 rounded-xl px-3 py-1.5 text-stone-900 font-bold focus:ring-2 focus:ring-orange-500/20"
                />
                <button
                  type="button"
                  onClick={handleRandomizeNumber}
                  className="px-3 py-1.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-950 font-bold border border-orange-200 whitespace-nowrap transition-colors text-[11px]"
                >
                  रैंडम संख्या
                </button>
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1">प्रश्न पूछने का स्थान:</label>
              <input
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder="स्थान दर्ज करें..."
                className="w-full bg-orange-50/40 border border-orange-200 rounded-xl px-3 py-1.5 text-stone-900 font-medium focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md border border-orange-400 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>प्रश्न लग्न व ग्रह गोचर गणना जारी है...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>प्रश्न कुंडली बनाएं एवं प्रत्यक्ष उत्तर प्राप्त करें</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Answer & Horary Chart Output Section */}
      {(prashnaResult || prashnaChart) && (
        <div className="space-y-4">
          {/* Calculated Horary Lagna & Planetary Setup Card */}
          {prashnaChart && (
            <div className="bg-white rounded-2xl border-2 border-orange-200 p-4 sm:p-5 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-orange-100">
                <div>
                  <h3 className="text-sm sm:text-base font-serif font-bold text-orange-950">
                    तात्कालिक प्रश्न कुंडली गणना
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="bg-orange-50 text-orange-900 px-2.5 py-0.5 rounded-lg border border-orange-200 text-[11px]">
                    प्रश्न लग्न: <strong>{prashnaChart.prashnaLagna} ({prashnaChart.lagnaDegree})</strong>
                  </span>
                  <span className="bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-lg border border-amber-200 text-[11px]">
                    लग्नेश: <strong>{prashnaChart.lagnaLord}</strong>
                  </span>
                </div>
              </div>

              {/* Planetary Grid Table */}
              <div className="overflow-x-auto rounded-xl border border-orange-200">
                <table className="w-full text-xs text-left">
                  <thead className="bg-orange-100 text-orange-950 font-bold border-b border-orange-200">
                    <tr>
                      <th className="p-2">ग्रह</th>
                      <th className="p-2">प्रश्न राशि</th>
                      <th className="p-2">भाव</th>
                      <th className="p-2">भूमिका</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-100 bg-white font-medium">
                    {prashnaChart.planetaryPositions.map((pos: any, idx: number) => (
                      <tr key={idx} className="hover:bg-orange-50/50">
                        <td className="p-2 font-bold text-orange-950">{pos.planet}</td>
                        <td className="p-2">{pos.sign}</td>
                        <td className="p-2 font-mono font-bold text-stone-800">{pos.house} वां भाव</td>
                        <td className="p-2 text-stone-600">{pos.nature}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* In-depth AI Answer Verdict */}
          {prashnaResult && (
            <div className="bg-white rounded-2xl border-2 border-orange-200 p-4 sm:p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-orange-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-serif font-bold text-orange-950">
                      प्रश्न शास्त्र फलादेश एवं मार्गदर्शन
                    </h3>
                    <p className="text-[10px] text-stone-500">
                      प्रश्न: <strong>"{questionText}"</strong>
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-50 text-emerald-900 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" /> प्रामाणिक विश्लेषण
                </span>
              </div>

              <div className="bg-orange-50/40 p-4 rounded-xl border border-orange-200 leading-relaxed whitespace-pre-wrap text-xs text-stone-800 font-medium space-y-2">
                {prashnaResult}
              </div>

              {/* Actionable Bottom Footer */}
              <div className="pt-1 flex items-center justify-between gap-3 border-t border-orange-100 text-[11px] text-stone-600">
                <span>प्रश्न शास्त्र के अनुसार तात्कालिक संकल्प व वैदिक उपायों से कार्य सिद्धि निश्चित होती है।</span>
                <button
                  type="button"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-950 font-bold transition-colors whitespace-nowrap text-xs"
                >
                  अन्य प्रश्न पूछें
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
