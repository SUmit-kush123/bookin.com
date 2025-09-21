import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageProvider';
import { IconLanguage } from '../constants';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = {
    en: 'English',
    ne: 'नेपाली',
  };

  const handleLanguageChange = (lang: 'en' | 'ne') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full text-neutral-dark dark:text-neutral-d-dark hover:bg-secondary dark:hover:bg-neutral-d-extralight transition-colors flex items-center"
        aria-label="Change language"
      >
        <IconLanguage className="w-5 h-5" />
      </button>
      {isOpen && (
        <div 
            className="absolute right-0 mt-2 w-32 bg-white dark:bg-neutral-d-light rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 dark:ring-neutral-d-extralight z-50"
            onMouseLeave={() => setIsOpen(false)}
        >
          <button
            onClick={() => handleLanguageChange('en')}
            className={`block w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'font-bold text-primary dark:text-accent-light' : 'text-neutral-dark dark:text-neutral-d-dark'} hover:bg-secondary dark:hover:bg-neutral-d-extralight`}
          >
            {languages.en}
          </button>
          <button
            onClick={() => handleLanguageChange('ne')}
            className={`block w-full text-left px-4 py-2 text-sm ${language === 'ne' ? 'font-bold text-primary dark:text-accent-light' : 'text-neutral-dark dark:text-neutral-d-dark'} hover:bg-secondary dark:hover:bg-neutral-d-extralight`}
          >
            {languages.ne}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;