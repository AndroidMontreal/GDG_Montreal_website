'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const LanguageSwitcher = ({ className = '' }) => {
  const { language, changeLanguage, availableLanguages } = useLanguage();

  const languageLabels = {
    en: 'EN',
    fr: 'FR'
  };

  const languageNames = {
    en: 'English',
    fr: 'Français'
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div className="flex items-center space-x-2">
        <GlobeAltIcon className="h-5 w-5 text-gray-600" />
        <div className="flex rounded-md overflow-hidden border border-gray-300">
          {availableLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className={`px-3 py-1 text-sm font-medium transition-colors ${
                language === lang
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              title={languageNames[lang]}
            >
              {languageLabels[lang]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;