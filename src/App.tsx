
import { useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useSmoothScroll } from './hooks/useSmoothScroll';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const lenis = useSmoothScroll();
  
  // Handle preloader completion
  const handlePreloaderComplete = () => {
    setIsLoading(false);
    
    // Start playing background music when preloader completes
    const bgMusic = document.getElementById('bgMusic') as HTMLAudioElement;
    if (bgMusic) {
      bgMusic.volume = 0.3;
      bgMusic.play().catch(err => console.log('Audio autoplay prevented:', err));
      setIsMusicPlaying(true);
    }
  };
  
  // Toggle background music
  const toggleMusic = () => {
    const bgMusic = document.getElementById('bgMusic') as HTMLAudioElement;
    if (bgMusic) {
      if (isMusicPlaying) {
        bgMusic.pause();
      } else {
        bgMusic.play().catch(err => console.log('Audio play prevented:', err));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };
  
  // Enable/disable scrolling based on loading state
  useEffect(() => {
    if (lenis) {
      if (isLoading) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
    
    return () => {
      if (lenis) lenis.destroy();
    };
  }, [lenis, isLoading]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* Custom cursor for desktop */}
        <CustomCursor />
        
        {/* Background Music */}
        <audio loop id="bgMusic">
          <source src="/background-music.mp3" type="audio/mpeg" />
        </audio>
        
        {/* Music control button */}
        <button 
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
          aria-label={isMusicPlaying ? "Pause music" : "Play music"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-white"
          >
            {isMusicPlaying ? (
              <>
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </>
            ) : (
              <polygon points="5 3 19 12 5 21 5 3" />
            )}
          </svg>
        </button>
        
        {/* Preloader */}
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
        
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
