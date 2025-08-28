import RFQForm from "../../components/RFQForm";

export const metadata = { title: "RFQ Configurator — Sapphire Design LTD" };

export default function Page() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">RFQ Configurator</h1>
      <p className="text-gray-700">
        Pick your category, MOQ, and target price — we’ll respond with tech
        feedback and a quote.
      </p>
      <RFQForm />
    </section>
  );
}
