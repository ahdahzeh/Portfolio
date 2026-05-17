'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import BackToHomeButton from '@/components/BackToHomeButton';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import SectionNav, { type SectionNavItem } from '@/components/SectionNav';

const WTVPlayer = dynamic(
  () => import('@/remotion/WTVPlayer').then((m) => m.WTVPlayer),
  { ssr: false, loading: () => <div className="w-full aspect-[9/19.5] bg-stone-100 rounded-[2rem] animate-pulse" /> }
);

// WTV brand palette — mirrors WTVTheme.swift
const WTV = {
  accent:  '#E85D3A', // terracotta
  green:   '#2D8B4E',
  yellow:  '#D4A017',
  red:     '#C43333',
  bgWarm:  '#FAFAF8',
  subway:  {
    ace:   '#0039A6',
    bdfm:  '#FF6319',
    g:     '#6CBE45',
    jz:    '#996633',
    l:     '#A7A9AC',
    nqrw:  '#FCCC0A',
    '123': '#EE352E',
    '456': '#00933C',
    '7':   '#B933AD',
  },
} as const;

const SECTIONS: SectionNavItem[] = [
  { id: 'overview',    label: 'Overview'    },
  { id: 'problem',     label: 'Problem'     },
  { id: 'design',      label: 'Design System' },
  { id: 'features',    label: 'Features'    },
  { id: 'onboarding',  label: 'Onboarding'  },
  { id: 'technical',   label: 'Technical'   },
  { id: 'future',      label: 'Future Plans' },
];

// Phone frame — renders a static screenshot OR a looping video
function PhoneFrameVideo({
  src,
  label,
  cropScreenRecording = false,
  poster,
}: {
  src: string;
  label: string;
  cropScreenRecording?: boolean;
  poster?: string;
}) {
  const [decodeError, setDecodeError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isImage = /\.(png|jpe?g|gif|webp)$/i.test(src);

  useEffect(() => {
    if (isImage) return;
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [isImage]);

  const frameStyle: React.CSSProperties = {
    border: '6px solid #1A1A1A',
    background: WTV.bgWarm,
  };

  const mediaStyle: React.CSSProperties = cropScreenRecording
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.4) translateY(-10px)', transformOrigin: 'center center' }
    : { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' };

  // Static screenshot path
  if (isImage) {
    return (
      <div className="relative w-full aspect-[9/19.5] rounded-[2rem] overflow-hidden shadow-xl" style={frameStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={label} style={mediaStyle} />
      </div>
    );
  }

  if (decodeError) {
    return (
      <div className="w-full aspect-[9/19.5] bg-gray-100 dark:bg-gray-900 rounded-[2rem] flex items-center justify-center">
        <p className="text-sm text-gray-500 px-4 text-center">
          This recording may use a codec your browser can&apos;t play. Try Safari or{' '}
          <a href={src} download className="underline">download the clip</a>.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[9/19.5] rounded-[2rem] overflow-hidden shadow-xl" style={frameStyle}>
      <video
        ref={videoRef}
        playsInline
        muted
        loop
        preload="none"
        autoPlay
        poster={poster}
        style={mediaStyle}
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

// Phone frame wrapping a Remotion composition
function RemotionFrame({ scene }: { scene: string }) {
  return (
    <div
      className="relative w-full aspect-[9/19.5] rounded-[2rem] overflow-hidden shadow-xl"
      style={{ border: '6px solid #1A1A1A', background: '#FAFAF8' }}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <WTVPlayer scene={scene as any} />
    </div>
  );
}

// Subway line badge
function SubwayBadge({ line }: { line: string }) {
  const colorMap: Record<string, string> = {
    A: WTV.subway.ace, C: WTV.subway.ace, E: WTV.subway.ace,
    B: WTV.subway.bdfm, D: WTV.subway.bdfm, F: WTV.subway.bdfm, M: WTV.subway.bdfm,
    G: WTV.subway.g,
    J: WTV.subway.jz, Z: WTV.subway.jz,
    L: WTV.subway.l,
    N: WTV.subway.nqrw, Q: WTV.subway.nqrw, R: WTV.subway.nqrw, W: WTV.subway.nqrw,
    '1': WTV.subway['123'], '2': WTV.subway['123'], '3': WTV.subway['123'],
    '4': WTV.subway['456'], '5': WTV.subway['456'], '6': WTV.subway['456'],
    '7': WTV.subway['7'],
  };
  const bg = colorMap[line] ?? '#808183';
  const textColor = ['N','Q','R','W'].includes(line) ? '#000' : '#fff';
  return (
    <span
      className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold font-mono"
      style={{ background: bg, color: textColor }}
    >
      {line}
    </span>
  );
}

interface WTVCaseStudyProps {
  title: string;
  subtitle?: string;
  roleDisplay?: string;
  timeline?: string;
}

export default function WTVCaseStudy({
  title = 'WTV',
  subtitle = 'NYC Block Intelligence, Native iOS',
  roleDisplay,
  timeline,
}: WTVCaseStudyProps) {
  return (
    <article className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <ScrollProgressBar />

      {/* ─── HEADER ─── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-3.5">
        <BackToHomeButton className="mb-12" />

        <header className="mb-16">
          {/* Title with terracotta accent letter */}
          <h1 className="text-[85px] font-normal tracking-tight mb-8 text-center leading-tight">
            <span style={{ color: WTV.accent }}>W</span>TV
          </h1>

          {subtitle && (
            <p className="text-[40px] text-black dark:text-white text-center mt-8" style={{ letterSpacing: '-2.4px' }}>
              {subtitle}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-[20px] text-black dark:text-white mt-8 mb-8">
            {timeline   && <span>Timeline: {timeline}</span>}
            {roleDisplay && <span>Role: {roleDisplay}</span>}
            <span>Platform: Native iOS (SwiftUI)</span>
          </div>
        </header>

        {/* Hook */}
        <p className="text-black dark:text-white text-lg leading-relaxed text-center max-w-[811px] mx-auto mb-16">
          New York City runs on local knowledge. WTV is a native iOS app that puts a live block-level intelligence layer on top of the city: what&apos;s happening, what to eat, where to go, and what to avoid. One app, every layer of the block.
        </p>

        {/* Hero screenshot */}
        <div className="flex justify-center mb-16">
          <div className="w-[280px]">
            <PhoneFrameVideo src="/videos/work/wtv/feed.mp4" label="WTV feed overview" />
          </div>
        </div>
      </div>

      <SectionNav sections={SECTIONS} />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 pt-[35px] pb-[35px] space-y-24 md:space-y-32">

        {/* ─── OVERVIEW ─── */}
        <section id="overview" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white mb-8">
            Overview
          </h2>
          <div
            className="rounded-2xl p-6 md:p-8 mb-10"
            style={{ border: `1px solid rgba(232,93,58,0.2)`, background: 'rgba(232,93,58,0.04)' }}
          >
            <p className="text-lg text-black/80 dark:text-white/80 leading-relaxed">
              WTV is a personal project I designed and built from scratch, a native iOS app built entirely in SwiftUI. It gives New Yorkers a single surface for block-level city intelligence: curated spots, restaurant grades, live events, transit crowding, traffic incidents, rat activity reports, and pothole conditions. The design language sits between a neighborhood newspaper and a real-time data dashboard. I handled every layer: product strategy, UX, design system, and all SwiftUI engineering.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: 'Block Report',
                desc: 'A curated intelligence card for your block: vibe summary, events, food grades, transit status, and street conditions. Personalized to your location and interests.',
                scene: 'block-report',
              },
              {
                title: 'Live Feed',
                desc:  'A swipeable home feed of spots, eats, events, and transit — filtered by your neighborhood and categorized with haptic-driven card interactions.',
                scene: 'live-feed',
              },
              {
                title: 'Map Layer',
                desc:  'An interactive SwiftUI Map with a sliding bottom tray: spot, food, event, and transit carousels with live annotations and direct detail sheets.',
                scene: 'map-layer',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8"
              >
                <h3 className="text-lg font-semibold text-black dark:text-white mb-3">{card.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4 text-sm">{card.desc}</p>
                <div className="flex justify-center mt-4">
                  <div className="w-[160px]">
                    <RemotionFrame scene={card.scene} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── PROBLEM ─── */}
        <section id="problem" className="scroll-mt-24">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-8 md:p-12">
            <p className="text-sm font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 font-mono">
              Problem Statement
            </p>
            <p className="text-xl md:text-2xl font-semibold text-black dark:text-white leading-snug mb-6">
              New York City produces more local data than any city on earth. None of it is in one place.
            </p>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              <strong className="text-black dark:text-white">The fragmentation is exhausting:</strong> You check Google Maps for spots, Yelp for grades, Twitter/X for incidents, the MTA app for transit, NYC Open Data for permit activity — and none of it talks to each other. There&apos;s no layer that puts your block in context.
            </p>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              WTV is that layer. One app, every signal, organized by block. Whether you&apos;re deciding where to eat tonight, checking if your train is packed, or figuring out why there&apos;s construction noise at 7am, WTV has the answer.
            </p>
          </div>
        </section>

        {/* ─── DESIGN SYSTEM ─── */}
        <section id="design" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white mb-6">
            Design System
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl mb-12">
            The WTV design system draws from two references: the typography and texture of a neighborhood broadsheet, and the data density of a real-time transit board. The visual accent is terracotta — warm, NYC, grounded. Status colors follow clear signal logic: green is safe, yellow is caution, red is alert.
          </p>

          {/* Color palette */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { name: 'Terracotta',  hex: WTV.accent,  role: 'Primary accent, CTAs, active states' },
              { name: 'Forest',      hex: WTV.green,   role: 'Good / safe / Grade A' },
              { name: 'Amber',       hex: WTV.yellow,  role: 'Caution / Grade B / moderate' },
              { name: 'Alert Red',   hex: WTV.red,     role: 'Danger / Grade C / high activity' },
            ].map((c) => (
              <div
                key={c.name}
                className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden"
              >
                <div className="h-14" style={{ background: c.hex }} />
                <div className="p-4">
                  <p className="text-sm font-semibold text-black dark:text-white">{c.name}</p>
                  <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-0.5">{c.hex}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 leading-tight">{c.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Typography + MTA colors */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 hover:border-black/30 dark:hover:border-white/30 transition-colors">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Typography</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Three-tier type system: <span className="font-serif font-semibold text-black dark:text-white">Serif</span> for headings and editorial labels (New York feel), <span className="text-black dark:text-white">Sans-serif</span> for body and UI text, and <span className="font-mono text-black dark:text-white">Monospace</span> for all data: ratings, walk times, delay minutes, and status codes.
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 hover:border-black/30 dark:hover:border-white/30 transition-colors">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">MTA Subway Colors</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-3">
                Official MTA line colors, pixel-perfect, used for inline subway badges throughout the app.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['1','2','3','4','5','6','7','A','C','E','B','D','F','M','G','J','Z','L','N','Q','R','W'].map((line) => (
                  <SubwayBadge key={line} line={line} />
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 hover:border-black/30 dark:hover:border-white/30 transition-colors">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Haptic Rhythm</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Every interaction has a corresponding haptic weight. Light for navigation and chip selection, medium for card taps and confirmations, heavy for long-press previews and alerts. The feedback system mirrors the visual hierarchy, giving the app tactile depth.
              </p>
            </div>
          </div>

          {/* Card anatomy */}
          <h3 className="text-xl font-semibold text-black dark:text-white mb-6">Card System</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { scene: 'spot-card',    label: 'Spot Card',    desc: 'Rating, category badge, vibe tags' },
              { scene: 'food-card',    label: 'Food Card',    desc: 'DOH grade, cuisine, neighborhood' },
              { scene: 'event-card',   label: 'Event Card',   desc: 'Type, time, price, location' },
              { scene: 'transit-card', label: 'Transit Card', desc: 'Lines, crowding level, walk time' },
            ].map((card) => (
              <div key={card.label} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-[160px]">
                    <RemotionFrame scene={card.scene} />
                  </div>
                </div>
                <p className="text-sm font-semibold text-black dark:text-white">{card.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FEATURES ─── */}
        <section id="features" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white mb-6">
            Features
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl mb-12">
            Five tabs, each purpose-built. Every screen is fully functional, every interaction has feedback, and every data layer is sourced from real NYC open data and mock providers that mirror live API shapes.
          </p>

          {/* Feed */}
          <div className="grid md:grid-cols-[1fr_180px] gap-8 md:gap-16 items-center mb-16">
            <div className="max-w-lg">
              <p className="text-sm font-mono uppercase tracking-wider mb-3" style={{ color: WTV.accent }}>Tab 01</p>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-6">Home Feed</h3>
              <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Personalized greeting:</strong> Time-aware (morning/afternoon/evening), shows your saved name or neighborhood</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Layered content:</strong> Spots, food, events, transit, traffic, rat activity, and potholes, all in one feed</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Layer toggles:</strong> Quickly filter the feed by content type using animated chip controls</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Long press to preview:</strong> Medium detent sheet opens on hold, full sheet on tap, with haptic feedback for each</span>
                </li>
              </ul>
            </div>
            <div>
              <RemotionFrame scene="live-feed" />
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">Home Feed — Personalized, Layered</p>
            </div>
          </div>

          {/* Map */}
          <div className="grid md:grid-cols-[1fr_180px] gap-8 md:gap-16 items-center mb-16">
            <div className="max-w-lg">
              <p className="text-sm font-mono uppercase tracking-wider mb-3" style={{ color: WTV.accent }}>Tab 02</p>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-6">Map + Tray</h3>
              <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Overlay tray architecture:</strong> The bottom tray uses <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded font-mono">.overlay(alignment: .bottom)</code>, not a sheet, so the tab bar always remains accessible</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">UnevenRoundedRectangle:</strong> iOS 16 API used to give the tray top-only corner radius, eliminating the bottom gap between tray and tab bar</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Category carousels:</strong> Spots, Eats, Events, Transit — snap-scrolling horizontal carousels in the tray, each card opens a full detail sheet</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Search from map:</strong> Tapping the search bar opens the full SearchView as a sheet over the map</span>
                </li>
              </ul>
            </div>
            <div>
              <RemotionFrame scene="map-layer" />
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">Map — Tray, Annotations, Carousels</p>
            </div>
          </div>

          {/* Block Report */}
          <div className="grid md:grid-cols-[1fr_180px] gap-8 md:gap-16 items-center mb-16">
            <div className="max-w-lg">
              <p className="text-sm font-mono uppercase tracking-wider mb-3" style={{ color: WTV.accent }}>Tab 03</p>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-6">Block Report</h3>
              <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">WTV Says:</strong> A dynamically generated summary card that writes itself based on your block data, time of day, and saved interests. No hardcoded copy.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Change block:</strong> MKLocalSearch-powered address picker finds the nearest matching block report for any NYC address</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Data layers:</strong> Events, food grades, transit (with MTA line badges), rat activity level, pothole count, and traffic conditions — all in one card stack</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Vibe score:</strong> Composite signal that weights activity, safety, and transit data into a single number</span>
                </li>
              </ul>
            </div>
            <div>
              <RemotionFrame scene="block-report" />
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">Block Report — Personalized, Contextual</p>
            </div>
          </div>

          {/* Search */}
          <div className="grid md:grid-cols-[1fr_180px] gap-8 md:gap-16 items-center">
            <div className="max-w-lg">
              <p className="text-sm font-mono uppercase tracking-wider mb-3" style={{ color: WTV.accent }}>Tab 04</p>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-6">Search</h3>
              <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Cross-entity search:</strong> One query runs across spots, restaurants, events, and transit — filtered by category chips</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Intent-aware matching:</strong> Search by name, neighborhood, cuisine, vibe tag, event type, or subway line</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Long press to preview:</strong> Medium-detent sheet preview on hold, full detail sheet on tap — same pattern as the Feed</span>
                </li>
              </ul>
            </div>
            <div>
              <RemotionFrame scene="search" />
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">Search — Intent-Driven, Cross-Entity</p>
            </div>
          </div>
        </section>

        {/* ─── ONBOARDING ─── */}
        <section id="onboarding" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white mb-6">
            Onboarding
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl mb-12">
            Personalization doesn&apos;t happen by accident. A 5-step onboarding flow collects your name, location, age range, and interests before you ever touch the main app. That data flows directly into the Block Report summary, Feed greeting, and Map defaults. All stored via <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded font-mono">@AppStorage</code>, persisted across launches.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 mb-10">
            {[
              { step: '01', title: 'Welcome',    desc: 'WTV branding, tagline, what you&apos;re signing up for' },
              { step: '02', title: 'Name',       desc: 'Optional name for personalized greetings' },
              { step: '03', title: 'Location',   desc: 'MKLocalSearch inline — sets your default block' },
              { step: '04', title: 'Age Range',  desc: '18–24, 25–34, 35–44, 45+ pill selection' },
              { step: '05', title: 'Interests',  desc: 'Food, Nightlife, Arts, Music, Parks and more' },
            ].map((s) => (
              <div key={s.step}
                className="rounded-2xl border border-black/10 dark:border-white/10 p-5 hover:border-black/30 dark:hover:border-white/30 transition-colors"
              >
                <p className="text-2xl font-bold font-mono mb-2" style={{ color: WTV.accent }}>{s.step}</p>
                <p className="text-sm font-semibold text-black dark:text-white mb-1">{s.title}</p>
                <p
                  className="text-xs text-gray-500 dark:text-gray-400 leading-tight"
                  dangerouslySetInnerHTML={{ __html: s.desc }}
                />
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-[220px]">
                  <PhoneFrameVideo src="/videos/work/wtv/onboarding.mp4" label="WTV Onboarding Flow" />
                </div>
              </div>
              <p className="text-sm font-semibold text-black dark:text-white">5-Step Onboarding</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Spring transitions between steps, inline MKLocalSearch, interest grid with press states
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-[220px]">
                  <PhoneFrameVideo src="/videos/work/wtv/block-change.mp4" label="WTV Block Location Change" />
                </div>
              </div>
              <p className="text-sm font-semibold text-black dark:text-white">Block Picker</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Change your active block at any time. Address search uses geo-matching to find the nearest block report.
              </p>
            </div>
          </div>
        </section>

        {/* ─── TECHNICAL ─── */}
        <section id="technical" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white mb-6">
            Technical Breakdown
          </h2>

          {/* Stack */}
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 mb-10">
            {[
              { title: 'UI Framework',    items: 'SwiftUI (iOS 16+), @StateObject, @AppStorage, @FocusState' },
              { title: 'Map Layer',       items: 'MapKit (SwiftUI Map API), MKLocalSearch, MKCoordinateRegion, custom @MapContentBuilder annotations' },
              { title: 'Navigation',      items: 'Custom tab bar in ContentView ZStack, modal sheets with PresentationDetent, overlay tray (not sheet) for map' },
              { title: 'Data',           items: 'NYC Open Data (Socrata) for events, restaurant inspections, 311 potholes, and rodent activity. Swift actor-based NYCDataService with 1-hour in-memory cache. AppStorage for user preferences.' },
            ].map((s) => (
              <div key={s.title} className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8">
                <p className="text-lg font-semibold text-black dark:text-white mb-2">{s.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{s.items}</p>
              </div>
            ))}
          </div>

          {/* Key decisions */}
          <h3 className="text-xl font-semibold text-black dark:text-white mb-6">Key Engineering Decisions</h3>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: 'Overlay tray, not a sheet',
                body: 'Using .sheet(isPresented: .constant(true)) renders the tray at the window level, above the tab bar. Switching to .overlay(alignment: .bottom) keeps the tray inside MapView\'s bounds so ContentView\'s ZStack tab bar renders on top — no workarounds needed.',
              },
              {
                title: 'UnevenRoundedRectangle',
                body: 'The map tray had a 1-2px gap between its rounded bottom corners and the tab bar due to anti-aliasing. UnevenRoundedRectangle (iOS 16+) clips the tray with topLeadingRadius: 20 and zero bottom radii, eliminating the gap at the geometry level.',
              },
              {
                title: 'Dynamic WTV Says generation',
                body: 'The Block Report summary could have been a hardcoded string. Instead, personalizedSummary(for:) generates it at runtime using the user\'s saved neighborhood, interests, time of day, and live block data — so it reads differently every session.',
              },
              {
                title: 'ButtonStyle for tray cards',
                body: 'SwiftUI scroll views eat TapGesture recognizers inside horizontal scrollers. Wrapping each carousel card in a Button with a custom ButtonStyle (TrayCardPressStyle) routes touches correctly through the scroll gesture recognizer without conflicting with drag.',
              },
              {
                title: 'Single .sheet() anchor',
                body: 'Having two .sheet() modifiers on the same parent view causes SwiftUI to only present one. Lifting selectedDetail as a @Binding into MapBottomTray and placing the single .sheet(item:) inside the tray\'s body resolved silent non-presentation bugs.',
              },
              {
                title: 'Euclidean geo-matching',
                body: 'The block picker stores the nearest BlockReport ID using a sqrt-free distance comparison across known block lat/lon coordinates. No CLLocationManager required — fast, offline, deterministic.',
              },
            ].map((d) => (
              <div
                key={d.title}
                className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 hover:border-black/30 dark:hover:border-white/30 transition-colors"
              >
                <h3 className="text-base font-semibold text-black dark:text-white mb-3">{d.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FUTURE PLANS ─── */}
        <section id="future" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white mb-6">
            Future Plans
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl mb-10">
            WTV is a week-old live app that I&apos;m actively using every day in NYC. Here&apos;s what&apos;s coming next.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {[
              { tag: 'Live Data',     title: 'MTA + Transit Real-Time',     body: 'GTFS-RT integration for real subway crowding, delay minutes, and service alerts by line. The transit layer currently uses interpolated data — live feeds are next.' },
              { tag: 'Social',        title: 'Crowd Reports',               body: 'User-submitted block updates: "It\'s packed right now", "Smells like something died on Halsey". Layered on top of official data as a community signal.' },
              { tag: 'Intelligence',  title: 'WTV AI Layer',                body: 'A Claude-powered natural language interface for the Block Report. Ask "what\'s good for a night out in Bed-Stuy tonight?" and get a real answer from real data.' },
              { tag: 'Distribution', title: 'App Store Submission',        body: 'On TestFlight now. App Store submission is next — assets, review guidelines, and privacy nutrition labels are in progress.' },
              { tag: 'Expansion',    title: 'Saved Tab',                   body: 'Bookmark spots, events, and restaurants. View them offline, get reminders for upcoming saved events, and share lists with friends.' },
              { tag: 'Polish',       title: 'Animations + Transitions',    body: 'Matched geometry for tab transitions, skeleton loading states for live API fetches, and pull-to-refresh with a custom WTV branded animation.' },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 hover:border-black/30 dark:hover:border-white/30 transition-colors"
              >
                <p
                  className="text-xs font-mono font-semibold uppercase tracking-wider mb-2"
                  style={{ color: WTV.accent }}
                >
                  {item.tag}
                </p>
                <h3 className="text-base font-semibold text-black dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '5',      label: 'Tabs',           sublabel: 'Feed, Map, Block, Search, Saved' },
              { value: '7+',     label: 'Data Layers',    sublabel: 'Spots, food, events, transit, traffic, rats, potholes' },
              { value: '100%',   label: 'SwiftUI',        sublabel: 'Zero UIKit, native all the way down' },
              { value: '1',      label: 'Person',         sublabel: 'Design, SwiftUI, data architecture' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 text-center">
                <p className="text-4xl md:text-5xl font-bold tabular-nums font-mono" style={{ color: WTV.accent }}>{stat.value}</p>
                <p className="text-base font-semibold text-black dark:text-white mt-2">{stat.label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CLOSING ─── */}
        <section className="scroll-mt-24 py-[15px]">
          <div
            className="rounded-2xl p-8 md:p-12 text-center"
            style={{ border: `1px solid rgba(232,93,58,0.2)`, background: 'rgba(232,93,58,0.04)' }}
          >
            <p className="text-lg text-black/80 dark:text-white/80 leading-relaxed max-w-3xl mx-auto">
              WTV started as a personal question: why is there no single app that tells me what&apos;s actually happening on my block? A week of building in Swift later, there is — pulling live data from NYC Open Data, DOH inspections, 311, and rodent reports in real time. The hardest parts weren&apos;t the features, they were the architecture decisions that let all five tabs coexist without stepping on each other. Next: MTA GTFS-RT, App Store submission, and crowd reports.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
