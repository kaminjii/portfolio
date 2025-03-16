"use client";

import React, { useRef, useState, useEffect } from 'react';

const TiltCard = ({ children, className = '', intensity = 10, perspective = 1000, glareOpacity = 0.2 }) => {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Handle mouse move for tilt effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card center (in percentages)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Set tilt position and glare position
    setPosition({ x, y });
    setGlarePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  
  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };
  
  // Set hovered state when mouse enters
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  // Get the transform style based on mouse position
  const getTransform = () => {
    if (!isHovered) return 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    
    const rotateX = position.y * intensity * -1; // Invert Y axis for natural tilt
    const rotateY = position.x * intensity;
    
    return `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };
  
  // Calculate shine gradient position
  const getGlareStyle = () => {
    if (!cardRef.current) return {};
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (glarePosition.x / rect.width) * 100;
    const y = (glarePosition.y / rect.height) * 100;
    
    return {
      background: `radial-gradient(circle at ${x}% ${y}%, rgba(255, 255, 255, ${glareOpacity}), transparent 40%)`,
      opacity: isHovered ? 1 : 0,
    };
  };
  
  // Update transforms when position changes
  useEffect(() => {
    if (!cardRef.current) return;
    
    cardRef.current.style.transform = getTransform();
  }, [position, isHovered]);
  
  return (
    <div 
      ref={cardRef} 
      className={`relative transition-transform duration-200 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      {/* Glare effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
        style={getGlareStyle()}
      />
      
      {/* Actual content */}
      <div 
        className="relative z-0"
        style={{ 
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
