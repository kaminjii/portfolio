import React, { useState } from 'react';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import FadeIn from '../animations/FadeIn'; // Assuming path
import { useTheme } from '../../app/ThemeContext'; // Assuming path
import useThemeClasses, { cx } from '../../app/ThemeUtils'; // Assuming path

const experienceData = [
  {
    id: 'mastercard',
    company: 'Mastercard',
    title: 'Software Engineer I',
    location: 'St. Louis, MO',
    period: 'February 2025 – Present',
    description: [
      'Building accessible UI components with ARIA attributes and keyboard navigation, increasing usability score',
      'Implemented robust test coverage during JS to TSX migration, improving overall code coverage to 98%',
      'Optimized CI/CD Jenkins pipeline, decreasing build times by 35% while automating deployment processes'
    ]
  },
  {
    id: 'teaching-assistant',
    company: 'University of Houston',
    title: 'Teaching Assistant',
    subtitle: 'Data Structures and Algorithms',
    location: 'Houston, TX',
    period: 'August 2023 – December 2024',
    description: [
      'Assisted 450 students in understanding data structures, algorithms, and problem-solving, achieving 90% pass rate',
      'Provided weekly office hours and review sessions for 50+ students, improving assignment completion rates by 15%',
      'Increased student engagement by 10% by collaborating with the teaching team to design skill-specific problem sets'
    ]
  },
  {
    id: 'research-assistant',
    company: 'HULA Lab',
    title: 'Undergraduate Research Assistant',
    location: 'Houston, TX',
    period: 'May 2023 – August 2023',
    description: [
      'Developed VR surgical training environments, incorporating eye-tracking and PVT outcomes to measure fatigue',
      'Optimized machine learning algorithms by refining hyperparameters and data cleaning, improving speed by 7%',
      'Reduced user fatigue by 15% with environment modifications, extending VR training sessions by up to 45 minutes'
    ]
  }
];

const ExperienceCard = ({ experience, isActive, onClick }) => {
  const { theme } = useTheme();
  const accentColorText = theme === 'dark' ? "text-red-400" : "text-red-600";
  
  return (
    <div
      onClick={onClick}
      className={cx(
        "group cursor-pointer p-8 rounded-3xl transition-all duration-500 transform hover:-translate-y-1 border", // Common classes including border
        isActive 
          ? theme === 'dark' // Active Dark
            ? "bg-stone-800/50 shadow-2xl shadow-red-500/10 border-red-500/50" 
            : "bg-white shadow-2xl shadow-red-500/10 border-red-600/50" // Active Light
          : theme === 'dark' // Inactive Dark
            ? "bg-stone-900/40 border-stone-700 hover:border-red-400 hover:bg-stone-800/60" 
            : "bg-white/60 border-0 shadow-sm hover:border-red-500" // Inactive Light
      )}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h3 className={cx(
            "text-2xl font-medium mb-2 font-serif", // User updated to font-serif, comment updated
            theme === 'dark' ? "text-stone-100" : "text-stone-900"
          )}>
            {experience.title}
          </h3>
          {experience.subtitle && (
            <p className={cx(
              "text-sm font-medium mb-2",
              theme === 'dark' ? "text-stone-400" : "text-stone-600"
            )}>
              {experience.subtitle}
            </p>
          )}
          <p className={cx(
            "text-lg", 
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
            <span>{experience.period}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>{experience.location}</span>
          </div>
        </div>
      </div>
      
      {/* Description - Show on active */}
      <div className={cx(
        "grid transition-all duration-500",
        isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}>
        <div className="overflow-hidden">
          <ul className="space-y-3">
            {experience.description.map((item, index) => (
              <li 
                key={index} 
                className={cx(
                  "flex items-center gap-3", // Changed items-start to items-center
                  theme === 'dark' ? "text-stone-300" : "text-stone-600"
                )}
              >
                <span className={cx("flex-shrink-0", accentColorText)}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
</div>
      
      {/* View more indicator */}
      {!isActive && (
        <div className={cx(
          "mt-4 text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all",
          accentColorText, 
          "opacity-0 group-hover:opacity-100"
        )}>
          <span>View details</span>
          <Briefcase size={16} /> 
        </div>
      )}
    </div>
  );
};

const ExperienceSection = ({ sectionRef }) => {
  const [activeExp, setActiveExp] = useState(0); 
  const { theme } = useTheme();
  const accentColorText = theme === 'dark' ? "text-red-400" : "text-red-600";
  const decorativeBlobColorFrom = theme === 'dark' ? "from-red-400/5" : "from-red-500/5"; 
  const decorativeBlobColorTo = theme === 'dark' ? "to-orange-400/5" : "to-orange-500/5"; 
  
  return (
    <section ref={sectionRef} id="experience" className="py-32 relative font-sans"> 
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
          </div>
        </FadeIn>
        
        <div className="space-y-6">
          {experienceData.map((exp, index) => (
            <FadeIn key={exp.id} delay={index * 100}>
              <ExperienceCard 
                experience={exp}
                isActive={activeExp === index}
                onClick={() => setActiveExp(index)}
              />
            </FadeIn>
          ))}
        </div>
        
        <div className={cx(
            "absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br rounded-full blur-3xl -z-10",
            decorativeBlobColorFrom, decorativeBlobColorTo
        )}></div>
      </div>
    </section>
  );
};

export default ExperienceSection;
