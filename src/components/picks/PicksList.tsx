'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { PickWeek } from '@/data/picks';

const MAX = 5;

/**
 * Current Favs as a list, after the "Mentioned In" section on perlera.co:
 * one line per pick, brand then item in gray, an arrow that nudges on hover.
 * With `preview="cursor"` the hovered product flat floats beside the cursor
 * (pointer devices only).
 */
export default function PicksList({ week, preview = 'none' }: { week: PickWeek; preview?: 'none' | 'cursor' }) {
  const picks = week.picks.slice(0, MAX);
  const [active, setActive] = useState<number | null>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  // The preview is portalled to <body>: RevealOnScroll leaves a transform on
  // the section, which would make a fixed child position against it.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const follow = (e: React.MouseEvent) => {
    const el = floatRef.current;
    if (el) el.style.transform = `translate3d(${e.clientX + 24}px, ${e.clientY - 90}px, 0)`;
  };

  return (
    <section aria-labelledby="picks-list-heading" className="w-full">
      <div className="mb-4 md:mb-5">
        <h2 id="picks-list-heading" className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Current Favs
        </h2>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2 max-w-[640px] leading-[1.55]">
          What I&apos;m wearing, wanting, and sending to friends.
        </p>
      </div>

      <ul className="flex flex-col" onMouseMove={preview === 'cursor' ? follow : undefined} onMouseLeave={() => setActive(null)}>
        {picks.map((p, i) => (
          <li key={p.id} className="border-b border-black/10 dark:border-white/10">
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActive(i)}
              className="group flex items-center justify-between gap-4 py-2.5 -mx-2 px-2 rounded hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors"
            >
              <span className="flex items-baseline gap-2 min-w-0 flex-1">
                <span className="text-base font-medium text-black dark:text-white whitespace-nowrap">{p.brand}</span>
                <span className="text-base text-black/50 dark:text-white/50 truncate">{p.name}</span>
              </span>
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 shrink-0 text-black/30 dark:text-white/30 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </a>
          </li>
        ))}
      </ul>

      {preview === 'cursor' && mounted && createPortal(
        <div
          ref={floatRef}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block w-[180px] h-[180px] will-change-transform"
        >
          {picks.map((p, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={p.id}
              src={p.image}
              alt=""
              className={`absolute inset-0 w-full h-full object-contain transition-[opacity,scale] duration-200 ease-out ${
                active === i ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            />
          ))}
        </div>,
        document.body,
      )}
    </section>
  );
}
