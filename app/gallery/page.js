export const metadata = { title: "Pictures — Sapphire Design LTD" };

export default function Page() {
  const items = Array.from({ length: 12 }).map((_, i) => ({
    src: `/images/gallery/placeholder-${i + 1}.webp`,
    alt: `Factory / product photo ${i + 1}`,
  }));
  return (
    <section className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Pictures</h1>
      <p className="text-gray-700">
        Drop your photos into <code>/public/images/gallery/</code>. Keep
        WebP/AVIF for speed. Thumbnails are responsive and lazy-loaded by the
        browser.
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((it, i) => (
          <img
            key={i}
            src={it.src}
            alt={it.alt}
            className="rounded-2xl bg-gray-100 h-48 w-full object-cover"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}
