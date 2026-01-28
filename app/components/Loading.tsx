'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Loading() {
  const [dots, setDots] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);

  useEffect(() => {
    // Dots animation
    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 300);

    // Wait for window.onload
    const handleLoad = () => {
      setIsLoaded(true);
      // Start fade out after a short delay
      setTimeout(() => {
        setShouldHide(true);
      }, 300);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearInterval(dotsInterval);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (shouldHide) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-700 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Halftone background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, black 1.5px, transparent 1.5px)',
        backgroundSize: '6px 6px',
        animation: 'subtle-shift 60s ease-in-out infinite'
      }} />

      <div className="relative text-center">
        {/* Campfire GIF - Newspaper photo style */}
        <div className="mb-8 flex justify-center">
          <div className="relative p-8 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            {/* Inner dot pattern for newspaper photo effect */}
            <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
              backgroundImage: 'radial-gradient(circle, black 1.5px, transparent 1.5px)',
              backgroundSize: '4px 4px'
            }} />

            {/* Campfire GIF */}
            <div className="relative z-10">
              <Image
                src="/Pixel_Art_Campfire_Animation.gif"
                alt="Loading campfire"
                width={200}
                height={200}
                priority
                unoptimized
                className="pixel-art"
              />
            </div>

            {/* Strong halftone overlay for newspaper effect */}
            <div className="absolute inset-0 opacity-25 pointer-events-none mix-blend-multiply" style={{
              backgroundImage: 'radial-gradient(circle, black 2px, transparent 2px)',
              backgroundSize: '5px 5px'
            }} />
          </div>
        </div>

        {/* Loading text */}
        <div className="font-grotesk font-bold text-xl md:text-2xl uppercase tracking-tight mb-2 relative">
          LOADING{dots}
          <div className="absolute inset-0 opacity-12 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, black 2px, transparent 2px)',
            backgroundSize: '5px 5px',
            mixBlendMode: 'multiply'
          }} />
        </div>

        <div className="font-mono text-xs uppercase tracking-wider opacity-60 mb-4">
          Initializing Experience
        </div>

        {/* Progress bar */}
        <div className="mt-6 w-48 h-2 border-2 border-black mx-auto overflow-hidden relative">
          <div
            className="h-full bg-[#FFD700]"
            style={{
              animation: 'loading-pulse 1.5s ease-in-out infinite'
            }}
          />
          {/* Dot pattern on progress bar */}
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
            backgroundSize: '2px 2px'
          }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-pulse {
          0%, 100% { width: 20%; }
          50% { width: 80%; }
        }
        .pixel-art {
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }
      `}</style>
    </div>
  );
}
