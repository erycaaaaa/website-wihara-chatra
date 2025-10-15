"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "../Component/ui/button";

const NAV_LINKS = [
  { href: "/beranda", label: "Beranda" },
  { href: "/tentang", label: "Tentang Chatra" },
  { href: "/acara", label: "Kegiatan" },
  { href: "/artikel", label: "Artikel" },
  { href: "/kontak", label: "Kontak" },
];

function NavLinkItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className="group relative text-sm font-medium text-zinc-800 hover:text-zinc-900"
    >
      {label}
      <span
        className={`absolute -bottom-1 left-0 h-0.5 rounded bg-current transition-all duration-300 ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b  backdrop-blur-2xl",
        "transition-shadow",
        "border-black/5 bg-[var(--color-surface,#ffffff)]/90",
        scrolled ? "shadow-md" : "shadow-none",
      ].join(" ")}
    >
      <div className="container mx-auto h-16 px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo1.jpg"
            alt="Logo Wihara"
            width={28}
            height={28}
            className="rounded-md ring-1 ring-black/5 group-hover:scale-105 transition"
            priority
          />
          <span className="font-serif text-lg font-medium tracking-tight">
            Chatra Dhammapanno
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.slice(0, 5).map((l) => (
            <NavLinkItem key={l.href} {...l} />
          ))}
          <Link
            href="/donasi"
            className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 transition"
          >
            Donasi
          </Link>
        </nav>

        {/* Mobile trigger */}
        <div className="md:hidden">
          <Button
            variant="outline"
            size="icon"
            aria-label="Buka menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu className="size-4" />
          </Button>
        </div>
      </div>

      {/* Mobile panel (drawer) */}
      <div
        className={`md:hidden fixed inset-0 z-[60] ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        {/* drawer */}
        <aside
          className={`absolute right-0 top-0 h-full w-80 max-w-[80%] bg-[var(--color-surface,#ffffff)] border-l border-black/5 shadow-xl
          transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi"
        >
          <div className="flex items-center justify-between p-4 border-b">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2"
            >
              <Image
                src="/logo-wihara.svg"
                alt="Logo Wihara"
                width={24}
                height={24}
                className="rounded-md ring-1 ring-black/5"
              />
              <span className="font-serif font-semibold">
                Chatra Dhammapanno
              </span>
            </Link>
            <Button
              variant="outline"
              size="icon"
              aria-label="Tutup menu"
              onClick={() => setOpen(false)}
            >
              <X className="size-4" />
            </Button>
          </div>

          <nav className="p-4 flex flex-col gap-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-zinc-100"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/donasi"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800"
            >
              Donasi
            </Link>
          </nav>
        </aside>
      </div>
    </header>
  );
}
