import { Navbar } from '../../components/global/Navbar'
import { Footer } from '@/components/global/Footer'
import { Logo } from '@/components/global/Logo'
import { Social } from '@/components/global/Social'
import { getMetadata } from '@/lib/getMetadata'
import { NavbarData } from '@/types'

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode
}) {
  
  const remote = await getMetadata() || {
    author_name: '', 
    description: '',
    social: []
  }

  const {author_name, title, description, social} = remote

  const data = {author_name, title, description, social}

  return (
    <div>
      <Navbar navbarData={data}/>
      <div>{children}</div>
      <Footer/>
    </div>
  )
}
