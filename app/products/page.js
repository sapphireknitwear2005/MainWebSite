// app/products/page.js

export const metadata = {
  title: "Products — Sapphire Design LTD",
  description:
    "Full range of knitwear, woven, jackets, and more — manufactured at scale with in-house compliance and quality.",
};

import ProductsContent from "./ProductsContent";

export default function Page() {
  return <ProductsContent />;
}
