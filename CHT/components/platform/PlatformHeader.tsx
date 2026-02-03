import Link from "next/link";

export function PlatformHeader() {
  return (
    <header className="h-16 border-b border-[var(--border)] bg-white flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-900">HCP Platform</h1>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-sm text-gray-600 hover:text-[var(--primary)] transition-colors"
        >
          Back to main site
        </Link>
        <Link
          href="/platform/profile"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Profile"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
