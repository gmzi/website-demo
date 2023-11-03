import { UserButton, SignOutButton } from "@clerk/nextjs";
import { auth } from '@clerk/nextjs';
import Link from "next/link";
import { enableAuthIfProd } from '@/lib/EnableAuthIfProd';
import About from "@/components/editors/About";
import e from '@/app/(editor)/editor/editor.module.css'

export default async function EditorMainPage() {


  
  return (
    // <section>
    //   <div className="editor-sections-wrapper">
    //     <h1>Please choose a section to work on:</h1>
    //     <ul>
    //       <li>
    //         <Link href="/editor/about">
    //           <button className="btnCreate">About</button>
    //         </Link>
    //       </li>
    //       <li>
    //         <Link href="/editor/bio">
    //           <button className="btnCreate">Bio</button>
    //         </Link>
    //       </li>
    //       <li>
    //         <Link href="/editor/shows">
    //           <button className="btnCreate">shows - edit</button>
    //         </Link>
    //       </li>
    //       <li>
    //         <Link href="/editor/shows/create">
    //           <button className="btnCreate">shows - create</button>
    //         </Link>
    //       </li>
    //       <li>
    //         <Link href="/editor/courses">
    //           <button className="btnCreate">Courses</button>
    //         </Link>
    //       </li>
    //       <li>
    //         <Link href="/editor/podcast">
    //           <button className="btnCreate">podcast</button>
    //         </Link>
    //       </li>
    //       <li>
    //         <Link href="/editor/tours">
    //           <button className="btnCreate">tours</button>
    //         </Link>
    //       </li>
    //       <li>
    //         <Link href="/editor/press">
    //           <button className="btnCreate">press</button>
    //         </Link>
    //       </li>
    //       <li>
    //         <Link href="/editor/metadata">
    //           <button className="btnCreate">metadata</button>
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    // </section>
    
<section>
  <div className={e.selector}>
    <h1>Estas son las secciones para editar:</h1>
    <ul>
      <li>
        <Link href="/editor/about">
          <span className={e.cmsLink}>About</span>
        </Link>
      </li>
      <li>
        <Link href="/editor/bio">
          <span className={e.cmsLink}>bio</span>
        </Link>
      </li>
      <li>
        <Link href="/editor/shows">
          <span className={e.cmsLink}>shows</span>
        </Link>
      </li>
      <li>
        <Link href="/editor/shows/create">
          <span className={e.cmsLink}>crear show</span>
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
          <span className={e.cmsLink}>tours</span>
        </Link>
      </li>
      <li>
        <Link href="/editor/press">
          <span className={e.cmsLink}>press</span>
        </Link>
      </li>
    </ul>
  </div>
</section>

  )
}