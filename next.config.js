const fs = require('fs');
const path = require('path');
const createMDX = require('@next/mdx');

// The header links the resume only when the PDF is in public/ at build time.
const hasResume = fs.existsSync(path.join(__dirname, 'public/Adaze_Oviawe_Resume.pdf'));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_HAS_RESUME: hasResume ? '1' : '',
  },
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
