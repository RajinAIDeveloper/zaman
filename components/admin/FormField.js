// components/admin/FormField.jsx
'use client';

import { useTheme } from '@/context/ThemeContext';

const FormField = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  placeholder = '', 
  required = false,
  options = [],
  rows = 4
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const renderField = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            rows={rows}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              error 
                ? 'border-red-500 focus:ring-red-500' 
                : isDark 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                  : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
        );
      case 'select':
        return (
          <select
            id={name}
            name={name}
            value={value || ''}
            onChange={onChange}
            required={required}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              error 
                ? 'border-red-500 focus:ring-red-500' 
                : isDark 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                  : 'border-gray-300 focus:ring-blue-500'
            }`}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'number':
        return (
          <input
            type="number"
            id={name}
            name={name}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              error 
                ? 'border-red-500 focus:ring-red-500' 
                : isDark 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                  : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
        );
      case 'color':
        return (
          <div className="flex items-center">
            <input
              type="color"
              id={name}
              name={name}
              value={value || '#000000'}
              onChange={onChange}
              required={required}
              className="h-10 w-10 border rounded-md cursor-pointer"
            />
            <input 
              type="text"
              value={value || ''}
              onChange={onChange}
              name={name}
              className={`ml-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                error 
                  ? 'border-red-500 focus:ring-red-500' 
                  : isDark 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                    : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="#RRGGBB"
            />
          </div>
        );
      case 'url':
        return (
          <input
            type="url"
            id={name}
            name={name}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              error 
                ? 'border-red-500 focus:ring-red-500' 
                : isDark 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                  : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
        );
      default:
        return (
          <input
            type={type}
            id={name}
            name={name}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              error 
                ? 'border-red-500 focus:ring-red-500' 
                : isDark 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                  : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
        );
    }
  };

  return (
    <div className="mb-4">
      <label 
        htmlFor={name} 
        className={`block font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {renderField()}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormField;