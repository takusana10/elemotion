'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Loading from '../components/Loading';
import TechnicalOverlay from '../components/TechnicalOverlay';
import CentricCircles from '../components/CentricCircles';
import DataLabel from '../components/DataLabel';
import SplashGraphics from '../components/SplashGraphics';

interface WorkProps {
  name: string;
  number: string;
  imageUrl: string;
  accent?: boolean;
}

const Work = ({ name, number, imageUrl, accent = false }: WorkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        col-span-1 row-span-1 aspect-square
        relative border-2 border-black overflow-hidden
        transition-all duration-500 ease-out
        cursor-pointer group
        ${accent ? 'bg-[#FFD700]' : 'bg-white'}
        ${isHovered ? 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] scale-[0.98]' : 'shadow-none'}
      `}
    >
      {/* Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={imageUrl}
          alt=""
          className={`w-full h-full object-cover transition-all duration-500 ${
            isHovered ? '' : 'grayscale contrast-125 brightness-110'
          }`}
        />
      </div>

      {/* Halftone Pattern */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-30 z-[1]' : 'z-[1]'}`}>
        <div className={isHovered ? 'halftone-pattern' : 'halftone-newspaper'} style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full p-3 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className={`text-xs font-mono font-semibold tracking-tight transition-all duration-300 ${isHovered ? 'translate-x-1 -translate-y-1' : ''}`}>
            {number}
          </span>
        </div>

        <div>
          <p className={`text-xs font-mono font-semibold uppercase tracking-tight transition-all duration-300 ${isHovered ? 'translate-y-1' : ''}`}>
            {name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function ImagePage() {
  const works = [
    {
      name: 'Poster Series',
      number: '01',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop',
      accent: true,
    },
    {
      name: 'Typography',
      number: '02',
      imageUrl: 'https://images.unsplash.com/photo-1516655855035-d5215bcb5604?w=400&h=400&fit=crop',
    },
    {
      name: 'Brand Identity',
      number: '03',
      imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=400&fit=crop',
    },
    {
      name: 'Album Cover',
      number: '04',
      imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
      accent: true,
    },
    {
      name: 'Editorial',
      number: '05',
      imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop',
    },
    {
      name: 'Illustration',
      number: '06',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
    },
    {
      name: 'Packaging',
      number: '07',
      imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop',
      accent: true,
    },
    {
      name: 'Book Cover',
      number: '08',
      imageUrl: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=400&h=400&fit=crop',
    },
    {
      name: 'Art Direction',
      number: '09',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop',
    },
    {
      name: 'Visual System',
      number: '10',
      imageUrl: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=400&h=400&fit=crop',
      accent: true,
    },
    {
      name: 'Print Design',
      number: '11',
      imageUrl: 'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=400&h=400&fit=crop',
    },
    {
      name: 'Collage',
      number: '12',
      imageUrl: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?w=400&h=400&fit=crop',
    },
  ];

  return (
    <>
      <Loading />
      <div className="border-frame bg-white relative">
        <TechnicalOverlay showGrid={true} showCorners={true} />
        <CentricCircles />
        <SplashGraphics intensity="medium" />
      <main className="min-h-screen p-6 md:p-12 lg:p-16">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 font-mono text-sm uppercase hover:translate-x-[-4px] transition-transform duration-300"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <header className="mb-12 md:mb-16 pb-6 border-b-4 border-black relative">
          {/* Newspaper-style halftone overlay - animated */}
          <div className="absolute inset-0 pointer-events-none opacity-10" style={{ animation: 'halftone-breathe 12s ease-in-out infinite' }}>
            <div className="halftone-newspaper w-full h-full" />
          </div>

          {/* Decorative Labels */}
          <div className="flex gap-6 mb-6">
            <DataLabel label="SECTION" value="04" />
            <DataLabel label="TYPE" value="STATIC" />
            <DataLabel label="WORKS" value="12" />
          </div>

          <div className="flex items-center gap-3 md:gap-4 mb-3 relative">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-black flex items-center justify-center relative overflow-hidden">
              <ImageIcon size={20} className="text-[#FFD700] relative z-10" />
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '3px 3px',
                animation: 'subtle-shift 22s ease-in-out infinite'
              }} />
            </div>
            <div className="flex items-baseline gap-2 md:gap-3">
              <span className="font-mono text-sm md:text-base font-semibold opacity-60 relative">
                04
                <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                  backgroundSize: '2px 2px',
                  animation: 'subtle-shift 20s ease-in-out infinite'
                }} />
              </span>
              <h1 className="font-grotesk font-bold text-4xl md:text-6xl uppercase relative">
                IMAGE
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle, black 1.5px, transparent 1.5px)',
                  backgroundSize: '4px 4px',
                  mixBlendMode: 'multiply',
                  animation: 'subtle-shift 25s ease-in-out infinite'
                }} />
              </h1>
            </div>
          </div>
          <p className="font-grotesk text-sm md:text-base font-semibold relative max-w-2xl">
            Static visual work — posters, illustrations, and design
          </p>
        </header>

        {/* Works Grid */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {works.map((work, index) => (
              <Work key={index} {...work} />
            ))}
          </div>
        </section>
      </main>
      </div>
    </>
  );
}
