"use client";

import { useState } from "react";

const faqs = [
  { id: "1", question: "Lorem Ipsum dolor sit amet consectetur adipiscing elit" },
  { id: "2", question: "Lorem Ipsum dolor sit amet consectetur adipiscing elit" },
  { id: "3", question: "Lorem Ipsum dolor sit amet consectetur adipiscing elit" },
  { id: "4", question: "Lorem Ipsum dolor sit amet consectetur adipiscing elit" },
  { id: "5", question: "Lorem Ipsum dolor sit amet consectetur adipiscing elit" },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">FAQ</h2>
        <div className="space-y-0 border-t border-gray-200">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border-b border-gray-200"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full py-6 flex items-center justify-between text-left"
              >
                <span className="text-gray-900 font-medium pr-4">{faq.question}</span>
                <span className={`w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 transition-transform ${openId === faq.id ? "rotate-45" : ""}`}>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
              {openId === faq.id && (
                <div className="pb-6 pl-0 pr-12">
                  <p className="text-gray-400 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
