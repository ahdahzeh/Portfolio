import Link from "next/link";
import { Card } from "@/components/ui";
import { featuredPlaylists, featuredWebinars } from "@/lib/mock/platform";

export default function PlatformDashboardPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Featured Biomarker Playlists
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPlaylists.map((playlist) => (
            <Link key={playlist.id} href={`/platform/watch?playlist=${playlist.id}`}>
              <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer group">
                <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                  {playlist.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {playlist.itemCount} items
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Webinar Catalogue
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredWebinars.map((webinar) => (
            <Link key={webinar.id} href={`/platform/webinars?w=${webinar.id}`}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                <div className="aspect-video bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center rounded-t-xl">
                  <svg
                    className="w-16 h-16 text-teal-600 opacity-70"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                    {webinar.title}
                  </h3>
                  {webinar.speaker && (
                    <p className="text-sm text-gray-500 mt-1">{webinar.speaker}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    {webinar.duration} • {webinar.date}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <Link
            href="/platform/webinars"
            className="text-teal-600 font-medium hover:underline"
          >
            View all webinars →
          </Link>
        </div>
      </section>
    </div>
  );
}
