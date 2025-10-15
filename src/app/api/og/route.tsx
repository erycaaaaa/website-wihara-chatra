import { ImageResponse } from "next/og";

export const runtime = "edge"; // ok di Vercel

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Chatra Dhammapanno";
  return new ImageResponse(
    (
      <div style={{
        width:1200, height:630, display:"flex",
        alignItems:"center", justifyContent:"center",
        fontSize:72, fontWeight:700, background:"#f5f4ef", color:"#18181b", padding:48
      }}>
        {title}
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
