# Chatra Dhammapanno Website

Website resmi Vihāra Chatra Dhammapanno - Dibangun dengan Next.js 15, TypeScript, dan Tailwind CSS v4.

## 🎯 Fitur Utama

- ✅ **Event Management** - Kalender acara, pendaftaran online, QR code e-ticket
- ✅ **Donation System** - Multiple dana, payment gateway, auto-receipt
- ✅ **E-commerce** - Toko buku & perlengkapan ibadah
- ✅ **Artikel Dharma** - Blog dengan audio/video support
- ✅ **Volunteer Management** - Pendaftaran & penjadwalan relawan
- ✅ **Responsive & Accessible** - WCAG 2.2 AA compliant
- ✅ **SEO Optimized** - Structured data, sitemap, OG images
- ✅ **Performance** - Core Web Vitals 90+

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 atau lebih tinggi
- PostgreSQL database (lokal atau cloud)
- Akun Midtrans (sandbox untuk testing)
- SMTP server untuk email

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/chatra-dhammapanno.git
cd chatra-dhammapanno

# Install dependencies
npm install
# atau
pnpm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local dengan konfigurasi Anda

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Seed database (optional)
npx prisma db seed

# Run development server
npm run dev
```

Server akan berjalan di **http://localhost:3003**

## 📁 Struktur Project

```
chatra-dhammapanno/
├── app/                      # Next.js App Router
│   ├── (marketing)/          # Marketing pages
│   │   ├── page.tsx          # Homepage
│   │   ├── tentang/
│   │   ├── jadwal/
│   │   ├── artikel/
│   │   └── kontak/
│   ├── acara/                # Events
│   ├── donasi/               # Donations
│   ├── toko/                 # E-commerce
│   ├── relawan/              # Volunteers
│   ├── api/                  # API routes
│   │   ├── donations/
│   │   ├── events/
│   │   ├── orders/
│   │   └── webhooks/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── layout/               # Layout components
│   ├── events/               # Event components
│   ├── donations/            # Donation components
│   ├── shop/                 # Shop components
│   └── volunteer/            # Volunteer components
├── lib/
│   ├── db/                   # Database utilities
│   ├── payments/             # Payment integrations
│   ├── utils/                # Helper functions
│   ├── seo/                  # SEO utilities
│   ├── ical.ts
│   └── email.ts
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed data
├── public/
│   ├── images/
│   └── fonts/
├── types/                    # TypeScript types
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎨 Design System

### Typography
- **Heading**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Base Size**: 16px
- **Line Height**: 1.6

### Colors
```
Primary:    #7A4E2D (Coklat tembaga)
Surface:    #FFF9F1 (Krem)
Accent:     #CDA434 (Emas)
Success:    #247A3B
Warning:    #B45309
Error:      #B42318
```

### Spacing & Radius
- Container: max-width 1280px
- Border Radius: 1rem (components), full (badges)
- Focus Ring: 2px solid with 3:1 contrast

## 🔧 Configuration

### Database Setup

#### Option 1: Lokal PostgreSQL
```bash
# Install PostgreSQL
# Create database
createdb chatra_dhammapanno

# Update .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/chatra_dhammapanno"
```

#### Option 2: Neon (Recommended)
1. Buat akun di [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string ke `.env.local`

#### Option 3: Vercel Postgres
1. Di Vercel dashboard, pilih project
2. Storage → Create Database → Postgres
3. Copy environment variables

### Payment Gateway (Midtrans)

1. Daftar di [Midtrans](https://midtrans.com)
2. Dapatkan Client Key & Server Key (gunakan Sandbox untuk testing)
3. Set di `.env.local`:
```
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxx
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxxx
MIDTRANS_IS_PRODUCTION=false
```
4. Setup webhook URL: `https://yourdomain.com/api/webhooks/midtrans`

### Email Configuration

#### Option 1: Brevo (Recommended - Free tier 300 emails/day)
```
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-api-key
```

#### Option 2: Gmail
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password
```

### Turnstile (reCAPTCHA Alternative)

1. Kunjungi [Cloudflare Turnstile](https://dash.cloudflare.com/turnstile)
2. Add Site
3. Copy Site Key & Secret Key

## 📝 Content Management

### Option 1: Markdown + Contentlayer (Simple)
Untuk artikel/post, buat file di `content/posts/*.md`:

```markdown
---
title: "Mettā dalam Kehidupan Sehari-hari"
author: "Bhante Uttamo"
date: 2025-01-15
tags: ["metta", "praktik"]
audioUrl: "/audio/metta-practice.mp3"
---

Konten artikel...
```

### Option 2: Sanity CMS (Recommended)
1. Install Sanity: `npm install @sanity/client next-sanity`
2. Setup schemas untuk Post, Event, Product, dll
3. Deploy Sanity Studio
4. Configure di `.env.local`

## 🚢 Deployment

### Vercel (