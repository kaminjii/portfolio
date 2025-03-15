"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Header from './Header';
import ParticleBackground from './ParticleBackground';
import FadeIn from './animations/FadeIn';
import CustomCursor from './animations/CustomCursor';
import ProjectsSection from './sections/ProjectsSection';
import ExperienceSection from './sections/ExperienceSection';
import ContactSection from './sections/ContactSection';
import Footer from './Footer';
import '../app/globals.css';
import { SiJavascript, SiReact, SiNodedotjs, SiTypescript, SiFirebase, SiPython, SiSwift, SiMysql, SiJenkins } from 'react-icons/si';
import { BiLogoAws, BiLogoJava } from "react-icons/bi";
import { PiFileCpp } from "react-icons/pi";

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  
  const sections = ['home', 'about', 'experience', 'projects', 'contact'];
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    contact: useRef(null)
  };

  // Handle scroll to detect active section
  useEffect(() => {
    const handleScroll = () => {
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
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Scroll to section
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
    'React': <SiReact className="text-blue-400" />,
    'Node.js': <SiNodedotjs className="text-green-400" />,
    'TypeScript': <SiTypescript className="text-blue-500" />,
    'Firebase': <SiFirebase className="text-yellow-500" />,
    'Python': <SiPython className="text-blue-300" />,
    'Swift/SwiftUI': <SiSwift className="text-orange-400" />,
    'SQL': <SiMysql className="text-blue-600" />,
    'AWS': <BiLogoAws className="text-orange-500" />,
    'Java': <BiLogoJava className="text-red-500" />,
    'C++': <PiFileCpp className="text-blue-400" />,
    'Jenkins': <SiJenkins className="text-red-400" />
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen relative">
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
            <h1 className="text-5xl sm:text-7xl font-bold text-gray-100 mb-4">Kaitlin Wood.</h1>
          </FadeIn>
          
          <FadeIn delay={300}>
            <div className="h-auto">
              <h2 className="text-4xl sm:text-6xl font-bold text-gray-400 typing-effect inline-block whitespace-nowrap leading-relaxed">
                I build things for the web.
              </h2>
            </div>
          </FadeIn>
          
          <FadeIn delay={400}>
            <p className="text-gray-300 max-w-xl mb-8">
              I'm a software engineer specializing in building exceptional digital experiences. 
              Currently, I'm focused on building accessible, user-centered products at {' '}
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
              <div className="h-px bg-gray-700 flex-grow ml-4"></div>
            </h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <FadeIn delay={100}>
                <p className="text-gray-300 mb-4">
                  Hello! I'm Kaitlin, a software engineer with a passion for creating engaging digital experiences.
                  I recently graduated from the University of Houston with a Bachelor of Science in Computer Science 
                  and a minor in Mathematics.
                </p>
              </FadeIn>
              
              <FadeIn delay={200}>
                <p className="text-gray-300 mb-4">
                  My journey in tech began with building web applications and games, and has evolved into a career
                  focused on creating efficient, user-friendly software solutions. I'm particularly interested in
                  web development, mobile applications, and data visualization.
                </p>
              </FadeIn>
              
              <FadeIn delay={300}>
                <p className="text-gray-300 mb-6">
                  Here are a few technologies I've been working with recently:
                </p>
              </FadeIn>
              
              <FadeIn delay={400}>
                <div className="relative py-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    {[
                      'JavaScript', 'React', 'Node.js', 
                      'TypeScript', 'Firebase', 'Python', 
                      'Swift/SwiftUI', 'SQL', 'AWS', 'Java',
                      'C++', 'Jenkins'
                    ].map((tech, index) => (
                      <div 
                        key={index} 
                        className="group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative p-3 border border-gray-800 rounded-md bg-gray-900/40 backdrop-blur-sm flex items-center hover:border-gray-700 transition-colors duration-300">
                          <span className="mr-2">{techIcons[tech]}</span>
                          <span className="text-gray-300 group-hover:text-white transition-colors">{tech}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
            
            <FadeIn delay={500} direction="left">
              <div className="group relative mx-auto max-w-xs">
                <div className="border-2 border-teal-400 absolute inset-0 rounded translate-x-5 translate-y-5 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3"></div>
                <div className="relative bg-teal-400/20 rounded overflow-hidden">
                  <div className="absolute inset-0 bg-teal-400 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-0"></div>
                  <img 
                    src="headshot.png" 
                    alt="Kaitlin Wood" 
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
        
        {/* Contact Section */}
        <ContactSection sectionRef={sectionRefs.contact} />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
