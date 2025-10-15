import { ImageResponse } from "next/og";

export const runtime = 'edge';
export const alt = 'Chatra Dhammapanno';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG() {
  return new ImageResponse(
    (<div style={{height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center",background:"#FFF9F1",color:"#3C2F2F",fontSize:64,fontFamily:"serif"}}>
      Chatra Dhammapanno
    </div>),
    { ...size }
  );
}
