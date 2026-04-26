'use client';

import { thoughts, SUBSTACK_NAME, SUBSTACK_URL } from '@/data/portfolio';

/**
 * Thoughts & Notions — featured Substack essay on the left, editorial
 * title + date index on the right. Asymmetric so the section breaks the
 * carousel rhythm of Past Work above and Design Videos below.
 */
export default function ThoughtsSection() {
  const [featured, ...rest] = thoughts;

  return (
    <section className="w-full" aria-labelledby="thoughts-heading">
      <div className="flex items-end justify-between mb-8 md:mb-10 gap-6">
        <div>
          <h2
            id="thoughts-heading"
            className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            Thoughts &amp; Notions
          </h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2 max-w-[640px] leading-[1.55]">
            Documenting the <span className="text-gray-500 dark:text-gray-400">{SUBSTACK_NAME}</span>: reflections, inspirations, and the work behind the work.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:gap-8 md:grid-cols-[3fr_2fr]">
        {/* Featured card */}
        <a
          href={featured.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col justify-between rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black p-7 md:p-10 hover:border-black/30 dark:hover:border-white/30 hover:-translate-y-0.5 transition-all duration-200 min-h-[320px] md:min-h-[380px]"
        >
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500">
                Featured · Substack
              </span>
              <span className="font-mono text-[10px] text-gray-300 dark:text-gray-700">·</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500">
                {featured.date}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-[36px] font-semibold tracking-tight text-black dark:text-white leading-[1.15] mb-4 md:mb-5 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
              {featured.title}
            </h3>
            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-prose">
              {featured.excerpt}
            </p>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Read essay
            </span>
            <span
              aria-hidden
              className="text-lg text-gray-300 dark:text-gray-700 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 transition-all"
            >
              →
            </span>
          </div>
        </a>

        {/* Editorial index */}
        <div className="flex flex-col">
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500 mb-4">
            All writing
          </p>
          <ul className="flex flex-col">
            {rest.map((t, i) => (
              <li key={t.id}>
                <a
                  href={t.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-baseline justify-between gap-4 py-4 md:py-5 ${
                    i === 0 ? 'border-t' : ''
                  } border-b border-black/10 dark:border-white/10 hover:opacity-100 transition-opacity`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-base md:text-lg font-medium text-black dark:text-white leading-snug group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors">
                      {t.title}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500 mt-1.5">
                      {t.kind === 'note' ? 'Note' : 'Essay'} · {t.date}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="text-sm text-gray-300 dark:text-gray-700 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 transition-all flex-shrink-0"
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 self-start font-mono text-[11px] uppercase tracking-wider text-gray-500 hover:text-black dark:hover:text-white transition-colors"
          >
            Read on Substack <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
