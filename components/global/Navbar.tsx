import Link from 'next/link'
import { Logo } from './Logo'
import { Social } from './Social'
import { NavbarData, SocialData } from '@/types'

interface NavbarProps {
  navbarData: NavbarData
}

export function Navbar({navbarData}: NavbarProps) {

  const {author_name, description } = navbarData

  const data:SocialData[] = navbarData.social!

  return (
    <div>
        <div>
            <Logo logoItems={{author_name: author_name!, description: description!}}/>
        </div>
        <p>---------------------------------------------------------------</p>
        <p>---------------------------------------------------------------</p>
        <p>---------------------------------------------------------------</p>
        <div>
            <Social data={data}/>
        </div>
        <div>
            <ul>
              <li>bio</li>
              <li>archives</li>
              <li>timeline</li>
              <li>podcasts</li>
            </ul>
        </div>
    </div>
  )
}
