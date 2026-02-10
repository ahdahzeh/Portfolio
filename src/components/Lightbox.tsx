'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (index: number) => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const total = images.length;
  const hasMultiple = total > 1;
  const current = images[currentIndex];

  const goPrev = useCallback(() => {
    if (!hasMultiple || !onNavigate) return;
    onNavigate((currentIndex - 1 + total) % total);
  }, [hasMultiple, onNavigate, currentIndex, total]);

  const goNext = useCallback(() => {
    if (!hasMultiple || !onNavigate) return;
    onNavigate((currentIndex + 1) % total);
  }, [hasMultiple, onNavigate, currentIndex, total]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, goPrev, goNext]);

  if (!isOpen) return null;

  const overlay = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
        aria-label="Close lightbox"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {hasMultiple && currentIndex > 0 && (
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Previous image"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {hasMultiple && currentIndex < total - 1 && (
        <button
          type="button"
          onClick={goNext}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Next image"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <div className="relative max-w-[95vw] w-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full h-[70vh] min-h-[200px] max-h-[calc(90vh-80px)]">
          {current && (
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-contain"
              sizes="95vw"
              unoptimized={current.src.startsWith('http')}
            />
          )}
        </div>
        {current?.caption && (
          <p className="mt-4 text-sm text-white/80 text-center max-w-2xl">
            {current.caption}
          </p>
        )}
        {hasMultiple && (
          <p className="mt-2 text-xs text-white/60">
            {currentIndex + 1} / {total}
          </p>
        )}
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(overlay, document.body) : null;
}
