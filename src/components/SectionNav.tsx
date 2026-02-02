'use client';

import { useState, useEffect } from 'react';

export interface SectionNavItem {
  id: string;
  label?: string;
}

interface SectionNavProps {
  sections: SectionNavItem[];
}

export default function SectionNav({ sections }: SectionNavProps) {
  const [activeId, setActiveId] = useState<string | null>(sections[0]?.id ?? null);

  useEffect(() => {
    if (sections.length === 0) return;

    const observers: IntersectionObserver[] = [];
    const observerOptions: IntersectionObserverInit = {
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    const handleIntersect = (id: string) => (entries: IntersectionObserverEntry[]) => {
      if (entries[0]?.isIntersecting) setActiveId(id);
    };

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(handleIntersect(id), observerOptions);
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
      aria-label="Case study sections"
    >
      <ul className="flex flex-col gap-2">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block w-2.5 h-2.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black ${
                activeId === id
                  ? 'bg-amber-500 dark:bg-amber-500'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-amber-500 dark:hover:bg-amber-500'
              }`}
              title={label ?? id.replace(/-/g, ' ')}
              aria-current={activeId === id ? 'true' : undefined}
            >
              <span className="sr-only">{label ?? id.replace(/-/g, ' ')}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
