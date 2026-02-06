'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { personalInfo, socialLinks } from '@/data/portfolio';

interface HeroProps {
  /** Delay in ms before the name typewriter animation starts (e.g. after loading screen). */
  animationDelayMs?: number;
}

export default function Hero({ animationDelayMs = 0 }: HeroProps) {
  const [displayedFirstName, setDisplayedFirstName] = useState('');
  const [displayedLastName, setDisplayedLastName] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [animationStarted, setAnimationStarted] = useState(animationDelayMs <= 0);

  const nameParts = (personalInfo.name || 'Adaze Oviawe').split(/\s+(.+)/).filter(Boolean);
  const firstName = nameParts[0] || 'Adaze';
  const lastName = nameParts[1] || 'Oviawe';
  const pronParts = (personalInfo.pronunciation || '[ah-dah-zeh oh-vee-ah-weh]')
    .replace(/^\[|\]$/g, '')
    .split(/\s+(.+)/)
    .filter(Boolean);
  const firstPron = pronParts[0] ? `[${pronParts[0]}]` : '';
  const lastPron = pronParts[1] ? `[${pronParts[1]}]` : pronParts[0] ? '' : personalInfo.pronunciation || '';

  useEffect(() => {
    if (!animationStarted) return;

    const speed = 120;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeFirstName = (i = 0) => {
      if (i <= firstName.length) {
        setDisplayedFirstName(firstName.slice(0, i));
        if (i < firstName.length) {
          timeoutId = setTimeout(() => typeFirstName(i + 1), speed);
        } else {
          timeoutId = setTimeout(() => typeLastName(0), 300);
        }
      }
    };

    const typeLastName = (i = 0) => {
      if (i <= lastName.length) {
        setDisplayedLastName(lastName.slice(0, i));
        if (i < lastName.length) {
          timeoutId = setTimeout(() => typeLastName(i + 1), speed);
        } else {
          setShowCursor(false);
        }
      }
    };

    timeoutId = setTimeout(() => typeFirstName(0), 400);
    return () => clearTimeout(timeoutId);
  }, [firstName, lastName, animationStarted]);

  useEffect(() => {
    if (animationDelayMs <= 0) return;
    const t = setTimeout(() => setAnimationStarted(true), animationDelayMs);
    return () => clearTimeout(t);
  }, [animationDelayMs]);

  return (
    <section className="w-full mt-0 sm:mt-1 md:mt-[80px] mb-[27px] relative min-h-[400px] md:min-h-[350px] bg-white dark:bg-black overflow-visible">
      <div className="max-w-[1200px] mx-auto relative overflow-visible">
        <div className="flex flex-col md:flex-row md:gap-[80px] gap-8 items-start relative z-40 pt-[52px] pb-[52px] min-h-0 md:min-h-[336px]">
          {/* Left - Name with typewriter animation */}
          <div className="flex flex-col gap-2 md:gap-4 order-2 md:order-1 w-full md:min-w-[400px] flex-shrink-0" aria-label={`Name: ${personalInfo.name || 'Adaze Oviawe'}`}>
            <span className="sr-only">{personalInfo.name || 'Adaze Oviawe'}</span>
            <div className="flex items-center gap-2 md:gap-3 flex-nowrap relative min-w-0">
              <h1 className="text-[48px] sm:text-[56px] md:text-[clamp(3rem,10vw,7rem)] font-normal leading-[0.9] text-black dark:text-white tracking-[-2px] md:tracking-[-4px] shrink-0 relative overflow-hidden">
                {/* Hidden full name to reserve space and prevent layout shifts */}
                <span className="invisible block" aria-hidden>{firstName}</span>
                <span className="absolute left-0 top-0">
                  {displayedFirstName}
                  {showCursor && displayedFirstName.length < firstName.length && (
                    <span className="inline-block w-1 md:w-1.5 h-[0.85em] bg-black dark:bg-white ml-0.5 align-middle animate-pulse" aria-hidden />
                  )}
                </span>
              </h1>
              {displayedFirstName === firstName && (
                <span className="text-sm sm:text-base md:text-lg font-normal text-gray-400 whitespace-nowrap shrink-0 translate-y-2.5 py-0">{firstPron}</span>
              )}
            </div>
            <div className="flex items-center gap-2 md:gap-3 flex-nowrap relative min-w-0">
              <h1 className="text-[48px] sm:text-[56px] md:text-[clamp(3rem,10vw,7rem)] font-normal leading-[0.9] text-black dark:text-white tracking-[-2px] md:tracking-[-4px] shrink-0 relative overflow-hidden">
                {/* Hidden full name to reserve space and prevent layout shifts */}
                <span className="invisible block" aria-hidden>{lastName}</span>
                <span className="absolute left-0 top-0">
                  {displayedLastName}
                  {showCursor && displayedFirstName === firstName && displayedLastName.length < lastName.length && (
                    <span className="inline-block w-1 md:w-1.5 h-[0.85em] bg-black dark:bg-white ml-0.5 align-middle animate-pulse" aria-hidden />
                  )}
                </span>
              </h1>
              {displayedLastName === lastName && (
                <span className="text-sm sm:text-base md:text-lg font-normal text-gray-400 whitespace-nowrap shrink-0 translate-y-2.5 py-0">{lastPron}</span>
              )}
            </div>
          </div>
          {/* Right - Profile image (top of hero) - Fixed position to prevent layout shifts */}
          <div className="relative w-full max-w-[280px] mx-auto md:mx-0 md:max-w-none md:w-[360px] flex-shrink-0 order-1 md:order-2">
            <div className="relative w-full aspect-[360/364]">
              <Image
                src="/images/profile.png"
                alt={`${personalInfo.name} headshot`}
                fill
                className="object-contain"
                priority={true}
                sizes="(max-width: 768px) 280px, 360px"
              />
            </div>
          </div>
        </div>
        <p className="text-base sm:text-[17px] font-normal text-black dark:text-white text-center max-w-[1200px] leading-[1.6] mx-auto mt-2 sm:mt-4 md:pt-2">
          I design digital experiences that help people do meaningful things, whether that&apos;s accessing healthcare or making confident purchases online. These are industries where getting it wrong has real consequences. I&apos;ve worked across startups and enterprise teams at{' '}
          <Link href="/work/amazon" className="font-semibold italic text-[#006eff] underline underline-offset-2 hover:text-[#0060d9]">Amazon</Link>
          ,{' '}
          <Link href="/work/block-equity-group" className="font-semibold italic text-[#006eff] underline underline-offset-2 hover:text-[#0060d9]">Block Equity Group</Link>
          , and{' '}
          <a href="https://www.omc.com/capabilities/capability-health/" target="_blank" rel="noopener noreferrer" className="font-semibold italic text-[#006eff] underline underline-offset-2 hover:text-[#0060d9]">Omnicom</a>
          , shipping solutions that improve outcomes, not just metrics.
        </p>
      </div>
    </section>
  );
}
