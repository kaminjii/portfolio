// src/components/sections/PlaygroundSection.js
"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Sparkles,
  Code,
  Palette,
  Zap,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "../../app/ThemeContext";
import OrganicBackground from "../OrganicBackground";
import ThemeToggle from "../ThemeToggle";
import InteractiveCanvas from "../InteractiveCanvas";
import HorizontalCodeAccordion from "../HorizontalCodeAccordion";
import CodeBlock from "../CodeBlock";
import cx from "../../utils/cx";
import FadeIn from "../animations/FadeIn";
import SparkleButton from "../SparkleButton";
// import GlassmorphismCards from "../GlassmorphismCards";
import SmoothCursor from "../animations/SmoothCursor";

// Playground projects data
const playgroundProjects = [
  {
    id: "sparkle-button",
    title: "Sparkle Button",
    description:
      "Interactive button with particle animations and dynamic hover effects",
    tags: ["CSS Animations", "Particles", "Interactive"],
    color: "from-purple-500 to-pink-500",
    icon: Sparkles,
    component: SparkleButton,
    difficulty: "Intermediate",
  },
  // {
  //   id: "glassmorphism-cards",
  //   title: "Glassmorphism Cards",
  //   description:
  //     "Modern glass-effect cards with backdrop blur and smooth animations",
  //   tags: ["Glassmorphism", "CSS Effects", "Modern UI"],
  //   color: "from-blue-500 to-cyan-500",
  //   icon: Palette,
  //   component: GlassmorphismCards,
  //   difficulty: "Beginner",
  // },
  {
    id: "code-editor",
    title: "Live Code Editor",
    description: "Real-time code editor with syntax highlighting (Coming Soon)",
    tags: ["Code Editor", "Syntax Highlighting", "Real-time"],
    color: "from-green-500 to-emerald-500",
    icon: Code,
    component: null,
    difficulty: "Advanced",
    comingSoon: true,
  },
];

const ProjectCard = ({ project, onClick }) => {
  const { theme } = useTheme();
  const Icon = project.icon;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "text-green-400";
      case "Intermediate":
        return "text-yellow-400";
      case "Advanced":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div
      onClick={project.comingSoon ? undefined : onClick}
      className={cx(
        "group relative p-8 rounded-3xl transition-all duration-500 border-2 cursor-pointer",
        "backdrop-blur-sm shadow-xl hover:shadow-2xl transform hover:-translate-y-2",
        project.comingSoon
          ? "opacity-60 cursor-not-allowed"
          : "hover:scale-[1.02]",
        theme === "dark"
          ? "bg-slate-800/40 border-red-500/25 hover:border-red-400/45 shadow-red-900/10"
          : "bg-white/60 border-red-200/50 hover:border-red-300/70 shadow-red-100/20"
      )}
    >
      {/* Background gradient */}
      <div
        className={cx(
          "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br",
          project.color
        )}
      />

      {/* Coming soon badge */}
      {project.comingSoon && (
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400 border border-gray-500/30">
          Coming Soon
        </div>
      )}

      {/* Icon */}
      <div
        className={cx(
          "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br transition-all duration-300 group-hover:scale-110",
          project.color,
          project.comingSoon && "grayscale"
        )}
      >
        <Icon size={28} className="text-white" />
      </div>

      {/* Content */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3
            className={cx(
              "text-2xl font-semibold",
              theme === "dark" ? "text-amber-100" : "text-slate-800"
            )}
          >
            {project.title}
          </h3>
          <span
            className={cx(
              "text-sm font-medium",
              getDifficultyColor(project.difficulty)
            )}
          >
            {project.difficulty}
          </span>
        </div>

        <p
          className={cx(
            "text-sm mb-6 leading-relaxed",
            theme === "dark" ? "text-stone-300" : "text-slate-600"
          )}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className={cx(
                "px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300",
                theme === "dark"
                  ? "bg-stone-700/60 text-stone-300 group-hover:bg-red-500/20 group-hover:text-red-300"
                  : "bg-stone-100 text-stone-700 group-hover:bg-red-50 group-hover:text-red-700"
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action */}
        {!project.comingSoon && (
          <div
            className={cx(
              "flex items-center gap-2 text-sm font-medium transition-colors duration-300",
              theme === "dark"
                ? "text-red-400 group-hover:text-red-300"
                : "text-red-600 group-hover:text-red-700"
            )}
          >
            <span>View Project</span>
            <ExternalLink
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const PlaygroundGallery = ({ onSelectProject }) => {
  const { theme } = useTheme();

  return (
    <div className="max-w-screen-xl mx-auto px-6 sm:px-12 py-16 relative z-10">
      {/* Header */}
      <FadeIn>
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            {/* <Sparkles
              size={32}
              className={cx(
                "transition-colors duration-300",
                theme === "dark" ? "text-red-400" : "text-red-600"
              )}
            /> */}
            <h1 className="text-5xl font-bold font-serif bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent p-3">
              ⋆౨ৎ˚⟡˖ Playground ⋆.ೃ࿔*:･
            </h1>
          </div>
          <p
            className={cx(
              "text-xl font-light max-w-2xl mx-auto",
              theme === "dark" ? "text-stone-300" : "text-slate-600"
            )}
          >
            My UI Gems: microinteractions, animations, glassmorphism, and bentos
          </p>
        </div>
      </FadeIn>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {playgroundProjects.map((project, index) => (
          <FadeIn key={project.id} delay={index * 100}>
            <ProjectCard
              project={project}
              onClick={() => onSelectProject(project)}
            />
          </FadeIn>
        ))}
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cx(
            "absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl opacity-20 animate-pulse",
            theme === "dark" ? "bg-red-500" : "bg-red-400"
          )}
          style={{ animationDelay: "0s", animationDuration: "4s" }}
        />
        <div
          className={cx(
            "absolute top-40 right-20 w-24 h-24 rounded-full blur-2xl opacity-15 animate-pulse",
            theme === "dark" ? "bg-orange-500" : "bg-orange-400"
          )}
          style={{ animationDelay: "2s", animationDuration: "6s" }}
        />
        <div
          className={cx(
            "absolute bottom-32 left-1/4 w-20 h-20 rounded-full blur-xl opacity-25 animate-pulse",
            theme === "dark" ? "bg-yellow-500" : "bg-yellow-400"
          )}
          style={{ animationDelay: "1s", animationDuration: "5s" }}
        />
      </div>
    </div>
  );
};

const ProjectDetailPage = ({ project, onBack }) => {
  const { theme } = useTheme();
  const Component = project.component;
  const [panelWidth, setPanelWidth] = useState(50); // percentage
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startWidth.current = panelWidth;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    const deltaX = e.clientX - startX.current;
    const containerWidth = window.innerWidth;
    const deltaPercent = (deltaX / containerWidth) * 100;
    const newWidth = Math.max(
      30,
      Math.min(70, startWidth.current + deltaPercent)
    );
    setPanelWidth(newWidth);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Create tabs with actual code content for projects
  const getProjectTabs = () => {
    if (project.id === "sparkle-button") {
      const htmlCode = `<div className="sparkle-button-container">
  <div className="sparkle-button">
    <button>
      <span className="spark"></span>
      <span className="backdrop"></span>
      <svg className="sparkle" viewBox="0 0 24 24" fill="none">
        <path d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 
               16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 
               18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813..." />
        <path d="M6 14.25L5.741 15.285C5.59267 15.8785..." />
        <path d="M6.5 4L6.303 4.5915C6.24777 4.75718..." />
      </svg>
      <span className="text">Generate Site</span>
    </button>
    <span aria-hidden="true" className="particle-pen">
      {[...Array(20)].map((_, i) => (
        <svg key={i} className="particle" viewBox="0 0 15 15">
          <path d="M6.937 3.846L7.75 1L8.563 3.846..." />
        </svg>
      ))}
    </span>
  </div>
</div>`;

      const cssCode = `:root { 
  --transition: 0.25s; 
  --spark: 1.8s; 
}

/* Container Hover States */
.sparkle-button-container {
  --active: 0; 
  --play-state: paused; 
  transition: --active var(--transition);
}

.sparkle-button-container:is(:hover, :focus-within) {
  --active: 1;
  --play-state: running;
}

/* Button Styling */
.sparkle-button button { 
  --bg: radial-gradient(
    40% 50% at center 100%, 
    hsl(270 calc(var(--active) * 97%) 72% / var(--active)), 
    transparent
  ); 
  background: var(--bg); 
  font-size: 1.5rem; 
  font-weight: 500; 
  border: 0; 
  cursor: pointer; 
  padding: 0.7em 1.1em; 
  border-radius: 100px; 
  position: relative; 
  box-shadow: 
    0 0 calc(var(--active) * 6em) calc(var(--active) * 3em) 
    hsl(260 97% 61% / 0.75); 
  transition: box-shadow var(--transition), 
              scale var(--transition); 
  scale: calc(1 + (var(--active) * 0.1)); 
}

/* Particle Animation */
.particle { 
  animation: float-out calc(var(--duration, 1) * 1s) 
             calc(var(--delay) * -1s) infinite linear; 
  animation-play-state: var(--play-state); 
}

@keyframes float-out { 
  to { rotate: 360deg; } 
}`;

      const jsCode = `const SparkleButton = () => {
  const buttonRef = useRef(null);
  
  const RANDOM = (min, max) => 
    Math.floor(Math.random() * (max - min + 1) + min);
  
  useEffect(() => {
    if (!buttonRef.current) return;
    
    const PARTICLES = buttonRef.current.querySelectorAll('.particle');
    
    PARTICLES.forEach(particle => {
      particle.setAttribute('style', \`
        --x: \${RANDOM(20, 80)};
        --y: \${RANDOM(20, 80)};
        --duration: \${RANDOM(6, 20)};
        --delay: \${RANDOM(1, 10)};
        --alpha: \${RANDOM(40, 90) / 100};
        --origin-x: \${Math.random() > 0.5 ? 
          RANDOM(300, 800) * -1 : RANDOM(300, 800)}%;
        --origin-y: \${Math.random() > 0.5 ? 
          RANDOM(300, 800) * -1 : RANDOM(300, 800)}%;
        --size: \${RANDOM(40, 90) / 100};
      \`);
    });
  }, []);

  return (
    <div ref={buttonRef} className="sparkle-button-container">
      <div className="sparkle-button">
        <button>
          <span className="spark"></span>
          <span className="backdrop"></span>
          <svg className="sparkle" viewBox="0 0 24 24">
            {/* SVG paths */}
          </svg>
          <span className="text">Generate Site</span>
        </button>
        <span className="particle-pen">
          {/* Particle elements */}
        </span>
      </div>
    </div>
  );
};`;

      return [
        {
          id: "html",
          title: "HTML",
          icon: Code,
          content: React.createElement(
            "div",
            { className: "h-full" },
            React.createElement(CodeBlock, { code: htmlCode, language: "html" })
          ),
        },
        {
          id: "css",
          title: "CSS",
          icon: Palette,
          content: React.createElement(
            "div",
            { className: "h-full" },
            React.createElement(CodeBlock, { code: cssCode, language: "css" })
          ),
        },
        {
          id: "js",
          title: "JS",
          icon: Zap,
          content: React.createElement(
            "div",
            { className: "h-full" },
            React.createElement(CodeBlock, { code: jsCode, language: "js" })
          ),
        },
      ];
    }

    if (project.id === "glassmorphism-cards") {
      const htmlCode = `<div className="glass-card-container">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {cards.map((card, index) => (
      <div
        key={card.id}
        className="glass-card shine-effect rounded-2xl p-6"
        onMouseEnter={() => setHoveredCard(card.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="gradient-bg" />
        
        <div className="relative z-10">
          <div className="text-4xl mb-4 icon-float">
            {card.icon}
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-2">
            {card.title}
          </h3>
          
          <p className="text-gray-300 text-sm opacity-80">
            {card.subtitle}
          </p>
          
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center justify-between">
              <span className="text-white/60 text-xs">Explore</span>
              <div className="w-2 h-2 rounded-full bg-white/40" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>`;

      const cssCode = `.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px) scale(1.02);
}

.gradient-bg {
  background: linear-gradient(135deg, 
    var(--gradient-from), var(--gradient-to));
  opacity: 0;
  transition: opacity 0.3s ease;
  position: absolute;
  inset: 0;
  border-radius: inherit;
}

.glass-card:hover .gradient-bg {
  opacity: 0.1;
}

.icon-float {
  animation: iconFloat 3s ease-in-out infinite;
}

@keyframes iconFloat {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  50% { 
    transform: translateY(-8px) rotate(5deg); 
  }
}

.shine-effect {
  position: relative;
  overflow: hidden;
}

.shine-effect::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, 
    transparent, rgba(255,255,255,0.1), transparent);
  transform: translateX(-100%) translateY(-100%);
  transition: transform 0.6s;
}

.shine-effect:hover::before {
  transform: translateX(100%) translateY(100%);
}`;

      const jsCode = `const GlassmorphismCards = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const cards = [
    {
      id: 1,
      title: "Fluffy Clouds",
      subtitle: "Dreamy Skies",
      icon: "☁️",
      description:
        "Soft, billowy clouds drifting gently, perfect for a peaceful daydream or a nap.",
      gradient: "from-sky-300 to-pink-300",
      initialRotation: { x: -5, y: 10, z: -2 },
    },
    {
      id: 2,
      title: "Tiny Paws",
      subtitle: "Kitten Mittens",
      icon: "🐾",
      description:
        "Adorable little paw prints from a playful kitten exploring its world with curiosity and charm.",
      gradient: "from-rose-300 to-yellow-300",
      initialRotation: { x: 5, y: -5, z: 3 },
    },
    {
      id: 3,
      title: "Sweet Berries",
      subtitle: "Forest Treats",
      icon: "🍓",
      description:
        "Juicy, ripe strawberries and blueberries, a delightful and sweet snack found in a sunny meadow.",
      gradient: "from-red-400 to-purple-400",
      initialRotation: { x: -2, y: -8, z: 1 },
    },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="glass-card shine-effect rounded-2xl p-6"
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Card content */}
          </div>
        ))}
      </div>
    </div>
  );
};`;

      return [
        {
          id: "html",
          title: "HTML",
          icon: Code,
          content: React.createElement(
            "div",
            { className: "h-full" },
            React.createElement(CodeBlock, { code: htmlCode, language: "html" })
          ),
        },
        {
          id: "css",
          title: "CSS",
          icon: Palette,
          content: React.createElement(
            "div",
            { className: "h-full" },
            React.createElement(CodeBlock, { code: cssCode, language: "css" })
          ),
        },
        {
          id: "js",
          title: "JS",
          icon: Zap,
          content: React.createElement(
            "div",
            { className: "h-full" },
            React.createElement(CodeBlock, { code: jsCode, language: "js" })
          ),
        },
      ];
    }

    return [];
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header
        className={cx(
          "flex-shrink-0 backdrop-blur-md border-b transition-all duration-300",
          theme === "dark"
            ? "bg-slate-900/80 border-red-500/20"
            : "bg-amber-50/80 border-red-200/30"
        )}
      >
        <div className="max-w-screen-xl mx-auto px-6 sm:px-12 flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className={cx(
                "flex items-center gap-3 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105",
                "backdrop-blur-sm group relative overflow-hidden",
                theme === "dark"
                  ? "text-amber-200 hover:text-red-400"
                  : "text-red-700 hover:text-red-600"
              )}
            >
              <ArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              <span>Back to Gallery</span>
            </button>

            <div>
              <h1
                className={cx(
                  "text-xl font-bold",
                  theme === "dark" ? "text-amber-100" : "text-slate-800"
                )}
              >
                {project.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {project.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className={cx(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  theme === "dark"
                    ? "bg-stone-700/60 text-stone-300"
                    : "bg-stone-100 text-stone-700"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Main content - resizable */}
      <main className="flex-1 overflow-hidden flex">
        {/* Canvas Side */}
        <div className="overflow-hidden" style={{ width: `${panelWidth}%` }}>
          <div className="w-full h-full p-6">
            {Component && (
              <InteractiveCanvas>
                <Component />
              </InteractiveCanvas>
            )}
          </div>
        </div>

        {/* Resize Handle */}
        <div
          className={cx(
            "w-1 cursor-col-resize hover:w-2 transition-all duration-200 flex-shrink-0 group",
            theme === "dark"
              ? "bg-red-500/20 hover:bg-red-400/40"
              : "bg-red-300/30 hover:bg-red-400/50"
          )}
          onMouseDown={handleMouseDown}
        >
          <div
            className={cx(
              "w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-200",
              theme === "dark" ? "bg-red-400" : "bg-red-500"
            )}
          />
        </div>

        {/* Code Side */}
        <div
          className="overflow-hidden"
          style={{ width: `${100 - panelWidth}%` }}
        >
          <div className="h-full p-6">
            <HorizontalCodeAccordion items={getProjectTabs()} mode="vertical" />
          </div>
        </div>
      </main>
    </div>
  );
};

const PlaygroundPage = ({ onHidePlayground }) => {
  const { theme } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };

  const handleBackToGallery = () => {
    setSelectedProject(null);
  };

  const handleBackToPortfolio = () => {
    setSelectedProject(null);
    onHidePlayground();
  };

  if (selectedProject) {
    return (
      <div
        className={cx(
          "min-h-screen relative",
          theme === "dark"
            ? "bg-slate-900 text-amber-100"
            : "bg-amber-50 text-slate-800"
        )}
      >
        <OrganicBackground />
        <ProjectDetailPage
          project={selectedProject}
          onBack={handleBackToGallery}
        />
        <ThemeToggle />
      </div>
    );
  }

  return (
    <div
      className={cx(
        "min-h-screen relative",
        theme === "dark"
          ? "bg-slate-900 text-amber-100"
          : "bg-amber-50 text-slate-800"
      )}
    >
      <SmoothCursor />
      <OrganicBackground />

      {/* Gallery Header */}
      <header
        className={cx(
          "sticky top-0 z-40 backdrop-blur-md border-b transition-all duration-300",
          theme === "dark"
            ? "bg-slate-900/80 border-red-500/20"
            : "bg-amber-50/80 border-red-200/30"
        )}
      >
        <div className="max-w-screen-xl mx-auto px-6 sm:px-12 flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackToPortfolio}
              className={cx(
                "flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-300 transform hover:scale-105",
                "backdrop-blur-sm group relative overflow-hidden",
                theme === "dark"
                  ? "text-amber-200 border-red-500/30 hover:border-red-400/50"
                  : "text-red-700 border-red-300/40 hover:border-red-400/60"
              )}
            >
              <div className="absolute inset-0 -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700" />
              <ArrowLeft
                size={16}
                className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1"
              />
              <span className="relative z-10">Back to Portfolio</span>
            </button>
          </div>

          <div
            className={cx(
              "text-lg font-medium",
              theme === "dark" ? "text-stone-300" : "text-slate-600"
            )}
          >
            {playgroundProjects.length} Items
          </div>
        </div>
      </header>

      <PlaygroundGallery onSelectProject={handleSelectProject} />
      <ThemeToggle />
    </div>
  );
};

export default PlaygroundPage;
