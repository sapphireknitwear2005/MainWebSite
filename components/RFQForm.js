"use client";
import { useState } from "react";

export default function RFQForm() {
  const [formData, setFormData] = useState({
    buyerName: "",
    company: "",
    email: "",
    style: "",
    fabric: "",
    trims: "",
    quantity: "",
    targetPrice: "",
    incoterm: "FOB",
    deadline: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    try {
      const res = await fetch("/api/send-rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          buyerName: "",
          company: "",
          email: "",
          style: "",
          fabric: "",
          trims: "",
          quantity: "",
          targetPrice: "",
          incoterm: "FOB",
          deadline: "",
          notes: "",
        });
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white rounded-2xl shadow-xl border"
    >
      <h2 className="text-xl font-semibold">Request for Quote</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="buyerName"
          value={formData.buyerName}
          onChange={handleChange}
          placeholder="Your Name *"
          className="border p-3 rounded-lg w-full"
          required
        />
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company Name"
          className="border p-3 rounded-lg w-full"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email *"
          className="border p-3 rounded-lg w-full"
          required
        />
        <input
          type="text"
          name="style"
          value={formData.style}
          onChange={handleChange}
          placeholder="Style / Product Type *"
          className="border p-3 rounded-lg w-full"
          required
        />
        <input
          type="text"
          name="fabric"
          value={formData.fabric}
          onChange={handleChange}
          placeholder="Fabric Type (e.g. 100% Cotton)"
          className="border p-3 rounded-lg w-full"
        />
        <input
          type="text"
          name="trims"
          value={formData.trims}
          onChange={handleChange}
          placeholder="Trims / Accessories"
          className="border p-3 rounded-lg w-full"
        />
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Order Quantity *"
          className="border p-3 rounded-lg w-full"
          required
        />
        <input
          type="text"
          name="targetPrice"
          value={formData.targetPrice}
          onChange={handleChange}
          placeholder="Target Price (per unit)"
          className="border p-3 rounded-lg w-full"
        />
        <select
          name="incoterm"
          value={formData.incoterm}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full"
        >
          <option value="FOB">FOB</option>
          <option value="CIF">CIF</option>
          <option value="DDP">DDP</option>
        </select>
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full"
        />
      </div>

      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Additional Notes..."
        className="border p-3 rounded-lg w-full"
        rows={4}
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-full"
      >
        {loading ? "Sending..." : "Submit RFQ"}
      </button>

      {success && (
        <p className="text-green-600 mt-3">
          ✅ Your RFQ has been sent successfully!
        </p>
      )}
      {error && (
        <p className="text-red-600 mt-3">
          ❌ Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
