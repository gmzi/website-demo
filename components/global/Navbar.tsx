import { Logo } from './Logo'
import { getMetadata } from '@/lib/getMetadata'

interface NavbarProps {
  author_name: string;
  title: string;
  description: string;
  social: string[];
}

export async function Navbar(props: NavbarProps) {

  const remote = await getMetadata() || {
    author_name: '', 
    title: '',
    description: '',
    social: []
  }

  const {author_name, title, description, social} = remote;

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
