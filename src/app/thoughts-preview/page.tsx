import dynamic from 'next/dynamic';
import Link from 'next/link';

const ThoughtsSectionA = dynamic(() => import('@/components/ThoughtsSectionA'), { ssr: true });
const ThoughtsSectionB = dynamic(() => import('@/components/ThoughtsSectionB'), { ssr: true });
const ThoughtsSectionC = dynamic(() => import('@/components/ThoughtsSectionC'), { ssr: true });
const ThoughtsSectionCurrent = dynamic(() => import('@/components/ThoughtsSection'), { ssr: true });

const OPTIONS = [
  {
    id: 'current',
    label: 'Current — 3-up card grid',
    desc: 'What\'s on the live site right now. Three equal-weight cards in a grid.',
    component: <ThoughtsSectionCurrent />,
  },
  {
    id: 'a',
    label: 'Option A — Featured card + editorial index',
    desc: 'One large card on the left for the headliner essay. Quiet title + date list on the right for everything else. Asymmetric, scales as the essay count grows.',
    component: <ThoughtsSectionA />,
  },
  {
    id: 'b',
    label: 'Option B — Full-width hero card',
    desc: 'One huge card spanning the section. Title at editorial scale (60-70px). Below: a tight horizontal strip of secondary titles.',
    component: <ThoughtsSectionB />,
  },
  {
    id: 'c',
    label: 'Option C — Pull-quote cards',
    desc: 'Same 3-up grid you liked, but the body of each card is the most quotable line, not a preview excerpt. Numbered 01/02/03. Title becomes a caption.',
    component: <ThoughtsSectionC />,
  },
];

export default function ThoughtsPreviewPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Header */}
      <header className="border-b border-black/10 dark:border-white/10 sticky top-0 bg-white/90 dark:bg-black/90 backdrop-blur z-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500">
              Thoughts &amp; Notions
            </p>
            <h1 className="text-base font-semibold tracking-tight">Layout options preview</h1>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {OPTIONS.map((o) => (
              <a
                key={o.id}
                href={`#${o.id}`}
                className="px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors"
              >
                {o.id === 'current' ? 'Now' : o.id.toUpperCase()}
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
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-[720px] leading-[1.1]">
          Four ways to break up the carousel sandwich.
        </h2>
        <p className="text-base text-gray-500 dark:text-gray-400 mt-5 max-w-[60ch] leading-relaxed">
          Past Work above and Design Videos below are both visual carousels, so this section needs to feel different. Each option below renders with your real Substack posts and notes from <span className="text-gray-700 dark:text-gray-300">Groundwork</span>.
        </p>
      </section>

      {/* Each option */}
      {OPTIONS.map((o) => (
        <section
          key={o.id}
          id={o.id}
          className="border-t border-black/10 dark:border-white/10 scroll-mt-20"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
            <div className="mb-10 md:mb-14">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-gray-400 dark:text-gray-500 mb-2">
                {o.id === 'current' ? 'Live now' : `Option ${o.id.toUpperCase()}`}
              </p>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-3">
                {o.label}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[60ch] leading-relaxed">
                {o.desc}
              </p>
            </div>

            {/* Render the actual component */}
            <div className="rounded-2xl border border-dashed border-black/10 dark:border-white/10 p-4 sm:p-6 md:p-8 bg-gray-50/40 dark:bg-gray-950/40">
              {o.component}
            </div>
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="border-t border-black/10 dark:border-white/10 py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          <p className="font-mono text-[11px] text-gray-400 dark:text-gray-500">
            Tell me which one and I&apos;ll wire it into the live home page.
          </p>
        </div>
      </footer>
    </main>
  );
}
