'use client';

import { useEffect } from 'react';
import { tiktokVideos } from '@/data/portfolio';

export default function WritingSection() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="w-full mt-16 md:mt-24">
      <h2 className="text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] font-normal tracking-[-0.02em] text-black dark:text-white mb-2">
        Design Videos
      </h2>
      <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">TikTok design content</p>
      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
        {tiktokVideos.map((video) => (
          <blockquote
            key={video.id}
            className="tiktok-embed flex-shrink-0"
            cite={video.url}
            data-video-id={video.url.split('/').pop()?.split('?')[0] ?? ''}
            style={{ maxWidth: '325px', minWidth: 'min(325px, 85vw)' }}
          >
            <section>
              <a href={video.url} target="_blank" rel="noopener noreferrer">
                {video.title}
              </a>
            </section>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
