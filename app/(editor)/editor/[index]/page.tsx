
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
import Shows from "@/components/editors/Shows";
import Courses from '@/components/editors/Courses'
import Podcast from "@/components/editors/Podcast";
import Tours from "@/components/editors/Tours";
import Press from "@/components/editors/Press";
import { auth } from '@clerk/nextjs';
import { SignIn, UserButton, SignOutButton } from "@clerk/nextjs";


export async function generateStaticParams() {
  const indexes = Object.entries(navItems).map(([path, {name}]) => name)
  return indexes.map((index) => ({
    index: index,
  }))
}

export default async function EditorPage({ params }: { params: { index: string } }) {

  const indexes = Object.entries(navItems).map(([path, {name}]) => name)
  const index = indexes.find((index) => index === params.index);

  const { orgRole } = auth();

  if (orgRole !== 'admin') {
    return (
      <div>
        {/* <UserButton afterSignOutUrl="/editor" />
        <SignOutButton /> */}
        <p>you are an unauthorized user to edit this page, please sign out from your account and sign in as an authorized user</p>
      </div>
    )
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
  {/* @ts-expect-error Server Component */}
  if (index === 'courses') return <Courses/>
  {/* @ts-expect-error Server Component */}
  if (index === 'podcast') return <Podcast/>
  {/* @ts-expect-error Server Component */}
  if (index === 'tours') return <Tours/>
  {/* @ts-expect-error Server Component */}
  if (index === 'press') return <Press/>
}
  