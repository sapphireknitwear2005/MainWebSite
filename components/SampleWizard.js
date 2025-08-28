"use client";
import { useState } from "react";

export default function SampleWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ courier:"DHL", account:"", address:"" });
  function next(){ setStep(s=>Math.min(s+1,3)); }
  function back(){ setStep(s=>Math.max(s-1,1)); }
  async function submit(){
    await fetch('/api/lead', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ...data, source:'sample-wizard' }) });
    setStep(3);
  }
  return (
    <div className="card">
      <ol className="flex gap-2 text-sm mb-4">
        <li className={step>=1?'font-semibold':''}>1. Items</li>
        <li>›</li>
        <li className={step>=2?'font-semibold':''}>2. Courier</li>
        <li>›</li>
        <li className={step>=3?'font-semibold':''}>3. Confirm</li>
      </ol>
      {step===1 && (
        <div className="space-y-3">
          <label className="block text-sm">Category<select className="mt-1 w-full border rounded-xl p-2" onChange={e=>setData({...data, category:e.target.value})}>
            <option>Knitwear</option><option>Woven</option><option>Jackets</option>
          </select></label>
          <label className="block text-sm">Sizes<input className="mt-1 w-full border rounded-xl p-2" placeholder="S-XXL / 2-14" onChange={e=>setData({...data, sizes:e.target.value})}/></label>
          <div className="flex gap-2">
            <button className="btn" onClick={next}>Next</button>
          </div>
        </div>
      )}
      {step===2 && (
        <div className="space-y-3">
          <label className="block text-sm">Courier<select className="mt-1 w-full border rounded-xl p-2" value={data.courier} onChange={e=>setData({...data, courier:e.target.value})}>
            <option>DHL</option><option>FedEx</option><option>UPS</option>
          </select></label>
          <label className="block text-sm">Courier Account # (optional)<input className="mt-1 w-full border rounded-xl p-2" onChange={e=>setData({...data, account:e.target.value})}/></label>
          <label className="block text-sm">Delivery Address<textarea rows={3} className="mt-1 w-full border rounded-xl p-2" onChange={e=>setData({...data, address:e.target.value})}></textarea></label>
          <div className="flex gap-2">
            <button className="btn-secondary" onClick={back}>Back</button>
            <button className="btn" onClick={next}>Next</button>
          </div>
        </div>
      )}
      {step===3 && (
        <div className="space-y-3">
          <p className="text-sm">Confirm and request samples. By submitting you agree to our <a href="/terms">terms</a>.</p>
          <button className="btn" onClick={submit}>Submit Sample Request</button>
        </div>
      )}
    </div>
  );
}
