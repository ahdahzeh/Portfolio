'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { workHistory } from '@/data/portfolio';

function WorkCardImage({ item, priority = false }: { item: (typeof workHistory)[0]; priority?: boolean }) {
  const images = item.caseStudy?.images ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % images.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [images.length]);

  const coverImages = item.coverImages;

  if (coverImages) {
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/5 dark:bg-white/5 p-2">
        <div className="absolute left-[5%] top-[8%] w-[70%] aspect-video rounded-t-md border border-black/10 dark:border-white/10 bg-white dark:bg-gray-900 overflow-hidden shadow-sm z-10">
          <div className="absolute inset-0 pt-5">
            <Image
              src={coverImages.desktop}
              alt={`${item.company} desktop`}
              fill
              sizes="280px"
              className="object-cover object-top"
              priority={priority}
            />
          </div>
        </div>
        <div className="absolute right-[5%] bottom-[5%] w-[34%] h-[70%] rounded-[12px] border-2 border-black/15 dark:border-white/15 bg-white dark:bg-gray-900 overflow-hidden shadow-lg z-20">
          <div className="absolute inset-0 pt-4 overflow-hidden">
            <Image
              src={coverImages.mobile}
              alt={`${item.company} mobile`}
              fill
              sizes="120px"
              className="object-cover object-top"
              priority={priority}
            />
          </div>
        </div>
      </div>
    );
  }

  if (item.image) {
    return (
      <Image
        src={item.image}
        alt={item.company}
        width={300}
        height={300}
        sizes="(max-width: 640px) 260px, 300px"
        className={`w-full h-full ${item.coverStyle ? 'object-contain' : 'object-cover'} transition-transform duration-300 group-hover:scale-105`}
        priority={priority}
      />
    );
  }

  if (images.length > 0) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-white dark:bg-gray-900">
        {images.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-300"
            style={{ opacity: i === currentIndex ? 1 : 0, pointerEvents: i === currentIndex ? 'auto' : 'none' }}
            aria-hidden={i !== currentIndex}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="300px"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
      style={{ backgroundColor: item.color || '#6366f1' }}
    >
      <span className="text-white/80 text-3xl font-medium">{item.company.charAt(0)}</span>
    </div>
  );
}

export default function WorkCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const visibleItems = workHistory.filter((w) => !w.archived);
  const duplicatedItems = [...visibleItems, ...visibleItems];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let rafId: number;
    const tick = () => {
      if (!isPaused && el) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll > 0) {
          el.scrollLeft += 0.4;
          if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPaused]);

  return (
    <section className="w-full mt-12 md:mt-20 overflow-hidden">
      <h2 className="text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] font-normal tracking-[-0.02em] text-black dark:text-white mb-6 px-4 max-w-[1200px] mx-auto">
        Past Work
      </h2>
      <div
        ref={scrollRef}
        tabIndex={0}
        role="region"
        aria-label="Past work carousel — use arrow keys to navigate"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onKeyDown={(e) => {
          const el = scrollRef.current;
          if (!el) return;
          const step = 320;
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            el.scrollBy({ left: -step, behavior: 'smooth' });
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            el.scrollBy({ left: step, behavior: 'smooth' });
          }
        }}
        className="flex flex-nowrap gap-1 items-start overflow-x-scroll overflow-y-hidden scrollbar-hide py-4 pl-4 sm:pl-6 md:pl-[max(16px,calc((100vw-1200px)/2+16px))] pr-4 sm:pr-6 select-none cursor-grab active:cursor-grabbing touch-pan-x focus:outline-none focus-visible:ring-2 focus-visible:ring-[#006eff] focus-visible:ring-offset-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className="flex-shrink-0">
            <Link
              href={`/work/${item.slug}`}
              className="group flex flex-col gap-2 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors min-w-[200px] text-black dark:text-white"
            >
              <div
                className={`w-[260px] h-[260px] md:w-[300px] md:h-[300px] rounded-lg overflow-hidden ${
                  item.coverImages ? 'rounded-none bg-black/5 dark:bg-white/5' : item.coverStyle ? 'rounded-none bg-white dark:bg-gray-900' : ''
                }`}
              >
                <WorkCardImage item={item} priority={index < 3} />
              </div>
              <span className="font-medium">{item.company}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{item.role}</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
