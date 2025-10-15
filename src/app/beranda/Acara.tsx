// app/beranda/Acara.tsx
"use client";

import { useState } from "react";
import Placeholder from "./_Placeholder";

const TABS = ["Semua", "Mingguan", "Bulanan", "Tahunan", "Anak Muda", "Orang Tua"];

const DESTS = [
  { id: "1", title: "Kebaktian Mingguan", Panitia: "Budi", tag: "Tahunan" },
  { id: "2", title: "Kebaktian Bulanan", Panitia: "Budi", tag: "Bulanan" },
  { id: "3", title: "Kebaktian Bulanan", Panitia: "Turkey", tag: "Bulanan" },
  { id: "4", title: "Kebaktian Anak Remaja", Panitia: "Australia", tag: "Anak Muda" },
];

export default function Acara() {
  const [category, setCategory] = useState<string>("Semua");

  const filtered =
    category === "Semua" ? DESTS : DESTS.filter((d) => d.tag === category);

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Update Acara</h2>
          <button className="hidden md:inline-flex items-center rounded-full border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50">
            Ikuti semua acara
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {TABS.map((cat) => {
            const active = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={[
                  "inline-flex items-center rounded-full px-3 py-1 text-sm border",
                  active
                    ? "bg-zinc-900 text-white border-zinc-900"
                    : "bg-white border-zinc-200 hover:bg-zinc-50",
                ].join(" ")}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((d) => (
            <article
              key={d.id}
              className="rounded-2xl border border-zinc-200 bg-white shadow-[0_8px_28px_rgba(0,0,0,.06)]"
            >
              <div className="p-3">
                <div className="rounded-xl overflow-hidden bg-zinc-100">
                  <Placeholder className="w-full h-auto" />
                </div>
                <div className="mt-3">
                  <h3 className="font-medium leading-tight">{d.title}</h3>
                  <p className="text-sm text-zinc-600">{d.Bhante}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-5 md:hidden">
          <button className="inline-flex items-center rounded-full border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50">
            Explore all destinations
          </button>
        </div>
      </div>
    </section>
  );
}
