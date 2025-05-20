
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const ChariotJourney = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chariotRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !chariotRef.current || !pathRef.current) return;
    
    // Create the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        toggleActions: "play none none reverse"
      }
    });
    
    // Animate the chariot along the path
    tl.to(chariotRef.current, {
      duration: 10,
      motionPath: {
        path: pathRef.current,
        align: pathRef.current,
        alignOrigin: [0.5, 0.5],
        autoRotate: true
      },
      ease: "power1.inOut"
    });
    
    return () => {
      // Clean up
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div 
      ref={sectionRef} 
      className="relative h-[200px] md:h-[300px] w-full overflow-hidden bg-gradient-to-b from-indian-royal-blue to-indian-rich-purple"
    >
      {/* SVG Path (hidden but used for motion) */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 1200 300" 
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M0,150 C300,50 600,250 900,100 S1200,150 1200,150"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
        />
      </svg>
      
      {/* Chariot */}
      <div 
        ref={chariotRef}
        className="absolute top-0 left-0 w-16 h-16 md:w-24 md:h-24"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-full h-full relative animate-glow">
          {/* Chariot icon (using a simple crown as placeholder) */}
          <svg viewBox="0 0 24 24" className="w-full h-full text-indian-gold">
            <path 
              fill="currentColor" 
              d="M12,2L15.09,8.37L22,9.27L17,14.14L18.18,21L12,17.77L5.82,21L7,14.14L2,9.27L8.91,8.37L12,2M12,8V16L14.5,19.1L13.9,15L16.2,11.9L12,11.5L12,8Z" 
            />
          </svg>
        </div>
        
        {/* Trail effect */}
        <div className="absolute top-1/2 right-full w-20 h-[2px] bg-gradient-to-r from-transparent to-indian-gold"></div>
      </div>
    </div>
  );
};

export default ChariotJourney;
