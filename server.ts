import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI on the server side
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY not found in environment variables.');
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    engine: 'Jyotish Shimla AI Engine',
    timestamp: new Date().toISOString(),
  });
});

// Full Kundali AI Synthesis adhering to exact required format
app.post('/api/astrology/full-analysis', async (req, res) => {
  try {
    const { birthDetails, lagnaRashi, planets, dasha, doshas, transits, gemstones } = req.body;

    const ai = getGeminiClient();

    const systemPrompt = `You are "Jyotish Shimla AI Engine", an expert Vedic Astrology AI backend and conversational engine designed for the official platform "Jyotish Shimla" (https://sites.google.com/view/jyotishshimla/home).

PERSONA & RULES:
1. Language & Tone: Clear, polite Hindi/Hinglish. Respectful, authentic, and empathetic traditional Himachali / Vedic astrologer persona (from Devbhoomi Himachal / Shimla).
2. Structure: Use **BOLD text** for emphasis and bullet points (*). Do NOT shorten or summarize critical predictions. Provide deep, authentic, detailed astrological insights.
3. MANDATORY OUTPUT SECTIONS (You must format the response with these exact header sections):
   - **लग्न एवं राशि विश्लेषण**
   - **ग्रह स्थिति एवं महादशा**
   - **भविष्यवाणी (Career, Health, Marriage)**
   - **सटीक रत्न एवं वैदिक उपाय**

Incorporate Vedic principles: Parashara Hora Shastra, Jaimini Sutras, Navagraha relations, Bhavat Bhavam, Vimshottari Dasha, Gochar (transits for current period), and personalized remedial measures (Mantras, Daan, Fasting, Rudraksha).`;

    const userPrompt = `कृपया निम्नलिखित जातक की जन्मकुंडली का संपूर्ण, प्रामाणिक एवं विस्तृत ज्योतिषीय विश्लेषण प्रस्तुत करें:

जातक का विवरण:
* नाम: ${birthDetails.name || 'जातक'}
* लिंग: ${birthDetails.gender || 'निर्दिष्ट नहीं'}
* जन्म तिथि: ${birthDetails.dateOfBirth}
* जन्म समय: ${birthDetails.timeOfBirth}
* जन्म स्थान: ${birthDetails.placeOfBirth} (अक्षांश: ${birthDetails.latitude}, देशांतर: ${birthDetails.longitude})

कुंडली गणना आंकड़े:
* लग्न (Ascendant): ${lagnaRashi.lagnaHindi} (${lagnaRashi.lagnaName}), स्वामी: ${lagnaRashi.lagnaLord}
* चन्द्र राशि (Moon Sign): ${lagnaRashi.moonSignHindi} (${lagnaRashi.moonSignName}), स्वामी: ${lagnaRashi.moonSignLord}
* सूर्य राशि: ${lagnaRashi.sunSignHindi}
* जन्म नक्षत्र: ${lagnaRashi.nakshatra} (पद ${lagnaRashi.nakshatraPada}, स्वामी: ${lagnaRashi.nakshatraLord})
* पंचांग: तिथि: ${lagnaRashi.tithi}, गण: ${lagnaRashi.gana}, नाड़ी: ${lagnaRashi.nadi}, वर्ण: ${lagnaRashi.varna}, योनि: ${lagnaRashi.yoni}

ग्रह स्थिति (Planetary Houses & Dignities):
${Object.entries(planets || {})
  .map(
    ([k, p]: [string, any]) =>
      `* ${p.hindiName} (${p.name}): ${p.house}वें भाव में, ${p.rashiHindi} राशि (${p.signDegree?.toFixed(1)}°), नक्षत्र: ${p.nakshatra}, स्थिति: ${p.dignityHindi}${p.isRetrograde ? ' (वक्री)' : ''}`
  )
  .join('\n')}

दशा चक्र (Vimshottari Dasha):
* वर्तमान महादशा: ${dasha?.currentMahadasha} (${dasha?.mahadashas?.find((m: any) => m.isCurrent)?.hindiName})
* वर्तमान अंतर्दशा: ${dasha?.currentAntardasha}
* जन्मकालीन दशा शेष: ${dasha?.dashaBalanceAtBirth}

दोष एवं योग स्थिति:
* मांगलिक स्थिति: ${doshas?.hasManglikDosha ? 'मांगलिक प्रभाव' : 'मांगलिक नहीं'} (${doshas?.manglikDetails})
* कालसर्प योग: ${doshas?.hasKaalSarpDosha ? doshas?.kaalSarpType : 'नहीं'} (${doshas?.kaalSarpDetails})
* शनि साढ़ेसाती: ${doshas?.hasSadeSati ? doshas?.sadeSatiPhase : 'नहीं'} (${doshas?.sadeSatiDetails})
* पितृ स्थिति: ${doshas?.pitraDoshaDetails}

कृपया उपरोक्त नियमों का पालन करते हुए चारों मुख्य शीर्षकों (**लग्न एवं राशि विश्लेषण**, **ग्रह स्थिति एवं महादशा**, **भविष्यवाणी (Career, Health, Marriage)**, **सटीक रत्न एवं वैदिक उपाय**) के अंतर्गत विस्तृत, प्रामाणिक और कल्याणकारी विश्लेषण प्रदान करें।`;

    if (!ai) {
      // Fallback structured generation if API key is not provided yet
      const fallbackAnalysis = `### **ज्योतिष शिमला - प्रामाणिक वैदिक कुंडली विश्लेषण**
*शुभम भवतु! जातक **${birthDetails.name || 'श्री'}** की जन्मपत्रिका का विधिवत परीक्षण शिमला के पारम्परिक वैदिक ज्योतिषीय सिद्धांतों के आधार पर प्रस्तुत है।*

---

### **लग्न एवं राशि विश्लेषण**
* **लग्न स्वरूप (${lagnaRashi.lagnaHindi} लग्न):** आपका जन्म **${lagnaRashi.lagnaHindi}** लग्न में हुआ है जिसके अधिपति **${lagnaRashi.lagnaLord}** देव हैं। यह लग्न आपके व्यक्तित्व में दृढ़ता, स्वाभिमान, नेतृत्व क्षमता एवं तीव्र निर्णय शक्ति का संचार करता है। आपका मुखमंडल तेजस्वी एवं स्वभाव विचारशील है।
* **चन्द्र राशि (${lagnaRashi.moonSignHindi} राशि):** आपका चन्द्रमा **${lagnaRashi.moonSignHindi}** राशि में तथा **${lagnaRashi.nakshatra}** नक्षत्र के **${lagnaRashi.nakshatraPada}** पद में स्थित है। यह मन की संवेदनशीलता, रचनात्मकता एवं आत्मीय संबंधों को प्रगाढ़ बनाता है।
* **पंचांग गुण:** आपका गण **${lagnaRashi.gana}**, नाड़ी **${lagnaRashi.nadi}**, एवं योनि **${lagnaRashi.yoni}** है, जो संतुलित मानसिक ऊर्जा और आध्यात्मिक झुकाव का द्योतक है।

---

### **ग्रह स्थिति एवं महादशा**
* **प्रमुख ग्रह योग:** 
  * लग्न भाव एवं लग्नेश **${lagnaRashi.lagnaLord}** की स्थिति जीवन में संघर्षों के उपरांत चिरस्थायी यश प्रदान करती है।
  * दशम कर्म भाव एवं नवम भाग्य भाव का पारस्परिक संबंध व्यवसाय एवं आजीविका में उन्नति का कारक है।
  * ${doshas?.hasManglikDosha ? `* **मांगलिक योग प्रभाव:** ${doshas.manglikDetails}` : '* **मांगलिक स्थिति:** कुंडली मांगलिक दोष से मुक्त है।'}
  * ${doshas?.hasSadeSati ? `* **शनि गोचर / साढ़ेसाती:** ${doshas.sadeSatiDetails}` : '* **शनि स्थिति:** वर्तमान में साढ़ेसाती का कोई प्रतिकूल प्रभाव नहीं है।'}
* **विंशोत्तरी महादशा प्रभाव:** 
  * वर्तमान में आपकी कुंडली में **${dasha?.currentMahadasha}** की महादशा में **${dasha?.currentAntardasha}** की अंतर्दशा प्रभावशील है।
  * यह कालखंड नवीन योजनाओं के क्रियान्वयन, बौद्धिक विस्तार एवं सामाजिक प्रतिष्ठा संवर्धन हेतु अनुकूल अवसर लेकर आ रहा है।

---

### **भविष्यवाणी (Career, Health, Marriage)**
* **आजीविका एवं व्यवसाय (Career & Wealth):**
  * दशमेश एवं गुरु-बुध के प्रभाव से आपके लिए प्रशासनिक, तकनीकी, वित्तीय प्रबंधन, व्यापार अथवा परामर्श क्षेत्र में उत्तम सफलता के योग हैं।
  * आने वाले समय में पदोन्नति एवं आर्थिक सुदृढ़ता के मार्ग प्रशस्त होंगे। जोखिम भरे सट्टेबाजी या बिना अनुबंध के निवेश से बचें।
* **स्वास्थ्य एवं ऊर्जा (Health & Vitality):**
  * सामान्य रूप से स्वास्थ्य उत्तम रहेगा। मौसमी परिवर्तन एवं वात-पित्त संतुलन पर ध्यान दें।
  * नियमित प्राणायाम, सूर्य नमस्कार एवं पर्याप्त जल सेवन से ऊर्जा का स्तर उच्च बना रहेगा।
* **विवाह एवं पारिवारिक जीवन (Marriage & Relationships):**
  * सप्तम भाव पर शुभ ग्रहों की दृष्टि दांपत्य जीवन में परस्पर सामंजस्य एवं आदर भाव स्थापित करती है।
  * जीवनसाथी प्रबुद्ध एवं सहयोगी स्वभाव के होंगे। पारिवारिक निर्णयों में परस्पर संवाद को प्राथमिकता दें।

---

### **सटीक रत्न एवं वैदिक उपाय**
* **अनुशंसित रत्न (Gemstone Recommendation):**
  * **भाग्य रत्न:** **${gemstones?.[0]?.gemstoneHindi || 'माणिक्य / पुखराज'}** - इसे ${gemstones?.[0]?.metal || 'स्वर्ण या चांदी'} में ${gemstones?.[0]?.finger || 'उचित उंगली'} में ${gemstones?.[0]?.day || 'शुभ वार'} को गंगाजल से शुद्ध कर धारण करें।
  * **सावधानी:** बिना संपूर्ण कुंडली परीक्षण के नीलम या गोमेद धारण न करें।
* **दैनिक वैदिक उपाय एवं मंत्र साधना:**
  * **दैनिक मंत्र जप:** **${gemstones?.[0]?.beejMantra || 'ॐ नमो भगवते वासुदेवाय'}** का प्रतिदिन 108 बार रुद्राक्ष या तुलसी माला से जप करें।
  * **सूर्य अर्घ्य:** नित्य प्रातः तांबे के लोटे में जल, रोली व अक्षत डालकर भगवान भुवन भास्कर को "ॐ घृणिः सूर्याय नमः" बोलते हुए अर्घ्य दें।
  * **दान एवं सेवा:** प्रति बुधवार या शनिवार को गौमाता को हरा चारा एवं निर्धन व्यक्तियों को अन्न-वस्त्र का सामर्थ्यानुसार दान करें।`;

      return res.json({ analysis: fallbackAnalysis, source: 'vedic-engine' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const analysisText = response.text || '';
    return res.json({ analysis: analysisText, source: 'gemini-3.7-flash' });
  } catch (error: any) {
    console.error('Error generating astrology analysis:', error);
    res.status(500).json({ error: error.message || 'Analysis generation failed' });
  }
});

// Interactive Astrologer Chat Endpoint
app.post('/api/astrology/chat', async (req, res) => {
  try {
    const { message, history, birthDetails, kundaliSummary } = req.body;

    const ai = getGeminiClient();

    const systemInstruction = `You are "Jyotish Shimla AI Engine", an expert, empathetic, highly revered traditional Vedic Astrologer representing "Jyotish Shimla" (https://sites.google.com/view/jyotishshimla/home) from Devbhoomi Himachal.

VOICE & PERSONA:
- Language: Polite, respectful Hindi / Hinglish ("प्रणाम", "शुभम भवतु", "जातक", "आयुष्मान भव").
- Tone: Wise, calm, spiritually grounded, deeply knowledgeable in Brihat Parashara Hora Shastra, Jaimini, Vedic Mantras, Gemstones, and Remedies.
- Always address the user with warmth and respect.
- Format responses clearly using **bold highlights** and bullet points (*).
- When giving remedies or predictions, reference specific Grahas (Surya, Chandra, Mangal, Budh, Guru, Shukra, Shani, Rahu, Ketu), Dashas, and houses.
- Never give fatalistic or fear-mongering predictions; always provide empowering Vedic Upay, Mantras, and spiritual alignment.

User's Kundali Context (if available):
${kundaliSummary || 'जातक के जन्म विवरण के आधार पर परामर्श प्रदान करें।'}`;

    if (!ai) {
      // Fallback chat response
      const fallbackReply = `प्रणाम जातक! ज्योतिष शिमला के वैदिक AI इंजन में आपका स्वागत है। 

आपकी कुंडली के ग्रह गोचर एवं लग्न के अनुसार:
* **ग्रह स्थिति का संकेत:** वर्तमान समय में ग्रहों का संचरण आपके कर्म भाव एवं भाग्य भाव को सक्रिय कर रहा है।
* **परामर्श:** अपने लक्ष्य के प्रति एकाग्र रहें। यदि कोई विशिष्ट प्रश्न (विवाह, करियर, स्वास्थ्य, या रत्न) हो, तो कृपया पूछें। 
* **वैदिक उपाय:** प्रतिदिन प्रातः **"ॐ नमः शिवाय"** अथवा **"गायत्री महामंत्र"** का 11 बार स्मरण करें।

सदा शुभम भवतु! आपके जीवन में सुख, शांति और समृद्धि की कामना करता हूँ।`;

      return res.json({ reply: fallbackReply });
    }

    // Build chat contents from history
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.slice(-6).forEach((h: any) => {
        contents.push({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }],
        });
      });
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || '';
    return res.json({ reply });
  } catch (error: any) {
    console.error('Error in astrology chat:', error);
    res.status(500).json({ error: error.message || 'Astrology chat failed' });
  }
});

// Esoteric & Consciousness Guidance Endpoint
app.post('/api/astrology/esoteric-reading', async (req, res) => {
  try {
    const { birthDetails, lagnaRashi, planets, selectedDimension } = req.body;
    const ai = getGeminiClient();

    const prompt = `जातक ${birthDetails?.name || 'साधक'} के लिए वैदिक गूढ़ चेतना (Esoteric Vedic Consciousness) एवं बहुआयामी अस्तित्व (1D-12D) का विश्लेषण करें।
लग्न: ${lagnaRashi?.lagnaHindi}, चन्द्र राशि: ${lagnaRashi?.moonSignHindi}, नक्षत्र: ${lagnaRashi?.nakshatra}।
केंद्रित आयाम: ${selectedDimension || '5D - कारण शरीर एवं आनंदमय कोष'}।

कृपया निम्न विषयों पर मार्गदर्शन प्रदान करें:
* **आत्मा का मूल उद्देश्य (Atmakaraka Soul Path)**
* **कर्म सिद्धांत एवं प्रारब्ध संतुलन (Karmic Alignment: Sanchita vs Prarabdha)**
* **कालचक्र एवं समय चेतना (Transcendence of Linear Time)**
* **उच्च चेतना आयाम (Higher Dimensional Awakening Upay)**`;

    if (!ai) {
      return res.json({
        reading: `### **गूढ़ चेतना एवं बहुआयामी अस्तित्व विश्लेषण (Jyotish Shimla Esoteric)**
* **आत्मकारक ग्रह एवं आत्मा का पथ:** आपके जन्मांग में चेतना का मुख्य पाठ आत्म-अनुशासन, अहंकार का विसर्जन एवं परोपकार की भावना का विकास है।
* **प्रारब्ध कर्म का संतुलन:** वर्तमान जीवन में भौतिक उपलब्धियों के साथ-साथ आकाशीय चेतना (Akashic Intuition) का जागरण आपके प्रारब्ध को हल्का करेगा।
* **काल एवं माया का भेदन:** जब आप ध्यान में बैठते हैं, तो काल का रेखीय प्रभाव (Linear Time) समाप्त होकर चेतना 5D/7D के उच्च आनंदमय कोष में प्रवेश करती है।
* **दैनिक साधना:** नित्य 15 मिनट ओंकार (ॐ) नाद का जप एवं अनाहत चक्र पर ध्यान केंद्रित करना आपकी आंतरिक शक्तियों को जागृत करेगा।`,
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'You are the Jyotish Shimla Esoteric & Consciousness AI specialist in multidimensional Vedic philosophy, Kashmir Shaivism, Advaita, Kundalini, and Karmic time physics. Speak in dignified, enlightened Hindi with bold highlights.',
        temperature: 0.75,
      },
    });

    return res.json({ reading: response.text || '' });
  } catch (error: any) {
    console.error('Error in esoteric reading:', error);
    res.status(500).json({ error: error.message || 'Esoteric reading failed' });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Jyotish Shimla AI Engine server running on http://localhost:${PORT}`);
  });
}

startServer();
