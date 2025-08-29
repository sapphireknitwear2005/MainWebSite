"use client";
import { useState } from "react";

export default function RFQForm() {
  const [form, setForm] = useState({
    category: "",
    quantity: "",
    price: "",
    fabric: "",
    details: "",
    contact: "",
    files: [],
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, files: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "files") {
        value.forEach((file) => formData.append("files", file));
      } else {
        formData.append(key, value);
      }
    });

    const res = await fetch("/api/rfq", {
      method: "POST",
      body: formData,
    });

    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      setForm({
        category: "",
        quantity: "",
        price: "",
        fabric: "",
        details: "",
        contact: "",
        files: [],
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 shadow-lg rounded-2xl border"
    >
      <input
        name="category"
        placeholder="Garment Category (e.g. Jackets)"
        value={form.category}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="quantity"
        placeholder="Quantity (e.g. 10,000 pcs)"
        value={form.quantity}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="price"
        placeholder="Target Price (USD)"
        value={form.price}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="fabric"
        placeholder="Preferred Fabric"
        value={form.fabric}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <textarea
        name="details"
        placeholder="Additional Details"
        value={form.details}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        rows="4"
      />
      <input
        name="contact"
        type="email"
        placeholder="Your Email"
        value={form.contact}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      {/* File Upload */}
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="w-full p-2 border rounded"
        accept=".png,.jpg,.jpeg,.pdf"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
      >
        {loading ? "Sending..." : "Submit RFQ"}
      </button>

      {success && (
        <p className="text-green-600 font-medium mt-2">
          ✅ RFQ submitted successfully! We'll contact you soon.
        </p>
      )}
    </form>
  );
}
