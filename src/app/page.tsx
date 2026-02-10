import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import SectionNav from '@/components/SectionNav';

const WorkCarousel = dynamic(() => import('@/components/WorkCarousel'), { ssr: true });
const WritingSection = dynamic(() => import('@/components/WritingSection'), { ssr: true });
const Archive = dynamic(() => import('@/components/Archive'), { ssr: true });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: true });

const HOME_SECTIONS = [
  { id: 'intro', label: 'Intro' },
  { id: 'past-work', label: 'Past Work' },
  { id: 'design-videos', label: 'Design Videos' },
  { id: 'archive', label: 'Archive' },
  { id: 'contact', label: 'Talk to Me' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black overflow-x-hidden pb-24 md:pb-0">
      <ScrollProgressBar />
      <SectionNav sections={HOME_SECTIONS} />
      <Header />

      <section id="intro" className="scroll-mt-24">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
          <Hero />
        </div>
      </section>

      <section id="past-work" className="scroll-mt-24">
        <div className="w-screen relative left-1/2 -translate-x-1/2">
          <WorkCarousel />
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 pt-[35px] pb-[35px] space-y-24 md:space-y-32">
        <section id="design-videos" className="scroll-mt-24">
          <WritingSection />
        </section>
        <section id="archive" className="scroll-mt-24">
          <Archive />
        </section>
        <section id="contact" className="scroll-mt-24">
          <Contact />
        </section>
      </div>

      <Footer />
    </main>
  );
}
