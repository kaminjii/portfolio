"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const Header = ({ activeSection, sections, scrollToSection }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);
  
  // Add these refs for nav items
  const navRefs = sections.map(() => useRef(null));

  // Handle scroll behavior for nav bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      // Add background when scrolled
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

// In Header.js, update the handleNavClick function to call createRipple

const handleNavClick = (section, e) => {
  // Create a ripple effect
  const createRipple = (e) => {
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
  };
  
  // Call the ripple function with the event
  if (e) {
    createRipple(e);
  }
  
  setNavOpen(false);
  scrollToSection(section);
};
  
  // Add this function for magnetic effect
  const handleMouseMove = (e, index) => {
    const ref = navRefs[index];
    if (!ref.current) return;
    
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const centerX = width / 2;
    const centerY = height / 2;
    
    const moveX = (x - centerX) / 10;
    const moveY = (y - centerY) / 10;
    
    ref.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const handleMouseLeave = (index) => {
    if (navRefs[index].current) {
      navRefs[index].current.style.transform = 'translate(0, 0)';
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-40 py-4 px-6 transition-all duration-300
                   ${scrolled ? 'bg-gray-900/80 backdrop-blur-md shadow-md' : 'bg-transparent'}
                   ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        {/* Subtle gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-500/20 to-transparent opacity-50"></div>
        
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <div 
            className="text-2xl font-bold cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <span className="text-teal-400 transition-transform duration-300 inline-block group-hover:rotate-12">K</span>
            <span className="transition-transform duration-300 inline-block group-hover:-rotate-12">W</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {sections.map((section, index) => (
              <button
                key={section}
                ref={navRefs[index]}
                onClick={(e) => handleNavClick(section, e)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                className={`group relative text-sm font-medium uppercase tracking-widest px-1 py-2 transition-all duration-300 ${activeSection === section ? 'text-teal-400' : 'text-gray-400 hover:text-white'}`}
                style={{ transitionProperty: 'color, transform', transformStyle: 'preserve-3d' }}
              >
                {section !== 'home' && <span className="opacity-60 mr-1">0{index}</span>} {section}
                <span className={`absolute left-0 bottom-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 ${activeSection === section ? 'w-full' : 'group-hover:w-full'}`}></span>
              </button>
            ))}
          </div>
          
          {/* Mobile Navigation Button */}
          <button
            className="md:hidden text-gray-300 hover:text-teal-400 transition-colors z-50"
            onClick={() => setNavOpen(!navOpen)}
            aria-label={navOpen ? "Close menu" : "Open menu"}
          >
            {navOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>
      
      {/* Mobile Navigation Menu */}
      <div 
        className={`fixed inset-0 bg-gray-900/95 z-30 flex justify-center items-center transition-all duration-500 md:hidden
                   ${navOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col items-center space-y-8">
          {sections.map((section, index) => (
            <button
              key={section}
              onClick={() => handleNavClick(section)}
              className={`text-xl font-medium uppercase relative ${activeSection === section ? 'text-teal-400' : 'text-gray-300'}`}
            >
              <span className="opacity-60 mr-2">0{index + 1}.</span> {section}
              <span className={`absolute left-0 bottom-0 h-0.5 bg-teal-400 transition-all duration-300 ${activeSection === section ? 'w-full' : 'w-0'}`}></span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
