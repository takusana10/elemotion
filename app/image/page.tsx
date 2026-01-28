'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon, X } from 'lucide-react';
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
  onClick?: () => void;
}

const Work = React.memo(({ name, number, imageUrl, accent = false, onClick }: WorkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        col-span-1 row-span-1 aspect-square
        relative border-2 border-black overflow-hidden
        transition-all duration-500 ease-out
        cursor-pointer group
        ${accent ? 'bg-[#FFD700]' : 'bg-white'}
        ${isHovered ? 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] scale-[0.98] z-[100]' : 'shadow-none z-0'}
      `}
      style={{
        contain: 'layout style paint',
        willChange: isHovered ? 'transform, box-shadow, z-index' : 'auto'
      }}
    >
      {/* Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={imageUrl}
          alt=""
          loading="lazy"
          className={`w-full h-full object-cover transition-all duration-500 ${
            isHovered ? '' : 'grayscale contrast-125 brightness-110'
          }`}
        />
      </div>

      {/* Halftone Pattern */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'} z-[1]`}>
        <div className="halftone-newspaper" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Content - Number only */}
      <div className="relative z-10 h-full p-3 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className={`text-xs font-mono font-semibold tracking-tight transition-all duration-300 ${isHovered ? 'translate-x-1 -translate-y-1' : ''}`}>
            {number}
          </span>
        </div>
      </div>
    </div>
  );
});

Work.displayName = 'Work';

export default function ImagePage() {
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWork, setSelectedWork] = useState<WorkProps | null>(null);

  // Fetch image files from API
  useEffect(() => {
    fetch('/api/images')
      .then(res => res.json())
      .then(data => {
        setImageFiles(data.files || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        setLoading(false);
      });
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedWork) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedWork]);

  // Close modal with ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedWork(null);
      }
    };
    if (selectedWork) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [selectedWork]);

  // Generate works data dynamically
  const works = imageFiles.map((file, index) => ({
    name: `Work ${index + 1}`,
    number: String(index + 1).padStart(2, '0'),
    imageUrl: `/image/${file}`,
    accent: (index + 1) % 4 === 0, // Every 4th item has accent
  }));

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
          {/* Decorative Labels */}
          <div className="flex gap-6 mb-6">
            <DataLabel label="SECTION" value="04" />
            <DataLabel label="TYPE" value="STATIC" />
            <DataLabel label="WORKS" value={String(imageFiles.length)} />
          </div>

          <div className="flex items-center gap-3 md:gap-4 mb-3 relative">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-black flex items-center justify-center relative overflow-hidden">
              <ImageIcon size={20} className="text-[#FFD700] relative z-10" />
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '3px 3px'
              }} />
            </div>
            <div className="flex items-baseline gap-2 md:gap-3">
              <span className="font-mono text-sm md:text-base font-semibold opacity-60 relative">
                04
                <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                  backgroundSize: '2px 2px'
                }} />
              </span>
              <h1 className="font-grotesk font-bold text-4xl md:text-6xl uppercase relative">
                IMAGE
                <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle, black 2px, transparent 2px)',
                  backgroundSize: '4px 4px',
                  mixBlendMode: 'multiply'
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
              <Work
                key={index}
                {...work}
                onClick={() => setSelectedWork(work)}
              />
            ))}
          </div>
        </section>
      </main>
      </div>

      {/* Modal for enlarged image */}
      {selectedWork && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black bg-opacity-80 animate-fade-in"
          onClick={() => setSelectedWork(null)}
          style={{ willChange: 'opacity' }}
        >
          <div
            className="relative max-w-4xl w-full aspect-square bg-white border-4 border-black overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'splash-fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              willChange: 'transform, opacity'
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedWork(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black hover:bg-[#FFD700] transition-colors duration-300 flex items-center justify-center group"
            >
              <X size={24} className="text-white group-hover:text-black" />
            </button>

            {/* Work number */}
            <div className="absolute top-4 left-4 z-10 font-mono text-lg font-semibold bg-white px-3 py-1 border-2 border-black">
              {selectedWork.number}
            </div>

            {/* Image */}
            <div className="absolute inset-0">
              <img
                src={selectedWork.imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            {/* Subtle halftone overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div className="halftone-pattern w-full h-full" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
