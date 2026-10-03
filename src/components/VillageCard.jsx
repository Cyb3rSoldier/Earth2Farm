import React from 'react';
import { useI18n } from '../i18n/useI18n.jsx';
import TrafficLight from './TrafficLight.jsx';
import ConfidenceBadge from './ConfidenceBadge.jsx';
import { USE_MOCK } from '../api/advisory.js';

export default function VillageCard({ advisoryData, onPrint }) {
  const { lang, t, formatNumber } = useI18n();

  if (!advisoryData || advisoryData.unsupported) return null;

  const {
    district,
    crop,
    shift_days,
    confidence,
    advisory,
    shifted_window,
    baseline_window,
    reliable
  } = advisoryData;

  const trafficState = !reliable
    ? 'green'
    : shift_days > 0
    ? 'yellow'
    : 'red';

  return (
    <>
      {/* On-screen Preview Card */}
      <section 
        className="bg-[#FFFFFF] border-2 border-[#2E5E3E]/40 rounded-2xl p-5 sm:p-7 shadow-sm no-print"
        aria-labelledby="village-card-preview-title"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EFE9DF] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2E5E3E] text-white flex items-center justify-center font-black text-sm">
              E2F
            </div>
            <div>
              <h2 id="village-card-preview-title" className="text-lg font-bold text-[#1C2B20]">
                {t('villageCardTitle')}
              </h2>
              <p className="text-xs text-[#526356]">
                {t('villageCardSubtitle')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onPrint}
            className="min-h-[44px] px-4 py-2 bg-[#2E5E3E] hover:bg-[#244B32] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.5A1.75 1.75 0 0113.25 8H6.75A1.75 1.75 0 015 6.25v-3.5zm1.5 0a.25.25 0 01.25-.25h6.5a.25.25 0 01.25.25v3.5a.25.25 0 01-.25.25H6.75a.25.25 0 01-.25-.25v-3.5z" clipRule="evenodd" />
              <path d="M3 7.75A1.75 1.75 0 001.25 9.5v5c0 .966.784 1.75 1.75 1.75H4v1.75C4 18.966 4.784 19.75 5.75 19.75h8.5c.966 0 1.75-.784 1.75-1.75V16.25h1A1.75 1.75 0 0018.75 14.5v-5A1.75 1.75 0 0017 7.75H3zm2.5 8.5v2.25c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25V16.25H5.5z" />
            </svg>
            <span>{t('printNow')}</span>
          </button>
        </div>

        {/* Card Content Summary */}
        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DDD6C8]">
              <span className="text-[11px] font-semibold text-[#7C8B7F] block uppercase">{t('villageDistrict')}</span>
              <strong className="text-base text-[#1C2B20]">{district}</strong>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DDD6C8]">
              <span className="text-[11px] font-semibold text-[#7C8B7F] block uppercase">{t('villageCrop')}</span>
              <strong className="text-base text-[#1C2B20]">{crop}</strong>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DDD6C8]">
              <span className="text-[11px] font-semibold text-[#7C8B7F] block uppercase">{t('villageConfidence')}</span>
              <ConfidenceBadge level={confidence} />
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DDD6C8]">
              <span className="text-[11px] font-semibold text-[#7C8B7F] block uppercase">{t('villageStatus')}</span>
              <span className="text-sm font-bold text-[#1C2B20]">
                {reliable ? `+${formatNumber(shift_days)} ${t('daysUnit')}` : (lang === 'bn' ? 'অপরিবর্তিত' : 'Standard')}
              </span>
            </div>
          </div>

          <div className="p-4 bg-[#EAF2EC] rounded-xl border border-[#2E5E3E]/20">
            <h4 className="text-xs font-bold text-[#2E5E3E] uppercase mb-1">
              {lang === 'bn' ? 'দ্বিভাষিক মূল পরামর্শ:' : 'Bilingual Key Advisory:'}
            </h4>
            <p className="text-base sm:text-lg font-bold text-[#1C2B20] mb-2">
              {advisory?.bn}
            </p>
            <p className="text-sm font-medium text-[#526356] italic">
              {advisory?.en}
            </p>
          </div>

          <p className="text-xs text-[#7C8B7F]">
            {t('villagePrintNotice')}
          </p>
        </div>
      </section>

      {/* PRINT-ONLY DOM CONTAINER FOR ONE-PAGE PRINTOUT */}
      <div className="print-only village-card-print bg-white p-8 border-4 border-[#2E5E3E] rounded-3xl font-sans text-black">
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-6">
          <div>
            <h1 className="text-3xl font-black text-[#2E5E3E] tracking-tight">
              Earth2Farm · আর্থ২ফার্ম
            </h1>
            <p className="text-sm font-bold text-gray-700 mt-1">
              Field Shift Advisory Bulletin · নাসা স্যাটেলাইট রোপণ পরামর্শ কার্ড
            </p>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-black text-white text-xs font-bold uppercase rounded">
              NASA Space Apps 2026
            </span>
            <p className="text-xs text-gray-500 mt-1">
              Challenge 7: Field Shift
            </p>
          </div>
        </div>

        {/* District & Metadata Row */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 rounded-2xl mb-6">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase block">District / জেলা</span>
            <span className="text-2xl font-black text-black">{district}</span>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase block">Crop / ফসল</span>
            <span className="text-xl font-bold text-black">{crop} (রোপা আমন)</span>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase block">Confidence / নির্ভরযোগ্যতা</span>
            <span className="text-base font-bold text-[#2E5E3E] uppercase">{confidence} Confidence</span>
          </div>
        </div>

        {/* Main Advisory Box (Bilingual) */}
        <div className="p-6 bg-green-50 border-2 border-[#2E5E3E] rounded-2xl mb-6">
          <h2 className="text-xs font-black text-[#2E5E3E] uppercase tracking-wider mb-2">
            Farmer Advisory Statement / মূল কৃষক বার্তা
          </h2>
          <p className="text-2xl font-black text-black leading-snug mb-3">
            {advisory?.bn}
          </p>
          <p className="text-base font-semibold text-gray-700 italic border-t border-green-200 pt-2">
            {advisory?.en}
          </p>
        </div>

        {/* Calendar Windows */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-5 border-2 border-dashed border-[#2E5E3E] rounded-2xl bg-white">
            <span className="text-xs font-bold text-[#2E5E3E] uppercase block mb-1">
              Recommended Shifted Window / নতুন প্রস্তাবিত সময়
            </span>
            <span className="text-2xl font-black text-black block">
              {shifted_window?.start_label_bn || shifted_window?.start_label} - {shifted_window?.end_label_bn || shifted_window?.end_label}
            </span>
            <span className="text-xs text-gray-600 block mt-1">
              ({shifted_window?.start_label} - {shifted_window?.end_label})
            </span>
          </div>

          <div className="p-5 border border-gray-300 rounded-2xl bg-gray-50">
            <span className="text-xs font-bold text-gray-500 uppercase block mb-1">
              Traditional Window / পূর্বের প্রচলিত সূচি
            </span>
            <span className="text-2xl font-bold text-gray-700 block">
              {baseline_window?.start_label_bn || baseline_window?.start_label} - {baseline_window?.end_label_bn || baseline_window?.end_label}
            </span>
            <span className="text-xs text-gray-500 block mt-1">
              ({baseline_window?.start_label} - {baseline_window?.end_label})
            </span>
          </div>
        </div>

        {/* Scientific Context */}
        <div className="text-xs text-gray-600 space-y-1 border-t border-gray-200 pt-4 mb-6">
          <p>
            • <strong>Scientific Basis:</strong> 25-year rainfall onset records (NASA POWER), verified with root-zone soil saturation (NASA SMAP) and vegetation greening index (MODIS NDVI).
          </p>
          <p>
            • <strong>Disclaimer:</strong> Reflects long-term climatological shifts; check local daily rainfall forecasts before transplanting.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-[10px] text-gray-500 border-t-2 border-black pt-3">
          <span>Earth2Farm | NASA POWER, SMAP, MODIS | {USE_MOCK ? 'Demo data' : 'Verified Data'}</span>
          <span>Printed for local village community bulletin</span>
        </div>
      </div>
    </>
  );
}
