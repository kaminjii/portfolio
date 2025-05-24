
import React from 'react';
import FadeIn from '../animations/FadeIn';
import GitHubActivity from './GitHubActivity';
import { useTheme } from '../../app/ThemeContext';
import useThemeClasses, { cx } from '../../app/ThemeUtils';

const GitHubSection = ({ sectionRef }) => {
  const { theme } = useTheme();
  
  return (
    <section ref={sectionRef} id="github">
      <FadeIn>
        <div className="grid grid-cols-1 gap-8">   
          <FadeIn delay={200}>
            <GitHubActivity username="kaminjii" />
          </FadeIn>
        </div>
      </FadeIn>
    </section>
  );
};

export default GitHubSection;