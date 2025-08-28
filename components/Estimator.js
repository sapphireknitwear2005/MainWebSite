"use client";
import { useState } from "react";

const rules = {
  "Basic Tee": { moq: 1000, lead: 45, price: [1.8, 3.2] },
  "Polo": { moq: 1000, lead: 55, price: [3.2, 5.0] },
  "Hoodie": { moq: 800, lead: 60, price: [6.5, 9.5] },
  "Jogger": { moq: 800, lead: 60, price: [6.0, 9.0] },
  "Denim": { moq: 600, lead: 75, price: [8.0, 14.0] },
  "Puffer Jacket": { moq: 600, lead: 80, price: [12.0, 22.0] },
  "Softshell": { moq: 600, lead: 70, price: [10.0, 18.0] },
};

export default function Estimator() {
  const [item, setItem] = useState("Basic Tee");
  const [gsm, setGsm] = useState(180);
  const [qty, setQty] = useState(1000);
  const r = rules[item];
  const moqImpact = qty >= r.moq*2 ? -0.15 : qty >= r.moq*1.5 ? -0.08 : 0;
  const priceLow = (r.price[0] * (1 + moqImpact)).toFixed(2);
  const priceHigh = (r.price[1] * (1 + moqImpact)).toFixed(2);

  return (
    <div className="card space-y-3">
      <div className="grid md:grid-cols-3 gap-3">
        <label className="block text-sm">Item<select value={item} onChange={e=>setItem(e.target.value)} className="mt-1 w-full border rounded-xl p-2">
          {Object.keys(rules).map(k => <option key={k}>{k}</option>)}
        </select></label>
        <label className="block text-sm">Fabric GSM<input type="number" value={gsm} onChange={e=>setGsm(+e.target.value)} className="mt-1 w-full border rounded-xl p-2"/></label>
        <label className="block text-sm">Quantity<input type="number" value={qty} onChange={e=>setQty(+e.target.value)} className="mt-1 w-full border rounded-xl p-2"/></label>
      </div>
      <div className="text-sm text-gray-700">
        <p>MOQ: <strong>{r.moq} pcs</strong> • Est. Lead Time: <strong>{r.lead} days</strong></p>
        <p className="mt-1">Indicative FOB: <strong>${priceLow} – ${priceHigh}</strong> per unit (Bangladesh, FOB Chattogram). <em>Non-binding; depends on fabric, trims, wash, testing.</em></p>
      </div>
    </div>
  );
}
