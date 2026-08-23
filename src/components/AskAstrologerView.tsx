import React, { useState, useRef, useEffect } from 'react';
import { KundaliAnalysisResult, ChatMessage } from '../types';
import {
  MessageSquare,
  Send,
  Sparkles,
  RotateCcw,
  Bot,
  User,
  HelpCircle,
  Check,
  Copy,
  Volume2,
} from 'lucide-react';

interface AskAstrologerViewProps {
  kundali: KundaliAnalysisResult;
}

export const AskAstrologerView: React.FC<AskAstrologerViewProps> = ({ kundali }) => {
  if (!kundali || !kundali.birthDetails || !kundali.lagnaRashi) {
    return (
      <div className="bg-white rounded-3xl border-2 border-orange-200 p-8 text-center space-y-4">
        <p className="text-orange-950 font-serif text-base font-bold">जन्म विवरण उपलब्ध नहीं है।</p>
        <p className="text-xs text-stone-600">कृपया पहले अपनी जन्म कुंडली की गणना करें।</p>
      </div>
    );
  }

  const { birthDetails, lagnaRashi, dasha, doshas, gemstones } = kundali;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'astrologer',
      text: `प्रणाम **${birthDetails.name || 'जातक'}** जी! मैं **ज्योतिष शिमला AI इंजन** हूँ। 

आपकी जन्मकुंडली के अनुसार:
* **लग्न:** **${lagnaRashi.lagnaHindi}** (स्वामी: **${lagnaRashi.lagnaLord}**)
* **चन्द्र राशि:** **${lagnaRashi.moonSignHindi}** (नक्षत्र: **${lagnaRashi.nakshatra}**, पद ${lagnaRashi.nakshatraPada})
* **वर्तमान महादशा:** **${dasha.currentMahadasha}** में **${dasha.currentAntardasha}** की अंतर्दशा

आप अपने करियर, विवाह, स्वास्थ्य, व्यापार, रत्न धारण, अथवा किसी विशिष्ट ग्रह शांति के संबंध में जो भी प्रश्न पूछना चाहते हैं, निसंकोच पूछें। मैं वैदिक सिद्धांतों के अनुसार आपका मार्गदर्शन करने हेतु उपस्थित हूँ।`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const SUGGESTED_PROMPTS = [
    'मेरे करियर एवं पदोन्नति के लिए वर्तमान ग्रह दशा कैसी है?',
    'विवाह एवं दांपत्य जीवन के लिए क्या शुभ योग हैं?',
    'शनि की साढ़ेसाती अथवा ढैय्या के निवारण हेतु क्या उपाय करें?',
    'मेरे लिए कौन सा भाग्य रत्न (Gemstone) सर्वाधिक फलदायी रहेगा?',
    'स्वास्थ्य एवं मानसिक शांति हेतु कौन सा वैदिक मंत्र सिद्ध रहेगा?',
    'मेरी कुंडली में आत्मकारक ग्रह क्या आध्यात्मिक दिशा दिखा रहा है?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage.trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    const kundaliSummary = `
जातक: ${birthDetails.name} (${birthDetails.gender})
जन्म: ${birthDetails.dateOfBirth} ${birthDetails.timeOfBirth}, स्थान: ${birthDetails.placeOfBirth}
लग्न: ${lagnaRashi.lagnaHindi} (${lagnaRashi.lagnaLord}), चन्द्र राशि: ${lagnaRashi.moonSignHindi} (${lagnaRashi.nakshatra})
महादशा: ${dasha.currentMahadasha}, अंतर्दशा: ${dasha.currentAntardasha}
मांगलिक: ${doshas.hasManglikDosha ? 'हाँ' : 'नहीं'}, कालसर्प: ${doshas.hasKaalSarpDosha ? 'हाँ' : 'नहीं'}, साढ़ेसाती: ${doshas.hasSadeSati ? doshas.sadeSatiPhase : 'नहीं'}
अनुशंसित रत्न: ${gemstones.map((g) => g.gemstoneHindi).join(', ')}
`;

    try {
      const response = await fetch('/api/astrology/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages,
          birthDetails,
          kundaliSummary,
        }),
      });

      const data = await response.json();
      const astrologerReply: ChatMessage = {
        id: `astro-${Date.now()}`,
        sender: 'astrologer',
        text: data.reply || 'शुभम भवतु! कृपया अपना प्रश्न पुनः पूछें।',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, astrologerReply]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorReply: ChatMessage = {
        id: `astro-err-${Date.now()}`,
        sender: 'astrologer',
        text: `शुभम भवतु जातक! आपकी कुंडली के **${lagnaRashi.lagnaHindi} लग्न** के अनुसार वर्तमान में **${dasha.currentMahadasha} महादशा** शुभ फल देने में समर्थ है। कृपया नियमित रूप से **"ॐ नमः शिवाय"** का जप करें।`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderMessageContent = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-1" />;

          if (trimmed.startsWith('*')) {
            const parts = trimmed.substring(1).split(/(\*\*.*?\*\*)/g);
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="text-orange-600 font-bold">•</span>
                <p className="flex-1">
                  {parts.map((p, pIdx) =>
                    p.startsWith('**') && p.endsWith('**') ? (
                      <strong key={pIdx} className="text-orange-950 font-bold">
                        {p.slice(2, -2)}
                      </strong>
                    ) : (
                      p
                    )
                  )}
                </p>
              </div>
            );
          }

          const parts = line.split(/(\*\*.*?\*\*)/g);
          return (
            <p key={idx}>
              {parts.map((p, pIdx) =>
                p.startsWith('**') && p.endsWith('**') ? (
                  <strong key={pIdx} className="text-orange-950 font-bold">
                    {p.slice(2, -2)}
                  </strong>
                ) : (
                  p
                )
              )}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Top Chat Card */}
      <div className="bg-gradient-to-br from-orange-100 via-amber-50 to-white rounded-3xl border-2 border-orange-300 p-4 sm:p-5 shadow-lg shadow-orange-950/5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center text-white font-serif font-bold text-xl shadow-md border-2 border-orange-300">
            ॐ
          </div>
          <div>
            <h3 className="text-base font-serif font-extrabold text-orange-950 flex items-center gap-2">
              ज्योतिष शिमला AI संवाद (Ask Vedic Astrologer)
            </h3>
            <p className="text-xs text-stone-700 font-medium">
              जातक: <strong className="text-orange-950">{birthDetails.name}</strong> ({lagnaRashi.lagnaHindi} लग्न • {lagnaRashi.moonSignHindi} राशि)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setMessages([
                {
                  id: 'init-1',
                  sender: 'astrologer',
                  text: `प्रणाम **${birthDetails.name}** जी! नया संवाद प्रारंभ हुआ है। आपका क्या प्रश्न है?`,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
              ])
            }
            className="text-xs text-orange-800 hover:text-orange-950 px-3.5 py-2 rounded-xl bg-white border border-orange-300 shadow-sm flex items-center gap-1.5 transition-colors font-bold"
          >
            <RotateCcw className="w-3.5 h-3.5 text-orange-600" /> नया वार्तालाप
          </button>
        </div>
      </div>

      {/* Main Chat Box */}
      <div className="bg-white rounded-3xl border-2 border-orange-200 shadow-xl shadow-orange-950/5 flex flex-col h-[580px] overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-orange-300 bg-gradient-to-b from-orange-50/30 to-white">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow ${
                    isUser
                      ? 'bg-orange-600 text-white'
                      : 'bg-gradient-to-br from-amber-500 to-orange-600 text-white border border-orange-300'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-md ${
                    isUser
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-tr-none shadow-orange-600/20'
                      : 'bg-white text-stone-800 border-2 border-orange-200 rounded-tl-none shadow-sm'
                  }`}
                >
                  <div className={`flex items-center justify-between gap-4 mb-1.5 text-[10px] font-bold ${
                    isUser ? 'text-amber-100' : 'text-orange-700'
                  }`}>
                    <span>
                      {isUser ? 'आप (जातक)' : 'ज्योतिष शिमला AI'}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-normal opacity-80">{msg.timestamp}</span>
                      {!isUser && (
                        <button
                          type="button"
                          onClick={() => handleCopyMessage(msg.id, msg.text)}
                          className="hover:text-orange-950 transition-colors"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {renderMessageContent(msg.text)}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white border border-orange-300 flex items-center justify-center text-xs font-bold shrink-0">
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div className="bg-white border-2 border-orange-200 rounded-2xl rounded-tl-none p-4 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs text-orange-900 font-bold">
                  <Sparkles className="w-3.5 h-3.5 animate-spin text-orange-600" />
                  <span>ज्योतिष शिमला AI कुंडली के ग्रहों एवं गोचर का आंकलन कर रहा है...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Pill Bar */}
        <div className="p-2.5 bg-orange-50/70 border-t border-orange-200 overflow-x-auto flex items-center gap-2 scrollbar-thin scrollbar-thumb-orange-300">
          <span className="text-[11px] text-orange-900 font-bold whitespace-nowrap pl-1 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-orange-600" /> शीघ्र प्रश्न:
          </span>
          {SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] bg-white hover:bg-orange-100 text-orange-950 font-semibold px-3 py-1 rounded-full border border-orange-200 whitespace-nowrap transition-colors hover:border-orange-400 shadow-sm"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Form Row */}
        <div className="p-3 sm:p-4 bg-white border-t border-orange-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              id="input-chat-query"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="पंडित जी से अपना ज्योतिषीय प्रश्न पूछें (उदा. करियर, विवाह, रत्न, महादशा...)"
              className="flex-1 bg-orange-50/40 border border-orange-300 rounded-2xl px-4 py-3 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 font-medium"
            />
            <button
              type="submit"
              id="btn-send-chat"
              disabled={isLoading || !inputMessage.trim()}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold shadow-md shadow-orange-600/25 border border-orange-400 flex items-center justify-center gap-2 transition-all disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">पूछें</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
