"use client";

import { useTheme } from './ThemeContext';

export const cx = (...classNames) => {
  return classNames.filter(Boolean).join(' ');
};

const useThemeClasses = () => {
  const { theme } = useTheme();
  
  const getClass = (darkClass, lightClass) => {
    return theme === 'dark' ? darkClass : lightClass;
  };
  
  return {
    text: getClass('text-stone-100', 'text-stone-800'),
    textSecondary: getClass('text-stone-300', 'text-stone-600'),
    textMuted: getClass('text-stone-400', 'text-stone-500'),
    
    bg: getClass('bg-stone-950', 'bg-stone-50'),
    bgSecondary: getClass('bg-stone-900', 'bg-white'),
    bgTertiary: getClass('bg-stone-800/50', 'bg-stone-100'),
    
    border: getClass('border-stone-700', 'border-stone-200'),
    borderLight: getClass('border-stone-800', 'border-stone-100'),
    
    card: getClass(
      'bg-stone-900/30 border-stone-700', 
      'bg-white border-stone-200 shadow-soft'
    ),
    
    button: getClass(
      'bg-stone-800 text-stone-200 hover:bg-stone-700',
      'bg-stone-100 text-stone-800 hover:bg-stone-200'
    ),
    
    accent: 'text-blue-600',
    accentDark: 'text-blue-700',
    accentBg: 'bg-blue-600',
    accentBgLight: getClass('bg-blue-900/20', 'bg-blue-100'),
    accentBorder: 'border-blue-600',
    
    warmAccent: getClass('text-blue-500', 'text-blue-600'),
    warmBg: getClass('bg-stone-800/60', 'bg-blue-50/60'),
    
    getStyle: getClass,
  };
};

export default useThemeClasses;
