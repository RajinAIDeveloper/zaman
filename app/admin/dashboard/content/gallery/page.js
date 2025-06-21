'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import FormField from '@/components/admin/FormField';
import api from '@/lib/api';

export default function GalleryAdmin() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const emptyGalleryItem = {
    title_en: '',
    title_bn: '',
    category_en: '',
    category_bn: '',
    description_en: '',
    description_bn: '',
    image_url: '',
    order: 0
  };
  
  const [currentItem, setCurrentItem] = useState(emptyGalleryItem);
  
  useEffect(() => {
    fetchGalleryItems();
  }, []);
  
  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const response = await api.get('/content/gallery/');
      setGalleryItems(response.data);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      setErrorMessage('Failed to load gallery items. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({
      ...currentItem,
      [name]: name === 'order' ? parseInt(value, 10) : value
    });
  };
  
  const handleEdit = (item) => {
    setCurrentItem(item);
    setEditing(true);
  };
  
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;
    
    try {
      await api.delete(`/content/gallery/${id}/`);
      setGalleryItems(galleryItems.filter(item => item.id !== id));
      setSuccessMessage('Gallery item deleted successfully!');
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      setErrorMessage('Failed to delete gallery item. Please try again.');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      let response;
      
      if (currentItem.id) {
        // Update existing gallery item
        response = await api.put(`/content/gallery/${currentItem.id}/`, currentItem);
        
        // Update gallery items list
        setGalleryItems(galleryItems.map(item => 
          item.id === currentItem.id ? response.data : item
        ));
      } else {
        // Create new gallery item
        response = await api.post('/content/gallery/', currentItem);
        
        // Add to gallery items list
        setGalleryItems([...galleryItems, response.data]);
      }
      
      setSuccessMessage('Gallery item saved successfully!');
      setCurrentItem(emptyGalleryItem);
      setEditing(false);
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error saving gallery item:', error);
      setErrorMessage('Failed to save gallery item. Please check your inputs and try again.');
    } finally {
      setSaving(false);
    }
  };
  
  const cancelEdit = () => {
    setCurrentItem(emptyGalleryItem);
    setEditing(false);
  };
  
  // Get unique categories
  const getUniqueCategories = () => {
    const categories = galleryItems.map(item => item.category_en);
    return ['all', ...new Set(categories)];
  };
  
  // Filtered gallery items based on active category
  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category_en === activeCategory);

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
            Gallery
          </h2>
          <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your project gallery and showcase photos
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
            Add Gallery Item
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
        <form onSubmit={handleSubmit} className={`bg-opacity-60 rounded-lg shadow-md p-6 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            {currentItem.id ? 'Edit Gallery Item' : 'Add New Gallery Item'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FormField
              label="Title (English)"
              name="title_en"
              value={currentItem.title_en}
              onChange={handleInputChange}
              required
              placeholder="e.g. CCTV Installation"
            />
            
            <FormField
              label="Title (Bangla)"
              name="title_bn"
              value={currentItem.title_bn}
              onChange={handleInputChange}
              required
              placeholder="e.g. সিসিটিভি ইনস্টলেশন"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FormField
              label="Category (English)"
              name="category_en"
              value={currentItem.category_en}
              onChange={handleInputChange}
              required
              placeholder="e.g. Security"
            />
            
            <FormField
              label="Category (Bangla)"
              name="category_bn"
              value={currentItem.category_bn}
              onChange={handleInputChange}
              required
              placeholder="e.g. সিকিউরিটি"
            />
          </div>
          
          <div className="mb-4">
            <FormField
              label="Image URL"
              name="image_url"
              type="url"
              value={currentItem.image_url}
              onChange={handleInputChange}
              required
              placeholder="https://example.com/gallery-image.jpg"
            />
            
            {currentItem.image_url && (
              <div className="mt-2">
                <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Image Preview:</p>
                <img 
                  src={currentItem.image_url} 
                  alt="Gallery item preview" 
                  className="h-48 w-full object-cover rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder-gallery.png";
                  }}
                />
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FormField
              label="Description (English)"
              name="description_en"
              type="textarea"
              value={currentItem.description_en}
              onChange={handleInputChange}
              required
              placeholder="Brief description in English"
            />
            
            <FormField
              label="Description (Bangla)"
              name="description_bn"
              type="textarea"
              value={currentItem.description_bn}
              onChange={handleInputChange}
              required
              placeholder="Brief description in Bangla"
            />
          </div>
          
          <FormField
            label="Display Order"
            name="order"
            type="number"
            value={currentItem.order}
            onChange={handleInputChange}
            required
          />
          
          <div className="flex justify-end mt-6">
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
              {saving ? 'Saving...' : 'Save Gallery Item'}
            </button>
          </div>
        </form>
      ) : (
        <>
          {/* Category filter */}
          {galleryItems.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {getUniqueCategories().map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm transition-colors ${
                    activeCategory === category
                      ? isDark 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-600 text-white'
                      : isDark 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category === 'all' ? 'All Items' : category}
                </button>
              ))}
            </div>
          )}
          
          {/* Gallery grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredItems.length === 0 ? (
              <div className={`col-span-full text-center p-12 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {galleryItems.length === 0 
                    ? 'No gallery items added yet. Click "Add Gallery Item" to get started.'
                    : 'No gallery items match the selected category.'}
                </p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`relative overflow-hidden rounded-lg aspect-square group ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  } shadow-md`}
                >
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title_en}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className={`absolute inset-0 flex items-center justify-center ${
                      isDark ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 ${
                        isDark ? 'text-gray-600' : 'text-gray-400'
                      }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                  
                  <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-white font-medium text-lg">{item.title_en}</h3>
                    <span className="text-white/80 text-sm">{item.category_en}</span>
                  </div>
                  
                  <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-full bg-red-600/20 text-white hover:bg-red-600/40 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}