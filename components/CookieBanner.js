"use client";
import { useEffect, useState } from "react";
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const ok = localStorage.getItem("cookie-ok");
    if (!ok) setVisible(true);
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center">
      <div className="card max-w-2xl w-full mx-4">
        <p className="text-sm">We use essential cookies to improve your experience. By using our site, you agree to our <a href="/cookies">cookie policy</a>.</p>
        <div className="mt-3 flex gap-3">
          <button className="btn" onClick={() => { localStorage.setItem("cookie-ok","1"); setVisible(false); }}>Accept</button>
          <a className="btn-secondary" href="/privacy">Learn more</a>
        </div>
      </div>
    </div>
  );
}
