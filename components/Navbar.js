'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  const navItems = [
    { name: t('nav_home'), href: '#home' },
    { name: t('nav_about'), href: '#about' },
    { name: t('nav_experience'), href: '#experience' },
    { name: t('nav_skills'), href: '#skills' },
    { name: t('nav_projects'), href: '#projects' },
    { name: t('nav_gallery'), href: '#gallery' },
    { name: t('nav_contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1 + (index * 0.1)
      }
    })
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { 
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { 
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? `backdrop-blur-md shadow-lg ${
              isDark 
                ? 'bg-gray-900/90 shadow-gray-900/20' 
                : 'bg-white/90 shadow-gray-200/50'
            }` 
          : 'bg-transparent'
      }`}
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex-shrink-0 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a 
              href="#home" 
              className={`text-2xl font-bold ${
                isDark 
                  ? 'text-gradient' 
                  : 'text-primary-600 hover:text-primary-700'
              } transition-colors duration-300`}
            >
              MD.Bodiuzaman
            </a>
          </motion.div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  custom={index}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                    isDark 
                      ? 'text-gray-300 hover:text-primary-400 hover:bg-gray-800/50' 
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100/70'
                  }`}
                >
                  {item.name}
                </motion.a>
              ))}
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
          
          <div className="flex md:hidden">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`ml-3 inline-flex items-center justify-center p-2 rounded-md transition-colors duration-300 ${
                isDark 
                  ? 'text-gray-300 hover:text-primary-400 hover:bg-gray-800/50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100/70'
              } focus:outline-none focus:ring-2 focus:ring-primary-500/50`}
              aria-expanded={isOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={`md:hidden ${
              isDark 
                ? 'bg-gray-900 border-t border-gray-800' 
                : 'bg-white border-t border-gray-100'
            } shadow-lg`}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  custom={index}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                    isDark 
                      ? 'text-gray-300 hover:text-primary-400 hover:bg-gray-800/50' 
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100/70'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;