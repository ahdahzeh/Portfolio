'use client';

import Image from 'next/image';
import { personalInfo } from '@/data/portfolio';
import VideoWithFallback from './VideoWithFallback';

export default function Contact() {
  const videoUrl = personalInfo.contactVideoUrl;

  return (
    <section className="w-full mt-3 md:mt-[46px] mb-[27px]">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-12">
          {/* Left - Contact content */}
          <div className="max-w-3xl py-0 order-2 md:order-1">
            <h2 className="text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] font-normal tracking-[-0.02em] text-black dark:text-white mb-8">
              Talk to Me
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-[348px] mb-8">
              {personalInfo.contactMessage}
            </p>
            <div className="flex flex-wrap items-center gap-0">
              <a
                href={`mailto:${personalInfo.email.replace(/^mailto:/i, '')}?subject=Hey!%20👋`}
                className="flex items-center justify-center gap-2 px-8 h-[88px] w-[283px] bg-[#006eff] rounded-[20px] hover:bg-[#0060d9] transition-colors font-medium text-white"
              >
                <span>Get In Touch</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
              {videoUrl && (
                <div className="ml-[50px] relative w-[200px] h-[88px] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                  <VideoWithFallback
                    src={videoUrl}
                    fallbackImageSrc="/images/profile.png"
                    fallbackAlt={`${personalInfo.name} headshot`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right - Profile image (desktop) / Above content (mobile, perlera.co style) */}
          <div className="relative w-full max-w-[280px] mx-auto md:mx-0 md:max-w-none md:w-[480px] aspect-square flex-shrink-0 order-1 md:order-2">
            <Image
              src="/images/profile.png"
              alt={`${personalInfo.name} headshot`}
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
