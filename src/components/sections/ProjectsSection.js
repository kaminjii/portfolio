"use client";

import React, { useState, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import FadeIn from '../animations/FadeIn';

// Project data from resume
const projectsData = [
  {
    id: 'glow',
    title: 'Glow',
    description: 'iOS app built with SwiftUI, integrating Firebase Firestore for real-time data sync and offline functionality. Features include Firebase Auth with email and social sign-in options, and optimized image storage system.',
    points: [
      'Created iOS app with SwiftUI, integrating Firebase Firestore for real-time data sync and offline functionality',
      'Implemented Firebase Auth with email and social sign-in options, reducing authentification errors by 45%',
      'Developed Firebase Storage system with automatic image compression and caching, cutting load times by 65%'
    ],
    tech: ['SwiftUI', 'XCode', 'Firestore', 'Firebase Auth', 'Firebase Storage'],
    links: { 
      github: 'https://github.com/kaminjii/glow',
      live: 'https://glow-demo.app'
    },
    image: '/api/placeholder/600/300',
    featured: true
  },
  {
    id: 'dropawf',
    title: 'Dropawf',
    description: 'Full-stack courier service web application built with a team of 5 developers. Features include optimized queries, multi-screen forms, and user authentication for 5 user-roles using JWT.',
    points: [
      'Led 5 developers to create and deploy a full-stack courier service web application, boosting operational efficiency',
      'Optimized queries and implemented multi-screen forms, reducing data retrieval time by 25% and errors by 40%',
      'Implemented user authentication for 5 user-roles using JWT, enhancing data protection and user access control'
    ],
    tech: ['React.js', 'Node.js', 'HTML', 'CSS', 'MySQL', 'Azure'],
    links: { 
      github: 'https://github.com/kaminjii/dropawf',
      live: 'https://dropawf.pages.dev/'
    },
    image: '/api/placeholder/600/300',
    featured: true
  },
  {
    id: 'wordle',
    title: 'Wordle',
    description: 'Wordle game with modular, reusable components. Features include Jenkins CI/CD for streamlined development and an integrated spell-check and word selection API.',
    points: [
      'Developed Wordle game with modular, reusable components, reducing code duplication and improving scalability',
      'Streamlined development with Jenkins CI/CD, boosting reliability and speeding up feature delivery by 10%',
      'Integrated spell-check and word selection API, reducing manual errors by 40%, streamlining workflow efficiency'
    ],
    tech: ['Python', 'Unittest', 'Coverage.py', 'Paver', 'Pygame', 'Jenkins', 'Subversion'],
    links: { 
      github: 'https://github.com/kaminjii/wordle'
    },
    image: null,
    featured: false
  },
  {
    id: 'asthma-hotspots',
    title: 'UPRR Asthma Hotspots',
    description: 'Data analysis project that performed EDA on 68,000+ records to identify trends and visualize correlations between asthma hot spots and UPRR lines.',
    points: [
      'Performed EDA on 68,000+ records, identifying trends to guide predictive models and improve accuracy by 15%',
      'Utilized Kepler.gl to visualize geospatial data, revealing correlations between asthma hot spots and UPRR lines',
      'Employed TensorFlow and PyTorch for data cleaning and model training, improving accuracy and data quality'
    ],
    tech: ['Python', 'Kepler.gl', 'Scikit-learn', 'PyTorch', 'TensorFlow'],
    links: { 
      github: 'https://github.com/kaminjii/asthma-analysis'
    },
    image: null,
    featured: false
  }
];

// Featured Project component with image
const FeaturedProject = ({ project, delay }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Handle card tilt effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const rotateY = ((x - width / 2) / width) * 3; // Max 3deg rotation
    const rotateX = -((y - height / 2) / height) * 3; // Max 3deg rotation
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    setIsHovered(false);
  };
  
  return (
    <FadeIn delay={delay} direction="up">
      <div 
        ref={cardRef}
        className="relative grid grid-cols-12 gap-4 items-center my-12"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Project image */}
        <div className="col-span-12 md:col-span-7 relative rounded overflow-hidden shadow-xl">
          <div 
            className={`absolute inset-0 bg-teal-400/20 z-10 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
          ></div>
          <a href={project.links.live || project.links.github} target="_blank" rel="noopener noreferrer" className="block">
            <img 
              src={project.image} 
              alt={project.title} 
              className={`w-full transition-all duration-700 ${isHovered ? 'scale-105 filter-none' : 'filter grayscale'}`}
            />
          </a>
        </div>
        
        {/* Project info */}
        <div className="col-span-12 md:col-span-5 z-20 md:text-right" style={{ transform: 'translateZ(10px)' }}>
          <p className="text-teal-400 font-mono mb-1">Featured Project</p>
          <h3 className="text-2xl font-bold text-gray-100 mb-3">{project.title}</h3>
          
          <div className="bg-gray-800/90 p-4 rounded my-4 shadow-xl backdrop-blur-sm">
            <p className="text-gray-300">{project.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-start md:justify-end mb-3">
            {project.tech.map((item, index) => (
              <span key={index} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                {item}
              </span>
            ))}
          </div>
          
          <div className="flex gap-4 justify-start md:justify-end">
            {project.links.github && (
              <a 
                href={project.links.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors transform hover:-translate-y-1 duration-200"
                aria-label="GitHub Repository"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
            
            {project.links.live && (
              <a 
                href={project.links.live} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors transform hover:-translate-y-1 duration-200"
                aria-label="Live Demo"
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

// Standard Project Card
const ProjectCard = ({ project, delay }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Handle card tilt effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const rotateY = ((x - width / 2) / width) * 5; // Max 5deg rotation
    const rotateX = -((y - height / 2) / height) * 5; // Max 5deg rotation
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    setIsHovered(false);
  };
  
  return (
    <FadeIn delay={delay}>
      <div 
        ref={cardRef}
        className={`border border-gray-800 rounded-lg p-6 h-full transition-all duration-300 ${isHovered ? 'bg-gray-800/30 border-gray-700 shadow-lg shadow-teal-500/5' : 'bg-gray-900/20 hover:border-gray-700'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-medium text-teal-400">{project.title}</h3>
          <div className="flex gap-3">
            {project.links.github && (
              <a 
                href={project.links.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors transform hover:-translate-y-1 duration-200"
                aria-label="GitHub Repository"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
            {project.links.live && (
              <a 
                href={project.links.live} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors transform hover:-translate-y-1 duration-200"
                aria-label="Live Demo"
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((item, index) => (
            <span key={index} className="text-xs bg-gray-800/70 text-gray-300 px-2 py-1 rounded">
              {item}
            </span>
          ))}
        </div>
      </div>
    </FadeIn>
  );
};

const ProjectsSection = ({ sectionRef }) => {
  // Filter featured and other projects
  const featuredProjects = projectsData.filter(project => project.featured);
  const otherProjects = projectsData.filter(project => !project.featured);
  
  return (
    <section ref={sectionRef} id="projects" className="min-h-screen py-20">
      <FadeIn>
        <h2 className="text-3xl font-bold mb-8 flex items-center">
          <span className="text-teal-400 opacity-70 mr-2">03.</span> Some Things I've Built
          <div className="h-px bg-gray-700 flex-grow ml-4"></div>
        </h2>
      </FadeIn>
      
      {/* Featured Projects */}
      <div className="mb-20">
        {featuredProjects.map((project, index) => (
          <FeaturedProject 
            key={project.id} 
            project={project} 
            delay={index * 100}
          />
        ))}
      </div>
      
      {/* Other Projects Grid */}
      <FadeIn>
        <h3 className="text-2xl font-semibold text-center mb-8">Other Noteworthy Projects</h3>
      </FadeIn>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherProjects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            delay={index * 100}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
