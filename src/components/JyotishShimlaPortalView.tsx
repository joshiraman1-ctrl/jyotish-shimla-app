import React from 'react';
import {
  ExternalLink,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Award,
  BookOpen,
  HeartHandshake,
  Gem,
  Compass,
  Home,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';

interface JyotishShimlaPortalViewProps {
  onOpenAnalysis?: () => void;
  onOpenGemstones?: () => void;
  onOpenRemedies?: () => void;
  onOpenChat?: () => void;
}

export const JyotishShimlaPortalView: React.FC<JyotishShimlaPortalViewProps> = ({
  onOpenAnalysis,
  onOpenGemstones,
  onOpenRemedies,
  onOpenChat,
}) => {
  const services = [
    {
      title: 'संपूर्ण जन्मपत्री निर्माण एवं जीवन फलादेश',
      englishTitle: 'Comprehensive Horoscope & Life Predictions',
      icon: Compass,
      desc: 'लग्न, राशि, नवमांश (D9), दशमांश (D10) सहित समस्त 16 वर्ग कुंडलियों का सूक्ष्म गणितीय विश्लेषण एवं प्रामाणिक भविष्य कथन।',
      points: ['विंशोत्तरी महादशा व अंतर्दशा फलादेश', 'आयु, स्वास्थ्य एवं रोग विचार', 'वार्षिक वर्षफल (ताजिक वर्षफल) विश्लेषण'],
      action: onOpenAnalysis,
      actionLabel: 'कुंडली विश्लेषण खोलें',
    },
    {
      title: 'वर-वधू विवाह गुण मिलान (36 गुण मिलान)',
      englishTitle: 'Kundali Milan & Compatibility Analysis',
      icon: HeartHandshake,
      desc: 'अष्टकूट मिलान (वर्ण, वश्य, तारा, योनि, ग्रहमैत्री, गण, भकूट, नाड़ी) एवं मांगलिक दोष की सूक्ष्म जांच व अचूक परिहार।',
      points: ['नाड़ी दोष व भकूट दोष विशेष विश्लेषण', 'वैवाहिक सुख व संतान योग परीक्षण', 'मांगलिक शांति व विवाह मुहूर्त'],
      action: onOpenChat,
      actionLabel: 'विवाह परामर्श पूछें',
    },
    {
      title: 'कैरियर, नौकरी, व्यापार एवं वित्तीय मार्गदर्शन',
      englishTitle: 'Career, Business & Financial Astrological Guidance',
      icon: Award,
      desc: 'दशम भाव, लग्नेश, धनेश व लाभेश के आधार पर सही कार्यक्षेत्र (सरकारी सेवा, निजी नौकरी, विदेश योग, व्यापार) का सटीक चयन।',
      points: ['पदोन्नति व व्यापार विस्तार समय-चक्र', 'शेयर बाजार व संपत्ति निवेश शुभता', 'ऋणमुक्ति एवं धन संचय उपाय'],
      action: onOpenAnalysis,
      actionLabel: 'कैरियर विश्लेषण देखें',
    },
    {
      title: 'वैदिक शांति अनुष्ठान एवं दोष निवारण',
      englishTitle: 'Vedic Dosha Shanti & Ritual Remedies',
      icon: Sparkles,
      desc: 'कालसर्प योग, पितृ दोष, साढ़ेसाती, ढैया, ग्रहण दोष, चांडाल दोष एवं केंद्राधिपति दोषों की प्रामाणिक वैदिक शांति व जप विधि।',
      points: ['नवग्रह शांति पाठ एवं हवन विधान', 'रुद्राभिषेक एवं महामृत्युंजय जप', 'दान-पुण्य एवं तीर्थ स्नान निर्देश'],
      action: onOpenRemedies,
      actionLabel: 'वैदिक उपाय देखें',
    },
    {
      title: 'प्रमाणित रत्न, रुद्राक्ष एवं यंत्र परामर्श',
      englishTitle: 'Authentic Gemstone & Rudraksha Advisory',
      icon: Gem,
      desc: 'लग्न एवं कारक ग्रहों के अनुकूल रत्न चयन, धातु, उंगली, धारण मुहूर्त, बीज मंत्र तथा 1 से 14 मुखी रुद्राक्ष विधान।',
      points: ['प्राण-प्रतिष्ठा एवं शुद्धिकरण विधि', 'प्रतिबंधित/अशुभ रत्नों की चेतावनी', 'सिद्ध श्रीयंत्र व नवग्रह यंत्र स्थापना'],
      action: onOpenGemstones,
      actionLabel: 'रत्न परामर्श देखें',
    },
    {
      title: 'वैदिक वास्तु शास्त्र एवं भू-ऊर्जा परीक्षण',
      englishTitle: 'Vedic Vastu Shastra Consultation',
      icon: Home,
      desc: 'आवासीय भवन, व्यावसायिक प्रतिष्ठान, कारखाने व कार्यालयों हेतु वास्तु दोष निवारण बिना तोड़-फोड़ एवं ऊर्जा संतुलन।',
      points: ['पंचतत्व (अग्नि, जल, वायु, पृथ्वी, आकाश) संतुलन', 'मुख्य द्वार, रसोई, पूजा घर व तिजोरी वास्तु', 'पिरामिड व ताम्र तार वास्तु उपाय'],
      action: onOpenChat,
      actionLabel: 'वास्तु परामर्श पूछें',
    },
  ];

  const highlights = [
    {
      title: 'देवभूमि शिमला परंपरा',
      desc: 'हिमालयी ऋषियों व महर्षि पराशर की पावन वैदिक ज्योतिषीय परंपरा पर आधारित।',
    },
    {
      title: 'शुद्ध गणितीय अयनांश',
      desc: 'NC Lahiri / Chitra Paksha Ayanamsha के साथ शुद्ध ग्रहीय देशान्तर गणना।',
    },
    {
      title: 'गोपनीय एवं प्रामाणिक',
      desc: 'प्रत्येक जातक का जन्म विवरण पूर्णतः सुरक्षित एवं शास्त्रोक्त रूप से मूल्यांकित।',
    },
    {
      title: 'आधुनिक AI एवं वैदिक संगम',
      desc: 'परंपरागत शास्त्र ज्ञान को अत्याधुनिक सुपरकंप्यूटेशनल AI द्वारा संश्लेषित।',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Banner for Jyotish Shimla */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-amber-500 text-white p-6 sm:p-10 shadow-xl border-2 border-orange-300">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold border border-white/40 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
            <span>ऑफिशियल पोर्टल संदर्भ: https://sites.google.com/view/jyotishshimla/home</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-extrabold text-white tracking-wide leading-tight drop-shadow-sm">
            ज्योतिष शिमला (Jyotish Shimla) • देवभूमि वैदिक ज्योतिष संस्थान
          </h1>

          <p className="text-sm sm:text-base text-amber-100 leading-relaxed font-medium">
            देवभूमि हिमाचल प्रदेश, शिमला की पावन धरा से संचालित प्रामाणिक वैदिक ज्योतिष केंद्र। जन्म कुंडली निर्माण, महादशा फलादेश, विवाह मिलान, रत्न परामर्श, कालसर्प शांति एवं वास्तु परामर्श हेतु सर्वमान्य व विश्वसनीय मार्गदर्शन।
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3.5 pt-3">
            <a
              href="https://sites.google.com/view/jyotishshimla/home"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-white hover:bg-orange-50 text-orange-950 font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all transform hover:scale-[1.02]"
            >
              <span>Jyotish Shimla ऑफिशियल वेबसाइट खोलें</span>
              <ExternalLink className="w-4 h-4 text-orange-600" />
            </a>

            <button
              type="button"
              onClick={onOpenChat}
              className="px-5 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm border border-white/50 flex items-center gap-2 transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>पंडित जी / AI ज्योतिषी से परामर्श लें</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Excellence */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {highlights.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border-2 border-orange-200 p-5 shadow-sm space-y-1.5"
          >
            <div className="flex items-center gap-2 text-orange-600 font-serif font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{item.title}</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Services Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-orange-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-orange-950">
              ज्योतिष शिमला की प्रमुख शास्त्रोक्त सेवाएं (Services Offered)
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              हर समस्या का वैदिक समाधान • विशुद्ध सनातन ज्योतिष एवं कर्मकांड पद्धति
            </p>
          </div>

          <a
            href="https://sites.google.com/view/jyotishshimla/home"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-orange-700 hover:text-orange-900 font-bold inline-flex items-center gap-1 hover:underline"
          >
            <span>विस्तृत विवरण देखें (Portal)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border-2 border-orange-200 p-5 shadow-md shadow-orange-950/5 hover:border-orange-400 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold border border-orange-300 shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-serif font-bold text-orange-950 leading-tight">
                        {srv.title}
                      </h3>
                      <span className="text-[11px] text-stone-500 block">
                        {srv.englishTitle}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed font-medium">
                    {srv.desc}
                  </p>

                  <div className="space-y-1 pt-1 border-t border-orange-100">
                    {srv.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-1.5 text-xs text-stone-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {srv.action && (
                  <button
                    type="button"
                    onClick={srv.action}
                    className="w-full py-2.5 rounded-xl bg-orange-50 hover:bg-orange-600 hover:text-white text-orange-900 font-bold text-xs border border-orange-200 flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>{srv.actionLabel}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Location & Consultation Information Card */}
      <div className="bg-gradient-to-br from-orange-100 via-amber-50 to-white rounded-3xl border-2 border-orange-300 p-6 sm:p-8 shadow-lg shadow-orange-950/5 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-orange-200">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <MapPin className="w-3.5 h-3.5 text-amber-200" /> संपर्क एवं केंद्र विवरण
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-orange-950">
              ज्योतिष शिमला परामर्श केंद्र (Shimla, Himachal Pradesh)
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 mt-1 font-medium">
              प्रत्यक्ष (Offline) एवं ऑनलाइन (Online) वैदिक ज्योतिषीय परामर्श सेवा उपलब्ध
            </p>
          </div>

          <a
            href="https://sites.google.com/view/jyotishshimla/home"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs shadow-md shadow-orange-600/20 border border-orange-400 flex items-center gap-2 self-start md:self-auto"
          >
            <span>ऑफिशियल पोर्टल विजिट करें</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-white p-4 rounded-xl border border-orange-200 space-y-1.5">
            <span className="text-orange-900 font-bold flex items-center gap-1.5 text-sm">
              <MapPin className="w-4 h-4 text-orange-600" /> केंद्र स्थान:
            </span>
            <p className="text-stone-700 font-medium">
              शिमला (देवभूमि), हिमाचल प्रदेश, भारत - 171001
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-orange-200 space-y-1.5">
            <span className="text-orange-900 font-bold flex items-center gap-1.5 text-sm">
              <Clock className="w-4 h-4 text-orange-600" /> परामर्श समय:
            </span>
            <p className="text-stone-700 font-medium">
              सोमवार से रविवार: प्रातः 08:00 AM से सायं 08:00 PM (पूर्व समय निर्धारण द्वारा)
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-orange-200 space-y-1.5">
            <span className="text-orange-900 font-bold flex items-center gap-1.5 text-sm">
              <ShieldCheck className="w-4 h-4 text-orange-600" /> परामर्श मोड:
            </span>
            <p className="text-stone-700 font-medium">
              व्हाट्सएप / फोन कॉल / व्यक्तिगत भेंट / डिजिटल जन्मपत्री PDF डिलीवरी
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
