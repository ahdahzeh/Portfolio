'use client';

import Image from 'next/image';
import { useRef } from 'react';
import LightboxTrigger from '@/components/LightboxTrigger';
import ScrollReveal from '@/components/ScrollReveal';

export interface ScrollCardImage {
  src: string;
  alt: string;
  caption?: string;
}

interface CaseStudyScrollCardsProps {
  /** Section title for the screen track (e.g. "Screens") */
  trackTitle?: string;
  /** Cards in the horizontal scroll track (phone_inner style) */
  screenCards: ScrollCardImage[];
  /** Optional section title for the preview grid */
  previewTitle?: string;
  /** Cards in the preview grid (preview_card style); defaults to same as screenCards */
  previewCards?: ScrollCardImage[];
}

export default function CaseStudyScrollCards({
  trackTitle = 'Screens',
  screenCards,
  previewTitle = 'Preview',
  previewCards,
}: CaseStudyScrollCardsProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cards = screenCards;
  const preview = previewCards ?? cards;

  if (cards.length === 0) return null;

  return (
    <>
      {/* Vertical scroll cards: stack of cards, scroll down to see each (reference: scroll card sequence) */}
      <section className="scroll-mt-24 section_vertical_cards mb-24 md:mb-32" aria-label="Screens">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-8">
          {trackTitle}
        </h2>
        <div className="flex flex-col gap-12 md:gap-16">
          {cards.map((card, i) => (
            <ScrollReveal key={i} delay={i * 80} className="vertical_card w-full">
              <div className="w-full rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-gray-50 dark:bg-gray-900/30">
              <LightboxTrigger
                images={cards.map((c) => ({ src: c.src, alt: c.alt }))}
                initialIndex={i}
              >
                <div className="relative aspect-[16/10] w-full cursor-zoom-in hover:opacity-95 transition-opacity focus-within:ring-2 focus-within:ring-[#006eff] focus-within:ring-offset-2">
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
              </LightboxTrigger>
              {card.caption && (
                <p className="text-sm text-gray-500 dark:text-gray-400 p-4 md:p-5 border-t border-gray-200 dark:border-gray-800">
                  {card.caption}
                </p>
              )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Phone / screen track: horizontal scroll of cards (reference: section.ection_phone > phone_track > phone_frame > phone_inner) */}
      <section className="scroll-mt-24 section_phone" aria-label="Screens in a row">
        <div className="padding-global">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
              Screens in a row
            </h2>
            <div
              ref={trackRef}
              className="phone_track overflow-x-auto overflow-y-hidden flex gap-6 pb-4 -mx-4 px-4 md:-mx-0 md:px-0 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
              role="list"
            >
              <div className="phone_frame flex gap-6 min-w-max">
                {cards.map((card, i) => (
                  <ScrollReveal
                    key={i}
                    delay={i * 60}
                    rootMargin="0px 0px -100px 0px"
                    className="phone_inner flex-shrink-0 w-[min(915px,85vw)] snap-start snap-always"
                  >
                    <div role="listitem" className="w-full">
                    <LightboxTrigger
                      images={cards.map((c) => ({ src: c.src, alt: c.alt }))}
                      initialIndex={i}
                    >
                      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-gray-50 dark:bg-gray-900/30 cursor-zoom-in hover:opacity-95 transition-opacity focus-within:ring-2 focus-within:ring-[#006eff] focus-within:ring-offset-2">
                        <div className="relative aspect-[4/3] w-full">
                          <Image
                            src={card.src}
                            alt={card.alt}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 85vw, 915px"
                          />
                        </div>
                        {card.caption && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 p-3 text-center border-t border-gray-200 dark:border-gray-800">
                            {card.caption}
                          </p>
                        )}
                      </div>
                    </LightboxTrigger>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preview grid: 2-col grid of preview cards (reference: section.ection_preview > preview_layout > preview_grid > preview_card) */}
      <section className="scroll-mt-24 section_preview mt-24 md:mt-32" aria-label={previewTitle}>
        <div className="padding-global">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
            {previewTitle && (
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-8">
                {previewTitle}
              </h2>
            )}
            <div className="preview_layout">
              <div className="preview_grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-layout-grid">
                {preview.slice(0, 6).map((card, i) => (
                  <ScrollReveal key={i} delay={i * 80} className="preview_card w-full">
                    <div className="flex flex-col">
                      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-gray-50 dark:bg-gray-900/30 p-6 md:p-8">
                        <LightboxTrigger
                          images={preview.map((c) => ({ src: c.src, alt: c.alt }))}
                          initialIndex={i}
                        >
                          <div className="relative w-full aspect-[4/3] cursor-zoom-in hover:opacity-95 transition-opacity flex items-center justify-center">
                            <Image
                              src={card.src}
                              alt={card.alt}
                              fill
                              className="object-contain object-center preview_card-bg"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                        </LightboxTrigger>
                      </div>
                      {card.caption && (
                        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                          <strong className="text-gray-900 dark:text-white">{card.alt}</strong> — {card.caption}
                        </p>
                      )}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
