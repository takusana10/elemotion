'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface WorkModalProps {
  work: {
    number: string;
    name: string;
    gifUrl?: string;
    thumbnail?: string;
  };
  onClose: () => void;
}

const WorkModal = React.memo(({ work, onClose }: WorkModalProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black bg-opacity-80 animate-fade-in"
      onClick={onClose}
      style={{ willChange: 'opacity' }}
    >
      <div
        className="work-modal-container relative max-w-4xl w-full aspect-square bg-white border-4 border-black overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'splash-fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          willChange: 'transform, opacity'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black hover:bg-[#FFD700] transition-colors duration-300 flex items-center justify-center group"
        >
          <X size={24} className="text-white group-hover:text-black" />
        </button>

        {/* Work number */}
        <div className="absolute top-4 left-4 z-10 font-mono text-lg font-semibold bg-white px-3 py-1 border-2 border-black">
          {work.number}
        </div>

        {/* GIF */}
        <div className="absolute inset-0 work-modal-image-container">
          <img
            src={work.gifUrl || work.thumbnail}
            alt={work.name}
            className="w-full h-full object-cover"
            loading={isMobile ? "eager" : "lazy"}
            decoding={isMobile ? "async" : "auto"}
          />
        </div>

        {/* Subtle halftone overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="halftone-pattern w-full h-full" />
        </div>
      </div>
    </div>
  );
});

WorkModal.displayName = 'WorkModal';

export default WorkModal;
