import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../app/ThemeContext';
import useThemeClasses, { cx } from '../app/ThemeUtils';

const Header = ({ activeSection, sections, scrollToSection }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [pendingSection, setPendingSection] = useState(null);
  const { theme } = useTheme();
  const scrollTimeoutRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          const shouldBeScrolled = window.scrollY > 50;
          
          if (shouldBeScrolled !== scrolled) {
            setScrolled(shouldBeScrolled);
          }
          
          // Clear any existing timeout
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
          
          // Set scrolling state
          setIsScrolling(true);
          
          // End scrolling state after scroll stops
          scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
            setPendingSection(null);
          }, 150);
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [scrolled]);

  const handleNavClick = (section) => {
    setNavOpen(false);
    setPendingSection(section);
    setIsScrolling(true);
    scrollToSection(section);
  };

  // Define nav link styles with smooth transitions
  const getNavLinkStyles = (section) => {
    // Use pending section during scroll to prevent flicker
    const currentActive = isScrolling && pendingSection ? pendingSection : activeSection;
    const isActive = currentActive === section;
    
    if (isActive) {
      return theme === 'dark' 
        ? "text-red-400" 
        : "text-red-600";
    }
    
    // Adjust text color based on scroll state for better contrast
    if (scrolled) {
      return theme === 'dark'
        ? "text-stone-200 hover:text-stone-50"
        : "text-stone-700 hover:text-stone-900";
    } else {
      return theme === 'dark'
        ? "text-stone-300 hover:text-stone-100"
        : "text-stone-600 hover:text-stone-900";
    }
  };

  // Get header background with smooth transitions
  const getHeaderBackground = () => {
    if (scrolled) {
      return theme === 'dark' 
        ? "bg-stone-950/95 backdrop-blur-lg border-b border-stone-800/50" 
        : "bg-white/95 backdrop-blur-lg shadow-sm border-b border-stone-200/50";
    }
    return "bg-transparent";
  };

  return (
    <>
      <header 
        className={cx(
          "fixed top-0 w-full z-50 transition-all duration-300 ease-out font-sans",
          getHeaderBackground(),
          isScrolling ? "will-change-transform" : ""
        )}
        style={{
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-6 flex justify-between items-center">
          {/* Logo */}
          <div 
            className={cx(
              "cursor-pointer group transition-all duration-300",
              scrolled ? "transform hover:scale-105" : ""
            )}
            onClick={() => handleNavClick('home')}
          >
            <div className={cx(
              "text-2xl font-serif tracking-wide transition-all duration-500", 
              theme === 'dark' ? "text-stone-100" : "text-stone-900",
              scrolled ? "drop-shadow-sm" : ""
            )}>
              kaitlin<span className={cx(
                theme === 'dark' ? "text-red-400" : "text-red-600", 
                "font-medium transition-all duration-500"
              )}>.</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {sections.slice(1).map((section) => {
              const currentActive = isScrolling && pendingSection ? pendingSection : activeSection;
              const isActive = currentActive === section;
              
              return (
                <button
                  key={section}
                  onClick={() => handleNavClick(section)}
                  className={cx(
                    "relative font-light text-sm uppercase tracking-wider transition-all duration-300 ease-out group",
                    getNavLinkStyles(section),
                    scrolled ? "py-1 px-2 rounded-md" : "",
                    isActive ? "transform-gpu" : ""
                  )}
                >
                  <span className="relative z-10">{section}</span>
                  {isActive && (
                    <>
                      {/* Active underline indicator */}
                      <span className={cx(
                        "absolute -bottom-1 left-0 right-0 h-px transition-all duration-300", 
                        theme === 'dark' ? "bg-red-400" : "bg-red-600",
                        scrolled ? "opacity-80" : "opacity-100"
                      )}></span>
                    </>
                  )}
                  {!isActive && (
                    <>
                      {/* Hover underline - appears on hover */}
                      <span className={cx(
                        "absolute -bottom-1 left-0 right-0 h-px transition-all duration-300 opacity-0 group-hover:opacity-60",
                        theme === 'dark' 
                          ? "bg-stone-300" 
                          : "bg-stone-500"
                      )}></span>
                    </>
                  )}
                </button>
              );
            })}
            
            {/* Resume button */}
            <a
              href="resume.pdf"
              download="KaitlinWood_Resume.pdf"
              className={cx(
                "ml-4 px-5 py-2 rounded-full text-sm font-medium text-white transition-all duration-300",
                theme === 'dark' 
                  ? "bg-red-600 hover:bg-red-500" 
                  : "bg-red-700 hover:bg-red-600"
              )}
            >
              Resume
            </a>
          </div>
          
          {/* Mobile menu button */}
          <button
            className={cx(
              "md:hidden p-2 rounded-lg transition-colors",
              theme === 'dark' 
                ? "text-stone-300 hover:bg-stone-800" 
                : "text-stone-700 hover:bg-stone-100"
            )}
            onClick={() => setNavOpen(!navOpen)}
            aria-label={navOpen ? "Close menu" : "Open menu"}
          >
            {navOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>
      
      {/* Mobile Navigation */}
      <div 
        className={cx(
          "fixed inset-0 z-40 md:hidden transition-all duration-500 font-sans",
          navOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div 
          className={cx(
            "absolute inset-0 transition-opacity duration-500",
            theme === 'dark' ? "bg-stone-950/95" : "bg-white/95",
            navOpen ? 'backdrop-blur-md' : ''
          )}
          onClick={() => setNavOpen(false)}
        />
        
        {/* Menu content */}
        <div className={cx(
          "absolute right-0 top-0 h-full w-64 p-8 transition-transform duration-500",
          theme === 'dark' ? "bg-stone-900" : "bg-white",
          navOpen ? 'translate-x-0' : 'translate-x-full'
        )}>
          <button
            className={cx(
              "absolute top-6 right-6 p-2 rounded-lg",
              theme === 'dark' 
                ? "text-stone-300 hover:bg-stone-800" 
                : "text-stone-700 hover:bg-stone-100"
            )}
            onClick={() => setNavOpen(false)}
          >
            <X size={24} />
          </button>
          
          <div className="mt-16 space-y-6">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => handleNavClick(section)}
                className={cx(
                  "block w-full text-left text-lg font-light transition-all duration-300 group relative",
                  getNavLinkStyles(section)
                )}
              >
                <span className="relative z-10">
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </span>
                {/* Mobile hover underline */}
                <span className={cx(
                  "absolute -bottom-1 left-0 right-0 h-px transition-all duration-300 opacity-0 group-hover:opacity-40",
                  theme === 'dark' 
                    ? "bg-stone-400" 
                    : "bg-stone-600"
                )}></span>
              </button>
            ))}
            
            <a
              href="resume.pdf" 
              download="KaitlinWood_Resume.pdf"
              className={cx(
                "inline-block mt-8 px-6 py-3 rounded-full text-sm font-medium text-white transition-all duration-300",
                theme === 'dark' 
                  ? "bg-red-600 hover:bg-red-500" 
                  : "bg-red-700 hover:bg-red-600"
              )}
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
