import React, { useState, useEffect } from 'react';
import {
  Edit3,
  Eye,
  Plus,
  Trash2,
  Save,
  Sparkles,
  Code2,
  FileText,
  CheckCircle2,
  RotateCcw,
  BookOpen,
  Layout,
  Flame,
  Calendar,
  Layers,
  Copy,
} from 'lucide-react';

interface CustomPage {
  id: string;
  title: string;
  category: string;
  content: string;
  lastUpdated: string;
  description?: string;
}

const TEMPLATES: { name: string; category: string; description: string; content: string }[] = [
  {
    name: 'दैनिक व मासिक राशिफल (Rashifal Template)',
    category: 'राशिफल',
    description: '12 राशियों का प्रामाणिक दैनिक, साप्ताहिक एवं मासिक भविष्यफल',
    content: `## 🌟 मेष से मीन 12 राशियों का विस्तृत राशिफल

### ♈ मेष राशि (Aries)
- **कैरियर व आजीविका**: दशम भाव में शुभ दृष्टि से पदोन्नति एवं नवीन उत्तरदायित्व के योग।
- **आर्थिक स्थिति**: आकस्मिक धन लाभ, निवेश में विशेषज्ञों की सलाह लें।
- **पारिवारिक जीवन**: जीवनसाथी का पूर्ण सहयोग एवं मांगलिक कार्य की योजना।
- **शुभ रंग**: रक्त लाल एवं केसरिया | **शुभ अंक**: 9 | **शुभ दिशा**: पूर्व

---

### ♉ वृषभ राशि (Taurus)
- **कैरियर व व्यापार**: व्यापारिक अनुबंध में लाभ, विदेश या दूरस्थ यात्रा के अवसर।
- **स्वास्थ्य**: नेत्र एवं गले का विशेष ध्यान रखें, नियमित प्राणायाम करें।
- **शुभ रंग**: श्वेत एवं चमकीला रजत | **शुभ अंक**: 6 | **शुभ दिशा**: आग्नेय

---

### ♊ मिथुन राशि (Gemini)
- **कैरियर व अध्ययन**: बौद्धिक कार्यों, लेखन एवं आईटी क्षेत्र में विशेष प्रतिष्ठा।
- **आर्थिक**: ऋण मुक्ति के मार्ग प्रशस्त होंगे।
- **शुभ रंग**: हरा एवं फिरोजी | **शुभ अंक**: 5 | **शुभ दिशा**: उत्तर

---

### ♋ कर्क राशि (Cancer)
- **कैरियर**: कार्यक्षेत्र में भावनात्मक स्थिरता से सफलता।
- **शुभ रंग**: दूधिया सफेद व मोतिया | **शुभ अंक**: 2 | **शुभ दिशा**: उत्तर-पश्चिम`,
  },
  {
    name: 'शुभ मुहूर्त एवं व्रत तालिका (Shubh Muhurat & Vrat)',
    category: 'पंचांग व मुहूर्त',
    description: 'विवाह, गृह प्रवेश, नामकरण, मुंडन एवं वाहन क्रय के शुभ मुहूर्त',
    content: `## 🕉️ वैदिक शुभ मुहूर्त एवं व्रत पर्व तालिका

### 💍 1. विवाह शुभ मुहूर्त (Vivah Shubh Muhurat)
- **महत्वपूर्ण नियम**: गुरु-शुक्र अस्त न हों, त्रिबल शुद्धि (सूर्य, चंद्र, गुरु) एवं नाड़ी दोष परिहार।
- **शुभ नक्षत्र**: रोहिणी, मॄगशिरा, मघा, हस्त, स्वाति, अनुराधा, मूल, उत्तराषाढ़ा, उत्तराभाद्रपद, रेवती।
- **शुभ लग्न**: वृषभ, मिथुन, कन्या, तुला, धनु, मीन।

---

### 🏡 2. नवीन गृह प्रवेश मुहूर्त (Griha Pravesh)
- **शुभ मास**: वैशाख, ज्येष्ठ, माघ, फाल्गुन।
- **वर्जित वार व नक्षत्र**: मंगलवार एवं रिक्ता तिथियां (4, 9, 14) वर्जित हैं।
- **शुभ लग्न**: स्थिर लग्न (वृषभ, सिंह, वृश्चिक, कुंभ)।

---

### 🚗 3. वाहन एवं संपत्ति क्रय मुहूर्त
- **शुभ वार**: सोमवार, बुधवार, गुरुवार, शुक्रवार।
- **अमृत चौघड़िया**: प्रातः 07:30 से 09:00 तथा सायं 04:30 से 06:00 तक।`,
  },
  {
    name: 'ग्रह शांति एवं विशेष वैदिक अनुष्ठान (Special Puja & Anushthan)',
    category: 'अनुष्ठान व पूजा',
    description: 'महामृत्युंजय, नवग्रह शांति, रुद्राभिषेक एवं दुर्गा सप्तशती विधान',
    content: `## 🔥 श्री ज्योतिष शिमला - विशेष वैदिक शांति अनुष्ठान विधान

### 🔱 1. महामृत्युंजय महासंजीवनी अनुष्ठान
- **उद्देश्य**: असाध्य रोग निवारण, अकाल मृत्यु भय मुक्ति एवं दीर्घायु की प्राप्ति।
- **जप संख्या**: 1,25,000 जप + दशांश हवन (दूर्वा, घृत, मधु व गिलोय द्वारा)।
- **मूल मंत्र**: \`ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥\`

---

### 🐍 2. कालसर्प योग शांति (नागबलि विधान)
- **स्थान व समय**: पावन तीर्थ अथवा शिवालय में नागपंचमी, सोमवती अमावस्या अथवा शिवरात्रि।
- **शांति विधि**: चांदी के नाग-नागिन जोड़े का वैदिक मंत्रों से पूजन एवं रुद्राभिषेक।

---

### ☀️ 3. सूर्य एवं नवग्रह हवन सामग्री सूची
1. नवग्रह समिधा (आक, ढाक, खैर, अपामार्ग, पीपल, गूलर, शमी, दूर्वा, कुश)
2. गाय का शुद्ध देसी घी, जौ, काले तिल, शर्करा, गूगल, लोबान
3. नवग्रह मंडल एवं सर्वतोभद्र मंडल निर्माण`,
  },
  {
    name: 'देवभूमि शिमला सिद्ध मंदिर व तीर्थ माहात्म्य',
    category: 'देवभूमि शिमला',
    description: 'जाखू हनुमान, तारा देवी, संकट मोचन, काली बाड़ी व भीमाकाली मंदिर',
    content: `## 🏔️ देवभूमि शिमला के पावन सिद्ध पीठ एवं आध्यात्मिक ऊर्जा केंद्र

### 🚩 1. श्री जाखू हनुमान मंदिर (Jakhu Temple)
- **समुद्र तल से ऊंचाई**: 8054 फीट (शिमला की सर्वोच्च चोटी)।
- **माहात्म्य**: रामायण काल में लक्ष्मण जी के लिए संजीवनी बूटी लाते समय श्री हनुमान जी ने यहाँ विश्राम किया था।
- **साधना फल**: यहाँ दर्शन व हनुमान चालीसा पाठ से शनि व राहु के अनिष्ट शांत होते हैं।

---

### 🌺 2. माँ तारा देवी मंदिर (Tara Devi Temple)
- **इतिहास**: 250 वर्ष प्राचीन माँ अष्टधातु तारा का पावन सिद्ध पीठ।
- **विशेष साधना**: तंत्र बाधा निवारण एवं पारिवारिक सुख-समृद्धि हेतु अमोघ।

---

### 🛕 3. संकट मोचन मंदिर (Sankat Mochan)
- **संस्थापक**: परम पूज्य नीम करोली बाबा जी (1966)।
- **वातावरण**: आत्मिक शांति, ध्यान एवं नवग्रह दोष निवारण हेतु सर्वोत्तम।`,
  },
];

const DEFAULT_PAGES: CustomPage[] = [
  {
    id: 'rashifal',
    title: 'दैनिक व मासिक राशिफल (Rashifal)',
    category: 'राशिफल',
    description: '12 राशियों का विस्तृत भविष्यफल एवं शुभ रंग/अंक',
    content: TEMPLATES[0].content,
    lastUpdated: '2026-08-22',
  },
  {
    id: 'muhurat-shubh',
    title: 'शुभ मुहूर्त एवं पर्व तालिका (Muhurat & Festivals)',
    category: 'पंचांग व मुहूर्त',
    description: 'विवाह, गृह प्रवेश एवं वाहन क्रय के शुभ समय',
    content: TEMPLATES[1].content,
    lastUpdated: '2026-08-22',
  },
  {
    id: 'anushthan-puja',
    title: 'ग्रह शांति एवं विशेष वैदिक अनुष्ठान (Special Puja)',
    category: 'अनुष्ठान व पूजा',
    description: 'महामृत्युंजय, कालसर्प शांति एवं नवग्रह विधान',
    content: TEMPLATES[2].content,
    lastUpdated: '2026-08-22',
  },
  {
    id: 'shimla-teerth',
    title: 'देवभूमि शिमला सिद्ध मंदिर व तीर्थ माहात्म्य',
    category: 'देवभूमि शिमला',
    description: 'जाखू, तारा देवी एवं संकट मोचन मंदिर विवरण',
    content: TEMPLATES[3].content,
    lastUpdated: '2026-08-22',
  },
];

export const CustomPageEditorView: React.FC = () => {
  const [pages, setPages] = useState<CustomPage[]>(() => {
    const saved = localStorage.getItem('jyotish_custom_pages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        return DEFAULT_PAGES;
      }
    }
    return DEFAULT_PAGES;
  });

  const [activePageId, setActivePageId] = useState<string>(pages[0]?.id || 'rashifal');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [previewTab, setPreviewTab] = useState<'preview' | 'raw'>('preview');

  const activePage = pages.find((p) => p.id === activePageId) || pages[0];

  const [editTitle, setEditTitle] = useState(activePage?.title || '');
  const [editContent, setEditContent] = useState(activePage?.content || '');
  const [editCategory, setEditCategory] = useState(activePage?.category || 'सामान्य');
  const [editDescription, setEditDescription] = useState(activePage?.description || '');

  useEffect(() => {
    if (activePage) {
      setEditTitle(activePage.title);
      setEditContent(activePage.content);
      setEditCategory(activePage.category);
      setEditDescription(activePage.description || '');
    }
  }, [activePageId]);

  const handleSavePage = () => {
    const updated = pages.map((p) => {
      if (p.id === activePageId) {
        return {
          ...p,
          title: editTitle.trim() || 'अनामांकित पृष्ठ',
          content: editContent,
          category: editCategory.trim() || 'सामान्य',
          description: editDescription.trim(),
          lastUpdated: new Date().toISOString().split('T')[0],
        };
      }
      return p;
    });

    setPages(updated);
    localStorage.setItem('jyotish_custom_pages', JSON.stringify(updated));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    setIsEditing(false);
  };

  const handleCreateNewPage = (template?: (typeof TEMPLATES)[0]) => {
    const newId = 'page_' + Date.now();
    const newPage: CustomPage = {
      id: newId,
      title: template ? template.name : 'नवीन पृष्ठ (New Custom Page)',
      category: template ? template.category : 'कस्टम',
      description: template ? template.description : 'कस्टम सामग्री एवं लेख',
      content: template
        ? template.content
        : `## 📜 आपके नए पृष्ठ का शीर्षक यहाँ लिखें\n\nयहाँ आप अपना विस्तृत विवरण, मंत्र, लेख, तालिका अथवा HTML कोड पेस्ट कर सकते हैं।\n\n### प्रमुख बिंदु:\n- बिंदु 1: प्रामाणिक वैदिक सामग्री\n- बिंदु 2: शुभ समय एवं नियम`,
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    const updated = [...pages, newPage];
    setPages(updated);
    localStorage.setItem('jyotish_custom_pages', JSON.stringify(updated));
    setActivePageId(newId);
    setIsEditing(true);
  };

  const handleDeletePage = (idToDelete: string) => {
    if (pages.length <= 1) {
      alert('कम से कम एक पृष्ठ रहना आवश्यक है।');
      return;
    }
    if (window.confirm('क्या आप इस पृष्ठ को हटाना चाहते हैं?')) {
      const updated = pages.filter((p) => p.id !== idToDelete);
      setPages(updated);
      localStorage.setItem('jyotish_custom_pages', JSON.stringify(updated));
      setActivePageId(updated[0].id);
      setIsEditing(false);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('क्या आप सभी कस्टम पृष्ठों को ज्योतिषी डिफॉल्ट टेम्पलेट्स के साथ रीसेट करना चाहते हैं?')) {
      setPages(DEFAULT_PAGES);
      localStorage.setItem('jyotish_custom_pages', JSON.stringify(DEFAULT_PAGES));
      setActivePageId(DEFAULT_PAGES[0].id);
      setIsEditing(false);
    }
  };

  const handleCopyContent = () => {
    if (activePage) {
      navigator.clipboard.writeText(activePage.content);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner - Light Saffron / Bhagwa Styled */}
      <div className="bg-gradient-to-br from-amber-100/90 via-orange-50 to-white rounded-3xl border-2 border-orange-300 p-6 sm:p-8 shadow-lg shadow-orange-950/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-orange-200">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm mb-2">
              <Code2 className="w-3.5 h-3.5 text-amber-200" /> कस्टम पृष्ठ, सामग्री एवं कोड प्रबंधक
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-orange-950">
              पेज व कोड संपादक (Custom Page & Code Editor)
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 mt-1 font-medium">
              अपनी वेबसाइट के लिए नए पेज जोड़ें, राशिफल, मुहूर्त, अनुष्ठान अथवा कस्टम HTML/Markdown सामग्री सीधे दर्ज व सुरक्षित (Save) करें।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleCreateNewPage()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs shadow-md shadow-orange-600/20 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>नया रिक्त पेज जोड़ें</span>
            </button>

            <button
              type="button"
              onClick={handleResetDefaults}
              title="डिफ़ॉल्ट रीसेट करें"
              className="p-2.5 rounded-xl bg-white border border-orange-200 hover:bg-orange-50 text-stone-700 text-xs font-medium transition-colors flex items-center gap-1 shadow-sm"
            >
              <RotateCcw className="w-4 h-4 text-stone-600" />
              <span className="hidden sm:inline">रीसेट</span>
            </button>
          </div>
        </div>

        {/* Quick Ready Templates */}
        <div className="pt-4">
          <p className="text-[11px] font-bold text-orange-900 mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-orange-600" />
            <span>त्वरित टेम्पलेट से नया पेज बनाएं (Quick Templates):</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {TEMPLATES.map((tmpl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleCreateNewPage(tmpl)}
                className="text-left p-3 rounded-2xl bg-white/90 hover:bg-white border border-orange-200 hover:border-orange-400 text-xs transition-all shadow-xs group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-orange-950 group-hover:text-orange-600 truncate">
                    {tmpl.name}
                  </span>
                  <Plus className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                </div>
                <p className="text-[10px] text-stone-500 mt-1 line-clamp-1">{tmpl.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Page List Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-5 pb-1 scrollbar-thin scrollbar-thumb-orange-400">
          {pages.map((p) => {
            const isSelected = p.id === activePageId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setActivePageId(p.id);
                  setIsEditing(false);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border-2 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-md shadow-orange-600/20'
                    : 'bg-white text-stone-700 border-orange-200 hover:bg-orange-50'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main View & Edit Container */}
      {activePage && (
        <div className="bg-white rounded-3xl border-2 border-orange-200 p-6 sm:p-8 shadow-lg shadow-orange-950/5 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-orange-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 bg-amber-100 text-orange-900 px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-amber-200">
                  श्रेणी: {activePage.category}
                </span>
                <span className="text-[11px] text-stone-500">
                  अपडेट तिथि: {activePage.lastUpdated}
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold text-orange-950">
                {activePage.title}
              </h3>
              {activePage.description && (
                <p className="text-xs text-stone-600 mt-0.5">{activePage.description}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyContent}
                className="p-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200 transition-colors text-xs font-semibold flex items-center gap-1"
                title="सामग्री कॉपी करें"
              >
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{copySuccess ? 'कॉपी हो गया!' : 'कॉपी'}</span>
              </button>

              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={handleSavePage}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>सेव करें (Save Page)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
                  >
                    रद्द करें
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-orange-600/20 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>पेज / कोड संपादित करें (Edit Content)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeletePage(activePage.id)}
                    className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors"
                    title="पेज हटाएं"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {saveSuccess && (
            <div className="p-3.5 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fade-in shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>पेज की सामग्री सफलतापूर्वक सुरक्षित (Saved Successfully) कर दी गई है!</span>
            </div>
          )}

          {/* Edit Form OR Rendered Content */}
          {isEditing ? (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-stone-700 font-bold mb-1">पेज का शीर्षक (Page Title):</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-orange-50/40 border border-orange-300 rounded-xl px-3 py-2 text-stone-900 font-bold focus:ring-2 focus:ring-orange-500/30 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">श्रेणी (Category):</label>
                  <input
                    type="text"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full bg-orange-50/40 border border-orange-300 rounded-xl px-3 py-2 text-stone-900 font-medium focus:ring-2 focus:ring-orange-500/30 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">संक्षिप्त विवरण (Short Description):</label>
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="पेज का एक पंक्ति का विवरण..."
                  className="w-full bg-orange-50/30 border border-orange-200 rounded-xl px-3 py-1.5 text-stone-900 font-medium focus:ring-2 focus:ring-orange-500/30 text-xs"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">
                  पेज सामग्री / टेक्स्ट / HTML कोड (Content & Code):
                </label>
                <textarea
                  rows={14}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full bg-amber-50/20 border border-orange-300 rounded-2xl p-4 font-mono text-xs text-stone-900 focus:ring-2 focus:ring-orange-500/40 leading-relaxed"
                  placeholder="यहाँ अपना विवरण अथवा कोड दर्ज करें..."
                />
                <div className="flex flex-wrap items-center justify-between gap-2 mt-1.5 text-[11px] text-stone-500">
                  <span>* आप Markdown (## हेडिंग, - सूची) अथवा सामान्य टेक्स्ट व HTML आसानी से लिख सकते हैं।</span>
                  <span>कुल पंक्तियां: {editContent.split('\n').length}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-orange-100 pb-2">
                <button
                  type="button"
                  onClick={() => setPreviewTab('preview')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    previewTab === 'preview'
                      ? 'bg-orange-600 text-white'
                      : 'bg-orange-50 text-orange-900 hover:bg-orange-100'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>प्रस्तुति दृश्य (Rendered View)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('raw')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    previewTab === 'raw'
                      ? 'bg-orange-600 text-white'
                      : 'bg-orange-50 text-orange-900 hover:bg-orange-100'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>स्रोत कोड दृश्य (Raw Code View)</span>
                </button>
              </div>

              {previewTab === 'preview' ? (
                <div className="bg-amber-50/30 p-6 sm:p-8 rounded-2xl border border-orange-200 leading-relaxed whitespace-pre-wrap text-sm text-stone-800 font-medium space-y-2">
                  {activePage.content}
                </div>
              ) : (
                <pre className="bg-stone-900 text-amber-200 p-6 rounded-2xl overflow-x-auto text-xs font-mono border border-stone-800 leading-relaxed">
                  <code>{activePage.content}</code>
                </pre>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

