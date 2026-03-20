import Link from 'next/link';

type BackToHomeButtonProps = {
  className?: string;
  /** Focus ring color token — `cht` uses case-study accent */
  variant?: 'default' | 'cht';
};

/**
 * Pill control styled as a button: empty bordered shell, fill animates in on hover/focus.
 * Uses `<Link>` to `/` (correct semantics for navigation; not `<button>`).
 */
export default function BackToHomeButton({ className = '', variant = 'default' }: BackToHomeButtonProps) {
  const focusRing =
    variant === 'cht'
      ? 'focus-visible:outline-[#2CB5A0]'
      : 'focus-visible:outline-[#006eff]';

  return (
    <Link
      href="/"
      aria-label="Back to home"
      className={[
        'group relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
        'border border-black/12 bg-transparent dark:border-white/15',
        'px-4 py-2.5 text-[13px] font-medium leading-none tracking-tight',
        'text-neutral-600 dark:text-neutral-400',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        focusRing,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span
        className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-black transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 dark:bg-white"
        aria-hidden
      />
      <span className="relative z-[1] flex items-center gap-1.5 transition-colors duration-300 group-hover:text-white dark:group-hover:text-black">
        <span aria-hidden>←</span>
        Back
      </span>
    </Link>
  );
}
