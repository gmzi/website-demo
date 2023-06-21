import Link from 'next/link'
import { Logo } from './Logo'
import { NavbarData, SocialData } from '@/types'

interface NavbarProps {
  navbarData: NavbarData
}

export function Navbar({navbarData}: NavbarProps) {

  const {author_name, description } = navbarData

  const data:SocialData[] = navbarData.social!

  return (
    <div className={'navbarContainer'}>
        <div>
            <Logo logoItems={{author_name: author_name!, description: description!}}/>
        </div>
        <ul className={'navigationLinksList'}>
          <li>bio</li>
          <li>courses</li>
          <li>shows</li>
          <li>podcast</li>
          <li>tours</li>
          <li>press</li>
          <li>contact</li>
        </ul>
    </div>
  )
}
