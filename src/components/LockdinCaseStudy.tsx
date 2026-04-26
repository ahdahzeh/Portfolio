'use client';
import { useRef, useEffect } from 'react';
import BackToHomeButton from '@/components/BackToHomeButton';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import SectionNav, { type SectionNavItem } from '@/components/SectionNav';

const SECTIONS: SectionNavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'lanes', label: 'The Lane System' },
  { id: 'features', label: 'Core Features' },
  { id: 'design-system', label: 'Design System' },
  { id: 'dynamic-island', label: 'Dynamic Island' },
  { id: 'focus', label: 'Focus Mode' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'results', label: 'Results' },
];

function LockdinVideo({
  src,
  label,
}: {
  src: string;
  label: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Derive poster path from video path. e.g. /videos/work/lockdin/today-view.mp4 -> /images/work/lockdin/today-view-poster.jpg
  const poster = src
    .replace('/videos/', '/images/')
    .replace(/\.mp4$/, '-poster.jpg');

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full aspect-[9/19.5] bg-[#F2F2F7] rounded-[2rem] overflow-hidden border-[6px] border-gray-900 dark:border-gray-700 shadow-xl">
      {/* Poster fallback so frames are never empty if videos fail to load */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <video
        ref={videoRef}
        playsInline
        muted
        preload="metadata"
        poster={poster}
        className="absolute inset-0 w-full h-full object-cover"
        aria-label={label}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

const LANE_COLORS: Record<string, string> = {
  Career: '#EAB308',
  Wellness: '#16A34A',
  Agency: '#6741D9',
};

interface LockdinCaseStudyProps {
  title: string;
  subtitle?: string;
  roleDisplay?: string;
  timeline?: string;
  link?: string;
  videoUrl?: string;
}

export default function LockdinCaseStudy({
  title = 'LOCKDIN',
  subtitle = 'ADHD Productivity App',
  roleDisplay,
  timeline,
}: LockdinCaseStudyProps) {
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
            <p className="text-[40px] text-black dark:text-black text-center mt-8" style={{ letterSpacing: '-2.4px' }}>
              {subtitle}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-[20px] text-black dark:text-black mt-8 mb-8" style={{ letterSpacing: '0px' }}>
            {timeline != null && <span>Timeline: {timeline}</span>}
            {roleDisplay != null && <span>Role: {roleDisplay}</span>}
          </div>
        </header>

        {/* Hook */}
        <p className="text-black dark:text-white text-lg leading-relaxed text-center max-w-[811px] mx-auto mb-16">
          I built LOCKDIN because every productivity app I tried assumed I could just sit down and plan my day. With ADHD, that&apos;s not how it works. So I designed and shipped a native iOS app that meets you where you are: coaching through the Dynamic Island, sorting your thoughts with AI, and keeping you locked in with ambient sound and haptic breathing patterns.
        </p>

        {/* Hero phone video */}
        <div className="flex justify-center mb-16">
          <div className="w-[280px]">
            <LockdinVideo src="/videos/work/lockdin/onboarding.mp4" label="LOCKDIN onboarding flow" />
          </div>
        </div>
      </div>

      <SectionNav sections={SECTIONS} />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 pt-[35px] pb-[35px] space-y-24 md:space-y-32">

        {/* OVERVIEW */}
        <section id="overview" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white mb-8">Overview</h2>
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 mb-10">
            <p className="text-lg text-black/80 dark:text-white/80 leading-relaxed">
              LOCKDIN organizes your day into three lanes (Career, Wellness, and Agency) instead of one overwhelming task list. It prompts you through the Dynamic Island based on time of day and energy level, parses messy thoughts into sorted tasks with AI, and runs a focus timer with procedural sound and haptic feedback. I went from zero Swift experience to a shipped TestFlight build in under 24 hours, using Claude as my engineering partner for every architecture decision.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Three-Lane Structure</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                Instead of a single list that grows until it&apos;s paralyzing, every task lives in one of three lanes. You always know which part of your life you&apos;re working on, and the decision space stays small enough to act on.
              </p>
              <div className="flex justify-center mt-4">
                <div className="w-[180px]">
                  <LockdinVideo src="/videos/work/lockdin/today-view.mp4" label="LOCKDIN Today view" />
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Brain Dump + AI Parsing</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                The hardest part of ADHD planning is organizing. So I removed that step entirely. You type a stream of consciousness, hit one button, and AI sorts everything into the right lane. No formatting, no categories. Just dump and go.
              </p>
              <div className="flex justify-center mt-4">
                <div className="w-[180px]">
                  <LockdinVideo src="/videos/work/lockdin/brain-dump.mp4" label="LOCKDIN Brain Dump + AI parsing" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section id="problem" className="scroll-mt-24">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-8 md:p-12">
            <p className="text-sm font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 font-mono">
              Problem Statement
            </p>
            <p className="text-xl md:text-2xl font-semibold text-black dark:text-white leading-snug mb-6">
              Every productivity app I tried was designed for people who don&apos;t need a productivity app.
            </p>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              They assume you&apos;ll remember to open them. That you have the energy to plan before you start working. That routines stick if you just try harder. For ADHD, none of that is reliable. A blank task list isn&apos;t a tool. It&apos;s a wall. I needed something that would come to me, not wait for me to come to it. Something that understood energy fluctuates, that organizing is harder than doing, and that small wins need to feel like wins.
            </p>
          </div>
        </section>

        {/* LANE SYSTEM */}
        <section id="lanes" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white mb-6">
            The Lane System
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl mb-12">
            The biggest friction with ADHD task management is deciding what to work on. Fifty tasks in a list means fifty micro-decisions before you even start. Three lanes collapse that into one simple question: which part of my life am I working on right now?
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { name: 'Career', color: '#EAB308', desc: 'The work you get paid for, or want to get paid for. Professional growth, deadlines, deliverables.' },
              { name: 'Wellness', color: '#16A34A', desc: 'Body, mind, and life admin. The foundation everything else runs on.' },
              { name: 'Agency', color: '#6741D9', desc: 'Side projects, creative work, portfolio. The work that&apos;s yours.' },
            ].map((lane) => (
              <div
                key={lane.name}
                className="rounded-2xl p-6 md:p-8"
                style={{ background: `${lane.color}12`, border: `1.5px solid ${lane.color}30` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-3 h-8 rounded-full"
                    style={{ background: lane.color }}
                  />
                  <h3 className="text-xl font-bold" style={{ color: lane.color }}>{lane.name}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{lane.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-[220px]">
                  <LockdinVideo src="/videos/work/lockdin/lanes-setup.mp4" label="LOCKDIN lane setup during onboarding" />
                </div>
              </div>
              <p className="text-sm font-semibold text-black dark:text-white">Onboarding: Name Your Lanes</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">You can rename the lanes, but the colors stay. They become ambient wayfinding across the entire app.</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-[220px]">
                  <LockdinVideo src="/videos/work/lockdin/today-view.mp4" label="LOCKDIN Today view with lane rings" />
                </div>
              </div>
              <p className="text-sm font-semibold text-black dark:text-white">Today View: Lane Rings</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Three progress rings give you your whole day at a glance. No scrolling, no overwhelm.</p>
            </div>
          </div>
        </section>

        {/* CORE FEATURES */}
        <section id="features" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white mb-6">
            Core Features
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
            {[
              { src: '/videos/work/lockdin/today-view.mp4', label: 'Today View', desc: 'Lane rings, task list, energy tracking' },
              { src: '/videos/work/lockdin/brain-dump.mp4', label: 'Brain Dump', desc: 'Stream of consciousness in, sorted tasks out' },
              { src: '/videos/work/lockdin/focus-timer.mp4', label: 'Focus Timer', desc: 'Pomodoro with procedural ambient sound' },
              { src: '/videos/work/lockdin/me-view.mp4', label: 'Me View', desc: 'XP, streaks, level progression' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-[160px]">
                    <LockdinVideo src={item.src} label={item.label} />
                  </div>
                </div>
                <p className="text-sm font-semibold text-black dark:text-white">{item.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Task completion + celebration */}
          <div className="grid md:grid-cols-[1fr_260px] gap-8 md:gap-16 items-center">
            <div className="max-w-lg">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-6">Completing Tasks Should Feel Good</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                ADHD brains run on dopamine. If finishing a task feels the same as not finishing it, there&apos;s no incentive to push through. So I built a celebration system that makes every completion feel like a small win.
              </p>
              <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">XP scales with effort.</strong> Task size maps to XP value. Focus sessions earn XP per interval, not just at the end.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Multi-sensory feedback.</strong> Confetti, haptic patterns, XP popup, and streak update all fire together. You feel it.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                  <span><strong className="text-black dark:text-white">Leveling up.</strong> XP accumulates into levels with a full-screen haptic burst on level-up. It creates the pull to close one more task.</span>
                </li>
              </ul>
            </div>
            <div>
              <LockdinVideo src="/videos/work/lockdin/celebration.mp4" label="LOCKDIN task completion and XP celebration" />
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">Completion + XP + Streak</p>
            </div>
          </div>
        </section>

        {/* DESIGN SYSTEM */}
        <section id="design-system" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white mb-6">
            Design System
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl mb-12">
            Every design decision was filtered through one question: does this reduce cognitive load? Three lane colors are the only accents. White backgrounds keep the interface quiet. Motion is reserved for feedback, not decoration.
          </p>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 hover:border-black/30 dark:hover:border-white/30 transition-colors">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Color System</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                Three colors, three lanes. No gradients, no competing accents. Every color you see in the app tells you which lane you&apos;re looking at.
              </p>
              <div className="flex gap-2">
                {Object.entries(LANE_COLORS).map(([name, color]) => (
                  <div key={name} className="flex-1 text-center">
                    <div className="h-8 rounded-lg mb-1" style={{ background: color }} />
                    <span className="text-xs font-mono text-gray-500">{color}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 hover:border-black/30 dark:hover:border-white/30 transition-colors">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Typography</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                SF Pro Rounded for everything. It feels approachable without being childish. SF Mono for timers, XP values, and stats so numbers always scan instantly. Lane labels run uppercase with tracking for quiet hierarchy.
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 hover:border-black/30 dark:hover:border-white/30 transition-colors">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Motion</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Spring animations on completion rings, XP popups, and celebration bursts. Every animation has a paired CoreHaptics pattern. Motion is the reward system. It tells your hands and eyes that something happened without demanding your attention.
              </p>
            </div>
          </div>
        </section>

        {/* DYNAMIC ISLAND */}
        <section id="dynamic-island" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white mb-6">
            Dynamic Island as Ambient Coach
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl mb-12">
            The core insight: if the app waits for you to open it, you&apos;ll forget. The Dynamic Island turns LOCKDIN into an ambient presence. It&apos;s always there, shifting its message based on time of day and what you&apos;ve done so far. It doesn&apos;t interrupt. It just reminds you it&apos;s there.
          </p>

          <div className="grid md:grid-cols-[1fr_260px] gap-8 md:gap-16 items-center mb-16">
            <div className="max-w-lg">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-6">Time-Slot Prompt Schedule</h3>
              <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                {[
                  { time: '7-9am', prompt: 'Gym check-in. Did you move today?' },
                  { time: '9-10am', prompt: 'Lane planning. Which lanes need tasks?' },
                  { time: '10am-12pm', prompt: 'Task-specific push. "Lock in: [top task]"' },
                  { time: '12-2pm', prompt: 'Midday check-in with rotating encouragement' },
                  { time: '2-5pm', prompt: 'Catch-up nudge if the morning was missed' },
                  { time: '10:30pm', prompt: 'Wind-down. Acknowledge the day\'s work' },
                ].map((slot) => (
                  <li key={slot.time} className="flex items-start gap-3">
                    <span className="font-mono text-xs text-gray-400 dark:text-gray-600 mt-1 whitespace-nowrap">{slot.time}</span>
                    <span>{slot.prompt}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <LockdinVideo src="/videos/work/lockdin/dynamic-island.mp4" label="LOCKDIN Dynamic Island expanded view" />
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">Expanded DI: prompt + lane bars + progress</p>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8">
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">It Also Reacts to What You Do</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  trigger: 'Task completed',
                  response: 'Instantly surfaces the next task. Eight seconds later, a celebration prompt.',
                },
                {
                  trigger: 'Workout logged',
                  response: 'Confirms the workout, then shifts morning prompts to task-focused for the rest of the day.',
                },
              ].map((event) => (
                <div key={event.trigger} className="flex gap-4">
                  <span className="text-gray-300 dark:text-gray-600 mt-1 flex-shrink-0">&rarr;</span>
                  <div>
                    <p className="font-semibold text-black dark:text-white mb-1">{event.trigger}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{event.response}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOCUS MODE */}
        <section id="focus" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white mb-6">
            Focus Mode
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl mb-12">
            ADHD focus isn&apos;t just about willpower. Environment matters. I built a focus timer that creates the right conditions: ambient sound to mask distractions, haptic breathing to keep the body grounded, and a Pomodoro rhythm that makes the work feel finite. No audio files shipped with the app — every sound is generated in real time.
          </p>

          <div className="grid md:grid-cols-[1fr_260px] gap-8 md:gap-16 items-center mb-12">
            <div className="max-w-lg">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-6">Procedural Sound Engine</h3>
              <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                {[
                  { name: 'Brown Noise', desc: 'Running sum filter on random floats. Deep, warm masking texture.' },
                  { name: 'Rain', desc: 'Low-pass filtered noise with random amplitude drops for a natural rainfall pattern.' },
                  { name: 'White Noise', desc: 'Pure random PCM. Flat frequency distribution for maximum distraction masking.' },
                  { name: 'Lo-fi', desc: 'Brown noise base layered with a sine pulse and 60Hz sub-bass hum.' },
                ].map((sound) => (
                  <li key={sound.name} className="flex items-start gap-3">
                    <span className="text-gray-300 dark:text-gray-600 mt-1">•</span>
                    <span><strong className="text-black dark:text-white">{sound.name}:</strong> {sound.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <LockdinVideo src="/videos/work/lockdin/focus-timer.mp4" label="LOCKDIN Focus Timer with sound controls" />
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">Sound picker + volume + haptics toggle</p>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8">
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Haptic Breathing Pattern</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              A CoreHaptics pattern runs a 4-second breathing cycle: a soft tap, a sustained pulse, and an exhale. It gives your body a physical anchor during focus without pulling your attention away from the work. Intensity adapts to user preference.
            </p>
            <div className="font-mono text-sm text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
              <span className="text-gray-600 dark:text-gray-300">0.0s</span> · transient tap (intensity: 0.25)<br />
              <span className="text-gray-600 dark:text-gray-300">0.1s</span> · sustained pulse, 0.8s (intensity: 0.13)<br />
              <span className="text-gray-600 dark:text-gray-300">2.0s</span> · exhale tap (intensity: 0.15)<br />
              <span className="text-gray-600 dark:text-gray-300">4.0s</span> · loop
            </div>
          </div>
        </section>

        {/* ENGINEERING */}
        <section id="engineering" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white mb-6">
            Engineering
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl mb-10">
            This was my first Swift project. I had no native iOS experience before this. I used Claude as a full engineering partner, not for autocomplete but for architecture decisions, debugging concurrency issues, and navigating Xcode&apos;s build system. The result was a production-quality app shipped in under 24 hours.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 mb-10">
            {[
              { title: 'Language & Framework', items: 'Swift 6, SwiftUI, @Observable, strict concurrency' },
              { title: 'Persistence', items: 'SwiftData for local storage, UserDefaults for settings and state' },
              { title: 'System APIs', items: 'ActivityKit (Dynamic Island), CoreHaptics, AVFoundation for procedural audio' },
              { title: 'Architecture', items: '3 targets: LOCKDIN app, LOCKDINWidgets, LOCKDINTests' },
            ].map((stack) => (
              <div key={stack.title} className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8">
                <p className="text-lg font-semibold text-black dark:text-white mb-2">{stack.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stack.items}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 hover:border-black/30 dark:hover:border-white/30 transition-colors">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Strict Concurrency</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                The entire app runs on @MainActor with @Observable for reactive state. CoreHaptics and AVAudioEngine are isolated as singletons with careful task boundaries. Swift 6&apos;s strict concurrency caught real bugs early.
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 hover:border-black/30 dark:hover:border-white/30 transition-colors">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Live Activities</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                The Dynamic Island coaching system shares prompt attributes between the app and widget via target membership. Updates are event-driven. Task completions and workout logs trigger immediate refreshes, with a 15-minute background timer as a fallback.
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 hover:border-black/30 dark:hover:border-white/30 transition-colors">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-3">AI as Engineering Partner</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Claude wasn&apos;t autocomplete on this project. It was a collaborator. Architecture decisions, debugging Swift 6 concurrency errors, Xcode configuration, system design. That partnership is what made it possible to ship a polished app in a domain I&apos;d never worked in before.
              </p>
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <section id="results" className="scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white mb-6">Results</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { value: '<24h', label: 'Ship Time', sublabel: 'Blank project to TestFlight' },
              { value: '0', label: 'Prior Swift Experience', sublabel: 'First native iOS project' },
              { value: '3', label: 'Build Targets', sublabel: 'App, Widgets, Tests' },
              { value: '4', label: 'Sound Types', sublabel: 'All procedurally generated' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 text-center">
                <p className="text-4xl md:text-5xl font-bold tabular-nums font-mono text-black dark:text-white">{stat.value}</p>
                <p className="text-base font-semibold text-black dark:text-white mt-2">{stat.label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CLOSING */}
        <section className="scroll-mt-24 py-[15px]">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-8 md:p-12 text-center">
            <p className="text-lg text-black/80 dark:text-white/80 leading-relaxed max-w-3xl mx-auto">
              LOCKDIN started as a personal tool. I built the app I needed because it didn&apos;t exist. The Dynamic Island coaching layer is something I use every day now. Next up: HealthKit integration, Siri shortcuts, and App Store submission.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
