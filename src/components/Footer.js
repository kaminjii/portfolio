import React from 'react';
import { Heart, Coffee, ArrowUp, Github, Linkedin, Mail } from 'lucide-react'; // Added Github, Linkedin, Mail
import { useTheme } from '../app/ThemeContext'; // Assuming path
import useThemeClasses, { cx } from '../app/ThemeUtils'; // Assuming path

const Footer = () => {
  const { theme } = useTheme();
  // const classes = useThemeClasses(); // classes variable is not used
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Define theme-specific accent colors
  const accentColor = theme === 'dark' ? "text-red-400" : "text-red-600";
  const accentColorIcon = theme === 'dark' ? "text-red-400" : "text-red-600";
  const socialLinkHoverBg = theme === 'dark' ? "hover:bg-stone-700" : "hover:bg-stone-200";
  const socialLinkHoverText = theme === 'dark' ? "hover:text-red-400" : "hover:text-red-600";

  return (
    <footer className={cx(
      "relative pt-24 pb-12 font-sans", // Added font-sans
      theme === 'dark' ? "bg-stone-950" : "bg-stone-50"
    )}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        {/* Main footer content */}
        <div className="text-center mb-12">
          {/* Logo */}
          <div className={cx(
            "text-4xl font-serif mb-6", // Changed to font-serif
            theme === 'dark' ? "text-stone-100" : "text-stone-900"
          )}>
            kaitlin<span className={cx(accentColor, "font-medium")}>.</span>
          </div>
          
          {/* Tagline */}
          <p className={cx(
            "text-lg mb-8",
            theme === 'dark' ? "text-stone-400" : "text-stone-600"
          )}>
            Crafting digital experiences with <Heart className={cx("inline-block w-4 h-4", accentColorIcon)} /> and <Coffee className={cx("inline-block w-4 h-4", accentColorIcon)} />
          </p>
          
          {/* Social links */}
          <div className="flex justify-center gap-4 mb-8">
            <a 
              href="mailto:wood.kaitlin3@gmail.com" 
              className={cx(
                "p-3 rounded-full transition-all duration-300 group",
                theme === 'dark' 
                  ? "bg-stone-800 text-stone-300" 
                  : "bg-stone-100 text-stone-600",
                socialLinkHoverBg,
                socialLinkHoverText
              )}
              aria-label="Email Kaitlin"
            >
              <Mail size={20} />
            </a>
            <a 
              href="https://github.com/kaminjii"
              target="_blank"
              rel="noopener noreferrer"
              className={cx(
                "p-3 rounded-full transition-all duration-300 group",
                theme === 'dark' 
                  ? "bg-stone-800 text-stone-300" 
                  : "bg-stone-100 text-stone-600",
                socialLinkHoverBg,
                socialLinkHoverText
              )}
              aria-label="Kaitlin's GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com/in/kaitlinwood03"
              target="_blank"
              rel="noopener noreferrer"
              className={cx(
                "p-3 rounded-full transition-all duration-300 group",
                theme === 'dark' 
                  ? "bg-stone-800 text-stone-300" 
                  : "bg-stone-100 text-stone-600",
                socialLinkHoverBg,
                socialLinkHoverText
              )}
              aria-label="Kaitlin's LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        
        {/* Divider */}
        <div className={cx(
          "max-w-xs mx-auto h-px mb-8",
          theme === 'dark' ? "bg-stone-800" : "bg-stone-200"
        )}></div>
        
        {/* Copyright */}
        <div className={cx(
          "text-center text-sm",
          theme === 'dark' ? "text-stone-500" : "text-stone-500"
        )}>
          <p>
            © {new Date().getFullYear()} Kaitlin Wood. 
            <span className="block sm:inline"> Built with React & lots of <Heart className={cx("inline-block w-3 h-3", accentColorIcon)} /></span>
          </p>
        </div>
        
        {/* Scroll to top button */}
        <button 
          onClick={scrollToTop}
          className={cx(
            "fixed bottom-8 right-8 p-4 rounded-full transition-all duration-300 group",
            theme === 'dark' 
              ? "bg-stone-800/80 hover:bg-stone-700/80 backdrop-blur-sm" 
              : "bg-white/80 hover:bg-stone-100/80 backdrop-blur-sm shadow-lg",
            "transform hover:-translate-y-1"
          )}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} className={cx(
            "transition-colors",
            theme === 'dark' ? "text-stone-300 group-hover:text-red-400" : "text-stone-600 group-hover:text-red-600"
          )} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
