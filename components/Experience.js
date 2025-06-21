'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

const experienceData = [
    {
      id: 1,
      title: 'ELV Technician',
      titleBn: 'ইএলভি টেকনিশিয়ান',
      company: 'INTEGRATED TECHNOLOGIES L.L.C',
      companyBn: 'ইন্টিগ্রেটেড টেকনোলজিস এল.এল.সি',
      period: 'Aug 2023 - Present',
      periodBn: 'আগস্ট ২০২৩ - বর্তমান',
      location: 'Dubai, UAE',
      locationBn: 'দুবাই, ইউএই',
      responsibilities: [
        'Gate barrier installation, programming, and termination',
        'CCTV, intercoms, access control installation and configuration',
        'SMATV and maintenance tasks',
        'Home automation and security system installation'
      ],
      responsibilitiesBn: [
        'গেট বাধা ইনস্টলেশন, প্রোগ্রামিং এবং টার্মিনেশন',
        'সিসিটিভি, ইন্টারকম, অ্যাকসেস কন্ট্রোল ইনস্টলেশন এবং কনফিগারেশন',
        'এসএমএটিভি এবং রক্ষণাবেক্ষণ কাজ',
        'হোম অটোমেশন এবং সিকিউরিটি সিস্টেম ইনস্টলেশন'
      ],
      keyProjects: [
        'Arabian Ranches 3 (Bills) - EMMAR Project',
        'Taya Residences Building (Al Furjan)'
      ],
      keyProjectsBn: [
        'আরাবিয়ান রাঞ্চেস ৩ (বিলস) - ইমার প্রজেক্ট',
        'তায়া রেসিডেন্সেস বিল্ডিং (আল ফুরজান)'
      ]
    },
    {
      id: 2,
      title: 'ELV Technician',
      titleBn: 'ইএলভি টেকনিশিয়ান',
      company: 'MAJ TECHNOLOGIES L.L.C',
      companyBn: 'এমএজে টেকনোলজিস এল.এল.সি',
      period: 'Jan 2023 - July 2023',
      periodBn: 'জানুয়ারি ২০২৩ - জুলাই ২০২৩',
      location: 'Dubai, UAE',
      locationBn: 'দুবাই, ইউএই',
      responsibilities: [
        'Fiber splicing, Termination & IP-TV Configuration',
        'Data & Smart Home security system installation & configurations',
        'Home Automation & Smart Home security system installation',
        'BGM System & Smart Home security system installation',
        'Pre-sales work including AutoCAD, creating Bills of Quantities (BOQ)',
        'Supplier communication and selection',
        'SIRA portal management'
      ],
      responsibilitiesBn: [
        'ফাইবার স্প্লাইসিং, টার্মিনেশন এবং আইপি-টিভি কনফিগারেশন',
        'ডাটা এবং স্মার্ট হোম সিকিউরিটি সিস্টেম ইনস্টলেশন এবং কনফিগারেশন',
        'হোম অটোমেশন এবং স্মার্ট হোম সিকিউরিটি সিস্টেম ইনস্টলেশন',
        'বিজিএম সিস্টেম এবং স্মার্ট হোম সিকিউরিটি সিস্টেম ইনস্টলেশন',
        'অটোক্যাড, বিল অফ কোয়ান্টিটি (বিওকিউ) তৈরি সহ প্রি-সেলস কাজ',
        'সাপ্লায়ার যোগাযোগ এবং নির্বাচন',
        'সিরা পোর্টাল ম্যানেজমেন্ট'
      ],
      keyProjects: [
        'Pyramisa Hotel Apartments (Dubai land)',
        'Ayal Nasir Building (Deira, Dubai)',
        'Alghanim 7 villa (Dubai Hills)',
        'Al Barari villa R2 & R3',
        'Nakheel Club House (Rashid bin mohammed City)'
      ],
      keyProjectsBn: [
        'পিরামিসা হোটেল অ্যাপার্টমেন্টস (দুবাই ল্যান্ড)',
        'আয়াল নাসির বিল্ডিং (দেইরা, দুবাই)',
        'আলঘানিম ৭ ভিলা (দুবাই হিলস)',
        'আল বারারি ভিলা আর২ এবং আর৩',
        'নাখিল ক্লাব হাউস (রশিদ বিন মোহাম্মদ সিটি)'
      ]
    },
    {
      id: 3,
      title: 'Computer Lab Assistant',
      titleBn: 'কম্পিউটার ল্যাব অ্যাসিস্ট্যান্ট',
      company: 'University of Liberal Art Bangladesh',
      companyBn: 'ইউনিভার্সিটি অফ লিবারেল আর্ট বাংলাদেশ',
      period: 'Feb 2021 - May 2022',
      periodBn: 'ফেব্রুয়ারি ২০২১ - মে ২০২২',
      location: 'Dhaka, Bangladesh',
      locationBn: 'ঢাকা, বাংলাদেশ',
      responsibilities: [
        'Provided technical support to students and other users in the computer lab',
        'Assisted users in navigating and using computer applications and software',
        'Coordinated with IT staff to ensure software and applications were up to date',
        'Troubleshooting and equipment maintenance',
        'Collaborated with instructors to support technology integration into educational activities'
      ],
      responsibilitiesBn: [
        'কম্পিউটার ল্যাবে ছাত্র এবং অন্যান্য ব্যবহারকারীদের প্রযুক্তিগত সহায়তা প্রদান',
        'ব্যবহারকারীদের কম্পিউটার অ্যাপ্লিকেশন এবং সফটওয়্যার নেভিগেট করতে এবং ব্যবহার করতে সাহায্য',
        'সফটওয়্যার এবং অ্যাপ্লিকেশনগুলি আপডেট আছে তা নিশ্চিত করতে আইটি স্টাফের সাথে সমন্বয়',
        'সমস্যা সমাধান এবং সরঞ্জাম রক্ষণাবেক্ষণ',
        'শিক্ষামূলক কার্যক্রমে প্রযুক্তি সংহতকরণে সহায়তা করতে শিক্ষকদের সাথে সহযোগিতা'
      ],
      keyProjects: [],
      keyProjectsBn: []
    },
    {
      id: 4,
      title: 'Graphic Designer',
      titleBn: 'গ্রাফিক ডিজাইনার',
      company: 'Studio Arrival',
      companyBn: 'স্টুডিও এরাইভাল',
      period: 'Jun 2020 - Nov 2022',
      periodBn: 'জুন ২০২০ - নভেম্বর ২০২২',
      location: 'Remote',
      locationBn: 'রিমোট',
      responsibilities: [
        'Designed and created visual content for branding, marketing materials, websites, and print',
        'Selected and manipulated fonts to enhance visual appeal and readability',
        'Arranged visual elements, text, and images in effective layouts',
        'Image editing, print design, web design, and portfolio development'
      ],
      responsibilitiesBn: [
        'ব্র্যান্ডিং, মার্কেটিং উপকরণ, ওয়েবসাইট এবং প্রিন্টের জন্য ভিজ্যুয়াল কনটেন্ট ডিজাইন এবং তৈরি',
        'ভিজ্যুয়াল আকর্ষণ এবং পঠনযোগ্যতা বাড়াতে ফন্ট নির্বাচন এবং পরিবর্তন',
        'কার্যকর লেআউটে ভিজ্যুয়াল উপাদান, টেক্সট এবং ছবি সাজানো',
        'ইমেজ এডিটিং, প্রিন্ট ডিজাইন, ওয়েব ডিজাইন এবং পোর্টফোলিও ডেভেলপমেন্ট'
      ],
      keyProjects: [],
      keyProjectsBn: []
    },
    {
      id: 5,
      title: 'Web Designer & Chief Operations Officer',
      titleBn: 'ওয়েব ডিজাইনার এবং চীফ অপারেশনস অফিসার',
      company: 'Wing AI Bangladesh',
      companyBn: 'উইং এআই বাংলাদেশ',
      period: 'Jan 2019 - Jan 2023',
      periodBn: 'জানুয়ারি ২০১৯ - জানুয়ারি ২০২৩',
      location: 'Dhaka, Bangladesh',
      locationBn: 'ঢাকা, বাংলাদেশ',
      responsibilities: [
        'Ensured ease of use, user-friendliness, and fulfillment of customer design concepts',
        'Comprehensive management of operations, strategic planning, and resource allocation',
        'Led cross-functional teams, managed risks, and monitored performance indicators',
        'Fostered a dynamic and effective operational environment through collaborative leadership'
      ],
      responsibilitiesBn: [
        'ব্যবহারের সহজতা, ব্যবহারকারী-বান্ধব এবং গ্রাহকের ডিজাইন ধারণা পূরণ নিশ্চিত করা',
        'অপারেশনের সামগ্রিক ব্যবস্থাপনা, কৌশলগত পরিকল্পনা এবং সম্পদ বরাদ্দ',
        'ক্রস-ফাংশনাল টিম পরিচালনা, ঝুঁকি ব্যবস্থাপনা এবং কর্মক্ষমতা সূচক নিরীক্ষণ',
        'সহযোগিতামূলক নেতৃত্বের মাধ্যমে একটি গতিশীল এবং কার্যকর পরিচালনা পরিবেশ গড়ে তোলা'
      ],
      keyProjects: [],
      keyProjectsBn: []
    },
    {
      id: 6,
      title: 'Computer Trainer',
      titleBn: 'কম্পিউটার প্রশিক্ষক',
      company: 'Bangla Net IT Solution',
      companyBn: 'বাংলা নেট আইটি সলিউশন',
      period: 'Apr 2014 - Sep 2016',
      periodBn: 'এপ্রিল ২০১৪ - সেপ্টেম্বর ২০১৬',
      location: 'Bangladesh',
      locationBn: 'বাংলাদেশ',
      responsibilities: [
        'Provided training on basic system operations',
        'System monitoring and official work like typing and email',
        'Data backup and recovery, capacity planning',
        'Software installation and updates',
        'Hardware maintenance'
      ],
      responsibilitiesBn: [
        'বেসিক সিস্টেম অপারেশন সম্পর্কে প্রশিক্ষণ প্রদান',
        'সিস্টেম মনিটরিং এবং টাইপিং ও ইমেইল এর মতো অফিসিয়াল কাজ',
        'ডাটা ব্যাকআপ এবং রিকভারি, ক্ষমতা পরিকল্পনা',
        'সফটওয়্যার ইনস্টলেশন এবং আপডেট',
        'হার্ডওয়্যার রক্ষণাবেক্ষণ'
      ],
      keyProjects: [],
      keyProjectsBn: []
    },
    {
      id: 7,
      title: 'Networking Of Structure Cabling',
      titleBn: 'স্ট্রাকচার কেবলিং এর নেটওয়ার্কিং',
      company: 'IFIC Bank in Bangladesh',
      companyBn: 'আইএফআইসি ব্যাংক ইন বাংলাদেশ',
      period: '2017',
      periodBn: '২০১৭',
      location: 'Bangladesh',
      locationBn: 'বাংলাদেশ',
      responsibilities: [
        'Managing server infrastructure',
        'Ensuring the security and efficiency of IT systems',
        'Cable termination and testing',
        'Network troubleshooting and maintenance'
      ],
      responsibilitiesBn: [
        'সার্ভার ইনফ্রাস্ট্রাকচার পরিচালনা',
        'আইটি সিস্টেমের নিরাপত্তা এবং দক্ষতা নিশ্চিত করা',
        'কেবল টার্মিনেশন এবং টেস্টিং',
        'নেটওয়ার্ক সমস্যা সমাধান এবং রক্ষণাবেক্ষণ'
      ],
      keyProjects: [],
      keyProjectsBn: []
    }
  ];

const Experience = () => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const isDark = theme === 'dark';
  
  const [activeTab, setActiveTab] = useState(1);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // We've added these keys to the LanguageContext translations

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

  // Helper function to get translated content
  const getTranslatedContent = (job) => {
    return {
      title: language === 'en' ? job.title : job.titleBn,
      company: language === 'en' ? job.company : job.companyBn,
      period: language === 'en' ? job.period : job.periodBn,
      location: language === 'en' ? job.location : job.locationBn,
      responsibilities: language === 'en' ? job.responsibilities : job.responsibilitiesBn,
      keyProjects: language === 'en' ? job.keyProjects : job.keyProjectsBn,
    };
  };

  return (
    <section id="experience" className={`section ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className={`heading-lg ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              {t('experience_title')}
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-8"></div>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t('experience_subtitle')}
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Tab Navigation */}
            <motion.div 
              variants={itemVariants}
              className="md:w-1/4"
            >
              <div className="sticky top-24 space-y-2">
                {experienceData.map((job) => {
                  const translatedJob = getTranslatedContent(job);
                  return (
                    <button
                      key={job.id}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                        activeTab === job.id
                          ? isDark
                            ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                            : 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                          : isDark
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                      }`}
                      onClick={() => setActiveTab(job.id)}
                    >
                      <h3 className="font-semibold">{translatedJob.title}</h3>
                      <p className={`text-sm ${activeTab === job.id ? 'text-gray-100' : isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {translatedJob.company}
                      </p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
            
            {/* Right Content Area */}
            <motion.div 
              variants={itemVariants}
              className="md:w-3/4"
            >
              {experienceData.map((job) => {
                const translatedJob = getTranslatedContent(job);
                
                if (job.id !== activeTab) return null;
                
                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className={`card shadow-lg hover:shadow-xl transition-shadow ${
                      isDark ? 'bg-gray-700 shadow-gray-900/20' : 'bg-white shadow-gray-200/50'
                    }`}
                  >
                    <div className="p-6 sm:p-8">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                        <div className="flex-1">
                          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>
                            {translatedJob.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                            <span className={`${isDark ? 'text-primary-400' : 'text-primary-600'} font-medium`}>
                              {translatedJob.company}
                            </span>
                            <span className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {translatedJob.period}
                            </span>
                            <span className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {translatedJob.location}
                            </span>
                          </div>
                        </div>
                        <div className={`px-4 py-2 rounded-full ${
                          isDark 
                            ? 'bg-primary-900 text-primary-200' 
                            : 'bg-primary-100 text-primary-800'
                        } text-sm font-medium`}>
                          {t('experience_responsibilities')}
                        </div>
                      </div>
                      
                      <ul className={`ml-6 mb-6 space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {translatedJob.responsibilities.map((responsibility, index) => (
                          <li key={index} className="list-disc">
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                      
                      {translatedJob.keyProjects && translatedJob.keyProjects.length > 0 && (
                        <div>
                          <h4 className={`font-semibold mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {t('experience_projects')}:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {translatedJob.keyProjects.map((project, index) => (
                              <span 
                                key={index}
                                className={`px-3 py-1 rounded-full text-sm ${
                                  isDark 
                                    ? 'bg-secondary-900 text-secondary-200' 
                                    : 'bg-secondary-100 text-secondary-800'
                                }`}
                              >
                                {project}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;