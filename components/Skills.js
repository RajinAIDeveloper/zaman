'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';

const Skills = () => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const isDark = theme === 'dark';
  const [hoveredCert, setHoveredCert] = useState(null);
  
  // Skill categories with translations
  const skillCategories = [
    {
      title: language === 'en' ? 'ELV Systems' : 'ইএলভি সিস্টেম',
      skills: [
        { name: language === 'en' ? 'Home Automation (VIMAR)' : 'হোম অটোমেশন (ভিমার)', level: 95 },
        { name: language === 'en' ? 'Cable Structure' : 'কেবল স্ট্রাকচার', level: 90 },
        { name: language === 'en' ? 'Fiber Splicing' : 'ফাইবার স্প্লাইসিং', level: 85 },
        { name: language === 'en' ? 'Cable Termination' : 'কেবল টার্মিনেশন', level: 95 },
        { name: language === 'en' ? 'CCTV, SMATV & IPTV' : 'সিসিটিভি, এসএমএটিভি ও আইপিটিভি', level: 90 },
        { name: language === 'en' ? 'Gate Barrier' : 'গেট ব্যারিয়ার', level: 85 },
        { name: language === 'en' ? 'Access Control System' : 'অ্যাকসেস কন্ট্রোল সিস্টেম', level: 80 },
        { name: language === 'en' ? 'BGM' : 'বিজিএম', level: 85 },
        { name: language === 'en' ? 'Intercom' : 'ইন্টারকম', level: 90 },
        { name: language === 'en' ? 'Maintenance Skills' : 'রক্ষণাবেক্ষণ দক্ষতা', level: 90 },
      ]
    },
    {
      title: language === 'en' ? 'Technical Skills' : 'প্রযুক্তিগত দক্ষতা',
      skills: [
        { name: 'AutoCAD', level: 80 },
        { name: 'Adobe Photoshop', level: 85 },
        { name: 'Adobe Illustrator', level: 80 },
        { name: language === 'en' ? 'Internet Applications' : 'ইন্টারনেট অ্যাপ্লিকেশন', level: 90 },
        { name: language === 'en' ? 'Operating Systems' : 'অপারেটিং সিস্টেম', level: 85 },
        { name: language === 'en' ? 'Internet Security' : 'ইন্টারনেট সিকিউরিটি', level: 80 },
        { name: language === 'en' ? 'Computer Software' : 'কম্পিউটার সফটওয়্যার', level: 85 },
        { name: language === 'en' ? 'Computer Hardware' : 'কম্পিউটার হার্ডওয়্যার', level: 90 },
        { name: 'Microsoft Office', level: 95 },
      ]
    },
    {
      title: language === 'en' ? 'Design & Development' : 'ডিজাইন এবং ডেভেলপমেন্ট',
      skills: [
        { name: language === 'en' ? 'Data Entry' : 'ডাটা এন্ট্রি', level: 90 },
        { name: language === 'en' ? 'Graphic Design' : 'গ্রাফিক ডিজাইন', level: 85 },
        { name: language === 'en' ? 'Web Development' : 'ওয়েব ডেভেলপমেন্ট', level: 80 },
        { name: language === 'en' ? 'Development Testing' : 'ডেভেলপমেন্ট টেস্টিং', level: 75 },
        { name: language === 'en' ? 'UI/UX Design' : 'ইউআই/ইউএক্স ডিজাইন', level: 70 },
      ]
    },
    {
      title: language === 'en' ? 'Languages' : 'ভাষা',
      skills: [
        { name: language === 'en' ? 'English' : 'ইংরেজি', level: 75, label: language === 'en' ? 'Medium' : 'মাঝারি' },
        { name: language === 'en' ? 'Hindi' : 'হিন্দি', level: 90, label: language === 'en' ? 'Fluent' : 'স্বাচ্ছন্দ্যময়' },
        { name: language === 'en' ? 'Bangla' : 'বাংলা', level: 100, label: language === 'en' ? 'Native' : 'মাতৃভাষা' },
      ]
    }
  ];

  // Certification data with download links
  const certifications = [
    { 
      id: 1,
      name: language === 'en' ? 'VIMAR Home Automation' : 'ভিমার হোম অটোমেশন',
      file: '/pdfs/certificate-vimar.pdf',
      icon: '🏠'
    },
    { 
      id: 2,
      name: language === 'en' ? 'CAME Gate Barrier' : 'কেম গেট ব্যারিয়ার',
      file: '/pdfs/certificate-came.pdf',
      icon: '🚧'
    },
    { 
      id: 3,
      name: language === 'en' ? 'Hikvision Access Control' : 'হিকভিশন অ্যাকসেস কন্ট্রোল',
      file: '/pdfs/certificate-hikvision.pdf',
      icon: '🔒'
    },
    { 
      id: 4,
      name: language === 'en' ? 'BGM Systems' : 'বিজিএম সিস্টেম',
      file: '/pdfs/certificate-bgm.pdf',
      icon: '🔊'
    },
    { 
      id: 5,
      name: language === 'en' ? 'Computer Science Diploma' : 'কম্পিউটার সায়েন্স ডিপ্লোমা',
      file: '/pdfs/diploma-cs.pdf',
      icon: '🎓'
    },
    { 
      id: 6,
      name: language === 'en' ? 'BS Computer Science' : 'বিএস কম্পিউটার সায়েন্স',
      file: '/pdfs/degree-cs.pdf',
      icon: '🖥️'
    }
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
        staggerChildren: 0.1,
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
    <section id="skills" className={`section ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className={`heading-lg ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('skills_title')}</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-8"></div>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('skills_subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                variants={itemVariants}
                className={`card hover:transform hover:scale-105 transition-all ${isDark ? 'bg-gray-800 shadow-gray-900/20' : 'bg-white shadow-gray-200/50'}`}
              >
                <h3 className={`text-xl font-bold ${isDark ? 'text-white border-gray-700' : 'text-gray-800 border-gray-200'} mb-6 border-b pb-2`}>
                  {category.title}
                </h3>
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-2">
                        <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{skill.name}</span>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {skill.label ? skill.label : `${skill.level}%`}
                        </span>
                      </div>
                      <div className={`h-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
                        <motion.div
                          className="h-full rounded bg-gradient-to-r from-primary-500 to-primary-700"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.2 + (catIndex * 0.1) + (skillIndex * 0.05) }}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Certifications section */}
          <motion.div 
            variants={itemVariants}
            className={`mt-16 p-8 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl shadow-md`}
          >
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-6 text-center`}>
              {t('cert_title')}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert) => (
                <motion.div
                  key={cert.id}
                  className={`relative p-4 rounded-lg ${
                    isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'
                  } transition-colors shadow-sm`}
                  whileHover={{ 
                    scale: 1.03,
                    transition: { duration: 0.2 }
                  }}
                  onMouseEnter={() => setHoveredCert(cert.id)}
                  onMouseLeave={() => setHoveredCert(null)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" role="img" aria-label="certificate icon">
                        {cert.icon}
                      </span>
                      <h4 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                        {cert.name}
                      </h4>
                    </div>
                    
                    <a 
                      href={cert.file}
                      download={`MD-Bodiuzaman-${cert.name.replace(/\s+/g, '-')}.pdf`}
                      className={`p-2 rounded-full ${
                        isDark ? 'bg-gray-600 text-primary-400 hover:bg-primary-900' : 'bg-gray-200 text-primary-600 hover:bg-primary-100'
                      } transition-colors`}
                      title="Download Certificate"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </a>
                  </div>
                  
                  {/* Download hint on hover */}
                  <motion.div 
                    className={`absolute bottom-2 right-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCert === cert.id ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {t('cert_download')}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;