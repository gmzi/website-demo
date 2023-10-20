import { UserButton, SignOutButton } from "@clerk/nextjs";
import { auth } from '@clerk/nextjs';
import Link from "next/link";

export default async function EditorMainPage() {
  // const user: User | null = await currentUser();
  // const {userId} : {userId: string | null} = auth();
  // if (user?.id !== AUTHORIZED_USER_ID) {
  //   return (
  //     <div>
  //       <UserButton afterSignOutUrl="/editor" />
  //       <SignOutButton />
  //       <p>you are an unauthorized user to edit this page, please sign out from your account and sign in as an authorized user</p>
  //     </div>

  //   )
  // }



  const { orgRole } = auth();

  if (orgRole !== 'admin') {
    return (
      <div>
        <UserButton afterSignOutUrl="/editor" />
        <SignOutButton />
        <p>you are an unauthorized user to edit this page, please sign out from your account and sign in as an authorized user</p>
      </div>

    )
  }

  return (
    <>
      {/* <UserButton afterSignOutUrl="/editor" />
      <SignOutButton /> */}
      <div className="editor-sections-wrapper">
        <h1>Please choose a section to work on:</h1>
        <ul>
          <li>
            <Link href="/editor/about">
              <button className="btnCreate">About</button>
            </Link>
          </li>
          <li>
            <Link href="/editor/bio">
              <button className="btnCreate">Bio</button>
            </Link>
          </li>
          <li>
            <Link href="/editor/shows">
              <button className="btnCreate">shows</button>
            </Link>
          </li>
          <li>
            <Link href="/editor/courses">
              <button className="btnCreate">Courses</button>
            </Link>
          </li>
          <li>
            <Link href="/editor/podcast">
              <button className="btnCreate">podcast</button>
            </Link>
          </li>
          <li>
            <Link href="/editor/tours">
              <button className="btnCreate">tours</button>
            </Link>
          </li>
          <li>
            <Link href="/editor/press">
              <button className="btnCreate">press</button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}