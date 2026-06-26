import { workHistory, socialLinks, type WorkItem } from '@/data/portfolio';

const SITE_URL = 'https://ahdahzeh.com';

/**
 * Person schema for the home page. Populates Google's Knowledge Graph when
 * someone searches "Adaze Oviawe" or "ahdahzeh", and gives social platforms
 * + AI search engines a structured profile to reference.
 */
export function JsonLdPerson() {
  const sameAs = [
    socialLinks.linkedin,
    socialLinks.tiktok,
    socialLinks.twitter,
    socialLinks.instagram,
    socialLinks.github,
    'https://ahdahzeh.substack.com',
  ].filter((url) => Boolean(url) && !url.startsWith('mailto:'));

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Adaze Oviawe',
    alternateName: 'ahdahzeh',
    url: SITE_URL,
    image: `${SITE_URL}/images/profile.png`,
    jobTitle: 'Product Designer',
    description:
      'Product designer at J.P. Morgan and founder of Cerebral, building products in industries where the interface has consequences: healthcare, fintech, ADHD productivity, luxury resale.',
    worksFor: {
      '@type': 'Organization',
      name: 'J.P. Morgan',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'New York',
        addressRegion: 'NY',
        addressCountry: 'US',
      },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'New York',
      addressRegion: 'NY',
      addressCountry: 'US',
    },
    alumniOf: [
      { '@type': 'Organization', name: 'Amazon' },
      { '@type': 'Organization', name: 'Block Equity Group' },
      { '@type': 'Organization', name: 'Omnicom' },
    ],
    knowsAbout: [
      'Product design',
      'Design engineering',
      'iOS development',
      'SwiftUI',
      'Next.js',
      'Healthcare UX',
      'Fintech UX',
      'ADHD productivity software',
    ],
    sameAs,
    email: 'ahdahzeh@gmail.com',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * WebSite schema with a SearchAction so Google can show a sitelinks search
 * box when people search the brand name.
 */
export function JsonLdWebSite() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Adaze Oviawe',
    url: SITE_URL,
    inLanguage: 'en-US',
    publisher: { '@type': 'Person', name: 'Adaze Oviawe' },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Pick the best representative image for a work item. Falls back through
 * coverVideo poster -> image -> coverImages.desktop.
 */
function pickImage(item: WorkItem): string | undefined {
  if (item.image) return item.image;
  if (item.coverVideo) {
    return item.coverVideo
      .replace('/videos/', '/images/')
      .replace(/\.mp4$/, '-poster.jpg');
  }
  if (item.coverImages?.desktop) return item.coverImages.desktop;
  return undefined;
}

/**
 * CreativeWork schema for an individual case study page. Tells search
 * engines this URL is a portfolio piece authored by Adaze, with image and
 * publication date.
 */
export function JsonLdCreativeWork({ item }: { item: WorkItem }) {
  const study = item.caseStudy;
  const image = pickImage(item);
  const url = `${SITE_URL}/work/${item.slug}`;
  const description =
    study?.subtitle ??
    item.description ??
    `${item.role} at ${item.company} (${item.period})`;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: study?.title ?? item.company,
    headline: study?.title ?? item.company,
    description,
    url,
    author: {
      '@type': 'Person',
      name: 'Adaze Oviawe',
      url: SITE_URL,
    },
    creator: {
      '@type': 'Person',
      name: 'Adaze Oviawe',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Adaze Oviawe',
      url: SITE_URL,
    },
    inLanguage: 'en-US',
    image: image ? `${SITE_URL}${image}` : undefined,
    datePublished: item.period,
    keywords: [item.company, item.role, ...(study?.tools?.split(',').map((t) => t.trim()) ?? [])].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Breadcrumb schema for case study pages: Home > Past Work > [Project].
 */
export function JsonLdBreadcrumbs({ item }: { item: WorkItem }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Past Work', item: `${SITE_URL}/#past-work` },
      {
        '@type': 'ListItem',
        position: 3,
        name: item.caseStudy?.title ?? item.company,
        item: `${SITE_URL}/work/${item.slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * ItemList schema for the homepage's Past Work carousel — gives Google a
 * structured map of every project link, in display order.
 */
export function JsonLdWorkList() {
  const visibleWork = workHistory.filter((w) => !w.archived);
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Selected Work',
    itemListElement: visibleWork.map((w, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/work/${w.slug}`,
      name: w.caseStudy?.title ?? w.company,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
