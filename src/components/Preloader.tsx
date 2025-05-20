
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulate loading progress
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 3;
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              onComplete();
            }, 500);
            return 100;
          }
          return newProgress;
        });
      }, 50);
      
      return () => clearInterval(interval);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  const progressBarStyle = {
    width: `${progress}%`,
  };
  
  return (
    <motion.div 
      className="preloader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="preloader__content">
        <motion.h1
          className="text-6xl md:text-7xl font-prata mb-2 text-white font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-indian-gold">DURGA PRASAD</span>
        </motion.h1>
        
        <motion.p
          className="text-white/70 mb-6 text-xl uppercase tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Portfolio
        </motion.p>
        
        <div className="preloader__progress">
          <motion.div 
            className="preloader__bar"
            style={progressBarStyle}
          ></motion.div>
        </div>
        
        <motion.p
          className="text-sm text-white/50 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {Math.round(progress)}%
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Preloader;
