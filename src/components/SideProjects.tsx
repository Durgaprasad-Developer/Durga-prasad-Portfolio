
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SideProject {
  id: number;
  title: string;
  description: string;
  image: string;
}

const sideProjects: SideProject[] = [
  {
    id: 1,
    title: "Ancient Weapons Collection",
    description: "Curated traditional Indian warfare artifacts and digitized them for historical preservation.",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Leadership Academy",
    description: "Founded a program teaching leadership principles derived from ancient Indian kings and warriors.",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Historical Fiction Novel",
    description: "Authored a novel set in ancient India exploring the lives of royal warriors.",
    image: "/placeholder.svg"
  }
];

const SideProjects = () => {
  const [activeProject, setActiveProject] = useState<SideProject | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !projectsRef.current) return;
    
    // Animate the heading
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    // Animate the projects
    const projects = projectsRef.current.querySelectorAll('.side-project');
    
    projects.forEach((project, index) => {
      gsap.fromTo(project,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: project,
            start: 'top bottom-=50',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
    
    // Background parallax effect
    if (sectionRef.current) {
      const bgLayer = sectionRef.current.querySelector('.bg-layer');
      if (bgLayer) {
        gsap.fromTo(bgLayer,
          { y: '0%' },
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
  
  const openModal = (project: SideProject) => {
    setActiveProject(project);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setActiveProject(null);
    document.body.style.overflow = 'auto';
  };
  
  return (
    <section 
      id="side-projects" 
      ref={sectionRef} 
      className="section bg-gradient-to-b from-indian-royal-blue to-black relative py-20"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url('/placeholder.svg')",
          backgroundSize: '200px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl font-prata mb-20 text-center text-white"
        >
          Other <span className="text-indian-gold">Conquests</span>
        </h2>
        
        <div 
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {sideProjects.map((project) => (
            <motion.div
              key={project.id}
              className="side-project group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div 
                className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer hover-trigger transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-indian-gold/20"
                onClick={() => openModal(project)}
              >
                {/* <!-- Insert project thumbnails/videos inside each animated card --> */}
                <div className="h-48 md:h-60 overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indian-royal-blue/90 via-indian-royal-blue/30 to-transparent opacity-80"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-indian-gold mb-3">{project.title}</h3>
                  <p className="text-white/70 mb-4">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-indian-gold/70">Explore</span>
                    <svg className="w-6 h-6 text-indian-gold transform transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Modal */}
      {activeProject && (
        <motion.div 
          className="modal-overlay open"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="modal-content bg-indian-royal-blue border border-indian-gold/30"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button 
              className="modal-close text-indian-gold hover:text-white"
              onClick={closeModal}
            >
              &times;
            </button>
            
            <div className="p-6">
              <h3 className="text-2xl md:text-3xl font-bold text-indian-gold mb-4">{activeProject.title}</h3>
              
              <div className="mb-6 rounded-lg overflow-hidden">
                <img 
                  src={activeProject.image} 
                  alt={activeProject.title}
                  className="w-full h-64 object-cover"
                />
              </div>
              
              <p className="text-white/80 mb-6">{activeProject.description}</p>
              
              <div className="flex justify-end">
                <a 
                  href={activeProject.link}
                  className="bg-indian-gold text-indian-royal-blue font-semibold py-2 px-6 rounded-lg hover:bg-white transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Project
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default SideProjects;
