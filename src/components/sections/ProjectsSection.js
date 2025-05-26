import React, { useState, useRef } from 'react';
import Image from 'next/image'; // Make sure to handle Image imports if using Next.js
import { ExternalLink, Github, Code2, Layers } from 'lucide-react';
import FadeIn from '../animations/FadeIn'; // Assuming path
import { useTheme } from '../../app/ThemeContext'; // Assuming path
import useThemeClasses, { cx } from '../../app/ThemeUtils'; // Assuming path

const projectsData = [
  {
    id: 'glow',
    title: 'Glow',
    subtitle: 'iOS Wellness App',
    description: 'A beautifully crafted iOS app built with SwiftUI, featuring real-time data sync and social authentication.',
    longDescription: 'iOS app built with SwiftUI, integrating Firebase Firestore for real-time data sync and offline functionality. Features include Firebase Auth with email and social sign-in options, and optimized image storage system.',
    points: [ /* Placeholder for bullet points */ ],
    tech: ['Swift', 'XCode', 'Firebase'],
    image: '/glow.png', // Actual image path
    color: 'from-red-400 to-orange-400', // Gradient color for card styling
    featured: true, // Boolean to mark as a featured project
    category: 'mobile', // Category for filtering
    links: {} // Object for project links (e.g., GitHub, live demo)
  },
  {
    id: 'dropawf',
    title: 'Dropawf',
    subtitle: 'Courier Service Platform',
    description: 'Full-stack web application streamlining courier services with multi-role authentication.',
    longDescription: 'Full-stack courier service web application built with a team of 5 developers. Features include optimized queries, multi-screen forms, and user authentication for 5 user-roles using JWT.',
    points: [ /* Placeholder */ ],
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
    description: 'Pixel art puzzle game featuring innovative mechanics and custom level creation.',
    longDescription: 'Browser-based pixel art game featuring recoil mechanics, collision control, and four original puzzles using Pixi.js and React.js. Built an intuitive level creation interface, improving modification efficiency, and optimized movement mechanics for smoother animations.',
    points: [],
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
    description: 'Wordle game with modular, reusable components. Features include Jenkins CI/CD for streamlined development and an integrated spell-check and word selection API.',
    points: [],
    tech: ['Python', 'Pytest', 'Pygame', 'Jenkins'],
    links: { github: 'https://github.com/kaminjii/wordle'},
    image: 'https://placehold.co/600x400/7c2d12/e0e0e0?text=Wordle', // Placeholder image
    featured: false,
    category: 'games',
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
    tech: ['Kepler.gl', 'Scikit-learn','TensorFlow'],
    links: { 
      live: 'https://docs.google.com/presentation/d/1JfcGZgNcTMChKZFgFx2aYGrDBVClSnuJjORsl8ye5jo/edit?usp=sharing'
    },
    image: null, // Will use placeholder defined in Image component
    featured: false,
    category: 'web', // Kepler.gl implies web visualization
  },
  {
    id: 'fighting-game',
    title: 'Fighting Game',
    description: 'Fighting game built with Unity, featuring 2D character models and custom animations. Developed a custom physics engine for realistic movement and collision detection.',
    points: [],
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
    description: 'Network pager system built with Python, integrating Twilio API for SMS messaging and Flask for web server. Features include AI risk assessment, message scheduling, and real-time message status updates.',
    points: [],
    tech: ['Python', 'Twilio', 'Streamlit'],
    links: { 
      github: 'https://github.com/kaminjii/pager-plus'
    },
    image: null,
    featured: false,
    category: 'web', // Streamlit is web-based
  },
  {
    id: 'dsl',
    title: 'Domain-Specific Language',
    description: 'DSL projects built with Kotlin and Ruby, featuring a custom parser and interpreter for a simplified programming language. Developed a REPL for real-time code execution and error handling.',
    points: [],
    tech: ['Ruby', 'Kotlin', 'Java', 'Subversion'],
    links: {},
    image: null,
    featured: false,
    category: 'other', // General software category for projects not fitting other specific categories
  },
  {
    id: 'entropy',
    title: 'Incremental Entropy Calculator',
    description: 'C++ project designed to efficiently compute entropy from a continuous stream of data using multithreading and locks for concurrency control. The program processes incoming data in chunks, updating entropy calculations incrementally while ensuring thread safety.',
    points: [],
    tech: ['C++'],
    links: { },
    image: null,
    featured: false,
    category: 'other',
  },
];


// Component for displaying a featured project card.
const FeaturedProjectCard = ({ project, index }) => {
  const { theme } = useTheme(); // Access current theme (light/dark)
  const accentColorSubtitle = theme === 'dark' ? "text-red-300" : "text-red-700"; // Theme-dependent subtitle color
  
  return (
    // FadeIn animation wrapper with a delay based on the card's index.
    <FadeIn delay={index * 100} className="h-full"> {/* Ensure FadeIn takes full height */}
      <div className="group relative h-full"> {/* Group for hover effects, takes full height */}
        {/* Main card container with styling and transitions */}
        <div className={cx(
          "relative h-full rounded-3xl overflow-hidden transition-all duration-700",
          theme === 'dark' ? "bg-stone-900" : "bg-white", // Theme-based background
          "shadow-lg hover:shadow-2xl hover:shadow-red-500/10 transform hover:-translate-y-2" // Hover effects
        )}>
          {/* Image container */}
          <div className="relative h-64 overflow-hidden">
            {/* Gradient overlay on image, fades out on hover */}
            <div className={cx(
              "absolute inset-0 bg-gradient-to-br opacity-60 mix-blend-multiply z-10 transition-opacity duration-300 group-hover:opacity-0",
              project.color 
            )}></div>
            
            {/* Project Image */}
            <Image
              src={project.image || `https://placehold.co/600x400/${project.color?.split('-')[1]?.split('/')[0] || 'CCCCCC'}/FFFFFF?text=${encodeURIComponent(project.title)}`}
              alt={project.title}
              layout="fill" // Fills the parent container
              objectFit="cover" // Covers the container, cropping if necessary
              className="transition-transform duration-700 group-hover:scale-110" // Zoom effect on hover
            />
            
            {/* Links (GitHub, Live Demo) positioned at top-right */}
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx(
                    "p-2.5 rounded-full backdrop-blur-md transition-all duration-300",
                    theme === 'dark' 
                      ? "bg-stone-900/70 text-stone-200 hover:bg-stone-800 hover:text-red-400" 
                      : "bg-white/70 text-stone-700 hover:bg-white hover:text-red-600"
                  )}
                  onClick={(e) => e.stopPropagation()} // Prevent card click when link is clicked
                  aria-label={`${project.title} GitHub repository`}
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
                    "p-2.5 rounded-full backdrop-blur-md transition-all duration-300",
                    theme === 'dark' 
                      ? "bg-stone-900/70 text-stone-200 hover:bg-stone-800 hover:text-red-400" 
                      : "bg-white/70 text-stone-700 hover:bg-white hover:text-red-600"
                  )}
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`${project.title} live demo`}
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
            
            {/* Decorative project index number */}
            <div className={cx(
              "absolute bottom-4 left-4 text-6xl font-light z-20",
              theme === 'dark' ? "text-white/20" : "text-white/30" // Semi-transparent text
            )}>
              0{index + 1}
            </div>
          </div>
          
          {/* Project details section */}
          <div className="p-6 md:p-8"> {/* Responsive padding */}
            <div className="mb-4">
              <h3 className={cx(
                "text-xl md:text-2xl font-medium mb-1 font-serif", // Responsive text size
                theme === 'dark' ? "text-stone-100" : "text-stone-900"
              )}>
                {project.title}
              </h3>
              <p className={cx("text-sm font-medium", accentColorSubtitle)}>
                {project.subtitle}
              </p>
            </div>
            
            <p className={cx(
              "mb-6 line-clamp-3 text-sm", // Limits description to 3 lines
              theme === 'dark' ? "text-stone-300" : "text-stone-600"
            )}>
              {project.longDescription || project.description} {/* Fallback to short description if long is not available */}
            </p>
            
            {/* Tech stack tags */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech} // Assuming tech names are unique within a project
                  className={cx(
                    "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
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

// Component for displaying a standard (non-featured) project card.
const ProjectCard = ({ project, delay }) => {
  const cardRef = useRef(null); // Ref for accessing the card DOM element
  const [isHovered, setIsHovered] = useState(false); // State to track hover status
  const { theme } = useTheme();
  const accentColorTitle = theme === 'dark' ? "text-red-400" : "text-red-500"; // Title color based on theme

  // Mouse move handler for 3D tilt effect on hover
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateY = ((x - width / 2) / width) * 3; // Calculate Y rotation
    const rotateX = -((y - height / 2) / height) * 3; // Calculate X rotation
    // Apply transform for 3D effect
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };
  
  // Mouse leave handler to reset 3D tilt effect
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    setIsHovered(false); // Reset hover state
  };
  
  return (
    <FadeIn delay={delay} className="h-full"> {/* Ensure FadeIn takes full height */}
      <div 
        ref={cardRef}
        className={cx(
          "border rounded-xl p-6 h-full transition-all duration-300 flex flex-col", // Flex column for layout, full height
          theme === 'dark' 
            ? isHovered // Conditional styling based on hover state and theme
              ? "bg-stone-800/50 border-stone-700 shadow-lg shadow-red-500/10"
              : "bg-stone-900/30 hover:border-stone-700 border-stone-800"
            : isHovered 
              ? "bg-white border-gray-300 shadow-lg shadow-red-500/10"
              : "bg-white/60 hover:border-gray-300 border-gray-200"
        )}
        onMouseEnter={() => setIsHovered(true)} // Set hover state on mouse enter
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }} // Optimize for transform animations
      >
        {/* Project title and links */}
        <div className="flex justify-between items-start mb-4">
          <h3 className={cx("text-lg md:text-xl font-medium font-serif", accentColorTitle)}>{project.title}</h3>
          <div className="flex gap-3">
            {project.links.github && (
              <a 
                href={project.links.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={cx(
                  "transition-colors transform hover:-translate-y-0.5 duration-200",
                  theme === 'dark' ? "text-gray-400 hover:text-red-400" : "text-gray-500 hover:text-red-600"
                )}
                aria-label={`${project.title} GitHub Repository`}
              >
                <Github size={20} />
              </a>
            )}
            {project.links.live && (
              <a 
                href={project.links.live} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={cx(
                  "transition-colors transform hover:-translate-y-0.5 duration-200",
                  theme === 'dark' ? "text-gray-400 hover:text-red-400" : "text-gray-500 hover:text-red-600"
                )}
                aria-label={`${project.title} live demo`}
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
        {/* Project description */}
        <p className={cx(theme === 'dark' ? "text-gray-300 mb-4" : "text-gray-600 mb-4", "text-sm")}>
          {project.description}
        </p>
        {/* Tech stack tags, pushed to the bottom of the card */}
        <div className="flex flex-wrap gap-2 mt-auto"> 
          {project.tech.map((item, techIndex) => ( // Changed key to techIndex for simple list
            <span 
              key={techIndex} 
              className={cx(
                "flex items-center gap-1.5 text-xs px-2 py-1 rounded",
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


// Main component for the Projects section.
const ProjectsSection = ({ sectionRef }) => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all'); // State for the active category filter
  const [showAllProjects, setShowAllProjects] = useState(false); // State to toggle visibility of non-featured projects
  
  // Uncomment to debug: Log when selectedCategory changes
  // useEffect(() => {
  //   console.log("Selected category changed to:", selectedCategory);
  //   // Optional: Reset showAllProjects when category changes for a cleaner UX
  //   // setShowAllProjects(false); 
  // }, [selectedCategory]);

  // Filter projects based on the selected category.
  const activeProjects = projectsData.filter(project => {
    if (selectedCategory === 'all') {
      return true; // Show all projects if 'all' is selected
    }
    return project.category === selectedCategory; // Otherwise, filter by category
  });
  // Uncomment to debug: Log the active (filtered) projects
  // console.log(`Active projects for category "${selectedCategory}":`, activeProjects.map(p=>p.title));


  // Separate featured and other projects from the active (filtered) list.
  const featuredProjects = activeProjects.filter(project => project.featured);
  const otherProjects = activeProjects.filter(project => !project.featured);
  
  // Uncomment to debug: Log the featured and other projects
  // console.log("Featured projects:", featuredProjects.map(p=>p.title));
  // console.log("Other projects:", otherProjects.map(p=>p.title));
  
  // Define categories for filter buttons.
  const categories = ['all', 'web', 'mobile', 'games', 'other']; 

  // Theme-dependent Tailwind CSS classes for styling.
  const accentColorText = theme === 'dark' ? "text-red-400" : "text-red-600";
  const categoryButtonActiveBg = theme === 'dark' ? "bg-red-600 text-white" : "bg-red-700 text-white";
  const categoryButtonIdleBg = theme === 'dark' ? "bg-stone-800 text-stone-300 hover:bg-stone-700" : "bg-stone-100 text-stone-700 hover:bg-stone-200";
  const viewAllButtonBg = theme === 'dark' ? "bg-stone-800 text-stone-200 hover:bg-stone-700 hover:text-red-400" : "bg-stone-100 text-stone-800 hover:bg-stone-200 hover:text-red-600";
  const decorativeBlobColorFrom = theme === 'dark' ? "from-red-400/5" : "from-red-500/5";
  const decorativeBlobColorTo = theme === 'dark' ? "to-orange-400/5" : "to-orange-500/5";

  return (
    <section ref={sectionRef} id="projects" className="py-24 md:py-32 relative font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header with title and category filters */}
        <FadeIn>
          <div className="text-center mb-12 md:mb-16">
            <span className={cx("font-medium text-sm uppercase tracking-wider", accentColorText)}>Portfolio</span>
            <h2 className={cx(
              "text-4xl sm:text-5xl lg:text-6xl font-serif mt-3 sm:mt-4 mb-6 sm:mb-8",
              theme === 'dark' ? "text-stone-100" : "text-stone-900"
            )}>
              Featured Projects
            </h2>
            
            {/* Category filter buttons */}
            <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
              {categories.map((categoryButtonValue) => ( // Renamed for clarity from 'category' to avoid conflict
                <button
                  key={categoryButtonValue} // Use category value for key
                  onClick={() => {
                    // console.log("Button clicked, setting category to:", categoryButtonValue);
                    setSelectedCategory(categoryButtonValue); 
                  }}
                  className={cx(
                    "px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2",
                    theme === 'dark' ? 'focus:ring-offset-stone-900 focus:ring-red-500' : 'focus:ring-offset-white focus:ring-red-500',
                    selectedCategory === categoryButtonValue
                      ? categoryButtonActiveBg 
                      : categoryButtonIdleBg 
                  )}
                  aria-pressed={selectedCategory === categoryButtonValue} 
                >
                  {categoryButtonValue.charAt(0).toUpperCase() + categoryButtonValue.slice(1)} 
                </button>
              ))}
            </div>
          </div>
        </FadeIn>
        
        {/* Grid for Featured Projects */}
        {featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
            {featuredProjects.map((project, index) => (
              <FeaturedProjectCard key={`${project.id}-${selectedCategory}`} project={project} index={index} />
            ))}
          </div>
        ) : (
          <FadeIn>
            <p className={cx("text-center text-lg mb-16 md:mb-20", theme === 'dark' ? 'text-stone-400' : 'text-stone-600')}>
              No featured projects in the &quot;{selectedCategory}&quot; category.
            </p>
          </FadeIn>
        )}
        
        {(selectedCategory === 'all' || otherProjects.length > 0) && (
            <FadeIn delay={featuredProjects.length > 0 ? 200 : 0}> 
              <div className="text-center">
                <button 
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  className={cx(
                    "inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2",
                    viewAllButtonBg,
                    theme === 'dark' ? 'focus:ring-offset-stone-900 focus:ring-red-500' : 'focus:ring-offset-white focus:ring-red-500'
                  )}
                  aria-expanded={showAllProjects} 
                >
                  <Layers size={20} />
                  {showAllProjects ? 'Show Less Projects' : (selectedCategory === 'all' ? 'View All Creations' : `View Other ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Projects`)}
                </button>
              </div>
            </FadeIn>
        )}

        {showAllProjects && (
          <div className="mt-12 md:mt-16">
            <FadeIn>
              <h3 className={cx(
                "text-2xl sm:text-3xl font-serif mb-8 md:mb-12 text-center",
                theme === 'dark' ? "text-stone-100" : "text-stone-900"
              )}>
                {selectedCategory === 'all' ? 'Other Creations' : `Other ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Projects`}
              </h3>
            </FadeIn>
            
            {otherProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProjects.map((project, index) => (
                    <ProjectCard 
                    key={`${project.id}-${selectedCategory}-other`} 
                    project={project} 
                    delay={index * 100} 
                    />
                ))}
                </div>
            ) : (
                <FadeIn>
                    <p className={cx("text-center text-lg", theme === 'dark' ? 'text-stone-400' : 'text-stone-600')}>
                    No other projects in the &quot;{selectedCategory}&quot; category.
                    </p>
                </FadeIn>
            )}
          </div>
        )}
        
        {/* Decorative background blobs for visual appeal */}
        <div className={cx(
            "absolute -left-20 md:-left-40 top-1/3 w-80 h-80 sm:w-96 sm:h-96 bg-gradient-to-br rounded-full blur-3xl -z-10 opacity-30 md:opacity-50",
            decorativeBlobColorFrom, decorativeBlobColorTo
        )}></div>
         <div className={cx(
            "hidden lg:block absolute -right-20 md:-right-40 bottom-1/4 w-80 h-80 sm:w-96 sm:h-96 bg-gradient-to-tl rounded-full blur-3xl -z-10 opacity-20 md:opacity-40",
            "from-sky-400/5 to-cyan-400/5" 
        )}></div>
      </div>
    </section>
  );
};

export default ProjectsSection;
