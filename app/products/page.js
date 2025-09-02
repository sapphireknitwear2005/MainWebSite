// app/products/page.js (SERVER COMPONENT — don't add "use client" here)
export const metadata = {
  title: "Products — Sapphire Design LTD",
  description:
    "Corporate catalogue: manufacturing, capabilities, textiles, jackets, printing & embroidery, trims, washing, sustainability, QA, logistics, industrial services. Includes RFQ, Estimator, Fabric Library.",
};

import CategoryHub from "./_components/CategoryHub";
import FactoryTour from "./_components/FactoryTour";

// Using local stubs so this page works even if your global components are not wired yet.
// Replace these imports with your real ones (../../components/...) when ready.
import RFQForm from "./_components/stubs/RFQFormStub";
import EstimatorPro from "./_components/stubs/EstimatorProStub";
import FabricLibrary from "./_components/stubs/FabricLibraryStub";
import ComplianceWall from "./_components/stubs/ComplianceWallStub";
import SampleWizard from "./_components/stubs/SampleWizardStub";

export default function Page() {
  return (
    <section className="space-y-14">
      {/* Hero */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-50 via-white to-indigo-50 border p-8 md:p-14">
        <div className="max-w-5xl mx-auto text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Corporate Product & Services Catalogue
          </h1>
          <p className="mt-4 text-gray-600 md:text-lg">
            End-to-end apparel manufacturing: knitwear, woven, jackets, embellishments, trims, washing & finishing — plus sustainability, QA/AQL, logistics and industrial solutions.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
            <a href="#categories" className="btn">Explore Categories</a>
            <a href="#rfq" className="btn-secondary">Start an RFQ</a>
          </div>
        </div>
      </div>

      {/* Category Hub */}
      <div id="categories" className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold">Categories</h2>
        <CategoryHub />
      </div>

      {/* Virtual Factory Tour */}
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold">Virtual Factory Tour</h2>
        <p className="text-gray-600">A quick look inside our production floors: cutting, sewing, finishing, and compliance facilities.</p>
        <FactoryTour videoId="dQw4w9WgXcQ" />
      </div>

      {/* RFQ */}
      <div id="rfq" className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold">RFQ Configurator</h2>
        <p className="text-gray-600">Share your requirements — fabric, GSM, trims, quantities, delivery — and we’ll revert with a costed offer.</p>
        <RFQForm />
      </div>

      {/* Estimator */}
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold">MOQ & Lead-Time Estimator</h2>
        <p className="text-gray-600">Indicative MOQ and schedule based on style complexity, fabric readiness and testing scope.</p>
        <EstimatorPro />
      </div>

      {/* Fabric Library */}
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold">Fabric & Trim Library</h2>
        <p className="text-gray-600">Search fabrics, trims, finishes. Filter by composition, GSM, finish and end-use.</p>
        <FabricLibrary />
      </div>

      {/* Compliance Wall */}
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold">Compliance & Certifications</h2>
        <p className="text-gray-600">OEKO-TEX certified. Pursuing BSCI/Amfori, SEDEX, WRAP, GOTS/GRS, HIGG FEM/FSLM, ZDHC.</p>
        <ComplianceWall />
      </div>

      {/* Sample Wizard */}
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold">Sample Request Wizard</h2>
        <p className="text-gray-600">Request development, fit or PP samples with courier options and tech notes.</p>
        <SampleWizard />
      </div>
    </section>
  );
}
