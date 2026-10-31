import React, { useState, useEffect } from 'react';
import experienceData from '../data/experience.json';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [expandedFeatures, setExpandedFeatures] = useState({});

  useEffect(() => {
    setExperiences(experienceData.experiences);
    const initialState = {};
    experienceData.experiences.forEach((_, index) => {
      initialState[index] = false;
    });
    setExpandedFeatures(initialState);
  }, []);

  const toggleFeatures = (index) => {
    setExpandedFeatures(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section id="experience" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 relative inline-block">
          Work Experience
          <span className="absolute bottom-[-10px] left-0 w-16 h-1 bg-secondary"></span>
        </h2>

        <div className="relative pl-8 md:pl-16 max-w-6xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 h-full w-px bg-secondary/30"></div>

          {experiences.map((exp, index) => (
            <div key={index} className="mb-16 relative">
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-secondary transform -translate-x-1/2"></div>

              <div className="bg-white/5 rounded-lg p-6 md:p-8 shadow-lg transition-transform duration-300 hover:-translate-y-2 ml-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <span className="inline-block bg-secondary text-primary px-4 py-1 rounded-full text-sm font-semibold mb-4">
                      {exp.period}
                    </span>
                    <h3 className="text-2xl font-semibold mb-1">{exp.title}</h3>
                    <h4 className="text-lg text-light-gray font-normal">{exp.company}</h4>
                    {exp.location && (
                      <div className="flex items-center gap-1 text-sm text-light-gray/70 mt-1 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-light-gray mb-5">{exp.description}</p>

                {/* Key Features — collapsible */}
                {exp.keyFeatures && exp.keyFeatures.length > 0 && (
                  <div className="mb-6 border border-secondary/20 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFeatures(index)}
                      className="flex items-center justify-between w-full text-left text-base font-semibold p-3 text-secondary hover:text-secondary/80 transition-colors focus:outline-none bg-secondary/5"
                    >
                      <span>Key Features:</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform ${expandedFeatures[index] ? 'rotate-180' : ''}`}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        expandedFeatures[index] ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-3 border-t border-secondary/20 bg-white/5">
                        <ul className="space-y-2 text-sm text-light-gray">
                          {exp.keyFeatures.map((feature, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-secondary shrink-0 mt-0.5">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-secondary/10 border border-secondary/30 rounded text-sm text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
