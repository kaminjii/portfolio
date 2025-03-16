"use client";

import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorHidden, setCursorHidden] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    // Use requestAnimationFrame for smoother animation
    let rafId = null;
    
    const handleMouseMove = (e) => {
      // Cancel any pending animation frame
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      // Schedule cursor update on next animation frame
      rafId = requestAnimationFrame(() => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
        setCursorHidden(false);
      });
    };
    
    const handleMouseLeave = () => {
      setCursorHidden(true);
    };
    
    // Track hovering over clickable elements
    const handleElementHover = () => {
      setIsHovering(true);
    };
    
    const handleElementLeave = () => {
      setIsHovering(false);
    };
    
    // Add event listeners for cursor
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Add event listeners for clickable elements
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

  // Simplify the cursor to just one element for better performance
  return (
    <div 
      className={`fixed w-6 h-6 rounded-full border-2 border-teal-400 pointer-events-none z-60 
                 ${cursorHidden ? 'opacity-0' : 'opacity-70'} 
                 ${isHovering ? 'scale-150' : ''}`}
      style={{ 
        left: `${cursorPosition.x}px`, 
        top: `${cursorPosition.y}px`,
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.2s, opacity 0.2s',
        willChange: 'transform, opacity' // Performance optimization
      }}
    ></div>
  );
};

export default CustomCursor;