
import { useEffect, useState } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import Hero from '@/components/Hero';
import ChariotJourney from '@/components/ChariotJourney';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import About from '@/components/About';
import SideProjects from '@/components/SideProjects';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { AnimatePresence, motion } from 'framer-motion';

const Index = () => {
  const lenis = useSmoothScroll();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [showChariot, setShowChariot] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(false);
  
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
    
    // Set up section detection with better threshold values for more accurate tracking
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id || 'hero';
          setActiveSection(sectionId);
          
          // Only show chariot when in projects section
          setShowChariot(sectionId === 'projects');
        }
      });
    }, { threshold: [0.2, 0.5, 0.8], rootMargin: '-10% 0px -10% 0px' });
    
    sections.forEach(section => {
      observer.observe(section);
    });

    // Show nav dots after scrolling down a bit
    const handleScrollForNav = () => {
      setShowNav(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScrollForNav);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScrollForNav);
      sections.forEach(section => observer.unobserve(section));
    };
  }, [lenis]);
  
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

  // Handle navigation dot click
  const handleNavDotClick = (sectionId: string) => {
    const section = document.querySelector(`#${sectionId}`);
    if (section && lenis) {
      lenis.scrollTo(section as HTMLElement);
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
        <Header />
        <Hero />
        {showChariot && <ChariotJourney />}
        <Projects />
        <Skills />
        <About />
        <SideProjects />
        <Footer />
        
        {/* Navigation dots - enhanced for mobile */}
        <motion.div 
          className={`fixed right-2 sm:right-6 top-1/2 transform -translate-y-1/2 z-40 hidden sm:flex flex-col items-center space-y-3 md:space-y-4 transition-opacity duration-500 ${
            showNav ? 'opacity-100' : 'opacity-0'
          }`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: showNav ? 1 : 0, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {['hero', 'projects', 'skills', 'about', 'sideprojects'].map((section) => (
            <button 
              key={section}
              onClick={() => handleNavDotClick(section)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section 
                  ? 'bg-indian-gold w-4 h-4 shadow-md shadow-indian-gold/50' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Navigate to ${section} section`}
            />
          ))}
        </motion.div>
        
        {/* Mobile floating action button to show navigation on small screens */}
        <motion.button
          className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-indian-gold text-indian-royal-blue flex items-center justify-center shadow-lg z-40 sm:hidden"
          onClick={() => setShowNav(!showNav)}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle navigation menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </motion.button>
        
        {/* Mobile-only navigation panel - displays when triggered */}
        <AnimatePresence>
          {showNav && (
            <motion.div
              className="fixed bottom-20 right-6 bg-black/80 backdrop-blur-sm p-3 rounded-lg z-40 sm:hidden"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col space-y-3">
                {['hero', 'projects', 'skills', 'about', 'sideprojects'].map((section) => (
                  <button
                    key={section}
                    onClick={() => {
                      handleNavDotClick(section);
                      setShowNav(false);
                    }}
                    className={`px-4 py-1.5 text-sm rounded-full transition-colors ${
                      activeSection === section
                        ? 'bg-indian-gold text-indian-royal-blue font-medium'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
