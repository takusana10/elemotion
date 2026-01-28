'use client';

import React, { useEffect, useState } from 'react';

interface SplashGraphicsProps {
  intensity?: 'low' | 'medium' | 'high';
}

const SplashGraphics = React.memo(function SplashGraphics({ intensity = 'medium' }: SplashGraphicsProps) {
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight - windowHeight;
          const scrolled = window.scrollY;
          const progress = documentHeight > 0 ? (scrolled / documentHeight) : 0;
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Scroll-reactive graphics */}

      {/* Top Right - Rotating geometric shape */}
      <div
        className="absolute top-[15%] right-[10%] w-32 h-32 transition-all duration-300 ease-out"
        style={{
          transform: `rotate(${scrollProgress * 360}deg) scale(${1 + scrollProgress * 0.3})`,
          opacity: 0.8 - scrollProgress * 0.3,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Hexagon */}
          <polygon
            points="50,10 85,30 85,70 50,90 15,70 15,30"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2"
            opacity="0.3"
          />
          <polygon
            points="50,20 75,35 75,65 50,80 25,65 25,35"
            fill="none"
            stroke="#FFD700"
            strokeWidth="1.5"
            opacity="0.25"
          />
          <polygon
            points="50,30 65,40 65,60 50,70 35,60 35,40"
            fill="#FFD700"
            opacity="0.15"
          />

          {/* Center dot */}
          <circle cx="50" cy="50" r="4" fill="#FFD700" opacity="0.5" />

          {/* Corner accents */}
          <circle cx="50" cy="10" r="3" fill="#FFD700" opacity="0.4" />
          <circle cx="85" cy="30" r="2.5" fill="#FFD700" opacity="0.35" />
          <circle cx="85" cy="70" r="2" fill="#FFD700" opacity="0.3" />
          <circle cx="50" cy="90" r="2.5" fill="#FFD700" opacity="0.35" />
          <circle cx="15" cy="70" r="2" fill="#FFD700" opacity="0.3" />
          <circle cx="15" cy="30" r="2.5" fill="#FFD700" opacity="0.35" />
        </svg>
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
            backgroundSize: '4px 4px',
          }}
        />
      </div>

      {/* Top Left - Moving triangular shape */}
      <div
        className="absolute top-[25%] left-[15%] w-24 h-24 transition-all duration-300 ease-out"
        style={{
          transform: `translateY(${scrollProgress * 100}px) rotate(${scrollProgress * -180}deg)`,
          opacity: 0.6 - scrollProgress * 0.2,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon
            points="50,15 85,75 15,75"
            fill="none"
            stroke="black"
            strokeWidth="2"
            opacity="0.25"
          />
          <polygon
            points="50,25 75,70 25,70"
            fill="none"
            stroke="black"
            strokeWidth="1.5"
            opacity="0.2"
          />
          <polygon
            points="50,35 65,65 35,65"
            fill="black"
            opacity="0.12"
          />
          <circle cx="50" cy="15" r="2.5" fill="black" opacity="0.3" />
          <circle cx="85" cy="75" r="2.5" fill="black" opacity="0.3" />
          <circle cx="15" cy="75" r="2.5" fill="black" opacity="0.3" />
        </svg>
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, black 0.8px, transparent 0.8px)',
            backgroundSize: '3px 3px',
          }}
        />
      </div>

      {/* Bottom Right - Pulsing square grid */}
      <div
        className="absolute bottom-[30%] right-[12%] w-28 h-28 transition-all duration-300 ease-out"
        style={{
          transform: `translateX(${scrollProgress * -80}px) scale(${1 - scrollProgress * 0.3})`,
          opacity: 0.7 - scrollProgress * 0.3,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Grid of squares */}
          <rect x="10" y="10" width="15" height="15" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.3" />
          <rect x="30" y="10" width="15" height="15" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.25" />
          <rect x="50" y="10" width="15" height="15" fill="#FFD700" opacity="0.15" />
          <rect x="70" y="10" width="15" height="15" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.25" />

          <rect x="10" y="30" width="15" height="15" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.25" />
          <rect x="30" y="30" width="15" height="15" fill="#FFD700" opacity="0.2" />
          <rect x="50" y="30" width="15" height="15" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.3" />
          <rect x="70" y="30" width="15" height="15" fill="#FFD700" opacity="0.15" />

          <rect x="10" y="50" width="15" height="15" fill="#FFD700" opacity="0.15" />
          <rect x="30" y="50" width="15" height="15" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.3" />
          <rect x="50" y="50" width="15" height="15" fill="#FFD700" opacity="0.25" />
          <rect x="70" y="50" width="15" height="15" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.25" />

          <rect x="10" y="70" width="15" height="15" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.25" />
          <rect x="30" y="70" width="15" height="15" fill="#FFD700" opacity="0.15" />
          <rect x="50" y="70" width="15" height="15" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.25" />
          <rect x="70" y="70" width="15" height="15" fill="#FFD700" opacity="0.2" />

          {/* Corner dots */}
          <circle cx="17.5" cy="17.5" r="1.5" fill="#FFD700" opacity="0.4" />
          <circle cx="77.5" cy="17.5" r="1.5" fill="#FFD700" opacity="0.4" />
          <circle cx="17.5" cy="77.5" r="1.5" fill="#FFD700" opacity="0.4" />
          <circle cx="77.5" cy="77.5" r="1.5" fill="#FFD700" opacity="0.4" />
        </svg>
        <div
          className="absolute inset-0 opacity-35 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, black 0.8px, transparent 0.8px)',
            backgroundSize: '3px 3px',
          }}
        />
      </div>

    </div>
  );
});

export default SplashGraphics;
