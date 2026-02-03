interface CategoryBannerProps {
  title: string;
  description?: string;
  imageAlt?: string;
}

export function CategoryBanner({ title, description }: CategoryBannerProps) {
  return (
    <section className="relative bg-gradient-to-br from-slate-700 to-slate-900 text-white overflow-hidden rounded-b-2xl">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80)",
        }}
      />
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
        {description && (
          <p className="text-lg text-slate-200 max-w-2xl">{description}</p>
        )}
      </div>
    </section>
  );
}
