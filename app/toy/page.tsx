'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, X, Lightbulb } from 'lucide-react';
import Loading from '../components/Loading';
import TechnicalOverlay from '../components/TechnicalOverlay';
import DataLabel from '../components/DataLabel';
import SplashGraphics from '../components/SplashGraphics';

interface WorkProps {
  name: string;
  number: string;
  thumbnail: string;
  gifUrl: string;
  accent?: boolean;
}

const Work = ({ name, number, thumbnail, gifUrl, accent = false }: WorkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [gifKey, setGifKey] = useState(0);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setGifKey(prev => prev + 1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        col-span-1 row-span-1 aspect-square
        relative border-2 border-black overflow-hidden
        transition-all duration-500 ease-out
        cursor-pointer group
        ${accent ? 'bg-[#FFD700]' : 'bg-white'}
        ${isHovered ? 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] scale-[0.98]' : 'shadow-none'}
      `}
    >
      {/* GIF/Thumbnail */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {isHovered && gifUrl ? (
          <img
            key={gifKey}
            src={gifUrl}
            alt=""
            className="w-full h-full object-cover transition-all duration-500"
          />
        ) : (
          <img
            src={thumbnail}
            alt=""
            className="w-full h-full object-cover grayscale contrast-125 brightness-110 transition-all duration-500"
          />
        )}
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

export default function ToyPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const works = [
    {
      name: 'Geometric Play',
      number: '01',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop',
      gifUrl: 'https://media.giphy.com/media/l0HlNQ03J5JxX6lva/giphy.gif',
      accent: true,
    },
    {
      name: 'Type Experiment',
      number: '02',
      thumbnail: 'https://images.unsplash.com/photo-1516655855035-d5215bcb5604?w=400&h=400&fit=crop',
      gifUrl: 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif',
    },
    {
      name: 'Color Study',
      number: '03',
      thumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=400&fit=crop',
      gifUrl: 'https://media.giphy.com/media/3oKIPic2BnoVZkRla8/giphy.gif',
    },
    {
      name: 'Pattern Loop',
      number: '04',
      thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
      gifUrl: 'https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif',
      accent: true,
    },
    {
      name: 'Shape Morph',
      number: '05',
      thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop',
      gifUrl: 'https://media.giphy.com/media/l0HlTy9x8FZo0XO1i/giphy.gif',
    },
    {
      name: 'Grid Dance',
      number: '06',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
      gifUrl: 'https://media.giphy.com/media/3o7TKSjRrfIPjeiVyg/giphy.gif',
    },
    {
      name: 'Flow State',
      number: '07',
      thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop',
      gifUrl: 'https://media.giphy.com/media/3oKIPyTbhqKJNdWUmI/giphy.gif',
      accent: true,
    },
    {
      name: 'Noise Field',
      number: '08',
      thumbnail: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=400&h=400&fit=crop',
      gifUrl: 'https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif',
    },
  ];

  return (
    <div className="border-frame bg-white">
      <TechnicalOverlay showGrid={true} showCorners={true} />
      <SplashGraphics intensity="high" />
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
          {/* Decorative Labels */}
          <div className="flex gap-6 mb-6">
            <DataLabel label="SECTION" value="03" />
            <DataLabel label="TYPE" value="EXPERIMENTAL" />
            <DataLabel label="WORKS" value="08" />
          </div>

          <div className="flex items-center gap-3 md:gap-4 mb-3 relative">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-black flex items-center justify-center relative overflow-hidden">
              <Lightbulb size={20} className="text-[#FFD700] relative z-10" />
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '3px 3px'
              }} />
            </div>
            <div className="flex items-baseline gap-2 md:gap-3">
              <span className="font-mono text-sm md:text-base font-semibold opacity-60 relative">
                03
                <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                  backgroundSize: '2px 2px'
                }} />
              </span>
              <h1 className="font-grotesk font-bold text-4xl md:text-6xl uppercase relative">
                TOY
                <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle, black 2px, transparent 2px)',
                  backgroundSize: '4px 4px',
                  mixBlendMode: 'multiply'
                }} />
              </h1>
            </div>
          </div>
          <p className="font-grotesk text-sm md:text-base font-semibold relative max-w-2xl">
            Experimental projects and creative explorations
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
  );
}
