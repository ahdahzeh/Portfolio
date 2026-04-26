'use client';

import { thoughts, SUBSTACK_NAME, SUBSTACK_URL } from '@/data/portfolio';

/**
 * Option C — Pull-quote cards.
 * 3-up grid, but the body of each card is the most quotable line from the
 * piece (large, in serifed-feel via Geist's narrower weights and italics if
 * available). Title becomes a small caption beneath. No platform badge.
 */
export default function ThoughtsSectionC() {
  return (
    <section className="w-full" aria-labelledby="thoughts-c-heading">
      <div className="flex items-end justify-between mb-8 md:mb-10 gap-6">
        <div>
          <h2
            id="thoughts-c-heading"
            className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            Thoughts &amp; Notions
          </h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            Lines from <span className="text-gray-500 dark:text-gray-400">{SUBSTACK_NAME}</span>. Click through for the full piece.
          </p>
        </div>
        <a
          href={SUBSTACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-gray-500 hover:text-black dark:hover:text-white transition-colors whitespace-nowrap"
        >
          Read on Substack <span aria-hidden>↗</span>
        </a>
      </div>

      <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {thoughts.map((t, i) => (
          <a
            key={t.id}
            href={t.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black p-7 md:p-8 hover:border-black/30 dark:hover:border-white/30 hover:-translate-y-0.5 transition-all duration-200 min-h-[320px]"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gray-300 dark:text-gray-700 mb-6">
                {String(i + 1).padStart(2, '0')}
              </p>
              <p
                className="text-xl md:text-[22px] leading-[1.35] tracking-[-0.01em] text-black dark:text-white font-medium"
                style={{ textWrap: 'balance' as 'balance' }}
              >
                <span className="text-gray-300 dark:text-gray-700 mr-1">“</span>
                {t.excerpt.replace(/^["“]|["”]$/g, '')}
                <span className="text-gray-300 dark:text-gray-700 ml-1">”</span>
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10">
              <p className="text-sm font-medium text-black dark:text-white leading-snug">
                {t.title}
              </p>
              <div className="flex items-center justify-between mt-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500">
                  {t.kind === 'note' ? 'Note' : 'Essay'} · {t.date}
                </p>
                <span
                  aria-hidden
                  className="text-sm text-gray-300 dark:text-gray-700 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 transition-all"
                >
                  →
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
