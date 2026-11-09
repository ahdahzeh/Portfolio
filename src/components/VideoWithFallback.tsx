'use client';

import { useState } from 'react';
import Image from 'next/image';

interface VideoWithFallbackProps {
  src: string;
  fallbackImageSrc: string;
  fallbackAlt: string;
  className?: string;
  poster?: string;
  preload?: 'auto' | 'metadata' | 'none';
}

export default function VideoWithFallback({
  src,
  fallbackImageSrc,
  fallbackAlt,
  className = '',
  poster,
  preload = 'auto',
}: VideoWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <Image
        src={fallbackImageSrc}
        alt={fallbackAlt}
        fill
        className={`object-contain ${className}`}
        sizes="100vw"
      />
    );
  }

  return (
    <video
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload={preload}
      className={`box-content bg-black ${className}`}
      onError={() => setError(true)}
    >
      Your browser does not support the video tag.
    </video>
  );
}
