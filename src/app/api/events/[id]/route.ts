import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir, unlink } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

type ParamsType = {
  params: Promise<{ id: string }>;
};

/* ===================== GET ===================== */
export async function GET(
  _: Request,
  { params }: ParamsType
) {
  try {
    const { id } = await params;
    
    console.log("📖 Getting event:", id);

    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("❌ GET error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil event" },
      { status: 500 }
    );
  }
}

/* ===================== PUT ===================== */
export async function PUT(
  req: Request,
  { params }: ParamsType
) {
  try {
    const { id } = await params;
    
    console.log("✏️ Updating event:", id);

    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return NextResponse.json(
        { error: "Event tidak ditemukan" },
        { status: 404 }
      );
    }

    // Cek Content-Type untuk tau tipe data yang dikirim
    const contentType = req.headers.get("content-type") || "";
    console.log("Content-Type:", contentType);

    let title: string;
    let description: string;
    let date: string;
    let time: string;
    let location: string;
    let panitia: string;
    let image: File | null = null;

    if (contentType.includes("multipart/form-data")) {
      // Parse FormData
      const formData = await req.formData();
      title = formData.get("title") as string;
      description = formData.get("description") as string;
      date = formData.get("date") as string;
      time = formData.get("time") as string;
      location = formData.get("location") as string;
      panitia = formData.get("panitia") as string;
      image = formData.get("image") as File | null;
    } else if (contentType.includes("application/json")) {
      // Parse JSON
      const jsonData = await req.json();
      title = jsonData.title;
      description = jsonData.description;
      date = jsonData.date;
      time = jsonData.time;
      location = jsonData.location;
      panitia = jsonData.panitia;
      image = null;
    } else {
      return NextResponse.json(
        { error: "Content-Type tidak valid" },
        { status: 400 }
      );
    }

    if (!title || !description || !date || !time || !location || !panitia) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    let imageUrl = existingEvent.imageUrl;

    if (image && image.size > 0) {
      if (imageUrl?.startsWith("/uploads/")) {
        const oldPath = join(process.cwd(), "public", imageUrl);
        if (existsSync(oldPath)) {
          try {
            await unlink(oldPath);
            console.log("🗑️ Old image deleted");
          } catch (err) {
            console.error("⚠️ Error deleting old image:", err);
          }
        }
      }

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = join(process.cwd(), "public/uploads");
      if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true });

      const filename = `event-${Date.now()}-${image.name.replace(/\s/g, "-")}`;
      await writeFile(join(uploadDir, filename), buffer);
      imageUrl = `/uploads/${filename}`;
      console.log("📸 New image uploaded:", imageUrl);
    }

    const parsedDate = new Date(date);

    const event = await prisma.event.update({
      where: { id },
      data: {
        title,
        description,
        date: parsedDate,
        time,
        location,
        panitia,
        imageUrl,
      },
    });

    console.log("✅ Event updated:", event.id);
    return NextResponse.json(event);
  } catch (error) {
    console.error("❌ PUT error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Gagal mengupdate event", details: errorMessage },
      { status: 500 }
    );
  }
}

/* ===================== DELETE ===================== */
export async function DELETE(
  _: Request,
  { params }: ParamsType
) {
  try {
    const { id } = await params;
    
    console.log("🗑️ Deleting event:", id);

    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Event tidak ditemukan" },
        { status: 404 }
      );
    }

    // Hapus file gambar jika ada
    if (event.imageUrl?.startsWith("/uploads/")) {
      const imagePath = join(process.cwd(), "public", event.imageUrl);
      if (existsSync(imagePath)) {
        try {
          await unlink(imagePath);
          console.log("🗑️ Image file deleted");
        } catch (err) {
          console.error("⚠️ Error deleting image file:", err);
        }
      }
    }

    await prisma.event.delete({ where: { id } });

    console.log("✅ Event deleted:", id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ DELETE error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Gagal menghapus event", details: errorMessage },
      { status: 500 }
    );
  }
}