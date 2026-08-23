import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Flame, Sparkles, CheckCircle2, BookOpen, Layers } from 'lucide-react';

interface DoshaItem {
  id: string;
  name: string;
  sanskritName: string;
  icon: string;
  houses: string;
  symptoms: string[];
  remedies: string[];
  mantra: string;
}

const DOSHAS: DoshaItem[] = [
  {
    id: 'kaalsarp',
    name: 'कालसर्प योग / दोष (Kaal Sarp Dosh)',
    sanskritName: 'अनन्त आदि द्वादश कालसर्प योग',
    icon: '🐍',
    houses: 'जब कुंडली में राहु और केतु के मध्य सभी सातों ग्रह आ जाएं',
    symptoms: [
      'जीवन के प्रत्येक कार्य में अप्रत्याशित विलंब एवं अड़चनें',
      'स्वप्न में सांप, जल अथवा पूर्वज दिखना व भय लगना',
      'मानसिक अशांति, अनिद्रा एवं व्यापार/नौकरी में अस्थिरता',
      'कड़ी मेहनत के बाद भी उचित श्रेय व फल न मिलना'
    ],
    remedies: [
      'उज्जैन, नासिक (त्र्यंबकेश्वर) अथवा प्रयागराज में कालसर्प शांति महापूजा',
      'प्रतिदिन महामृत्युंजय मंत्र की 1 माला का नियमित जप',
      'नाग पंचमी पर चांदी के नाग-नागिन के जोड़े का बहते जल में विसर्जन',
      'रुद्राभिषेक एवं शिव मंदिर में तांबे का नाग अर्पित करना'
    ],
    mantra: 'ॐ नमः शिवाय • ॐ क्रौं नमो अस्तु सर्पेभ्यो कालसर्पाय नमः'
  },
  {
    id: 'manglik',
    name: 'मांगलिक दोष (Manglik Dosh)',
    sanskritName: 'भौम दोष / कुज दोष',
    icon: '🔥',
    houses: 'लग्न, चतुर्थ, सप्तम, अष्टम अथवा द्वादश भाव (1, 4, 7, 8, 12) में मंगल की स्थिति',
    symptoms: [
      'विवाह में अत्यधिक विलंब अथवा योग्य जीवनसाथी मिलने में बाधा',
      'दाम्पत्य जीवन में कलह, क्रोध, वैचारिक मतभेद एवं अशांति',
      'अत्यधिक उग्र स्वभाव, रक्त विकार एवं रक्तचाप की समस्या',
      'जीवनसाथी के स्वास्थ्य में बार-बार गिरावट'
    ],
    remedies: [
      'कुंभ विवाह, अर्क विवाह अथवा शालिग्राम विवाह संस्कार',
      'मंगलवार का व्रत रखना एवं सुंदरकांड / हनुमान चालीसा का नित्य पाठ',
      'लाल मसूर, तांबा अथवा रक्तचंदन का मंगलवार को दान',
      'अंगारक स्तोत्र एवं ऋणमोचक मंगल स्तोत्र का पाठ'
    ],
    mantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः • ॐ अं अंगारकाय नमः'
  },
  {
    id: 'pitra',
    name: 'पितृ दोष (Pitra Dosh)',
    sanskritName: 'पितृ ऋण एवं सूर्य-राहु युति',
    icon: '🪔',
    houses: 'नवम भाव, पंचम भाव अथवा सूर्य/गुरु पर राहु/केतु/शनि का अशुभ प्रभाव',
    symptoms: [
      'संतान प्राप्ति में विलंब अथवा संतान की प्रगति में बाधाएं',
      'घर में निरंतर आर्थिक तंगी, रोग एवं आकस्मिक दुर्घटनाएं',
      'परिवार के सदस्यों में अकारण आपसी क्लेश एवं मतभेद',
      'विवाह व मांगलिक कार्यों में बार-बार रुकावट आना'
    ],
    remedies: [
      'गया जी, हरिद्वार अथवा पिहोवा में त्रिपिंडी श्राद्ध एवं पिंडदान',
      'अमावस्या पर पितरों के निमित्त तर्पण, ब्राह्मण भोजन एवं जल दान',
      'पीपल के वृक्ष पर नित्य जल अर्पित करना एवं परिक्रमा करना',
      'श्रीमद्भगवद्गीता के 7वें अथवा 11वें अध्याय का नियमित पाठ'
    ],
    mantra: 'ॐ पितृभ्यो नमः • ॐ देवताभ्यः पितृभ्यश्च महायोगिभ्य एव च नमः'
  },
  {
    id: 'sadesati',
    name: 'शनि साढ़ेसाती एवं ढैया (Shani Sade Sati)',
    sanskritName: 'शनैश्चर महादशा / गोचर फल',
    icon: '🪐',
    houses: 'जन्म राशि से 12वें, प्रथम (जन्म राशि) व द्वितीय भाव में शनि का भ्रमण',
    symptoms: [
      'आर्थिक हानि, नौकरी छूटना अथवा व्यापार में मंदी का दौर',
      'शारीरिक दुर्बलता, जोड़ों में दर्द एवं मानसिक अवसाद (Depression)',
      'अकारण झूठे आरोप, कानूनी विवाद अथवा स्वजनों से दूरी',
      'कठिन परिश्रम के बाद ही अल्प सफलता मिलना'
    ],
    remedies: [
      'शनिवार को पीपल के नीचे सरसों के तेल का चौमुखा दीपक जलाना',
      'दशरथकृत शनि स्तोत्र का शनिवार को 11 बार पाठ करना',
      'काले तिल, उड़द, लोहा, काला कंबल अथवा जूतों का दान करना',
      'हनुमान जी की उपासना एवं ॐ शं शनैश्चराय नमः का 108 बार जप'
    ],
    mantra: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः • ॐ नीलांजन समाभासं रविपुत्रं यमाग्रजम्'
  },
  {
    id: 'gandmool',
    name: 'गंडमूल दोष (Gandmool Dosh)',
    sanskritName: 'मूल, ज्येष्ठा, आश्लेषा, मघा, रेवती, अश्विनी नक्षत्र जनित',
    icon: '⭐',
    houses: 'केतु (अश्विनी, मघा, मूल) अथवा बुध (आश्लेषा, ज्येष्ठा, रेवती) के नक्षत्रों में जन्म',
    symptoms: [
      'शैशवावस्था में स्वास्थ्य विकार एवं बार-बार बीमार पड़ना',
      'माता, पिता अथवा मामा के स्वास्थ्य या भाग्य पर प्रभाव',
      'बाल्यावस्था में चंचलता एवं शिक्षा में एकाग्रता की कमी'
    ],
    remedies: [
      'जन्म के 27वें दिन 27 पेड़ों के पत्तों व 27 कुओं के जल से मूल शांति पूजन',
      'गाय को हरा चारा खिलाना एवं गणेश जी को 21 दूर्वा अर्पित करना',
      'बुध एवं केतु के वैदिक मंत्रों का विधिवत जप कराना'
    ],
    mantra: 'ॐ गं गणपतये नमः • ॐ बुं बुधाय नमः • ॐ कें केतवे नमः'
  }
];

export const DoshNivaranView: React.FC = () => {
  const [selectedDosha, setSelectedDosha] = useState<DoshaItem>(DOSHAS[0]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-orange-100 via-amber-50 to-white rounded-3xl border-2 border-orange-300 p-6 sm:p-8 shadow-lg shadow-orange-950/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-orange-200">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-200" /> प्रामाणिक शास्त्रोक्त दोष शांति
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-orange-950">
              कुंडली दोष विचार एवं अचूक वैदिक निवारण (Dosha Analysis & Remedies)
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 mt-1 font-medium">
              कालसर्प योग, मांगलिक दोष, पितृ दोष, शनि साढ़ेसाती व गंडमूल दोष के लक्षण एवं शास्त्रोक्त शांति विधान
            </p>
          </div>
        </div>

        {/* Dosha Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-2 scrollbar-thin scrollbar-thumb-orange-400">
          {DOSHAS.map((d) => {
            const isSelected = selectedDosha.id === d.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedDosha(d)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border-2 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-md shadow-orange-600/20'
                    : 'bg-white text-stone-700 border-orange-200 hover:bg-orange-50'
                }`}
              >
                <span>{d.icon}</span>
                <span>{d.name.split('(')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Dosha Deep-Dive Card */}
      <div className="bg-white rounded-3xl border-2 border-orange-200 p-6 sm:p-8 shadow-lg shadow-orange-950/5 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-orange-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 border border-orange-300 text-2xl flex items-center justify-center shadow-sm">
              {selectedDosha.icon}
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-orange-950">
                {selectedDosha.name}
              </h3>
              <span className="text-xs text-orange-700 font-semibold">
                {selectedDosha.sanskritName}
              </span>
            </div>
          </div>

          <div className="bg-orange-50 px-4 py-2 rounded-xl border border-orange-200 text-xs">
            <span className="text-stone-500 font-medium">कुंडली में स्थिति:</span>{' '}
            <strong className="text-orange-950 font-bold">{selectedDosha.houses}</strong>
          </div>
        </div>

        {/* 2 Column: Symptoms vs Remedies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Symptoms */}
          <div className="bg-rose-50/50 rounded-2xl border-2 border-rose-200 p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-950 font-serif font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>प्रमुख लक्षण एवं जीवन पर प्रभाव (Symptoms)</span>
            </div>

            <ul className="space-y-2 text-xs text-stone-800">
              {selectedDosha.symptoms.map((sym, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                  <span className="font-medium">{sym}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Authentic Remedies */}
          <div className="bg-emerald-50/50 rounded-2xl border-2 border-emerald-200 p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-950 font-serif font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>शास्त्रोक्त वैदिक शांति एवं अचूक उपाय (Remedies)</span>
            </div>

            <ul className="space-y-2 text-xs text-stone-800">
              {selectedDosha.remedies.map((rem, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span className="font-medium">{rem}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Shanti Mantra Card */}
        <div className="bg-orange-100/70 rounded-2xl border-2 border-orange-300 p-5 space-y-2">
          <div className="flex items-center gap-2 text-orange-950 font-bold text-xs">
            <Flame className="w-4 h-4 text-orange-600" />
            <span>दोष शांति हेतु दैनिक जप मंत्र (Daily Shanti Mantra)</span>
          </div>
          <p className="font-serif text-base sm:text-lg font-bold text-orange-950 bg-white p-3 rounded-xl border border-orange-200 shadow-sm text-center">
            {selectedDosha.mantra}
          </p>
          <span className="text-[11px] text-stone-600 text-center block font-medium">
            * प्रातःकाल स्नानादि उपरांत पूर्व अथवा उत्तर दिशा की ओर मुख करके 108 बार जप करें।
          </span>
        </div>
      </div>
    </div>
  );
};
