"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center border border-gray-900 rounded-sm">
            <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="font-semibold text-gray-900 text-sm tracking-wide">CHT MEDIA</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">About</Link>
          <Link href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">Services</Link>
          <Link href="/content/breast-cancer" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">Content Library</Link>
          <Link href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">Portals</Link>
          <Link href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">Careers</Link>
        </nav>
        <div className="flex items-center gap-3">
          <button aria-label="Search" className="p-2 text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <Link
            href="/platform"
            className="px-4 py-2.5 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors border border-black"
          >
            Login
          </Link>
          <Link
            href="/platform"
            className="px-4 py-2.5 text-sm font-medium text-black bg-white border border-black rounded-lg hover:bg-gray-50 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
