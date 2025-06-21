'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import FormField from '@/components/admin/FormField';
import api from '@/lib/api';

export default function SkillsAdmin() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // State for skills
  const [skills, setSkills] = useState([]);
  const [skillCategories, setSkillCategories] = useState([]);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingSkill, setEditingSkill] = useState(false);
  const [currentSkill, setCurrentSkill] = useState({
    name_en: '',
    name_bn: '',
    category: 'elv',
    level: 80,
    label_en: '',
    label_bn: '',
    order: 0
  });
  
  // State for certifications
  const [certifications, setCertifications] = useState([]);
  const [loadingCerts, setLoadingCerts] = useState(true);
  const [editingCert, setEditingCert] = useState(false);
  const [currentCert, setCurrentCert] = useState({
    name_en: '',
    name_bn: '',
    file_url: '',
    icon: '🎓',
    order: 0
  });
  
  // Status messages
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [savingSkill, setSavingSkill] = useState(false);
  const [savingCert, setSavingCert] = useState(false);
  
  useEffect(() => {
    fetchSkillsData();
    fetchCertifications();
  }, []);
  
  const fetchSkillsData = async () => {
    try {
      setLoadingSkills(true);
      const response = await api.get('/content/skills/');
      setSkills(response.data);
      
      // Extract unique categories from skills
      const categories = [
        { value: 'elv', label: 'ELV Systems' },
        { value: 'tech', label: 'Technical Skills' },
        { value: 'design', label: 'Design & Development' },
        { value: 'lang', label: 'Languages' }
      ];
      setSkillCategories(categories);
    } catch (error) {
      console.error('Error fetching skills:', error);
      setErrorMessage('Failed to load skills. Please try again.');
    } finally {
      setLoadingSkills(false);
    }
  };
  
  const fetchCertifications = async () => {
    try {
      setLoadingCerts(true);
      const response = await api.get('/content/certifications/');
      setCertifications(response.data);
    } catch (error) {
      console.error('Error fetching certifications:', error);
      setErrorMessage('Failed to load certifications. Please try again.');
    } finally {
      setLoadingCerts(false);
    }
  };
  
  // Skills handlers
  const handleEditSkill = (skill) => {
    setCurrentSkill(skill);
    setEditingSkill(true);
  };
  
  const handleAddNewSkill = () => {
    setCurrentSkill({
      name_en: '',
      name_bn: '',
      category: 'elv',
      level: 80,
      label_en: '',
      label_bn: '',
      order: skills.length
    });
    setEditingSkill(true);
  };
  
  const handleSkillInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSkill({
      ...currentSkill,
      [name]: name === 'level' || name === 'order' ? parseInt(value, 10) : value
    });
  };
  
  const handleDeleteSkill = async (id) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    
    try {
      await api.delete(`/content/skills/${id}/`);
      setSkills(skills.filter(skill => skill.id !== id));
      setSuccessMessage('Skill deleted successfully!');
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error deleting skill:', error);
      setErrorMessage('Failed to delete skill. Please try again.');
    }
  };
  
  const handleSubmitSkill = async (e) => {
    e.preventDefault();
    setSavingSkill(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      let response;
      
      if (currentSkill.id) {
        // Update existing skill
        response = await api.put(`/content/skills/${currentSkill.id}/`, currentSkill);
        
        // Update skills list
        setSkills(skills.map(skill => 
          skill.id === currentSkill.id ? response.data : skill
        ));
      } else {
        // Create new skill
        response = await api.post('/content/skills/', currentSkill);
        
        // Add to skills list
        setSkills([...skills, response.data]);
      }
      
      setSuccessMessage('Skill saved successfully!');
      setEditingSkill(false);
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error saving skill:', error);
      setErrorMessage('Failed to save skill. Please check your inputs and try again.');
    } finally {
      setSavingSkill(false);
    }
  };
  
  // Certification handlers
  const handleEditCert = (cert) => {
    setCurrentCert(cert);
    setEditingCert(true);
  };
  
  const handleAddNewCert = () => {
    setCurrentCert({
      name_en: '',
      name_bn: '',
      file_url: '',
      icon: '🎓',
      order: certifications.length
    });
    setEditingCert(true);
  };
  
  const handleCertInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCert({
      ...currentCert,
      [name]: name === 'order' ? parseInt(value, 10) : value
    });
  };
  
  const handleDeleteCert = async (id) => {
    if (!confirm('Are you sure you want to delete this certification?')) return;
    
    try {
      await api.delete(`/content/certifications/${id}/`);
      setCertifications(certifications.filter(cert => cert.id !== id));
      setSuccessMessage('Certification deleted successfully!');
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error deleting certification:', error);
      setErrorMessage('Failed to delete certification. Please try again.');
    }
  };
  
  const handleSubmitCert = async (e) => {
    e.preventDefault();
    setSavingCert(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      let response;
      
      if (currentCert.id) {
        // Update existing certification
        response = await api.put(`/content/certifications/${currentCert.id}/`, currentCert);
        
        // Update certifications list
        setCertifications(certifications.map(cert => 
          cert.id === currentCert.id ? response.data : cert
        ));
      } else {
        // Create new certification
        response = await api.post('/content/certifications/', currentCert);
        
        // Add to certifications list
        setCertifications([...certifications, response.data]);
      }
      
      setSuccessMessage('Certification saved successfully!');
      setEditingCert(false);
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error saving certification:', error);
      setErrorMessage('Failed to save certification. Please check your inputs and try again.');
    } finally {
      setSavingCert(false);
    }
  };
  
  const getCategoryLabel = (categoryValue) => {
    const category = skillCategories.find(cat => cat.value === categoryValue);
    return category ? category.label : categoryValue;
  };
  
  // Filtered skills based on selected category
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  if (loadingSkills || loadingCerts) {
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
      {/* Title section */}
      <div className="mb-6">
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Skills & Certifications
        </h2>
        <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Manage your technical skills and professional certifications
        </p>
      </div>
      
      {/* Status messages */}
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
      
      {/* Skills Section */}
      <div className={`bg-opacity-60 rounded-lg shadow-md p-6 mb-8 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-xl font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Skills
          </h3>
          
          {!editingSkill && (
            <button
              onClick={handleAddNewSkill}
              className={`px-4 py-2 rounded-md ${
                isDark 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } transition-colors flex items-center`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Skill
            </button>
          )}
        </div>
        
        {editingSkill ? (
          <form onSubmit={handleSubmitSkill}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormField
                label="Skill Name (English)"
                name="name_en"
                value={currentSkill.name_en}
                onChange={handleSkillInputChange}
                required
                placeholder="e.g. Home Automation"
              />
              
              <FormField
                label="Skill Name (Bangla)"
                name="name_bn"
                value={currentSkill.name_bn}
                onChange={handleSkillInputChange}
                required
                placeholder="e.g. হোম অটোমেশন"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormField
                label="Category"
                name="category"
                type="select"
                value={currentSkill.category}
                onChange={handleSkillInputChange}
                required
                options={skillCategories}
              />
              
              <FormField
                label="Display Order"
                name="order"
                type="number"
                value={currentSkill.order}
                onChange={handleSkillInputChange}
                required
              />
            </div>
            
            <div className="mb-4">
              <FormField
                label="Skill Level (0-100)"
                name="level"
                type="number"
                value={currentSkill.level}
                onChange={handleSkillInputChange}
                required
              />
              
              <div className={`h-2 mt-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
                <div
                  className="h-full rounded bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${currentSkill.level}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <FormField
                label="Label (English, optional)"
                name="label_en"
                value={currentSkill.label_en || ''}
                onChange={handleSkillInputChange}
                placeholder="e.g. Fluent (for languages)"
              />
              
              <FormField
                label="Label (Bangla, optional)"
                name="label_bn"
                value={currentSkill.label_bn || ''}
                onChange={handleSkillInputChange}
                placeholder="e.g. স্বাচ্ছন্দ্যময় (for languages)"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setEditingSkill(false)}
                className={`px-4 py-2 mr-2 rounded-md transition-colors ${
                  isDark 
                    ? 'bg-gray-600 text-white hover:bg-gray-700' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                } ${savingSkill ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={savingSkill}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={savingSkill}
                className={`px-6 py-2 rounded-md transition-colors ${
                  isDark 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } ${savingSkill ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {savingSkill ? 'Saving...' : 'Save Skill'}
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  selectedCategory === 'all'
                    ? isDark 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-600 text-white'
                    : isDark 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              
              {skillCategories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-md text-sm transition-colors ${
                    selectedCategory === category.value
                      ? isDark 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-600 text-white'
                      : isDark 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
            
            {filteredSkills.length === 0 ? (
              <p className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                No skills found in this category. Click 'Add Skill' to add one.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className={`p-4 rounded-md border ${
                      isDark ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                          {skill.name_en}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded ${
                            isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
                          }`}>
                            {getCategoryLabel(skill.category)}
                          </span>
                          {skill.label_en && (
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {skill.label_en}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleEditSkill(skill)}
                          className={`p-1 rounded-md ${
                            isDark 
                              ? 'hover:bg-gray-600 text-blue-400' 
                              : 'hover:bg-gray-200 text-blue-600'
                          }`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        
                        <button
                          onClick={() => handleDeleteSkill(skill.id)}
                          className={`p-1 rounded-md ${
                            isDark 
                              ? 'hover:bg-red-900/30 text-red-400' 
                              : 'hover:bg-red-100 text-red-600'
                          }`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className={`h-2 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-200'} overflow-hidden`}>
                      <div
                        className="h-full rounded bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Certifications Section */}
      <div className={`bg-opacity-60 rounded-lg shadow-md p-6 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-xl font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Certifications
          </h3>
          
          {!editingCert && (
            <button
              onClick={handleAddNewCert}
              className={`px-4 py-2 rounded-md ${
                isDark 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } transition-colors flex items-center`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Certification
            </button>
          )}
        </div>
        
        {editingCert ? (
          <form onSubmit={handleSubmitCert}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormField
                label="Certificate Name (English)"
                name="name_en"
                value={currentCert.name_en}
                onChange={handleCertInputChange}
                required
                placeholder="e.g. VIMAR Home Automation"
              />
              
              <FormField
                label="Certificate Name (Bangla)"
                name="name_bn"
                value={currentCert.name_bn}
                onChange={handleCertInputChange}
                required
                placeholder="e.g. ভিমার হোম অটোমেশন"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormField
                label="File URL"
                name="file_url"
                type="url"
                value={currentCert.file_url}
                onChange={handleCertInputChange}
                required
                placeholder="https://example.com/certificate-file.pdf"
              />
              
              <FormField
                label="Display Order"
                name="order"
                type="number"
                value={currentCert.order}
                onChange={handleCertInputChange}
                required
              />
            </div>
            
            <div className="mb-6">
              <FormField
                label="Icon (Emoji)"
                name="icon"
                value={currentCert.icon}
                onChange={handleCertInputChange}
                required
                placeholder="🎓"
              />
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Enter an emoji character that represents this certification (e.g. 🎓 for education, 🏠 for home automation)
              </p>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setEditingCert(false)}
                className={`px-4 py-2 mr-2 rounded-md transition-colors ${
                  isDark 
                    ? 'bg-gray-600 text-white hover:bg-gray-700' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                } ${savingCert ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={savingCert}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={savingCert}
                className={`px-6 py-2 rounded-md transition-colors ${
                  isDark 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } ${savingCert ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {savingCert ? 'Saving...' : 'Save Certification'}
              </button>
            </div>
          </form>
        ) : (
          <>
            {certifications.length === 0 ? (
              <p className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                No certifications added yet. Click 'Add Certification' to add one.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className={`p-4 rounded-md border ${
                      isDark ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'
                    } relative`}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl" role="img" aria-label="certificate icon">
                          {cert.icon}
                        </span>
                        <div>
                          <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            {cert.name_en}
                          </h4>
                          <a 
                            href={cert.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm ${
                              isDark ? 'text-blue-400 hover:underline' : 'text-blue-600 hover:underline'
                            }`}
                          >
                            View Certificate
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <button
                        onClick={() => handleEditCert(cert)}
                        className={`p-1 rounded-md ${
                          isDark 
                            ? 'hover:bg-gray-600 text-blue-400' 
                            : 'hover:bg-gray-200 text-blue-600'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => handleDeleteCert(cert.id)}
                        className={`p-1 rounded-md ${
                          isDark 
                            ? 'hover:bg-red-900/30 text-red-400' 
                            : 'hover:bg-red-100 text-red-600'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}