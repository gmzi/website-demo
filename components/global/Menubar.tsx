import Link from 'next/link'
import { Logo } from './Logo'
import { Navbar } from './Navbar'
import { Social } from './Social'

export function Menubar() {
  return (
    <div>
        <div>
            <Logo logoItems={{title: "title", subtitle: "subt"}}/>
        </div>
        <div>
            <Social socialItems={[{name: "facebook", url: "www.google.com"}]}/>
        </div>
        <div>
            <Navbar navbarItems={[{slug: "this", title: "that"}]}/>
        </div>
    </div>
  )
}
