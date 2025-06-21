'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SocialButtons from './SocialButtons';
import DownloadButton from './DownloadButton';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';

const Hero = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  
  // For name typing animation
  const [displayedName, setDisplayedName] = useState('');
  const fullName = 'MD. Bodiuzaman';
  const [nameIndex, setNameIndex] = useState(0);
  const [nameTypingPhase, setNameTypingPhase] = useState('typing'); // 'typing', 'waiting', 'erasing'
  
  // For designation typing animation
  const [displayedDesc, setDisplayedDesc] = useState('');
  const fullDesc = t('hero_desc') || 'Specializing in home automation, security systems, and smart home integration. With 3+ years of experience in the UAE and a background in Computer Science and Engineering.';
  const [descIndex, setDescIndex] = useState(0);
  
  // Name typing effect with wait, erase, and retype loop
  useEffect(() => {
    let timeout;
    
    if (nameTypingPhase === 'typing') {
      if (nameIndex < fullName.length) {
        timeout = setTimeout(() => {
          setDisplayedName(prev => prev + fullName[nameIndex]);
          setNameIndex(nameIndex + 1);
        }, 150); // Speed of typing
      } else {
        // When typing is complete, wait with blinking cursor
        setNameTypingPhase('waiting');
      }
    } 
    else if (nameTypingPhase === 'waiting') {
      // Wait for 3 seconds before erasing
      timeout = setTimeout(() => {
        setNameTypingPhase('erasing');
      }, 3000);
    } 
    else if (nameTypingPhase === 'erasing') {
      if (displayedName.length > 0) {
        // Erase one character at a time
        timeout = setTimeout(() => {
          setDisplayedName(prev => prev.slice(0, -1));
        }, 75); // Speed of erasing (faster than typing)
      } else {
        // When erasing is complete, reset to typing
        setNameIndex(0);
        setNameTypingPhase('typing');
      }
    }
    
    return () => clearTimeout(timeout);
  }, [nameIndex, fullName, nameTypingPhase, displayedName]);
  
  // Description typing effect - starts when name finishes typing first time
  useEffect(() => {
    if (nameIndex === fullName.length && descIndex < fullDesc.length && nameTypingPhase === 'waiting') {
      const timeout = setTimeout(() => {
        setDisplayedDesc(prev => prev + fullDesc[descIndex]);
        setDescIndex(descIndex + 1);
      }, 10); // Much faster speed for description
      
      return () => clearTimeout(timeout);
    }
  }, [descIndex, fullDesc, nameIndex, nameTypingPhase]);

  // Enhanced animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 15
      }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  // Pulse animation for profile pic background
  const pulseAnimation = {
    initial: { scale: 0.95, opacity: 0.5 },
    animate: {
      scale: [0.95, 1.05, 0.95],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Cursor blinking animation
  const cursorBlink = {
    animate: {
      opacity: [1, 0, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
      id="home" 
      className={`relative min-h-screen flex items-center justify-center py-16 overflow-hidden ${
        isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${
        isDark 
          ? 'from-gray-900 to-gray-800' 
          : 'from-primary-50 to-white'
      } z-0`} />
      
      {/* Background pattern */}
      <div className={`absolute inset-0 ${
        isDark ? 'opacity-10' : 'opacity-5'
      } bg-[url('/grid-pattern.svg')] z-0`} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            <motion.span 
              className={`inline-block text-lg font-medium ${
                isDark ? 'text-primary-400' : 'text-primary-600'
              } mb-4`}
              variants={fadeInUp}
            >
              {t('hero_greeting')}
            </motion.span>
            
            <motion.h1 
              className={`text-5xl md:text-6xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              } flex items-center justify-center lg:justify-start`}
              variants={fadeInUp}
            >
              <span className="text-gradient">{displayedName}</span>
              <motion.span 
                className="inline-block w-1 h-10 bg-primary-500 ml-1"
                variants={cursorBlink}
                animate="animate"
              />
            </motion.h1>
            
            <motion.div 
              className="mb-8"
              variants={fadeInUp}
            >
              <h2 className={`text-2xl md:text-3xl font-semibold ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              } mb-6`}>
                {t('hero_role')}
              </h2>
              <div className={`text-lg ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              } max-w-lg mx-auto lg:mx-0 min-h-[6rem] relative`}>
                <p className="leading-relaxed">
                  {displayedDesc && (
                    <>
                      {displayedDesc.split(' ').map((word, i) => {
                        // Highlight key terms with gradient text
                        const isKeyword = ['automation', 'security', 'smart', 'systems', 'integration', 'experience', 'Engineering'].some(
                          keyword => word.includes(keyword)
                        );
                        
                        return (
                          <motion.span 
                            key={i}
                            className={isKeyword ? 'text-gradient font-medium' : ''}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                              delay: i * 0.01, 
                              duration: 0.2 
                            }}
                          >
                            {word}{' '}
                          </motion.span>
                        );
                      })}
                    </>
                  )}
                </p>
                <motion.span 
                  className="inline-block w-1 h-5 bg-primary-500 ml-1 absolute"
                  variants={cursorBlink}
                  animate="animate"
                />
              </div>
              
              <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
                <a 
                  href="#contact" 
                  className={`btn ${
                    isDark ? 'bg-primary-500 hover:bg-primary-600' : 'bg-primary-600 hover:bg-primary-700'
                  } text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500/50 flex items-center gap-2`}
                >
                  <span>{t('hero_contact')}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <DownloadButton />
              </div>
            </motion.div>
            
            <motion.div
              className="hidden lg:flex mt-8"
              variants={fadeInUp}
            >
              <SocialButtons />
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 50
            }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Animated background glow */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 blur-lg opacity-20"
                variants={pulseAnimation}
                initial="initial"
                animate="animate"
              />
              
              <div className={`absolute inset-0 rounded-full overflow-hidden border-4 ${
                isDark ? 'border-gray-800' : 'border-white'
              } shadow-xl`}>
                <Image
                  src="/logo.jpg"
                  alt="MD. Bodiuzaman"
                  fill
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                  priority
                  className="rounded-full object-cover"
                />
              </div>
              
              <motion.div 
                className={`absolute -bottom-6 -right-6 ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                } rounded-full p-4 shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="bg-accent-500 rounded-full w-16 h-16 flex items-center justify-center text-white font-bold">
                  <span>3+</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ 
          y: [0, 10, 0],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <a href="#about" className={`${
          isDark ? 'text-gray-400 hover:text-primary-400' : 'text-gray-500 hover:text-primary-500'
        } transition-colors duration-300`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;