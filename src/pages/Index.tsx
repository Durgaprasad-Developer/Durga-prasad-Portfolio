
import { useEffect, useState } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import About from '@/components/About';
import SideProjects from '@/components/SideProjects.tsx';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
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
    
    // Set up section detection with better threshold values for more accurate tracking
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id || 'hero';
          setActiveSection(sectionId);
        }
      });
    }, { threshold: [0.2, 0.5, 0.8], rootMargin: '-10% 0px -10% 0px' });
    
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
        <Projects />
        <Skills />
        <About />
        <SideProjects />
        <Footer />
        
        {/* Navigation dots - desktop only */}
        <motion.div 
          className="fixed right-2 sm:right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col items-center space-y-4 transition-opacity duration-500"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
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
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
