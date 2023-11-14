import { UserButton, SignOutButton } from "@clerk/nextjs";
import { auth } from '@clerk/nextjs';
import Link from "next/link";
import { enableAuthIfProd } from '@/lib/EnableAuthIfProd';
import About from "@/components/editors/About";
import e from '@/app/(editor)/editor/editor.module.css'

export default async function EditorMainPage() {



  return (
    <section>
      <div className="editor-group">
        <div className={e.selector}>
          <h1>Sections available to edit:</h1>
          <ul>
            <li>
              <Link href="/editor/about">
                <span className={e.cmsLink}>about</span>
              </Link>
            </li>
            <li>
              <Link href="/editor/shows">
                <span className={e.cmsLink}>shows</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>

  )
}