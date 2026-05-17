'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import BackToHomeButton from '@/components/BackToHomeButton';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import SectionNav, { type SectionNavItem } from '@/components/SectionNav';
import ScrollReveal from '@/components/ScrollReveal';

const SECTIONS: SectionNavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'context', label: 'Context' },
  { id: 'design-system', label: 'Design System' },
  { id: 'morton-girl', label: 'Morton Girl' },
  { id: 'prototype', label: 'Prototype' },
  { id: 'pages', label: 'Pages' },
  { id: 'reflection', label: 'Reflection' },
];

const FONT_STYLES = `
  @font-face {
    font-family: 'Alkaline Heavy';
    src: url('/fonts/AlkalineHeavy.otf') format('opentype');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'FatFrank';
    src: url('/fonts/FatFrank.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Haffer TRIAL';
    src: url('/fonts/HafferTRIAL-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  [data-scroll-reveal] {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  [data-scroll-reveal][data-revealed='true'] {
    opacity: 1;
    transform: translateY(0);
  }
`;

function BrowserFrame({
  children,
  url,
  caption,
}: {
  children: React.ReactNode;
  url?: string;
  caption?: string;
}) {
  return (
    <div>
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid #E5E7EB', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
      >
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ background: '#F3F4F6', borderBottom: '1px solid #E5E7EB' }}
        >
          <div className="flex gap-1.5 shrink-0">
            <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
          </div>
          {url && (
            <div
              className="flex-1 min-w-0 rounded-md px-3 py-1 text-xs truncate"
              style={{ background: '#fff', border: '1px solid #E5E7EB', color: '#9CA3AF' }}
            >
              {url}
            </div>
          )}
        </div>
        <div className="w-full bg-white overflow-hidden">{children}</div>
      </div>
      {caption && (
        <p className="text-xs mt-3" style={{ color: '#9CA3AF' }}>
          {caption}
        </p>
      )}
    </div>
  );
}

function PonderingPose() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', top: '31.72%', right: '12.35%', bottom: '5.16%', left: '23.07%' }}>
        <img src="/images/work/morton-salt/girl/ponder-body.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', left: '8.1%', top: '4.25%', width: '74.76%', height: '43.31%' }}>
        <div style={{ position: 'absolute', inset: 0, transform: 'scaleX(-1)' }}>
          <div style={{ position: 'absolute', top: '3.55%', right: '30.29%', bottom: '54.12%', left: '31.4%' }}>
            <div style={{ width: '100%', height: '100%', transform: 'scaleX(-1)' }}>
              <img src="/images/work/morton-salt/girl/ponder-head.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
            </div>
          </div>
          <div style={{ position: 'absolute', top: '34.44%', right: '24.02%', bottom: '12.89%', left: '24.97%' }}>
            <div style={{ width: '100%', height: '100%', transform: 'scaleX(-1)' }}>
              <img src="/images/work/morton-salt/girl/ponder-arms.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BinocularsPose() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', top: '15.68%', right: '32.41%', bottom: '70.9%', left: '45.94%' }}>
        <img src="/images/work/morton-salt/girl/search-backarm.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', top: '21.44%', right: '12.35%', bottom: '5.16%', left: '23.07%' }}>
        <img src="/images/work/morton-salt/girl/search-body.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', top: '5.8%', right: '42.31%', bottom: '75.94%', left: '29.23%' }}>
        <img src="/images/work/morton-salt/girl/search-head.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', top: '14.49%', right: '28.73%', bottom: '79.78%', left: '46.05%' }}>
        <img src="/images/work/morton-salt/girl/search-binoculars.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', top: '14.31%', right: '44.67%', bottom: '77.51%', left: '49.61%' }}>
        <img src="/images/work/morton-salt/girl/search-hand.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', top: '21.16%', right: '45.89%', bottom: '65.09%', left: '28.56%' }}>
        <img src="/images/work/morton-salt/girl/search-frontarm.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
    </div>
  );
}

function ReadingPose() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', top: '36.01%', right: '-6.05%', bottom: '-23.69%', left: '16.35%' }}>
        <img src="/images/work/morton-salt/girl/reading-body.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', top: '21.85%', right: '13.16%', bottom: '47.83%', left: '13.92%' }}>
        <img src="/images/work/morton-salt/girl/reading-book1.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', top: '23.63%', right: '21.78%', bottom: '49.05%', left: '15.6%' }}>
        <img src="/images/work/morton-salt/girl/reading-book2.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', top: '23.37%', right: '21.34%', bottom: '48.83%', left: '15.29%' }}>
        <img src="/images/work/morton-salt/girl/reading-book3.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ position: 'absolute', top: '0%', right: '32.15%', bottom: '74.53%', left: '28.06%' }}>
        <img src="/images/work/morton-salt/girl/reading-head.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
    </div>
  );
}

const POSE_LABELS = ['Pondering', 'Searching', 'Reading'];
const POSE_DESCS = [
  'Product pages, where the girl guides users to the right salt substitute',
  'B2B and Food Service, where she helps distributors locate products',
  'Resource Center, where she points visitors to guides, articles and tools',
];
const CYCLE_MS = 3500;

function MortonGirlCycler() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % 3);
    }, CYCLE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const poses = [
    <PonderingPose key="ponder" />,
    <BinocularsPose key="bino" />,
    <ReadingPose key="reading" />,
  ];

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ width: 280, height: 420, background: '#F7F3E8' }}
      >
        {poses.map((pose, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: active === i ? 1 : 0,
              transition: 'opacity 0.7s ease-in-out',
              pointerEvents: 'none',
            }}
          >
            {pose}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        {POSE_LABELS.map((label, i) => (
          <button
            key={label}
            onClick={() => {
              setActive(i);
              if (timerRef.current) clearInterval(timerRef.current);
              timerRef.current = setInterval(() => setActive(prev => (prev + 1) % 3), CYCLE_MS);
            }}
            className="flex flex-col items-center gap-1 cursor-pointer"
          >
            <div
              className="h-1 w-12 rounded-full transition-all duration-300"
              style={{ background: active === i ? '#0034BA' : '#D1D5DB' }}
            />
            <span
              className="text-xs font-medium transition-colors"
              style={{ color: active === i ? '#0034BA' : '#9CA3AF' }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>

      <p
        className="text-sm text-center max-w-xs"
        style={{ color: '#6B7280' }}
        key={active}
      >
        {POSE_DESCS[active]}
      </p>
    </div>
  );
}

function PrototypeEmbed() {
  const protoUrl =
    'https://embed.figma.com/proto/tIUdpxjNDnoI04JftOVJOs/Morton-Salt-Wb-Redesign' +
    '?node-id=1-5256&scaling=scale-down-width&embed-host=ahdahzeh&hide-ui=1&hotspot-hints=0' +
    '&starting-point-node-id=1-5256';

  return (
    <BrowserFrame url="mortonssalt.com" caption="Navigate between pages by clicking through the prototype">
      <div style={{ height: 680 }}>
        <iframe
          src={protoUrl}
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          allowFullScreen
          title="Morton Salt Website Redesign Prototype"
        />
      </div>
    </BrowserFrame>
  );
}

export default function MortonSaltCaseStudy() {
  return (
    <article className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <style>{FONT_STYLES}</style>
      <ScrollProgressBar />
      <SectionNav sections={SECTIONS} />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-3.5">
        <BackToHomeButton className="mb-12" />

        {/* HERO */}
        <header className="mb-20">
          <h1
            className="font-normal text-black dark:text-white tracking-tight mb-6 text-center leading-tight"
            style={{ fontSize: 'clamp(52px, 8vw, 85px)', letterSpacing: '-2px' }}
          >
            Morton Salt
          </h1>
          <p
            className="text-center mt-4"
            style={{ fontSize: 36, letterSpacing: '-1.6px', color: '#00053E' }}
          >
            Website Redesign
          </p>
          <div
            className="flex flex-wrap justify-center gap-6 md:gap-10 mt-8 mb-12"
            style={{ fontSize: 18, color: '#374151' }}
          >
            <span>Agency: Cerebral</span>
            <span>Role: Product Designer</span>
            <span>February 2026</span>
          </div>

          <BrowserFrame url="mortonssalt.com" caption="Homepage, 6,400px full-page layout">
            <div style={{ height: 520, overflow: 'hidden' }}>
              <Image
                src="/images/work/morton-salt/pages/homepage.png"
                alt="Morton Salt homepage redesign"
                width={922}
                height={4096}
                className="w-full h-auto"
                style={{ display: 'block', objectPosition: 'top' }}
                priority
              />
            </div>
          </BrowserFrame>
        </header>

        {/* OVERVIEW */}
        <section id="overview" className="mb-24 scroll-mt-24">
          <ScrollReveal>
            <div className="max-w-[720px] mx-auto">
              <p className="text-lg leading-relaxed mb-6" style={{ color: '#374151' }}>
                Morton Salt's site before this project was a flat product catalogue. No brand
                expression, no visual personality, and an information architecture built for one
                type of buyer when the business actually serves two very different ones: home cooks
                and commercial food manufacturers. Cerebral brought me on in February 2026
                to rebuild it.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: '#374151' }}>
                Seven page templates total, spanning consumer product pages, a salt substitution
                guide, recipe content, and dedicated funnels for food service distributors and food
                manufacturers. The Morton Girl, one of the most recognized mascots in American
                consumer goods, runs through all of it in three distinct poses built as rigged
                Figma components for Smart Animate transitions.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-3 gap-6 mt-16 max-w-[720px] mx-auto">
            {[
              { value: '7', label: 'Page templates' },
              { value: '3', label: 'Morton Girl poses' },
              { value: '2', label: 'Audience funnels' },
            ].map(({ value, label }, i) => (
              <ScrollReveal key={label} delay={i * 80}>
                <div className="text-center py-8 rounded-2xl" style={{ background: '#F9FAFB' }}>
                  <div
                    className="text-5xl font-light mb-2"
                    style={{ color: '#00053E', letterSpacing: '-2px' }}
                  >
                    {value}
                  </div>
                  <div className="text-sm" style={{ color: '#6B7280' }}>
                    {label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* CONTEXT */}
        <section id="context" className="mb-24 scroll-mt-24">
          <ScrollReveal>
            <h2
              className="font-normal mb-4"
              style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-1.5px', color: '#00053E' }}
            >
              Why It Needed a Full Overhaul
            </h2>
            <p className="text-lg max-w-[640px] mb-12" style={{ color: '#6B7280' }}>
              Four specific gaps in the old site drove the scope of this redesign. Each one had a
              direct business cost.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              {
                kpi: 'Audience segmentation',
                before:
                  'Consumer and B2B buyers shared the same navigation and landing pages, creating confusion for both.',
                after:
                  'Separate funnels for food service and food manufacturing, each with its own landing page and product hierarchy.',
                metric: '2 distinct audience paths',
              },
              {
                kpi: 'Product discovery',
                before:
                  'Flat product grid with no path to related content. Buyers had no way to compare salts or find substitution guidance.',
                after:
                  'Product detail pages with substitution guides, size selectors, and recipe galleries to support the full decision.',
                metric: '5 content types per PDP',
              },
              {
                kpi: 'B2B lead capture',
                before:
                  'No dedicated B2B pages. Commercial buyers hit the same consumer experience with no path to inquiry or sourcing.',
                after:
                  'Food Service and Food Manufacturing hubs with grade-specific product pages and direct inquiry CTAs.',
                metric: '3 B2B page templates',
              },
              {
                kpi: 'Brand expression',
                before:
                  'The Morton Girl was absent from the digital experience despite being one of the most recognized brand mascots in the US.',
                after:
                  'Three illustrated character states across the site, each rigged in Figma for animated transitions between poses.',
                metric: '3-pose character system',
              },
            ].map(({ kpi, before, after, metric }, i) => (
              <ScrollReveal key={kpi} delay={i * 80}>
                <div
                  className="rounded-2xl p-6 h-full"
                  style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}
                >
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-3"
                    style={{ color: '#0034BA' }}
                  >
                    {kpi}
                  </div>
                  <div
                    className="text-2xl font-light mb-4"
                    style={{ color: '#00053E', letterSpacing: '-0.5px' }}
                  >
                    {metric}
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div
                        className="text-xs font-semibold uppercase tracking-wide shrink-0 mt-0.5"
                        style={{ color: '#9CA3AF' }}
                      >
                        Before
                      </div>
                      <p className="text-sm" style={{ color: '#6B7280' }}>
                        {before}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <div
                        className="text-xs font-semibold uppercase tracking-wide shrink-0 mt-0.5"
                        style={{ color: '#0034BA' }}
                      >
                        After
                      </div>
                      <p className="text-sm" style={{ color: '#374151' }}>
                        {after}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BrowserFrame url="mortonssalt.com/food-service" caption="Food Service: dedicated B2B landing for distributors, with product grid and inquiry CTA">
                <div style={{ height: 400, overflow: 'hidden' }}>
                  <Image
                    src="/images/work/morton-salt/pages/food-service.png"
                    alt="Food Service B2B landing page"
                    width={617}
                    height={1600}
                    className="w-full h-auto"
                    style={{ display: 'block' }}
                  />
                </div>
              </BrowserFrame>
              <BrowserFrame url="mortonssalt.com/food-manufacturing" caption="Food Manufacturing: 50+ salt grades, sodium-reduction research, and sourcing inquiry flow">
                <div style={{ height: 400, overflow: 'hidden' }}>
                  <Image
                    src="/images/work/morton-salt/pages/food-manufacturing.png"
                    alt="Food Manufacturing B2B landing page"
                    width={564}
                    height={1600}
                    className="w-full h-auto"
                    style={{ display: 'block' }}
                  />
                </div>
              </BrowserFrame>
            </div>
          </ScrollReveal>
        </section>

        {/* DESIGN SYSTEM */}
        <section id="design-system" className="mb-24 scroll-mt-24">
          <ScrollReveal>
            <h2
              className="font-normal mb-4"
              style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-1.5px', color: '#00053E' }}
            >
              Design System
            </h2>
            <p className="text-lg max-w-[640px] mb-12" style={{ color: '#6B7280' }}>
              Five colors and three fonts hold seven distinct page templates together. The same
              palette and type scale appear whether you're on a consumer recipe page or a
              food-grade product spec sheet, so the Morton Girl can cross contexts and still
              read as one brand.
            </p>
          </ScrollReveal>

          {/* Color palette */}
          <ScrollReveal>
            <div className="mb-12">
              <div
                className="text-xs font-semibold uppercase tracking-widest mb-6"
                style={{ color: '#9CA3AF' }}
              >
                Color Palette
              </div>
              <div className="flex flex-wrap gap-4">
                {[
                  { hex: '#00053E', name: 'Morton Navy' },
                  { hex: '#0034BA', name: 'Royal Blue' },
                  { hex: '#F5C100', name: 'Morton Yellow' },
                  { hex: '#ABE0FF', name: 'Sky Blue' },
                  { hex: '#FEF1DD', name: 'Warm Cream' },
                  { hex: '#FFFFFF', name: 'White' },
                ].map(({ hex, name }) => (
                  <div key={hex} className="flex flex-col items-center gap-2">
                    <div
                      className="w-16 h-16 rounded-xl border border-gray-200"
                      style={{ background: hex }}
                    />
                    <div className="text-center">
                      <div className="text-[11px] font-mono" style={{ color: '#6B7280' }}>
                        {hex}
                      </div>
                      <div className="text-[11px]" style={{ color: '#9CA3AF' }}>
                        {name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Typography */}
          <div>
            <ScrollReveal>
              <div
                className="text-xs font-semibold uppercase tracking-widest mb-6"
                style={{ color: '#9CA3AF' }}
              >
                Typography
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ScrollReveal delay={0}>
                <div className="rounded-2xl p-8 h-full" style={{ background: '#00053E' }}>
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-4"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    Display
                  </div>
                  <div
                    className="mb-4"
                    style={{
                      color: '#F5C100',
                      fontSize: 72,
                      lineHeight: 1,
                      fontFamily: "'Alkaline Heavy', serif",
                      fontWeight: 900,
                    }}
                  >
                    Aa
                  </div>
                  <div className="text-sm font-mono mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    Alkaline Heavy
                  </div>
                  <div className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    Page titles, hero headlines
                  </div>
                  <div
                    style={{
                      fontFamily: "'Alkaline Heavy', serif",
                      fontWeight: 900,
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: 14,
                      lineHeight: 1.4,
                    }}
                  >
                    When It Rains It Pours
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={80}>
                <div className="rounded-2xl p-8 h-full" style={{ background: '#F5C100' }}>
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-4"
                    style={{ color: 'rgba(0,5,62,0.4)' }}
                  >
                    Wordmark
                  </div>
                  <div
                    className="mb-4"
                    style={{
                      color: '#00053E',
                      fontSize: 72,
                      lineHeight: 1,
                      fontFamily: "'FatFrank', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    Aa
                  </div>
                  <div className="text-sm font-mono mb-1" style={{ color: 'rgba(0,5,62,0.7)' }}>
                    FatFrank Regular
                  </div>
                  <div className="text-xs mb-3" style={{ color: 'rgba(0,5,62,0.4)' }}>
                    Product names, section labels
                  </div>
                  <div
                    style={{
                      fontFamily: "'FatFrank', sans-serif",
                      fontWeight: 400,
                      color: 'rgba(0,5,62,0.5)',
                      fontSize: 14,
                      lineHeight: 1.4,
                    }}
                  >
                    Himalayan Pink Salt
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={160}>
                <div className="rounded-2xl p-8 h-full" style={{ background: '#F7F3E8' }}>
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-4"
                    style={{ color: '#9CA3AF' }}
                  >
                    Body
                  </div>
                  <div
                    className="mb-4"
                    style={{
                      color: '#00053E',
                      fontSize: 72,
                      lineHeight: 1,
                      fontFamily: "'Haffer TRIAL', system-ui, sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Aa
                  </div>
                  <div className="text-sm font-mono mb-1" style={{ color: '#6B7280' }}>
                    Haffer TRIAL Medium
                  </div>
                  <div className="text-xs mb-3" style={{ color: '#9CA3AF' }}>
                    Body copy, navigation, labels
                  </div>
                  <div
                    style={{
                      fontFamily: "'Haffer TRIAL', system-ui, sans-serif",
                      fontWeight: 500,
                      color: 'rgba(0,5,62,0.45)',
                      fontSize: 14,
                      lineHeight: 1.4,
                    }}
                  >
                    Salt for every kitchen, every cook, every table.
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* MORTON GIRL SYSTEM */}
        <section id="morton-girl" className="mb-24 scroll-mt-24">
          <ScrollReveal>
            <div className="mb-12">
              <h2
                className="font-normal mb-4"
                style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-1.5px', color: '#00053E' }}
              >
                The Morton Girl System
              </h2>
              <p className="text-lg max-w-[640px]" style={{ color: '#6B7280' }}>
                The brand mascot appears across the site in three distinct poses, each built as a
                layered Figma component with individually named body parts. That naming convention
                is what makes Smart Animate work between states.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div
              className="rounded-3xl p-12 flex flex-col lg:flex-row items-center gap-16"
              style={{ background: '#F7F3E8' }}
            >
              <div className="flex-shrink-0">
                <MortonGirlCycler />
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: '#0034BA' }}
                  >
                    Design Decision
                  </div>
                  <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                    Each pose is a layered Figma component with anatomically named layers. That
                    naming convention is what makes Smart Animate work: the head tilts, the arms
                    raise the binoculars, the book opens. No cuts between static images. Actual
                    tweened transitions.
                  </p>
                </div>
                <div>
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: '#0034BA' }}
                  >
                    Three States, One Character
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        pose: 'Pondering',
                        layers: 'PONDER_HEAD + ARMS_FOLDER + BODY',
                        page: 'Product pages and substitution guide',
                      },
                      {
                        pose: 'Searching',
                        layers: 'HEAD-2 + BINOCULARS + HAND + NEW_BACK_ARM + NEW_FRONT_ARM + BODY',
                        page: 'B2B and Where To Buy',
                      },
                      {
                        pose: 'Reading',
                        layers: 'READING_HEAD + BOOK + BODY',
                        page: 'Resource Center',
                      },
                    ].map(({ pose, layers, page }) => (
                      <div key={pose} className="flex gap-4 items-start">
                        <div
                          className="text-xs font-semibold shrink-0 px-2 py-0.5 rounded mt-0.5"
                          style={{ background: '#0034BA', color: '#fff', fontSize: 10 }}
                        >
                          {pose}
                        </div>
                        <div>
                          <div className="text-xs font-mono mb-0.5" style={{ color: '#9CA3AF' }}>
                            {layers}
                          </div>
                          <div className="text-sm" style={{ color: '#374151' }}>
                            {page}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* PROTOTYPE */}
        <section id="prototype" className="mb-24 scroll-mt-24">
          <ScrollReveal>
            <div className="mb-12">
              <h2
                className="font-normal mb-4"
                style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-1.5px', color: '#00053E' }}
              >
                Interactive Prototype
              </h2>
              <p className="text-lg max-w-[640px]" style={{ color: '#6B7280' }}>
                Full prototype with page transitions, animation sequences, and interactive
                components. Navigate from the homepage through product pages and into the B2B
                funnel.
              </p>
            </div>
            <PrototypeEmbed />
          </ScrollReveal>
        </section>

        {/* PAGE DESIGNS */}
        <section id="pages" className="mb-24 scroll-mt-24">
          <ScrollReveal>
            <div className="mb-12">
              <h2
                className="font-normal mb-4"
                style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-1.5px', color: '#00053E' }}
              >
                Page Designs
              </h2>
              <p className="text-lg max-w-[640px]" style={{ color: '#6B7280' }}>
                Seven full-page templates covering every audience and touchpoint. Consumer pages,
                B2B hubs, product detail, and the shop, all holding the same system.
              </p>
            </div>
          </ScrollReveal>

          {/* Full-width: Homepage */}
          <ScrollReveal className="mb-10">
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              <div className="lg:w-2/3">
                <BrowserFrame url="mortonssalt.com">
                  <div style={{ height: 520, overflow: 'hidden' }}>
                    <Image
                      src="/images/work/morton-salt/pages/homepage.png"
                      alt="Morton Salt homepage redesign"
                      width={922}
                      height={4096}
                      className="w-full h-auto"
                      style={{ display: 'block' }}
                    />
                  </div>
                </BrowserFrame>
              </div>
              <div className="lg:w-1/3 pt-2">
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: '#0034BA' }}
                >
                  Homepage
                </div>
                <h3 className="text-xl font-medium mb-3" style={{ color: '#00053E', letterSpacing: '-0.4px' }}>
                  The full 6,400px story
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#6B7280' }}>
                  Hero animation, lifestyle editorial, product category split, Resource Center
                  entry, and a seasonal recipe module. Every section has a job in the funnel.
                  The Morton Girl appears in the hero and again lower on the page as a wayfinding
                  device, not just decoration.
                </p>
                <div className="space-y-2">
                  {['Hero animation', 'Consumer / B2B split nav', 'Recipe gallery', 'Morton Girl wayfinding'].map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#F5C100' }} />
                      <span className="text-sm" style={{ color: '#374151' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* 2-column: Product Detail hero + Product Detail lower scroll */}
          <ScrollReveal className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <BrowserFrame url="mortonssalt.com/products/himalayan-pink-salt">
                  <div style={{ height: 460, overflow: 'hidden' }}>
                    <Image
                      src="/images/work/morton-salt/pages/product-detail.png"
                      alt="Product detail page — hero and size selector"
                      width={499}
                      height={1600}
                      className="w-full h-auto"
                      style={{ display: 'block' }}
                    />
                  </div>
                </BrowserFrame>
                <div className="mt-4">
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-1"
                    style={{ color: '#0034BA' }}
                  >
                    Product Detail
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                    Size selector, substitution guide comparing Morton varieties, recipe gallery
                    filtered by product type. Consumer PDP that does the work of a buying guide.
                  </p>
                </div>
              </div>
              <div>
                <BrowserFrame url="mortonssalt.com/products/himalayan-pink-salt#substitutes">
                  <div style={{ height: 460, overflow: 'hidden', position: 'relative' }}>
                    <Image
                      src="/images/work/morton-salt/pages/product-detail.png"
                      alt="Product detail — What to Use in a Pinch and recipe gallery"
                      width={499}
                      height={1600}
                      className="w-full h-auto"
                      style={{ display: 'block', marginTop: '-52%' }}
                    />
                  </div>
                </BrowserFrame>
                <div className="mt-4">
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-1"
                    style={{ color: '#0034BA' }}
                  >
                    What to Use in a Pinch
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                    Below the fold, the PDP shifts into a substitution tool and recipe gallery.
                    Comparing salts by use case keeps buyers on the page instead of bouncing to Google.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Full-width: B2B Product — Salt Selection Guide */}
          <ScrollReveal className="mb-10">
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              <div className="lg:w-1/3 pt-2 order-2 lg:order-1">
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: '#0034BA' }}
                >
                  B2B Product Page
                </div>
                <h3 className="text-xl font-medium mb-3" style={{ color: '#00053E', letterSpacing: '-0.4px' }}>
                  The salt selection guide
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#6B7280' }}>
                  22 salt grades matched against 80+ food applications. The guide lives on the
                  B2B product page so purchasing managers can verify grade suitability without
                  leaving the PDP. Preferred grades are marked P, alternatives are marked A.
                </p>
                <div className="space-y-2">
                  {['22 grades, 80+ applications', 'P/A preference notation', 'Handling and storage notes', 'Printable spec reference'].map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#F5C100' }} />
                      <span className="text-sm" style={{ color: '#374151' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-2/3 order-1 lg:order-2">
                <BrowserFrame url="mortonssalt.com/food-service/top-flake">
                  <div style={{ height: 520, overflow: 'hidden', position: 'relative' }}>
                    <Image
                      src="/images/work/morton-salt/pages/b2b-product.png"
                      alt="Salt selection guide on B2B product page"
                      width={990}
                      height={1600}
                      className="w-full h-auto"
                      style={{ display: 'block', marginTop: '-58%' }}
                    />
                  </div>
                </BrowserFrame>
              </div>
            </div>
          </ScrollReveal>

          {/* Full-width: Supermenu interaction recording */}
          <ScrollReveal className="mb-10">
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              <div className="lg:w-2/3">
                <BrowserFrame url="mortonssalt.com">
                  <div style={{ overflow: 'hidden', background: '#00053E' }}>
                    <Image
                      src="/images/work/morton-salt/pages/supermenu-shop.png"
                      alt="Morton Salt supermenu — Shop dropdown showing Culinary Salts, Home Care, New Product Lines and featured tile"
                      width={1440}
                      height={555}
                      className="w-full h-auto"
                      style={{ display: 'block' }}
                    />
                  </div>
                </BrowserFrame>
              </div>
              <div className="lg:w-1/3 pt-2">
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: '#0034BA' }}
                >
                  Navigation
                </div>
                <h3 className="text-xl font-medium mb-3" style={{ color: '#00053E', letterSpacing: '-0.4px' }}>
                  The supermenu
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#6B7280' }}>
                  A full-bleed dropdown that splits consumer and B2B paths at the top of every page.
                  Hovering Shop surfaces product categories; hovering Business surfaces food service
                  and manufacturing routes. One nav, two audiences, no dead ends.
                </p>
                <div className="space-y-2">
                  {['Consumer / B2B split at hover', 'Featured product tiles', 'Recipe and resource shortcuts', 'Morton Girl as wayfinding'].map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#F5C100' }} />
                      <span className="text-sm" style={{ color: '#374151' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* REFLECTION */}
        <section id="reflection" className="mb-24 scroll-mt-24">
          <ScrollReveal>
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: '#9CA3AF' }}
            >
              Reflection
            </div>
            <h2
              className="font-normal mb-4"
              style={{ fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-1.5px', color: '#00053E' }}
            >
              What this project taught me
            </h2>
            <p className="text-lg max-w-[640px] mb-12" style={{ color: '#6B7280' }}>
              Three things that only became clear once the work was done.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                number: '01',
                title: 'Animation as constraint',
                body: 'Building the Morton Girl as a rigged character with named anatomical layers forced component discipline that paid off in the prototype. Smart Animate transitions only work when layer names match exactly across states. That constraint made every decision more deliberate. The result is a character that feels alive rather than swapped.',
              },
              {
                number: '02',
                title: 'Dual-audience IA is harder than it looks',
                body: 'The biggest challenge on this project was not visual. Morton sells to home cooks and food manufacturers through the same domain. Getting the navigation and landing page hierarchies right so neither audience felt lost took multiple IA rounds before Figma opened. The visual work was the easier half.',
              },
              {
                number: '03',
                title: 'Extending a mature brand',
                body: "With a brand as established as Morton, the work is not inventing a new visual language. It's understanding the existing one well enough to extend it into new contexts: e-commerce, B2B, mobile. The goal is to add without breaking what made it recognizable.",
              },
            ].map(({ number, title, body }, i) => (
              <ScrollReveal key={number} delay={i * 80}>
                <div
                  className="rounded-2xl p-8 h-full flex flex-col"
                  style={{ background: '#00053E' }}
                >
                  <div
                    className="text-4xl font-light mb-6"
                    style={{ color: '#F5C100', fontVariantNumeric: 'tabular-nums', letterSpacing: '-1px' }}
                  >
                    {number}
                  </div>
                  <h3
                    className="text-lg font-medium mb-3"
                    style={{ color: '#fff', letterSpacing: '-0.3px' }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
