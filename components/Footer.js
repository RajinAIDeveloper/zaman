'use client';

import { motion } from 'framer-motion';
import SocialButtons from './SocialButtons';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const currentYear = new Date().getFullYear();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  
  return (
    <footer className={`py-12 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-800 text-white'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-between mb-12 space-y-6 md:space-y-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.div variants={fadeInUp}>
              <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${
                isDark ? 'text-gradient' : 'text-gradient'
              }`}>MD. Bodiuzaman</h2>
              <p className={`${
                isDark ? 'text-gray-400' : 'text-gray-300'
              } max-w-md`}>
                {t('footer_elv_description')}
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-end"
              variants={fadeInUp}
            >
              <p className={`${
                isDark ? 'text-gray-400' : 'text-gray-300'
              } mb-3`}>{t('footer_follow_social')}</p>
              <SocialButtons />
            </motion.div>
          </motion.div>
          
          <div className={`border-t ${
            isDark ? 'border-gray-800' : 'border-gray-700'
          } pt-8`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-4">{t('footer_about')}</h3>
                <ul className={`space-y-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-300'
                }`}>
                  <li><a href="#about" className="hover:text-primary-400 transition-colors">{t('footer_about_me')}</a></li>
                  <li><a href="#experience" className="hover:text-primary-400 transition-colors">{t('footer_work_experience')}</a></li>
                  <li><a href="#skills" className="hover:text-primary-400 transition-colors">{t('footer_skills')}</a></li>
                  <li><a href="#education" className="hover:text-primary-400 transition-colors">{t('footer_education')}</a></li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-4">{t('footer_services')}</h3>
                <ul className={`space-y-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-300'
                }`}>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">{t('footer_home_automation')}</a></li>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">{t('footer_cctv_security')}</a></li>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">{t('footer_network_solutions')}</a></li>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">{t('footer_elv_consultation')}</a></li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-4">{t('footer_portfolio')}</h3>
                <ul className={`space-y-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-300'
                }`}>
                  <li><a href="#projects" className="hover:text-primary-400 transition-colors">{t('footer_projects')}</a></li>
                  <li><a href="#gallery" className="hover:text-primary-400 transition-colors">{t('footer_gallery')}</a></li>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">{t('footer_testimonials')}</a></li>
                  <li><a href="#skills" className="hover:text-primary-400 transition-colors">{t('footer_certifications')}</a></li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-4">{t('footer_contact')}</h3>
                <ul className={`space-y-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-300'
                }`}>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>md.bodiuzaman96@gmail.com</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+971 54 406 2933</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Al Taawun - Sharjah, UAE</span>
                  </li>
                </ul>
              </motion.div>
            </div>
            
            <div className={`text-center py-6 border-t ${
              isDark ? 'border-gray-800' : 'border-gray-700'
            }`}>
              <motion.a 
                href="#home" 
                className={`inline-block ${
                  isDark ? 'bg-gray-800' : 'bg-gray-700'
                } rounded-full p-3 mb-6 hover:bg-primary-500 transition-colors`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </motion.a>
              <motion.p 
                className="text-gray-500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {t('footer_rights').replace('2025', currentYear)} | {t('footer_designed_by')}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;