import Link from "next/link";
import Placeholder from "./_Placeholder";

const Artikel = [
  { id: "a1", cat: "Sejarah", title: "Jalan Welas Asih & Kebijaksanaan di Dunia Modern", date: "Okt 15, 2025", place:"Jakarta,Indonesia", read: "1 min read" },
  { id: "a2", cat: "Praktik Harian", title: "Praktik Harian Buddhis: 15 Menit Sila–Samadhi–Panna", date: "Agu 12, 2024", place:"Jakarta,Indonesia", read: "4 min read" },
  { id: "a3", cat: "Ajaran Inti", title: "Empat Kebenaran Mulia & Jalan Mulia Berunsur Delapan", date: "Agu 18, 2024", place:"Jakarta,Indonesia", read: "6 min read" },
];

export default function LatestArtikel(){
  return (
    <section className="py-12 border-t border-zinc-100">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Artikel Buddhis Mingguan</h2>
          <Link href="#" className="hidden md:inline-flex items-center rounded-full border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50">
           Baca Artikel Lainnya
          </Link>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-8">
          {/* Big feature */}
          <article className="rounded-2xl border border-zinc-200 bg-white shadow-[0_8px_28px_rgba(0,0,0,.06)] p-4">
            <div className="rounded-xl overflow-hidden bg-zinc-100">
              <Placeholder className="w-full h-auto" />
            </div>
            <div className="mt-3">
              <div className="text-sm text-zinc-500">{Artikel[0].cat}</div>
              <h3 className="font-medium leading-tight">{Artikel[0].title}</h3>
              <div className="text-xs text-zinc-500 mt-1">{Artikel[0].date} {Artikel[0].place} • {Artikel[0].read}</div>
            </div>
          </article>

          {/* Side list */}
          <div className="grid gap-4">
            {Artikel.slice(1).map((s) => (
              <article key={s.id} className="grid grid-cols-[96px_1fr] gap-3 rounded-2xl border border-zinc-200 bg-white p-3">
                <div className="rounded-lg overflow-hidden bg-zinc-100">
                  <Placeholder className="w-full h-auto" />
                </div>
                <div>
                  <div className="text-xs text-zinc-500">{s.cat}</div>
                  <h4 className="font-medium leading-snug">{s.title}</h4>
                  <div className="text-xs text-zinc-500 mt-1">{s.date} {s.place} • {s.read}</div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 md:hidden">
          <Link href="#" className="inline-flex items-center rounded-full border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50">
            Read more articles
          </Link>
        </div>
      </div>
    </section>
  );
}
