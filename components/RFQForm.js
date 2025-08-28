"use client";
import { useState } from "react";

export default function RFQForm() {
  const [status, setStatus] = useState(null);
  async function submit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    setStatus("Submitting…");
    const res = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (res.ok) setStatus("Thank you — we’ll reply within 24 hours.");
    else setStatus("Something went wrong. Please email sales@sapphire-knitwear.com");
  }
  return (
    <form className="card space-y-4" onSubmit={submit}>
      <div className="grid md:grid-cols-2 gap-4">
        <label className="block text-sm">Name<input required name="name" className="mt-1 w-full border rounded-xl p-2" /></label>
        <label className="block text-sm">Email<input required type="email" name="email" className="mt-1 w-full border rounded-xl p-2" /></label>
        <label className="block text-sm">Company<input name="company" className="mt-1 w-full border rounded-xl p-2" /></label>
        <label className="block text-sm">Country<input name="country" className="mt-1 w-full border rounded-xl p-2" /></label>
        <label className="block text-sm">Category<select name="category" className="mt-1 w-full border rounded-xl p-2">
          <option>Knitwear</option><option>Woven</option><option>Jackets</option><option>Others</option>
        </select></label>
        <label className="block text-sm">Quantity (pcs)<input name="quantity" type="number" className="mt-1 w-full border rounded-xl p-2" /></label>
        <label className="block text-sm">Target Price (FOB USD)<input name="targetPrice" className="mt-1 w-full border rounded-xl p-2" /></label>
      </div>
      <label className="block text-sm">Notes<textarea name="notes" rows={4} className="mt-1 w-full border rounded-xl p-2"></textarea></label>
      <div className="flex items-center gap-2 text-sm">
        <input id="terms" type="checkbox" required className="h-4 w-4" />
        <label htmlFor="terms">I agree to the <a href="/privacy">privacy policy</a>.</label>
      </div>
      <button className="btn" type="submit">Send RFQ</button>
      {status && <p className="text-sm text-gray-600" role="status">{status}</p>}
    </form>
  );
}
