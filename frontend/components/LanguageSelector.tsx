import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe } from 'lucide-react';

const languages = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' }
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={toggleDropdown}
        className="flex items-center gap-1 text-white bg-[var(--primary-800)] bg-opacity-30 px-3 py-2 rounded-full hover:bg-opacity-50 transition-all"
      >
        <Globe size={16} />
        <span>{currentLanguage.name}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white rounded-md shadow-lg overflow-hidden z-50">
          <ul>
            {languages.map(language => (
              <li key={language.code}>
                <button
                  onClick={() => changeLanguage(language.code)}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                    i18n.language === language.code ? 'bg-gray-100 font-medium' : ''
                  }`}
                >
                  {language.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;