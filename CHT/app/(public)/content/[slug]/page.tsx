import { notFound } from "next/navigation";
import { CategoryBanner } from "@/components/public/CategoryBanner";
import { ContentGrid } from "@/components/public/ContentGrid";
import { contentByCategory } from "@/lib/mock/contentItems";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params;
  const category = contentByCategory[slug];
  if (!category) notFound();

  const hasSubcategories = category.subcategories && category.subcategories.length > 0;

  return (
    <>
      <CategoryBanner
        title={category.title}
        description={
          slug === "breast-cancer"
            ? "Treatment-specific content and biomarker playlists"
            : slug === "biomarker-playlists"
              ? "HER2+, HER2-, Triple Negative, and more"
              : "Live and on-demand educational sessions"
        }
      />
      <div className="container mx-auto px-4 py-12">
        {hasSubcategories ? (
          <div className="space-y-12">
            {category.subcategories!.map((sub) => (
              <section key={sub.name}>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">{sub.name}</h2>
                <ContentGrid items={sub.items} />
              </section>
            ))}
          </div>
        ) : (
          <ContentGrid items={category.items || []} />
        )}
      </div>
    </>
  );
}
