import React from 'react';
import { useI18n } from '../i18n/useI18n.jsx';

export function LoadingSkeleton() {
  const { t } = useI18n();

  return (
    <div className="space-y-6 animate-pulse" aria-busy="true" aria-label={t('loadingAdvice')}>
      {/* Hero skeleton */}
      <div className="bg-[#FFFFFF] border border-[#E4DDD0] rounded-2xl p-6 sm:p-7 space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-4 bg-[#EFE9DF] rounded w-32" />
          <div className="h-6 bg-[#EFE9DF] rounded w-24" />
        </div>
        <div className="h-8 bg-[#EFE9DF] rounded w-4/5" />
        <div className="h-16 bg-[#FAF8F5] border border-[#DDD6C8] rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="h-20 bg-[#FAF8F5] rounded-xl" />
          <div className="h-20 bg-[#FAF8F5] rounded-xl" />
        </div>
        <div className="flex gap-3 pt-2">
          <div className="h-10 bg-[#EFE9DF] rounded-xl w-28" />
          <div className="h-10 bg-[#EFE9DF] rounded-xl w-28" />
          <div className="h-10 bg-[#EFE9DF] rounded-xl w-36" />
        </div>
      </div>

      {/* Clocks skeleton */}
      <div className="bg-[#FFFFFF] border border-[#E4DDD0] rounded-2xl p-6 space-y-4">
        <div className="h-5 bg-[#EFE9DF] rounded w-48" />
        <div className="h-16 bg-[#FAF8F5] rounded-xl" />
        <div className="h-16 bg-[#FAF8F5] rounded-xl" />
        <div className="h-16 bg-[#FAF8F5] rounded-xl" />
      </div>
    </div>
  );
}

export function ErrorState({ error, onRetry }) {
  const { t } = useI18n();

  return (
    <div className="bg-[#FFFFFF] border-2 border-[#FCA5A5] rounded-2xl p-6 sm:p-8 text-center shadow-sm">
      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#FEE2E2] flex items-center justify-center text-[#DC2626]">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-[#1C2B20] mb-1">
        {t('errorTitle')}
      </h3>
      <p className="text-xs sm:text-sm text-[#526356] max-w-md mx-auto mb-4">
        {error?.message || t('errorMessage')}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="min-h-[44px] px-6 py-2 bg-[#2E5E3E] hover:bg-[#244B32] text-white font-bold text-sm rounded-xl transition-colors cursor-pointer"
      >
        {t('retryBtn')}
      </button>
    </div>
  );
}
