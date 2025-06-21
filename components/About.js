'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

const About = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  
  const personalInfo = [
    { label: t('info_dob'), value: '10 Nov 1996' },
    { label: t('info_nationality'), value: 'Bangladeshi' },
    { label: t('info_location'), value: 'Al Taawun - Sharjah, UAE' },
    { label: t('info_languages'), value: 'English (Medium), Hindi (Fluent), Bangla (Native)' },
    { label: t('info_email'), value: 'md.bodiuzaman96@gmail.com' },
    { label: t('info_phone'), value: '054 406 2933' }
  ];
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="about" className={`section ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className={`heading-lg ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('about_title')}</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-8"></div>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('about_subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className={`heading-sm ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-4`}>
                {t('about_overview')}
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('about_paragraph1')}
              </p>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('about_paragraph2')}
              </p>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('about_paragraph3')}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4">
              <h3 className={`heading-sm ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-4`}>
                {t('about_info')}
              </h3>
              <div className="space-y-4">
                {personalInfo.map((item, index) => (
                  <div 
                    key={index}
                    className={`flex flex-wrap items-center py-2 border-b ${
                      isDark ? 'border-gray-700' : 'border-gray-200'
                    }`}
                  >
                    <span className={`w-32 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {item.label}:
                    </span>
                    <span className={`flex-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <a 
                  href="#experience"
                  className={`btn inline-flex items-center gap-2 ${
                    isDark 
                      ? 'border-2 border-primary-400 text-primary-400 hover:bg-primary-500 hover:text-white hover:border-primary-500' 
                      : 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white'
                  } px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500/50`}
                >
                  <span>{t('about_view_exp')}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;