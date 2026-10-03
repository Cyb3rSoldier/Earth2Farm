import React from 'react';
import { useI18n } from '../i18n/useI18n.jsx';
import { DISTRICTS, CROPS } from '../data/districts.js';

export default function SelectorPanel({
  selectedDistrict,
  onSelectDistrict,
  selectedCrop,
  onSelectCrop,
  onGetAdvice,
  isLoading
}) {
  const { lang, t } = useI18n();

  return (
    <section 
      className="bg-[#FFFFFF] border border-[#E4DDD0] rounded-2xl p-4 sm:p-6 shadow-sm"
      aria-labelledby="selector-heading"
    >
      <h2 id="selector-heading" className="text-lg sm:text-xl font-bold text-[#1C2B20] mb-4">
        {t('selectorTitle')}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
        {/* District Dropdown */}
        <div className="sm:col-span-1 lg:col-span-5">
          <label 
            htmlFor="district-select" 
            className="block text-xs sm:text-sm font-semibold text-[#526356] mb-1.5"
          >
            {t('districtLabel')}
          </label>
          <div className="relative">
            <select
              id="district-select"
              value={selectedDistrict}
              onChange={(e) => onSelectDistrict(e.target.value)}
              className="w-full min-h-[48px] px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD6C8] rounded-xl text-base font-medium text-[#1C2B20] appearance-none focus:border-[#2E5E3E] focus:ring-1 focus:ring-[#2E5E3E] transition-colors"
            >
              {DISTRICTS.map((d) => (
                <option key={d.id} value={d.id}>
                  {lang === 'bn' ? d.nameBn : d.nameEn} {!d.hasData ? `(${lang === 'bn' ? 'আসছে' : 'Coming soon'})` : ''}
                </option>
              ))}
            </select>
            {/* Custom dropdown caret */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#526356]">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Crop Selector */}
        <div className="sm:col-span-1 lg:col-span-4">
          <label 
            htmlFor="crop-select" 
            className="block text-xs sm:text-sm font-semibold text-[#526356] mb-1.5"
          >
            {t('cropLabel')}
          </label>
          <div className="relative">
            <select
              id="crop-select"
              value={selectedCrop}
              onChange={(e) => onSelectCrop(e.target.value)}
              className="w-full min-h-[48px] px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DDD6C8] rounded-xl text-base font-medium text-[#1C2B20] appearance-none focus:border-[#2E5E3E] focus:ring-1 focus:ring-[#2E5E3E] transition-colors"
            >
              {CROPS.map((c) => (
                <option key={c.id} value={c.id} disabled={!c.enabled}>
                  {lang === 'bn' ? c.nameBn : c.nameEn} {!c.enabled ? `(${lang === 'bn' ? 'শীঘ্রই আসছে' : 'Coming soon'})` : ''}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#526356]">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Big "Get Advice" CTA Button */}
        <div className="sm:col-span-2 lg:col-span-3">
          <button
            type="button"
            onClick={onGetAdvice}
            disabled={isLoading}
            className="w-full min-h-[48px] px-6 py-3 bg-[#2E5E3E] hover:bg-[#244B32] active:scale-[0.99] text-white font-bold text-base rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>{lang === 'bn' ? 'বিশ্লেষণ চলছে...' : 'Analyzing...'}</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
                </svg>
                <span>{t('getAdviceBtn')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
