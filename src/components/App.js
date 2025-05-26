"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ArrowRight, Coffee, Sparkles, Heart, Wind, Droplets, Sun } from 'lucide-react';
import Header from './Header';
import OrganicBackground from './OrganicBackground';
import FadeIn from './animations/FadeIn';
import SmoothCursor from './animations/SmoothCursor';
import ProjectsSection from './sections/ProjectsSection';
import ExperienceSection from './sections/ExperienceSection';
import ContactSection from './sections/ContactSection';
import Footer from './Footer';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../app/ThemeContext';
import useThemeClasses, { cx } from '../app/ThemeUtils';
import '../app/globals.css';
import { PiFlowerLotus } from 'react-icons/pi';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();
  const classes = useThemeClasses();

  const sections = useMemo(() => ['home', 'about', 'experience', 'projects', 'contact'], []);

  // Create refs individually
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Memoize the refs object
  const sectionRefs = useMemo(() => ({
    home: homeRef,
    about: aboutRef,
    experience: experienceRef,
    projects: projectsRef,
    contact: contactRef,
  }), []);

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
      const element = sectionRefs[section].current;
      if (!element) continue;

      const { offsetTop, offsetHeight } = element;
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        setActiveSection(section);
        break;
      }
    }
  }, [sections, sectionRefs]);

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

  return (
    <div className={cx(
      "min-h-screen relative noise-texture",
      theme === 'dark' ? "bg-slate-900 text-amber-100" : "bg-amber-50 text-slate-800"
    )}>
      <SmoothCursor />
      <OrganicBackground />

      <Header
        activeSection={activeSection}
        sections={sections}
        scrollToSection={scrollToSection}
      />

      <main className="relative z-10">
        {/* Home Section */}
        <section ref={sectionRefs.home} id="home" className="min-h-screen flex items-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <FadeIn delay={100}>
                <div className="flex items-center gap-3 mb-8">
                  <div className={cx(
                    "w-14 h-14 rounded-full flex items-center justify-center animate-pulse-organic transition-all duration-300",
                    theme === 'dark'? "bg-gradient-to-br from-red-500 to-orange-600 shadow-lg shadow-red-500/30" : "bg-gradient-to-br from-red-600 to-orange-500 shadow-lg shadow-red-600/30"
                  )}>
                    <PiFlowerLotus size={24} className={cx(theme === 'dark'? "text-amber-50" : "text-white")} />
                  </div>
                  <p className={cx(
                    "font-medium text-lg",
                    theme === 'dark'? "text-amber-300" : "text-red-700"
                  )}>Hello, I'm</p>
                </div>
              </FadeIn>
              
              <FadeIn delay={200}>
                <h1 className={cx(
                  "text-6xl sm:text-7xl lg:text-8xl font-serif leading-[0.9] mb-6",
                  theme === 'dark'? "text-amber-50" : "text-slate-900"
                )}>
                  Kaitlin<br />
                  <span className={cx(
                    "font-medium",
                    theme === 'dark'? "text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400" : "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500"
                  )}>Wood</span>
                </h1>
              </FadeIn>
              
              <FadeIn delay={300}>
                <p className={cx(
                  "text-xl sm:text-2xl mb-8 font-light italic",
                  theme === 'dark'? "text-amber-200" : "text-slate-600"
                )}>
                  Software Engineer crafting delightful digital experiences
                </p>
              </FadeIn>
              
              <FadeIn delay={400}>
                <p className={cx(
                  "text-lg mb-12 leading-relaxed",
                  theme === 'dark'? "text-amber-300" : "text-slate-500"
                )}>
                  Currently building accessible, user-centered products at{' '}
                  <span className={cx(
                    "font-medium link-underline cursor-pointer",
                    theme === 'dark'? "text-red-400 hover:text-orange-400" : "text-red-700 hover:text-orange-600"
                  )}>
                    Mastercard
                  </span>
                </p>
              </FadeIn>
              
              <FadeIn delay={500}>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => scrollToSection('projects')}
                    className={cx(
                      "btn-oriental group flex items-center gap-3 px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105",
                      theme === 'dark' 
                       ? "bg-gradient-to-br from-red-500 to-orange-600 text-white shadow-lg shadow-red-500/30 hover:shadow-red-400/40" 
                        : "bg-gradient-to-br from-red-600 to-orange-500 text-white shadow-lg shadow-red-600/30 hover:shadow-red-500/40"
                    )}
                  >
                    View my work
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
                  </button>
                  
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className={cx(
                      "btn-oriental group flex items-center gap-3 px-8 py-3 rounded-full text-lg font-medium border-2 transition-all duration-300 transform hover:scale-105",
                      theme === 'dark' 
                       ? "border-red-500 text-amber-200 hover:bg-red-500/20 hover:text-amber-100 shadow-sm hover:shadow-red-500/20" 
                        : "border-red-600 text-red-700 hover:bg-red-600/10 hover:text-red-600 shadow-sm hover:shadow-red-600/20"
                    )}
                  >
                    Get in touch
                  </button>
                </div>
              </FadeIn>
            </div>
            
            {/* Right Content */}
            <div className="order-1 lg:order-2 relative flex justify-center items-center h-full">
              <FadeIn delay={300} direction="right">
                <div className="relative w-80 h-80 sm:w-96 sm:h-96 group">
                  {/* Decorative blob - background */}
                  <div className={cx(
                    "absolute -inset-8 blur-3xl animate-blob transition-all duration-1000 opacity-70 group-hover:opacity-100",
                    theme === 'dark'? "bg-gradient-to-br from-red-600/30 to-orange-500/30" : "bg-gradient-to-br from-red-400/30 to-orange-300/30"
                  )}></div>
                  
                  {/* Main Bowl Structure */}
                  <div className={cx(
                    "relative w-full h-full rounded-full p-2 transform transition-all duration-500 group-hover:scale-105",
                    theme === 'dark' 
                     ? "bg-slate-800/50 shadow-2xl shadow-red-900/50 border-2 border-red-500/30" 
                      : "bg-amber-100/50 shadow-2xl shadow-red-300/50 border-2 border-red-300/30"
                  )}>
                    {/* Inner Bowl Layer 1 */}
                    <div className={cx(
                      "w-full h-full rounded-full p-2 transform transition-all duration-500 group-hover:rotate-[5deg]",
                      theme === 'dark'? "border border-orange-600/40" : "border border-orange-400/40"
                    )}>
                      {/* Inner Bowl Layer 2 (Content Holder) */}
                      <div className={cx(
                        "w-full h-full rounded-full flex flex-col items-center justify-center text-center p-6 transform transition-all duration-500 group-hover:-rotate-[5deg]",
                        theme === 'dark' 
                         ? "bg-slate-800/70 shadow-inner shadow-red-900/30 border border-red-700/50" 
                          : "bg-amber-100/70 shadow-inner shadow-red-200/50 border border-red-400/50"
                      )}>
                        <Sun size={48} className={cx(
                          "mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12",
                          theme === 'dark'? "text-orange-400" : "text-orange-500"
                        )} />
                        <p className={cx(
                          "text-sm font-light transition-opacity duration-300 group-hover:opacity-100 opacity-80",
                          theme === 'dark'? "text-amber-300" : "text-slate-600"
                        )}>
                          Crafted with Care
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating decorative elements */}
                  <div className={cx(
                    "absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl animate-float transition-all duration-500 group-hover:scale-125",
                     theme === 'dark'? "bg-red-500/20" : "bg-red-300/20"
                  )}></div>
                  <div className={cx(
                    "absolute -bottom-16 -left-16 w-32 h-32 rounded-full blur-2xl animate-float transition-all duration-500 group-hover:scale-125",
                    theme === 'dark'? "bg-orange-500/20" : "bg-orange-300/20"
                  )} style={{ animationDelay: '1.5s' }}></div>
                   <Droplets size={28} className={cx(
                    "absolute top-1/4 -left-12 transition-all duration-500 group-hover:translate-x-2 group-hover:text-red-400 opacity-50 group-hover:opacity-100",
                    theme === 'dark'? "text-red-600" : "text-red-400"
                  )} style={{ transform: 'rotate(-30deg)' }} />
                   <Wind size={24} className={cx(
                    "absolute bottom-1/4 -right-12 transition-all duration-500 group-hover:-translate-x-2 group-hover:text-orange-400 opacity-50 group-hover:opacity-100",
                    theme === 'dark'? "text-orange-600" : "text-orange-400"
                  )} style={{ transform: 'rotate(20deg)' }} />
                </div>
              </FadeIn>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <FadeIn delay={800}>
              <div className={cx(
                "text-sm font-medium animate-bounce",
                theme === 'dark'? "text-amber-500" : "text-slate-400"
              )}>
                <div className="flex flex-col items-center gap-2">
                  <span>Scroll to explore</span>
                  <div className="w-px h-12 bg-current opacity-40"></div>
                </div>
              </div>
            </FadeIn>
          </div>
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
                    Hello! I'm Kaitlin, a software engineer with a passion for creating engaging digital experiences
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
                    When I'm not coding, you'll find me exploring local coffee shops, sketching interface ideas,
                    or diving into the latest design trends. I believe that great software is not just about
                    functionality—it's about creating experiences that delight and inspire.
                  </p>
                </FadeIn>
                
                <FadeIn delay={400}>
                  <div className="flex items-center gap-4 mb-12">
                    <Sparkles className={cx(theme === 'dark'? "text-red-400" : "text-red-700")} size={24} />
                    <h3 className={cx(
                      "text-2xl font-medium",
                      theme === 'dark'? "text-stone-200" : "text-stone-800"
                    )}>Skills & Technologies</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {['JavaScript', 'React', 'Node.js', 'CSS', 'HTML', 'Git'].map((skill, index) => (
                      <div 
                        key={skill}
                        className={cx(
                          "px-4 py-3 rounded-2xl text-center font-medium transition-all duration-300 hover:-translate-y-1",
                          theme === 'dark' 
                           ? "bg-slate-800/50 text-stone-300 hover:bg-slate-700" 
                            : "bg-amber-100 text-stone-700 hover:bg-amber-200"
                        )}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>
              
              <div className="relative">
                <FadeIn delay={500} direction="left">
                  <div className={cx(
                    "sticky top-24 p-8 rounded-3xl",
                    theme === 'dark'? "bg-slate-800/30 border border-slate-700/50" : "bg-amber-100/80 border border-amber-200/80"
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
