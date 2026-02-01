import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Contact from '@/components/Contact';
import WorkCarousel from '@/components/WorkCarousel';
import WritingSection from '@/components/WritingSection';
import NowPlaying from '@/components/NowPlaying';
import Archive from '@/components/Archive';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black overflow-x-hidden pb-24 md:pb-0">
      <Header />

      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <Hero />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      <div className="w-screen relative left-1/2 -translate-x-1/2">
        <WorkCarousel />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <WritingSection />
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8 md:my-12" />
        <NowPlaying />
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8 md:my-12" />
        <Archive />
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
