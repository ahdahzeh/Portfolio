'use client';

import Image from 'next/image';
import { nowPlayingTracks } from '@/data/portfolio';

export default function NowPlaying() {
  return (
    <section className="w-full mt-16 md:mt-24">
      <h2 className="text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] font-normal tracking-[-0.02em] text-black dark:text-white mb-6">
        Now Playing
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {nowPlayingTracks.map((track) => (
          <div key={track.id} className="group block">
            <a href={track.url} target="_blank" rel="noopener noreferrer" className="block">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 mb-3">
                <Image
                  src={track.albumArt}
                  alt={`${track.title} by ${track.artist}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="font-medium text-black dark:text-white truncate">{track.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{track.artist}</p>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
