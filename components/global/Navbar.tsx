'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/lib/navItems';
import { editorNaviItems } from '@/lib/navItems';
import {
  Circle,
  Globe
} from '../shared/icons';
import { InstagramIcon } from '../shared/icons';
import { TwitterIcon } from '../shared/icons';
import { YoutubeIcon } from '../shared/icons';
import { FacebookIcon } from '../shared/icons';

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

// export async function Navbar() {

//   let pathname = usePathname() || '/';

//   return (
//     <div className="navbar">
//       <div>
//         <Logo />
//       </div>
//       <ul className='navigationLinks'>
//         {Object.entries(navItems).map(([path, { name }]) => {
//           const isActive = path === pathname;
//           if (path !== '/') {
//             return (
//               <Link
//                 key={path}
//                 href={path}
//               >
//                 {isActive ? (
//                   <li className={'active'}>{name}</li>
//                 ) : (
//                   <li>{name}</li>
//                 )}
//                 {/* <li>{name}</li> */}
//               </Link>
//             )
//           }
//         })}
//         <li>
//           <Link href="/editor">
//             <Circle />
//           </Link>
//         </li>
//       </ul>
//     </div>
//   )
// }

export function Navbar(){
  let pathname = usePathname() || '/';

  return (
    <nav className="navbar">
        <div className="navbar-top">
            <div className="navbar-header">
              <Link href="/">
                John Doe
              </Link>
            </div>
            <div className="social-icons">
              <Link href="https://www.instagram.com"  className="instagram">
                <InstagramIcon/>
              </Link>
              <Link href="https://www.facebook.com" className="facebook">
                <FacebookIcon/>
              </Link>
              <Link href="https://www.youtube.com" className="youtube">
                <YoutubeIcon/>
              </Link>
              <Link href="https://www.twitter.com" className="twitter">
                <TwitterIcon/>
              </Link>
            </div>
        </div>
        <div className="separator"></div>
        <div className="navbar-bottom">
            <ul className="navbar-menu">
                {Object.entries(navItems).map(([path, {name}]) => {
                  const isActive = path === pathname;
                  if (path !== '/') {
                    return(
                      <Link
                        key={path}
                        href={path}>
                          {isActive ? (
                            <li className={'active'}>{name}</li>
                          ) : (
                            <li>{name}</li>
                          )}
                      </Link>
                    )
                  }
                })}
            </ul>
        </div>
    </nav>
  )
}




export function EditorNavbar() {

  let pathname = usePathname() || '/';

  return (
    <div className={'navbarContainer'}>
      <ul className={'navigationLinksList'}>
        {Object.entries(editorNaviItems).map(([path, { name }]) => {
          const isActive = path === pathname;
          if (path !== '/') {
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
              </Link>
            )
          }
        })}
        <li>
          <Link href="/">
            <Globe />
          </Link>
        </li>
      </ul>
    </div>
  )
}

