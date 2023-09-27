import { notFound, redirect } from "next/navigation";
import About from "@/components/editors/About";
import Bio from "@/components/editors/Bio";
import Courses from "@/components/editors/Courses";
import Shows from "@/components/editors/Shows";
import Podcast from "@/components/editors/Podcast";
import Tours from "@/components/editors/Tours";
import Press from "@/components/editors/Press";
import { currentUser } from "@clerk/nextjs";
import type { User } from '@clerk/nextjs/api';
import { SignIn, UserButton, SignOutButton } from "@clerk/nextjs";
import { auth } from '@clerk/nextjs';

const AUTHORIZED_USER_ID = process.env.AUTHORIZED_USER_ID;

export default async function EditorMainPage() {

  // const user: User | null = await currentUser();
  const {orgRole} = auth();
  // const {userId} : {userId: string | null} = auth();

  if (orgRole !== 'admin') {
    return (
      <div>
        <UserButton afterSignOutUrl="/editor" />
        <SignOutButton />
        <p>you are an unauthorized user to edit this page, please sign out from your account and sign in as an authorized user</p>
      </div>

    )
  }
  // if (user?.id !== AUTHORIZED_USER_ID) {
  //   return (
  //     <div>
  //       <UserButton afterSignOutUrl="/editor" />
  //       <SignOutButton />
  //       <p>you are an unauthorized user to edit this page, please sign out from your account and sign in as an authorized user</p>
  //     </div>

  //   )
  // }

  return (
    <>
      <UserButton afterSignOutUrl="/editor" />
      <SignOutButton />
      <div className="editor-sections-wrapper">
        {/* @ts-expect-error Server Component */}
        <Press/>
        {/* <Shows />
        <About />
        <Bio />
        <Courses />
        <Podcast/>
        <Tours/> */}
      </div>
    </>
  )
}