"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from '../app/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import useThemeClasses, { cx } from '../app/ThemeUtils';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const classes = useThemeClasses();
  
  // Create a ripple effect on click
  const handleClick = (e) => {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - diameter / 2}px`;
    circle.style.top = `${e.clientY - button.offsetTop - diameter / 2}px`;
    circle.classList.add('ripple');
    
    const ripple = button.querySelector('.ripple');
    if (ripple) {
      ripple.remove();
    }
    
    button.appendChild(circle);
    
    // Add animation state
    setIsAnimating(true);
    
    // Toggle theme after ripple effect
    setTimeout(() => {
      toggleTheme();
      
      // Remove animation state after theme change
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 150);
  };

  const buttonClasses = cx(
    "fixed z-50 bottom-6 right-6 p-3 rounded-full shadow-lg border transition-all duration-300 overflow-hidden",
    theme === 'light' 
      ? "bg-white text-blue-400 hover:bg-gray-50 border-gray-200" 
      : "bg-gray-800 text-teal-400 hover:bg-gray-700 border-gray-700",
    isHovered ? "scale-110" : "scale-100",
    isAnimating ? "animate-pulse" : ""
  );
  
  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={buttonClasses}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative">
        {/* Sun icon for light mode */}
        <Sun 
          size={24} 
          className={cx(
            "transition-all duration-500",
            theme === 'light' 
              ? "rotate-0 opacity-100 scale-100" 
              : "rotate-90 opacity-0 scale-0 absolute top-0 left-0"
          )}
        />
        
        {/* Moon icon for dark mode */}
        <Moon 
          size={24} 
          className={cx(
            "transition-all duration-500",
            theme === 'dark' 
              ? "rotate-0 opacity-100 scale-100" 
              : "-rotate-90 opacity-0 scale-0 absolute top-0 left-0"
          )}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
