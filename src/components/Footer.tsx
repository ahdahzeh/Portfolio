'use client';

import { socialLinks, personalInfo } from '@/data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full py-8 px-4 md:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-[1200px] mx-auto px-4">
        <div className="flex items-center gap-6 sm:gap-12 lg:gap-20 flex-wrap justify-center md:justify-start">
          {socialLinks.instagram && (
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-base font-normal text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors">
              Instagram
            </a>
          )}
          {socialLinks.twitter && (
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-base font-normal text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors">
              Twitter
            </a>
          )}
          {socialLinks.tiktok && (
            <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-base font-normal text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors">
              TikTok
            </a>
          )}
        </div>
        <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base font-normal text-gray-600 dark:text-gray-400 flex-col sm:flex-row text-center sm:text-left">
          <span suppressHydrationWarning>© 2019 — {year}</span>
          <span>Built in {personalInfo.location || 'New York, NY'}</span>
        </div>
      </div>
    </footer>
  );
}
