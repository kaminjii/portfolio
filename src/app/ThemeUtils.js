"use client";

import { useTheme } from './ThemeContext';

// Utility function to combine class names
export const cx = (...classNames) => {
  return classNames.filter(Boolean).join(' ');
};

// Custom hook to provide theme-dependent classes
const useThemeClasses = () => {
  const { theme } = useTheme();
  
  const getClass = (darkClass, lightClass) => {
    return theme === 'dark' ? darkClass : lightClass;
  };
  
  return {
    // Text colors
    text: getClass('text-gray-100', 'text-gray-900'),
    textSecondary: getClass('text-gray-300', 'text-gray-600'),
    textMuted: getClass('text-gray-400', 'text-gray-500'),
    
    // Background colors
    bg: getClass('bg-gray-900', 'bg-gray-50'),
    bgSecondary: getClass('bg-gray-800', 'bg-white'),
    bgTertiary: getClass('bg-gray-800/50', 'bg-gray-100'),
    
    // Border colors
    border: getClass('border-gray-700', 'border-gray-200'),
    borderLight: getClass('border-gray-800', 'border-gray-100'),
    
    // Card styles
    card: getClass(
      'bg-gray-800/30 border-gray-700', 
      'bg-white border-gray-200 shadow-sm'
    ),
    
    // Button styles
    button: getClass(
      'bg-gray-800 text-gray-200 hover:bg-gray-700',
      'bg-gray-100 text-gray-800 hover:bg-gray-200'
    ),
    
    // Accent (teal) remains consistent in both modes
    accent: 'text-teal-400',
    accentBg: 'bg-teal-400',
    accentBgLight: getClass('bg-teal-900/20', 'bg-teal-100'),
    accentBorder: 'border-teal-400',
    
    // Get a custom style for both themes
    getStyle: getClass,
  };
};

export default useThemeClasses;
