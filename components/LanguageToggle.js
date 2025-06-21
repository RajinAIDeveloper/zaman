'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

const LanguageToggle = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleLanguage}
      className={`px-3 py-2 rounded-md focus:outline-none transition-colors duration-300 text-sm font-medium ${
        isDark 
          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle language"
    >
      {language === 'en' ? t('language_bn') : t('language_en')}
    </motion.button>
  );
};

export default LanguageToggle;