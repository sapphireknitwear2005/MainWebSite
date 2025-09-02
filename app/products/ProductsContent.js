"use client";

import { useState } from "react";
import RFQForm from "../../components/RFQForm";
import Estimator from "../../components/Estimator";

// Simple modal
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-4xl relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}

export default function ProductsContent() {
  const [openCategory, setOpenCategory] = useState(null);

  // 🔥 Full category list (M, C, T, P, W, S, Q, L, I, J)
  const categories = [
    // ---- M: Manufacturing ----
    {
      key: "manufacturing",
      title: "Full Manufacturing",
      desc: "From sampling to bulk production and delivery.",
      img: "/images/manufacturing.jpg",
      details: (
        <>
          <p>End-to-end RMG production handled in-house.</p>
          <ul className="list-disc pl-5">
            <li>Sample development</li>
            <li>Bulk garment production</li>
            <li>In-house finishing & packing</li>
            <li>On-time delivery</li>
          </ul>
        </>
      ),
    },

    // ---- C: Capabilities ----
    {
      key: "printing",
      title: "Printing",
      desc: "Screen, sublimation & digital printing in-house.",
      img: "/images/printing.jpg",
      details: <p>MOQ: 1,000 pcs, lead time 60 days.</p>,
    },
    {
      key: "embroidery",
      title: "Embroidery",
      desc: "Premium embroidery with advanced machines.",
      img: "/images/embroidery.jpg",
      details: <p>MOQ: 600 pcs/style, embroidery per buyer requirement.</p>,
    },
    {
      key: "washing",
      title: "Garment Washing",
      desc: "Denim & garment washing with eco compliance.",
      img: "/images/washing.jpg",
      details: <p>Stone wash, enzyme wash, acid wash, bio wash.</p>,
    },
    {
      key: "dyeing",
      title: "Fabric Dyeing",
      desc: "Piece & garment dyeing with Azo-free chemicals.",
      img: "/images/dyeing.jpg",
      details: <p>Capacity: 5 tons/day, reactive & pigment dyeing.</p>,
    },
    {
      key: "printing-tech",
      title: "Advanced Printing Tech",
      desc: "Heat transfer, plastisol, puff & foil printing.",
      img: "/images/printing-tech.jpg",
      details: <p>Custom techniques available.</p>,
    },
    {
      key: "finishing",
      title: "Finishing",
      desc: "Thread trimming, ironing, folding & packaging.",
      img: "/images/finishing.jpg",
      details: <p>100% QC before shipment.</p>,
    },

    // ---- T: Textiles ----
    {
      key: "knitwear",
      title: "Knitwear",
      desc: "Tees, polos, hoodies, joggers.",
      img: "/images/knitwear.jpg",
      details: <p>MOQ 1,000 pcs/color. FOB $1.8–9.5.</p>,
    },
    {
      key: "woven",
      title: "Woven",
      desc: "Shirts, chinos, formal trousers.",
      img: "/images/woven.jpg",
      details: <p>MOQ 1,000 pcs/color. FOB $6–14.</p>,
    },
    {
      key: "jackets",
      title: "Jackets",
      desc: "Puffer, softshell, padded jackets.",
      img: "/images/jackets.jpg",
      details: <p>MOQ 600 pcs/style. FOB $10–22.</p>,
    },

    // ---- P: Printing Machines (Machinery Sales) ----
    {
      key: "embroidery-machines",
      title: "Embroidery Machines",
      desc: "Imported embroidery machines for Bangladesh.",
      img: "/images/embroidery-machine.jpg",
      details: <p>Industrial multi-head embroidery machines.</p>,
    },
    {
      key: "printing-machines",
      title: "Printing Machines",
      desc: "Screen printing & heat press equipment.",
      img: "/images/printing-machine.jpg",
      details: <p>Automatic & semi-automatic options.</p>,
    },

    // ---- W: Woven Services ----
    {
      key: "denim",
      title: "Denim",
      desc: "Jeans, jackets, and denim wear.",
      img: "/images/denim.jpg",
      details: <p>FOB $8–14 depending on washes.</p>,
    },

    // ---- S: Special Processes ----
    {
      key: "sustainability",
      title: "Sustainability",
      desc: "Eco-friendly processes, recycled fibers.",
      img: "/images/sustainability.jpg",
      details: <p>GOTS, Oeko-Tex, and BSCI compliant.</p>,
    },

    // ---- Q: Quality ----
    {
      key: "quality-control",
      title: "Quality Control",
      desc: "AQL standard inspections at every stage.",
      img: "/images/quality.jpg",
      details: <p>In-house QC lab with international compliance.</p>,
    },

    // ---- L: Logistics ----
    {
      key: "logistics",
      title: "Logistics & Shipping",
      desc: "Global shipping with on-time delivery.",
      img: "/images/logistics.jpg",
      details: <p>FOB, CIF, and DDP available.</p>,
    },

    // ---- I: Innovation ----
    {
      key: "r&d",
      title: "R&D",
      desc: "Trend research & fabric innovation.",
      img: "/images/research.jpg",
      details: <p>Dedicated design & development team.</p>,
    },

    // ---- J: Joint Services ----
    {
      key: "collaboration",
      title: "Collaborations",
      desc: "Working jointly with brands & factories.",
      img: "/images/collaboration.jpg",
      details: <p>We co-develop collections with clients.</p>,
    },
  ];

  return (
    <section className="space-y-12">
      {/* Intro */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold">
          Our Products & Services
        </h1>
        <p className="text-gray-600 mt-3">
          Sapphire Design LTD offers a complete ecosystem of apparel
          manufacturing, in-house capabilities, machinery sales, and innovation
          — all under one roof.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.key}
            className="group cursor-pointer rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
            onClick={() => setOpenCategory(cat.key)}
          >
            <div className="overflow-hidden">
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-5">
              <h2 className="font-semibold text-lg">{cat.title}</h2>
              <p className="text-gray-600 text-sm mt-1">{cat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {categories.map((cat) => (
        <Modal
          key={cat.key}
          isOpen={openCategory === cat.key}
          onClose={() => setOpenCategory(null)}
          title={cat.title}
        >
          {cat.details}
        </Modal>
      ))}

      {/* RFQ + Estimator */}
      <div className="space-y-6 mt-12">
        <h2 className="text-2xl font-bold text-center">Ready to Start?</h2>
        <RFQForm />
        <Estimator />
      </div>
    </section>
  );
}
