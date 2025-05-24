"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../app/ThemeContext';
import useThemeClasses, { cx } from '../app/ThemeUtils';

const Header = ({ activeSection, sections, scrollToSection }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);
  const { theme } = useTheme();
  const classes = useThemeClasses();
  
  const navRefs = useMemo(() => sections.map(() => ({ current: null })), [sections]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
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

  const handleNavClick = (section, e) => {
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
    
    if (e) {
      createRipple(e);
    }
    
    setNavOpen(false);
    scrollToSection(section);
  };
  
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
        className={cx(
          "fixed top-0 w-full z-40 py-4 px-6 transition-all duration-300",
          scrolled 
            ? theme === 'dark' 
              ? "bg-gray-900/80 backdrop-blur-md shadow-md" 
              : "bg-white/80 backdrop-blur-md shadow-md"
            : "bg-transparent",
          hidden ? '-translate-y-full' : 'translate-y-0'
        )}
      >
        {/* Subtle gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-500/20 to-transparent opacity-50"></div>
        
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <div 
            className="text-2xl font-bold cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <span className="text-teal-400 transition-transform duration-300 inline-block group-hover:rotate-12">K</span>
            <span className={cx(
              "transition-transform duration-300 inline-block group-hover:-rotate-12",
              theme === 'dark' ? "text-white" : "text-gray-900"
            )}>W</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {sections.map((section, index) => (
              <button
                key={section}
                ref={(el) => { navRefs[index].current = el; }}
                onClick={(e) => handleNavClick(section, e)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                className={cx(
                  "group relative text-sm font-medium uppercase tracking-widest px-1 py-2 transition-all duration-300",
                  activeSection === section 
                    ? "text-teal-400" 
                    : theme === 'dark' 
                      ? "text-gray-400 hover:text-white" 
                      : "text-gray-500 hover:text-gray-900"
                )}
                style={{ transitionProperty: 'color, transform', transformStyle: 'preserve-3d' }}
              >
                {section !== 'home' && <span className="opacity-60 mr-1">0{index}</span>} {section}
                <span className={cx(
                  "absolute left-0 bottom-0 h-0.5 bg-teal-400 transition-all duration-300",
                  activeSection === section ? 'w-full' : 'w-0 group-hover:w-full'
                )}></span>
              </button>
            ))}

            {/* Resume Download Button */}
            <a
              href="resume.pdf"
              download="KaitlinWood_Resume.pdf"
              className="text-sm font-medium uppercase tracking-widest px-4 py-2 border border-teal-400 text-teal-400 rounded hover:bg-teal-900/20 transition-all duration-300"
            >
              Resume
            </a>
          </div>
          
          {/* Mobile Navigation Button */}
          <button
            className={cx(
              "md:hidden hover:text-teal-400 transition-colors z-50",
              theme === 'dark' ? "text-gray-300" : "text-gray-700"
            )}
            onClick={() => setNavOpen(!navOpen)}
            aria-label={navOpen ? "Close menu" : "Open menu"}
          >
            {navOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>
      
      {/* Mobile Navigation Menu */}
      <div 
        className={cx(
          "fixed inset-0 flex justify-center items-center transition-all duration-500 md:hidden",
          navOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
          theme === 'dark' ? "bg-gray-900/95" : "bg-white/95"
        )}
      >
        <div className="flex flex-col items-center space-y-8">
          {sections.map((section, index) => (
            <button
              key={section}
              onClick={() => handleNavClick(section)}
              className={cx(
                "text-xl font-medium uppercase relative",
                activeSection === section 
                  ? "text-teal-400" 
                  : theme === 'dark' 
                    ? "text-gray-300" 
                    : "text-gray-700"
              )}
            >
              <span className="opacity-60 mr-2">0{index + 1}.</span> {section}
              <span className={cx(
                "absolute left-0 bottom-0 h-0.5 bg-teal-400 transition-all duration-300",
                activeSection === section ? 'w-full' : 'w-0'
              )}></span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
