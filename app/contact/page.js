import RFQForm from "../../components/RFQForm";
import SampleWizard from "../../components/SampleWizard";

export const metadata = { title: "Contact — Sapphire Design LTD" };

export default function Page() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Contact</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <p className="font-semibold">Sapphire Design Limited</p>
          <p>Dhaka, Bangladesh</p>
          <p>
            Email:{" "}
            <a href="mailto:sales@sapphire-knitwear.com">
              sales@sapphire-knitwear.com
            </a>
          </p>
          <p>WhatsApp/Phone: +880-1XXXXXXXXX</p>
          <iframe
            title="Map"
            className="w-full h-48 rounded-xl mt-3"
            src="https://maps.google.com/maps?q=Dhaka&t=&z=10&ie=UTF8&iwloc=&output=embed"
          ></iframe>
        </div>
        <div className="space-y-6">
          <RFQForm />
          <SampleWizard />
        </div>
      </div>
    </section>
  );
}
