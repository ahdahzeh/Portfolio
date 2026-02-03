import Link from "next/link";
import { Card } from "@/components/ui";
import { featuredWebinars } from "@/lib/mock/webinars";

export default function WebinarsPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Recommended Activity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredWebinars.slice(0, 2).map((webinar) => (
            <Link key={webinar.id} href={`/platform/webinars?w=${webinar.id}`}>
              <Card className="flex overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                <div className="w-48 flex-shrink-0 aspect-video bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center">
                  <svg className="w-12 h-12 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="p-4 flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-teal-600">
                    {webinar.title}
                  </h3>
                  {webinar.speaker && (
                    <p className="text-sm text-gray-500 mt-1">{webinar.speaker}</p>
                  )}
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {webinar.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {webinar.duration} • {webinar.date}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Webinar Catalogue
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredWebinars.map((webinar) => (
            <Link key={webinar.id} href={`/platform/webinars?w=${webinar.id}`}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                <div className="aspect-video bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center">
                  <svg className="w-16 h-16 text-teal-600 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-teal-600">
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
      </section>
    </div>
  );
}
