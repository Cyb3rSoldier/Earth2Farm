import React, { useState } from 'react';
import { useI18n } from '../i18n/useI18n.jsx';
import TrafficLight from './TrafficLight.jsx';
import ConfidenceBadge from './ConfidenceBadge.jsx';
import { speakText, stopSpeaking, isSpeechSupported } from '../utils/speak.js';
import { analyzeSms } from '../utils/smsLength.js';

export default function AdvisoryHero({ advisoryData, onPrint, isSimpleMode = false }) {
  const { lang, t } = useI18n();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechError, setSpeechError] = useState(null);
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [smsCopied, setSmsCopied] = useState(false);

  if (!advisoryData) return null;

  const {
    reliable,
    shift_days,
    confidence,
    advisory,
    sms,
    baseline_window,
    shifted_window,
    unsupported,
    district
  } = advisoryData;

  // Handle unsupported district state
  if (unsupported) {
    return (
      <section 
        className="bg-[#FFFFFF] border-2 border-dashed border-[#DDD6C8] rounded-2xl p-6 sm:p-8 text-center"
        aria-labelledby="unsupported-title"
      >
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#EFE9DF] flex items-center justify-center text-[#526356]">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h2 id="unsupported-title" className="text-xl sm:text-2xl font-bold text-[#1C2B20] mb-2">
          {t('unsupportedTitle')}
        </h2>
        <p className="text-[#526356] max-w-lg mx-auto text-base">
          {t('unsupportedSentence', { district: district })}
        </p>
      </section>
    );
  }

  // Active language text
  const currentSentence = advisory ? advisory[lang] || advisory.en : '';
  const currentSmsText = sms ? sms[lang] || sms.en : '';
  const smsAnalysis = analyzeSms(currentSmsText);

  // Audio Playback
  const handleListen = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    if (!isSpeechSupported()) {
      setSpeechError(t('speechNotSupported'));
      return;
    }

    setSpeechError(null);
    const textToSpeak = currentSentence;
    const ok = speakText(
      textToSpeak,
      lang,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      () => {
        setIsSpeaking(false);
        setSpeechError(t('speechNotSupported'));
      }
    );
    if (!ok) {
      setSpeechError(t('speechNotSupported'));
    }
  };

  // Copy SMS
  const handleCopySms = () => {
    navigator.clipboard.writeText(currentSmsText).then(() => {
      setSmsCopied(true);
      setTimeout(() => setSmsCopied(false), 2800);
    });
  };

  // Determine traffic light state
  const trafficState = !reliable
    ? 'green'
    : shift_days > 0
    ? 'yellow'
    : 'red';

  return (
    <section 
      className={`bg-[#FFFFFF] border-2 rounded-2xl shadow-sm transition-all ${
        !reliable
          ? 'border-[#DDD6C8]'
          : 'border-[#2E5E3E]/30 bg-gradient-to-b from-[#FAF8F5]/50 to-[#FFFFFF]'
      } p-4 sm:p-7`}
      aria-labelledby="advisory-sentence-heading"
    >
      {/* Top row: Status header & Confidence */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-[#EFE9DF] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2E5E3E] inline-block animate-pulse" aria-hidden="true" />
          <h2 id="advisory-sentence-heading" className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#526356]">
            {t('advisorySentenceHeader')}
          </h2>
        </div>
        <div>
          <ConfidenceBadge level={confidence} />
        </div>
      </div>

      {/* Main advisory sentence - DOMINATES THE SCREEN */}
      <div className="my-4">
        <p className={`font-extrabold text-[#1C2B20] leading-snug tracking-tight ${
          isSimpleMode 
            ? 'text-2xl sm:text-3xl md:text-4xl' 
            : 'text-xl sm:text-2xl md:text-3xl'
        }`}>
          {currentSentence}
        </p>
      </div>

      {/* Traffic Light Card */}
      <div className="my-5">
        <TrafficLight state={trafficState} size={isSimpleMode ? 'large' : 'normal'} />
      </div>

      {/* Window Comparison: Shifted window next to traditional window */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-5">
        {/* Recommended / Shifted Window */}
        <div className={`p-4 rounded-xl border ${
          reliable 
            ? 'bg-[#EAF2EC] border-[#2E5E3E]/30 text-[#1C2B20]' 
            : 'bg-[#F4EFE6] border-[#DDD6C8] text-[#1C2B20]'
        }`}>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E5E3E] mb-1">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
            </svg>
            <span>{t('shiftedWindow')}</span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-[#1C2B20]">
            {lang === 'bn' 
              ? `${shifted_window.start_label_bn || shifted_window.start_label} - ${shifted_window.end_label_bn || shifted_window.end_label}` 
              : `${shifted_window.start_label} - ${shifted_window.end_label}`}
          </p>
          {reliable && (
            <p className="text-xs font-semibold text-[#2E5E3E] mt-1">
              +{shift_days} {t('daysUnit')} {lang === 'bn' ? 'স্থানান্তর' : 'shift'}
            </p>
          )}
        </div>

        {/* Traditional Window */}
        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DDD6C8] text-[#526356]">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7C8B7F] mb-1">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
            </svg>
            <span>{t('traditionalWindow')}</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-[#526356]">
            {lang === 'bn' 
              ? `${baseline_window.start_label_bn || baseline_window.start_label} - ${baseline_window.end_label_bn || baseline_window.end_label}` 
              : `${baseline_window.start_label} - ${baseline_window.end_label}`}
          </p>
          <p className="text-xs text-[#7C8B7F] mt-1">
            {lang === 'bn' ? 'পূর্ববর্তী ২০ বছরের গড় সূচি' : 'Historical 20-year baseline'}
          </p>
        </div>
      </div>

      {/* Action Buttons: Listen (Web Speech), Copy SMS, Print Card */}
      <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3 items-center">
        {/* Listen Button */}
        <button
          type="button"
          onClick={handleListen}
          className={`min-h-[44px] px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 border transition-all cursor-pointer ${
            isSpeaking
              ? 'bg-[#DC2626] text-white border-[#DC2626] animate-pulse'
              : 'bg-[#2E5E3E] text-white border-[#2E5E3E] hover:bg-[#244B32]'
          }`}
          aria-label={isSpeaking ? t('stopAudio') : t('listenAudio')}
        >
          {isSpeaking ? (
            <>
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
              </svg>
              <span>{t('stopAudio')}</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 3.75a.75.75 0 00-1.264-.546L4.703 7H3.167A1.167 1.167 0 002 8.167v3.666C2 12.478 2.522 13 3.167 13h1.536l4.033 3.796A.75.75 0 0010 16.25V3.75zM14.95 5.05a.75.75 0 011.06 0 7 7 0 010 9.9 1 1 0 01-1.06-1.06 5.5 5.5 0 000-7.78.75.75 0 010-1.06z" />
                <path d="M12.828 7.172a.75.75 0 011.06 0 4 4 0 010 5.656.75.75 0 11-1.06-1.06 2.5 2.5 0 000-3.536.75.75 0 010-1.06z" />
              </svg>
              <span>{t('listenAudio')}</span>
            </>
          )}
        </button>

        {/* Copy SMS Button */}
        <button
          type="button"
          onClick={() => setShowSmsModal(true)}
          className="min-h-[44px] px-4 py-2.5 rounded-xl font-semibold text-sm bg-[#FAF8F5] hover:bg-[#EFE9DF] text-[#1C2B20] border border-[#DDD6C8] flex items-center gap-2 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4 text-[#526356] shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
            <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
          </svg>
          <span>{t('copySms')}</span>
        </button>

        {/* Print Village Card Button */}
        <button
          type="button"
          onClick={onPrint}
          className="min-h-[44px] px-4 py-2.5 rounded-xl font-semibold text-sm bg-[#FAF8F5] hover:bg-[#EFE9DF] text-[#1C2B20] border border-[#DDD6C8] flex items-center gap-2 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4 text-[#526356] shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.5A1.75 1.75 0 0113.25 8H6.75A1.75 1.75 0 015 6.25v-3.5zm1.5 0a.25.25 0 01.25-.25h6.5a.25.25 0 01.25.25v3.5a.25.25 0 01-.25.25H6.75a.25.25 0 01-.25-.25v-3.5z" clipRule="evenodd" />
            <path d="M3 7.75A1.75 1.75 0 001.25 9.5v5c0 .966.784 1.75 1.75 1.75H4v1.75C4 18.966 4.784 19.75 5.75 19.75h8.5c.966 0 1.75-.784 1.75-1.75V16.25h1A1.75 1.75 0 0018.75 14.5v-5A1.75 1.75 0 0017 7.75H3zm2.5 8.5v2.25c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25V16.25H5.5z" />
          </svg>
          <span>{t('printCard')}</span>
        </button>
      </div>

      {/* Speech fallback/error message if triggered */}
      {speechError && (
        <div className="mt-3 p-3 bg-[#FEF3C7] border border-[#FCD34D] rounded-lg text-xs text-[#92400E]">
          {speechError}
        </div>
      )}

      {/* SMS Modal Dialog */}
      {showSmsModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs no-print"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sms-modal-title"
        >
          <div className="bg-[#FFFFFF] rounded-2xl max-w-lg w-full p-5 sm:p-6 border border-[#DDD6C8] shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFE9DF]">
              <h3 id="sms-modal-title" className="font-bold text-lg text-[#1C2B20]">
                {t('smsModalTitle')}
              </h3>
              <button
                type="button"
                onClick={() => setShowSmsModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#526356] hover:bg-[#EFE9DF] transition-colors"
                aria-label={t('close')}
              >
                ✕
              </button>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-[#526356] mb-1.5">
                {lang === 'bn' ? 'বার্তা সামগ্রী:' : 'Broadcast Text:'}
              </label>
              <div className="p-3.5 bg-[#FAF8F5] border border-[#DDD6C8] rounded-xl text-sm font-medium text-[#1C2B20] leading-relaxed">
                {currentSmsText}
              </div>

              {/* Character & segment breakdown */}
              <div className="mt-3 p-3 bg-[#EAF2EC] rounded-xl border border-[#2E5E3E]/20 text-xs text-[#2E5E3E] space-y-1">
                <div className="flex justify-between font-bold">
                  <span>{t('smsCharCount', { count: smsAnalysis.length })}</span>
                  <span>{smsAnalysis.segments} {lang === 'bn' ? 'অংশ (SMS Part)' : 'SMS Segment(s)'} ({smsAnalysis.encoding})</span>
                </div>
                <p className="text-[11px] text-[#526356] pt-1">
                  {lang === 'bn' ? t('smsEncodingNoteBn') : t('smsEncodingNote')}
                </p>
              </div>
            </div>

            <div className="mt-5 flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowSmsModal(false)}
                className="min-h-[44px] px-4 py-2 rounded-xl text-sm font-semibold border border-[#DDD6C8] text-[#526356] hover:bg-[#FAF8F5]"
              >
                {t('smsClose')}
              </button>
              <button
                type="button"
                onClick={handleCopySms}
                className="min-h-[44px] px-5 py-2 rounded-xl text-sm font-bold bg-[#2E5E3E] hover:bg-[#244B32] text-white flex items-center gap-1.5"
              >
                {smsCopied ? (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{t('smsCopied')}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                      <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
                    </svg>
                    <span>{t('copySms')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
