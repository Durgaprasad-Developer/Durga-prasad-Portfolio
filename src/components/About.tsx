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
          backgroundImage: "url('/placeholder.svg')",
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
              My journey began in 8th grade, not with textbooks — but with business.

From trying out investments, trading, and selling courses, I was always looking to build, create, and earn. I entered content creation, sharing what I knew and learning publicly. This opened doors to hackathons, where I turned ideas into prototypes and dreams into code.

Then came real estate — my family's livelihood. Working alongside my father, I saw the challenges brokers and builders face. That’s when I realized: tech could be the bridge.

            </p>
            <p className="text-lg mb-6 opacity-80">
              Now, I’m focused on:

Learning more about real estate

            </p>
            <ul className="list-disc pl-5 opacity-80">
              <li>Earning — because financial freedom isn’t optional anymore</li>
              <li>Using technology to bridge the gaps in traditional industries</li>
              <li>AI to replace manual tasks — from content automation to customer interaction</li>
              <li>Web development — building with React, Tailwind, and backend tools</li>
              <li>AI tools — not just consuming, but creating with them</li>
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
