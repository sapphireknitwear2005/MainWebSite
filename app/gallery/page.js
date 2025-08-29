export const metadata = { title: "Pictures — Sapphire Design LTD" };

export default function Page() {
  // ✅ Real image list
  const items = [
    "1 (1).jpg",
    "1 (2).jpg",
    "1 (3).jpg",
    "1 (4).jpg",
    "1 (5).jpg",
    "1 (6).jpg",
    "1 (7).jpg",
    "1 (8).jpg",
    "1 (9).jpg",
    "1 (10).jpg",
    "1 (11).jpg",
    "1 (12).jpg",
    "1 (13).jpg",
    "1 (14).jpg",
    "1 (15).jpg",
    "1 (16).jpg",
    "1 (17).jpg",
    "1 (18).jpg",
    "1 (19).jpg",
    "1 (20).jpg",
    "1 (21).jpg",
    "1 (22).jpg",
    "1 (23).jpg",
    "1 (24).jpg",
    "1 (27).jpg",
    "1 (28).jpg",
    "1 (29).jpg",
    "1 (30).jpg",
    "1 (31).jpg",
    "1 (32).jpg",
  ].map((name, i) => ({
    src: `/gallery/${name}`, // ✅ make sure your images are in /public/gallery/
    alt: `Sapphire Design factory / product photo ${i + 1}`,
  }));

  return (
    <section className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Pictures</h1>
      <p className="text-gray-700">
        A glimpse into our facilities, production, and workplace environment.
      </p>

      {/* ✅ Responsive Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((it, i) => (
          <img
            key={i}
            src={it.src}
            alt={it.alt}
            className="rounded-2xl bg-gray-100 h-48 w-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}
