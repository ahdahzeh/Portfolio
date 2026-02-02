'use client';

import { useState, useEffect } from 'react';
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
    <section className="w-full mt-5 sm:mt-6 md:mt-[100px] mb-[27px] relative min-h-[400px] md:min-h-[300px] bg-white dark:bg-black">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:gap-[80px] gap-8 items-start relative z-40">
          {/* Left - Name with typewriter animation */}
          <div className="flex flex-col gap-2 md:gap-4" aria-label={`Name: ${personalInfo.name || 'Adaze Oviawe'}`}>
            <span className="sr-only">{personalInfo.name || 'Adaze Oviawe'}</span>
            <div className="flex items-center gap-2 md:gap-3 flex-nowrap">
              <h1 className="text-[48px] sm:text-[56px] md:text-[clamp(3rem,10vw,7rem)] font-normal leading-[0.9] text-black dark:text-white tracking-[-2px] md:tracking-[-4px] min-w-[1ch] shrink-0">
                {displayedFirstName}
                {showCursor && displayedFirstName.length < firstName.length && (
                  <span className="inline-block w-1 md:w-1.5 h-[0.85em] bg-black dark:bg-white ml-0.5 align-middle animate-pulse" aria-hidden />
                )}
              </h1>
              {displayedFirstName === firstName && (
                <span className="text-sm sm:text-base md:text-lg font-normal text-gray-400 whitespace-nowrap shrink-0 translate-y-2.5 py-0">{firstPron}</span>
              )}
            </div>
            <div className="flex items-center gap-2 md:gap-3 flex-nowrap">
              <h1 className="text-[48px] sm:text-[56px] md:text-[clamp(3rem,10vw,7rem)] font-normal leading-[0.9] text-black dark:text-white tracking-[-2px] md:tracking-[-4px] min-w-[1ch] shrink-0">
                {displayedLastName}
                {showCursor && displayedFirstName === firstName && displayedLastName.length < lastName.length && (
                  <span className="inline-block w-1 md:w-1.5 h-[0.85em] bg-black dark:bg-white ml-0.5 align-middle animate-pulse" aria-hidden />
                )}
              </h1>
              {displayedLastName === lastName && (
                <span className="text-sm sm:text-base md:text-lg font-normal text-gray-400 whitespace-nowrap shrink-0 translate-y-2.5 py-0">{lastPron}</span>
              )}
            </div>
          </div>

          {/* Right - Bio & CTA */}
          <div className="flex flex-col gap-6 md:max-w-[480px] md:pt-2">
            <p className="text-base sm:text-[17px] font-normal text-gray-500 dark:text-gray-400 leading-[1.6]">
              I have over 6 years of experience solving problems, designing experiences, and building digital products. I&apos;ve worked with both startups and enterprise teams at companies like{' '}
              {'bioCompanies' in personalInfo && personalInfo.bioCompanies.map((company, i) => (
                <span key={company.name}>
                  <a
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold italic text-[#006eff] underline underline-offset-2 hover:text-[#0060d9]"
                  >
                    {company.name}
                  </a>
                  {i < personalInfo.bioCompanies.length - 2 ? ', ' : i === personalInfo.bioCompanies.length - 2 ? ', and ' : ''}
                </span>
              ))}
              , delivering user-centered solutions that drive measurable results.
            </p>
            <div className="mt-2 sm:mt-4 flex flex-wrap items-center gap-3">
              <span className="text-base text-black dark:text-white">Want to chat?</span>
              <a
                href={`mailto:${personalInfo.email.replace(/^mailto:/i, '')}?subject=Hey!%20👋`}
                className="flex items-center justify-center px-6 py-3 min-w-[160px] bg-[#006eff] rounded-2xl hover:bg-[#0060d9] transition-colors font-medium text-white"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
