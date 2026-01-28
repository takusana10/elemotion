'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, X } from 'lucide-react';
import Loading from '../components/Loading';
import TechnicalOverlay from '../components/TechnicalOverlay';
import DataLabel from '../components/DataLabel';
import SplashGraphics from '../components/SplashGraphics';

interface WorkProps {
  symbol: string;
  name: string;
  number: string;
  videoUrl: string;
  thumbnail: string;
  accent?: boolean;
  onClick: () => void;
}

const Work = React.memo(({ symbol, name, number, videoUrl, thumbnail, accent = false, onClick }: WorkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

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
        ${isHovered ? 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] scale-[0.98]' : 'shadow-none'}
      `}
    >
      {/* Thumbnail */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={thumbnail}
          alt={name}
          className="w-full h-full object-cover grayscale contrast-125 brightness-110 transition-all duration-500"
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
          <div className={`transition-all duration-300 ${isHovered ? 'scale-110 rotate-12' : 'opacity-40'}`}>
            <Play size={14} fill="currentColor" />
          </div>
        </div>

        <div>
          <p className={`text-xs font-mono font-semibold uppercase tracking-tight transition-all duration-300 ${isHovered ? 'translate-y-1' : ''}`}>
            {name}
          </p>
        </div>
      </div>
    </div>
  );
});

Work.displayName = 'Work';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

const VideoModal = React.memo(({ isOpen, onClose, videoUrl, title }: VideoModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(255,215,0,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 md:p-6 border-b-4 border-black bg-[#FFD700] relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, black 1.5px, transparent 1.5px)',
            backgroundSize: '4px 4px'
          }} />
          <h3 className="font-grotesk font-bold text-2xl md:text-3xl uppercase relative z-10">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/10 transition-all hover:rotate-90 duration-300 relative z-10"
            aria-label="Close modal"
          >
            <X size={28} strokeWidth={3} />
          </button>
        </div>

        <div className="relative aspect-video bg-black">
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full h-full"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
});

VideoModal.displayName = 'VideoModal';

export default function ReelPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);

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
      symbol: 'R1',
      name: 'Brand Identity',
      number: '01',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
      accent: true,
    },
    {
      symbol: 'R2',
      name: 'Product Demo',
      number: '02',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
    },
    {
      symbol: 'R3',
      name: 'UI Animation',
      number: '03',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
    },
    {
      symbol: 'R4',
      name: 'Explainer',
      number: '04',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
      accent: true,
    },
    {
      symbol: 'R5',
      name: 'Short Film',
      number: '05',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg',
    },
    {
      symbol: 'R6',
      name: 'Music Video',
      number: '06',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      thumbnail: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg',
    },
  ];

  return (
    <div className="border-frame bg-white">
      <TechnicalOverlay showGrid={true} showCorners={true} />
      <SplashGraphics intensity="low" />
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
            <DataLabel label="SECTION" value="02" />
            <DataLabel label="TYPE" value="VIDEO" />
            <DataLabel label="WORKS" value="06" />
          </div>

          <div className="flex items-center gap-3 md:gap-4 mb-3 relative">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FFD700] border-3 border-black flex items-center justify-center relative overflow-hidden">
              <Play size={20} fill="black" className="relative z-10" />
              <div className="absolute inset-0 opacity-25" style={{
                backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                backgroundSize: '3px 3px'
              }} />
            </div>
            <div className="flex items-baseline gap-2 md:gap-3">
              <span className="font-mono text-sm md:text-base font-semibold opacity-60 relative">
                02
                <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                  backgroundSize: '2px 2px'
                }} />
              </span>
              <h1 className="font-grotesk font-bold text-4xl md:text-6xl uppercase relative">
                REEL
                <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle, black 2px, transparent 2px)',
                  backgroundSize: '4px 4px',
                  mixBlendMode: 'multiply'
                }} />
              </h1>
            </div>
          </div>
          <p className="font-grotesk text-sm md:text-base font-semibold relative max-w-2xl">
            Featured motion graphics work — from branding to UI animations
          </p>
        </header>

        {/* Works Grid */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {works.map((work, index) => (
              <Work
                key={index}
                {...work}
                onClick={() => setSelectedVideo({ url: work.videoUrl, title: work.name })}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
        />
      )}
    </div>
  );
}
