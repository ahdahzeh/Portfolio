'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { workHistory } from '@/data/portfolio';

function PonderingPoseCard() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', top: '31.72%', right: '12.35%', bottom: '5.16%', left: '23.07%' }}>
        <img src="/images/work/morton-salt/girl/ponder-body.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', left: '8.1%', top: '4.25%', width: '74.76%', height: '43.31%' }}>
        <div style={{ position: 'absolute', inset: 0, transform: 'scaleX(-1)' }}>
          <div style={{ position: 'absolute', top: '3.55%', right: '30.29%', bottom: '54.12%', left: '31.4%' }}>
            <div style={{ width: '100%', height: '100%', transform: 'scaleX(-1)' }}>
              <img src="/images/work/morton-salt/girl/ponder-head.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
            </div>
          </div>
          <div style={{ position: 'absolute', top: '34.44%', right: '24.02%', bottom: '12.89%', left: '24.97%' }}>
            <div style={{ width: '100%', height: '100%', transform: 'scaleX(-1)' }}>
              <img src="/images/work/morton-salt/girl/ponder-arms.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BinocularsPoseCard() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', top: '15.68%', right: '32.41%', bottom: '70.9%', left: '45.94%' }}>
        <img src="/images/work/morton-salt/girl/search-backarm.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', top: '21.44%', right: '12.35%', bottom: '5.16%', left: '23.07%' }}>
        <img src="/images/work/morton-salt/girl/search-body.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', top: '5.8%', right: '42.31%', bottom: '75.94%', left: '29.23%' }}>
        <img src="/images/work/morton-salt/girl/search-head.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', top: '14.49%', right: '28.73%', bottom: '79.78%', left: '46.05%' }}>
        <img src="/images/work/morton-salt/girl/search-binoculars.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', top: '14.31%', right: '44.67%', bottom: '77.51%', left: '49.61%' }}>
        <img src="/images/work/morton-salt/girl/search-hand.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', top: '21.16%', right: '45.89%', bottom: '65.09%', left: '28.56%' }}>
        <img src="/images/work/morton-salt/girl/search-frontarm.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
    </div>
  );
}

function ReadingPoseCard() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', top: '36.01%', right: '-6.05%', bottom: '-23.69%', left: '16.35%' }}>
        <img src="/images/work/morton-salt/girl/reading-body.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', top: '21.85%', right: '13.16%', bottom: '47.83%', left: '13.92%' }}>
        <img src="/images/work/morton-salt/girl/reading-book1.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', top: '23.63%', right: '21.78%', bottom: '49.05%', left: '15.6%' }}>
        <img src="/images/work/morton-salt/girl/reading-book2.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', top: '23.37%', right: '21.34%', bottom: '48.83%', left: '15.29%' }}>
        <img src="/images/work/morton-salt/girl/reading-book3.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', top: '0%', right: '32.15%', bottom: '74.53%', left: '28.06%' }}>
        <img src="/images/work/morton-salt/girl/reading-head.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
    </div>
  );
}

function MortonGirlCardCycler() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(prev => (prev + 1) % 3), 2500);
    return () => clearInterval(id);
  }, []);

  const poses = [
    <PonderingPoseCard key="ponder" />,
    <BinocularsPoseCard key="bino" />,
    <ReadingPoseCard key="reading" />,
  ];

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#0034BA' }}>
      {/* Scale up 1.4× anchored to top-center so we see waist-up only */}
      <div style={{
        position: 'absolute',
        width: 280,
        height: 420,
        left: '50%',
        top: 0,
        transform: 'translateX(-50%) scale(1.4)',
        transformOrigin: 'top center',
      }}>
        {poses.map((pose, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: i === active ? 1 : 0,
              transition: 'opacity 0.7s ease-in-out',
              pointerEvents: i === active ? 'auto' : 'none',
            }}
          >
            {pose}
          </div>
        ))}
      </div>
    </div>
  );
}

function CoverVideo({ src, alt, poster }: { src: string; alt: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#f0f0f0] dark:bg-[#f0f0f0]">
      {poster && (
        <Image
          src={poster}
          alt={alt}
          fill
          sizes="(max-width: 640px) 260px, 300px"
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
      )}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        aria-label={alt}
        className="relative w-full h-full object-cover"
      />
    </div>
  );
}

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

  if (item.slug === 'morton-salt') return <MortonGirlCardCycler />;

  if (item.coverVideo) {
    return <CoverVideo src={item.coverVideo} alt={item.company} poster={item.image} />;
  }

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
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 mb-6">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Past Work
        </h2>
      </div>
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
              className="group flex flex-col gap-2 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:hover:shadow-black/30 min-w-[200px] text-black dark:text-white"
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
