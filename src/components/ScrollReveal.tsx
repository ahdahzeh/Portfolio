'use client';

import { useRef, useState, useEffect } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  /** Stagger delay in ms (e.g. index * 80) */
  delay?: number;
  /** Root margin for intersection (e.g. "0px 0px -80px 0px" to trigger when 80px from bottom) */
  rootMargin?: string;
  /** Minimum fraction of element visible to reveal (0-1) */
  threshold?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  rootMargin = '0px 0px -60px 0px',
  threshold = 0.1,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;
        timeoutId = setTimeout(() => setRevealed(true), delay);
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutId != null) clearTimeout(timeoutId);
    };
  }, [delay, rootMargin, threshold]);

  return (
    <div
      ref={ref}
      className={className}
      data-scroll-reveal
      data-revealed={revealed ? 'true' : undefined}
    >
      {children}
    </div>
  );
}
