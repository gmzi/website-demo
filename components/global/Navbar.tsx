'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/lib/navItems';

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
                {/* <li>{name}</li> */}
              </Link>
            )
          })}
        </ul>
    </div>
  )
}
