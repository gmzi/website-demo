'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';


const navItems = {
  '/bio': {
    name: 'bio',
  },
  '/courses': {
    name: 'courses',
  },
  '/shows': {
    name: 'shows',
  },
  '/podcast': {
    name: 'podcast',
  },
  '/tours': {
    name: 'tours',
  },
  '/press': {
    name: 'press',
  },
  '/contact': {
    name: 'contact',
  },
};

function Logo() {
  return (
    <Link aria-label="John Done" href="/">
      <div className={'logoContainer'}>
        <span className={'logoTitle'}>
            <span>John Done</span>
        </span>
      </div>
    </Link>
  )
}

export async function Navbar() {

  let pathname = usePathname() || '/';

  return (
    <div className={'navbarContainer'}>
        <div> 
            <Logo/>
        </div>
        <ul className={'navigationLinksList'}>
          {Object.entries(navItems).map(([path, {name}]) => {
            const isActive = path === pathname;
            return (
              <Link
                key={path}
                href={path}
              >
                {isActive ? (
                  <li className={'active'}>{name}</li>
                ) : (
                <li>{name}</li>
                )}
              </Link>
            )
          })}
        </ul>
    </div>
  )
}
