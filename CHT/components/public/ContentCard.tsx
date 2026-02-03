import Link from "next/link";
import { Card } from "@/components/ui";

interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
  type: string;
}

interface ContentCardProps {
  item: ContentItem;
}

export function ContentCard({ item }: ContentCardProps) {
  return (
    <Link href={`/platform/watch?id=${item.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
        <div className="aspect-video bg-gray-200 rounded-t-xl overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center group-hover:from-teal-100 group-hover:to-teal-200 transition-colors">
            <svg
              className="w-12 h-12 text-teal-600 opacity-70"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors line-clamp-2">
            {item.title}
          </h3>
          {item.duration && (
            <p className="text-sm text-gray-500 mt-2">{item.duration}</p>
          )}
        </div>
      </Card>
    </Link>
  );
}
