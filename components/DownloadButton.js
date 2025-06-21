'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

const DownloadButton = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef(null);
  
  const downloadOptions = [
    { name: 'Resume (PDF)', file: '/cv.pdf' },
    // { name: 'Certificate 1', file: '/pdfs/certificate-vimar.pdf' },
    // { name: 'Certificate 2', file: '/pdfs/certificate-came.pdf' },
    // { name: 'Certificate 3', file: '/pdfs/certificate-hikvision.pdf' }
  ];
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (index) => ({ 
      opacity: 1, 
      x: 0,
      transition: {
        delay: index * 0.05,
        duration: 0.2
      }
    }),
    hover: { 
      backgroundColor: isDark ? 'rgba(107, 114, 128, 0.3)' : 'rgba(243, 244, 246, 0.7)',
      x: 5 
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`btn flex items-center gap-2 ${
          isDark 
            ? 'border-2 border-primary-400 text-primary-400 hover:bg-primary-500 hover:text-white hover:border-primary-500' 
            : 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white'
        } px-6 py-3 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          animate={isHovered ? { y: [0, 2, 0] } : {}}
          transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </motion.svg>
        <span>{t('hero_download')}</span>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`absolute top-full left-0 mt-2 w-56 rounded-lg shadow-xl z-50 overflow-hidden ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
            }`}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="py-1">
              {downloadOptions.map((option, index) => (
                <motion.a
                  key={option.name}
                  href={option.file}
                  download
                  className={`block px-4 py-3 text-sm ${
                    isDark ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                  } transition-colors duration-200 flex items-center gap-2`}
                  variants={itemVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  onClick={() => setIsOpen(false)}
                >
                  <span className={`w-5 h-5 inline-flex items-center justify-center rounded-full ${
                    isDark ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    {index === 0 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>
                  {option.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DownloadButton;