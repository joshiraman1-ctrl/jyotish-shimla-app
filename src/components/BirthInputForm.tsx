import React, { useState } from 'react';
import { BirthDetails } from '../types';
import { Sparkles, MapPin, Calendar, Clock, User, Compass, CheckCircle2, RotateCcw } from 'lucide-react';

interface BirthInputFormProps {
  onCalculate: (details: BirthDetails, viewMode: 'analysis' | 'calculations') => void;
  isLoading: boolean;
  initialDetails?: BirthDetails;
}

const CITY_PRESETS: { name: string; lat: number; lon: number; tz: number; keywords: string[] }[] = [
  { name: 'शिमला, हिमाचल प्रदेश (Shimla)', lat: 31.1048, lon: 77.1734, tz: 5.5, keywords: ['shimla', 'शिमला', 'himachal'] },
  { name: 'धर्मशाला, हिमाचल प्रदेश (Dharamshala)', lat: 32.2190, lon: 76.3234, tz: 5.5, keywords: ['dharamshala', 'धर्मशाला', 'dharamsala'] },
  { name: 'मंडी, हिमाचल प्रदेश (Mandi)', lat: 31.7087, lon: 76.9320, tz: 5.5, keywords: ['mandi', 'मंडी'] },
  { name: 'कुल्लू, हिमाचल प्रदेश (Kullu)', lat: 31.9579, lon: 77.1095, tz: 5.5, keywords: ['kullu', 'कुल्लू'] },
  { name: 'सोलन, हिमाचल प्रदेश (Solan)', lat: 30.9084, lon: 77.0999, tz: 5.5, keywords: ['solan', 'सोलन'] },
  { name: 'नई दिल्ली, भारत (New Delhi)', lat: 28.6139, lon: 77.2090, tz: 5.5, keywords: ['delhi', 'दिल्ली', 'new delhi', 'नई दिल्ली'] },
  { name: 'वाराणसी, उत्तर प्रदेश (Varanasi/Kashi)', lat: 25.3176, lon: 82.9739, tz: 5.5, keywords: ['varanasi', 'वाराणसी', 'kashi', 'काशी', 'बनारस', 'banaras'] },
  { name: 'हरिद्वार, उत्तराखंड (Haridwar)', lat: 29.9457, lon: 78.1642, tz: 5.5, keywords: ['haridwar', 'हरिद्वार'] },
  { name: 'मुंबई, महाराष्ट्र (Mumbai)', lat: 19.0760, lon: 72.8777, tz: 5.5, keywords: ['mumbai', 'मुंबई', 'bombay', 'बंबई'] },
  { name: 'बेंगलुरु, कर्नाटक (Bengaluru)', lat: 12.9716, lon: 77.5946, tz: 5.5, keywords: ['bengaluru', 'bangalore', 'बेंगलुरु', 'बैंगलोर'] },
  { name: 'जयपुर, राजस्थान (Jaipur)', lat: 26.9124, lon: 75.7873, tz: 5.5, keywords: ['jaipur', 'जयपुर'] },
  { name: 'चंडीगढ़ (Chandigarh)', lat: 30.7333, lon: 76.7794, tz: 5.5, keywords: ['chandigarh', 'चंडीगढ़'] },
  { name: 'लंदन, यूनाइटेड किंगडम (London)', lat: 51.5074, lon: -0.1278, tz: 0.0, keywords: ['london', 'लंदन'] },
  { name: 'न्यूयार्क, यूएसए (New York)', lat: 40.7128, lon: -74.0060, tz: -5.0, keywords: ['new york', 'न्यूयार्क', 'ny'] },
];

export const BirthInputForm: React.FC<BirthInputFormProps> = ({
  onCalculate,
  isLoading,
  initialDetails,
}) => {
  const [name, setName] = useState(initialDetails?.name || '');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>(initialDetails?.gender || 'male');
  const [dateOfBirth, setDateOfBirth] = useState(initialDetails?.dateOfBirth || '');
  const [timeOfBirth, setTimeOfBirth] = useState(initialDetails?.timeOfBirth || '12:00');
  const [placeOfBirth, setPlaceOfBirth] = useState(
    initialDetails?.placeOfBirth || 'शिमला, हिमाचल प्रदेश (Shimla)'
  );
  const [latitude, setLatitude] = useState(initialDetails?.latitude || 31.1048);
  const [longitude, setLongitude] = useState(initialDetails?.longitude || 77.1734);
  const [timezone, setTimezone] = useState(initialDetails?.timezone || 5.5);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const handleCitySelect = (city: (typeof CITY_PRESETS)[0]) => {
    setPlaceOfBirth(city.name);
    setLatitude(city.lat);
    setLongitude(city.lon);
    setTimezone(city.tz);
    setShowCityDropdown(false);
  };

  const handlePlaceInputChange = (val: string) => {
    setPlaceOfBirth(val);
    setShowCityDropdown(true);

    const lower = val.toLowerCase().trim();
    // Check if it matches any preset keywords
    const matched = CITY_PRESETS.find((c) =>
      c.keywords.some((kw) => lower.includes(kw)) || c.name.toLowerCase().includes(lower)
    );
    if (matched) {
      setLatitude(matched.lat);
      setLongitude(matched.lon);
      setTimezone(matched.tz);
    }
  };

  const handleCalculateWithMode = (viewMode: 'analysis' | 'calculations') => {
    onCalculate({
      name: name.trim() || 'जातक',
      gender,
      dateOfBirth,
      timeOfBirth,
      placeOfBirth: placeOfBirth.trim() || 'शिमला, हिमाचल प्रदेश',
      latitude,
      longitude,
      timezone,
    }, viewMode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCalculateWithMode('analysis');
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-orange-200 p-5 sm:p-7 shadow-lg shadow-orange-950/5 backdrop-blur-sm">


      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-orange-950 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-orange-600" /> जातक का नाम
            </label>
            <input
              type="text"
              id="input-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="उदा. राहुल शर्मा"
              className="w-full bg-orange-50/40 border border-orange-200 rounded-lg px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 transition-colors"
            />
          </div>



          {/* Date of Birth */}
          <div>
            <label className="block text-xs font-semibold text-orange-950 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-orange-600" /> जन्म तिथि
            </label>
            <input
              type="date"
              id="input-dob"
              required
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full bg-orange-50/40 border border-orange-200 rounded-lg px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Time of Birth */}
          <div>
            <label className="block text-xs font-semibold text-orange-950 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-orange-600" /> जन्म समय (24 घंटे)
            </label>
            <input
              type="time"
              id="input-tob"
              required
              value={timeOfBirth}
              onChange={(e) => setTimeOfBirth(e.target.value)}
              className="w-full bg-orange-50/40 border border-orange-200 rounded-lg px-3.5 py-2.5 text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Place of Birth with Search & Suggestions */}
          <div className="md:col-span-2 relative">
            <label className="block text-xs font-semibold text-orange-950 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-600" /> जन्म स्थान (शहर / गाँव)
            </label>
            <div className="relative">
              <input
                type="text"
                id="input-pob"
                required
                value={placeOfBirth}
                onFocus={() => setShowCityDropdown(true)}
                onChange={(e) => handlePlaceInputChange(e.target.value)}
                placeholder="स्थान खोजें (उदा. शिमला, दिल्ली, वाराणसी)"
                className="w-full bg-orange-50/40 border border-orange-200 rounded-lg px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowCityDropdown(!showCityDropdown)}
                className="absolute right-2.5 top-2.5 text-xs text-orange-600 hover:text-orange-800 font-semibold"
              >
                शहर चुनें ▼
              </button>
            </div>

            {/* City Suggestions Dropdown */}
            {showCityDropdown && (
              <div className="absolute z-30 left-0 right-0 mt-1 bg-white border-2 border-orange-300 rounded-xl shadow-2xl max-h-56 overflow-y-auto p-1.5 scrollbar-thin scrollbar-thumb-orange-400">
                <div className="text-[10px] uppercase font-bold text-orange-700 px-2.5 py-1 flex items-center justify-between">
                  <span>प्रमुख शहर एवं तीर्थ</span>
                  <button
                    type="button"
                    onClick={() => setShowCityDropdown(false)}
                    className="text-stone-400 hover:text-stone-700 text-xs font-bold px-1"
                  >
                    ✕ बंद करें
                  </button>
                </div>
                {CITY_PRESETS.filter((c) =>
                  c.name.toLowerCase().includes(placeOfBirth.toLowerCase()) ||
                  c.keywords.some((kw) => kw.includes(placeOfBirth.toLowerCase()))
                ).map((city, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleCitySelect(city)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs text-stone-800 hover:bg-orange-100 hover:text-orange-950 flex items-center justify-between transition-colors"
                  >
                    <span className="font-medium">{city.name}</span>
                    <span className="text-[10px] text-stone-500 font-mono">
                      {city.lat.toFixed(2)}°N, {city.lon.toFixed(2)}°E
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Coordinates Summary */}
        <div className="bg-orange-50/70 rounded-xl p-3 border border-orange-200 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-700">
          <div className="flex items-center gap-4">
            <span>
              <strong className="text-orange-900">अक्षांश:</strong> {latitude.toFixed(4)}°
            </span>
            <span>
              <strong className="text-orange-900">देशांतर:</strong> {longitude.toFixed(4)}°
            </span>
            <span>
              <strong className="text-orange-900">समय क्षेत्र:</strong> जीएमटी {timezone >= 0 ? `+${timezone}` : timezone}
            </span>
          </div>

          <span className="text-[11px] text-orange-800 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> उच्च सटीकता लहिरी अयनांश गणना
          </span>
        </div>

        {/* Single Comprehensive Calculation Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold shadow-lg shadow-orange-600/25 border border-orange-400/40 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 text-xs sm:text-sm font-serif"
          >
            {isLoading ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin text-amber-200" />
                <span>कुण्डली गणना एवं संकलन हो रहा है...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>कुण्डली देखें एवं संपूर्ण फलादेश प्राप्त करें</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
