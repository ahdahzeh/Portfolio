import fs from 'node:fs';
import path from 'node:path';
import type { WorkItem } from '@/data/portfolio';

/** The site-wide Open Graph image, used when a work item has no image of its own. */
export const DEFAULT_OG_IMAGE = '/og-image.png';

function inPublic(src: string) {
  return fs.existsSync(path.join(process.cwd(), 'public', decodeURIComponent(src)));
}

/**
 * Best real image for a work item: ogImage, then image, then the cover
 * video's poster, then the desktop cover. Paths missing from public/ are
 * skipped, so a link preview never points at a 404.
 */
export function workImage(item: WorkItem): string | undefined {
  const poster = item.coverVideo
    ?.replace('/videos/', '/images/')
    .replace(/\.mp4$/, '-poster.jpg');
  return [item.ogImage, item.image, poster, item.coverImages?.desktop].find(
    (src): src is string => !!src && inPublic(src)
  );
}
