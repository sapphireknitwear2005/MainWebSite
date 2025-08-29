"use client";
import { useState } from "react";
import {
  garmentStyles,
  fabrics,
  colors,
  printing,
  embroidery,
  trims,
  compliance,
  urgency,
} from "../data/estimatorData";
import { calculateEstimate } from "../data/estimatorLogic";

export default function EstimatorPro() {
  const [inputs, setInputs] = useState({
    garment: garmentStyles[0],
    fabric: fabrics[0],
    color: colors[0],
    print: printing[0],
    embroidery: embroidery[0],
    trim: trims[0],
    compliance: compliance[0],
    urgency: urgency[0],
    qty: 500,
  });

  const [result, setResult] = useState(null);

  const handleChange = (e, options) => {
    const selected = options.find((o) => o.value === e.target.value);
    setInputs({ ...inputs, [e.target.name]: selected });
  };

  const handleQtyChange = (e) => {
    setInputs({ ...inputs, qty: Number(e.target.value) });
  };

  const calculate = () => {
    setResult(calculateEstimate(inputs));
  };

  return (
    <div className="space-y-4 p-6 border rounded-xl shadow bg-white">
      <h2 className="text-xl font-bold">Configure Your Order</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Garment */}
        <select
          name="garment"
          onChange={(e) => handleChange(e, garmentStyles)}
          className="p-2 border rounded"
        >
          {garmentStyles.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Fabric */}
        <select
          name="fabric"
          onChange={(e) => handleChange(e, fabrics)}
          className="p-2 border rounded"
        >
          {fabrics.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Color */}
        <select
          name="color"
          onChange={(e) => handleChange(e, colors)}
          className="p-2 border rounded"
        >
          {colors.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Printing */}
        <select
          name="print"
          onChange={(e) => handleChange(e, printing)}
          className="p-2 border rounded"
        >
          {printing.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Embroidery */}
        <select
          name="embroidery"
          onChange={(e) => handleChange(e, embroidery)}
          className="p-2 border rounded"
        >
          {embroidery.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Trims */}
        <select
          name="trim"
          onChange={(e) => handleChange(e, trims)}
          className="p-2 border rounded"
        >
          {trims.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Compliance */}
        <select
          name="compliance"
          onChange={(e) => handleChange(e, compliance)}
          className="p-2 border rounded"
        >
          {compliance.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Urgency */}
        <select
          name="urgency"
          onChange={(e) => handleChange(e, urgency)}
          className="p-2 border rounded"
        >
          {urgency.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Quantity */}
        <input
          type="number"
          name="qty"
          value={inputs.qty}
          onChange={handleQtyChange}
          className="p-2 border rounded"
          placeholder="Order Quantity"
        />
      </div>

      <button
        onClick={calculate}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Estimate
      </button>

      {result && (
        <div className="p-4 mt-4 border rounded bg-gray-50">
          {result.error ? (
            <p className="text-red-600">{result.error}</p>
          ) : (
            <>
              <p>
                <strong>MOQ:</strong> {result.moq} pcs
              </p>
              <p>
                <strong>Lead Time:</strong> {result.lead} days
              </p>
              <p>
                <strong>Cost per Unit:</strong> ${result.cost}
              </p>
              <p>
                <strong>Total Cost:</strong> ${result.totalCost}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
