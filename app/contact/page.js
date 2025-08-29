import RFQForm from "../../components/RFQForm";
import SampleWizard from "../../components/SampleWizard";
import { Phone, Mail, MapPin, Globe } from "lucide-react";

export const metadata = { title: "Contact — Sapphire Design LTD" };

export default function Page() {
  return (
    <section className="space-y-12">
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
        Contact Us
      </h1>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left: Contact Information */}
        <div className="space-y-8">
          {/* Corporate Office */}
          <div className="card p-6 shadow-md rounded-2xl border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Corporate Office
            </h2>
            <p className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-gray-500 mt-1" />
              House # 726/20/9, Road # 10, Adabor, Dhaka-1207, Bangladesh.
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-500" /> 02 55010401
            </p>
            <p className="flex items-start gap-2">
              <Phone className="w-5 h-5 text-gray-500 mt-1" />
              01715093376, 01713045576, 01711477847
            </p>
            <p className="flex items-start gap-2">
              <Mail className="w-5 h-5 text-gray-500 mt-1" />
              <span>
                <a
                  href="mailto:sapphire_d2010@yahoo.com"
                  className="text-blue-600 hover:underline"
                >
                  sapphire_d2010@yahoo.com
                </a>
                ,{" "}
                <a
                  href="mailto:sapphireprint@yahoo.com"
                  className="text-blue-600 hover:underline"
                >
                  sapphireprint@yahoo.com
                </a>
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-gray-500" />
              <a
                href="http://www.sapphiredesignltd.com"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                www.sapphiredesignltd.com
              </a>
            </p>
          </div>

          {/* Factory 1 */}
          <div className="card p-6 shadow-md rounded-2xl border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Factory Address 1
            </h2>
            <p className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-gray-500 mt-1" />
              Plot No # 726/20/9, Road # 10, Adabor, Dhaka-1207, Bangladesh.
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-500" /> +88 02 8115820
            </p>
            <p className="flex items-start gap-2">
              <Mail className="w-5 h-5 text-gray-500 mt-1" />
              <span>
                <a
                  href="mailto:sapphire_d2010@yahoo.com"
                  className="text-blue-600 hover:underline"
                >
                  sapphire_d2010@yahoo.com
                </a>
                ,{" "}
                <a
                  href="mailto:sapphireprint@yahoo.com"
                  className="text-blue-600 hover:underline"
                >
                  sapphireprint@yahoo.com
                </a>
              </span>
            </p>
          </div>

          {/* Factory 2 */}
          <div className="card p-6 shadow-md rounded-2xl border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Factory Address 2
            </h2>
            <p className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-gray-500 mt-1" />
              Plot No # 712/22/C, Road # 10, Adabor, Dhaka-1207, Bangladesh.
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-500" /> +88 02 8115820
            </p>
            <p className="flex items-start gap-2">
              <Mail className="w-5 h-5 text-gray-500 mt-1" />
              <span>
                <a
                  href="mailto:sapphire_d2010@yahoo.com"
                  className="text-blue-600 hover:underline"
                >
                  sapphire_d2010@yahoo.com
                </a>
                ,{" "}
                <a
                  href="mailto:sapphireprint@yahoo.com"
                  className="text-blue-600 hover:underline"
                >
                  sapphireprint@yahoo.com
                </a>
              </span>
            </p>
          </div>

          {/* Google Map */}
          <iframe
            title="Factory Location"
            className="w-full h-72 rounded-2xl shadow"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.993055555!2d90.354993!3d23.774511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c10bfa8a5bcd%3A0xa1f6d1e8e0b22e3d!2sSapphire%20Design%20Ltd!5e0!3m2!1sen!2sbd!4v1692890000000!5m2!1sen!2sbd"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        {/* Right: Forms */}
        <div className="space-y-8">
          <RFQForm />
          <SampleWizard />
        </div>
      </div>
    </section>
  );
}
