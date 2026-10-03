import React, { createContext, useContext, useState, useMemo } from 'react';
import { strings } from './strings.js';

const I18nContext = createContext(null);

export const toBengaliDigits = (num) => {
  if (num === null || num === undefined) return '';
  const str = String(num);
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.replace(/[0-9]/g, (w) => bengaliDigits[+w]);
};

export const I18nProvider = ({ children }) => {
  const [lang, setLang] = useState('bn'); // default to Bangla for Bangladeshi farmers, switchable anytime

  const t = useMemo(() => {
    return (key, params = {}) => {
      const activeLangStrings = strings[lang] || strings.en;
      let text = activeLangStrings[key] || strings.en[key] || key;
      
      // Interpolate {param}
      Object.keys(params).forEach((paramKey) => {
        let val = params[paramKey];
        if (lang === 'bn' && typeof val === 'number') {
          val = toBengaliDigits(val);
        }
        text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), val);
      });

      return text;
    };
  }, [lang]);

  const formatNumber = (num) => {
    if (lang === 'bn') {
      return toBengaliDigits(num);
    }
    return String(num);
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t, formatNumber }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
