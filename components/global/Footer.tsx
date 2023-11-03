import { Circle } from "../shared/icons";
import Social from "./Social";
import Link from "next/link";

// export function Footer() {
//   return (
//     <footer>
//       <Social/>
//       <p>
//         &copy;2024, todos los derechos reservados.
//       </p>
//     </footer>
//   )
// }

export function Footer() {
  return (
    <footer>
      <Link href="/editor">
        <div className="circle">
          <Circle/>
        </div>
      </Link>
      <p>© 2024 John Doe. Todos los derechos reservados.</p>
    </footer>
  )
}
