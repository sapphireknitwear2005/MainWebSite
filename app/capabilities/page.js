import ComplianceWall from "../../components/ComplianceWall";
import RFQForm from "../../components/RFQForm";
import Estimator from "../../components/Estimator";
import FabricLibrary from "../../components/FabricLibrary";
import SampleWizard from "../../components/SampleWizard";

export const metadata = { title: "Capabilities — Sapphire Design LTD" };

export default function Page() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Capabilities</h1>
      <div className="prose max-w-none">
        <p>
          <strong>Sampling → Bulk:</strong> Rapid sample room (3–4 days dev
          sample), PP 7–10 days, bulk 60–75 days.
        </p>
        <ul>
          <li>
            <strong>QA/AQL:</strong> Inline & final QC, AQL 2.5 / 4.0. Defect
            rate .
          </li>
          <li>
            <strong>Sustainability:</strong> Chemical mgmt (ZDHC aligned), solar
            power, water recycling.
          </li>
          <li>
            <strong>Testing:</strong> Colorfastness, pilling, dimensional
            stability via partner labs.
          </li>
        </ul>
      </div>
    </section>
  );
}
