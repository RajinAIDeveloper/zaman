'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import FormField from '@/components/admin/FormField';
import api from '@/lib/api';

export default function AboutAdmin() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [aboutData, setAboutData] = useState({
    subtitle_en: '',
    subtitle_bn: '',
    paragraph1_en: '',
    paragraph1_bn: '',
    paragraph2_en: '',
    paragraph2_bn: '',
    paragraph3_en: '',
    paragraph3_bn: ''
  });
  
  const [personalInfo, setPersonalInfo] = useState({
    dob: '',
    nationality: '',
    location_en: '',
    location_bn: '',
    email: '',
    phone: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [savingAbout, setSavingAbout] = useState(false);
  const [savingInfo, setSavingInfo] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch about section data
      const aboutResponse = await api.get('/content/about/get_active/');
      setAboutData(aboutResponse.data);
      
      // Fetch personal info data
      const infoResponse = await api.get('/content/personal-info/get_active/');
      setPersonalInfo(infoResponse.data);
    } catch (error) {
      console.error('Error fetching about data:', error);
      setErrorMessage('Failed to load about section data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAboutChange = (e) => {
    const { name, value } = e.target;
    setAboutData({
      ...aboutData,
      [name]: value
    });
  };
  
  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value
    });
  };
  
  const handleAboutSubmit = async (e) => {
    e.preventDefault();
    setSavingAbout(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      // Check if we have an existing record or need to create a new one
      const method = aboutData.id ? 'put' : 'post';
      const endpoint = aboutData.id ? `/content/about/${aboutData.id}/` : '/content/about/';
      
      const response = await api[method](endpoint, aboutData);
      
      setAboutData(response.data);
      setSuccessMessage('About section updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error saving about data:', error);
      setErrorMessage('Failed to save about section changes. Please try again.');
    } finally {
      setSavingAbout(false);
    }
  };
  
  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    setSavingInfo(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      // Check if we have an existing record or need to create a new one
      const method = personalInfo.id ? 'put' : 'post';
      const endpoint = personalInfo.id ? `/content/personal-info/${personalInfo.id}/` : '/content/personal-info/';
      
      const response = await api[method](endpoint, personalInfo);
      
      setPersonalInfo(response.data);
      setSuccessMessage('Personal information updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error saving personal info:', error);
      setErrorMessage('Failed to save personal information. Please try again.');
    } finally {
      setSavingInfo(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
          isDark ? 'border-blue-400' : 'border-blue-500'
        }`}></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          About Section
        </h2>
        <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Manage your about section and personal information
        </p>
      </div>
      
      {successMessage && (
        <div className={`mb-6 p-4 rounded-md bg-green-100 text-green-800 border border-green-200`}>
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className={`mb-6 p-4 rounded-md ${
          isDark ? 'bg-red-900/30 text-red-300 border-red-700' : 'bg-red-100 text-red-800 border-red-200'
        }`}>
          {errorMessage}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* About Section Form */}
        <div>
          <form onSubmit={handleAboutSubmit} className={`bg-opacity-60 rounded-lg shadow-md p-6 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Professional Overview
            </h3>
            
            <div className="mb-4">
              <FormField
                label="Subtitle (English)"
                name="subtitle_en"
                value={aboutData.subtitle_en}
                onChange={handleAboutChange}
                required
                placeholder="e.g. A passionate ELV Technician and IT Professional with diverse experience"
              />
            </div>
            
            <div className="mb-4">
              <FormField
                label="Subtitle (Bangla)"
                name="subtitle_bn"
                value={aboutData.subtitle_bn}
                onChange={handleAboutChange}
                required
                placeholder="Subtitle in Bangla"
              />
            </div>
            
            <div className="mb-4">
              <FormField
                label="Paragraph 1 (English)"
                name="paragraph1_en"
                type="textarea"
                value={aboutData.paragraph1_en}
                onChange={handleAboutChange}
                required
                placeholder="First paragraph about your education and background"
              />
            </div>
            
            <div className="mb-4">
              <FormField
                label="Paragraph 1 (Bangla)"
                name="paragraph1_bn"
                type="textarea"
                value={aboutData.paragraph1_bn}
                onChange={handleAboutChange}
                required
                placeholder="First paragraph in Bangla"
              />
            </div>
            
            <div className="mb-4">
              <FormField
                label="Paragraph 2 (English)"
                name="paragraph2_en"
                type="textarea"
                value={aboutData.paragraph2_en}
                onChange={handleAboutChange}
                required
                placeholder="Second paragraph about your professional experience"
              />
            </div>
            
            <div className="mb-4">
              <FormField
                label="Paragraph 2 (Bangla)"
                name="paragraph2_bn"
                type="textarea"
                value={aboutData.paragraph2_bn}
                onChange={handleAboutChange}
                required
                placeholder="Second paragraph in Bangla"
              />
            </div>
            
            <div className="mb-4">
              <FormField
                label="Paragraph 3 (English)"
                name="paragraph3_en"
                type="textarea"
                value={aboutData.paragraph3_en}
                onChange={handleAboutChange}
                required
                placeholder="Third paragraph about additional experience or skills"
              />
            </div>
            
            <div className="mb-6">
              <FormField
                label="Paragraph 3 (Bangla)"
                name="paragraph3_bn"
                type="textarea"
                value={aboutData.paragraph3_bn}
                onChange={handleAboutChange}
                required
                placeholder="Third paragraph in Bangla"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={savingAbout}
                className={`px-6 py-2 rounded-md transition-colors ${
                  isDark 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } ${savingAbout ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {savingAbout ? 'Saving...' : 'Save Overview'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Personal Information Form */}
        <div>
          <form onSubmit={handleInfoSubmit} className={`bg-opacity-60 rounded-lg shadow-md p-6 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Personal Information
            </h3>
            
            <div className="mb-4">
              <FormField
                label="Date of Birth"
                name="dob"
                value={personalInfo.dob}
                onChange={handleInfoChange}
                required
                placeholder="e.g. 10 Nov 1996"
              />
            </div>
            
            <div className="mb-4">
              <FormField
                label="Nationality"
                name="nationality"
                value={personalInfo.nationality}
                onChange={handleInfoChange}
                required
                placeholder="e.g. Bangladeshi"
              />
            </div>
            
            <div className="mb-4">
              <FormField
                label="Location (English)"
                name="location_en"
                value={personalInfo.location_en}
                onChange={handleInfoChange}
                required
                placeholder="e.g. Al Taawun - Sharjah, UAE"
              />
            </div>
            
            <div className="mb-4">
              <FormField
                label="Location (Bangla)"
                name="location_bn"
                value={personalInfo.location_bn}
                onChange={handleInfoChange}
                required
                placeholder="Location in Bangla"
              />
            </div>
            
            <div className="mb-4">
              <FormField
                label="Email"
                name="email"
                type="email"
                value={personalInfo.email}
                onChange={handleInfoChange}
                required
                placeholder="e.g. example@domain.com"
              />
            </div>
            
            <div className="mb-6">
              <FormField
                label="Phone"
                name="phone"
                value={personalInfo.phone}
                onChange={handleInfoChange}
                required
                placeholder="e.g. +971 54 123 4567"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={savingInfo}
                className={`px-6 py-2 rounded-md transition-colors ${
                  isDark 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } ${savingInfo ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {savingInfo ? 'Saving...' : 'Save Personal Info'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}