
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    // Simulate loading progress
    interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Slight delay before completing
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 800); // Delay before unmounting
          }, 500);
          
          return 100;
        }
        
        return newProgress;
      });
    }, 100);
    
    return () => {
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div 
          className="preloader"
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
        >
          <div className="preloader__content">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl mb-4"
            >
              Ancient Indian Kings
            </motion.h1>
            
            <div className="preloader__progress">
              <motion.div 
                className="preloader__bar"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {Math.round(progress)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
