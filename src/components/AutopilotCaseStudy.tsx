'use client';

import Image from 'next/image';
import BackToHomeButton from '@/components/BackToHomeButton';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import SectionNav, { type SectionNavItem } from '@/components/SectionNav';

const SECTIONS: SectionNavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'wizard', label: 'Setup Wizard' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'results', label: 'Results' },
  { id: 'gtm', label: 'Go-To-Market' },
  { id: 'decisions', label: 'Technical Decisions' },
];

const PURPLE = '#534AB7';
const TEAL = '#1D9E75';
const CORAL = '#D85A30';
const AMBER = '#BA7517';

interface AutopilotCaseStudyProps {
  title: string;
  subtitle?: string;
  roleDisplay?: string;
  timeline?: string;
  link?: string;
  videoUrl?: string;
}

export default function AutopilotCaseStudy({
  title = 'AUTOPILOT',
  subtitle = 'AI-Powered Job Search Pipeline',
  roleDisplay = 'Design Engineer',
  timeline,
}: AutopilotCaseStudyProps) {
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
        </header>

        {/* Promo video */}
        <div className="flex justify-center mb-16">
          <div className="w-full max-w-[700px] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-auto"
            >
              <source src="/videos/work/autopilot/cover.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <p className="text-black dark:text-white text-lg leading-relaxed text-center max-w-[811px] mx-auto mb-16">
          The job market is brutal — AI screens out resumes before a human ever sees them, and hundreds of applicants compete for every role. So I flipped the script: if AI is making it harder to get hired, I&apos;ll build my own AI to fight back.
        </p>
      </div>

      <SectionNav sections={SECTIONS} />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 pt-[35px] pb-[35px] space-y-24 md:space-y-32">
        {/* OVERVIEW */}
        <section id="overview" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-8">
            Overview
          </h2>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-6 md:p-8 mb-10">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              I designed and built this entire product solo — the setup wizard UX (prototyped as interactive HTML/CSS), the pipeline architecture, and every line of Python underneath. The system scrapes Product Design roles from LinkedIn and BuiltIn, uses the Anthropic API (Claude Sonnet) to tailor resumes and cover letters per role, generates pixel-precise PDFs via ReportLab, and pushes everything to a Notion Kanban dashboard. Runs daily at 8 AM via cron. Gmail integration auto-tracks interview invitations, rejections, and manually-applied jobs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Scraping</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Playwright-powered headless browsers scrape LinkedIn (public guest search across 8 cities) and BuiltIn (9 search combinations across city subdomains). Anti-detection with random delays, realistic user agents, and limited pagination.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">AI Tailoring</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Claude Sonnet generates tailored resume copy, cover letters with a 100-combination variation engine, pre-filled application responses, and match scores — all constrained by a system prompt with hard anti-hallucination guardrails.
              </p>
            </div>
          </div>
        </section>

        {/* PROBLEM STATEMENT */}
        <section id="problem" className="scroll-mt-24">
          <div className="rounded-2xl border-2 border-amber-500/30 dark:border-amber-400/30 bg-amber-50/50 dark:bg-amber-950/20 p-8 md:p-12">
            <p className="text-sm font-medium uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-4">
              Problem Statement
            </p>
            <p className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white leading-snug mb-6">
              I was spending 2-3 hours per day on my job search: scrolling LinkedIn, copying job descriptions, manually rewriting resume bullets to match each JD, writing cover letters from scratch, and tracking everything in a spreadsheet.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              <strong className="text-gray-900 dark:text-white">The insight:</strong> Most of that work was repetitive pattern-matching — exactly what an LLM is good at. The goal was to reduce daily effort to ~15-20 minutes of review and final submission while maintaining or improving the quality of application materials. The system handles discovery, filtering, tailoring, and tracking automatically so I can focus on evaluating company fit, tweaking tone, and hitting submit.
            </p>
          </div>
        </section>

        {/* ARCHITECTURE */}
        <section id="architecture" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
            Architecture
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mb-8">
            The pipeline is a four-stage conveyor belt that runs every morning at 8 AM, with a post-pipeline Gmail integration layer.
          </p>

          {/* Architecture diagram */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-6 md:p-8 overflow-x-auto">
            <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-4 min-w-0">
              {[
                { label: 'SCRAPING', color: PURPLE, items: ['LinkedIn (8 cities)', 'BuiltIn (9 searches)', 'Public guest pages'] },
                { label: 'FILTERING', color: CORAL, items: ['Title match', 'Location + salary', 'Fuzzy dedup (85%)'] },
                { label: 'TAILORING', color: TEAL, items: ['Claude API', 'Resume + cover letter', 'PDF generation'] },
                { label: 'DELIVERY', color: AMBER, items: ['Notion Kanban', 'Match scores', 'App responses'] },
              ].map((stage, i) => (
                <div key={stage.label} className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                  <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-5 flex-1 min-w-0" style={{ borderTopColor: stage.color, borderTopWidth: 3 }}>
                    <p className="text-xs font-mono font-semibold tracking-wider mb-3" style={{ color: stage.color }}>{stage.label}</p>
                    <ul className="space-y-1.5">
                      {stage.items.map((item) => (
                        <li key={item} className="text-sm text-gray-600 dark:text-gray-400">{item}</li>
                      ))}
                    </ul>
                  </div>
                  {i < 3 && <span className="hidden md:block text-gray-300 dark:text-gray-600 text-xl font-light">→</span>}
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs font-mono font-semibold tracking-wider text-gray-500 mb-2">POST-PIPELINE</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Gmail Tracker scans inbox for interview/rejection emails and updates Notion. Gmail Backfill finds &quot;thank you for applying&quot; emails not in Notion and adds them.</p>
            </div>
          </div>
        </section>

        {/* SETUP WIZARD */}
        <section id="wizard" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
            Setup Wizard
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mb-12">
            An 8-step onboarding flow that configures the entire pipeline. Everything stays local — your data is saved to a config file on your machine and only sent to the Claude API when generating tailored materials.
          </p>

          {/* Wizard walkthrough video */}
          <div className="flex justify-center mb-14">
            <div className="w-full max-w-[700px] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-auto"
              >
                <source src="/videos/work/autopilot/wizard.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Design callouts */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-10">
            <div className="rounded-2xl border-2 border-amber-500/30 dark:border-amber-400/30 bg-amber-50/50 dark:bg-amber-950/20 p-6 md:p-8">
              <p className="text-sm font-medium uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-3">Privacy-first</p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Your data stays local. Everything is saved to a config file on your machine. It&apos;s only sent to the Claude API when generating tailored materials, and never stored on any server.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-amber-500/30 dark:border-amber-400/30 bg-amber-50/50 dark:bg-amber-950/20 p-6 md:p-8">
              <p className="text-sm font-medium uppercase tracking-wider" style={{ color: TEAL }}>Accuracy guarantee</p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
                The AI will only reference experience you enter during setup. It will never fabricate companies, inflate titles, or invent skills. Your real background is your strongest asset.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-12">
            Six scripts, one daily cron job — from raw listings to tailored applications
          </p>

          <div className="space-y-8 mb-16">
            {/* Scraping */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 rounded-full" style={{ background: PURPLE }} />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Scraping</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Playwright-powered headless browsers scrape LinkedIn (public guest search across 8 cities) and BuiltIn (9 search combinations across city subdomains). V1 used authenticated browsing — LinkedIn&apos;s bot detection served wrong results, so V2 switched to public guest pages. Detail fetches capped at 5 per city to keep runtime under 15 minutes.
              </p>
            </div>

            {/* Filtering */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 rounded-full" style={{ background: CORAL }} />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filtering &amp; Dedup</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Filters by title match, excluded titles, max YoE, and $100K salary floor. Deduplicates across sources using exact hash + fuzzy string similarity (SequenceMatcher at 85%) + historical dedup against a <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">seen_jobs.json</code> ledger. &quot;Stripe, Inc.&quot; on LinkedIn and &quot;Stripe&quot; on BuiltIn resolve to the same entry.
              </p>
            </div>

            {/* AI Tailoring */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 rounded-full" style={{ background: TEAL }} />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Tailoring Engine</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Uses the Anthropic API (Claude Sonnet) to generate per-job tailored summaries, experience bullets (STAR format, real metrics), ATS keywords, match scores, cover letters via a 100-combination variation engine, and pre-filled application responses — all constrained by a system prompt with hard anti-hallucination guardrails.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="rounded-xl bg-gray-50 dark:bg-gray-900/50 p-4">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Variation Engine</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    5 opening strategies &times; 5 experience leads &times; 4 closings = 100 structural combinations per cover letter, before any JD-specific content.
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 dark:bg-gray-900/50 p-4">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Guardrails</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Locked work history in system prompt. No invented metrics or project references. Industry variant routing (fintech/healthtech/ecommerce/general).
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 rounded-full" style={{ background: AMBER }} />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delivery &amp; Tracking</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Results push to a Notion Kanban board with match scores and tailored PDFs. Gmail Tracker scans for interview/rejection emails and updates statuses with priority logic (won&apos;t downgrade). Backfill catches manually-applied jobs by finding &quot;thank you for applying&quot; emails not in Notion.
              </p>
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <section id="results" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
            Results
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mb-12">
            Running daily for ~10 days as of late March 2026. The system replaced most of the manual work without sacrificing quality.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '100+', label: 'Tailored Resumes', sublabel: 'Generated as print-ready PDFs', color: PURPLE },
              { value: '100+', label: 'Cover Letters', sublabel: 'With structural variation', color: TEAL },
              { value: '~15 min', label: 'Daily Effort', sublabel: 'Down from 2-3 hours', color: CORAL },
              { value: '$0.60', label: 'Daily Cost', sublabel: '~$0.06-0.10 per application', color: AMBER },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border-2 bg-amber-50/50 dark:bg-amber-950/20 p-6 md:p-8 text-center" style={{ borderColor: `${stat.color}40` }}>
                <p className="text-4xl md:text-5xl font-bold tabular-nums" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-base font-semibold text-gray-900 dark:text-white mt-2">{stat.label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.sublabel}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg mt-12">
            <video
              controls
              playsInline
              preload="metadata"
              poster="/images/work/autopilot/cover.png"
              className="w-full h-auto"
            >
              <source src="/videos/work/autopilot/promo.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        {/* GO-TO-MARKET */}
        <section id="gtm" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
            Go-To-Market
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mb-4">
            Autopilot isn&apos;t locked to one job title. I designed it as a multi-persona platform — the pipeline accepts a <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">--role</code> flag that reconfigures scraping queries, filtering logic, and tailoring prompts for any job function.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mb-12">
            To validate market breadth, I ran the full pipeline for 10 different roles and captured the results. Each card shows real scrape volumes, match counts, and tailored outputs — demonstrating that the system scales across industries and seniority levels.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {[
              { src: '/images/work/autopilot/wizard/image 14.png', role: 'Software Engineer', scraped: '330', matches: '156', tailored: '20' },
              { src: '/images/work/autopilot/wizard/image 15.png', role: 'Design Engineer', scraped: '69', matches: '32', tailored: '15' },
              { src: '/images/work/autopilot/wizard/image 16.png', role: 'Data Scientist', scraped: '212', matches: '97', tailored: '15' },
              { src: '/images/work/autopilot/wizard/image 21.png', role: 'Brand Designer', scraped: '58', matches: '27', tailored: '10' },
            ].map((persona) => (
              <div key={persona.role} className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-gray-400 dark:hover:border-gray-600 transition-colors group">
                <div className="relative bg-[#f5f3ef] dark:bg-[#f5f3ef]">
                  <Image
                    src={persona.src}
                    alt={`Autopilot pipeline run for ${persona.role}`}
                    width={400}
                    height={300}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{persona.role}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono tabular-nums">
                    {persona.scraped} scraped → {persona.matches} matched → {persona.tailored} tailored
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border-2 border-amber-500/30 dark:border-amber-400/30 bg-amber-50/50 dark:bg-amber-950/20 p-6 md:p-8 mt-10">
            <p className="text-sm font-medium uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-3">Market Insight</p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Volume scales with market size — Software Engineer and Product Manager roles return 300+ listings per run, while niche roles like Brand Designer and Content Strategist return 50–90. The pipeline adapts: smaller pools get higher tailoring ratios so every viable match gets a custom application.
            </p>
          </div>
        </section>

        {/* TECHNICAL DECISIONS */}
        <section id="decisions" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
            Technical Decisions
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 mb-10">
            {[
              { title: 'Core', items: 'Python 3.12, Playwright (async), Anthropic API (Claude Sonnet)' },
              { title: 'PDF Generation', items: 'ReportLab — pixel-precise two-column layout matching Figma template' },
              { title: 'Dashboard', items: 'Notion API (Kanban), Gmail API (OAuth2), httpx (async HTTP)' },
              { title: 'Infrastructure', items: 'macOS cron (daily 8 AM), loguru (structured logs), python-dotenv' },
            ].map((stack) => (
              <div key={stack.title} className="rounded-2xl border-2 border-amber-500/40 dark:border-amber-400/30 bg-amber-50/50 dark:bg-amber-950/20 p-6 md:p-8">
                <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{stack.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stack.items}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 hover:border-amber-500/50 dark:hover:border-amber-400/50 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Public scraping over LinkedIn API</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                LinkedIn&apos;s official API doesn&apos;t expose job search. Authenticated headless browsing triggered bot detection and served wrong results. Public guest pages return accurate results without auth, at the cost of slightly less metadata.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 hover:border-amber-500/50 dark:hover:border-amber-400/50 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">ReportLab over HTML-to-PDF</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                My resume uses a specific two-column layout with precise font sizes and a divider at exactly 6.5 inches. HTML-to-PDF converters don&apos;t give pixel-level control. ReportLab lets me position every element by coordinates.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 hover:border-amber-500/50 dark:hover:border-amber-400/50 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Fuzzy dedup over exact matching</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                &quot;Stripe, Inc.&quot; on LinkedIn and &quot;Stripe&quot; on BuiltIn produce different hashes. The fuzzy matcher normalizes company names, strips suffixes, and uses SequenceMatcher at 85% to catch near-duplicates across sources.
              </p>
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className="scroll-mt-24 py-[15px]">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-8 md:p-12 text-center">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Building Autopilot taught me that the most impactful design engineering happens when you own the problem end-to-end — from the first wireframe to the last cron job. The system is still running daily and evolving. Next up: a web-based dashboard to replace Notion and open the pipeline to other job seekers.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
