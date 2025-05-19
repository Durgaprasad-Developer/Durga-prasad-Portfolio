
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    // Initialize GSAP animations
    if (!heroRef.current) return;
    
    const heading = headingRef.current;
    const image = imageRef.current;
    const subtitle = subtitleRef.current;
    
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
    
    // Animate subtitle
    if (subtitle) {
      gsap.fromTo(subtitle,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.5,
          ease: 'power3.out',
          delay: 0.8
        }
      );
      
      // Parallax scroll effect on subtitle
      gsap.to(subtitle, {
        y: '-15%',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });
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
      
      {/* 3D hero image container */}
      <div 
        ref={imageRef} 
        className="absolute inset-0 opacity-70 z-0 pointer-events-none"
        style={{ backgroundImage: `url('/placeholder.svg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* <!-- Replace this image with your 3D Arjuna image --> */}
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div 
          className="max-w-5xl mx-auto text-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <h2 className="text-indian-gold text-xl md:text-3xl mb-4 font-light">Welcome to the Kingdom of</h2>
          
          <h1 
            ref={headingRef}
            className="text-4xl md:text-7xl lg:text-8xl font-prata mb-6 md:mb-8 text-white"
          >
            Ancient <span className="text-indian-gold">Indian</span> Kings
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-lg md:text-2xl mb-8 md:mb-12 max-w-3xl mx-auto font-light opacity-90"
          >
            Discover the legendary tales of valor, wisdom, and glory from the Mahabharata era
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <a href="#projects" className="hover-trigger hover-link text-indian-gold text-base md:text-lg border border-indian-gold px-6 md:px-8 py-2 md:py-3 rounded-full transition duration-300 hover:bg-indian-gold hover:text-indian-royal-blue">
              Explore Journey
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-indicator__arrow"></div>
      </div>
    </section>
  );
};

export default Hero;
