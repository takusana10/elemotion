'use client';

import { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  typingSpeed?: number;
  className?: string;
}

export default function TypingText({ text, typingSpeed = 100, className = '' }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, typingSpeed]);

  return (
    <span className={className}>
      {displayedText}
      <span className="typing-cursor">|</span>
    </span>
  );
}
