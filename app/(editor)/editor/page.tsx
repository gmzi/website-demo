import { UserButton, SignOutButton } from "@clerk/nextjs";
import { auth } from '@clerk/nextjs';
import Link from "next/link";
import { enableAuthIfProd } from '@/lib/EnableAuthIfProd';

export default async function EditorMainPage() {

  return (
    <>
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
              <button className="btnCreate">shows - edit</button>
            </Link>
          </li>
          <li>
            <Link href="/editor/shows/create">
              <button className="btnCreate">shows - create</button>
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