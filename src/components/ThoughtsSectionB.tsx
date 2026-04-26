'use client';

import { thoughts, SUBSTACK_NAME, SUBSTACK_URL } from '@/data/portfolio';

/**
 * Option B — Single full-width hero card.
 * One huge card spans the full section width. Title at editorial scale.
 * Date + venue on one side, excerpt on the other. Below: a tight horizontal
 * strip of secondary titles only.
 */
export default function ThoughtsSectionB() {
  const [featured, ...rest] = thoughts;

  return (
    <section className="w-full" aria-labelledby="thoughts-b-heading">
      <div className="flex items-end justify-between mb-8 md:mb-10 gap-6">
        <div>
          <h2
            id="thoughts-b-heading"
            className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            Thoughts &amp; Notions
          </h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            Substack writing from <span className="text-gray-500 dark:text-gray-400">{SUBSTACK_NAME}</span>.
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

      {/* Hero card */}
      <a
        href={featured.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-black p-8 md:p-12 lg:p-16 hover:border-black/30 dark:hover:border-white/30 hover:-translate-y-0.5 transition-all duration-200"
      >
        <div className="grid gap-8 md:gap-10 md:grid-cols-[1fr_2fr] items-start">
          <div className="md:sticky md:top-0 md:pt-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500 mb-2">
              Featured essay
            </p>
            <p className="font-mono text-xs text-gray-500 dark:text-gray-400">
              {featured.date}
            </p>
            <p className="font-mono text-xs text-gray-500 dark:text-gray-400 mt-1">
              Substack · {SUBSTACK_NAME}
            </p>
          </div>
          <div>
            <h3 className="text-[40px] md:text-[56px] lg:text-[68px] font-semibold tracking-[-0.04em] text-black dark:text-white leading-[1.02] mb-6 md:mb-8 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
              {featured.title}
            </h3>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-[1.65] max-w-[60ch] mb-8 md:mb-10">
              {featured.excerpt}
            </p>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-black dark:text-white group-hover:gap-3 transition-all">
              Read essay <span aria-hidden>→</span>
            </span>
          </div>
        </div>
      </a>

      {/* Recent strip */}
      {rest.length > 0 && (
        <div className="mt-10 md:mt-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500 mb-4">
            Recent
          </p>
          <ul className="grid gap-0 sm:grid-cols-2 border-t border-black/10 dark:border-white/10">
            {rest.map((t) => (
              <li key={t.id} className="border-b border-black/10 dark:border-white/10 sm:border-r last:border-r-0">
                <a
                  href={t.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4 px-4 sm:px-6 py-5 hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-medium text-black dark:text-white leading-snug group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                      {t.title}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500 mt-1.5">
                      {t.kind === 'note' ? 'Note' : 'Essay'} · {t.date}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="text-sm text-gray-300 dark:text-gray-700 group-hover:text-black dark:group-hover:text-white flex-shrink-0"
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
