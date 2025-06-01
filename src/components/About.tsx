import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !imageRef.current) return;
    
    // Create a timeline for the content animation
    const contentElements = contentRef.current.querySelectorAll('h2, p, ul li');
    
    contentElements.forEach((element, index) => {
      gsap.fromTo(element,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: element,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
    
    // Image reveal animation
    gsap.fromTo(imageRef.current,
      { 
        clipPath: 'inset(100% 0 0 0)',
        y: 100
      },
      {
        clipPath: 'inset(0% 0 0 0)',
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    // Background parallax effect
    if (sectionRef.current) {
      const bgLayer = sectionRef.current.querySelector('.bg-layer');
      if (bgLayer) {
        gsap.fromTo(bgLayer,
          { y: '-20%' },
          {
            y: '20%',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      }
    }
  }, []);
  
  return (
    <section 
      id="about"
      ref={sectionRef} 
      className="section bg-gradient-to-b from-indian-rich-purple to-indian-royal-blue relative py-20"
    >
      {/* Background decorative layer */}
      <div className="absolute inset-0 opacity-10 bg-layer pointer-events-none">
        {/* Replace background with ancient Indian patterns */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url('./lovable-uploads/om.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div ref={contentRef} className="text-white">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-prata mb-6 text-indian-gold">
              My <span className="text-white">Story</span>
            </h2>
            <p className="text-lg mb-6 opacity-80">
              My journey began in 8th grade — selling, trading, learning. I moved from online businesses to content creation, then to hackathons, real estate, and now AI. I don’t just use tools — I build with them. I’m on a mission to bridge gaps in real estate and content with the power of tech.

            </p>
            <p className="text-lg mb-6 opacity-80">
              Now, I’m focused on:
            </p>
            <ul className="list-disc pl-5 opacity-80">
              <li>Real Estate + Tech: Learning the gaps in India’s property market and building AI-powered tools to fix them.</li>
              <li>AI Creation & Automation: Using AI to automate content, build tools, and create scalable systems — starting with my service, NextAI.</li>
              <li>Earning + Mastery: Gaining financial strength through internships, investing, and projects — all while mastering DSA, systems, and real-world problem solving.</li>
            </ul>
          </div>
          
          {/* Image */}
          <div ref={imageRef} className="relative overflow-hidden rounded-xl shadow-xl">
            {/* Replace with an image of ancient Indian kings or artifacts */}
            <img 
              src="./lovable-uploads/YouTube.png" 
              alt="Ancient Indian Kings" 
              className="w-full h-auto object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indian-royal-blue/70 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
