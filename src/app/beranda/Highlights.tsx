import Placeholder from "./_Placeholder";

export default function Highlights(){
  return (
    <section className="py-12 border-t border-zinc-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">
          Sorotan Kegiatan Wihara
        </h2>

        <div className="grid lg:grid-cols-[.9fr_1.1fr] gap-8">
          {/* Testimonial / highlight kiri */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-zinc-200" aria-hidden="true" />
              <div>
                <div className="font-medium">Uposatha & Dhammadesana</div>
                <div className="text-xs text-zinc-500">
                  Umat Wihara • Relawan Dhamma • 15 Okt 2025
                </div>
              </div>
            </div>

            <p className="mt-4 text-zinc-700 leading-relaxed">
              Malam Uposatha berlangsung khidmat: pembacaan paritta, meditasi napas,
              dan Dhammadesana tentang welas asih dalam keseharian. Banyak umat
              merasakan batin lebih tenang dan terbuka—sebuah pengingat bahwa
              latihan kecil namun konsisten menumbuhkan kebijaksanaan yang nyata.
            </p>

            {/* Tag ringkas aktivitas */}
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Meditasi</span>
              <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">Paritta</span>
              <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Dhamma Talk</span>
              <span className="px-2 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">Dāna</span>
            </div>

            {/* Aksi ringkas */}
            <div className="mt-4 flex items-center gap-3">
              <a
                href="#jadwal"
                className="px-3 py-1.5 rounded-full border border-zinc-200 hover:border-zinc-300 bg-zinc-50 text-sm"
              >
                Lihat Jadwal
              </a>
              <a
                href="#daftar-uposatha"
                className="px-3 py-1.5 rounded-full border border-emerald-200 hover:border-emerald-300 bg-emerald-50 text-emerald-700 text-sm"
              >
                Daftar Uposatha
              </a>
            </div>
          </div>

          {/* Media grid kanan */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Foto prosesi puja */}
            <div className="rounded-2xl overflow-hidden bg-zinc-100 p-2">
              <div className="relative">
                <Placeholder className="w-full h-auto rounded-xl" />
                <span className="absolute left-3 top-3 text-xs px-2 py-1 rounded-full bg-white/90 border border-zinc-200">
                  Prosesi Puja
                </span>
                <span className="sr-only">Foto prosesi puja di aula utama wihara</span>
              </div>
            </div>

            {/* Rekaman khotbah (video) */}
            <div className="rounded-2xl overflow-hidden bg-zinc-100 p-2">
              <div className="relative">
                <Placeholder className="w-full h-auto rounded-xl" />
                <div className="absolute inset-0 grid place-items-center">
                  <button
                    className="size-12 rounded-full bg-white/90 border border-zinc-200 shadow"
                    aria-label="Putar rekaman Dhammadesana"
                  >
                    ▶
                  </button>
                </div>
                <span className="absolute left-3 top-3 text-xs px-2 py-1 rounded-full bg-white/90 border border-zinc-200">
                  Rekaman Khotbah
                </span>
                <span className="sr-only">Cuplikan video Dhammadesana tentang welas asih</span>
              </div>
            </div>

            {/* Foto kebersamaan umat */}
            <div className="rounded-2xl overflow-hidden bg-zinc-100 p-2 md:col-span-2">
              <div className="relative">
                <Placeholder className="w-full h-auto rounded-xl" />
                <div className="absolute left-3 bottom-3 text-xs px-2 py-1 rounded-full bg-white/90 border border-zinc-200">
                  Kebersamaan Umat
                </div>
                <span className="sr-only">Foto kebersamaan umat setelah kegiatan Uposatha</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
