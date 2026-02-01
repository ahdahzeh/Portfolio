import Link from 'next/link';
import Image from 'next/image';
import { workHistory } from '@/data/portfolio';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WorkCaseStudyCarousel from '@/components/WorkCaseStudyCarousel';
import WorkInProgress from '@/components/WorkInProgress';
import WeChipnCaseStudy from '@/components/WeChipnCaseStudy';

export default function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Header />
      <WorkContent params={params} />
      <Footer />
    </main>
  );
}

async function WorkContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const itemIndex = workHistory.findIndex((w) => w.slug === slug);
  const item = workHistory[itemIndex];
  if (!item) notFound();

  if (item.wip) {
    const nextItem = workHistory[itemIndex + 1];
    return (
      <WorkInProgress
        title={item.caseStudy?.title ?? item.company}
        nextProject={
          nextItem
            ? { slug: nextItem.slug, label: nextItem.company }
            : undefined
        }
      />
    );
  }

  const study = item.caseStudy;

  if (slug === 'wechipin' && study) {
    return (
      <>
        <WeChipnCaseStudy
          title={study.title}
          subtitle={study.subtitle}
          roleDisplay={study.roleDisplay}
          timeline={study.timeline}
          videoUrl={study.videoUrl}
          problemSolutionVideoUrl={study.problemSolutionVideoUrl}
        />
        <nav
          className="max-w-[1200px] mx-auto px-4 mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4"
          aria-label="Project navigation"
        >
          {itemIndex > 0 ? (
            <Link
              href={`/work/${workHistory[itemIndex - 1].slug}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[13px] border border-[#0060d9] bg-white hover:bg-gray-100 text-[#0060d9] font-medium transition-colors dark:bg-black dark:border-[#0060d9] dark:text-[#0060d9] dark:hover:bg-gray-900"
            >
              <span aria-hidden>←</span>
              {workHistory[itemIndex - 1].company}
            </Link>
          ) : (
            <span />
          )}
          {itemIndex < workHistory.length - 1 ? (
            <Link
              href={`/work/${workHistory[itemIndex + 1].slug}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[13px] border border-[#0060d9] bg-white hover:bg-gray-100 text-[#0060d9] font-medium transition-colors dark:bg-black dark:border-[#0060d9] dark:text-[#0060d9] dark:hover:bg-gray-900 ml-auto"
            >
              {workHistory[itemIndex + 1].company}
              <span aria-hidden>→</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </>
    );
  }

  return (
    <article className="max-w-[1200px] mx-auto px-4 py-16 md:py-24">
      <Link href="/" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm mb-8 inline-block">
        ← Back
      </Link>
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-normal text-black dark:text-white tracking-tight mb-2 text-center">
          {study?.title ?? item.company}
        </h1>
        {study?.subtitle && (
          <p className="text-xl text-gray-500 dark:text-gray-400 text-center">{study.subtitle}</p>
        )}
        {(study?.roleDisplay != null || study?.timeline != null) && (
          <div className="flex flex-wrap justify-center gap-6 mt-3 text-sm text-gray-600 dark:text-gray-400">
            {study?.roleDisplay != null && (
              <span><strong className="text-black dark:text-white">My Role</strong> {study.roleDisplay}</span>
            )}
            {study?.timeline != null && (
              <span><strong className="text-black dark:text-white">Timeline</strong> {study.timeline}</span>
            )}
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[13px] border border-[#0060d9] bg-white hover:bg-gray-100 text-[#0060d9] font-medium transition-colors"
            >
              View site
              <span aria-hidden>→</span>
            </a>
          )}
          {study?.videoUrl && (
            <a
              href={study.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[13px] bg-[#006eff] hover:bg-[#0060d9] text-white font-medium transition-colors"
            >
              Watch walkthrough
              <span aria-hidden>→</span>
            </a>
          )}
        </div>
      </header>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {study?.narrativePart1 != null && study?.narrativePart2 != null ? (
          <>
            <p className="text-black dark:text-white leading-relaxed whitespace-pre-line text-center">
              {study.narrativePart1}
            </p>
            {slug === 'block-equity-group' && (
              <section className="my-12 text-center">
                <h2 className="text-2xl font-medium text-black dark:text-white mb-6">
                  First Wireframe Explorations
                </h2>
                <div className="relative w-full aspect-[3/1] max-w-4xl mx-auto rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900">
                  <Image
                    src="/images/work/block-equity-group/wireframes-explorations.png"
                    alt="First Wireframe Explorations — Applications, Daily Dashboard, and Settings views"
                    fill
                    className="object-contain"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                  />
                </div>
              </section>
            )}
            <p className="text-black dark:text-white leading-relaxed whitespace-pre-line text-center">
              {study.narrativePart2}
            </p>
          </>
        ) : (
          <p className="text-black dark:text-white leading-relaxed whitespace-pre-line text-center">
            {study?.narrative ?? item.description}
          </p>
        )}
        {study?.images != null && study.images.length > 0 && slug !== 'wechipin' && (
          <WorkCaseStudyCarousel images={study.images} />
        )}
      </div>
      <nav
        className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4"
        aria-label="Project navigation"
      >
        {itemIndex > 0 ? (
          <Link
            href={`/work/${workHistory[itemIndex - 1].slug}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[13px] border border-[#0060d9] bg-white hover:bg-gray-100 text-[#0060d9] font-medium transition-colors dark:bg-black dark:border-[#0060d9] dark:text-[#0060d9] dark:hover:bg-gray-900"
          >
            <span aria-hidden>←</span>
            {workHistory[itemIndex - 1].company}
          </Link>
        ) : (
          <span />
        )}
        {itemIndex < workHistory.length - 1 ? (
          <Link
            href={`/work/${workHistory[itemIndex + 1].slug}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[13px] border border-[#0060d9] bg-white hover:bg-gray-100 text-[#0060d9] font-medium transition-colors dark:bg-black dark:border-[#0060d9] dark:text-[#0060d9] dark:hover:bg-gray-900 ml-auto"
          >
            {workHistory[itemIndex + 1].company}
            <span aria-hidden>→</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
