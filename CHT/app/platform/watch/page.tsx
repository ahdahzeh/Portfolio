import { ContentGrid } from "@/components/public/ContentGrid";
import { contentByCategory } from "@/lib/mock/contentItems";

const allContent = [
  ...(contentByCategory["breast-cancer"]?.subcategories?.flatMap((s) => s.items) || []),
  ...(contentByCategory["biomarker-playlists"]?.items || []),
  ...(contentByCategory["webinars"]?.items || []),
];

export default function WatchPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Watch</h2>
      <p className="text-gray-600 mb-8">
        On-demand webinars and educational content. Click to watch.
      </p>
      <ContentGrid items={allContent} columns={4} />
    </div>
  );
}
