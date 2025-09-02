"use client";
import Image from "next/image";

export default function Gallery({ images = [] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {images.map((src, i) => (
        <div key={i} className="relative h-28 w-full overflow-hidden rounded-xl border">
          <Image
            src={src || "/images/placeholder.jpg"}
            alt={`gallery ${i + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 33vw, 20vw"
          />
        </div>
      ))}
    </div>
  );
}
