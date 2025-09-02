"use client";
import { useEffect, useRef, useState } from "react";

// Very lightweight 360 viewer (drag to rotate).
// Provide a folder of frames: prefix + index + suffix.
// Example: prefix="/images/360/machine_", frames=24, suffix=".webp"
export default function Viewer360({ prefix, frames = 24, suffix = ".webp" }) {
  const [idx, setIdx] = useState(1);
  const dragging = useRef(false);
  const lastX = useRef(0);

  const clamp = (n) => ((n % frames) + frames) % frames || frames;

  const onDown = (e) => {
    dragging.current = true;
    lastX.current = e.clientX || e.touches?.[0]?.clientX || 0;
  };
  const onUp = () => (dragging.current = false);
  const onMove = (e) => {
    if (!dragging.current) return;
    const x = e.clientX || e.touches?.[0]?.clientX || 0;
    const delta = Math.floor((x - lastX.current) / 8);
    if (delta !== 0) {
      setIdx((p) => clamp(p - delta));
      lastX.current = x;
    }
  };

  const src = `${prefix}${idx}${suffix}`;

  return (
    <div
      className="relative w-full h-64 rounded-2xl border overflow-hidden select-none bg-gray-50"
      onMouseDown={onDown}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      onMouseMove={onMove}
      onTouchStart={onDown}
      onTouchMove={onMove}
      onTouchEnd={onUp}
      role="img"
      aria-label="360 degree viewer"
      title="Drag to rotate"
    >
      {/* Using regular img for simplicity; you can swap to next/image if you predeclare sizes */}
      <img src={src} alt="360 frame" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute bottom-2 right-2 text-xs bg-white/80 px-2 py-1 rounded">
        Drag to rotate
      </div>
    </div>
  );
}
