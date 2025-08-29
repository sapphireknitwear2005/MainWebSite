// /app/library/page.js
import KnowledgeLibrary from "../../components/KnowledgeLibrary";

export const metadata = {
  title: "Fabric & Trim Knowledge Hub — Sapphire Design LTD",
  description:
    "Deep, searchable encyclopedia of fabrics, trims, stitching, dyeing, printing, finishes, sustainability and standards.",
};

export default function Page() {
  return (
    <section className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold">
        Fabric & Trim Knowledge Hub
      </h1>
      <p className="text-gray-600 max-w-3xl">
        A mini-encyclopedia for buyers: fabrics, trims, stitching, dyeing,
        printing, finishes, performance tech, sustainability, and standards.
        Filter by category or tag, search anything, and click a card to open a
        detailed reference with pros/cons, use cases, care notes, and related
        topics.
      </p>
      <KnowledgeLibrary />
    </section>
  );
}
