import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

// GET - Ambil semua events
export async function GET() {
  try {
    console.log("🔍 Fetching events from database...");
    
    const events = await prisma.event.findMany({
      orderBy: { createdAt: "desc" },
    });
    
    console.log(`✅ Found ${events.length} events`);
    return NextResponse.json(events);
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return NextResponse.json(
      { error: "Gagal mengambil data events", details: errorMessage },
      { status: 500 }
    );
  }
}

// POST - Buat event baru dengan upload gambar
export async function POST(req: Request) {
  try {
    console.log("📝 Creating new event...");
    
    const formData = await req.formData();
    
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const location = formData.get("location") as string;
    const panitia = formData.get("panitia") as string;
    const image = formData.get("image") as File | null;

    console.log("Form data received:", { title, description, date, time, location, panitia });

    // Validasi input
    if (!title || !description || !date || !time || !location || !panitia) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    let imageUrl = "/images/default-event.jpg";

    // Upload gambar jika ada
    if (image && image.size > 0) {
      try {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = join(process.cwd(), "public", "uploads");
        if (!existsSync(uploadDir)) {
          await mkdir(uploadDir, { recursive: true });
        }

        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `event-${uniqueSuffix}-${image.name.replace(/\s/g, "-")}`;
        const filepath = join(uploadDir, filename);

        await writeFile(filepath, buffer);
        imageUrl = `/uploads/${filename}`;
        console.log("✅ Image uploaded:", imageUrl);
      } catch (uploadError) {
        console.error("⚠️ Image upload failed, using default:", uploadError);
      }
    }

    // Simpan ke database
    const parsedDate = new Date(date);
    console.log("Parsed date:", parsedDate);

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: parsedDate.toISOString(),
        time,
        location,
        panitia,
        imageUrl,
      },
    });

    console.log("✅ Event created:", event.id);
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating event:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return NextResponse.json(
      { error: "Gagal membuat event", details: errorMessage },
      { status: 500 }
    );
  }
}