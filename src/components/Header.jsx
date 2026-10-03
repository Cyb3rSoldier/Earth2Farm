import React from 'react';
import { useI18n } from '../i18n/useI18n.jsx';
import LanguageToggle from './LanguageToggle.jsx';
import SimpleModeToggle from './SimpleModeToggle.jsx';
import { USE_MOCK } from '../api/advisory.js';

export default function Header({ isSimpleMode, onToggleSimpleMode }) {
  const { lang, t } = useI18n();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E4DDD0] no-print">
      {/* Top Demo Data Notification Banner */}
      {USE_MOCK && (
        <aside aria-label="Demo notice" className="bg-[#FFFBEB] border-b border-[#FDE68A] text-[#92400E] text-[11px] sm:text-xs py-1 px-4 text-center font-medium flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] shrink-0" aria-hidden="true" />
          <span>
            {t('demoBadge')} · {t('challengeName')}
          </span>
        </aside>
      )}

      {/* Main Top Bar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Zone 1: Brand & Satellite-to-Field Motif */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Subtle SVG motif: Satellite transmitting to agricultural field */}
          <div className="w-9 h-9 rounded-xl bg-[#2E5E3E] text-white flex items-center justify-center shadow-xs shrink-0" aria-hidden="true">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {/* Satellite dish / sensor */}
              <circle cx="12" cy="7" r="3" />
              <path d="M12 1v3" />
              <path d="M7 7H4" />
              <path d="M20 7h-3" />
              {/* Signal waves downwards */}
              <path d="M9 13c1 .7 2 1 3 1s2-.3 3-1" strokeDasharray="1.5 1.5" />
              {/* Field furrows / crops below */}
              <path d="M4 21c3-2 5-2 8-2s5 0 8 2" />
              <path d="M7 17l1 4" />
              <path d="M12 16l0 5" />
              <path d="M17 17l-1 4" />
            </svg>
          </div>

          <div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#2E5E3E] block leading-none">
              Earth2Farm
            </span>
            <span className="text-[10px] text-[#526356] font-semibold tracking-wider uppercase block mt-0.5">
              {lang === 'bn' ? 'নাসা ফিল্ড শিফট' : 'NASA Field Shift'}
            </span>
          </div>
        </div>

        {/* Zone 2 & 3: Simple Mode Toggle & Language Selection */}
        <div className="flex items-center gap-2 sm:gap-3">
          <SimpleModeToggle
            isSimpleMode={isSimpleMode}
            onToggle={onToggleSimpleMode}
          />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
