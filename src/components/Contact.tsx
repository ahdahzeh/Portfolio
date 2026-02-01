'use client';

import Image from 'next/image';
import { personalInfo } from '@/data/portfolio';

export default function Contact() {
  return (
    <section className="w-full mt-3 md:mt-[46px] mb-[27px]">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-12">
          {/* Left - Contact content */}
          <div className="max-w-3xl py-0 order-2 md:order-1">
            <h2 className="text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] font-normal tracking-[-0.02em] text-black dark:text-white mb-6">
              Talk to Me
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-[348px] mb-8">
              I love talking about new ideas and design conversation in general. If you&apos;d like to work together just reach out!
            </p>
            <a
              href={`mailto:${personalInfo.email.replace(/^mailto:/i, '')}?subject=Hey!%20👋`}
              className="flex items-center justify-center gap-2 px-8 h-[88px] w-[283px] bg-[#006eff] rounded-[20px] hover:bg-[#0060d9] transition-colors font-medium text-white"
            >
              <span>Email me</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>

          {/* Right - Profile image (desktop) / Above content (mobile, perlera.co style) */}
          <div className="relative w-full max-w-[280px] mx-auto md:mx-0 md:max-w-none md:w-[480px] aspect-square flex-shrink-0 order-1 md:order-2">
            <Image
              src="/images/profile.png"
              alt="Profile"
              width={480}
              height={480}
              className="absolute inset-0 w-full h-full object-contain"
              priority={false}
            />
          </div>
        </div>
    </section>
  );
}
