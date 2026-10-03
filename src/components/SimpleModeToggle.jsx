import React from 'react';
import { useI18n } from '../i18n/useI18n.jsx';

export default function SimpleModeToggle({ isSimpleMode, onToggle }) {
  const { t } = useI18n();

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`min-h-[44px] px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 border transition-all whitespace-nowrap ${
        isSimpleMode
          ? 'bg-[#2E5E3E] text-white border-[#2E5E3E] shadow-sm'
          : 'bg-[#FAF8F5] text-[#2E5E3E] border-[#DDD6C8] hover:bg-[#EFE9DF]'
      }`}
      aria-pressed={isSimpleMode}
      title={isSimpleMode ? t('simpleModeOff') : t('simpleModeOn')}
    >
      {/* Icon: eye/leaf simple indicator */}
      <svg
        className="w-4 h-4 shrink-0"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {isSimpleMode ? (
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 4a4 4 0 110 8 4 4 0 010-8z" />
        ) : (
          <path d="M4 10a6 6 0 1112 0 6 6 0 01-12 0zm6-3v6m-3-3h6" />
        )}
      </svg>
      <span>{isSimpleMode ? t('simpleModeOn') : t('simpleModeOff')}</span>
    </button>
  );
}
