
import { useEffect, useState } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import Hero from '@/components/Hero';
import ChariotJourney from '@/components/ChariotJourney';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import About from '@/components/About';
import SideProjects from '@/components/SideProjects';
import Footer from '@/components/Footer';
import { AnimatePresence, motion } from 'framer-motion';

const Index = () => {
  const lenis = useSmoothScroll();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [showChariot, setShowChariot] = useState<boolean>(false);
  
  // Handle scroll-to-section navigation
  useEffect(() => {
    if (!lenis) return;
    
    const handleHashChange = () => {
      const { hash } = window.location;
      
      if (hash) {
        const section = document.querySelector(hash);
        if (section) {
          // Convert Element to HTMLElement before passing to lenis.scrollTo
          lenis.scrollTo(section as HTMLElement);
        }
      }
    };
    
    // Initial check for hash in URL
    handleHashChange();
    
    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Set up section detection with enhanced observer
    const sections = document.querySelectorAll('section[id]');
    
    // Create a better observer for accurate section tracking with lower threshold
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // More aggressive check to detect when a section is in view
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          const sectionId = entry.target.id || 'hero';
          
          // Update active section immediately
          setActiveSection(sectionId);
          
          // Only show chariot when in projects section
          setShowChariot(sectionId === 'projects');
          
          // Update URL hash without scrolling
          const url = new URL(window.location.href);
          url.hash = sectionId;
          window.history.replaceState({}, '', url.toString());
          
          console.log('Section changed to:', sectionId); // Debug log
        }
      });
    }, { 
      threshold: [0.1, 0.2, 0.3, 0.4, 0.5], // Multiple thresholds for better detection
      rootMargin: '-5% 0px -5% 0px' // Smaller margin to be more responsive
    });
    
    // Observe all sections
    sections.forEach(section => {
      observer.observe(section);
    });
    
    // Additional scroll listener for more responsive updates
    const handleScroll = () => {
      const scrollPosition = window.scrollY + (window.innerHeight / 3);
      
      // Find the section that's most in view
      sections.forEach(section => {
        const sectionElement = section as HTMLElement;
        const sectionTop = sectionElement.offsetTop;
        const sectionBottom = sectionTop + sectionElement.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          const sectionId = section.id || 'hero';
          if (activeSection !== sectionId) {
            setActiveSection(sectionId);
            setShowChariot(sectionId === 'projects');
          }
        }
      });
    };
    
    // Add scroll event listener with throttling
    let scrollTimeout: number | null = null;
    const throttledScrollHandler = () => {
      if (scrollTimeout === null) {
        scrollTimeout = window.setTimeout(() => {
          handleScroll();
          scrollTimeout = null;
        }, 100); // 100ms throttle
      }
    };
    
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', throttledScrollHandler);
      sections.forEach(section => observer.unobserve(section));
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
    };
  }, [lenis, activeSection]);
  
  // Function to handle navigation dot clicks
  const handleDotClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section && lenis) {
      lenis.scrollTo(section);
    }
  };
  
  const pageTransition = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };
  
  return (
    <AnimatePresence>
      <motion.div 
        className="overflow-hidden relative"
        initial="hidden"
        animate="visible"
        variants={pageTransition}
      >
        <Hero />
        {showChariot && <ChariotJourney />}
        <Projects />
        <Skills />
        <About />
        <SideProjects />
        <Footer />
        
        {/* Navigation dots with improved visibility and interaction */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col items-center space-y-6">
          {['hero', 'projects', 'skills', 'about', 'sideprojects'].map((section) => (
            <button 
              key={section}
              onClick={() => handleDotClick(section)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                activeSection === section 
                  ? 'bg-indian-gold scale-125 shadow-lg shadow-indian-gold/30' 
                  : 'bg-white/40 hover:bg-white/70 hover:scale-110'
              }`}
              aria-label={`Navigate to ${section} section`}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
