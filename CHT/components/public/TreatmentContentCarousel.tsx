"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";

const treatments = [
  { id: "covid-19", title: "COVID-19", img: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&q=80" },
  { id: "breast-cancer", title: "Breast Cancer", img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=80" },
  { id: "weight-loss", title: "Weight Loss", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
  { id: "diabetes", title: "Diabetes", img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=80" },
];

export default function TreatmentContentCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center", loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

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
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">View treatment specific content</h2>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 -ml-6">
            {treatments.map((t) => (
              <Link key={t.id} href={`/content/${t.id}`} className="flex-[0_0_85%] md:flex-[0_0_45%] min-w-0 pl-6">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-800 relative group">
                  <img src={t.img} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white">{t.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <div className="flex gap-2">
            {treatments.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${i === selectedIndex ? "bg-gray-900" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
