export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container py-10 text-sm text-gray-600">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <p className="font-semibold text-gray-900">
              Sapphire Design Limited
            </p>
            <p>Dhaka, Bangladesh • Est. 2005</p>
            <p>
              Email:{" "}
              <a href="mailto:sales@sapphire-knitwear.com">
                sales@sapphire-knitwear.com
              </a>
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Compliance</p>
            <ul className="list-disc ml-5">
              <li>OEKO-TEX Standard 100</li>
              <li>
                Planned: BSCI/Amfori, SEDEX, WRAP, GOTS, GRS, HIGG FEM/FSLM,
                ZDHC
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Legal</p>
            <ul className="list-disc ml-5">
              <li>
                <a href="/privacy">Privacy</a>
              </li>
              <li>
                <a href="/cookies">Cookies</a>
              </li>
              <li>
                <a href="/terms">Terms</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8">
          © {new Date().getFullYear()} Sapphire Design LTD. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
