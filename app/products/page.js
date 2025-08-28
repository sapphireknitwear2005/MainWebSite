import ComplianceWall from "../../components/ComplianceWall";
import RFQForm from "../../components/RFQForm";
import Estimator from "../../components/Estimator";
import FabricLibrary from "../../components/FabricLibrary";
import SampleWizard from "../../components/SampleWizard";

export const metadata = { title: "Products — Sapphire Design LTD" };

export default function Page() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Products</h1>
      <div className="prose max-w-none">
        <p>Categories we run at scale:</p>
        <ul>
          <li>
            <strong>Knitwear:</strong> Tees, polos, hoodies, joggers. MOQ 1,000
            pcs/color.
          </li>
          <li>
            <strong>Woven:</strong> Shirts, chinos. MOQ 1,000 pcs/color.
          </li>
          <li>
            <strong>Jackets:</strong> Puffer, softshell, light padded. MOQ 600
            pcs/style.
          </li>
        </ul>
        <p>
          FOB price guidance (indicative): Tee $1.8–3.2, Polo $3.2–5.0, Hoodie
          $6.5–9.5, Jogger $6.0–9.0, Denim $8.0–14.0, Puffer $12–22, Softshell
          $10–18.
        </p>
      </div>
    </section>
  );
}
