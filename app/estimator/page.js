import EstimatorPro from "../../components/EstimatorPro";

export const metadata = {
  title: "MOQ & Lead-Time Estimator — Sapphire Design LTD",
};

export default function Page() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">
        MOQ & Lead-Time Estimator
      </h1>
      <EstimatorPro />
      <p className="text-xs text-gray-500">
        ⚠️ Estimates are indicative and depend on fabric availability, nominated
        suppliers, testing, and final approvals.
      </p>
    </section>
  );
}
