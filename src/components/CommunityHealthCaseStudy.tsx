'use client';

import { useState } from 'react';
import Image from 'next/image';
import '@/styles/cht-platform.css';
import BackToHomeButton from '@/components/BackToHomeButton';
import LightboxTrigger from '@/components/LightboxTrigger';
import ScrollReveal from '@/components/ScrollReveal';

/** Next/Image requires numeric width/height; display size follows the asset via w-full h-auto. */
const CHT_IMG_W = 1920;
const CHT_IMG_H = 1080;

/** QuickTime .mov often fails in Chrome; prefer optional H.264 `videoMp4` when set. */
function ChtSolutionBrowserVideo({
  src,
  srcMp4,
  label,
}: {
  src: string;
  srcMp4?: string;
  label: string;
}) {
  const [decodeError, setDecodeError] = useState(false);
  const downloadHref = srcMp4 != null && srcMp4 !== '' ? srcMp4 : src;
  if (decodeError) {
    return (
      <div className="cht-browser-content cht-browser-content-solution-video">
        <div className="cht-browser-content-solution-video-fallback">
          <p>
            This screen recording may use a codec your browser can&apos;t play (common with QuickTime{' '}
            <code className="text-sm opacity-90">.mov</code>). Try <strong>Safari</strong>, export an{' '}
            <strong>H.264 .mp4</strong> from QuickTime and add it as <code className="text-sm opacity-90">videoMp4</code>{' '}
            in the data file, or{' '}
            <a href={downloadHref} download>
              download the clip
            </a>{' '}
            and open it locally.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="cht-browser-content cht-browser-content-solution-video relative">
      <video
        playsInline
        muted
        loop
        preload="auto"
        autoPlay
        className="bg-black"
        aria-label={label}
        onError={() => setDecodeError(true)}
      >
        {srcMp4 != null && srcMp4 !== '' ? <source src={srcMp4} type="video/mp4" /> : null}
        <source src={src} type="video/quicktime" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

type ChtSolutionItem = {
  title: string;
  content: string;
  imageAlt: string;
  image?: string;
  video?: string;
  videoMp4?: string;
};

function ChtSolutionSectionWithMedia({ s }: { s: ChtSolutionItem }) {
  return (
    <>
      <section className="cht-solution">
        <div className="cht-solution-left">
          <h3>{s.title}</h3>
        </div>
        <div className="cht-solution-right">
          <p>{s.content}</p>
        </div>
      </section>
      <div className="cht-solution-image">
        <div className="cht-browser-frame">
          <div className="cht-browser-chrome">
            <div className="cht-browser-dot" />
            <div className="cht-browser-dot" />
            <div className="cht-browser-dot" />
            <div className="cht-browser-bar" />
          </div>
          {s.video != null ? (
            <ChtSolutionBrowserVideo src={s.video} srcMp4={s.videoMp4} label={s.imageAlt} />
          ) : s.image != null ? (
            <LightboxTrigger images={[{ src: s.image, alt: s.imageAlt }]}>
              <div className="cht-browser-content cursor-zoom-in relative">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  width={CHT_IMG_W}
                  height={CHT_IMG_H}
                  className="w-full h-auto max-w-full object-contain object-top"
                  sizes="100vw"
                />
              </div>
            </LightboxTrigger>
          ) : null}
        </div>
      </div>
    </>
  );
}

export interface CaseStudySection {
  title?: string;
  content?: string;
  images?: { src: string; alt: string; caption?: string }[];
}

export interface CaseStudyImage {
  src: string;
  alt: string;
  caption?: string;
}

interface CommunityHealthCaseStudyProps {
  title: string;
  subtitle?: string;
  roleDisplay?: string;
  timeline?: string;
  link?: string;
  heroIntro?: string;
  sections: CaseStudySection[];
  images: CaseStudyImage[];
  fourUpItems?: { src: string; alt: string; caption: string; imageScale?: number }[];
  team?: string;
  tools?: string;
  problemStatement?: string;
  takeaways?: { title: string; content: string }[];
  /** HTML reference: industry, role, timeline for metadata */
  industry?: string;
  /** Video for browser frame section (replaces hero image) */
  browserFrameVideo?: string;
  /** Bold lead sentence for overview (Framer-style, ~30px) */
  overviewLead?: string;
  /** CHT HTML: Problem sections */
  chtProblems?: { badge: string; title: string; content: string; image: string; imageAlt: string }[];
  /** CHT HTML: Solution sections — `video` shows a browser-frame walkthrough; `image` is optional poster / still */
  chtSolutions?: {
    title: string;
    content: string;
    imageAlt: string;
    image?: string;
    video?: string;
    videoMp4?: string;
  }[];
  /** CHT HTML: Two-up screenshot pairs */
  chtTwoUpPairs?: { left: { src: string; alt: string; caption: string }; right: { src: string; alt: string; caption: string } }[];
  /** CHT HTML: Outcome/impact cards */
  chtOutcomes?: { title: string; content: string }[];
  /** CHT HTML: Tools used */
  chtTools?: string[];
}

export default function CommunityHealthCaseStudy({
  title,
  subtitle,
  roleDisplay,
  timeline,
  link,
  heroIntro,
  sections,
  images,
  fourUpItems,
  team,
  tools,
  problemStatement,
  industry = 'Healthcare & Pharma Tech',
  browserFrameVideo,
  overviewLead,
  chtProblems,
  chtSolutions,
  chtTwoUpPairs,
  chtOutcomes,
  chtTools,
}: CommunityHealthCaseStudyProps) {
  return (
    <article className="cht-platform min-h-screen">
      <div className="cht-back-wrapper">
        <BackToHomeButton variant="cht" className="text-[15px] font-medium" />
      </div>

      {/* Hero — matches HTML exactly */}
      <section className="cht-hero">
        <h1 className="cht-hero-title">{title}</h1>
        {subtitle && <p className="cht-hero-subtitle">{subtitle}</p>}
      </section>

      {/* Hero Image */}
      {sections[0]?.images?.[0] != null && (
        <div className="cht-hero-image">
          <LightboxTrigger images={[{ src: sections[0].images[0].src, alt: sections[0].images[0].alt }]}>
            <div className="cht-hero-image-wrapper cursor-zoom-in">
              <Image
                src={sections[0].images[0].src}
                alt={sections[0].images[0].alt}
                width={CHT_IMG_W}
                height={CHT_IMG_H}
                className="w-full h-auto max-w-full object-contain object-top"
                sizes="100vw"
              />
            </div>
          </LightboxTrigger>
        </div>
      )}

      {/* Metadata — 4-col grid */}
      <section className="cht-metadata">
        <ScrollReveal>
          <div>
            <p className="cht-meta-label">Industry</p>
            <p className="cht-meta-value cht-meta-multiline">{industry ?? 'Healthcare & Pharma Tech'}</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <div>
            <p className="cht-meta-label">Role</p>
            <p className="cht-meta-value cht-meta-multiline">{roleDisplay ?? 'Product Design'}</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={160}>
          <div>
            <p className="cht-meta-label">Timeline</p>
            <p className="cht-meta-value">{timeline ?? '2026'}</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={240}>
          <div>
            <p className="cht-meta-label">Team</p>
            <p className="cht-meta-value">{team ?? 'Product & Design'}</p>
          </div>
        </ScrollReveal>
      </section>

      {/* Overview — two-column: label left, content right (Framer reference) */}
      {(heroIntro != null || sections[0]?.content != null) && (
        <section className="cht-overview">
          <ScrollReveal>
            <h2 className="cht-overview-label">Overview</h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="cht-overview-content">
              {overviewLead != null && (
                <p className="cht-overview-lead">{overviewLead}</p>
              )}
              <p className="cht-overview-text">
                {overviewLead != null && heroIntro != null
                  ? heroIntro.replace(overviewLead.replace(/\.$/, '') + '. ', '').trim() || heroIntro
                  : heroIntro ?? sections[0]?.content ?? ''}
              </p>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* Statement */}
      {problemStatement != null && problemStatement.trim() !== '' && (
        <section className="cht-statement">
          <ScrollReveal>
            <h2>{problemStatement}</h2>
          </ScrollReveal>
        </section>
      )}

      {/* Full-width screenshot or video with browser frame */}
      {(sections[0]?.images?.[0] != null || browserFrameVideo != null) && (
        <div className="cht-screenshot-section" style={{ padding: `0 var(--cht-page-padding) 100px` }}>
          <ScrollReveal>
            <div className="cht-browser-frame">
              <div className="cht-browser-chrome">
                <div className="cht-browser-dot" />
                <div className="cht-browser-dot" />
                <div className="cht-browser-dot" />
                <div className="cht-browser-bar" />
              </div>
              {browserFrameVideo != null ? (
                <div className="cht-browser-content cht-browser-content-video relative">
                  <video
                    src={browserFrameVideo}
                    autoPlay
                    playsInline
                    muted
                    loop
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    aria-label="CHT Platform site walkthrough"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : sections[0]?.images?.[0] != null ? (
                <LightboxTrigger images={[{ src: sections[0].images[0].src, alt: sections[0].images[0].alt }]}>
                  <div className="cht-browser-content cursor-zoom-in relative">
                    <Image
                      src={sections[0].images[0].src}
                      alt={sections[0].images[0].alt}
                      width={CHT_IMG_W}
                      height={CHT_IMG_H}
                      className="w-full h-auto max-w-full object-contain object-top"
                      sizes="100vw"
                    />
                  </div>
                </LightboxTrigger>
              ) : null}
            </div>
          </ScrollReveal>
        </div>
      )}

      {/* Problem sections */}
      {chtProblems?.map((p, idx) => (
        <div key={idx}>
          <section className="cht-problem">
            <div className="cht-problem-left">
              <div className="cht-problem-badge">{p.badge}</div>
              <h3>{p.title}</h3>
            </div>
            <div className="cht-problem-right">
              <p>{p.content}</p>
            </div>
          </section>
          <div className="cht-problem-image">
            <div className="cht-browser-frame">
              <div className="cht-browser-chrome">
                <div className="cht-browser-dot" />
                <div className="cht-browser-dot" />
                <div className="cht-browser-dot" />
                <div className="cht-browser-bar" />
              </div>
              <LightboxTrigger images={[{ src: p.image, alt: p.imageAlt }]}>
                <div className="cht-browser-content cursor-zoom-in relative">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    width={CHT_IMG_W}
                    height={CHT_IMG_H}
                    className="w-full h-auto max-w-full object-contain object-top"
                    sizes="100vw"
                  />
                </div>
              </LightboxTrigger>
            </div>
          </div>
        </div>
      ))}

      {/* Solution sections + two-up pairs (first two-up after solution 0; last solution may render after second two-up) */}
      {chtSolutions?.map((s, idx) => {
        const deferLastSolution =
          chtTwoUpPairs != null &&
          chtTwoUpPairs.length >= 2 &&
          chtSolutions != null &&
          chtSolutions.length >= 3 &&
          idx === chtSolutions.length - 1;
        if (deferLastSolution) return null;
        return (
        <div key={idx}>
          <ChtSolutionSectionWithMedia s={s} />
          {idx === 0 && chtTwoUpPairs?.[0] != null && (
            <div className="cht-two-up">
              <div>
                <div className="cht-browser-frame">
                  <div className="cht-browser-chrome">
                    <div className="cht-browser-dot" />
                    <div className="cht-browser-dot" />
                    <div className="cht-browser-dot" />
                    <div className="cht-browser-bar" />
                  </div>
                  <LightboxTrigger images={[{ src: chtTwoUpPairs[idx].left.src, alt: chtTwoUpPairs[idx].left.alt }]}>
                    <div className="cht-browser-content cht-browser-content-two-up cht-browser-content-two-up-zoom cursor-zoom-in relative">
                      <Image
                        src={chtTwoUpPairs[idx].left.src}
                        alt={chtTwoUpPairs[idx].left.alt}
                        fill
                        className="object-contain object-top cht-two-up-zoomed-img"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </LightboxTrigger>
                </div>
                <p className="cht-screenshot-caption">{chtTwoUpPairs[0].left.caption}</p>
              </div>
              <div>
                <div className="cht-browser-frame">
                  <div className="cht-browser-chrome">
                    <div className="cht-browser-dot" />
                    <div className="cht-browser-dot" />
                    <div className="cht-browser-dot" />
                    <div className="cht-browser-bar" />
                  </div>
                  <LightboxTrigger images={[{ src: chtTwoUpPairs[0].right.src, alt: chtTwoUpPairs[0].right.alt }]}>
                    <div className="cht-browser-content cht-browser-content-two-up cursor-zoom-in relative">
                      <Image
                        src={chtTwoUpPairs[0].right.src}
                        alt={chtTwoUpPairs[0].right.alt}
                        fill
                        className="object-contain object-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </LightboxTrigger>
                </div>
                <p className="cht-screenshot-caption">{chtTwoUpPairs[0].right.caption}</p>
              </div>
            </div>
          )}
        </div>
        );
      })}

      {/* Second two-up + optional deferred last solution */}
      {chtTwoUpPairs != null && chtTwoUpPairs.length >= 2 && (
        <>
          {chtTwoUpPairs[1] != null && (
            <div className="cht-two-up">
              <div>
                <div className="cht-browser-frame">
                  <div className="cht-browser-chrome">
                    <div className="cht-browser-dot" />
                    <div className="cht-browser-dot" />
                    <div className="cht-browser-dot" />
                    <div className="cht-browser-bar" />
                  </div>
                  <LightboxTrigger images={[{ src: chtTwoUpPairs[1].left.src, alt: chtTwoUpPairs[1].left.alt }]}>
                    <div className="cht-browser-content cht-browser-content-two-up cursor-zoom-in relative">
                      <Image
                        src={chtTwoUpPairs[1].left.src}
                        alt={chtTwoUpPairs[1].left.alt}
                        fill
                        className="object-contain object-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </LightboxTrigger>
                </div>
                <p className="cht-screenshot-caption">{chtTwoUpPairs[1].left.caption}</p>
              </div>
              <div>
                <div className="cht-browser-frame">
                  <div className="cht-browser-chrome">
                    <div className="cht-browser-dot" />
                    <div className="cht-browser-dot" />
                    <div className="cht-browser-dot" />
                    <div className="cht-browser-bar" />
                  </div>
                  <LightboxTrigger images={[{ src: chtTwoUpPairs[1].right.src, alt: chtTwoUpPairs[1].right.alt }]}>
                    <div className="cht-browser-content cht-browser-content-two-up cursor-zoom-in relative">
                      <Image
                        src={chtTwoUpPairs[1].right.src}
                        alt={chtTwoUpPairs[1].right.alt}
                        fill
                        className="object-contain object-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </LightboxTrigger>
                </div>
                <p className="cht-screenshot-caption">{chtTwoUpPairs[1].right.caption}</p>
              </div>
            </div>
          )}
          {chtSolutions != null &&
            chtSolutions.length >= 3 &&
            chtTwoUpPairs != null &&
            chtTwoUpPairs.length >= 2 && (
              <div key="cht-solution-deferred-after-two-up-1">
                <ChtSolutionSectionWithMedia s={chtSolutions[chtSolutions.length - 1]} />
              </div>
            )}
        </>
      )}

      {/* Outcomes */}
      {chtOutcomes != null && chtOutcomes.length > 0 && (
        <section className="cht-outcomes">
          <p className="cht-outcomes-label">Impact</p>
          <h2>What changed</h2>
          <div className="cht-outcomes-grid">
            {chtOutcomes.map((o, i) => (
              <div key={i} className="cht-outcome-card">
                <h4>{o.title}</h4>
                <p>{o.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Four-up grid — 2x2 */}
      {fourUpItems != null && fourUpItems.length > 0 && (
        <div className="cht-four-up">
          {fourUpItems.map((item, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="cht-four-up-item">
                <LightboxTrigger images={[{ src: item.src, alt: item.alt }]}>
                  <div className="cht-four-up-media relative w-full cursor-zoom-in overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-contain object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={
                        item.imageScale != null && item.imageScale !== 1
                          ? {
                              transform: `scale(${item.imageScale})`,
                              transformOrigin: 'top center',
                            }
                          : undefined
                      }
                    />
                  </div>
                </LightboxTrigger>
                <div className="cht-four-up-caption">
                  <strong>{item.alt}</strong> — {item.caption}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}

      {/* Tools */}
      {chtTools != null && chtTools.length > 0 && (
        <section className="cht-tools">
          <p className="cht-tools-label">Tools Used</p>
          <div className="cht-tools-row">
            {chtTools.map((t, i) => (
              <span key={i} className="cht-tool-pill">{t}</span>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      {link != null && (
        <footer
          className="border-t border-black/10 py-9 text-center"
          style={{ paddingLeft: 'var(--cht-page-padding)', paddingRight: 'var(--cht-page-padding)' }}
        >
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#2CB5A0] hover:bg-[#26a090] text-white font-medium transition-colors"
          >
            Visit live site
            <span aria-hidden>→</span>
          </a>
        </footer>
      )}
    </article>
  );
}
