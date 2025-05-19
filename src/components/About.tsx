
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2018",
    title: "Started Coding",
    description: "Began my journey into the world of programming, focusing on web development with HTML, CSS, and JavaScript.",
    image: "/placeholder.svg"
  },
  {
    year: "2019",
    title: "First Hackathon",
    description: "Participated in my first hackathon and won 3rd place with an innovative solution for local businesses.",
    image: "/placeholder.svg"
  },
  {
    year: "2020",
    title: "Built AI Avatars",
    description: "Developed an AI-powered avatar generation platform that became popular among content creators.",
    image: "/placeholder.svg"
  },
  {
    year: "2022",
    title: "Freelancing",
    description: "Started my own freelance business, working with clients around the world on various web and mobile applications.",
    image: "/placeholder.svg"
  }
];

const About = () => {
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
          scrub: 1
        }
      }
    );
    
    // Animate timeline events
    const timelineEvents = gsap.utils.toArray('.timeline-event');
    
    timelineEvents.forEach((event, index) => {
      // Stagger the animations
      gsap.fromTo(event,
        { 
          y: 100, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: event,
            start: 'top bottom-=50',
            end: 'center center',
            scrub: 1
          }
        }
      );
    });
    
    // Animate the timeline line
    gsap.fromTo('.timeline-line',
      { height: 0 },
      {
        height: '100%',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        }
      }
    );
    
    // Parallax background effect
    gsap.fromTo(sectionRef.current.querySelector('.bg-overlay'),
      { y: '-10%' },
      {
        y: '10%',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  }, []);
  
  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="section bg-gradient-to-b from-indian-maroon to-indian-royal-blue relative py-20"
    >
      {/* Background overlay with Indian motifs */}
      <div className="absolute inset-0 opacity-5 bg-overlay pointer-events-none">
        {/* <!-- Add timeline image here, stylized in ancient Indian background --> */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url('/placeholder.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl font-prata mb-20 text-center text-white"
        >
          The <span className="text-indian-gold">Journey</span>
        </h2>
        
        <div 
          ref={timelineRef}
          className="max-w-5xl mx-auto relative"
        >
          {/* Timeline center line */}
          <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 bg-indian-gold/50 top-0 bottom-0 z-0"></div>
          
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.title}
              className="timeline-event relative z-10 mb-32"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-indian-gold z-20"></div>
              
              {/* Content container */}
              <div className={`flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                {/* Year marker */}
                <div className={`mb-4 md:mb-0 ${
                  index % 2 === 0 ? 'md:mr-8 md:text-right' : 'md:ml-8 md:text-left'
                } md:w-1/4`}>
                  <div className="bg-indian-gold text-indian-royal-blue text-xl md:text-2xl font-bold py-2 px-6 inline-block rounded-full">
                    {event.year}
                  </div>
                </div>
                
                {/* Content */}
                <div className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 ${
                  index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                } md:w-3/4`}>
                  <div className="flex flex-col md:flex-row items-start">
                    {/* Image */}
                    <div className="mb-6 md:mb-0 md:mr-6 md:w-1/3">
                      <div className="rounded-lg overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-48 object-cover transform transition-transform duration-700 hover:scale-110"
                        />
                      </div>
                    </div>
                    
                    {/* Text content */}
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-bold text-indian-gold mb-4">{event.title}</h3>
                      <p className="text-white/80">{event.description}</p>
                    </div>
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

export default About;
