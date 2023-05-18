import { LogoItems } from "@/types"

interface LogoProps {
    logoItems?: LogoItems
}

export function Logo({logoItems}: LogoProps) {
    return (
        <div className={'logoContainer'}>
          <span className={'logoTitle'}>
            <span>{logoItems?.author_name}</span>
          </span>
          <span className={'descriptionLine'}>
          <span>{logoItems?.description}</span>
        </span>
      </div>
    )
  }
  