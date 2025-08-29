"use client";
/**
 * EstimatorPro — MOQ & Lead-Time Estimator (Buyer-trust version)
 * --------------------------------------------------------------
 * No external deps. Pure React + Tailwind.
 * Features:
 * - Category presets (Knitwear, Woven, Jackets)
 * - Fabric type (greige/stock vs dyed vs yarn-dyed), GSM, composition
 * - Decorations (print/embroidery/wash), colorways, sizes, packaging
 * - Compliance/testing and nominated suppliers impact
 * - Peak season/load factor, QC stringency (AQL)
 * - Output: MOQ per color, total MOQ, unit economics, lead-time breakdown, confidence/risk score
 * - Visual timeline (today → PP sample → bulk start → ex-factory)
 * - Copy to clipboard, Download JSON/CSV
 *
 * Notes:
 * - All numbers are *well-reasoned* defaults for Bangladesh apparel; adjust to your real SOPs any time.
 * - Logic centralizes in `rules` so you can tweak business assumptions easily.
 */

import { useMemo, useState } from "react";

const CATEGORIES = [
  { id: "knit", label: "Knitwear (tees, polos, hoodies)" },
  { id: "woven", label: "Woven (shirts, bottoms)" },
  { id: "jacket", label: "Jackets/Outerwear" },
];

const FABRIC_TYPE = [
  { id: "stock-greige", label: "Stock/Greige (fastest)" },
  { id: "piece-dyed", label: "Piece Dyed" },
  { id: "yarn-dyed", label: "Yarn Dyed/Engineered" },
];

const PRINT_TYPES = [
  "None",
  "Screen Print (spot)",
  "Digital DTG",
  "Sublimation (poly)",
  "Foil/Puff/Discharge (special)",
];

const WASH_TYPES = [
  "None",
  "Garment Wash (enzyme)",
  "Acid/Vintage",
  "Stone/Heavy",
];
const EMB_TYPES = [
  "None",
  "Machine Embroidery",
  "3D/Puff Embroidery",
  "Appliqué",
];

const PACK_TYPES = [
  "Polybag Basic",
  "Recyclable Polybag",
  "Boxed Retail",
  "Hanger Pack",
];

const INCOTERMS = ["FOB", "CIF", "DDP"];

const rules = {
  base: {
    knit: {
      moqPerColor: 500,
      moqTotal: 1000,
      devDays: 3,
      ppDays: 7,
      bulkDays: 45,
    },
    woven: {
      moqPerColor: 600,
      moqTotal: 1200,
      devDays: 4,
      ppDays: 9,
      bulkDays: 55,
    },
    jacket: {
      moqPerColor: 400,
      moqTotal: 800,
      devDays: 4,
      ppDays: 10,
      bulkDays: 65,
    },
  },
  fabric: {
    "stock-greige": { addDev: 0, addPP: 0, addBulk: 0, risk: -5 },
    "piece-dyed": { addDev: 1, addPP: 2, addBulk: 7, risk: 5 },
    "yarn-dyed": { addDev: 2, addPP: 3, addBulk: 12, risk: 10 },
  },
  compositionAdj(category, comp) {
    // Small schedule nudge by composition
    const map = {
      Cotton: { bulk: 0, risk: 0 },
      "Cotton/Poly": { bulk: 3, risk: 2 },
      Polyester: { bulk: 5, risk: 4 },
      Nylon: { bulk: 7, risk: 6 },
      "Recycled/Organic": { bulk: 5, risk: -2 },
    };
    const key = map[comp] ? comp : "Cotton";
    return map[key];
  },
  gsmAdj(gsm) {
    if (gsm <= 160) return { bulk: 0 };
    if (gsm <= 260) return { bulk: 2 };
    return { bulk: 4 };
  },
  printing: {
    None: { addDev: 0, addBulk: 0, risk: 0, setup: 0 },
    "Screen Print (spot)": { addDev: 1, addBulk: 5, risk: 3, setup: 80 },
    "Digital DTG": { addDev: 0, addBulk: 3, risk: 2, setup: 0 },
    "Sublimation (poly)": { addDev: 1, addBulk: 6, risk: 4, setup: 0 },
    "Foil/Puff/Discharge (special)": {
      addDev: 2,
      addBulk: 8,
      risk: 6,
      setup: 120,
    },
  },
  washing: {
    None: { addBulk: 0, risk: 0, setup: 0 },
    "Garment Wash (enzyme)": { addBulk: 5, risk: 2, setup: 0 },
    "Acid/Vintage": { addBulk: 7, risk: 4, setup: 0 },
    "Stone/Heavy": { addBulk: 9, risk: 6, setup: 0 },
  },
  embroidery: {
    None: { addDev: 0, addBulk: 0, risk: 0, setup: 0 },
    "Machine Embroidery": { addDev: 1, addBulk: 4, risk: 3, setup: 60 },
    "3D/Puff Embroidery": { addDev: 2, addBulk: 5, risk: 5, setup: 90 },
    Appliqué: { addDev: 2, addBulk: 6, risk: 5, setup: 100 },
  },
  compliance(testLevel) {
    // Inline + final QC intensity / testing packs / lab queues
    const map = {
      Standard: { addPP: 0, addBulk: 0, risk: 0 },
      Enhanced: { addPP: 2, addBulk: 4, risk: -2 },
      "Strict (AQL 1.5)": { addPP: 3, addBulk: 6, risk: -4 },
    };
    return map[testLevel] || map["Standard"];
  },
  nominatedSuppliers(useNominated) {
    return useNominated
      ? { addPP: 3, addBulk: 10, risk: 4 }
      : { addPP: 0, addBulk: 0, risk: 0 };
  },
  colorways(n) {
    // More colorways → more lab dips/screens → slight PP + bulk impact
    if (n <= 1) return { addPP: 0, addBulk: 0 };
    if (n <= 3) return { addPP: 1, addBulk: 3 };
    if (n <= 6) return { addPP: 2, addBulk: 5 };
    return { addPP: 3, addBulk: 7 };
  },
  sizeCurve(complexity) {
    const map = {
      Simple: { addBulk: 0 },
      Standard: { addBulk: 2 },
      Extended: { addBulk: 4 },
    };
    return map[complexity];
  },
  season(load) {
    const map = {
      OffPeak: 0, // %
      Normal: 7, // %
      Peak: 15, // %
    };
    return map[load] || 0;
  },
  pack(packType) {
    const map = {
      "Polybag Basic": { addBulk: 0 },
      "Recyclable Polybag": { addBulk: 1 },
      "Boxed Retail": { addBulk: 4 },
      "Hanger Pack": { addBulk: 2 },
    };
    return map[packType] || { addBulk: 0 };
  },
};

// Utility helpers
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const daysFrom = (start, add) => {
  const d = new Date(start);
  d.setDate(d.getDate() + add);
  return d.toISOString().slice(0, 10);
};

export default function EstimatorPro() {
  const [state, setState] = useState({
    category: "knit",
    fabricType: "piece-dyed",
    composition: "Cotton",
    gsm: 180,
    print: "None",
    wash: "None",
    embroidery: "None",
    colorways: 2,
    sizeCurve: "Standard",
    testLevel: "Enhanced",
    nominated: false,
    packType: "Polybag Basic",
    incoterm: "FOB",
    qtyPerColor: 500,
    numColors: 2,
    targetFOB: 4.2, // USD (optional – for unit economics hints)
    peakLoad: "Normal",
  });

  const on = (key) => (e) =>
    setState((s) => ({
      ...s,
      [key]: e?.target
        ? e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value
        : e,
    }));

  const result = useMemo(() => {
    const base = rules.base[state.category];
    const f = rules.fabric[state.fabricType];
    const compAdj = rules.compositionAdj(state.category, state.composition);
    const gsmAdj = rules.gsmAdj(Number(state.gsm));
    const pr = rules.printing[state.print];
    const wh = rules.washing[state.wash];
    const em = rules.embroidery[state.embroidery];
    const qc = rules.compliance(state.testLevel);
    const nom = rules.nominatedSuppliers(state.nominated);
    const cw = rules.colorways(Number(state.colorways));
    const sz = rules.sizeCurve(state.sizeCurve);
    const pack = rules.pack(state.packType);
    const loadPct = rules.season(state.peakLoad);

    // MOQ logic
    const moqPerColor = base.moqPerColor; // could add rules by fabricType if needed
    const moqTotal = Math.max(
      base.moqTotal,
      moqPerColor * Number(state.numColors)
    );

    // Lead-time days
    let dev = base.devDays + f.addDev + pr.addDev + em.addDev;
    let pp = base.ppDays + f.addPP + qc.addPP + nom.addPP + cw.addPP;
    let bulk =
      base.bulkDays +
      f.addBulk +
      compAdj.bulk +
      gsmAdj.bulk +
      pr.addBulk +
      wh.addBulk +
      em.addBulk +
      qc.addBulk +
      nom.addBulk +
      cw.addBulk +
      sz.addBulk +
      pack.addBulk;

    // Season/load factor
    dev = Math.ceil(dev * (1 + loadPct / 100));
    pp = Math.ceil(pp * (1 + loadPct / 100));
    bulk = Math.ceil(bulk * (1 + loadPct / 100));

    // Risk score (0 best → 100 worst)
    let risk =
      30 + // baseline global supply variability
      f.risk +
      compAdj.risk +
      pr.risk +
      wh.risk +
      em.risk -
      (qc.risk || 0) +
      (nom.risk || 0);

    risk = clamp(risk, 5, 95);

    // Setup costs (non-recurring)
    const setupUSD = pr.setup + em.setup + wh.setup; // rough

    // Timeline
    const today = new Date();
    const devDate = daysFrom(today, dev);
    const ppDate = daysFrom(today, dev + pp);
    const bulkStart = daysFrom(today, dev + pp);
    const exFactory = daysFrom(today, dev + pp + bulk);

    // Unit-economics hint (totally optional/illustrative)
    // Simple “complexity premium” factor widens if risk & adders grow
    const complexityFactor = 1 + (risk - 30) / 300; // ~1.0–1.2
    const suggestedFOB = Number(
      (state.targetFOB * complexityFactor).toFixed(2)
    );

    return {
      moqPerColor,
      moqTotal,
      dev,
      pp,
      bulk,
      totalLeadTime: dev + pp + bulk,
      risk,
      setupUSD,
      timeline: {
        today: today.toISOString().slice(0, 10),
        devDate,
        ppDate,
        bulkStart,
        exFactory,
      },
      suggestedFOB,
      loadPct,
    };
  }, [state]);

  const copySummary = async () => {
    const text = [
      `Category: ${state.category}`,
      `Fabric: ${state.fabricType}, ${state.composition}, ${state.gsm} GSM`,
      `Decoration: Print=${state.print}, Emb=${state.embroidery}, Wash=${state.wash}`,
      `Colors: ${state.numColors} (MOQ/color ${result.moqPerColor})`,
      `Size Curve: ${state.sizeCurve}`,
      `Packaging: ${state.packType}`,
      `Compliance: ${state.testLevel}, Nominated suppliers: ${
        state.nominated ? "Yes" : "No"
      }`,
      `Season Load: ${state.peakLoad} (+${result.loadPct}%)`,
      `Lead-time: Dev ${result.dev}d + PP ${result.pp}d + Bulk ${result.bulk}d = ${result.totalLeadTime} days`,
      `Timeline: Dev by ${result.timeline.devDate}, PP by ${result.timeline.ppDate}, Ex-factory ~ ${result.timeline.exFactory}`,
      `Risk Score: ${result.risk}/100`,
      `Setup (one-off): ~$${result.setupUSD}`,
      `Suggested FOB (hint): ~$${result.suggestedFOB}`,
      `Incoterm: ${state.incoterm}`,
    ].join("\n");
    await navigator.clipboard.writeText(text);
    alert("Summary copied to clipboard.");
  };

  const download = (fmt) => {
    const payload = { input: state, result };
    let blob;
    if (fmt === "json") {
      blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json",
      });
    } else {
      // CSV simple
      const rows = [
        ["key", "value"],
        ...Object.entries({
          category: state.category,
          fabricType: state.fabricType,
          composition: state.composition,
          gsm: state.gsm,
          print: state.print,
          wash: state.wash,
          embroidery: state.embroidery,
          colorways: state.colorways,
          sizeCurve: state.sizeCurve,
          testLevel: state.testLevel,
          nominated: state.nominated ? "Yes" : "No",
          packType: state.packType,
          incoterm: state.incoterm,
          qtyPerColor: state.qtyPerColor,
          numColors: state.numColors,
          targetFOB: state.targetFOB,
          peakLoad: state.peakLoad,
          moqPerColor: result.moqPerColor,
          moqTotal: result.moqTotal,
          devDays: result.dev,
          ppDays: result.pp,
          bulkDays: result.bulk,
          totalLeadTime: result.totalLeadTime,
          exFactory: result.timeline.exFactory,
          riskScore: result.risk,
          setupUSD: result.setupUSD,
          suggestedFOB: result.suggestedFOB,
        }),
      ]
        .map((r) => r.map((x) => `"${x}"`).join(","))
        .join("\n");
      blob = new Blob([rows], { type: "text/csv" });
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fmt === "json" ? "estimator.json" : "estimator.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // simple bar helper for timeline visualization
  const Bar = ({ label, days, color = "bg-indigo-500" }) => (
    <div className="flex items-center gap-3">
      <div className="w-28 shrink-0 text-xs text-gray-600">{label}</div>
      <div
        className={`h-2 rounded-full ${color}`}
        style={{ width: `${Math.max(days, 1) * 3}px` }}
      />
      <div className="text-xs text-gray-600 ml-2">{days}d</div>
    </div>
  );

  const Info = ({ title, children }) => (
    <div className="card p-4">
      <p className="font-semibold mb-2">{title}</p>
      <div className="text-sm text-gray-700">{children}</div>
    </div>
  );

  return (
    <div className="space-y-10">
      {/* Controls */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="card p-4 space-y-3">
          <p className="font-semibold">Product & Fabric</p>
          <select
            value={state.category}
            onChange={on("category")}
            className="input"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <select
            value={state.fabricType}
            onChange={on("fabricType")}
            className="input"
          >
            {FABRIC_TYPE.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-3">
            <select
              value={state.composition}
              onChange={on("composition")}
              className="input"
            >
              {[
                "Cotton",
                "Cotton/Poly",
                "Polyester",
                "Nylon",
                "Recycled/Organic",
              ].map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
            <input
              type="number"
              min={90}
              max={400}
              step={10}
              value={state.gsm}
              onChange={on("gsm")}
              className="input"
              placeholder="GSM"
            />
          </div>
        </div>

        <div className="card p-4 space-y-3">
          <p className="font-semibold">Decorations & Colors</p>
          <select value={state.print} onChange={on("print")} className="input">
            {PRINT_TYPES.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          <select
            value={state.embroidery}
            onChange={on("embroidery")}
            className="input"
          >
            {EMB_TYPES.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          <select value={state.wash} onChange={on("wash")} className="input">
            {WASH_TYPES.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              min={1}
              value={state.numColors}
              onChange={on("numColors")}
              className="input"
              placeholder="No. of colors"
            />
            <input
              type="number"
              min={100}
              step={50}
              value={state.qtyPerColor}
              onChange={on("qtyPerColor")}
              className="input"
              placeholder="Qty per color"
            />
          </div>
        </div>

        <div className="card p-4 space-y-3">
          <p className="font-semibold">Compliance & Logistics</p>
          <select
            value={state.testLevel}
            onChange={on("testLevel")}
            className="input"
          >
            {["Standard", "Enhanced", "Strict (AQL 1.5)"].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={state.nominated}
              onChange={on("nominated")}
            />
            Nominated suppliers (buyer-mandated)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <select
              value={state.packType}
              onChange={on("packType")}
              className="input"
            >
              {PACK_TYPES.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
            <select
              value={state.incoterm}
              onChange={on("incoterm")}
              className="input"
            >
              {INCOTERMS.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select
              value={state.peakLoad}
              onChange={on("peakLoad")}
              className="input"
            >
              {["OffPeak", "Normal", "Peak"].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
            <input
              type="number"
              step={0.1}
              min={1}
              value={state.targetFOB}
              onChange={on("targetFOB")}
              className="input"
              placeholder="Target FOB (USD)"
            />
          </div>
          <select
            value={state.sizeCurve}
            onChange={on("sizeCurve")}
            className="input"
          >
            {["Simple", "Standard", "Extended"].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Info title="MOQ Summary">
          <div className="grid grid-cols-2 gap-2">
            <div>MOQ / Color</div>
            <div className="text-right font-medium">
              {result.moqPerColor.toLocaleString()} pcs
            </div>
            <div>Colors</div>
            <div className="text-right">{Number(state.numColors)}</div>
            <div>Total MOQ</div>
            <div className="text-right font-semibold">
              {result.moqTotal.toLocaleString()} pcs
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            We can discuss trial quantities for first orders depending on style
            complexity.
          </p>
        </Info>

        <Info title="Lead-Time Breakdown (calendar days)">
          <div className="grid grid-cols-2 gap-2">
            <div>Development</div>
            <div className="text-right">{result.dev} d</div>
            <div>PP Sample & Approvals</div>
            <div className="text-right">{result.pp} d</div>
            <div>Bulk Production</div>
            <div className="text-right">{result.bulk} d</div>
            <div>Total</div>
            <div className="text-right font-semibold">
              {result.totalLeadTime} d
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <Bar label="Development" days={result.dev} color="bg-blue-500" />
            <Bar label="PP/Approvals" days={result.pp} color="bg-amber-500" />
            <Bar label="Bulk" days={result.bulk} color="bg-emerald-500" />
          </div>
        </Info>

        <Info title="Confidence & Cost Signals">
          <div className="flex items-center justify-between">
            <div>Risk Score</div>
            <div className="text-right font-semibold">{result.risk} / 100</div>
          </div>
          <div className="mt-2">
            <div className="h-2 rounded-full bg-gray-200">
              <div
                className={`h-2 rounded-full ${
                  result.risk < 35
                    ? "bg-emerald-500"
                    : result.risk < 65
                    ? "bg-amber-500"
                    : "bg-rose-500"
                }`}
                style={{ width: `${result.risk}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Lower is better. Risk reflects fabric/decorations complexity,
              supplier nomination, and season load.
            </p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div>One-off Setup</div>
            <div className="text-right">~${result.setupUSD}</div>
            <div>Suggested FOB hint</div>
            <div className="text-right">~${result.suggestedFOB}</div>
          </div>
        </Info>
      </div>

      {/* Timeline */}
      <div className="card p-4">
        <p className="font-semibold mb-3">Indicative Timeline</p>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Today</p>
            <p className="font-medium">{result.timeline.today}</p>
          </div>
          <div>
            <p className="text-gray-500">Dev Ready ~</p>
            <p className="font-medium">{result.timeline.devDate}</p>
          </div>
          <div>
            <p className="text-gray-500">PP Approval ~</p>
            <p className="font-medium">{result.timeline.ppDate}</p>
          </div>
          <div>
            <p className="text-gray-500">Ex-Factory ~</p>
            <p className="font-medium">{result.timeline.exFactory}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Shipping transit depends on incoterm {state.incoterm}. FOB excludes
          ocean/air time; CIF includes freight; DDP includes customs & delivery.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="btn" onClick={copySummary}>
          Copy Summary
        </button>
        <button className="btn-secondary" onClick={() => download("json")}>
          Download JSON
        </button>
        <button className="btn-secondary" onClick={() => download("csv")}>
          Download CSV
        </button>
        <a href="/rfq" className="btn-secondary">
          Proceed to RFQ
        </a>
      </div>

      {/* Disclosure */}
      <p className="text-xs text-gray-500">
        These estimates reflect Sapphire Design LTD’s typical Bangladesh
        production flows. Actuals can vary with fabric readiness, buyer
        approvals, nominated suppliers, and lab queues. We’ll lock final dates
        at tech-pack confirmation and PO placement.
      </p>
    </div>
  );
}
