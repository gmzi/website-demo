// example path:
// http://localhost:3000/editor/bio

import { notFound } from 'next/navigation';
import { navItems } from '@/lib/navItems';
import About from '@/components/editors/About';
import Bio from '@/components/editors/Bio'
import Shows from "@/components/editors/Shows";
import Courses from '@/components/editors/Courses'
import Podcast from "@/components/editors/Podcast";
import Tours from "@/components/editors/Tours";
import Press from "@/components/editors/Press";
import Metadata from '@/components/editors/Metadata';
import { auth } from '@clerk/nextjs';
import { CreateShow } from '@/components/forms/EditShows';


export async function generateStaticParams() {
  const indexes = Object.entries(navItems).map(([path, {name}]) => name)
  return indexes.map((index) => ({
    index: index,
  }))
}

export default async function EditorPage({ params }: { params: { index: string } }) {

  const indexes = Object.entries(navItems).map(([path, {name}]) => name)
  const index = indexes.find((index) => index === params.index);

  if (!index) {
    notFound();
  }
  
  {/* @ts-expect-error Server Component */}
  if (index === 'about') return <About/>
  {/* @ts-expect-error Server Component */}
  if (index === 'bio') return <Bio/>
  {/* @ts-expect-error Server Component */}
  if (index === 'shows') return <Shows/>
  {/* @ts-expect-error Server Component */}
  if (index === 'courses') return <Courses/>
  {/* @ts-expect-error Server Component */}
  if (index === 'podcast') return <Podcast/>
  {/* @ts-expect-error Server Component */}
  if (index === 'tours') return <Tours/>
  {/* @ts-expect-error Server Component */}
  if (index === 'press') return <Press/>
  {/* @ts-expect-error Server Component */}
  if (index === 'metadata') return <Metadata/>
}
  