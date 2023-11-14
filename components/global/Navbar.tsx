'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/lib/navItems';
import { editorNaviItems } from '@/lib/navItems';
import {
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
  FacebookIcon,
  Github,
  Globe
} from '../shared/icons';
import { SignIn, UserButton, SignOutButton } from "@clerk/nextjs";
import e from '@/app/(editor)/editor/editor.module.css'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export function Navbar() {
  let pathname = usePathname() || '/';

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="navbar-header">
          <Link href="/">
            Tennessee Williams
          </Link>
        </div>
        <div className="navbar-header">
          <Link href="/editor">
            editor
          </Link>
        </div>
        <div className="social-icons">
          <Link href="https://github.com/gmzi/website-demo" className="github">
            <Github />
          </Link>
          <Link href="https://www.instagram.com" className="instagram">
            <InstagramIcon />
          </Link>
          <Link href="https://www.facebook.com" className="facebook">
            <FacebookIcon />
          </Link>
          <Link href="https://www.youtube.com" className="youtube">
            <YoutubeIcon />
          </Link>
          <Link href="https://twitter.com" className="twitter">
            <TwitterIcon />
          </Link>
        </div>
      </div>
      <div className="separator"></div>
      <div className="navbar-bottom">
        <ul className="navbar-menu">
          {Object.entries(navItems).map(([path, { name }]) => {
            const isActive = path === pathname;
            // if (path !== '/') {
              return (
                <Link
                  key={path}
                  href={path}>
                  {isActive ? (
                    <li className={'active'}>{name}</li>
                  ) : (
                    <li>{name}</li>
                  )}
                </Link>
              )
            // }
          })}
        </ul>
      </div>
    </nav>
  )
}




export function EditorNavbar({ orgRole }: { orgRole: string }) {

  let pathname = usePathname() || '/';

  let clientPath = pathname.slice(pathname.lastIndexOf("/") + 1) || '/';

  if (clientPath === 'about' || clientPath === 'editor') {
    clientPath = '/'
  }



  if (!orgRole) {
    return (
      <nav className="navbar">
        <div className="navbar-top">
          <div className="navbar-header">
            <Link href="/editor">
              - EDITOR -
            </Link>
          </div>
        </div>
      </nav>
    )
  }

  return (

    <nav className={e.navbar}>
      <div className="navbar-top">
        <div className="navbar-header">
          <Link href="/editor">
            - EDITOR -
          </Link>
        </div>
        {orgRole &&
          <div className="userButtons">
            <UserButton afterSignOutUrl="/editor" />
            <SignOutButton />
          </div>
        }
        <div className="social-icons">
          <Link href={`/${clientPath}`} className="">
            <Globe />
          </Link>
        </div>
      </div>
      <div className="separator"></div>
      <div className="navbar-bottom">
        <ul className="navbar-menu">
          {Object.entries(editorNaviItems).map(([path, { name }]) => {
            const isActive = path === pathname;
            if (path !== '/') {
              return (
                <Link
                  key={path}
                  href={path}>
                  {isActive ? (
                    <li className={'active'}>{name}</li>
                  ) : (
                    <li>{name}</li>
                  )}
                </Link>
              )
            }
          })}
        </ul>
      </div>
    </nav>
  )
}

