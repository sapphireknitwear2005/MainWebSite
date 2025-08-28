export const metadata = { title: "Case Studies — Sapphire Design LTD" };

export default function Page() {
  const items = [
    {
      title: "EU Retailer — 120k Hoodies",
      result: "On-time delivery, 0.7% defect rate",
      kpi: "Lead time 58d",
    },
    {
      title: "UK Brand — 30k Puffers",
      result: "Cost saving 8% via fabric optimization",
      kpi: "AQL 2.5 pass",
    },
  ];
  return (
    <section className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Case Studies</h1>
      <div className="grid md:grid-cols-2 gap-3">
        {items.map((i, idx) => (
          <div key={idx} className="card">
            <p className="font-semibold">{i.title}</p>
            <p className="text-sm text-gray-700">{i.result}</p>
            <p className="text-xs text-gray-500">{i.kpi}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
