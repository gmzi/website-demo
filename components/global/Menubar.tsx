import Link from 'next/link'
import { Logo } from './Logo'
import { Navbar } from './Navbar'
import { Social } from './Social'

export function Menubar() {
  return (
    <div>
        <div>
            <h2>This should be a logo</h2>
            <Logo logoItems={{title: "title", subtitle: "subt"}}/>
        </div>
        <div>
            <h2>This should be a social</h2>
            <Social socialItems={[{name: "facebook", url: "www.google.com"}]}/>
        </div>
        <div>
            <h2>This should be a navbar</h2>
            <Navbar navbarItems={[{slug: "this", title: "that"}]}/>
        </div>
    </div>
  )
}
