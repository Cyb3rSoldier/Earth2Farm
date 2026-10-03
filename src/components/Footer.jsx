import React from 'react';
import { useI18n } from '../i18n/useI18n.jsx';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="mt-16 border-t border-[#E4DDD0] bg-[#F4EFE6]/60 text-[#526356] py-10 px-4 sm:px-6 no-print">
      <div className="max-w-5xl mx-auto space-y-4 text-center sm:text-left sm:flex sm:justify-between sm:items-start sm:space-y-0">
        <div className="max-w-md space-y-2">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2E5E3E]" aria-hidden="true" />
            <strong className="text-sm text-[#1C2B20]">Earth2Farm</strong>
            <span className="text-xs">·</span>
            <span className="text-xs">{t('builtFor')}</span>
          </div>
          <p className="text-xs leading-relaxed">
            {t('footerDisclaimer')}
          </p>
        </div>

        <div className="text-xs space-y-1 text-center sm:text-right">
          <p className="font-semibold text-[#1C2B20]">
            Team Earth2Farm (Bangladesh)
          </p>
          <p className="text-[11px] text-[#7C8B7F]">
            NASA POWER · SMAP · MODIS Open Data
          </p>
          <p className="text-[11px] text-[#7C8B7F]">
            Challenge 7: Field Shift: Adapting Farms with NASA Data
          </p>
        </div>
      </div>
    </footer>
  );
}
