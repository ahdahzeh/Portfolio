import type { Metadata } from 'next';
import './globals.css';

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Portfolio | Adaze Oviawe',
  description: 'UX Designer - Building user-centered digital experiences',
  keywords: ['portfolio', 'UX designer', 'product design', 'Amazon', 'Omnicom'],
  authors: [{ name: 'Adaze Oviawe' }],
  openGraph: {
    title: 'Portfolio | Adaze Oviawe',
    description: 'UX Designer - Building user-centered digital experiences',
    url: 'https://ahdahzeh.com',
    siteName: 'Adaze Oviawe Portfolio',
    type: 'website',
    images: [{ url: '/images/profile.png', width: 480, height: 480, alt: 'Adaze Oviawe' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Adaze Oviawe',
    description: 'UX Designer - Building user-centered digital experiences',
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
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
