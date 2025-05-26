import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../app/ThemeContext'; // Assuming path
import useThemeClasses, { cx } from '../app/ThemeUtils'; // Assuming path

const Header = ({ activeSection, sections, scrollToSection }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section) => {
    setNavOpen(false);
    scrollToSection(section);
  };

  const accentColor = theme === 'dark' ? "text-red-400" : "text-red-600";
  const accentBgColor = theme === 'dark' ? "bg-red-600 hover:bg-red-500" : "bg-red-700 hover:bg-red-600";
  const navLinkHoverColor = theme === 'dark' ? "text-stone-100" : "text-stone-900";
  const navLinkColor = theme === 'dark' ? "text-stone-300" : "text-stone-600";

  return (
    <>
      <header 
        className={cx(
          "fixed top-0 w-full z-50 transition-all duration-500 font-sans",
          scrolled 
            ? theme === 'dark' 
              ? "bg-stone-950/90 backdrop-blur-md" 
              : "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-6 flex justify-between items-center">
          {/* Logo */}
          <div 
            className="cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className={cx(
              "text-2xl font-serif tracking-wide transition-colors", 
              theme === 'dark' ? "text-stone-100" : "text-stone-900"
            )}>
              kaitlin<span className={cx(theme === 'dark' ? "text-red-400" : "text-red-600", "font-medium")}>.</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {sections.slice(1).map((section) => (
              <button
                key={section}
                onClick={() => handleNavClick(section)}
                className={cx(
                  "relative font-light text-sm uppercase tracking-wider transition-colors",
                  activeSection === section 
                    ? accentColor
                    : `${navLinkColor} hover:${navLinkHoverColor}`
                )}
              >
                {section}
                {activeSection === section && (
                  <span className={cx("absolute -bottom-1 left-0 right-0 h-px", theme === 'dark' ? "bg-red-400" : "bg-red-600")}></span>
                )}
              </button>
            ))}
            
            {/* Resume button */}
            <a
              href="resume.pdf"
              download="KaitlinWood_Resume.pdf"
              className={cx(
                "ml-4 px-5 py-2 rounded-full text-sm font-medium text-white transition-all duration-300",
                accentBgColor
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
                  "block w-full text-left text-lg font-light transition-colors",
                  activeSection === section 
                    ? accentColor 
                    : `${navLinkColor} hover:${navLinkHoverColor}`
                )}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
            
            <a
              href="resume.pdf" 
              download="KaitlinWood_Resume.pdf"
              className={cx(
                "inline-block mt-8 px-6 py-3 rounded-full text-sm font-medium text-white",
                accentBgColor
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
