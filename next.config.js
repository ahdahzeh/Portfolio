const createMDX = require('@next/mdx');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Journal posts live in src/content/journal/*.mdx and are imported by
  // src/app/journal/[slug]/page.tsx.
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'books.google.com',
      },
      {
        protocol: 'https',
        hostname: 'www.tiktok.com',
      },
    ],
  },
};

const withMDX = createMDX({});

module.exports = withMDX(nextConfig);
