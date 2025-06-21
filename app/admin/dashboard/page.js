// app/admin/dashboard/page.js
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import api from '@/lib/api';

export default function Dashboard() {
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    experiences: 0,
    projects: 0,
    skills: 0,
    gallery: 0,
  });
  const [loading, setLoading] = useState(true);
  const [restoring, setRestoring] = useState(false);

  const fetchStats = async () => {
    try {
      const [experiences, projects, skills, gallery] = await Promise.all([
        api.get('/content/experience/'),
        api.get('/content/projects/'),
        api.get('/content/skills/'),
        api.get('/content/gallery/'),
      ]);

      setStats({
        experiences: experiences.data.length,
        projects: projects.data.length,
        skills: skills.data.length,
        gallery: gallery.data.length,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Modified handleRestoreDefaults function
const handleRestoreDefaults = async () => {
    if (confirm('Are you sure you want to restore all content to default values? This will overwrite any custom content.')) {
      setRestoring(true);
      try {
        // Try each endpoint individually for better error handling
        try {
          await api.post('/content/translations/restore_defaults/');
        } catch (error) {
          console.error('Error restoring translations:', error);
          // Try alternate method if available
          if (error.response?.status === 405) {
            await api.get('/content/translations/restore_defaults/');
          }
        }
        
        // Update backend to use main restore endpoint instead of individual ones
        await api.post('/api/restore-defaults', {
          sections: ['hero', 'about', 'experience', 'skills', 'projects', 'gallery', 'theme']
        });
        
        // Refresh stats
        await fetchStats();
        alert('Default content has been successfully restored!');
      } catch (error) {
        console.error('Error restoring defaults:', error);
        alert(`Error restoring defaults: ${error.message || 'Unknown error'}`);
      } finally {
        setRestoring(false);
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
          theme === 'dark' ? 'border-blue-400' : 'border-blue-500'
        }`}></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold text-gray-800`}>Dashboard</h2>
        
        <button
          onClick={handleRestoreDefaults}
          disabled={restoring}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            restoring
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700'
          } transition-colors`}
        >
          {restoring ? 'Restoring...' : 'Restore Default Content'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`p-6 rounded-lg shadow-md ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}>Experiences</h3>
          <p className="text-3xl font-bold text-blue-500 mt-2">{stats.experiences}</p>
        </div>
        
        <div className={`p-6 rounded-lg shadow-md ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}>Projects</h3>
          <p className="text-3xl font-bold text-green-500 mt-2">{stats.projects}</p>
        </div>
        
        <div className={`p-6 rounded-lg shadow-md ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}>Skills</h3>
          <p className="text-3xl font-bold text-purple-500 mt-2">{stats.skills}</p>
        </div>
        
        <div className={`p-6 rounded-lg shadow-md ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}>Gallery Items</h3>
          <p className="text-3xl font-bold text-yellow-500 mt-2">{stats.gallery}</p>
        </div>
      </div>
      
      <div className={`mt-8 p-6 rounded-lg shadow-md ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${
          theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
        }`}>Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className={`p-4 rounded-md transition-colors ${
            theme === 'dark'
              ? 'bg-blue-900/30 text-blue-300 hover:bg-blue-800/30'
              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
          }`}>
            Edit Hero Section
          </button>
          <button className={`p-4 rounded-md transition-colors ${
            theme === 'dark'
              ? 'bg-green-900/30 text-green-300 hover:bg-green-800/30'
              : 'bg-green-100 text-green-800 hover:bg-green-200'
          }`}>
            Add New Project
          </button>
          <button className={`p-4 rounded-md transition-colors ${
            theme === 'dark'
              ? 'bg-purple-900/30 text-purple-300 hover:bg-purple-800/30'
              : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
          }`}>
            Manage Color Schemes
          </button>
          <button className={`p-4 rounded-md transition-colors ${
            theme === 'dark'
              ? 'bg-yellow-900/30 text-yellow-300 hover:bg-yellow-800/30'
              : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
          }`}>
            Update Translations
          </button>
          <button className={`p-4 rounded-md transition-colors ${
            theme === 'dark'
              ? 'bg-red-900/30 text-red-300 hover:bg-red-800/30'
              : 'bg-red-100 text-red-800 hover:bg-red-200'
          }`}
          onClick={handleRestoreDefaults}
          disabled={restoring}
          >
            {restoring ? 'Restoring Defaults...' : 'Restore Defaults'}
          </button>
        </div>
      </div>
    </div>
  );
}