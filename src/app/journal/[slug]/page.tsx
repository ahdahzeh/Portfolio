import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Picks } from '@/components/journal/PostBlocks';
import { getPost, getPosts, formatPostDate } from '@/lib/journal';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return { title: 'Not found' };
  const { meta } = post;
  const title = meta.title.replace(/\n/g, ' ');
  return {
    title,
    description: meta.excerpt,
    alternates: { canonical: `https://ahdahzeh.com/journal/${meta.slug}` },
    openGraph: {
      title,
      description: meta.excerpt,
      type: 'article',
      publishedTime: meta.date,
      ...(meta.cover ? { images: [{ url: meta.cover }] } : {}),
    },
    ...(meta.draft ? { robots: { index: false } } : {}),
  };
}

export default async function JournalPostPage({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  const { Content, meta } = post;

  return (
    <main className="min-h-screen bg-white dark:bg-black overflow-x-hidden">
      <Header />
      <article className="px-4 sm:px-6 md:px-8 pt-10 md:pt-16 pb-24">
        <header className="max-w-[720px] mx-auto">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500">
            <Link href="/journal" className="hover:text-black dark:hover:text-white transition-colors">
              Journal
            </Link>
            <span aria-hidden>·</span>
            <time dateTime={meta.date}>{formatPostDate(meta.date)}</time>
            {meta.draft && <span className="text-[#FF3B3B]">· Draft</span>}
          </div>
          <h1 className="mt-5 text-[34px] sm:text-[44px] md:text-[52px] font-medium tracking-[-0.025em] leading-[1.05] text-black dark:text-white whitespace-pre-line text-balance">
            {meta.title}
          </h1>
          {meta.dek && (
            <p className="mt-4 text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-snug max-w-[600px]">{meta.dek}</p>
          )}
        </header>

        {meta.cover && (
          <div className="max-w-[1040px] mx-auto mt-10 md:mt-14 -mx-4 sm:mx-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={meta.cover} alt={meta.coverAlt ?? ''} className="w-full h-auto bg-gray-100 dark:bg-gray-900" />
          </div>
        )}

        <div className="max-w-[720px] mx-auto mt-10 md:mt-14">
          <Content />

          {meta.picks?.length ? (
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
              <Picks ids={meta.picks} title="Shop the post" />
            </div>
          ) : null}

          <div className="mt-16">
            <Link
              href="/journal"
              className="font-mono text-[11px] uppercase tracking-[0.08em] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              ← All posts
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
