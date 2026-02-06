'use client';

import Link from 'next/link';
import Image from 'next/image';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import SectionNav, { type SectionNavItem } from '@/components/SectionNav';
import WorkCaseStudyCarousel from '@/components/WorkCaseStudyCarousel';

const SECTIONS: SectionNavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'results', label: 'Results' },
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'design-homepage', label: 'Design – Homepage' },
  { id: 'design-search', label: 'Design – Search' },
  { id: 'design-explorations', label: 'Design – Explorations' },
  { id: 'research', label: 'Research' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'closing', label: 'Closing' },
];

export interface CaseStudySection {
  title?: string;
  content?: string;
  images?: { src: string; alt: string; caption?: string }[];
}

interface AmazonCaseStudyProps {
  title: string;
  subtitle?: string;
  roleDisplay?: string;
  timeline?: string;
  link?: string;
  videoUrl?: string;
  narrative: string;
  sections?: CaseStudySection[];
}

export default function AmazonCaseStudy({
  title = 'Case Study Presentation',
  subtitle = 'Amazon — Inspirational Shopping',
  roleDisplay,
  timeline,
  link,
  videoUrl,
}: AmazonCaseStudyProps) {
  return (
    <article className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <ScrollProgressBar />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-3.5">
        <Link
          href="/"
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm mb-12 inline-block"
        >
          ← Back
        </Link>

        <header className="mb-16">
          <h1 className="text-[85px] font-normal text-black dark:text-white tracking-tight mb-8 text-center leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[40px] text-black dark:text-black text-center mt-8" style={{ letterSpacing: '-2.4px' }}>{subtitle}</p>
          )}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-[20px] text-black dark:text-black mt-8 mb-8" style={{ letterSpacing: '0px' }}>
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
        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12 mb-16">
          <p className="text-black dark:text-white text-lg leading-relaxed text-center md:text-left flex-1 min-w-0 max-w-[811px] md:max-w-none mx-auto md:mx-0">
          I joined the team working on Amazon Inspire and Shop By Interest—experimental experiences aimed at helping customers discover products they didn’t know they wanted. Amazon has millions of products, but search and category navigation only work when you know what you’re looking for. We were building a visual, feed-based shopping experience: discovery-driven browsing at scale. My role focused on the design system and interaction patterns that would power these experiences, and on making them findable—so customers could reach Inspirational Shopping and Shop By Interest without already knowing they existed.
        </p>
          <div className="relative w-full md:w-[45%] md:max-w-[480px] md:flex-shrink-0 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 mx-auto md:mx-0">
            <Image
              src="/images/work/amazon/inspire-video-product-flow.png"
              alt="Amazon Inspire — video playback view and product detail pop-up showing discovery-to-purchase flow"
              width={480}
              height={520}
              className="w-full h-auto object-contain"
              sizes="(max-width: 768px) 100vw, 480px"
            />
          </div>
        </div>
      </div>

      <SectionNav sections={SECTIONS} />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 pt-[35px] pb-[35px] space-y-24 md:space-y-32">
        {/* 2. PROJECT OVERVIEW */}
        <section id="overview" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-8">
            Inspirational Shopping
          </h2>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-6 md:p-8 mb-10">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Inspirational Shopping is Amazon’s answer to discovery-first browsing. It helps customers find products through curated, community-driven content—a scroll-based feed that surfaces items by interests and trends instead of search alone. The work sat at the intersection of social-style feeds and e‑commerce: personalized inspiration, trending picks, and interest-based collections, all built to perform at Amazon’s scale and within its design language.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Inspire Tab</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                A dedicated surface for discovery: curated collections, trending picks, and personalized inspiration in a feed format. Customers can browse without a search query and still land on relevant products.
              </p>
              <div className="mt-4 rounded-xl overflow-hidden">
                <Image
                  src="/images/work/amazon/inspire-tab-mens-style.png"
                  alt="Inspire tab — Men’s Style feed with shoppable outfit and product carousel"
                  width={382}
                  height={520}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 100vw, 382px"
                />
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Shop By Interest</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Interest-based browsing—explore by category, community picks, and themed collections in a scrollable experience. Content and products adapt to what users follow and engage with, so the feed stays relevant.
              </p>
              <div className="mt-4 rounded-xl overflow-hidden">
                <Image
                  src="/images/work/amazon/shop-by-interest-inspire-feed.png"
                  alt="Inspire feed — shoppable post with Logitech mouse and creator content"
                  width={382}
                  height={520}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 100vw, 382px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* RESULTS & INSIGHTS */}
        <section id="results" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
            Results & Insights
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mb-12">
            Making Inspirational Shopping and Shop By Interest discoverable through templates drove meaningful gains in traffic and revenue. The work reached millions of customers and reinforced how important findability and consistent entry points are for discovery experiences at scale.
          </p>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="rounded-2xl border-2 border-amber-500/40 dark:border-amber-400/30 bg-amber-50/50 dark:bg-amber-950/20 p-8 md:p-10 text-center">
              <p className="text-5xl md:text-6xl font-bold text-amber-600 dark:text-amber-400 tabular-nums">12%</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">Traffic increase</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">First week after launch — more users finding and entering the discovery experiences</p>
            </div>
            <div className="rounded-2xl border-2 border-amber-500/40 dark:border-amber-400/30 bg-amber-50/50 dark:bg-amber-950/20 p-8 md:p-10 text-center">
              <p className="text-5xl md:text-6xl font-bold text-amber-600 dark:text-amber-400 tabular-nums">20%</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">Revenue increase</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">After 2 weeks — discovery-driven browsing contributing to conversion</p>
            </div>
          </div>
        </section>

        {/* 3. PROBLEM STATEMENT */}
        <section id="problem" className="scroll-mt-24">
          <div className="rounded-2xl border-2 border-amber-500/30 dark:border-amber-400/30 bg-amber-50/50 dark:bg-amber-950/20 p-8 md:p-12">
            <p className="text-sm font-medium uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-4">
              Problem Statement
            </p>
            <p className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white leading-snug mb-6">
              Users have no way to locate the Inspirational Shopping and Shop By Interest Experiences without already knowing about them.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              <strong className="text-gray-900 dark:text-white">Before:</strong> The experiences lived in the product but lacked clear entry points in navigation and homepage. Discovery depended on existing awareness, limiting reach and engagement.
            </p>
          </div>
        </section>

        {/* 4. SOLUTION - TEMPLATES */}
        <section id="solution" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
            Solution — Templates
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mb-8">
            We introduced a template-based solution for navigation and placement: reusable widget templates that could surface Inspirational Shopping and Shop By Interest from the homepage, search, and key entry points—giving users a clear path to discovery without prior knowledge. The templates lived in our shared component library so multiple teams could adopt them without reinventing placement or hierarchy.
          </p>
          <div className="rounded-2xl overflow-hidden mb-10">
            <Image
              src="/images/work/amazon/solution-templates-wireframes.png"
              alt="Shop By Interest and Collection Faceouts widget templates — asymmetrical layouts, grids, and ingress to Shop By Interest"
              width={1024}
              height={576}
              className="w-full h-auto object-contain"
              sizes="(max-width: 1200px) 100vw, 1024px"
            />
          </div>
        </section>

        {/* 5. DESIGN WORK SHOWCASE */}
        <section id="design-homepage" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
            Design Work Showcase
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-12">
            Homepage widgets, search features, and explorations
          </p>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mb-12">
            I contributed to component libraries that needed to scale across categories while staying consistent with Amazon’s design language. Below is a summary of the main widget and feature areas: homepage placement, search integration, and prelaunch explorations.
          </p>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-12 mb-6">A. Homepage Widgets</h3>
          <ul className="space-y-4 text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-3">
              <span className="text-amber-500 dark:text-amber-400 mt-1">•</span>
              <span><strong className="text-gray-900 dark:text-white">Collections Hero Card Widget</strong> — Hero placement for featured collections</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 dark:text-amber-400 mt-1">•</span>
              <span><strong className="text-gray-900 dark:text-white">3×3 Grid Widget</strong> — Nine ingress points for Inspirational Shopping and Shop By Interest</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 dark:text-amber-400 mt-1">•</span>
              <span><strong className="text-gray-900 dark:text-white">2×3 Grid Widget</strong> — Six ingress points with clear hierarchy</span>
            </li>
          </ul>
          <WorkCaseStudyCarousel
              images={[
                { src: '/images/work/amazon/hero-card-widget.png', alt: 'Collections Hero Card Widget', caption: 'Collections Hero Card Widget — hero placement for featured collections' },
                { src: '/images/work/amazon/grid-3x3-widget.png', alt: 'Non Personalized Grid 3×3 Widget', caption: '3×3 Grid Widget — nine ingress points for Inspirational Shopping and Shop By Interest' },
                { src: '/images/work/amazon/grid-2x3-widget.png', alt: 'Non Personalized Grid 2×3 Widget', caption: '2×3 Grid Widget — six ingress points with clear hierarchy' },
              ]}
            />

          <h3 id="design-search" className="text-xl font-semibold text-gray-900 dark:text-white mt-16 mb-6 scroll-mt-24">B. Search Features</h3>
          <ul className="space-y-4 text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-3">
              <span className="text-amber-500 dark:text-amber-400 mt-1">•</span>
              <span><strong className="text-gray-900 dark:text-white">SBI Search</strong> — Shop By Interest search section</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 dark:text-amber-400 mt-1">•</span>
              <span><strong className="text-gray-900 dark:text-white">Search Collections</strong> — Multiple widget variations for collection discovery</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 dark:text-amber-400 mt-1">•</span>
              <span><strong className="text-gray-900 dark:text-white">Content Search Widget</strong> — Multiple ingress points for content search</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 dark:text-amber-400 mt-1">•</span>
              <span><strong className="text-gray-900 dark:text-white">Sparkle</strong> — Feature highlight for discovery moments</span>
            </li>
          </ul>
          <WorkCaseStudyCarousel
            images={[
              { src: '/images/work/amazon/12.png', alt: 'SBI Search', caption: 'SBI Search — surfacing interests and inspiration on the search page' },
              { src: '/images/work/amazon/13.png', alt: 'SBI Search Collections Widget', caption: 'SBI Search Collections Widget — search to collection to feed flow' },
              { src: '/images/work/amazon/14.png', alt: 'SBI Search Collections 2', caption: 'SBI Search Collections 2 — Shop Interior Design Ideas to collection view' },
              { src: '/images/work/amazon/15.png', alt: 'SBI Content Search Widget', caption: 'SBI Content Search Widget — discover interior design ideas and creator content' },
              { src: '/images/work/amazon/16.png', alt: 'SBI Sparkle', caption: 'SBI Sparkle — search sparkles at top of search, triggered by broad keywords' },
              { src: '/images/work/amazon/17.png', alt: 'SBI Sparkle discovery', caption: 'SBI Sparkle — Makeup, Interior Design, and Gardening discovery flows' },
            ]}
          />

          <h3 id="design-explorations" className="text-xl font-semibold text-gray-900 dark:text-white mt-16 mb-6 scroll-mt-24">C. Explorations</h3>
          <ul className="space-y-4 text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-3">
              <span className="text-amber-500 dark:text-amber-400 mt-1">•</span>
              <span>Prelaunch exploration designs</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 dark:text-amber-400 mt-1">•</span>
              <span>Search Bar Widget Explorations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 dark:text-amber-400 mt-1">•</span>
              <span>SBI Tile Ingress</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 dark:text-amber-400 mt-1">•</span>
              <span>SBI Inspiration For You</span>
            </li>
          </ul>
          <WorkCaseStudyCarousel
            images={[
              { src: '/images/work/amazon/19.png', alt: 'Explorations 1', caption: 'Prelaunch exploration designs' },
              { src: '/images/work/amazon/20.png', alt: 'Explorations 2', caption: 'Search Bar Widget Explorations, SBI Tile Ingress' },
              { src: '/images/work/amazon/21.png', alt: 'Explorations 3', caption: 'SBI Inspiration For You' },
            ]}
          />
        </section>

        {/* 7. RESEARCH */}
        <section id="research" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
            Research
          </h2>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-8 md:p-10">
            <p className="text-lg font-medium text-gray-900 dark:text-white mb-4">Beta Testing</p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              We ran beta tests to validate the template placements and discovery paths before full rollout. Without a dedicated research team, we relied on instrumentation, engagement data, and cross-functional feedback—testing where users entered the experiences, how far they scrolled, and how placement affected downstream conversion.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              <strong className="text-gray-900 dark:text-white">Testing parameters:</strong> 10,000–100,000 users per test cohort to ensure statistical significance and representative behavior across segments.
            </p>
          </div>
        </section>

        {/* 8. CHALLENGES */}
        <section id="challenges" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-12">
            Challenges
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 hover:border-amber-500/50 dark:hover:border-amber-400/50 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Working with cross-functional teams</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Aligning product, engineering, and design across a large org required clear communication, documentation, and flexible component APIs so multiple teams could ship consistently.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 hover:border-amber-500/50 dark:hover:border-amber-400/50 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Simplifying ideas</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Distilling complex discovery experiences into simple, scalable templates—without losing the richness of Inspirational Shopping and Shop By Interest—was an ongoing design challenge.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 hover:border-amber-500/50 dark:hover:border-amber-400/50 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Working with no research team</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                We relied on data, beta feedback, and cross-team input to validate decisions when a dedicated research team wasn’t available—emphasizing instrumentation and clear success metrics.
              </p>
            </div>
          </div>
        </section>

        {/* 9. CLOSING */}
        <section id="closing" className="scroll-mt-24 py-[15px] text-center">
          <p className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Thank you for your time
          </p>
        </section>
      </div>
    </article>
  );
}
