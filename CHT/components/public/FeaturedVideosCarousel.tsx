"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

const videos = [
  { id: "1", img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=80" },
  { id: "2", img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&q=80" },
  { id: "3", img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&q=80" },
  { id: "4", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80" },
];

export default function FeaturedVideosCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">Featured Videos</h2>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 -ml-6">
            {videos.map((v) => (
              <div key={v.id} className="flex-[0_0_85%] md:flex-[0_0_40%] min-w-0 pl-6">
                <div className="aspect-video rounded-xl overflow-hidden bg-gray-800 relative group cursor-pointer">
                  <img src={v.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                      <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={scrollPrev}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex gap-2">
            {videos.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${i === selectedIndex ? "bg-gray-900" : "bg-gray-300"}`}
              />
            ))}
          </div>
          <button
            onClick={scrollNext}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
