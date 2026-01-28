'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Play, Sparkles, Lightbulb, Image as ImageIcon } from 'lucide-react';
import SectionLink from './components/SectionLink';
import Loading from './components/Loading';
import TechnicalOverlay from './components/TechnicalOverlay';
import CentricCircles from './components/CentricCircles';
import DataLabel from './components/DataLabel';
import SplashGraphics from './components/SplashGraphics';
import TypingText from './components/TypingText';

// 動的インポートでモーダルのバンドルサイズを削減
const WorkModal = dynamic(() => import('./components/WorkModal'), {
  ssr: false,
});

interface ElementProps {
  symbol: string;
  name: string;
  number: string;
  accent?: boolean;
  gifUrl?: string;
  videoUrl?: string;
  thumbnail?: string;
  onClick?: () => void;
}

const Element = React.memo(({ symbol, name, number, accent = false, gifUrl, videoUrl, thumbnail, onClick }: ElementProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isComingSoon = name === 'Coming Soon';

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
      {/* GIF/Thumbnail - Full cell */}
      {(gifUrl || thumbnail) && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          {isHovered && gifUrl ? (
            <img
              src={gifUrl}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-500"
            />
          ) : (
            <img
              src={thumbnail || gifUrl}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover grayscale contrast-125 brightness-110 transition-all duration-500"
            />
          )}
        </div>
      )}

      {/* Halftone Pattern - Strong on normal, hidden on hover */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'} z-[1]`}>
        <div className="halftone-newspaper" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Coming Soon Label */}
      {isComingSoon && (
        <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-widest opacity-30">
              NO DATA
            </p>
            <p className="font-mono text-[10px] uppercase tracking-wider opacity-20 mt-1">
              PENDING...
            </p>
          </div>
        </div>
      )}

      {/* Content - Number only */}
      <div className="relative z-10 h-full p-3 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className={`text-xs font-mono font-semibold tracking-tight transition-all duration-300 ${isHovered ? 'translate-x-1 -translate-y-1' : ''}`}>
            {number}
          </span>
          {videoUrl && (
            <div className={`transition-all duration-300 ${isHovered ? 'scale-110 rotate-12' : 'opacity-40'}`}>
              <Play size={14} fill="currentColor" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

Element.displayName = 'Element';

export default function Home() {
  const [selectedWork, setSelectedWork] = useState<ElementProps | null>(null);
  const [everydaysFiles, setEverydaysFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch everydays files from API
  useEffect(() => {
    fetch('/api/everydays')
      .then(res => res.json())
      .then(data => {
        setEverydaysFiles(data.files || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching everydays:', error);
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

  // Generate periodic table layout dynamically (15 columns)
  const generatePeriodicLayout = useCallback(() => {
    const layout: (ElementProps | null)[][] = [];
    let fileIndex = 0;

    // Define valid cell positions for each row (15 columns total)
    const rowConfigs = [
      [0, 14], // Row 1: columns 1 and 15
      [0, 1, 9, 10, 11, 12, 13, 14], // Row 2: columns 1-2 and 10-15
      [0, 1, 9, 10, 11, 12, 13, 14], // Row 3: columns 1-2 and 10-15
      Array.from({ length: 15 }, (_, i) => i), // Row 4: all 15 columns
      Array.from({ length: 15 }, (_, i) => i), // Row 5: all 15 columns
      Array.from({ length: 15 }, (_, i) => i), // Row 6: all 15 columns
      Array.from({ length: 15 }, (_, i) => i), // Row 7: all 15 columns
    ];

    rowConfigs.forEach((validCols, rowIndex) => {
      const row: (ElementProps | null)[] = Array(15).fill(null);

      validCols.forEach(colIndex => {
        const file = everydaysFiles[fileIndex];
        const isComingSoon = !file;
        const imagePath = file ? `/everydays/${file}` : '/ComingSoon.gif';

        row[colIndex] = {
          symbol: isComingSoon ? '?' : String(fileIndex + 1).padStart(2, '0'),
          name: isComingSoon ? 'Coming Soon' : `Day ${fileIndex + 1}`,
          number: String(fileIndex + 1).padStart(3, '0'),
          accent: fileIndex % 5 === 0, // Every 5th item has accent
          thumbnail: imagePath,
          gifUrl: imagePath,
        };

        fileIndex++;
      });

      layout.push(row);
    });

    return layout;
  }, [everydaysFiles]);

  const periodicLayout = useMemo(() => generatePeriodicLayout(), [generatePeriodicLayout]);


  return (
    <>
      <Loading />
      <div className="border-frame bg-white relative">
        <TechnicalOverlay showGrid={true} showCorners={true} />
        <CentricCircles />
        <SplashGraphics intensity="medium" />
      <main className="min-h-screen p-6 md:p-12 lg:p-16">
        {/* Header */}
        <header className="mb-12 md:mb-16 pb-6 border-b-4 border-black relative">
          {/* Decorative corner mark */}
          <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-black opacity-20" />
          <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-black opacity-20" />

          {/* Newspaper-style halftone overlay - animated */}
          <div className="absolute inset-0 pointer-events-none opacity-10" style={{ animation: 'halftone-breathe 12s ease-in-out infinite' }}>
            <div className="halftone-newspaper w-full h-full" />
          </div>

          {/* Top metadata */}
          <div className="flex justify-between items-start mb-6">
            <DataLabel label="ID" value="TS-2026" />
            <DataLabel label="ROLE" value="MOTION DESIGNER" className="hidden md:block" />
          </div>

          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 mb-3 relative">
            <h1 className="font-grotesk font-bold text-4xl md:text-6xl tracking-tighter uppercase relative">
              <TypingText text="TAKUTO SANADA" typingSpeed={120} />
              <div className="absolute inset-0 opacity-12 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle, black 2px, transparent 2px)',
                backgroundSize: '5px 5px',
                mixBlendMode: 'multiply',
                animation: 'subtle-shift 30s ease-in-out infinite'
              }} />
            </h1>
            <p className="font-mono text-xs md:text-sm uppercase tracking-wider opacity-60">
              Tokyo, Japan
            </p>
          </div>
          <p className="font-grotesk text-sm md:text-base font-semibold relative max-w-2xl">
            Motion Graphics Designer based in Tokyo.
          </p>
        </header>

        {/* Elemotion Section - Main Grid */}
        <section className="mb-16 md:mb-24 relative">
          {/* Newspaper-style halftone background - animated */}
          <div className="absolute inset-0 pointer-events-none opacity-8" style={{ animation: 'halftone-breathe 15s ease-in-out infinite' }}>
            <div className="halftone-newspaper w-full h-full" />
          </div>

          {/* Decorative Labels */}
          <div className="absolute -top-8 left-0 flex gap-6">
            <DataLabel label="SECTION" value="01" />
            <DataLabel label="WORKS" value={String(everydaysFiles.length)} />
            <DataLabel label="GRID" value="7×15" />
          </div>

          <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 relative">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-black flex items-center justify-center rotate-45 relative overflow-hidden">
              <div className="text-[#FFD700] -rotate-45 relative z-10">
                <Sparkles size={20} />
              </div>
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '3px 3px',
                animation: 'subtle-shift 22s ease-in-out infinite'
              }} />
            </div>
            <div className="flex items-baseline gap-2 md:gap-3">
              <span className="font-mono text-sm md:text-base font-semibold opacity-60 relative">
                01
                <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                  backgroundSize: '2px 2px',
                  animation: 'subtle-shift 20s ease-in-out infinite'
                }} />
              </span>
              <h2 className="font-grotesk font-bold text-3xl md:text-5xl uppercase relative">
                EVERYDAYS<span className="text-xl md:text-3xl ml-1">（ELEMOTION）</span>
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle, black 1.5px, transparent 1.5px)',
                  backgroundSize: '4px 4px',
                  mixBlendMode: 'multiply',
                  animation: 'subtle-shift 25s ease-in-out infinite'
                }} />
              </h2>
            </div>
          </div>
          <div className="relative overflow-x-auto">
            {/* Grid corner marks */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-l border-t border-black opacity-40 z-10" />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-r border-t border-black opacity-40 z-10" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l border-b border-black opacity-40 z-10" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r border-b border-black opacity-40 z-10" />

            <div
              className="grid gap-2 md:gap-3"
              style={{
                gridTemplateColumns: 'repeat(15, minmax(60px, 1fr))',
                minWidth: '900px',
                contain: 'layout style'
              }}
            >
              {periodicLayout.map((row, rowIndex) => (
                row.map((element, colIndex) => (
                  element ? (
                    <Element
                      key={`${rowIndex}-${colIndex}`}
                      {...element}
                      onClick={() => setSelectedWork(element)}
                    />
                  ) : (
                    <div key={`${rowIndex}-${colIndex}`} className="aspect-square" />
                  )
                ))
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t-2 border-black relative">
            <div className="absolute top-0 left-0 right-0 h-2 opacity-30" style={{
              backgroundImage: 'repeating-linear-gradient(90deg, black 0, black 4px, transparent 4px, transparent 8px)',
              backgroundSize: '8px 2px'
            }} />
            <div className="flex justify-between items-center">
              <p className="text-xs font-mono opacity-60 uppercase">
                * Hover to see motion interactions
              </p>
              <div className="flex gap-4">
                <DataLabel label="ROW" value="7" className="hidden md:block" />
                <DataLabel label="COL" value="15" className="hidden md:block" />
                <DataLabel label="STATUS" value="ACTIVE" />
              </div>
            </div>
          </div>
        </section>

        {/* Other Sections */}
        <section className="mb-20 md:mb-32 space-y-6 relative">
          {/* Decorative newspaper-style bands - animated */}
          <div className="absolute -left-8 top-[20%] w-24 h-2 bg-black opacity-5 rotate-12" style={{ animation: 'fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards, float-droplet 10s ease-in-out infinite' }}>
            <div className="halftone-newspaper w-full h-full" />
          </div>
          <div className="absolute -right-8 top-[60%] w-32 h-2 bg-black opacity-5 -rotate-12" style={{ animation: 'fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards, float-droplet 12s ease-in-out 2s infinite' }}>
            <div className="halftone-newspaper w-full h-full" />
          </div>
          <SectionLink
            href="/reel"
            number="02"
            title="REEL"
            description="Featured client works"
            count={6}
            icon={<Play size={24} fill="#FFD700" />}
            accent={true}
          />

          <SectionLink
            href="/toy"
            number="03"
            title="TOY"
            description="Experimental projects and creative explorations"
            count={8}
            icon={<Lightbulb size={24} />}
          />

          <SectionLink
            href="/image"
            number="04"
            title="IMAGE"
            description="Static visual work — posters, illustrations, and design"
            count={12}
            icon={<ImageIcon size={24} />}
          />
        </section>

        {/* Footer */}
        <footer className="border-t-4 border-black pt-8 relative">
          {/* Newspaper-style halftone overlay - animated */}
          <div className="absolute inset-0 pointer-events-none opacity-10" style={{ animation: 'halftone-breathe 14s ease-in-out infinite' }}>
            <div className="halftone-newspaper w-full h-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-grotesk font-bold text-xl mb-2 uppercase relative">
                CONTACT
                <div className="absolute inset-0 opacity-8 pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                  backgroundSize: '3px 3px',
                  animation: 'subtle-shift 24s ease-in-out infinite'
                }} />
              </h3>
              <p className="font-mono text-sm opacity-60">hello@takutosanada.com</p>
            </div>
            <div>
              <h3 className="font-grotesk font-bold text-xl mb-2 uppercase relative">
                LOCATION
                <div className="absolute inset-0 opacity-8 pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                  backgroundSize: '3px 3px',
                  animation: 'subtle-shift 26s ease-in-out infinite'
                }} />
              </h3>
              <p className="font-mono text-sm opacity-60">Tokyo, Japan</p>
            </div>
            <div>
              <h3 className="font-grotesk font-bold text-xl mb-2 uppercase relative">
                STATUS
                <div className="absolute inset-0 opacity-8 pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                  backgroundSize: '3px 3px',
                  animation: 'subtle-shift 28s ease-in-out infinite'
                }} />
              </h3>
              <p className="font-mono text-sm opacity-60">Available for projects</p>
            </div>
          </div>
          <div className="text-center relative">
            <p className="font-mono text-xs opacity-40 uppercase">
              © 2026 Takuto Sanada — All Rights Reserved
            </p>
          </div>
        </footer>
      </main>
      </div>

      {/* Modal for enlarged work */}
      {selectedWork && (
        <WorkModal
          work={selectedWork}
          onClose={() => setSelectedWork(null)}
        />
      )}
    </>
  );
}
