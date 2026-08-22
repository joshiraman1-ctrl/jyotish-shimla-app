import React, { useState } from 'react';
import { KundaliAnalysisResult, PlanetName, HouseInfo } from '../types';
import { Sparkles, Eye, Info, Layers } from 'lucide-react';

interface KundaliChartProps {
  kundali: KundaliAnalysisResult;
}

export const KundaliChart: React.FC<KundaliChartProps> = ({ kundali }) => {
  const [chartType, setChartType] = useState<'north' | 'south'>('north');
  const [selectedHouse, setSelectedHouse] = useState<number>(1);

  const { planets, lagnaRashi, houses } = kundali;
  const activeHouseData = houses.find((h) => h.houseNumber === selectedHouse) || houses[0];

  const getPlanetShortCode = (pName: PlanetName): string => {
    const codes: Record<PlanetName, string> = {
      Surya: 'सूर्य (Su)',
      Chandra: 'चन्द्र (Mo)',
      Mangal: 'मंगल (Ma)',
      Budh: 'बुध (Me)',
      Guru: 'गुरु (Ju)',
      Shukra: 'शुक्र (Ve)',
      Shani: 'शनि (Sa)',
      Rahu: 'राहु (Ra)',
      Ketu: 'केतु (Ke)',
      Lagna: 'लग्न (Asc)',
    };
    return codes[pName] || pName;
  };

  // Group planets by house (1 to 12)
  const housePlanets: Record<number, PlanetName[]> = {};
  for (let i = 1; i <= 12; i++) {
    housePlanets[i] = [];
  }
  Object.keys(planets).forEach((key) => {
    const pName = key as PlanetName;
    if (pName !== 'Lagna') {
      const h = planets[pName].house;
      if (h >= 1 && h <= 12) {
        housePlanets[h].push(pName);
      }
    }
  });

  // North Indian House SVG Coordinates on a 400x400 viewBox
  // House 1: Top Diamond (Center)
  // House 2: Top Left Triangle
  // House 3: Left Top Triangle
  // House 4: Left Diamond
  // House 5: Left Bottom Triangle
  // House 6: Bottom Left Triangle
  // House 7: Bottom Diamond
  // House 8: Bottom Right Triangle
  // House 9: Right Bottom Triangle
  // House 10: Right Diamond
  // House 11: Right Top Triangle
  // House 12: Top Right Triangle

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

  return (
    <div className="bg-stone-900/90 rounded-2xl border border-amber-800/40 p-5 sm:p-6 shadow-xl">
      {/* Header with Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-amber-800/30">
        <div>
          <h3 className="text-lg font-serif font-bold text-amber-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            जन्म पत्रिका चक्र (Lagna & Janma Kundali Chart)
          </h3>
          <p className="text-xs text-stone-300">
            लग्न: <strong className="text-amber-300">{lagnaRashi.lagnaHindi}</strong> | चन्द्र राशि: <strong className="text-amber-300">{lagnaRashi.moonSignHindi}</strong> | नक्षत्र: <strong className="text-amber-300">{lagnaRashi.nakshatra} ({lagnaRashi.nakshatraPada})</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setChartType('north')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              chartType === 'north'
                ? 'bg-amber-600 text-white border-amber-400 shadow'
                : 'bg-stone-800 text-stone-300 border-amber-900/40 hover:bg-stone-700'
            }`}
          >
            उत्तर भारतीय (North Indian)
          </button>
          <button
            type="button"
            onClick={() => setChartType('south')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              chartType === 'south'
                ? 'bg-amber-600 text-white border-amber-400 shadow'
                : 'bg-stone-800 text-stone-300 border-amber-900/40 hover:bg-stone-700'
            }`}
          >
            दक्षिण भारतीय (South Indian)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Chart Renderer */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="w-full max-w-[420px] aspect-square bg-gradient-to-br from-amber-950/60 to-stone-950 p-2 rounded-2xl border-2 border-amber-600/50 shadow-2xl relative">
            {chartType === 'north' ? (
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full select-none cursor-pointer"
              >
                {/* Outer Box */}
                <rect x="0" y="0" width="400" height="400" fill="#1c1917" stroke="#b45309" strokeWidth="2.5" />

                {/* Major Diagonals */}
                <line x1="0" y1="0" x2="400" y2="400" stroke="#d97706" strokeWidth="1.5" />
                <line x1="400" y1="0" x2="0" y2="400" stroke="#d97706" strokeWidth="1.5" />

                {/* Inner Diamond */}
                <polygon points="200,0 400,200 200,400 0,200" fill="none" stroke="#d97706" strokeWidth="2" />

                {/* Interactive House Polygons */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((hNum) => {
                  const isSelected = selectedHouse === hNum;
                  const houseData = houses.find((h) => h.houseNumber === hNum);
                  const rashiNum = ((lagnaRashi.lagnaIndex + hNum - 1) % 12) + 1;
                  const pos = northHouseTextPos[hNum];
                  const pList = housePlanets[hNum] || [];

                  return (
                    <g key={hNum} onClick={() => setSelectedHouse(hNum)} className="transition-opacity">
                      <polygon
                        points={northHousePoints[hNum]}
                        fill={isSelected ? 'rgba(217, 119, 6, 0.28)' : 'transparent'}
                        stroke={isSelected ? '#f59e0b' : 'transparent'}
                        strokeWidth={isSelected ? '2' : '0'}
                        className="hover:fill-amber-600/15 cursor-pointer"
                      />

                      {/* Rashi Number in Roman / Devnagari */}
                      <text
                        x={pos.x}
                        y={pos.y - 12}
                        textAnchor="middle"
                        fill="#fbbf24"
                        fontSize="11"
                        fontWeight="bold"
                        className="pointer-events-none"
                      >
                        {rashiNum} ({houseData?.rashiHindi})
                      </text>

                      {/* House Identifier */}
                      <text
                        x={pos.x}
                        y={pos.y}
                        textAnchor="middle"
                        fill="#a8a29e"
                        fontSize="9"
                        className="pointer-events-none"
                      >
                        {hNum === 1 ? 'लग्न (Lagna)' : `भाव ${hNum}`}
                      </text>

                      {/* Occupying Planets */}
                      {pList.map((p, idx) => {
                        const pInfo = planets[p];
                        const shortCode = pInfo.hindiName.substring(0, 2);
                        const isRetro = pInfo.isRetrograde ? '(व)' : '';
                        const isExalted = pInfo.dignity === 'Exalted' ? '*' : '';
                        return (
                          <text
                            key={p}
                            x={pos.x}
                            y={pos.y + 12 + idx * 11}
                            textAnchor="middle"
                            fill={pInfo.dignity === 'Exalted' ? '#4ade80' : pInfo.dignity === 'Debilitated' ? '#f87171' : '#fef08a'}
                            fontSize="10"
                            fontWeight="600"
                            className="pointer-events-none"
                          >
                            {shortCode}{isRetro}{isExalted} {pInfo.signDegree.toFixed(0)}°
                          </text>
                        );
                      })}
                    </g>
                  );
                })}
              </svg>
            ) : (
              // South Indian Chart Grid (Fixed Signs from Aries at top-center 2nd box)
              <div className="grid grid-cols-4 grid-rows-4 w-full h-full gap-1 p-1 bg-stone-950">
                {/* 16 cell grid where center 4 are empty */}
                {[
                  { rIndex: 11, name: 'मीन (Pisces)' }, // Top row
                  { rIndex: 0, name: 'मेष (Aries)' },
                  { rIndex: 1, name: 'वृषभ (Taurus)' },
                  { rIndex: 2, name: 'मिथुन (Gemini)' },
                  { rIndex: 10, name: 'कुम्भ (Aquarius)' }, // Row 2
                  { center: true },
                  { center: true },
                  { rIndex: 3, name: 'कर्क (Cancer)' },
                  { rIndex: 9, name: 'मकर (Capricorn)' }, // Row 3
                  { center: true },
                  { center: true },
                  { rIndex: 4, name: 'सिंह (Leo)' },
                  { rIndex: 8, name: 'धनु (Sagittarius)' }, // Bottom row
                  { rIndex: 7, name: 'वृश्चिक (Scorpio)' },
                  { rIndex: 6, name: 'तुला (Libra)' },
                  { rIndex: 5, name: 'कन्या (Virgo)' },
                ].map((box, idx) => {
                  if (box.center) {
                    if (idx === 5) {
                      return (
                        <div
                          key={idx}
                          className="col-span-2 row-span-2 bg-stone-900 border border-amber-800/40 flex flex-col items-center justify-center text-center p-2 rounded-lg"
                        >
                          <span className="text-amber-400 font-serif font-bold text-sm">
                            ज्योतिष शिमला
                          </span>
                          <span className="text-[10px] text-stone-400">
                            दक्षिण भारतीय चक्र
                          </span>
                        </div>
                      );
                    }
                    return null;
                  }

                  const houseInSign = ((box.rIndex! - lagnaRashi.lagnaIndex + 12) % 12) + 1;
                  const isLagna = box.rIndex === lagnaRashi.lagnaIndex;
                  const planetsInSign = (Object.keys(planets) as PlanetName[]).filter(
                    (p) => p !== 'Lagna' && planets[p].rashiIndex === box.rIndex
                  );
                  const isSelected = selectedHouse === houseInSign;

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedHouse(houseInSign)}
                      className={`p-1.5 rounded border text-[10px] flex flex-col justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-600/30 border-amber-400'
                          : 'bg-stone-900/90 border-amber-900/40 hover:bg-stone-800'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[9px] text-amber-300/80 font-medium">
                        <span>{box.name}</span>
                        {isLagna && (
                          <span className="bg-amber-500 text-stone-950 font-bold px-1 rounded text-[8px]">
                            लग्न
                          </span>
                        )}
                      </div>

                      <div className="space-y-0.5 my-auto">
                        {planetsInSign.map((p) => (
                          <div key={p} className="text-[9px] text-amber-200 font-semibold truncate">
                            {planets[p].hindiName} {planets[p].signDegree.toFixed(0)}°
                          </div>
                        ))}
                      </div>

                      <div className="text-[8px] text-stone-400 text-right">
                        H{houseInSign}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Selected House Details Panel */}
        <div className="lg:col-span-5 bg-stone-950/80 rounded-xl p-4 sm:p-5 border border-amber-800/40 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-amber-800/30">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                भाव विश्लेषण (House Inspector)
              </span>
              <h4 className="text-base font-serif font-bold text-amber-100">
                {activeHouseData.houseNumber}वां भाव: {activeHouseData.significanceHindi}
              </h4>
            </div>
            <span className="w-8 h-8 rounded-full bg-amber-600/30 border border-amber-500/40 text-amber-300 font-bold flex items-center justify-center text-sm">
              {activeHouseData.houseNumber}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-stone-900/80 p-2.5 rounded-lg border border-amber-900/30">
              <span className="text-[10px] text-stone-400 block">राशि (Sign):</span>
              <strong className="text-amber-200 font-serif text-sm">
                {activeHouseData.rashiHindi} ({activeHouseData.rashiName})
              </strong>
            </div>
            <div className="bg-stone-900/80 p-2.5 rounded-lg border border-amber-900/30">
              <span className="text-[10px] text-stone-400 block">भावेश (Lord):</span>
              <strong className="text-amber-200 font-serif text-sm">
                {activeHouseData.rashiLord}
              </strong>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-medium text-amber-300 block mb-1.5">
              स्थित ग्रह (Occupying Planets in this House):
            </span>
            {activeHouseData.planets.length === 0 ? (
              <p className="text-xs text-stone-400 italic bg-stone-900/50 p-2.5 rounded-lg border border-stone-800">
                इस भाव में कोई प्रत्यक्ष ग्रह स्थित नहीं है। यह भाव अपने स्वामी {activeHouseData.rashiLord} के शुभ प्रभाव से संचालित होता है।
              </p>
            ) : (
              <div className="space-y-2">
                {activeHouseData.planets.map((p) => {
                  const pInfo = planets[p];
                  return (
                    <div
                      key={p}
                      className="bg-stone-900 p-2.5 rounded-lg border border-amber-800/40 flex items-center justify-between text-xs"
                    >
                      <div>
                        <strong className="text-amber-200 block">
                          {pInfo.hindiName} ({pInfo.name})
                        </strong>
                        <span className="text-[11px] text-stone-300">
                          {pInfo.nakshatra} (पद {pInfo.pada}) • {pInfo.signDegree.toFixed(1)}°
                        </span>
                      </div>
                      <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[11px] border border-amber-500/30 font-medium">
                        {pInfo.dignityHindi}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-stone-900/80 p-3 rounded-lg border border-amber-900/30 text-xs text-stone-300">
            <span className="text-amber-400 font-semibold block mb-1">
              वैदिक महत्व:
            </span>
            {activeHouseData.significanceEng}
          </div>

          <div className="text-[11px] text-amber-400/90 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            चक्र के किसी भी भाव पर क्लिक करके उसका विस्तृत ज्योतिषीय प्रभाव जानें।
          </div>
        </div>
      </div>
    </div>
  );
};
