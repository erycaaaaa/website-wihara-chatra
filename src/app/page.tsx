// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chatra Dhammapanno",
  description:
    "Situs resmi Wihara Mahāyāna: ibadah, pendaftaran acara, donasi, artikel, layanan, dan galeri.",
  openGraph: {
    title: "Chatra Dhammapanno",
    description:
      "Situs resmi Wihara Mahāyāna: ibadah, pendaftaran acara, donasi, artikel, layanan, dan galeri.",

    images: [
      {
        url: "/logo1.jpg",         
        width: 1200,             
        height: 630,
        alt: "Logo Chatra Dhammapanno",
      },
    ],
    locale: "id_ID",
    type: "website",
    siteName: "Chatra Dhammapanno",
  },
  twitter: {
    card: "summary_large_image",
    images: ["logo1.jpg"],
  },
  icons: {
    icon: "/logo1.jpg",              
    shortcut: "/logo1.jpg",
    apple: "/logo1.jpg",           
  },
};

export default function Page() {
  return (
    <main>
    </main>
  );
}
