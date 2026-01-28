'use client';

import React from 'react';

const CentricCircles = React.memo(function CentricCircles() {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 pointer-events-none w-full"
      style={{
        top: '10%',
        height: '800px'
      }}
    >
      {/* Radial lines from center - always visible with subtle breathing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
        {/* Diagonal cross with smooth pulse */}
        <div
          className="absolute top-1/2 left-1/2 w-[1px] h-[70%] bg-black origin-center"
          style={{
            opacity: 0.005,
            transform: 'translate(-50%, -50%) rotate(45deg)',
            animation: 'diagonal-pulse-1 10s ease-in-out infinite'
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[1px] h-[70%] bg-black origin-center"
          style={{
            opacity: 0.005,
            transform: 'translate(-50%, -50%) rotate(-45deg)',
            animation: 'diagonal-pulse-2 12s ease-in-out infinite'
          }}
        />
      </div>

      {/* Concentric circles with orbiting satellites - always visible */}
      {/* Inner circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
        <div
          className="w-full h-full border border-black rounded-full"
          style={{
            opacity: 0.006,
            animation: 'circle-breathe 8s ease-in-out infinite'
          }}
        />
        {/* Orbiting satellite 1 - smooth motion with glow */}
        <div
          className="absolute inset-0"
          style={{ animation: 'orbit-smooth 20s cubic-bezier(0.45, 0, 0.55, 1) infinite' }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#FFD700] rounded-full"
            style={{ animation: 'satellite-glow 4s ease-in-out infinite' }}
          />
        </div>
      </div>

      {/* Middle circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64">
        <div
          className="w-full h-full border border-black rounded-full"
          style={{
            opacity: 0.005,
            animation: 'circle-ripple 10s ease-in-out infinite'
          }}
        />
        {/* Orbiting satellite 2 - slower with offset */}
        <div
          className="absolute inset-0"
          style={{ animation: 'orbit-smooth 25s cubic-bezier(0.45, 0, 0.55, 1) infinite', animationDelay: '5s' }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full"
            style={{
              opacity: 0.15,
              animation: 'pulse-dot 5s ease-in-out infinite 1s'
            }}
          />
        </div>
      </div>

      {/* Outer circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96">
        <div
          className="w-full h-full border border-black rounded-full"
          style={{
            opacity: 0.004,
            animation: 'circle-breathe 12s ease-in-out infinite'
          }}
        />
        {/* Orbiting satellite 3 - fast motion with glow */}
        <div
          className="absolute inset-0"
          style={{ animation: 'orbit-smooth 15s cubic-bezier(0.45, 0, 0.55, 1) infinite', animationDelay: '2s' }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#FFD700] rounded-full"
            style={{ animation: 'satellite-glow 3.5s ease-in-out infinite 0.5s' }}
          />
        </div>
      </div>

      {/* Center intersection - dynamic pulsing dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-fade-in animation-delay-600">
        <div className="relative w-4 h-4">
          <div className="absolute inset-0 border-2 border-black opacity-50" style={{ animation: 'center-pulse 6s ease-in-out infinite' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#FFD700] rounded-full" style={{ animation: 'center-pulse 6s ease-in-out infinite' }} />
          {/* Outer ring pulse */}
          <div className="absolute inset-0 border border-[#FFD700] rounded-full" style={{ animation: 'center-pulse 6s ease-in-out infinite 0.3s', opacity: 0.3 }} />
        </div>
      </div>

      {/* Quarter intersections - smooth animated squares */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 animate-fade-in animation-delay-600">
        <div className="w-2.5 h-2.5 border-2 border-black" style={{ animation: 'blink-smooth 8s ease-in-out infinite' }} />
      </div>
      <div className="absolute top-1/4 left-3/4 -translate-x-1/2 -translate-y-1/2 animate-fade-in animation-delay-600">
        <div className="w-2.5 h-2.5 border-2 border-black" style={{ animation: 'blink-smooth 8.5s ease-in-out infinite 2s' }} />
      </div>
      <div className="absolute top-3/4 left-1/4 -translate-x-1/2 -translate-y-1/2 animate-fade-in animation-delay-600">
        <div className="w-2.5 h-2.5 border-2 border-black" style={{ animation: 'blink-smooth 9s ease-in-out infinite 4s' }} />
      </div>
      <div className="absolute top-3/4 left-3/4 -translate-x-1/2 -translate-y-1/2 animate-fade-in animation-delay-600">
        <div className="w-2.5 h-2.5 border-2 border-black" style={{ animation: 'blink-smooth 8.8s ease-in-out infinite 3s' }} />
      </div>
    </div>
  );
});

export default CentricCircles;
