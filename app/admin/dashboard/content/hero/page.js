'use client';

import { useState, useEffect } from 'react';
import FormField from '@/components/admin/FormField';
import { useTheme } from '@/context/ThemeContext';
import api from '@/lib/api';

export default function HeroAdmin() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [heroData, setHeroData] = useState({
    role_en: '',
    role_bn: '',
    description_en: '',
    description_bn: '',
    profile_image_url: '',
    cv_download_url: ''
  });

  useEffect(() => {
    fetchHeroData();
  }, []);
  
  const fetchHeroData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/content/hero/get_active/');
      setHeroData(response.data);
    } catch (error) {
      console.error('Error fetching hero data:', error);
      setErrorMessage('Failed to load hero section data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHeroData({
      ...heroData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      // Check if we have an existing record or need to create a new one
      const method = heroData.id ? 'put' : 'post';
      const endpoint = heroData.id ? `/content/hero/${heroData.id}/` : '/content/hero/';
      
      const response = await api[method](endpoint, heroData);
      
      setHeroData(response.data);
      setSuccessMessage('Hero section updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error saving hero data:', error);
      setErrorMessage('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
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
          Hero Section
        </h2>
        <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Edit your portfolio's hero section content
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
      
      <form onSubmit={handleSubmit}>
        <div className={`bg-opacity-60 rounded-lg shadow-md p-6 mb-6 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            English Content
          </h3>
          
          <FormField
            label="Role/Title"
            name="role_en"
            value={heroData.role_en}
            onChange={handleInputChange}
            required
            placeholder="e.g. ELV Technician & IT Professional"
          />
          
          <FormField
            label="Description"
            name="description_en"
            type="textarea"
            value={heroData.description_en}
            onChange={handleInputChange}
            required
            placeholder="Describe your professional background, expertise and goals"
          />
        </div>
        
        <div className={`bg-opacity-60 rounded-lg shadow-md p-6 mb-6 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Bangla Content
          </h3>
          
          <FormField
            label="Role/Title (Bangla)"
            name="role_bn"
            value={heroData.role_bn}
            onChange={handleInputChange}
            required
            placeholder="e.g. ইএলভি টেকনিশিয়ান এবং আইটি পেশাদার"
          />
          
          <FormField
            label="Description (Bangla)"
            name="description_bn"
            type="textarea"
            value={heroData.description_bn}
            onChange={handleInputChange}
            required
            placeholder="Describe your professional background in Bangla"
          />
        </div>
        
        <div className={`bg-opacity-60 rounded-lg shadow-md p-6 mb-6 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Media
          </h3>
          
          <FormField
            label="Profile Image URL"
            name="profile_image_url"
            type="url"
            value={heroData.profile_image_url}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
          />
          
          {heroData.profile_image_url && (
            <div className="mb-4">
              <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Image Preview:</p>
              <img 
                src={heroData.profile_image_url} 
                alt="Profile preview" 
                className="h-32 w-32 object-cover rounded-full border-2 border-gray-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder-profile.png";
                }}
              />
            </div>
          )}
          
          <FormField
            label="CV Download URL"
            name="cv_download_url"
            type="url"
            value={heroData.cv_download_url}
            onChange={handleInputChange}
            placeholder="https://example.com/your-cv.pdf"
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={fetchHeroData}
            disabled={loading || saving}
            className={`px-4 py-2 mr-2 rounded-md transition-colors ${
              isDark 
                ? 'bg-gray-600 text-white hover:bg-gray-700' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            } ${(loading || saving) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Reset
          </button>
          
          <button
            type="submit"
            disabled={saving}
            className={`px-6 py-2 rounded-md transition-colors ${
              isDark 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}