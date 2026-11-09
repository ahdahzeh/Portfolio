import type { MDXComponents } from 'mdx/types';
import { Look, Row, Picks } from '@/components/journal/PostBlocks';

// Journal post typography. Body copy sits at a reading measure; links are
// underlined in place (most of them point at products).

const components: MDXComponents = {
  p: (props) => <p className="my-5 text-[17px] md:text-[18px] leading-[1.65] text-gray-800 dark:text-gray-200" {...props} />,
  h2: (props) => (
    <h2 className="mt-14 mb-4 text-xl md:text-2xl font-semibold tracking-tight text-black dark:text-white" {...props} />
  ),
  h3: (props) => <h3 className="mt-10 mb-3 text-lg font-semibold text-black dark:text-white" {...props} />,
  a: ({ href = '', ...props }) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="text-black dark:text-white underline decoration-gray-300 dark:decoration-gray-600 underline-offset-[3px] decoration-1 hover:decoration-black dark:hover:decoration-white transition-colors"
        {...props}
      />
    );
  },
  ul: (props) => <ul className="my-5 pl-5 list-disc space-y-2 text-[17px] md:text-[18px] leading-[1.6] text-gray-800 dark:text-gray-200" {...props} />,
  ol: (props) => <ol className="my-5 pl-5 list-decimal space-y-2 text-[17px] md:text-[18px] leading-[1.6] text-gray-800 dark:text-gray-200" {...props} />,
  blockquote: (props) => (
    <blockquote className="my-10 border-l-2 border-black dark:border-white pl-5 text-xl md:text-2xl leading-snug text-black dark:text-white" {...props} />
  ),
  hr: () => <hr className="my-14 border-gray-200 dark:border-gray-800" />,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  img: (props) => <img className="my-10 w-full h-auto" loading="lazy" {...props} />,
  Look,
  Row,
  Picks,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
