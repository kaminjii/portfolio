"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Header from './Header';
import ParticleBackground from './ParticleBackground';
import FadeIn from './animations/FadeIn';
import CustomCursor from './animations/CustomCursor';
import ProjectsSection from './sections/ProjectsSection';
import ExperienceSection from './sections/ExperienceSection';
import ContactSection from './sections/ContactSection';
import Footer from './Footer';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../app/ThemeContext';
import useThemeClasses, { cx } from '../app/ThemeUtils';
import '../app/globals.css';
import { SiJavascript, SiReact, SiNodedotjs, SiTypescript, SiFirebase, SiPython, SiSwift, SiMysql, SiJenkins, SiDocker, SiKubernetes, SiGraphql, SiRedux, SiSass, SiWebpack, SiPytest, SiTailwindcss, SiNextdotjs, SiIntellijidea, SiXcode, SiExpo, SiApachemaven, SiJunit5, SiJest, SiGithub } from 'react-icons/si';
import { BiLogoAws, BiLogoJava } from "react-icons/bi";
import { PiFileCpp } from "react-icons/pi";
import { VscAzure, VscVscode } from "react-icons/vsc";
import GitHubSection from './sections/GitHubSection';
import PerformanceDashboard from './sections/PerformanceDashboard';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showHiddenTech, setShowHiddenTech] = useState(false);
  const { theme } = useTheme();
  
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
    contact: contactRef
  }), [homeRef, aboutRef, experienceRef, projectsRef, contactRef]);

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
        behavior: 'smooth'
      });
      setActiveSection(section);
    }
  };

  const techIcons = {
    'JavaScript': <SiJavascript className="text-yellow-400" />,
    'TypeScript': <SiTypescript className="text-blue-500" />,
    'Python': <SiPython className="text-blue-300" />,
    'Java': <BiLogoJava className="text-red-500" />,
    'C++': <PiFileCpp className="text-blue-400" />,
    'SQL': <SiMysql className="text-cyan-600" />,
    'React.js': <SiReact className="text-blue-400" />,
    'Node.js': <SiNodedotjs className="text-green-400" />,
    'Express.js': <SiNodedotjs className="text-green-400" />,
    'Next.js': <SiNextdotjs className={theme === 'dark' ? "text-gray-400" : "text-gray-600"} />,
    'TailwindCSS': <SiTailwindcss className="text-teal-400" />,
    'Swift/SwiftUI': <SiSwift className="text-amber-600" />,
    'HTML/CSS': <SiSass className="text-orange-400" />,
    'Azure': <VscAzure className="text-blue-400" />,
    'AWS': <BiLogoAws className="text-orange-500" />,
    'Jenkins': <SiJenkins className="text-red-400" />,
    'Firebase': <SiFirebase className="text-yellow-500" />,
    'Git/GitHub': <SiGithub className={theme === 'dark' ? "text-gray-400" : "text-gray-600"} />,
    'VSCode': <VscVscode className="text-sky-400" />,
    'IntelliJ': <SiIntellijidea className="text-blue-500" />,
    'XCode': <SiXcode className="text-sky-500" />,
    'Expo': <SiExpo className={theme === 'dark' ? "text-gray-400" : "text-gray-600"} />,
    'Maven': <SiApachemaven className="text-rose-700" />,
    'JUnit': <SiJunit5 className="text-red-500" />,
    'Pytest': <SiPytest className="text-cyan-400" />,
    'Jest': <SiJest className="text-pink-900" />,
  };

  const mainTechnologies = [
    'JavaScript', 'TypeScript', 'Python', 'React.js', 'Node.js', 
    'SQL', 'AWS', 'Firebase', 'Swift/SwiftUI'
  ];

  const hiddenTechnologies = [
    'TailwindCSS', 'Java', 'C++', 'Express.js', 'Next.js', 'HTML/CSS', 'Azure', 
    'Jenkins', 'Git/GitHub', 'VSCode', 'IntelliJ', 'XCode', 
    'Expo', 'Maven', 'JUnit', 'Pytest', 'Jest'
  ];

  return (
    <div className={cx(
      "min-h-screen relative",
      theme === 'dark' ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
    )}>
      <CustomCursor />
      <ParticleBackground />
      
      <Header 
        activeSection={activeSection} 
        sections={sections} 
        scrollToSection={scrollToSection} 
      />
      
      <main className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        {/* Home Section */}
        <section ref={sectionRefs.home} id="home" className="min-h-screen flex flex-col justify-center py-20">
          
          <FadeIn delay={100}>
            <p className="text-teal-400 mb-4 font-mono">Hi, my name is</p>
          </FadeIn>
          
          <FadeIn delay={200}>
            <h1 className={cx(
              "text-5xl sm:text-7xl font-bold mb-4",
              theme === 'dark' ? "text-gray-100" : "text-gray-900"
            )}>Kaitlin Wood</h1>
          </FadeIn>
          
          <FadeIn delay={300}>
            <div className="h-auto">
              <h2 className={cx(
                "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold typing-effect inline-block leading-relaxed",
                theme === 'dark' ? "text-gray-400" : "text-gray-500"
              )}>
                I am a Software Engineer.
              </h2>
            </div>
          </FadeIn>
          
          <FadeIn delay={400}>
            <p className={cx(
              "max-w-xl mb-8",
              theme === 'dark' ? "text-gray-300" : "text-gray-600"
            )}>
              Currently, I&apos;m focused on building accessible, user-centered products and improving web development skills at {' '}
              <a href="#" className="text-teal-400 hover:underline link-underline">Mastercard</a>.
            </p>
          </FadeIn>
          
          <FadeIn delay={500}>
            <button 
              onClick={() => scrollToSection('projects')}
              className="group flex items-center gap-2 border border-teal-400 text-teal-400 px-6 py-3 rounded hover:bg-teal-900/20 transition-all duration-300 button-hover-effect"
            >
              Check out my work 
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={18} />
            </button>
          </FadeIn>
        </section>
        
        {/* About Section */}
        <section ref={sectionRefs.about} id="about" className="min-h-screen py-20">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <span className="text-teal-400 opacity-70 mr-2">01.</span> About Me
              <div className={cx(
                "h-px flex-grow ml-4",
                theme === 'dark' ? "bg-gray-700" : "bg-gray-300"
              )}></div>
            </h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <FadeIn delay={100}>
                <p className={cx(
                  "mb-4",
                  theme === 'dark' ? "text-gray-300" : "text-gray-600"
                )}>
                  Hello! I&apos;m Kaitlin, a software engineer with a passion for creating engaging digital experiences.
                  I recently graduated from the University of Houston with a Bachelor of Science in Computer Science 
                  and a minor in Mathematics.
                </p>
              </FadeIn>
              
              <FadeIn delay={200}>
                <p className={cx(
                  "mb-4",
                  theme === 'dark' ? "text-gray-300" : "text-gray-600"
                )}>
                  My journey in tech began with building web applications and games, and has evolved into a career
                  focused on creating efficient, user-friendly software solutions. I&apos;m particularly interested in
                  web development, mobile applications, and data visualization.
                </p>
              </FadeIn>
              
              <FadeIn delay={300}>
                <p className={cx(
                  "mb-6",
                  theme === 'dark' ? "text-gray-300" : "text-gray-600"
                )}>
                  Here are a few technologies I&apos;ve been working with recently:
                </p>
              </FadeIn>
              
              <FadeIn delay={400}>
                <div className="relative py-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    {mainTechnologies.map((tech, index) => (
                      <div 
                        key={index} 
                        className="group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className={cx(
                          "relative p-3 border rounded-md backdrop-blur-sm flex items-center transition-colors duration-300",
                          theme === 'dark' 
                            ? "border-gray-800 bg-gray-900/40 hover:border-gray-700" 
                            : "border-gray-200 bg-white/40 hover:border-gray-300"
                        )}>
                          <span className="mr-2">{techIcons[tech]}</span>
                          <span className={cx(
                            "transition-colors",
                            theme === 'dark' 
                              ? "text-gray-300 group-hover:text-white" 
                              : "text-gray-700 group-hover:text-black"
                          )}>{tech}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {showHiddenTech && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-4">
                      {hiddenTechnologies.map((tech, index) => (
                        <div 
                          key={index} 
                          className="group relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className={cx(
                            "relative p-3 border rounded-md backdrop-blur-sm flex items-center transition-colors duration-300",
                            theme === 'dark' 
                              ? "border-gray-800 bg-gray-900/40 hover:border-gray-700" 
                              : "border-gray-200 bg-white/40 hover:border-gray-300"
                          )}>
                            <span className="mr-2">{techIcons[tech]}</span>
                            <span className={cx(
                              "transition-colors",
                              theme === 'dark' 
                                ? "text-gray-300 group-hover:text-white" 
                                : "text-gray-700 group-hover:text-black"
                            )}>{tech}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <button 
                    onClick={() => setShowHiddenTech(!showHiddenTech)}
                    className="mt-4 text-teal-400 hover:underline"
                  >
                    {showHiddenTech ? 'Show Less' : 'Show More'}
                  </button>
                </div>
              </FadeIn>
            </div>
            
            <FadeIn delay={500} direction="left">
              <div className="group relative mx-auto max-w-xs">
                <div className="border-2 border-teal-400 absolute inset-0 rounded translate-x-5 translate-y-5 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3"></div>
                <div className={cx(
                  "relative rounded overflow-hidden",
                  theme === 'dark' ? "bg-teal-400/20" : "bg-teal-400/10"
                )}>
                  <div className={cx(
                    "absolute inset-0 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-0",
                    theme === 'dark' ? "bg-teal-400" : "bg-teal-300"
                  )}></div>
                  <Image 
                    src="/headshot.png" 
                    alt="Kaitlin Wood" 
                    width={300}
                    height={400}
                    className="relative z-10 mx-auto transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
        
        {/* Experience Section */}
        <ExperienceSection sectionRef={sectionRefs.experience} />
        
        {/* Projects Section */}
        <ProjectsSection sectionRef={sectionRefs.projects} />

        {/* GitHub Section */}
        <GitHubSection sectionRef={sectionRefs.github} />
        
        {/* Contact Section */}
        <ContactSection sectionRef={sectionRefs.contact} />
      </main>
      
      <Footer />

      {/* Theme Toggle Button */}
      <ThemeToggle />

      <PerformanceDashboard />
    </div>
  );
};

export default App;
