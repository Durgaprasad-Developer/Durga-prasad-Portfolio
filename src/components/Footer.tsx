
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Instagram, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!footerRef.current || !socialIconsRef.current) return;
    
    // Animate the social icons
    const socialIcons = gsap.utils.toArray('.social-icon');
    
    gsap.fromTo(socialIcons,
      { 
        y: 50, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: socialIconsRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer 
      ref={footerRef}
      className="bg-black relative py-20 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url('/placeholder.svg')",
          backgroundSize: '300px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-prata text-indian-gold mb-6"
            >
              Connect with the Kingdom
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-white/70 max-w-xl mx-auto"
            >
              Follow the royal journey through the digital realms and stay updated with the latest conquests.
            </motion.p>
          </div>
          
          {/* Social Icons */}
          <div 
            ref={socialIconsRef}
            className="flex justify-center items-center space-x-8 mb-20"
          >
            {/* <!-- Insert your social profile links and replace icon images --> */}
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon hover-trigger group"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center transform transition-all duration-500 group-hover:bg-indian-gold group-hover:scale-110">
                <Linkedin className="w-8 h-8 text-indian-gold group-hover:text-indian-royal-blue transition duration-300" />
              </div>
            </a>
            
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon hover-trigger group"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center transform transition-all duration-500 group-hover:bg-indian-gold group-hover:scale-110">
                <Instagram className="w-8 h-8 text-indian-gold group-hover:text-indian-royal-blue transition duration-300" />
              </div>
            </a>
            
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon hover-trigger group"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center transform transition-all duration-500 group-hover:bg-indian-gold group-hover:scale-110">
                <Youtube className="w-8 h-8 text-indian-gold group-hover:text-indian-royal-blue transition duration-300" />
              </div>
            </a>
          </div>
          
          {/* Back to top button */}
          <div className="text-center">
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              onClick={scrollToTop}
              className="inline-flex flex-col items-center text-indian-gold hover:text-white transition duration-300 hover-trigger"
            >
              <span className="mb-2 text-sm">Back to Top</span>
              <svg className="w-6 h-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.button>
          </div>
          
          {/* Copyright */}
          <div className="mt-16 pt-8 border-t border-white/10 text-center">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Ancient Indian Kings. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
