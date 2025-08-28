import FabricLibrary from "../../components/FabricLibrary";

export const metadata = {
  title: "Fabric & Trim Library — Sapphire Design LTD",
};

export default function Page() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Fabric & Trim Library</h1>
      <FabricLibrary />
    </section>
  );
}
