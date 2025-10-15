// src/components/layout/Footer.tsx
"use client";
import { Instagram, Facebook, Mail, MessageCircle } from "lucide-react";

const YEAR = new Date().getFullYear();

const SOCIAL = {
  instagram: "https://instagram.com/namawihara",      
  facebook: "https://facebook.com/namawihara",       
  email: "mailto:halo@namawihara.or.id",             
  whatsapp:
    "https://wa.me/6282199999109?text=Halo%20Admin%2C%20saya%20ingin%20bertanya%20tentang%20jadwal%20ibadah.",
};

export function Footer() {
  return (
    <footer className="mt-16 border-t border-black/5 py-10 text-sm">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-zinc-700">
          &copy; {YEAR} Chatra Dhammapanno.
        </p>

        <nav aria-label="Media sosial" className="flex items-center gap-2">
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex size-9 items-center justify-center rounded-full border border-zinc-200 hover:bg-zinc-50"
            title="Instagram"
          >
            <Instagram className="size-4" />
            <span className="sr-only">Instagram</span>
          </a>
          <a
            href={SOCIAL.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="inline-flex size-9 items-center justify-center rounded-full border border-zinc-200 hover:bg-zinc-50"
            title="Facebook"
          >
            <Facebook className="size-4" />
            <span className="sr-only">Facebook</span>
          </a>
          <a
            href={SOCIAL.email}
            aria-label="Email"
            className="inline-flex size-9 items-center justify-center rounded-full border border-zinc-200 hover:bg-zinc-50"
            title="Email"
          >
            <Mail className="size-4" />
            <span className="sr-only">Email</span>
          </a>
          <a
            href={SOCIAL.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="inline-flex size-9 items-center justify-center rounded-full border border-zinc-200 hover:bg-zinc-50"
            title="WhatsApp"
          >
            <MessageCircle className="size-4" />
            <span className="sr-only">WhatsApp</span>
          </a>
        </nav>
      </div>
    </footer>
  );
}
