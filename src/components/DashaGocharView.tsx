import React, { useState } from 'react';
import { KundaliAnalysisResult, DashaPeriod, PlanetName } from '../types';
import {
  Clock,
  Compass,
  Sparkles,
  Calendar,
  Layers,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Shield,
  Zap,
} from 'lucide-react';

interface DashaGocharViewProps {
  kundali: KundaliAnalysisResult;
}

export const DashaGocharView: React.FC<DashaGocharViewProps> = ({ kundali }) => {
  const { dasha, transits, lagnaRashi } = kundali;
  const [selectedMahadasha, setSelectedMahadasha] = useState<PlanetName>(dasha.currentMahadasha);

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
        keywords: 'राजकीय कार्य, पिता का सुख, नेतृत्व, पदोन्नति',
        advice: 'प्रतिदिन सूर्य को जल अर्पित करें व आदित्य हृदय स्तोत्र का पाठ करें।',
      },
      Chandra: {
        nature: 'मानसिक शांति, रचनात्मकता एवं आत्मीय सुख',
        keywords: 'माता का स्नेह, जल यात्राएं, जनसंपर्क, कल्पनाशक्ति',
        advice: 'शिव जी का जलाभिषेक करें व माता के चरण स्पर्श कर आशीर्वाद लें।',
      },
      Mangal: {
        nature: 'पराक्रम, भूमि-भवन लाभ एवं तीव्र ऊर्जा',
        keywords: 'साहस, खेलकूद, तकनीकी कार्य, संपत्ति निर्माण',
        advice: 'हनुमान चालीसा का नित्य पाठ करें व क्रोध पर नियंत्रण रखें।',
      },
      Budh: {
        nature: 'व्यापार, बौद्धिक चातुर्य एवं वाणी सिद्धि',
        keywords: 'आईटी, वाणिज्य, शेयर, लेखन, एकाउंट्स, संचार',
        advice: 'गाय को हरा चारा खिलाएं व ॐ बुं बुधाय नमः का जप करें।',
      },
      Guru: {
        nature: 'ज्ञान, संतान सुख, धर्म एवं अकूत समृद्धि',
        keywords: 'आध्यात्म, उच्च शिक्षा, मान-सम्मान, विवाह, भाग्य वृद्धि',
        advice: 'विष्णु सहस्रनाम का पाठ करें व पीली वस्तुओं का दान करें।',
      },
      Shukra: {
        nature: 'वैवाहिक सुख, कला, वाहन एवं भौतिक वैभव',
        keywords: 'ऐश्वर्य, सौंदर्य, प्रेम संबंध, वाहन क्रय, कलात्मक सफलता',
        advice: 'माँ लक्ष्मी की उपासना करें व श्री सूक्त का पाठ करें।',
      },
      Shani: {
        nature: 'कर्म फल, अनुशासन, न्याय एवं दीर्घकालिक स्थायित्व',
        keywords: 'परिश्रम, एकाग्रता, निर्माण कार्य, जनसेवा, वैराग्य',
        advice: 'शनिवार को पीपल के वृक्ष के नीचे सरसों के तेल का दीपक जलाएं।',
      },
      Rahu: {
        nature: 'अचानक परिवर्तन, विदेशी संपर्क एवं भौतिक महत्वाकांक्षा',
        keywords: 'गुप्त ज्ञान, शोध, विदेश प्रवास, अप्रत्याशित सफलता या भ्रम',
        advice: 'महामृत्युंजय मंत्र का जप करें व पक्षियों को दाना डालें।',
      },
      Ketu: {
        nature: 'आध्यात्मिक जागृति, मोक्ष, वैराग्य एवं गूढ़ विद्याएं',
        keywords: 'साधना, अंतर्ज्ञान, चिकित्सा, तंत्र-मंत्र, मोक्ष मार्ग',
        advice: 'भगवान गणेश जी को दूर्वा अर्पित करें व कुष्ठ रोगियों की सेवा करें।',
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

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-amber-100 via-orange-50 to-white rounded-3xl border-2 border-orange-300 p-6 sm:p-8 shadow-lg shadow-orange-950/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-orange-200">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm mb-2">
              <Clock className="w-3.5 h-3.5 text-amber-200" /> कालचक्र व ग्रह दशा गणना
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-orange-950">
              विंशोत्तरी महादशा एवं वर्तमान गोचर चक्र (Vimshottari Dasha & Gochar)
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 mt-1 font-medium">
              120 वर्षीय वैदिक विंशोत्तरी दशा चक्र, अंतर्दशा कालखंड तथा वर्तमान आकाशीय ग्रह गोचर का जातक पर प्रभाव।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white px-4 py-2.5 rounded-2xl border border-orange-200 shadow-sm text-right">
              <span className="text-[10px] text-stone-500 font-bold block uppercase">जन्म समय दशा शेष</span>
              <span className="text-xs sm:text-sm font-bold text-orange-900">
                {dasha.dashaBalanceAtBirth}
              </span>
            </div>
          </div>
        </div>

        {/* Current Active Dasha Badge Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="bg-white p-4 rounded-2xl border-2 border-orange-300 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold text-sm shadow">
              महा
            </div>
            <div>
              <span className="text-[10px] text-stone-500 font-bold block">वर्तमान महादशा</span>
              <span className="text-sm font-extrabold text-orange-950">
                {kundali.planets[dasha.currentMahadasha]?.hindiName || dasha.currentMahadasha} की महादशा
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border-2 border-amber-300 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow">
              अंतर
            </div>
            <div>
              <span className="text-[10px] text-stone-500 font-bold block">वर्तमान अंतर्दशा</span>
              <span className="text-sm font-extrabold text-amber-950">
                {kundali.planets[dasha.currentAntardasha]?.hindiName || dasha.currentAntardasha} की अंतर्दशा
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border-2 border-orange-200 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 text-white flex items-center justify-center font-bold text-sm shadow">
              प्रत्यं
            </div>
            <div>
              <span className="text-[10px] text-stone-500 font-bold block">वर्तमान प्रत्यंतर्दशा</span>
              <span className="text-sm font-extrabold text-stone-900">
                {dasha.currentPratyantardasha
                  ? kundali.planets[dasha.currentPratyantardasha]?.hindiName || dasha.currentPratyantardasha
                  : kundali.planets[dasha.currentAntardasha]?.hindiName}{' '}
                सूक्ष्म काल
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 120-Year Mahadasha Timeline */}
      <div className="bg-white rounded-3xl border-2 border-orange-200 p-6 sm:p-8 shadow-lg shadow-orange-950/5 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-orange-100">
          <div>
            <h3 className="text-lg font-serif font-bold text-orange-950 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              120 वर्षीय विंशोत्तरी महादशा कालक्रम (Mahadasha Sequence)
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              किसी भी महादशा पर क्लिक करके उसका विस्तृत फलादेश, शुभ परिणाम एवं उपाय देखें:
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
                {kundali.planets[selectedMahadasha]?.hindiName || selectedMahadasha} महादशा
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
            <span>वर्तमान महादशा में अंतर्दशाओं का सूक्ष्म विभाजन (Antardasha Periods):</span>
          </h4>

          <div className="overflow-x-auto rounded-2xl border border-orange-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-orange-100/70 text-orange-950 font-bold border-b border-orange-200">
                <tr>
                  <th className="p-3">अंतर्दशा स्वामी (Antardasha Lord)</th>
                  <th className="p-3">प्रारंभ तिथि (Start Date)</th>
                  <th className="p-3">समाप्ति तिथि (End Date)</th>
                  <th className="p-3">स्थिति (Status)</th>
                  <th className="p-3">फल स्वरूप</th>
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
      </div>

      {/* Planetary Transits (Gochar) Section */}
      <div className="bg-white rounded-3xl border-2 border-orange-200 p-6 sm:p-8 shadow-lg shadow-orange-950/5 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-orange-100">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-orange-900 px-2.5 py-0.5 rounded-full text-[11px] font-bold mb-1 border border-amber-200">
              <Compass className="w-3.5 h-3.5 text-orange-600" /> आकाशीय ग्रह गोचर
            </div>
            <h3 className="text-xl font-serif font-bold text-orange-950">
              वर्तमान आकाशीय ग्रह गोचर स्थिति (Current Planetary Transits)
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              जातक की चन्द्र राशि ({lagnaRashi.moonSignHindi}) एवं लग्न ({lagnaRashi.lagnaHindi}) के सापेक्ष ग्रहों का गोचर फल:
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
  );
};
