import { Circle } from "../shared/icons";
import Social from "./Social";
import Link from "next/link";

export function Footer() {
  return (
    <footer>
      <Link href="/editor">
        <div className="circle">
          <Circle/>
        </div>
      </Link>
      <p>© 2024 Fernando Ferrer. Todos los derechos reservados.</p>
    </footer>
  )
}
