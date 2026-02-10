'use client';

import { useState } from 'react';
import Lightbox, { type LightboxImage } from '@/components/Lightbox';

interface LightboxTriggerProps {
  images: LightboxImage[];
  initialIndex?: number;
  children: React.ReactNode;
  className?: string;
}

export default function LightboxTrigger({
  images,
  initialIndex = 0,
  children,
  className = '',
}: LightboxTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (images.length === 0) return <>{children}</>;

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          setCurrentIndex(initialIndex);
          setIsOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setCurrentIndex(initialIndex);
            setIsOpen(true);
          }
        }}
        className={`cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-[#006eff] focus:ring-offset-2 rounded-lg ${className}`}
        aria-label="View image in lightbox"
      >
        {children}
      </div>
      <Lightbox
        images={images}
        currentIndex={currentIndex}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onNavigate={images.length > 1 ? setCurrentIndex : undefined}
      />
    </>
  );
}
