'use client';

import { blogPosts } from '@/data/portfolio';

export default function ThoughtsSection() {
  return (
    <section className="w-full" aria-labelledby="thoughts-heading">
      <h2
        id="thoughts-heading"
        className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2"
      >
        Thoughts and Notions
      </h2>
      <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">Substack</p>
      <div className="flex flex-col">
        {blogPosts.map((post) => (
          <a
            key={post.id}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row sm:items-baseline py-3 sm:py-4 border-b border-gray-200 dark:border-gray-800 hover:opacity-60 transition-opacity"
          >
            <span className="text-lg font-medium text-black dark:text-white sm:flex-1">
              {post.title}
            </span>
            {post.excerpt && (
              <span className="text-base font-normal text-gray-500 dark:text-gray-400 sm:flex-1 hidden sm:block">
                {post.excerpt}
              </span>
            )}
            <span className="text-sm font-normal text-gray-400 dark:text-gray-500 sm:text-right sm:ml-6 flex-shrink-0">
              {post.date}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
