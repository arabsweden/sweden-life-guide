/**
 * Sweden Life Guide - Language Context
 * Brand: RAED SHIHAB — Arab Sweden Since 2007
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppLanguage } from '../types';
import { translations, TranslationKey } from './translations';

interface LanguageContextType {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  dir: 'rtl' | 'ltr';
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    const saved = localStorage.getItem('sweden_guide_lang');
    return (saved === 'sv' || saved === 'en' || saved === 'ar') ? saved : 'ar';
  });

  const setLanguage = (lang: AppLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('sweden_guide_lang', lang);
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  const t = (key: TranslationKey): string => {
    const langDict = translations[language] || translations.ar;
    return langDict[key] || translations.ar[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
