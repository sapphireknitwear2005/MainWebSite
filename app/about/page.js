import ComplianceWall from "../../components/ComplianceWall";
import RFQForm from "../../components/RFQForm";
import Estimator from "../../components/Estimator";
import FabricLibrary from "../../components/FabricLibrary";
import SampleWizard from "../../components/SampleWizard";

export const metadata = {
  title: "About / Factory / Capacity — Sapphire Design LTD",
};

export default function Page() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">
        About / Factory / Capacity
      </h1>
      <div className="prose max-w-none">
        <p>
          <strong>At a glance:</strong> 500k pcs/month • 10 lines • ~300 staff •
          Dev sample 3–4d • Bulk 60–75d.
        </p>
        <ul>
          <li>
            <strong>Machines:</strong> Overlock ~100, Flatlock ~40, Lockstitch
            ~80, Bartack ~15, Buttonhole ~10, Button attach ~10, CAD cutting,
            Embroidery 12-head, Washing, Full finishing.
          </li>
          <li>
            <strong>Processes:</strong> Printing, embroidery, washing are all
            in-house.
          </li>
          <li>
            <strong>Specialty:</strong> Knit basics (tee, polo, hoodie) and
            jackets (puffer, light padded).
          </li>
        </ul>
      </div>
    </section>
  );
}
