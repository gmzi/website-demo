import type { NextRequest } from 'next/server';
// import { ImageResponse } from '@vercel/og';
// fix build error caused by above import replacing it with this import:
import { ImageResponse } from 'next/og';
 
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
          background: 'linear-gradient(to bottom,#ffffff,#abbaab 50%,#ffffff)',
          border: "1px solid gray", 
          borderRadius: "5px"
        }}
        >
        <div
        style={{
          fontSize: '3em'
        }}
        >
        Tennesee Williams
        </div>    
        <div
        style={{
          fontSize: '2em'
        }}
        >
        a website
        </div>    
      </div>  
    ),
    {
      width: 1200,
      height: 600,
    },
  );
}