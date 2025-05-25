
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  year: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI Avatars",
    description: "Created an AI-powered avatar generator that transforms photos into ancient Indian warrior styles.",
    image: "/placeholder.svg",
    year: "2023"
  },
  {
    id: 2,
    title: "YouTube Channel",
    description: "Launched an educational channel teaching ancient Indian history and warrior techniques.",
    image: "/placeholder.svg",
    year: "2022"
  },
  {
    id: 3,
    title: "Other AI Works",
    description: "Developed various AI initiatives focused on preserving and promoting ancient Indian cultural heritage.",
    image: "/placeholder.svg",
    year: "2021"
  },
  {
    id: 4,
    title: "Real Estate",
    description: "Developed a platform for virtual tours of historical Indian architecture and monuments.",
    image: "/placeholder.svg",
    year: "2020"
  },
  {
    id: 5,
    title: "Stocks",
    description: "Created an investment strategy platform inspired by ancient Indian trading principles.",
    image: "/placeholder.svg",
    year: "2019"
  }
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionTitleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Enhanced tilt effect with smoother animations
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (!projectRefs.current[index] || window.innerWidth < 768) return;
    
    const card = projectRefs.current[index];
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (centerY - y) / 15;
    const tiltY = (x - centerX) / 15;
    
    gsap.to(card, {
      rotateX: tiltX,
      rotateY: tiltY,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1000,
      transformStyle: 'preserve-3d'
    });
  };
  
  // Reset tilt with smoother transition
  const resetTilt = (index: number) => {
    if (!projectRefs.current[index]) return;
    
    gsap.to(projectRefs.current[index], {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power2.out'
    });
  };
  
  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current || !headingRef.current || !sectionTitleRef.current) return;
    
    // Enhanced section title animation
    gsap.fromTo(sectionTitleRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionTitleRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    // Enhanced heading animation
    gsap.fromTo(headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top bottom-=150',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    // Enhanced timeline animation for each card
    projectRefs.current.forEach((card, index) => {
      if (!card) return;
      
      gsap.fromTo(card,
        { 
          y: 80,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
          },
          delay: index * 0.15
        }
      );
    });
    
    // Enhanced parallax background effect
    const bgLayer = sectionRef.current.querySelector('.bg-layer');
    if (bgLayer) {
      gsap.fromTo(bgLayer,
        { y: '-5%' },
        {
          y: '5%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          }
        }
      );
    }
  }, []);
  
  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="section bg-gradient-to-b from-indian-royal-blue to-indian-rich-purple relative py-20 md:py-28 lg:py-32"
    >
      {/* Enhanced background decorative layer */}
      <div className="absolute inset-0 opacity-5 bg-layer pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url('/placeholder.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced section title */}
        <motion.h2 
          ref={sectionTitleRef}
          className="text-2xl md:text-3xl lg:text-4xl font-prata mb-6 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-indian-gold">My</span> Journey
        </motion.h2>
        
        <motion.h2 
          ref={headingRef}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-prata mb-16 md:mb-24 lg:mb-28 text-center text-white leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Legendary <span className="text-indian-gold">Works</span>
        </motion.h2>
        
        <div ref={timelineRef} className="max-w-7xl mx-auto relative">
          {/* Enhanced timeline path */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indian-gold/40 via-indian-gold/60 to-indian-gold/40 transform -translate-x-1/2 hidden lg:block"></div>
          
          {/* Enhanced mobile indicator */}
          <div className="w-3/4 mx-auto h-0.5 bg-gradient-to-r from-transparent via-indian-gold/50 to-transparent mb-12 lg:hidden"></div>
          
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              ref={el => projectRefs.current[index] = el}
              className={`project-card mb-16 md:mb-20 lg:mb-28 bg-white/8 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl hover:shadow-indian-gold/20 transition-all duration-500 group ${
                index % 2 === 0 
                  ? 'lg:ml-0 lg:mr-auto lg:translate-x-0' 
                  : 'lg:ml-auto lg:mr-0 lg:translate-x-0'
              }`}
              style={{ 
                maxWidth: '100%',
                width: '100%',
                transformStyle: 'preserve-3d'
              }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              viewport={{ once: true, margin: "-100px" }}
              onMouseMove={(e) => handleTilt(e, index)}
              onMouseLeave={() => resetTilt(index)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="lg:flex lg:items-center lg:min-h-[400px]">
                {/* Image container with enhanced styling */}
                <div className={`relative lg:w-1/2 h-64 sm:h-72 lg:h-96 overflow-hidden ${
                  index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'
                }`} style={{ transformStyle: 'preserve-3d' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transform transition-all duration-700 group-hover:scale-110"
                    style={{ transform: 'translateZ(20px)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indian-royal-blue/80 via-transparent to-transparent"></div>
                  <div className="absolute top-6 right-6 bg-indian-gold text-indian-royal-blue font-bold py-2 px-6 rounded-full text-lg lg:text-xl shadow-lg" style={{ transform: 'translateZ(40px)' }}>
                    {project.year}
                  </div>
                </div>
                
                {/* Content container with enhanced styling */}
                <div className={`lg:w-1/2 p-8 lg:p-12 xl:p-16 ${
                  index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'
                }`} style={{ transform: 'translateZ(30px)' }}>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-prata mb-6 lg:mb-8 text-indian-gold leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-white/90 mb-8 lg:mb-10 text-base lg:text-lg xl:text-xl leading-relaxed">
                    {project.description}
                  </p>
                  <motion.button 
                    className="text-indian-gold border-2 border-indian-gold px-8 py-3 lg:px-10 lg:py-4 rounded-full hover:bg-indian-gold hover:text-indian-royal-blue transition-all duration-300 text-base lg:text-lg font-medium shadow-lg hover:shadow-indian-gold/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore
                  </motion.button>
                </div>
              </div>
              
              {/* Enhanced timeline dot */}
              <div className={`hidden lg:block absolute top-1/2 ${
                index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'
              } w-6 h-6 rounded-full bg-indian-gold transform -translate-y-1/2 shadow-lg shadow-indian-gold/50 border-4 border-indian-royal-blue`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
