// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "../Component/navbar";
import { Footer } from "../Component/footer";

export const metadata: Metadata = {
  title: { default: "Chatra Dhammapanno", template: "%s • Chatra Dhammapanno" },
  description: "Situs resmi Wihara Mahāyāna: ibadah, pendaftaran acara, donasi, artikel, layanan, dan galeri.",
  openGraph: {
    title: "Chatra Dhammapanno",
    description: "Situs resmi Wihara Mahāyāna: ibadah, pendaftaran acara, donasi, artikel, layanan, dan galeri.",
    images: [{ url: "/logo1.jpg", width: 1200, height: 630, alt: "Logo" }],
    type: "website",
    siteName: "Chatra Dhammapanno",
  },
  twitter: { card: "summary_large_image", images: ["/logo1.jpg"] },
  icons: { icon: "/logo1.jpg", shortcut: "/logo1.jpg", apple: "/logo1.jpg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main className="container py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
