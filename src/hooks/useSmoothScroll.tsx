
import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';

export function useSmoothScroll() {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  
  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Only use properties that are supported by the Lenis type
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    setLenis(lenisInstance);

    return () => {
      lenisInstance.destroy();
    };
  }, []);

  return lenis;
}
