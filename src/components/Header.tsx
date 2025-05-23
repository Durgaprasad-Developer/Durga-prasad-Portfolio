
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'About', href: '#about' },
    { name: 'Side Projects', href: '#sideprojects' }
  ];

  // Handle scroll event to change header style when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileLinkClick = (href: string) => {
    // Close menu when a link is clicked
    setMobileMenuOpen(false);
    
    // Scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 w-full px-5 md:px-6 py-3 md:py-4 z-50 transition-all duration-300 ${
        scrolled ? 'bg-indian-royal-blue/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl md:text-2xl">
          <span className="text-indian-gold">D</span>P
        </div>
        
        {/* Desktop Navigation - hidden on mobile */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <a 
                  href={item.href}
                  className="text-white hover:text-indian-gold transition-colors duration-300 text-sm uppercase tracking-wider font-medium relative group"
                >
                  {item.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indian-gold group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="block md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-90 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex flex-col h-full justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <ul className="flex flex-col space-y-6 text-center">
                {navItems.map((item, index) => (
                  <motion.li 
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (index * 0.1), duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <button 
                      onClick={() => handleMobileLinkClick(item.href)}
                      className="text-white hover:text-indian-gold transition-colors duration-300 text-xl uppercase tracking-wider font-medium relative"
                    >
                      {item.name}
                      <span className="absolute left-0 right-0 mx-auto bottom-0 w-1/2 h-0.5 bg-indian-gold scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
