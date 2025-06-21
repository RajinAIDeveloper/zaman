'use client';

import { createContext, useContext, useEffect, useState } from 'react';

// Create context with default values
const LanguageContext = createContext({
  language: 'en',
  toggleLanguage: () => {},
  t: (key) => key, // Translation function
});

// Translations object
const translations = {
  en: {
    // Navbar
    nav_home: 'Home',
    nav_about: 'About',
    nav_experience: 'Experience',
    nav_skills: 'Skills',
    nav_projects: 'Projects',
    nav_gallery: 'Gallery',
    nav_contact: 'Contact',
    
    // Hero section
    hero_greeting: 'Hello, I\'m',
    hero_role: 'ELV Technician & IT Professional',
    hero_desc: 'Specializing in home automation, security systems, and smart home integration. With 3+ years of experience in the UAE and a background in Computer Science and Engineering.',
    hero_contact: 'Contact Me',
    hero_download: 'Download CV',
    
    // About section
    about_title: 'About Me',
    about_subtitle: 'A passionate ELV Technician and IT Professional with diverse experience',
    about_overview: 'Professional Overview',
    about_info: 'Personal Information',
    about_paragraph1: 'I have completed a diploma in Computer Science and Engineering. Additionally, I earned my Bachelor of Science degree from the Canadian University of Bangladesh.',
    about_paragraph2: 'For the last three years, I have worked in the UAE as an ELV Technician. My ELV experience includes installing and programming CCTV systems, SMA-TV, Gate Barriers, Access Control, BGM, Intercom systems, and related technologies.',
    about_paragraph3: 'I have also gained experience working in various organizations in Bangladesh, where my roles included serving as a Computer Lab Assistant and a Graphics Designer. I have worked as a Computer Operator in some of these organizations as well. Furthermore, I have experience in event management.',
    about_view_exp: 'View My Experience',
    
    // Personal Info
    info_dob: 'Date of Birth',
    info_nationality: 'Nationality',
    info_location: 'Location',
    info_languages: 'Languages',
    info_email: 'Email',
    info_phone: 'Phone',
    
    // Experience section
    experience_title: 'Work Experience',
    experience_subtitle: 'My professional journey and career highlights',
    experience_responsibilities: 'Key Responsibilities',
    experience_projects: 'Key Projects',
    
    // Experience section
    experience_title: 'Work Experience',
    experience_subtitle: 'My professional journey and career highlights',
    experience_responsibilities: 'Key Responsibilities',
    experience_projects: 'Key Projects',
    
    // Skills section
    skills_title: 'Professional Skills',
    skills_subtitle: 'My technical expertise and competencies',
    cert_title: 'Certifications & Training',
    cert_download: 'Click to download',
    
    // Projects section
    projects_title: 'Featured Projects',
    projects_subtitle: 'Showcasing my technical expertise and project accomplishments',
    project_client: 'Client',
    project_location: 'Location',
    project_desc: 'Description',
    project_techs: 'Technologies',
    
    // Gallery section
    gallery_title: 'Project Gallery',
    gallery_subtitle: 'Visual highlights from my technical projects and installations',
    gallery_view_insta: 'View on Instagram',
    gallery_all: 'All',
    
    // Contact section
    contact_title: 'Get In Touch',
    contact_subtitle: 'Have a project in mind or want to discuss a collaboration?',
    contact_send_message: 'Send Me A Message',
    contact_name: 'Your Name',
    contact_email: 'Your Email',
    contact_subject: 'Subject',
    contact_message: 'Message',
    contact_send: 'Send Message',
    contact_info: 'Contact Information',
    contact_social: 'Social Profiles',
    contact_quick: 'Quick Contact',
    
         // Footer
         footer_rights: '© 2025 MD. Bodiuzaman. All rights reserved.',
         footer_privacy: 'Privacy Policy',
         footer_terms: 'Terms of Service',
         footer_sitemap: 'Sitemap',
         footer_credit: 'এমডি. বদিউজ্জামানের জন্য ❤️ দিয়ে ডিজাইন এবং ডেভেলপ করা হয়েছে',
         footer_about: 'About',
         footer_about_me: 'About Me',
         footer_work_experience: 'Work Experience',
         footer_skills: 'Skills',
         footer_education: 'Education',
         footer_services: 'Services',
         footer_home_automation: 'Home Automation',
         footer_cctv_security: 'CCTV & Security',
         footer_network_solutions: 'Network Solutions',
         footer_elv_consultation: 'ELV Consultation',
         footer_portfolio: 'Portfolio',
         footer_projects: 'Projects',
         footer_gallery: 'Gallery',
         footer_testimonials: 'Testimonials',
         footer_certifications: 'Certifications',
         footer_contact: 'Contact',
         footer_follow_social: 'Follow me on social media',
         footer_elv_description: 'ELV Technician & IT Professional specializing in smart home integration, security systems, and networking solutions.',
         footer_designed_by: 'Designed with ❤️ by WING A.I. Bangladesh website:wingaibd.com',   
    
    
    
    // Language toggle
    language_en: 'English',
    language_bn: 'বাংলা', // "Bangla" in Bangla script
  },
  bn: {
    // Navbar
    nav_home: 'হোম',
    nav_about: 'আমার সম্পর্কে',
    nav_experience: 'অভিজ্ঞতা',
    nav_skills: 'দক্ষতা',
    nav_projects: 'প্রজেক্ট',
    nav_gallery: 'গ্যালারি',
    nav_contact: 'যোগাযোগ',
    
    // Hero section
    hero_greeting: 'হ্যালো, আমি',
    hero_role: 'ইএলভি টেকনিশিয়ান এবং আইটি পেশাদার',
    hero_desc: 'হোম অটোমেশন, সিকিউরিটি সিস্টেম এবং স্মার্ট হোম ইন্টিগ্রেশনে বিশেষজ্ঞ। ইউএই-তে ৩+ বছরের অভিজ্ঞতা এবং কম্পিউটার সায়েন্স ও ইঞ্জিনিয়ারিং এর ব্যাকগ্রাউন্ড সহ।',
    hero_contact: 'যোগাযোগ করুন',
    hero_download: 'সিভি ডাউনলোড করুন',
    
    // About section
    about_title: 'আমার সম্পর্কে',
    about_subtitle: 'বিভিন্ন অভিজ্ঞতার সাথে একজন আগ্রহী ইএলভি টেকনিশিয়ান এবং আইটি পেশাদার',
    about_overview: 'পেশাগত সংক্ষিপ্ত বিবরণ',
    about_info: 'ব্যক্তিগত তথ্য',
    about_paragraph1: 'আমি কম্পিউটার সায়েন্স এবং ইঞ্জিনিয়ারিং-এ ডিপ্লোমা সম্পন্ন করেছি। এছাড়াও, আমি কানাডিয়ান ইউনিভার্সিটি অব বাংলাদেশ থেকে বিজ্ঞানে স্নাতক ডিগ্রি অর্জন করেছি।',
    about_paragraph2: 'গত তিন বছর ধরে আমি ইউএই-তে একজন ইএলভি টেকনিশিয়ান হিসাবে কাজ করেছি। আমার ইএলভি অভিজ্ঞতার মধ্যে সিসিটিভি সিস্টেম, এসএমএ-টিভি, গেট ব্যারিয়ার, অ্যাকসেস কন্ট্রোল, বিজিএম, ইন্টারকম সিস্টেম এবং সম্পর্কিত প্রযুক্তি ইনস্টল এবং প্রোগ্রামিং অন্তর্ভুক্ত।',
    about_paragraph3: 'আমি বাংলাদেশের বিভিন্ন প্রতিষ্ঠানে কাজ করে অভিজ্ঞতা অর্জন করেছি, যেখানে আমার ভূমিকার মধ্যে কম্পিউটার ল্যাব অ্যাসিস্ট্যান্ট এবং গ্রাফিক্স ডিজাইনার হিসাবে কাজ করা অন্তর্ভুক্ত ছিল। আমি এই প্রতিষ্ঠানগুলির কিছুতে কম্পিউটার অপারেটর হিসাবেও কাজ করেছি। এছাড়াও, আমার ইভেন্ট ম্যানেজমেন্টেও অভিজ্ঞতা রয়েছে।',
    about_view_exp: 'আমার অভিজ্ঞতা দেখুন',
    
    // Personal Info
    info_dob: 'জন্ম তারিখ',
    info_nationality: 'জাতীয়তা',
    info_location: 'অবস্থান',
    info_languages: 'ভাষা',
    info_email: 'ইমেইল',
    info_phone: 'ফোন',
    
    // Experience section
    experience_title: 'কর্ম অভিজ্ঞতা',
    experience_subtitle: 'আমার পেশাদার যাত্রা এবং কর্মজীবনের হাইলাইটস',
    experience_responsibilities: 'মূল দায়িত্ব',
    experience_projects: 'মূল প্রজেক্ট',
    
    // Experience section
    experience_title: 'কর্ম অভিজ্ঞতা',
    experience_subtitle: 'আমার পেশাদার যাত্রা এবং কর্মজীবনের হাইলাইটস',
    experience_responsibilities: 'মূল দায়িত্ব',
    experience_projects: 'মূল প্রজেক্ট',
    
    // Skills section
    skills_title: 'পেশাগত দক্ষতা',
    skills_subtitle: 'আমার কারিগরি দক্ষতা এবং যোগ্যতা',
    cert_title: 'সার্টিফিকেট এবং প্রশিক্ষণ',
    cert_download: 'ডাউনলোড করতে ক্লিক করুন',
    
    // Projects section
    projects_title: 'বিশেষ প্রজেক্টসমূহ',
    projects_subtitle: 'আমার কারিগরি দক্ষতা এবং প্রজেক্ট সাফল্য প্রদর্শন',
    project_client: 'ক্লায়েন্ট',
    project_location: 'অবস্থান',
    project_desc: 'বিবরণ',
    project_techs: 'প্রযুক্তি',
    
    // Gallery section
    gallery_title: 'প্রজেক্ট গ্যালারি',
    gallery_subtitle: 'আমার কারিগরি প্রজেক্ট এবং ইনস্টলেশন থেকে ভিজ্যুয়াল হাইলাইটস',
    gallery_view_insta: 'ইনস্টাগ্রামে দেখুন',
    gallery_all: 'সব',
    
    // Contact section
    contact_title: 'যোগাযোগ করুন',
    contact_subtitle: 'একটি প্রজেক্ট নিয়ে ভাবছেন বা সহযোগিতা নিয়ে আলোচনা করতে চান?',
    contact_send_message: 'আমাকে একটি বার্তা পাঠান',
    contact_name: 'আপনার নাম',
    contact_email: 'আপনার ইমেইল',
    contact_subject: 'বিষয়',
    contact_message: 'বার্তা',
    contact_send: 'বার্তা পাঠান',
    contact_info: 'যোগাযোগের তথ্য',
    contact_social: 'সামাজিক প্রোফাইল',
    contact_quick: 'দ্রুত যোগাযোগ',
    
     // Footer
    footer_rights: '© ২০২৫ এমডি. বদিউজ্জামান। সর্বস্বত্ব সংরক্ষিত।',
    footer_privacy: 'গোপনীয়তা নীতি',
    footer_terms: 'সেবার শর্তাবলী',
    footer_sitemap: 'সাইটম্যাপ',
    footer_credit: 'এমডি. বদিউজ্জামান  ❤️ দিয়ে ডিজাইন এবং বিকাশ করা হয়েছে',
    footer_about: 'সম্পর্কে',
    footer_about_me: 'আমার সম্পর্কে',
    footer_work_experience: 'কর্ম অভিজ্ঞতা',
    footer_skills: 'দক্ষতা',
    footer_education: 'শিক্ষা',
    footer_services: 'সেবাসমূহ',
    footer_home_automation: 'হোম অটোমেশন',
    footer_cctv_security: 'সিসিটিভি ও সিকিউরিটি',
    footer_network_solutions: 'নেটওয়ার্ক সমাধান',
    footer_elv_consultation: 'ইএলভি পরামর্শ',
    footer_portfolio: 'পোর্টফোলিও',
    footer_projects: 'প্রজেক্ট',
    footer_gallery: 'গ্যালারি',
    footer_testimonials: 'টেস্টিমোনিয়ালস',
    footer_certifications: 'সার্টিফিকেট',
    footer_contact: 'যোগাযোগ',
    footer_follow_social: 'সামাজিক মাধ্যমে আমাকে অনুসরণ করুন',
    footer_elv_description: 'স্মার্ট হোম ইন্টিগ্রেশন, সিকিউরিটি সিস্টেম এবং নেটওয়ার্কিং সমাধানে বিশেষজ্ঞ ইএলভি টেকনিশিয়ান ও আইটি পেশাদার।',
    footer_designed_by: 'WING A.I. বাংলাদেশ দ্বারা ❤️ সহকারে ডিজাইন করা হয়েছে ওয়েবসাইট:wingaibd.com',

    // Language toggle
    language_en: 'English', // Keep English in English
    language_bn: 'বাংলা',
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [mounted, setMounted] = useState(false);
  
  // Only run this effect after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language');
    
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Translation function
  const t = (key) => {
    if (!translations[language]) return key;
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'bn' : 'en';
    
    // Update state
    setLanguage(newLanguage);
    
    // Update localStorage
    localStorage.setItem('language', newLanguage);
  };

  // Prevent hydration mismatch by rendering children only after mount
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}