"use client";
import { useState } from "react";
import {
  Shirt,
  Scissors,
  PenTool,
  Brush,
  Palette,
  Ruler,
  Layers,
} from "lucide-react";

// Big dataset with 50+ topics
const libraryData = [
  {
    category: "Fabrics",
    icon: Shirt,
    items: [
      {
        title: "Cotton",
        desc: "Soft, breathable, versatile. Ideal for casualwear.",
      },
      {
        title: "Organic Cotton",
        desc: "Eco-friendly cotton grown without harmful chemicals.",
      },
      { title: "Polyester", desc: "Durable, wrinkle-resistant, quick-dry." },
      {
        title: "Recycled Polyester (rPET)",
        desc: "Made from recycled PET bottles. Sustainable option.",
      },
      {
        title: "Linen",
        desc: "Natural, lightweight, cooling. Great for summer.",
      },
      {
        title: "Wool",
        desc: "Warm, insulating. Used for suits, jackets, sweaters.",
      },
      {
        title: "Merino Wool",
        desc: "Finer wool. Soft, breathable, premium knitwear.",
      },
      {
        title: "Silk",
        desc: "Luxurious, smooth, drapey. Premium fabric for formalwear.",
      },
      {
        title: "Tencel (Lyocell)",
        desc: "Eco-friendly, soft, sustainable alternative to cotton.",
      },
      {
        title: "Denim",
        desc: "Durable cotton twill. Jeans, jackets, workwear.",
      },
      {
        title: "Chambray",
        desc: "Lightweight cotton weave. Casual shirts, dresses.",
      },
      {
        title: "Jersey Knit",
        desc: "Stretchy, soft knit fabric. T-shirts, activewear.",
      },
      {
        title: "Fleece",
        desc: "Insulating, warm. Outerwear & winter garments.",
      },
      { title: "Corduroy", desc: "Ribbed cotton. Casual trousers, jackets." },
      {
        title: "Velvet",
        desc: "Luxurious, soft pile fabric. Eveningwear & upholstery.",
      },
    ],
  },
  {
    category: "Trims & Accessories",
    icon: Scissors,
    items: [
      { title: "Zippers", desc: "Metal, plastic, invisible. Jackets & pants." },
      {
        title: "Buttons",
        desc: "Plastic, wood, metal. Shirts, trousers, blazers.",
      },
      {
        title: "Labels",
        desc: "Woven, printed, heat transfer. Branding identity.",
      },
      { title: "Elastic", desc: "Stretchable trims for waistbands & cuffs." },
      {
        title: "Velcro",
        desc: "Hook & loop fastening. Sportswear, accessories.",
      },
      {
        title: "Drawcords",
        desc: "Hoodies, joggers, bags. Cotton or polyester.",
      },
      {
        title: "Eyelets & Rivets",
        desc: "Metal accessories for denim, shoes, bags.",
      },
      {
        title: "Lace",
        desc: "Decorative trim. Dresses, lingerie, bridalwear.",
      },
      { title: "Beads & Sequins", desc: "Embellishments for fashionwear." },
      {
        title: "Interlinings",
        desc: "Provide structure in collars, cuffs, blazers.",
      },
    ],
  },
  {
    category: "Stitching & Construction",
    icon: PenTool,
    items: [
      {
        title: "Lockstitch",
        desc: "Most common stitch. Strong & neat for woven garments.",
      },
      {
        title: "Overlock (Serge)",
        desc: "Used to finish edges, prevent fraying.",
      },
      {
        title: "Coverstitch",
        desc: "For hems and knitwear. Stretchable seam.",
      },
      {
        title: "Flatlock",
        desc: "Athleisure & sportswear. Smooth, flat seams.",
      },
      {
        title: "Chainstitch",
        desc: "Decorative & functional seam, jeans & embroidery.",
      },
      {
        title: "Blind Stitch",
        desc: "Invisible hemming, formalwear tailoring.",
      },
      {
        title: "Bartack",
        desc: "Reinforcement at stress points (pockets, belt loops).",
      },
      { title: "Topstitch", desc: "Visible stitching for strength & design." },
      { title: "Quilting", desc: "Layered stitching, insulation for jackets." },
    ],
  },
  {
    category: "Printing & Embroidery",
    icon: Brush,
    items: [
      {
        title: "Screen Printing",
        desc: "Durable method. Ink pushed through mesh stencil.",
      },
      {
        title: "Digital Printing",
        desc: "High-resolution prints directly on fabric.",
      },
      {
        title: "Sublimation",
        desc: "Heat transfer. Bright prints on polyester.",
      },
      {
        title: "Embroidery",
        desc: "Thread-based designs. Premium, textured logos.",
      },
      {
        title: "Heat Transfer Vinyl (HTV)",
        desc: "Cut vinyl applied with heat press.",
      },
      {
        title: "Block Printing",
        desc: "Handcrafted wooden block patterns. Traditional wear.",
      },
      {
        title: "Puff Printing",
        desc: "Raised, 3D ink finish. Casualwear graphics.",
      },
      {
        title: "Foil Printing",
        desc: "Metallic foil effect. Premium & decorative.",
      },
    ],
  },
  {
    category: "Colors & Dyeing",
    icon: Palette,
    items: [
      {
        title: "Reactive Dyes",
        desc: "Used on cotton. Bright, washfast colors.",
      },
      {
        title: "Disperse Dyes",
        desc: "Polyester dyeing. Rich color penetration.",
      },
      { title: "Pigment Dyeing", desc: "Surface color, vintage/washed look." },
      {
        title: "Natural Dyes",
        desc: "Eco-friendly dyes from plants & minerals.",
      },
      {
        title: "Garment Dyeing",
        desc: "Dye after garment construction. Unique finishes.",
      },
      {
        title: "Tie & Dye",
        desc: "Handcrafted patterns. Unique artistic looks.",
      },
      { title: "Stone Wash", desc: "Denim wash with stones for faded look." },
      {
        title: "Acid Wash",
        desc: "High-contrast denim treatment. Trendy fashionwear.",
      },
    ],
  },
  {
    category: "Technical & Performance",
    icon: Layers,
    items: [
      {
        title: "Waterproof Fabrics",
        desc: "Coated or laminated. Jackets, outdoorwear.",
      },
      {
        title: "Breathable Membranes",
        desc: "Gore-Tex, eVent fabrics. High-performance wear.",
      },
      {
        title: "Moisture Wicking",
        desc: "Sportswear fabric pulls sweat away.",
      },
      {
        title: "Anti-microbial Finish",
        desc: "Odor-resistant. Activewear, healthcare garments.",
      },
      {
        title: "UV Protection",
        desc: "Fabric treatment for sun-blocking apparel.",
      },
      { title: "Fire Retardant", desc: "Safety clothing for industrial use." },
      { title: "Reflective Tapes", desc: "Safety wear, sportswear." },
    ],
  },
  {
    category: "Measuring & Standards",
    icon: Ruler,
    items: [
      {
        title: "GSM (Grams per Square Meter)",
        desc: "Measures fabric weight.",
      },
      {
        title: "Thread Count",
        desc: "Higher = finer & softer. Bedsheets, shirting.",
      },
      { title: "Shrinkage Testing", desc: "Ensures garment sizing stability." },
      {
        title: "Colorfastness",
        desc: "Resistance to fading after washing/sun.",
      },
      {
        title: "OEKO-TEX Certification",
        desc: "Standard for safe & eco-friendly fabrics.",
      },
      {
        title: "GOTS",
        desc: "Global Organic Textile Standard for sustainability.",
      },
    ],
  },
];

export default function FabricLibrary() {
  const [query, setQuery] = useState("");

  const filteredData = libraryData.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (it) =>
        it.title.toLowerCase().includes(query.toLowerCase()) ||
        it.desc.toLowerCase().includes(query.toLowerCase())
    ),
  }));

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search fabrics, trims, techniques..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Categories */}
      <div className="space-y-8">
        {filteredData.map((cat, i) => (
          <div key={i}>
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <cat.icon className="w-6 h-6 text-blue-600" />
              {cat.category}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
              {cat.items.length > 0 ? (
                cat.items.map((item, j) => (
                  <div
                    key={j}
                    className="p-4 border rounded-xl bg-white shadow hover:shadow-md transition"
                  >
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 col-span-full">
                  No results in this category.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
