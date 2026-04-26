'use client';

import { thoughts, SUBSTACK_NAME, SUBSTACK_URL } from '@/data/portfolio';

export default function ThoughtsSection() {
  return (
    <section className="w-full" aria-labelledby="thoughts-heading">
      <div className="flex items-end justify-between mb-6 md:mb-8 gap-6">
        <div>
          <h2
            id="thoughts-heading"
            className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            Thoughts &amp; Notions
          </h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            Substack articles and notes from <span className="text-gray-500 dark:text-gray-400">{SUBSTACK_NAME}</span>.
          </p>
        </div>
        <a
          href={SUBSTACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-500 hover:text-black dark:hover:text-white transition-colors whitespace-nowrap"
        >
          Read on Substack
          <span aria-hidden>↗</span>
        </a>
      </div>

      <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {thoughts.map((t) => (
          <a
            key={t.id}
            href={t.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex flex-col justify-between rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black p-6 md:p-7 hover:border-black/30 dark:hover:border-white/30 hover:-translate-y-0.5 transition-all duration-200 ${
              t.kind === 'note' ? 'sm:col-span-1' : ''
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500">
                  {t.kind === 'post' ? 'Substack · Post' : 'Substack · Note'}
                </span>
                <span className="font-mono text-[10px] text-gray-300 dark:text-gray-700">·</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500">
                  {t.date}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-medium tracking-tight text-black dark:text-white leading-snug mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                {t.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {t.excerpt}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {t.kind === 'post' ? 'Read post' : 'View note'}
              </span>
              <span
                aria-hidden
                className="text-base text-gray-300 dark:text-gray-700 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 transition-all"
              >
                →
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <a
          href={SUBSTACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-500 hover:text-black dark:hover:text-white transition-colors"
        >
          Read on Substack <span aria-hidden>↗</span>
        </a>
      </div>
    </section>
  );
}
