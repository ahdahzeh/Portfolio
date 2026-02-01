'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

export interface CaseStudyImage {
  src: string;
  alt: string;
  caption?: string;
}

export default function WorkCaseStudyCarousel({ images }: { images: CaseStudyImage[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = images.length;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const scrollLeft = el.scrollLeft;
      const slideWidth = el.clientWidth;
      const index = Math.round(scrollLeft / slideWidth);
      setCurrentIndex(Math.min(index, total - 1));
    };
    el.addEventListener('scroll', onScroll);
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, [total]);

  const goToSlide = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  };

  if (total === 0) return null;

  const img = images[currentIndex];

  return (
    <div className="mt-12 not-prose">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:-mx-0 md:px-0 touch-pan-x"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {images.map((slide, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-full snap-start snap-always"
          >
            <div className="relative rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden bg-gray-50 dark:bg-gray-900/30">
              <div className="relative aspect-video w-full max-h-[70vh] min-h-[280px]">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 1168px"
                  priority={i === 0}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {total > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex
                  ? 'bg-[#006eff] dark:bg-[#006eff]'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to image ${i + 1}`}
              aria-current={i === currentIndex ? 'true' : undefined}
            />
          ))}
        </div>
      )}

      {img?.caption && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
          {currentIndex + 1} / {total} — {img.caption}
        </p>
      )}
    </div>
  );
}
