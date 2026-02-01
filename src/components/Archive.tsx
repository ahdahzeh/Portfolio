'use client';

import { archiveProjects } from '@/data/portfolio';

export default function Archive() {
  return (
    <section className="w-full mt-12 sm:mt-16 md:mt-24">
      <div className="w-full">
        <h2 className="text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] font-normal tracking-[-0.02em] text-black dark:text-white mb-6">
          Archive
        </h2>
        <div className="flex flex-col">
          {archiveProjects.map((project) => (
            <div key={project.id}>
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col sm:flex-row sm:items-baseline py-3 sm:py-4 border-b border-gray-200 dark:border-gray-800 hover:opacity-60 transition-opacity"
                >
                  <span className="text-lg font-medium text-black dark:text-white sm:w-[200px] md:w-[280px] flex-shrink-0">
                    {project.name}
                  </span>
                  <span className="text-base font-normal text-gray-500 dark:text-gray-400 sm:flex-1">
                    {project.role}
                  </span>
                  <span className="text-sm font-normal text-gray-400 dark:text-gray-500 sm:text-right">
                    {project.year}
                  </span>
                </a>
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
      </div>
    </section>
  );
}
