import Link from "next/link";
import { Card } from "@/components/ui";
import { featuredWebinars } from "@/lib/mock/webinars";

export function FeaturedWebinars() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Webinars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredWebinars.map((webinar) => (
            <Link key={webinar.id} href={`/platform/webinars?w=${webinar.id}`}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                <div className="aspect-video bg-gray-200 rounded-t-xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center group-hover:from-teal-100 group-hover:to-teal-200 transition-colors">
                    <svg
                      className="w-16 h-16 text-teal-600 opacity-70"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[var(--primary)] transition-colors">
                    {webinar.title}
                  </h3>
                  {webinar.speaker && (
                    <p className="text-sm text-gray-500 mb-2">{webinar.speaker}</p>
                  )}
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {webinar.description}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{webinar.duration}</span>
                    <span>{webinar.date}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/platform/webinars"
            className="text-teal-600 font-medium hover:underline"
          >
            View all webinars →
          </Link>
        </div>
      </div>
    </section>
  );
}
