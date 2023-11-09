// revalidate a single path:
// http://localhost:3000/server/revalidate?path=shows

// revalidate multiple paths:
// http://localhost:3000/server/revalidate?path=all

import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

const BASE_URL = process.env.BASE_URL;

const personalPaths = ['/(personal)/shows', '/(personal)/courses', '/(personal)/tours', '/(personal)/press']
 
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path') || '/'
  if (path === "all"){
    revalidatePath('/(personal)/shows');
    revalidatePath('/(personal)/courses');
    revalidatePath('/(personal)/tours');
    revalidatePath('/(personal)/press');
    return NextResponse.json({ revalidated: true, paths: JSON.stringify(personalPaths), now: Date.now() })
  }
  revalidatePath(path)
  return NextResponse.json({ revalidated: true, path: path, now: Date.now() })
}