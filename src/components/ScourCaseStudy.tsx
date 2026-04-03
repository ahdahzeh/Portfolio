'use client';

import { useState } from 'react';
import BackToHomeButton from '@/components/BackToHomeButton';
import Image from 'next/image';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import SectionNav, { type SectionNavItem } from '@/components/SectionNav';
import LightboxTrigger from '@/components/LightboxTrigger';

const SECTIONS: SectionNavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'design-explorations', label: 'Design Explorations' },
  { id: 'design-system', label: 'Design System' },
  { id: 'product', label: 'Product Walkthrough' },
  { id: 'results', label: 'Results' },
  { id: 'decisions', label: 'Technical Decisions' },
];

function PhoneFrameVideo({
  src,
  label,
  cropScreenRecording = false,
}: {
  src: string;
  label: string;
  cropScreenRecording?: boolean;
}) {
  const [decodeError, setDecodeError] = useState(false);
  if (decodeError) {
    return (
      <div className="w-full aspect-[9/19.5] bg-gray-100 dark:bg-gray-900 rounded-[2rem] flex items-center justify-center">
        <p className="text-sm text-gray-500 px-4 text-center">
          This recording may use a codec your browser can&apos;t play. Try Safari or{' '}
          <a href={src} download className="underline">
            download the clip
          </a>.
        </p>
      </div>
    );
  }
  return (
    <div className="relative w-full aspect-[9/19.5] bg-white rounded-[2rem] overflow-hidden border-[6px] border-gray-900 dark:border-gray-700 shadow-xl">
      <video
        playsInline
        muted
        loop
        preload="auto"
        autoPlay
        className="absolute w-full object-cover"
        style={cropScreenRecording ? {
          inset: '0',
          width: '100%',
          height: '100%',
          objectFit: 'cover' as const,
          transform: 'scale(1.4) translateY(-10px)',
          transformOrigin: 'center center',
        } : {
          inset: '0',
          height: '100%',
        }}
        aria-label={label}
        onError={() => setDecodeError(true)}
      >
        <source src={src} type="video/mp4" />
        <source src={src} type="video/quicktime" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

interface ScourCaseStudyProps {
  title: string;
  subtitle?: string;
  roleDisplay?: string;
  timeline?: string;
  link?: string;
  videoUrl?: string;
}

export default function ScourCaseStudy({
  title = 'SCOUR',
  subtitle = 'AI Shopping Agent, Luxury & Streetwear',
  roleDisplay,
  timeline,
  link,
  videoUrl,
}: ScourCaseStudyProps) {
  return (
    <article className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <ScrollProgressBar />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-3.5">
        <BackToHomeButton className="mb-12" />

        <header className="mb-16">
          <h1 className="text-[85px] font-normal text-black dark:text-white tracking-tight mb-8 text-center leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[40px] text-black dark:text-black text-center mt-8" style={{ letterSpacing: '-2.4px' }}>{subtitle}</p>
          )}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-[20px] text-black dark:text-black mt-8 mb-8" style={{ letterSpacing: '0px' }}>
            {timeline != null && <span>Timeline: {timeline}</span>}
            {roleDisplay != null && <span>Role: {roleDisplay}</span>}
          </div>
{/* Links removed — proprietary product */}
        </header>

        {/* Hook — short, no detail overlap with Overview */}
        <p className="text-black dark:text-white text-lg leading-relaxed text-center max-w-[811px] mx-auto mb-16">
          Finding the best price on luxury and streetwear resale means checking platform after platform, one by one. I built an AI agent that does it in seconds: one search, every source, every deal scored.
        </p>

        {/* Globe landing video as hero */}
        <div className="flex justify-center mb-16">
          <div className="w-[280px]">
            <PhoneFrameVideo src="/videos/work/scour/2-globe-landing.mp4" label="Scour, Globe Landing Experience" />
          </div>
        </div>
      </div>

      <SectionNav sections={SECTIONS} />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 pt-[35px] pb-[35px] space-y-24 md:space-y-32">
        {/* OVERVIEW */}
        <section id="overview" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white mb-8">
            Overview
          </h2>
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 mb-10">
            <p className="text-lg text-black/80 dark:text-white/80 leading-relaxed">
              Scour is a mobile-first shopping agent for the secondary luxury and streetwear market, currently live as a web app, architected from day one for native iOS. It searches across 30+ resale platforms in real time, normalizes product data across sources, and surfaces the best deals using a proprietary scoring system. I designed and built the entire product solo: UX, visual system, frontend, backend, data infrastructure, and AI integration.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Search Engine</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                AI-powered search that understands natural language queries across every major resale platform. Describe what you&apos;re looking for in plain English and get ranked results from 30+ sources instantly.
              </p>
              <div className="flex justify-center mt-4">
                <div className="w-[180px]">
                  <PhoneFrameVideo src="/videos/work/scour/1-search-experience.mp4" label="Scour search experience" />
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Conversational AI</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                Beyond keyword search. Scour understands intent. Ask it to find alternatives, compare across brands, or narrow by condition and size. Natural language gets translated into structured queries across every connected source.
              </p>
              <div className="flex justify-center mt-4">
                <div className="w-[180px]">
                  <PhoneFrameVideo src="/videos/work/scour/5-conversational-ai.mp4" label="Scour conversational AI search" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM STATEMENT */}
        <section id="problem" className="scroll-mt-24">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 border-l-[3px] border-l-black dark:border-l-white p-8 md:p-12">
            <p className="text-sm font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 font-mono">
              Problem Statement
            </p>
            <p className="text-xl md:text-2xl font-semibold text-black dark:text-white leading-snug mb-6">
              Shopping the secondary luxury market means manually checking platform after platform for every single item, with no way to compare prices, verify deals, or know if you&apos;re overpaying.
            </p>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              <strong className="text-black dark:text-white">The workflow is broken:</strong> A shopper opens dozens of resale platforms in separate tabs. They compare prices manually with no historical context, no deal scoring, and no way to know if the same item is available cheaper somewhere they haven&apos;t checked. The process is slow, incomplete, and buyers routinely overpay.
            </p>
          </div>
        </section>

        {/* SOLUTION */}
        <section id="solution" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white mb-6">
            Solution
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl mb-8">
            One search bar replaces the multi-tab ritual. Scour aggregates listings from 30+ resale platforms in real time, normalizes product data across sources, and scores every deal. Three design principles: show the best deal first, make the data legible at a glance, never make the user leave the app to compare.
          </p>

          {/* Onboarding + Filter as solution walkthroughs */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-[220px]">
                  <PhoneFrameVideo src="/videos/work/scour/3-onboarding-flow.mp4" label="Scour onboarding flow" />
                </div>
              </div>
              <p className="text-sm font-semibold text-black dark:text-white">Onboarding</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Brands, sizes, budget, and style preferences configure the AI from day one.</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-[220px]">
                  <PhoneFrameVideo src="/videos/work/scour/6-filter-sheet.mp4" label="Scour filter sheet" />
                </div>
              </div>
              <p className="text-sm font-semibold text-black dark:text-white">Filter Sheet</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Bottom sheet with haptic feedback, narrow by source, price, condition, and size.</p>
            </div>
          </div>
        </section>

        {/* DESIGN EXPLORATIONS */}
        <section id="design-explorations" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white mb-4">
            Design Explorations
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-12">
            Card systems, data density, and feed architecture
          </p>

          <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl mb-12">
            The core design question was how to display product listings that carry significantly more data than a typical e-commerce card. Each item needs to communicate brand, product name, price, source count, deal score, price range, and trend direction, without overwhelming the user. I explored four distinct directions, each testing a different balance of editorial appeal vs. data density.
          </p>

          {/* Exploration A */}
          <div className="grid md:grid-cols-[1fr_260px] gap-8 md:gap-16 items-center mt-12 mb-16">
            <div className="max-w-lg">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-6">A. Editorial Cards</h3>
              <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Hero + grid layout</strong>: Lead item as a full-width editorial card with overlaid text, followed by a 2-column grid</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Minimal data</strong>: Brand, name, price, and source count only. Prioritizes visual impact over information density</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">SSense-inspired</strong>: Clean product photography with monospace pricing, editorial feel</span>
                </li>
              </ul>
            </div>
            <div>
              <PhoneFrameVideo
                src="/videos/work/scour/cards-a-editorial.mov"
                label="Card exploration A, Editorial Cards"
                cropScreenRecording
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">Landing + Onboarding</p>
            </div>
          </div>

          {/* Exploration B */}
          <div className="grid md:grid-cols-[1fr_260px] gap-8 md:gap-16 items-center mb-16">
            <div className="max-w-lg">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-6">B. Data-Forward Cards</h3>
              <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Full-width list cards</strong>: Each item gets a horizontal card showing thumbnail, brand, name, deal score, price, range, sparkline, and source count</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Data-driven density</strong>: Green/red price change indicators, circular deal score badges, price range bars</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Maximum information</strong>: Every data point visible without tapping into detail view</span>
                </li>
              </ul>
            </div>
            <div>
              <PhoneFrameVideo
                src="/videos/work/scour/cards-b-dataforward.mov"
                label="Card exploration B, Data-Forward Cards"
                cropScreenRecording
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">AI Search + Results</p>
            </div>
          </div>

          {/* Exploration C */}
          <div className="grid md:grid-cols-[1fr_260px] gap-8 md:gap-16 items-center mb-16">
            <div className="max-w-lg">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-6">C. Minimal Object</h3>
              <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Single-item focus</strong>: One large product image per card, full-width, with text below</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Section headers</strong>: &quot;Trending Now&quot; label with clean separation between content zones</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Gallery feel</strong>: Treats each product as an object to be appreciated, not just data to be scanned</span>
                </li>
              </ul>
            </div>
            <div>
              <PhoneFrameVideo
                src="/videos/work/scour/cards-c-minimal.mov"
                label="Card exploration C, Minimal Object"
                cropScreenRecording
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">Home Feed + Browse</p>
            </div>
          </div>

          {/* Exploration B+C */}
          <div className="grid md:grid-cols-[1fr_260px] gap-8 md:gap-16 items-center mb-8">
            <div className="max-w-lg">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-6">B+C v2: Carousel + Cards (Final Direction)</h3>
              <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Hybrid approach</strong>: Horizontal carousel for trending items (editorial feel) + card grid for personalized picks (data density)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Selective data</strong>: Sparklines and deal scores appear on cards where they add value, not everywhere</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Section-based feed</strong>: &quot;Trending Now&quot; and &quot;For You&quot; sections create a discovery-first experience while keeping source counts and scores accessible</span>
                </li>
              </ul>
            </div>
            <div>
              <PhoneFrameVideo
                src="/videos/work/scour/cards-bc-v2.mov"
                label="Card exploration B+C v2: Carousel + Cards"
                cropScreenRecording
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">Search + Discovery Feed</p>
            </div>
          </div>
        </section>

        {/* DESIGN SYSTEM */}
        <section id="design-system" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white mb-6">
            Design System
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl mb-12">
            The visual language sits at the intersection of two references: SSense&apos;s editorial brutalism (stark white backgrounds, restrained typography, product-as-hero photography) and StockX&apos;s financial data motifs (deal scores, sparklines, price ranges). The constraint was making these two languages feel like one product.
          </p>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 hover:border-black/30 dark:hover:border-white/30 transition-colors">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Color</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                White backgrounds, black text. Only two accent colors: <span className="font-mono text-[#00FF66]">#00FF66</span> (green, positive trend / good deal) and <span className="font-mono text-[#FF3B3B]">#FF3B3B</span> (red, negative trend / overpriced). No gradients, no brand colors competing with product photography.
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 hover:border-black/30 dark:hover:border-white/30 transition-colors">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Typography</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Monospace for all numerical data: prices, scores, percentages, source counts. Sans-serif for brand names and product titles. The split makes financial data instantly scannable while product info reads naturally.
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 hover:border-black/30 dark:hover:border-white/30 transition-colors">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Data Visualization</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Circular deal score badges, inline sparklines for price trends, and progress bars for market position. Every data point is designed to be understood in under one second.
              </p>
            </div>
          </div>

          {/* Microinteraction videos */}
          <h3 className="text-xl font-semibold text-black dark:text-white mb-6">Microinteractions</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { src: '/videos/work/scour/4-card-press-heart.mp4', label: 'Card Press + Save', desc: 'Long-press to preview, tap heart to save' },
              { src: '/videos/work/scour/7-toast-dismiss.mp4', label: 'Toast Dismiss', desc: 'Swipe-to-dismiss confirmation toasts' },
              { src: '/videos/work/scour/8-skeleton-transition.mp4', label: 'Skeleton → Content', desc: 'Shimmer loading into real results' },
              { src: '/videos/work/scour/6-filter-sheet.mp4', label: 'Filter Sheet', desc: 'Bottom sheet with haptic feedback' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-[160px]">
                    <PhoneFrameVideo src={item.src} label={item.label} />
                  </div>
                </div>
                <p className="text-sm font-semibold text-black dark:text-white">{item.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCT WALKTHROUGH */}
        <section id="product" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white mb-6">
            Product Walkthrough
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl mb-12">
            Scour is live and in active development. The MVP launched with real-time search across multiple resale platforms. Here&apos;s the full flow, from landing to purchase decision.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { src: '/videos/work/scour/3-onboarding-flow.mp4', label: '1. Onboarding', desc: 'Set brands, sizes, budget. AI personalizes from first search' },
              { src: '/videos/work/scour/5-conversational-ai.mp4', label: '2. AI Search', desc: 'Natural language queries across 30+ sources' },
              { src: '/videos/work/scour/4-card-press-heart.mp4', label: '3. Browse + Save', desc: 'Preview details, save favorites, compare prices' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-[200px]">
                    <PhoneFrameVideo src={item.src} label={item.label} />
                  </div>
                </div>
                <p className="text-sm font-semibold text-black dark:text-white">{item.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RESULTS */}
        <section id="results" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white mb-6">
            Results
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl mb-12">
            Live and deployed, currently web, native iOS via Capacitor is next. The numbers below reflect the current state of the product.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '30+', label: 'Sources', sublabel: 'Major resale platforms + marketplace APIs' },
              { value: '0–100', label: 'Deal Score', sublabel: 'Proprietary scoring on every listing' },
              { value: '<5s', label: 'Search Time', sublabel: 'Across all sources simultaneously' },
              { value: '1', label: 'Person', sublabel: 'Design, frontend, backend, infra' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 text-center">
                <p className="text-4xl md:text-5xl font-bold tabular-nums font-mono text-black dark:text-white">{stat.value}</p>
                <p className="text-base font-semibold text-black dark:text-white mt-2">{stat.label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TECHNICAL DECISIONS */}
        <section id="decisions" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white mb-6">
            Technical Decisions
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 mb-10">
            {[
              { title: 'Frontend', items: 'Next.js, TypeScript, Tailwind CSS, Vercel AI SDK, Three.js' },
              { title: 'Backend & Data', items: 'Supabase, custom data pipeline, Claude API (AI search), Stripe' },
              { title: 'Deployment', items: 'Vercel (hosting + edge functions), mobile-first web → native iOS via Capacitor' },
              { title: 'Design', items: 'Figma (explorations + system), Claude Code (rapid prototyping), HTML/CSS prototypes' },
            ].map((stack) => (
              <div key={stack.title} className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8">
                <p className="text-lg font-semibold text-black dark:text-white mb-2">{stack.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stack.items}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 hover:border-black/30 dark:hover:border-white/30 transition-colors">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Data density vs. editorial feel</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Each listing carries 7+ data points. The design explorations were about finding the threshold where information becomes noise. The hybrid carousel+cards approach lets the feed breathe while keeping data accessible.
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 hover:border-black/30 dark:hover:border-white/30 transition-colors">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Normalizing cross-platform data</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Every platform structures product data differently. The same item listed on two different marketplaces has completely different metadata schemas. Reliable product matching across 30+ sources required building a custom entity resolution layer.
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 hover:border-black/30 dark:hover:border-white/30 transition-colors">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Designing and building alone</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                No design critique, no code review, no PM to push back. Prototyping multiple directions (A, B, C, B+C) before committing was how I compensated for the missing feedback loop.
              </p>
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className="scroll-mt-24 py-[15px]">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-8 md:p-12 text-center">
            <p className="text-lg text-black/80 dark:text-white/80 leading-relaxed max-w-3xl mx-auto">
              Scour started as a personal frustration and became a full product: design system, data infrastructure, AI search, and a live app architected for native iOS. The biggest lesson: when you own every layer, the design decisions and the engineering decisions become the same conversation. Next: shipping to the App Store and scaling the platform.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
