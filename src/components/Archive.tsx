'use client';

import Link from 'next/link';
import { useState } from 'react';
import { archiveProjects } from '@/data/portfolio';

const VISIBLE_COUNT = 12;

const linkClassName = "group flex flex-col sm:flex-row sm:items-baseline py-3 sm:py-4 border-b border-gray-200 dark:border-gray-800 transition-all duration-200";

export default function Archive() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? archiveProjects : archiveProjects.slice(0, VISIBLE_COUNT);

  return (
    <section className="w-full">
      <div className="w-full">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
          Archive
        </h2>
        <div className="flex flex-col">
          {visible.map((project) => (
            <div key={project.id}>
              {project.link ? (
                project.link.startsWith('/') ? (
                  <Link href={project.link} className={linkClassName}>
                    <span className="text-lg font-medium text-black dark:text-white sm:w-[200px] md:w-[280px] flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1">
                      {project.name}
                    </span>
                    <span className="text-base font-normal text-gray-500 dark:text-gray-400 sm:flex-1">
                      {project.role}
                    </span>
                    <span className="text-sm font-normal text-gray-400 dark:text-gray-500 sm:text-right transition-opacity duration-200 group-hover:opacity-100 opacity-60">
                      {project.year}
                    </span>
                  </Link>
                ) : (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClassName}
                  >
                    <span className="text-lg font-medium text-black dark:text-white sm:w-[200px] md:w-[280px] flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1">
                      {project.name}
                    </span>
                    <span className="text-base font-normal text-gray-500 dark:text-gray-400 sm:flex-1">
                      {project.role}
                    </span>
                    <span className="text-sm font-normal text-gray-400 dark:text-gray-500 sm:text-right transition-opacity duration-200 group-hover:opacity-100 opacity-60">
                      {project.year}
                    </span>
                  </a>
                )
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-baseline py-3 sm:py-4 border-b border-gray-200 dark:border-gray-800">
                  <span className="text-lg font-medium text-black dark:text-white sm:w-[200px] md:w-[280px] flex-shrink-0">
                    {project.name}
                  </span>
                  <span className="text-base font-normal text-gray-500 dark:text-gray-400 sm:flex-1">
                    {project.role}
                  </span>
                  <span className="text-sm font-normal text-gray-400 dark:text-gray-500 sm:text-right">
                    {project.year}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        {archiveProjects.length > VISIBLE_COUNT && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            {expanded ? 'View less' : `View ${archiveProjects.length - VISIBLE_COUNT} more`}
          </button>
        )}
      </div>
    </section>
  );
}
