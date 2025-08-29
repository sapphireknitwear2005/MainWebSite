"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  garmentStyles,
  fabrics,
  trims,
  embellishments,
  compliances,
  logistics,
} from "../data/estimatorData";
import { calculateEstimate } from "../data/estimatorLogic";

export default function EstimatorPro() {
  const [form, setForm] = useState({
    garment: "",
    fabric: "",
    trim: "",
    embellishment: "",
    compliance: "",
    logistics: "",
  });
  const [result, setResult] = useState(null);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const selections = Object.values(form).filter(Boolean);
    const estimate = calculateEstimate(selections);
    setResult(estimate);
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto space-y-6 p-6 bg-white shadow-xl rounded-2xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-bold text-gray-800">
        MOQ & Lead-Time Estimator
      </h2>

      {/* Form */}
      <div className="grid md:grid-cols-2 gap-4">
        <Selector
          label="Garment Style"
          options={garmentStyles}
          value={form.garment}
          onChange={(val) => handleChange("garment", val)}
        />
        <Selector
          label="Fabric"
          options={fabrics}
          value={form.fabric}
          onChange={(val) => handleChange("fabric", val)}
        />
        <Selector
          label="Trim"
          options={trims}
          value={form.trim}
          onChange={(val) => handleChange("trim", val)}
        />
        <Selector
          label="Embellishment"
          options={embellishments}
          value={form.embellishment}
          onChange={(val) => handleChange("embellishment", val)}
        />
        <Selector
          label="Compliance Level"
          options={compliances}
          value={form.compliance}
          onChange={(val) => handleChange("compliance", val)}
        />
        <Selector
          label="Logistics"
          options={logistics}
          value={form.logistics}
          onChange={(val) => handleChange("logistics", val)}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
      >
        Calculate Estimate
      </button>

      {/* Result */}
      {result && (
        <motion.div
          className="p-6 bg-gray-50 rounded-xl shadow-inner space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-lg font-bold text-gray-700">Results</h3>
          <p>
            <strong>MOQ:</strong> {result.moq} pcs
          </p>
          <p>
            <strong>Lead Time:</strong> {result.leadTime} days
          </p>
          <p>
            <strong>Risk Factor:</strong> {result.risk}
          </p>
          <p>
            <strong>Estimated FOB Price:</strong> {result.priceRange}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

function Selector({ label, options, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <select
        className="w-full border rounded-lg px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
