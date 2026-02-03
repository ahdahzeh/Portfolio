import Link from "next/link";
import { contentCategories } from "@/lib/mock/content";

export function ContentCategories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          View treatment specific content
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contentCategories.map((category) => (
            <Link key={category.slug} href={`/content/${category.slug}`}>
              <div className="bg-white rounded-xl border border-[var(--border)] p-6 hover:shadow-md hover:border-teal-500/30 transition-all cursor-pointer group">
                <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
                <span className="inline-block mt-4 text-teal-600 font-medium text-sm">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
