import React, { useState, useEffect } from 'react';
import { useI18n } from '../i18n/useI18n.jsx';

export default function TrustPanel({ advisoryData }) {
  const { lang, t, formatNumber } = useI18n();
  // Open by default on desktop (>768px), collapsed by default on small mobile
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, []);

  if (!advisoryData || advisoryData.unsupported) return null;

  const {
    assumptions = [],
    sensitivity = [],
    p_value,
    test_stat,
    ci_low,
    ci_high,
    grid_note
  } = advisoryData;

  // Plain language interpretation of p-value
  const pInterpretation = p_value < 0.01
    ? t('pValSignificant')
    : p_value < 0.05
    ? t('pValModerate')
    : t('pValNotSignificant');

  return (
    <section 
      className="bg-[#FFFFFF] border border-[#E4DDD0] rounded-2xl shadow-sm overflow-hidden"
      aria-labelledby="trust-panel-heading"
    >
      {/* Accordion header button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full min-h-[52px] px-4 sm:px-6 py-4 flex items-center justify-between text-left hover:bg-[#FAF8F5] transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2E5E3E]" aria-hidden="true" />
          <div>
            <h2 id="trust-panel-heading" className="text-base sm:text-lg font-bold text-[#1C2B20]">
              {t('trustTitle')}
            </h2>
            <p className="text-xs text-[#526356] hidden sm:block">
              {t('trustSubtitle')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#526356]">
          <span>{isOpen ? (lang === 'bn' ? 'সংকুচিত করুন' : 'Hide') : (lang === 'bn' ? 'বিস্তারিত দেখুন' : 'Show')}</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Accordion Body */}
      {isOpen && (
        <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-[#EFE9DF] space-y-6">
          {/* Exact Rain-Onset Definition */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DDD6C8]">
            <h3 className="text-sm font-bold text-[#1C2B20] mb-1.5 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#2E5E3E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t('rainOnsetDefTitle')}</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#526356] leading-relaxed">
              {t('rainOnsetDef')}
            </p>
          </div>

          {/* Statistical Significance in Plain Words */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DDD6C8]">
            <h3 className="text-sm font-bold text-[#1C2B20] mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#2E5E3E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>{t('statsPlainTitle')}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#526356]">
              <div>
                <p className="font-semibold text-[#1C2B20]">
                  {t('statsPValue', { p: formatNumber(p_value), interp: pInterpretation })}
                </p>
                <p className="text-xs text-[#7C8B7F] mt-0.5">
                  {t('statsTestStat', { stat: formatNumber(test_stat) })}
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#1C2B20]">
                  {t('statsCI', { low: formatNumber(ci_low), high: formatNumber(ci_high) })}
                </p>
                <p className="text-xs text-[#7C8B7F] mt-0.5">
                  {lang === 'bn' ? '৯৫% সম্ভাবনায় প্রকৃত স্থানান্তরের সীমা' : '95% likelihood interval of shift magnitude'}
                </p>
              </div>
            </div>
          </div>

          {/* Sensitivity Table */}
          <div>
            <h3 className="text-sm font-bold text-[#1C2B20] mb-2">
              {t('sensitivityTitle')}
            </h3>
            <div className="overflow-x-auto border border-[#DDD6C8] rounded-xl">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-[#FAF8F5] text-[#526356] font-semibold border-b border-[#DDD6C8]">
                  <tr>
                    <th className="py-2.5 px-3.5">{t('sensitivityColVariant')}</th>
                    <th className="py-2.5 px-3.5 text-center">{t('sensitivityColShift')}</th>
                    <th className="py-2.5 px-3.5 text-right">{t('sensitivityColVerdict')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE9DF]">
                  {sensitivity.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF8F5]/60 transition-colors">
                      <td className="py-2 px-3.5 font-medium text-[#1C2B20]">{item.label}</td>
                      <td className="py-2 px-3.5 text-center font-bold text-[#2E5E3E]">
                        +{formatNumber(item.shift_days)} {t('daysUnit')}
                      </td>
                      <td className="py-2 px-3.5 text-right text-[#15803D] font-semibold">
                        {t('verdictStable')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Model Assumptions */}
          <div>
            <h3 className="text-sm font-bold text-[#1C2B20] mb-2">
              {t('assumptionsTitle')}
            </h3>
            <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm text-[#526356]">
              {assumptions.map((assump, idx) => (
                <li key={idx} className="leading-relaxed">
                  {assump}
                </li>
              ))}
            </ul>
          </div>

          {/* Satellite Grid Resolution Note */}
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#DDD6C8] text-xs text-[#526356]">
            <strong className="text-[#1C2B20] block mb-1">
              {t('gridNoteTitle')}
            </strong>
            <p className="leading-relaxed">
              {grid_note || t('gridNote')}
            </p>
          </div>

          {/* Critical Advisory Limitation (Historical shift, not a forecast) */}
          <div className="p-3.5 rounded-xl bg-[#FEF3C7] border border-[#FCD34D] text-xs text-[#92400E]">
            <strong className="text-[#92400E] block mb-1">
              ⚠️ {t('limitationTitle')}
            </strong>
            <p className="leading-relaxed">
              {t('limitationText')}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
