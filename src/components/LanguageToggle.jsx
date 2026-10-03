import React from 'react';
import { useI18n } from '../i18n/useI18n.jsx';

export default function LanguageToggle() {
  const { lang, setLang } = useI18n();

  return (
    <div 
      className="inline-flex items-center p-0.5 rounded-lg bg-[#EFE9DF] border border-[#DDD6C8]"
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`min-h-[44px] px-3.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap flex items-center justify-center ${
          lang === 'en'
            ? 'bg-[#2E5E3E] text-white shadow-sm'
            : 'text-[#4A5D4E] hover:text-[#1C2B20]'
        }`}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang('bn')}
        className={`min-h-[44px] px-3.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap flex items-center justify-center font-bengali ${
          lang === 'bn'
            ? 'bg-[#2E5E3E] text-white shadow-sm'
            : 'text-[#4A5D4E] hover:text-[#1C2B20]'
        }`}
        aria-pressed={lang === 'bn'}
      >
        বাংলা
      </button>
    </div>
  );
}
