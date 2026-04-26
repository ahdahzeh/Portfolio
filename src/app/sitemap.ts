import type { MetadataRoute } from 'next';
import { workHistory } from '@/data/portfolio';

const SITE_URL = 'https://ahdahzeh.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const homepage: MetadataRoute.Sitemap[number] = {
    url: SITE_URL,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1,
  };

  const workRoutes = workHistory
    .filter((w) => !w.archived && !w.wip)
    .map((w) => ({
      url: `${SITE_URL}/work/${w.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  return [homepage, ...workRoutes];
}
