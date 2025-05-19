
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
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current || !headingRef.current) return;
    
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
    const projectCards = gsap.utils.toArray('.project-card');
    
    projectCards.forEach((card, index) => {
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
    gsap.fromTo(sectionRef.current.querySelector('.bg-layer'),
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
        <h2 
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl font-prata mb-20 text-center text-white"
        >
          Legendary <span className="text-indian-gold">Works</span>
        </h2>
        
        <div ref={timelineRef} className="max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`project-card mb-24 md:mb-32 bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover-trigger ${
                index % 2 === 0 ? 'md:ml-0 md:mr-auto' : 'md:ml-auto md:mr-0'
              }`}
              style={{ maxWidth: '90%', width: '600px' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="relative h-64 md:h-80 overflow-hidden">
                {/* <!-- Add project thumbnails or videos here. Can embed YouTube or MP4 --> */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-indian-royal-blue/90 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-indian-gold text-indian-royal-blue font-bold py-1 px-4 rounded-full text-sm">
                  {project.year}
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-prata mb-4 text-indian-gold">{project.title}</h3>
                <p className="text-white/80 mb-6">{project.description}</p>
                <button className="text-indian-gold border border-indian-gold px-6 py-2 rounded-full hover:bg-indian-gold hover:text-indian-royal-blue transition duration-300">
                  Explore
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
