'use client';

import { useState, useEffect, useRef } from 'react';
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
  const imageRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const onScroll = () => {
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${window.scrollY * 0.08}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  return (
    <section className="w-full mt-0 sm:mt-1 md:mt-[30px] mb-[27px] relative bg-white dark:bg-black">
      <div className="max-w-[1200px] mx-auto relative">
        <div className="flex flex-col md:flex-row md:gap-[80px] gap-6 items-start relative z-40 pt-[40px] pb-[20px]">
          {/* Left - Name + intro */}
          <div className="flex flex-col gap-2 md:gap-3 order-2 md:order-1 w-full md:min-w-0 md:flex-1" aria-label={`Name: ${personalInfo.name || 'Adaze Oviawe'}`}>
            <span className="sr-only">{personalInfo.name || 'Adaze Oviawe'}</span>
            <div className="flex items-center gap-2 md:gap-3 flex-nowrap relative min-w-0">
              <h1 className="text-[48px] sm:text-[56px] md:text-[clamp(3rem,10vw,7rem)] font-normal leading-[0.9] text-black dark:text-white tracking-[-2px] md:tracking-[-4px] shrink-0 relative overflow-hidden">
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
            {/* Intro paragraph */}
            <p className="text-base sm:text-[17px] font-normal text-black dark:text-white leading-[1.6] mt-4 md:mt-6 md:max-w-[560px]">
              I design and build products in industries where getting it wrong has real consequences. Healthcare access. ADHD productivity. Confident online purchases. I&apos;ve worked across startups and enterprise teams at{' '}
              <Link href="/work/amazon" className="relative inline-block px-1 -mx-1 font-medium tracking-tight text-black dark:text-white group">
                <span aria-hidden className="absolute left-0 right-0 bottom-0 h-[60%] bg-yellow-200 dark:bg-yellow-300/40 -z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[500ms] ease-[cubic-bezier(0.65,0,0.35,1)]" />
                <span className="relative z-10">Amazon</span>
              </Link>
              ,{' '}
              <Link href="/work/block-equity-group" className="relative inline-block px-1 -mx-1 font-medium tracking-tight text-black dark:text-white group">
                <span aria-hidden className="absolute left-0 right-0 bottom-0 h-[60%] bg-yellow-200 dark:bg-yellow-300/40 -z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[500ms] ease-[cubic-bezier(0.65,0,0.35,1)]" />
                <span className="relative z-10">Block Equity Group</span>
              </Link>
              , and{' '}
              <a href="https://www.omc.com/capabilities/capability-health/" target="_blank" rel="noopener noreferrer" className="relative inline-block px-1 -mx-1 font-medium tracking-tight text-black dark:text-white group">
                <span aria-hidden className="absolute left-0 right-0 bottom-0 h-[60%] bg-yellow-200 dark:bg-yellow-300/40 -z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[500ms] ease-[cubic-bezier(0.65,0,0.35,1)]" />
                <span className="relative z-10">Omnicom</span>
              </a>
              . Now Cerebral, my studio in New York.
            </p>
          </div>
          {/* Right - Profile image */}
          <div ref={imageRef} className="relative w-full max-w-[240px] mx-auto md:mx-0 md:max-w-none md:w-[300px] md:min-w-[300px] flex-shrink-0 order-1 md:order-2" style={{ willChange: 'transform' }}>
            <Image
              src="/images/profile.png"
              alt={`${personalInfo.name} headshot`}
              width={300}
              height={304}
              className="w-full h-auto object-contain"
              priority={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
