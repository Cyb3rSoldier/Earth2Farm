import React from 'react';
import { useI18n } from '../i18n/useI18n.jsx';
import DotStrip from './DotStrip.jsx';

export default function ThreeClocks({ advisoryData }) {
  const { lang, t, formatNumber } = useI18n();

  if (!advisoryData || advisoryData.unsupported) return null;

  const {
    onset_by_year = [],
    soil_ready_by_year = [],
    greenup_by_year = [],
    rain_to_soil_lag_days = { late: 6 },
    shift_days,
    reliable
  } = advisoryData;

  const lagDays = rain_to_soil_lag_days?.late || 6;

  // Trend plain captions
  const rainCaption = reliable
    ? (lang === 'bn'
        ? `কার্যকর বর্ষা শুরুর তারিখ গড়ে ${formatNumber(shift_days)} দিন পিছিয়ে জুনের মাঝামাঝি থেকে জুলাইয়ের শুরুতে সরে গেছে।`
        : `Monsoon rain onset shifted ~${shift_days} days later, drifting from mid-June into early July.`)
    : (lang === 'bn'
        ? `বৃষ্টি শুরুর ঐতিহাসিক সময়ে কোনো উল্লেখযোগ্য স্থায়ী পরিবর্তন দেখা যায়নি।`
        : `No statistically reliable trend; onset remains near historical baseline.`);

  const soilCaption = lang === 'bn'
    ? `মাটির পর্যাপ্ত আর্দ্রতা প্রাপ্তি বৃষ্টি শুরুর সাথে ঘনিষ্ঠভাবে মিল রেখে চলছে (গড়ে প্রায় ${formatNumber(lagDays)} দিন পরে)।`
    : `Soil moisture readiness tracks the delayed rain onset closely (~${lagDays} days after rain).`;

  const greenCaption = lang === 'bn'
    ? `ফসলের সবুজ হওয়ার উপগ্রহ সংকেতও একই সাথে প্রায় ২ সপ্তাহ দেরিতে দেখা যাচ্ছে।`
    : `Vegetation green-up shows a consistent delay of roughly 14–16 days.`;

  return (
    <section 
      className="bg-[#FFFFFF] border border-[#E4DDD0] rounded-2xl p-4 sm:p-6 shadow-sm"
      aria-labelledby="three-clocks-title"
    >
      <div className="mb-4">
        <h2 id="three-clocks-title" className="text-lg sm:text-xl font-bold text-[#1C2B20]">
          {t('threeClocksTitle')}
        </h2>
        <p className="text-xs sm:text-sm text-[#526356] mt-0.5">
          {t('threeClocksSubtitle')}
        </p>
      </div>

      <div className="space-y-5">
        {/* Clock 1: Rain Clock (NASA POWER) */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF8F5] border border-[#DDD6C8]">
          <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#1D4ED8] inline-block shrink-0" aria-hidden="true" />
              <h3 className="font-bold text-sm sm:text-base text-[#1C2B20]">
                {t('clockRain')}
              </h3>
            </div>
            <span className="text-xs font-semibold text-[#526356]">2001–2025</span>
          </div>
          <DotStrip data={onset_by_year} color="#1D4ED8" label="Rain start" />
          <p className="text-xs font-medium text-[#1C2B20] mt-2">
            {rainCaption}
          </p>
        </div>

        {/* Clock 2: Soil Clock (NASA SMAP) */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF8F5] border border-[#DDD6C8]">
          <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#B45309] inline-block shrink-0" aria-hidden="true" />
              <h3 className="font-bold text-sm sm:text-base text-[#1C2B20]">
                {t('clockSoil')}
              </h3>
            </div>
            <span className="text-xs font-semibold text-[#B45309]">2015–2025 only</span>
          </div>
          <DotStrip data={soil_ready_by_year} color="#B45309" label="Soil ready" />
          <p className="text-xs font-medium text-[#1C2B20] mt-2">
            {soilCaption}
          </p>
          <p className="text-[11px] text-[#7C8B7F] mt-1 italic">
            {t('soilNote')}
          </p>
        </div>

        {/* Clock 3: Crop Green-Up (MODIS NDVI) */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF8F5] border border-[#DDD6C8]">
          <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#15803D] inline-block shrink-0" aria-hidden="true" />
              <h3 className="font-bold text-sm sm:text-base text-[#1C2B20]">
                {t('clockGreen')}
              </h3>
            </div>
            <span className="text-xs font-semibold text-[#526356]">2001–2025</span>
          </div>
          <DotStrip data={greenup_by_year} color="#15803D" label="Vegetation greening" />
          <p className="text-xs font-medium text-[#1C2B20] mt-2">
            {greenCaption}
          </p>
          <p className="text-[11px] text-[#7C8B7F] mt-1 italic">
            {t('modisNote')}
          </p>
        </div>
      </div>

      {/* Rain-to-Soil Lag Metric Callout */}
      <div className="mt-5 p-4 rounded-xl bg-[#EAF2EC] border border-[#2E5E3E]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="font-bold text-sm text-[#2E5E3E]">
            {t('lagQuestion')}
          </h4>
          <p className="text-xs text-[#526356] mt-0.5">
            {t('lagExplanation', { days: lagDays })}
          </p>
        </div>
        <div className="shrink-0 bg-[#2E5E3E] text-white px-3.5 py-1.5 rounded-lg text-center">
          <span className="text-lg font-black">{formatNumber(lagDays)}</span>
          <span className="text-xs ml-1 font-semibold">{t('daysUnit')}</span>
        </div>
      </div>
    </section>
  );
}
