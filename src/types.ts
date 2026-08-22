export interface BirthDetails {
  name: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string; // YYYY-MM-DD
  timeOfBirth: string; // HH:mm
  placeOfBirth: string;
  latitude: number;
  longitude: number;
  timezone: number; // e.g. 5.5 for IST
}

export type PlanetName = 
  | 'Surya' // Sun
  | 'Chandra' // Moon
  | 'Mangal' // Mars
  | 'Budh' // Mercury
  | 'Guru' // Jupiter
  | 'Shukra' // Venus
  | 'Shani' // Saturn
  | 'Rahu' // North Node
  | 'Ketu' // South Node
  | 'Lagna'; // Ascendant

export interface PlanetInfo {
  name: PlanetName;
  hindiName: string;
  degree: number; // 0 - 360
  signDegree: number; // 0 - 30
  rashiIndex: number; // 0 - 11 (0=Mesha, 1=Vrishabha...)
  rashiName: string;
  rashiHindi: string;
  nakshatra: string;
  nakshatraLord: string;
  pada: number; // 1 - 4
  house: number; // 1 - 12
  isRetrograde: boolean;
  dignity: 'Exalted' | 'Debilitated' | 'Own Sign' | 'Moolatrikona' | 'Friendly' | 'Neutral' | 'Enemy';
  dignityHindi: string;
  speed: number;
}

export interface HouseInfo {
  houseNumber: number;
  rashiIndex: number;
  rashiName: string;
  rashiHindi: string;
  rashiLord: string;
  planets: PlanetName[];
  significanceHindi: string;
  significanceEng: string;
}

export interface DashaPeriod {
  planet: PlanetName;
  hindiName: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  years: number;
}

export interface DashaSystem {
  currentMahadasha: PlanetName;
  currentAntardasha: PlanetName;
  currentPratyantardasha?: PlanetName;
  mahadashas: DashaPeriod[];
  antardashas: DashaPeriod[];
  dashaBalanceAtBirth: string;
}

export interface DoshaReport {
  hasManglikDosha: boolean;
  manglikSeverity: 'None' | 'Mild' | 'Moderate' | 'High';
  manglikDetails: string;
  hasKaalSarpDosha: boolean;
  kaalSarpType?: string;
  kaalSarpDetails: string;
  hasSadeSati: boolean;
  sadeSatiPhase?: 'First (Rising)' | 'Peak (Core)' | 'Setting (Final)' | 'None';
  sadeSatiDetails: string;
  hasPitraDosha: boolean;
  pitraDoshaDetails: string;
}

export interface GemstoneRecommendation {
  planet: PlanetName;
  gemstoneHindi: string;
  gemstoneEnglish: string;
  purpose: 'भाग्य रत्न (Lucky / Fortune)' | 'जीवन रत्न (Life Gemstone)' | 'कारक रत्न (Benefic Energy)';
  description: string;
  metal: string;
  finger: string;
  day: string;
  muhurat: string;
  beejMantra: string;
  chantCount: number;
  purificationVidhi: string;
  contraindications: string[];
  substitutes: string[];
}

export interface RemedialUpay {
  planet: PlanetName;
  planetHindi: string;
  afflictionType: string;
  mantra: {
    sanskrit: string;
    transliteration: string;
    meaning: string;
    count: number;
    bestTime: string;
  };
  stotra: {
    name: string;
    benefit: string;
  };
  daan: {
    items: string[];
    idealDay: string;
    recipient: string;
  };
  vrat: {
    day: string;
    rules: string;
    deity: string;
  };
  rudraksha: {
    mukhi: string;
    benefits: string;
  };
  yantra: {
    name: string;
    placement: string;
  };
  ayurvedicUpay?: string;
}

export interface TransitInfo {
  planet: PlanetName;
  currentSign: string;
  currentSignHindi: string;
  houseFromMoon: number;
  houseFromLagna: number;
  effect: 'Auspicious' | 'Neutral' | 'Challenging';
  description: string;
}

export interface KundaliAnalysisResult {
  birthDetails: BirthDetails;
  lagnaRashi: {
    lagnaIndex: number;
    lagnaName: string;
    lagnaHindi: string;
    lagnaLord: string;
    moonSignIndex: number;
    moonSignName: string;
    moonSignHindi: string;
    moonSignLord: string;
    sunSignIndex: number;
    sunSignName: string;
    sunSignHindi: string;
    nakshatra: string;
    nakshatraLord: string;
    nakshatraPada: number;
    tithi: string;
    karana: string;
    yoga: string;
    varna: string;
    yoni: string;
    gana: string;
    nadi: string;
  };
  planets: Record<PlanetName, PlanetInfo>;
  houses: HouseInfo[];
  dasha: DashaSystem;
  doshas: DoshaReport;
  transits: TransitInfo[];
  gemstones: GemstoneRecommendation[];
  remedies: RemedialUpay[];
  aiAnalysisText?: string;
}

export interface EsotericDimension {
  dimension: string; // "1D" - "12D"
  sanskritName: string;
  englishTitle: string;
  elementTattva: string;
  planeOfConsciousness: string;
  description: string;
  planetaryConnection: string;
  spiritualPractice: string;
  karmicSignificance: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'astrologer';
  text: string;
  timestamp: string;
  topics?: string[];
}
