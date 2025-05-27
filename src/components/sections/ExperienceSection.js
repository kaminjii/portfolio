import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Briefcase, ChevronDown, ChevronUp, Trophy, Users, Zap, Target } from 'lucide-react';
import FadeIn from '../animations/FadeIn'; 
import { useTheme } from '../../app/ThemeContext'; 
import { cx } from '../../app/ThemeUtils'; 

const experienceData = [
  {
    id: 'mastercard',
    company: 'Mastercard',
    title: 'Software Engineer I',
    location: 'St. Louis, MO',
    period: 'February 2025 – Present',
    type: 'Full-time',
    skills: ['React', 'TypeScript', 'CI/CD', 'Jenkins', 'Java', 'Spring Boot'],
    achievements: [
      { icon: Zap, text: 'Build accessible UI components with ARIA attributes and keyboard navigation, increasing usability score',},
      { icon: Target, text: 'Implement robust test coverage during JS to TSX migration, improving overall code coverage to 98%',},
      { icon: Trophy, text: 'Optimized CI/CD Jenkins pipeline, decreasing build times by 35% while automating deployment processes'}
    ],
  },
  {
    id: 'teaching-assistant',
    company: 'University of Houston',
    title: 'Teaching Assistant',
    subtitle: 'Data Structures and Algorithms',
    location: 'Houston, TX',
    period: 'August 2023 – December 2024',
    type: 'Part-time',
    skills: ['Data Structures', 'Algorithms', 'Python', 'C++'],
    achievements: [
      { icon: Users, text: 'Mentored 450 students in understanding data structures, algorithms, and problem-solving, achieving 90% pass rate' },
      { icon: Target, text: 'Provided weekly office hours and review sessions for 50+ students, improving assignment completion rates by 15%' },
      { icon: Zap, text: 'Increased student engagement by collaborating with the teaching team to design skill-specific problem sets'}
    ],
  },
  {
    id: 'research-assistant',
    company: 'HULA Lab',
    title: 'Undergraduate Research Assistant',
    location: 'Houston, TX',
    period: 'May 2023 – August 2023',
    type: 'Research',
    skills: ['VR Development', 'Machine Learning', 'Python', 'Unity', 'C#'],
    achievements: [
      { icon: Zap, text: 'Developed VR surgical training environments, incorporating eye-tracking and PVT outcomes to measure fatigue' },
      { icon: Target, text: 'Optimized machine learning algorithms by refining hyperparameters and data cleaning, improving speed by 7%', },
      { icon: Trophy, text: 'Reduced user fatigue with environment modifications, extending VR training sessions by up to 45 minutes'}
    ],
  }
];

const SkillTag = ({ skill, theme }) => (
  <span className={cx(
    "px-3 py-1 rounded-full text-xs font-medium transition-colors",
    theme === 'dark' 
      ? "bg-stone-700/60 text-stone-300 hover:bg-red-500/20 hover:text-red-300"
      : "bg-stone-100 text-stone-700 hover:bg-red-50 hover:text-red-700"
  )}>
    {skill}
  </span>
);

const AchievementItem = ({ achievement, theme, delay = 0 }) => {
  const Icon = achievement.icon;
  const accentColor = theme === 'dark' ? "text-red-400" : "text-red-600";
  
  return (
    <div 
      className="flex items-center gap-3 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={cx(
        "p-2 rounded-lg transition-colors",
        theme === 'dark' ? "bg-stone-700/50 group-hover:bg-red-500/20" : "bg-stone-100 group-hover:bg-red-50"
      )}>
        <Icon size={16} className={cx("transition-colors", accentColor)} />
      </div>
      <span className={cx(
        "text-sm",
        theme === 'dark' ? "text-stone-300" : "text-stone-600"
      )}>
        {achievement.text}
      </span>
    </div>
  );
};

const ExperienceCard = ({ experience, isActive, onClick, index }) => {
  const { theme } = useTheme();
  const accentColorText = theme === 'dark' ? "text-red-400" : "text-red-600";
  const accentColorBg = theme === 'dark' ? "bg-red-500/10" : "bg-red-50";
  const cardRef = useRef(null);
  
  // Auto-scroll to active card
  useEffect(() => {
    if (isActive && cardRef.current) {
      cardRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [isActive]);

  const typeColors = {
    'Full-time': theme === 'dark' ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700',
    'Part-time': theme === 'dark' ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700',
    'Research': theme === 'dark' ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'
  };
  
  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-expanded={isActive}
      aria-label={`${experience.title} at ${experience.company}. Click to ${isActive ? 'collapse' : 'expand'} details.`}
      className={cx(
        "group cursor-pointer p-6 rounded-3xl transition-all duration-700 transform hover:-translate-y-2 border focus:outline-none focus:ring-2 focus:ring-red-500/50",
        isActive 
          ? theme === 'dark'
            ? "bg-gradient-to-br from-stone-800/70 to-stone-800/40 shadow-2xl shadow-red-500/20 border-red-500/60 ring-1 ring-red-500/30" 
            : "bg-gradient-to-br from-white to-red-50/30 shadow-2xl shadow-red-500/15 border-red-600/60 ring-1 ring-red-500/20"
          : theme === 'dark'
            ? "bg-stone-900/40 border-stone-700/60 hover:border-red-400 hover:bg-stone-800/60 hover:shadow-lg hover:shadow-red-500/10" 
            : "bg-white/80 border-stone-200 shadow-sm hover:border-red-300 hover:shadow-lg hover:shadow-red-500/5"
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h3 className={cx(
              "text-2xl font-medium font-serif",
              theme === 'dark' ? "text-stone-100" : "text-stone-900"
            )}>
              {experience.title}
            </h3>
            <span className={cx(
              "px-2 py-1 rounded-full text-xs font-medium",
              typeColors[experience.type] || typeColors['Full-time']
            )}>
              {experience.type}
            </span>
          </div>
          
          {experience.subtitle && (
            <p className={cx(
              "text-sm font-medium mb-2",
              theme === 'dark' ? "text-stone-400" : "text-stone-600"
            )}>
              {experience.subtitle}
            </p>
          )}
          <p className={cx(
            "text-lg font-medium", 
            isActive ? accentColorText : theme === 'dark' ? "text-stone-400" : "text-stone-600"
          )}>
            {experience.company}
          </p>
        </div>
        
        <div className={cx(
          "flex flex-col gap-2 text-sm",
          theme === 'dark' ? "text-stone-400" : "text-stone-500"
        )}>
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span className="font-medium">{experience.period}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>{experience.location}</span>
          </div>
        </div>
      </div>

      {/* Skills Tags - Always visible */}
      <div className="flex flex-wrap gap-2 mb-6">
        {experience.skills.map((skill, skillIndex) => (
          <SkillTag key={skill} skill={skill} theme={theme} />
        ))}
      </div>
      
      {/* Combined Achievements & Details - Show only on expand */}
      <div className={cx(
        "grid transition-all duration-700",
        isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}>
        <div className="overflow-hidden">
          <div className={cx("p-4 rounded-xl mb-4", accentColorBg)}>
            {/* Key Achievements */}
            <div className="mb-2">
              <h4 className={cx(
                "text-sm font-semibold uppercase tracking-wider mb-1",
                accentColorText
              )}>
                Key Achievements
              </h4>
              <div className="grid gap-1 grid-cols-1">
                {experience.achievements.map((achievement, achIndex) => (
                  <AchievementItem 
                    key={achIndex} 
                    achievement={achievement} 
                    theme={theme}
                    delay={achIndex * 100}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Expand/Collapse indicator */}
      <div className={cx(
        "flex items-center justify-between mt-4 pt-4 border-t transition-all",
        theme === 'dark' ? "border-stone-700/50" : "border-stone-200/50"
      )}>
        <div className={cx(
          "text-sm font-medium flex items-center gap-2 transition-all",
          isActive ? accentColorText : theme === 'dark' ? "text-stone-500 group-hover:text-stone-400" : "text-stone-600 group-hover:text-stone-700"
        )}>
          <Briefcase size={16} /> 
          <span>{isActive ? 'View less' : 'View details'}</span>
        </div>
        
        <div className={cx(
          "p-2 rounded-full transition-all transform group-hover:scale-110",
          isActive 
            ? accentColorText 
            : theme === 'dark' 
              ? "text-stone-500 group-hover:text-stone-400" 
              : "text-stone-400 group-hover:text-stone-600"
        )}>
          {isActive ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
    </div>
  );
};

const ExperienceSection = ({ sectionRef }) => {
  const [activeExp, setActiveExp] = useState(-1); 
  const { theme } = useTheme();
  const accentColorText = theme === 'dark' ? "text-red-400" : "text-red-600";

  const handleCardClick = (index) => {
    setActiveExp(activeExp === index ? -1 : index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.closest('#experience')) {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            setActiveExp(prev => (prev + 1) % experienceData.length);
            break;
          case 'ArrowUp':
            e.preventDefault();
            setActiveExp(prev => prev === 0 ? experienceData.length - 1 : prev - 1);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
    
  return (
    <section ref={sectionRef} id="experience" className="py-32 relative font-sans" role="region" aria-label="Work Experience"> 
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        <FadeIn>
          <div className="mb-16">
            <span className={cx("font-medium text-sm uppercase tracking-wider", accentColorText)}>Experience</span>
            <h2 className={cx(
              "text-5xl sm:text-6xl font-serif mt-4", 
              theme === 'dark' ? "text-stone-100" : "text-stone-900"
            )}>
              My Journey
            </h2>
            <p className={cx(
              "text-lg mt-4 max-w-2xl",
              theme === 'dark' ? "text-stone-400" : "text-stone-600"
            )}>
              From research labs to enterprise solutions, here&apos;s how I&apos;ve grown as a software engineer and contributed to meaningful projects.
            </p>
          </div>
        </FadeIn>

        {/* Navigation dots */}
        <FadeIn delay={200}>
          <div className="flex justify-center gap-3 mb-12">
            {experienceData.map((_, index) => (
              <button
                key={index}
                onClick={() => handleCardClick(index)}
                className={cx(
                  "w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50",
                  activeExp === index
                    ? accentColorText.replace('text-', 'bg-') + " scale-125"
                    : theme === 'dark' 
                      ? "bg-stone-600 hover:bg-stone-500" 
                      : "bg-stone-300 hover:bg-stone-400"
                )}
                aria-label={`View ${experienceData[index].company} experience`}
              />
            ))}
          </div>
        </FadeIn>
        
        <div className="space-y-6">
          {experienceData.map((exp, index) => (
            <FadeIn key={exp.id} delay={index * 150}>
              <ExperienceCard 
                experience={exp}
                isActive={activeExp === index}
                onClick={() => handleCardClick(index)}
                index={index}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
