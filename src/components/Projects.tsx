
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
    title: "Real Estate",
    description: "Developed a platform for virtual tours of historical Indian architecture and monuments.",
    image: "/placeholder.svg",
    year: "2021"
  },
  {
    id: 4,
    title: "Stocks",
    description: "Created an investment strategy platform inspired by ancient Indian trading principles.",
    image: "/placeholder.svg",
    year: "2020"
  }
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionTitleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Tilt effect function
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (!projectRefs.current[index]) return;
    
    const card = projectRefs.current[index];
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (centerY - y) / 10;
    const tiltY = (x - centerX) / 10;
    
    gsap.to(card, {
      rotateX: tiltX,
      rotateY: tiltY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 900,
      transformStyle: 'preserve-3d'
    });
  };
  
  // Reset tilt
  const resetTilt = (index: number) => {
    if (!projectRefs.current[index]) return;
    
    gsap.to(projectRefs.current[index], {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  };
  
  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current || !headingRef.current || !sectionTitleRef.current) return;
    
    // Animate section title
    gsap.fromTo(sectionTitleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: sectionTitleRef.current,
          start: 'top bottom-=50',
          end: 'bottom bottom-=100',
          scrub: 1,
        }
      }
    );
    
    // Animate heading
    gsap.fromTo(headingRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top bottom-=100',
          end: 'bottom bottom-=200',
          scrub: 1,
        }
      }
    );
    
    // Timeline animation
    projectRefs.current.forEach((card, index) => {
      if (!card) return;
      
      gsap.fromTo(card,
        { 
          x: index % 2 === 0 ? -100 : 100, 
          opacity: 0,
          rotateY: index % 2 === 0 ? 5 : -5
        },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            end: 'center center',
            scrub: 1,
          }
        }
      );
    });
    
    // Parallax background effect
    const bgLayer = sectionRef.current.querySelector('.bg-layer');
    if (bgLayer) {
      gsap.fromTo(bgLayer,
        { y: '-10%' },
        {
          y: '10%',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
    }
  }, []);
  
  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="section bg-gradient-to-b from-indian-royal-blue to-indian-rich-purple relative py-20"
    >
      {/* Background decorative layer */}
      <div className="absolute inset-0 opacity-10 bg-layer pointer-events-none">
        {/* <!-- Replace background with Indian temple carvings / Mahabharata scenes --> */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url('/placeholder.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section title - Enhanced with more prominent styling */}
        <div className="mb-16 text-center">
          <h2 
            ref={sectionTitleRef}
            className="text-lg md:text-xl uppercase tracking-[0.2em] font-montserrat mb-4 text-center text-white/70"
          >
            Portfolio
          </h2>
          
          <h2 
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-prata mb-6 text-center text-white relative inline-block"
          >
            Legendary <span className="text-indian-gold">Works</span>
            <div className="h-1 w-24 bg-indian-gold mx-auto mt-4"></div>
          </h2>
          
          <p className="text-white/80 max-w-2xl mx-auto text-center text-lg">
            Discover my professional portfolio showcasing innovative projects and creative solutions.
          </p>
        </div>
        
        <div ref={timelineRef} className="max-w-5xl mx-auto relative">
          {/* Timeline path */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-indian-gold/30 transform -translate-x-1/2"></div>
          
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              ref={el => projectRefs.current[index] = el}
              className={`project-card mb-24 md:mb-32 bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover-trigger ${
                index % 2 === 0 ? 'md:ml-0 md:mr-auto' : 'md:ml-auto md:mr-0'
              }`}
              style={{ 
                maxWidth: '90%', 
                width: '600px',
                transformStyle: 'preserve-3d'
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              onMouseMove={(e) => handleTilt(e, index)}
              onMouseLeave={() => resetTilt(index)}
            >
              <div className="relative h-64 md:h-80 overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-110"
                  style={{ transform: 'translateZ(20px)' }}
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-indian-royal-blue/90 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-indian-gold text-indian-royal-blue font-bold py-1 px-4 rounded-full text-sm" style={{ transform: 'translateZ(40px)' }}>
                  {project.year}
                </div>
              </div>
              
              <div className="p-6 md:p-8" style={{ transform: 'translateZ(30px)' }}>
                <h3 className="text-2xl md:text-3xl font-prata mb-4 text-indian-gold">{project.title}</h3>
                <p className="text-white/80 mb-6">{project.description}</p>
                <button className="text-indian-gold border border-indian-gold px-6 py-2 rounded-full hover:bg-indian-gold hover:text-indian-royal-blue transition duration-300">
                  Explore
                </button>
              </div>
              
              {/* Timeline dot */}
              <div className={`hidden md:block absolute top-1/2 ${
                index % 2 === 0 ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'
              } w-4 h-4 rounded-full bg-indian-gold transform -translate-y-1/2 mx-8`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
