import React, { useState } from 'react';
import { useI18n } from '../i18n/useI18n.jsx';

export default function HeatRiskCalendar({ advisoryData }) {
  const { lang, t, formatNumber } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  if (!advisoryData || advisoryData.unsupported) return null;

  const { heat_risk = [] } = advisoryData;

  const getRiskStyles = (pct) => {
    if (pct < 20) {
      return {
        bg: 'bg-[#DCFCE7]',
        text: 'text-[#14532D]',
        border: 'border-[#86EFAC]',
        label: t('heatLow'),
        dot: 'bg-[#15803D]'
      };
    }
    if (pct <= 35) {
      return {
        bg: 'bg-[#FEF3C7]',
        text: 'text-[#92400E]',
        border: 'border-[#FCD34D]',
        label: t('heatMed'),
        dot: 'bg-[#D97706]'
      };
    }
    return {
      bg: 'bg-[#FEE2E2]',
      text: 'text-[#991B1B]',
      border: 'border-[#FCA5A5]',
      label: t('heatHigh'),
      dot: 'bg-[#DC2626]'
    };
  };

  return (
    <section 
      className="bg-[#FFFFFF] border border-[#E4DDD0] rounded-2xl shadow-sm overflow-hidden"
      aria-labelledby="heat-risk-title"
    >
      {/* Collapsible Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full min-h-[52px] px-4 sm:px-6 py-4 flex items-center justify-between text-left hover:bg-[#FAF8F5] transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" aria-hidden="true" />
          <h2 id="heat-risk-title" className="text-base sm:text-lg font-bold text-[#1C2B20]">
            {t('heatToggle')}
          </h2>
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
        <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-[#EFE9DF]">
          <p className="text-xs sm:text-sm text-[#526356] mb-4">
            {t('heatSubtitle')}
          </p>

          {/* Row of Candidate Transplanting Weeks as Colored Cells */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {heat_risk.map((item, idx) => {
              const styles = getRiskStyles(item.share_of_years_hit);
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex flex-col justify-between ${styles.bg} ${styles.border} transition-all`}
                >
                  <div className="text-[11px] font-bold text-[#1C2B20] opacity-80 mb-1">
                    {item.week_label}
                  </div>
                  <div className="my-1">
                    <span className={`text-xl sm:text-2xl font-black ${styles.text}`}>
                      {formatNumber(item.share_of_years_hit)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className={`w-2 h-2 rounded-full ${styles.dot}`} aria-hidden="true" />
                    <span className={`text-[10px] font-bold ${styles.text}`}>
                      {styles.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend and Caption */}
          <div className="mt-4 pt-3 border-t border-[#EFE9DF] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" />
                <span className="text-[#526356]">{t('heatLow')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
                <span className="text-[#526356]">{t('heatMed')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" />
                <span className="text-[#526356]">{t('heatHigh')}</span>
              </div>
            </div>
            <p className="text-[#526356] italic">
              {t('heatCaption')}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
