import React, { useState, useEffect } from 'react';
import { KundaliAnalysisResult, PlanetName, HouseInfo } from '../types';
import {
  Sparkles,
  Eye,
  Info,
  Layers,
  Clock,
  Compass,
  Calendar,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Shield,
  Zap,
  Star,
  BookOpen,
} from 'lucide-react';


interface KundaliChartProps {
  kundali: KundaliAnalysisResult;
  onRefreshAI?: () => void;
  isLoadingAI?: boolean;
  initialSection?: 'all' | 'charts' | 'analysis' | 'dasha' | 'gochar';
  initialSubView?: 'analysis' | 'calculations';
}

export const KundaliChart: React.FC<KundaliChartProps> = ({
  kundali,
  onRefreshAI,
  isLoadingAI,
  initialSection,
  initialSubView,
}) => {

  const [chartType, setChartType] = useState<'north' | 'south'>('north');
  const [chartDivision, setChartDivision] = useState<'lagna' | 'navamsha' | 'both'>('both');
  const [selectedHouse, setSelectedHouse] = useState<number>(1);

  const { planets, lagnaRashi, houses, dasha, transits, doshas } = kundali;
  const [selectedMahadasha, setSelectedMahadasha] = useState<PlanetName>(dasha.currentMahadasha);

  const activeHouseData = houses.find((h) => h.houseNumber === selectedHouse) || houses[0];

  const RASHI_NAMES_HINDI = [
    'मेष', 'वृषभ', 'मिथुन', 'कर्क', 'सिंह', 'कन्या',
    'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुम्भ', 'मीन'
  ];

  const RASHI_NAMES_ENG = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const lagnaDegree = kundali.planets.Lagna ? kundali.planets.Lagna.degree : (lagnaRashi.lagnaIndex * 30 + 15);
  const navamshaLagnaIndex = Math.floor(lagnaDegree / (360 / 108)) % 12;

  // Compute Navamsha placements for each planet
  const navamshaPlanets: Record<PlanetName, { signIndex: number; signHindi: string; house: number }> = {} as any;
  const navamshaHousePlanets: Record<number, PlanetName[]> = {};
  for (let i = 1; i <= 12; i++) {
    navamshaHousePlanets[i] = [];
  }

  Object.keys(planets).forEach((key) => {
    const pName = key as PlanetName;
    const pInfo = planets[pName];
    const signIndex = Math.floor(pInfo.degree / (360 / 108)) % 12;
    const house = ((signIndex - navamshaLagnaIndex + 12) % 12) + 1;
    navamshaPlanets[pName] = {
      signIndex,
      signHindi: RASHI_NAMES_HINDI[signIndex],
      house,
    };
    if (pName !== 'Lagna' && house >= 1 && house <= 12) {
      navamshaHousePlanets[house].push(pName);
    }
  });

  // Group Lagna (D-1) planets by house (1 to 12)
  const lagnaHousePlanets: Record<number, PlanetName[]> = {};
  for (let i = 1; i <= 12; i++) {
    lagnaHousePlanets[i] = [];
  }
  Object.keys(planets).forEach((key) => {
    const pName = key as PlanetName;
    if (pName !== 'Lagna') {
      const h = planets[pName].house;
      if (h >= 1 && h <= 12) {
        lagnaHousePlanets[h].push(pName);
      }
    }
  });

  const getPlanetColor = (name: PlanetName) => {
    switch (name) {
      case 'Surya':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Chandra':
        return 'bg-blue-50 text-blue-900 border-blue-200';
      case 'Mangal':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      case 'Budh':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Guru':
        return 'bg-yellow-100 text-yellow-900 border-yellow-300';
      case 'Shukra':
        return 'bg-pink-100 text-pink-900 border-pink-300';
      case 'Shani':
        return 'bg-indigo-100 text-indigo-900 border-indigo-300';
      case 'Rahu':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'Ketu':
        return 'bg-stone-200 text-stone-900 border-stone-400';
      default:
        return 'bg-orange-100 text-orange-900 border-orange-300';
    }
  };

  const getDashaInfluence = (planet: PlanetName) => {
    const map: Record<PlanetName, { nature: string; keywords: string; advice: string }> = {
      Surya: {
        nature: 'आत्मबल, प्रतिष्ठा एवं प्रशासनिक सफलता',
        keywords: 'राजकीय कार्य, पिता का सुख, नेतृत्व, पदोन्नति, मान-सम्मान',
        advice: 'प्रतिदिन सूर्य को तांबे के लोटे से जल अर्पित करें व आदित्य हृदय स्तोत्र का पाठ करें।',
      },
      Chandra: {
        nature: 'मानसिक शांति, रचनात्मकता एवं आत्मीय सुख',
        keywords: 'माता का स्नेह, जल यात्राएं, जनसंपर्क, कल्पनाशक्ति, मन की स्थिरता',
        advice: 'शिव जी का कच्चा दूध मिश्रित जल से अभिषेक करें व माता के चरण स्पर्श कर आशीर्वाद लें।',
      },
      Mangal: {
        nature: 'पराक्रम, भूमि-भवन लाभ एवं तीव्र ऊर्जा',
        keywords: 'साहस, खेलकूद, तकनीकी कार्य, संपत्ति निर्माण, नेतृत्व',
        advice: 'हनुमान चालीसा का नित्य पाठ करें व मंगलवार को लाल मसूर या सिंदूर का दान करें।',
      },
      Budh: {
        nature: 'व्यापार, बौद्धिक चातुर्य एवं वाणी सिद्धि',
        keywords: 'आईटी, वाणिज्य, शेयर, लेखन, एकाउंट्स, संचार, गणितीय दक्षता',
        advice: 'गाय को हरा चारा या पालक खिलाएं व ॐ बुं बुधाय नमः का जप करें।',
      },
      Guru: {
        nature: 'ज्ञान, संतान सुख, धर्म एवं अकूत समृद्धि',
        keywords: 'आध्यात्म, उच्च शिक्षा, मान-सम्मान, विवाह, भाग्य वृद्धि, गुरु कृपा',
        advice: 'विष्णु सहस्रनाम का पाठ करें व गुरुवार को चने की दाल या पीली मिठाई का दान करें।',
      },
      Shukra: {
        nature: 'वैवाहिक सुख, कला, वाहन एवं भौतिक वैभव',
        keywords: 'ऐश्वर्य, सौंदर्य, प्रेम संबंध, वाहन क्रय, कलात्मक सफलता, दांपत्य',
        advice: 'माँ लक्ष्मी की उपासना करें व शुक्रवार को मिश्री/चावल का दान करें।',
      },
      Shani: {
        nature: 'कर्म फल, अनुशासन, न्याय एवं दीर्घकालिक स्थायित्व',
        keywords: 'परिश्रम, एकाग्रता, निर्माण कार्य, जनसेवा, वैराग्य, गूढ़ ज्ञान',
        advice: 'शनिवार को पीपल के वृक्ष के नीचे सरसों के तेल का दीपक जलाएं व जरूरतमंदों की सेवा करें।',
      },
      Rahu: {
        nature: 'अचानक परिवर्तन, विदेशी संपर्क एवं भौतिक महत्वाकांक्षा',
        keywords: 'गुप्त ज्ञान, शोध, विदेश प्रवास, अप्रत्याशित सफलता या भ्रम, तकनीकी आविष्कार',
        advice: 'महामृत्युंजय मंत्र का जप करें व पक्षियों को प्रतिदिन सतनाजा दाना डालें।',
      },
      Ketu: {
        nature: 'आध्यात्मिक जागृति, मोक्ष, वैराग्य एवं गूढ़ विद्याएं',
        keywords: 'साधना, अंतर्ज्ञान, चिकित्सा, तंत्र-मंत्र, मोक्ष मार्ग, शोध',
        advice: 'भगवान गणेश जी को दूर्वा अर्पित करें व कुत्तों को भोजन कराएं।',
      },
      Lagna: {
        nature: 'समग्र व्यक्तित्व व आरोग्य',
        keywords: 'आरोग्य, ऊर्जा',
        advice: 'स्वस्थ दिनचर्या अपनाएं।',
      },
    };
    return map[planet] || map['Guru'];
  };

  const selectedDashaInfo = getDashaInfluence(selectedMahadasha);

  // North Indian House SVG Coordinates on a 400x400 viewBox
  const northHousePoints: Record<number, string> = {
    1: '200,200 100,100 200,0 300,100', // Center Top Diamond (1st House)
    2: '100,100 200,0 0,0', // Top Left Triangle (2nd)
    3: '100,100 0,0 0,200', // Left Top Triangle (3rd)
    4: '200,200 100,100 0,200 100,300', // Left Diamond (4th)
    5: '100,300 0,200 0,400', // Left Bottom Triangle (5th)
    6: '100,300 0,400 200,400', // Bottom Left Triangle (6th)
    7: '200,200 100,300 200,400 300,300', // Bottom Diamond (7th)
    8: '300,300 200,400 400,400', // Bottom Right Triangle (8th)
    9: '300,300 400,400 400,200', // Right Bottom Triangle (9th)
    10: '200,200 300,100 400,200 300,300', // Right Diamond (10th)
    11: '300,100 400,200 400,0', // Right Top Triangle (11th)
    12: '300,100 200,0 400,0', // Top Right Triangle (12th)
  };

  // House label & text anchors for North Indian chart
  const northHouseTextPos: Record<number, { x: number; y: number }> = {
    1: { x: 200, y: 110 },
    2: { x: 100, y: 40 },
    3: { x: 40, y: 100 },
    4: { x: 100, y: 200 },
    5: { x: 40, y: 300 },
    6: { x: 100, y: 360 },
    7: { x: 200, y: 300 },
    8: { x: 300, y: 360 },
    9: { x: 360, y: 300 },
    10: { x: 300, y: 200 },
    11: { x: 360, y: 100 },
    12: { x: 300, y: 40 },
  };

  // Helper to render North Indian SVG for either Lagna (D1) or Navamsha (D9)
  const renderNorthChart = (isNavamsha: boolean) => {
    const baseLagnaIdx = isNavamsha ? navamshaLagnaIndex : lagnaRashi.lagnaIndex;
    const hPlanets = isNavamsha ? navamshaHousePlanets : lagnaHousePlanets;

    return (
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full select-none cursor-pointer"
      >
        {/* Outer Box */}
        <rect x="0" y="0" width="400" height="400" fill="#FFFDF8" stroke={isNavamsha ? '#D97706' : '#EA580C'} strokeWidth="3" />

        {/* Major Diagonals */}
        <line x1="0" y1="0" x2="400" y2="400" stroke={isNavamsha ? '#D97706' : '#EA580C'} strokeWidth="2" />
        <line x1="400" y1="0" x2="0" y2="400" stroke={isNavamsha ? '#D97706' : '#EA580C'} strokeWidth="2" />

        {/* Inner Diamond */}
        <polygon points="200,0 400,200 200,400 0,200" fill="none" stroke={isNavamsha ? '#D97706' : '#EA580C'} strokeWidth="2.5" />

        {/* Interactive House Polygons */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((hNum) => {
          const isSelected = selectedHouse === hNum;
          const rashiNum = ((baseLagnaIdx + hNum - 1) % 12) + 1;
          const pos = northHouseTextPos[hNum];
          const pList = hPlanets[hNum] || [];

          return (
            <g key={hNum} onClick={() => setSelectedHouse(hNum)} className="transition-opacity">
              <polygon
                points={northHousePoints[hNum]}
                fill={isSelected ? (isNavamsha ? 'rgba(217, 119, 6, 0.18)' : 'rgba(234, 88, 12, 0.18)') : 'transparent'}
                stroke={isSelected ? (isNavamsha ? '#D97706' : '#EA580C') : 'transparent'}
                strokeWidth={isSelected ? '2' : '0'}
                className="hover:fill-orange-500/15 cursor-pointer"
              />

              {/* Rashi Number in Devnagari */}
              <text
                x={pos.x}
                y={pos.y - 12}
                textAnchor="middle"
                fill={isNavamsha ? '#B45309' : '#C2410C'}
                fontSize="11"
                fontWeight="bold"
                className="pointer-events-none"
              >
                {rashiNum} ({RASHI_NAMES_HINDI[rashiNum - 1]})
              </text>

              {/* House Identifier */}
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                fill="#78716C"
                fontSize="9"
                fontWeight="500"
                className="pointer-events-none"
              >
                {hNum === 1 ? (isNavamsha ? 'नवांश लग्न' : 'जन्म लग्न') : `भाव ${hNum}`}
              </text>

              {/* Occupying Planets */}
              {pList.map((p, idx) => {
                const pInfo = planets[p];
                const shortCode = pInfo.hindiName.substring(0, 2);
                const isRetro = pInfo.isRetrograde ? '(व)' : '';
                return (
                  <text
                    key={p}
                    x={pos.x}
                    y={pos.y + 12 + idx * 11}
                    textAnchor="middle"
                    fill={pInfo.dignity === 'Exalted' ? '#15803D' : pInfo.dignity === 'Debilitated' ? '#B91C1C' : '#9A3412'}
                    fontSize="10"
                    fontWeight="bold"
                    className="pointer-events-none"
                  >
                    {shortCode}{isRetro} {!isNavamsha ? `${pInfo.signDegree.toFixed(0)}°` : ''}
                  </text>
                );
              })}
            </g>
          );
        })}
      </svg>
    );
  };

  // Helper to render South Indian Chart Grid
  const renderSouthChart = (isNavamsha: boolean) => {
    const baseLagnaIdx = isNavamsha ? navamshaLagnaIndex : lagnaRashi.lagnaIndex;

    const boxes = [
      { rIndex: 11, name: 'मीन' }, // Top row
      { rIndex: 0, name: 'मेष' },
      { rIndex: 1, name: 'वृषभ' },
      { rIndex: 2, name: 'मिथुन' },
      { rIndex: 10, name: 'कुम्भ' }, // Row 2
      { center: true },
      { center: true },
      { rIndex: 3, name: 'कर्क' },
      { rIndex: 9, name: 'मकर' }, // Row 3
      { center: true },
      { center: true },
      { rIndex: 4, name: 'सिंह' },
      { rIndex: 8, name: 'धनु' }, // Bottom row
      { rIndex: 7, name: 'वृश्चिक' },
      { rIndex: 6, name: 'तुला' },
      { rIndex: 5, name: 'कन्या' },
    ];

    return (
      <div className="grid grid-cols-4 grid-rows-4 w-full h-full gap-1 p-1 bg-orange-100 rounded-xl">
        {boxes.map((box: any, idx) => {
          if (box.center) {
            if (idx === 5) {
              return (
                <div
                  key={idx}
                  className="col-span-2 row-span-2 bg-gradient-to-br from-orange-100 to-amber-50 border-2 border-orange-300 flex flex-col items-center justify-center text-center p-2 rounded-lg"
                >
                  <span className="text-orange-950 font-serif font-extrabold text-sm">
                    {isNavamsha ? 'नवमांश चक्र (D-9)' : 'लग्न चक्र (D-1)'}
                  </span>
                  <span className="text-[10px] text-stone-600">ज्योतिष शिमला प्रामाणिक</span>
                </div>
              );
            }
            return null;
          }

          const rIndex = box.rIndex;
          const houseNumber = ((rIndex - baseLagnaIdx + 12) % 12) + 1;
          const isLagnaHouse = rIndex === baseLagnaIdx;

          // Planets in this sign
          const planetsInThisSign = Object.keys(planets).filter((k) => {
            const p = k as PlanetName;
            if (p === 'Lagna') return false;
            if (isNavamsha) {
              return navamshaPlanets[p].signIndex === rIndex;
            }
            return planets[p].rashiIndex === rIndex;
          }) as PlanetName[];

          return (
            <div
              key={idx}
              onClick={() => setSelectedHouse(houseNumber)}
              className={`border p-1 rounded flex flex-col justify-between cursor-pointer transition-all ${
                selectedHouse === houseNumber
                  ? 'bg-orange-200 border-orange-600 ring-2 ring-orange-400/50'
                  : isLagnaHouse
                  ? 'bg-amber-100/90 border-amber-400 font-bold'
                  : 'bg-white/90 border-orange-200 hover:bg-orange-50'
              }`}
            >
              <div className="flex items-center justify-between text-[9px] text-stone-600 font-semibold border-b border-orange-200/50 pb-0.5">
                <span>{box.name}</span>
                {isLagnaHouse ? (
                  <span className="bg-orange-600 text-white px-1 rounded text-[8px]">लग्न</span>
                ) : (
                  <span className="text-stone-400">भ.{houseNumber}</span>
                )}
              </div>

              <div className="space-y-0.5 my-auto">
                {planetsInThisSign.map((p) => (
                  <div
                    key={p}
                    className="text-[9px] font-bold text-orange-950 flex items-center justify-between"
                  >
                    <span>{planets[p].hindiName.slice(0, 2)}</span>
                    {!isNavamsha && (
                      <span className="text-[8px] text-stone-500 font-mono">
                        {planets[p].signDegree.toFixed(0)}°
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Stats */}
      <div className="bg-gradient-to-br from-amber-100 via-orange-50 to-white rounded-3xl border-2 border-orange-300 p-6 sm:p-8 shadow-lg shadow-orange-950/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-orange-200">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm mb-2">
              <Layers className="w-3.5 h-3.5 text-amber-200" /> कुंडली का विश्लेषण
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-orange-950">
              कुंडली का विश्लेषण (Kundali Analysis)
            </h2>
            {/* Birth Details Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-3">
              <div className="bg-white/90 p-3 rounded-xl border border-orange-200 shadow-sm">
                <span className="text-[10px] text-stone-500 font-bold block">लग्न (Lagna)</span>
                <span className="text-xs sm:text-sm font-extrabold text-orange-950 block truncate">
                  {lagnaRashi.lagnaHindi} ({lagnaRashi.lagnaEng})
                </span>
              </div>
              <div className="bg-white/90 p-3 rounded-xl border border-orange-200 shadow-sm">
                <span className="text-[10px] text-stone-500 font-bold block">चन्द्र राशि (Moon Sign)</span>
                <span className="text-xs sm:text-sm font-extrabold text-orange-950 block truncate">
                  {lagnaRashi.moonSignHindi} ({lagnaRashi.moonSignEng})
                </span>
              </div>
              <div className="bg-white/90 p-3 rounded-xl border border-orange-200 shadow-sm">
                <span className="text-[10px] text-stone-500 font-bold block">नक्षत्र (Nakshatra)</span>
                <span className="text-xs sm:text-sm font-extrabold text-orange-950 block truncate">
                  {lagnaRashi.nakshatra} (चरण {lagnaRashi.nakshatraPada})
                </span>
              </div>
              <div className="bg-white/90 p-3 rounded-xl border border-orange-200 shadow-sm">
                <span className="text-[10px] text-stone-500 font-bold block">नवांश लग्न (Navamsha)</span>
                <span className="text-xs sm:text-sm font-extrabold text-orange-950 block truncate">
                  {RASHI_NAMES_HINDI[navamshaLagnaIndex]}
                </span>
              </div>
            </div>

            {/* Dosha Summary Strip */}
            {(() => {
              const gandmoolNakshatras = ['अश्विनी', 'आश्लेषा', 'मघा', 'ज्येष्ठा', 'मूल', 'रेवती'];
              const hasGandmool = gandmoolNakshatras.some(n => lagnaRashi.nakshatra?.includes(n));
              return (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-3.5 mt-3.5 border-t border-orange-200/60">
                  <div className="bg-white p-2.5 rounded-xl border border-orange-200 shadow-xs">
                    <span className="text-[10px] text-stone-500 font-bold block">कालसर्प दोष</span>
                    <span className={`text-xs font-bold ${doshas.hasKaalSarpDosha ? 'text-red-600' : 'text-emerald-700'}`}>
                      {doshas.hasKaalSarpDosha ? (doshas.kaalSarpType || 'उपस्थित') : 'दोष मुक्त'}
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-orange-200 shadow-xs">
                    <span className="text-[10px] text-stone-500 font-bold block">मांगलिक दोष</span>
                    <span className={`text-xs font-bold ${doshas.hasManglikDosha ? 'text-amber-700' : 'text-emerald-700'}`}>
                      {doshas.hasManglikDosha ? (doshas.manglikSeverity || 'उपस्थित') : 'दोष मुक्त'}
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-orange-200 shadow-xs">
                    <span className="text-[10px] text-stone-500 font-bold block">पितृ दोष</span>
                    <span className={`text-xs font-bold ${doshas.hasPitraDosha ? 'text-red-600' : 'text-emerald-700'}`}>
                      {doshas.hasPitraDosha ? 'उपस्थित' : 'दोष मुक्त'}
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-orange-200 shadow-xs">
                    <span className="text-[10px] text-stone-500 font-bold block">शनि साढ़ेसाती</span>
                    <span className={`text-xs font-bold ${doshas.hasSadeSati ? 'text-indigo-800' : 'text-emerald-700'}`}>
                      {doshas.hasSadeSati ? (doshas.sadeSatiPhase || 'सक्रिय') : 'प्रभाव मुक्त'}
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-orange-200 shadow-xs col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-stone-500 font-bold block">गंडमूल दोष</span>
                    <span className={`text-xs font-bold ${hasGandmool ? 'text-amber-700' : 'text-emerald-700'}`}>
                      {hasGandmool ? 'गंधमूल नक्षत्र' : 'दोष मुक्त'}
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* Current Active Dasha Strip placed right below birth details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              {(() => {
                const activeMaha = dasha.mahadashas?.find(m => m.isCurrent) || dasha.mahadashas?.[0];
                const activeAntar = dasha.antardashas?.find(a => a.isCurrent) || dasha.antardashas?.[0];
                
                const mahaStart = activeMaha ? new Date(activeMaha.startDate).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
                const mahaEnd = activeMaha ? new Date(activeMaha.endDate).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
                const mahaDuration = mahaStart && mahaEnd ? `${mahaStart} से ${mahaEnd}` : '';
                
                const antarStart = activeAntar ? new Date(activeAntar.startDate).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
                const antarEnd = activeAntar ? new Date(activeAntar.endDate).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
                const antarDuration = antarStart && antarEnd ? `${antarStart} से ${antarEnd}` : '';
                
                return (
                  <>
                    <div className="bg-white p-3.5 rounded-2xl border-2 border-orange-300 shadow-sm flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold text-xs shadow shrink-0">
                        महा
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-stone-500 font-bold block">वर्तमान महादशा (जन्म दशा शेष: {dasha.dashaBalanceAtBirth})</span>
                        <span className="text-xs sm:text-sm font-extrabold text-orange-950 block truncate">
                          {kundali.planets[dasha.currentMahadasha]?.hindiName || dasha.currentMahadasha} की महादशा
                        </span>
                        {mahaDuration && <span className="text-[10px] font-bold text-orange-700 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200 mt-0.5 inline-block">अवधि: {mahaDuration}</span>}
                      </div>
                    </div>

                    <div className="bg-white p-3.5 rounded-2xl border-2 border-amber-300 shadow-sm flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow shrink-0">
                        अंतर
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-stone-500 font-bold block">वर्तमान अंतर्दशा</span>
                        <span className="text-xs sm:text-sm font-extrabold text-amber-950 block truncate">
                          {kundali.planets[dasha.currentAntardasha]?.hindiName || dasha.currentAntardasha} की अंतर्दशा
                        </span>
                        {antarDuration && <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 mt-0.5 inline-block">अवधि: {antarDuration}</span>}
                      </div>
                    </div>
                  </>
                );
              })()}

              <div className="bg-white p-3.5 rounded-2xl border-2 border-orange-200 shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 text-white flex items-center justify-center font-bold text-xs shadow shrink-0">
                  प्रत्यं
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-stone-500 font-bold block">वर्तमान प्रत्यंतर्दशा</span>
                  <span className="text-xs sm:text-sm font-extrabold text-stone-900 block truncate">
                    {dasha.currentPratyantardasha
                      ? kundali.planets[dasha.currentPratyantardasha]?.hindiName || dasha.currentPratyantardasha
                      : kundali.planets[dasha.currentAntardasha]?.hindiName}{' '}
                    सूक्ष्म
                  </span>
                  {(() => {
                    const activeAntar = dasha.antardashas?.find(a => a.isCurrent) || dasha.antardashas?.[0];
                    const pStart = activeAntar ? new Date(activeAntar.startDate).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
                    const pEnd = activeAntar ? new Date(activeAntar.endDate).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
                    return pStart && pEnd ? (
                      <span className="text-[10px] font-bold text-orange-800 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200 mt-0.5 inline-block">अवधि: {pStart} से {pEnd}</span>
                    ) : (
                      <span className="text-[10px] font-bold text-orange-800 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200 mt-0.5 inline-block">अवधि: 2-3 माह सक्रिय</span>
                    );
                  })()}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION: MATHEMATICAL CALCULATION & CHARTS */}
      <div className="bg-white rounded-3xl border-2 border-orange-200 p-5 sm:p-7 shadow-lg shadow-orange-950/5 space-y-6">
          {/* Header with Switchers */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-orange-100">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-950 px-2.5 py-0.5 rounded-full text-xs font-bold mb-1 border border-orange-200">
                <Compass className="w-3.5 h-3.5 text-orange-600" /> गणितीय गणना एवं चक्र
              </div>
              <h3 className="text-lg font-serif font-bold text-orange-950 flex items-center gap-2">
                <Layers className="w-5 h-5 text-orange-600" />
                जन्म लग्न चक्र (D-1) एवं नवमांश चक्र (D-9)
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                लग्न: <strong className="text-orange-900">{lagnaRashi.lagnaHindi}</strong> | नवांश लग्न: <strong className="text-orange-900">{RASHI_NAMES_HINDI[navamshaLagnaIndex]}</strong> | किसी भी भाव पर क्लिक कर उसका भावेश व स्थित ग्रह जानें
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">


              {/* Chart Format Switcher */}
              <div className="flex items-center bg-orange-50 p-1 rounded-xl border border-orange-200 text-xs">
                <button
                  type="button"
                  onClick={() => setChartType('north')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    chartType === 'north'
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'text-stone-700 hover:text-orange-900'
                  }`}
                >
                  उत्तर भारतीय
                </button>
                <button
                  type="button"
                  onClick={() => setChartType('south')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    chartType === 'south'
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'text-stone-700 hover:text-orange-900'
                  }`}
                >
                  दक्षिण भारतीय
                </button>
              </div>

              {/* Chart View Switcher */}
              <div className="flex items-center bg-orange-50 p-1 rounded-xl border border-orange-200 text-xs">
                <button
                  type="button"
                  onClick={() => setChartDivision('both')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    chartDivision === 'both'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-stone-700 hover:text-orange-900'
                  }`}
                >
                  उभय (D-1 + D-9)
                </button>
                <button
                  type="button"
                  onClick={() => setChartDivision('lagna')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    chartDivision === 'lagna'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-stone-700 hover:text-orange-900'
                  }`}
                >
                  केवल लग्न (D-1)
                </button>
                <button
                  type="button"
                  onClick={() => setChartDivision('navamsha')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    chartDivision === 'navamsha'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-stone-700 hover:text-orange-900'
                  }`}
                >
                  केवल नवमांश (D-9)
                </button>
              </div>
            </div>
          </div>

          {/* Visual SVG Charts Row */}
          <div className="flex flex-col items-center justify-center">
            {/* Chart Container(s) */}
            <div className="w-full max-w-3xl space-y-4">
              <div className={`grid ${chartDivision === 'both' ? 'grid-cols-1 md:grid-cols-2 gap-6' : 'grid-cols-1'} items-center justify-items-center`}>
                {/* D-1 Lagna Chart */}
                {(chartDivision === 'both' || chartDivision === 'lagna') && (
                  <div className="bg-[#FFFDF9] p-3 rounded-2xl border-2 border-orange-400 shadow-md flex flex-col items-center">
                    <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-orange-200 text-xs font-bold text-orange-950">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-600"></span>
                        लग्न कुण्डली चक्र (D-1)
                      </span>
                      <span className="text-stone-500 font-mono text-[11px]">लग्न: {lagnaRashi.lagnaHindi}</span>
                    </div>
                    <div className="w-full max-w-[340px] aspect-square">
                      {chartType === 'north' ? renderNorthChart(false) : renderSouthChart(false)}
                    </div>
                  </div>
                )}

                {/* D-9 Navamsha Chart */}
                {(chartDivision === 'both' || chartDivision === 'navamsha') && (
                  <div className="bg-[#FFFDF9] p-3 rounded-2xl border-2 border-amber-400 shadow-md flex flex-col items-center">
                    <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-amber-200 text-xs font-bold text-amber-950">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                        नवमांश चक्र (D-9)
                      </span>
                      <span className="text-stone-500 font-mono text-[11px]">लग्न: {RASHI_NAMES_HINDI[navamshaLagnaIndex]}</span>
                    </div>
                    <div className="w-full max-w-[340px] aspect-square">
                      {chartType === 'north' ? renderNorthChart(true) : renderSouthChart(true)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>



          {/* Planetary Degrees & Longitude Table */}
          <div className="space-y-3 pt-4 border-t border-orange-100">
            <h4 className="text-sm font-bold text-orange-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>ग्रह स्पष्ट, नक्षत्र, पद, नवांश व अवस्था सारणी:</span>
            </h4>

            <div className="overflow-x-auto rounded-2xl border border-orange-200">
              <table className="w-full text-xs text-left">
                <thead className="bg-orange-100/70 text-orange-950 font-bold border-b border-orange-200">
                  <tr>
                    <th className="p-3">ग्रह</th>
                    <th className="p-3">लग्न राशि</th>
                    <th className="p-3">अंश</th>
                    <th className="p-3">नक्षत्र व पद</th>
                    <th className="p-3">नवांश राशि</th>
                    <th className="p-3">भाव</th>
                    <th className="p-3">अवस्था व दृष्टि प्रभाव</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-100 bg-white font-medium">
                  {Object.keys(planets).map((pKey) => {
                    const p = pKey as PlanetName;
                    const pInfo = planets[p];
                    const nav = navamshaPlanets[p];
                    return (
                      <tr key={p} className="hover:bg-stone-50">
                        <td className="p-3 flex items-center gap-2">
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold border ${getPlanetColor(
                              p
                            )}`}
                          >
                            {pInfo.hindiName.slice(0, 2)}
                          </span>
                          <strong className="text-orange-950 font-semibold">{pInfo.hindiName}</strong>
                          {pInfo.isRetrograde && (
                            <span className="text-[10px] bg-rose-100 text-rose-800 px-1 py-0.2 rounded border border-rose-200 font-bold">
                              वक्र
                            </span>
                          )}
                        </td>
                        <td className="p-3 font-semibold text-stone-800">{pInfo.rashiHindi}</td>
                        <td className="p-3 font-mono text-stone-700">{pInfo.signDegree.toFixed(2)}°</td>
                        <td className="p-3 text-stone-700">{pInfo.nakshatra} (पद {pInfo.pada})</td>
                        <td className="p-3 font-bold text-amber-900">{nav.signHindi} (भ.{nav.house})</td>
                        <td className="p-3 font-bold text-orange-950">{pInfo.house === 1 ? '१ (लग्न)' : `${pInfo.house} वां भाव`}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                              pInfo.dignity === 'Exalted'
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                : pInfo.dignity === 'Debilitated'
                                ? 'bg-rose-100 text-rose-800 border-rose-300'
                                : 'bg-orange-50 text-orange-800 border-orange-200'
                            }`}
                          >
                            {pInfo.dignityHindi}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 12 Bhavas Mathematical Breakdown */}
          <div className="space-y-3 pt-4 border-t border-orange-100">
            <h4 className="text-sm font-bold text-orange-950 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-orange-600" />
              <span>द्वादश भाव स्पष्ट एवं अधिकार क्षेत्र (12 Houses Bhava Breakdown):</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {houses.map((house: HouseInfo) => (
                <div
                  key={house.houseNumber}
                  onClick={() => setSelectedHouse(house.houseNumber)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    selectedHouse === house.houseNumber
                      ? 'bg-orange-100/90 border-orange-500 ring-2 ring-orange-400/40 shadow-sm'
                      : 'bg-orange-50/40 border-orange-200 hover:bg-orange-50 hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-serif font-bold text-orange-950 text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-orange-600 text-white text-[10px] flex items-center justify-center font-sans">
                        {house.houseNumber}
                      </span>
                      भाव {house.houseNumber} ({house.rashiHindi})
                    </span>
                    <span className="bg-orange-200/90 text-orange-950 font-bold px-2 py-0.5 rounded text-[10px]">
                      स्वामी: {house.rashiLord}
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-700 font-medium line-clamp-2">
                    <strong className="text-orange-950">महत्व:</strong> {house.significanceHindi}
                  </p>

                  <div className="text-[11px] text-stone-600 pt-2 mt-2 border-t border-orange-200/50 flex items-center justify-between">
                    <span className="text-[10px] text-stone-500">स्थित ग्रह:</span>
                    <div className="flex items-center gap-1 flex-wrap justify-end">
                      {house.planets && house.planets.length > 0 ? (
                        house.planets.map((pl: string) => (
                          <span key={pl} className="bg-orange-200/90 text-orange-950 px-1.5 py-0.2 rounded text-[10px] font-bold">
                            {pl}
                          </span>
                        ))
                      ) : (
                        <span className="italic text-[10px] text-stone-400">रिक्त</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      <div className="space-y-8">

          {/* SECTION 3: 120-YEAR VIMSHOTTARI DASHA */}
          <div className="bg-white rounded-3xl border-2 border-orange-200 p-6 sm:p-8 shadow-lg shadow-orange-950/5 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-orange-100">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-950 px-2.5 py-0.5 rounded-full text-xs font-bold mb-1 border border-orange-200">
                  <Clock className="w-3.5 h-3.5 text-orange-600" /> कालक्रम व महादशा चक्र
                </div>
                <h3 className="text-xl font-serif font-bold text-orange-950">
                  120 वर्षीय विंशोत्तरी महादशा कालक्रम
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  किसी भी महादशा पर क्लिक करके उसका विस्तृत फलादेश, प्रभाव क्षेत्र एवं अचूक वैदिक उपाय देखें:
                </p>
              </div>
            </div>

          {/* Mahadasha Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2.5">
            {dasha.mahadashas.map((md) => {
              const isSelected = md.planet === selectedMahadasha;
              const isCurrent = md.isCurrent;
              return (
                <button
                  key={md.planet}
                  type="button"
                  onClick={() => setSelectedMahadasha(md.planet)}
                  className={`p-3 rounded-2xl border-2 text-left transition-all relative ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50 shadow-md ring-2 ring-orange-400/30'
                      : 'border-stone-200 bg-white hover:border-orange-200 hover:bg-stone-50'
                  }`}
                >
                  {isCurrent && (
                    <span className="absolute -top-2 -right-1 bg-emerald-600 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full shadow">
                      सक्रिय
                    </span>
                  )}
                  <div className="text-xs font-bold text-stone-900 flex items-center justify-between">
                    <span>{md.hindiName}</span>
                    <span className="text-[10px] text-stone-500 font-semibold">{md.years}y</span>
                  </div>
                  <div className="text-[10px] text-stone-500 mt-1 font-mono">
                    {md.startDate.split('-')[0]} - {md.endDate.split('-')[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Mahadasha Deep Dive */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50/60 to-white border-2 border-orange-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-orange-200/60 pb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-xl text-xs font-extrabold border ${getPlanetColor(
                    selectedMahadasha
                  )}`}
                >
                  {kundali.planets[selectedMahadasha]?.hindiName || selectedMahadasha} महादशा फलादेश
                </span>
                <span className="text-xs font-bold text-orange-950">
                  {selectedMahadasha === dasha.currentMahadasha ? '(वर्तमान में गतिशील)' : '(जीवन कालखंड)'}
                </span>
              </div>
              <span className="text-xs text-stone-600 font-medium">
                प्रभाव स्वरूप:{' '}
                <strong className="text-orange-950">{selectedDashaInfo.nature}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-orange-100 shadow-xs space-y-2">
                <div className="font-bold text-orange-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  <span>संभावित शुभ फल एवं प्रभाव क्षेत्र:</span>
                </div>
                <p className="text-stone-700 leading-relaxed font-medium">
                  {selectedDashaInfo.keywords}
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-orange-100 shadow-xs space-y-2">
                <div className="font-bold text-orange-900 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-orange-600" />
                  <span>विशेष वैदिक मार्गदर्शन एवं शांति उपाय:</span>
                </div>
                <p className="text-stone-700 leading-relaxed font-medium">
                  {selectedDashaInfo.advice}
                </p>
              </div>
            </div>
          </div>

          {/* Antardasha Timeline Table */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-bold text-orange-950 flex items-center gap-2">
              <Layers className="w-4 h-4 text-orange-600" />
              <span>वर्तमान महादशा में अंतर्दशाओं का सूक्ष्म विभाजन:</span>
            </h4>

            <div className="overflow-x-auto rounded-2xl border border-orange-200">
              <table className="w-full text-xs text-left">
                <thead className="bg-orange-100/70 text-orange-950 font-bold border-b border-orange-200">
                  <tr>
                    <th className="p-3">अंतर्दशा स्वामी</th>
                    <th className="p-3">प्रारंभ तिथि</th>
                    <th className="p-3">समाप्ति तिथि</th>
                    <th className="p-3">स्थिति</th>
                    <th className="p-3">अवस्था प्रभाव</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-100 bg-white font-medium">
                  {dasha.antardashas.map((ad, idx) => {
                    return (
                      <tr
                        key={idx}
                        className={ad.isCurrent ? 'bg-amber-50/90 font-bold text-orange-950' : 'hover:bg-stone-50'}
                      >
                        <td className="p-3 flex items-center gap-2">
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold border ${getPlanetColor(
                              ad.planet
                            )}`}
                          >
                            {ad.hindiName.slice(0, 2)}
                          </span>
                          <span>{ad.hindiName}</span>
                        </td>
                        <td className="p-3 font-mono text-stone-600">{ad.startDate}</td>
                        <td className="p-3 font-mono text-stone-600">{ad.endDate}</td>
                        <td className="p-3">
                          {ad.isCurrent ? (
                            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-extrabold border border-emerald-300">
                              <Activity className="w-2.5 h-2.5 animate-pulse" /> वर्तमान चालू
                            </span>
                          ) : (
                            <span className="text-stone-400 text-[11px]">कालखंड</span>
                          )}
                        </td>
                        <td className="p-3 text-stone-700">
                          {kundali.planets[ad.planet]?.dignityHindi} अवस्था प्रभाव
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {/* SECTION 4: PLANETARY TRANSITS (GOCHAR) */}
          <div className="bg-white rounded-3xl border-2 border-orange-200 p-6 sm:p-8 shadow-lg shadow-orange-950/5 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-orange-100">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-amber-100 text-orange-900 px-2.5 py-0.5 rounded-full text-[11px] font-bold mb-1 border border-amber-200">
                  <Compass className="w-3.5 h-3.5 text-orange-600" /> तात्कालिक आकाशीय ग्रह गोचर
                </div>
                <h3 className="text-xl font-serif font-bold text-orange-950">
                  वर्तमान ग्रह गोचर स्थिति व प्रभाव
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  जातक की जन्म चन्द्र राशि (<strong className="text-orange-950">{lagnaRashi.moonSignHindi}</strong>) एवं जन्म लग्न (<strong className="text-orange-950">{lagnaRashi.lagnaHindi}</strong>) के सापेक्ष वर्तमान गोचर प्रभाव:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {transits.map((tr, i) => {
                const isGood = tr.effect === 'Auspicious';
                const isChallenging = tr.effect === 'Challenging';
                return (
                  <div
                    key={i}
                    className={`p-5 rounded-2xl border-2 transition-all ${
                      isGood
                        ? 'border-emerald-200 bg-emerald-50/40'
                        : isChallenging
                        ? 'border-amber-300 bg-amber-50/40'
                        : 'border-orange-100 bg-orange-50/20'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-stone-200/50">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-stone-900">
                          {kundali.planets[tr.planet]?.hindiName || tr.planet} गोचर
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                          isGood
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : isChallenging
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-stone-100 text-stone-800 border-stone-300'
                        }`}
                      >
                        {isGood ? 'शुभ फलदायी' : isChallenging ? 'सतर्कता / शांति' : 'सम फल'}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-stone-700">
                      <div className="flex justify-between">
                        <span className="text-stone-500">गोचर राशि:</span>
                        <strong className="text-orange-950 font-bold">{tr.currentSignHindi} राशि</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">चन्द्र से भाव:</span>
                        <strong className="text-stone-900">{tr.houseFromMoon} वां भाव</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">लग्न से भाव:</span>
                        <strong className="text-stone-900">{tr.houseFromLagna} वां भाव</strong>
                      </div>
                      <p className="text-stone-700 text-[11px] pt-1.5 border-t border-stone-200/40 leading-relaxed font-medium">
                        {tr.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
