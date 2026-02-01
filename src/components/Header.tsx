'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { personalInfo, socialLinks } from '@/data/portfolio';

const navLinks = [
  { href: '/', label: 'Home', external: false },
  ...(socialLinks.twitter ? [{ href: socialLinks.twitter, label: 'Twitter / X', external: true }] : []),
  ...(socialLinks.linkedin ? [{ href: socialLinks.linkedin, label: 'LinkedIn', external: true }] : []),
  ...(socialLinks.instagram ? [{ href: socialLinks.instagram, label: 'Instagram', external: true }] : []),
  ...(socialLinks.tiktok ? [{ href: socialLinks.tiktok, label: 'TikTok', external: true }] : []),
];

export default function Header() {
  const [currentTime, setCurrentTime] = useState('');
  const [temperature, setTemperature] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const theme = localStorage.getItem('theme');
    setIsDark(theme === 'dark');
  }, [mounted]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    const value = next ? 'dark' : 'light';
    localStorage.setItem('theme', value);
    document.documentElement.classList.toggle('dark', next);
    document.documentElement.style.colorScheme = value;
  };

  useEffect(() => {
    if (!mounted) return;
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const loc = personalInfo.location || 'New York, NY';
    const coords: Record<string, [number, number]> = {
      'New York, NY': [40.7128, -74.006],
      'Atlanta, GA': [33.749, -84.388],
      'New York': [40.7128, -74.006],
    };
    const [lat, lon] = coords[loc] || [40.7128, -74.006];
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`)
      .then((r) => r.json())
      .then((d) => {
        const temp = d?.current?.temperature_2m;
        setTemperature(typeof temp === 'number' ? Math.round(temp) : null);
      })
      .catch(() => setTemperature(null));
  }, [mounted]);

  const linkClass = 'text-base font-normal text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors';

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between h-14 sm:h-16 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 gap-2 sm:gap-4 overflow-hidden">
          {/* Mobile: time & weather on left | Desktop: nav on left */}
          <span className="text-sm sm:text-base font-normal text-black dark:text-white flex-shrink-0 truncate max-w-[180px] sm:max-w-none whitespace-nowrap order-first md:order-last" suppressHydrationWarning>
            {personalInfo.location}
            {mounted && temperature !== null && ` · ${temperature}°`}
            {mounted && ` · ${currentTime || '...'}`}
            {!mounted && ' · —'}
          </span>
          {/* Desktop nav - hidden on mobile */}
          <nav className="hidden md:flex items-center gap-12 lg:gap-24 min-w-0 flex-1 py-2 -my-2 justify-start">
            {navLinks.map((item) =>
              item.external ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              )
            )}
          </nav>
          {/* Theme toggle - far right */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-foreground/10 transition-colors shrink-0 ml-auto"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile: floating hamburger button at bottom right */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col justify-center items-center w-14 h-14 rounded-full bg-white dark:bg-white text-black border border-gray-200 dark:border-gray-600 shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:opacity-90 transition-opacity"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`w-5 h-0.5 bg-current transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-1' : ''}`} />
          <span className={`w-5 h-0.5 bg-current my-1 transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-current transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
        </button>
      </div>

      {/* Mobile: bottom menu panel - 2 lines of links */}
      {menuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/20 dark:bg-white/20 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="md:hidden fixed bottom-24 left-4 right-4 z-50 p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl">
            <nav className="grid grid-cols-3 gap-x-6 gap-y-4 text-center">
              {navLinks.map((item) => (
                <div key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className={linkClass} onClick={() => setMenuOpen(false)}>
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
