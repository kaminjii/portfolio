"use client";

import React, { useState, useRef, useEffect } from 'react';
import FadeIn from '../animations/FadeIn';

// Experience data from resume
const experienceData = [
  {
    id: 'mastercard',
    company: 'Mastercard',
    title: 'Software Engineer I',
    location: 'St. Louis, MO',
    period: 'February 2025 – Present',
    description: [
      'Recently started position focused on developing and maintaining financial technology solutions.',
      'Working with modern web technologies to create secure, scalable applications.',
      'Collaborating with cross-functional teams to deliver high-quality software products.'
    ]
  },
  {
    id: 'teaching-assistant',
    company: 'University of Houston',
    title: 'Teaching Assistant (Data Structures and Algorithms)',
    location: 'Houston, TX',
    period: 'August 2023 – December 2024',
    description: [
      'Assisted 450 students in understanding data structures, algorithms, and problem-solving, achieving 90% pass rate.',
      'Provided weekly office hours and review sessions for 50+ students, improving assignment completion rates by 15%.',
      'Increased student engagement by 10% by collaborating with the teaching team to design skill-specific problem sets.'
    ]
  },
  {
    id: 'research-assistant',
    company: 'HULA Lab',
    title: 'Undergraduate Research Assistant',
    location: 'Houston, TX',
    period: 'May 2023 – August 2023',
    description: [
      'Developed VR surgical training environments, incorporating eye-tracking and PVT outcomes to measure fatigue.',
      'Optimized machine learning algorithms by refining hyperparameters and data cleaning, improving speed by 7%.',
      'Reduced user fatigue by 15% with environment modifications, extending VR training sessions by up to 45 minutes.'
    ]
  }
];

// Experience item with timeline
const ExperienceItem = ({ experience, delay, isActive, onClick }) => {
  const itemRef = useRef(null);
  
  // Add useEffect for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-in-right');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }
    
    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);
  
  return (
    <FadeIn delay={delay}>
      <div 
        ref={itemRef}
        className={`relative pl-8 pb-8 border-l ${isActive ? 'border-teal-400' : 'border-gray-700'} group cursor-pointer opacity-0`}
        onClick={onClick}
        style={{ animationFillMode: 'forwards', animationDuration: '0.5s' }}
      >
        <div className={`absolute left-0 w-3 h-3 -translate-x-1/2 rounded-full transition-all duration-300 ${isActive ? 'bg-teal-400 scale-125' : 'bg-gray-700 group-hover:bg-gray-500'}`}></div>
        <div className={`transition-all duration-300 ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>
          <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
            <h3 className="text-lg font-medium text-white">
              {experience.title} @ <span className={isActive ? 'text-teal-400' : 'text-gray-400 group-hover:text-teal-300'}>
                {experience.company}
              </span>
            </h3>
            <span className="text-gray-400 text-sm">{experience.period}</span>
          </div>
          <p className="text-sm text-gray-400 mb-2">{experience.location}</p>
          {isActive && (
            <ul className="text-gray-300 space-y-2 mt-4">
              {experience.description.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-teal-400 mr-2 mt-1">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </FadeIn>
  );
};

// Tab-style experience component
const TabExperience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const contentRef = useRef(null);
  
  // Add hover effect to tabs
  const handleTabHover = (e) => {
    const tabRect = e.currentTarget.getBoundingClientRect();
    const offsetY = (e.clientY - tabRect.top - tabRect.height / 2) / 10;
    e.currentTarget.style.transform = `translateY(${offsetY}px)`;
  };
  
  const handleTabLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-6 mt-8">
      {/* Tabs */}
      <div className="md:w-48 flex md:flex-col overflow-x-auto snap-x snap-mandatory md:snap-none scrollbar-hide">
        {experienceData.map((exp, index) => (
          <button 
            key={exp.id}
            onClick={() => setActiveTab(index)}
            onMouseMove={handleTabHover}
            onMouseLeave={handleTabLeave}
            className={`py-3 px-4 text-left border-b-2 md:border-b-0 md:border-l-2 snap-start min-w-max transition-all duration-300
                       ${activeTab === index 
                         ? 'text-teal-400 border-teal-400 bg-teal-900/10' 
                         : 'text-gray-400 border-gray-700 hover:text-gray-100 hover:bg-gray-800/30'}`}
            style={{ transformOrigin: 'center left' }}
          >
            {exp.company}
          </button>
        ))}
      </div>
      
      {/* Content */}
      <div className="flex-1 relative h-64" ref={contentRef}>
        {experienceData.map((exp, index) => (
          <div 
            key={exp.id}
            className={`absolute w-full transition-all duration-500 ${
              activeTab === index 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-8 pointer-events-none'
            }`}
          >
            <h3 className="text-xl font-medium text-white mb-1">
              {exp.title} <span className="text-teal-400">@ {exp.company}</span>
            </h3>
            <p className="text-sm text-gray-400 mb-4">{exp.period}</p>
            <ul className="text-gray-300 space-y-3">
              {exp.description.map((item, index) => (
                <li key={index} className="flex items-start group">
                  <span className="text-teal-400 mr-2 mt-1 transition-transform duration-300 group-hover:translate-x-1">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Experience Section Component
const ExperienceSection = ({ sectionRef }) => {
  const [activeExp, setActiveExp] = useState(0);
  
  return (
    <section ref={sectionRef} id="experience" className="min-h-screen py-20">
      <FadeIn>
        <h2 className="text-3xl font-bold mb-8 flex items-center">
          <span className="text-teal-400 opacity-70 mr-2">02.</span> Experience
          <div className="h-px bg-gray-700 flex-grow ml-4"></div>
        </h2>
      </FadeIn>
      
      {/* Tab style for wide screens */}
      <div className="hidden md:block">
        <TabExperience />
      </div>
      
      {/* Timeline style for mobile */}
      <div className="block md:hidden mt-8">
        {experienceData.map((exp, index) => (
          <ExperienceItem 
            key={exp.id}
            experience={exp}
            delay={index * 100}
            isActive={activeExp === index}
            onClick={() => setActiveExp(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
