"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { categories } from "../_data/categories";
import Modal from "./Modal";
import Gallery from "./Gallery";
import Viewer360 from "./Viewer360";

export default function CategoryHub() {
  const [active, setActive] = useState(null); // slug or null

  const onOpen = (slug) => setActive(slug);
  const onClose = () => setActive(null);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => onOpen(cat.slug)}
            className="group text-left rounded-2xl border hover:border-indigo-300 hover:shadow-lg transition p-0 overflow-hidden bg-white"
          >
            {/* Card Image */}
            <div className="relative h-44 w-full">
              <Image
                src={cat.hero || "/images/placeholder.jpg"}
                alt={cat.title}
                fill
                className="object-cover group-hover:scale-[1.02] transition"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <h3 className="text-lg font-semibold drop-shadow">{cat.title}</h3>
                <p className="text-xs opacity-90">{cat.tagline}</p>
              </div>
            </div>
            {/* Card Body */}
            <div className="p-4">
              <p className="text-sm text-gray-600 line-clamp-3">{cat.description}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-700">
                <span className="inline-flex items-center rounded-full border px-2 py-1">
                  MOQ: {cat.moq || "—"}
                </span>
                <span className="inline-flex items-center rounded-full border px-2 py-1">
                  Lead: {cat.leadTime || "—"}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {active && <CategoryModal slug={active} onClose={onClose} />}
    </>
  );
}

function CategoryModal({ slug, onClose }) {
  const cat = useMemo(() => categories.find((c) => c.slug === slug), [slug]);
  if (!cat) return null;

  return (
    <Modal title={cat.title} onClose={onClose}>
      <div className="space-y-6">
        <p className="text-gray-700">{cat.description}</p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border p-4">
            <p className="text-sm text-gray-500">MOQ</p>
            <p className="font-semibold">{cat.moq || "—"}</p>
          </div>
          <div className="rounded-2xl border p-4">
            <p className="text-sm text-gray-500">Lead Time</p>
            <p className="font-semibold">{cat.leadTime || "—"}</p>
          </div>
        </div>

        {Array.isArray(cat.bullets) && cat.bullets.length > 0 && (
          <ul className="list-disc ml-5 space-y-1 text-gray-700">
            {cat.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}

        {cat.gallery?.length ? (
          <div>
            <h4 className="font-semibold mb-2">Images</h4>
            <Gallery images={cat.gallery} />
          </div>
        ) : null}

        {cat.viewer360 ? (
          <div>
            <h4 className="font-semibold mb-2">360° View</h4>
            <Viewer360 {...cat.viewer360} />
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3 pt-2">
          <a href="/rfq" className="btn">Start RFQ</a>
          <a href="/estimator" className="btn-secondary">Estimate Lead Time</a>
        </div>
      </div>
    </Modal>
  );
}
