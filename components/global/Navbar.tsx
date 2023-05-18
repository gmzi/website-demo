import Link from 'next/link'
import { Logo } from './Logo'
import { Social } from './Social'
import { NavbarData, RemoteMetadata } from '@/types'

interface NavbarProps {
  navbarData: NavbarData
}

export function Navbar({navbarData}: NavbarProps) {

  const {author_name, description, social} = navbarData

  return (
    <div>
        <div>
            <Logo logoItems={{author_name: author_name!, description: description!}}/>
        </div>
        <p>---------------------------------------------------------------</p>
        <p>---------------------------------------------------------------</p>
        <p>---------------------------------------------------------------</p>
        <div>
            <Social socialItems={social!}/>
        </div>
        <div>
            <ul>
              <li>nav bio</li>
              <li>nav archives</li>
              <li>nav timeline</li>
              <li>nav podcasts</li>
            </ul>
        </div>
    </div>
  )
}
