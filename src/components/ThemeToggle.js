"use client";

import React, { useState } from 'react';
import { useTheme } from '../app/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import useThemeClasses, { cx } from '../app/ThemeUtils';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const classes = useThemeClasses();
  
  return (
    <div className="fixed bottom-8 left-8 z-50">
      <button
        onClick={toggleTheme}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cx(
          "group relative p-4 rounded-full transition-all duration-500 overflow-hidden",
          theme === 'dark' 
            ? "bg-stone-800/80 hover:bg-stone-700/80 backdrop-blur-sm" 
            : "bg-white/80 hover:bg-stone-100/80 backdrop-blur-sm shadow-lg",
          isHovered ? "scale-110" : "scale-100"
        )}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {/* Background gradient on hover */}
        <div 
          className={cx(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            "bg-gradient-to-br from-blue-400/20 to-blue-400/20"
          )}
        />
        
        {/* Icon container */}
        <div className="relative w-5 h-5">
          {/* Sun icon */}
          <Sun 
            size={20} 
            className={cx(
              "absolute inset-0 transition-all duration-500",
              theme === 'light' 
                ? "opacity-100 rotate-0 text-blue-600" 
                : "opacity-0 rotate-90 text-blue-600"
            )}
          />
          
          {/* Moon icon */}
          <Moon 
            size={20} 
            className={cx(
              "absolute inset-0 transition-all duration-500",
              theme === 'dark' 
                ? "opacity-100 rotate-0 text-blue-400" 
                : "opacity-0 -rotate-90 text-blue-400"
            )}
          />
        </div>
        
        {/* Tooltip */}
        <div className={cx(
          "absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap pointer-events-none transition-all duration-300",
          theme === 'dark' ? "bg-stone-700 text-stone-200" : "bg-stone-800 text-stone-100",
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
        )}>
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
