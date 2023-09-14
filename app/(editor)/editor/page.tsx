import { notFound, redirect } from "next/navigation";
import About from "@/components/editors/About";
import Bio from "@/components/editors/Bio";
import Courses from "@/components/editors/Courses";
import Shows from "@/components/editors/Shows";
import { currentUser } from "@clerk/nextjs";
import type {User} from '@clerk/nextjs/api';
import {UserButton} from "@clerk/nextjs";
import {auth} from '@clerk/nextjs';

const AUTHORIZED_USER_ID = process.env.AUTHORIZED_USER_ID;

export default async function EditorMainPage() {

  const user: User | null = await currentUser();
  const {userId} : {userId: string | null} = auth();

  if (user?.id !== AUTHORIZED_USER_ID){
    return redirect('/editor/unauthorized')
  }

  return (
    <>
      <UserButton afterSignOutUrl="/editor"/>
      <h2>HOME</h2>
      {/* @ts-expect-error Server Component */}
      <Shows/>
      {/* @ts-expect-error Server Component */}
      <About/>
      <br></br>
      <hr></hr>
      <br></br>
      <hr></hr>
      <br></br>
      <hr></hr>
      <h2>BIO</h2>
      {/* @ts-expect-error Server Component */}
      <Bio/>
      <h2>COURSES</h2>
      {/* @ts-expect-error Server Component */}
      <Courses/>
    </>
  )
}