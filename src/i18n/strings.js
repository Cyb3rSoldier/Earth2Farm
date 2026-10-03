/**
 * Earth2Farm Localization Strings
 * 
 * Note on Bangla translations:
 * // REVIEW WITH A NATIVE SPEAKER
 * Simple, natural, farmer-friendly agricultural Bangla is used.
 */

export const strings = {
  en: {
    // App Header & Meta
    appName: "Earth2Farm",
    tagline: "Planting-window advisory for Bangladeshi rice farmers powered by NASA satellite data",
    challengeName: "NASA Space Apps Challenge 2026 · Challenge 7: Field Shift",
    demoBadge: "DEMO DATA, not real results",
    demoBadgeTooltip: "Prototype for NASA Space Apps Challenge. Mocked data matches satellite ingestion schema.",
    simpleModeOn: "Simple view (Farmer mode)",
    simpleModeOff: "Full scientific view",
    langEn: "English",
    langBn: "বাংলা",

    // Selector Panel
    selectorTitle: "Check Your Planting Window",
    districtLabel: "Select District",
    cropLabel: "Select Crop",
    cropAman: "Aman Rice (T. Aman)",
    cropBoro: "Boro Rice (Coming soon)",
    cropAus: "Aus Rice (Coming soon)",
    getAdviceBtn: "Get Advice",
    loadingAdvice: "Analyzing 25 years of NASA observations...",

    // Advisory Hero
    advisorySentenceHeader: "Field Shift Advisory",
    statusShift: "Shift Transplanting Recommended",
    statusKeep: "Keep Standard Schedule",
    statusRisk: "Caution / Review Conditions",
    traditionalWindow: "Traditional Window",
    shiftedWindow: "Recommended New Window",
    confidenceLevel: "Confidence Level",
    confHigh: "High Confidence",
    confMed: "Medium Confidence",
    confLow: "Low Confidence",
    confHighDesc: "Strong agreement across rain, soil moisture, and historical vegetation signals (p < 0.01).",
    confMedDesc: "Clear shift detected in rainfall; moderate signal in soil moisture.",
    confLowDesc: "High variability or insufficient shift detected in satellite records.",
    
    // Action Buttons
    listenAudio: "Listen",
    listeningAudio: "Speaking...",
    stopAudio: "Stop",
    speechNotSupported: "Audio playback is not supported on this browser.",
    copySms: "Copy SMS",
    smsCopied: "SMS copied to clipboard!",
    printCard: "Print Village Card",

    // SMS Modal
    smsModalTitle: "SMS Broadcast Preview",
    smsCharCount: "Length: {count} characters",
    smsEncodingNote: "English SMS uses standard GSM-7 (up to 160 characters per SMS segment).",
    smsEncodingNoteBn: "Bangla uses Unicode (UCS-2), fitting ~70 characters per SMS segment.",
    smsClose: "Close",

    // Unreliable / No Shift State
    noShiftTitle: "No Reliable Shift Found",
    noShiftSentence: "Rainfall records over the last 25 years show no statistically significant shift for this district. Keep your traditional planting window.",
    noShiftReason: "Historical rain onset variance remains stable within normal season ranges.",

    // Unsupported District State
    unsupportedTitle: "Data Coming Soon",
    unsupportedSentence: "Satellite data processing for {district} is currently in progress. Please choose Rajshahi, Rangpur, or Khulna to see live advisory models.",

    // Three Clocks
    threeClocksTitle: "Three Satellite Clocks",
    threeClocksSubtitle: "Validating rainfall onset against actual soil saturation and historical crop greening",
    clockRain: "Rain Clock (NASA POWER)",
    clockRainDesc: "Onset of usable monsoon rains (2001-2025)",
    clockSoil: "Soil Clock (NASA SMAP)",
    clockSoilDesc: "Root-zone soil readiness (2015-2025 only)",
    clockGreen: "Green Clock (MODIS NDVI)",
    clockGreenDesc: "Vegetation green-up date (16-day composite step)",
    soilNote: "Note: NASA SMAP satellite radar/radiometer soil data begins in 2015.",
    modisNote: "Note: MODIS vegetation index updates on a 16-day composite step.",
    lagQuestion: "Rain arrived, but was the soil ready?",
    lagStat: "{days} Days Average Lag",
    lagExplanation: "Soil moisture reaches transplanting saturation an average of {days} days after the first major usable rain.",
    daysFromJune1: "Days after June 1st",

    // Distribution Chart
    distTitle: "Rain Onset Shift (2001–2012 vs 2013–2025)",
    distSubtitle: "Comparing historical monsoon onset across early and late observational periods",
    earlyPeriod: "Early Period (2001–2012)",
    latePeriod: "Late Period (2013–2025)",
    median: "Median",
    shiftAnnotated: "{days} days later",
    distSummaryText: "The distribution of monsoon rain arrival has shifted {days} days later when comparing 2001–2012 (median day {earlyMedian}) to 2013–2025 (median day {lateMedian}).",
    chartAriaLabel: "Distribution chart showing rain onset shifting from earlier in June towards July over the last 25 years.",

    // Heat Risk Calendar
    heatTitle: "Flowering Heat-Stress Risk by Transplant Week",
    heatSubtitle: "Share of past years where rice flowering faced heat stress (>35°C) based on transplant week",
    heatToggle: "Optional Extra: Flowering Heat-Stress Risk Calendar",
    heatLow: "Low Risk (<20%)",
    heatMed: "Moderate (20–35%)",
    heatHigh: "High Risk (>35%)",
    heatCaption: "Transplanting in late July reduces extreme flowering heat spikes during autumn pollination.",
    heatShareHit: "{pct}% of past seasons hit critical heat during flowering",

    // Trust Panel
    trustTitle: "Scientific Methodology & Transparency",
    trustSubtitle: "How Earth2Farm derives planting advisories from NASA satellite records",
    rainOnsetDefTitle: "Definition of Usable Rain Onset",
    rainOnsetDef: "Monsoon onset is defined as at least 25 mm of rainfall accumulated over 3 consecutive days after June 1st, without a dry spell exceeding 7 consecutive rainless days in the following 21 days.",
    assumptionsTitle: "Key Model Assumptions",
    assumption1: "Puddled lowland Aman rice requires adequate field saturation (minimum 40% soil moisture saturation) before seedling transplanting.",
    assumption2: "Seedling nursery bed preparation can begin 20 to 25 days before expected transplanting date.",
    assumption3: "Extreme heat during anthesis (flowering) occurs at temperatures ≥ 35°C and leads to spikelet sterility.",
    sensitivityTitle: "Sensitivity Across Rainfall Thresholds",
    sensitivityColVariant: "Threshold / Window Variant",
    sensitivityColShift: "Detected Shift",
    sensitivityColVerdict: "Verdict",
    verdictStable: "Stable (Consistently ~12-15 days)",
    statsPlainTitle: "Statistical Significance (Mann-Whitney Test)",
    statsPValue: "p-value: {p} ({interp})",
    statsTestStat: "Test Statistic: U = {stat}",
    statsCI: "95% Confidence Interval: {low} to {high} days",
    pValSignificant: "Statistically significant; less than 1% probability this occurred by chance",
    pValModerate: "Statistically significant at 5% alpha level",
    pValNotSignificant: "Not statistically significant; variation is within historical natural fluctuations",
    gridNoteTitle: "Satellite Grid Resolution Note",
    gridNote: "NASA POWER data is aggregated at ~0.5° (~50 km) resolution; SMAP soil moisture is provided at 9 km. Local farm topography, irrigation channels, and soil organic matter cause sub-grid variations.",
    limitationTitle: "Critical Advisory Limitation",
    limitationText: "Historical climatological shift analysis, NOT a weather forecast. This tool identifies long-term decadal shifts in agricultural seasons. Farmers should always cross-reference with local 7-day weather forecasts from the Bangladesh Meteorological Department (BMD) before transplanting.",

    // Data Sources
    dataSourcesTitle: "NASA Satellite Data Provenance",
    dataSourcesSubtitle: "Open-access Earth observation data products utilized by Earth2Farm",
    datasetCol: "Dataset & Mission",
    productCol: "Product & Parameter",
    versionCol: "Version",
    retrievedCol: "Retrieved Date",
    viewSource: "Open NASA Catalog",

    // Village Card
    villageCardTitle: "Earth2Farm · Village Advisory Card",
    villageCardSubtitle: "Official Agricultural Advisory Bulletin for Local Distribution",
    villageDistrict: "District",
    villageCrop: "Target Crop",
    villageStatus: "Status Recommendation",
    villageRecWindow: "Recommended Transplant Window",
    villageTradWindow: "Standard Calendar Window",
    villageConfidence: "Scientific Confidence",
    villageNoticeFooter: "Earth2Farm | NASA POWER, SMAP, MODIS | Demo data for NASA Space Apps 2026",
    villagePrintNotice: "Print or photocopy this card for notice boards, Union Parishad offices, and farmer cooperative groups.",
    printNow: "Print This Card",

    // Footer
    footerDisclaimer: "Earth2Farm was developed for NASA Space Apps Challenge 2026. Data derived from NASA POWER, SMAP, and MODIS satellites. Not an official meteorological warning.",
    builtFor: "NASA Space Apps Challenge 2026 · Challenge 7: Field Shift",
    credits: "Built with open NASA Earth Observation data for climate adaptation in South Asia.",

    // Generic
    errorTitle: "Unable to load advisory",
    errorMessage: "An error occurred while fetching satellite advisory data. Please try again.",
    retryBtn: "Retry Analysis",
    daysUnit: "days",
    close: "Close"
  },

  // Bangla Localization (REVIEW WITH A NATIVE SPEAKER)
  bn: {
    // App Header & Meta
    appName: "আর্থ২ফার্ম",
    tagline: "নাসার স্যাটেলাইট তথ্যের সাহায্যে বাংলাদেশের ধান চাষিদের জন্য চারা রোপণের সময়সূচি পরামর্শ",
    challengeName: "নাসা স্পেস অ্যাপস চ্যালেঞ্জ ২০২৬ · চ্যালেঞ্জ ৭: ফিল্ড শিফট",
    demoBadge: "নমুনা তথ্য, চূড়ান্ত ফলাফল নয়",
    demoBadgeTooltip: "নাসা স্পেস অ্যাপস চ্যালেঞ্জের প্রোটোটাইপ। ব্যবহৃত তথ্য স্যাটেলাইট বিশ্লেষণ কাঠামোর সাথে সামঞ্জস্যপূর্ণ।",
    simpleModeOn: "সহজ মোড (কৃষক সংস্করণ)",
    simpleModeOff: "বিস্তারিত বৈজ্ঞানিক সংস্করণ",
    langEn: "English",
    langBn: "বাংলা",

    // Selector Panel
    selectorTitle: "আপনার রোপণ সময়সূচি যাচাই করুন",
    districtLabel: "জেলা নির্বাচন করুন",
    cropLabel: "ফসল নির্বাচন করুন",
    cropAman: "রোপা আমন ধান",
    cropBoro: "বোরো ধান (শীঘ্রই আসছে)",
    cropAus: "আউশ ধান (শীঘ্রই আসছে)",
    getAdviceBtn: "পরামর্শ দেখুন",
    loadingAdvice: "নাসার ২৫ বছরের স্যাটেলাইট তথ্য বিশ্লেষণ করা হচ্ছে...",

    // Advisory Hero
    advisorySentenceHeader: "রোপণ সময়সূচি সংক্রান্ত মূল পরামর্শ",
    statusShift: "রোপণের সময় পিছিয়ে দেওয়ার সুপারিশ",
    statusKeep: "স্বাভাবিক সূচি বজায় রাখুন",
    statusRisk: "সতর্কতা / আবহাওয়া পর্যবেক্ষণ করুন",
    traditionalWindow: "প্রচলিত সময়সূচি",
    shiftedWindow: "নতুন প্রস্তাবিত রোপণ সময়",
    confidenceLevel: "নির্ভরযোগ্যতার মাত্রা",
    confHigh: "উচ্চ নির্ভরযোগ্যতা",
    confMed: "মাঝারি নির্ভরযোগ্যতা",
    confLow: "কম নির্ভরযোগ্যতা",
    confHighDesc: "বৃষ্টিপাত, মাটির আর্দ্রতা ও ফসলের সবুজায়নের তথ্যে দৃঢ় সামঞ্জস্য রয়েছে (p < 0.01)।",
    confMedDesc: "বৃষ্টিপাতে স্পষ্ট পরিবর্তন লক্ষ্য করা গেছে; মাটির আর্দ্রতায় মাঝারি সংকেত রয়েছে।",
    confLowDesc: "ঐতিহাসিক রেকর্ডে অতিরিক্ত অস্থিরতা বা পর্যাপ্ত পরিবর্তন দেখা যায়নি।",

    // Action Buttons
    listenAudio: "পরামর্শ শুনুন",
    listeningAudio: "বলা হচ্ছে...",
    stopAudio: "থামুন",
    speechNotSupported: "আপনার ব্রাউজারে অডিও শোনার ব্যবস্থা নেই।",
    copySms: "এসএমএস কপি করুন",
    smsCopied: "এসএমএস কপি করা হয়েছে!",
    printCard: "ভিলেজ কার্ড প্রিন্ট করুন",

    // SMS Modal
    smsModalTitle: "কৃষক এসএমএস বার্তার পূর্বরূপ",
    smsCharCount: "দৈর্ঘ্য: {count} অক্ষর",
    smsEncodingNote: "ইংরেজি এসএমএস সাধারণ জিএসএম-৭ ফরম্যাটে পাঠানো যায় (প্রতি এসএমএসে ১৬০ অক্ষর)।",
    smsEncodingNoteBn: "বাংলা এসএমএস ইউনিকোড মাধ্যমে পাঠানো হয়, যেখানে প্রতি এসএমএসে প্রায় ৭০টি অক্ষর থাকে।",
    smsClose: "বন্ধ করুন",

    // Unreliable / No Shift State
    noShiftTitle: "কোনো নির্ভরযোগ্য পরিবর্তন পাওয়া যায়নি",
    noShiftSentence: "গত ২৫ বছরের উপগ্রহ তথ্য অনুযায়ী এই জেলায় বর্ষার সূচনায় নির্ভরযোগ্য কোনো স্থায়ী পরিবর্তন লক্ষ্য করা যায়নি। আপনার সাধারণ রোপণ সময়সূচি অনুসরণ করুন।",
    noShiftReason: "বৃষ্টি শুরুর তারতম্য সাধারণ সীমার মধ্যেই রয়েছে।",

    // Unsupported District State
    unsupportedTitle: "তথ্য শীঘ্রই যুক্ত হবে",
    unsupportedSentence: "{district} জেলার জন্য স্যাটেলাইট তথ্যের প্রক্রিয়াকরণ চলছে। ডেমো দেখতে দয়া করে রাজশাহী, রংপুর বা খুলনা নির্বাচন করুন।",

    // Three Clocks
    threeClocksTitle: "তিনটি স্যাটেলাইট সময়রেখা",
    threeClocksSubtitle: "বৃষ্টি শুরুর সাথে মাটির আর্দ্রতা এবং ফসলের সবুজায়নের মিল যাচাই",
    clockRain: "বৃষ্টি শুরুর ঘড়ি (নাসা পাওয়ার)",
    clockRainDesc: "কার্যকর বর্ষা শুরুর তারিখ (২০০১-২০২৫)",
    clockSoil: "মাটি প্রস্তুতের ঘড়ি (নাসা এসএমএপি)",
    clockSoilDesc: "শিকড় অঞ্চলের মাটির প্রস্তুতি (শুধুমাত্র ২০১৫-২০২৫)",
    clockGreen: "সবুজায়ন ঘড়ি (মোডিস এনডিভিআই)",
    clockGreenDesc: "মাঠ সবুজ হওয়ার সময় (১৬ দিনের ধাপে পরিমাপ)",
    soilNote: "বিশেষ দ্রষ্টব্য: নাসা এসএমএপি স্যাটেলাইটের মাটির আর্দ্রতা সংক্রান্ত তথ্য ২০১৫ সাল থেকে সংগৃহীত।",
    modisNote: "বিশেষ দ্রষ্টব্য: মোডিস স্যাটেলাইট প্রতি ১৬ দিনের সামগ্রিক তথ্যে ফসলের বৃদ্ধি পরিমাপ করে।",
    lagQuestion: "বৃষ্টি হলো, কিন্তু মাটি কি চারা রোপণের উপযোগী ছিল?",
    lagStat: "গড় ব্যবধান {days} দিন",
    lagExplanation: "প্রথম পর্যাপ্ত বৃষ্টির পর জমি চারা লাগানোর মতো আর্দ্র হতে গড়ে আরও {days} দিন সময় লাগে।",
    daysFromJune1: "১ জুনের পরের দিনসংখ্যা",

    // Distribution Chart
    distTitle: "বৃষ্টি শুরুর সময়ের পরিবর্তন (২০০১-২০১২ বনাম ২০১৩-২০২৫)",
    distSubtitle: "পূর্ববর্তী যুগ এবং সাম্প্রতিক যুগের বর্ষা আগমনের ঐতিহাসিক তুলনা",
    earlyPeriod: "পূর্বের সময়কাল (২০০১–২০১২)",
    latePeriod: "সাম্প্রতিক সময়কাল (২০১৩–২০২৫)",
    median: "মধ্যক",
    shiftAnnotated: "{days} দিন পরে",
    distSummaryText: "২০০১-২০১২ সালের তুলনায় (মধ্যক দিন {earlyMedian}), ২০১৩-২০২৫ সালে (মধ্যক দিন {lateMedian}) কার্যকর বৃষ্টি গড়ে {days} দিন দেরিতে শুরু হচ্ছে।",
    chartAriaLabel: "গত ২৫ বছরে বৃষ্টি শুরুর সময় জুন মাসের শুরুর দিক থেকে জুলাইয়ের দিকে সরে যাওয়ার চার্ট।",

    // Heat Risk Calendar
    heatTitle: "রোপণের সপ্তাহ অনুযায়ী ফুল ফোটার তাপঝুঁকি",
    heatSubtitle: "কোন সপ্তাহে চারা লাগালে পরবর্তীতে ফুল ফোটার সময় ৩৫° সেলসিয়াসের বেশি ক্ষতিকর তাপপ্রবাহ হতে পারে",
    heatToggle: "ঐচ্ছিক অতিরিক্ত: ফুল ফোটার সময়ের তাপঝুঁকি দিনপঞ্জি",
    heatLow: "কম ঝুঁকি (<২০%)",
    heatMed: "মাঝারি ঝুঁকি (২০–৩৫%)",
    heatHigh: "উচ্চ ঝুঁকি (>৩৫%)",
    heatCaption: "জুলাইয়ের শেষের দিকে চারা রোপণ করলে আশ্বিন-কার্তিক মাসে পরাগায়নের সময় অতিরিক্ত তাপের ঝুঁকি কমে যায়।",
    heatShareHit: "বিগত বছরগুলোর {pct}% সময়ে ফুল ফোটার সময় ক্ষতিকর তাপপ্রবাহ ঘটেছিল",

    // Trust Panel
    trustTitle: "বৈজ্ঞানিক পদ্ধতি ও স্বচ্ছতা",
    trustSubtitle: "আর্থ২ফার্ম যেভাবে নাসার স্যাটেলাইট তথ্য থেকে পরামর্শ তৈরি করে",
    rainOnsetDefTitle: "কার্যকর বৃষ্টি শুরুর সংজ্ঞা",
    rainOnsetDef: "১লা জুনের পর টানা ৩ দিনে মোট অন্তত ২৫ মিলিমিটার বৃষ্টিপাত হওয়াকে কার্যকর বৃষ্টি শুরু ধরা হয়েছে, যদি পরবর্তী ২১ দিনের মধ্যে টানা ৭ দিনের অনাবৃষ্টি না থাকে।",
    assumptionsTitle: "মডেলের মূল অনুমানসমূহ",
    assumption1: "রোপা আমনের চারা লাগানোর জন্য মাটির ন্যূনতম ৪০% আর্দ্রতা বা কাদা তৈরির উপযুক্ত অবস্থা প্রয়োজন।",
    assumption2: "মূল জমিতে চারা লাগানোর ২০ থেকে ২৫ দিন পূর্বে বীজতলায় বীজ বপন করতে হয়।",
    assumption3: "ধানের শিষ বের হওয়া এবং ফুল ফোটার সময় ৩৫° সেলসিয়াস বা তার বেশি তাপমাত্রা ফলন বিপর্যয় ঘটায়।",
    sensitivityTitle: "বৃষ্টির ভিন্ন মাত্রায় স্থায়িত্ব পরীক্ষা",
    sensitivityColVariant: "বৃষ্টির মাত্রা ও সময়সীমা",
    sensitivityColShift: "নির্ণীত স্থানান্তর",
    sensitivityColVerdict: "ফলাফল",
    verdictStable: "স্থিতিশীল (ধারাবাহিকভাবে প্রায় ১২-১৫ দিন)",
    statsPlainTitle: "পরিসংখ্যানগত নির্ভরযোগ্যতা (ম্যান-হুইটনি পরীক্ষা)",
    statsPValue: "পি-মান: {p} ({interp})",
    statsTestStat: "টেস্ট স্ট্যাটিসটিক: U = {stat}",
    statsCI: "৯৫% আস্থার ব্যবধান: {low} থেকে {high} দিন",
    pValSignificant: "পরিসংখ্যানগতভাবে অত্যন্ত নির্ভরযোগ্য (দৈবক্রমে ঘটার সম্ভাবনা ১% এরও কম)",
    pValModerate: "পরিসংখ্যানগতভাবে নির্ভরযোগ্য (৫% সীমার মধ্যে)",
    pValNotSignificant: "পরিসংখ্যানগতভাবে নির্ভরযোগ্য নয় (সাধারণ প্রাকৃতিক পরিবর্তনের মধ্যে)",
    gridNoteTitle: "স্যাটেলাইটের গ্রিড সংক্রান্ত তথ্য",
    gridNote: "নাসা পাওয়ার ডেটা প্রায় ৫০ কিমি এবং এসএমএপি মাটি ডেটা ৯ কিমি রেজোলিউশনে পরিমাপ করা হয়। জমির ধরন এবং সেচ ব্যবস্থার কারণে স্থানীয়ভাবে সামান্য ভিন্নতা হতে পারে।",
    limitationTitle: "গুরুত্বপূর্ণ সীমাবদ্ধতা",
    limitationText: "এটি দীর্ঘমেয়াদী জলবায়ু পরিবর্তনের বিশ্লেষণ, তাৎক্ষণিক আবহাওয়া পূর্বাভাস নয়। চারা রোপণের পূর্বে বাংলাদেশ আবহাওয়া অধিদপ্তরের ৭ দিনের নিয়মিত পূর্বাভাস দেখে নেওয়া জরুরি।",

    // Data Sources
    dataSourcesTitle: "নাসা স্যাটেলাইট তথ্যের উৎস ও বিবরণ",
    dataSourcesSubtitle: "আর্থ২ফার্মে ব্যবহৃত মুক্ত উপগ্রহ পর্যবেক্ষণ তথ্যসমূহ",
    datasetCol: "মিশন ও ডেটাসেট",
    productCol: "পণ্য ও পরিমাপ",
    versionCol: "সংস্করণ",
    retrievedCol: "সংগ্রহের তারিখ",
    viewSource: "নাসা ক্যাটালগ দেখুন",

    // Village Card
    villageCardTitle: "আর্থ২ফার্ম · গ্রাম কৃষি পরামর্শ বিজ্ঞপ্তি",
    villageCardSubtitle: "স্থানীয় কৃষক ও নোটিশ বোর্ডের জন্য প্রচারযোগ্য তথ্যপত্র",
    villageDistrict: "জেলা",
    villageCrop: "নির্দিষ্ট ফসল",
    villageStatus: "পরামর্শের ধরন",
    villageRecWindow: "প্রস্তাবিত নতুন রোপণ সময়",
    villageTradWindow: "প্রচলিত সাধারণ রোপণ সময়",
    villageConfidence: "বৈজ্ঞানিক নির্ভরযোগ্যতা",
    villageNoticeFooter: "আর্থ২ফার্ম | নাসা পাওয়ার, এসএমএপি, মোডিস | নাসা স্পেস অ্যাপস ২০২৬ ডেমো তথ্য",
    villagePrintNotice: "ইউনিয়ন পরিষদ, কৃষি তথ্য কেন্দ্র বা কৃষক সমবায়ের নোটিশ বোর্ডে টানানোর জন্য প্রিন্ট করুন।",
    printNow: "কার্ডটি প্রিন্ট করুন",

    // Footer
    footerDisclaimer: "আর্থ২ফার্ম নাসা স্পেস অ্যাপস চ্যালেঞ্জ ২০২৬-এর জন্য তৈরি। নাসা পাওয়ার, এসএমএপি এবং মোডিস উপগ্রহের তথ্যের ওপর ভিত্তি করে তৈরি। এটি কোনো সরকারি জরুরি সতর্কতা নয়।",
    builtFor: "নাসা স্পেস অ্যাপস চ্যালেঞ্জ ২০২৬ · চ্যালেঞ্জ ৭: ফিল্ড শিফট",
    credits: "দক্ষিণ এশিয়ায় জলবায়ু পরিবর্তনের সাথে কৃষির অভিযোজনের লক্ষ্যে নাসার উন্মুক্ত ডেটা দ্বারা নির্মিত।",

    // Generic
    errorTitle: "তথ্য আনতে সমস্যা হয়েছে",
    errorMessage: "স্যাটেলাইট তথ্য লোড করার সময় সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
    retryBtn: "পুনরায় চেষ্টা করুন",
    daysUnit: "দিন",
    close: "বন্ধ করুন"
  }
};
