'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * A small library of inline-link microinteractions for the hero bio.
 * Each variant is a self-contained component so you can A/B them by swapping
 * the wrapper. All accept (children, href). Optional `image` is used by the
 * cursor-thumbnail variant.
 */

interface InlineLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  /** Optional preview image (used by image-cursor variant). */
  image?: string;
}

const A = ({ href, external, children, className, ...rest }: InlineLinkProps & { className?: string; [k: string]: unknown }) => (
  <a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    className={className}
    {...rest}
  >
    {children}
  </a>
);

/* ---------------------------------------------------------------------- */
/* 1. Animated underline — draws in from left on hover, retreats to right */

export function LinkAnimatedUnderline({ href, external, children }: InlineLinkProps) {
  return (
    <A
      href={href}
      external={external}
      className="relative inline text-black dark:text-white font-medium tracking-tight transition-colors hover:text-black/80 dark:hover:text-white/80 underline decoration-transparent underline-offset-[5px] group"
    >
      <span className="relative inline">
        {children}
        <span
          aria-hidden
          className="absolute left-0 right-0 -bottom-[3px] h-[1.5px] bg-current origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
        />
      </span>
    </A>
  );
}

/* ---------------------------------------------------------------------- */
/* 2. Color wipe — solid background slides in from below                  */

export function LinkColorWipe({ href, external, children }: InlineLinkProps) {
  return (
    <A
      href={href}
      external={external}
      className="relative inline-block px-1.5 py-0.5 -mx-1.5 -my-0.5 font-medium tracking-tight text-black dark:text-white transition-colors duration-300 hover:text-white dark:hover:text-black overflow-hidden group"
    >
      <span
        aria-hidden
        className="absolute inset-0 bg-black dark:bg-white origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-[400ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
      />
      <span className="relative">{children}</span>
    </A>
  );
}

/* ---------------------------------------------------------------------- */
/* 3. Reveal stack — current text moves up, replacement text rises in     */

export function LinkRevealStack({ href, external, children }: InlineLinkProps) {
  return (
    <A
      href={href}
      external={external}
      className="relative inline-block overflow-hidden align-baseline font-medium tracking-tight text-black dark:text-white group leading-none py-0.5"
    >
      <span className="block transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 flex items-center transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] translate-y-full group-hover:translate-y-0 italic text-black/70 dark:text-white/70"
      >
        {children}
      </span>
    </A>
  );
}

/* ---------------------------------------------------------------------- */
/* 4. Magnetic dot — small dot leads the link, slides to the right        */

export function LinkMagneticDot({ href, external, children }: InlineLinkProps) {
  return (
    <A
      href={href}
      external={external}
      className="relative inline-flex items-center font-medium tracking-tight text-black dark:text-white group"
    >
      <span
        aria-hidden
        className="inline-block w-1.5 h-1.5 rounded-full bg-black dark:bg-white mr-1.5 -ml-0.5 transition-all duration-[300ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-[3px] group-hover:scale-125"
      />
      <span className="underline decoration-1 decoration-transparent group-hover:decoration-current underline-offset-[5px] transition-colors duration-300">
        {children}
      </span>
    </A>
  );
}

/* ---------------------------------------------------------------------- */
/* 5. Marker highlight — yellow/colored highlight wipes across            */

export function LinkMarkerHighlight({ href, external, children }: InlineLinkProps) {
  return (
    <A
      href={href}
      external={external}
      className="relative inline-block px-1 -mx-1 font-medium tracking-tight text-black dark:text-white group"
    >
      <span
        aria-hidden
        className="absolute left-0 right-0 bottom-0 h-[60%] bg-yellow-200 dark:bg-yellow-300/40 -z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[500ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
      />
      <span className="relative z-10">{children}</span>
    </A>
  );
}

/* ---------------------------------------------------------------------- */
/* 6. Image cursor — preview thumbnail follows the pointer on hover       */

export function LinkImageCursor({ href, external, children, image }: InlineLinkProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    const img = imgRef.current;
    if (!el || !img) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      img.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 110%))`;
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <span
      ref={wrapRef}
      className="relative inline"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <A
        href={href}
        external={external}
        className="font-medium tracking-tight text-black dark:text-white underline decoration-1 underline-offset-[5px] decoration-current transition-colors hover:text-black/70 dark:hover:text-white/70"
      >
        {children}
      </A>
      {image && (
        <span
          ref={imgRef}
          aria-hidden
          className={`pointer-events-none absolute left-0 top-0 z-50 transition-opacity duration-200 ${
            hovering ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ willChange: 'transform' }}
        >
          <span className="block w-[140px] h-[100px] rounded-lg overflow-hidden border border-black/10 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.18)] bg-white dark:bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="" className="w-full h-full object-cover" />
          </span>
        </span>
      )}
    </span>
  );
}

/* ---------------------------------------------------------------------- */
/* 7. Bracket frame — square brackets emerge to wrap the word             */

export function LinkBracketFrame({ href, external, children }: InlineLinkProps) {
  return (
    <A
      href={href}
      external={external}
      className="relative inline px-1 -mx-1 font-medium tracking-tight text-black dark:text-white group"
    >
      <span
        aria-hidden
        className="absolute -left-1 top-0 bottom-0 w-1.5 border-l border-y border-current opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
      />
      <span
        aria-hidden
        className="absolute -right-1 top-0 bottom-0 w-1.5 border-r border-y border-current opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
      />
      <span className="relative">{children}</span>
    </A>
  );
}

/* ---------------------------------------------------------------------- */
/* 9. Album cover (reboot.studio) — inline thumbnail pinned next to word  */
/*    Heavy stacked shadow, baseline-aligned, sized to text. On hover, a  */
/*    pill pops up below with the brand name.                             */

export function LinkAlbumCover({ href, external, children, image }: InlineLinkProps) {
  return (
    <span className="group relative inline-flex items-baseline align-baseline">
      {image && (
        <span
          aria-hidden
          className="relative inline-flex items-center justify-center align-text-bottom mr-1.5 h-[1.2em] w-[1.2em] sm:h-[1.5em] sm:w-[1.5em] rounded-[6px] sm:rounded-[8px] overflow-hidden bg-white"
          style={{
            // Stacked shadow — exact recipe from reboot.studio
            boxShadow:
              '0 1px 1px -0.5px rgba(0,0,0,0.06),0 3px 3px -1.5px rgba(0,0,0,0.06),0 6px 6px -3px rgba(0,0,0,0.05),0 12px 12px -6px rgba(0,0,0,0.04),0 24px 24px -12px rgba(0,0,0,0.04)',
            transform: 'translateY(0.18em)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" className="w-full h-full object-cover" />
        </span>
      )}
      <A
        href={href}
        external={external}
        className="font-medium tracking-tight text-black dark:text-white underline decoration-1 underline-offset-[5px] decoration-current/40 hover:decoration-current transition-[text-decoration-color] duration-300"
      >
        {children}
      </A>
    </span>
  );
}

/* ---------------------------------------------------------------------- */
/* 8. Letter cascade — each letter shifts up slightly, staggered          */

export function LinkLetterCascade({ href, external, children }: InlineLinkProps) {
  const text = typeof children === 'string' ? children : '';
  if (!text) {
    return (
      <A href={href} external={external} className="font-medium tracking-tight text-black dark:text-white underline decoration-1 underline-offset-[5px]">
        {children}
      </A>
    );
  }
  return (
    <A
      href={href}
      external={external}
      className="inline-block font-medium tracking-tight text-black dark:text-white underline decoration-1 underline-offset-[5px] decoration-current/50 hover:decoration-current group"
    >
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-[2px]"
          style={{ transitionDelay: `${i * 18}ms`, whiteSpace: 'pre' }}
        >
          {ch}
        </span>
      ))}
    </A>
  );
}
