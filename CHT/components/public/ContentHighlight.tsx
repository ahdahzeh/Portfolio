export default function ContentHighlight() {
  return (
    <section id="content" className="py-16 bg-black">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Content Title</h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <a
              href="/platform"
              className="inline-block px-6 py-3 text-sm font-medium text-white bg-black border border-gray-800 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Explore
            </a>
          </div>
          <div className="flex gap-4 md:gap-6">
            <div className="flex-1 aspect-[3/4] rounded-lg overflow-hidden bg-gray-800">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80"
                alt="Dr. Adaeze Oviawe"
                className="w-full h-full object-cover"
              />
              <div className="mt-3">
                <p className="font-semibold text-white text-sm">Arfan</p>
                <p className="text-gray-500 text-xs">Head of Cardiology</p>
              </div>
            </div>
            <div className="flex-1 aspect-[3/4] rounded-lg overflow-hidden bg-gray-800">
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80"
                alt="Dr. John Smith"
                className="w-full h-full object-cover"
              />
              <div className="mt-3">
                <p className="font-semibold text-white text-sm">Maria B</p>
                <p className="text-gray-500 text-xs">Oncologist</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
