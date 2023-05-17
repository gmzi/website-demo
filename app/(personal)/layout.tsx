import { Navbar } from '../../components/global/Navbar'
import { Footer } from '@/components/global/Footer'
import { Logo } from '@/components/global/Logo'
import { Social } from '@/components/global/Social'


export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode
}) {

//   replace this stuff with data fech:
  const navbarItems = [{title: "item 1", slug: "#item1"},{title: "item 2", slug: "#item2"}]
  const logoItems = {title: "artis name", subtitle: "artist description" }
  const socialItems = [{name: "facebook", url: "www.google.com"}, {name: "twitter", url: "www.google.com"}]

  return (
    <div>
      <Logo logoItems={logoItems}/>
      <Social socialItems={socialItems}/>
      <Navbar navbarItems={navbarItems} />
      <div>{children}</div>
      <Footer/>
    </div>
  )
}