/**
 * NOTE: These numbers are placeholders to be replaced by computed values
 * from NASA satellite analysis (NASA POWER, SMAP, and MODIS).
 * Built for NASA Space Apps Challenge 2026 - Challenge 7: Field Shift.
 */

const COMMON_PROVENANCE = [
  {
    dataset: "NASA POWER",
    product: "Daily Precipitation (MERRA-2 assimilation)",
    version: "v2.0",
    url: "https://power.larc.nasa.gov",
    retrieved: "2026-09-15"
  },
  {
    dataset: "NASA SMAP",
    product: "L4 Global Surface & Root-Zone Soil Moisture (9 km)",
    version: "Version 7.0",
    url: "https://smap.jpl.nasa.gov",
    retrieved: "2026-09-15"
  },
  {
    dataset: "NASA MODIS",
    product: "MOD13Q1 250m 16-Day NDVI Vegetation Indices",
    version: "Collection 6.1",
    url: "https://modis.gsfc.nasa.gov",
    retrieved: "2026-09-15"
  }
];

export const MOCK_DATA = {
  rajshahi: {
    district: "Rajshahi",
    crop: "Aman Rice",
    shift_days: 14,
    ci_low: 9,
    ci_high: 19,
    p_value: 0.003,
    test_stat: 42.5,
    confidence: "high",
    reliable: true,
    periods: { early: "2001-2012", late: "2013-2025" },
    
    // Day of season: days elapsed after June 1st (e.g. Day 18 = June 18; Day 32 = July 2)
    onset_by_year: [
      { year: 2001, day_of_season: 16 },
      { year: 2002, day_of_season: 18 },
      { year: 2003, day_of_season: 15 },
      { year: 2004, day_of_season: 22 },
      { year: 2005, day_of_season: 17 },
      { year: 2006, day_of_season: 19 },
      { year: 2007, day_of_season: 14 },
      { year: 2008, day_of_season: 24 },
      { year: 2009, day_of_season: 20 },
      { year: 2010, day_of_season: 18 },
      { year: 2011, day_of_season: 21 },
      { year: 2012, day_of_season: 19 },
      { year: 2013, day_of_season: 28 },
      { year: 2014, day_of_season: 31 },
      { year: 2015, day_of_season: 29 },
      { year: 2016, day_of_season: 34 },
      { year: 2017, day_of_season: 30 },
      { year: 2018, day_of_season: 36 },
      { year: 2019, day_of_season: 32 },
      { year: 2020, day_of_season: 35 },
      { year: 2021, day_of_season: 31 },
      { year: 2022, day_of_season: 38 },
      { year: 2023, day_of_season: 33 },
      { year: 2024, day_of_season: 35 },
      { year: 2025, day_of_season: 36 }
    ],

    // NASA SMAP (starts 2015)
    soil_ready_by_year: [
      { year: 2015, day_of_season: 35 },
      { year: 2016, day_of_season: 40 },
      { year: 2017, day_of_season: 36 },
      { year: 2018, day_of_season: 43 },
      { year: 2019, day_of_season: 38 },
      { year: 2020, day_of_season: 40 },
      { year: 2021, day_of_season: 37 },
      { year: 2022, day_of_season: 44 },
      { year: 2023, day_of_season: 39 },
      { year: 2024, day_of_season: 41 },
      { year: 2025, day_of_season: 42 }
    ],

    // MODIS NDVI green-up (16-day composite bins)
    greenup_by_year: [
      { year: 2001, day_of_season: 48 },
      { year: 2002, day_of_season: 48 },
      { year: 2003, day_of_season: 48 },
      { year: 2004, day_of_season: 64 },
      { year: 2005, day_of_season: 48 },
      { year: 2006, day_of_season: 48 },
      { year: 2007, day_of_season: 48 },
      { year: 2008, day_of_season: 64 },
      { year: 2009, day_of_season: 48 },
      { year: 2010, day_of_season: 48 },
      { year: 2011, day_of_season: 64 },
      { year: 2012, day_of_season: 48 },
      { year: 2013, day_of_season: 64 },
      { year: 2014, day_of_season: 64 },
      { year: 2015, day_of_season: 64 },
      { year: 2016, day_of_season: 64 },
      { year: 2017, day_of_season: 64 },
      { year: 2018, day_of_season: 80 },
      { year: 2019, day_of_season: 64 },
      { year: 2020, day_of_season: 64 },
      { year: 2021, day_of_season: 64 },
      { year: 2022, day_of_season: 80 },
      { year: 2023, day_of_season: 64 },
      { year: 2024, day_of_season: 64 },
      { year: 2025, day_of_season: 64 }
    ],

    rain_to_soil_lag_days: { early: null, late: 6 },

    sensitivity: [
      { label: "Threshold 15 mm (3-day)", shift_days: 12 },
      { label: "Threshold 20 mm (baseline)", shift_days: 14 },
      { label: "Threshold 25 mm (conservative)", shift_days: 15 },
      { label: "3-day window variant", shift_days: 13 },
      { label: "5-day window variant", shift_days: 14 }
    ],

    heat_risk: [
      { week_label: "Jul 1 - Jul 7", share_of_years_hit: 12 },
      { week_label: "Jul 8 - Jul 14", share_of_years_hit: 15 },
      { week_label: "Jul 15 - Jul 21", share_of_years_hit: 18 },
      { week_label: "Jul 22 - Jul 28", share_of_years_hit: 24 },
      { week_label: "Jul 29 - Aug 4", share_of_years_hit: 32 },
      { week_label: "Aug 5 - Aug 11", share_of_years_hit: 44 }
    ],

    assumptions: [
      "Usable rain onset requires at least 20-25 mm cumulative precipitation over 3 consecutive days.",
      "Soil must reach puddled saturation (>40% root-zone moisture) before seedling transplanting.",
      "Aman rice nursery preparation takes 20 to 25 days before transplanting.",
      "Flowering temperature exceeding 35°C during anthesis leads to significant spikelet sterility."
    ],

    provenance: COMMON_PROVENANCE,

    advisory: {
      en: "Shift transplanting 14 days later: plant between July 20 and August 5 instead of early July.",
      bn: "চারা রোপণ ১৪ দিন পিছিয়ে দিন: জুলাইয়ের শুরুর বদলে ২০ জুলাই থেকে ৫ আগস্টের মধ্যে রোপণ করুন।"
    },

    sms: {
      en: "Earth2Farm Rajshahi: Shift Aman rice transplanting 14 days later (July 20 - Aug 5). High confidence based on NASA satellite data.",
      bn: "আর্থ২ফার্ম রাজশাহী: আমন ধান রোপণ ১৪ দিন পেছান (২০ জুলাই - ৫ আগস্ট)। নাসা উপগ্রহ তথ্যে উচ্চ নির্ভরযোগ্যতা।"
    },

    baseline_window: { start_label: "July 6", end_label: "July 22", start_label_bn: "৬ জুলাই", end_label_bn: "২২ জুলাই" },
    shifted_window: { start_label: "July 20", end_label: "August 5", start_label_bn: "২০ জুলাই", end_label_bn: "৫ আগস্ট" },

    grid_note: "NASA POWER data is modeled at ~0.5° (~50 km) resolution; SMAP soil moisture is at 9 km. Local farm topography, irrigation canals, and soil organic matter cause sub-grid variations."
  },

  rangpur: {
    district: "Rangpur",
    crop: "Aman Rice",
    shift_days: 8,
    ci_low: 3,
    ci_high: 13,
    p_value: 0.038,
    test_stat: 58.0,
    confidence: "medium",
    reliable: true,
    periods: { early: "2001-2012", late: "2013-2025" },

    onset_by_year: [
      { year: 2001, day_of_season: 14 },
      { year: 2002, day_of_season: 16 },
      { year: 2003, day_of_season: 19 },
      { year: 2004, day_of_season: 15 },
      { year: 2005, day_of_season: 18 },
      { year: 2006, day_of_season: 17 },
      { year: 2007, day_of_season: 13 },
      { year: 2008, day_of_season: 20 },
      { year: 2009, day_of_season: 18 },
      { year: 2010, day_of_season: 16 },
      { year: 2011, day_of_season: 19 },
      { year: 2012, day_of_season: 17 },
      { year: 2013, day_of_season: 22 },
      { year: 2014, day_of_season: 25 },
      { year: 2015, day_of_season: 24 },
      { year: 2016, day_of_season: 28 },
      { year: 2017, day_of_season: 23 },
      { year: 2018, day_of_season: 27 },
      { year: 2019, day_of_season: 26 },
      { year: 2020, day_of_season: 29 },
      { year: 2021, day_of_season: 24 },
      { year: 2022, day_of_season: 28 },
      { year: 2023, day_of_season: 25 },
      { year: 2024, day_of_season: 27 },
      { year: 2025, day_of_season: 26 }
    ],

    soil_ready_by_year: [
      { year: 2015, day_of_season: 29 },
      { year: 2016, day_of_season: 33 },
      { year: 2017, day_of_season: 28 },
      { year: 2018, day_of_season: 32 },
      { year: 2019, day_of_season: 31 },
      { year: 2020, day_of_season: 34 },
      { year: 2021, day_of_season: 29 },
      { year: 2022, day_of_season: 33 },
      { year: 2023, day_of_season: 30 },
      { year: 2024, day_of_season: 32 },
      { year: 2025, day_of_season: 31 }
    ],

    greenup_by_year: [
      { year: 2001, day_of_season: 48 },
      { year: 2002, day_of_season: 48 },
      { year: 2003, day_of_season: 48 },
      { year: 2004, day_of_season: 48 },
      { year: 2005, day_of_season: 48 },
      { year: 2006, day_of_season: 48 },
      { year: 2007, day_of_season: 48 },
      { year: 2008, day_of_season: 48 },
      { year: 2009, day_of_season: 48 },
      { year: 2010, day_of_season: 48 },
      { year: 2011, day_of_season: 48 },
      { year: 2012, day_of_season: 48 },
      { year: 2013, day_of_season: 48 },
      { year: 2014, day_of_season: 64 },
      { year: 2015, day_of_season: 48 },
      { year: 2016, day_of_season: 64 },
      { year: 2017, day_of_season: 48 },
      { year: 2018, day_of_season: 64 },
      { year: 2019, day_of_season: 64 },
      { year: 2020, day_of_season: 64 },
      { year: 2021, day_of_season: 48 },
      { year: 2022, day_of_season: 64 },
      { year: 2023, day_of_season: 48 },
      { year: 2024, day_of_season: 64 },
      { year: 2025, day_of_season: 64 }
    ],

    rain_to_soil_lag_days: { early: null, late: 5 },

    sensitivity: [
      { label: "Threshold 15 mm (3-day)", shift_days: 7 },
      { label: "Threshold 20 mm (baseline)", shift_days: 8 },
      { label: "Threshold 25 mm (conservative)", shift_days: 9 },
      { label: "3-day window variant", shift_days: 8 },
      { label: "5-day window variant", shift_days: 8 }
    ],

    heat_risk: [
      { week_label: "Jul 1 - Jul 7", share_of_years_hit: 8 },
      { week_label: "Jul 8 - Jul 14", share_of_years_hit: 11 },
      { week_label: "Jul 15 - Jul 21", share_of_years_hit: 14 },
      { week_label: "Jul 22 - Jul 28", share_of_years_hit: 19 },
      { week_label: "Jul 29 - Aug 4", share_of_years_hit: 26 },
      { week_label: "Aug 5 - Aug 11", share_of_years_hit: 38 }
    ],

    assumptions: [
      "Usable rain onset requires at least 20 mm cumulative precipitation over 3 consecutive days.",
      "Soil must reach puddled saturation (>40% root-zone moisture) before seedling transplanting.",
      "Aman rice nursery preparation takes 20 to 25 days before transplanting.",
      "Flowering temperature exceeding 35°C during anthesis leads to significant spikelet sterility."
    ],

    provenance: COMMON_PROVENANCE,

    advisory: {
      en: "Shift transplanting 8 days later: plant between July 16 and July 31.",
      bn: "চারা রোপণ ৮ দিন পিছিয়ে দিন: ১৬ জুলাই থেকে ৩১ জুলাইয়ের মধ্যে রোপণ করুন।"
    },

    sms: {
      en: "Earth2Farm Rangpur: Shift Aman transplanting 8 days later (July 16 - 31). Medium confidence based on NASA data.",
      bn: "আর্থ২ফার্ম রংপুর: আমন রোপণ ৮ দিন পেছান (১৬ - ৩১ জুলাই)। নাসা তথ্যের ভিত্তিতে মাঝারি নির্ভরযোগ্যতা।"
    },

    baseline_window: { start_label: "July 8", end_label: "July 23", start_label_bn: "৮ জুলাই", end_label_bn: "২৩ জুলাই" },
    shifted_window: { start_label: "July 16", end_label: "July 31", start_label_bn: "১৬ জুলাই", end_label_bn: "৩১ জুলাই" },

    grid_note: "NASA POWER data is modeled at ~0.5° (~50 km) resolution; SMAP soil moisture is at 9 km. Teesta river basin irrigation access can offset dry spells."
  },

  khulna: {
    district: "Khulna",
    crop: "Aman Rice",
    shift_days: 1,
    ci_low: -4,
    ci_high: 6,
    p_value: 0.72,
    test_stat: 82.0,
    confidence: "low",
    reliable: false,
    periods: { early: "2001-2012", late: "2013-2025" },

    // Highly overlapping dates in Khulna (no reliable shift)
    onset_by_year: [
      { year: 2001, day_of_season: 20 },
      { year: 2002, day_of_season: 18 },
      { year: 2003, day_of_season: 22 },
      { year: 2004, day_of_season: 19 },
      { year: 2005, day_of_season: 23 },
      { year: 2006, day_of_season: 21 },
      { year: 2007, day_of_season: 18 },
      { year: 2008, day_of_season: 24 },
      { year: 2009, day_of_season: 19 },
      { year: 2010, day_of_season: 22 },
      { year: 2011, day_of_season: 20 },
      { year: 2012, day_of_season: 21 },
      { year: 2013, day_of_season: 19 },
      { year: 2014, day_of_season: 23 },
      { year: 2015, day_of_season: 21 },
      { year: 2016, day_of_season: 22 },
      { year: 2017, day_of_season: 20 },
      { year: 2018, day_of_season: 24 },
      { year: 2019, day_of_season: 22 },
      { year: 2020, day_of_season: 21 },
      { year: 2021, day_of_season: 25 },
      { year: 2022, day_of_season: 20 },
      { year: 2023, day_of_season: 22 },
      { year: 2024, day_of_season: 21 },
      { year: 2025, day_of_season: 23 }
    ],

    soil_ready_by_year: [
      { year: 2015, day_of_season: 25 },
      { year: 2016, day_of_season: 26 },
      { year: 2017, day_of_season: 24 },
      { year: 2018, day_of_season: 28 },
      { year: 2019, day_of_season: 26 },
      { year: 2020, day_of_season: 25 },
      { year: 2021, day_of_season: 29 },
      { year: 2022, day_of_season: 24 },
      { year: 2023, day_of_season: 26 },
      { year: 2024, day_of_season: 25 },
      { year: 2025, day_of_season: 27 }
    ],

    greenup_by_year: [
      { year: 2001, day_of_season: 48 },
      { year: 2002, day_of_season: 48 },
      { year: 2003, day_of_season: 48 },
      { year: 2004, day_of_season: 48 },
      { year: 2005, day_of_season: 48 },
      { year: 2006, day_of_season: 48 },
      { year: 2007, day_of_season: 48 },
      { year: 2008, day_of_season: 48 },
      { year: 2009, day_of_season: 48 },
      { year: 2010, day_of_season: 48 },
      { year: 2011, day_of_season: 48 },
      { year: 2012, day_of_season: 48 },
      { year: 2013, day_of_season: 48 },
      { year: 2014, day_of_season: 48 },
      { year: 2015, day_of_season: 48 },
      { year: 2016, day_of_season: 48 },
      { year: 2017, day_of_season: 48 },
      { year: 2018, day_of_season: 48 },
      { year: 2019, day_of_season: 48 },
      { year: 2020, day_of_season: 48 },
      { year: 2021, day_of_season: 48 },
      { year: 2022, day_of_season: 48 },
      { year: 2023, day_of_season: 48 },
      { year: 2024, day_of_season: 48 },
      { year: 2025, day_of_season: 48 }
    ],

    rain_to_soil_lag_days: { early: null, late: 4 },

    sensitivity: [
      { label: "Threshold 15 mm (3-day)", shift_days: 0 },
      { label: "Threshold 20 mm (baseline)", shift_days: 1 },
      { label: "Threshold 25 mm (conservative)", shift_days: 1 },
      { label: "3-day window variant", shift_days: 1 },
      { label: "5-day window variant", shift_days: 0 }
    ],

    heat_risk: [
      { week_label: "Jul 1 - Jul 7", share_of_years_hit: 10 },
      { week_label: "Jul 8 - Jul 14", share_of_years_hit: 12 },
      { week_label: "Jul 15 - Jul 21", share_of_years_hit: 13 },
      { week_label: "Jul 22 - Jul 28", share_of_years_hit: 15 },
      { week_label: "Jul 29 - Aug 4", share_of_years_hit: 18 },
      { week_label: "Aug 5 - Aug 11", share_of_years_hit: 22 }
    ],

    assumptions: [
      "Usable rain onset requires at least 20 mm cumulative precipitation over 3 consecutive days.",
      "Coastal tidal salinity dynamics influence planting dates alongside rainfall onset.",
      "Aman rice nursery preparation takes 20 to 25 days before transplanting."
    ],

    provenance: COMMON_PROVENANCE,

    advisory: {
      en: "Keep your traditional planting calendar (July 10 - July 25). No statistically reliable shift in rain onset detected in Khulna.",
      bn: "আপনার প্রচলিত রোপণ দিনপঞ্জি বজায় রাখুন (১০ জুলাই - ২৫ জুলাই)। খুলনায় বৃষ্টির সূচনায় নির্ভরযোগ্য কোনো স্থায়ী পরিবর্তন দেখা যায়নি।"
    },

    sms: {
      en: "Earth2Farm Khulna: Keep standard Aman calendar (July 10 - 25). No significant shift detected in NASA records.",
      bn: "আর্থ২ফার্ম খুলনা: আমনের সাধারণ সূচি বজায় রাখুন (১০ - ২৫ জুলাই)। নাসা তথ্যে উল্লেখযোগ্য পরিবর্তন নেই।"
    },

    baseline_window: { start_label: "July 10", end_label: "July 25", start_label_bn: "১০ জুলাই", end_label_bn: "২৫ জুলাই" },
    shifted_window: { start_label: "July 10", end_label: "July 25", start_label_bn: "১০ জুলাই", end_label_bn: "২৫ জুলাই" },

    grid_note: "Coastal salinity and mangrove proximity may override rainfall onset cues in southern Khulna polders."
  }
};
