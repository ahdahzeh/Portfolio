import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Adaze Oviawe — Designer and engineer at Cerebral, NYC',
    template: '%s — Adaze Oviawe',
  },
  description:
    'I design and build products in industries where the interface has consequences. Healthcare, fintech, ADHD productivity, luxury resale. Cerebral, NYC.',
  keywords: [
    'Adaze Oviawe',
    'ahdahzeh',
    'design engineer',
    'product designer',
    'NYC designer',
    'Cerebral studio',
    'LOCKDIN',
    'Scour',
    'iOS designer',
    'Next.js designer',
    'SwiftUI designer',
    'Amazon',
    'Block Equity Group',
    'Omnicom',
    'ADHD app design',
  ],
  authors: [{ name: 'Adaze Oviawe', url: 'https://ahdahzeh.com' }],
  creator: 'Adaze Oviawe',
  publisher: 'Adaze Oviawe',
  alternates: {
    canonical: 'https://ahdahzeh.com',
  },
  openGraph: {
    title: 'Adaze Oviawe — Designer and engineer at Cerebral, NYC',
    description:
      'I design and build products in industries where the interface has consequences. Healthcare, fintech, ADHD productivity, luxury resale.',
    url: 'https://ahdahzeh.com',
    siteName: 'Adaze Oviawe',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Adaze Oviawe — Designer and engineer at Cerebral, NYC. Past: Amazon, Block Equity Group, Omnicom.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adaze Oviawe — Designer and engineer at Cerebral, NYC',
    description:
      'I design and build products in industries where the interface has consequences. Healthcare, fintech, ADHD productivity, luxury resale.',
    creator: '@ahdahzeh',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}else{document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light';if(!t)localStorage.setItem('theme','light');}})();`,
          }}
        />
      </head>
      <body className={`${dmSans.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
