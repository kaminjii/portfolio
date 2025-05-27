import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, Layers } from 'lucide-react';
import FadeIn from '../animations/FadeIn'; 
import { useTheme } from '../../app/ThemeContext'; 
import useThemeClasses, { cx } from '../../app/ThemeUtils'; 

const projectsData = [
  {
    id: 'glow',
    title: 'Glow',
    subtitle: 'iOS Wellness App',
    description: 'iOS app built with SwiftUI, featuring real-time data sync and social authentication.',
    tech: ['Swift', 'XCode', 'Firebase'],
    image: '/glow.png', 
    color: 'from-red-400 to-orange-400', 
    featured: true, 
    category: 'mobile', 
    links: {} 
  },
  {
    id: 'dropawf',
    title: 'Dropawf',
    subtitle: 'Courier Service Platform',
    description: 'Full-stack courier service web application with multi-role authentication.',
    tech: ['React.js', 'Node.js', 'MySQL', 'Azure'],
    image: '/dropawf.png',
    color: 'from-orange-400 to-yellow-400',
    featured: true,
    category: 'web',
    links: {
      github: 'https://github.com/kaminjii/dropawf',
      live: 'https://dropawf.pages.dev/'
    }
  },
   {
    id: 'shades-of-dungeon',
    title: 'Shades of Dungeon',
    subtitle: 'Browser Game',
    description: 'Pixel art puzzle game with custom level creation and physics mechanics.',
    tech: ['React.js', 'Pixi.js'],
    image: '/shades.png',
    color: 'from-rose-400 to-pink-400',
    featured: true,
    category: 'games',
    links: {
      github: 'https://github.com/kaminjii/glassas',
      live: 'https://devpost.com/software/team-cuties-general-track'
    }
  },
  {
    id: 'wordle',
    title: 'Wordle',
    description: 'Word puzzle game with modular components and Jenkins CI/CD pipeline.',
    tech: ['Python', 'Pytest', 'Pygame', 'Jenkins'],
    links: { github: 'https://github.com/kaminjii/wordle'},
    image: 'https://placehold.co/600x400/7c2d12/e0e0e0?text=Wordle',
    featured: false,
    category: 'games',
  },
  {
    id: 'asthma-hotspots',
    title: 'UPRR Asthma Hotspots',
    description: 'Data analysis on 68K+ records to identify correlations between asthma hotspots and UPRR lines.',
    tech: ['Kepler.gl', 'Scikit-learn','TensorFlow'],
    links: { 
      live: 'https://docs.google.com/presentation/d/1JfcGZgNcTMChKZFgFx2aYGrDBVClSnuJjORsl8ye5jo/edit?usp=sharing'
    },
    image: null, 
    featured: false,
    category: 'web',
  },
  {
    id: 'fighting-game',
    title: 'Fighting Game',
    description: 'Unity fighting game with custom 2D animations and physics engine.',
    tech: ['Unity', 'C#', 'Clip Studio Paint'],
    links: { 
      live: 'https://drive.google.com/file/d/1xbz7PjArosTPKJZpQbfft8_FvMhjy1OK/view?usp=sharing'
    },
    image: null,
    featured: false,
    category: 'games',
  },
  {
    id: 'pager-plus',
    title: 'Pager+',
    description: 'Network pager system with Twilio SMS integration and AI risk assessment.',
    tech: ['Python', 'Twilio', 'Streamlit'],
    links: { 
      github: 'https://github.com/kaminjii/pager-plus'
    },
    image: null,
    featured: false,
    category: 'web',
  },
  {
    id: 'dsl',
    title: 'Domain-Specific Language',
    description: 'Custom programming language with parser, interpreter, and REPL interface.',
    tech: ['Ruby', 'Kotlin', 'Java'],
    links: {},
    image: null,
    featured: false,
    category: 'other',
  },
  {
    id: 'entropy',
    title: 'Incremental Entropy Calculator',
    description: 'Multithreaded C++ program for real-time entropy computation from data streams.',
    tech: ['C++'],
    links: { },
    image: null,
    featured: false,
    category: 'other',
  },
];

// Simple featured project card
const FeaturedProjectCard = ({ project, index }) => {
  const { theme } = useTheme(); 
  const accentColorSubtitle = theme === 'dark' ? "text-red-300" : "text-red-700"; 
  
  return (
    <FadeIn delay={index * 100} className="w-full">
      <div className="group relative"> 
        <div className={cx(
          "relative rounded-2xl overflow-hidden transition-all duration-500",
          theme === 'dark' ? "bg-stone-900" : "bg-white",
          "shadow-lg hover:shadow-xl hover:shadow-red-500/10 transform hover:-translate-y-1" 
        )}>
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <div className={cx(
              "absolute inset-0 bg-gradient-to-br opacity-60 mix-blend-multiply z-10 transition-opacity duration-300 group-hover:opacity-30",
              project.color 
            )}></div>
            
            <Image
              src={project.image || `https://placehold.co/600x400/${project.color?.split('-')[1]?.split('/')[0] || 'CCCCCC'}/FFFFFF?text=${encodeURIComponent(project.title)}`}
              alt={project.title}
              layout="fill" 
              objectFit="cover"
              className="transition-transform duration-500 group-hover:scale-105" 
            />
            
            {/* Links */}
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx(
                    "p-2 rounded-full backdrop-blur-md transition-all duration-300",
                    theme === 'dark' 
                      ? "bg-stone-900/70 text-stone-200 hover:bg-stone-800 hover:text-red-400" 
                      : "bg-white/70 text-stone-700 hover:bg-white hover:text-red-600"
                  )}
                >
                  <Github size={16} />
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx(
                    "p-2 rounded-full backdrop-blur-md transition-all duration-300",
                    theme === 'dark' 
                      ? "bg-stone-900/70 text-stone-200 hover:bg-stone-800 hover:text-red-400" 
                      : "bg-white/70 text-stone-700 hover:bg-white hover:text-red-600"
                  )}
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6"> 
            <div className="mb-3">
              <h3 className={cx(
                "text-xl font-medium mb-1 font-serif",
                theme === 'dark' ? "text-stone-100" : "text-stone-900"
              )}>
                {project.title}
              </h3>
              <p className={cx("text-sm font-medium", accentColorSubtitle)}>
                {project.subtitle}
              </p>
            </div>
            
            <p className={cx(
              "mb-4 text-sm",
              theme === 'dark' ? "text-stone-300" : "text-stone-600"
            )}>
              {project.description} 
            </p>
            
            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech} 
                  className={cx(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    theme === 'dark' 
                      ? "bg-stone-800 text-stone-300" 
                      : "bg-stone-100 text-stone-700"
                  )}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

// Simple standard project card
const ProjectCard = ({ project, delay }) => {
  const { theme } = useTheme();
  const accentColorTitle = theme === 'dark' ? "text-red-400" : "text-red-500"; 

  return (
    <FadeIn delay={delay} className="w-full"> 
      <div className={cx(
        "border rounded-xl p-6 transition-all duration-300",
        theme === 'dark' 
          ? "bg-stone-900/30 hover:bg-stone-800/50 border-stone-800 hover:border-stone-700"
          : "bg-white/60 hover:bg-white border-gray-200 hover:border-gray-300",
        "hover:shadow-lg hover:shadow-red-500/10 hover:-translate-y-1"
      )}>
        <div className="flex justify-between items-start mb-3">
          <h3 className={cx("text-lg font-medium font-serif", accentColorTitle)}>
            {project.title}
          </h3>
          <div className="flex gap-3">
            {project.links.github && (
              <a 
                href={project.links.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={cx(
                  "transition-colors",
                  theme === 'dark' ? "text-gray-400 hover:text-red-400" : "text-gray-500 hover:text-red-600"
                )}
              >
                <Github size={18} />
              </a>
            )}
            {project.links.live && (
              <a 
                href={project.links.live} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={cx(
                  "transition-colors",
                  theme === 'dark' ? "text-gray-400 hover:text-red-400" : "text-gray-500 hover:text-red-600"
                )}
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
        
        <p className={cx(
          "mb-4 text-sm",
          theme === 'dark' ? "text-gray-300" : "text-gray-600"
        )}>
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2"> 
          {project.tech.map((item, techIndex) => ( 
            <span 
              key={techIndex} 
              className={cx(
                "text-xs px-2 py-1 rounded",
                theme === 'dark' 
                  ? "bg-stone-800/70 text-stone-300" 
                  : "bg-stone-100 text-stone-700"
              )}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </FadeIn>
  );
};

// Main simplified projects section
const ProjectsSection = ({ sectionRef }) => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all'); 
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Filter projects by category
  const activeProjects = projectsData.filter(project => {
    if (selectedCategory === 'all') return true;
    return project.category === selectedCategory; 
  });

  const featuredProjects = activeProjects.filter(project => project.featured);
  const otherProjects = activeProjects.filter(project => !project.featured);
  
  const categories = ['all', 'web', 'mobile', 'games', 'other']; 

  const accentColorText = theme === 'dark' ? "text-red-400" : "text-red-600";
  const categoryButtonActiveBg = theme === 'dark' ? "bg-red-600 text-white" : "bg-red-700 text-white";
  const categoryButtonIdleBg = theme === 'dark' ? "bg-stone-800 text-stone-300 hover:bg-stone-700" : "bg-stone-100 text-stone-700 hover:bg-stone-200";
  const viewAllButtonBg = theme === 'dark' ? "bg-stone-800 text-stone-200 hover:bg-stone-700 hover:text-red-400" : "bg-stone-100 text-stone-800 hover:bg-stone-200 hover:text-red-600";

  return (
    <section ref={sectionRef} id="projects" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <span className={cx("font-medium text-sm uppercase tracking-wider", accentColorText)}>
              Portfolio
            </span>
            <h2 className={cx(
              "text-4xl sm:text-5xl lg:text-6xl font-serif mt-4 mb-8",
              theme === 'dark' ? "text-stone-100" : "text-stone-900"
            )}>
              Featured Projects
            </h2>
            
            {/* Category filters */}
            <div className="flex justify-center gap-3 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category} 
                  onClick={() => setSelectedCategory(category)}
                  className={cx(
                    "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    selectedCategory === category
                      ? categoryButtonActiveBg 
                      : categoryButtonIdleBg 
                  )}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)} 
                </button>
              ))}
            </div>
          </div>
        </FadeIn>
        
        {/* Featured Projects */}
        {featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 items-start">
            {featuredProjects.map((project, index) => (
              <FeaturedProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <FadeIn>
            <p className={cx("text-center text-lg mb-20", theme === 'dark' ? 'text-stone-400' : 'text-stone-600')}>
              No featured projects in this category.
            </p>
          </FadeIn>
        )}
        
        {/* Show more button */}
        {otherProjects.length > 0 && (
          <FadeIn delay={200}> 
            <div className="text-center">
              <button 
                onClick={() => setShowAllProjects(!showAllProjects)}
                className={cx(
                  "inline-flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all duration-300",
                  viewAllButtonBg
                )}
              >
                <Layers size={20} />
                {showAllProjects ? 'Show Less' : `View More Projects (${otherProjects.length})`}
              </button>
            </div>
          </FadeIn>
        )}

        {/* Other Projects */}
        {showAllProjects && (
          <div className="mt-16">
            <FadeIn>
              <h3 className={cx(
                "text-3xl font-serif mb-12 text-center",
                theme === 'dark' ? "text-stone-100" : "text-stone-900"
              )}>
                More Projects
              </h3>
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
          </div>
        )}
        
        {/* Simple background decoration */}
        <div className={cx(
          "absolute -left-40 top-1/4 w-96 h-96 bg-gradient-to-br rounded-full blur-3xl -z-10 opacity-20",
          theme === 'dark' ? "from-red-400/10 to-orange-400/10" : "from-red-500/10 to-orange-500/10"
        )}></div>
        <div className={cx(
          "absolute -right-40 bottom-1/4 w-96 h-96 bg-gradient-to-tl rounded-full blur-3xl -z-10 opacity-15",
          theme === 'dark' ? "from-purple-400/10 to-pink-400/10" : "from-purple-500/10 to-pink-500/10"
        )}></div>
      </div>
    </section>
  );
};

export default ProjectsSection;
