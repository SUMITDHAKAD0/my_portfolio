import React, { useState, useEffect } from 'react';
import personalInfoData from '../data/personalInfo.json';

const Hero = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    title: '',
    greeting: '',
    staticHeadline: '',
    roles: [],
    description: '',
    profileImage: '',
    socialMedia: []
  });
  
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayRole, setDisplayRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    // Load personal info data
    setPersonalInfo(personalInfoData);
  }, []);

  useEffect(() => {
    // Skip effect if roles aren't loaded yet
    if (!personalInfo.roles || personalInfo.roles.length === 0) return;
    
    const currentRole = personalInfo.roles[currentRoleIndex];
    
    // Typing effect
    const handleTyping = () => {
      // If currently deleting text
      if (isDeleting) {
        setTypingSpeed(80); // Faster when deleting
        setDisplayRole(currentRole.substring(0, displayRole.length - 1));
      } else {
        setTypingSpeed(150); // Normal speed when typing
        setDisplayRole(currentRole.substring(0, displayRole.length + 1));
      }
    };
    
    // If we've completed typing the current role
    if (!isDeleting && displayRole === currentRole) {
      // Pause at the end of typing
      setTimeout(() => setIsDeleting(true), 1500);
      return;
    }
    
    // If we've deleted the role completely
    if (isDeleting && displayRole === '') {
      setIsDeleting(false);
      // Move to next role
      setCurrentRoleIndex((currentRoleIndex + 1) % personalInfo.roles.length);
      // Pause before typing the next role
      setTimeout(() => {}, 500);
      return;
    }
    
    // Set timeout for next character
    const typingTimeout = setTimeout(handleTyping, typingSpeed);
    
    // Clear timeout on cleanup
    return () => clearTimeout(typingTimeout);
  }, [displayRole, isDeleting, currentRoleIndex, personalInfo.roles, typingSpeed]);

  // Function to render the appropriate social media icon
  const renderSocialIcon = (iconName) => {
    switch(iconName) {
      case 'linkedin':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        );
      case 'github':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
          </svg>
        );
      case 'medium':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h6.958l5.378 11.795 4.728-11.795h6.633v.403l-1.916 1.837c-.165.126-.247.333-.213.538v13.498c-.034.204.048.411.213.537l1.871 1.837v.403h-9.412v-.403l1.939-1.882c.19-.19.19-.246.19-.537v-10.91l-5.389 13.688h-.728l-6.275-13.688v9.174c-.052.385.076.774.347 1.052l2.521 3.058v.404h-7.148v-.404l2.521-3.058c.27-.279.39-.67.325-1.052v-10.608z"/>
          </svg>
        );
      case 'hackerrank':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.5 18h-2v-9h-1.5v9h-2v-9H8.5v9h-2v-9H5v-2h10.5z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-32 pb-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a2638] via-[#0f3d52] to-[#0a2638] z-0"></div>
      
      {/* Animated gradient orbs in background */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-[#56cca7]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#56cca7]/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      
      {/* Animated lines decoration */}
      <div className="absolute top-40 right-10 w-64 h-1 bg-gradient-to-r from-[#56cca7] to-transparent opacity-20 hidden lg:block"></div>
      <div className="absolute bottom-32 left-10 w-48 h-1 bg-gradient-to-r from-[#56cca7] to-transparent opacity-20 hidden lg:block"></div>
      
      {/* Main content container */}
      <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left text section - independent */}
        <div className="text-white z-10">
          {/* Greeting with animation */}
          <div className="mb-6 overflow-hidden">
            <h4 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-2 animate-fade-in-up">
              {personalInfo.greeting}
            </h4>
          </div>
          
          {/* Main heading with gradient text - natural height */}
          <div className="mb-8 overflow-hidden">
            <div className="relative pb-6">
              <h4 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                {personalInfo.staticHeadline}
                <span className="bg-gradient-to-r from-[#56cca7] via-[#4fb59a] to-[#56cca7] bg-clip-text text-transparent animate-pulse">
                  {' '}{displayRole}
                </span>
              </h4>
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#56cca7] to-transparent w-32 md:w-48"></div>
            </div>
          </div>
          
          {/* Title badge */}
          <div className="mb-8 inline-block">
            <span className="px-4 py-2 rounded-full border-2 border-[#56cca7] text-[#56cca7] text-sm md:text-base font-semibold hover:bg-[#56cca7] hover:text-[#0a2638] transition-all duration-300 inline-block animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              {personalInfo.title}
            </span>
          </div>
          
          {/* Description with better styling */}
          <p className="text-base md:text-lg text-gray-300 mb-10 max-w-2xl leading-relaxed animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            {personalInfo.description}
          </p>
          
          {/* Social Media Links with enhanced styling */}
          <div className="flex flex-wrap gap-4 mb-8 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            {personalInfo.socialMedia && personalInfo.socialMedia.map((social, index) => (
              <a 
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#56cca7] text-[#56cca7] hover:border-white hover:bg-[#56cca7] hover:text-[#0a2638] hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-[#56cca7]/50"
                aria-label={social.name}
              >
                {renderSocialIcon(social.icon)}
              </a>
            ))}
            
            <a 
              href={personalInfo.resumeLink}
              download
              className="ml-4 px-8 py-3 border-2 border-[#56cca7] text-[#56cca7] rounded-full font-bold bg-[#56cca7]/10 hover:bg-[#56cca7] hover:text-[#0a2638] transition-all duration-300 shadow-lg hover:shadow-[#56cca7]/50 hover:scale-105"
            >
              Download CV
            </a>
          </div>
          
          {/* Scroll indicator */}
          <div className="flex items-center gap-2 text-[#56cca7] text-sm mt-12 animate-bounce">
            <span>Scroll to explore</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
        
        {/* Right profile image section - completely independent */}
        <div className="relative flex justify-center lg:justify-end lg:sticky lg:top-40 h-fit">
          <div className="relative animate-fade-in-up" style={{animationDelay: '1s'}}>
            {/* Glowing border effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#56cca7] to-[#0a2638] rounded-lg blur-xl opacity-20"></div>
            
            {/* Floating animated border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#56cca7] via-transparent to-[#56cca7] rounded-lg opacity-40 animate-pulse"></div>
            
            {/* Image container */}
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              {/* Colored overlay for the image */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#56cca7]/30 to-[#0a2638]/10 z-10 mix-blend-color-dodge"></div>
              
              {/* Image */}
              <img 
                src={personalInfo.profileImage} 
                alt={personalInfo.name} 
                className="relative z-0 max-h-[60vh] md:max-h-[70vh] w-auto object-cover rounded-lg" 
              />
              
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#56cca7] rounded-tl-lg"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#56cca7] rounded-br-lg"></div>
            </div>
            
            {/* Vertical line decoration */}
            <div className="absolute top-10 bottom-10 right-full mr-8 md:mr-12 w-px bg-gradient-to-b from-[#56cca7] to-transparent hidden lg:block"></div>
            
            {/* Floating stats or badges */}
            {/* <div className="absolute -bottom-6 -left-6 bg-[#56cca7] text-[#0a2638] px-4 py-3 rounded-lg shadow-lg font-bold text-sm md:text-base animate-bounce" style={{animationDelay: '0.5s'}}>
              3+ Years Experience
            </div> */}
          </div>
        </div>
      </div>
      
      {/* Add CSS animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default Hero;