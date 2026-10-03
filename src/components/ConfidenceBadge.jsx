import React from 'react';
import { useI18n } from '../i18n/useI18n.jsx';

export default function ConfidenceBadge({ level }) {
  const { t } = useI18n();

  const configs = {
    high: {
      label: t('confHigh'),
      bgColor: 'bg-[#DCFCE7]',
      textColor: 'text-[#14532D]',
      borderColor: 'border-[#86EFAC]',
      icon: (
        <svg className="w-4 h-4 text-[#15803D]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
        </svg>
      )
    },
    medium: {
      label: t('confMed'),
      bgColor: 'bg-[#FEF3C7]',
      textColor: 'text-[#92400E]',
      borderColor: 'border-[#FCD34D]',
      icon: (
        <svg className="w-4 h-4 text-[#B45309]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5zm0 7.5a.75.75 0 10-1.5 0 .75.75 0 001.5 0z" clipRule="evenodd" />
        </svg>
      )
    },
    low: {
      label: t('confLow'),
      bgColor: 'bg-[#FEE2E2]',
      textColor: 'text-[#991B1B]',
      borderColor: 'border-[#FCA5A5]',
      icon: (
        <svg className="w-4 h-4 text-[#DC2626]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      )
    }
  };

  const current = configs[level] || configs.low;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border ${current.bgColor} ${current.borderColor} ${current.textColor} text-xs font-semibold`}>
      {current.icon}
      <span>{current.label}</span>
    </div>
  );
}
