// app/(...)/Hero.tsx
import Link from "next/link";
import Image from "next/image";
// ====================================================================
const BASE = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const asset = (p: string) => `${BASE}${p.startsWith("/") ? p : `/${p}`}`;
// ====================================================================
const BG_SRC = asset("/vl1.png");
const photos = [
  { src: asset("/vl1.png"), alt: "Galeri 1" },
  { src: asset("/vl3.png"), alt: "Galeri 2" },
  { src: asset("/vp1.jpg"), alt: "Galeri 3" },
  { src: asset("/vp3.png"), alt: "Galeri 4" },
];

function GalleryGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-2xl bg-zinc-100/70 p-2 backdrop-blur-sm">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image
            src={photos[0].src}
            alt={photos[0].alt}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
      <div className="rounded-2xl bg-zinc-100/70 p-2 md:mt-8 mt-0 backdrop-blur-sm">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image
            src={photos[1].src}
            alt={photos[1].alt}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="rounded-2xl bg-zinc-100/70 p-2 md:-mt-8 mt-0 backdrop-blur-sm">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image
            src={photos[2].src}
            alt={photos[2].alt}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="rounded-2xl bg-zinc-100/70 p-2 backdrop-blur-sm">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image
            src={photos[3].src}
            alt={photos[3].alt}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden py-12 md:py-20 mt-[-33] min-h-[620px]
  ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]"
    >
      {/* BG layer */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen -z-2">
        <div className="relative w-full h-full">
          <Image
            src={BG_SRC}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center select-none pointer-events-none"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/100 via-white/0 to-white/0" />
        <div
          className="pointer-events-none absolute inset-x-0 -top-24 h-[360px]
                    bg-[radial-gradient(600px_220px_at_50%_0%,rgba(13,110,253,.14),transparent_60%)]"
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-[1.1fr_.9fr] gap-8 lg:gap-12 items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold  text-zinc-100">
              Discover the World&apos;s{" "}
              <span className="underline decoration-zinc-100/40 underline-offset-4">
                Hidden
              </span>{" "}
              Wonders
            </h1>
            <p className="mt-4 text-zinc-100 max-w-xl">
              Find the unique moments and hidden gems that ignite unforgettable
              experiences. From rare encounters to remarkable destinations, we
              help you uncover the spark that turns every trip into a cherished
              story.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="#"
                className="inline-flex items-center rounded-full border bg-white/20 border-white text-white px-4 py-2 text-sm font-medium hover:bg-white/50"
              >
                Jadwal Ibadah
              </Link>
              <Link
                href="#"
                className="inline-flex items-center rounded-full border border-zinc-300 bg-white/50 px-4 py-2 text-sm font-medium hover:bg-white"
              >
                Acara
              </Link>
            </div>
          </div>
          <GalleryGrid />
        </div>
      </div>
    </section>
  );
}
