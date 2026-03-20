'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import LightboxTrigger from '@/components/LightboxTrigger';

export interface FeaturedVideoItem {
  src: string;
  alt: string;
  title?: string;
}

interface FeaturedVideosCarouselProps {
  title?: string;
  caption?: string;
  items: FeaturedVideoItem[];
}

export default function FeaturedVideosCarousel({
  title = 'Featured Videos',
  caption = 'Curated video content hub',
  items,
}: FeaturedVideosCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = items.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % total);
    }, 4000);
    return () => clearInterval(timer);
  }, [total]);

  const goTo = (i: number) => setActiveIndex((i + total) % total);

  if (total === 0) return null;

  return (
    <div className="mb-12">
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white text-center mb-6">
        {title}
      </h2>

      {/* Carousel: 3 cards visible, center prominent */}
      <div ref={containerRef} className="relative overflow-hidden">
        <div className="flex items-center justify-center gap-3 md:gap-6 px-4 min-h-[516px]">
          {[-1, 0, 1].map((delta) => {
            const i = (activeIndex + delta + total) % total;
            const item = items[i];
            const isCenter = delta === 0;
            const scale = isCenter ? 1 : 0.82;
            const opacity = isCenter ? 1 : 0.75;
            const zIndex = isCenter ? 10 : 1;

            return (
              <LightboxTrigger key={i} images={items.map((x) => ({ src: x.src, alt: x.alt }))} initialIndex={i}>
                <div
                  className="flex-shrink-0 cursor-zoom-in transition-all duration-300 ease-out rounded-xl overflow-hidden shadow-lg hover:shadow-xl"
                  style={{
                    transform: `scale(${scale})`,
                    opacity,
                    zIndex,
                    width: isCenter ? 300 : 240,
                    height: 516,
                  }}
                  onClick={() => goTo(i)}
                >
                  <div className="relative w-full h-[465px] bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 220px, 280px"
                    />
                    {/* Expand icon */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </LightboxTrigger>
            );
          })}
        </div>
      </div>

      {/* Controls: play, prev, next, mute */}
      <div className="flex justify-center mt-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-gray-900 dark:bg-gray-800 px-4 py-2.5 shadow-md">
          <button
            type="button"
            aria-label="Play"
            className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Previous"
            onClick={() => goTo(activeIndex - 1)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => goTo(activeIndex + 1)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Mute"
            className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === activeIndex ? 'bg-gray-700 dark:bg-gray-400' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Caption bar */}
      <div className="mt-4 rounded-lg bg-gray-100 dark:bg-gray-800/50 px-4 py-3 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong className="text-gray-900 dark:text-white">{title}</strong> — {caption}
        </p>
      </div>
    </div>
  );
}
