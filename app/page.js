import Link from "next/link";
import LiveCapacityWidget from "../components/LiveCapacityWidget";

export default function Page() {
  return (
    <div className="space-y-28">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-50 via-blue-50 to-gray-50 py-24">
        <div className="container mx-auto text-center max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Premium OEM Garment Manufacturing in Bangladesh
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Sapphire Design Limited — Knitwear, Woven & Jackets. <br />
            <span className="font-medium text-gray-800">
              500,000 pcs/month • OEKO-TEX certified • Est. 2005
            </span>
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <Link
              href="/rfq"
              className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-3 shadow-md transition"
            >
              Start RFQ
            </Link>
            <Link
              href="/gallery"
              className="rounded-2xl border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-lg px-8 py-3 shadow-sm transition"
            >
              View Pictures
            </Link>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="container mx-auto grid md:grid-cols-3 gap-8 text-center">
        {[
          {
            title: "Production Capacity",
            desc: "10 lines • 500k pcs monthly output • Market-standard lead times.",
          },
          {
            title: "Compliance",
            desc: "OEKO-TEX Standard 100 certified. Pursuing BSCI, SEDEX, WRAP, GOTS, GRS, HIGG, ZDHC.",
          },
          {
            title: "Fast Sampling",
            desc: "Development samples ready in 3–4 days. Bulk in 60–75 days.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="card p-8 rounded-2xl shadow hover:shadow-lg transition bg-white"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-24">
        <div className="container mx-auto max-w-5xl text-center space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Buyers Choose Sapphire Design LTD
          </h2>
          <div className="grid md:grid-cols-2 gap-12 text-left">
            {[
              {
                title: "✅ Proven Track Record",
                desc: "20+ years serving global brands with consistent quality & reliability.",
              },
              {
                title: "✅ Flexible Product Range",
                desc: "Knitwear, woven, jackets — fashion, workwear & casual wear.",
              },
              {
                title: "✅ Sustainable Practices",
                desc: "Solar energy, wastewater recycling & chemical management.",
              },
              {
                title: "✅ Direct Communication",
                desc: "Dedicated team, WhatsApp support & transparent processes.",
              },
            ].map((point, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {point.title}
                </h3>
                <p className="text-gray-600">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factory Snapshot */}
      <section className="container mx-auto py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Facility
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              img: "/images/placeholder.jpg",
              title: "Production Lines",
              desc: "Modern knitting, stitching & finishing lines.",
            },
            {
              img: "/images/placeholder.jpg",
              title: "Sampling Room",
              desc: "Rapid 3–4 day development sampling setup.",
            },
            {
              img: "/images/placeholder.jpg",
              title: "Certifications",
              desc: "OEKO-TEX certified, pursuing global compliance standards.",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="card rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition bg-white"
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <p className="font-semibold text-gray-900">{card.title}</p>
                <p className="text-sm text-gray-600">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Capacity Widget */}
      <section className="container mx-auto py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Live Capacity Status
        </h2>
        <LiveCapacityWidget />
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-24 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Start Your Next Collection?
        </h2>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          Let’s build a trusted sourcing partnership. Fast, compliant & scalable
          production — tailored for your brand.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <Link
            href="/rfq"
            className="rounded-2xl bg-white text-gray-900 font-semibold text-lg px-8 py-3 shadow-md hover:shadow-lg transition"
          >
            Request a Quote
          </Link>
          <a
            href="https://wa.me/"
            className="rounded-2xl border border-white text-white font-semibold text-lg px-8 py-3 hover:bg-white hover:text-gray-900 transition"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
