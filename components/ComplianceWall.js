export default function ComplianceWall() {
  const certs = [
    { name: "OEKO-TEX Standard 100", img: "/certs/oekotex-thumb.png", proof: "/certs/oekotex-proof.pdf" },
    { name: "BSCI/Amfori (Planned)", img: "/certs/_placeholder.png", proof: "#" },
    { name: "SEDEX (Planned)", img: "/certs/_placeholder.png", proof: "#" },
    { name: "GOTS (Planned)", img: "/certs/_placeholder.png", proof: "#" },
  ];
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      {certs.map((c,i)=>(
        <a key={i} href={c.proof} className="card no-underline" aria-label={`View ${c.name} certificate (thumbnail)`}>
          <img src={c.img} alt={`${c.name} certificate thumbnail`} className="rounded-xl h-28 w-full object-contain bg-gray-50"/>
          <p className="mt-2 text-sm font-medium text-gray-900">{c.name}</p>
          <p className="text-xs text-gray-500">Click to view proof (thumbnail or PDF)</p>
        </a>
      ))}
    </div>
  );
}
