import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPosts, formatPostDate } from '@/lib/journal';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Looks, notes, and things I keep coming back to.',
  alternates: { canonical: 'https://ahdahzeh.com/journal' },
};

export default async function JournalIndexPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-white dark:bg-black overflow-x-hidden">
      <Header />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 pt-10 md:pt-16 pb-24">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">Journal</h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2 max-w-[640px] leading-[1.55]">
          Looks, notes, and things I keep coming back to.
        </p>

        {posts.length === 0 ? (
          <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.08em] text-gray-400">Nothing posted yet.</p>
        ) : (
          <ul className="mt-10 md:mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/journal/${p.slug}`} className="group block">
                  <div className="aspect-[4/5] bg-[#F4F4F2] dark:bg-gray-900 overflow-hidden">
                    {p.cover && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.cover}
                        alt={p.coverAlt ?? ''}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500">
                    <time dateTime={p.date}>{formatPostDate(p.date)}</time>
                    {p.draft && <span className="text-[#FF3B3B]">· Draft</span>}
                  </div>
                  <h2 className="mt-2 text-xl md:text-2xl font-medium tracking-tight leading-[1.15] text-black dark:text-white whitespace-pre-line group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">{p.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </main>
  );
}
