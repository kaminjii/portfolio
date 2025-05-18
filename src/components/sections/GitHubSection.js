import React from 'react';
import FadeIn from '../animations/FadeIn';
import GitHubActivity from './GitHubActivity';

const GitHubSection = ({ sectionRef }) => {
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
