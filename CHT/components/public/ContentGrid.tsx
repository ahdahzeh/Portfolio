import { ContentCard } from "./ContentCard";

interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
  type: string;
}

interface ContentGridProps {
  items: ContentItem[];
  columns?: 2 | 3 | 4;
}

export function ContentGrid({ items, columns = 3 }: ContentGridProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-6 ${
        columns === 2 ? "md:grid-cols-2" : columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {items.map((item) => (
        <ContentCard key={item.id} item={item} />
      ))}
    </div>
  );
}
