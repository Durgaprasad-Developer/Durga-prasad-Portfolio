
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
        y: '25%',
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
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.5,
          ease: 'power3.out',
          delay: 0.5
        }
      );
      
      // Parallax scroll effect on heading
      gsap.to(heading, {
        y: '-25%',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });
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
  
  return (
    <section ref={heroRef} className="section bg-indian-royal-blue min-h-screen relative overflow-hidden">
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
      
      {/* Content container */}
      <div className="container mx-auto px-4 z-20 relative">
        <motion.div 
          className="max-w-5xl mx-auto text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <h1 
            ref={headingRef}
            className="text-6xl md:text-8xl lg:text-9xl font-prata mb-8 text-white text-right mr-8"
          >
            <span className="text-indian-gold font-bold">Durga</span> Prasad
          </h1>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-right mr-8"
          >
            <a href="#projects" className="hover-trigger hover-link text-indian-gold text-lg border border-indian-gold px-8 py-3 rounded-full transition duration-300 hover:bg-indian-gold hover:text-indian-royal-blue">
              Begin The Journey
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Audio player - hidden */}
      <audio loop id="bgMusic" style={{ display: 'none' }}>
        {/* <!-- Replace with traditional Indian music (looping .mp3) --> */}
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
