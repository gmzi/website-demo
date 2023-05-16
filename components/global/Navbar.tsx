import Link from 'next/link'
import { navbarItem } from '@/types'

interface NavbarProps {
    navbarItems?: navbarItem[]
}

export function Navbar({ navbarItems }: NavbarProps) {
  return (
    <div>
      {navbarItems &&
        navbarItems.map((navbarItem, key) => {
          const href = navbarItem?.slug
          if (!href) {
            return null
          }
          return (
            <Link
              key={key}
              href={href}
            >
              {navbarItem.title}
            </Link>
          )
        })}
    </div>
  )
}
