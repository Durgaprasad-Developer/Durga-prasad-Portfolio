
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indian-royal-blue to-indian-rich-purple p-4">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-6xl md:text-8xl font-prata mb-6 text-indian-gold"
          animate={{ 
            textShadow: ["0 0 5px rgba(212, 175, 55, 0.3)", "0 0 20px rgba(212, 175, 55, 0.6)", "0 0 5px rgba(212, 175, 55, 0.3)"]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          404
        </motion.h1>
        <h2 className="text-2xl md:text-3xl font-prata text-white mb-8">Page Not Found</h2>
        <p className="text-white/70 max-w-md mx-auto mb-10">
          The scroll you seek has been lost to time. Perhaps it was taken to another kingdom, or never existed at all.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a 
            href="/" 
            className="text-indian-gold border-2 border-indian-gold hover:bg-indian-gold hover:text-indian-royal-blue transition-colors duration-300 font-semibold py-3 px-8 rounded-full inline-block"
          >
            Return to the Kingdom
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
