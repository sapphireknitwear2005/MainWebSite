// app/products/_data/categories.js
// Centralized data powering the Products hub. Edit freely.

export const categories = [
  {
    slug: "manufacturing",
    title: "Manufacturing (Cut–Sew–Finish)",
    tagline: "End-to-end lines: cutting, sewing, finishing, packing",
    hero: "/images/products/manufacturing/hero.webp",
    description:
      "10 lines across knit & light woven. Rapid sampling (3–4 days dev), PP 7–10 days, bulk 60–75 days depending on trims and fabric lead-times.",
    moq: "1,000 pcs/color (basic knit); 600 pcs/style (light jackets)",
    leadTime: "Dev 3–4 days • PP 7–10 days • Bulk 60–75 days",
    bullets: [
      "CAD markers, auto-spread & manual cut table",
      "Inline & end-of-line QA; needle detection optional",
      "Packing with metal-free zones by buyer SOP",
    ],
    gallery: [
      "/images/products/manufacturing/line-1.webp",
      "/images/products/manufacturing/line-2.webp",
      "/images/products/manufacturing/finishing.webp",
    ],
    viewer360: {
      prefix: "/images/products/manufacturing/360/line_",
      frames: 24,
      suffix: ".webp",
    },
  },
  {
    slug: "capabilities",
    title: "Capabilities (R&D, Sampling, CAD)",
    tagline: "Pattern, grading, proto, fit, PP — rapid sample room",
    hero: "/images/products/capabilities/hero.webp",
    description:
      "Dedicated sample room with CAD patterning & grading. Daily capacity up to 200 protos depending on complexity.",
    moq: "Flexible for development (from 1 proto)",
    leadTime: "Dev 3–4 days • Fit 5–7 days • PP 7–10 days",
    bullets: [
      "Digital pattern & grading (DXF/PLT)",
      "Trim & fabric R&D with nominated mills",
      "Costing trials & risk assessment",
    ],
    gallery: [
      "/images/products/capabilities/sample-1.webp",
      "/images/products/capabilities/sample-2.webp",
      "/images/products/capabilities/pattern.webp",
    ],
  },
  {
    slug: "textiles",
    title: "Textiles (Knit & Woven)",
    tagline: "Single jersey, pique, fleece, rib; poplin, oxford, twill, denim",
    hero: "/images/products/textiles/hero.webp",
    description:
      "Fabric sourcing from approved mills. Options across organic cotton, recycled poly, Tencel, modal and performance finishes.",
    moq: "Roll-based; typical lot from 1,000–3,000 meters",
    leadTime: "Greige 7–10 days • Dye/finish 14–21 days",
    bullets: [
      "OEKO-TEX compliant inputs",
      "Color lab dips in 2–3 days",
      "Performance: wicking, anti-pilling, anti-microbial",
    ],
    gallery: [
      "/images/products/textiles/knit.webp",
      "/images/products/textiles/woven.webp",
      "/images/products/textiles/denim.webp",
    ],
  },
  {
    slug: "jackets",
    title: "Jackets & Outerwear",
    tagline: "Light padded, softshell, windcheater, coach jackets",
    hero: "/images/products/jackets/hero.webp",
    description:
      "Specialization in light padded & softshell with bonding and seam-sealing partners. Down alternative fills and recycled insulation available.",
    moq: "600 pcs/style",
    leadTime: "Dev 5–7 days • PP 10–14 days • Bulk 75–90 days",
    bullets: [
      "Panel bonding & seam sealing via approved partners",
      "YKK/SBS zippers; reflective & taped trims options",
      "Lab testing for water penetration & seam strength",
    ],
    gallery: [
      "/images/products/jackets/puffer.webp",
      "/images/products/jackets/softshell.webp",
      "/images/products/jackets/wind.webp",
    ],
  },
  {
    slug: "printing-embroidery",
    title: "Printing & Embroidery",
    tagline: "Screen, digital, sublimation, heat-transfer; 2D/3D embroidery",
    hero: "/images/products/printing/hero.webp",
    description:
      "In-house printing and embroidery with eco-conscious inks and threads. PMS matching and hand-feel optimization.",
    moq: "Per artwork: from 300 pcs (screen) / 100 pcs (DTF/HT)",
    leadTime: "Screens 3–5 days • Bulk 7–14 days",
    bullets: [
      "Water-based & plastisol options; puff, foil, discharge",
      "3D/padded embroidery; appliqué and badges",
      "Inline curing and durability testing",
    ],
    gallery: [
      "/images/products/printing/screen.webp",
      "/images/products/printing/digital.webp",
      "/images/products/printing/embroidery.webp",
    ],
  },
  {
    slug: "trims-accessories",
    title: "Trims & Accessories",
    tagline: "Buttons, zippers, elastics, cords, patches, labels",
    hero: "/images/products/trims/hero.webp",
    description:
      "Approved trims library with nominated suppliers or open-source options. Bulk QA by AQL 1.5/2.5 as per buyer SOP.",
    moq: "Per trim spec; typical 1,000–5,000 pcs",
    leadTime: "3–14 days depending on custom molds/branding",
    bullets: [
      "Woven labels, heat-seal transfers, rubber patches",
      "Metal trims: nickel-free options",
      "Care & brand label compliance (country-specific)",
    ],
    gallery: [
      "/images/products/trims/buttons.webp",
      "/images/products/trims/zippers.webp",
      "/images/products/trims/labels.webp",
    ],
  },
  {
    slug: "washing-finishing",
    title: "Washing & Finishing",
    tagline: "Stone, enzyme, silicone, garment-dye, peaching",
    hero: "/images/products/washing/hero.webp",
    description:
      "Partner laundries with ETP and ZDHC-aligned chemistry. Controlled shade variance and shrinkage metrics.",
    moq: "Per wash; typically 600–1,200 pcs/run",
    leadTime: "5–12 days after greige/garment ready",
    bullets: [
      "Denim & knit washes; laser whiskers via partners",
      "Test reports: colorfastness, crocking, shrinkage",
      "Bulk PP pre-approvals and sealed samples",
    ],
    gallery: [
      "/images/products/washing/denim-wash.webp",
      "/images/products/washing/garment-dye.webp",
      "/images/products/washing/peach.webp",
    ],
  },
  {
    slug: "sustainability",
    title: "Sustainability",
    tagline: "Solar, water recycling, chemical management",
    hero: "/images/products/sustainability/hero.webp",
    description:
      "Roadmap to GOTS/GRS, HIGG FEM/FSLM, and ZDHC conformance. Water recycling and solar initiatives in place.",
    moq: "N/A",
    leadTime: "N/A",
    bullets: [
      "Chemical inventory & MRSL alignment",
      "Energy & water KPIs; yearly improvement targets",
      "Recycled inputs & sustainable packaging options",
    ],
    gallery: [
      "/images/products/sustainability/solar.webp",
      "/images/products/sustainability/water.webp",
      "/images/products/sustainability/chem.webp",
    ],
  },
  {
    slug: "qa-aql",
    title: "Quality Assurance (QA & AQL)",
    tagline: "Inline, end-line, and final audit — AQL 1.5/2.5",
    hero: "/images/products/qa/hero.webp",
    description:
      "Structured quality gates with inline & end-line audits; shade and measurement control; carton QA.",
    moq: "N/A",
    leadTime: "Adds 2–5 days for extended testing scopes",
    bullets: [
      "AQL 1.5 for critical buyers • AQL 2.5 standard",
      "Full spec sheets & carton marking verification",
      "Measurement audits per size set; wash care validation",
    ],
    gallery: [
      "/images/products/qa/inspection.webp",
      "/images/products/qa/aql.webp",
      "/images/products/qa/lab.webp",
    ],
  },
  {
    slug: "logistics",
    title: "Logistics & Shipping",
    tagline: "FOB, CIF, DDP — carton optimization & routing",
    hero: "/images/products/logistics/hero.webp",
    description:
      "Export via Dhaka inland port/Chittagong. Carton optimization & documentation support.",
    moq: "N/A",
    leadTime: "FOB booking 5–7 days prior to ex-factory",
    bullets: [
      "3-ply/5-ply cartons by destination standard",
      "Vessel/air booking assistance; pallets as needed",
      "HS codes, COO, and buyer documentation support",
    ],
    gallery: [
      "/images/products/logistics/port.webp",
      "/images/products/logistics/carton.webp",
      "/images/products/logistics/truck.webp",
    ],
  },
  {
    slug: "industrial-services",
    title: "Industrial Services",
    tagline: "Embroidery machines, parts & technical service",
    hero: "/images/products/industrial/hero.webp",
    description:
      "Supply of embroidery machines and select textile equipment within Bangladesh, plus installation and technician training.",
    moq: "Per machine model",
    leadTime: "Lead 30–60 days (import) • Spares 7–21 days",
    bullets: [
      "Procurement, import documentation & delivery",
      "On-site setup and operator/maintenance training",
      "Warranty & post-sale parts support",
    ],
    gallery: [
      "/images/products/industrial/machine.webp",
      "/images/products/industrial/spares.webp",
      "/images/products/industrial/training.webp",
    ],
  },
];
