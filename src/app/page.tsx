import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

const WorkCarousel = dynamic(() => import('@/components/WorkCarousel'), { ssr: true });
const WritingSection = dynamic(() => import('@/components/WritingSection'), { ssr: true });
const NowPlaying = dynamic(() => import('@/components/NowPlaying'), { ssr: true });
const Archive = dynamic(() => import('@/components/Archive'), { ssr: true });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: true });

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black overflow-x-hidden pb-24 md:pb-0">
      <Header />

      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <Hero />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

      <div className="w-screen relative left-1/2 -translate-x-1/2">
        <WorkCarousel />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <WritingSection />
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-8 md:my-12" />
        <NowPlaying />
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-8 md:my-12" />
        <Archive />
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
