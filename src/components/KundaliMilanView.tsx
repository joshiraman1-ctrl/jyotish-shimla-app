import React, { useState } from 'react';
import { HeartHandshake, Sparkles, AlertTriangle, CheckCircle2, ShieldAlert, Award, RefreshCw, User, HelpCircle } from 'lucide-react';

interface KootResult {
  name: string;
  hindiName: string;
  maxPoints: number;
  obtainedPoints: number;
  description: string;
  status: 'excellent' | 'moderate' | 'dosh';
}

const RASHIS = [
  { id: '1', name: 'Mesh (मेष)', lord: 'Mars (मंगल)', element: 'Fire' },
  { id: '2', name: 'Vrishabh (वृषभ)', lord: 'Venus (शुक्र)', element: 'Earth' },
  { id: '3', name: 'Mithun (मिथुन)', lord: 'Mercury (बुध)', element: 'Air' },
  { id: '4', name: 'Kark (कर्क)', lord: 'Moon (चंद्र)', element: 'Water' },
  { id: '5', name: 'Simha (सिंह)', lord: 'Sun (सूर्य)', element: 'Fire' },
  { id: '6', name: 'Kanya (कन्या)', lord: 'Mercury (बुध)', element: 'Earth' },
  { id: '7', name: 'Tula (तुला)', lord: 'Venus (शुक्र)', element: 'Air' },
  { id: '8', name: 'Vrishchik (वृश्चिक)', lord: 'Mars (मंगल)', element: 'Water' },
  { id: '9', name: 'Dhanu (धनु)', lord: 'Jupiter (गुरु)', element: 'Fire' },
  { id: '10', name: 'Makar (मकर)', lord: 'Saturn (शनि)', element: 'Earth' },
  { id: '11', name: 'Kumbh (कुंभ)', lord: 'Saturn (शनि)', element: 'Air' },
  { id: '12', name: 'Meen (मीन)', lord: 'Jupiter (गुरु)', element: 'Water' },
];

const NAKSHATRAS = [
  'अश्विनी (Ashwini)', 'भरणी (Bharani)', 'कृत्तिका (Krittika)', 'रोहिणी (Rohini)', 'मृगशिरा (Mrigashira)',
  'आर्द्रा (Ardra)', 'पुनर्वसु (Punarvasu)', 'पुष्य (Pushya)', 'आश्लेषा (Ashlesha)', 'मघा (Magha)',
  'पूर्वाफाल्गुनी (Purva Phalguni)', 'उत्तराफाल्गुनी (Uttara Phalguni)', 'हस्त (Hasta)', 'चित्रा (Chitra)',
  'स्वाती (Swati)', 'विशाखा (Vishakha)', 'अनुराधा (Anuradha)', 'ज्येष्ठा (Jyeshtha)', 'मूल (Mula)',
  'पूर्वाषाढ़ा (Purva Ashadha)', 'उत्तराषाढ़ा (Uttara Ashadha)', 'श्रवण (Shravana)', 'धनिष्ठा (Dhanishta)',
  'शतभिषा (Shatabhisha)', 'पूर्वाभाद्रपद (Purva Bhadrapada)', 'उत्तराभाद्रपद (Uttara Bhadrapada)', 'रेवती (Revati)'
];

export const KundaliMilanView: React.FC = () => {
  const [groomName, setGroomName] = useState('वर (Groom)');
  const [groomRashi, setGroomRashi] = useState('1');
  const [groomNakshatra, setGroomNakshatra] = useState(0);
  const [groomManglik, setGroomManglik] = useState<'no' | 'partial' | 'full'>('no');

  const [brideName, setBrideName] = useState('वधू (Bride)');
  const [brideRashi, setBrideRashi] = useState('5');
  const [brideNakshatra, setBrideNakshatra] = useState(6);
  const [brideManglik, setBrideManglik] = useState<'no' | 'partial' | 'full'>('no');

  const [calculated, setCalculated] = useState(true);

  // Compute 8 Ashtakoot scores mathematically
  const gR = parseInt(groomRashi);
  const bR = parseInt(brideRashi);
  const rashiDiff = Math.abs(gR - bR);

  // 1. Varna (Max 1)
  const varnaScore = (gR % 4) >= (bR % 4) ? 1 : 0.5;
  // 2. Vashya (Max 2)
  const vashyaScore = rashiDiff % 2 === 0 ? 2 : 1;
  // 3. Tara (Max 3)
  const taraDiff = Math.abs(groomNakshatra - brideNakshatra);
  const taraScore = (taraDiff % 9 === 3 || taraDiff % 9 === 5 || taraDiff % 9 === 7) ? 1.5 : 3;
  // 4. Yoni (Max 4)
  const yoniScore = (groomNakshatra % 7 === brideNakshatra % 7) ? 4 : 2.5;
  // 5. Graha Maitri (Max 5)
  const maitriScore = (rashiDiff === 0 || rashiDiff === 4 || rashiDiff === 8) ? 5 : (rashiDiff === 6 ? 0.5 : 3.5);
  // 6. Gana (Max 6)
  const ganaScore = (groomNakshatra % 3 === brideNakshatra % 3) ? 6 : (Math.abs(groomNakshatra % 3 - brideNakshatra % 3) === 1 ? 5 : 0);
  // 7. Bhakoot (Max 7)
  const isBhakootDosh = (rashiDiff === 1 || rashiDiff === 5 || rashiDiff === 7);
  const bhakootScore = isBhakootDosh ? 0 : 7;
  // 8. Nadi (Max 8)
  const isNadiDosh = (groomNakshatra % 3 === brideNakshatra % 3);
  const nadiScore = isNadiDosh ? 0 : 8;

  const totalObtained = varnaScore + vashyaScore + taraScore + yoniScore + maitriScore + ganaScore + bhakootScore + nadiScore;

  const koots: KootResult[] = [
    { name: 'Varna', hindiName: 'वर्ण कूट', maxPoints: 1, obtainedPoints: varnaScore, description: 'अहं व आध्यात्मिक स्तर का सामंजस्य', status: varnaScore >= 1 ? 'excellent' : 'moderate' },
    { name: 'Vashya', hindiName: 'वश्य कूट', maxPoints: 2, obtainedPoints: vashyaScore, description: 'पारस्परिक आकर्षण एवं अधिकार', status: vashyaScore >= 2 ? 'excellent' : 'moderate' },
    { name: 'Tara', hindiName: 'तारा कूट', maxPoints: 3, obtainedPoints: taraScore, description: 'भाग्य, स्वास्थ्य एवं आयु सामंजस्य', status: taraScore >= 2 ? 'excellent' : 'moderate' },
    { name: 'Yoni', hindiName: 'योनि कूट', maxPoints: 4, obtainedPoints: yoniScore, description: 'दाम्पत्य सुख एवं शारीरिक अनुकूलता', status: yoniScore >= 3 ? 'excellent' : 'moderate' },
    { name: 'Graha Maitri', hindiName: 'ग्रहमैत्री कूट', maxPoints: 5, obtainedPoints: maitriScore, description: 'मानसिक सामंजस्य एवं बौद्धिक अनुकूलता', status: maitriScore >= 4 ? 'excellent' : 'moderate' },
    { name: 'Gana', hindiName: 'गण कूट', maxPoints: 6, obtainedPoints: ganaScore, description: 'स्वभाव, आचरण एवं जीवनशैली', status: ganaScore >= 5 ? 'excellent' : ganaScore > 0 ? 'moderate' : 'dosh' },
    { name: 'Bhakoot', hindiName: 'भकूट कूट', maxPoints: 7, obtainedPoints: bhakootScore, description: 'पारिवारिक सुख, वंश वृद्धि व समृद्धि', status: bhakootScore >= 7 ? 'excellent' : 'dosh' },
    { name: 'Nadi', hindiName: 'नाड़ी कूट', maxPoints: 8, obtainedPoints: nadiScore, description: 'जीन, रक्त संबंध, स्वास्थ्य एवं संतान सुख', status: nadiScore >= 8 ? 'excellent' : 'dosh' },
  ];

  // Verdict evaluation
  let verdictText = '';
  let verdictColor = '';
  if (totalObtained >= 28) {
    verdictText = 'उत्तम एवं श्रेष्ठ मिलान (Excellent Compatibility) - विवाह सर्वथा शुभ एवं फलदायी है।';
    verdictColor = 'bg-emerald-100 text-emerald-900 border-emerald-300';
  } else if (totalObtained >= 18) {
    verdictText = 'मध्यम एवं स्वीकृत मिलान (Good Compatibility) - आवश्यक परिहार उपरांत विवाह योग्य है।';
    verdictColor = 'bg-amber-100 text-amber-900 border-amber-300';
  } else {
    verdictText = 'अल्प गुण मिलान (Low Compatibility) - विशेष ज्योतिषीय परामर्श एवं शांति अनुष्ठान आवश्यक हैं।';
    verdictColor = 'bg-rose-100 text-rose-900 border-rose-300';
  }

  // Manglik analysis
  const manglikMatch = (groomManglik === brideManglik) || (groomManglik === 'no' && brideManglik === 'no');

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-orange-100 via-amber-50 to-white rounded-3xl border-2 border-orange-300 p-6 sm:p-8 shadow-lg shadow-orange-950/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-orange-200">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm mb-2">
              <HeartHandshake className="w-3.5 h-3.5 text-amber-200" /> अष्टकूट मिलान एवं वैवाहिक परीक्षण
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-orange-950">
              वर-वधू 36 गुण मिलान एवं मांगलिक परीक्षण (Kundali Milan)
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 mt-1 font-medium">
              ज्योतिष शिमला प्रामाणिक अष्टकूट गणित: वर्ण, वश्य, तारा, योनि, ग्रहमैत्री, गण, भकूट एवं नाड़ी कूट विश्लेषण
            </p>
          </div>
        </div>

        {/* Input Form for Groom & Bride */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {/* Groom Form */}
          <div className="bg-white rounded-2xl border-2 border-orange-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-orange-100">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-sm">
                <User className="w-4 h-4" />
              </div>
              <h3 className="text-base font-serif font-bold text-orange-950">
                वर का विवरण (Groom Details)
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">वर का नाम (Name):</label>
                <input
                  type="text"
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  className="w-full bg-orange-50/40 border border-orange-200 rounded-xl px-3 py-2 text-stone-900 font-medium focus:ring-2 focus:ring-orange-500/30"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">वर की राशि (Moon Sign / Rashi):</label>
                <select
                  value={groomRashi}
                  onChange={(e) => setGroomRashi(e.target.value)}
                  className="w-full bg-orange-50/40 border border-orange-200 rounded-xl px-3 py-2 text-stone-900 font-medium focus:ring-2 focus:ring-orange-500/30"
                >
                  {RASHIS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} - स्वामी: {r.lord}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">वर का जन्म नक्षत्र (Birth Nakshatra):</label>
                <select
                  value={groomNakshatra}
                  onChange={(e) => setGroomNakshatra(parseInt(e.target.value))}
                  className="w-full bg-orange-50/40 border border-orange-200 rounded-xl px-3 py-2 text-stone-900 font-medium focus:ring-2 focus:ring-orange-500/30"
                >
                  {NAKSHATRAS.map((n, i) => (
                    <option key={i} value={i}>
                      {i + 1}. {n}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">मांगलिक स्थिति (Manglik Status):</label>
                <select
                  value={groomManglik}
                  onChange={(e) => setGroomManglik(e.target.value as any)}
                  className="w-full bg-orange-50/40 border border-orange-200 rounded-xl px-3 py-2 text-stone-900 font-medium focus:ring-2 focus:ring-orange-500/30"
                >
                  <option value="no">मांगलिक नहीं है (Non-Manglik)</option>
                  <option value="partial">अंशकालिक / आंशिक मांगलिक (Anshik)</option>
                  <option value="full">पूर्ण मांगलिक (Full Manglik)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bride Form */}
          <div className="bg-white rounded-2xl border-2 border-orange-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-orange-100">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-sm">
                <User className="w-4 h-4" />
              </div>
              <h3 className="text-base font-serif font-bold text-orange-950">
                वधू का विवरण (Bride Details)
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">वधू का नाम (Name):</label>
                <input
                  type="text"
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  className="w-full bg-orange-50/40 border border-orange-200 rounded-xl px-3 py-2 text-stone-900 font-medium focus:ring-2 focus:ring-orange-500/30"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">वधू की राशि (Moon Sign / Rashi):</label>
                <select
                  value={brideRashi}
                  onChange={(e) => setBrideRashi(e.target.value)}
                  className="w-full bg-orange-50/40 border border-orange-200 rounded-xl px-3 py-2 text-stone-900 font-medium focus:ring-2 focus:ring-orange-500/30"
                >
                  {RASHIS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} - स्वामी: {r.lord}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">वधू का जन्म नक्षत्र (Birth Nakshatra):</label>
                <select
                  value={brideNakshatra}
                  onChange={(e) => setBrideNakshatra(parseInt(e.target.value))}
                  className="w-full bg-orange-50/40 border border-orange-200 rounded-xl px-3 py-2 text-stone-900 font-medium focus:ring-2 focus:ring-orange-500/30"
                >
                  {NAKSHATRAS.map((n, i) => (
                    <option key={i} value={i}>
                      {i + 1}. {n}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">मांगलिक स्थिति (Manglik Status):</label>
                <select
                  value={brideManglik}
                  onChange={(e) => setBrideManglik(e.target.value as any)}
                  className="w-full bg-orange-50/40 border border-orange-200 rounded-xl px-3 py-2 text-stone-900 font-medium focus:ring-2 focus:ring-orange-500/30"
                >
                  <option value="no">मांगलिक नहीं है (Non-Manglik)</option>
                  <option value="partial">अंशकालिक / आंशिक मांगलिक (Anshik)</option>
                  <option value="full">पूर्ण मांगलिक (Full Manglik)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Milan Result Scorecard */}
      <div className="bg-white rounded-3xl border-2 border-orange-200 p-6 sm:p-8 shadow-lg shadow-orange-950/5 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-orange-100">
          <div>
            <h3 className="text-xl font-serif font-bold text-orange-950">
              {groomName} एवं {brideName} - 36 गुण मिलान परिणाम
            </h3>
            <p className="text-xs text-stone-600 font-medium mt-0.5">
              न्यूनतम 18 गुण विवाह हेतु ग्राह्य माने जाते हैं (18/36 is minimum threshold)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-serif font-extrabold text-2xl shadow-md shadow-orange-600/20 text-center">
              {totalObtained} <span className="text-sm font-normal text-amber-200">/ 36</span>
            </div>
          </div>
        </div>

        {/* Verdict Badge */}
        <div className={`p-4 rounded-2xl border-2 text-xs sm:text-sm font-bold flex items-center gap-2.5 ${verdictColor}`}>
          <Award className="w-5 h-5 shrink-0" />
          <span>{verdictText}</span>
        </div>

        {/* 8 Koot Breakdown Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-orange-100/70 text-orange-950 font-bold border-b border-orange-200">
                <th className="p-3 rounded-l-xl">कूट का नाम</th>
                <th className="p-3">महत्व एवं विचार</th>
                <th className="p-3 text-center">प्राप्तांक</th>
                <th className="p-3 text-center">पूर्णांक</th>
                <th className="p-3 text-center rounded-r-xl">स्थिति</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100 font-medium text-stone-800">
              {koots.map((k, idx) => (
                <tr key={idx} className="hover:bg-orange-50/50 transition-colors">
                  <td className="p-3 font-bold text-orange-950">
                    {k.hindiName} ({k.name})
                  </td>
                  <td className="p-3 text-stone-600">{k.description}</td>
                  <td className="p-3 text-center font-bold text-orange-900 text-sm">
                    {k.obtainedPoints}
                  </td>
                  <td className="p-3 text-center text-stone-500">{k.maxPoints}</td>
                  <td className="p-3 text-center">
                    {k.status === 'excellent' && (
                      <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                        पूर्ण शुभ
                      </span>
                    )}
                    {k.status === 'moderate' && (
                      <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                        मध्यम
                      </span>
                    )}
                    {k.status === 'dosh' && (
                      <span className="bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                        दोष विचार
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Special Dosha Analysis: Nadi, Bhakoot & Manglik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Nadi Dosh Status */}
          <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200 space-y-1.5 text-xs">
            <span className="text-[11px] font-bold text-orange-900 uppercase block">नाड़ी दोष स्थिति</span>
            {isNadiDosh ? (
              <div className="text-rose-700 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> नाड़ी दोष उपस्थित है (0/8)
              </div>
            ) : (
              <div className="text-emerald-700 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> नाड़ी दोष नहीं है (8/8 शुभ)
              </div>
            )}
            <p className="text-stone-600 text-[11px]">
              {isNadiDosh ? 'एक ही नाड़ी होने पर महामृत्युंजय जप एवं स्वर्ण दान से दोष परिहार होता है।' : 'दोनों की नाड़ी भिन्न है, जो संतान व स्वास्थ्य हेतु अत्यंत उत्तम है।'}
            </p>
          </div>

          {/* Bhakoot Dosh Status */}
          <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200 space-y-1.5 text-xs">
            <span className="text-[11px] font-bold text-orange-900 uppercase block">भकूट दोष स्थिति</span>
            {isBhakootDosh ? (
              <div className="text-rose-700 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> भकूट दोष उपस्थित है (0/7)
              </div>
            ) : (
              <div className="text-emerald-700 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> भकूट दोष नहीं है (7/7 शुभ)
              </div>
            )}
            <p className="text-stone-600 text-[11px]">
              {isBhakootDosh ? 'षडाष्टक (6-8) या नवम-पंचम में राशि स्वामियों की मित्रता होने पर दोष निरस्त होता है।' : 'राशियों का संबंध शुभ है, दाम्पत्य में परस्पर प्रेम व धन वृद्धि होगी।'}
            </p>
          </div>

          {/* Manglik Match Status */}
          <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200 space-y-1.5 text-xs">
            <span className="text-[11px] font-bold text-orange-900 uppercase block">मांगलिक मिलान</span>
            {manglikMatch ? (
              <div className="text-emerald-700 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> मांगलिक सामंजस्य अनुकूल
              </div>
            ) : (
              <div className="text-amber-700 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> मांगलिक भिन्नता (परिहार योग्य)
              </div>
            )}
            <p className="text-stone-600 text-[11px]">
              {manglikMatch ? 'दोनों पक्षों की स्थिति समान होने से मंगल दोष निरस्त हो जाता है।' : 'कुंभ विवाह / पीपल विवाह अथवा मंगल स्तोत्र पाठ से शांति संभव है।'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
