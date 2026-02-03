export default function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center pt-16">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80)",
        }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative container mx-auto px-6 text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Innovating the next phase of Healthcare through information
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#content"
            className="px-8 py-3 text-sm font-medium text-black bg-white border border-black rounded-lg hover:bg-gray-50 transition-colors"
          >
            Explore Now
          </a>
          <a
            href="/content/breast-cancer"
            className="px-8 py-3 text-sm font-medium text-white bg-black border border-black rounded-lg hover:bg-gray-800 transition-colors"
          >
            View Content
          </a>
        </div>
      </div>
    </section>
  );
}
