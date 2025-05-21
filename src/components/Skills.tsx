
import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  icon: string;
  description: string;
}

const skills: Skill[] = [
  {
    name: "React",
    level: 90,
    icon: "/placeholder.svg", // Will be replaced with skill icon
    description: "Mastery of modern React, including hooks, context, and advanced patterns"
  },
  {
    name: "JavaScript",
    level: 85,
    icon: "/placeholder.svg", // Will be replaced with skill icon
    description: "Extensive knowledge of ES6+ features and asynchronous programming"
  },
  {
    name: "TypeScript",
    level: 80,
    icon: "/placeholder.svg", // Will be replaced with skill icon
    description: "Strong typing skills with advanced type system knowledge"
  },
  {
    name: "Node.js",
    level: 75,
    icon: "/placeholder.svg", // Will be replaced with skill icon
    description: "Backend development with Express and various frameworks"
  },
  {
    name: "UI/UX Design",
    level: 70, 
    icon: "/placeholder.svg", // Will be replaced with skill icon
    description: "Creating intuitive and beautiful user interfaces"
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionTitleRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !skillsRef.current || !sectionTitleRef.current) return;
    
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
    
    // Animate skills
    const skillElements = document.querySelectorAll('.skill-item');
    skillElements.forEach((skill, index) => {
      // Animate skill item entry
      gsap.fromTo(skill,
        { 
          x: index % 2 === 0 ? -100 : 100, 
          opacity: 0 
        },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: skill,
            start: 'top bottom-=100',
            end: 'top center',
            scrub: 1,
          }
        }
      );
      
      // Animate skill progress bar
      const progressBar = skill.querySelector('.skill-progress');
      const level = parseInt(progressBar?.getAttribute('data-level') || '0');
      
      gsap.fromTo(progressBar,
        { width: '0%' },
        {
          width: `${level}%`,
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: skill,
            start: 'top bottom-=100',
            end: 'top center',
            scrub: false,
            toggleActions: 'play none none reverse',
          }
        }
      );
    });
    
    // Parallax background effect
    gsap.fromTo(sectionRef.current.querySelector('.bg-pattern'),
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
  }, []);
  
  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="section bg-gradient-to-b from-indian-rich-purple to-indian-maroon relative py-20"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 bg-pattern pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url('/placeholder.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section title */}
        <h2 
          ref={sectionTitleRef}
          className="text-2xl md:text-3xl font-prata mb-4 text-center text-white"
        >
          <span className="text-indian-gold">My</span> Expertise
        </h2>
        
        <h2 
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl font-prata mb-20 text-center text-white"
        >
          Royal <span className="text-indian-gold">Skills</span>
        </h2>
        
        <div 
          ref={skillsRef}
          className="max-w-4xl mx-auto"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-item mb-16 md:mb-24"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className={`flex items-center mb-4 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`relative ${index % 2 === 0 ? 'mr-6' : 'ml-6'}`}>
                  {/* <!-- Replace icons with your dev skillset icons (SVG or PNG) --> */}
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-indian-gold/10 p-4 flex items-center justify-center animate-glow">
                    <img 
                      src={skill.icon} 
                      alt={skill.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                <div className={`flex-1 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{skill.name}</h3>
                  <p className="text-white/70 mb-4">{skill.description}</p>
                  <div className="skill-bar w-full">
                    <div className="skill-progress" data-level={skill.level}></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-white/50">Beginner</span>
                    <span className="text-xs text-white/50">Master</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
