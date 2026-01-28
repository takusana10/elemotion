'use client';

import React, { useEffect, useState } from 'react';

interface TechnicalOverlayProps {
  showGrid?: boolean;
  showCorners?: boolean;
  showLabels?: boolean;
}

const TechnicalOverlay = React.memo(function TechnicalOverlay({
  showGrid = true,
  showCorners = true,
  showLabels = true
}: TechnicalOverlayProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [timestamp, setTimestamp] = useState('00:00:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTimestamp(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight - windowHeight;
          const scrolled = window.scrollY;
          const progress = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0;
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

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Corner Marks - Splash-inspired */}
      {showCorners && (
        <>
          {/* Top Left */}
          <div className="absolute top-[24px] left-[24px]">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-16 h-[2px] bg-black animate-slide-right" />
              <div className="absolute top-0 left-0 w-[2px] h-16 bg-black animate-slide-down" />
              <div className="absolute top-0 left-4 w-8 h-[1px] bg-black opacity-40 animate-fade-in animation-delay-200" />
              <div className="absolute top-4 left-0 h-8 w-[1px] bg-black opacity-40 animate-fade-in animation-delay-200" />
              {/* Splash droplets - more prominent with float animation */}
              <div className="absolute -top-1 left-12 w-2 h-2 bg-[#FFD700] rounded-full opacity-0 animate-splash-fade-in animation-delay-300" style={{ animationFillMode: 'forwards', animation: 'splash-fade-in 2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards, float-droplet 3s ease-in-out 2.5s infinite' }} />
              <div className="absolute top-3 left-14 w-1.5 h-1.5 bg-black rounded-full opacity-0 animate-splash-fade-in animation-delay-400" style={{ animationFillMode: 'forwards', animation: 'splash-fade-in 2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards, float-droplet 3.5s ease-in-out 2.6s infinite' }} />
              <div className="absolute top-12 -left-1 w-1.5 h-1.5 bg-black rounded-full opacity-0 animate-splash-fade-in animation-delay-300" style={{ animationFillMode: 'forwards', animation: 'splash-fade-in 2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards, float-droplet 4s ease-in-out 2.5s infinite' }} />
            </div>
          </div>

          {/* Top Right */}
          <div className="absolute top-[24px] right-[24px]">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 right-0 w-16 h-[2px] bg-black animate-slide-left" />
              <div className="absolute top-0 right-0 w-[2px] h-16 bg-black animate-slide-down" />
              <div className="absolute top-0 right-4 w-8 h-[1px] bg-black opacity-40 animate-fade-in animation-delay-200" />
              <div className="absolute top-4 right-0 h-8 w-[1px] bg-black opacity-40 animate-fade-in animation-delay-200" />
              {/* Splash droplets - more prominent with float animation */}
              <div className="absolute -top-1 right-12 w-2 h-2 bg-[#FFD700] rounded-full opacity-0" style={{ animation: 'splash-fade-in 2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards, float-droplet 3.2s ease-in-out 2.5s infinite' }} />
              <div className="absolute top-3 right-14 w-1.5 h-1.5 bg-black rounded-full opacity-0" style={{ animation: 'splash-fade-in 2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards, float-droplet 3.7s ease-in-out 2.6s infinite' }} />
              <div className="absolute top-12 -right-1 w-1.5 h-1.5 bg-black rounded-full opacity-0" style={{ animation: 'splash-fade-in 2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards, float-droplet 4.2s ease-in-out 2.5s infinite' }} />
            </div>
          </div>

          {/* Bottom Left */}
          <div className="absolute bottom-[24px] left-[24px]">
            <div className="relative w-16 h-16">
              <div className="absolute bottom-0 left-0 w-16 h-[2px] bg-black animate-slide-right" />
              <div className="absolute bottom-0 left-0 w-[2px] h-16 bg-black animate-slide-up" />
              <div className="absolute bottom-0 left-4 w-8 h-[1px] bg-black opacity-40 animate-fade-in animation-delay-200" />
              <div className="absolute bottom-4 left-0 h-8 w-[1px] bg-black opacity-40 animate-fade-in animation-delay-200" />
              {/* Splash droplets - more prominent with float animation */}
              <div className="absolute -bottom-1 left-12 w-2 h-2 bg-[#FFD700] rounded-full opacity-0" style={{ animation: 'splash-fade-in 2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards, float-droplet 3.4s ease-in-out 2.5s infinite' }} />
              <div className="absolute bottom-3 left-14 w-1.5 h-1.5 bg-black rounded-full opacity-0" style={{ animation: 'splash-fade-in 2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards, float-droplet 3.8s ease-in-out 2.6s infinite' }} />
              <div className="absolute bottom-12 -left-1 w-1.5 h-1.5 bg-black rounded-full opacity-0" style={{ animation: 'splash-fade-in 2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards, float-droplet 4.1s ease-in-out 2.5s infinite' }} />
            </div>
          </div>

          {/* Bottom Right */}
          <div className="absolute bottom-[24px] right-[24px]">
            <div className="relative w-16 h-16">
              <div className="absolute bottom-0 right-0 w-16 h-[2px] bg-black animate-slide-left" />
              <div className="absolute bottom-0 right-0 w-[2px] h-16 bg-black animate-slide-up" />
              <div className="absolute bottom-0 right-4 w-8 h-[1px] bg-black opacity-40 animate-fade-in animation-delay-200" />
              <div className="absolute bottom-4 right-0 h-8 w-[1px] bg-black opacity-40 animate-fade-in animation-delay-200" />
              {/* Splash droplets - more prominent with float animation */}
              <div className="absolute -bottom-1 right-12 w-2 h-2 bg-[#FFD700] rounded-full opacity-0" style={{ animation: 'splash-fade-in 2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards, float-droplet 3.6s ease-in-out 2.5s infinite' }} />
              <div className="absolute bottom-3 right-14 w-1.5 h-1.5 bg-black rounded-full opacity-0" style={{ animation: 'splash-fade-in 2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards, float-droplet 3.9s ease-in-out 2.6s infinite' }} />
              <div className="absolute bottom-12 -right-1 w-1.5 h-1.5 bg-black rounded-full opacity-0" style={{ animation: 'splash-fade-in 2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards, float-droplet 4.3s ease-in-out 2.5s infinite' }} />
            </div>
          </div>
        </>
      )}

      {/* Grid Lines - Dynamic radial system */}
      {showGrid && (
        <>
          {/* Dynamic grid pattern - scattered with rotation */}
          <div className="absolute top-[20%] left-[15%] w-20 h-20 border-l border-t border-black animate-grid-scatter" style={{ opacity: 0.01, animation: 'grid-scatter 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards, rotate-box 30s linear infinite' }} />
          <div className="absolute top-[35%] right-[20%] w-16 h-16 border-r border-b border-black animate-grid-scatter animation-delay-100" style={{ opacity: 0.008, animation: 'grid-scatter 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards, rotate-box 25s linear infinite reverse' }} />
          <div className="absolute bottom-[25%] left-[25%] w-24 h-24 border border-black animate-grid-scatter animation-delay-200" style={{ opacity: 0.006, animation: 'grid-scatter 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards, rotate-box 35s linear infinite' }} />
          <div className="absolute top-[60%] right-[15%] w-20 h-20 border-t border-r border-black animate-grid-scatter animation-delay-300" style={{ opacity: 0.01, animation: 'grid-scatter 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards, rotate-box 28s linear infinite reverse' }} />

          {/* Flowing lines with breaks - very subtle lines, pulsing dots */}
          <div className="absolute top-[30%] left-0 right-0 flex items-center gap-4 animate-fade-in animation-delay-400">
            <div className="w-1/4 h-[1px] bg-gradient-to-r from-transparent via-black to-transparent" style={{ opacity: 0.01 }} />
            <div className="w-2.5 h-2.5 border-2 border-black opacity-40 rotate-45" style={{ animation: 'scale-pulse 4s ease-in-out infinite' }} />
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-black to-transparent" style={{ opacity: 0.01 }} />
            <div className="w-3 h-3 bg-[#FFD700] opacity-60 rounded-full" style={{ boxShadow: '0 0 8px rgba(255, 215, 0, 0.4)', animation: 'pulse-dot 3s ease-in-out infinite' }} />
            <div className="w-1/4 h-[1px] bg-gradient-to-r from-transparent via-black to-transparent" style={{ opacity: 0.01 }} />
          </div>

          <div className="absolute top-[70%] left-0 right-0 flex items-center gap-4 animate-fade-in animation-delay-500">
            <div className="w-1/3 h-[1px] bg-gradient-to-r from-transparent via-black to-transparent" style={{ opacity: 0.01 }} />
            <div className="w-3 h-3 bg-black opacity-35 rounded-full" style={{ animation: 'pulse-dot 3.5s ease-in-out infinite' }} />
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-black to-transparent" style={{ opacity: 0.01 }} />
            <div className="w-2.5 h-2.5 border-2 border-[#FFD700] opacity-50 rotate-45" style={{ animation: 'scale-pulse 4.5s ease-in-out infinite' }} />
            <div className="w-1/4 h-[1px] bg-gradient-to-r from-transparent via-black to-transparent" style={{ opacity: 0.01 }} />
          </div>
        </>
      )}

      {/* Technical Labels */}
      {showLabels && (
        <>
          {/* Top Left Label */}
          <div className="absolute top-[72px] left-[24px] animate-fade-in-up">
            <div className="flex items-start gap-2">
              <div className="w-1 h-1 bg-black mt-1 opacity-40" style={{ animation: 'blink 4s ease-in-out infinite' }} />
              <div className="font-mono text-[8px] uppercase tracking-widest opacity-40">
                <div className="relative">
                  X: 0.000
                  <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(circle, black 0.5px, transparent 0.5px)',
                    backgroundSize: '2px 2px',
                    animation: 'subtle-shift 15s ease-in-out infinite'
                  }} />
                </div>
                <div className="relative mt-1">
                  Y: {scrollProgress.toFixed(1)}%
                  <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(circle, black 0.5px, transparent 0.5px)',
                    backgroundSize: '2px 2px',
                    animation: 'subtle-shift 16s ease-in-out infinite'
                  }} />
                </div>
              </div>
            </div>
          </div>

          {/* Top Right Label */}
          <div className="absolute top-[72px] right-[24px] animate-fade-in-up animation-delay-100">
            <div className="flex items-start gap-2">
              <div className="font-mono text-[8px] uppercase tracking-widest opacity-40 text-right">
                <div className="relative">
                  {timestamp}
                  <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(circle, black 0.5px, transparent 0.5px)',
                    backgroundSize: '2px 2px',
                    animation: 'subtle-shift 17s ease-in-out infinite'
                  }} />
                </div>
                <div className="relative mt-1">
                  JST +09:00
                  <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(circle, black 0.5px, transparent 0.5px)',
                    backgroundSize: '2px 2px',
                    animation: 'subtle-shift 18s ease-in-out infinite'
                  }} />
                </div>
              </div>
              <div className="w-1 h-1 bg-black mt-1 opacity-40" style={{ animation: 'blink 4.5s ease-in-out infinite 0.5s' }} />
            </div>
          </div>

          {/* Bottom Left Label */}
          <div className="absolute bottom-[72px] left-[24px] animate-fade-in-up animation-delay-200">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-black opacity-40" style={{ animation: 'blink 5s ease-in-out infinite 1s' }} />
              <div className="font-mono text-[8px] uppercase tracking-widest opacity-40">
                <div className="relative flex items-center gap-2">
                  <span>VER.</span>
                  <div className="w-8 h-[1px] bg-black opacity-30" />
                  <span>1.0.0</span>
                  <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(circle, black 0.5px, transparent 0.5px)',
                    backgroundSize: '2px 2px',
                    animation: 'subtle-shift 19s ease-in-out infinite'
                  }} />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Right Progress Bar */}
          <div className="absolute bottom-[72px] right-[24px] w-40 animate-fade-in-up animation-delay-300">
            <div className="flex items-center justify-end gap-2 mb-2">
              <div className="font-mono text-[8px] uppercase tracking-widest opacity-40">
                SCROLL
              </div>
              <div className="w-1 h-1 bg-black opacity-40" />
            </div>
            <div className="relative">
              <div className="h-[2px] bg-black opacity-15 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-[#FFD700] transition-all duration-300 ease-out"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
              {/* Tick marks */}
              <div className="flex justify-between mt-1">
                <div className="w-[1px] h-1 bg-black opacity-20" />
                <div className="w-[1px] h-1 bg-black opacity-20" />
                <div className="w-[1px] h-1 bg-black opacity-20" />
                <div className="w-[1px] h-1 bg-black opacity-20" />
                <div className="w-[1px] h-1 bg-black opacity-20" />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-[24px] font-mono text-[8px] uppercase tracking-widest opacity-20 -rotate-90 origin-left animate-fade-in animation-delay-400">
        3DCG, VFX, Graphic design,
      </div>

      <div className="absolute top-1/2 right-[24px] font-mono text-[8px] uppercase tracking-widest opacity-20 rotate-90 origin-right animate-fade-in animation-delay-500">
        TOKYO, JAPAN
      </div>

      {/* Newspaper-style halftone panels - animated */}
      <div className="absolute top-[12%] left-[5%] w-32 h-24 border-2 border-black opacity-20 animate-fade-in animation-delay-300" style={{ animation: 'fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards, float-droplet 8s ease-in-out infinite' }}>
        <div className="halftone-newspaper w-full h-full" />
      </div>

      <div className="absolute top-[20%] right-[8%] w-40 h-28 border-2 border-black opacity-20 animate-fade-in animation-delay-400" style={{ animation: 'fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards, float-droplet 10s ease-in-out 2s infinite' }}>
        <div className="halftone-newspaper w-full h-full" />
      </div>

      <div className="absolute bottom-[25%] left-[10%] w-36 h-32 border-2 border-black opacity-20 animate-fade-in animation-delay-500" style={{ animation: 'fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards, float-droplet 9s ease-in-out 1s infinite' }}>
        <div className="halftone-newspaper w-full h-full" />
      </div>

      <div className="absolute bottom-[15%] right-[12%] w-28 h-20 border-2 border-black opacity-20 animate-fade-in animation-delay-600" style={{ animation: 'fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards, float-droplet 7s ease-in-out 1.5s infinite' }}>
        <div className="halftone-newspaper w-full h-full" />
      </div>

    </div>
  );
});

export default TechnicalOverlay;
