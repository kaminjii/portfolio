"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from '../../app/ThemeContext';
import useThemeClasses, { cx } from '../../app/ThemeUtils';

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorHidden, setCursorHidden] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const { theme } = useTheme();
  const classes = useThemeClasses();
  
  useEffect(() => {
    let rafId = null;
    
    const handleMouseMove = (e) => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
        setCursorHidden(false);
      });
    };
    
    const handleMouseLeave = () => {
      setCursorHidden(true);
    };
    
    const handleElementHover = () => {
      setIsHovering(true);
    };
    
    const handleElementLeave = () => {
      setIsHovering(false);
    };
    
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    
    const clickableElements = document.querySelectorAll('a, button, [role="button"]');
    clickableElements.forEach(el => {
      el.addEventListener('mouseenter', handleElementHover);
      el.addEventListener('mouseleave', handleElementLeave);
    });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      clickableElements.forEach(el => {
        el.removeEventListener('mouseenter', handleElementHover);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
      
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div 
      className={cx(
        "fixed w-6 h-6 rounded-full border-2 pointer-events-none z-60",
        theme === 'dark' ? "border-teal-400" : "border-teal-500",
        cursorHidden ? 'opacity-0' : 'opacity-70',
        isHovering ? 'scale-150' : ''
      )}
      style={{ 
        left: `${cursorPosition.x}px`, 
        top: `${cursorPosition.y}px`,
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.2s, opacity 0.2s',
        willChange: 'transform, opacity' 
      }}
    ></div>
  );
};

export default CustomCursor;
