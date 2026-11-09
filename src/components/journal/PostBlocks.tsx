import type { ReactNode } from 'react';
import { findPick, formatPrice, type Pick } from '@/data/picks';

/**
 * Building blocks for journal posts. Available in every .mdx file without
 * importing (registered in src/mdx-components.tsx).
 */

/** A full-width photo with an optional caption. */
export function Look({ src, alt = '', caption }: { src: string; alt?: string; caption?: ReactNode }) {
  return (
    <figure className="my-10 md:my-14 -mx-4 sm:mx-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full h-auto bg-gray-100 dark:bg-gray-900" loading="lazy" />
      {caption && (
        <figcaption className="mt-3 px-4 sm:px-0 font-mono text-[11px] uppercase tracking-[0.06em] text-gray-400 dark:text-gray-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Two or three photos side by side. Pass image URLs. */
export function Row({ images, caption }: { images: string[]; caption?: ReactNode }) {
  return (
    <figure className="my-10 md:my-14">
      <div className="grid gap-2 md:gap-3" style={{ gridTemplateColumns: `repeat(${images.length}, minmax(0, 1fr))` }}>
        {images.map((src) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt="" className="w-full h-full object-cover bg-gray-100 dark:bg-gray-900" loading="lazy" />
        ))}
      </div>
      {caption && (
        <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.06em] text-gray-400 dark:text-gray-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function PickTile({ pick }: { pick: Pick }) {
  return (
    <a href={pick.href} target="_blank" rel="noopener noreferrer" className="group block">
      <div className="aspect-square p-3 md:p-4 outline-2 -outline-offset-2 outline-transparent group-hover:outline-black dark:group-hover:outline-white transition-[outline-color] duration-150">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pick.image}
          alt={`${pick.brand} ${pick.name}`}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <div className="mt-2 flex items-baseline justify-between gap-2">
        <span className="text-[13px] text-black dark:text-white truncate">{pick.brand}</span>
        <span className="font-mono text-[12px] tabular-nums text-black dark:text-white">{formatPrice(pick.price)}</span>
      </div>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 truncate">{pick.name}</p>
    </a>
  );
}

/** A strip of picks by id, e.g. <Picks ids={["ald-shearling-bomber"]} />. */
export function Picks({ ids, title }: { ids: string[]; title?: string }) {
  const picks = ids.map(findPick).filter((p): p is Pick => Boolean(p));
  if (!picks.length) return null;
  return (
    <aside className="my-10 md:my-14">
      {title && (
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500">{title}</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-6">
        {picks.map((p) => (
          <PickTile key={p.id} pick={p} />
        ))}
      </div>
    </aside>
  );
}
