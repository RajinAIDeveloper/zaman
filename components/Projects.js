'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

const Projects = () => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const isDark = theme === 'dark';
  
  // Projects data with translations
  const projectsData = [
    {
      id: 1,
      title: 'Arabian Ranches 3',
      titleBn: 'আরবিয়ান রাঞ্চেস ৩',
      category: language === 'en' ? 'ELV Systems' : 'ইএলভি সিস্টেম',
      client: 'EMMAR',
      location: language === 'en' ? 'Dubai, UAE' : 'দুবাই, ইউএই',
      description: language === 'en' 
        ? 'Implementation of full ELV infrastructure for this premium residential community development by EMMAR. The project included structured cabling, security systems, and home automation integration.'
        : 'এমমার দ্বারা এই প্রিমিয়াম আবাসিক কমিউনিটি ডেভেলপমেন্টের জন্য সম্পূর্ণ ইএলভি ইনফ্রাস্ট্রাকচার বাস্তবায়ন। প্রকল্পে স্ট্রাকচারড কেবলিং, সিকিউরিটি সিস্টেম এবং হোম অটোমেশন ইন্টিগ্রেশন অন্তর্ভুক্ত ছিল।',
      image: '/images/project1.jpg',
      tags: language === 'en' 
        ? ['Home Automation', 'Security Systems', 'Structured Cabling']
        : ['হোম অটোমেশন', 'সিকিউরিটি সিস্টেম', 'স্ট্রাকচারড কেবলিং']
    },
    {
      id: 2,
      title: 'Pyramisa Hotel Apartments',
      titleBn: 'পিরামিসা হোটেল অ্যাপার্টমেন্টস',
      category: language === 'en' ? 'Fiber & IPTV' : 'ফাইবার ও আইপিটিভি',
      client: 'Pyramisa Hotels',
      location: language === 'en' ? 'Dubai Land' : 'দুবাই ল্যান্ড',
      description: language === 'en'
        ? 'Fiber splicing, termination and IP-TV configuration for this large hotel apartment complex. Implemented comprehensive networking solutions to ensure high-speed connectivity throughout the property.'
        : 'এই বড় হোটেল অ্যাপার্টমেন্ট কমপ্লেক্সের জন্য ফাইবার স্প্লাইসিং, টার্মিনেশন এবং আইপি-টিভি কনফিগারেশন। সম্পত্তি জুড়ে উচ্চ-গতির সংযোগ নিশ্চিত করতে ব্যাপক নেটওয়ার্কিং সমাধান বাস্তবায়ন করেছি।',
      image: '/images/project2.jpg',
      tags: language === 'en'
        ? ['Fiber Splicing', 'IPTV', 'Networking']
        : ['ফাইবার স্প্লাইসিং', 'আইপিটিভি', 'নেটওয়ার্কিং']
    },
    {
      id: 3,
      title: 'Ayal Nasir Building',
      titleBn: 'আয়াল নাসির বিল্ডিং',
      category: language === 'en' ? 'Smart Home' : 'স্মার্ট হোম',
      client: 'Private',
      location: language === 'en' ? 'Deira, Dubai' : 'দেইরা, দুবাই',
      description: language === 'en'
        ? 'Data and smart home security system installation and configurations. Created an integrated security solution with access control, surveillance, and alarm systems.'
        : 'ডাটা এবং স্মার্ট হোম সিকিউরিটি সিস্টেম ইনস্টলেশন এবং কনফিগারেশন। অ্যাকসেস কন্ট্রোল, সার্ভিল্যান্স এবং অ্যালার্ম সিস্টেমের সাথে একটি ইন্টিগ্রেটেড সিকিউরিটি সলিউশন তৈরি করেছি।',
      image: '/images/project3.jpg',
      tags: language === 'en'
        ? ['Smart Home', 'Security Systems', 'Data Networks']
        : ['স্মার্ট হোম', 'সিকিউরিটি সিস্টেম', 'ডাটা নেটওয়ার্ক']
    },
    {
      id: 4,
      title: 'Alghanim 7 Villa',
      titleBn: 'আলগানিম ৭ ভিলা',
      category: language === 'en' ? 'Home Automation' : 'হোম অটোমেশন',
      client: 'Private',
      location: language === 'en' ? 'Dubai Hills' : 'দুবাই হিলস',
      description: language === 'en'
        ? 'Complete home automation and smart security implementation for this luxury villa. Integrated lighting, climate control, entertainment systems, and security into a cohesive control system.'
        : 'এই বিলাসবহুল ভিলার জন্য সম্পূর্ণ হোম অটোমেশন এবং স্মার্ট সিকিউরিটি বাস্তবায়ন। লাইটিং, ক্লাইমেট কন্ট্রোল, এন্টারটেইনমেন্ট সিস্টেম এবং সিকিউরিটি একটি সংযুক্ত কন্ট্রোল সিস্টেমে ইন্টিগ্রেট করেছি।',
      image: '/images/project4.jpg',
      tags: language === 'en'
        ? ['Home Automation', 'Smart Security', 'Luxury Solutions']
        : ['হোম অটোমেশন', 'স্মার্ট সিকিউরিটি', 'বিলাসবহুল সমাধান']
    },
    {
      id: 5,
      title: 'Nakheel Club House',
      titleBn: 'নাখিল ক্লাব হাউস',
      category: language === 'en' ? 'BGM Systems' : 'বিজিএম সিস্টেম',
      client: 'Nakheel',
      location: language === 'en' ? 'Rashid bin Mohammed City' : 'রাশিদ বিন মোহাম্মদ সিটি',
      description: language === 'en'
        ? 'BGM (Background Music) system and smart security installation for this premium club house facility. Provided zoned audio distribution and integrated security management.'
        : 'এই প্রিমিয়াম ক্লাব হাউস ফ্যাসিলিটির জন্য বিজিএম (ব্যাকগ্রাউন্ড মিউজিক) সিস্টেম এবং স্মার্ট সিকিউরিটি ইনস্টলেশন। জোনড অডিও ডিস্ট্রিবিউশন এবং ইন্টিগ্রেটেড সিকিউরিটি ম্যানেজমেন্ট প্রদান করেছি।',
      image: '/images/project5.jpg',
      tags: language === 'en'
        ? ['BGM Systems', 'Audio Distribution', 'Security Integration']
        : ['বিজিএম সিস্টেম', 'অডিও ডিস্ট্রিবিউশন', 'সিকিউরিটি ইন্টিগ্রেশন']
    },
    {
      id: 6,
      title: 'Al Barari Villa R2 & R3',
      titleBn: 'আল বারারি ভিলা আর২ ও আর৩',
      category: language === 'en' ? 'Vimar Solutions' : 'ভিমার সলিউশন',
      client: 'Private',
      location: language === 'en' ? 'Al Barari' : 'আল বারারি',
      description: language === 'en'
        ? 'Home automation and BGM system implementation using Vimar technology for these luxury villas. Created a seamless integrated solution for environmental control and entertainment.'
        : 'এই বিলাসবহুল ভিলাগুলির জন্য ভিমার প্রযুক্তি ব্যবহার করে হোম অটোমেশন এবং বিজিএম সিস্টেম বাস্তবায়ন। পরিবেশগত নিয়ন্ত্রণ এবং বিনোদনের জন্য একটি নিরবচ্ছিন্ন ইন্টিগ্রেটেড সলিউশন তৈরি করেছি।',
      image: '/images/project6.jpg',
      tags: language === 'en'
        ? ['VIMAR', 'Home Automation', 'Luxury Integration']
        : ['ভিমার', 'হোম অটোমেশন', 'বিলাসবহুল ইন্টিগ্রেশন']
    },
  ];

  const categories = language === 'en' 
    ? [
        'All',
        'ELV Systems',
        'Fiber & IPTV',
        'Smart Home',
        'Home Automation',
        'BGM Systems',
        'Vimar Solutions',
      ]
    : [
        'সব',
        'ইএলভি সিস্টেম',
        'ফাইবার ও আইপিটিভি',
        'স্মার্ট হোম',
        'হোম অটোমেশন',
        'বিজিএম সিস্টেম',
        'ভিমার সলিউশন',
      ];
  
  const [activeCategory, setActiveCategory] = useState(language === 'en' ? 'All' : 'সব');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Update active category when language changes
  useEffect(() => {
    setActiveCategory(language === 'en' ? 'All' : 'সব');
  }, [language]);

  const filteredProjects = activeCategory === (language === 'en' ? 'All' : 'সব')
    ? projectsData
    : projectsData.filter(project => project.category === activeCategory);

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
    <section id="projects" className={`section ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className={`heading-lg ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('projects_title')}</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-8"></div>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('projects_subtitle')}
            </p>
          </motion.div>

          {/* Category filters */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary-500 text-white shadow-md'
                    : isDark 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  variants={itemVariants}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className={`overflow-hidden group cursor-pointer rounded-xl shadow-lg ${
                    isDark ? 'bg-gray-800 hover:shadow-gray-700/50' : 'bg-white hover:shadow-xl'
                  } p-6 transition-all duration-300`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative h-60 mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={project.image}
                      alt={language === 'en' ? project.title : project.titleBn}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isDark ? 'bg-primary-900 text-primary-200' : 'bg-primary-100 text-primary-800'
                      }`}>{project.category}</span>
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold ${
                    isDark 
                      ? 'text-white group-hover:text-primary-400' 
                      : 'text-gray-800 group-hover:text-primary-500'
                  } mb-2 transition-colors`}>
                    {language === 'en' ? project.title : project.titleBn}
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} line-clamp-2 mb-4`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isDark ? 'bg-secondary-900 text-secondary-200' : 'bg-secondary-100 text-secondary-800'
                      }`}>
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 2 && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isDark ? 'bg-secondary-900 text-secondary-200' : 'bg-secondary-100 text-secondary-800'
                      }`}>
                        +{project.tags.length - 2}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className={`rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto ${
                isDark ? 'bg-gray-800' : 'bg-white'
              }`}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-72 sm:h-80 md:h-96">
                <Image
                  src={selectedProject.image}
                  alt={language === 'en' ? selectedProject.title : selectedProject.titleBn}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="rounded-t-xl"
                />
                <button
                  className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
                  onClick={() => setSelectedProject(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                      {language === 'en' ? selectedProject.title : selectedProject.titleBn}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isDark ? 'bg-primary-900 text-primary-200' : 'bg-primary-100 text-primary-800'
                    }`}>{selectedProject.category}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{t('project_client')}</h4>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{selectedProject.client}</p>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{t('project_location')}</h4>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{selectedProject.location}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{t('project_desc')}</h4>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{selectedProject.description}</p>
                </div>
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{t('project_techs')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, index) => (
                      <span key={index} className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isDark ? 'bg-secondary-900 text-secondary-200' : 'bg-secondary-100 text-secondary-800'
                      }`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;