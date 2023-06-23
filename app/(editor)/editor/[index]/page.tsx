
/* ------------------------------------------------
    THIS ROUTE IS DEPRECATED
    
--------------------------------------------------*/

// example path:
// http://localhost:3000/editor/bio

import TextEditor from '../../../../components/forms/text-editor/TextEditor'
import ImageUpload from '../../../../components/forms/ImageUpload'
import { getData } from '@/lib/getData'
import { notFound } from 'next/navigation';
import { navItems } from '@/lib/navItems';
import About from '@/components/editors/About';
import Bio from '@/components/editors/Bio'
import Courses from '@/components/editors/Courses'


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
  
  // {/* @ts-expect-error Server Component */}
  // if (index === 'about') return <About/>
  // {/* @ts-expect-error Server Component */}
  // if (index === 'bio') return <Bio/>
  // {/* @ts-expect-error Server Component */}
  // if (index === 'courses') return <Courses/>

  return (
    <>
      <p>this route is deprectated </p>
      <p>/(editor)/editor/[index]/page</p>
    </>
    
  )

}
  