"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../app/ThemeContext';
import useThemeClasses, { cx } from '../../app/ThemeUtils';

const SmoothCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorHidden, setCursorHidden] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const { theme } = useTheme();
  const requestRef = useRef();
  
  // Smooth cursor following with lerp
  useEffect(() => {
    const lerp = (start, end, factor) => {
      return start + (end - start) * factor;
    };
    
    const animate = () => {
      setCursorPosition(prev => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15)
      }));
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [mousePosition]);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setCursorHidden(false);
    };
    
    const handleMouseLeave = () => {
      setCursorHidden(true);
    };
    
    const handleMouseDown = () => {
      setIsClicking(true);
    };
    
    const handleMouseUp = () => {
      setIsClicking(false);
    };
    
    const handleElementHover = () => {
      setIsHovering(true);
    };
    
    const handleElementLeave = () => {
      setIsHovering(false);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleElementHover);
      el.addEventListener('mouseleave', handleElementLeave);
    });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleElementHover);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, []);
  
  // Only show on desktop
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <div 
        className={cx(
          "fixed w-3 h-3 rounded-full pointer-events-none z-[100] transition-opacity duration-300",
          theme === 'dark' ? "bg-blue-400" : "bg-blue-600",
          cursorHidden ? 'opacity-0' : 'opacity-100',
          isClicking ? 'scale-75' : 'scale-100'
        )}
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.1s ease-out'
        }}
      />
      
      {/* Cursor ring */}
      <div 
        className={cx(
          "fixed w-8 h-8 rounded-full border-2 pointer-events-none z-[99] transition-all duration-300",
          theme === 'dark' ? "border-blue-400/50" : "border-blue-600/50",
          cursorHidden ? 'opacity-0' : 'opacity-70',
          isHovering ? 'scale-150 border-opacity-100' : '',
          isClicking ? 'scale-90' : ''
        )}
        style={{ 
          left: `${cursorPosition.x}px`, 
          top: `${cursorPosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};

export default SmoothCursor;
