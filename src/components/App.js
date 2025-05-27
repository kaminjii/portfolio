"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ArrowRight, Coffee, Sparkles, Heart, Wind, Droplets, Sun, Star, Zap, Compass } from 'lucide-react';
import { PiFlowerLotus } from 'react-icons/pi';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SmoothCursor from './animations/SmoothCursor';
import OrganicBackground from './OrganicBackground';
import FadeIn from './animations/FadeIn';
import Header from './Header';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import Footer from './Footer';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/app/ThemeContext';


const FloatingElement = ({ children, delay = 0, className = "" }) => {
  return (
    <div 
      className={`animate-float ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: '6s'
      }}
    >
      {children}
    </div>
  );
};

const InteractiveOrb = ({ size = 'w-4 h-4', color = 'bg-red-400', delay = 0, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`${size} ${color} rounded-full blur-sm opacity-60 hover:opacity-100 
                  transition-all duration-500 cursor-pointer hover:scale-150 ${className}`}
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-full h-full rounded-full transition-all duration-300 ${
        isHovered ? 'animate-pulse' : ''
      }`} />
    </div>
  );
};

const App = () => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showAllSkills, setShowAllSkills] = useState(false);
  
  const skills = [
    'JavaScript', 'TypeScript', 'Python', 'SQL', 'React', 'Node.js',
    'CSS', 'HTML', 'Java', 'Swift', 'C++', 'Git', 'Jenkins', 'AWS', 'Firebase'
  ];

  const sections = useMemo(() => ['home', 'about', 'experience', 'projects', 'contact'], []);

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const sectionRefs = useMemo(() => ({
    home: homeRef,
    about: aboutRef,
    experience: experienceRef,
    projects: projectsRef,
    contact: contactRef,
  }), []);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Prevent browser scroll restoration and ensure we start at the top
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  
    // Force scroll to top on initial load
    window.scrollTo(0, 0);
    setActiveSection('home');
  
    // Clear any URL hash that might cause scrolling
    if (window.location.hash) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []); // Empty dependency array means this runs once on mount

  const handleScroll = useCallback(() => {
    // Don't run scroll detection if we're still at the very top
    if (window.scrollY < 10) {
      if (activeSection !== 'home') {
        setActiveSection('home');
      }
      return;
    }

    const scrollPosition = window.scrollY + 100;

    // Iterate through sections in order (not reverse) to prioritize earlier sections
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const element = sectionRefs[section].current;
      if (!element) continue;

      const { offsetTop, offsetHeight } = element;    
      // Check if we're in this section's range
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        // Only update if the section actually changed
        if (activeSection !== section) {
          console.log(`Setting active section to: ${section}`);
          setActiveSection(section);
        }
        return; // Exit early once we find the matching section
      }
    }
  }, [sections, sectionRefs, activeSection]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (section) => {
    const element = sectionRefs[section].current;
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
      setActiveSection(section);
    }
  };

  const toggleSkills = () => {
    setShowAllSkills(!showAllSkills);
  };

  const cx = (...classes) => classes.filter(Boolean).join(' ');

  // Parallax effect calculation
  const parallaxOffset = scrollY * 0.5;

  return (
    <div className={cx(
      "min-h-screen relative overflow-hidden noise-texture",
      theme === 'dark' ? "bg-slate-900 text-amber-100" : "bg-amber-50 text-slate-800"
    )}>
      <SmoothCursor />
      <OrganicBackground />

      <Header
        activeSection={activeSection}
        sections={sections}
        scrollToSection={scrollToSection}
      />

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div className={cx(
          "absolute -top-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse opacity-20",
          theme === 'dark' ? "bg-gradient-to-br from-red-500 to-orange-400" : "bg-gradient-to-br from-red-400 to-orange-300"
        )} style={{ transform: `translateY(${parallaxOffset}px)` }} />
        
        <div className={cx(
          "absolute top-1/2 -right-40 w-96 h-96 rounded-full blur-3xl animate-pulse opacity-15",
          theme === 'dark' ? "bg-gradient-to-bl from-orange-500 to-yellow-400" : "bg-gradient-to-bl from-orange-400 to-yellow-300"
        )} style={{ 
          transform: `translateY(${-parallaxOffset * 0.8}px)`,
          animationDelay: '2s' 
        }} />
        
        {/* Floating interactive orbs */}
        <InteractiveOrb 
          className="absolute top-1/4 left-1/4" 
          delay={0}
          size="w-3 h-3"
          color={theme === 'dark' ? "bg-red-400" : "bg-red-500"}
        />
        <InteractiveOrb 
          className="absolute top-1/3 right-1/3" 
          delay={1.5}
          size="w-2 h-2"
          color={theme === 'dark' ? "bg-orange-400" : "bg-orange-500"}
        />
        <InteractiveOrb 
          className="absolute bottom-1/3 left-1/5" 
          delay={3}
          size="w-4 h-4"
          color={theme === 'dark' ? "bg-yellow-400" : "bg-yellow-500"}
        />
        <InteractiveOrb 
          className="absolute bottom-1/4 right-1/4" 
          delay={4.5}
          size="w-3 h-3"
          color={theme === 'dark' ? "bg-red-300" : "bg-red-400"}
        />
        
        {/* Animated lines/connections */}
        <svg className="absolute inset-0 w-full h-full opacity-10" style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme === 'dark' ? "#ef4444" : "#dc2626"} />
              <stop offset="100%" stopColor={theme === 'dark' ? "#f97316" : "#ea580c"} />
            </linearGradient>
          </defs>
          <path 
            d="M100,200 Q400,100 700,300 T1200,400" 
            stroke="url(#lineGradient)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
          />
          <path 
            d="M200,500 Q600,400 900,600 T1400,500" 
            stroke="url(#lineGradient)" 
            strokeWidth="1" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </svg>
      </div>

      <main className="relative z-10">
        {/* Enhanced Hero Section */}
        <section 
          ref={sectionRefs.home}
          id="home"
          className="min-h-screen flex items-center relative overflow-hidden"
          onMouseEnter={() => setIsHeroHovered(true)}
          onMouseLeave={() => setIsHeroHovered(false)}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Enhanced Left Content */}
            <div className="order-2 lg:order-1 relative">
              {/* Floating decorative elements around text */}
              <FloatingElement delay={2} className="absolute -top-8 -left-8">
                <Star size={16} className={cx(
                  "opacity-40",
                  theme === 'dark' ? "text-orange-400" : "text-orange-500"
                )} />
              </FloatingElement>
              
              <FloatingElement delay={4} className="absolute top-20 -right-12">
                <Zap size={20} className={cx(
                  "opacity-30",
                  theme === 'dark' ? "text-red-400" : "text-red-500"
                )} />
              </FloatingElement>
              
              <FadeIn delay={100}>
                <div className="flex items-center gap-3 mb-8 group">
                  <div className={cx(
                    "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110",
                    "animate-pulse-organic relative overflow-hidden",
                    theme === 'dark'
                      ? "bg-gradient-to-br from-red-500 to-orange-600 shadow-lg shadow-red-500/30" 
                      : "bg-gradient-to-br from-red-600 to-orange-500 shadow-lg shadow-red-600/30"
                  )}>
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000 bg-white/20" />
                    <PiFlowerLotus size={24} className={cx(
                      "relative z-10 transition-transform duration-300 group-hover:rotate-12",
                      theme === 'dark' ? "text-amber-50" : "text-white"
                    )} />
                  </div>
                  <div>
                    <p className={cx(
                      "font-medium text-lg transition-colors duration-300",
                      theme === 'dark' ? "text-amber-300" : "text-red-700"
                    )}>Hello, I&apos;m</p>
                    <div className="h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-red-400 to-orange-400 rounded-full" />
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn delay={200}>
                <h1 className={cx(
                  "text-6xl sm:text-7xl lg:text-8xl font-serif leading-[0.9] mb-6 relative",
                  theme === 'dark' ? "text-amber-50" : "text-slate-900"
                )}>
                  <span className="relative inline-block">
                    Kaitlin
                    {/* Subtle glow effect on hover */}
                    <div className={cx(
                      "absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-500 blur-xl",
                      theme === 'dark' ? "bg-amber-50" : "bg-slate-900"
                    )} />
                  </span>
                  <br />
                  <span className={cx(
                    "font-medium relative inline-block group",
                    theme === 'dark'
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400" 
                      : "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500"
                  )}>
                    Wood
                    {/* Animated underline */}
                  </span>
                </h1>
              </FadeIn>
              
              <FadeIn delay={300}>
                <p className={cx(
                  "text-xl sm:text-2xl mb-8 font-light italic relative",
                  theme === 'dark' ? "text-amber-200" : "text-slate-600"
                )}>
                  <span className="relative">
                    Software Engineer crafting delightful digital experiences
                    {/* Subtle highlight animation */}
                    <div className={cx(
                      "absolute inset-0 -skew-x-2 scale-x-0 hover:scale-x-100 transition-transform duration-700 origin-left opacity-10",
                      theme === 'dark' ? "bg-red-400" : "bg-red-300"
                    )} />
                  </span>
                </p>
              </FadeIn>
              
              <FadeIn delay={400}>
                <p className={cx(
                  "text-lg mb-12 leading-relaxed",
                  theme === 'dark' ? "text-amber-300" : "text-slate-500"
                )}>
                  Currently building accessible, user-centered products at{' '}
                  <span className={cx(
                    "font-medium relative group cursor-pointer",
                    theme === 'dark' ? "text-red-400" : "text-red-700"
                  )}>
                    <span className="relative z-10">Mastercard</span>
                    <div className={cx(
                      "absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300",
                      "bg-gradient-to-r from-red-400 to-orange-400"
                    )} />
                    <div className={cx(
                      "absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-300 opacity-10 rounded",
                      theme === 'dark' ? "bg-red-400" : "bg-red-300"
                    )} />
                  </span>
                </p>
              </FadeIn>
              
              <FadeIn delay={500}>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => scrollToSection('projects')}
                    className={cx(
                      "btn-oriental group flex items-center gap-3 px-8 py-3 rounded-full text-lg font-medium",
                      "transition-all duration-300 transform hover:scale-105 relative overflow-hidden",
                      theme === 'dark' 
                        ? "bg-gradient-to-br from-red-500 to-orange-600 text-white shadow-lg shadow-red-500/30 hover:shadow-red-400/40" 
                        : "bg-gradient-to-br from-red-600 to-orange-500 text-white shadow-lg shadow-red-600/30 hover:shadow-red-500/40"
                    )}
                  >
                    {/* Button shimmer effect */}
                    <div className="absolute inset-0 -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700 bg-white/20" />
                    <span className="relative z-10">View my work</span>
                    <ArrowRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" size={20} />
                  </button>
                  
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className={cx(
                      "btn-oriental group flex items-center gap-3 px-8 py-3 rounded-full text-lg font-medium border-2",
                      "transition-all duration-300 transform hover:scale-105 relative overflow-hidden",
                      theme === 'dark' 
                        ? "border-red-500 text-amber-200 hover:bg-red-500/20 hover:text-amber-100 shadow-sm hover:shadow-red-500/20" 
                        : "border-red-600 text-red-700 hover:bg-red-600/10 hover:text-red-600 shadow-sm hover:shadow-red-600/20"
                    )}
                  >
                    {/* Hover background effect */}
                    <div className={cx(
                      "absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full",
                      theme === 'dark' ? "bg-red-500/20" : "bg-red-600/10"
                    )} />
                    <span className="relative z-10">Get in touch</span>
                  </button>
                </div>
              </FadeIn>
            </div>
            
            {/* Enhanced Right Content - Interactive Bowl */}
            <div className="order-1 lg:order-2 relative flex justify-center items-center h-full">
              <FadeIn delay={300} direction="right">
                <div className="relative w-80 h-80 sm:w-96 sm:h-96 group cursor-pointer"
                     style={{ transform: `translateY(${-parallaxOffset * 0.2}px)` }}>
                  
                  {/* Enhanced Decorative blob */}
                  <div className={cx(
                    "absolute -inset-12 blur-3xl transition-all duration-1000 opacity-70 group-hover:opacity-100 group-hover:scale-110",
                    theme === 'dark'
                      ? "bg-gradient-to-br from-red-600/40 to-orange-500/40" 
                      : "bg-gradient-to-br from-red-400/40 to-orange-300/40"
                  )} />
                  
                  {/* Main Enhanced Bowl Structure */}
                  <div className={cx(
                    "relative w-full h-full rounded-full p-2 transform transition-all duration-700 group-hover:scale-105",
                    "backdrop-blur-sm border-2",
                    theme === 'dark' 
                      ? "bg-slate-800/60 shadow-2xl shadow-red-900/50 border-red-500/40 group-hover:border-red-400/60" 
                      : "bg-amber-100/60 shadow-2xl shadow-red-300/50 border-red-300/40 group-hover:border-red-400/60"
                  )}>
                                        
                    {/* Inner Bowl Layer 1 */}
                    <div className={cx(
                      "w-full h-full rounded-full p-2 transform transition-all duration-700 group-hover:rotate-[5deg] relative",
                      theme === 'dark' ? "border border-orange-600/50" : "border border-orange-400/50"
                    )}>
                      
                      
                      {/* Inner Bowl Layer 2 (Content Holder) */}
                      <div className={cx(
                        "w-full h-full rounded-full flex flex-col items-center justify-center text-center p-6",
                        "transform transition-all duration-700 group-hover:-rotate-[5deg] relative overflow-hidden",
                        theme === 'dark' 
                          ? "bg-slate-800/80 shadow-inner shadow-red-900/30 border border-red-700/60" 
                          : "bg-amber-100/80 shadow-inner shadow-red-200/50 border border-red-400/60"
                      )}>
                        
                        {/* Content shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                        
                        {/* Interactive Sun Icon */}
                        <div className="relative mb-4 group/sun">
                          <Sun size={48} className={cx(
                            "transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative z-10",
                            theme === 'dark' ? "text-orange-400" : "text-orange-500"
                          )} />
                        </div>
                        
                        <p className={cx(
                          "text-sm font-light transition-all duration-300 group-hover:opacity-100 opacity-80 relative z-10",
                          theme === 'dark' ? "text-amber-300" : "text-slate-600"
                        )}>
                          Crafted with Care
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Floating Elements */}
                  <FloatingElement delay={0} className={cx(
                    "absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl transition-all duration-500 group-hover:scale-125",
                    theme === 'dark' ? "bg-red-500/30" : "bg-red-300/30"
                  )} />
                  
                  <FloatingElement delay={1.5} className={cx(
                    "absolute -bottom-16 -left-16 w-32 h-32 rounded-full blur-2xl transition-all duration-500 group-hover:scale-125",
                    theme === 'dark' ? "bg-orange-500/30" : "bg-orange-300/30"
                  )} />
                  
                  {/* Interactive floating icons */}
                  <FloatingElement delay={0.5} className="absolute top-1/4 -left-12 group/icon">
                    <Droplets size={28} className={cx(
                      "transition-all duration-500 group-hover:translate-x-2 opacity-50 group-hover:opacity-100",
                      "group-hover/icon:scale-125 group-hover/icon:text-blue-400 cursor-pointer",
                      theme === 'dark' ? "text-red-600 hover:text-blue-400" : "text-red-400 hover:text-blue-500"
                    )} style={{ transform: 'rotate(-30deg)' }} />
                  </FloatingElement>
                  
                  <FloatingElement delay={2} className="absolute bottom-1/4 -right-12 group/icon">
                    <Wind size={24} className={cx(
                      "transition-all duration-500 group-hover:-translate-x-2 opacity-50 group-hover:opacity-100",
                      "group-hover/icon:scale-125 group-hover/icon:text-cyan-400 cursor-pointer",
                      theme === 'dark' ? "text-orange-600 hover:text-cyan-400" : "text-orange-400 hover:text-cyan-500"
                    )} style={{ transform: 'rotate(20deg)' }} />
                  </FloatingElement>
                  
                  {/* New floating tech elements */}
                  <FloatingElement delay={3} className="absolute top-1/2 -right-20 group/icon">
                    <Coffee size={20} className={cx(
                      "transition-all duration-500 opacity-40 group-hover:opacity-80 cursor-pointer",
                      "group-hover/icon:scale-125 group-hover/icon:rotate-12",
                      theme === 'dark' ? "text-amber-400" : "text-amber-600"
                    )} />
                  </FloatingElement>
                  
                  <FloatingElement delay={4} className="absolute top-1/2 -left-20 group/icon">
                    <Sparkles size={22} className={cx(
                      "transition-all duration-500 opacity-40 group-hover:opacity-80 cursor-pointer",
                      "group-hover/icon:scale-125 group-hover/icon:rotate-[-12deg]",
                      theme === 'dark' ? "text-yellow-400" : "text-yellow-600"
                    )} />
                  </FloatingElement>
                </div>
              </FadeIn>
            </div>
          </div>
          
          {/* Enhanced Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <FadeIn delay={800}>
              <div className={cx(
                "text-sm font-medium group cursor-pointer",
                theme === 'dark' ? "text-amber-500" : "text-slate-400"
              )}
              onClick={() => scrollToSection('about')}>
                <div className="flex flex-col items-center gap-2 transition-transform duration-300 group-hover:scale-110">
                  <span className="transition-colors duration-300 group-hover:text-red-400">
                    Scroll to explore
                  </span>
                  <div className="relative">
                    <div className="w-px h-12 bg-current opacity-40 transition-all duration-300 group-hover:opacity-70" />
                    {/* Animated dot */}
                    <div className={cx(
                      "absolute left-1/2 top-0 w-1 h-1 -translate-x-1/2 rounded-full animate-bounce",
                      theme === 'dark' ? "bg-red-400" : "bg-red-500"
                    )} />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
          
          {/* Mouse follower effect */}
          <div 
            className="fixed w-8 h-8 rounded-full pointer-events-none mix-blend-multiply z-50 transition-opacity duration-300"
            style={{
              left: mousePosition.x - 16,
              top: mousePosition.y - 16,
              background: `radial-gradient(circle, ${
                theme === 'dark' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(220, 38, 38, 0.2)'
              } 0%, transparent 70%)`,
              opacity: isHeroHovered ? 1 : 0
            }}
          />
        </section>
        
        {/* About Section */}
        <section ref={sectionRefs.about} id="about" className="py-32 relative">
          <div className="max-w-6xl mx-auto px-6 sm:px-12">
            <FadeIn>
              <div className="mb-16">
                <span className={cx(
                  "font-medium text-sm uppercase tracking-wider",
                  theme === 'dark'? "text-red-400" : "text-red-700"
                )}>About</span>
                <h2 className={cx(
                  "text-5xl sm:text-6xl font-light mt-4",
                  theme === 'dark'? "text-stone-100" : "text-stone-900"
                )}>
                  Crafting Stories Through Code
                </h2>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <FadeIn delay={100}>
                  <p className={cx(
                    "text-lg leading-relaxed mb-6",
                    theme === 'dark'? "text-stone-300" : "text-stone-600"
                  )}>
                    Hello! I&apos;m Kaitlin, a software engineer with a passion for creating engaging digital experiences
                    that blend functionality with aesthetics. My journey in tech began with a fascination for how
                    beautiful design and clean code can come together to solve real-world problems.
                  </p>
                </FadeIn>
                
                <FadeIn delay={200}>
                  <p className={cx(
                    "text-lg leading-relaxed mb-6",
                    theme === 'dark'? "text-stone-300" : "text-stone-600"
                  )}>
                    I recently graduated from the University of Houston with a Bachelor of Science in Computer Science
                    and a minor in Mathematics. This combination has given me a unique perspective on problem-solving,
                    allowing me to approach challenges with both analytical rigor and creative thinking.
                  </p>
                </FadeIn>
                
                <FadeIn delay={300}>
                  <p className={cx(
                    "text-lg leading-relaxed mb-8",
                    theme === 'dark'? "text-stone-300" : "text-stone-600"
                  )}>
                    When I&apos;m not coding, you&apos;ll find me exploring local coffee shops, sketching interface ideas,
                    or diving into the latest design trends. I believe that great software is not just about
                    functionality—it&apos;s about creating experiences that delight and inspire.
                  </p>
                </FadeIn>
              </div>
              
              <div className="relative">
                <FadeIn delay={500} direction="left">
                  <div className={cx(
                    "sticky top-24 p-8 rounded-3xl",
                    theme === 'dark'? "bg-slate-800/30 border border-slate-700/50" : "bg-white/70 shadow-sm"
                  )}>
                    <div className="flex items-center gap-3 mb-6">
                      <Heart className={cx(theme === 'dark'? "text-red-400" : "text-red-700")} size={24} />
                      <h3 className={cx(
                        "text-xl font-medium",
                        theme === 'dark'? "text-stone-200" : "text-stone-800"
                      )}>What drives me</h3>
                    </div>
                    
                    <ul className="space-y-4">
                      <li className={cx(
                        "flex items-start gap-3",
                        theme === 'dark'? "text-stone-400" : "text-stone-600"
                      )}>
                        <span className={cx("mt-1", theme === 'dark'? "text-red-500" : "text-red-700")}>•</span>
                        <span>Creating intuitive, accessible experiences for all users</span>
                      </li>
                      <li className={cx(
                        "flex items-start gap-3",
                        theme === 'dark'? "text-stone-400" : "text-stone-600"
                      )}>
                        <span className={cx("mt-1", theme === 'dark'? "text-red-500" : "text-red-700")}>•</span>
                        <span>Bridging the gap between design and development</span>
                      </li>
                      <li className={cx(
                        "flex items-start gap-3",
                        theme === 'dark'? "text-stone-400" : "text-stone-600"
                      )}>
                        <span className={cx("mt-1", theme === 'dark'? "text-red-500" : "text-red-700")}>•</span>
                        <span>Continuous learning and growth</span>
                      </li>
                      <li className={cx(
                        "flex items-start gap-3",
                        theme === 'dark'? "text-stone-400" : "text-stone-600"
                      )}>
                        <span className={cx("mt-1", theme === 'dark'? "text-red-500" : "text-red-700")}>•</span>
                        <span>Building meaningful connections through technology</span>
                      </li>
                    </ul>
                  </div>
                </FadeIn>
              </div>
            </div>
            
            <FadeIn delay={400}>
              <div className="flex items-center gap-4 my-8">
                <Sparkles className={cx(theme === 'dark' ? "text-red-400" : "text-red-700")} size={24} />
                <h3 className={cx(
                  "text-2xl font-medium",
                  theme === 'dark' ? "text-stone-200" : "text-stone-800"
                )}>Skills & Technologies</h3>
              </div>

              <div className="overflow-hidden transition-all duration-1000" style={{ maxHeight: showAllSkills ? '1000px' : '64px' }}>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pb-4">
                  {skills.map((skill, index) => (
                    <div
                      key={skill}
                      className={cx(
                        "px-4 py-3 rounded-2xl text-center font-medium transition-all duration-300 hover:-translate-y-1",
                        theme === 'dark'
                          ? "bg-slate-800/50 text-stone-300 hover:bg-slate-700"
                          : "bg-white/70 text-stone-700 hover:bg-white border border-gray-200 hover:shadow-lg hover:shadow-red-500/20"
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={toggleSkills}
                className={cx(
                  "mt-4 flex items-center gap-2 py-2 rounded-full text-sm font-medium transition-all duration-500",
                  theme === 'dark'
                    ? "text-red-400 hover:text-red-500"
                    : "text-red-600 hover:text-red-700"
                )}
              >
                {showAllSkills ? 'Show Less' : 'Show More'}
                <span
                  className={cx(
                    "transition-transform duration-300",
                    showAllSkills ? "rotate-180" : "rotate-0"
                  )}
                >
                  <ChevronDown size={16} />
                </span>
              </button>
            </FadeIn>
          </div>
        </section>
        
        {/* Experience Section */}
        <ExperienceSection sectionRef={sectionRefs.experience} />
        
        {/* Projects Section */}
        <ProjectsSection sectionRef={sectionRefs.projects} />
        
        {/* Contact Section */}
        <ContactSection sectionRef={sectionRefs.contact} />
      </main>
      
      <Footer />

      {/* Theme Toggle Button */}
      <ThemeToggle />
    </div>
  );
};

export default App;