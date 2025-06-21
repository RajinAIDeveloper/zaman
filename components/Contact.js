'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

const Contact = () => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const isDark = theme === 'dark';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [contactOpen, setContactOpen] = useState(false);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create WhatsApp message with language awareness
    const whatsappMessage = encodeURIComponent(
      language === 'en' 
        ? `*New Contact from Website*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Subject:* ${formData.subject}\n\n*Message:*\n${formData.message}`
        : `*ওয়েবসাইট থেকে নতুন যোগাযোগ*\n\n*নাম:* ${formData.name}\n*ইমেইল:* ${formData.email}\n*বিষয়:* ${formData.subject}\n\n*বার্তা:*\n${formData.message}`
    );
    
    // WhatsApp URL
    const whatsappURL = `https://wa.me/971544062933?text=${whatsappMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

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
    <section id="contact" className={`section ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className={`heading-lg ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('contact_title')}</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-8"></div>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('contact_subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={itemVariants} className="order-2 md:order-1">
              <h3 className={`text-2xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-6`}>{t('contact_send_message')}</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className={`block ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{t('contact_name')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`px-4 py-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-primary-500' 
                        : 'border-gray-300 focus:ring-primary-500'
                    } focus:outline-none focus:ring-2 w-full`}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className={`block ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{t('contact_email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`px-4 py-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-primary-500' 
                        : 'border-gray-300 focus:ring-primary-500'
                    } focus:outline-none focus:ring-2 w-full`}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className={`block ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{t('contact_subject')}</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`px-4 py-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-primary-500' 
                        : 'border-gray-300 focus:ring-primary-500'
                    } focus:outline-none focus:ring-2 w-full`}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className={`block ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{t('contact_message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className={`px-4 py-3 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-primary-500' 
                        : 'border-gray-300 focus:ring-primary-500'
                    } focus:outline-none focus:ring-2 w-full`}
                    required
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  className={`w-full px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    isDark 
                      ? 'bg-primary-500 hover:bg-primary-600' 
                      : 'bg-primary-600 hover:bg-primary-700'
                  } text-white`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('contact_send')}
                </motion.button>
              </form>
            </motion.div>

            <motion.div variants={itemVariants} className="order-1 md:order-2">
              <h3 className={`text-2xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-6`}>{t('contact_info')}</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 ${
                    isDark ? 'bg-primary-900' : 'bg-primary-100'
                  } p-3 rounded-full`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${
                      isDark ? 'text-primary-400' : 'text-primary-600'
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{language === 'en' ? 'Phone' : 'ফোন'}</h4>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>+971 54 406 2933</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 ${
                    isDark ? 'bg-primary-900' : 'bg-primary-100'
                  } p-3 rounded-full`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${
                      isDark ? 'text-primary-400' : 'text-primary-600'
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{language === 'en' ? 'Email' : 'ইমেইল'}</h4>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>md.bodiuzaman96@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 ${
                    isDark ? 'bg-primary-900' : 'bg-primary-100'
                  } p-3 rounded-full`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${
                      isDark ? 'text-primary-400' : 'text-primary-600'
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{language === 'en' ? 'Location' : 'অবস্থান'}</h4>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{language === 'en' ? 'Al Taawun - Sharjah, UAE' : 'আল তাওয়ুন - শারজাহ, সংযুক্ত আরব আমিরাত'}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className={`text-xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-4`}>{t('contact_social')}</h3>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className={`${
                      isDark ? 'bg-gray-700 text-gray-400 hover:bg-primary-500' : 'bg-gray-100 text-gray-500 hover:bg-primary-500'
                    } p-3 rounded-full hover:text-white transition-colors`}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className={`${
                      isDark ? 'bg-gray-700 text-gray-400 hover:bg-primary-500' : 'bg-gray-100 text-gray-500 hover:bg-primary-500'
                    } p-3 rounded-full hover:text-white transition-colors`}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className={`${
                      isDark ? 'bg-gray-700 text-gray-400 hover:bg-primary-500' : 'bg-gray-100 text-gray-500 hover:bg-primary-500'
                    } p-3 rounded-full hover:text-white transition-colors`}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className={`${
                      isDark ? 'bg-gray-700 text-gray-400 hover:bg-primary-500' : 'bg-gray-100 text-gray-500 hover:bg-primary-500'
                    } p-3 rounded-full hover:text-white transition-colors`}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="mt-10">
                <div className="contact-btn-group relative">
                  <motion.button
                    onClick={() => setContactOpen(!contactOpen)}
                    className={`w-full px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                      isDark 
                        ? 'bg-primary-500 hover:bg-primary-600' 
                        : 'bg-primary-600 hover:bg-primary-700'
                    } text-white`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{t('contact_quick')}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${contactOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                  
                  <AnimatePresence>
                    {contactOpen && (
                      <motion.div
                        className={`absolute top-full left-0 right-0 mt-2 shadow-lg rounded-lg overflow-hidden z-10 ${
                          isDark ? 'bg-gray-700' : 'bg-white'
                        }`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-3 space-y-3">
                          <a 
                            href="https://wa.me/971544062933" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 w-full p-3 rounded-lg ${
                              isDark 
                                ? 'text-gray-300 hover:bg-gray-600' 
                                : 'text-gray-700 hover:bg-gray-100'
                            } transition-colors`}
                          >
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path fillRule="evenodd" d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" clipRule="evenodd" />
                            </svg>
                            <span>WhatsApp</span>
                          </a>
                          <a 
                            href="https://m.me/username" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 w-full p-3 rounded-lg ${
                              isDark 
                                ? 'text-gray-300 hover:bg-gray-600' 
                                : 'text-gray-700 hover:bg-gray-100'
                            } transition-colors`}
                          >
                            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path fillRule="evenodd" d="M0 11.64C0 4.95 5.24 0 12 0s12 4.95 12 11.64c0 3.42-1.33 6.48-3.48 8.64l1.34 4.14-4.96-2.5c-1.5.6-3.15.93-4.9.93-6.76 0-12-5.18-12-11.23zm6.72 3.96l-3.9 4.17 4.38-2.4c1.17.54 2.52.84 3.93.84 5.24 0 9.56-4.06 9.56-9.18C20.7 4.97 16.38 1 11.1 1c-5.24 0-9.48 3.97-9.48 9.03 0 2.4.93 4.7 2.4 6.43l2.7-0.86z" clipRule="evenodd" />
                            </svg>
                            <span>Messenger</span>
                          </a>
                          <a 
                            href="tel:+971544062933" 
                            className={`flex items-center gap-2 w-full p-3 rounded-lg ${
                              isDark 
                                ? 'text-gray-300 hover:bg-gray-600' 
                                : 'text-gray-700 hover:bg-gray-100'
                            } transition-colors`}
                          >
                            <svg className="w-5 h-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>{language === 'en' ? 'Call' : 'কল'}</span>
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/971544062933"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </motion.a>
    </section>
  );
};

export default Contact;