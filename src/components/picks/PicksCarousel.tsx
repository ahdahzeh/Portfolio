'use client';

import { useCallback, useEffect, useRef } from 'react';
import type { PickWeek } from '@/data/picks';

/**
 * Current Favs as a carousel of product flats, after tubavalon.com: no
 * tiles or backgrounds, just the product. Each arrow click glides exactly
 * one product (620ms ease-out-quad, measured off her gallery reel) and the
 * row loops. Touch scrolling still works on phones.
 */

const DURATION = 620;
const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);

export default function PicksCarousel({ week }: { week: PickWeek }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  // Three copies so the row can loop: we live in the middle copy and jump
  // by one copy's width whenever we drift into the outer ones.
  const looped = [...week.picks, ...week.picks, ...week.picks];
  const n = week.picks.length;

  const metrics = useCallback(() => {
    const row = rowRef.current!;
    const items = row.children as HTMLCollectionOf<HTMLElement>;
    const step = items[1].offsetLeft - items[0].offsetLeft;
    return { row, step, setWidth: step * n, start: items[n].offsetLeft - items[0].offsetLeft };
  }, [n]);

  const recenter = useCallback(() => {
    const { row, setWidth, start } = metrics();
    if (row.scrollLeft < start - setWidth / 2) row.scrollLeft += setWidth;
    else if (row.scrollLeft > start + setWidth / 2) row.scrollLeft -= setWidth;
  }, [metrics]);

  useEffect(() => {
    const { row, start } = metrics();
    row.scrollLeft = start;
    const onScrollEnd = () => !busy.current && recenter();
    row.addEventListener('scrollend', onScrollEnd);
    return () => row.removeEventListener('scrollend', onScrollEnd);
  }, [metrics, recenter]);

  const page = (dir: 1 | -1) => {
    if (busy.current || !rowRef.current) return;
    const { row, step } = metrics();
    const from = row.scrollLeft;
    const to = Math.round((from + dir * step) / step) * step;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      row.scrollLeft = to;
      recenter();
      return;
    }

    busy.current = true;
    row.style.scrollSnapType = 'none';
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / DURATION);
      row.scrollLeft = from + (to - from) * easeOutQuad(t);
      if (t < 1) return requestAnimationFrame(tick);
      recenter();
      row.style.scrollSnapType = '';
      busy.current = false;
    };
    requestAnimationFrame(tick);
  };

  const arrow =
    'hidden md:flex absolute top-[calc(50%-1.5rem)] -translate-y-1/2 h-12 w-12 items-center justify-center text-2xl text-black dark:text-white opacity-70 hover:opacity-100 transition-opacity';

  return (
    <section aria-labelledby="picks-carousel-heading" className="w-full">
      <div className="mb-8 md:mb-10">
        <h2 id="picks-carousel-heading" className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Current Favs
        </h2>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2 max-w-[640px] leading-[1.55]">
          What I&apos;m wearing, wanting, and sending to friends.
        </p>
      </div>

      <div className="relative -mx-4 sm:mx-0 md:px-12">
        <div ref={rowRef} className="flex gap-2 md:gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 sm:px-0 scroll-px-4 sm:scroll-px-0">
          {looped.map((p, i) => {
            const copy = Math.floor(i / n);
            return (
              <a
                key={`${p.id}-${copy}`}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden={copy !== 1 || undefined}
                tabIndex={copy !== 1 ? -1 : undefined}
                className="group snap-start shrink-0 w-[58vw] sm:w-[36vw] md:w-[calc((100%-3*1rem)/4)]"
              >
                <div className="aspect-square p-5 md:p-7">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={copy === 1 ? `${p.brand} ${p.name}` : ''}
                    className="w-full h-full object-contain transition-opacity duration-300 ease-out group-hover:opacity-50 group-focus-visible:opacity-50"
                    loading="lazy"
                  />
                </div>
                <div className="mt-3 text-center md:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 ease-out">
                  <p className="text-[13px] uppercase tracking-[0.04em] text-black dark:text-white truncate">{p.brand}</p>
                  <p className="text-[12px] text-gray-500 dark:text-gray-400 truncate">{p.name}</p>
                </div>
              </a>
            );
          })}
        </div>

        <button type="button" onClick={() => page(-1)} aria-label="Previous" className={`${arrow} left-0`}>
          ←
        </button>
        <button type="button" onClick={() => page(1)} aria-label="Next" className={`${arrow} right-0`}>
          →
        </button>
      </div>
    </section>
  );
}
