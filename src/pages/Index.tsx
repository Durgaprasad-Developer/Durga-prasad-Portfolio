
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
    
    // Set up section detection
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id || 'hero');
        }
      });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
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
  
  return (
    <AnimatePresence>
      <motion.div 
        className="overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={pageTransition}
      >
        <Hero />
        <ChariotJourney />
        <Projects />
        <Skills />
        <About />
        <SideProjects />
        <Footer />
        
        {/* Navigation dots */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col items-center space-y-4">
          {['hero', 'projects', 'skills', 'about', 'sideprojects'].map((section) => (
            <a 
              key={section}
              href={`#${section}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section 
                  ? 'bg-indian-gold w-4 h-4' 
                  : 'bg-white/30 hover:bg-white/50'
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
