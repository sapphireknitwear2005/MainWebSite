"use client";
import { useEffect, useState } from "react";

export default function LiveCapacityWidget() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/data/capacity.json').then(r=>r.json()).then(setData).catch(()=>{});
  }, []);
  if (!data) return <div className="card">Loading capacity…</div>;
  return (
    <div className="card" aria-live="polite">
      <h3 className="text-lg font-semibold mb-2">Live Capacity</h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div><span className="text-gray-500">Lines:</span> <strong>{data.lines}</strong></div>
        <div><span className="text-gray-500">Available Lines:</span> <strong>{data.availableLines}</strong></div>
        <div><span className="text-gray-500">Utilization:</span> <strong>{data.currentUtilizationPercent}%</strong></div>
        <div><span className="text-gray-500">Monthly Capacity:</span> <strong>{data.monthlyCapacityPcs.toLocaleString()} pcs</strong></div>
      </div>
      <p className="mt-2 text-xs text-gray-500">Lead times: Dev {data.leadTimes.sampleDays}d • PP {data.leadTimes.ppSampleDays}d • Bulk {data.leadTimes.bulkDays}d</p>
      <p className="mt-2 text-xs text-gray-500">Last updated: {new Date(data.lastUpdated).toLocaleString()}</p>
    </div>
  );
}
