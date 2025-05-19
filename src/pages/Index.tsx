
import { useEffect } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import About from '@/components/About';
import SideProjects from '@/components/SideProjects';
import Footer from '@/components/Footer';

const Index = () => {
  const lenis = useSmoothScroll();
  
  // Handle scroll-to-section navigation
  useEffect(() => {
    if (!lenis) return;
    
    const handleHashChange = () => {
      const { hash } = window.location;
      
      if (hash) {
        const section = document.querySelector(hash);
        if (section) {
          // Use Lenis to scroll to section
          lenis.scrollTo(section);
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
  }, [lenis]);
  
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
