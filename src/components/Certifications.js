import React, { useState, useEffect } from 'react';
import certificationsData from '../data/certifications.json';

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    setCertifications(certificationsData.certifications);
  }, []);

  return (
    <section id="certifications" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 relative inline-block">
          Certifications
          <span className="absolute bottom-[-10px] left-0 w-16 h-1 bg-secondary"></span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div 
              key={index}
              className="bg-white/5 rounded-lg p-8 shadow-lg transition-transform duration-300 hover:-translate-y-2 border-t-4 border-secondary"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{cert.title}</h3>
                  <p className="text-base text-secondary font-medium mt-1">{cert.issuer}</p>
                </div>
                <span className="text-light-gray text-sm bg-white/10 px-3 py-1 rounded-full">
                  {cert.date}
                </span>
              </div>
              
              <p className="text-light-gray mb-4 text-sm leading-relaxed">{cert.description}</p>
              
              {cert.credentialId && (
                <div className="mb-4 pt-4 border-t border-white/10">
                  <p className="text-xs text-light-gray mb-2">
                    <span className="font-semibold">Credential ID:</span> {cert.credentialId}
                  </p>
                </div>
              )}
              
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 bg-secondary text-primary rounded-lg text-sm font-semibold hover:bg-secondary/90 transition-colors duration-200"
                >
                  Verify Credential →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
