import ComplianceWall from "../../components/ComplianceWall";

export const metadata = { title: "Certifications — Sapphire Design LTD" };

export default function Page() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Certifications</h1>
      <p className="text-gray-700">
        We are OEKO-TEX Standard 100 certified and actively pursuing
        BSCI/Amfori, SEDEX, WRAP, GOTS/GRS, HIGG FEM/FSLM, and ZDHC. Thumbnails
        below are verifiable proofs or placeholders.
      </p>
      <ComplianceWall />
    </section>
  );
}
