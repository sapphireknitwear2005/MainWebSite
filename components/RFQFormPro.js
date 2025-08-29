"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function RFQFormPro() {
  const steps = [
    "Garment",
    "Fabric",
    "Trims",
    "Embellishments",
    "Quantity & Price",
    "Contact",
  ];
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    garment: "",
    fabric: "",
    trims: [],
    embellishments: [],
    quantity: "",
    targetPrice: "",
    name: "",
    email: "",
    company: "",
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    console.log("Final RFQ Data:", formData);
    alert("✅ RFQ submitted! Our merchandisers will contact you shortly.");
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-6 space-y-6 border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{steps[step]}</h2>
        <p className="text-sm text-gray-500">
          Step {step + 1} of {steps.length}
        </p>
      </div>

      {/* Step Content */}
      {step === 0 && (
        <div className="space-y-3">
          <label className="block">Select Garment Type</label>
          <select
            className="border rounded-lg p-2 w-full"
            value={formData.garment}
            onChange={(e) => handleChange("garment", e.target.value)}
          >
            <option value="">-- Choose --</option>
            <option>T-shirt</option>
            <option>Hoodie</option>
            <option>Jacket</option>
            <option>Denim</option>
            <option>Polo</option>
          </select>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3">
          <label>Select Fabric</label>
          <select
            className="border rounded-lg p-2 w-full"
            value={formData.fabric}
            onChange={(e) => handleChange("fabric", e.target.value)}
          >
            <option value="">-- Choose --</option>
            <option>Cotton</option>
            <option>Organic Cotton</option>
            <option>Polyester</option>
            <option>Fleece</option>
            <option>Denim</option>
            <option>Performance Fabric</option>
          </select>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <label>Select Trims</label>
          <div className="flex flex-wrap gap-2">
            {["Zippers", "Buttons", "Labels", "Drawcords"].map((trim) => (
              <button
                key={trim}
                onClick={() =>
                  handleChange(
                    "trims",
                    formData.trims.includes(trim)
                      ? formData.trims.filter((t) => t !== trim)
                      : [...formData.trims, trim]
                  )
                }
                className={`px-3 py-1 rounded-full border ${
                  formData.trims.includes(trim)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {trim}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3">
          <label>Select Embellishments</label>
          <div className="flex flex-wrap gap-2">
            {[
              "Screen Print",
              "Embroidery",
              "Heat Transfer",
              "All Over Print",
            ].map((emb) => (
              <button
                key={emb}
                onClick={() =>
                  handleChange(
                    "embellishments",
                    formData.embellishments.includes(emb)
                      ? formData.embellishments.filter((e) => e !== emb)
                      : [...formData.embellishments, emb]
                  )
                }
                className={`px-3 py-1 rounded-full border ${
                  formData.embellishments.includes(emb)
                    ? "bg-green-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {emb}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-3">
          <label>Quantity</label>
          <input
            type="number"
            placeholder="e.g. 500 pcs"
            className="border rounded-lg p-2 w-full"
            value={formData.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
          />
          <label>Target Price (per piece)</label>
          <input
            type="text"
            placeholder="e.g. $5.50"
            className="border rounded-lg p-2 w-full"
            value={formData.targetPrice}
            onChange={(e) => handleChange("targetPrice", e.target.value)}
          />
        </div>
      )}

      {step === 5 && (
        <div className="space-y-3">
          <label>Your Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="border rounded-lg p-2 w-full"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <label>Company</label>
          <input
            type="text"
            placeholder="ABC Apparel Ltd."
            className="border rounded-lg p-2 w-full"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="buyer@example.com"
            className="border rounded-lg p-2 w-full"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        {step > 0 && (
          <button
            onClick={prevStep}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Back
          </button>
        )}
        {step < steps.length - 1 ? (
          <button
            onClick={nextStep}
            className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            Submit RFQ
          </button>
        )}
      </div>
    </motion.div>
  );
}
