"use client";
import { useMemo, useState } from "react";

const items = [
  { code: "KNT-180-COT", name: "Single Jersey Cotton", comp: "100% Cotton", gsm: 180, finish: "Bio-wash", category: "Knitwear" },
  { code: "KNT-240-FLC", name: "Fleece Cotton/Poly", comp: "60% Cotton 40% Poly", gsm: 240, finish: "Brushed", category: "Knitwear" },
  { code: "WVN-120-POPL", name: "Poplin", comp: "100% Cotton", gsm: 120, finish: "Peach", category: "Woven" },
  { code: "JKT-90-RIP", name: "Ripstop", comp: "100% Poly", gsm: 90, finish: "WR", category: "Jackets" },
];

export default function FabricLibrary() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const results = useMemo(() => items.filter(i =>
    (cat==="All" || i.category===cat) &&
    (q==="" || (i.name+i.comp+i.code).toLowerCase().includes(q.toLowerCase()))
  ), [q, cat]);

  return (
    <div className="space-y-3">
      <div className="grid md:grid-cols-3 gap-3">
        <input placeholder="Search name / code / comp" value={q} onChange={e=>setQ(e.target.value)} className="border rounded-xl p-2"/>
        <select value={cat} onChange={e=>setCat(e.target.value)} className="border rounded-xl p-2">
          <option>All</option><option>Knitwear</option><option>Woven</option><option>Jackets</option>
        </select>
        <a href="/rfq" className="btn">Request swatch</a>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {results.map(i => (
          <div key={i.code} className="card">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">{i.name}</p>
                <p className="text-sm text-gray-600">{i.comp} • {i.gsm} GSM • {i.finish}</p>
                <p className="text-xs text-gray-500">Code: {i.code} • Category: {i.category}</p>
              </div>
              <img src="/images/_fabric-placeholder.png" alt="" className="h-16 w-16 rounded-xl bg-gray-100"/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
