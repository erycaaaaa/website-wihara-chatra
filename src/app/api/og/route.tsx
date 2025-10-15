// src/app/api/og/route.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';             
export const dynamic = 'force-dynamic';    

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') ?? 'Chatra Dhammapanno';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 72,
          fontWeight: 700,
          background: '#f5f4ef',
          color: '#18181b',
          padding: '48px',
        }}
      >
        {title}
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
