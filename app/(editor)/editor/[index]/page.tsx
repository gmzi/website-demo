// example path:
// http://localhost:3000/editor/bio

import { notFound } from 'next/navigation';
import { editorPaths } from '@/lib/navItems';
import About from '@/components/editors/About';
import Bio from '@/components/editors/Bio'
import Shows from "@/components/editors/Shows";
import Test from '@/components/editors/Test';


export async function generateStaticParams() {
  const indexes = Object.entries(editorPaths).map(([path, {name}]) => name)
  return indexes.map((index) => ({
    index: index,
  }))
}

export default async function EditorPage({ params }: { params: { index: string } }) {

  const indexes = Object.entries(editorPaths).map(([path, {name}]) => name)
  const index = indexes.find((index) => index === params.index);

  if (params.index === 'test'){
    {/* @ts-expect-error Server Component */}
    return <Test/>
  }

  if (!index) {
    notFound();
  }

  {/* @ts-expect-error Server Component */}
  if (index === 'about') return <About/>
  {/* @ts-expect-error Server Component */}
  if (index === 'bio') return <Bio/>
  {/* @ts-expect-error Server Component */}
  if (index === 'shows') return <Shows/>
}
