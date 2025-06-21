'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

const Gallery = () => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const isDark = theme === 'dark';
  
  // Gallery images data with translations
  const galleryData = [
    {
      id: 1,
      title: language === 'en' ? 'CCTV Installation' : 'সিসিটিভি ইনস্টলেশন',
      category: language === 'en' ? 'Security' : 'সিকিউরিটি',
      image: '/gallery/cctv.jpeg',
      description: language === 'en' 
        ? 'Installing security cameras at a residential building'
        : 'আবাসিক ভবনে সিকিউরিটি ক্যামেরা ইনস্টল করা'
    },
    {
      id: 2,
      title: language === 'en' ? 'Home Automation Panel' : 'হোম অটোমেশন প্যানেল',
      category: language === 'en' ? 'Automation' : 'অটোমেশন',
      image: '/gallery/home.webp',
      description: language === 'en'
        ? 'VIMAR home automation control panel setup'
        : 'ভিমার হোম অটোমেশন কন্ট্রোল প্যানেল সেটআপ'
    },
    {
      id: 3,
      title: language === 'en' ? 'Fiber Splicing' : 'ফাইবার স্প্লাইসিং',
      category: language === 'en' ? 'Networking' : 'নেটওয়ার্কিং',
      image: '/gallery/splicing.png',
      description: language === 'en'
        ? 'Precision fiber optic cable splicing work'
        : 'প্রিসিশন ফাইবার অপটিক কেবল স্প্লাইসিং কাজ'
    },
    {
      id: 4,
      title: language === 'en' ? 'Access Control System' : 'অ্যাকসেস কন্ট্রোল সিস্টেম',
      category: language === 'en' ? 'Security' : 'সিকিউরিটি',
      image: '/gallery/access.jpeg',
      description: language === 'en'
        ? 'Biometric access control system installation'
        : 'বায়োমেট্রিক অ্যাকসেস কন্ট্রোল সিস্টেম ইনস্টলেশন'
    },
    {
      id: 5,
      title: language === 'en' ? 'Server Rack Installation' : 'সার্ভার র‍্যাক ইনস্টলেশন',
      category: language === 'en' ? 'Networking' : 'নেটওয়ার্কিং',
      image: '/gallery/rack.jpeg',
      description: language === 'en'
        ? 'Structured cabling and server rack organization'
        : 'স্ট্রাকচারড কেবলিং এবং সার্ভার র‍্যাক অর্গানাইজেশন'
    },
    {
      id: 6,
      title: language === 'en' ? 'Intercom System' : 'ইন্টারকম সিস্টেম',
      category: language === 'en' ? 'Communication' : 'কমিউনিকেশন',
      image: '/gallery/intercom.png',
      description: language === 'en'
        ? 'Video intercom system for residential building'
        : 'আবাসিক ভবনের জন্য ভিডিও ইন্টারকম সিস্টেম'
    },
    {
      id: 7,
      title: language === 'en' ? 'BGM Speaker Installation' : 'বিজিএম স্পিকার ইনস্টলেশন',
      category: language === 'en' ? 'Audio' : 'অডিও',
      image: '/gallery/bgm.jpg',
      description: language === 'en'
        ? 'Background music system for commercial space'
        : 'বাণিজ্যিক স্পেসের জন্য ব্যাকগ্রাউন্ড মিউজিক সিস্টেম'
    },
    {
      id: 8,
      title: language === 'en' ? 'Gate Barrier' : 'গেট ব্যারিয়ার',
      category: language === 'en' ? 'Security' : 'সিকিউরিটি',
      image: '/gallery/gate.jpeg',
      description: language === 'en'
        ? 'Automatic gate barrier installation and setup'
        : 'অটোমেটিক গেট ব্যারিয়ার ইনস্টলেশন এবং সেটআপ'
    },
    {
      id: 9,
      title: language === 'en' ? 'Structured Cabling' : 'স্ট্রাকচারড কেবলিং',
      category: language === 'en' ? 'Networking' : 'নেটওয়ার্কিং',
      image: '/gallery/cable.jpeg',
      description: language === 'en'
        ? 'Clean, organized network cabling infrastructure'
        : 'পরিষ্কার, সংগঠিত নেটওয়ার্ক কেবলিং ইনফ্রাস্ট্রাকচার'
    }
  ];

  // Gallery categories with translations
  const categories = language === 'en'
    ? ['All', 'Security', 'Automation', 'Networking', 'Communication', 'Audio']
    : ['সব', 'সিকিউরিটি', 'অটোমেশন', 'নেটওয়ার্কিং', 'কমিউনিকেশন', 'অডিও'];

  const [activeCategory, setActiveCategory] = useState(language === 'en' ? 'All' : 'সব');
  const [selectedImage, setSelectedImage] = useState(null);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Reset active category when language changes
  useEffect(() => {
    setActiveCategory(language === 'en' ? 'All' : 'সব');
  }, [language]);

  const filteredImages = activeCategory === (language === 'en' ? 'All' : 'সব')
    ? galleryData
    : galleryData.filter(item => item.category === activeCategory);

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
    <section id="gallery" className={`section ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className={`heading-lg ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('gallery_title')}</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-8"></div>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('gallery_subtitle')}
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

          {/* Gallery grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredImages.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  variants={itemVariants}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="relative overflow-hidden rounded-lg aspect-square cursor-pointer group"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10"></div>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-700 group-hover:scale-110"
                    />
                  <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/70 to-transparent z-20">
                    <h3 className="text-white font-medium text-lg">{item.title}</h3>
                    <span className="text-white/80 text-sm">{item.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {/* Instagram button */}
          <motion.div
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <a 
              href="https://www.instagram.com/mdbodiuzaman/"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn ${
                isDark 
                  ? 'border-2 border-primary-400 text-primary-400 hover:bg-primary-500 hover:text-white hover:border-primary-500' 
                  : 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white'
              } px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500/50 inline-flex items-center gap-2`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
              <span>{t('gallery_view_insta')}</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full h-auto max-h-[90vh]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-auto max-h-[70vh] overflow-hidden rounded-lg">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  sizes="(max-width: 1536px) 100vw, 1536px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className={`p-4 rounded-b-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedImage.title}</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{selectedImage.description}</p>
              </div>
              <button
                className="absolute top-4 right-4 bg-white/20 text-white rounded-full p-2 hover:bg-white/40 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Navigation buttons */}
              <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 text-white rounded-full p-2 hover:bg-white/40 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
                  const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
                  setSelectedImage(filteredImages[prevIndex]);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 text-white rounded-full p-2 hover:bg-white/40 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
                  const nextIndex = (currentIndex + 1) % filteredImages.length;
                  setSelectedImage(filteredImages[nextIndex]);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;