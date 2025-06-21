'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import FormField from '@/components/admin/FormField';
import api from '@/lib/api';

export default function ExperienceAdmin() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const emptyExperience = {
    title_en: '',
    title_bn: '',
    company_en: '',
    company_bn: '',
    period_en: '',
    period_bn: '',
    location_en: '',
    location_bn: '',
    order: 0,
    responsibilities: [],
    projects: []
  };
  
  const [currentExperience, setCurrentExperience] = useState(emptyExperience);
  
  useEffect(() => {
    fetchExperiences();
  }, []);
  
  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const response = await api.get('/content/experience/');
      setExperiences(response.data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      setErrorMessage('Failed to load experiences. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentExperience({
      ...currentExperience,
      [name]: value
    });
  };
  
  const handleAddResponsibility = () => {
    setCurrentExperience({
      ...currentExperience,
      responsibilities: [
        ...currentExperience.responsibilities,
        { responsibility_en: '', responsibility_bn: '', order: currentExperience.responsibilities.length }
      ]
    });
  };
  
  const handleRemoveResponsibility = (index) => {
    const updatedResponsibilities = [...currentExperience.responsibilities];
    updatedResponsibilities.splice(index, 1);
    // Update orders
    const reorderedResponsibilities = updatedResponsibilities.map((r, i) => ({
      ...r,
      order: i
    }));
    
    setCurrentExperience({
      ...currentExperience,
      responsibilities: reorderedResponsibilities
    });
  };
  
  const handleResponsibilityChange = (index, field, value) => {
    const updatedResponsibilities = [...currentExperience.responsibilities];
    updatedResponsibilities[index] = {
      ...updatedResponsibilities[index],
      [field]: value
    };
    
    setCurrentExperience({
      ...currentExperience,
      responsibilities: updatedResponsibilities
    });
  };
  
  const handleAddProject = () => {
    setCurrentExperience({
      ...currentExperience,
      projects: [
        ...currentExperience.projects,
        { project_en: '', project_bn: '', order: currentExperience.projects.length }
      ]
    });
  };
  
  const handleRemoveProject = (index) => {
    const updatedProjects = [...currentExperience.projects];
    updatedProjects.splice(index, 1);
    // Update orders
    const reorderedProjects = updatedProjects.map((p, i) => ({
      ...p,
      order: i
    }));
    
    setCurrentExperience({
      ...currentExperience,
      projects: reorderedProjects
    });
  };
  
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...currentExperience.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    
    setCurrentExperience({
      ...currentExperience,
      projects: updatedProjects
    });
  };
  
  const handleEdit = (experience) => {
    setCurrentExperience(experience);
    setEditing(true);
  };
  
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    
    try {
      await api.delete(`/content/experience/${id}/`);
      setExperiences(experiences.filter(exp => exp.id !== id));
      setSuccessMessage('Experience deleted successfully!');
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error deleting experience:', error);
      setErrorMessage('Failed to delete experience. Please try again.');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      let response;
      
      if (currentExperience.id) {
        // Update existing experience
        response = await api.put(`/content/experience/${currentExperience.id}/`, currentExperience);
        
        // Update experiences list
        setExperiences(experiences.map(exp => 
          exp.id === currentExperience.id ? response.data : exp
        ));
      } else {
        // Create new experience
        response = await api.post('/content/experience/', currentExperience);
        
        // Add to experiences list
        setExperiences([...experiences, response.data]);
      }
      
      setSuccessMessage('Experience saved successfully!');
      setCurrentExperience(emptyExperience);
      setEditing(false);
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error saving experience:', error);
      setErrorMessage('Failed to save experience. Please check your inputs and try again.');
    } finally {
      setSaving(false);
    }
  };
  
  const cancelEdit = () => {
    setCurrentExperience(emptyExperience);
    setEditing(false);
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
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Work Experience
          </h2>
          <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your professional experience
          </p>
        </div>
        
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className={`px-4 py-2 rounded-md ${
              isDark 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } transition-colors flex items-center`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Experience
          </button>
        )}
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
      
      {editing ? (
        <form onSubmit={handleSubmit}>
          <div className={`bg-opacity-60 rounded-lg shadow-md p-6 mb-6 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              {currentExperience.id ? 'Edit Experience' : 'Add New Experience'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormField
                label="Job Title (English)"
                name="title_en"
                value={currentExperience.title_en}
                onChange={handleInputChange}
                required
              />
              
              <FormField
                label="Job Title (Bangla)"
                name="title_bn"
                value={currentExperience.title_bn}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormField
                label="Company (English)"
                name="company_en"
                value={currentExperience.company_en}
                onChange={handleInputChange}
                required
              />
              
              <FormField
                label="Company (Bangla)"
                name="company_bn"
                value={currentExperience.company_bn}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormField
                label="Period (English)"
                name="period_en"
                value={currentExperience.period_en}
                onChange={handleInputChange}
                required
                placeholder="e.g. Jan 2020 - Present"
              />
              
              <FormField
                label="Period (Bangla)"
                name="period_bn"
                value={currentExperience.period_bn}
                onChange={handleInputChange}
                required
                placeholder="e.g. জানুয়ারি ২০২০ - বর্তমান"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormField
                label="Location (English)"
                name="location_en"
                value={currentExperience.location_en}
                onChange={handleInputChange}
                required
                placeholder="e.g. Dubai, UAE"
              />
              
              <FormField
                label="Location (Bangla)"
                name="location_bn"
                value={currentExperience.location_bn}
                onChange={handleInputChange}
                required
                placeholder="e.g. দুবাই, ইউএই"
              />
            </div>
            
            <FormField
              label="Display Order"
              name="order"
              type="number"
              value={currentExperience.order}
              onChange={handleInputChange}
              required
            />
          </div>
          
          {/* Responsibilities */}
          <div className={`bg-opacity-60 rounded-lg shadow-md p-6 mb-6 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                Responsibilities
              </h3>
              
              <button
                type="button"
                onClick={handleAddResponsibility}
                className={`px-3 py-1 rounded-md text-sm flex items-center ${
                  isDark 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } transition-colors`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Responsibility
              </button>
            </div>
            
            {currentExperience.responsibilities.length === 0 ? (
              <p className={`text-center py-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                No responsibilities added yet. Click 'Add Responsibility' to add one.
              </p>
            ) : (
              <div className="space-y-4">
                {currentExperience.responsibilities.map((resp, index) => (
                  <div key={index} className={`p-4 rounded-md border ${isDark ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                        Responsibility #{index + 1}
                      </h4>
                      
                      <button
                        type="button"
                        onClick={() => handleRemoveResponsibility(index)}
                        className={`p-1 rounded-full ${isDark ? 'text-red-400 hover:bg-red-900/30' : 'text-red-600 hover:bg-red-100'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="mb-3">
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        English
                      </label>
                      <textarea
                        value={resp.responsibility_en}
                        onChange={(e) => handleResponsibilityChange(index, 'responsibility_en', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          isDark 
                            ? 'bg-gray-600 border-gray-600 text-white focus:ring-blue-500' 
                            : 'border-gray-300 focus:ring-blue-500'
                        }`}
                        rows="2"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Bangla
                      </label>
                      <textarea
                        value={resp.responsibility_bn}
                        onChange={(e) => handleResponsibilityChange(index, 'responsibility_bn', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          isDark 
                            ? 'bg-gray-600 border-gray-600 text-white focus:ring-blue-500' 
                            : 'border-gray-300 focus:ring-blue-500'
                        }`}
                        rows="2"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Projects */}
          <div className={`bg-opacity-60 rounded-lg shadow-md p-6 mb-6 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                Key Projects
              </h3>
              
              <button
                type="button"
                onClick={handleAddProject}
                className={`px-3 py-1 rounded-md text-sm flex items-center ${
                  isDark 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } transition-colors`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Project
              </button>
            </div>
            
            {currentExperience.projects.length === 0 ? (
              <p className={`text-center py-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                No projects added yet. Click 'Add Project' to add one.
              </p>
            ) : (
              <div className="space-y-4">
                {currentExperience.projects.map((project, index) => (
                  <div key={index} className={`p-4 rounded-md border ${isDark ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                        Project #{index + 1}
                      </h4>
                      
                      <button
                        type="button"
                        onClick={() => handleRemoveProject(index)}
                        className={`p-1 rounded-full ${isDark ? 'text-red-400 hover:bg-red-900/30' : 'text-red-600 hover:bg-red-100'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="mb-3">
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        English
                      </label>
                      <textarea
                        value={project.project_en}
                        onChange={(e) => handleProjectChange(index, 'project_en', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          isDark 
                            ? 'bg-gray-600 border-gray-600 text-white focus:ring-blue-500' 
                            : 'border-gray-300 focus:ring-blue-500'
                        }`}
                        rows="2"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Bangla
                      </label>
                      <textarea
                        value={project.project_bn}
                        onChange={(e) => handleProjectChange(index, 'project_bn', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          isDark 
                            ? 'bg-gray-600 border-gray-600 text-white focus:ring-blue-500' 
                            : 'border-gray-300 focus:ring-blue-500'
                        }`}
                        rows="2"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={cancelEdit}
              className={`px-4 py-2 mr-2 rounded-md transition-colors ${
                isDark 
                  ? 'bg-gray-600 text-white hover:bg-gray-700' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              } ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={saving}
            >
              Cancel
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
              {saving ? 'Saving...' : 'Save Experience'}
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {experiences.length === 0 ? (
            <div className={`text-center p-8 rounded-md ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                No experiences added yet. Click 'Add Experience' to get started.
              </p>
            </div>
          ) : (
            experiences.map((exp) => (
              <div 
                key={exp.id} 
                className={`rounded-lg shadow-md overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className={`px-6 py-4 ${isDark ? 'border-b border-gray-700' : 'border-b'}`}>
                  <div className="flex justify-between">
                    <div>
                      <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {exp.title_en}
                      </h3>
                      <p className={`${isDark ? 'text-blue-400' : 'text-blue-600'} font-medium`}>
                        {exp.company_en}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <span className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {exp.period_en}
                        </span>
                        <span className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {exp.location_en}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(exp)}
                        className={`p-2 rounded-md ${
                          isDark 
                            ? 'hover:bg-gray-700 text-blue-400' 
                            : 'hover:bg-gray-100 text-blue-600'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => handleDelete(exp.id)}
                        className={`p-2 rounded-md ${
                          isDark 
                            ? 'hover:bg-red-900/30 text-red-400' 
                            : 'hover:bg-red-100 text-red-600'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4">
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <div className="mb-4">
                      <h4 className={`font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Responsibilities:
                      </h4>
                      <ul className={`list-disc pl-5 space-y-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {exp.responsibilities.map((resp, index) => (
                          <li key={index}>{resp.responsibility_en}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {exp.projects && exp.projects.length > 0 && (
                    <div>
                      <h4 className={`font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Key Projects:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.projects.map((project, index) => (
                          <span 
                            key={index}
                            className={`px-3 py-1 rounded-full text-sm ${
                              isDark 
                                ? 'bg-blue-900/30 text-blue-300' 
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {project.project_en}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}