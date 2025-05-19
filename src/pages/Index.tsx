
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import About from '@/components/About';
import SideProjects from '@/components/SideProjects';
import Footer from '@/components/Footer';

const Index = () => {
  // Handle scroll-to-section navigation
  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      
      if (hash) {
        const section = document.querySelector(hash);
        if (section) {
          // Give time for smooth scroll to initialize
          setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };
    
    // Initial check for hash in URL
    handleHashChange();
    
    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  return (
    <div className="overflow-hidden">
      <Hero />
      <Projects />
      <Skills />
      <About />
      <SideProjects />
      <Footer />
    </div>
  );
};

export default Index;
