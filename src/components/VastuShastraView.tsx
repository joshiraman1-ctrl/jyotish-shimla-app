import React, { useState } from 'react';
import { Home, Compass, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, Layers } from 'lucide-react';

interface ZoneItem {
  direction: string;
  hindiName: string;
  element: string;
  deity: string;
  bestFor: string;
  avoid: string;
  remedy: string;
}

const VASTU_ZONES: ZoneItem[] = [
  {
    direction: 'North-East (NE)',
    hindiName: 'ईशान कोण (Ishanya)',
    element: 'जल तत्व (Water)',
    deity: 'भगवान शिव / गुरु',
    bestFor: 'पूजा घर, ध्यान कक्ष, खुला स्थान, भूमिगत जल कुंड (Underground Water)',
    avoid: 'शौचालय, रसोई, भारी सीढ़ियां, कचरा पेटी या भारी गोदाम',
    remedy: 'ईशान में जल से भरा तांबे का कलश रखें अथवा गायत्री मंत्र पट्टी लगाएं।'
  },
  {
    direction: 'East (E)',
    hindiName: 'पूर्व दिशा (Purva)',
    element: 'वायु / सूर्य तत्व (Sun/Air)',
    deity: 'इन्द्र देव / सूर्य',
    bestFor: 'मुख्य प्रवेश द्वार, बैठक (Living room), अध्ययन कक्ष, बालकनी',
    avoid: 'शौचालय, स्टोर रूम, भारी दीवारें',
    remedy: 'पूर्व में तांबे का सूर्य यंत्र स्थापित करें एवं सूर्य नमस्कार करें।'
  },
  {
    direction: 'South-East (SE)',
    hindiName: 'आग्नेय कोण (Agneya)',
    element: 'अग्नि तत्व (Fire)',
    deity: 'अग्नि देव / शुक्र',
    bestFor: 'रसोई घर (Kitchen), विद्युत मीटर, ट्रांसफार्मर, जनरेटर',
    avoid: 'जल की टंकी, बोरिंग, शौचालय, शयनकक्ष',
    remedy: 'आग्नेय में लाल बल्ब जलाएं अथवा ताम्र पिरामिड स्थापित करें।'
  },
  {
    direction: 'South (S)',
    hindiName: 'दक्षिण दिशा (Dakshin)',
    element: 'अग्नि / पृथ्वी तत्व',
    deity: 'यम देव / मंगल',
    bestFor: 'शयन कक्ष, भारी सामान, अलमारी, तिजोरी का मुख उत्तर की ओर',
    avoid: 'मुख्य द्वार (यदि अशुभ पद में हो), जल प्रवाह, खुला कुआं',
    remedy: 'दक्षिण दिशा में लाल या भूरे रंग का प्रयोग करें एवं दीवार को भारी रखें।'
  },
  {
    direction: 'South-West (SW)',
    hindiName: 'नैऋत्य कोण (Nairutya)',
    element: 'पृथ्वी तत्व (Earth)',
    deity: 'नैऋति / राहु',
    bestFor: 'गृहस्वामी का मुख्य शयनकक्ष (Master Bedroom), भारी तिजोरी',
    avoid: 'भूमिगत जल, कुआं, मुख्य द्वार, पूजा घर, शौचालय',
    remedy: 'नैऋत्य को सबसे ऊंचा व भारी रखें, पीतल का हाथी अथवा राहु यंत्र रखें।'
  },
  {
    direction: 'West (W)',
    hindiName: 'पश्चिम दिशा (Pashchim)',
    element: 'वायु / आकाश तत्व',
    deity: 'वरुण देव / शनि',
    bestFor: 'भोजन कक्ष (Dining room), अध्ययन कक्ष, बच्चों का कमरा',
    avoid: 'नीचा फर्श, जल का गड्ढा',
    remedy: 'पश्चिम दिशा में सफेद या नीला रंग उपयुक्त है, शनि यंत्र लगाएं।'
  },
  {
    direction: 'North-West (NW)',
    hindiName: 'वायव्य कोण (Vayavya)',
    element: 'वायु तत्व (Air)',
    deity: 'वायु देव / चंद्र',
    bestFor: 'अतिथि कक्ष (Guest Room), विवाह योग्य कन्या का कमरा, वाहन पार्किंग',
    avoid: 'गृहस्वामी का शयनकक्ष, भारी निर्माण, रसोई',
    remedy: 'वायव्य में सफेद शंख रखें अथवा पवन घंटी (Wind Chime) लगाएं।'
  },
  {
    direction: 'North (N)',
    hindiName: 'उत्तर दिशा (Uttar)',
    element: 'जल तत्व (Water)',
    deity: 'कुबेर देव / बुध',
    bestFor: 'मुख्य द्वार, तिजोरी (धन संचय), बैठक, खुला आंगन',
    avoid: 'शौचालय, भारी दीवार, कूड़ादान, बंद कमरा',
    remedy: 'उत्तर दिशा में कुबेर यंत्र, मनी प्लांट या बहते जल का चित्र लगाएं।'
  },
  {
    direction: 'Center',
    hindiName: 'ब्रह्मस्थान (Brahmasthan)',
    element: 'आकाश तत्व (Ether)',
    deity: 'भगवान ब्रह्मा',
    bestFor: 'खुला आंगन, प्रकाश, सकारात्मक ऊर्जा का संचार',
    avoid: 'कोई भी निर्माण, भारी खंभा, बीम, शौचालय, रसोई या गड्ढा',
    remedy: 'ब्रह्मस्थान को सदैव स्वच्छ, हल्का एवं प्रकाशमय रखें।'
  }
];

export const VastuShastraView: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<ZoneItem>(VASTU_ZONES[0]);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-orange-100 via-amber-50 to-white rounded-3xl border-2 border-orange-300 p-6 sm:p-8 shadow-lg shadow-orange-950/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-orange-200">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm mb-2">
              <Home className="w-3.5 h-3.5 text-amber-200" /> वैदिक वास्तु शास्त्र एवं भू-ऊर्जा
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-orange-950">
              वैदिक वास्तु शास्त्र एवं 16 दिशा चक्र (Vedic Vastu Shastra)
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 mt-1 font-medium">
              पंचतत्व (अग्नि, पृथ्वी, वायु, जल, आकाश) संतुलन, आवासीय व व्यावसायिक वास्तु दोष निवारण बिना तोड़-फोड़
            </p>
          </div>
        </div>

        {/* Direction Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-6">
          {VASTU_ZONES.map((z, idx) => {
            const isSelected = selectedZone.direction === z.direction;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedZone(z)}
                className={`p-3 rounded-2xl text-left transition-all border-2 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-md shadow-orange-600/20 font-bold'
                    : 'bg-white text-stone-800 border-orange-200 hover:bg-orange-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] uppercase font-bold ${isSelected ? 'text-amber-200' : 'text-orange-700'}`}>
                    {z.direction}
                  </span>
                  <Compass className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-orange-500'}`} />
                </div>
                <strong className="text-xs font-serif mt-1 block">
                  {z.hindiName}
                </strong>
                <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-orange-100' : 'text-stone-500'}`}>
                  {z.element}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Direction Detail */}
      <div className="bg-white rounded-3xl border-2 border-orange-200 p-6 sm:p-8 shadow-lg shadow-orange-950/5 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-orange-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-orange-100 border border-orange-300 text-orange-800 flex items-center justify-center font-bold text-xs">
                {selectedZone.direction.split(' ')[0]}
              </span>
              <h3 className="text-xl font-serif font-bold text-orange-950">
                {selectedZone.hindiName} ({selectedZone.direction})
              </h3>
            </div>
            <p className="text-xs text-stone-600 font-medium mt-1">
              अधिष्ठाता देव: <strong className="text-orange-900">{selectedZone.deity}</strong> • तत्व: <strong className="text-orange-900">{selectedZone.element}</strong>
            </p>
          </div>
        </div>

        {/* 3 Columns: Best For, Avoid, Remedies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
          {/* Best for */}
          <div className="bg-emerald-50/60 p-5 rounded-2xl border-2 border-emerald-200 space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-950 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>शुभ निर्माण एवं उपयोग (Ideal Placement)</span>
            </div>
            <p className="text-stone-800 leading-relaxed font-medium pt-1">
              {selectedZone.bestFor}
            </p>
          </div>

          {/* Avoid */}
          <div className="bg-rose-50/60 p-5 rounded-2xl border-2 border-rose-200 space-y-2">
            <div className="flex items-center gap-1.5 text-rose-950 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>वर्जित निर्माण एवं दोष (Must Avoid)</span>
            </div>
            <p className="text-stone-800 leading-relaxed font-medium pt-1">
              {selectedZone.avoid}
            </p>
          </div>

          {/* Remedy */}
          <div className="bg-orange-50/70 p-5 rounded-2xl border-2 border-orange-200 space-y-2">
            <div className="flex items-center gap-1.5 text-orange-950 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>सरल वास्तु उपाय (Non-demolition Remedy)</span>
            </div>
            <p className="text-stone-800 leading-relaxed font-medium pt-1">
              {selectedZone.remedy}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
