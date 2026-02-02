'use client';

import Link from 'next/link';
import Image from 'next/image';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import SectionNav, { type SectionNavItem } from '@/components/SectionNav';
import VideoWithFallback from '@/components/VideoWithFallback';

const WECHIPN_SECTIONS: SectionNavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'old-experience', label: 'Old experience' },
  { id: 'problem-solution', label: 'Problem & solution' },
  { id: 'landing', label: 'Landing' },
  { id: 'rewards', label: 'Rewards' },
  { id: 'kpis', label: 'KPIs & process' },
  { id: 'design-decision', label: 'Design decision' },
  { id: 'mobile-view', label: 'Mobile view' },
  { id: 'figma', label: 'Figma' },
  { id: 'takeaways', label: 'Takeaways' },
];

const IMG = {
  logo: '/images/work/wechipn/wechipn-logo.png',
  hero: '/images/work/wechipn/wechipn-hero.png',
  old1: '/images/work/wechipn/wechipn-old-1.png',
  old2: '/images/work/wechipn/wechipn-old-2.png',
  old3: '/images/work/wechipn/wechipn-old-3.png',
  problemSolution: '/images/work/wechipn/wechipn-problem-solution.png',
  rewardsActions: '/images/work/wechipn/wechipn-rewards-actions.png',
  kpisProcess: '/images/work/wechipn/wechipn-kpis-process.png',
  designDecision: '/images/work/wechipn/wechipn-design-decision.png',
  mobileView: '/images/work/wechipn/wechipn-mobile-view.png',
  figma: '/images/work/wechipn/wechipn-figma-design.png',
};

interface WeChipnCaseStudyProps {
  title: string;
  subtitle?: string;
  roleDisplay?: string;
  timeline?: string;
  videoUrl?: string;
  /** When set, the Problem & Solution section shows this video instead of the static image */
  problemSolutionVideoUrl?: string;
  /** When set, the Mobile View section shows this video instead of the static image */
  mobileViewVideoUrl?: string;
}

export default function WeChipnCaseStudy({
  title,
  subtitle,
  roleDisplay,
  timeline,
  videoUrl,
  problemSolutionVideoUrl,
  mobileViewVideoUrl,
}: WeChipnCaseStudyProps) {
  return (
    <article className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
      <ScrollProgressBar />
      <SectionNav sections={WECHIPN_SECTIONS} />
      <Link
        href="/"
        className="text-gray-500 hover:text-gray-700 dark:text-gray-300 text-sm mb-8 inline-block"
      >
        ← Back
      </Link>

      {/* Hero */}
      <section id="overview" className="mb-16 text-center w-full max-w-[1200px] mx-auto scroll-mt-24">
        <h1 className="text-4xl md:text-5xl font-normal text-black dark:text-white tracking-tight mb-4">
          {title}: {subtitle ?? 'UX Design'}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm text-gray-500 dark:text-gray-400 mb-8">
          {timeline != null && <span>Timeline: {timeline}</span>}
          {roleDisplay != null && <span>Title: {roleDisplay}</span>}
          <span>Project: {title}</span>
        </div>
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-600 bg-[#F3F3F3]">
          {videoUrl ? (
            <iframe
              src={videoUrl.replace('/share/', '/embed/')}
              title="WeChipn walkthrough"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <Image
              src={IMG.hero}
              alt="WeChipn product preview"
              fill
              className="object-contain w-full h-full"
              sizes="100vw"
            />
          )}
        </div>
      </section>

      {/* Intro paragraph */}
      <section className="mb-12 text-center scroll-mt-24">
        <p className="text-black dark:text-white leading-relaxed max-w-[934px] mx-auto text-center">
          WeChipn is a social organization in partnership with Live Nation that pushes for social
          action and community building. Their mission is to catalyze One Billion actions worldwide
          by 2028—empowering a global community of forward-thinkers and activists. I came on as
          UX/UI designer for this project, designing all screens myself and supporting the team with
          front-end code so the experience stayed true to the vision from concept to launch.
        </p>
      </section>

      {/* The Old Experience */}
      <section id="old-experience" className="mb-12 text-center scroll-mt-24">
        <h2 className="text-xl md:text-2xl font-medium text-[#8b5cf6] dark:text-[#a78bfa] mb-4">
          The Old Experience
        </h2>
        <p className="text-black dark:text-white leading-relaxed mb-8 max-w-[934px] mx-auto">
          When I joined, the existing interface was hard for users to navigate and didn’t resonate
          with the audience WeChipn wanted to reach. The home experience, signup flow, and
          volunteer-drive pages felt disconnected and dated—so I started by documenting what was there
          and where people were dropping off.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-[#F3F3F3]">
            <Image src={IMG.old1} alt="Old WeChipn home and rewards" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-[#F3F3F3]">
            <Image src={IMG.old2} alt="Old WeChipn signup" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-[#F3F3F3]">
            <Image src={IMG.old3} alt="Old WeChipn volunteer drive" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section id="problem-solution" className="mb-12 text-center scroll-mt-24">
        <p className="text-black dark:text-white leading-relaxed max-w-[934px] mx-auto text-center mb-8">
          WeChipn was struggling to retain users. Complicated flows and outdated patterns made it
          hard to engage the customer base—and that was limiting growth. The opportunity was real:
          a clearer, more modern experience had the potential to significantly improve retention,
          with early estimates pointing to at least 50% if we got the design right. I treated this
          as a high-impact, complex problem from the start. Every design decision was grounded in
          direct user feedback, estimated conversion impact, and how well the system would scale. I
          moved quickly and relied on rapid feedback—shipping iterations, testing with real users,
          and refining so we could learn fast without losing sight of the bigger picture.
        </p>
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/20 bg-[#F3F3F3]">
          {problemSolutionVideoUrl ? (
            (() => {
              const isEmbed =
                /loom\.com|youtube\.com|youtu\.be|vimeo\.com/.test(problemSolutionVideoUrl);
              if (isEmbed) {
                const embedSrc =
                  problemSolutionVideoUrl.includes('/share/')
                    ? problemSolutionVideoUrl.replace('/share/', '/embed/')
                    : problemSolutionVideoUrl;
                return (
                  <iframe
                    src={embedSrc}
                    title="Problem and Solution — WeChipn"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                );
              }
              return (
                <VideoWithFallback
                  src={problemSolutionVideoUrl}
                  fallbackImageSrc={IMG.problemSolution}
                  fallbackAlt="Problem and Solution — WeChipn screenshot"
                  className="absolute inset-0 w-full h-full object-contain"
                />
              );
            })()
          ) : (
            <Image
              src={IMG.problemSolution}
              alt="Problem and Solution — WeChipn screenshot"
              fill
              className="object-contain"
              sizes="100vw"
            />
          )}
        </div>
      </section>

      {/* New landing page paragraph */}
      <section id="landing" className="mb-8 text-center scroll-mt-24">
        <p className="text-black dark:text-white leading-relaxed max-w-[934px] mx-auto">
          I led with a new landing experience that put big, clear copy and strong CTAs front and
          center—speaking to people who care about community but also expect a product that feels
          current and intentional. As you scroll, the product reveals itself through bold CTAs and
          real photos from community events, so the brand and the mission feel tangible, not
          abstract.
        </p>
      </section>

      {/* Rewards Center & Actions image */}
      <section id="rewards" className="mb-8 scroll-mt-24">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/20 bg-[#F3F3F3]">
          <Image
            src={IMG.rewardsActions}
            alt="Rewards Center and Actions page"
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>
      </section>

      {/* Rewards Center & Actions paragraph */}
      <section className="mb-12 text-center">
        <p className="text-black dark:text-white leading-relaxed max-w-[934px] mx-auto">
          The Rewards Center and Actions experience is where the model really comes to life: users
          earn points by taking action in their community—volunteering, attending events—and then
          redeem those points for concerts and other rewards. I designed both flows with large,
          legible CTAs and location-based filtering so what you see is relevant to where you are.
          The filters use clear filled and unfilled states, and the actions and rewards update
          by location so the experience stays relevant and easy to scan.
        </p>
      </section>

      {/* KPIs & Process */}
      <section id="kpis" className="mb-12 scroll-mt-24">
        <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-600 bg-[#f8f6f3] dark:bg-[#f8f6f3]">
          <Image
            src={IMG.kpisProcess}
            alt="KPIs and Process — Discover, Define, Design, Test, Deliver"
            width={1200}
            height={600}
            className="w-full h-auto object-contain"
            sizes="100vw"
          />
        </div>
      </section>

      {/* Design Decision */}
      <section id="design-decision" className="mb-12 text-center scroll-mt-24">
        <h2 className="text-xl md:text-2xl font-medium text-[#8b5cf6] dark:text-[#a78bfa] mb-4">
          Design Decision
        </h2>
        <p className="text-black dark:text-white leading-relaxed mb-8 max-w-[934px] mx-auto">
          I mapped the full user journey to find where we could have the biggest impact. Signup
          dropoff had several possible causes, but the clearest lever was the homepage: it had to
          feel more dynamic and engaging for a younger, community-minded audience without burying
          the information they needed to understand the initiative. So I focused there first—making
          the hero and scroll experience do more of the work.
        </p>
        <div className="relative w-full rounded-2xl overflow-hidden border border-white/20 bg-[#F3F3F3]">
          <Image
            src={IMG.designDecision}
            alt="Landing page top and middle mockups"
            width={1200}
            height={600}
            className="w-full h-auto object-contain"
            sizes="100vw"
          />
        </div>
      </section>

      {/* Mobile View — paragraph and video side by side on desktop */}
      <section id="mobile-view" className="mb-12 scroll-mt-24">
        <h2 className="text-xl md:text-2xl font-medium text-[#8b5cf6] dark:text-[#a78bfa] mb-4 text-center">
          Mobile View
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <p className="text-black dark:text-white leading-relaxed max-w-[934px] md:max-w-none mx-auto order-2 md:order-1">
            The whole product is responsive, and I treated mobile as a first-class experience—same
            level of engagement and clarity, just tuned for the small screen. Primary CTAs live in a
            hamburger menu so the main content has room to breathe, and the desktop three-column
            layout becomes a single-column, image-forward flow on mobile so events and rewards stay
            easy to browse on the go.
          </p>
          <div className="relative w-full max-w-lg mx-auto aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white bg-[#F3F3F3] order-1 md:order-2">
            {mobileViewVideoUrl && !/loom\.com|youtube\.com|youtu\.be|vimeo\.com/.test(mobileViewVideoUrl) ? (
              <VideoWithFallback
                src={mobileViewVideoUrl}
                fallbackImageSrc={IMG.mobileView}
                fallbackAlt="Mobile view — responsive, hamburger menu, 1-column cards"
                className="absolute inset-0 w-full h-full object-contain box-content bg-black"
              />
            ) : (
              <Image
                src={IMG.mobileView}
                alt="Mobile view — responsive, hamburger menu, 1-column cards"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 512px"
              />
            )}
          </div>
        </div>
      </section>

      {/* Figma design */}
      <section id="figma" className="mb-12 text-center scroll-mt-24">
        <h2 className="text-xl md:text-2xl font-medium text-[#8b5cf6] dark:text-[#a78bfa] mb-4">
          Design — Swank x WeChipn
        </h2>
        <div className="relative w-full rounded-2xl overflow-hidden border border-white/20 bg-[#F3F3F3]">
          <Image
            src={IMG.figma}
            alt="Figma design — Swank x WeChipn flows"
            width={1200}
            height={600}
            className="w-full h-auto object-contain"
            sizes="100vw"
          />
        </div>
      </section>

      {/* Key Takeaways */}
      <section id="takeaways" className="mb-16 text-center scroll-mt-24">
        <p className="text-black dark:text-white leading-relaxed max-w-[934px] mx-auto">
          If we had had more time, I would have kept testing after launch to see how people
          actually engaged with the product—but even within the timeline we had, working side by
          side with engineering made the handoff smooth. I knew how the designs were meant to
          behave, and that made it easier to ship something that felt right.
        </p>
      </section>
    </article>
  );
}
