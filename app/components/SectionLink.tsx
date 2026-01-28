'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import DataLabel from './DataLabel';

interface SectionLinkProps {
  href: string;
  number: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  accent?: boolean;
}

export default function SectionLink({ href, number, title, description, icon, accent = false }: SectionLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        block border-4 border-black p-6 md:p-8
        transition-all duration-500 ease-out
        relative overflow-hidden
        ${isHovered ? 'bg-[#FFD700]' : 'bg-white'}
        ${isHovered ? 'shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] scale-[0.99]' : 'shadow-none'}
      `}
    >
      {/* Halftone Pattern - animated */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-50' : 'opacity-100'}`} style={{ animation: 'halftone-breathe 10s ease-in-out infinite' }}>
        <div className="halftone-newspaper" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Corner marks */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-black opacity-30" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-black opacity-30" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-black opacity-30" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-black opacity-30" />

      <div className="relative z-10">
        {/* Metadata */}
        <div className="flex gap-4 mb-2">
          <DataLabel label="SECTION" value={number} />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-base md:text-lg font-semibold opacity-60 relative">
              {number}
              <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                backgroundSize: '2px 2px',
                animation: 'subtle-shift 18s ease-in-out infinite'
              }} />
            </span>
            <h2 className="font-grotesk font-bold text-3xl md:text-5xl uppercase relative">
              {title}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle, black 1.5px, transparent 1.5px)',
                backgroundSize: '4px 4px',
                mixBlendMode: 'multiply',
                animation: 'subtle-shift 20s ease-in-out infinite'
              }} />
            </h2>
          </div>
          {icon && (
            <div className="w-10 h-10 md:w-12 md:h-12 bg-black flex items-center justify-center relative overflow-hidden">
              <div className="relative z-10 text-[#FFD700]">
                {icon}
              </div>
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '3px 3px',
                animation: 'subtle-shift 20s ease-in-out infinite'
              }} />
            </div>
          )}
        </div>

        {/* Description */}
        <p className="font-grotesk text-sm md:text-base mb-4 opacity-80">
          {description}
        </p>

        {/* Arrow */}
        <div className="flex items-center justify-end">
          <div className={`transition-all duration-300 ${isHovered ? 'translate-x-2 -translate-y-2' : ''}`}>
            <ArrowUpRight size={24} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </Link>
  );
}
