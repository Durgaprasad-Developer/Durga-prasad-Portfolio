
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './ui/button';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize GSAP animations
    if (!heroRef.current) return;
    
    const heading = headingRef.current;
    const image = imageRef.current;
    const name = nameRef.current;
    
    // Parallax effect on hero image
    if (image) {
      gsap.to(image, {
        y: '15%',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });
    }
    
    // Animate heading
    if (heading) {
      gsap.fromTo(heading, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.5,
          ease: 'power3.out',
          delay: 0.5
        }
      );
    }
    
    // Animate big name
    if (name) {
      gsap.fromTo(name,
        { opacity: 0, scale: 1.2 },
        { 
          opacity: 0.08, 
          scale: 1,
          duration: 2,
          ease: 'power2.out',
        }
      );
    }
  }, []);
  
  useEffect(() => {
    // Mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      
      gsap.to(imageRef.current, {
        x: mouseX * 20,
        y: mouseY * 20,
        duration: 1,
        ease: 'power2.out',
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Function to handle smooth scrolling to projects section
  const handleScrollToProjects = () => {
    console.log("Button clicked, trying to scroll to projects section");
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      console.log("Projects section found, scrolling");
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log("Projects section not found");
    }
  };
  
  return (
    <section ref={heroRef} id="hero" className="section bg-indian-royal-blue min-h-screen relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-indian-rich-purple/80 to-indian-royal-blue/90 z-0"></div>
      
      {/* Big name in background */}
      <div 
        ref={nameRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
      >
        <h1 className="text-white text-opacity-5 font-prata text-[20vw] font-bold">
          DURGA PRASAD
        </h1>
      </div>
      
      {/* Hero image */}
      <div 
        ref={imageRef} 
        className="absolute inset-0 opacity-90 z-10 pointer-events-none"
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <img 
          src="/lovable-uploads/fe8db7ff-71e0-4122-9a79-7d85b3ba394f.png" 
          alt="King with crown" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Content container - positioned at bottom */}
      <div className="absolute inset-x-0 bottom-16 md:bottom-24 z-20 px-4">
        <motion.div 
          className="text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <h1 
            ref={headingRef}
            className="text-3xl md:text-4xl lg:text-5xl font-prata mb-8 text-center"
          >
            <span className="text-indian-gold font-bold">Durga</span> Prasad
          </h1>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-center"
          >
            <Button 
              variant="outline"
              className="text-indian-gold text-lg border-2 border-indian-gold px-10 py-6 rounded-full transition duration-300 hover:bg-indian-gold hover:text-indian-royal-blue font-bold tracking-wider"
              onClick={handleScrollToProjects}
            >
              Begin The Journey
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Audio player - hidden */}
      <audio loop id="bgMusic" style={{ display: 'none' }}>
        <source src="" type="audio/mpeg" />
      </audio>
      
      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-indicator__arrow"></div>
      </div>
    </section>
  );
};

export default Hero;
