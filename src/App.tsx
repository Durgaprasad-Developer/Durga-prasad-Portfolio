
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
  const lenis = useSmoothScroll();
  
  // Handle preloader completion
  const handlePreloaderComplete = () => {
    setIsLoading(false);
    
    // Start playing background music when preloader completes
    const bgMusic = document.getElementById('bgMusic') as HTMLAudioElement;
    if (bgMusic) {
      bgMusic.volume = 0.3;
      bgMusic.play().catch(err => console.log('Audio autoplay prevented:', err));
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
