'use client';
import { useEffect } from 'react';

/**
 * Under prefers-reduced-motion, videos without controls (autoplaying covers,
 * loops, scroll-triggered clips) stay paused. Videos with controls still play
 * when the visitor asks.
 */
export default function ReducedMotionVideos() {
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const silent = (v: EventTarget | null): v is HTMLVideoElement =>
      v instanceof HTMLVideoElement && !v.controls;

    const apply = () => {
      document.querySelectorAll('video').forEach((v) => {
        if (!silent(v)) return;
        if (query.matches) v.pause();
        else if (v.autoplay) v.play().catch(() => {});
      });
    };
    const onPlay = (e: Event) => {
      if (query.matches && silent(e.target)) e.target.pause();
    };

    apply();
    // `play` doesn't bubble, so listen in the capture phase.
    document.addEventListener('play', onPlay, true);
    query.addEventListener('change', apply);
    return () => {
      document.removeEventListener('play', onPlay, true);
      query.removeEventListener('change', apply);
    };
  }, []);

  return null;
}
