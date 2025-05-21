
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
    
    // Create the animation that follows only the projects section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#projects", // Target only the projects section
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        toggleActions: "play none none reverse"
      }
    });
    
    // Calculate path points based on project cards positioning
    const projectCards = document.querySelectorAll('.project-card');
    let pathPoints = "";
    
    if (projectCards.length > 0) {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        const sectionRect = projectsSection.getBoundingClientRect();
        const sectionHeight = sectionRect.height;
        
        // Start at the section title
        const startX = 500; // Middle of SVG viewBox
        const startY = 100; // Near the top
        pathPoints = `M${startX},${startY} `;
        
        // Create zigzag points through project cards
        projectCards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          const offsetY = rect.top - sectionRect.top + rect.height / 2;
          const normalizedY = (offsetY / sectionHeight) * 1000; // Scale to SVG viewBox
          
          // Alternating left and right points for zigzag
          const x = index % 2 === 0 ? 200 : 800;
          pathPoints += `L${x},${normalizedY} `;
        });
        
        // End point just before skills section
        pathPoints += `L500,1000`;
      }
    } else {
      // Fallback path if project cards aren't available
      pathPoints = "M500,100 C300,300 700,500 300,700 C700,900 500,1000 500,1000";
    }
    
    // Update the SVG path
    pathRef.current.setAttribute("d", pathPoints);
    
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
      className="fixed left-0 right-0 z-30 w-full h-full pointer-events-none"
      style={{ top: 0 }} // Ensure it starts at the top
    >
      {/* SVG Path for zigzag motion throughout the Projects section */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 1000 1000" 
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M500,100 C300,300 700,500 300,700 C700,900 500,1000 500,1000" // Initial zigzag path
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
      </svg>
      
      {/* Chariot */}
      <div 
        ref={chariotRef}
        className="absolute top-0 left-1/2 w-12 h-12 md:w-16 md:h-16"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-full h-full relative animate-glow">
          {/* Chariot icon */}
          <svg viewBox="0 0 24 24" className="w-full h-full text-indian-gold">
            <path 
              fill="currentColor" 
              d="M12,2L15.09,8.37L22,9.27L17,14.14L18.18,21L12,17.77L5.82,21L7,14.14L2,9.27L8.91,8.37L12,2M12,8V16L14.5,19.1L13.9,15L16.2,11.9L12,11.5L12,8Z" 
            />
          </svg>
        </div>
        
        {/* Trail effect - vertical */}
        <div className="absolute bottom-full left-1/2 h-20 w-[2px] bg-gradient-to-t from-transparent to-indian-gold"></div>
      </div>
    </div>
  );
};

export default ChariotJourney;
