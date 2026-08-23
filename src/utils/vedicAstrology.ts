import {
  BirthDetails,
  KundaliAnalysisResult,
  PlanetInfo,
  PlanetName,
  HouseInfo,
  DashaPeriod,
  DashaSystem,
  DoshaReport,
  TransitInfo,
  GemstoneRecommendation,
  RemedialUpay,
} from '../types';

export const RASHIS = [
  { name: 'Aries', hindi: 'मेष', lord: 'Mangal', element: 'Agni (Fire)', quality: 'Chara (Movable)' },
  { name: 'Taurus', hindi: 'वृषभ', lord: 'Shukra', element: 'Prithvi (Earth)', quality: 'Sthira (Fixed)' },
  { name: 'Gemini', hindi: 'मिथुन', lord: 'Budh', element: 'Vayu (Air)', quality: 'Dvisvabhava (Dual)' },
  { name: 'Cancer', hindi: 'कर्क', lord: 'Chandra', element: 'Jala (Water)', quality: 'Chara (Movable)' },
  { name: 'Leo', hindi: 'सिंह', lord: 'Surya', element: 'Agni (Fire)', quality: 'Sthira (Fixed)' },
  { name: 'Virgo', hindi: 'कन्या', lord: 'Budh', element: 'Prithvi (Earth)', quality: 'Dvisvabhava (Dual)' },
  { name: 'Libra', hindi: 'तुला', lord: 'Shukra', element: 'Vayu (Air)', quality: 'Chara (Movable)' },
  { name: 'Scorpio', hindi: 'वृश्चिक', lord: 'Mangal', element: 'Jala (Water)', quality: 'Sthira (Fixed)' },
  { name: 'Sagittarius', hindi: 'धनु', lord: 'Guru', element: 'Agni (Fire)', quality: 'Dvisvabhava (Dual)' },
  { name: 'Capricorn', hindi: 'मकर', lord: 'Shani', element: 'Prithvi (Earth)', quality: 'Chara (Movable)' },
  { name: 'Aquarius', hindi: 'कुम्भ', lord: 'Shani', element: 'Vayu (Air)', quality: 'Sthira (Fixed)' },
  { name: 'Pisces', hindi: 'मीन', lord: 'Guru', element: 'Jala (Water)', quality: 'Dvisvabhava (Dual)' },
];

export const NAKSHATRAS = [
  { name: 'Ashwini', hindi: 'अश्विनी', lord: 'Ketu', deity: 'Ashwini Kumaras' },
  { name: 'Bharani', hindi: 'भरणी', lord: 'Shukra', deity: 'Yama' },
  { name: 'Krittika', hindi: 'कृत्तिका', lord: 'Surya', deity: 'Agni' },
  { name: 'Rohini', hindi: 'रोहिणी', lord: 'Chandra', deity: 'Brahma' },
  { name: 'Mrigashira', hindi: 'मृगशिरा', lord: 'Mangal', deity: 'Soma' },
  { name: 'Ardra', hindi: 'आर्द्रा', lord: 'Rahu', deity: 'Rudra' },
  { name: 'Punarvasu', hindi: 'पुनर्वसु', lord: 'Guru', deity: 'Aditi' },
  { name: 'Pushya', hindi: 'पुष्य', lord: 'Shani', deity: 'Brihaspati' },
  { name: 'Ashlesha', hindi: 'आश्लेषा', lord: 'Budh', deity: 'Sarpas' },
  { name: 'Magha', hindi: 'मघा', lord: 'Ketu', deity: 'Pitris' },
  { name: 'Purva Phalguni', hindi: 'पूर्वाफाल्गुनी', lord: 'Shukra', deity: 'Bhaga' },
  { name: 'Uttara Phalguni', hindi: 'उत्तराफाल्गुनी', lord: 'Surya', deity: 'Aryaman' },
  { name: 'Hasta', hindi: 'हस्त', lord: 'Chandra', deity: 'Savitr' },
  { name: 'Chitra', hindi: 'चित्रा', lord: 'Mangal', deity: 'Vishwakarma' },
  { name: 'Swati', hindi: 'स्वाती', lord: 'Rahu', deity: 'Vayu' },
  { name: 'Vishakha', hindi: 'विशाखा', lord: 'Guru', deity: 'Indragni' },
  { name: 'Anuradha', hindi: 'अनुराधा', lord: 'Shani', deity: 'Mitra' },
  { name: 'Jyeshtha', hindi: 'ज्येष्ठा', lord: 'Budh', deity: 'Indra' },
  { name: 'Mula', hindi: 'मूल', lord: 'Ketu', deity: 'Nirriti' },
  { name: 'Purva Ashadha', hindi: 'पूर्वाषाढ़ा', lord: 'Shukra', deity: 'Apah' },
  { name: 'Uttara Ashadha', hindi: 'उत्तराषाढ़ा', lord: 'Surya', deity: 'Vishwadevas' },
  { name: 'Shravana', hindi: 'श्रवण', lord: 'Chandra', deity: 'Vishnu' },
  { name: 'Dhanishta', hindi: 'धनिष्ठा', lord: 'Mangal', deity: 'Ashta Vasus' },
  { name: 'Shatabhisha', hindi: 'शतभिषा', lord: 'Rahu', deity: 'Varuna' },
  { name: 'Purva Bhadrapada', hindi: 'पूर्वभाद्रपदा', lord: 'Guru', deity: 'Aja Ekapada' },
  { name: 'Uttara Bhadrapada', hindi: 'उत्तरभाद्रपदा', lord: 'Shani', deity: 'Ahirbudhnya' },
  { name: 'Revati', hindi: 'रेवती', lord: 'Budh', deity: 'Pushan' },
];

export const VIMSHOTTARI_ORDER: { planet: PlanetName; years: number; hindi: string }[] = [
  { planet: 'Ketu', years: 7, hindi: 'केतु' },
  { planet: 'Shukra', years: 20, hindi: 'शुक्र' },
  { planet: 'Surya', years: 6, hindi: 'सूर्य' },
  { planet: 'Chandra', years: 10, hindi: 'चन्द्र' },
  { planet: 'Mangal', years: 7, hindi: 'मंगल' },
  { planet: 'Rahu', years: 18, hindi: 'राहु' },
  { planet: 'Guru', years: 16, hindi: 'गुरु' },
  { planet: 'Shani', years: 19, hindi: 'शनि' },
  { planet: 'Budh', years: 17, hindi: 'बुध' },
];

export const HOUSE_SIGNIFICANCE = [
  { house: 1, hindi: 'तनु भाव (शरीर, व्यक्तित्व, स्वास्थ्य)', eng: 'First House (Self, Personality, Vitality, Appearance)' },
  { house: 2, hindi: 'धन व कुटुंब भाव (धन, वाणी, परिवार, संचित पूँजी)', eng: 'Second House (Wealth, Family, Speech, Assets)' },
  { house: 3, hindi: 'सहज भाव (पराक्रम, छोटे भाई-बहन, साहस, संचार)', eng: 'Third House (Courage, Siblings, Communication, Efforts)' },
  { house: 4, hindi: 'सुख भाव (माता, गृह, भूमि, वाहन, मानसिक शांति)', eng: 'Fourth House (Mother, Home, Land, Vehicles, Happiness)' },
  { house: 5, hindi: 'सुत भाव (संतान, बुद्धि, पूर्वपुण्य, मंत्र, उच्च शिक्षा)', eng: 'Fifth House (Children, Intellect, Past Karma, Creativity)' },
  { house: 6, hindi: 'रिपु भाव (रोग, ऋण, शत्रु, प्रतियोगिता, सेवा)', eng: 'Sixth House (Debts, Disease, Enemies, Service, Obstacles)' },
  { house: 7, hindi: 'जाया भाव (विवाह, जीवनसाथी, व्यापारिक साझेदारी)', eng: 'Seventh House (Spouse, Marriage, Partnerships, Business)' },
  { house: 8, hindi: 'आयु भाव (दीर्घायु, गुप्त ज्ञान, परिवर्तन, शोध)', eng: 'Eighth House (Longevity, Transformation, Occult, Sudden Events)' },
  { house: 9, hindi: 'भाग्य भाव (धर्म, भाग्य, गुरु, तीर्थयात्रा, उच्च ज्ञान)', eng: 'Ninth House (Fortune, Dharma, Guru, Higher Philosophy)' },
  { house: 10, hindi: 'कर्म भाव (व्यवसाय, पद-प्रतिष्ठा, राज्य कृपा, कर्म)', eng: 'Tenth House (Career, Status, Authority, Ambition, Fame)' },
  { house: 11, hindi: 'आय भाव (लाभ, मित्र, मनोकामना पूर्ति, ज्येष्ठ भ्राता)', eng: 'Eleventh House (Gains, Networking, Aspirations, Income)' },
  { house: 12, hindi: 'व्यय भाव (मोक्ष, व्यय, विदेश वास, निद्रा, अध्यात्म)', eng: 'Twelfth House (Expenditure, Foreign travel, Moksha, Solitude)' },
];

/**
 * Calculates Julian Day Number
 */
export function getJulianDay(year: number, month: number, day: number, hour: number, minute: number, timezone: number): number {
  const decimalHours = hour + minute / 60 - timezone;
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
  return jd + decimalHours / 24;
}

/**
 * Lahiri Ayanamsha calculation (~23.85° at J2000, progressing ~50.27 arcsec/yr)
 */
export function getLahiriAyanamsha(jd: number): number {
  const t = (jd - 2451545.0) / 36525;
  // Lahiri Ayanamsha polynomial
  const ayanamsha = 23.856166 + 1.396042 * t + 0.000308 * t * t;
  return ayanamsha;
}

/**
 * Normalize degree within 0 - 360
 */
export function normalizeDegree(deg: number): number {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

/**
 * Approximate Sidereal planetary positions
 */
export function calculatePlanetaryPositions(details: BirthDetails): {
  planets: Record<PlanetName, PlanetInfo>;
  lagnaIndex: number;
  lagnaDegree: number;
} {
  const [yearStr, monthStr, dayStr] = details.dateOfBirth.split('-');
  const [hourStr, minStr] = details.timeOfBirth.split(':');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);
  const hour = parseInt(hourStr, 10);
  const min = parseInt(minStr, 10);

  const jd = getJulianDay(year, month, day, hour, min, details.timezone || 5.5);
  const ayanamsha = getLahiriAyanamsha(jd);
  const t = (jd - 2451545.0) / 36525;

  // Mean solar longitude (tropical)
  const sunL = 280.46646 + 36000.76983 * t + 0.0003032 * t * t;
  const sunM = 357.52911 + 35999.05029 * t - 0.0001537 * t * t;
  const sunC = (1.914602 - 0.004817 * t) * Math.sin((sunM * Math.PI) / 180) + 0.019993 * Math.sin((2 * sunM * Math.PI) / 180);
  const sunTropical = normalizeDegree(sunL + sunC);
  const sunSidereal = normalizeDegree(sunTropical - ayanamsha);

  // Mean Moon longitude
  const moonL = 218.3164477 + 481267.88128 * t;
  const moonM = 134.9633964 + 477198.8675055 * t;
  const moonC = 6.288774 * Math.sin((moonM * Math.PI) / 180) + 1.274027 * Math.sin((2 * moonL - sunL) * (Math.PI / 180));
  const moonTropical = normalizeDegree(moonL + moonC);
  const moonSidereal = normalizeDegree(moonTropical - ayanamsha);

  // Mars
  const marsMean = 355.433 + 19140.299 * t;
  const marsSidereal = normalizeDegree(marsMean - ayanamsha + 10.69 * Math.sin(marsMean * Math.PI / 180));

  // Mercury
  const mercuryMean = 252.25 + 149472.67 * t;
  const mercurySidereal = normalizeDegree(mercuryMean - ayanamsha + 6.34 * Math.sin(mercuryMean * Math.PI / 180));

  // Jupiter
  const jupMean = 34.35 + 3034.9057 * t;
  const jupSidereal = normalizeDegree(jupMean - ayanamsha + 5.55 * Math.sin(jupMean * Math.PI / 180));

  // Venus
  const venusMean = 181.979 + 58517.815 * t;
  const venusSidereal = normalizeDegree(venusMean - ayanamsha + 1.9 * Math.sin(venusMean * Math.PI / 180));

  // Saturn
  const satMean = 50.077 + 1222.113 * t;
  const satSidereal = normalizeDegree(satMean - ayanamsha + 6.2 * Math.sin(satMean * Math.PI / 180));

  // Rahu (Mean lunar node - retrogrades)
  const rahuMean = 125.0445 - 1934.13626 * t;
  const rahuSidereal = normalizeDegree(rahuMean - ayanamsha);

  // Ketu (180 opposite of Rahu)
  const ketuSidereal = normalizeDegree(rahuSidereal + 180);

  // Local Sidereal Time & Ascendant (Lagna)
  const gmst0 = 100.46061837 + 36000.7700536 * t + 0.000387933 * t * t;
  const utHours = hour + min / 60 - (details.timezone || 5.5);
  const gmst = normalizeDegree(gmst0 + 360.985647366 * (utHours / 24));
  const lst = normalizeDegree(gmst + (details.longitude || 77.1734)); // default Shimla lon
  const latRad = ((details.latitude || 31.1048) * Math.PI) / 180;
  const oblRad = ((23.43929 - 0.0130042 * t) * Math.PI) / 180;
  const lstRad = (lst * Math.PI) / 180;

  const tanAsc = (-Math.cos(lstRad)) / (Math.sin(lstRad) * Math.cos(oblRad) + Math.tan(latRad) * Math.sin(oblRad));
  let ascTropical = (Math.atan(tanAsc) * 180) / Math.PI;
  if (Math.sin(lstRad) >= 0) {
    ascTropical += 180;
  } else {
    ascTropical = normalizeDegree(ascTropical + 360);
  }
  const lagnaSidereal = normalizeDegree(ascTropical - ayanamsha);
  const lagnaIndex = Math.min(11, Math.max(0, Math.floor(lagnaSidereal / 30)));

  const getPlanetDetails = (name: PlanetName, degree: number, isRetro: boolean = false, speed: number = 1): PlanetInfo => {
    const normDegree = normalizeDegree(degree);
    const rashiIndex = Math.min(11, Math.max(0, Math.floor(normDegree / 30)));
    const signDegree = normDegree % 30;
    const rashi = RASHIS[rashiIndex] || RASHIS[0];
    
    // Nakshatra (360 / 27 = 13.3333 deg each)
    const nakIndex = Math.min(26, Math.max(0, Math.floor(normDegree / (360 / 27))));
    const nak = NAKSHATRAS[nakIndex] || NAKSHATRAS[0];
    const degInNak = normDegree % (360 / 27);
    const pada = Math.min(4, Math.max(1, Math.floor(degInNak / (13.33333 / 4)) + 1));

    // House calculation from Lagna
    let house = ((rashiIndex - lagnaIndex + 12) % 12) + 1;

    // Dignity evaluation
    let dignity: PlanetInfo['dignity'] = 'Neutral';
    let dignityHindi = 'सम';

    if (name === 'Surya') {
      if (rashiIndex === 0) { dignity = 'Exalted'; dignityHindi = 'उच्च (मेष)'; }
      else if (rashiIndex === 6) { dignity = 'Debilitated'; dignityHindi = 'नीच (तुला)'; }
      else if (rashiIndex === 4) { dignity = 'Own Sign'; dignityHindi = 'स्वगृही (सिंह)'; }
    } else if (name === 'Chandra') {
      if (rashiIndex === 1) { dignity = 'Exalted'; dignityHindi = 'उच्च (वृषभ)'; }
      else if (rashiIndex === 7) { dignity = 'Debilitated'; dignityHindi = 'नीच (वृश्चिक)'; }
      else if (rashiIndex === 3) { dignity = 'Own Sign'; dignityHindi = 'स्वगृही (कर्क)'; }
    } else if (name === 'Mangal') {
      if (rashiIndex === 9) { dignity = 'Exalted'; dignityHindi = 'उच्च (मकर)'; }
      else if (rashiIndex === 3) { dignity = 'Debilitated'; dignityHindi = 'नीच (कर्क)'; }
      else if (rashiIndex === 0 || rashiIndex === 7) { dignity = 'Own Sign'; dignityHindi = 'स्वगृही'; }
    } else if (name === 'Budh') {
      if (rashiIndex === 5 && signDegree <= 15) { dignity = 'Exalted'; dignityHindi = 'उच्च (कन्या)'; }
      else if (rashiIndex === 11) { dignity = 'Debilitated'; dignityHindi = 'नीच (मीन)'; }
      else if (rashiIndex === 2 || rashiIndex === 5) { dignity = 'Own Sign'; dignityHindi = 'स्वगृही'; }
    } else if (name === 'Guru') {
      if (rashiIndex === 3) { dignity = 'Exalted'; dignityHindi = 'उच्च (कर्क)'; }
      else if (rashiIndex === 9) { dignity = 'Debilitated'; dignityHindi = 'नीच (मकर)'; }
      else if (rashiIndex === 8 || rashiIndex === 11) { dignity = 'Own Sign'; dignityHindi = 'स्वगृही'; }
    } else if (name === 'Shukra') {
      if (rashiIndex === 11) { dignity = 'Exalted'; dignityHindi = 'उच्च (मीन)'; }
      else if (rashiIndex === 5) { dignity = 'Debilitated'; dignityHindi = 'नीच (कन्या)'; }
      else if (rashiIndex === 1 || rashiIndex === 6) { dignity = 'Own Sign'; dignityHindi = 'स्वगृही'; }
    } else if (name === 'Shani') {
      if (rashiIndex === 6) { dignity = 'Exalted'; dignityHindi = 'उच्च (तुला)'; }
      else if (rashiIndex === 0) { dignity = 'Debilitated'; dignityHindi = 'नीच (मेष)'; }
      else if (rashiIndex === 9 || rashiIndex === 10) { dignity = 'Own Sign'; dignityHindi = 'स्वगृही'; }
    } else if (name === 'Rahu') {
      if (rashiIndex === 1 || rashiIndex === 2) { dignity = 'Exalted'; dignityHindi = 'उच्च स्थान'; }
      else if (rashiIndex === 7 || rashiIndex === 8) { dignity = 'Debilitated'; dignityHindi = 'नीच स्थान'; }
    } else if (name === 'Ketu') {
      if (rashiIndex === 7 || rashiIndex === 8) { dignity = 'Exalted'; dignityHindi = 'उच्च स्थान'; }
      else if (rashiIndex === 1 || rashiIndex === 2) { dignity = 'Debilitated'; dignityHindi = 'नीच स्थान'; }
    }

    const hindiNames: Record<PlanetName, string> = {
      Surya: 'सूर्य',
      Chandra: 'चन्द्र',
      Mangal: 'मंगल',
      Budh: 'बुध',
      Guru: 'गुरु',
      Shukra: 'शुक्र',
      Shani: 'शनि',
      Rahu: 'राहु',
      Ketu: 'केतु',
      Lagna: 'लग्न',
    };

    return {
      name,
      hindiName: hindiNames[name],
      degree,
      signDegree,
      rashiIndex,
      rashiName: rashi.name,
      rashiHindi: rashi.hindi,
      nakshatra: nak.name,
      nakshatraLord: nak.lord,
      pada,
      house,
      isRetrograde: isRetro,
      dignity,
      dignityHindi,
      speed,
    };
  };

  const planets: Record<PlanetName, PlanetInfo> = {
    Surya: getPlanetDetails('Surya', sunSidereal),
    Chandra: getPlanetDetails('Chandra', moonSidereal),
    Mangal: getPlanetDetails('Mangal', marsSidereal, marsMean % 100 > 75),
    Budh: getPlanetDetails('Budh', mercurySidereal, mercuryMean % 40 > 30),
    Guru: getPlanetDetails('Guru', jupSidereal, jupMean % 80 > 60),
    Shukra: getPlanetDetails('Shukra', venusSidereal, venusMean % 50 > 40),
    Shani: getPlanetDetails('Shani', satSidereal, satMean % 90 > 70),
    Rahu: getPlanetDetails('Rahu', rahuSidereal, true),
    Ketu: getPlanetDetails('Ketu', ketuSidereal, true),
    Lagna: getPlanetDetails('Lagna', lagnaSidereal),
  };

  return {
    planets,
    lagnaIndex,
    lagnaDegree: lagnaSidereal,
  };
}

/**
 * Vimshottari Dasha calculation based on exact Moon Nakshatra & longitude
 */
export function calculateVimshottariDasha(moonDegree: number, birthDate: string): DashaSystem {
  const nakshatraSpan = 360 / 27; // 13.333333 deg
  const nakIndex = Math.floor(moonDegree / nakshatraSpan);
  const positionInNak = moonDegree % nakshatraSpan;
  const balanceFactor = 1 - positionInNak / nakshatraSpan; // fraction of ruling dasha remaining

  const rulingPlanetIndex = nakIndex % 9;
  const currentPlanetOrder = [
    ...VIMSHOTTARI_ORDER.slice(rulingPlanetIndex),
    ...VIMSHOTTARI_ORDER.slice(0, rulingPlanetIndex),
  ];

  const birthDateObj = new Date(birthDate);
  const mahadashas: DashaPeriod[] = [];
  let runningDate = new Date(birthDateObj);
  const today = new Date();

  let activeMahadasha: PlanetName = 'Guru';
  let activeAntardasha: PlanetName = 'Guru';

  currentPlanetOrder.forEach((item, idx) => {
    const years = idx === 0 ? item.years * balanceFactor : item.years;
    const startDate = new Date(runningDate);
    const endDate = new Date(runningDate);
    endDate.setFullYear(endDate.getFullYear() + Math.floor(years));
    endDate.setMonth(endDate.getMonth() + Math.round((years % 1) * 12));

    const isCurrent = today >= startDate && today <= endDate;
    if (isCurrent) {
      activeMahadasha = item.planet;
    }

    mahadashas.push({
      planet: item.planet,
      hindiName: item.hindi,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      isCurrent,
      years: Math.round(years * 10) / 10,
    });

    runningDate = new Date(endDate);
  });

  // Calculate Antardashas for current Mahadasha
  const currentMahaObj = mahadashas.find((m) => m.isCurrent) || mahadashas[0];
  const mahaLordIndex = VIMSHOTTARI_ORDER.findIndex((v) => v.planet === currentMahaObj.planet);
  const subOrder = [
    ...VIMSHOTTARI_ORDER.slice(mahaLordIndex),
    ...VIMSHOTTARI_ORDER.slice(0, mahaLordIndex),
  ];

  const mahaStart = new Date(currentMahaObj.startDate);
  const mahaTotalYears = VIMSHOTTARI_ORDER.find((v) => v.planet === currentMahaObj.planet)?.years || 16;
  let subRunningDate = new Date(mahaStart);

  const antardashas: DashaPeriod[] = [];
  subOrder.forEach((subItem) => {
    const subYears = (mahaTotalYears * subItem.years) / 120;
    const sDate = new Date(subRunningDate);
    const eDate = new Date(subRunningDate);
    eDate.setMonth(eDate.getMonth() + Math.round(subYears * 12));

    const isCurrentSub = today >= sDate && today <= eDate;
    if (isCurrentSub) {
      activeAntardasha = subItem.planet;
    }

    antardashas.push({
      planet: subItem.planet,
      hindiName: subItem.hindi,
      startDate: sDate.toISOString().split('T')[0],
      endDate: eDate.toISOString().split('T')[0],
      isCurrent: isCurrentSub,
      years: Math.round(subYears * 100) / 100,
    });

    subRunningDate = new Date(eDate);
  });

  return {
    currentMahadasha: activeMahadasha,
    currentAntardasha: activeAntardasha,
    mahadashas,
    antardashas,
    dashaBalanceAtBirth: `${currentPlanetOrder[0].hindi} महादशा शेष: ${(currentPlanetOrder[0].years * balanceFactor).toFixed(2)} वर्ष`,
  };
}

/**
 * Evaluates Doshas (Manglik, Kaal Sarp, Sade Sati, Pitra Dosha)
 */
export function evaluateDoshas(
  planets: Record<PlanetName, PlanetInfo>,
  lagnaIndex: number
): DoshaReport {
  // 1. Manglik Dosha: Mars in 1st, 4th, 7th, 8th, 12th from Lagna or Moon
  const marsHouseFromLagna = planets.Mangal.house;
  const marsHouseFromMoon = ((planets.Mangal.rashiIndex - planets.Chandra.rashiIndex + 12) % 12) + 1;
  const manglikHouses = [1, 4, 7, 8, 12];
  const isLagnaManglik = manglikHouses.includes(marsHouseFromLagna);
  const isMoonManglik = manglikHouses.includes(marsHouseFromMoon);
  const hasManglik = isLagnaManglik || isMoonManglik;

  let manglikSeverity: DoshaReport['manglikSeverity'] = 'None';
  let manglikDetails = 'कुंडली में मांगलिक दोष का प्रभाव नहीं है। वैवाहिक जीवन संतुलित रहेगा।';

  if (hasManglik) {
    if (isLagnaManglik && isMoonManglik) {
      manglikSeverity = 'High';
      manglikDetails = `लग्न से ${marsHouseFromLagna}वें तथा चन्द्रमा से ${marsHouseFromMoon}वें भाव में मंगल स्थित होने से पूर्ण मांगलिक योग बनता है। कुंभ विवाह या मंगल शांति अनुष्ठान लाभकारी रहता है।`;
    } else {
      manglikSeverity = 'Moderate';
      manglikDetails = `लग्न/चन्द्र से मंगल के ${marsHouseFromLagna}वें भाव में होने से आंशिक मांगलिक प्रभाव है। 28 वर्ष के उपरांत मंगल का यह प्रभाव सौम्य हो जाता है।`;
    }
  }

  // 2. Kaal Sarp Dosha: Check if all 7 planets are situated between Rahu & Ketu axis
  const rahuRashi = planets.Rahu.rashiIndex;
  const ketuRashi = planets.Ketu.rashiIndex;
  const physicalPlanets: PlanetName[] = ['Surya', 'Chandra', 'Mangal', 'Budh', 'Guru', 'Shukra', 'Shani'];
  
  let allClockwise = true;
  let allCounterClockwise = true;

  physicalPlanets.forEach((p) => {
    const r = planets[p].rashiIndex;
    const diffFromRahu = (r - rahuRashi + 12) % 12;
    if (diffFromRahu > 6) allClockwise = false;
    const diffFromKetu = (r - ketuRashi + 12) % 12;
    if (diffFromKetu > 6) allCounterClockwise = false;
  });

  const hasKaalSarp = allClockwise || allCounterClockwise;
  const kaalSarpTypes = [
    'अनंत', 'कुलिक', 'वासुकि', 'शंखपाल', 'पद्म', 'महापद्म', 'तक्षक', 'कर्कोटक', 'शंखनाद', 'घातक', 'विषधर', 'शेषनाग'
  ];
  const kaalSarpType = kaalSarpTypes[rahuRashi % 12] + ' कालसर्प योग';
  const kaalSarpDetails = hasKaalSarp
    ? `राहु-केतु अक्ष के मध्य समस्त ग्रहों के स्थित होने से ${kaalSarpType} विद्यमान है। महामृत्युंजय मंत्र जप एवं नागपंचमी पर पूजा प्रशस्त है।`
    : 'कुंडली में कालसर्प योग का दोष नहीं है। ग्रह पूर्ण रूपेण स्वतंत्र गति में हैं।';

  // 3. Shani Sade Sati: Current Saturn is in Pisces (मीन / Index 11) in 2026
  const currentTransitSaturnRashi = 11; // Meena (Pisces)
  const moonRashi = planets.Chandra.rashiIndex;
  const diffFromMoon = (currentTransitSaturnRashi - moonRashi + 12) % 12;

  let hasSadeSati = false;
  let sadeSatiPhase: DoshaReport['sadeSatiPhase'] = 'None';
  let sadeSatiDetails = 'वर्तमान में शनि की साढ़ेसाती का प्रभाव नहीं है।';

  if (diffFromMoon === 11) {
    hasSadeSati = true;
    sadeSatiPhase = 'First (Rising)';
    sadeSatiDetails = 'शनि की साढ़ेसाती का प्रथम चरण (उदय मान) सक्रिय है। मानसिक सतर्कता व शनि मंत्र जप शुभ रहेगा।';
  } else if (diffFromMoon === 0) {
    hasSadeSati = true;
    sadeSatiPhase = 'Peak (Core)';
    sadeSatiDetails = 'शनि की साढ़ेसाती का द्वितीय शिखर चरण (हृदय/शिखर मान) चल रहा है। कर्मठता व शनिवार को दीपक प्रज्वलित करें।';
  } else if (diffFromMoon === 1) {
    hasSadeSati = true;
    sadeSatiPhase = 'Setting (Final)';
    sadeSatiDetails = 'शनि की साढ़ेसाती का तृतीय चरण (अस्त मान) चल रहा है। आर्थिक व व्यवसायिक स्थिरता का समय है।';
  }

  // 4. Pitra Dosha: Sun afflicted with Rahu/Ketu or Saturn in 9th house
  const sunRashi = planets.Surya.rashiIndex;
  const isSunWithNodes = sunRashi === rahuRashi || sunRashi === ketuRashi;
  const isNinthHouseAfflicted = planets.Surya.house === 9 && (planets.Rahu.house === 9 || planets.Shani.house === 9);
  const hasPitraDosha = isSunWithNodes || isNinthHouseAfflicted;
  const pitraDoshaDetails = hasPitraDosha
    ? 'सूर्य एवं राहु/शनि के संयोग अथवा नवम भाव में युति से पितृ दोष के संकेत हैं। अमावस्या को जल तर्पण एवं पीपल वृक्ष पूजन लाभकारी है।'
    : 'पितृ कृपा से परिपूर्ण कुंडली। पितृ दोष का कोई नकारात्मक प्रभाव नहीं है।';

  return {
    hasManglikDosha: hasManglik,
    manglikSeverity,
    manglikDetails,
    hasKaalSarpDosha: hasKaalSarp,
    kaalSarpType: hasKaalSarp ? kaalSarpType : undefined,
    kaalSarpDetails,
    hasSadeSati,
    sadeSatiPhase,
    sadeSatiDetails,
    hasPitraDosha,
    pitraDoshaDetails,
  };
}

/**
 * Gemstone Recommendation Logic based on Lagna Lord, 5th Lord, 9th Lord
 */
export function getGemstoneRecommendations(lagnaIndex: number, planets: Record<PlanetName, PlanetInfo>): GemstoneRecommendation[] {
  const lagnaLord = RASHIS[lagnaIndex].lord as PlanetName;
  const fifthHouseRashi = (lagnaIndex + 4) % 12;
  const fifthLord = RASHIS[fifthHouseRashi].lord as PlanetName;
  const ninthHouseRashi = (lagnaIndex + 8) % 12;
  const ninthLord = RASHIS[ninthHouseRashi].lord as PlanetName;

  const gemstoneData: Record<PlanetName, Omit<GemstoneRecommendation, 'purpose' | 'planet'>> = {
    Surya: {
      gemstoneHindi: 'माणिक्य (Ruby)',
      gemstoneEnglish: 'Natural Ruby',
      description: 'आत्मविश्वास, तेज, प्रशासनिक सफलता, नेत्र ज्योति एवं सरकारी कार्यसिद्धि हेतु सर्वोत्तम रत्न।',
      metal: 'स्वर्ण (Gold) या तांबा (Copper)',
      finger: 'अनामिका (Ring Finger) - दाहिने हाथ',
      day: 'रविवार प्रातःकाल (शुक्ल पक्ष)',
      muhurat: 'सूर्य होरा में सूर्योदय के 1 घंटे के भीतर',
      beejMantra: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः',
      chantCount: 108,
      purificationVidhi: 'गंगाजल एवं गाय के कच्चे दूध में शुद्ध कर, लाल चन्दन व कनेर के पुष्प अर्पित करें।',
      contraindications: ['नीलम (Blue Sapphire)', 'गोमेद (Hessonite)', 'लहसुनिया (Cat’s Eye)'],
      substitutes: ['रेड गार्नेट (Garnet)', 'रूबी स्टोन'],
    },
    Chandra: {
      gemstoneHindi: 'मोती (Pearl)',
      gemstoneEnglish: 'Natural South Sea Pearl',
      description: 'मानसिक शांति, एकाग्रता, अनिद्रा निवारण, माता के सुख एवं जल तत्व संतुलन हेतु।',
      metal: 'चांदी (Pure Silver)',
      finger: 'कनिष्ठिका (Little Finger) - दाहिने हाथ',
      day: 'सोमवार सायंकाल अथवा प्रातःकाल',
      muhurat: 'चन्द्र होरा में या रोहिणी/हस्त/श्रवण नक्षत्र में',
      beejMantra: 'ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः',
      chantCount: 108,
      purificationVidhi: 'कच्चे दूध, गंगाजल, सफेद चन्दन व सफेद पुष्प से पंचोपचार पूजन करें।',
      contraindications: ['गोमेद', 'लहसुनिया', 'नीलम'],
      substitutes: ['मूनस्टोन (Moonstone)', 'सफेद कोरल'],
    },
    Mangal: {
      gemstoneHindi: 'मूंगा (Red Coral)',
      gemstoneEnglish: 'Italian Red Coral',
      description: 'शारीरिक शक्ति, रक्त संचार, साहस, भूमि-भवन लाभ, रक्त विकार शमन एवं मंगल दोष शमन हेतु।',
      metal: 'तांबा (Copper) या पंचधातु / स्वर्ण',
      finger: 'अनामिका (Ring Finger)',
      day: 'मंगलवार प्रातःकाल',
      muhurat: 'मंगल होरा अथवा मृगशिरा/चित्रा/धनिष्ठा नक्षत्र',
      beejMantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः',
      chantCount: 108,
      purificationVidhi: 'गंगाजल, सिन्दूर, लाल पुष्प व गुड़ का भोग लगाकर प्रतिष्ठापित करें।',
      contraindications: ['पन्ना (Emerald)', 'हीरा (Diamond)', 'नीलम'],
      substitutes: ['लाल अकीक (Red Agate)', 'कार्नेलियन'],
    },
    Budh: {
      gemstoneHindi: 'पन्ना (Emerald)',
      gemstoneEnglish: 'Zambian / Colombian Emerald',
      description: 'बुद्धि, वाणी, व्यापारिक चातुर्य, वित्तीय विश्लेषण, सम्भाषण कौशल एवं त्वचा कांति हेतु।',
      metal: 'स्वर्ण (Gold) या कांसा/चांदी',
      finger: 'कनिष्ठिका (Little Finger)',
      day: 'बुधवार प्रातःकाल',
      muhurat: 'बुध होरा अथवा आश्लेषा/ज्येष्ठा/रेवती नक्षत्र',
      beejMantra: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः',
      chantCount: 108,
      purificationVidhi: 'गंगाजल, दूर्वा (दूब घास), हरी इलायची व तुलसी दल से अभिमंत्रित करें।',
      contraindications: ['मूंगा (Red Coral)', 'माणिक्य (यदि शत्रु भाव में हो)'],
      substitutes: ['ओनेक्स (Green Onyx)', 'पेरिडॉट (Peridot)', 'मरगज़'],
    },
    Guru: {
      gemstoneHindi: 'पुखराज (Yellow Sapphire)',
      gemstoneEnglish: 'Ceylon Yellow Sapphire',
      description: 'ज्ञान, विवेक, उच्च शिक्षा, आध्यात्मिक उन्नति, वैवाहिक सुख, धन वृद्धि एवं ईश्वरीय कृपा हेतु।',
      metal: 'स्वर्ण (Yellow Gold) या पीतल',
      finger: 'तर्जनी (Index Finger) - मुख्य हाथ',
      day: 'गुरुवार प्रातःकाल (ब्रह्म मुहूर्त से 10 बजे तक)',
      muhurat: 'गुरु होरा अथवा पुनर्वसु/विशाखा/पूर्वाभाद्रपदा नक्षत्र',
      beejMantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः',
      chantCount: 108,
      purificationVidhi: 'हल्दी, पीले पुष्प, चने की दाल, गंगाजल व शुद्ध घी के दीपक से पूजन करें।',
      contraindications: ['हीरा (Diamond)', 'नीलम', 'गोमेद'],
      substitutes: ['येलो टोपाज (Yellow Topaz)', 'सुनहला (Citrine)'],
    },
    Shukra: {
      gemstoneHindi: 'हीरा / ओपल (Diamond / Natural Opal)',
      gemstoneEnglish: 'Natural Diamond / Australian Opal',
      description: 'आकर्षण, कला, विलासिता, दांपत्य माधुर्य, शुक्र बल, वाहन सुख एवं सौंदर्य संवर्धन हेतु।',
      metal: 'श्वेत स्वर्ण (White Gold) या प्लैटिनम / चांदी',
      finger: 'मध्यमा (Middle Finger) या कनिष्ठिका',
      day: 'शुक्रवार प्रातःकाल',
      muhurat: 'शुक्र होरा अथवा भरणी/पूर्वाफाल्गुनी/पूर्वाषाढ़ा नक्षत्र',
      beejMantra: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः',
      chantCount: 108,
      purificationVidhi: 'सफेद चन्दन, इत्र (गुलाब/केवड़ा), मिश्री एवं गंगाजल में स्नान कराएं।',
      contraindications: ['माणिक्य (Ruby)', 'मूंगा (Red Coral)', 'पीला पुखराज'],
      substitutes: ['अमेरिकन डायमंड (Zircon)', 'सफेद पुखराज (White Sapphire)'],
    },
    Shani: {
      gemstoneHindi: 'नीलम (Blue Sapphire)',
      gemstoneEnglish: 'Kashmir / Ceylon Blue Sapphire',
      description: 'कर्म फल, अनुशासन, दीर्घायु, न्याय, गूढ़ अनुसंधान, अकूत संपदा एवं शनि कृपा हेतु। (सावधानी: 3 दिन ट्रायल अनिवार्य)',
      metal: 'पंचधातु, अष्टधातु या श्वेत स्वर्ण',
      finger: 'मध्यमा (Middle Finger)',
      day: 'शनिवार सायंकाल (सूर्यास्त के उपरांत)',
      muhurat: 'शनि होरा अथवा पुष्य/अनुराधा/उत्तराभाद्रपदा नक्षत्र',
      beejMantra: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः',
      chantCount: 108,
      purificationVidhi: 'सरसों के तेल के दीपक के समक्ष काले तिल, नीले पुष्प व गंगाजल से पूजन करें।',
      contraindications: ['माणिक्य (Ruby)', 'मोती (Pearl)', 'मूंगा (Red Coral)'],
      substitutes: ['जमुनिया (Amethyst)', 'नीली (Iolite)', 'लाजवर्त'],
    },
    Rahu: {
      gemstoneHindi: 'गोमेद (Hessonite Garnet)',
      gemstoneEnglish: 'Ceylon Hessonite',
      description: 'राजनीतिक सफलता, अकस्मात लाभ, विदेशी संबंध, भ्रम निवारण एवं राहु की पीड़ा शांति हेतु।',
      metal: 'चांदी या अष्टधातु',
      finger: 'मध्यमा (Middle Finger)',
      day: 'शनिवार या बुधवार रात्रि',
      muhurat: 'स्वाती/शतभिषा/आर्द्रा नक्षत्र',
      beejMantra: 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः',
      chantCount: 108,
      purificationVidhi: 'नीले वस्त्र, उड़द, गंगाजल व धूप से अभिमंत्रित करें।',
      contraindications: ['माणिक्य', 'मोती', 'मूंगा', 'पुखराज'],
      substitutes: ['गोमेदक उप-रत्न', 'टूरमैलीन'],
    },
    Ketu: {
      gemstoneHindi: 'लहसुनिया (Cat’s Eye Chrysoberyl)',
      gemstoneEnglish: 'Chrysoberyl Cat’s Eye',
      description: 'मोक्ष, सूक्ष्म दृष्टि, आध्यात्मिक जागृति, गुप्त बाधा नाश एवं अज्ञात भय निवारण हेतु।',
      metal: 'चांदी या पंचधातु',
      finger: 'कनिष्ठिका या अनामिका',
      day: 'गुरुवार अथवा मंगलवार रात्रि',
      muhurat: 'मूल/मघा/अश्विनी नक्षत्र',
      beejMantra: 'ॐ स्रां स्रीं स्रौं सः केतवे नमः',
      chantCount: 108,
      purificationVidhi: 'गंगाजल, दूर्वा, काले-सफेद तिल एवं धूप दीप से पूजन करें।',
      contraindications: ['माणिक्य', 'मोती', 'पुखराज'],
      substitutes: ['टाइगर आई (Tiger Eye)', 'फिरोजा'],
    },
    Lagna: {
      gemstoneHindi: 'जीवन रत्न',
      gemstoneEnglish: 'Life Gemstone',
      description: 'आरोग्य व संपूर्ण व्यक्तित्व संवर्धन हेतु।',
      metal: 'स्वर्ण/चांदी',
      finger: 'अनामिका',
      day: 'लग्न वार',
      muhurat: 'प्रातःकाल',
      beejMantra: 'ॐ नमो भगवते वासुदेवाय',
      chantCount: 108,
      purificationVidhi: 'गंगाजल व पंचामृत',
      contraindications: [],
      substitutes: [],
    },
  };

  const recommendations: GemstoneRecommendation[] = [];

  // 1. Jeevan Ratna (Lagna Lord)
  if (gemstoneData[lagnaLord]) {
    recommendations.push({
      planet: lagnaLord,
      ...gemstoneData[lagnaLord],
      purpose: 'जीवन रत्न (Life Gemstone)',
    });
  }

  // 2. Karak Ratna (5th Lord - Intellect & Children)
  if (fifthLord !== lagnaLord && gemstoneData[fifthLord]) {
    recommendations.push({
      planet: fifthLord,
      ...gemstoneData[fifthLord],
      purpose: 'कारक रत्न (Benefic Energy)',
    });
  }

  // 3. Bhagya Ratna (9th Lord - Fortune & Dharma)
  if (ninthLord !== lagnaLord && ninthLord !== fifthLord && gemstoneData[ninthLord]) {
    recommendations.push({
      planet: ninthLord,
      ...gemstoneData[ninthLord],
      purpose: 'भाग्य रत्न (Lucky / Fortune)',
    });
  }

  return recommendations;
}

/**
 * Vedic Remedial Upay Generator (Mantras, Daan, Fasting, Rudraksha, Yantra)
 */
export function getRemedialMeasures(planets: Record<PlanetName, PlanetInfo>): RemedialUpay[] {
  const remedies: RemedialUpay[] = [
    {
      planet: 'Surya',
      planetHindi: 'सूर्य देव (Surya)',
      afflictionType: 'आत्मविश्वास, पिता के स्वास्थ्य अथवा सरकारी कार्यों में बाधा निवारण',
      mantra: {
        sanskrit: 'ॐ ह्रीं सूर्याय नमः || ॐ घृणिः सूर्य आदित्यः ॐ ||',
        transliteration: 'Om Hreem Suryaya Namah || Om Ghrinih Surya Adityah Om ||',
        meaning: 'समस्त ब्रह्मांड को प्रकाशमान करने वाले जगतगुरु सूर्य नारायण को नमन।',
        count: 108,
        bestTime: 'प्रातःकाल सूर्योदय के समय तांबे के पात्र से अर्घ्य देते हुए',
      },
      stotra: {
        name: 'आदित्य हृदय स्तोत्र (Aditya Hridaya Stotra)',
        benefit: 'श्री राम द्वारा रावण वध पूर्व अगस्त्य ऋषि से प्राप्त अमोघ विजय स्तोत्र।',
      },
      daan: {
        items: ['गुड़ (Jaggery)', 'तांबे का पात्र', 'लाल चन्दन', 'गेहूँ', 'केसर'],
        idealDay: 'रविवार दोपहर से पूर्व',
        recipient: 'विद्वान ब्राह्मण, साधु अथवा जनकल्याण आश्रम',
      },
      vrat: {
        day: 'रविवार',
        rules: 'नमक रहित भोजन, केवल मीठा या दलिया/खीर का सेवन करें।',
        deity: 'भगवान भुवन भास्कर सूर्य देव',
      },
      rudraksha: {
        mukhi: 'एक मुखी (1 Mukhi) या 12 मुखी (12 Mukhi) रुद्राक्ष',
        benefits: 'तेज, नेतृत्व क्षमता, निरोगी काया एवं ख्याति प्राप्ति।',
      },
      yantra: {
        name: 'सिद्ध सूर्य यंत्र (Surya Yantra)',
        placement: 'पूर्व दिशा (East) में तांबे के पत्र पर प्रतिष्ठापित करें।',
      },
      ayurvedicUpay: 'प्रातःकाल गुनगुने जल में शहद व तुलसी पत्र का सेवन करें।',
    },
    {
      planet: 'Chandra',
      planetHindi: 'चन्द्र देव (Chandra)',
      afflictionType: 'मानसिक अशांति, अवसाद, अनिद्रा, जल भय अथवा माता के कष्ट',
      mantra: {
        sanskrit: 'ॐ सों सोमाय नमः || ॐ नमः शिवाय ||',
        transliteration: 'Om Som Somaya Namah || Om Namah Shivaya ||',
        meaning: 'शीतलता प्रदाता सोमदेव एवं भगवान चन्द्रमौलेश्वर शिव को वंदन।',
        count: 108,
        bestTime: 'सायंकाल अथवा रात्रिकालीन एकांत में',
      },
      stotra: {
        name: 'चन्द्र कवच एवं शिव महिम्न स्तोत्र',
        benefit: 'मन की चंचलता का नाश, भावनात्मक स्थिरता एवं सुखद निद्रा।',
      },
      daan: {
        items: ['चावल (Rice)', 'दूध', 'मिश्री', 'सफेद वस्त्र', 'चांदी का टुकड़ा'],
        idealDay: 'सोमवार सायंकाल',
        recipient: 'कन्याएं, माता स्वरूप वृद्ध स्त्रियां अथवा शिव मंदिर',
      },
      vrat: {
        day: 'सोमवार एवं पूर्णिमा',
        rules: 'दूध, फलाहार व जल ग्रहण करें। सूर्यास्त के बाद शिव पूजन कर पारण करें।',
        deity: 'भगवान शिव-पार्वती एवं चन्द्र देव',
      },
      rudraksha: {
        mukhi: 'दो मुखी रुद्राक्ष (2 Mukhi Rudraksha - अर्धनारीश्वर स्वरूप)',
        benefits: 'पारिवारिक सौहार्द, मानसिक संतुलन एवं रक्तचाप नियंत्रण।',
      },
      yantra: {
        name: 'चन्द्र यंत्र (Chandra Yantra)',
        placement: 'उत्तर-पश्चिम (वायव्य कोण) में चांदी के पत्र पर रखें।',
      },
      ayurvedicUpay: 'चांदी के गिलास में रखा हुआ जल पीना अति गुणकारी है।',
    },
    {
      planet: 'Mangal',
      planetHindi: 'मंगल देव (Mangal)',
      afflictionType: 'मांगलिक दोष, क्रोध, रक्त विकार, दुर्घटना भय, भूमि-विवाद',
      mantra: {
        sanskrit: 'ॐ अं अंगारकाय नमः || ॐ क्रां क्रीं क्रौं सः भौमाय नमः ||',
        transliteration: 'Om Am Angarakaya Namah || Om Kram Kreem Kroum Sah Bhoumaya Namah ||',
        meaning: 'धरणीगर्भ संभूतं विद्युत्कान्ति समप्रभम् मंगल देव को प्रणाम।',
        count: 108,
        bestTime: 'प्रातःकाल लाल आसन पर बैठकर',
      },
      stotra: {
        name: 'सुंदरकांड पाठ एवं ऋणमोचक मंगल स्तोत्र',
        benefit: 'कर्ज मुक्ति, शत्रुओं पर विजय एवं असीम पराक्रम की प्राप्ति।',
      },
      daan: {
        items: ['मसूर की दाल', 'गुड़', 'लाल वस्त्र', 'तांबा', 'सिन्दूर'],
        idealDay: 'मंगलवार दोपहर',
        recipient: 'हनुमान मंदिर अथवा श्रमिक/सैन्य कर्मी',
      },
      vrat: {
        day: 'मंगलवार',
        rules: 'नमक का त्याग, केवल मीठा हलवा या गुड़-चने का प्रसाद ग्रहण करें।',
        deity: 'श्री संकटमोचन हनुमान जी एवं कार्तिकेय स्वामी',
      },
      rudraksha: {
        mukhi: 'तीन मुखी रुद्राक्ष (3 Mukhi Rudraksha - अग्नि स्वरूप)',
        benefits: 'आलस्य का नाश, रक्त शोधन एवं पराक्रम में वृद्धि।',
      },
      yantra: {
        name: 'मंगल यंत्र / अंगारक यंत्र',
        placement: 'दक्षिण दिशा (South) में तांबे के फलक पर लगाएं।',
      },
    },
    {
      planet: 'Budh',
      planetHindi: 'बुध देव (Budh)',
      afflictionType: 'वाणी दोष, व्यापार में हानि, भ्रमित बुद्धि, तंत्रिका तंत्र दुर्बलता',
      mantra: {
        sanskrit: 'ॐ बुं बुधाय नमः || ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः ||',
        transliteration: 'Om Bum Budhaya Namah || Om Bram Breem Broum Sah Budhaya Namah ||',
        meaning: 'प्रियंगुकलिकाश्यामं रूपेणाप्रतिमं बुधं सौम्यं सौम्यगुणोपेतं नमामि।',
        count: 108,
        bestTime: 'प्रातःकाल पूर्व दिशा की ओर मुख करके',
      },
      stotra: {
        name: 'विष्णु सहस्रनाम एवं बुध स्तोत्र',
        benefit: 'वाक-सिद्धि, व्यापार वृद्धि एवं कुशाग्र स्मरण शक्ति।',
      },
      daan: {
        items: ['साबुत मूंग दाल', 'हरी सब्जियां', 'कांस्य पात्र', 'हरा वस्त्र', 'तुलसी का पौधा'],
        idealDay: 'बुधवार प्रातः',
        recipient: 'गौमाता (हरा चारा), किन्नर समाज अथवा अनाथ विद्यार्थी',
      },
      vrat: {
        day: 'बुधवार',
        rules: 'हरी मूंग दाल की खिचड़ी या फलाहार लें, असत्य भाषण से बचें।',
        deity: 'भगवान लक्ष्मीनारायण एवं श्री गणेश जी',
      },
      rudraksha: {
        mukhi: 'चार मुखी रुद्राक्ष (4 Mukhi Rudraksha - ब्रह्मा स्वरूप)',
        benefits: 'तार्किक चिंतन, शिक्षा में असाधारण सफलता एवं वाणी आकर्षण।',
      },
      yantra: {
        name: 'बुध यंत्र (Budha Yantra)',
        placement: 'उत्तर दिशा (North) में तिजोरी अथवा अध्ययन कक्ष में स्थापित करें।',
      },
    },
    {
      planet: 'Guru',
      planetHindi: 'बृहस्पति देव (Guru)',
      afflictionType: 'संतान बाधा, ज्ञान में अवरोध, विवाह में विलंब, लिवर/पाचन समस्या',
      mantra: {
        sanskrit: 'ॐ बृं बृहस्पतये नमः || ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः ||',
        transliteration: 'Om Brim Brihaspataye Namah || Om Gram Greem Groum Sah Gurave Namah ||',
        meaning: 'देवानां च ऋषीणां च गुरुं काञ्चनसंनिभम् बुद्धिभूतं त्रिलोकेशं तं नमामि।',
        count: 108,
        bestTime: 'प्रातःकाल स्नान उपरांत पीले वस्त्र धारण कर',
      },
      stotra: {
        name: 'गुरु स्तोत्र एवं श्री हरि स्तोत्र',
        benefit: 'सद्गुरु कृपा, अध्यात्म जागरण एवं वंश वृद्धि।',
      },
      daan: {
        items: ['चने की दाल', 'हल्दी की गांठ', 'पीले वस्त्र', 'केसर', 'धार्मिक ग्रंथ'],
        idealDay: 'गुरुवार प्रातःकाल',
        recipient: 'गुरुजन, वेदाध्यायी ब्राह्मण अथवा मन्दिर के पुजारी',
      },
      vrat: {
        day: 'गुरुवार',
        rules: 'पीले फल, बेसन के व्यंजन ग्रहण करें। इस दिन केले के वृक्ष की पूजा करें एवं केला न खाएं।',
        deity: 'भगवान दत्तात्रेय एवं श्री हरि विष्णु',
      },
      rudraksha: {
        mukhi: 'पंचमुखी रुद्राक्ष (5 Mukhi Rudraksha - कालाग्नि रुद्र)',
        benefits: 'आयु, आरोग्य, पापमुक्ति एवं आध्यात्मिक चेतना का विस्तार।',
      },
      yantra: {
        name: 'गुरु यंत्र (Brihaspati Yantra)',
        placement: 'ईशान कोण (North-East) में पूजा वेदी पर स्थापित करें।',
      },
    },
    {
      planet: 'Shukra',
      planetHindi: 'शुक्र देव (Shukra)',
      afflictionType: 'दांपत्य क्लेश, ऐश्वर्य हीनता, वीर्य विकार, वाहन कष्ट',
      mantra: {
        sanskrit: 'ॐ शुं शुक्राय नमः || ॐ द्रां द्रीं द्रौं सः शुक्राय नमः ||',
        transliteration: 'Om Shum Shukraya Namah || Om Dram Dreem Droum Sah Shukraya Namah ||',
        meaning: 'हिमकुन्दमृणालाभं दैत्यानां परमं गुरुम् सर्वशास्त्रप्रवक्तारं भार्गवं प्रणमाम्यहम्।',
        count: 108,
        bestTime: 'सायंकाल श्वेत वस्त्र धारण कर',
      },
      stotra: {
        name: 'श्री सूक्त एवं कनकधारा स्तोत्र',
        benefit: 'महालक्ष्मी की अनवरत कृपा, भोग, ऐश्वर्य एवं दांपत्य सुख।',
      },
      daan: {
        items: ['चावल', 'मिश्री', 'इत्र', 'घी', 'सफेद मिठाई', 'कपूर'],
        idealDay: 'शुक्रवार सायं',
        recipient: 'सधवा सौभाग्यवती स्त्रियां अथवा मां दुर्गा का मन्दिर',
      },
      vrat: {
        day: 'शुक्रवार (वैभव लक्ष्मी / संतोषी माता)',
        rules: 'खट्टी वस्तुओं का सर्वथा त्याग करें, खीर का प्रसाद बांटें।',
        deity: 'मां महालक्ष्मी एवं शुक्र देव',
      },
      rudraksha: {
        mukhi: 'छह मुखी रुद्राक्ष (6 Mukhi Rudraksha - कार्तिकेय स्वरूप)',
        benefits: 'कला, सम्मोहन, आकर्षण एवं पौरुष शक्ति की वृद्धि।',
      },
      yantra: {
        name: 'श्री यंत्र / महालक्ष्मी यंत्र',
        placement: 'उत्तर दिशा (North) अथवा आग्नेय कोण में प्रतिष्ठापित करें।',
      },
    },
    {
      planet: 'Shani',
      planetHindi: 'शनि देव (Shani)',
      afflictionType: 'साढ़ेसाती, ढैय्या, अत्यधिक संघर्ष, संधिवात (जोड़ों का दर्द), कार्य विलंब',
      mantra: {
        sanskrit: 'ॐ शं शनैश्चराय नमः || ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः ||',
        transliteration: 'Om Sham Shanaishcharaya Namah || Om Pram Preem Proum Sah Shanaishcharaya Namah ||',
        meaning: 'नीलांजनसमाभासं रविपुत्रं यमाग्रजम् छायामार्तण्डसंभूतं तं नमामि शनैश्चरम्।',
        count: 108,
        bestTime: 'शनिवार सूर्यास्त के बाद पीपल वृक्ष अथवा शमी वृक्ष के समीप',
      },
      stotra: {
        name: 'दशरथ कृत शनि स्तोत्र एवं हनुमान बाहुक',
        benefit: 'शनि की समस्त क्रूर दृष्टियों एवं साढ़ेसाती की पीड़ा से पूर्ण मुक्ति।',
      },
      daan: {
        items: ['सरसों का तेल', 'काले उड़द', 'काला कम्बल', 'लोहे का तवा/चिमटा', 'काले जूते'],
        idealDay: 'शनिवार मध्याह्न अथवा सायं',
        recipient: 'दिव्यांग, वृद्ध, सफाई कर्मी अथवा निर्धन व्यक्ति',
      },
      vrat: {
        day: 'शनिवार',
        rules: 'शाम को उड़द दाल की खिचड़ी खाएं, दिन में तेल व लोहे का लेन-देन न करें।',
        deity: 'शनिदेव, भगवान भैरव एवं हनुमान जी',
      },
      rudraksha: {
        mukhi: 'सात मुखी (7 Mukhi) या चौदह मुखी (14 Mukhi) रुद्राक्ष',
        benefits: 'शनि की कुदृष्टि से रक्षा, अपार धन स्थिरता एवं मोक्ष प्राप्ति।',
      },
      yantra: {
        name: 'शनि यंत्र (Shani Yantra)',
        placement: 'पश्चिम दिशा (West) में नीले वस्त्र पर स्थापित करें।',
      },
    },
    {
      planet: 'Rahu',
      planetHindi: 'राहु देव (Rahu)',
      afflictionType: 'कालसर्प योग, वहम, आकस्मिक घाटा, तंत्र बाधा, अनिद्रा',
      mantra: {
        sanskrit: 'ॐ रां राहवे नमः || ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः ||',
        transliteration: 'Om Ram Rahave Namah || Om Bhram Bhreem Bhroum Sah Rahave Namah ||',
        meaning: 'अर्धकायं महावीर्यं चन्द्रादित्यविमर्दनम् सिंहिकागर्भसंभूतं तं राहुं प्रणमाम्यहम्।',
        count: 108,
        bestTime: 'रात्रि काल में एकांत स्थान पर',
      },
      stotra: {
        name: 'राहु कवच एवं महामृत्युंजय मंत्र',
        benefit: 'आकस्मिक विपदाओं से मुक्ति, विदेशी व्यापार में सफलता एवं कालसर्प शमन।',
      },
      daan: {
        items: ['सप्तधान्य (7 अनाज)', 'उड़द', 'नारियल (जल वाला)', 'नीले वस्त्र', 'सिक्के'],
        idealDay: 'शनिवार या बुधवार सूर्यास्त बाद',
        recipient: 'कुष्ठ रोगी, सफाई कर्मचारी अथवा बहते जल में प्रवाहित करें',
      },
      vrat: {
        day: 'शनिवार या अमावस्या',
        rules: 'धूम्रपान व मद्यपान का पूर्ण त्याग करें, पक्षियों को दाना डालें।',
        deity: 'मां छिन्नमस्ता एवं काल भैरव',
      },
      rudraksha: {
        mukhi: 'आठ मुखी रुद्राक्ष (8 Mukhi Rudraksha - अष्ट विनायक स्वरूप)',
        benefits: 'राहु जनित भय का नाश, गुप्त शत्रुओं पर विजय एवं अचानक धन लाभ।',
      },
      yantra: {
        name: 'राहु यंत्र (Rahu Yantra)',
        placement: 'नैऋत्य कोण (South-West) में स्थापित करें।',
      },
    },
    {
      planet: 'Ketu',
      planetHindi: 'केतु देव (Ketu)',
      afflictionType: 'रहस्यमयी रोग, त्वचा रोग, वैराग्यजन्य कष्ट, मोक्ष मार्ग में भटकाव',
      mantra: {
        sanskrit: 'ॐ कें केतवे नमः || ॐ स्रां स्रीं स्रौं सः केतवे नमः ||',
        transliteration: 'Om Kem Ketave Namah || Om Sram Sreem Sroum Sah Ketave Namah ||',
        meaning: 'पलाशपुष्पसंकाशं तारकाग्रहमस्तकम् रौद्रं रौद्रात्मकं घोरं तं केतुं प्रणमाम्यहम्।',
        count: 108,
        bestTime: 'सूर्योदय से पूर्व अथवा रात्रिकाल',
      },
      stotra: {
        name: 'गणेश अथर्वशीर्ष एवं केतु कवच',
        benefit: 'विघ्नों का समूल नाश, कुंडलिनी जागरण एवं पराशक्तियों से रक्षा।',
      },
      daan: {
        items: ['काले-सफेद तिल', 'दो रंग का कम्बल', 'लहसुन', 'ध्वज (झंडा मंदिर में)', 'इमली'],
        idealDay: 'मंगलवार अथवा गुरुवार',
        recipient: 'श्वान (कुत्तों) को तेल लगी रोटी खिलाएं, मंदिर में ध्वज दान करें',
      },
      vrat: {
        day: 'मंगलवार / संकष्टी चतुर्थी',
        rules: 'गणेश जी को 21 दूर्वा अर्पित कर गुड़-धनिया का भोग लगाएं।',
        deity: 'भगवान श्री गणेश एवं मां धूमावती',
      },
      rudraksha: {
        mukhi: 'नौ मुखी रुद्राक्ष (9 Mukhi Rudraksha - नवदुर्गा स्वरूप)',
        benefits: 'आत्म-ज्ञान, केतु के अनिष्ट प्रभावों का शमन एवं भय मुक्ति।',
      },
      yantra: {
        name: 'केतु यंत्र एवं गणेश यंत्र',
        placement: 'पूजा स्थान में नैऋत्य कोण में स्थापित करें।',
      },
    },
  ];

  return remedies;
}

/**
 * 2026 Transit Analysis for Natal Moon and Lagna
 */
export function calculate2026Transits(
  moonRashiIndex: number,
  lagnaIndex: number
): TransitInfo[] {
  // Ephemeris 2026 planetary sidereal signs
  const currentTransits = [
    { planet: 'Guru' as PlanetName, signIndex: 1, sign: 'Taurus / Gemini', signHindi: 'वृषभ/मिथुन', desc: 'गुरु का संचार ज्ञान, विवाह व वित्तीय विस्तार हेतु अनुकूल फल देगा।' },
    { planet: 'Shani' as PlanetName, signIndex: 11, sign: 'Pisces', signHindi: 'मीन', desc: 'शनि देव का मीन राशि में गोचर कर्म परीक्षा, वैराग्य व दीर्घकालिक व्यवस्था निर्मित करता है।' },
    { planet: 'Rahu' as PlanetName, signIndex: 10, sign: 'Aquarius', signHindi: 'कुम्भ', desc: 'राहु का कुम्भ राशि में गोचर तकनीकी प्रगति, विदेशी अवसर एवं अप्रत्याशित परिवर्तन लाता है।' },
    { planet: 'Ketu' as PlanetName, signIndex: 4, sign: 'Leo', signHindi: 'सिंह', desc: 'केतु का सिंह राशि में गोचर अहंकार विसर्जन, आध्यात्मिक अन्वेषण व आंतरिक शुद्धि हेतु प्रेरित करता है।' },
  ];

  return currentTransits.map((item) => {
    const houseFromMoon = ((item.signIndex - moonRashiIndex + 12) % 12) + 1;
    const houseFromLagna = ((item.signIndex - lagnaIndex + 12) % 12) + 1;

    let effect: TransitInfo['effect'] = 'Neutral';
    if ([1, 2, 5, 7, 9, 11].includes(houseFromMoon) && item.planet === 'Guru') {
      effect = 'Auspicious';
    } else if ([3, 6, 11].includes(houseFromMoon) && (item.planet === 'Shani' || item.planet === 'Rahu')) {
      effect = 'Auspicious';
    } else if ([8, 12].includes(houseFromMoon)) {
      effect = 'Challenging';
    }

    return {
      planet: item.planet,
      currentSign: item.sign,
      currentSignHindi: item.signHindi,
      houseFromMoon,
      houseFromLagna,
      effect,
      description: `${item.desc} (चन्द्र राशि से ${houseFromMoon}वें तथा लग्न से ${houseFromLagna}वें भाव में)`,
    };
  });
}

/**
 * Full Complete Vedic Analysis Engine Computation
 */
export function computeFullKundali(details: BirthDetails): KundaliAnalysisResult {
  const { planets, lagnaIndex } = calculatePlanetaryPositions(details);
  const moonInfo = planets.Chandra;
  const sunInfo = planets.Surya;

  // Build House list
  const houses: HouseInfo[] = [];
  for (let i = 1; i <= 12; i++) {
    const rashiIdx = (lagnaIndex + i - 1) % 12;
    const rashi = RASHIS[rashiIdx];
    const occupyingPlanets: PlanetName[] = (
      Object.keys(planets) as PlanetName[]
    ).filter((p) => p !== 'Lagna' && planets[p].house === i);

    const sig = HOUSE_SIGNIFICANCE.find((h) => h.house === i) || { hindi: '', eng: '' };

    houses.push({
      houseNumber: i,
      rashiIndex: rashiIdx,
      rashiName: rashi.name,
      rashiHindi: rashi.hindi,
      rashiLord: rashi.lord,
      planets: occupyingPlanets,
      significanceHindi: sig.hindi,
      significanceEng: sig.eng,
    });
  }

  // Calculate Dasha
  const dasha = calculateVimshottariDasha(moonInfo.degree, details.dateOfBirth);

  // Calculate Doshas
  const doshas = evaluateDoshas(planets, lagnaIndex);

  // Gemstones & Remedies
  const gemstones = getGemstoneRecommendations(lagnaIndex, planets);
  const remedies = getRemedialMeasures(planets);

  // 2026 Transits
  const transits = calculate2026Transits(moonInfo.rashiIndex, lagnaIndex);

  // Panchang Attributes
  const tithiIndex = Math.floor(normalizeDegree(moonInfo.degree - sunInfo.degree) / 12) + 1;
  const tithis = ['प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी', 'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी', 'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'पूर्णिमा/अमावस्या'];
  const tithi = `${tithiIndex <= 15 ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष'} ${tithis[(tithiIndex - 1) % 15]}`;

  return {
    birthDetails: details,
    lagnaRashi: {
      lagnaIndex,
      lagnaName: RASHIS[lagnaIndex].name,
      lagnaHindi: RASHIS[lagnaIndex].hindi,
      lagnaLord: RASHIS[lagnaIndex].lord,
      moonSignIndex: moonInfo.rashiIndex,
      moonSignName: moonInfo.rashiName,
      moonSignHindi: moonInfo.rashiHindi,
      moonSignLord: RASHIS[moonInfo.rashiIndex].lord,
      sunSignIndex: sunInfo.rashiIndex,
      sunSignName: sunInfo.rashiName,
      sunSignHindi: sunInfo.rashiHindi,
      nakshatra: moonInfo.nakshatra,
      nakshatraLord: moonInfo.nakshatraLord,
      nakshatraPada: moonInfo.pada,
      tithi,
      karana: 'बव / बालव',
      yoga: 'शुभ / प्रीति',
      varna: ['ब्राह्मण', 'क्षत्रिय', 'वैश्य', 'शूद्र'][moonInfo.rashiIndex % 4],
      yoni: ['अश्व', 'गज', 'मेष', 'सर्प', 'श्वान', 'मार्जार', 'मूषक', 'गौ', 'महिष', 'व्याघ्र', 'मृग', 'वानर', 'नकुल', 'सिंह'][Math.floor(moonInfo.degree / (360/14)) % 14],
      gana: ['देव', 'मनुष्य', 'राक्षस'][Math.floor(moonInfo.degree / (360/3)) % 3],
      nadi: ['आदि', 'मध्य', 'अंत्य'][Math.floor(moonInfo.degree / (360/3)) % 3],
    },
    planets,
    houses,
    dasha,
    doshas,
    transits,
    gemstones,
    remedies,
  };
}

export const calculateVedicKundali = computeFullKundali;
