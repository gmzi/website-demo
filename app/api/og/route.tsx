// import { NextResponse } from 'next/server';
 
// export async function GET() {
 
//   return NextResponse.json({ message: "hello" });
// }

import { ImageResponse } from '@vercel/og';
 
export const runtime = "edge"
 
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
          border: "1px solid gray", 
          borderRadius: "5px"
        }}>
        <div
        style={{
          fontSize: 128
        }}
        >
        Artist - Name
        </div>    
        <div
        style={{
          fontSize: 70
        }}
        >
        artist - description
        </div>    
      </div>  
    ),
    {
      width: 1200,
      height: 600,
    },
  );
}