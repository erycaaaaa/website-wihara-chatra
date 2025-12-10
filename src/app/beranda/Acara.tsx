"use client";

import { useState } from "react";

const TABS = [
  "Semua",
  "Mingguan",
  "Bulanan",
  "Tahunan",
  "kegiatan-wihara",
  "Orang Tua",
];

const DESTS = [
  { 
    id: "1", 
    title: "Kebaktian Mingguan", 
    Panitia: "Budi", 
    image: "/ibadah-mingguan-1.jpeg", 
    tag: "Mingguan",
    date: "Setiap Minggu"
  },
  { 
    id: "2", 
    title: "Kebaktian Bulanan", 
    Panitia: "Siti", 
    image: "/ibadah-bulanan-1.jpeg", 
    tag: "Bulanan",
    date: "1 Januari 2025"
  },
  { 
    id: "3", 
    title: "Perayaan Tahunan", 
    Panitia: "Ahmad", 
    image: "/perayaan-tahunan-1.jpeg", 
    tag: "Tahunan",
    date: "15 Maret 2025"
  },
  { 
    id: "4", 
    title: "Kegiatan Wihara", 
    Panitia: "Dewi", 
    image: "/kegiatan-wihara-1.jpeg", 
    tag: "kegiatan-wihara",
    date: "Setiap Sabtu"
  },
  { 
    id: "5", 
    title: "Kebaktian Orang Tua", 
    Panitia: "Pak Joko", 
    image: "/kebaktian-orangtua-1.jpeg", 
    tag: "Orang Tua",
    date: "Setiap Rabu"
  },
];

export default function Acara() {
  const [category, setCategory] = useState("Semua");

  const filtered =
    category === "Semua" ? DESTS : DESTS.filter((d) => d.tag === category);

  return (
    <section className="py-10 bg-gradient-to-b from-white to-zinc-50">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
              Update Acara
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              Temukan berbagai kegiatan dan acara wihara
            </p>
          </div>
          <button className="hidden md:inline-flex items-center rounded-full bg-zinc-900 text-white px-4 py-2 text-sm font-medium hover:bg-zinc-800 transition-colors">
            Ikuti semua acara
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map((cat) => {
            const active = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={[
                  "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium border transition-all duration-200",
                  active
                    ? "bg-zinc-900 text-white border-zinc-900 shadow-lg scale-105"
                    : "bg-white border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300",
                ].join(" ")}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-500">Tidak ada acara dalam kategori ini</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((d) => (
              <article
                key={d.id}
                className="group rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-zinc-700">
                    {d.tag}
                  </div>
                  <img 
                    src={d.image} 
                    alt={d.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg leading-tight text-zinc-900 mb-1">
                    {d.title}
                  </h3>
                  <p className="text-sm text-zinc-600 mb-2">
                    Panitia: {d.Panitia}
                  </p>
                  <p className="text-xs text-zinc-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {d.date}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-6 md:hidden text-center">
          <button className="inline-flex items-center rounded-full bg-zinc-900 text-white px-4 py-2 text-sm font-medium hover:bg-zinc-800 transition-colors">
            Ikuti semua acara
          </button>
        </div>
      </div>
    </section>
  );
}