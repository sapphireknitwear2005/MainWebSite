import Link from "next/link";
export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <a href="#main" className="visually-hidden focus:not-sr-only">
        Skip to content
      </a>
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <img
            src="/logos/logo.png"
            alt="Sapphire Design LTD logo"
            className="h-12 w-auto"
          />
          <span className="font-semibold tracking-wide text-gray-900">
            Sapphire Design LTD
          </span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm" aria-label="Main">
          <Link href="/about">About</Link>
          <Link href="/products">Products</Link>
          <Link href="/capabilities">Capabilities</Link>
          <Link href="/certifications">Certifications</Link>
          <Link href="/rfq" className="font-semibold">
            RFQ
          </Link>
          <Link href="/estimator">Estimator</Link>
          <Link href="/library">Library</Link>
          <Link href="/gallery">Pictures</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/"
            aria-label="WhatsApp"
            className="btn-secondary text-sm"
          >
            WhatsApp
          </a>
          <Link href="/rfq" className="btn text-sm">
            Request a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
