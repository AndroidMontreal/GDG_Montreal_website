'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { siteData } from '@/data/siteData';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && siteData.languages.includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      const browserLanguage = navigator.language.split('-')[0];
      if (siteData.languages.includes(browserLanguage)) {
        setLanguage(browserLanguage);
      }
    }
  }, []);

  const changeLanguage = (newLanguage) => {
    if (siteData.languages.includes(newLanguage)) {
      setLanguage(newLanguage);
      localStorage.setItem('preferred-language', newLanguage);
    }
  };

  const t = (key, fallback = '') => {
    try {
      const keys = key.split('.');
      let value = siteData;
      
      for (const k of keys) {
        value = value[k];
        if (!value) break;
      }
      
      if (typeof value === 'object' && value[language]) {
        return value[language];
      }
      
      if (typeof value === 'string') {
        return value;
      }
      
      return fallback || key;
    } catch (error) {
      console.warn(`Translation key not found: ${key}`);
      return fallback || key;
    }
  };

  const getLocalizedData = (data) => {
    if (typeof data === 'object' && data[language]) {
      return data[language];
    }
    return data;
  };

  const value = {
    language,
    changeLanguage,
    t,
    getLocalizedData,
    availableLanguages: siteData.languages
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};