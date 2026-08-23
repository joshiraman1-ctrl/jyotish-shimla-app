import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppLanguage = 'hi' | 'en';

export interface LanguageContextType {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  t: (key: string, defaultText?: string) => string;
}

export const translations: Record<AppLanguage, Record<string, string>> = {
  hi: {
    // Header & Meta
    'app.title': 'ज्योतिष शिमला',
    'app.subtitle': 'वैदिक ज्योतिष एवं बहुआयामी चेतना प्रणाली',
    'app.tagline': 'देवभूमि हिमाचल • ज्योतिष शिमला',
    'app.principles': 'वैदिक पराशर सिद्धांत • महर्षि जैमिनी सूत्र • प्रामाणिक गणना',
    'app.official_website': 'आधिकारिक वेबसाइट ज्योतिष शिमला',

    // Tabs
    'tab.home': 'मुख्य पृष्ठ',
    'tab.birth_chart': 'जन्म विवरण, चक्र व विश्लेषण',
    'tab.prashna': 'प्रश्न कुंडली व उत्तर',
    'tab.milan': '36 गुण मिलान',
    'tab.panchang': 'दैनिक पंचांग व मुहूर्त',
    'tab.dosh': 'दोष विचार व शांति',
    'tab.gemstones': 'रत्न व रुद्राक्ष',
    'tab.remedies': 'वैदिक मंत्र व जप',
    'tab.vastu': 'वास्तु शास्त्र',
    'tab.esoteric': 'गूढ़ चेतना',
    'tab.chat': 'ज्योतिषी संवाद',
    'tab.portal': 'ज्योतिष शिमला सेवाएं',
    'tab.editor': 'पेज व कोड संपादक',

    // Home Hero
    'hero.badge': 'देवभूमि हिमाचल • ज्योतिष शिमला आधिकारिक बुद्धि इंजन',
    'hero.title': 'प्रामाणिक वैदिक ज्योतिष एवं बहुआयामी चेतना प्रणाली',
    'hero.desc': 'महर्षि पराशर एवं जैमिनी सूत्रों पर आधारित सटीक लग्न, राशि, ग्रह स्थिति, विंशोत्तरी महादशा, गोचर, मांगलिक व साढ़ेसाती विश्लेषण, सटीक रत्न विधान तथा चेतना का मार्गदर्शन प्राप्त करें।',
    'hero.btn_kundali': 'जन्म विवरण, चक्र व विश्लेषण',
    'hero.btn_prashna': 'प्रश्न कुंडली व उत्तर',
    'hero.btn_chat': 'ज्योतिषी से पूछें',

    // Home Directory
    'directory.title': 'सभी मुख्य ज्योतिषीय पृष्ठ एवं सेवाएं',
    'directory.desc': 'किसी भी अनुभाग को पूर्ण पृष्ठ में खोलने के लिए उस पर क्लिक करें:',
    'directory.open': 'पेज खोलें',

    // Card descriptions
    'card.birth_chart.desc': 'जन्म विवरण दर्ज कर तुरंत लग्न, नवमांश, कुंडली विश्लेषण व फलादेश, 120 वर्षीय विंशोत्तरी महादशा व ग्रह गोचर देखें।',
    'card.prashna.desc': 'तात्कालिक समय व स्थान के आकाशीय ग्रहों के आधार पर अपने किसी भी प्रश्न का सटीक उत्तर व मार्गदर्शन पाएं।',
    'card.milan.desc': 'वर-वधू की जन्म पत्रिका के 36 अष्टकूट गुणों, नाड़ी दोष, भकूट दोष, मांगलिक सामंजस्य एवं वैवाहिक सुख की जांच।',
    'card.panchang.desc': 'तिथि, वार, नक्षत्र, योग, करण, सूर्योदय व सूर्यास्त, राहुकाल, चौघड़िया एवं शुभ मुहूर्त का पंचांग।',
    'card.dosh.desc': 'मांगलिक दोष, कालसर्प योग, साढ़ेसाती, पितृ दोष, ग्रहण योग की पहचान एवं शास्त्रीय निवारण।',
    'card.gemstones.desc': 'लग्न व भाग्येश अनुसार शुभ रत्न, धारण विधि, धातु, नक्षत्र एवं वैदिक रुद्राक्ष की सटीक अनुशंसा।',
    'card.remedies.desc': 'ग्रह शांति वैदिक मंत्र, बीज मंत्र, तांत्रिक मंत्र, स्त्रोत पाठ, दान सामग्री एवं अनुष्ठान विधान।',
    'card.vastu.desc': 'गृह, व्यापार व कार्यालय हेतु 16 दिशाओं का वास्तु चक्र, पंचतत्व संतुलन, मुख्य द्वार व दोष निवारण।',
    'card.esoteric.desc': 'भौतिक से ब्रह्मांडीय चेतना तक की आध्यात्मिक यात्रा, चक्र जागरण, कुंडलिनी व आत्म-साक्षात्कार।',
    'card.chat.desc': 'वैदिक ज्योतिष एवं आध्यात्मिक विषयों पर बुद्धिमान ज्योतिषी से सीधी बातचीत व समाधान।',
    'card.portal.desc': 'पंडित सूर्यांशु जोशी जी की ज्योतिष शिमला की आधिकारिक सेवाएं, परामर्श अपॉइंटमेंट व संपर्क विवरण।',
    'card.editor.desc': 'अपनी आवश्यकतानुसार नया ज्योतिषीय पृष्ठ बनाएं, लेआउट अनुकूलित करें अथवा कोड संपादित करें।',

    // Birth Form
    'form.title': 'प्राथमिक जन्म विवरण',
    'form.desc': 'सटीक लग्न, राशि, नक्षत्र, ग्रह स्थिति एवं महादशा गणना हेतु अपना जन्म विवरण दर्ज करें।',
    'form.name': 'जातक का नाम',
    'form.gender': 'लिंग',
    'form.male': 'पुरुष',
    'form.female': 'स्त्री',
    'form.other': 'अन्य',
    'form.dob': 'जन्म तिथि',
    'form.tob': 'सटीक जन्म समय',
    'form.pob': 'जन्म स्थान (शहर / राज्य)',
    'form.lat': 'अक्षांश',
    'form.lon': 'देशांतर',
    'form.tz': 'समय क्षेत्र (जीएमटी+)',
    'form.submit': 'जन्म कुंडली एवं चक्र बनाएं',
    'form.submitting': 'वैदिक गणना जारी है...',
    'form.popular_cities': 'प्रमुख स्थान तुरंत चुनें:',

    // Kundali Matrix & Subsections
    'matrix.title': 'जन्म विवरण, कुण्डली चक्र व विश्लेषण',
    'matrix.desc': 'जातक का विवरण दर्ज या संपादित करें और तुरंत नीचे लग्न चक्र, नवमांश चक्र, विस्तृत कुंडली फलादेश व विश्लेषण, 120 वर्षीय विंशोत्तरी महादशा एवं ग्रह गोचर का वास्तविक विश्लेषण प्राप्त करें।',
    'matrix.tab_all': 'सम्पूर्ण संयुक्त दृश्य',
    'matrix.tab_charts': 'लग्न व नवमांश चक्र',
    'matrix.tab_analysis': 'कुंडली विश्लेषण व फलादेश',
    'matrix.tab_dasha': 'विंशोत्तरी महादशा',
    'matrix.tab_gochar': 'वर्तमान ग्रह गोचर',
    'matrix.north_indian': 'उत्तर भारतीय शैली',
    'matrix.south_indian': 'दक्षिण भारतीय शैली',
    'matrix.lagna_chart': 'लग्न चक्र (प्रथम भाव)',
    'matrix.navamsha_chart': 'नवमांश चक्र (नवम भाग)',
    'matrix.both_charts': 'दोनों चक्र (लग्न + नवमांश)',
    'matrix.planet_table': 'ग्रह स्पष्ट भोगांश सारणी',
    'matrix.house_table': 'द्वादश भाव तालिका',
    'matrix.active_dasha': 'वर्तमान सक्रिय महादशा',

    // Analysis View
    'analysis.title': 'कुंडली विस्तृत विश्लेषण व वैदिक फलादेश',
    'analysis.ai_predictions': 'दिव्य वैदिक फलादेश व मार्गदर्शन',
    'analysis.houses': 'द्वादश भाव विस्तृत विवेचना',
    'analysis.planets': 'ग्रह स्थिति, अवस्था व दृष्टि',
    'analysis.dosha_remedy': 'दोष व रत्न परामर्श',
    'analysis.refresh_ai': 'नया विश्लेषण प्राप्त करें',
    'analysis.copy': 'विश्लेषण प्रतिलिपि बनाएं',
    'analysis.print': 'कुंडली मुद्रित करें',

    // Common
    'btn.save': 'सुरक्षित करें',
    'btn.calculate': 'गणना करें',
    'btn.reset': 'पुनः सेट करें',
    'btn.back_home': 'मुख्य पृष्ठ पर लौटें',
    'lang.label': 'भाषा',
  },
  en: {
    // Header & Meta
    'app.title': 'Jyotish Shimla',
    'app.subtitle': 'Vedic Astrology & Multi-Dimensional Consciousness System',
    'app.tagline': 'Devbhoomi Himachal • Jyotish Shimla',
    'app.principles': 'Parashara Principles • Jaimini Sutras • Authentic Calculations',
    'app.official_website': 'Official Jyotish Shimla Website',

    // Tabs
    'tab.home': 'Home',
    'tab.birth_chart': 'Birth Details, Charts & Analysis',
    'tab.prashna': 'Prashna Kundali',
    'tab.milan': 'Kundali Matching',
    'tab.panchang': 'Daily Panchang & Muhurat',
    'tab.dosh': 'Dosha Analysis & Remedies',
    'tab.gemstones': 'Gemstones & Rudraksha',
    'tab.remedies': 'Vedic Mantras & Upay',
    'tab.vastu': 'Vastu Shastra',
    'tab.esoteric': 'Esoteric Consciousness',
    'tab.chat': 'Ask AI Astrologer',
    'tab.portal': 'Jyotish Shimla Services',
    'tab.editor': 'Page & Code Editor',

    // Home Hero
    'hero.badge': 'Devbhoomi Himachal • Jyotish Shimla Official AI Engine',
    'hero.title': 'Authentic Vedic Astrology & Multi-Dimensional Consciousness System',
    'hero.desc': 'Receive precise Lagna, Rashi, Planetary positions, Vimshottari Mahadasha, Transits, Manglik/Sade Sati reports, Gemstone recommendations, and 1D-12D Consciousness guidance based on Maharshi Parashara principles.',
    'hero.btn_kundali': 'Birth Details, Charts & Analysis',
    'hero.btn_prashna': 'Prashna Kundali',
    'hero.btn_chat': 'Consult AI Astrologer',

    // Home Directory
    'directory.title': 'All Astrological Modules & Services',
    'directory.desc': 'Click any module below to open it in full view:',
    'directory.open': 'Open Module',

    // Card descriptions
    'card.birth_chart.desc': 'Enter birth details to instantly generate Lagna (D-1), Navamsha (D-9), in-depth Horoscope Analysis, 120-Year Vimshottari Dasha, and Planetary Transits.',
    'card.prashna.desc': 'Get precise answers and astrological insights for any query based on real-time planetary positions.',
    'card.milan.desc': 'Examine 36 Ashta Koota Gunas, Nadi Dosha, Bhakoot, Manglik compatibility, and marital harmony.',
    'card.panchang.desc': 'Comprehensive calendar of Tithi, Vaar, Nakshatra, Yoga, Karana, Sunrise/Sunset, Rahu Kaal, Choghadiya, and auspicious Muhurats.',
    'card.dosh.desc': 'Identify Manglik Dosha, Kaal Sarp Yoga, Sade Sati, Pitru Dosha, Grahan Yoga with authentic Vedic remedies.',
    'card.gemstones.desc': 'Accurate recommendations for beneficial gemstones, wearing rituals, metals, and auspicious Rudrakshas.',
    'card.remedies.desc': 'Vedic planetary peace mantras, Beej mantras, Stotra recitations, and ritual procedures.',
    'card.vastu.desc': '16-directional Vastu wheel for home and office, elemental balance, main entrance alignment, and remedies.',
    'card.esoteric.desc': 'Spiritual journey from 1D physical reality to 12D cosmic consciousness, Chakra awakening, Kundalini, and self-realization.',
    'card.chat.desc': 'Direct interactive conversation with an intelligent AI Astrologer on Vedic Astrology and spiritual questions.',
    'card.portal.desc': 'Official Jyotish Shimla services by Pandit Suryanshu Joshi, appointment booking, and contact details.',
    'card.editor.desc': 'Create custom astrological pages, personalize layouts, or edit live components seamlessly.',

    // Birth Form
    'form.title': 'Birth Details',
    'form.desc': 'Enter accurate birth details to compute Lagna, Moon sign, Nakshatra, Planetary degrees, and Mahadasha cycles.',
    'form.name': 'Full Name',
    'form.gender': 'Gender',
    'form.male': 'Male',
    'form.female': 'Female',
    'form.other': 'Other',
    'form.dob': 'Date of Birth',
    'form.tob': 'Exact Time of Birth',
    'form.pob': 'Place of Birth (City / State)',
    'form.lat': 'Latitude',
    'form.lon': 'Longitude',
    'form.tz': 'Timezone (GMT+)',
    'form.submit': 'Generate Kundali & Charts',
    'form.submitting': 'Calculating Vedic charts...',
    'form.popular_cities': 'Quick select popular cities:',

    // Kundali Matrix & Subsections
    'matrix.title': 'Birth Details, Charts & Kundali Analysis',
    'matrix.desc': 'Enter or edit birth details below to instantly view Lagna Chart, Navamsha Chart, detailed predictions, 120-Year Vimshottari Mahadasha, and current Planetary Transits.',
    'matrix.tab_all': 'All-in-One View',
    'matrix.tab_charts': 'Lagna & Navamsha Charts',
    'matrix.tab_analysis': 'Kundali Analysis & Predictions',
    'matrix.tab_dasha': 'Vimshottari Dasha',
    'matrix.tab_gochar': 'Planetary Transits',
    'matrix.north_indian': 'North Indian Style',
    'matrix.south_indian': 'South Indian Style',
    'matrix.lagna_chart': 'Lagna Chart (D-1)',
    'matrix.navamsha_chart': 'Navamsha Chart (D-9)',
    'matrix.both_charts': 'Both Charts (Lagna + Navamsha)',
    'matrix.planet_table': 'Planetary Degrees Table',
    'matrix.house_table': '12 Houses Table',
    'matrix.active_dasha': 'Current Active Mahadasha',

    // Analysis View
    'analysis.title': 'Detailed Kundali Analysis & Vedic Predictions',
    'analysis.ai_predictions': 'AI Vedic Predictions & Guidance',
    'analysis.houses': '12 Houses In-Depth Analysis',
    'analysis.planets': 'Planetary Status & Aspects',
    'analysis.dosha_remedy': 'Dosha & Gemstone Guidance',
    'analysis.refresh_ai': 'Generate Fresh Analysis',
    'analysis.copy': 'Copy Analysis',
    'analysis.print': 'Print Kundali',

    // Common
    'btn.save': 'Save',
    'btn.calculate': 'Calculate',
    'btn.reset': 'Reset',
    'btn.back_home': 'Back to Home',
    'lang.label': 'Language',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'hi',
  setLanguage: () => {},
  t: (key: string, defaultText?: string) => defaultText || key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    const saved = localStorage.getItem('jyotish_app_language');
    if (saved === 'hi' || saved === 'en') {
      return saved;
    }
    return 'hi'; // Default Hindi
  });

  const setLanguage = (lang: AppLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('jyotish_app_language', lang);
  };

  const t = (key: string, defaultText?: string): string => {
    const langDict = translations[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to Hindi dictionary
    if (translations.hi && translations.hi[key]) {
      return translations.hi[key];
    }
    return defaultText || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
