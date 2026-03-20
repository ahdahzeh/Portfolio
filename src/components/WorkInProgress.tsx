'use client';

import BackToHomeButton from '@/components/BackToHomeButton';
import Link from 'next/link';
import ScrollProgressBar from '@/components/ScrollProgressBar';

interface WorkInProgressProps {
  title: string;
  nextProject?: { slug: string; label: string };
  /** Optional link to Figma prototype or design (e.g. for "View prototype" button) */
  prototypeLink?: string;
}

export default function WorkInProgress({ title, nextProject, prototypeLink }: WorkInProgressProps) {
  return (
    <article className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
      <ScrollProgressBar />
      <BackToHomeButton className="mb-8" />
      <div className="flex flex-col items-center justify-center text-center min-h-[50vh] gap-8">
        <div
          className="text-8xl md:text-9xl animate-sad-bounce"
          role="img"
          aria-label="Sad face"
        >
          😢
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-normal text-black dark:text-white tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Currently working on this. Come back later to view.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {prototypeLink && (
            <a
              href={prototypeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-[#0060d9] bg-white hover:bg-gray-100 text-[#0060d9] font-medium transition-colors dark:bg-black dark:border-[#0060d9] dark:text-[#0060d9] dark:hover:bg-gray-900"
            >
              View Figma prototype
              <span aria-hidden>→</span>
            </a>
          )}
          {nextProject ? (
            <Link
              href={`/work/${nextProject.slug}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#006eff] hover:bg-[#0060d9] text-white font-medium transition-colors"
            >
              See {nextProject.label}
              <span aria-hidden>→</span>
            </Link>
          ) : (
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#006eff] hover:bg-[#0060d9] text-white font-medium transition-colors"
            >
              See other projects
              <span aria-hidden>→</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
