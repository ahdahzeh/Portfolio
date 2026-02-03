export default function CTASection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 max-w-3xl mx-auto leading-tight [font-family:var(--font-playfair),serif]">
          A media company thats about more than just content
        </h2>
        <a
          href="/platform"
          className="inline-block px-10 py-4 text-sm font-medium text-white bg-black border border-black rounded-lg hover:bg-gray-800 transition-colors"
        >
          Read More
        </a>
      </div>
    </section>
  );
}
