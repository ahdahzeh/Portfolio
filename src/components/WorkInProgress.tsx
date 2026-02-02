'use client';

import Link from 'next/link';
import ScrollProgressBar from '@/components/ScrollProgressBar';

interface WorkInProgressProps {
  title: string;
  nextProject?: { slug: string; label: string };
}

export default function WorkInProgress({ title, nextProject }: WorkInProgressProps) {
  return (
    <article className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
      <ScrollProgressBar />
      <Link
        href="/"
        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm mb-8 inline-block"
      >
        ← Back
      </Link>
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
    </article>
  );
}
