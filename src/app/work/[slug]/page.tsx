import Link from 'next/link';
import Image from 'next/image';
import { workHistory } from '@/data/portfolio';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WorkCaseStudyCarousel from '@/components/WorkCaseStudyCarousel';
import WorkInProgress from '@/components/WorkInProgress';
import WeChipnCaseStudy from '@/components/WeChipnCaseStudy';
import VemlidyCaseStudy from '@/components/VemlidyCaseStudy';
import AmazonCaseStudy from '@/components/AmazonCaseStudy';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import SectionNav from '@/components/SectionNav';

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

  if (slug === 'vemlidy' && study) {
    return (
      <>
        <VemlidyCaseStudy
          title={study.title ?? item.company}
          subtitle={study.subtitle}
          roleDisplay={study.roleDisplay}
          timeline={study.timeline}
          link={item.link}
          videoUrl={study.videoUrl}
          narrative={study.narrative ?? ''}
          narrativeAfterCarousel={study.narrativePart2}
          launchedSiteNarrative={study.launchedSiteNarrative}
          launchedSiteVideoUrl={study.launchedSiteVideoUrl}
        />
        <nav
          className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-6"
          aria-label="Project navigation"
        >
          {itemIndex > 0 ? (
            <Link
              href={`/work/${workHistory[itemIndex - 1].slug}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-[#0060d9] bg-white hover:bg-gray-100 text-[#0060d9] font-medium transition-colors dark:bg-black dark:border-[#0060d9] dark:text-[#0060d9] dark:hover:bg-gray-900"
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-[#0060d9] bg-white hover:bg-gray-100 text-[#0060d9] font-medium transition-colors dark:bg-black dark:border-[#0060d9] dark:text-[#0060d9] dark:hover:bg-gray-900 ml-auto"
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

  if (slug === 'wechipn' && study) {
    return (
      <>
        <WeChipnCaseStudy
          title={study.title}
          subtitle={study.subtitle}
          roleDisplay={study.roleDisplay}
          timeline={study.timeline}
          videoUrl={study.videoUrl}
          problemSolutionVideoUrl={study.problemSolutionVideoUrl}
          mobileViewVideoUrl={study.mobileViewVideoUrl}
        />
        <nav
          className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-6"
          aria-label="Project navigation"
        >
          {itemIndex > 0 ? (
            <Link
              href={`/work/${workHistory[itemIndex - 1].slug}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-[#0060d9] bg-white hover:bg-gray-100 text-[#0060d9] font-medium transition-colors dark:bg-black dark:border-[#0060d9] dark:text-[#0060d9] dark:hover:bg-gray-900"
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-[#0060d9] bg-white hover:bg-gray-100 text-[#0060d9] font-medium transition-colors dark:bg-black dark:border-[#0060d9] dark:text-[#0060d9] dark:hover:bg-gray-900 ml-auto"
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

  if (slug === 'amazon' && study) {
    return (
      <>
        <AmazonCaseStudy
          title={study.title ?? item.company}
          subtitle={study.subtitle}
          roleDisplay={study.roleDisplay}
          timeline={study.timeline}
          link={item.link}
          videoUrl={study.videoUrl}
          narrative={study.narrative ?? ''}
          sections={study.sections ?? []}
        />
        <nav
          className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-6"
          aria-label="Project navigation"
        >
          {itemIndex > 0 ? (
            <Link
              href={`/work/${workHistory[itemIndex - 1].slug}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-[#0060d9] bg-white hover:bg-gray-100 text-[#0060d9] font-medium transition-colors dark:bg-black dark:border-[#0060d9] dark:text-[#0060d9] dark:hover:bg-gray-900"
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-[#0060d9] bg-white hover:bg-gray-100 text-[#0060d9] font-medium transition-colors dark:bg-black dark:border-[#0060d9] dark:text-[#0060d9] dark:hover:bg-gray-900 ml-auto"
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

  const genericSections = [
    { id: 'overview', label: 'Overview' },
    ...(slug === 'block-equity-group' ? [{ id: 'wireframes', label: 'Wireframes' }] : []),
    ...(study?.narrativePart1 != null && study?.narrativePart2 != null ? [{ id: 'content', label: 'Content' }] : []),
    ...(study?.images != null && study.images.length > 0 && slug !== 'wechipn' ? [{ id: 'gallery', label: 'Gallery' }] : []),
    ...(study?.launchedSiteNarrative != null ? [{ id: 'launched-site', label: 'Launched site' }] : []),
  ];

  return (
    <>
      <ScrollProgressBar />
      <SectionNav sections={genericSections} />
      <article className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24">
        <Link href="/" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm mb-12 inline-block">
          ← Back
        </Link>
        <header className="mb-16">
        <h1 className="text-4xl md:text-5xl font-normal text-black dark:text-white tracking-tight mb-4 text-center">
          {study?.title ?? item.company}
        </h1>
        {study?.subtitle && (
          <p className="text-xl text-gray-500 dark:text-gray-400 text-center mt-4">{study.subtitle}</p>
        )}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-gray-500 dark:text-gray-400 mt-8 mb-8">
          {study?.timeline != null && <span>Timeline: {study.timeline}</span>}
          {study?.roleDisplay != null && <span>Title: {study.roleDisplay}</span>}
          <span>Project: {study?.title ?? item.company}</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-[#0060d9] bg-white hover:bg-gray-100 text-[#0060d9] font-medium transition-colors"
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#006eff] hover:bg-[#0060d9] text-white font-medium transition-colors"
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
            <section id="overview" className="scroll-mt-24">
              <p className="text-black dark:text-white leading-relaxed whitespace-pre-line text-center mb-16">
                {study.narrativePart1}
              </p>
            </section>
            {slug === 'block-equity-group' && (
              <section id="wireframes" className="mt-16 mb-16 text-center scroll-mt-24">
                <h2 className="text-2xl font-medium text-black dark:text-white mb-8">
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
            <section id="content" className="scroll-mt-24">
              <p className="text-black dark:text-white leading-relaxed whitespace-pre-line text-center mb-16">
                {study.narrativePart2}
              </p>
            </section>
          </>
          ) : (
            <section id="overview" className="scroll-mt-24">
              <p className="text-black dark:text-white leading-relaxed whitespace-pre-line text-center mb-16">
                {study?.narrative ?? item.description}
              </p>
            </section>
          )}
          {study?.images != null && study.images.length > 0 && slug !== 'wechipn' && (
            <section id="gallery" className="scroll-mt-24">
              <WorkCaseStudyCarousel images={study.images} />
            </section>
          )}
          {study?.launchedSiteNarrative != null && (
            <section id="launched-site" className="mt-16 mb-16 text-center px-8 sm:px-12 md:px-24 lg:px-48 py-12 max-md:px-4 scroll-mt-24">
              <h2 className="text-2xl font-medium text-black dark:text-white mb-8">
                Launched Site
              </h2>
              {study.launchedSiteImages != null && study.launchedSiteImages.length > 0 && (
                <WorkCaseStudyCarousel images={study.launchedSiteImages} />
              )}
              <p className="text-black dark:text-white leading-relaxed text-center mt-8 max-w-3xl mx-auto">
                {study.launchedSiteNarrative}
              </p>
            </section>
          )}
        </div>
        <nav
          className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-6"
          aria-label="Project navigation"
        >
          {itemIndex > 0 ? (
            <Link
              href={`/work/${workHistory[itemIndex - 1].slug}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-[#0060d9] bg-white hover:bg-gray-100 text-[#0060d9] font-medium transition-colors dark:bg-black dark:border-[#0060d9] dark:text-[#0060d9] dark:hover:bg-gray-900"
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-[#0060d9] bg-white hover:bg-gray-100 text-[#0060d9] font-medium transition-colors dark:bg-black dark:border-[#0060d9] dark:text-[#0060d9] dark:hover:bg-gray-900 ml-auto"
            >
              {workHistory[itemIndex + 1].company}
              <span aria-hidden>→</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </>
  );
}
