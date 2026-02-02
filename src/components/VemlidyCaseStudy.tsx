'use client';

import Link from 'next/link';
import Image from 'next/image';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import SectionNav, { type SectionNavItem } from '@/components/SectionNav';
import WorkCaseStudyCarousel from '@/components/WorkCaseStudyCarousel';

const VEMLIDY_SECTIONS: SectionNavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'sitemap', label: 'Sitemap' },
  { id: 'wireframes', label: 'Wireframes' },
  { id: 'launched-site', label: 'Launched site' },
];

const WIREFRAME_BASE = '/images/work/vemlidy/vemlidy-wireframe';

const WIREFRAME_CAROUSEL_IMAGES = [
  { src: `${WIREFRAME_BASE}-1.png`, alt: 'Vemlidy — patient site hero and treatment journey', caption: 'Patient site hero: “It’s about the moments” with treatment journey cards and staying on track CTA.' },
  { src: `${WIREFRAME_BASE}-2.png`, alt: 'Vemlidy — hero and pathway cards', caption: 'Hero with headline and pathway cards: not in treatment, considering VEMLIDY, or already prescribed.' },
  { src: `${WIREFRAME_BASE}-3.png`, alt: 'Vemlidy — effects on the liver', caption: 'Effects on the liver: inflammation, fibrosis, cirrhosis, liver cancer—and why treating hep B matters.' },
  { src: `${WIREFRAME_BASE}-4.png`, alt: 'Vemlidy — results with VEMLIDY', caption: 'Results with VEMLIDY: trial participants, viral suppression, and liver-related lab values.' },
  { src: `${WIREFRAME_BASE}-5.png`, alt: 'Vemlidy — real stories and resources', caption: 'Real Stories & Resources: patient story videos and downloadable brochures in multiple languages.' },
  { src: `${WIREFRAME_BASE}-6.png`, alt: 'Vemlidy — savings and support programs', caption: 'Savings and support: co-pay overview and sign-up form for the VEMLIDY Co-pay Coupon Program.' },
  { src: `${WIREFRAME_BASE}-7.png`, alt: 'Vemlidy — patient assessment and treatment flow', caption: 'Patient assessment: HBV DNA and ALT zones with treatment recommendations (monitor, consider, treat now).' },
  { src: `${WIREFRAME_BASE}-8.png`, alt: 'Vemlidy — treatment criteria evolution', caption: 'Treatment criteria evolution: guideline thresholds over time and treatment-eligible patient growth.' },
  { src: `${WIREFRAME_BASE}-9.png`, alt: 'Vemlidy — clinical education resources', caption: 'Clinical education: expert video on SABA and downloadable resources (8-year data, guidelines, conversation guide).' },
];

const LAUNCHED_SITE_BASE = '/images/work/vemlidy/vemlidy-launched';
const LAUNCHED_SITE_IMAGES = [
  { src: `${LAUNCHED_SITE_BASE}-1.png`, alt: 'Vemlidy launched site — HCP efficacy and safety', caption: 'HCP site: pivotal and 8-year efficacy and safety data, hero with “proven results for the moments that matter,” trials and guidelines.' },
  { src: `${LAUNCHED_SITE_BASE}-2.png`, alt: 'Vemlidy launched site — mechanism of action', caption: 'Mechanism of action: VEMLIDY vs TDF diagram—plasma stability and tenofovir delivery to hepatocytes.' },
  { src: `${LAUNCHED_SITE_BASE}-3.png`, alt: 'Vemlidy launched site — what is VEMLIDY', caption: 'Patient site: “What is VEMLIDY?” hero, indication, and benefit cards (viral load, liver condition).' },
  { src: `${LAUNCHED_SITE_BASE}-4.png`, alt: 'Vemlidy launched site — patient treatment path', caption: 'Patient site: “Find your treatment path” with three pathway cards and co-pay / Q&A resources.' },
];

interface VemlidyCaseStudyProps {
  title: string;
  subtitle?: string;
  roleDisplay?: string;
  timeline?: string;
  link?: string;
  videoUrl?: string;
  narrative: string;
  /** Rendered below the Low-fi wireframes carousel */
  narrativeAfterCarousel?: string;
  /** Optional paragraph below the Launched Site carousel */
  launchedSiteNarrative?: string;
  /** Optional video of the current site (Loom/YouTube/Vimeo embed URL or path to local video) */
  launchedSiteVideoUrl?: string;
}

export default function VemlidyCaseStudy({
  title,
  subtitle,
  roleDisplay,
  timeline,
  link,
  videoUrl,
  narrative,
  narrativeAfterCarousel,
  launchedSiteNarrative,
  launchedSiteVideoUrl,
}: VemlidyCaseStudyProps) {
  return (
    <article className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <ScrollProgressBar />
      <Link
        href="/"
        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm mb-12 inline-block"
      >
        ← Back
      </Link>

      <header className="mb-16">
        <h1 className="text-4xl md:text-5xl font-normal text-black dark:text-white tracking-tight mb-4 text-center">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-gray-500 dark:text-gray-400 text-center mt-4">{subtitle}</p>
        )}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-gray-500 dark:text-gray-400 mt-8 mb-8">
          {timeline != null && <span>Timeline: {timeline}</span>}
          {roleDisplay != null && <span>Title: {roleDisplay}</span>}
          <span>Project: {title}</span>
        </div>
        {(link != null || videoUrl != null) && (
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-[#0060d9] bg-white hover:bg-gray-100 text-[#0060d9] font-medium transition-colors dark:bg-black dark:border-[#0060d9] dark:text-[#0060d9] dark:hover:bg-gray-900"
              >
                View site
                <span aria-hidden>→</span>
              </a>
            )}
            {videoUrl && (
              <a
                href={videoUrl}
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

      <SectionNav sections={VEMLIDY_SECTIONS} />

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <section id="overview" className="scroll-mt-24">
          <p className="text-black dark:text-white leading-relaxed whitespace-pre-line text-center mb-16">
            {narrative}
          </p>
        </section>

        {/* Sitemap */}
        <section id="sitemap" className="mt-16 mb-16 text-center scroll-mt-24">
          <h2 className="text-2xl font-medium text-black dark:text-white mb-8">
            Sitemap
          </h2>
          <div className="relative w-full rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden bg-gray-100 dark:bg-gray-900 max-w-4xl mx-auto">
            <div className="relative w-full aspect-[4/3] min-h-[280px]">
              <Image
                src="/images/work/vemlidy/vemlidy-sitemap.png"
                alt="Vemlidy HCP site sitemap — Site Map | Vemlidy - HCP Site Update 2025"
                fill
                className="object-contain"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          </div>
        </section>

        {/* Low-fi wireframes — single carousel with all wireframe images */}
        <section id="wireframes" className="mt-16 mb-16 text-center px-8 sm:px-12 md:px-24 lg:px-48 py-12 max-md:px-4 scroll-mt-24">
          <h2 className="text-2xl font-medium text-black dark:text-white mb-8">
            Low-fi wireframes
          </h2>
          <WorkCaseStudyCarousel images={WIREFRAME_CAROUSEL_IMAGES} />
        </section>

        {narrativeAfterCarousel && (
          <p className="text-black dark:text-white leading-relaxed whitespace-pre-line text-center mt-16 mb-16">
            {narrativeAfterCarousel}
          </p>
        )}

        {/* Launched Site — carousel of live site screenshots */}
        <section id="launched-site" className="mt-16 mb-16 text-center px-8 sm:px-12 md:px-24 lg:px-48 py-12 max-md:px-4 scroll-mt-24">
          <h2 className="text-2xl font-medium text-black dark:text-white mb-8">
            Launched Site
          </h2>
          <WorkCaseStudyCarousel images={LAUNCHED_SITE_IMAGES} />
          {launchedSiteNarrative && (
            <p className="text-black dark:text-white leading-relaxed text-center mt-8 max-w-3xl mx-auto">
              {launchedSiteNarrative}
            </p>
          )}
          {launchedSiteVideoUrl && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-black mt-8 max-w-4xl mx-auto">
              {/loom\.com|youtube\.com|youtu\.be|vimeo\.com/.test(launchedSiteVideoUrl) ? (
                <iframe
                  src={
                    launchedSiteVideoUrl.includes('/share/')
                      ? launchedSiteVideoUrl.replace('/share/', '/embed/')
                      : launchedSiteVideoUrl
                  }
                  title="Vemlidy — current site walkthrough"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={launchedSiteVideoUrl}
                  controls
                  preload="metadata"
                  playsInline
                  className="absolute inset-0 w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}
        </section>
      </div>
    </article>
  );
}
