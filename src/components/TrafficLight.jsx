import React from 'react';
import { useI18n } from '../i18n/useI18n.jsx';

export default function TrafficLight({ state = 'yellow', size = 'normal' }) {
  const { t } = useI18n();

  // state can be:
  // 'yellow' -> shift transplanting recommended
  // 'green'  -> keep traditional schedule
  // 'red'    -> caution / extreme risk
  const isYellow = state === 'yellow';
  const isGreen = state === 'green';
  const isRed = state === 'red';

  const label = isYellow
    ? t('statusShift')
    : isGreen
    ? t('statusKeep')
    : t('statusRisk');

  const isLarge = size === 'large';

  return (
    <div 
      className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl border ${
        isYellow
          ? 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]'
          : isGreen
          ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]'
          : 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
      }`}
      role="status"
      aria-label={label}
    >
      {/* 3-circle visual indicator */}
      <div className="flex flex-col gap-1.5 p-1.5 bg-[#1C2B20]/10 rounded-full shrink-0" aria-hidden="true">
        {/* Red light */}
        <div 
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-opacity ${
            isRed 
              ? 'bg-[#DC2626] ring-2 ring-[#DC2626]/30 shadow-sm opacity-100' 
              : 'bg-[#DC2626]/20 opacity-40'
          }`} 
        />
        {/* Yellow light */}
        <div 
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-opacity ${
            isYellow 
              ? 'bg-[#D97706] ring-2 ring-[#D97706]/30 shadow-sm opacity-100' 
              : 'bg-[#D97706]/20 opacity-40'
          }`} 
        />
        {/* Green light */}
        <div 
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-opacity ${
            isGreen 
              ? 'bg-[#16A34A] ring-2 ring-[#16A34A]/30 shadow-sm opacity-100' 
              : 'bg-[#16A34A]/20 opacity-40'
          }`} 
        />
      </div>

      <div className="min-w-0">
        <p className={`font-bold leading-tight ${isLarge ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
          {label}
        </p>
        <p className="text-xs sm:text-sm mt-0.5 opacity-90">
          {isYellow 
            ? 'Monsoon rain onset delay confirmed by NASA sensors' 
            : isGreen 
            ? 'No significant onset shift detected' 
            : 'Unstable rainfall patterns detected'}
        </p>
      </div>
    </div>
  );
}
