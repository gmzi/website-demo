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
          <h1>Estas son las secciones para editar:</h1>
          <ul>
            <li>
              <Link href="/editor/about">
                <span className={e.cmsLink}>inicio</span>
              </Link>
            </li>
            <li>
              <Link href="/editor/bio">
                <span className={e.cmsLink}>bio</span>
              </Link>
            </li>
            <li>
              <Link href="/editor/shows">
                <span className={e.cmsLink}>obras</span>
              </Link>
            </li>
            <li>
              <Link href="/editor/courses">
                <span className={e.cmsLink}>cursos</span>
              </Link>
            </li>
            <li>
              <Link href="/editor/podcast">
                <span className={e.cmsLink}>podcast</span>
              </Link>
            </li>
            <li>
              <Link href="/editor/tours">
                <span className={e.cmsLink}>giras</span>
              </Link>
            </li>
            <li>
              <Link href="/editor/press">
                <span className={e.cmsLink}>prensa</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>

  )
}