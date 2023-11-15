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
      <p><Link href="https://github.com/gmzi">gmzi</Link></p>
    </footer>
  )
}
