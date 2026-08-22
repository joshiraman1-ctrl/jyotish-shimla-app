import React, { useState } from 'react';
import { BirthDetails } from '../types';
import { Sparkles, MapPin, Calendar, Clock, User, Compass, CheckCircle2, RotateCcw } from 'lucide-react';

interface BirthInputFormProps {
  onCalculate: (details: BirthDetails) => void;
  isLoading: boolean;
  initialDetails?: BirthDetails;
}

const CITY_PRESETS: { name: string; lat: number; lon: number; tz: number }[] = [
  { name: 'Shimla, Himachal Pradesh (देवभूमि)', lat: 31.1048, lon: 77.1734, tz: 5.5 },
  { name: 'Dharamshala, Himachal Pradesh', lat: 32.2190, lon: 76.3234, tz: 5.5 },
  { name: 'Mandi, Himachal Pradesh (छोटी काशी)', lat: 31.7087, lon: 76.9320, tz: 5.5 },
  { name: 'Kullu, Himachal Pradesh', lat: 31.9579, lon: 77.1095, tz: 5.5 },
  { name: 'Solan, Himachal Pradesh', lat: 30.9084, lon: 77.0999, tz: 5.5 },
  { name: 'New Delhi, India', lat: 28.6139, lon: 77.2090, tz: 5.5 },
  { name: 'Varanasi, Uttar Pradesh (काशी)', lat: 25.3176, lon: 82.9739, tz: 5.5 },
  { name: 'Haridwar, Uttarakhand', lat: 29.9457, lon: 78.1642, tz: 5.5 },
  { name: 'Mumbai, Maharashtra', lat: 19.0760, lon: 72.8777, tz: 5.5 },
  { name: 'Bengaluru, Karnataka', lat: 12.9716, lon: 77.5946, tz: 5.5 },
  { name: 'Jaipur, Rajasthan', lat: 26.9124, lon: 75.7873, tz: 5.5 },
  { name: 'London, United Kingdom', lat: 51.5074, lon: -0.1278, tz: 0.0 },
  { name: 'New York, USA', lat: 40.7128, lon: -74.0060, tz: -5.0 },
];

const SAMPLE_PROFILES: { label: string; details: BirthDetails }[] = [
  {
    label: 'हिमाचल जातक (Shimla Birth)',
    details: {
      name: 'रोहित शर्मा',
      gender: 'male',
      dateOfBirth: '1995-10-18',
      timeOfBirth: '07:45',
      placeOfBirth: 'Shimla, Himachal Pradesh (देवभूमि)',
      latitude: 31.1048,
      longitude: 77.1734,
      timezone: 5.5,
    },
  },
  {
    label: 'व्यापार एवं तकनीकी जातक (Delhi Birth)',
    details: {
      name: 'अदिति वर्मा',
      gender: 'female',
      dateOfBirth: '1998-04-22',
      timeOfBirth: '14:20',
      placeOfBirth: 'New Delhi, India',
      latitude: 28.6139,
      longitude: 77.2090,
      timezone: 5.5,
    },
  },
  {
    label: 'आध्यात्मिक साधक (Kashi Birth)',
    details: {
      name: 'पंडित सूर्यांशु जोशी',
      gender: 'male',
      dateOfBirth: '1989-11-12',
      timeOfBirth: '05:30',
      placeOfBirth: 'Varanasi, Uttar Pradesh (काशी)',
      latitude: 25.3176,
      longitude: 82.9739,
      timezone: 5.5,
    },
  },
];

export const BirthInputForm: React.FC<BirthInputFormProps> = ({
  onCalculate,
  isLoading,
  initialDetails,
}) => {
  const [name, setName] = useState(initialDetails?.name || 'जातक');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>(initialDetails?.gender || 'male');
  const [dateOfBirth, setDateOfBirth] = useState(initialDetails?.dateOfBirth || '1996-06-15');
  const [timeOfBirth, setTimeOfBirth] = useState(initialDetails?.timeOfBirth || '10:30');
  const [placeOfBirth, setPlaceOfBirth] = useState(
    initialDetails?.placeOfBirth || 'Shimla, Himachal Pradesh (देवभूमि)'
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

  const handleLoadSample = (sample: (typeof SAMPLE_PROFILES)[0]) => {
    setName(sample.details.name);
    setGender(sample.details.gender);
    setDateOfBirth(sample.details.dateOfBirth);
    setTimeOfBirth(sample.details.timeOfBirth);
    setPlaceOfBirth(sample.details.placeOfBirth);
    setLatitude(sample.details.latitude);
    setLongitude(sample.details.longitude);
    setTimezone(sample.details.timezone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      name: name.trim() || 'जातक',
      gender,
      dateOfBirth,
      timeOfBirth,
      placeOfBirth,
      latitude,
      longitude,
      timezone,
    });
  };

  return (
    <div className="bg-stone-900/90 rounded-2xl border border-amber-800/40 p-5 sm:p-7 shadow-2xl backdrop-blur-sm">
      {/* Form Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 mb-6 border-b border-amber-800/30">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg sm:text-xl font-serif font-bold text-amber-100">
              प्राथमिक जन्म विवरण (Primary Birth Details)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            सटीक लग्न, राशि, नक्षत्र, ग्रह स्थिति एवं महादशा गणना हेतु अपना जन्म विवरण दर्ज करें।
          </p>
        </div>

        {/* Quick Sample Profiles */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-amber-400/90 font-medium">नमूना प्रोफाइल:</span>
          {SAMPLE_PROFILES.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleLoadSample(sample)}
              className="text-[11px] bg-stone-800 hover:bg-amber-950/80 text-amber-200 px-2.5 py-1 rounded-md border border-amber-700/40 transition-colors"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-amber-200 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" /> जातक का नाम (Full Name)
            </label>
            <input
              type="text"
              id="input-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="उदा. राहुल शर्मा"
              className="w-full bg-stone-800/90 border border-amber-700/40 rounded-lg px-3.5 py-2.5 text-sm text-amber-50 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-medium text-amber-200 mb-1.5">
              लिंग (Gender)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'male', label: 'पुरुष (Male)' },
                { id: 'female', label: 'महिला (Female)' },
                { id: 'other', label: 'अन्य (Other)' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setGender(item.id as any)}
                  className={`py-2.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                    gender === item.id
                      ? 'bg-amber-600/90 text-white border-amber-400'
                      : 'bg-stone-800 text-stone-300 border-amber-900/40 hover:bg-stone-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-xs font-medium text-amber-200 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" /> जन्म तिथि (Date of Birth)
            </label>
            <input
              type="date"
              id="input-dob"
              required
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full bg-stone-800/90 border border-amber-700/40 rounded-lg px-3.5 py-2.5 text-sm text-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
            />
          </div>

          {/* Time of Birth */}
          <div>
            <label className="block text-xs font-medium text-amber-200 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> जन्म समय (Time of Birth - 24hr)
            </label>
            <input
              type="time"
              id="input-tob"
              required
              value={timeOfBirth}
              onChange={(e) => setTimeOfBirth(e.target.value)}
              className="w-full bg-stone-800/90 border border-amber-700/40 rounded-lg px-3.5 py-2.5 text-sm text-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
            />
          </div>

          {/* Place of Birth with Search & Suggestions */}
          <div className="md:col-span-2 relative">
            <label className="block text-xs font-medium text-amber-200 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" /> जन्म स्थान (Place of Birth)
            </label>
            <div className="relative">
              <input
                type="text"
                id="input-pob"
                required
                value={placeOfBirth}
                onFocus={() => setShowCityDropdown(true)}
                onChange={(e) => {
                  setPlaceOfBirth(e.target.value);
                  setShowCityDropdown(true);
                }}
                placeholder="स्थान खोजें (उदा. Shimla, New Delhi, Varanasi)"
                className="w-full bg-stone-800/90 border border-amber-700/40 rounded-lg px-3.5 py-2.5 text-sm text-amber-50 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
              />
              <button
                type="button"
                onClick={() => setShowCityDropdown(!showCityDropdown)}
                className="absolute right-2.5 top-2.5 text-xs text-amber-400 hover:text-amber-300 font-medium"
              >
                चुनें ▼
              </button>
            </div>

            {/* City Suggestions Dropdown */}
            {showCityDropdown && (
              <div className="absolute z-30 left-0 right-0 mt-1 bg-stone-900 border border-amber-700/60 rounded-xl shadow-2xl max-h-56 overflow-y-auto p-1.5 scrollbar-thin scrollbar-thumb-amber-700">
                <div className="text-[10px] uppercase font-bold text-amber-400/80 px-2.5 py-1">
                  प्रमुख तीर्थ एवं शहर (Popular Locations)
                </div>
                {CITY_PRESETS.filter((c) =>
                  c.name.toLowerCase().includes(placeOfBirth.toLowerCase())
                ).map((city, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleCitySelect(city)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs text-stone-200 hover:bg-amber-950/80 hover:text-amber-200 flex items-center justify-between transition-colors"
                  >
                    <span>{city.name}</span>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {city.lat.toFixed(2)}°N, {city.lon.toFixed(2)}°E
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Coordinates Summary */}
        <div className="bg-stone-950/60 rounded-xl p-3 border border-amber-900/30 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-300">
          <div className="flex items-center gap-4">
            <span>
              <strong className="text-amber-300">अक्षांश (Lat):</strong> {latitude.toFixed(4)}°
            </span>
            <span>
              <strong className="text-amber-300">देशांतर (Lon):</strong> {longitude.toFixed(4)}°
            </span>
            <span>
              <strong className="text-amber-300">समय क्षेत्र (TZ):</strong> GMT{timezone >= 0 ? `+${timezone}` : timezone}
            </span>
          </div>

          <span className="text-[11px] text-amber-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> उच्च सटीकता लहिरी अयनांश गणना
          </span>
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex justify-center">
          <button
            type="submit"
            id="btn-compute-kundali"
            disabled={isLoading}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-500 hover:to-orange-500 text-white font-semibold shadow-xl border border-amber-300/40 flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin text-amber-200" />
                <span>वैदिक गणना एवं AI विश्लेषण संकलित हो रहा है...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>कुंडली का पूर्ण विश्लेषण करें (Compute Kundali & Analysis)</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
