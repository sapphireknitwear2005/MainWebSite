import RFQForm from "../../components/RFQForm";

export const metadata = { title: "RFQ Configurator — Sapphire Design LTD" };

export default function Page() {
  return (
    <section className="space-y-6 max-w-4xl mx-auto p-6">
      <h1 className="text-2xl md:text-3xl font-bold">RFQ Configurator</h1>
      <p className="text-gray-700">
        Fill in your product details, MOQ, and preferences — our team will
        review and respond with a tailored quotation via email.
      </p>
      <RFQForm />
    </section>
  );
}
