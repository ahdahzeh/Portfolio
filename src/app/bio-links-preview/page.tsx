import Link from 'next/link';
import {
  LinkAnimatedUnderline,
  LinkColorWipe,
  LinkRevealStack,
  LinkMagneticDot,
  LinkMarkerHighlight,
  LinkImageCursor,
  LinkBracketFrame,
  LinkLetterCascade,
} from '@/components/InlineLinkVariants';

interface VariantConfig {
  id: string;
  label: string;
  desc: string;
  Wrap: typeof LinkAnimatedUnderline;
  /** Whether this variant uses image previews (image-cursor only) */
  imageMode?: boolean;
}

const VARIANTS: VariantConfig[] = [
  {
    id: 'current',
    label: 'Current — italic blue underline',
    desc: 'What\'s on the live site today: bold italic blue text with a static underline. Functional, but generic.',
    Wrap: () => <></>, // rendered separately below
  },
  {
    id: 'animated-underline',
    label: '01 — Animated underline',
    desc: 'A 1.5px line draws in from left to right on hover, easing on a 450ms cubic-bezier. Subtle, editorial. Closest to most studio-site behavior.',
    Wrap: LinkAnimatedUnderline,
  },
  {
    id: 'color-wipe',
    label: '02 — Color wipe (block)',
    desc: 'Solid black block slides up from below to envelop the word; text inverts to white. High-contrast, confident, slightly Swiss.',
    Wrap: LinkColorWipe,
  },
  {
    id: 'reveal-stack',
    label: '03 — Reveal stack',
    desc: 'The word slides up and out; an italic version of the same word slides in from below. Very studio-site. Reads as a tiny answered prompt.',
    Wrap: LinkRevealStack,
  },
  {
    id: 'magnetic-dot',
    label: '04 — Magnetic dot',
    desc: 'A small filled dot sits before the word; on hover it slides 3px right and scales up while the underline color completes. Quiet but distinctive.',
    Wrap: LinkMagneticDot,
  },
  {
    id: 'marker-highlight',
    label: '05 — Marker highlight',
    desc: 'A yellow highlight wipes across, like a pen marker passing under the text. Unexpected, warmer, hand-marked feel.',
    Wrap: LinkMarkerHighlight,
  },
  {
    id: 'image-cursor',
    label: '06 — Image cursor preview',
    desc: 'The cursor pulls a small (140x100) preview thumbnail along with it as it moves over the link. Most "designed" of the bunch — but heaviest. Best for links that have a visual to show.',
    Wrap: LinkImageCursor,
    imageMode: true,
  },
  {
    id: 'bracket-frame',
    label: '07 — Bracket frame',
    desc: 'Square brackets emerge from each side of the word and clamp around it. Editorial, technical, niche. Reads as "this is a citation."',
    Wrap: LinkBracketFrame,
  },
  {
    id: 'letter-cascade',
    label: '08 — Letter cascade',
    desc: 'Each letter nudges up 2px on a staggered delay (18ms each). A static underline holds the baseline. Playful without being cute.',
    Wrap: LinkLetterCascade,
  },
];

const IMAGES = {
  amazon: '/images/work/amazon.png',
  block: '/images/work/block-equity-group/cover.png',
  omnicom: '/images/work/community-health-media/hero-mockup.png',
};

const HREFS = {
  amazon: '/work/amazon',
  block: '/work/block-equity-group',
  omnicom: 'https://www.omc.com/capabilities/capability-health/',
};

function BioParagraph({ Wrap, imageMode }: { Wrap: typeof LinkAnimatedUnderline; imageMode?: boolean }) {
  return (
    <p className="text-base sm:text-[17px] font-normal text-black dark:text-white leading-[1.65] max-w-[640px]">
      I design digital experiences that help people do meaningful things, whether that&apos;s accessing healthcare or making confident purchases online. These are industries where getting it wrong has real consequences. I&apos;ve worked across startups and enterprise teams at{' '}
      <Wrap href={HREFS.amazon} image={imageMode ? IMAGES.amazon : undefined}>Amazon</Wrap>
      ,{' '}
      <Wrap href={HREFS.block} image={imageMode ? IMAGES.block : undefined}>Block Equity Group</Wrap>
      , and{' '}
      <Wrap href={HREFS.omnicom} external image={imageMode ? IMAGES.omnicom : undefined}>Omnicom</Wrap>
      , shipping solutions that improve outcomes, not just metrics.
    </p>
  );
}

function CurrentBioParagraph() {
  return (
    <p className="text-base sm:text-[17px] font-normal text-black dark:text-white leading-[1.65] max-w-[640px]">
      I design digital experiences that help people do meaningful things, whether that&apos;s accessing healthcare or making confident purchases online. These are industries where getting it wrong has real consequences. I&apos;ve worked across startups and enterprise teams at{' '}
      <Link href={HREFS.amazon} className="font-semibold italic text-[#006eff] underline underline-offset-2 hover:text-[#0060d9]">Amazon</Link>
      ,{' '}
      <Link href={HREFS.block} className="font-semibold italic text-[#006eff] underline underline-offset-2 hover:text-[#0060d9]">Block Equity Group</Link>
      , and{' '}
      <a href={HREFS.omnicom} target="_blank" rel="noopener noreferrer" className="font-semibold italic text-[#006eff] underline underline-offset-2 hover:text-[#0060d9]">Omnicom</a>
      , shipping solutions that improve outcomes, not just metrics.
    </p>
  );
}

export default function BioLinksPreviewPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Header */}
      <header className="border-b border-black/10 dark:border-white/10 sticky top-0 bg-white/90 dark:bg-black/90 backdrop-blur z-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500">
              Hero bio · inline link microinteractions
            </p>
            <h1 className="text-base font-semibold tracking-tight">Hover any company name</h1>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {VARIANTS.map((v) => (
              <a
                key={v.id}
                href={`#${v.id}`}
                className="px-2.5 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-wider text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors"
              >
                {v.id === 'current' ? 'Now' : v.label.split(' ')[0]}
              </a>
            ))}
            <Link
              href="/"
              className="ml-2 px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors"
            >
              Home ↗
            </Link>
          </nav>
        </div>
      </header>

      {/* Intro */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 pt-16 pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500 mb-3">
          Pick one
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-[820px] leading-[1.05]">
          Eight ways to make the bio feel less like a Wikipedia article.
        </h2>
        <p className="text-base text-gray-500 dark:text-gray-400 mt-5 max-w-[60ch] leading-relaxed">
          The same hero bio paragraph, eight different inline-link treatments. Hover a company name to see each microinteraction. Reboot.studio leans hardest into reveal-stack and image-cursor; pure underline draws are the safe editorial pick.
        </p>
      </section>

      {/* Each variant */}
      {VARIANTS.map((v) => (
        <section
          key={v.id}
          id={v.id}
          className="border-t border-black/10 dark:border-white/10 scroll-mt-20"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
            <div className="mb-8 md:mb-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500 mb-2">
                {v.id === 'current' ? 'Live now' : 'Variant'}
              </p>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-3">
                {v.label}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[60ch] leading-relaxed">
                {v.desc}
              </p>
            </div>

            <div className="rounded-2xl border border-dashed border-black/10 dark:border-white/10 p-6 sm:p-10 md:p-14 bg-gray-50/40 dark:bg-gray-950/40">
              {v.id === 'current' ? <CurrentBioParagraph /> : <BioParagraph Wrap={v.Wrap} imageMode={v.imageMode} />}
            </div>
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="border-t border-black/10 dark:border-white/10 py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          <p className="font-mono text-[11px] text-gray-400 dark:text-gray-500">
            Tell me which variant and I&apos;ll wire it into the live hero. The image-cursor variant works best for links that have visual artifacts (case studies, projects).
          </p>
        </div>
      </footer>
    </main>
  );
}
