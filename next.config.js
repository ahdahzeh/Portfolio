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
  // src/lib/work-image.ts checks public/ for a case study's preview image at
  // build time. Without this the file tracer copies all of public/ (the
  // videos, 360 MB) into the server function and Vercel refuses the deploy.
  outputFileTracingExcludes: {
    '*': ['./public/**/*'],
  },
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
