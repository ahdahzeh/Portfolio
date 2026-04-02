import Link from 'next/link';
import Image from 'next/image';
import { workHistory } from '@/data/portfolio';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WorkCaseStudyCarousel from '@/components/WorkCaseStudyCarousel';
import LightboxTrigger from '@/components/LightboxTrigger';
import WorkInProgress from '@/components/WorkInProgress';
import WeChipnCaseStudy from '@/components/WeChipnCaseStudy';
import VemlidyCaseStudy from '@/components/VemlidyCaseStudy';
import AmazonCaseStudy from '@/components/AmazonCaseStudy';
import CommunityHealthCaseStudy from '@/components/CommunityHealthCaseStudy';
import ScourCaseStudy from '@/components/ScourCaseStudy';
import AutopilotCaseStudy from '@/components/AutopilotCaseStudy';
import BackToHomeButton from '@/components/BackToHomeButton';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import SectionNav from '@/components/SectionNav';

export default function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <main className="min-h-screen bg-white dark:bg-black overflow-x-hidden">
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
        prototypeLink={item.link}
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
          className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 mt-[10px] mb-[10px] pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-6"
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
          className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 mt-[10px] mb-[10px] pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-6"
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

  if (slug === 'community-health-media' && study && study.sections != null) {
    return (
      <>
        <CommunityHealthCaseStudy
          title={study.title ?? item.company}
          subtitle={study.subtitle}
          roleDisplay={study.roleDisplay}
          timeline={study.timeline}
          link={item.link}
          heroIntro={study.heroIntro}
          sections={study.sections}
          images={study.images ?? []}
          fourUpItems={study.fourUpItems}
          team={study.team}
          problemStatement={study.problemStatement}
          industry={study.industry}
          browserFrameVideo={study.browserFrameVideo}
          overviewLead={study.overviewLead}
          chtProblems={study.chtProblems}
          chtSolutions={study.chtSolutions}
          chtTwoUpPairs={study.chtTwoUpPairs}
          chtOutcomes={study.chtOutcomes}
          chtTools={study.chtTools}
        />
        <nav
          className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 mt-[10px] mb-[10px] pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-6"
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

  if (slug === 'scour' && study) {
    return (
      <>
        <ScourCaseStudy
          title={study.title ?? item.company}
          subtitle={study.subtitle}
          roleDisplay={study.roleDisplay}
          timeline={study.timeline}
          link={item.link}
          videoUrl={study.videoUrl}
        />
        <nav
          className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 mt-[10px] mb-[10px] pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-6"
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

  if (slug === 'autopilot' && study) {
    return (
      <>
        <AutopilotCaseStudy
          title={study.title ?? item.company}
          subtitle={study.subtitle}
          roleDisplay={study.roleDisplay}
          timeline={study.timeline}
          link={item.link}
          videoUrl={study.videoUrl}
        />
        <nav
          className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 mt-[10px] mb-[10px] pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-6"
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
          className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 mt-[10px] mb-[10px] pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-6"
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

  const hasIntroOverview = study?.narrativePart1 != null && study?.narrativePart2 != null;
  const genericSections = [
    ...(hasIntroOverview ? [] : [{ id: 'overview', label: 'Overview' }]),
    ...(slug === 'block-equity-group' ? [{ id: 'wireframes', label: 'Wireframes' }] : []),
    ...(hasIntroOverview ? [{ id: 'content', label: 'Content' }] : []),
    ...(study?.images != null && study.images.length > 0 && slug !== 'wechipn' && slug !== 'community-health-media' ? [{ id: 'gallery', label: 'Gallery' }] : []),
    ...(study?.launchedSiteNarrative != null ? [{ id: 'launched-site', label: 'Launched site' }] : []),
  ];

  return (
    <>
      <ScrollProgressBar />
      <article className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-3.5">
          <BackToHomeButton className="mb-12" />
          <header className="mb-16">
            <h1 className="text-[85px] font-normal text-black dark:text-white tracking-tight mb-8 text-center leading-tight">
              {study?.title ?? item.company}
            </h1>
            {study?.subtitle && (
              <p className="text-[40px] text-black dark:text-black text-center mt-8" style={{ letterSpacing: '-2.4px' }}>{study.subtitle}</p>
            )}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-[20px] text-black dark:text-black mt-8 mb-8" style={{ letterSpacing: '0px' }}>
              {study?.timeline != null && <span>Timeline: {study.timeline}</span>}
              {study?.roleDisplay != null && <span>Role: {study.roleDisplay}</span>}
            </div>
            {(item.link != null || study?.videoUrl != null) && (
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-[#0060d9] bg-white hover:bg-gray-100 text-[#0060d9] font-medium transition-colors dark:bg-black dark:border-[#0060d9] dark:text-[#0060d9] dark:hover:bg-gray-900"
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
            )}
          </header>
          {(study?.narrativePart1 != null || study?.narrative != null || item.description != null || item.image != null) && (
            <>
            <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12 mb-16">
              {(study?.narrativePart1 ?? study?.narrative ?? item.description) != null && (
                <div className="flex-1 min-w-0 max-w-[811px] md:max-w-none mx-auto md:mx-0 flex flex-col gap-6">
                  <p className="text-black dark:text-white text-lg leading-relaxed text-left whitespace-pre-line w-[1137px] max-w-full mt-5">
                    {study?.narrativePart1 ?? study?.narrative ?? item.description ?? ''}
                  </p>
                </div>
              )}
              {item.image != null && (
                <div className="relative w-full md:w-[45%] md:max-w-[480px] md:flex-shrink-0 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 mx-auto md:mx-0">
                  {slug === 'block-equity-group' && study?.videoUrl != null ? (
                    <div className="relative w-full aspect-video bg-black">
                      {/loom\.com|youtube\.com|youtu\.be|vimeo\.com/.test(study.videoUrl) ? (
                        <iframe
                          src={
                            study.videoUrl.includes('/share/')
                              ? study.videoUrl.replace('/share/', '/embed/')
                              : study.videoUrl
                          }
                          title={`${item.company} — walkthrough`}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          src={study.videoUrl}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="auto"
                          className="absolute inset-0 w-full h-full object-contain"
                        >
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  ) : (
                    <LightboxTrigger images={[{ src: item.image, alt: item.company }]}>
                      <Image
                        src={item.image}
                        alt={item.company}
                        width={480}
                        height={360}
                        className="w-full h-auto object-contain cursor-zoom-in"
                        sizes="(max-width: 768px) 100vw, 480px"
                      />
                    </LightboxTrigger>
                  )}
                </div>
              )}
            </div>
              {study?.narrativePart1Closing != null && (
                <p className="text-black dark:text-white text-lg leading-relaxed text-center whitespace-pre-line w-full max-w-full mt-6">
                  {study.narrativePart1Closing}
                </p>
              )}
            </>
          )}
        </div>

        <SectionNav sections={genericSections} />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 pt-[35px] pb-[35px] space-y-24 md:space-y-32">
          {study?.narrativePart1 != null && study?.narrativePart2 != null ? (
            <>
              {slug === 'block-equity-group' && (
                <section id="wireframes" className="scroll-mt-24">
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-8">
                    First Wireframe Explorations
                  </h2>
                  <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
                    <LightboxTrigger
                      images={[{ src: '/images/work/block-equity-group/wireframes-explorations.png', alt: 'First Wireframe Explorations — Applications, Daily Dashboard, and Settings views' }]}
                      className="w-full md:w-[55%] md:flex-shrink-0"
                    >
                      <div className="rounded-2xl overflow-hidden">
                        <Image
                          src="/images/work/block-equity-group/wireframes-explorations.png"
                          alt="First Wireframe Explorations — Applications, Daily Dashboard, and Settings views"
                          width={1200}
                          height={400}
                          className="w-full h-auto"
                          sizes="(max-width: 768px) 100vw, 55vw"
                        />
                      </div>
                    </LightboxTrigger>
                    <div className="flex-1 min-w-0">
                      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-6 md:p-8 hover:border-amber-500/50 dark:hover:border-amber-400/50 transition-colors">
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          I created these wireframes to explore different configurations and solutions for the company&apos;s financial data and how it should be tracked. I used the AI plugin UI Pilot to rapidly generate different screens at a time, then edited those to find the solutions I needed.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              )}
              <section id="content" className="scroll-mt-24">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-8">
                  Content
                </h2>
                <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-6 md:p-8">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {study.narrativePart2}
                  </p>
                </div>
              </section>
            </>
          ) : (
            (study?.narrative != null || item.description != null) && (
              <section id="overview" className="scroll-mt-24">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-8">
                  Overview
                </h2>
                <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-6 md:p-8">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {study?.narrative ?? item.description ?? ''}
                  </p>
                </div>
              </section>
            )
          )}
          {study?.images != null && study.images.length > 0 && slug !== 'wechipn' && slug !== 'community-health-media' && (
            <section id="gallery" className="scroll-mt-24">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-8">
                Gallery
              </h2>
              <WorkCaseStudyCarousel images={study.images} />
            </section>
          )}
          {study?.launchedSiteNarrative != null && (
            <section id="launched-site" className="scroll-mt-24">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-8">
                Launched Site
              </h2>
              {study.launchedSiteImages != null && study.launchedSiteImages.length > 0 && (
                <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 mb-8">
                  <WorkCaseStudyCarousel images={study.launchedSiteImages} />
                </div>
              )}
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-6 md:p-8">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {study.launchedSiteNarrative}
                </p>
              </div>
            </section>
          )}
        </div>

        <nav
          className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 mt-[10px] mb-[10px] pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-6"
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
