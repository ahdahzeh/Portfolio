'use client';

import { useState } from 'react';
import { formatPrice, type PickWeek } from '@/data/picks';

const MAX = 6;

/**
 * Current Favs as an editorial index, matching the Thoughts & Notions list:
 * up to six numbered rows on the left, the hovered product flat on the
 * right, sized to the height of the rows. On phones the rows carry a small
 * flat instead.
 */
export default function PicksIndex({ week }: { week: PickWeek }) {
  const picks = week.picks.slice(0, MAX);
  const [active, setActive] = useState(0);
  const current = picks[active];

  return (
    <section aria-labelledby="picks-index-heading" className="w-full">
      <div className="mb-5 md:mb-6">
        <h2 id="picks-index-heading" className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Current Favs
        </h2>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2 max-w-[640px] leading-[1.55]">
          What I&apos;m wearing, wanting, and sending to friends.
        </p>
      </div>

      <div className="grid gap-6 md:gap-10 md:grid-cols-[3fr_2fr]">
        <ol className="min-w-0 flex flex-col border-t border-black/10 dark:border-white/10">
          {picks.map((p, i) => (
            <li key={p.id} className="border-b border-black/10 dark:border-white/10">
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group flex items-center gap-4 py-2 md:py-2.5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt="" className="md:hidden w-12 h-12 object-contain shrink-0" loading="lazy" />
                <span className="hidden md:block font-mono text-[11px] tabular-nums text-gray-300 dark:text-gray-600 w-6">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 min-w-0">
                  <span
                    className={`block text-base md:text-lg leading-snug truncate transition-colors text-black dark:text-white ${
                      i === active ? '' : 'md:text-gray-400 md:dark:text-gray-500'
                    }`}
                  >
                    {p.brand}
                  </span>
                  <span className="block text-[13px] leading-snug text-gray-400 dark:text-gray-500 truncate">{p.name}</span>
                </span>
                <span className="font-mono text-[13px] tabular-nums text-black dark:text-white">{formatPrice(p.price)}</span>
              </a>
            </li>
          ))}
        </ol>

        {/* The flat is absolutely positioned so the rows, not the image, set the height. */}
        <a href={current.href} target="_blank" rel="noopener noreferrer" className="hidden md:flex flex-col group" tabIndex={-1} aria-hidden>
          <div className="relative flex-1 min-h-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={current.id}
              src={current.image}
              alt=""
              className="absolute inset-0 w-full h-full p-2 object-contain animate-[fadeIn_200ms_ease-out]"
            />
          </div>
          <p className="mt-2 text-center font-mono text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors">
            Shop at {current.store} →
          </p>
        </a>
      </div>
    </section>
  );
}
