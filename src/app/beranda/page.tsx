// app/beranda/page.tsx
import Hero from "./Hero";
import Acara from "./Acara";
import LatestArtikel from "./LatestArtikel";
import Highlights from "./Highlights";

export const metadata = {
  title: "Beranda • Discover Hidden Wonders",
  description:
    "Top destinations, travel Artikel, trekker highlights, and newsletter — based on the wireframe.",
};

export default function Page() {
  return (
    <main className="bg-white/0">
      <Hero />
      <Acara />
      <Highlights />
      <LatestArtikel />
    </main>
  );
}
