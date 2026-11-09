import fs from 'node:fs';
import path from 'node:path';
import type { ComponentType } from 'react';

/**
 * Journal posts are MDX files in src/content/journal. Each one exports its
 * own `metadata` object (see PostMeta). Files starting with "_" are ignored,
 * and `draft: true` posts only show up in `next dev`.
 */

const DIR = path.join(process.cwd(), 'src/content/journal');

export interface PostMeta {
  slug: string;
  /** Use "\n" to break the title onto two lines, Tuba-style. */
  title: string;
  /** Second line under the title. Optional. */
  dek?: string;
  /** ISO date, e.g. "2026-11-03". */
  date: string;
  excerpt: string;
  cover?: string;
  coverAlt?: string;
  /** Pick ids from src/data/picks.ts to show as "Shop the post". */
  picks?: string[];
  draft?: boolean;
}

const showDrafts = process.env.NODE_ENV !== 'production';

function slugs() {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export async function getPost(slug: string): Promise<{ Content: ComponentType; meta: PostMeta } | null> {
  if (!slugs().includes(slug)) return null;
  const mod = await import(`@/content/journal/${slug}.mdx`);
  const meta = { ...mod.metadata, slug } as PostMeta;
  if (meta.draft && !showDrafts) return null;
  return { Content: mod.default, meta };
}

export async function getPosts(): Promise<PostMeta[]> {
  const posts = await Promise.all(slugs().map((s) => getPost(s)));
  return posts
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .map((p) => p.meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function formatPostDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
